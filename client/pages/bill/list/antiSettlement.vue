<template>

	<div class="u-wrap">

		<div class="u-text">
			结算金额：<span class="u-txt-red">￥{{detail.paidAmount}}</span>
		</div>

		 <Input
		 	v-model="value"
		 	placeholder="请输入反结算金额"
		 	size="large"
		 	style="width: 252px;margin-bottom:30px;"
		 />

	</div>

</template>

<script>

	export default {

		name:'antiSettlement',
		props:{
			detail:Object
		},
		data (){
			return{
				value:'',
			}
		},
		updated:function(){
			
        	this.$emit('formData', this.value);
		},
		watch: {

			$props: {
				deep: true,
				handler(nextProps) {
					if(this.detail.paidAmount){
						this.value=this.detail.paidAmount;
					}
					
				
					
				}
			}

		},
		
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
