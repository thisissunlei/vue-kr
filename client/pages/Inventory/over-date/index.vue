<template>
  <div class="enter-filed"> 
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='enter-filed-table' id="daily-inventory-table-list">
        <span class="line"></span>
        <Table :loading="loading" border stripe :columns="columns" :data="dailyOldData">            
            <div slot="loading">
                    <Loading/>
            </div> 
        </Table>
        <SlotHead :class="theHead?'header-here':'header-no'" indentify="daily"/>
        <div class='spin-position-fix' v-if="spinLoading">
            <Spin fix size="large"></Spin>
        </div>
        <div  :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:width+'px'}">
            <div style="display:inline-block;">
                <Button type='primary' @click='submitExport'>导出(共{{totalCount}}条)</Button>
            </div>
        </div>
    </div>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onMessageChange"
    />

  </div>
</template>


<script>
import ToolTip from '~/components/ToolTip';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from './searchForm';
import Message from '~/components/Message';
import SlotHead from './slotHead';
import Loading from '~/components/Loading';
var layoutScrollHeight=0;
    export default {
        name: 'EnterField',
        components:{
            SearchForm,
            SlotHead,
            Message,
            ToolTip,
            Loading
        },
        head() {
            return {
                title: '即将到期'
            }
        },
        data () {
            return {  
                dailyOldData:[],
                totalCount:'',
                loading:true,
                spinLoading:false,
                tabsValue:'dailyList', 
                theHead:false,
                theEnd:true,
                sideBar:true,
                left:'',
                width:'',


                tabForms:{
                    page:1,
                    pageSize:100,
                },
                endParams:{},
                tableList:[],
                columns:[
                    {
                        title: '商品',
                        key: 'name',
                        align:'center',
                        render(h, params){
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
                        width:110,
                        align:'center',
                    },
                    {
                        title: '工位数量',
                        key: 'capacity',
                        width:80,
                        align:'center',
                    },
                    {
                        title: '进场日',
                        align:'center',
                        width:80,
                        key: 'startDate',
                    },
                    {
                        title: '离场日',
                        align:'center',
                        width:80,
                        key: 'endDate',
                    },
                    {
                        title: '租期',
                        align:'center',
                        width:80,
                        key: 'rentDays',
                        render(h, params){
                            if(params.row.rentDays<30){
                                return h('div', [
                                        h('div', [
                                            h('span', { 
                                                style: {
                                                    color:'#FF6868'
                                                }       
                                            }, params.row.rentDays),
                                            h('span', { 
                                                style: {
                                                    color:'#333'
                                                }       
                                            }, '天'),
                                        ])
                            ])
                            }else{ 
                               return h('div', [
                                        h('div', {slot:'zu'},[
                                            h('span', { 
                                                style: {
                                                    color:'#333'
                                                }       
                                            }, params.row.rentDays),
                                            h('span', { 
                                                style: {
                                                    color:'#333'
                                                }       
                                            }, '天'),
                                        ])
                            ])
                            }

                            
                                        
                        }
                    },
                    {
                        title: '当前签约价',
                        align:'right',
                        width:100,
                        key: 'price',
                    },
                    {
                        title: '当前客户',
                        align:'center',
                        width:110,
                        key: 'customerName',
                    },
                    {
                        title: '客户当前在租工位数',
                        align:'center',
                        width:80,
                        key: 'customerStatoons',
                    },
                    {
                        title: '随后可续时段',
                        align:'center',
                        width:80,
                        key: 'reletTypeName',
                        render(h, params){
                            if(!params.row.reletTypeName){
                                return params.row.reletTypeName
                            }

                            if(params.row.reletTypeName.indexOf('不可续租')!=-1){
                                return h('div', [
                                        h('Tooltip', {
                                            props: {
                                                placement: 'top'
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                                style:{
                                                    color:'#FF6868'
                                                }
                                            },'不可续租')
                                        ]),
                                        h('div', {slot:'content'},[
                                            h('p',{
                                            },params.row.reletCustomerName),
                                            h('p',{
                                            },'合同起始日：'+params.row.reletStartDate),
                                            h('p',{
                                            },'合同结束日：'+params.row.reletEndDate),
                                            h('p',{
                                            },'是否生效：'+params.row.reletEffectStatus),
                                            h('p',{
                                            },'签约价：'+params.row.reletPrice),
                                        ]),
                                    ])
                                ])
                            }else if(params.row.reletTypeName.indexOf('可续租时长不限')!=-1){
                                return '可续租时长不限'
                            }else{
                                return h('div', [
                                        h('Tooltip', {
                                            props: {
                                                placement: 'top'
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                                style:{
                                                    color:'#FF6868'
                                                }
                                            },'只可续租至')
                                        ]),
                                        h('div', [
                                            h('div',{
                                                color:'#FF6868'
                                            },params.row.reletStartDate)
                                        ]),
                                        h('div', {slot:'content'},[
                                            h('p',{
                                            },params.row.reletCustomerName),
                                            h('p',{
                                            },'合同起始日：'+params.row.reletStartDate),
                                            h('p',{
                                            },'合同结束日：'+params.row.reletEndDate),
                                            h('p',{
                                            },'是否生效：'+params.row.reletEffectStatus),
                                            h('p',{
                                            },'签约价：'+params.row.reletPrice),
                                        ]),
                                    ])
                                ])
                            }

                            
                                        
                        }

                    },
                    {
                        title: '商品定价',
                        align:'right',
                        width:80,
                        key: 'quotedPrice',
                    },
                ],
                openMessage:false,
                MessageType:'',
                warn:''
            }
        },
        mounted(){
            if(this.tabForms.cityId){
                this.tabForms = this.$route.query;
                this.getCommonParam();
                this.getData(this.tabForms); 
            }   
            var dom=document.getElementById('layout-content-main');
            var dailyTableDom=document.getElementById('daily-inventory-table-list');
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
                var dailyTableDom=document.getElementById('daily-inventory-table-list');
                this.left=dailyTableDom.getBoundingClientRect().left;
                this.width=dailyTableDom.getBoundingClientRect().width;
                this.onScrollListener();
            },
            tabForms:function(val,old){
                this.getCommonParam();
                this.getData(this.tabForms); 
            }
        },
        destroyed(){
            var dom=document.getElementById('layout-content-main');
            dom.removeEventListener("scroll",this.onScrollListener);
            window.removeEventListener('resize',this.onResize); 
        },
        methods:{
            getCommonParam(){
                this.tabForms.page=1;
                this.dailyOldData=[];
                this.loading=true;
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.dataParams(this.tabForms);
                utils.addParams(this.tabForms);

            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.dataParams(this.tabForms);
                utils.addParams(this.tabForms);
            },
            //数据变化
            dataParams(data){
                this.endParams=Object.assign({},data);
                this.getData(this.endParams);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            getData(params){
                //getDailyInventory 
                this.$http.get('getDueList', params).then((res)=>{
                    this.tableList=res.data.items;
                    this.dailyIndentify=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.loading=false;
                    this.spinLoading=false;
                    this.dailyOldData=this.dailyOldData.concat(this.tableList);

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
            submitExport(){
                utils.commonExport(this.tabForms,'/api/krspace-op-web/operation/due/list-excel');
            },
            //滚动监听
        onScrollListener(){            
            var dom=document.getElementById('layout-content-main');
            var headDom=document.getElementById('slot-head-daily-inventory');
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
                if(!this.dailyIndentify.length){
                    return ;
                }
                this.spinLoading=true;
                this.tabForms.page=Number(this.tabForms.page)+1;
                this.getData(this.tabForms);
            }
        },
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
.enter-filed{
    .enter-filed-table{
        position: relative;
        padding: 0 ;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f6f6f6;
        }
        .line{
            display:inline-block;
            width:100%;
            border-top:1px solid #dddee1;
            margin-bottom:20px;
        }
        .daily-table{
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
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 20px;
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
    }
}
     .enter-filed-table{
            padding-bottom:77px; 
            margin:0 20px;
            margin-top: 30px;
            position: relative;
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
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 20px;
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


