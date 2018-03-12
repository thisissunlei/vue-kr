

<template>	
    <div class="balance">
		<div class="title-type">余额总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryData"></Table>

		<div class="title-type">余额变化明细表</div>
        <div class="search">
            <Form ref="searchForm" :model="searchForm"  inline :label-width="80">
                <FormItem label="社区名称">
                    <Input type="text" v-model="searchForm.communityName" placeholder="社区名称"/>
                </FormItem>
                <FormItem label="操作类型">
                <Select v-model="searchForm.operateType" clearable style="width:100px;text-align:left">
                    <Option v-for="item in operateType" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
import utils from '~/plugins/utils';
	export default {
		components:{
		},
		data (){
			return{
                searchForm:{

                },
                // 汇总数据
                summaryData:[{
                    balance:'143123213'
                },{
                    balance:'231233'
                }],
                page:1,
                totalCount:1,
                pageSize:5,
                // 操作类型
                operateType:[{
                    label:'余额充值',
                    value:'RECHARGE'
                },{
                    label:'余额支付账单',
                    value:'PAY_BILL'
                },{
                    label:'退款',
                    value:'REFUND'
                },{
                    label:'退还',
                    value:'BACK'
                },{
                    label:'冻结押金',
                    value:'LOCK_DESPOINT'
                }],
				allColumns:[
                    {
                        title: '序号',
                        key: 'id    ',
                        width:100,
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '余额（元）',
                        key: 'balance',
                        align:'center',
                        render:function(h,params){
                            let index = params.row._index;
                           //  if(index == 0){
                               return utils.thousand(params.row.balance) 
                           // }else{
                           //      return h('div', [
                           //              h('strong', utils.thousand(params.row.balance)),
                           //              h('Button', {
                           //                  props: {
                           //                      type: 'text',
                           //                      size: 'small'
                           //                  },
                           //                  style: {
                           //                      color:'#2b85e4'
                           //                  },
                           //                  on: {
                           //                      click: () => {
                           //                          this.showDetail(params.row)
                           //                      }
                           //                  }
                           //              }, '转社区'),
                           //              h('Button', {
                           //                  props: {
                           //                      type: 'text',
                           //                      size: 'small'
                           //                  },
                           //                  style: {
                           //                      color:'#2b85e4'
                           //                  },
                           //                  on: {
                           //                      click: () => {
                           //                          this.showDetail(params.row)
                           //                      }
                           //                  }
                           //              }, '转营业外'),
                           //      ]);
                           // }
                            
                         }
                    },
                    {
                        title: '服务保证金（元）',
                        key: 'deposit',
                        align:'center',
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'lock_deposit',
                        align:'center',
                    },
                    {
                        title: '门禁卡保证金',
                        key: 'guardCardDeposit',
                        align:'center',
                    },
                    {
                        title: '其他类保证金',
                        key: 'otherDeposit',
                        align:'center',
                    },
                    ],
                detailColumns:[{
                    title: '序号',
                    key: 'id',
                    width:100,
                    align:'center',
                },{
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',
                },{
                    title: '操作类型',
                    key: 'operateType',
                    align:'center',
                },{
                    title: '操作金额（元）',
                    key: 'changedAmount',
                    align:'center',
                },{
                    title: '相关记录',
                    key: 'paramType',
                    align:'center',
                },{
                    title: '操作人',
                    key: 'operater',
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
            getBalanceList(){
                //获取账户余额的汇总信息
                let {params}=this.$route;
                 console.log('获取账户余额的汇总信息',params.customer)
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
            getBalanceDetail(){
                //获取账户余额的明细表
                let {params}=this.$route;
                 console.log('获取账户余额的明细表',params.customer)
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
            // 获取更新数据
            this.getBalanceList();
            this.getBalanceDetail()
		}
	
	}
</script>
<style lang="less" scoped>
    .balance{
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