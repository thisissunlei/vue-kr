

<template>  
    <div class="spending">
        <div class="title-type">消费总汇表</div>
        <Table  border :columns="allColumns" class="table-style" ></Table>

        <div class="title-type">消费变化明细表</div>
        <Table  border :columns="detailColumns" class="table-style"></Table>
        
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
    export default {
        components:{
        },
        data (){
            return{
                searchForm:{

                },
                page:1,
                totalCount:1,
                pageSize:5,
                allColumns:[
                    {
                        title: '序号',
                        key: 'billNo',
                        width:100,
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '工位服务费金额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '会议室服务费金额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '打印服务费金额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '其他服务费金额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '合计',
                        key: 'billNo',
                        align:'center',
                    },
                    ],
                detailColumns:[{
                    title: '编号',
                    key: 'billNo',
                    width:100,
                    align:'center',
                },{
                    title: '社区名称',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '操作类型',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '费用类型',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '消费金额（元）',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '消费时间',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '相关记录',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '操作人',
                    key: 'billNo',
                    align:'center',
                }]
            }
        },
        methods:{
            changePage(page){

            },
            searchSubmit(name){
                console.log('searchSubmit',this.searchForm)
            },
            getSummary(){
                //获取账户消费的汇总信息
                let {params}=this.$route;
                 console.log('获取账户消费的汇总信息',params.customer)
                return;
                this.$http.get('account-list',params).then((res)=>{
                    this.accountList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getDetail(){
                //获取账户消费的明细表
                let {params}=this.$route;
                 console.log('获取账户消费的明细表',params.customer)
                return;
                this.$http.get('account-list',params).then((res)=>{
                    this.accountList=res.data.items;
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