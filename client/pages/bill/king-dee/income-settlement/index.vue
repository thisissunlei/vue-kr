<template>
    <div class="attract-investment">
        <SectionTitle title="应收数据统计"/>
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
            />
        </div>
        <!-- <SlotHead :class="theHead?'header-here':'header-no'"/> -->
        <div style="margin:0 20px;" class="overdue-no-table">
           
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
                 <div style="float: left;">
                     <Button type="primary" @click="exportTable">导出</Button>
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
                pageSize:20
            },
            theHead:false,
            sideBar:true,
            loading:false,
            left:'',
            width:'',
            totalCount:0,
            attractColumns:[
                {
                    title: '主体',
                    key: 'corporationName',
                    align:'center',
                },
                {
                    title: '主体性质',
                    key: 'taxNatureDesc', 
                    align:'center'
                },
                {
                    title: '社区',
                    key: 'communityName',
                    align:'center'
                },
                {
                    title: '客户',
                    key: 'customerName',
                    align:'center',
                },
                {
                    title: '收款类型',
                    key: 'recBillTypeDesc',
                    align:'center'
                },
                {
                    title: '税率',
                    key: 'taxRate',
                    align:'center'
                },
                {
                    title: '金额(含税)',
                    key: 'arAmount',
                    align:'center',
                    render(h, params){
                        return h('span', {}, utils.thousand(params.row.arAmount))
                       
                    }
                },
                 {
                    title: '税额',
                    key: 'taxAmount',
                    align:'center'
                },
                 {
                    title: '金额(不含税)',
                    key: 'amount', 
                    align:'center',
                    render(h, params){
                        return h('span', {}, utils.thousand(params.row.amount))
                       
                    }
                },
                {
                    title: '月份',
                    key: 'bizDate',
                    align:'center',
                    render(tag, params){
                        let time=params.row.bizDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.bizDate)):'-';
                        return tag('span',time)
                    }
                },
               
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
        });
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
        // 导出
        exportTable() {
        utils.commonExport({},'/api/sync/listIncomeStatisticExport');
      },
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
         formItem.pageSize=20;
         this.tabForms=Object.assign({},formItem);
         this.getListData(this.tabForms);
      },

      // 获取数据 
      getListData(params){
           this.loading=true;
           let param = Object.assign({},params);
            if(!param.startTime){
                delete param.startTime;
                delete param.endTime;
            }else{
                param.startTime = dateUtils.dateToStr("YYYY-MM-DD",new Date( param.startTime ));
                param.endTime = dateUtils.dateToStr("YYYY-MM-DD",new Date(param.endTime));
            }
           this.$http.get('get-sync-prepaid-settlement', param).then((response)=>{
                this.totalCount=response.data.total;
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
        // let dateArray=['startDate','endDate'];

        //  dateArray.map((item,index)=>{
        //     this.tabForms[item]=utils.dateCompatible(this.tabForms[item])
        //  })
        // this.$router.replace({path:'/inventory/overdue-no-operation',query:this.tabForms});
        this.getListData(this.tabForms);
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
