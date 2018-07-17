<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			商品详情
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
				<LabelText label="订单状态：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="生效时间：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
			</DetailStyle>
			<DetailStyle info="启用状态">
				<Table :columns="service" :data="serviceData"/>
			</DetailStyle>
			<DetailStyle info="商品修改记录">
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
			showAll:false,
			showButton:false,
			installments:[],
			basicInfo:{},
			capitalService:'',

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
                            let typeName = '开放工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室'
                            }else{
                                typeName = "开放工位"
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
					
					this.installments = response.data.installments || []
					this.capitalService=response.data.seatRentAmount?utils.smalltoBIG(response.data.seatRentAmount):'';
					this.serviceData=response.data.orderSeatDetailVo||[];
					this.contractData=response.data.orderContractInfo?response.data.orderContractInfo:[];
				}).catch((error)=>{
					this.$Notice.error({
						title:error.message
					});
			})
		},
		notAllList(){
			let list = this.installmentAll
			this.showAll = false;
			this.installments = list.slice(0,10)
		},
		showAllList(){
			let list = this.installmentAll
			this.showAll = true;
			this.installments = list;
		},
	}
}
</script>


<style lang="less" scoped> 
   .g-order-detail{
		// margin:-10px;
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
		.table-button{
			text-align: center;
			cursor: pointer;
			color:#499DF1;
			display: inline-block;
			transition:all .5s;
			&>span{
				font-size: 16px;
				padding-bottom:5px;
				padding-top:10px;
				display: inline-block;
			}
		}
		.button-list{
			text-align: center;
		}
		.notAll{
			display: block;
			margin:0 auto;
			width:16px;
			height: 16px;
			transform: rotate(180deg);
			vertical-align: middle;
		}
		.showAll{
			display: block;
			margin:0 auto;
			width:16px;
			height: 16px;

			vertical-align: middle;
		}
		.formula{
			margin-left:12px;
			&>div{
				margin:10px 0;
			}
		}
	}
</style>