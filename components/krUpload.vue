
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
							action="//jsonplaceholder/"
							:multiple="this.multiple"
							:name="this.name"
							:format="this.format"
							:before-upload= "onChange"
							:on-remove="listMove"
						>
							<Button type="ghost" icon="ios-plus-outline">上传附件</Button>
							<!-- <Icon type="ios-plus-outline"></Icon> -->
							<div v-bind:style="{display:isShowProgress}">
								<Progress  :percent="progress" :stroke-width="5"></Progress>	
							</div>
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
	props:["columnDetail","file","type","action","headers","multiple","data","name","with-credentials","show-upload-list","accept","format","max-size","before-upload","on-progress","onError","on-preview","on-remove","onFormatError","on-exceeded-size","default-file-list"],
	data(){
		return {
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			},
			params:{},
			defaultList:!this.file.length?[]:this.file,
			serverUrl:'',
			fileDetail:{},
			progress:0,
			isShowProgress:"none"
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
			if(!this.isOpenList){
				this.submitUpload()
			}
			this.getUpUrl();
		},
		submitUpload(){
			var _this = this;
			console.log({fileList:_this.params,requestId:_this.columnDetail.requestId},">>>>>>>")
			
			axios.post("post-list-upload-url", {
				fileList:JSON.stringify(_this.defaultList),
				requestId:_this.columnDetail.requestId,
			}, (response) => {
				
			}, (error) => {
				_this.$Message.info(error);
			})   
		},
		//获取上传图片
		getUpUrl(){
			var that=this;
			var category="op/upload";
			axios.get('get-vue-upload-url', {
				isPublic:true,
				category,
			}, (response) => {
				this.serverUrl = response.data.serverUrl;
			}, (error) => {
				_this.$Message.info(error);
			})   
		},
		onChange(event){
			// console.log(event,">>>>>>>>>>")
			let _this = this;
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
						if (_this.progress >= 100) {
								window.clearInterval(timer);
						}
						_this.progress += 10;
					
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

						_this.onTokenSuccess({
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
										//  _this.onSuccess(fileResponse.data,file);
										var params = {};
										_this.isShowProgress = "none";
										_this.progress = 100;
										params.name = fileName;
										params.url = fileResponse.data.url;
										params.fileId = ""+fileResponse.data.id;
										params.fileName = fileName;
										params.fileUrl = fileResponse.data.url;
										params.type = "ATTACHMENT"
										_this.onSuccess(params)

									} else {
										//报错
										_this.isShowProgress = "none";
										_this.progress = 100;
										console.log(fileResponse.msg)
										// _this.onError(fileResponse.msg);
									}
								} else if (xhrfile.status == 413) {
									_this.isShowProgress = "none";
										_this.progress = 100;
									console.log('您上传的文件过大！')
									// _this.onError('您上传的文件过大！');
								} else {
									_this.isShowProgress = "none";
									_this.progress = 100;
									console.log('后台报错请联系管理员！')
									// _this.onError('后台报错请联系管理员！');
								}
							}
						};
						xhrfile.open('POST', response.serverUrl, true);
						xhrfile.responseType = 'json';
						xhrfile.send(form);
					} else {
						_this.onTokenError();
					}
				}
				
			};

			xhr.open('GET', '/api/krspace-op-web/sys/upload-policy?isPublic=true&category='+category, true);
			xhr.responseType = 'json';
			xhr.send();
			// 暂时觉得此处用不着了，等连上服务器需要再检查一下
			


		},
		onSuccess(params){
			var detail = Object.assign({},params);
			this.defaultList.push(detail)
		},
		onTokenSuccess(){

		},
		listMove(file,fileList){
			this.defaultList = [].concat(fileList);
		
		},
	},
	
	mounted(){
		
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