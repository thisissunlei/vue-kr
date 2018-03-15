<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			减租订单详情
		</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="客户名称：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="社区名称：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="操作人员：">
					{{basicInfo.operationName}}
				</LabelText>
				<LabelText label="操作时间：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
			</DetailStyle>

			<DetailStyle info="减租信息">
				<LabelText label="减租开始时间：">
					{{basicInfo.startDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="减租服务费：">
					{{basicInfo.rentAmount}}
				</LabelText>
				<div class="m-reduce-room">
					<div>减租工位/房间：</div>
					<div style="width:50%;">
						<ul 
						  class="room-list"
						>
							<li 
							  v-for="item in reduceStation" 
							  :key="item.id"
							  style="margin:15px 0;" 
							>
							   <span style="padding-right:20px;">{{ item.seatName}}{{'('+item.type+')'}}</span>
							   <span style="padding-right:20px;">{{ item.startDate}}</span>
							   <span>{{ item.endDate}}</span>
							</li>
						</ul>
					</div>
				</div>
			</DetailStyle>

			<DetailStyle info="相关合同">
				<Table :columns="contract" :data="contractData"/>
			</DetailStyle>
			<DetailStyle info="分期计划">
				<Table :columns="stagesColumn" :data="installments"/>
			</DetailStyle>
			<DetailStyle info="相关规则">
				<div class="formula">
					<h4>服务费总额计算公式</h4>
					<div>服务费总额=月服务费*月数+日服务费*日数（除整月、拼凑整月外的零散天数）</div>
					<div> 日服务费=月服务费/30</div>
					<div>月服务费=系统自定义</div>
				</div>
				<div class="formula">
					<h4 style="margin-top:15px">日费用的计算公式</h4>
					<div>日费用（整月）=月服务费/日历月实际天数</div>
					<div>日费用（拼凑整月）=月服务费/拼凑整月的实际天数</div>
					<div>日费用（非整月）=月服务费/30</div>
					<div>日费用（历史数据）=分期金额（历史数据）/分期总天数（历史数据</div>
				</div>
				<div class="formula">
					<h4 style="margin-top:15px">分期金额的计算公式</h4>
					<div>首期金额=零散天（日历月中实际零散天数）日费用之和+付款方式（月付/季付等）*月服务费</div>
				</div>
			</DetailStyle>
		</div>
	</div>	
</template>


<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';

export default {
	name:'ReduceView',
	head() {
        return {
            title: '减租详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			installments:[],
			basicInfo:{},
			reduceStation:[],
            contract:[
               {
				 title: '合同编号',
                 key: 'contractNum',
                 align:'center'	
				},
				{
				 title: '合同金额',
                 key: 'rentAmount',
                 align:'center'	
				},
				{
				 title: '状态',
                 key: 'orderStatusTypeName',
                 align:'center'	
				}  
			],
			contractData:[],
			stagesColumn:[
                    {
                        title: '分期类型',
                        key: 'installmentCategoryStr'
                    },
                    {
                        title: '账单日',
                        key: 'billingDate',
                        render:(h, params) => {
							let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.billingDate));
							return time;
                        }
                    },
                    {
                        title:'最后付款日',
                        key:'lastPaymentDate',
                        render:(h, params) => {
							let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.lastPaymentDate));
							return time;
                        }
                    },
                    {
                        title: '分期开始时间',
                        key: 'startDate',
                        render:(h, params) => {
							let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.startDate));
							return time;
                        }
                    },
                    {
                        title: '分期结束时间',
                        key: 'startDate',
                        render:(h, params) => {
							let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.endDate));
							return time;
                        }
                    },
                    {
                        title: '分期金额',
                        key: 'totalAmount',
                        render: (h, params) => {
                        	console.log('分期金额',params.row.totalAmount,'----',utils.thousand(params.row.totalAmount));
                            return utils.thousand(params.row.totalAmount)
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatusStr',
                    }
                ],
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},

	methods:{
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			this.$http.get('reduce-bill-detail', from).then((response)=>{  
					this.basicInfo=response.data;

					this.installments = response.data.installments;
					response.data.orderSeatDetailVo&&response.data.orderSeatDetailVo.map((item,index)=>{
							item.startDate=item.startDate?dateUtils.dateToStr('YYYY-MM-DD',new Date(item.startDate)):'';
							item.endDate=item.endDate?dateUtils.dateToStr('YYYY-MM-DD',new Date(item.endDate)):'';
							var stationType='';
							if(item.seatType=='OPEN'){
								stationType='工位';
							}else if(item.seatType=='SPACE'){
								stationType='房间';
							}
							item.type=stationType;
					})
					this.reduceStation=response.data.orderSeatDetailVo||[];
					this.contractData=response.data.orderContractInfo?response.data.orderContractInfo:[];
				}).catch((error)=>{
					this.$Notice.error({
						title:error.message
					});
			})
		}
	}
}
</script>


<style lang="less" scoped> 
   .g-order-detail{
		margin:-10px;
		.m-detail-header{
			height:50px;
			border-bottom: 1px solid #E8E9E9;
			line-height: 50px;
			font-size: 16px;
			color: #666666;
			.u-border-left{
				width:0;
				height:24px;
				border:2px solid  #499DF1;
				margin-right:20px;
			}
		}
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.m-reduce-room{
			padding-left:15px;
			margin-bottom:20px;
			.room-list{
				padding-right:20px;
				padding-top:15px;
				display:inline-block;

			}
		}
		.formula{
			margin-left:12px;
			&>div{
				margin:10px 0;
			}
		}
	}
</style>