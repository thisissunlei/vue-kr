

<template>	
    <div class="waiting">
		<span class="text">敬请期待</span>
    </div>
	

</template>

<script>
	export default {
		components:{
		},
		data (){
			return{
			}
		},
		methods:{


		},
		mounted(){
			GLOBALSIDESWITCH('false');
		}
	
	}
</script>
<style lang="less" scoped>
    .waiting{
    	margin:0 25px;
		background-color: #fff;
		border:1px dashed #EEE;
		height: 90px;
		line-height: 90px;
		padding:10px;
		.text{
			display:block;
			background-color: #F5F6FA;
			border-radius: 4px;
			font-size: 14px;
			color:#999;
			height: 70px;
			line-height: 70px;
			text-align: center;
		}
    }
</style>