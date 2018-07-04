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
			@eyePhotoAlbum="eyePhotoAlbum"
			:isOk="isOk"
			:right="right"
		>
			<div class="view-box" :style="commentColor?{backgroundColor:'#fff'}:{}">


				<div  class="view" v-for="(item,index) in newFileArr" :key="item.id">

					<KrImg
						v-if="getIsPhoto(item.fieldUrl)"
						@click="eyePhotoAlbum(item.fieldUrl,'edit',$event)"
						:src="item.fieldUrl"
						width="210"
						height="135"
						type="cover"
					/>
					<div
						v-if="!getIsPhoto(item.fieldUrl)"
						:class="{
							'file-type-style':true,
							'file-color-other':getExt(item.fieldUrl)=='other',
							'file-color-word':getExt(item.fieldUrl)=='word',
							'file-color-excel':getExt(item.fieldUrl)=='excel',
							'file-color-ppt':getExt(item.fieldUrl)=='ppt',
						}"
					>
						<div
							:class="{
								'file-icon':true,
								'file-icon-other':getExt(item.fieldUrl)=='other',
								'file-icon-word':getExt(item.fieldUrl)=='word',
								'file-icon-excel':getExt(item.fieldUrl)=='excel',
								'file-icon-ppt':getExt(item.fieldUrl)=='ppt',
							}"
						></div>
					</div>
					<div
						v-if="!getIsPhoto(item.fieldUrl)"
						class="file-name"
					>
						{{getFileName(index)}}
						<div class="down-file" @click="downFile(item.fieldUrl)"></div>
					</div>
					 <span
                      v-if="!commentColor"
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
				<button type="button" class="up-icon" v-if="!commentColor" @click="addFileClick">
					<div class="add-icon"></div>
	                <div class="add-text">上传文件</div>
					<div style="height:30px;line-height:30px;">
						<Progress v-if="isLoadding" :percent="percent" :stroke-width="3"></Progress>
					</div>

				</button>

			</div>
		</EditLabel>
		<PhotoAlbum @downFile="downImg" :data="imagesArr" v-if="openPhotoAlbum" :eyeIndex="eyeIndex" @close="close"/>

	</div>

</template>

<script>
import PhotoAlbum from '../PhotoAlbum';
import EditLabel from './EditLabel';
import utils from '~/plugins/utils';
import KrImg from '../KrImg'
export default{
	components:{

		PhotoAlbum,
		EditLabel,
		KrImg
	},
    props:{
      commentColor:{
        default:false
      },
        publicUse:{
            default:false,
			type:Boolean,
		},
		isOk:{
            type:Boolean,
            default:true,
        },
		value:{
			default:()=>[],
			type:Array
		},
		readOrEdit:{
			default:false,
			type:Boolean
		},
		name:{
			type:[String,Number]
		}

    },
    data(){
        return {
			upUrl:'',
			fileArr:[],
			imagesArr:[],
			inputId:'inputId'+this._uid,
			openPhotoAlbum:false,
			eyeIndex:0,
			fileTypes:[],
			newFileArr: [],
			percent:0,
			isLoadding:false,
			callback:null,
			type:'view'
			// isClickLadding:false
        }
	},
	mounted(){
		this.fileArr = [].concat(this.value)
		this.newFileArr = [].concat(this.value);
		this.fileTypes = [].concat(this.setFileArrType(this.newFileArr));
		// document.body.onclick = function(event){
		// 	console.log(event.target,"oooooo")
		// }
	},
	methods:{
		setFileArrType(data){
			var types = [];
			for(let i=0;i<data.length;i++){
				types[this.getExt(data[i].fieldUrl)];
			}
			return [].concat(types);
		},

		getTyep(type,url){
			if(type=="other" && this.getExt(url)=="other"){
				return true;
			}else{
				return false;
			}
			if(type=="word" && this.getExt(url)=="word"){
				return true;
			}else{
				return false;
			}
			if(type=="excel" && this.getExt(url)=="excel"){
				return true;
			}else{
				return false;
			}
			if(type=="ppt" && this.getExt(url)=="ppt"){
				return true;
			}else{
				return false;
			}
		},
		getFileName(index){

			var fileArr = this.newFileArr[index].fieldUrl.split('?')[0].split('/')
			var filename  =fileArr[fileArr.length-1];
			return decodeURI(filename);
		},
		downImg(url,id){
			utils.downImg(url);
			return ;
		},
		downFile(url,id){
			utils.downFile(url);
		},
		getIsPhoto(url){
			var img="png,jpg,jpeg";
			url = url.split('?')[0];
			var index= url.lastIndexOf(".");
			var ext = url.substr(index+1);
			if(img.indexOf(ext)>=0){
				return true;
			}
			return false;
		},
		getExt(url){
			var word="doc,docx,docm,dotx,dotm";
			var excel="xls,xlsx,xlsm,xltm,xlsb,xlam";
			var ppt="pptx,pptm,ppsx,ppsm,potx,potm,ppam";
			url = url.split('?')[0];
			var index= url.lastIndexOf(".");
			var ext = url.substr(index+1);
			if(word.indexOf(ext)>=0){
				return 'word';
			}
			if(excel.indexOf(ext)>=0){
				return 'excel';
			}
			if(ppt.indexOf(ext)>=0){
				return 'ppt';
			}
			return 'other';
		},
		recordClick(value){
            this.$emit('recordClick',value)
        },
		close(){
			console.log(this.callback,"pppp",this.type)
			this.callback && this.callback(this.type);
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
		okClick(){
			var urls = [].concat(this.newFileArr);
			this.fileArr = [].concat(urls);
			var params = {
                name:this.name,
                value:JSON.stringify(urls),
                type:'file',

			}

            this.$emit("okClick",params)
		},
		getValues(urls){
			var arr = [];
			for(let i=0;i<urls.length;i++){
				arr.push(urls[i].fieldUrl);
			}
			return [].concat(arr);
		},
		eyeImg(index){
			this.eyeIndex = index;
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
        cancelClick(event){
			// this.inputValue = event
			this.newFileArr = [].concat(this.fileArr);
		},
		//查看图片
		eyePhotoAlbum(url,type,event,callback){
			this.type = type;
			this.callback = callback;
			// console.log(event.target)
			console.log(event,"lllllll")
			let urlArr = [];
			for (var i = 0; i < this.newFileArr.length; i++) {
				let everyUrl = this.newFileArr[i].fieldUrl;
				if(this.getIsPhoto(everyUrl)){
					urlArr.push(this.newFileArr[i]);

				}

			}
			for (var i = 0; i < urlArr.length; i++) {

				if(urlArr[i].fieldUrl == url){
					this.eyeIndex = i;
				}
			}
			this.imagesArr = [].concat(urlArr);
			this.openPhotoAlbum = !this.openPhotoAlbum;
		},
		delFile(index,event){
			let urls = [].concat(this.newFileArr);
			let types = [].concat(this.fileTypes);
			urls.splice(index,1);
			types.splice(index,1);
			this.fileTypes = [].concat(types);
            this.newFileArr = [].concat(urls)
		},
		addFileClick(){
			var inputDom = document.getElementById(this.inputId);
			// this.isClickLadding = true;

			// this.clickLadding();
			inputDom.click();
		},
		fileChange(event){
			console.log('change---')
			this.isLoadding = true;
			this.percent = 0
			// this.isClickLadding = false;
			var that = this;
			var file = event.target.files[0];
			console.log(file,"ppppp")
			if(file){
				that.getUpFileUrl(file);
			}else{
				this.isLoadding = false;

			}
			// return ;



		},
		// clickLadding(){
		// 	if(!this.isClickLadding){
		// 		return ;
		// 	}
		// 	this.percent+=1
		// 	if(this.percent>14){
		// 		this.percent = 14;
		// 	}
		// 	setTimeout(()=>{
		// 		this.clickLadding();
		// 	},500)
		// },
		upLoading(){
			if(!this.upLoading){

				return ;
			}
			this.percent +=1;
			if(this.percent>87){
				this.percent=87;
			}
			setTimeout(()=>{
				this.upLoading();
			},200)
		},
		upfile(form,serverUrl){
			var that  = this;

			this.upLoading();
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
							that.newFileArr.push({fieldUrl:data.url,fieldId:data.id});
							that.fileTypes.push(that.getExt(data.url));
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
        getUpFileUrl(event){
			console.log("getUpFileUrl")
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

	.edit-label{
		width: 100%;
		padding-right: 50px;
	}

	.up-icon{
		display: inline-block;
		width: 210px;
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
    .view-box{
    	width: 600px;
		min-height: 198px;
		background: #f3f3f3;
	    padding-bottom: 10px;
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
		border-radius: 4px 4px 4px 4px;

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
			border-radius: 4px 4px 4px 4px;
		}
		.img-mask{
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			bottom: 0px;
			background: #ffffff;
		}
		img{
			display: inline-block;
            height: 100%;
            cursor: pointer;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            display: block;
			margin: auto;
			border-radius:0px;
			border:0px;

		}
		.file-name{
			height: 35px;
			line-height: 35px;
			padding-right: 40px;
			box-sizing: border-box;
			text-align: left;
			padding-left: 10px;
			position: relative;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			width: 210px;
			.down-file{
				width: 16px;
				height: 16px;
				position: absolute;
				right: 10px;
				top: 10px;
				cursor: pointer;
				background-image: url(./images/down_init.svg);
				background-size:100%;

				background-repeat: no-repeat;
			}
			.down-file:hover{
				background-image: url(./images/down_active.svg);

			}
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
			background-image: url(./images/icon_word.svg);

		}
		.file-color-word{
			background-image: linear-gradient(46deg, #81C8FA 0%, #468CDF 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0px 0px;


		}
		.file-color-excel{
			background-image: linear-gradient(45deg, #75C9C3 0%, #33AC99 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0px 0px;

		}
		.file-icon-excel{
			background-image: url(./images/icon_excel.svg);

		}
		.file-color-ppt{
			background-image: linear-gradient(52deg, #FFAC96 0%, #FF6868 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0px 0px;

		}
		.file-icon-ppt{
			background-image: url(./images/icon_ppt.svg);

		}
		.file-color-other{
			background-image: linear-gradient(45deg, #B4ABE5 0%, #7C6FD7 100%);
			border: 1px solid #EFEFEF;
			border-radius: 4px 4px 0px 0px;

		}
		.file-icon-other{
			background-image: url(./images/icon_other.svg);

		}
		.file-icon{
			display: inline-block;
			background-size:45px auto;
			background-repeat: no-repeat;
			width: 45px;
			height: 45px;
		}


	}
	.view:hover .view-mask{
		display: block;
	}
}
</style>
