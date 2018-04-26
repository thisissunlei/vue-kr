<template>
	
	<div class="up-image">
		<EditLabel 
			:readOrEdit="readOrEdit" 
			:value="fileArr"
			@okClick="okClick"
			@cancelClick="cancelClick"
			labeType="file"
			@eyeImg="eyeImg"
		>
			
			<div class="view" v-for="(item, index ) in fileArr" :key="item.id">

				<img v-if="item.url" :src="item.url" alt="" @click="eyePhotoAlbum(index,$event)">
				
                <span 
                    class="delete-icon" 
                    @click="delImg(index,$event)"
                ></span>
				
			</div>

			<input :id="inputId" type="file" style="display:none;" @change="fileChange">
			<div class="up-icon" @click="addFileClick">
				+
			</div>
			</EditLabel>
			<PhotoAlbum :data="fileArr" @downImage="downImage" v-if="openPhotoAlbum" :eyeIndex="eyeIndex" @close="close"/>
	
	</div>
	
</template>

<script>
import PhotoAlbum from '../PhotoAlbum';
import EditLabel from './EditLabel';
import utils from '~/plugins/utils';
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
        downImage(url){
            utils.downFile(url)
        },
		close(){
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
		okClick(){
            this.$emit("okClick",this.fileArr)
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
            let urls = [].concat(this.fileArr);
            
            urls.splice(index,1);
            this.fileArr = [].concat(urls)
		},
		addFileClick(){
			var inputDom = document.getElementById(this.inputId);
			inputDom.click();
		},
		fileChange(event){
			
			var that = this;
			var file = event.target.files[0];
			that.getUpFileUrl(file);
			return ;
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
					that.getUpFileUrl(e);
					// that.fileArr.push({url:e.target.result})
					// document.getElementById(divPreviewId).innerHTML="<img src='"+e.target.result+"'>";
				}  
				reader.onloadend = function() { 
					if (reader.error) { 
						console.log(reader.error); 
					}else {
						that.getUpFileUrl(event);
					}
				}
				
		},
		upfile(form,serverUrl){
			var that  = this;

			// this.$http.get(serverUrl,{},form).then((res)=>{
			// 	console.log(res,"ppppppp")
			// 	var data = res.data;
			// 	that.fileArr.push({url:data.url});
			// }).catch((err)=>{
			// 	this.$Notice.error({
			// 		title:err.message
			// 	});
			// })

			// return;
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
			xhrfile.open('POST', serverUrl, true);
			xhrfile.responseType = 'json';
			xhrfile.send(form);
		},
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
				that.upfile(form,response.serverUrl)
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
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
.up-image{
	display: inline-block;
	width: 845px;
	min-height: 198px;
	background:  #EEEEEE;
    padding-bottom: 10px;
	.edit-label{
		width: 100%;
	}
	
	.up-icon{
		display: inline-block;
		width: 180px;
		height: 135px;
		margin-left: 20px;
		text-align: center;
		cursor: pointer;
		vertical-align: middle;
		line-height: 135px;
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
		margin: 30px 30px 10px;        

	}
	.up-icon:hover{
		border: 1px dashed #2d8cf0;
    }
    
	.view{
		display: inline-block;
		width: auto;
		height: 135px;
		text-align: center;
        line-height: 135px;
		margin: 30px 30px 10px;        
		
		// overflow: hidden;
		background: #fff;
		position: relative;
		
		margin-right: 4px;
		vertical-align: middle;
        position: relative;
        margin-right: 20px;
		img{
			display: inline-block;
            height: 100%;
            cursor: pointer;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            display: block;
            margin: 0px;
		}
		.delete-icon{
            position: absolute;
            top: -5px;
            right: -5px;
            width: 18px;
            height: 18px;
            background-image: url(../images/close.svg);
            background-size:100%;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-color:#fff; 
            cursor: pointer;

        }
	

	}
	.view:hover .view-mask{
		display: block;
	}
}
</style>
