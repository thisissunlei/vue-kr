<style lang="less">
	.u-wrap{
		width:252px;
		margin:0 auto;
		.u-text{
			font-size: 14px;
			color: #333333;
			text-align: center;
			margin:25px auto;
			.u-txt-red{
				color:red;
				font-size: 18px;
				line-height: 20px;
			}
		}
		input{
			text-align: center;
		}
	
}

</style>
<template>
	<div class="u-wrap">
		<div class="u-text">
			结账金额：<span class="u-txt-red">￥{{detail.paidAmount}}</span>	
		</div>
		 <Input 
		 	v-model="value" 
		 	placeholder="请输入反结账金额" 
		 	size="large"
		 	style="width: 252px;margin-bottom:30px;"
		 ></Input>
	</div>
</template>
<script>
import axios from 'kr/axios';

	export default {
		name:'antiSettlement',
		props:['detail'],
		data (){
			return{
				value:'',
			}
		},
		methods:{
			getAmount(){
				let params={};
				axios.get('get-bill-list', params, r => {
                    this.amount=r.data.items;
                }, e => {
                    console.log('error',e)
                })
			},
		}
	}
</script>