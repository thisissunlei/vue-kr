<template>
<div class="g-order-detail">
	<div class="m-detail-header">
		<span class="u-border-left"/>
		订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="订单编号：">
			    {{basicInfo.orderNum}}
			</LabelText>
			<LabelText label="订单状态：">
				{{basicInfo.statusName}}
			</LabelText>
			<LabelText label="订单类型：">
				{{basicInfo.typeName}}
			</LabelText>
			<LabelText label="费用明细类型：">
				{{basicInfo.feeTypeName}}
			</LabelText>
			<LabelText label="订单金额：">
				{{basicInfo.money}}
			</LabelText>
			<LabelText label="客户名称：">
				{{basicInfo.customerName}}
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="销售人员：">
				{{basicInfo.salespersonName}}
			</LabelText>
			<LabelText label="销售日期：">
				{{saleDate}}
			</LabelText>
			<LabelText label="部门：">
				{{basicInfo.departmentName||'无'}}
			</LabelText>
			<LabelText label="服务开始日：" v-if="isWatch">
				{{startDate}}
			</LabelText>
			<LabelText label="服务结束日：" v-if="isWatch">
				{{endDate}}
			</LabelText>
			<LabelText label="加桌数量：" v-if="isWatch">
				{{basicInfo.deskCount||'无'}}
			</LabelText>
			<div class='remak'>
				<span>备注信息：</span>
				<span>{{basicInfo.remark}}</span>
			</div>
         </DetailStyle>
		 <DetailStyle info="相关账单">
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
	components:{
		DetailStyle,
		LabelText
	},

    head () {
        return {
            title: "查看订单详情-氪空间后台管理系统"
        }
    },
	
	data(){
		return{
			basicInfo:{},

			saleDate:'',
			startDate:'',
			endDate:'',
			isWatch:false,

            contract:[
               {
				 title: '账单编号',
                 key: 'billNum',
                 align:'center'	
				},
				{
				 title: '账单类型',
                 key: 'billType',
                 align:'center'	
				},
				{
				 title: '账单生成日期',
                 key: 'billCreateDate',
				 align:'center',
				 render(tag,params){
					let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.billCreateDate));
					return time;
                  }	
				},
				{
				 title: '付款截止日期',
                 key: 'billPayDate',
                 align:'center',
				 render(tag, params){
					let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.billPayDate));
					return time;
                  }		
				},
				{
				 title: '账单状态',
                 key: 'billStatus',
                 align:'center'	
				}   
			],

			contractData:[]
		}
	},

	mounted:function(){
		GLOBALSIDESWITCH("false");
		this.getDetailData();
	},

	methods: {
		getDetailData(){
			let {params}=this.$route;
			let from={
				id:params.watchView
			};
			var _this=this;
			this.$http.get('general-order-watch', from, r => {
					_this.basicInfo=r.data;
					if(r.data.orderType=='ADDDESK'){
						_this.isWatch=true;
					}
					_this.saleDate=r.data.saleDate?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(r.data.saleDate)):'';
					_this.startDate=r.data.startTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.startTime)):'';
					_this.endDate=r.data.endTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(r.data.endTime)):'';
					_this.contractData=r.data.bill?r.data.bill:[];
				}, e => {
					_this.$Notice.error({
						title:e.message
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
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.remak{
			width: 50%;
			font-size: 14px;
			color: #333333;
			line-height: 22px;
			padding-left: 14px;
			margin-bottom: 24px;
			word-break: break-all;
		}
	}
</style>