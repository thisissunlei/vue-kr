<style lang="less">
.g-bill-detail{
		.m-detail-content{
			padding:30px 24px;
			.ivu-table-wrapper{
				margin-bottom:30px;
			}
		}

	}
</style>
<template>
<div class="g-bill-detail">
	<sectionTitle label="账单详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="账单编号：">
				{{basicInfo.billNo}}
			</labelText>	
			<labelText label="账单类型：">
				{{basicInfo.billType}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="付款截止日期：">
				{{basicInfo.billEndTime}}
			</labelText>
			<labelText label="账单状态：">
				{{basicInfo.billStatus}}
			</labelText>
			<labelText label="账单总金额：">
				{{basicInfo.amount}}
			</labelText>
			<labelText label="实际付款金额：">
				{{basicInfo.paidAmount}}
			</labelText>
			<labelText label="账单生成时间：">
				{{basicInfo.createTime}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="费用明细">
			<Table border :columns="cost" :data="costInfo"></Table>
		</DetailStyle>	
		<DetailStyle info="结算记录">
			<Table border :columns="settle" :data="settleInfo"></Table>
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
							return <span class="u-txt-red">余额</span>;
						}else if(obj.row.srcType==='PAYONLINE'){
							return <span class="u-txt">在线支付</span>;
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
	created:function(){
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
				if(data.billPayStatus=='WAIT'){
					data.billStatus='待付款';
				}else if (data.billPayStatus=='PAID'){
					data.billStatus='已付清';
				}else if (data.billPayStatus=='PAYMENT'){
					data.billStatus='未付清';
				}
				this.basicInfo=data;
				this.costInfo=data.feeList;
				this.settleInfo=data.payList;
           	}, e => {
                console.log('error',e)
			})
			
		}
	}


}

	
</script>
