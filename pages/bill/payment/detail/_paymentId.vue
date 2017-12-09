<style lang="less"> 
.g-order-detail{
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}
		.u-txt-red{
			color:#FF6868;
		}
		.u-txt{
			color:#666;
		}
	}
</style>
<template>
<div class="g-order-detail">
	<sectionTitle label="回款详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="回款流水号：">
				{{basicInfo.tradeNo}}
			</labelText>
			<labelText label="回款方式：">
				{{basicInfo.payType}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="付款账号：">
				{{basicInfo.payAccount}}
			</labelText>
			<labelText label="回款金额：">
				{{basicInfo.amount}}
			</labelText>
			<labelText label="回款时间：">
				{{ctime}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="我司收款账号：">
				{{basicInfo.receiveAccount}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="操作记录">
			<Table border :columns="operation" :data="operationInfo"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>
import axios from 'kr/axios';
import DetailStyle from '~/components/detailStyle';
import labelText from '~/components/labelText';
import sectionTitle from '~/components/sectionTitle.vue';
import dateUtils from 'vue-dateutils';

export default {
	components:{
		DetailStyle,
		labelText,
		sectionTitle
	},
	data(){
		return{
			operationInfo:[],
			basicInfo:{},
			ctime:'',
			operation:[
				{
					title: '序号',
					key: 'billNo',
					align:'center'	
				},
				{
					title: '操作时间',
					key: 'billStartTime',
					align:'center'	,
					render(h, obj){
						let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.billStartTime));
						return time;
					}
				},
				{
					title: '操作人',
					key: 'billNo',
					align:'center'	
				},
				{
					title: '操作内容',
					key: 'billNo',
					align:'center'	
				}
			]
		}
	},
	created:function(){
		this.getInfo();
	},
	methods:{
		getInfo(){
			var _this=this;
			let {params}=this.$route
			let from={
				paymentId:params.paymentId
			};
			axios.get('get-payment-detail', from, r => {
				let data=r.data;
				this.basicInfo=data;
				this.ctime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.ctime));
				if(data.payWay=='BANKTRANSFER'){
					data.payType='银行转账	';
				}else if (data.payWay=='ALIAPPPAY'){
					data.payType='支付宝 ';
				}
					
           	}, e => {
                console.log('error',e)
            })
		},
	}

}
</script>