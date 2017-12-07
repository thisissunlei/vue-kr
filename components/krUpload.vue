
<template>
	<div>
		<div>
			<div @click = "switchList">
				合同附件
			</div>
			<div class = "list-box" v-show = "isOpenList">
				<div class="mask" @click = "switchList" ></div>
				<div class="list" :style ="listStyle" >
					<div>
						<Upload action="//jsonplaceholder.typicode.com/posts/">
							<Button type="ghost" icon="ios-plus-outline">上传附件</Button>
							<!-- <Icon type="ios-plus-outline"></Icon> -->
						</Upload>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'krUpload',
	data(){
		return {
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			}
		}
		
	},
	methods:{

		switchList:function(event){
			var detail = event.target.getBoundingClientRect();
			console.log(detail,"OOOOOOO")
			this.isOpenList = !this.isOpenList;
			this.listStyle = {
				left:detail.left+Math.ceil(detail.width/2)+"px",
				top:detail.top+detail.height+5+"px",
				transform:"translateX(-50%)"
			}
		}
		
	}
}
	
</script>

<style lang="less">
.list-box{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
	z-index: 999;
	.list{
		position: fixed;
		// width: 100%;
		transform: translateX(-50%);
		/* left: 0px; */
		display: inline-block;
		background: #fff;
		padding: 10px;
		box-shadow: 0 0 5px #999;
		border-radius: 4px;
	}
	.mask{
		position: absolute;
		left: 0px;
		top: 0px;
		bottom: 0px;
		right: 0px;
		// background: red;

	}
}

</style>