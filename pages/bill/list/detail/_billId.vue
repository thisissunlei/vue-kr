<style lang="less">
.g-bill-detail{
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
.u-tab-list{
	max-height: 282px;
	overflow: hidden;
	margin-bottom:10px;
	table td {
		height:48px;
	}
}
.u-tab-show{
	height:auto !important;
}
.u-show-tip{
	text-align: center;
	font-size:14px;
	color: #499DF1;
	margin:20px 0;
	.u-bottom{
		width:10px;
		height:6px;
		display: inline-block;
		margin-left: 8px;
		background:url('~assets/images/arrow_bottom.svg') no-repeat center center;
	}
	.u-top{
		width:10px;
		height:6px;
		margin-left: 8px;
		display: inline-block;
		background:url('~assets/images/arrow_top.svg') no-repeat center center;
	}
}


}
</style>
<template>
<div class="g-bill-detail">
	<SectionTitle label="账单详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="账单编号：">
				{{basicInfo.billNo}}
			</LabelText>	
			<LabelText label="账单类型：">
				{{basicInfo.billType}}
			</LabelText>
			<LabelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</LabelText>
			<LabelText label="社区名称：">
				{{basicInfo.communityName}}
			</LabelText>
			<LabelText label="付款截止日期：">
				{{basicInfo.billEndTime}}
			</LabelText>
			<LabelText label="账单状态：">
				{{basicInfo.billStatus}}
			</LabelText>
			<LabelText label="账单总金额：">
				{{basicInfo.amount}}
			</LabelText>
			<LabelText label="实际付款金额：">
				{{basicInfo.paidAmount}}
			</LabelText>
			<LabelText label="账单生成时间：">
				{{basicInfo.createTime}}
			</LabelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<div v-bind:class="[ISshow?showClass:hideClass]" >
				<Table border :columns="cost" :data="costInfo"></Table>
			</div>

			<div v-if="costInfo.length>5" class="u-show-tip">
				<div v-if="!ISshow" @click="showTab">展开<span class="u-bottom"></span></div>
				<div v-if="ISshow"@click="hideTab">收起<span class="u-top"></span></div>
			</div>
		</DetailStyle>	
		<DetailStyle info="结算记录">
			<Table border :columns="settle" :data="settleInfo"></Table>
		</DetailStyle>
	</div>
</div>
</template>
<script>
import axios from '~/plugins/http';
import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import SectionTitle from '~/components/SectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		LabelText,
		SectionTitle
	},
	data(){
		return{
			hideClass:'u-tab-list',
			showClass:'u-tab-show',
			ISshow:false,
			basicInfo:{},
			costInfo:[],
			settleInfo:[],
			cost:[
				{
				 title: '订单编号',
                 key: 'orderNo',
				 align:'center',
				 width:200
				},
				{
				 title: '备注',
                 key: 'remark',
                 align:'center'	
				},
				{
				 title: '金额',
                 key: 'amount',
				 align:'center',
				 width:200	
				}
			],
			settle:[
				{
				 title: '结算序号',
                 key: 'id',
                 align:'center'	
				},
				{
				 title: '结算方式',
                 key: 'srcType',
				 align:'center',
				 render(h, obj){
						if(obj.row.srcType==='BALANCE'){
							return '余额'
						}else if(obj.row.srcType==='PAYONLINE'){
							return '在线支付'
						}
				 	}
				},
				{
				 title: '结算金额',
                 key: 'amount',
                 align:'center'	
				},
				{
				 title: '结算时间',
                 key: 'createTime',
				 align:'center',
				 render(h, obj){
					 let time=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(obj.row.createTime));
					 return time;
				 }
				},
				{
				 title: '操作人',
                 key: 'createrName',
                 align:'center'	
				}
			]
		}
	},
	mounted:function(){
		this.getInfo();
	},
	methods:{
		getInfo(){
			var _this=this;
			let {params}=this.$route;
			let from={
				billId:params.billId
			};
			axios.get('get-bill-detail', from, r => {
				let data=r.data;
				if(data.bizType=='MEETING'){
					data.billType='会议室账单';
				}else if (data.bizType=='PRINT'){
					data.billType='打印服务账单';
				}else if (data.bizType=='CONTRACT'){
					data.billType='工位服务订单';
				}
				if(data.payStatus=='WAIT'){
					data.billStatus='待付款';
				}else if (data.payStatus=='PAID'){
					data.billStatus='已付清';
				}else if (data.payStatus=='PAYMENT'){
					data.billStatus='未付清';
				}
				this.basicInfo=data;
				this.costInfo=data.feeList;
				this.settleInfo=data.payList;
           	}, e => {
                console.log('error',e)
			})
			
		},
		showTab(){
			this.ISshow=true;
		},
		hideTab(){
			this.ISshow=false;
		}
	},
	mounted(){
		GLOBALSIDESWITCH("false");
	},



}

	
</script>
