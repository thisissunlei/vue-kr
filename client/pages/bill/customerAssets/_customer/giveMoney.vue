

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
                    <Select v-model="searchForm.operateType" clearable style="width:100px;text-align:left">
                        <Option v-for="item in payment" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="操作时间">
                   <DatePicker type="date" v-model="searchForm.begin" placeholder="开始时间" style="width: 130px"></DatePicker>
                   <span style="margin:0 10px">至</span>
                   <DatePicker type="date" v-model="searchForm.end" placeholder="结束时间" style="width: 130px"></DatePicker>

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
                //打款方式
                payment:[{
                    label:'1',
                    value:'1'
                },{
                    label:'2',
                    value:'2'
                },{
                    label:'3',
                    value:'3'
                },{
                    label:'4',
                    value:'4'
                }],
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
            },
            getSummary(){
                //获取账户打款的汇总信息
                let {params}=this.$route;
                 console.log('获取账户打款的汇总信息',params.customer)
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
                //获取账户打款的明细表
                let {params}=this.$route;
                 console.log('获取账户打款的明细表',params.customer)
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
            this.getSummary();
            this.getDetail();
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
    	padding:5px 30px;
    }
</style>