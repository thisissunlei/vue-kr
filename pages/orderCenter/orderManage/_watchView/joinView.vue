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
		工位订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="客户名称：">
				{{basicInfo.orderNo}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.orderStatus}}
			</labelText>
			<labelText label="销售人员：">
				{{basicInfo.roomName}}
			</labelText>
			<labelText label="创建时间：">
				{{basicInfo.totalAmount}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="租赁信息">
			<labelText label="租赁开始日期：">
				{{basicInfo.orderStartTime}}
			</labelText>
			<labelText label="租赁结束日期：">
				{{basicInfo.orderEndTime}}
			</labelText>
			<labelText label="分期方式：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="首付款日期：">
				{{basicInfo.customerName}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="金额信息">
			<Table :columns="service" :data="serviceData"></Table>
            <labelText label="服务费总计：">
				{{basicInfo.customerName}}
			</labelText>
            <Table :columns="treatment" :data="treatmentData"></Table>
            <labelText label="优惠总计：">
				{{basicInfo.customerName}}
			</labelText>
            <div>
                <labelText label="服务费总额：">
                    {{basicInfo.customerName}}
                </labelText>
                <labelText label="履约保证金总额：">
                    {{basicInfo.customerName}}
                </labelText>
            </div>
		</DetailStyle>
		<DetailStyle info="相关合同">
			<Table :columns="contract" :data="contractData"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>

import axios from 'kr/axios';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import CommonFuc from '~/components/commonFuc';

export default {
	components:{
		DetailStyle,
		labelText
	},
	data(){
		return{
			basicInfo:{},
			service:[
				{
				 title: '工位/房间编号',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '标准单价(元/月)',
                 key: 'number',
                 align:'center'	
                },
                {
				 title: '开始日期',
                 key: 'number',
                 align:'center'	
                },
                {
				 title: '结束日期',
                 key: 'number',
                 align:'center'	
                },
                {
				 title: '小计',
                 key: 'number',
                 align:'center'	
				}
			],
			treatment:[
				{
				 title: '优惠类型',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '开始日期',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '结束日期',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '折扣比例',
                 key: 'number',
                 align:'center'	
				},
				{
				 title: '优惠金额',
                 key: 'number',
                 align:'center'	
				}
            ],
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
			serviceData:[],
			treatmentData:[],
			contractData:[]
		}
	},
	created:function(){
		console.log('CommonFuc',CommonFuc.smalltoBIG(-1890));
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