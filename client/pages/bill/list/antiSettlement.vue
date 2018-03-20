<template>

	<div class="u-wrap">

		<div class="u-text">
			反结算金额：<span class="u-txt-red">￥{{detail.paidAmount}}</span>
		</div>
        
		 

	</div>

</template>

<script>

	export default {

		name:'antiSettlement',
		props:{
			detail:Object
		}
	}
</script>

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
