<template>
	<div>
		<input 
			:id="inputId" 
			type="file" 
			style="display:none;" 
			@change="onChange"
			
		>
		<div class="only-up" v-if="type=='only'">
			<div class="up-show">
				<div class="up-show-box" v-for="(item,index) in defaultList" :key="index">
					<KrImg :src="item.url" width="60" height="60" type="cover"/>
					<div class="img-mask">
						
						<div class="delete-icon ivu-icon ivu-icon-trash-a" @click="delClick(index)"></div>
					</div>
				</div>
			</div>
			<div v-if="!defaultList || !defaultList.length" class="up-icon" @click="upBtnClick">
				<Icon type="plus-round"></Icon>
			</div>
			<slot  name="up-btn" ></slot>
		
		</div>
		<div v-if="type=='select-up'">
		
			<div 
				style="color: rgb(43, 133, 228);padding: 2px 7px;cursor: pointer;display:inlie-block;" 
				@click = "switchList" 
			
			>上传附件</div>
			
			<div class = "list-box" v-show = "isOpenList">
				<div class="mask" @click = "switchList" ></div>
				<div class="list" :style ="listStyle" >
					<div>
						
						
						<Button type="ghost" icon="ios-plus-outline" @click="upBtnClick" >上传附件</Button>
						<!-- <Icon type="ios-plus-outline"></Icon> -->
						<div v-bind:style="{display:isShowProgress}">
							<Progress  :percent="progress" :stroke-width="5"></Progress>	
						</div>
							
					
						<div class="item-box">
							<div class="file-list" :key="item.id" v-for="item in defaultList" @click="downFille(item)" >
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
// import http from '~/plugins/http.js';
import utils from '~/plugins/utils';
import KrImg from './KrImg';
export default{
	name:'krUpload',
	components: {
		KrImg
	},
	/**
	 *  @param {Object} columnDetail 当用在列表是的上传组件所在行的所有数据
	 *  @param {Array} file 上传组件上传的文件列表 
	 *  @param {Boolean} publicUse 判断文件上传到公共环境还是私有环境
	 *  @param {Function} onUpUrl 文件上传成功的回调方法 
	*/
	props:{
		columnDetail:Object,
		file:Array,
		publicUse:{
			default:false,
			type:Boolean
		},
		onUpUrl:Function,
		type:{
			type:String,
			default:'select-up'
		},
		multiple:{
			type:Boolean,
			default:true,
		}
	},
	data(){
		return {
			isOpenList:false,
			listStyle:{
				left:0,
				top:0,
			},
			inputId:'up-file'+this._uid,
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
		delClick(index){
			console.log(index,this.defaultList);
			var list = [].concat(this.defaultList);
			list.splice(index, 1);
			this.defaultList = [].concat(list);
		},
		upBtnClick(){
			let fileDom = document.getElementById(this.inputId);
			fileDom.click();
		},
		//错误提示
		config:function(){
			this.$Notice.config({
				top: 80,
				duration: 3
			});
        },
		//上传列表的开关
		switchList(event){
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
		},
		//获取上传的接口
		getUpFileUrl(event){
			let category = 'op/upload';
			let that = this;
			let file = event;
			var fileName= event.name;
			var form = new FormData();
			this.$http.get('get-vue-upload-url', {
				category:category,
				isPublic:that.publicUse
			}).then((res)=>{
				var response = res.data;
				form.append('OSSAccessKeyId', response.ossAccessKeyId);
				form.append('policy', response.policy);
				form.append('Signature', response.sign);
				form.append('key', response.pathPrefix+'/'+file.name);
				form.append('uid', response.uid);
				form.append('callback', response.callback);
				form.append('x:original_name', file.name);
				form.append('file', file);
				that.upfile(form,response.serverUrl,fileName)
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
		},
		upfile(form,serverUrl,fileName){
			var that  = this;
			
			var xhrfile = new XMLHttpRequest();
			xhrfile.timeout = 600000;
			xhrfile.onreadystatechange = function() {
				if (xhrfile.readyState === 4) {
					var fileResponse = xhrfile.response;
					if (xhrfile.status === 200) {
						if (fileResponse && fileResponse.code > 0) {
							// that.isLoadding=false;
							// that.percent = 0;
							var data = fileResponse.data;
							var params = {};
							
							params.name = fileName;
							params.url = fileResponse.data.url;
							params.fileId = ""+fileResponse.data.id;
							params.fileName = fileName;
							params.fileUrl = fileResponse.data.url;
							params.type = "ATTACHMENT"
							that.onSuccess(params);
						} else {
						
						}
					} else{
						that.$Notice.error({
							title:'上传失败请稍后重试'
						});
					}
					that.isLoadding=false;
					that.percent = 100;
				}
			};
			xhrfile.open('POST', serverUrl, true);
			xhrfile.responseType = 'json';
			xhrfile.send(form);
		},
		onChange(event){
			var file = event.target.files[0];
			if(file){
				this.getUpFileUrl(file);
			}
		},
		//上传成功
		onSuccess(params){
			
			var detail = Object.assign({},params);
			if(this.multiple){
				this.defaultList.push(detail)
			}else{
				this.defaultList = [detail];
			}
			
			// this.submitUpload([detail]);
			this.$emit('upSuccess',[detail],this.columnDetail);
			
		},
		onTokenSuccess(){

		},
		downFille(params){
            return ;
			var that=this;
			
			this.$http.post('get-station-contract-pdf-url', {
				id:params.fileId,
				
			}, (response) => {
				utils.downFile(response.data)
			
			}, (error) => {
				that.$Notice.error({
                    title:error.message
                });
			})   
		},
		listMove(file,fileList){
			this.defaultList = [].concat(fileList);
		
		},
	}
}
	
</script>

<style lang="less" scoped>
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
.only-up{
	.up-icon{
		height: 58px;
		width: 58px;
		text-align: center;
		line-height: 58px;
		border: 1px dashed #dddee1;
		cursor: pointer;
		font-size: 30px;
		vertical-align: middle;
		font-size: 26px;
		transition: all 0.3s;
	}
	.up-icon:hover{
		color: #2d8cf0;
		border: 1px dashed #57a3f3;
	}
	.up-show-box{
		display: inline-block;
		position: relative;
		width: 60px;
		height: 60px;
		border-radius: 4px;
		overflow: hidden;
		.img-mask{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-color: rgba(0,0,0,0.5);
			color:#fff;
			top: 0px;
			left: 0px;
			display: none;
			font-size: 20px;
		}

	}
	.up-show-box:hover .img-mask{
		display: block;
		text-align: center;
		.delete-icon{
			cursor: pointer;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -7px;
			margin-top: -10px;
		}
	}
	
}
</style>
