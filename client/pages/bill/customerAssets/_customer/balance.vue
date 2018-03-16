

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
		<Table  border :columns="detailColumns" :data="detailList"></Table>
        
        <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                     <Page :total="totalCount" :page-size='1' show-total show-elevator @on-change="changePage" :current.sync="page"/>
                </div>
            </div>
    </div>
	

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
	export default {
		components:{
		},
		data (){
            let {params}=this.$route;
			return{
                detailList:[],
                searchForm:{
                    pageSize:1,
                    page:1,
                    communityName:'',
                    customerId:params.customer,
                    operateType:'',
                },
                // 汇总数据
                summaryData:[{
                    balance:'143123213'
                },{
                    balance:'231233'
                }],
                page:1,
                totalCount:1,
                pageSize:1,
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
                        title: '余额（元）',
                        key: 'balance',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand(params.row.balance) ;
                        }
                    },
                    {
                        title: '服务保证金（元）',
                        key: 'deposit',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand(params.row.deposit) ;
                        }
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'lockDeposit',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand(params.row.lockDeposit) ;
                        }
                    },
                    {
                        title: '门禁卡保证金',
                        key: 'guardCardDeposit',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand(params.row.guardCardDeposit) ;
                        }
                    },
                    {
                        title: '其他类保证金',
                        key: 'otherDeposit',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand(params.row.otherDeposit) ;
                        }
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
                    render:function(h,params){
                        let operateType = [{
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
                        }]
                        let type = '-';
                        type = operateType.filter((item)=>{
                            if(item.value == params.row.operateType){
                                return item.label
                            }
                            return false
                        })
                        return type[0].label
                    }
                },{
                    title: '操作金额（元）',
                    key: 'changedAmount',
                    align:'center',
                    render:function(h,params){
                        return utils.thousand(params.row.changedAmount) ;
                    }
                },{
                    title: '相关记录',
                    key: 'paramType',
                    align:'center',
                    render:function(h,params){
                        return params.row.paramType || '-'
                    }
                },{
                    title: '操作人',
                    key: 'operater',
                    align:'center',
                },{
                    title: '操作时间',
                    key: 'ctime',
                    align:'center',
                    render:function(h,params){
                        return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.ctime))
                    }
                }]
			}
		},
		methods:{
            changePage(page){
                let form = this.searchForm;
                if(form.begin){
                    form.begin = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.begin))
                }
                if(form.end){
                    form.end = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.end))
                }
                form.page = page;
                this.page = page;
                this.getBalanceDetail(form)
            },
            searchSubmit(name){
                let form = this.searchForm;
                this.changePage(1)
            },
            getBalanceList(){
                //获取账户余额的汇总信息
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                }
                
                this.$http.get('balance-list',param).then((res)=>{
                    this.summaryData = res.data
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getBalanceDetail(param){
                //获取账户余额的明细表
                param = Object.assign({},this.searchForm,param)
                this.$http.get('balance-detail',param).then((res)=>{
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