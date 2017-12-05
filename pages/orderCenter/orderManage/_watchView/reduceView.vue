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
		减租订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="客户名称：">
				{{basicInfo.orderNo}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.orderStatus}}
			</labelText>
			<labelText label="操作人员：">
				{{basicInfo.roomName}}
			</labelText>
			<labelText label="操作时间：">
				{{basicInfo.totalAmount}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="减租信息">
			<labelText label="减租开始日期：">
				{{basicInfo.orderStartTime}}
			</labelText>
			<labelText label="减租服务费(元)">
				{{basicInfo.orderEndTime}}
			</labelText>
			<labelText label="减租工位(房间)">
				{{basicInfo.communityName}}
			</labelText>
         </DetailStyle>
		<DetailStyle info="相关合同">
			<Table :columns="contract" :data="contractData"></Table>
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
            contract:[
               {
				 title: '合同编号',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '合同金额',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '状态',
                 key: 'number',
                 align:'center'	
				}  
			],
			contractData:[]
		}
	},
	created:function(){
		let {params}=this.$route
		let from={
			orderId:params.orderId
		};
		var _this=this;
		this.basicInfo={};
		/*axios.get('order-detail', from, r => {
				
                    console.log('r', r);
                
           	}, e => {
                console.log('error',e)
            })*/
	}
}
</script>