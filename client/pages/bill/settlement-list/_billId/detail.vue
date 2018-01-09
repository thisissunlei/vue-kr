<template>
   <div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		客户撤场结算单
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="结算单编号：">
			    {{basicInfo.customerName}}
			</LabelText>
			<LabelText label="服务尾期：">
				{{ctime | dateFormat('YYYY-MM-dd')}}
			</LabelText>
			<LabelText label="客户名称：">
				{{basicInfo.salerName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
         </DetailStyle>

         <DetailStyle info="结算信息">
			<Table :columns="service" :data="serviceData" border></Table>
            
            <div >
            	<LabelText label="用户余额：" class="amount-list">
					{{basicInfo.seatRentAmount}} 
				</LabelText>
	            <LabelText label="在押履约保证金："class="amount-list">
					{{basicInfo.tactiscAmount}} 
				</LabelText>
                <LabelText label="未结算总额：" class="amount-list">
                    {{basicInfo.rentAmount}}
                </LabelText>
                <LabelText label="应退款金额：" class="amount-list" style="color:red">
                    {{basicInfo.depositAmount}}
                </LabelText>
            </div>
		</DetailStyle>

		<!-- <DetailStyle info="附件信息">
			
         </DetailStyle> -->

		<DetailStyle info="操作记录">
            <Table :columns="contract" :data="contractData" border></Table>
		</DetailStyle>
	</div>
	<div class="m-detail-buttons">
		
		<Button type="primary" @click="download"style="margin-left:8px" >下载PDF文件</Button>
		<Button type="primary" @click="upload" style="margin-left:8px">上传附件</Button>
		<!-- //未生效时才可编辑 -->
		<Button type="primary" @click="edit" style="margin-left:8px">编辑</Button>
		<!-- 未生效并且有PDF才可显示 -->
		<Button type="primary" @click="becomeEffective" :v-show="disabled" style="margin-left:8px">生效</Button>
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
			disabled:false,
			basicInfo:{},

			capitalService:'',

			capitalTreatment:'',

			ctime:'',

			startDate:'',

			endDate:'',

			payDate:'',

			service:[
				{
				 title: '费用名称',
                 key: 'seatName',
                 align:'center'	,
                 // width: 200,
				},
                {
				 title: '费用金额(元)',
                 key: 'originalAmount',
                 align:'right'	
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
				 title: '时间',
                 key: 'contractNum',
                 align:'center'	,
				},
				{
				 title: '账号',
                 key: 'rentAmount',
                 align:'center',

				},
				{
				 title: '详情',
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
			id:params.billId
		};
		var _this=this;
	     this.$http.get('join-bill-detail', from, r => {
				   _this.basicInfo=r.data;
				   
				   
				   _this.ctime=r.data.ctime;
				   _this.startDate=r.data.startDate;
				   _this.endDate=r.data.endDate
				   _this.payDate=r.data.firstPayTime;
				   _this.capitalTreatment=r.data.tactiscAmount;
				   _this.capitalService=r.data.seatRentAmount;
				   _this.serviceData=r.data.orderSeatDetailVo||[];
				   _this.treatmentData=r.data.contractTactics||[];
				   _this.contractData=r.data.orderContractInfo[0].contractNum?r.data.orderContractInfo:[];
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
	},
	methods:{
		becomeEffective(){

		},
		edit(){
			let {params}=this.$route;
            window.open(`/bill/settlement-list/${params.billId}/edit/`,params.billId);

		},
		download(){

		},
		upload(){

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
		.m-detail-buttons{
			margin-left: 40px;
			margin-bottom: 40px;
		}
		.amount-list{
			font-weight:bold;
			display:block;
			width:200px;
			margin-left:auto;
		}
	}
</style>