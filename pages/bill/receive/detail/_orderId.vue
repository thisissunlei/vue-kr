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
				{{basicInfo.orderNo}}
			</labelText>
			<labelText label="回款方式：">
				{{basicInfo.orderStatus}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.roomName}}
				</a>
			</labelText>
			<labelText label="付款账号：">
				{{basicInfo.totalAmount}}
			</labelText>
			<labelText label="回款金额：">
				{{orderStartTime}}
			</labelText>
			<labelText label="回款时间：">
				{{orderEndTime}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="我司收款账号：">
				{{basicInfo.customerName}}
			</labelText>
		</DetailStyle>
		<DetailStyle info="操作记录">
			<Table border :columns="operation" :data="operationInfo"></Table>
		</DetailStyle>
	</div>
</div>	
</template>
<script>
import axios from '~/plugins/http.js';
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
		//假数据--开始
		this.basicInfo={

		};
		this.costInfo=[{
				refundAmount:'-￥250.00',
				totalAmount:'￥300.00'
		}]
		this.billInfo=[
			{
				billNo:'HYSZD201712010001',
				billType:'MEETING',
				billStartTime:1511404234000,
				billEndTime:1511063377000,
				payStatus:'WAIT'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'PRINT',
				billStartTime:1509372919000,
				billEndTime:1509372919000,
				payStatus:'PAID'
			},
			{
				billNo:'HYSZD201712010001',
				billType:'CONTRACT',
				billStartTime:1505704034000,
				billEndTime:1505704034000,
				payStatus:'WAIT'
			}
		]
		let payStatus='PAID'
		this.orderStartTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1511404234000));
		this.orderEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1509372919000));
		this.cTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1505704034000));
		this.payStatus=payStatus=='WAIT'?'待付款':'已付款';
		//假数据--结束

		this.getInfo();
		
	},
	methods:{
		getInfo(){
			var _this=this;
			let {params}=this.$route
			let from={
				orderId:params.orderId
			};
			axios.get('order-detail', from, r => {
				console.log('r', r);
				let data=r.data;
				_this.basicInfo=data;
				_this.orderStartTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderStartTime));
				_this.orderEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.orderEndTime));
				_this.cTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.cTime));
				_this.payStatus=data.payStatus=='WAIT'?'待付款':'已付款';
				_this.coseInfo=[
					{
					refundAmount:data.refundAmount,
					totalAmount:data.totalAmount
					}
				]
				_this.billInfo=data.billList;
					
           	}, e => {
                console.log('error',e)
            })
		},
	}

}
</script>