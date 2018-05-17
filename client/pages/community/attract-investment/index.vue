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
            <div style="margin-bottom:10px;margin-top:-10px;font-size:12px;">
                <div style="display:inline-block;margin-right:100px;">
                    <div>已招商:60天内的库存状态有在租的</div>
                    <div>未招商:60天内的库存状态全都是未租的</div>
                    <div>60天:从社区开业日期算起，如已开业则从今天算起</div>
                </div>
                <div style="display:inline-block;vertical-align:top;">
                    <div>招商中:60天内的库存中没有在租的,但有合同未生效的</div>
                    <div>不可招商:60天内的库存中有不可用的,同时没有是在租或合同未生效的</div>
                </div>
            </div>
            <Table :loading="loading" stripe :columns="attractColumns" :data="attractData" border>
                 <div slot="loading">
                    <Loading/>
                 </div>
            </Table>
        </div>
        <div  class='list-footer'>
                <Button type="primary" @click='submitExport'>导出</Button>
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
import utils from '~/plugins/utils';
import publicFn from '../publicFn';
import SlotHead from '../fixHead/attract-head';

export default {
    components:{
       Loading,
       SearchForm,
       Message,
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
                    align:'right',
                    width:90
                },
                {
                    title: '招商状态',
                    key: 'investmentStatusName',
                    align:'center',
                    width:90,
                    render(tag, params){
                        var ren=params.row.investmentStatusName?params.row.investmentStatusName:'-'
                        return <span style={params.row.investmentStatus=='AVAILABLE'?'color:red':''}>{ren}</span>
                    }
                },
                {
                    title: '签约价',
                    key: 'orderList',
                    className:'current-range',
                    width:90,
                    align:'right',
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
                        return publicFn.mergeCell(h,obj.row.orderList,'startDate',true)
                    }
                },
                {
                    title: '合同结束',
                    key: 'orderList',
                    className:'current-range',
                    align:'center',
                    width:100,
                    render(h,obj){
                        return publicFn.mergeCell(h,obj.row.orderList,'endDate',true)
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
         this.getListData(this.tabForms);
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
          utils.commonExport(this.tabForms,'/api/krspace-finance-web/inventory/cmt-investment/list/export');
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
        .attract-investment-table{
            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
                background-color: #f6f6f6;
            }
        }
     }
</style>
