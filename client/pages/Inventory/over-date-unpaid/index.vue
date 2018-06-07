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
        <!-- <div  :class="theEnd?'list-footer':'on-export-middle'" :style="{left:theEnd?0:left+'px',width:width+'px'}">
            <div style="display:inline-block;">
                <Button type='primary' @click='submitExport'>导出(共{{totalCount}}条)</Button>
            </div>
        </div> -->
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
        bizType: 'EnterField',
        components:{
            SearchForm,
            SlotHead,
            Message,
            ToolTip,
            Loading
        },
        head() {
            return {
                title: '逾期未付'
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
                        title: '账单类型-ID',
                        key: 'bizTypeName',
                        width:150,
                        align:'center',
                        render:(h, obj)=>{
                            return h('div', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    color:'#499df1',
                                        cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.showDetail(obj.row)
                                    }
                                }
                            },obj.row.bizTypeName+'-'+obj.row.billId);
                        }
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                    },
                                       {
                        title: '账单明细',
                        align:'center',
                        key: 'billServiceDetail',
                        render(h, params){
                        var moneyDetail=params.row.bizType=='CONTRACT'?params.row.billServiceDetail:params.row.remark;
                        var moneyDetailTitle=params.row.bizType=='CONTRACT'?params.row.serviceStartDate+'至'+params.row.serviceEndDate+'的服务费:':'';
                        return h('div', [
                                    h('Tooltip', {
                                        props: {
                                            placement: 'top',
                                            content:moneyDetailTitle+moneyDetail
                                        }
                                    }, [
                                    h('div', [
                                        h('div',{
                                        },moneyDetailTitle),
                                        h('div',{
                                            style:{
                                                textOverflow:'ellipsis',
                                                whiteSpace:'nowrap',
                                                overflow: 'hidden'
                                            }
                                        },moneyDetail),
                                    ])
                                ])
                        ])
                    }
                    },
                    {
                        title: '最晚付款日',
                        align:'center',
                        width:110,
                        key: 'lastPayDate',
                    },
                    {
                        title: '账单金额',
                        align:'right',
                        className:'statusClass',
                        width:100,
                        key: 'payableAmount',
                         render(tag,params){ 
                          var end='';      
                          if(params.row.payableAmount){
                             var parent=(''+params.row.payableAmount/100).split('.');
                             var first=utils.thousand(parent[0]);
                             var second=parent.length>1?parent[1]:'00';
                             end=first+'.'+second;
                          }else{
                             end='-';
                          }
                          return <span >{'¥'+end}</span>;
                        }
                       
                    },
                    {
                        title: '欠款金额',
                        align:'right',
                        className:'statusClass',
                        width:100,
                        key: 'debt',
                         render(tag,params){ 
                          var end='';      
                          if(params.row.debt){
                             var parent=(''+params.row.debt/100).split('.');
                             var first=utils.thousand(parent[0]);
                             var second=parent.length>1?parent[1]:'00';
                             end=first+'.'+second;
                          }else{
                             end='-';
                          }
                          return <span  style='color:red'>{'¥'+end}</span>;
                        }
                    },
                    {
                        title: '逾期时长(最晚付款日起)',
                        align:'center',
                        width:200,
                        key: 'overdueDays',
                        render(tag,params){ 
                          var money=params.row.overdueDays?utils.thousand(params.row.overdueDays):params.row.overdueDays;                  
                          return <span style='color:red'>{money+'天'}</span>;
                        }
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
             showDetail(params){
                window.open(`../../bill/list/detail/${params.billId}`,'_blank')
            },
            getCommonParam(){
                this.tabForms.page=1;
                this.dailyOldData=[];
                this.loading=true;
            },
             //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.endParams=Object.assign({},this.tabForms);
                utils.addParams(this.tabForms);
            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},formItem);
                this.endParams=Object.assign({},this.tabForms);
                utils.addParams(this.tabForms);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            dataParams(data){
                this.endParams=Object.assign({},data);
            },
             //格式转换
            dateSwitch(data){
                if(data){
                    return utils.dateCompatible(data);
                }else{
                    return '';
                }
            },
            getData(params){
                params.serviceDateBegin=this.dateSwitch(params.serviceDateBegin);
                params.serviceDateEnd=this.dateSwitch(params.serviceDateEnd);
                this.$http.get('Overduelist', params).then((res)=>{

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
                if(dom.scrollTop>200){
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


