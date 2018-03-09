

<template>	
    <div class="give-money">
		<div class="title-type">余额总汇表</div>
        <Table  border :columns="allColumns" class="table-style" ></Table>

		<div class="title-type">余额变化明细表</div>
        <div class="search">
            <Form ref="searchForm" :model="searchForm"  inline :label-width="80">
                <FormItem label="社区名称">
                    <Input type="text" v-model="searchForm.name" placeholder="社区名称"/>
                </FormItem>
                <FormItem label="操作类型">
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
                        title: '余额（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '服务保证金（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '门禁卡保证金',
                        key: 'billNo',
                        align:'center',
                    },
                    {
                        title: '其他类保证金',
                        key: 'billNo',
                        align:'center',
                    },
                    ],
                detailColumns:[{
                    title: '序号',
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
                    title: '操作金额（元）',
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
            // 获取更新数据
            console.log('mounted=====>')
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