<template>
	<div>
		<div>
			<div @click = "switchList" style="cursor: pointer;">
				上传附件
			</div>
			<div class = "list-box" v-show = "isOpenList">
				<div class="mask" @click = "switchList" ></div>
				<div class="list" :style ="listStyle" >
					<div>
						<Upload 
							:headers="this.headers" 
							:type="this.type" 
							action="//jsonplaceholder/"
							:multiple="this.multiple"
							:name="this.name"
							:format="this.format"
							:before-upload= "onChange"
							:on-remove="listMove"
						>
							<Button type="ghost" icon="ios-plus-outline" >上传附件</Button>
							<!-- <Icon type="ios-plus-outline"></Icon> -->
							<div v-bind:style="{display:isShowProgress}">
								<Progress  :percent="progress" :stroke-width="5"></Progress>	
							</div>
							
						</Upload>
						<div class="item-box">
							<div class="file-list" v-for="item in defaultList" @click="downFille(item)" >
								{{item.fileName}}
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>


 import http from '~/plugins/http.js';
 
export default{
	name:'krUpload',
	props:["onUpUrl","columnDetail","file","type","action","headers","multiple","data","name","with-credentials","show-upload-list","accept","format","max-size","before-upload","on-progress","onError","on-preview","on-remove","onFormatError","on-exceeded-size","default-file-list"],
	data(){
		return {
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			},
			newWin:'',
			params:{},
			defaultList:!this.file.length?[]:this.file,
			serverUrl:'',
			nowFile:{},
			fileDetail:{},
			progress:0,
			isShowProgress:"none"
		}
		
	},
	methods:{
		//错误提示
		config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
        },
		//上传列表的开关
		switchList:function(event){
			var detail = event.target.getBoundingClientRect();
			this.isOpenList = !this.isOpenList;
			if(this.isOpenList){
				document.body.style.overflow = "hidden";
			}else{
				document.body.style.overflow = "auto";
			}
			this.listStyle = {
				left:detail.left+Math.ceil(detail.width/2)+"px",
				top:detail.top+detail.height+5+"px",
				transform:"translateX(-50%)"
			}
			if(!this.isOpenList){
				// this.submitUpload()
			}
			
		},
		submitUpload(detail){
			this.config();
			this.onUpUrl && this.onUpUrl(detail,this.columnDetail);
			
		},
		//获取上传图片
		getUpUrl(){
			var that=this;
			var category="op/upload";
			this.config();
			http.get('get-vue-upload-url', {
				isPublic:true,
				category,
			}, (response) => {
				this.serverUrl = response.data.serverUrl;
			}, (error) => {
				that.$Notice.error({
                        title:error.message
                });
			})   
		},
		onChange(event){
			
			let that = this;
			let file = event;
			var fileName= event.name;
			if (!file) {
				return;
			}
			let category = 'op/upload';
			if (file) {
				this.isShowProgress = "block";
				this.progress = 0;
				var timer = window.setInterval(function() {
						if (that.progress >= 100) {
								window.clearInterval(timer);
						}
						that.progress += 10;
					
				}, 300);
			}
			var form = new FormData();
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var response = xhr.response.data;
						form.append('OSSAccessKeyId', response.ossAccessKeyId);
						form.append('policy', response.policy);
						form.append('Signature', response.sign);
						form.append('key', response.pathPrefix+'/'+file.name);
						form.append('uid', response.uid);
						form.append('callback', response.callback);
						form.append('x:original_name', file.name);
						form.append('file', file);

						that.onTokenSuccess({
							sourceservicetoken: response.token,
							docTypeCode: response.docTypeCode,
							operater: response.operater
						});
						
						var xhrfile = new XMLHttpRequest();
						xhrfile.onreadystatechange = function() {
							if (xhrfile.readyState === 4) {
								var fileResponse = xhrfile.response;
								if (xhrfile.status === 200) {
									if (fileResponse && fileResponse.code > 0) {
										//  that.onSuccess(fileResponse.data,file);
										var params = {};
										that.isShowProgress = "none";
										that.progress = 100;
										params.name = fileName;
										params.url = fileResponse.data.url;
										params.fileId = ""+fileResponse.data.id;
										params.fileName = fileName;
										params.fileUrl = fileResponse.data.url;
										params.type = "ATTACHMENT"
										that.onSuccess(params)

									} else {
										//报错
										that.isShowProgress = "none";
										that.progress = 100;
										console.log(fileResponse.msg)
										that.$Notice.error({
												title:fileResponse.msg
										});
										// that.onError(fileResponse.msg);
									}
								} else if (xhrfile.status == 413) {
									that.isShowProgress = "none";
									that.progress = 100;
									
									that.$Notice.error({
										title:"您上传的文件过大！"
									});
									// that.onError('您上传的文件过大！');
								} else {
									that.isShowProgress = "none";
									that.progress = 100;
									
									that.$Notice.error({
										title:'后台报错请联系管理员！'
									});
								
								}
							}
						};
						xhrfile.open('POST', response.serverUrl, true);
						xhrfile.responseType = 'json';
						xhrfile.send(form);
					} else {
						that.onTokenError();
					}
				}
				
			};

			xhr.open('GET', '/api/krspace-op-web/sys/upload-policy?isPublic=true&category='+category, true);
			xhr.responseType = 'json';
			xhr.send();
		},
		//上传成功
		onSuccess(params){
			var detail = Object.assign({},params);
			this.defaultList.push(detail)
			this.submitUpload([detail]);
			
		},
		onTokenSuccess(){

		},
		downFille(params){
			var that=this;
			this.newWin = window.open();
			this.$http.post('get-station-contract-pdf-url', {
				id:params.fileId,
				
			}, (response) => {
				 that.newWin.location = response.data;
			
			}, (error) => {
				that.$Notice.error({
                    title:error.message
                });
			})   
			// var url = `/api/krspace-op-web/sys/downFile?fileId=${params.fileId}`
		},
		listMove(file,fileList){
			this.defaultList = [].concat(fileList);
		
		},
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
	.item-box{
		max-height: 200px;
		overflow: auto;
	}
	.file-list{
		padding: 5px;
		color: #333;

	}
	.file-list:hover{
		color: rgb(43, 133, 228);
		cursor: pointer;
	}
}

</style>
