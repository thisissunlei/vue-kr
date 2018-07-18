<template>
	<div class="g-order-detail">
		<div class="m-detail-header">
			<span class="u-border-left"/>
			商品详情
		</div>
		<div style="font-size:26px;font-weight:bold;padding-left: 48px;padding-top: 20px;">802</div>
		<div class="m-detail-content">
			<DetailStyle info="基本信息">
				<LabelText label="商品定价：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="工位单价：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="城市：">
					{{basicInfo.salerName}}
				</LabelText>
				<LabelText label="社区：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="楼层：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="类型：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="工位：">
					{{basicInfo.customerName}}
				</LabelText>
				<LabelText label="面积：">
					{{basicInfo.communityName}}
				</LabelText>
				<LabelText label="方位：">
					{{basicInfo.salerName}}
				</LabelText>
				<LabelText label="套间：">
					{{basicInfo.ctime| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="位置：">
					{{basicInfo.orderStatusName}}
				</LabelText>
				<LabelText label="描述：">
					{{(basicInfo.effectDate || '-')| dateFormat('YYYY-MM-dd HH:mm:SS')}}
				</LabelText>
				<LabelText label="空间：">
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
            title: '商品详情'
        }
    },
	components:{
		DetailStyle,
		LabelText
	},
	data(){
		return{
			basicInfo:{},
			service:[
				{
				 title: '时间',
                 key: 'startDate',
				 align:'center',
				 render(tag,params){
					 let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.startDate));
					 return time;
				 }	
                },
				{
                    title:'状态',
                    key:'capacity',
                    align:'center'	
                },
				{
				 title: '时长',
                 key: 'originalPrice',
                 align:'center'	
                }
			],

            contract:[
               {
				 title: '修改内容',
                 key: 'contractNum',
                 align:'center'	
				},
				{
				 title: '修改前',
                 key: 'rentAmount',
                 align:'center'	
				},
				{
				 title: '修改后',
                 key: 'orderStatusTypeName',
                 align:'center'	
				},
				{
				 title: '修改时间',
                 key: 'rentAmount',
                 align:'center'	
				},
				{
				 title: '操作者',
                 key: 'orderStatusTypeName',
                 align:'center'	
				},
				{
				 title: '备注',
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
					
					this.serviceData=response.data.orderSeatDetailVo||[];
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
			padding: 15px 24px 30px 24px;
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
		.formula{
			margin-left:12px;
			&>div{
				margin:10px 0;
			}
		}
	}
</style>