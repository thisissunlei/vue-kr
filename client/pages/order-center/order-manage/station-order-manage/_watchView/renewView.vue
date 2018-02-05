<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			续租订单详情
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
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="续租信息">
				<LabelText label="续租开始日期：">
					{{basicInfo.startDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="续租结束日期：">
					{{basicInfo.endDate| dateFormat('YYYY-MM-dd')}}
				</LabelText>
				<LabelText label="分期方式：">
					{{basicInfo.installmentTypeName}}
				</LabelText>
				<LabelText label="首付款日期：">
					{{basicInfo.firstPayTime| dateFormat('YYYY-MM-dd')}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="金额信息">
				<Table :columns="service" :data="serviceData"/>
				<LabelText label="服务费总计：" style="font-weight:bold;">
					{{basicInfo.seatRentAmount}}  {{capitalService}}
				</LabelText>
				<Table :columns="treatment" :data="treatmentData"/>
				<LabelText label="优惠总计：" style="font-weight:bold;">
					{{basicInfo.tactiscAmount}}  {{capitalTreatment}}
				</LabelText>
				<div>
					<LabelText label="服务费总额：" style="color:red;">
						{{basicInfo.rentAmount}}
					</LabelText>
					<LabelText label="履约保证金总额：" style="color:red;">
						{{basicInfo.depositAmount}}
					</LabelText>
				</div>
			</DetailStyle>
			<DetailStyle info="相关合同">
				<Table :columns="contract" :data="contractData"/>
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
	name:'RenewView',
	head() {
        return {
            title: '续租详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			basicInfo:{},
			capitalService:'',
			capitalTreatment:'',

			service:[
				{
				 title: '工位/房间编号',
                 key: 'seatName',
                 align:'center'	
				},
				{
                        title: '类型',
                        key: 'seatType',
                        align:'center',
                        render:(h, params) => {
                            let type = params.row.seatType;
                            let typeName = '工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室'
                            }else{
                                typeName = "工位"
                            }
                            return typeName
                        }
                    },
				{
                    title:'工位可容纳人数',
                    key:'capacity',
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
				 render(tag,params){
					 let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.startDate));
					 return time;
				 }	
                },
                {
				 title: '结束日期',
                 key: 'endDate',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.endDate));
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
					 let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.freeStart));
					 return time;
				 }		
				},
				{
				 title: '结束日期',
                 key: 'freeEnd',
				 align:'center',
				 render(tag, params){
					 let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.freeEnd));
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
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},

	methods:{
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			this.$http.get('join-bill-detail', from).then((response)=>{  
					this.basicInfo=response.data;
					
					
					this.capitalTreatment=response.data.tactiscAmount?utils.smalltoBIG(response.data.tactiscAmount):'';
					this.capitalService=response.data.seatRentAmount?utils.smalltoBIG(response.data.seatRentAmount):'';
					this.serviceData=response.data.orderSeatDetailVo||[];
					this.treatmentData=response.data.contractTactics||[];
					this.contractData=response.data.orderContractInfo?response.data.orderContractInfo:[];
				}).catch((error)=>{
					this.$Notice.error({
						title:error.message
					});
			})
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
	}
</style>