<template>
	
	<div class="up-files">
		<EditLabel 
			:readOrEdit="readOrEdit" 
			:value="fileArr"
			@okClick="okClick"
			@cancelClick="cancelClick"
			labeType="file"
			@eyeImg="eyeImg"
		>
			<div class="view" v-for="(item, index ) in fileArr" :key="item.id">
				<img v-if="item.url" :src="item.url" alt="">
				<div class="view-mask">
					
					<span 
						class="ivu-icon ivu-icon-eye" 
						style="font-size:20px;margin:5px;color:#fff;"
						@click="eyePhotoAlbum(index,$event)"
					></span>
					<span 
						class="ivu-icon ivu-icon-trash-a" 
						style="font-size:20px;margin:5px;color:#fff;"
						@click="delImg(index,$event)"
					></span>
				</div>
				
			</div>

			<input :id="inputId" type="file" style="display:none;" @change="fileChange">
			<div class="up-icon" @click="addFileClick">
				+
			</div>
			</EditLabel>
			<PhotoAlbum :data="fileArr" v-if="openPhotoAlbum" :eyeIndex="eyeIndex" @close="close"/>
	
	</div>
	
</template>

<script>
import PhotoAlbum from '../PhotoAlbum';
import EditLabel from './EditLabel'
export default{
	components:{
		PhotoAlbum,
		EditLabel
	},
    props:{
        publicUse:{
            default:false,
            type:Boolean
		},
		value:{
			default:()=>[],
			type:Array
		},
		readOrEdit:{
			default:false,
			type:Boolean
		}
		
    },
    data(){
        return {
			upUrl:'',
			fileArr:[],
			inputId:'inputId'+this._uid,
			openPhotoAlbum:false,
			eyeIndex:0,
        }
	},
	mounted(){
		this.fileArr = [].concat(this.value)
	},
	methods:{
		close(){
			console.log("======")
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
		okClick(){
           
            this.$emit("okClick",this.labelValue)
		},
		eyeImg(index){
			this.eyeIndex = index;
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
        cancelClick(event){
            // this.inputValue = event
        },
		eyePhotoAlbum(index,event){
			this.eyeIndex = index;
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
		delImg(index,event){
			
			// this.fileArr.split(index,1);
		},
		addFileClick(){
			var inputDom = document.getElementById(this.inputId);
			inputDom.click();
		},
		fileChange(event){
			
			var that = this;
			var file = event.target.files[0];
			var reader = new FileReader(); 
			reader.readAsDataURL(file);
			// console.log("pppooooo",reader)
				reader.onloadstart = function() { 
					// 这个事件在读取开始时触发
					console.log("onloadstart"); 
				}
				reader.onprogress = function() { 
					// 这个事件在读取进行中定时触发
					console.log("onprogress"); 
				} 
			   	reader.onload = function(e){
					   // 这个事件在读取成功结束后触发
			
					that.fileArr.push({url:e.target.result})
					// document.getElementById(divPreviewId).innerHTML="<img src='"+e.target.result+"'>";
				}  
				reader.onloadend = function() { 
					if (reader.error) { 
						console.log(reader.error); 
					}
				}
				
		},
        upFile(event){
			
			let category = 'op/upload';
			let that = this;
			let file = event.target.files;
			console.log(file.target)

			return ;
			var fileName= event.name;
			if (!file) {
				return;
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
						var xhrfile = new XMLHttpRequest();
						xhrfile.onreadystatechange = function() {
							if (xhrfile.readyState === 4) {
								var fileResponse = xhrfile.response;
								if (xhrfile.status === 200) {
									if (fileResponse && fileResponse.code > 0) {
										var data = fileResponse.data;
										that.fileArr.push({url:data.url});
									} else {
									
									}
								} else{

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

			xhr.open('GET', '/api/krspace-op-web/sys/upload-policy?isPublic='+that.publicUse+'&category='+category, true);
			xhr.responseType = 'json';
			xhr.send();
        },
        onTokenError(){

        },
        onTokenSuccess(){

		},
    	//上传成功
		onSuccess(params){
			var detail = Object.assign({},params);
			this.defaultList.push(detail)
			this.submitUpload([detail]);
		},
    }
}
	
</script>

<style lang="less" scoped>
.up-files{
	.up-icon{
		display: inline-block;
		width: 60px;
		height: 60px;
		
		text-align: center;
		cursor: pointer;
		vertical-align: middle;
		line-height: 60px;
		vertical-align: middle;
		background: #fff;
		border: 1px dashed #dddee1;
		border-radius: 4px;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: border-color .2s ease;
		font-size: 40px;

	}
	.up-icon:hover{
		border: 1px dashed #2d8cf0;
	}
	.view{
		display: inline-block;
		width: auto;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
		vertical-align: middle;
		position: relative;
		img{
			display: inline-block;
			height: 100%;
		}
		.view-mask{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			display: none;
			background: rgba(0,0,0,.6);
			cursor: pointer;
		}
	

	}
	.view:hover .view-mask{
		display: block;
	}
}
</style>
