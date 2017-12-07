<style lang="less">
.g-income-detail{
	.m-detail-content{
		padding:30px 24px;
	}
}
</style>
<template>
<div class="g-income-detail">
	<sectionTitle label="收入详情"></sectionTitle>
	<div class="m-detail-content">
		<DetailStyle info="基本信息">
			<labelText label="收入编号：">
				{{basicInfo.billNo}}
			</labelText>	
			<labelText label="收入类型：">
				{{billType}}
			</labelText>
			<labelText label="社区名称：">
				{{basicInfo.communityName}}
			</labelText>
			<labelText label="客户名称：">
				<a href="">
					{{basicInfo.customerName}}
				</a>
			</labelText>
			<labelText label="含税收入：">
				{{basicInfo.amount}}
			</labelText>
			<labelText label="收入确认时间：">
				{{billEndTime}}
			</labelText>
			<labelText label="操作人员：">
				{{basicInfo.paidAmount}}
			</labelText>
			<labelText label="操作时间：">
				{{createTime}}
			</labelText>
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
		//假数据--开始
		this.basicInfo={
		};
		this.costInfo=[{
				orderNo:'02201711121111110001',
				remark:'地球会议室创业大街社区，预订时段：2017-11-11 11：00 ~2017-11-11…',
				amount:'￥300.00'
		}]
		this.settleInfo=[
			{
				id:'HYSZD201712010001',
				srcType:'BALANCE',
				createTime:1511404234000,
				amount:'￥100.00',
				createrName:'啦啦啦'
			},
			{
				id:'HYSZD201712010001',
				srcType:'PAYONLINE',
				createTime:1509372919000,
				amount:'￥200.00',
				createrName:'哈哈'
			},
			{
				id:'HYSZD201712010001',
				srcType:'BALANCE',
				createTime:1505704034000,
				amount:'￥300.00',
				createrName:'坚实的积分'
			}
		]
		let billType='MEETING';
		let billStatus='WAIT';
		this.billEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1511404234000));
		this.createTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(1509372919000));
		
		if(billType=='MEETING'){
			this.billType='会议室账单';
		}else if (billType=='PRINT'){
			this.billType='打印服务账单';
		}else if (billType=='CONTRACT'){
			this.billType='工位服务订单';
		}
		if(billStatus=='WAIT'){
			this.billStatus='待付款';
		}else if (billStatus=='PAID'){
			this.billStatus='已付清';
		}else if (billStatus=='PAYMENT'){
			this.billStatus='未付清';
		}
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
				_this.coseInfo=data.feeList
				_this.settleInfo=data.billList;
				_this.billEndTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.billEndTime));
				_this.createTime=dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.createTime));
				
				if(data.billType=='MEETING'){
					_this.billType='会议室账单';
				}else if (data.billType=='PRINT'){
					_this.billType='打印服务账单';
				}else if (data.billType=='CONTRACT'){
					_this.billType='工位服务订单';
				}
				if(data.billStatus=='WAIT'){
					_this.billStatus='待付款';
				}else if (data.billStatus=='PAID'){
					_this.billStatus='已付清';
				}else if (data.billStatus=='PAYMENT'){
					_this.billStatus='未付清';
				}
                
           	}, e => {
                console.log('error',e)
            })
		},
	}


}

	
</script>
