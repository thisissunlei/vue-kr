
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
						<Upload 
							:default-file-list="defaultList"
							:headers="this.headers" 
							:type="this.type" 
							:action="this.action"
							:multiple="this.multiple"
							:name="this.name"
							:format="this.format"
							:on-error="this.onError"
							:on-success="this.onSuccess"
							:on-format-error="this.onFormatError"
						>
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
 import axios from 'kr/axios';
export default{
	name:'krUpload',
	props:["file","type","action","headers","multiple","data","name","with-credentials","show-upload-list","accept","format","max-size","before-upload","on-progress","onSuccess","onError","on-preview","on-remove","onFormatError","on-exceeded-size","default-file-list"],
	data(){
		return {
			
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			},
			defaultList:!this.file.length?[]:this.file
		}
		
	},
	methods:{
		//上传列表的开关
		switchList:function(event){
			var detail = event.target.getBoundingClientRect();
			this.isOpenList = !this.isOpenList;
			this.listStyle = {
				left:detail.left+Math.ceil(detail.width/2)+"px",
				top:detail.top+detail.height+5+"px",
				transform:"translateX(-50%)"
			}
			this.getUpUrl();
		},
		//获取上传图片
		getUpUrl(){
			var that=this;
			var category="op/upload";
			console.log("8888888");
			axios.get('get-vue-upload-url', {
				isPublic:true,
				category,
			}, (response) => {
				console.log(response,"LLLLLLL")
			}, (error) => {
				_this.$Message.info(error);
			})   
		},
		
	},
	mounted(){
		console.log(this.file,"LLLLLLL")
	},
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