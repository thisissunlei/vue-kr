<style lang="less"> 
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
	}
</style>
<template>
<div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"></span>
		会议室订单详情
	</div>
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
				{{basicInfo.orderStartTime}}
			</labelText>
			<labelText label="预订结束时间：">
				{{basicInfo.orderEndTime}}
			</labelText>
			<labelText label="会议室所在社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="客户名称：">
				{{basicInfo.customerName}}
			</labelText>
			<labelText label="订单创建人员：">
				{{basicInfo.createrName}}
			</labelText>
			<labelText label="订单创建时间：">
				{{basicInfo.cTime}}
			</labelText>
			<labelText label="支付状态：">
				{{basicInfo.payStatus}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<Table :columns="cost" :data="data1"></Table>
		</DetailStyle>
		<DetailStyle info="相关账单">
			<Table :columns="billlist" :data="data1"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>

import axios from '../../../../plugins/http.js';
import DetailStyle from './../../../../components/detailStyle';
import labelText from './../../../../components/labelText';

export default {
	components:{
		DetailStyle,
		labelText
	},
	data(){
		return{
			cost:[
				{
				 title: '订单总额',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '退款金额',
                 key: 'number',
                 align:'center'	
				}
			],
			billlist:[
				{
				 title: '账单编号',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '账单类型',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '账单生成日期',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '付款截止日期',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '账单状态',
                 key: 'number',
                 align:'center'	
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
		this.basicInfo={};
		axios.get('order-detail', from, r => {
				
                    console.log('r', r);
                
           	}, e => {
                console.log('error',e)
            })

		
		
		
	}

}
</script>