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
	}
</style>
<template>
<div class="g-order-detail">
	<sectionTitle label="会议室订单详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="订单编号：">
				{{basicInfo.orderNo}}
			</labelText>
			<labelText label="订单状态：">
				{{basicInfo.orderStatus}}
			</labelText>
			<labelText label="预订会议室名称：">
				{{basicInfo.roomName}}
			</labelText>
			<labelText label="订单总额：">
				{{basicInfo.totalAmount}}
			</labelText>
			<labelText label="预订开始时间：">
				{{orderStartTime}}
				
			</labelText>
			<labelText label="预订结束时间：">
				{{orderEndTime}}
			</labelText>
			<labelText label="会议室所在社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="订单创建人员：">
				<a href="">
				{{basicInfo.createrName}}
				</a>
			</labelText>
			<labelText label="订单创建时间：">
				{{createTime}}
			</labelText>
			<labelText label="支付状态：">
				{{payStatus}}
			</labelText>
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
import axios from 'kr/axios';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import sectionTitle from '~/components/sectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText,
		sectionTitle
	},
	data(){
		return{
			basicInfo:{},
			coseInfo:[],
			billInfo:[],
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
                 key: 'billType',
				 align:'center'	,
				 render(h, obj){
					if(obj.row.billType==='MEETING'){
						return '会议室账单';
					}else if(obj.row.billType==='PRINT'){
						return '打印服务账单 ';
					}else if(obj.row.billType==='CONTRACT'){
						return '工位服务订单';
					}
				 }
				},
				{
				 title: '账单生成日期',
                 key: 'billStartTime',
				 align:'center'	,
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.billStartTime));
					 return time;
				 }
				},
				{
				 title: '付款截止日期',
                 key: 'billEndTime',
				 align:'center'	,
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
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
						}
				 	}
				}
			]
		}
	},
	created:function(){
		this.getInfo();
	},
	methods:{
		getInfo(){
			let {params}=this.$route
			let from={
				orderId:params.orderId
			};
			axios.get('order-detail', from, r => {
				console.log('r', r);
				let data=r.data;
				this.basicInfo=data;
				this.orderStartTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderStartTime));
				this.orderEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderEndTime));
				this.createTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.createTime));
				this.payStatus=data.payStatus=='WAIT'?'待付款':'已付款';
				this.costInfo=[
					{
					refundAmount:data.refundAmount,
					totalAmount:data.totalAmount
					}
				]
				this.billInfo=data.billList;
					
           	}, e => {
                console.log('error',e)
            })
		},
	}

}
</script>