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
			    {{basicInfo.customerName}}
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
				{{basicInfo.installmentTypeName}}
			</labelText>
			<labelText label="首付款日期：">
				{{payDate}}
			</labelText>
         </DetailStyle>
         <DetailStyle info="金额信息">
			<Table :columns="service" :data="serviceData"></Table>
            <labelText label="服务费总计：" style='font-weight:bold;'>
				{{serviceAll}}  {{capitalService}}
			</labelText>
            <Table :columns="treatment" :data="treatmentData"></Table>
            <labelText label="优惠总计：" style='font-weight:bold;'>
				{{treatAll}}  {{capitalTreatment}}
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
import CommonFuc from 'kr/utils';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText
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
			serviceAll:0,
			treatAll:0,
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
                 key: 'tacticsName',
                 align:'center'	
				},
				{
				 title: '开始日期',
                 key: 'freeStart',
				 align:'center',
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.freeStart));
					 return time;
				 }		
				},
				{
				 title: '结束日期',
                 key: 'freeEnd',
				 align:'center',
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.freeEnd));
					 return time;
				 }		
				},
				{
				 title: '折扣比例',
                 key: 'discountNum',
                 align:'center'	
				},
				{
				 title: '优惠金额',
                 key: 'amount',
                 align:'center'	
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
		let {params}=this.$route;
		let from={
			id:params.watchView
		};
		var _this=this;
	    axios.get('join-bill-detail', from, r => {
				   _this.basicInfo=r.data;
				   
				   
				   _this.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(r.data.ctime))||'';
				   _this.startDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.startDate))||'';
				   _this.endDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.endDate))||'';
				   _this.payDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.firstPayTime))||'';
				   r.data.orderSeatDetailVo&&r.data.orderSeatDetailVo.map((item,index)=>{
					    _this.serviceAll=_this.serviceAll+item.amount;
				   })
				   r.data.contractTactics&&r.data.contractTactics.map((item,index)=>{
					    _this.treatAll=_this.treatAll+item.amount;
				   })
				   _this.capitalTreatment=_this.treatAll?CommonFuc.smalltoBIG(_this.treatAll):'';
				   _this.capitalService=_this.serviceAll?CommonFuc.smalltoBIG(_this.serviceAll):'';
				   _this.serviceData=r.data.orderSeatDetailVo||[];
				   _this.treatmentData=r.data.contractTactics||[];
				   _this.contractData=r.data.orderContractInfo[0].contractNum?r.data.orderContractInfo:[];
           	}, e => {
                _this.$Message.info(e);
        })
	}
}
</script>