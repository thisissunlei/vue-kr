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
}
</style>

<template>
<div class="g-bill">
    <sectionTitle label="收入管理"></sectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="showIncome">挂收入</Button>
        <span class="u-high-search" @click="showSearch"></span>   
    </div>
    <div class="u-table">
        <Table  border :columns="columns1" :data="billList" @on-select="onSelectList" ></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button type="primary" @click="onExport">导出</Button>
            <div style="float: right;">
                <Page :total="pageSize" show-total show-elevator></Page>
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
        v-model="openIncome"
        title="挂收入"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <AddIncome></AddIncome>
    </Modal>
    
</div>
</template>


<script>
import HighSearch from './highSearch';
import dateUtils from 'vue-dateutils';
import sectionTitle from '~/components/sectionTitle';
import AddIncome from './addIncome';
    export default {
        name: 'income',
        components:{
            HighSearch,
            sectionTitle,
            AddIncome
        },
        data () {
            return {
                pageSize:1,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                openIncome:false,
                columns1: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '收入编号',
                        key: 'billNo',
                        align:'center',
                        width:160
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                        width:150
                    },
                    {
                        title: '所在社区',
                        key: 'communityName',
                        align:'center',
                        width:150
                    },
                    {
                        title: '含税收入',
                        key: 'payAmount',
                        align:'center'
                    },
                    {
                        title: '收入确认时间',
                        key: 'billEndTime',
                        align:'center',
                        width:110,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            return time;
                        }
                    },
                     {
                        title: '收入类型',
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
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:100,
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
                                }, '查看')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.billList=[
			{
                orderId:'44',
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
                orderId:'45',
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
                orderId:'46',
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
                 //location.href=`./income/detail/${params.orderId}`;
                 location.href='./income/detail/12';
            },
            onExport(){
                 console.log('导出')
            },
            onSelectList(data){
                console.log('date====>>>>>0000',data)
            },
            showIncome(){
               this.openIncome=true;
            }
            
        }

    }
</script>