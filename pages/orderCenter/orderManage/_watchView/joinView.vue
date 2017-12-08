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
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="销售人员：">
				{{basicInfo.salerName}}
			</labelText>
			<labelText label="创建时间：">
				{{ctime}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="租赁信息">
			<labelText label="租赁开始日期：">
				{{startDate}}
			</labelText>
			<labelText label="租赁结束日期：">
				{{endDate}}
			</labelText>
			<labelText label="分期方式：">
				{{basicInfo.installmentType}}
			</labelText>
			<labelText label="首付款日期：">
				{{payDate}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="金额信息">
			<Table :columns="service" :data="serviceData"></Table>
            <labelText label="服务费总计：" style='font-weight:bold;'>
				{{basicInfo.rentAmount}}  {{capitalService}}
			</labelText>
            <Table :columns="treatment" :data="treatmentData"></Table>
            <labelText label="优惠总计：" style='font-weight:bold;'>
				{{basicInfo.amount}}  {{capitalTreatment}}
			</labelText>
            <div>
                <labelText label="服务费总额：" style='color:red;'>
                    {{basicInfo.rentAmount}}
                </labelText>
                <labelText label="履约保证金总额：" style='color:red;'>
                    {{basicInfo.depositAmount}}
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
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText
	},
	data(){
		return{
			basicInfo:{},
			capitalService:'',
			capitalTreatment:'',
			ctime:'',
			startDate:'',
			endDate:'',
			payDate:'',
			service:[
				{
				 title: '工位/房间编号',
                 key: 'seatName',
                 align:'center'	
				},
				{
				 title: '标准单价(元/月)',
                 key: 'seatName',
                 align:'center'	
                },
                {
				 title: '开始日期',
                 key: 'startDate',
				 align:'center',
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.startDate));
					 return time;
				 }	
                },
                {
				 title: '结束日期',
                 key: 'endDate',
				 align:'center',
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.endDate));
					 return time;
				 }	
                },
                {
				 title: '小计',
                 key: 'amount',
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
		let {params}=this.$route;
		let from={
			id:params.watchView
		};
		var _this=this;
	    axios.get('reduce-bill-detail', from, r => {
				   _this.basicInfo=r.data;
				   
				   _this.capitalService=CommonFuc.smalltoBIG(r.data.rentAmount);
				   _this.capitalTreatment=CommonFuc.smalltoBIG(r.data.amount);
				   _this.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(r.data.ctime));
				   _this.startDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.startDate));
				   _this.endDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.endDate));
				   _this.payDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.firstPayTime));
				   _this.serviceData=r.data.orderSeatDetailVo;

           	}, e => {
                _this.$Message.info(e);
        })
	}
}
</script>