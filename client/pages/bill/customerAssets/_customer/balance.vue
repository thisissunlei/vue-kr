

<template>	
    <div class="balance">
		<div class="title-type">余额总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryData"/>

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
         <Modal
                v-model="openBalance"
                title="转余额"
                width="500"
            >
            <div slot="footer">
                <Button type="primary"  @click="submitBalance">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeModal">取消</Button>
            </div>
        </Modal>

    </div>
	

</template>

<script>
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
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
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand(params.row.balance))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转社区',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                 this.transferCommunity(params.row)
                                            }
                                        }
                                }),tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转营业外',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferOutsideBusiness(params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '服务保证金（元）',
                        key: 'deposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand(params.row.deposit))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('deposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'lock_deposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand(params.row.lock_deposit))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('lock_deposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '门禁卡保证金',
                        key: 'guardCardDeposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand(params.row.guardCardDeposit))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('guardCardDeposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '其他类保证金',
                        key: 'otherDeposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand(params.row.balance))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'fina_detail_rerun',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('otherDeposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
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
                }],
                openBalance:false,//转余额弹窗
                openCommunity:false,//转社区弹窗
                openBusiness:false,//转营业外弹窗
                balanceType:''
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
            transferCommunity(item){
                // 转社区
                console.log('转社区',item)
                this.openCommunity = true;
            },
            transferOutsideBusiness(item){
                // 转营业外
                console.log('转营业外',item)
                this.openBusiness = true;
            },
            transferBalance(type,item){
                // 转余额
                console.log('转余额-->item',item)
                console.log('转余额-->type',type)
                this.openBalance = true;
                this.balanceType = type;
                
            },
            //转余额提交
            submitBalance(){
                console.log('submitBalance')
            },
            closeModal(){
                this.openBalance = false;
                this.openBusiness = false;
                this.openBusiness = false;
            }


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