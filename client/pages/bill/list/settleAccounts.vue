<style lang="less">

	.u-wrap{

		width:290px;
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

			p{
				margin-top:16px;
			}

		}

}

</style>

<template>

	<div class="u-wrap">
		<div class="u-text">
			应结账金额为<span class="u-txt-red"> ￥{{detail.payableAmount}}	</span>，您确定要结账吗？
			<p>（账户余额为 ¥{{amount}}）</p>
		</div>
	</div>

</template>

<script>

	export default {
		name:'settleAccounts',
		props:['detail'],
		data (){
			return{
				amount:'200',
			}
		},
		methods:{

			getAmount(customerId){
				let params={
					customerId:customerId
				};
				this.$http.get('get-balance', params).then((res)=>{
					this.amount=res.data.balance;
				}).catch((err)=>{
					this.$Notice.error({
						title:err.message
					});
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

		}



	}
</script>
