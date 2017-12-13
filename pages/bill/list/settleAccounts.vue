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
			应结账金额为<span class="u-txt-red"> ￥{{amount}}	</span>，您确定要结账吗？
		</div>
	</div>
</template>
<script>
import axios from 'kr/axios';

	export default {
		name:'settleAccounts',
		props:['detail'],
		data (){
			return{
				amount:'200',
				value:''
			}
		},
		methods:{
			getAmount(customerId){
				let params={
					customerId:customerId
				};
				axios.get('get-balance', params, r => {
                    this.amount=r.data.balance;
                }, e => {
                    console.log('error',e)
                })
			},
		},
		watch: {
			$props: {
				deep: true,
				handler(nextProps) {
					this.getAmount(this.detail.customerId)
				}
			}
		},
		
		
	}
</script>