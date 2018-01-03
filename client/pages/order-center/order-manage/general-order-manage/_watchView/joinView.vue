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
		订单详情
	</div>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="订单编号：">
			    {{basicInfo.customerName}}
			</LabelText>
			<LabelText label="订单状态：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="订单类型：">
				{{basicInfo.salerName}}
			</LabelText>
			<LabelText label="订单金额：">
				{{ctime}}
			</LabelText>
			<LabelText label="客户名称：">
				{{startDate}}
			</LabelText>
			<LabelText label="社区名称：">
				{{endDate}}
			</LabelText>
			<LabelText label="销售人员：">
				{{basicInfo.installmentTypeName}}
			</LabelText>
			<LabelText label="销售日期：">
				{{payDate}}
			</LabelText>
			<LabelText label=" 备注信息：">
				{{payDate}}
			</LabelText>
         </DetailStyle>
		 <DetailStyle info="相关账单">
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
            title: '订单详情'
        }
    },
	data(){
		return{
			basicInfo:{},
			ctime:'',
            contract:[
               {
				 title: '账单编号',
                 key: 'contractNum',
                 align:'center'	
				},
				{
				 title: '账单类型',
                 key: 'rentAmount',
                 align:'center'	
				},
				{
				 title: '账单生成日期',
                 key: 'orderStatusTypeName',
				 align:'center',
				 render(h, obj){
					let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.ctime));
					return time;
                  }	
				},
				{
				 title: '付款截止日期',
                 key: 'orderStatusTypeName',
                 align:'center',
				 render(h, obj){
					let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.ctime));
					return time;
                  }		
				},
				{
				 title: '账单状态',
                 key: 'orderStatusTypeName',
                 align:'center'	
				}   
			],
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
				   _this.contractData=r.data.orderContractInfo[0].contractNum?r.data.orderContractInfo:[];
           	}, e => {
                _this.$Notice.error({
                    title:e.message
                });
        })
	}
}
</script>