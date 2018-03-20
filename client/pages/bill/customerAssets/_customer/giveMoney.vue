

<template>	
    <div class="give-money">
		<div class="title-type">打款总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryData" ></Table>

		<div class="title-type">打款变化明细表</div>
        <div class="search">
            <Form ref="searchForm" :model="searchForm"  inline :label-width="80">
                <FormItem label="社区名称" style="text-align:left">
                    <selectCommunities test="searchForm" :onchange="changeCommunity" />

                </FormItem>
                <FormItem label="打款方式">
                    <Select v-model="searchForm.payWay" clearable style="width:100px;text-align:left">
                        <Option v-for="item in payment" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="操作时间" style="position:relative">
                   <DatePicker type="date" v-model="searchForm.startDate" placeholder="开始时间" style="width: 130px"></DatePicker>
                   <span style="margin:0 10px">至</span>
                   <DatePicker type="date" v-model="searchForm.endDate" placeholder="结束时间" style="width: 130px"></DatePicker>
                   <div class="error" v-if="timeError != false" >{{timeError}}</div>

                </FormItem>
                <!-- <FormItem style="width:100px"> -->
                    <Button type="primary" @click="searchSubmit('searchForm')">查询</Button>
                <!-- </FormItem> -->
            </Form>
        </div>
		<Table  border :columns="detailColumns" :data="detailList"></Table>
        
        <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :total="totalCount" 
                        :page-size="15" 
                        :current.sync="page"
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
import dateUtils from 'vue-dateutils';
import selectCommunities from '~/components/SelectCommunities.vue'

	export default {
		components:{
            selectCommunities
		},
		data (){
            let {params}=this.$route;
			return{
                searchForm:{
                    pageSize:15,
                    page:1,
                    customerId:params.customer,
                },
                //打款方式
                payment:[{
                    label:'社区变更',
                    value:'NONE'
                },{
                    label:'银行转账',
                    value:'BANKTRANSFER'
                },{
                    value:'ALIAPPPAY',
                    label:'支付宝'
                },{
                    value:'WXPAY',
                    label:'微信'
                },{
                    value:'DEP_RENT',
                    label:'押金转租'
                },{
                    value:'TRANSFER',
                    label:'转移'
                },{
                    value:'RENT_DEP',
                    label:'租金转押'
                },{
                    value:'ALIWEBPAY',
                    label:'支付宝网银'
                },{
                    value:'BANKONLINE',
                    label:'网银'
                },{
                    value:'BANLANCE',
                    label:'余额支付'
                }],
                page:1,
                totalCount:1,
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
                        title: '总额（银行转账额+支付宝打款额+转社区款额）（元）',
                        key: 'amount',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand((params.row.amount/100).toFixed(2))
                         }
                    },
                    {
                        title: '银行转账额（元）',
                        key: 'bankTransfer',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand((params.row.bankTransfer/100).toFixed(2))
                         }
                    },
                    {
                        title: '转社区款额（元）',
                        key: 'communityTransfer',
                        align:'center',
                        render:function(h,params){
                            return utils.thousand((params.row.communityTransfer/100).toFixed(2))
                         }
                    },
                    ],
                detailColumns:[{
                    title: '交易流水号',
                    key: 'tradeNo',
                    width:100,
                    align:'center',
                    render:function(h,params){
                        return params.row.tradeNo?params.row.tradeNo:'-';
                    }
                },{
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',
                },{
                    title: '打款方式',
                    key: 'payWay',
                    align:'center',
                    render:function(h,params){
                        let payWay = [{
                            label:'社区变更',
                            value:'NONE'
                        },{
                            label:'银行转账',
                            value:'BANKTRANSFER'
                        },{
                            value:'ALIAPPPAY',
                            label:'支付宝'
                        },{
                            value:'WXPAY',
                            label:'微信'
                        },{
                            value:'DEP_RENT',
                            label:'押金转租'
                        },{
                            value:'TRANSFER',
                            label:'转移'
                        },{
                            value:'RENT_DEP',
                            label:'租金转押'
                        },{
                            value:'ALIWEBPAY',
                            label:'支付宝网银'
                        },{
                            value:'BANKONLINE',
                            label:'网银'
                        },{
                            value:'BANLANCE',
                            label:'余额支付'
                        }]
                        let type = '-';
                        type = payWay.filter((item)=>{
                            if(item.value == params.row.payWay){
                                return item.label
                            }
                            return false
                        })
                        return type[0].label
                    }
                },{
                    title: '打款金额（元）',
                    key: 'amount',
                    align:'center',
                    render:function(h,params){
                            return utils.thousand((params.row.amount/100).toFixed(2))
                         }
                },{
                    title: '账户名称',
                    key: 'payAccount',
                    align:'center',
                },{
                    title: '打款日期',
                    key: 'occurDate',
                    align:'center',
                    render:function(h,params){
                        return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.occurDate))
                    }
                },{
                    title: '操作人',
                    key: 'creater',
                    align:'center',
                    render:function(h,params){
                        let type = params.row.creater;

                        if(type === 0){
                            type = '系统自动'
                        }
                        return type;
                    }
                },{
                    title: '操作时间',
                    key: 'ctime',
                    align:'center',
                    render:function(h,params){
                        return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ctime))
                    }
                }],
                summaryData:[],
                detailList:[],
                timeError:false,
			}
		},
		methods:{
            changePage(page){
                let form = this.searchForm;
                if(form.startDate){
                    form.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.startDate))
                }
                if(form.endDate){
                    form.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.endDate))
                }
                form.page = page;
                this.page = page;
                this.getDetail(form)

            },
            searchSubmit(name){
                this.checkTime()
                if(!this.timeError){
                    this.changePage(1)
                }
            },
            getSummary(){
                //获取账户打款的汇总信息
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                }
                this.$http.get('payment-list',param).then((res)=>{
                    this.summaryData=res.data;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getDetail(param){
                //获取账户打款的明细表
                param = Object.assign({},this.searchForm,param)
                this.$http.get('payment-detail',param).then((res)=>{
                    this.detailList = res.data.items;
                    this.totalCount = res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            changeCommunity(value){
                if(value){
                    this.searchForm.communityId = value;
                }else{
                    this.searchForm.communityId = ''
                }
            },
            checkTime(){
                if(!this.searchForm.startDate || !this.searchForm.endDate){
                    this.timeError = false;
                    return;
                }
                if(this.searchForm.startDate && this.searchForm.endDate){
                    let begin = new Date(this.searchForm.startDate).getTime();
                    let end = new Date(this.searchForm.endDate).getTime();

                    if(begin>end){
                        this.timeError = '结束时间不得大于开始时间'
                    }else{
                        this.timeError = false
                    }
                }
            }

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
        .error{
            position: absolute;
            right: 0px;
            color:red;
        }
        .search{
            text-align: right;
            margin-top:-20px;
            margin-bottom: 10px;
        }
    	padding:5px 30px;
    }
</style>