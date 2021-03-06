<template>
    <div class="optional-table-list" id="optional-inventory-table-list">
        <Table :loading="loading" border stripe :columns="columns" :data="dailyOldData">
            <div slot="loading">
                <Loading/>
            </div> 
        </Table>
        <SlotHead :class="theHead?'header-here':'header-no'" indentify="optional"/>
        <div class='spin-position-fix' v-if="spinLoading">
            <Spin fix size="large"></Spin>
        </div>
        <div  :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:width+'px'}">
                <div style="display:inline-block;">
                    <Button type='primary' @click='submitStatistical' style="margin-right:10px;">统计</Button>
                    <Button type='primary' @click='submitExport'>导出(共{{totalCount}}条)</Button>
                </div>
        </div>

        <Modal
            v-model="openStatistical"
            :title="'统计信息  (统计自当前筛选结果共'+totalCount+'条)'"
            class-name="vertical-center-modal"
            width="600"
        >
            <div style="height:500px;overflow:auto;">
                <Statistical :data="dailyInnerData"/>
            </div>
            <p slot="footer" style="opacity:0;"></p>
        </Modal>

        <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />

    </div>
</template>

<script>
import Loading from '~/components/Loading';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SlotHead from '../slotHead';
import Statistical from '../statistical';
import Message from '~/components/Message';
var layoutScrollHeight=0;
export default {
    props:{
        tabForms:{
            type:Object,
            default:{}
        }
    },
    components:{
        Loading,
        SlotHead,
        Message,
        Statistical
    },
    data() {
        return{
            warn:'',
            MessageType:'',
            openMessage:false,
            openStatistical:false,
            spinLoading:false,
            loading:true,
            theEnd:true,
            theHead:false,
            sideBar:true,
            left:'',
            width:'',

            totalCount:0,
            dailyData:[],
            dailyOldData:[],
            optionalIndentify:[],
            dailyInnerData:[],
            columns: [
                {
                    title: '商品',
                    key: 'name',
                    align:'center',
                    render(tag, params){
                        var location=params.row.location?params.row.location:'-'
                        return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: location
                                        }
                                    }, [
                                    h('div', [
                                        h('div',{
                                        },params.row.name),
                                        h('div',{
                                            style:{
                                                textOverflow:'ellipsis',
                                                whiteSpace:'nowrap',
                                                overflow: 'hidden'
                                            }
                                        },params.row.location),
                                    ])
                                ])
                        ])
                    }
                },
                {
                    title: '商品类型',
                    key: 'type',
                    align:'center',
                    width:110,
                    render(tag, params){
                        var ren=params.row.type?params.row.type:'-';
                        return <span>{ren}</span>
                    }
                },
                {
                    title: '商品属性',
                    key: 'property',
                    align:'center',
                    render(tag, params){
                        var desc=params.row.propertyDesc?params.row.propertyDesc:'-'
                        return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content: desc
                                        }
                                    }, [
                                    h('div', [
                                        h('div',{
                                        },params.row.property),
                                        h('div',{
                                            style:{
                                                textOverflow:'ellipsis',
                                                whiteSpace:'nowrap',
                                                overflow: 'hidden'
                                            }
                                        },params.row.propertyDesc),
                                    ])
                                ])
                        ])
                    }
                },
                {
                    title: '面积',
                    key: 'area',
                    align:'center',
                    width:80,
                    render(tag, params){
                        var ren=params.row.area?params.row.area:'-';
                        var renEnd=(params.row.type=='固定办公桌'||params.row.type=='移动办公桌')?'-':ren;
                        return <span>{renEnd}</span>
                    }
                },
                {
                    title: '工位单价',
                    key: 'unitPrice',
                    className:'priceClass',
                    align:'center',
                    width:100,
                    render(tag, params){
                        return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.unitPrice}</span>
                    }
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align:'center',
                    width:100,
                    render(tag, params){
                        var ren=params.row.capacity?params.row.capacity:'-';
                        return <span>{ren}</span>
                    }
                },
                {
                    title: '商品总价',
                    key: 'quotedPrice',
                    className:'priceClass',
                    align:'center',
                    width:100,
                    render(tag, params){
                        return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.quotedPrice}</span>
                    }
                },
                {
                    title: '可租起始日',
                    key: 'recentStart',
                    align:'center',
                    width:130,
                    render(tag, params){
                        var ren=params.row.recentStart?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentStart)):'-';
                        return <span>{ren}</span>;
                    }
                },
                {
                    title: '可租结束日',
                    key: 'recentEnd',
                    align:'center',
                    width:130,
                    render(tag, params){
                        var ren=params.row.recentEnd?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentEnd)):'-';
                        return <span>{ren}</span>;
                    }
                }
            ]   
        }
    },
    mounted(){
        if(this.tabForms.cityId){
            this.getCommonParam();
            this.getTableData(this.tabForms); 
        }  
        var dom=document.getElementById('layout-content-main');
        var dailyTableDom=document.getElementById('optional-inventory-table-list');
        if(dailyTableDom){
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
        }
        dom.addEventListener("scroll",this.onScrollListener);
        window.addEventListener('resize',this.onResize);  
        var _this=this;
        LISTENSIDEBAROPEN(function (params) {
            _this.sideBar=params;
        }) 
    },
    watch:{
        sideBar:function(val){
            var dailyTableDom=document.getElementById('optional-inventory-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            this.onScrollListener();
        }, 
        tabForms:function(val,old){
            this.getCommonParam();
            this.getTableData(this.tabForms); 
        }
    },
    destroyed(){
        var dom=document.getElementById('layout-content-main');
        dom.removeEventListener("scroll",this.onScrollListener);
        window.removeEventListener('resize',this.onResize);  
    },
    methods:{
        onResize(){
           var dailyTableDom=document.getElementById('optional-inventory-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            this.onScrollListener(); 
        },
        //获取列表数据
        getTableData(values){
            this.optionalIndentify=[];
            var params=Object.assign({},values);
            params.inventoryDate=this.dateSwitch(params.inventoryDate);
            params.startDate=this.dateSwitch(params.startDate);
            params.endDate=this.dateSwitch(params.endDate);
            this.$http.get('getOptionalInventory', params).then((res)=>{
                this.dailyData=res.data.items;
                this.optionalIndentify=res.data.items;
                this.totalCount=res.data.totalCount;
                this.loading=false;
                this.spinLoading=false;
                this.dailyOldData=this.dailyOldData.concat(this.dailyData);
                this.$nextTick(() => {
                    var div = document.getElementById('layout-content-main')
                    div.scrollTop = layoutScrollHeight
                }) 
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })        
        },
        //信息提示框
        onMessageChange(data){
            this.openMessage=data;
        },
        //统计开关
        cancelStatical(){
            this.openStatistical=!this.openStatistical;
        },
        //格式转换
        dateSwitch(data){
            if(data){
                return utils.dateCompatible(data);
            }else{
                return '';
            }
        },
        //获取统计数据
        getStatistal(){
            this.tabForms.inventoryDate=this.dateSwitch(this.tabForms.inventoryDate);
            this.tabForms.startDate=this.dateSwitch(this.tabForms.startDate);
            this.tabForms.endDate=this.dateSwitch(this.tabForms.endDate);
                this.$http.get('getOptionalStatiscal',this.tabForms).then((res)=>{
                this.dailyInnerData=res.data;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        //打开统计
        submitStatistical(){
            this.cancelStatical();
            this.getStatistal();
        },
        //滚动监听
        onScrollListener(){  
            var dom=document.getElementById('layout-content-main');
            var headDom=document.getElementById('slot-head-optional-inventory');
            if(headDom){
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
            }
            if(dom.scrollTop>330){
                this.theHead=true;
            }else{
                this.theHead=false;
            }
            if(!this.theEnd && (dom.scrollTop + dom.clientHeight >= dom.scrollHeight)){
                this.theEnd=true;
            }
            if(this.theEnd && (dom.scrollTop + dom.clientHeight < dom.scrollHeight)){
                this.theEnd=false;
            }
            layoutScrollHeight=dom.scrollTop;
            var totalPage=Math.ceil(this.totalCount/this.tabForms.pageSize);
            if(dom.scrollHeight-dom.scrollTop-dom.clientHeight<10){
                if(this.tabForms.page==totalPage){
                    return ;
                }
                if(!this.optionalIndentify.length){
                    return ;
                }
                this.spinLoading=true;
                this.tabForms.page=Number(this.tabForms.page)+1;
                this.getTableData(this.tabForms);
            }
        },
        //提取公共
        getCommonParam(){
            this.tabForms.page=1;
            this.dailyOldData=[];
            this.loading=true;
        },
        submitExport(){
            this.tabForms.inventoryDate=this.dateSwitch(this.tabForms.inventoryDate);
            this.tabForms.startDate=this.dateSwitch(this.tabForms.startDate);
            this.tabForms.endDate=this.dateSwitch(this.tabForms.endDate);
            utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/list/export-available');
        }
    }
}
</script>
<style lang='less'>
     .optional-table-list{
            padding-bottom:77px; 
            margin-top: 30px;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .spin-position-fix {
                position: relative;
                .ivu-spin-fix{
                    height: 50px;
                    bottom:60px;
                    background-color:transparent;
                }
            }
            .list-footer{
                padding:20px 0 20px 0;
                position: absolute;
                bottom: 0px;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                    padding-right:5px;
                }
            }
            .statusClass{
                .ivu-table-cell{
                    padding:0 5px;
                }
            }
            .daily-here-date{
                .ivu-table-cell{
                    padding:0 10px;
                }
            }
            .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
        }
</style>
