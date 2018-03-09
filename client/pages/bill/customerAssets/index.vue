<template>
<div class="customer-assets">
   <SectionTitle title="已出账单管理"></SectionTitle>
        <div class="div-search">
            <Input 
                v-model="params.customerName" 
                placeholder="请输入客户名称"
                style="width: 252px"
                @keyup.enter.native="onKeyEnter($event)"
            />
            <div class='m-search' @click="lowerSubmit">搜索</div>
        </div>
        <div class="table-list">
            <Table  border :columns="columns" ></Table>
             <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page" 
                        :total="totalCount" 
                        :page-size="pageSize" 
                        @on-change="changePage" 
                        show-total 
                        show-elevator
                    ></Page>
                </div>
            </div>
        </div>
</div>
</template>

<script>
    import SectionTitle from '~/components/SectionTitle';
    import Buttons from '~/components/Buttons';
    import utils from '~/plugins/utils';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            Buttons
        },
        data () {
            return {
                totalCount:0,
                page:1,
                pageSize:15,

            params:{
                customerName:'',
                page:1,
                pageSize:15,
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
          var params=Object.assign({},{page:1,pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },

        methods:{
            lowerSubmit(){
                this.params.page = 1;
                utils.addParams(this.params);
            },
            getListData(params){

            },
            onKeyEnter: function (ev) {
                this.lowerSubmit();
            },
            changePage(page){
                this.params.page = page;
                utils.addParams(this.params);
            }
        }
    }
</script>

<style lang="less" scoped>
.customer-assets{
    position: relative;
    .div-search{
        text-align: right;
        padding:20px ;
    }
    .table-list{
        padding:0 20px;
    }
    .m-search{
        color: #2b85e4;
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
