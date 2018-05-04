
<template>
	<div class="edit-label">
		<div style="height:100%;" v-if="readOrEdit">        
			<div v-if="!isEdit && labeType=='label'" >
				<div class="label-text">{{value||'无'}}</div>
				<span class="edit-icon" @click="editClick"></span>
				<span class="record-icon" @click="recordClick"></span>
				
				
			</div>
			<div v-if="!isEdit && labeType=='file'">
				<div class="file-view-box">
					
				
					<div v-if="!value || !value.length" class="to-upload">待上传</div>
				
				<!-- <img :src="item.url" alt="" v-for="(item, index ) in value" :key="item.id" @click="eyeImg(index)"/> -->

					<div class="view" v-for="(item,index) in fileArr" :key="item.id">

						<img v-if="getIsPhoto(item.url)" @click="eyePhotoAlbum(item.url,$event)" :src="item.url" alt=""/>
						<div 
							v-if="!getIsPhoto(item.url)"
							:class="{
								'file-type-style':true, 
								'file-color-other':getTyep('other',index),
								'file-color-word':getTyep('word',index),
								'file-color-excel':getTyep('excel',index),
								'file-color-ppt':getTyep('ppt',index),
							}"
						>
							<div 
								:class="{
									'file-icon':true,
									'file-icon-other':getTyep('other',index),
									'file-icon-word':getTyep('other',index),
									'file-icon-excel':getTyep('other',index),
									'file-icon-ppt':getTyep('other',index),
									
								}"
							></div>
						</div>
						<div 
							v-if="!getIsPhoto(item.url)"
							class="file-name"
						>
							{{getFileName(index)}}
							<div class="down-file" @click="downFile(item.url)"></div>
						</div>
					
					</div>
					<span class="edit-icon" @click="editClick">
						<!-- <Icon type="ios-compose-outline "></Icon> -->
					</span>
					<span class="record-icon" @click="recordClick">
						<!-- <Icon type="ios-compose-outline "></Icon> -->
					</span>
				</div>
			</div>



			<div v-if="isEdit">
				<div class="edit-label-mask" @click="maskClick"></div>
				<div class="edit-field-box">
					<slot></slot>
				</div>
				
				<div class="operation">
					<span class="kr-ui-x-icon" @click="cancelClick">
					
					</span>
					
					<span class="kr-ui-ok-icon" @click="okClick">
						
					</span>
					
				</div>
			</div>
		</div>
		<div v-if="!readOrEdit">
			<slot></slot>
			
		</div>
		<Modal
            v-model="openMessage"
            title="提示信息"
          	width="400"
        >
            <p style="text-align:center;">是否保存提交本次修改</p>
            <div slot="footer">
                <Button type="primary" @click="submitClick">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeMask">取消</Button>
            </div>
        </Modal>
		
	</div>
</template>

<script>
import utils from '~/plugins/utils';
export default {
    props:{
        readOrEdit:{
            type:Boolean,
            default:false,
		},
		value:{
			type:[Number,String,Array,Boolean],
			default:''
		},
		labeType:{
			default:'label',
			type:String
		},
		

	},
	watch:{
		value(){
			if(this.labeType == 'file'&&this.value&& this.value.length){
				this.fileArr = this.getFileArr();
			}
		}
	},
	data(){
		return {
			isEdit:false,
			fileTypes:[],
			fileArr:this.getFileArr(this.value),
			openMessage:false,
		}
	},
	methods:{
		maskClick(){
			this.switchMask();
		},
		submitClick(){
			this.okClick();
			this.switchMask();
		},
		closeMask(){
			this.switchMask();
		},
		switchMask(){
			this.openMessage = !this.openMessage;
		},
		eyePhotoAlbum(url,event){
			this.$emit('eyePhotoAlbum',url,event)
		},
		getFileArr(){
			if(this.labeType == 'file'&&this.value&&this.value.length){
				for (var i = 0; i < this.value.length; i++) {
					let url = this.value[i].url;
					this.fileTypes.push(this.getExt(url));
				}
				return [].concat(this.value)
			}
			
			return [];
		},
		getTyep(type,index){
			if(this.fileTypes[index]==type){
				return true;
			}
			return false;
		},
		getFileName(index){
			var fileArr = this.fileArr[index].url.split('?')[0].split('/')
			var filename  =fileArr[fileArr.length-1];
			return filename;
		},
		downFile(url){
			utils.downFile(url)
		},
		getIsPhoto(url){
			var img="png,jpg,jpeg";
			url = url.split('?')[0];
			var index= url.lastIndexOf(".");
			var ext = url.substr(index+1);
			if(img.indexOf(ext)>0){
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
			if(word.indexOf(ext)>0){
				return 'word';
			}
			if(excel.indexOf(ext)>0){
				return 'excel';
			}
			if(ppt.indexOf(ext)>0){
				return 'ppt';
			}
			return 'other';
		},
		recordClick(){
			this.$emit('recordClick',this.value)
		},
		editClick(event){
			// this.$emit("editClick",event)
			// var isclose = this.editClick();
			// if(isclose){
			// }
			this.isEdit = !this.isEdit;
			
		},
		cancelClick(){
			this.$emit('cancelClick',this.value)
			this.isEdit = !this.isEdit;
		},
		okClick(){
			this.$emit('okClick')
			this.isEdit = !this.isEdit;
		},
		eyeImg(index){
			this.$emit('eyeImg',index);
		}
	},
	mounted(){
		
	}
}
</script>

<style lang="less" scoped>
.edit-label{
	position: relative;
	display: inline-block;
	cursor: pointer;
	// height:40px;
	min-width:150px;
	padding-right:80px;
	box-sizing: content-box;
	// background: red;
	.file-view-box{
		width: 600px;
		min-height: 198px;
		background:  #EEEEEE;
	    padding: 1px;
	}
	.edit-field-box{
		display:inline-block;
		position:relative;
		z-index:100;
		min-width: 150px;
	}
	// background: red;
	.edit-label-mask{
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		// background: red;
		position: fixed;
		z-index: 99;
	}
	.operation-icon{
		display:none;
	}
	&:hover .record-icon{
		display:inline-block;
	}
	&:hover .edit-icon{
		display:inline-block;
	}
	.to-upload{
		width: 210px;
		height: 135px;
		background: #fff;
		line-height: 135px;
		text-align: center;
		color: #FF6868;
		font-size: 18px;
		border-radius: 4px 4px 0 4px 4px;
		margin: 30px 30px 10px;
	}
	.record-icon{
		background-image: url(./images/record.svg);
		background-size:100%; 
		background-repeat: no-repeat;
		position: absolute;
		right: 20px;
		width: 16px;
		height: 16px;
		top: 10px;
		line-height: 32px;
		display:none;
		cursor: pointer;
	}
	.edit-icon{
		background-image: url(./images/edit.svg);
		background-size:100%; 
		position: absolute;
		background-repeat: no-repeat;
		right: 60px;
		width: 16px;
		height: 16px;
		top: 10px;
		display:none;
		cursor: pointer;
	}
	.kr-ui-ok-icon,.kr-ui-x-icon{
		position: absolute;
		width: 16px;
		height: 16px;
		top: 10px;
		cursor: pointer;
	}
	.kr-ui-ok-icon{
		background-image: url(./images/ok.svg);
		background-repeat: no-repeat;		
		background-size:100%; 
		right:60px;
	}
	.kr-ui-x-icon{
		background-image: url(./images/x.svg);
		background-repeat: no-repeat;
		background-size:100%; 
		right:30px;
	}
	.label-text{
		padding-right: 20px;
		font-size: 14px;
	}
	.operation{
		position: absolute;
		top: 0px;
		right: 0px;
		line-height: 32px;
		z-index: 100;

	}
	img{
		display: inline-block;
		width: auto;
		height: 135px;
		text-align: center;
		line-height: 135px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
		vertical-align: middle;
		position: relative;
		margin: 30px 30px 10px;		
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
			// background: red;
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
}
</style>