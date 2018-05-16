<template>
    <div class="attract-investment">
        <div class="attract-search">
            <SearchForm 
              @searchClick="searchClick"
              @clearClick="clearClick"
              @initData="initData"
            />
        </div>
        <SlotHead :class="theHead?'header-here':'header-no'"/>
        <div style="margin:0 20px;" class="attract-investment-table">
            <Table :loading="loading" :columns="attractColumns" :data="attractData" border>
                 <div slot="loading">
                    <Loading/>
                 </div>
            </Table>
        </div>
        <div  class='list-footer'>
                <Buttons label='导出'  type='primary' @click='submitExport' checkAction='seat_order_in_export'/>
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
import SearchForm from '../publicPage';
import Message from '~/components/Message';
import Buttons from '~/components/Buttons';
import utils from '~/plugins/utils';
import publicFn from '../publicFn';
import SlotHead from '../fixHead/attract-head';

export default {
    components:{
       Loading,
       SearchForm,
       Message,
       Buttons,
       SlotHead
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
                    title: '商品名称',
                    key: 'name',
                    align:'center',
                },
                {
                    title: '商品类型',
                    key: 'type',
                    align:'center',
                    width:100,
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align:'center',
                    width:60,
                },
                {
                    title: '商品定价',
                    key: 'quotedPrice',
                    align:'center',
                    width:90,
                },
                {
                    title: '招商状态',
                    key: 'investmentStatusName',
                    align:'center',
                    width:90,
                },
                {
                    title: '签约价',
                    key: 'orderList',
                    className:'current-range',
                    width:90,
                    align:'center',
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'price')
                    }
                },
                {
                    title: '折扣',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    width:60,
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'discount')
                    }
                },
                {
                    title: '合同开始',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    width:100,
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'recentStart',true)
                    }
                },
                {
                    title: '合同结束',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    width:100,
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'recentEnd',true)
                    }
                },
                {
                    title: '租期',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    width:90,
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'rentTime')
                    }
                },
                {
                    title: '渠道来源',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    render(h,obj){
                         return publicFn.mergeCell(h,obj.row.orderList,'sourceName')
                    }
                },
                {
                    title: '销售员',
                    key: 'orderList',
                    className:'current-range',
                    width:100,
                    align:'center',
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'sellerName')
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
        var dailyTableDom=document.querySelectorAll('div.attract-investment-table')[0];
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
            var headDom=document.querySelectorAll('div.slot-head-attract-investment')[0];
            if(headDom){
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
            }
            if(dom.scrollTop>330){
                this.theHead=true;
            }else{
                this.theHead=false;
            }
      },
      initData(formItem){
         this.tabForms=Object.assign({},formItem,this.tabForms);
         this.attractData=[
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","orderList":[
                {
                    "discount":"测试内容l3o5","price":16380,"recentEnd":"测试内容5647","recentStart":"测试内容6h3q","rentTime":"测试内容v54r","sellerName":"测试内容o4vx","sourceName":"测试内容585t"
                },
                {
                    "discount":"测试内容l3o5","price":16380,"recentEnd":"测试内容5647","recentStart":"测试内容6h3q","rentTime":"测试内容v54r","sellerName":"测试内容o4vx","sourceName":"测试内容585t"
                }
                ],"quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            },
            {
                "capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"investmentStatusName":"测试内容n21u","name":"测试内容1kud","quotedPrice":"测试内容0qi2","type":"测试内容63t9"
            }
        ]
        //this.getListData(this.tabForms);
      },
      getListData(params){
           this.loading=true;
           this.$http.get('community-investment-list', params).then((response)=>{
                this.totalCount=response.data.totalCount;
                this.attractData=response.data.items;
                this.loading=false;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
      },
      searchClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
      },
      clearClick(values){
         this.tabForms=Object.assign({},this.tabForms,values);
         this.getListData(this.tabForms); 
      },
      submitExport(){
          utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/list/export');
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
        .current-range{
            .ivu-table-cell{ 
                .ivu-tooltip{
                    .row-current-more{
                        padding: 15px 0 10px 0;
                    }
                    .noBorder{
                        border-bottom:none;
                    }
                }
            }
            .ivu-table-cell > div{
                    border-bottom:solid 1px #e9eaec;
                    &:last-child{
                        border-bottom:none;
                    }
                }
            .current-more-task{
                width:100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .table-null{
                line-height: 47px;
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
