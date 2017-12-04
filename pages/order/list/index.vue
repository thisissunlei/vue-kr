<style lang="less"> 
    .u-search{
        height:22px;
        margin:16px 20px;
        span{
            width:22px;
            height:22px;
            background:url(./../images/upperSearch.png) no-repeat center;
            background-size: contain;  
            float:right;
        }
        

    }
    .u-cancel-title{
        width:85%;
        margin:10px auto;
        font-size:14px;
        text-indent: 28px;
    }
   
</style>
<template>
<div class="order">
    <div class="u-search" @click="showSearch">
        <span></span>   
    </div>
    <Table  :columns="columns1" :data="data1"></Table>
    <div style="margin: 10px;overflow: hidden">
        <Button type="primary">导出</Button>
        <div style="float: right;">
            <Page :total="pageSize" show-total show-elevator></Page>
        </div>
    </div>
     <Modal
        v-model="openSearch"
        title="高级搜索"
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
import axios from '../../../plugins/http.js';
import HighSearch from './orderHighSearch';
    export default {
        name: 'Meeting',
        components:{
            HighSearch,
        },
        data () {
            return {
                pageSize:1,
                openSearch:false,
                openCancel:false,
                columns1: [
                    {
                        title: '订单编号',
                        key: 'number',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '订单总额',
                        key: 'amount',
                        align:'center'
                    },
                    {
                        title: '订单生成时间',
                        key: 'date',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'orderstatus',
                        align:'center'
                    },
                    {
                        title: '支付状态',
                        key: 'pay',
                        align:'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
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
                                            this.openView(params
                                            )
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
                                            this.cancel(params)
                                        }
                                    }
                                }, '作废')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.data1=[
                    {
                        number: 18,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    }
                ]
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(){

            },
            cancel (params) {
                this.openCancel=true;
                this.itemDetail=params.row;
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
               
            }
           
        }

    }
</script>