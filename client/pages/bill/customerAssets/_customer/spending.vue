

<template>  
    <div class="spending">
        <div class="title-type">消费总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryList" ></Table>

        <div class="title-type" style="margin-top:30px">消费变化明细表</div>
        <Table  border :columns="detailColumns" class="table-style" :data="detailList"></Table>
        
        <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :total="totalCount" 
                        :page-size="15" 
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
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
    export default {
        components:{
        },
        data (){
            let {params}=this.$route;
            return{
                searchForm:{
                    page:1,
                    pageSize:15,
                    customerId:params.customer,
                },
                //支付类型
                feeType:[
                    {
                        label:'支付账单',
                        value:'BILL'
                    },{
                        label:'支付订单',
                        value:'ORDER'
                    },{
                        label:'充入余额',
                        value:'BALANCE'
                    }
                ],
                page:1,
                totalCount:1,
                pageSize:15,
                allColumns:[
                    {
                        title: '序号',
                        key: 'id',
                        width:100,
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '工位服务费金额（元）',
                        key: 'rentAmount',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.rentAmount/100).toFixed(2)))
                         }
                    },
                    {
                        title: '会议室服务费金额（元）',
                        key: 'mettingAmount',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.mettingAmount/100).toFixed(2)))
                         }
                    },
                    {
                        title: '打印服务费金额（元）',
                        key: 'printAmount',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.printAmount/100).toFixed(2)))
                         }
                    },
                    {
                        title: '其他服务费金额（元）',
                        key: 'otherAmount',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.otherAmount/100).toFixed(2)))
                         }
                    },
                    {
                        title: '合计',
                        key: 'total',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.total/100).toFixed(2)))
                         }
                    },
                    ],
                detailColumns:[{
                    title: '编号',
                    key: 'id',
                    width:100,
                    align:'center',
                },{
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',
                },{
                    title: '费用类型',
                    key: 'feeTypeName',
                    align:'center',
                },{
                    title: '消费金额（元）',
                    key: 'amount',
                    align:'center',
                    render:function(h,params){
                            return h('span',{},utils.thousand((params.row.amount/100).toFixed(2)))
                         }
                },{
                    title: '消费时间',
                    key: 'occurDate',
                    align:'center',
                    render:function(h,params){
                        return h('span',{},dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.occurDate)))

                    }
                },{
                    title: '相关记录',
                    key: 'records',
                    align:'center',
                },{
                    title: '操作人',
                    key: 'createrName',
                    align:'center',
                }],
                detailList:[],
                summaryList:[]
            }
        },
        methods:{
            changePage(page){
                 let form = this.searchForm;
                form.page = page;
                this.getDetail(form)
            },
            searchSubmit(name){
                console.log('searchSubmit',this.searchForm)
            },
            getSummary(){
                //获取账户消费的汇总信息
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                }
                this.$http.get('consumption-list',param).then((res)=>{
                    this.summaryList = res.data;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getDetail(param){
                //获取账户消费的明细表
                param = Object.assign({},this.searchForm,param)
                this.$http.get('consumption-detail',param).then((res)=>{
                    this.detailList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },

        },
        mounted(){
            GLOBALSIDESWITCH('false');
            this.getDetail()
            this.getSummary()
        }
    
    }
</script>
<style lang="less" scoped>
    .spending{
        .title-type{
            font-size: 14px;
            color:#666;
            font-weight: 500;
        }
        .col{
                display: inline-block;
                padding-right: 10px;
                vertical-align:top;
        }
        .table-style{
            margin:20px 0;
        }
        .search{
            text-align: right;
            margin-top:20px;
        }
        padding:5px 20px;
    }
</style>