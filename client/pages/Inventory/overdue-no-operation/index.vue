<template>
    <div class="attract-investment">
        <SectionTitle title="合同逾期未操作"/>
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
            />
        </div>
        <SlotHead :class="theHead?'header-here':'header-no'"/>
        <div style="margin:0 20px;" class="overdue-no-table">
            <div style="margin-bottom:10px;margin-top:-10px;font-size:12px;">
                <div style="display:inline-block;margin-right:100px;">
                    <div>已经过了服务开始日但是仍未生效或作废的合同</div>
                </div>
            </div>
            <Table :loading="loading" stripe :columns="attractColumns" :data="attractData" border>
                 <div slot="loading">
                    <Loading/>
                 </div>
            </Table>
        </div>
        <div  class='list-footer'>
                <!-- <Buttons  type="primary"  label="导出"  checkAction='cmt_investment_excel' @click="submitExport"/> -->
                <div style="float: right;">
                    <Page :total="totalCount" :page-size='tabForms.pageSize' show-total show-elevator @on-change="onPageChange"/>
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
import Loading from '~/components/Loading';
import SearchForm from './search-form';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import SlotHead from './fix-head';
import Buttons from '~/components/Buttons';
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';

export default {
    components:{
       Loading,
       SearchForm,
       Message,
       SlotHead,
       Buttons,
       SectionTitle
    },
    data() {
        return{
            warn:'',
            MessageType:'',
            openMessage:false,
            tabForms:{
                page:1,
                pageSize:100
            },
            theHead:false,
            sideBar:true,
            loading:false,
            left:'',
            width:'',
            totalCount:0,
            attractColumns:[
                {
                    title: '合同编号',
                    key: 'serialNumber',
                    align:'center',
                    render:(tag, params)=>{
                        let time=params.row.serialNumber;
                        let checkAction=params.row.hasAuth;
                        if(!checkAction){
                            return tag('span','*****')
                        }else{
                            return tag('span',{
                                    style:{
                                        color:'#499df1',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.jumpView(params.row)
                                        }
                                    }
                            },time)
                        }
                    }
                },
                {
                    title: '客户名称',
                    key: 'customerName',
                    align:'center'
                },
                {
                    title: '合同类型',
                    key: 'contractType',
                    align:'center',
                    width:100,
                },
                {
                    title: '销售员',
                    key: 'salerName',
                    align:'center',
                    width:80
                },
                {
                    title: '服务开始日',
                    key: 'startDate',
                    align:'center',
                    width:110,
                    render(tag, params){
                        let time=params.row.startDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate)):'-';
                        return tag('span',time)
                    }
                },
                {
                    title: '首付款金额',
                    key: 'firstServiceFee',
                    align:'right',
                    width:90,
                },
                {
                    title: '首付款欠款情况',
                    key: 'firstServiceFeeDebt',
                    align:'right',
                    width:100,
                    render(tag, params){
                        let file=params.row.contractPayStatus;
                        let fileName=params.row.contractPayStatusName;
                        return tag('span',{
                            style:{
                                color:file=='PAID_OFF'?'':'red'
                            }
                        },fileName)
                    }
                },
                {
                    title: '是否上传附件',
                    key: 'haveAttachmentName',
                    align:'center',
                    width:100,
                    render(tag, params){
                        let file=params.row.haveAttachmentName;
                        return tag('span',{
                            style:{
                                color:file=='否'?'red':''
                            }
                        },file)
                    }
                },
                {
                    title: '逾期时长(服务开始日起)',
                    key: 'overDays',
                    align:'center',
                    width:135,
                    render(tag, params){
                        let file=params.row.overDays;
                        let end=file?file+'天':'-';
                        return tag('span',{
                            style:{
                                color:file?'red':''
                            }
                        },end)
                    }
                }
            ],
            attractData:[]    
        }
    },
    mounted(){
        var dom=document.getElementById('layout-content-main');
        dom.addEventListener("scroll",this.onScrollListener);
        window.addEventListener('resize',this.onResize);  
        this.tableCommon();
        var _this=this;
        LISTENSIDEBAROPEN(function (params) {
            _this.sideBar=params;
        })
    },
    watch:{
        sideBar:function(val){
            this.tableCommon();
            this.onScrollListener();
        }
    },
    destroyed(){
        var dom=document.getElementById('layout-content-main');
        dom.removeEventListener("scroll",this.onScrollListener);
        window.removeEventListener('resize',this.onResize); 
    },
    methods:{
      tableCommon(){
        var dailyTableDom=document.querySelectorAll('div.overdue-no-table')[0];
        if(dailyTableDom){
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
        }  
      },
      onResize(){
            this.tableCommon();
            this.onScrollListener();
      },
      //滚动监听
      onScrollListener(){            
            var dom=document.getElementById('layout-content-main');
            var headDom=document.querySelectorAll('div.slot-head-overdue-nooperation')[0];
            if(headDom){
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
            }
            if(dom.scrollTop>420){
                this.theHead=true;
            }else{
                this.theHead=false;
            }
      },
      initData(formItem){
         formItem.page=1;
         formItem.pageSize=100;
         this.tabForms=Object.assign({},formItem);
         this.getListData(this.tabForms);
      },
      getListData(params){
           this.loading=true;
           this.$http.get('contract-no-operation', params).then((response)=>{
                this.totalCount=response.data.totalCount;
                this.attractData=response.data.items;
                this.loading=false;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
      },
      commonUtileParams(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         let dateArray=['startDate','endDate'];
         dateArray.map((item,index)=>{
            this.tabForms[item]=utils.dateCompatible(this.tabForms[item])
         })
         this.$router.replace({path:'/inventory/overdue-no-operation',query:this.tabForms});
      },
      searchClick(values){
          this.commonUtileParams(values);
      },
      clearClick(values){
          this.commonUtileParams(values);
      },
      jumpView(params){
         window.open(`/order-center/contract-manage/contract-list/list?serialNumber=${params.serialNumber}`,'_blank')
      },
      onPageChange(page){
         this.tabForms.page=page;
         this.getListData(this.tabForms); 
      },
      onMessageChange(data){
        this.openMessage=data;
      }
    }
}
</script>

<style lang='less'>
     .attract-investment{
         .attract-search{
             border-bottom:solid 1px #dddee1;
             margin-bottom:20px;
         }
         .list-footer{
            margin: 10px 20px;
            overflow: hidden;
        }
        .ivu-table-cell{ 
            padding:0;
        }
        .header-here{
            opacity:1;
        }
        .header-no{
            transition: opacity 0.2 ease;
            opacity: 0;
        }
        .overdue-no-table{
            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
                background-color: #f6f6f6;
            }
        }
     }
</style>
