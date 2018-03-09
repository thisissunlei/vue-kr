

<template>  
    <div class="give-money">
        <div class="title-type">退款总汇表</div>
        <Table  border :columns="allColumns" class="table-style" ></Table>

        <div class="title-type">退款变化明细表</div>
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
                        title: '退款金额（元）',
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
                    title: '退款金额（元）',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '退至账户',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '退款日期',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '操作人',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '操作时间',
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
            }

        },
        mounted(){
            GLOBALSIDESWITCH('false');
        }
    
    }
</script>
<style lang="less" scoped>
    .give-money{
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