

<template>	
    <div class="give-money">
		<div class="title-type">打款总汇表</div>
        <Table  border :columns="allColumns" class="table-style" ></Table>

		<div class="title-type">打款变化明细表</div>
        <div class="search">
            <Form ref="searchForm" :model="searchForm"  inline :label-width="80">
                <FormItem label="社区名称">
                    <Input type="text" v-model="searchForm.name" placeholder="社区名称"/>
                </FormItem>
                <FormItem label="打款方式">
                    <Input type="text" v-model="searchForm.type" placeholder="打款方式"/>
                </FormItem>
                <FormItem label="操作时间">
                   <DatePicker type="date" v-model="searchForm.begin" placeholder="开始时间" style="width: 200px"></DatePicker>
                   <span>至</span>
                   <DatePicker type="date" v-model="searchForm.end" placeholder="结束时间" style="width: 200px"></DatePicker>

                </FormItem>
                <!-- <FormItem style="width:100px"> -->
                    <Button type="primary" @click="searchSubmit('searchForm')">查询</Button>
                <!-- </FormItem> -->
            </Form>
        </div>
		<Table  border :columns="detailColumns"></Table>
        
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
                        title: '总额（银行转账额+支付宝打款额+转社区款额）（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '银行转账额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '转社区款额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    ],
                detailColumns:[{
                    title: '交易流水号',
                    key: 'billNo',
                    width:100,
                    align:'center',
                },{
                    title: '社区名称',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '打款方式',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '打款金额（元）',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '账户名称',
                    key: 'billNo',
                    align:'center',
                },{
                    title: '打款日期',
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