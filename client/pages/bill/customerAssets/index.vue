<template>
<div class="customer-assets">
   <SectionTitle title="已出账单管理"></SectionTitle>
        <div style='display:inline-block;float:right;padding-right:20px;top:10px;right:0;position:absolute;'>
            <Input 
                v-model="params.customerName" 
                placeholder="请输入客户名称"
                style="width: 252px"
            />
            <div class='m-search' @click="lowerSubmit">搜索</div>
         </div>
    <div class="u-table">
        <Table  border :columns="columns" ></Table>
    </div>
</div>
</template>

<script>
    import SectionTitle from '~/components/SectionTitle';
    import Buttons from '~/components/Buttons';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            Buttons
        },
        data () {
            return {
            params:{
                customerName:''
            },
            columns: [
                    
                    {
                        title: '账单编号',
                        key: 'billNo',
                        align:'center',
                        width:160,
                        fixed:'left'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                        width:160,
                        fixed:'left'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '消费总额',
                        key: 'totalAmount',
                        align:'center',
                    },
                    {
                        title: '减免金额',
                        key: 'freeAmount',
                        align:'center',
                    },
                    {
                        title: '账单金额',
                        key: 'payableAmount',
                        align:'center',
                    },
                    {
                        title: '已付金额',
                        key: 'paidAmount',
                        align:'center',
                    },
                    {
                        title: '账单日',
                        key: 'billingDate',
                        align:'center',
                        render(h, obj){
                            if(!obj.row.billingDate){
                                return '-'
                            }
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billingDate));
                            return time;
                        }
                    },
                    {
                        title: '付款截止日期',
                        key: 'billEndTime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:90,
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
                                                
                                            }
                                        }
                            }, '查看'),
                         ]);

                        
                        }
                    }
                ]
                
            
        
        
        }
        },
        created(){
            
        },
        methods:{
            lowerSubmit(){
                
            }
        }
    }
</script>

<style lang="less" scoped>
.customer-assets{
    position: relative;
    .m-search{
        color: #2b85e4;
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
