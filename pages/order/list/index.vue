<style lang="less"> 
.g-order{
  .u-search{
        height:22px;
        margin:16px 20px;
        span{
            width:22px;
            height:22px;
            background:url('~/assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
        }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .u-cancel-title{
        width:85%;
        margin:10px auto;
        font-size:14px;
        text-indent: 28px;
    }
    .u-txt-red{
	    color:#FF6868;
	}
    .u-txt{
        color:#666;
    }
    .u-txt-orange{
        color: #F5A623;
    }
}   
</style>
<template>
<div class="g-order">
    <sectionTitle label="会议室订单管理"></sectionTitle>
    <div class="u-search" >
        <span @click="showSearch"></span>   
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" page-size="15" @on-change="changePage" show-total show-elevator></Page>
            </div>
        </div>
    </div>
    
    
     <Modal
        v-model="openSearch"
        title="高级查询"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <HighSearch></HighSearch>
    </Modal>
    <Modal
        v-model="openCancel"
        title="提示信息"
        ok-text="确定"
        cancel-text="取消"
        width="490"
        @on-ok="orderCancel"
     >
        <div class="u-cancel-title">
             距离会议室预订开始时间还有X小时X分钟，此次作废订单需要承担x%手续费，确定要作废此订单吗？
        </div>
    </Modal>
</div>
</template>


<script>
import axios from '~/plugins/http.js';
import HighSearch from './highSearch';
import sectionTitle from '~/components/sectionTitle';
import dateUtils from 'vue-dateutils';


export default {
        name: 'Meeting',
        components:{
            HighSearch,
            sectionTitle
        },
        data () {
            return {
                openSearch:false,
                openCancel:false,
                tableData:this.getTableData(),
                totalCount:1,
                params:{
                    page:1,
                    pageSize:15
                },
                columns: [
                    {
                        title: '订单编号',
                        key: 'orderNo',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '订单总额',
                        key: 'totalAmount',
                        align:'center'
                    },
                    {
                        title: '订单生成时间',
                        key: 'createTime',
                        align:'center',
                        width:160,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.createTime));
                            return time;
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderstatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.orderStatus==='VALID'){
                                return <span class="u-txt">已生效</span>;
                            }else if(obj.row.orderStatus==='CANCEL'){
                                return <span class="u-txt-orange">已作废</span>;
                            }else if(obj.row.orderStatus==='REFUND'){
                                return <span class="u-txt-red">已退订</span>;
                            }
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                                if(obj.row.payStatus==='WAIT'){
                                    return <span class="u-txt-red">待付款</span>;
                                }else if(obj.row.payStatus==='PAID'){
                                    return <span class="u-txt">已付款</span>;
                                }
                            }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:120,
                        render:(h,params)=>{
                           return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openView(params.row)
                                            
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.cancel(params.row)
                                                
                                                
                                        }
                                    }
                                }, '作废')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(params){
                
                location.href=`./list/detail/${params.orderId}`;
                //location.href=`./list/detail/12`
            },
            cancel (params) {
                this.openCancel=true;
                this.itemDetail=params;
            },
            orderCancel(){
            let itemDetail=this.itemDetail;
            let  params={
                    orderId:itemDetail.orderId
                }
                axios.get('cancel-order', params, r => {
                    console.log('r', r);
                
                }, e => {
                    console.log('error',e)
                })
               
            },
            onExport(){
                 console.log('导出')
            },
            getTableData(index){
                let data = [];
                let params=this.params;
                var _this=this;
                axios.get('order-list', params, r => {
                    console.log('r', r);
                    data=r.data;
                    _this.totalCount=r.data.totalCount;
                }, e => {
                    console.log('error',e)
                })
                  
                return data;
            },
            changePage (index) {
                this.tableData = this.getTableData(index);
            }

        }

    }
</script>