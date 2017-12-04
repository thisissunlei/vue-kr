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
				{{cTime}}
			</labelText>
			<labelText label="支付状态：">
				{{payStatus}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<Table :columns="cost" :data="costInfo"></Table>
		</DetailStyle>
		<DetailStyle info="相关账单">
			<Table :columns="bill" :data="billInfo"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>
import axios from '~/plugins/http.js';
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
		let {params}=this.$route
		let from={
			orderId:params.orderId
		};
		var _this=this;
		//假数据--开始
		this.basicInfo={

		};
		this.costInfo=[{
				refundAmount:'-￥250.00',
				totalAmount:'￥300.00'
		}]
		this.billInfo=[
			{
				billNo:'HYSZD201712010001',
				billType:'MEETING',
				billStartTime:1511404234000,
				billEndTime:1511063377000,
				payStatus:'WAIT'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'PRINT',
				billStartTime:1509372919000,
				billEndTime:1509372919000,
				payStatus:'PAID'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'CONTRACT',
				billStartTime:1505704034000,
				billEndTime:1505704034000,
				payStatus:'WAIT'
			}
		]
		let payStatus='PAID'
		this.orderStartTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1511404234000));
		this.orderEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1509372919000));
		this.cTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1505704034000));
		this.payStatus=payStatus=='WAIT'?'待付款':'已付款';
		//假数据--结束



		axios.get('order-detail', from, r => {
			console.log('r', r);
			_this.basicInfo=r;
			_this.orderStartTime=r.orderStartTime;
			_this.orderEndTime=r.orderEndTime;
			_this.cTime=r.cTime;
			_this.payStatus=r.payStatus=='WAIT'?'待付款':'已付款';
			_this.coseInfo=[
				{
				refundAmount:r.refundAmount,
				totalAmount:r.totalAmount
				}
			]
			_this.billInfo=r.billList;
                
           	}, e => {
                console.log('error',e)
            })

		
		
		
	}

}
</script>