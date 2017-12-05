<style lang="less">
.g-bill{
 .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
        .u-high-search{
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
<div class="g-bill">
    <sectionTitle label="已出账单管理"></sectionTitle>
    <div class="u-search" >
        <Button type="primary">批量结算</Button>
        <span class="u-high-search" @click="showSearch"></span>   
    </div>
    <div class="u-table">
        <Table  :columns="columns1" :data="billList"></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="pageSize" show-total show-elevator></Page>
            </div>
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
        v-model="openSettle"
        title="结账提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
       <settleAccounts> </settleAccounts>
    </Modal>
    <Modal
        v-model="openAntiSettle"
        title="反结账提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
       <antiSettlement> </antiSettlement>
    </Modal>
</div>
</template>


<script>
import HighSearch from './billHighSearch';
import settleAccounts from './settleAccounts';
import antiSettlement from './antiSettlement';
import dateUtils from 'vue-dateutils';
import sectionTitle from '~/components/sectionTitle.vue';

    export default {
        name: 'Bill',
        components:{
            HighSearch,
            settleAccounts,
            antiSettlement,
            sectionTitle
        },
        data () {
            return {
                pageSize:1,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                columns1: [
                    {
                        title: '账单编号',
                        key: 'billNo',
                        align:'center',
                        width:160
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                        width:100
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        width:100
                    },
                    {
                        title: '账单类型',
                        key: 'billType',
                        align:'center',
                        width:110,
                        render(h, obj){
                            if(obj.row.billType==='MEETING'){
                                return '会议室账单';
                            }else if(obj.row.billType==='PRINT'){
                                return '打印服务账单 ';
                            }else if(obj.row.billType==='CONTRACT'){
                                return '工位服务订单';
                            }
                        }
                    },
                    {
                        title: '账单金额',
                        key: 'amount',
                        align:'center'
                    },
                    {
                        title: '结账金额',
                        key: 'payAmount',
                        align:'center'
                    },
                    {
                        title: '付款截止日期',
                        key: 'billEndTime',
                        align:'center',
                        width:110,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            return time;
                        }
                    },
                    {
                        title: '账单状态',
                        key: 'billStatus',
                        align:'center',
                        render(h, obj){
                                if(obj.row.payStatus==='WAIT'){
                                    return <span class="u-txt-red">待付款</span>;
                                }else if(obj.row.payStatus==='PAID'){
                                    return <span class="u-txt">已付款</span>;
                                }else if(obj.row.payStatus==='PAYMENT'){
                                    return <span class="u-txt-orange">未付清</span>;
                                }
                            }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:170,
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
                                            this.showSettle(params.row)
                                        }
                                    }
                                }, '结账'),
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
                                            this.showAntiSettle(params.row)
                                        }
                                    }
                                }, '反结账')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.billList=[
			{
				billNo:'HYSZD201712010001',
				billType:'MEETING',
				billStartTime:1511404234000,
				billEndTime:1511063377000,
                payStatus:'WAIT',
                customerName:'绝地反',
                communityName:'创业大街社区',
                amount:'￥200',
                payAmount:'￥100'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'PRINT',
				billStartTime:1509372919000,
				billEndTime:1509372919000,
				payStatus:'PAID',
                customerName:'绝地反击和',
                communityName:'创业大街',
                amount:'￥200',
                payAmount:'￥100'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'CONTRACT',
				billStartTime:1505704034000,
				billEndTime:1505704034000,
				payStatus:'PAYMENT',
                customerName:'绝地反击和',
                communityName:'创业大街',
                amount:'￥200',
                payAmount:'￥100'
			}
		]
           
           
            
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(params){
                 location.href=`./list/billDetail/${params.orderId}`;
            },
            showSettle (params) {
                this.openSettle=true;
                
            },
            showAntiSettle(params){
                this.openAntiSettle=true;
            },
            onExport(){
                 console.log('导出')
            },
           
        }

    }
</script>