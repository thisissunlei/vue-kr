<template>
  <div class="optional-inventory"> 
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='optional'
    />
    <div class='daily-tab'>
        <Discount 
           @countChange="countChange"
           identify='optional'
        />
        <Tabs value="dailyList" :animated="false">
                <Tab-pane label="以列表方式展示" name="dailyList">   
                     <div class="daily-table" id="optional-inventory-table-list">
                        <Table :loading="loading" border stripe :columns="columns" :data="dailyOldData">
                            <div slot="loading">
                               <Loading/>
                            </div> 
                        </Table>
                        <SlotHead v-if="theHead" indentify="optional"/>
                        <div class='spin-position-fix' v-if="spinLoading">
                            <Spin fix size="large"></Spin>
                        </div>
                        <div  :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:width+'px'}">
                                <div style="display:inline-block;">
                                    <Button type='primary' @click='submitStatistical' style="margin-right:10px;">统计</Button>
                                    <Button type='primary' @click='submitExport'>导出(共{{totalCount}}条)</Button>
                                </div>
                        </div>
                    </div>
                </Tab-pane>

                <Tab-pane label="以时间轴方式展示" name="dailyTime" disabled>
                    
                </Tab-pane>
        </Tabs> 
    </div>

    <Modal
        v-model="openStatistical"
        title="统计信息"
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

import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import KrField from '~/components/KrField';
import SearchForm from '../searchForm';
import Statistical from '../statistical';
import Discount from '../discount';
import Loading from '~/components/Loading';
import SlotHead from '../slotHead';
import publicFn from '../publicFn';
var layoutScrollHeight=0;
    export default {
        name: 'Daily',
        components:{
            Message,
            KrField,
            SearchForm,
            Statistical,
            Discount,
            Loading,
            SlotHead
        },
        data () {
            return {   
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

                tabForms:{},
                totalCount:0,
                dailyData:[],
                dailyOldData:[],
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
                            return <span>{ren}</span>
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
            var dom=document.getElementById('layout-content-main');
            var dailyTableDom=document.getElementById('optional-inventory-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            dom.addEventListener("scroll",this.onScrollListener);
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
           } 
        },
        methods:{
            initData(formItem){
                this.tabForms=Object.assign({},formItem,{page:1,pageSize:100});
                delete this.tabForms.inventoryDate;
                this.getTableData(this.tabForms); 
            },
            //获取列表数据
            getTableData(values){
                var params=Object.assign({},values);
                params.startDate=this.dateSwitch(params.startDate);
                params.endDate=this.dateSwitch(params.endDate);
                this.$http.get('getOptionalInventory', params).then((res)=>{
                    this.dailyData=res.data.items;
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
                return data?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data)):'';
            },
            //获取统计数据
            getStatistal(){
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
                    this.spinLoading=true;
                    this.tabForms.page=Number(this.tabForms.page)+1;
                    this.getTableData(this.tabForms);
                }
            },
            //提取公共
            getCommonParam(formItem){
                this.tabForms.page=1;
                this.dailyOldData=[];
                this.loading=true;
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.getCommonParam();
                console.log('tab[[',this.tabForms);
                this.getTableData(this.tabForms);
            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.getCommonParam();
                this.getTableData(this.tabForms);
            },
            submitExport(){
                this.tabForms.startDate=this.dateSwitch(this.tabForms.startDate);
                this.tabForms.endDate=this.dateSwitch(this.tabForms.endDate);
                utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/list/export-available');
            },
            //折扣价
            countChange(param){
                this.getCommonParam();
                this.tabForms.discount=param;
                localStorage.setItem('optional-inventory-discount',param);
                this.getTableData(this.tabForms);
            }
        }
    }
</script>

<style lang="less">
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
}
.optional-inventory{
    .daily-tab{
        position: relative;
        padding: 0 20px;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f6f6f6;
        }
        .daily-table{
            padding-bottom:77px; 
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
        }
    }
}

</style>
