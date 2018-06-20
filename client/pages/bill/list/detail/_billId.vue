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
.u-amount-list{
	text-align: right;
	height: 90px;
	margin-bottom:24px;
}
.u-amount{
	height:28px;
	line-height:28px;
	span{
		display:inline-block;
		width:100px;
		text-align: right;
	}
}
.txt-bold{
	font-weight: bold;
}

.u-txt-red{
	color:#FF6868;
}


}
</style>
<template>
<div class="g-bill-detail">
	<SectionTitle title="账单详情"></SectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<LabelText label="账单编号：">
				{{basicInfo.billNo}}
			</LabelText>	
			<LabelText label="账单类型：">
				{{basicInfo.bizType}}
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
			<LabelText label="支付状态：">
				{{basicInfo.payStatus}}
			</LabelText>
			<LabelText label="账单金额：">
				￥{{basicInfo.payableAmount}}
			</LabelText>
			<LabelText label="实际付款金额：">
				￥{{basicInfo.paidAmount}}
			</LabelText>
			<LabelText label="账单日：">
				{{basicInfo.billingDate}}
			</LabelText>
			<LabelText label="收款账号：">
				{{basicInfo.bankAccount}}
			</LabelText>
			<LabelText label="创建时间：">
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
			<div class="u-amount-list">
				<div class="u-amount">
					费用合计：<span>￥{{basicInfo.totalAmount}}</span>
				</div>
				<div class="u-amount">
					减免金额：<span>￥-{{basicInfo.freeAmount}}</span>
				</div>
				<div class="u-amount txt-bold">
					账单金额：<span class="u-txt-red">￥{{basicInfo.payableAmount}}</span>
				</div>
			</div>
		</DetailStyle>	
		<DetailStyle info="结算记录">
			<Table border :columns="settle" :data="settleInfo"></Table>
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
                title: "账单详情"
            }
    },
	data(){
		return{
			hideClass:'u-tab-list',
			showClass:'u-tab-show',
			ISshow:false,
			basicInfo:{},
			costInfo:[],
			settleInfo:[],
			billType:{},
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
					 let srcType={
							'BALANCE':'余额',
							'EARNEST':'定金',
							'VOUCHER':'抵扣券',
							'PAYONLINE':'在线支付',
							'BANKTRANSFER':'银行转账',
							'RELEASE':'反结算'
						}
						return srcType[obj.row.srcType]
						
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
		GLOBALSIDESWITCH("false");
		this.getInfo();
		
	},
	methods:{
		getBillType(){
                this.$http.get('get-bill-type', '').then((res)=>{
                    res.data.enums.map((item)=>{
                         this.billType[item.code]=item.name;  
                    })
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
        },
		getInfo(){
			this.getBillType();
			var _this=this;
			let {params}=this.$route;
			let from={
				billId:params.billId
			};
			
			let payStatus={
				'WAIT':'待付款',
				'PAID':'已付清',
				'PAYMENT':'未付清',
			}
			this.$http.get('get-bill-detail', from).then((res)=>{
				let data=res.data;
				data.bizType=this.billType[data.bizType];
				data.payStatus=payStatus[data.payStatus];
				this.basicInfo=data;
				this.costInfo=data.feeList;
				this.settleInfo=data.payList;
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
		},
		showTab(){
			this.ISshow=true;
		},
		hideTab(){
			this.ISshow=false;
		}
	},
	



}

	
</script>
