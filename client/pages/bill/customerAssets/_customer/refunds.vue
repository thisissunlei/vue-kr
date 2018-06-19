

<template>  
    <div class="refunds">
        <div class="title-type">退款总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryList" ></Table>

        <div class="title-type" style="margin-top:30px">退款变化明细表</div>
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
                        title: '退款金额（元）',
                        key: 'amount',
                        align:'center',
                        render:function(h,params){
                                return h('span',{}, utils.thousand((params.row.amount/100).toFixed(2)))
                            
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
                    title: '退款金额（元）',
                    key: 'amount',
                    align:'center',
                    render:function(h,params){
                              return h('span',{}, utils.thousand((params.row.amount/100).toFixed(2)))
                        
                    }
                },{
                    title: '退至账户',
                    key: 'receiveAccount',
                    align:'center',
                },{
                    title: '退款日期',
                    key: 'occurDate',
                    align:'center',
                    render:function(h,params){
                              return h('span',{},dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.occurDate)))
  
                    }
                },{
                    title: '操作人',
                    key: 'createrName',
                    align:'center',
                },{
                    title: '操作时间',
                    key: 'ctime',
                    align:'ctime',
                    render:function(h,params){
                        return h('span',{}, dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ctime)));
                     
                    }
                }],
                summaryList:[],
                detailList:[]
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
                //获取账户退款的汇总信息
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                }
                this.$http.get('refund-list',param).then((res)=>{
                    this.summaryList = res.data;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getDetail(param){
                //获取账户退款的明细表
                param = Object.assign({},this.searchForm,param)

                this.$http.get('refund-detail',param).then((res)=>{
                    this.detailList = res.data.items;
                    this.totalCount = res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },

        },
        mounted(){
            GLOBALSIDESWITCH('false');
            this.getDetail();
            this.getSummary()
        }
    
    }
</script>
<style lang="less" scoped>
    .refunds{
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