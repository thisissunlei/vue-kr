<style lang="less"> 
.g-order-detail{
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.u-txt-red{
			color:#FF6868;
		}
		.u-txt{
			color:#666;
		}
		.u-txt-orange{
        	color: #F5A623;
    	}
	}
</style>
<template>
<div class="g-order-detail">
	<SectionTitle title="会议室订单详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="订单编号：">
				{{basicInfo.orderNo}}
			</LabelText>
			<LabelText label="订单状态：">
				{{basicInfo.orderStatus}}
			</LabelText>
			<LabelText label="预订会议室名称：">
				{{basicInfo.roomName}}
			</LabelText>
			<LabelText label="订单总额：">
				￥{{basicInfo.totalAmount}}
			</LabelText>
			<LabelText label="预订开始时间：">
				{{orderStartTime}}
			</LabelText>
			<LabelText label="预订结束时间：">
				{{orderEndTime}}
			</LabelText>
			<LabelText label="会议室所在社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</LabelText>
			<LabelText label="订单创建人员：">
				<a href="">
				{{basicInfo.createrName}}
				</a>
			</LabelText>
			<LabelText label="订单创建时间：">
				{{createTime}}
			</LabelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<Table border :columns="cost" :data="costInfo"></Table>
		</DetailStyle>
		<DetailStyle info="相关账单">
			<Table border :columns="bill" :data="billInfo"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText,
		SectionTitle
	},
	data(){
		return{
			basicInfo:{},
			coseInfo:[],
			billInfo:[],
			orderStartTime:'',
			orderEndTime:'',
			createTime:'',
			costInfo:[],
			cost:[
				{
				 title: '订单总额',
                 key: 'totalAmount',
				 align:'center'	
				},
				{
				 title: '退款金额',
                 key: 'refundAmount',
                 align:'center'	
				}
			],
			bill:[
				{
				 title: '账单编号',
                 key: 'billNo',
                 align:'center'	
				},
				{
				 title: '账单类型',
                 key: 'bizType',
				 align:'center'	,
				 render(h, obj){
					if(obj.row.bizType==='MEETING'){
						return '会议室账单';
					}else if(obj.row.bizType==='PRINT'){
						return '打印服务账单 ';
					}else if(obj.row.bizType==='CONTRACT'){
						return '工位服务订单';
					}
				 }
				},
				{
				 title: '账单生成日期',
                 key: 'billingDate',
				 align:'center'	,
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.billingDate));
					 return time;
				 }
				},
				{
				 title: '付款截止日期',
                 key: 'dueDate',
				 align:'center'	,
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.dueDate));
					 return time;
				 }
				},
				{
				 title: '账单状态',
                 key: 'payStatus',
				 align:'center'	,
				 render(h, obj){
						if(obj.row.payStatus==='WAIT'){
							return <span class="u-txt-red">待付款</span>;
						}else if(obj.row.payStatus==='PAID'){
							return <span class="u-txt">已付款</span>;
						}else if(obj.row.payStatus==='PAYMENT'){
							return <span class="u-txt-orange">未付清</span>;
						}
				 	}
				}
			]
		}
	},
	mounted:function(){
		this.getInfo();
		GLOBALSIDESWITCH("false")
	},
	methods:{

		getInfo(){

			let {params}=this.$route
			let from={
				orderId:params.orderId
			};
			let orderStatus={
				'VALID':'已生效',
				'CANCEL':'已作废',
				'REFUND':'已退订',
			}
			this.$http.get('order-detail', from, res => {
				
				let data=res.data;
				this.basicInfo=data;
				this.orderStartTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderStartTime));
				this.orderEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderEndTime));
				this.createTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.createTime));
				this.payStatus=data.payStatus=='WAIT'?'待付款':'已付款';
				data.orderStatus=orderStatus[data.orderStatus]
				
				this.costInfo=[
					{
					refundAmount:data.refundAmount,
					totalAmount:data.totalAmount
					}
				]
				this.billInfo=[
					{
						billNo:data.billInfo.billNo,
						bizType:data.billInfo.bizType,
						billingDate:data.billInfo.billingDate,
						dueDate:data.billInfo.dueDate,
						payStatus:data.billInfo.payStatus

					}
				]
					
           	}, err => {
				this.$Notice.error({
					title:err.message
				});
			})
		},
	},
	

}
</script>
