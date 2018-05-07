<template>

<div class="g-order-detail">

	<SectionTitle title="回款详情"></SectionTitle>

	<div class="m-detail-content">

		<DetailStyle info="基本信息">

			<LabelText label="回款流水号：">
				{{basicInfo.tradeNo?basicInfo.tradeNo:'-'}}
			</LabelText>

			<LabelText label="回款方式：">
				{{basicInfo.payWay?basicInfo.payWay:'-'}}
			</LabelText>

			<LabelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName?basicInfo.customerName:'-'}}
				</a>
			</LabelText>

			<LabelText label="付款账号：">
				{{basicInfo.payAccount?basicInfo.payAccount:'-'}}
			</LabelText>
			<LabelText label="付款方名称：">
				{{basicInfo.payerName?basicInfo.payerName:'-'}}
			</LabelText>
			<LabelText label="回款金额：">
				￥{{basicInfo.amount?basicInfo.amount:'-'}}
			</LabelText>

			<LabelText label="回款时间：">
				{{basicInfo.occurDate?basicInfo.occurDate:'-'}}
			</LabelText>

			<LabelText label="社区名称：">
				{{basicInfo.communityName?basicInfo.communityName:'-'}}
			</LabelText>

			<LabelText label="我司收款账号：">
				{{basicInfo.receiveAccount?basicInfo.receiveAccount:'-'}}
			</LabelText>
			<LabelText label="备注：">
				{{basicInfo.remark?basicInfo.remark:'-'}}
			</LabelText>
			<LabelText label="创建时间：">
				{{basicInfo.ctime?basicInfo.ctime:'-'}}
			</LabelText>
		</DetailStyle>

	</div>
</div>

</template>

<script>

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
	head () {
		return {
			title: "回款详情"
		}
    },
	data(){
		return{
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
	mounted:function(){
		this.getInfo();
		GLOBALSIDESWITCH("false");
	},
	methods:{
		getInfo(){

			var _this=this;

			let {params}=this.$route

			let from={
				paymentId:params.paymentId
			};
			let payType={
				'NONE':'社区变更',
				'BANKTRANSFER':'银行转账',
				'ALIAPPPAY':'支付宝app',
				'WXPAY':'微信',
				'DEP_RENT':'押金转租',
				'TRANSFER':'转移',
				'RENT_DEP':'租金转押',
				'ALIWEBPAY':'支付宝网银',
				'BANKONLINE':'网银',
				'BANLANCE':'余额支付',
				'FUNDS_TRANSFER ':'资金转移'
			}
			
			this.$http.get('get-payment-detail', from).then((res)=>{
				let data=res.data;
				this.basicInfo=data;
				data.occurDate=dateUtils.dateToStr("YYYY-MM-DD",new Date(data.occurDate));
				data.ctime=dateUtils.dateToStr("YYYY-MM-DD",new Date(data.ctime));
				data.payWay=payType[data.payWay];
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
	},


}
</script>

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
