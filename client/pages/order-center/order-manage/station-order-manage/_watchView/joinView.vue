<template>
   <div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		工位订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="客户名称：">
			    {{basicInfo.customerName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="销售人员：">
				{{basicInfo.salerName}}
			</LabelText>
			<LabelText label="创建时间：">
				{{ctime}}
			</LabelText>
         </DetailStyle>
         <DetailStyle info="租赁信息">
			<LabelText label="租赁开始日期：">
				{{startDate}}
			</LabelText>
			<LabelText label="租赁结束日期：">
				{{endDate}}
			</LabelText>
			<LabelText label="分期方式：">
				{{basicInfo.installmentTypeName}}
			</LabelText>
			<LabelText label="首付款日期：">
				{{payDate}}
			</LabelText>
         </DetailStyle>
         <DetailStyle info="金额信息">
			<Table :columns="service" :data="serviceData"></Table>
            <LabelText label="服务费总计：" style='font-weight:bold;'>
				{{basicInfo.seatRentAmount}}  {{capitalService}}
			</LabelText>
            <Table :columns="treatment" :data="treatmentData"></Table>
            <LabelText label="优惠总计：" style='font-weight:bold;'>
				{{basicInfo.tactiscAmount}}  {{capitalTreatment}}
			</LabelText>
            <div>
                <LabelText label="服务费总额：" style='color:red;'>
                    {{basicInfo.rentAmount}}
                </LabelText>
                <LabelText label="履约保证金总额：" style='color:red;'>
                    {{basicInfo.depositAmount}}
                </LabelText>
            </div>
		</DetailStyle>
		<DetailStyle info="相关合同">
			<Table :columns="contract" :data="contractData"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText
	},
	head() {
        return {
            title: '入驻详情'
        }
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
                 key: 'originalPrice',
                 align:'center'	
                },
                {
				 title: '开始日期',
                 key: 'startDate',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate));
					 return time;
				 }	
                },
                {
				 title: '结束日期',
                 key: 'endDate',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.endDate));
					 return time;
				 }	
                },
                {
				 title: '小计',
                 key: 'originalAmount',
                 align:'center'	
				}
			],

			treatment:[
				{
				 title: '优惠类型',
                 key: 'tacticsName',
                 align:'center'	
				},
				{
				 title: '开始日期',
                 key: 'freeStart',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.freeStart));
					 return time;
				 }		
				},
				{
				 title: '结束日期',
                 key: 'freeEnd',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.freeEnd));
					 return time;
				 }		
				},
				{
				 title: '折扣比例',
                 key: 'discountNum',
                 align:'center',
				 render(tag, params){
					 if(params.row.discountNum==0){
						 return '-';
					 }else{
						 return params.row.discountNum
					 }
				 }		
			   }
			],
			
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

			serviceData:[],

			treatmentData:[],

			contractData:[]
		}
	},
	
	mounted:function(){
		GLOBALSIDESWITCH("false");
		let {params}=this.$route;
		let from={
			id:params.watchView
		};
		var _this=this;
	     this.$http.get('join-bill-detail', from, r => {
				   _this.basicInfo=r.data;
				   
				   
				   _this.ctime=r.data.ctime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(r.data.ctime)):'';
				   _this.startDate=r.data.startDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.startDate)):'';
				   _this.endDate=r.data.endDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.endDate)):'';
				   _this.payDate=r.data.firstPayTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.firstPayTime)):'';
				   _this.capitalTreatment=r.data.tactiscAmount?utils.smalltoBIG(r.data.tactiscAmount):'';
				   _this.capitalService=r.data.seatRentAmount?utils.smalltoBIG(r.data.seatRentAmount):'';
				   _this.serviceData=r.data.orderSeatDetailVo||[];
				   _this.treatmentData=r.data.contractTactics||[];
				   _this.contractData=r.data.orderContractInfo[0].contractNum?r.data.orderContractInfo:[];
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
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
	}
</style>