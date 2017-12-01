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
			账户余额：<span class="u-txt-red">￥{{amount}}</span>	
		</div>
		 <Input 
		 	v-model="value" 
		 	placeholder="请输入结账金额" 
		 	size="large"
		 	style="width: 252px;margin-bottom:30px;"
		 ></Input>
	</div>
</template>
<script>
	export default {
		name:'settleAccounts',
		data (){
			return{
				amount:'200'
			}
		}
	}
</script>