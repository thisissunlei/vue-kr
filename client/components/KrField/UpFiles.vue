<template>
	
	<div class="up-files">
		<EditLabel 
			:readOrEdit="readOrEdit" 
			:value="fileArr"
			@okClick="okClick"
			@cancelClick="cancelClick"
			labeType="file"
			@eyeImg="eyeImg"
			@recordClick="recordClick"

		>
			
			<div class="view" v-for="(item,index) in fileArr" :key="item.id">

				<!-- <img v-if="item.url" :src="item.url" alt=""/> -->
				<div 
					:class="{
						'file-type-style':true, 
						'file-icon-other':getTyep('other',index),
						'file-icon-word':getTyep('word',index),
						'file-icon-excel':getTyep('excel',index),
						'file-icon-ppt':getTyep('ppt',index),
					}"
				>

				</div>
				<div class="file-name">
					什么鬼
					<div class="down-file"></div>
				</div>
				 <span 
                    class="delete-icon" 
                    @click="delFile(index,$event)"
                ></span>
			</div>

			<input 
				:id="inputId" 
				type="file" 
				style="display:none;" 
				@change="fileChange"
			>
			<div class="up-icon" @click="addFileClick">
				<div class="add-icon"></div>
                <div class="add-text">上传文件</div>
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
			fileTypes:[],
        }
	},
	mounted(){
		this.fileArr = [].concat(this.value)
	},
	methods:{
		getTyep(type,index){
			if(this.fileTypes[index]==type){
				return true;
			}
			return false;
		},
		getExt(url){
			var word="doc,docx,docm,dotx,dotm";
			var excel="xls,xlsx,xlsm,xltm,xlsb,xlam";
			var ppt="pptx,pptm,ppsx,ppsm,potx,potm,ppam";
			var index= url.lastIndexOf(".");
			var ext = url.substr(index+1);
			if(word.indexOf(ext)>0){
				return 'word';
			}
			return ext;
		},
		recordClick(value){
            this.$emit('recordClick',value)
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
		delFile(index,event){
			let urls = [].concat(this.fileArr);
			let types = [].concat(this.fileTypes);
			urls.splice(index,1);
			types.splice(index,1);
			this.fileTypes = [].concat(types);
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
			
		},
		upfile(form,serverUrl){
			var that  = this;
			var xhrfile = new XMLHttpRequest();
			xhrfile.onreadystatechange = function() {
				if (xhrfile.readyState === 4) {
					var fileResponse = xhrfile.response;
					if (xhrfile.status === 200) {
						if (fileResponse && fileResponse.code > 0) {
							var data = fileResponse.data;
						
							that.fileArr.push({url:data.url});
							that.fileTypes.push(that.getExt(data.url));
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
.up-files{
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
		
		background: #fff;
		border: 1px dashed #dddee1;
		border-radius: 4px;
		
	
		position: relative;
		overflow: hidden;
		transition: border-color .2s ease;
		margin: 30px 30px 10px;        
        .add-icon{
            width: 38px;
            height: 38px;
            margin: auto;
            background-image: url(./images/add_icon.svg);
            background-size:100%;
            border-radius: 50%;
            background-repeat: no-repeat;
            margin-top: 35px;
        }
        .add-text{
            text-align: center;
            color: #4F9EED;
            height: 30px;
            line-height: 30px;
        }
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
		background: #fff;
		position: relative;
		margin-right: 4px;
		vertical-align: middle;
        position: relative;
        margin-right: 20px;
		.file-type-style{
			display: inline-block;
            height: 100%;
            cursor: pointer;
            // box-shadow: 0 1px 1px rgba(0,0,0,.2);
            display: block;
			margin: 0px;
			width: 210px;
			height: 100px;
			background: red;
		}
		.file-name{
			height: 35px;
			line-height: 35px;
			padding-right: 40px;
			box-sizing: border-box;
			text-align: left;
			padding-left: 10px;
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
		.file-icon-word{
			background-image: linear-gradient(46deg, #81C8FA 0%, #468CDF 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0 4px 4px;
		}
		.file-icon-excel{
			background-image: linear-gradient(45deg, #75C9C3 0%, #33AC99 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0 4px 4px;
		}
		.file-icon-ppt{
			background-image: linear-gradient(52deg, #FFAC96 0%, #FF6868 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0 4px 4px;
		}
		.file-icon-other{
			background-image: linear-gradient(45deg, #B4ABE5 0%, #7C6FD7 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0 4px 4px;
		}
	

	}
	.view:hover .view-mask{
		display: block;
	}
}
</style>
