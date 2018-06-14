<template>
    <div class="import-file">
        <div class='load-demo' @click="downFile">下载模板</div>
        <span class='m-upload-file'>上传文件:</span>
        <div class='import-logo'>
            <span class='import-pic'></span>
            <input type="file" name="file" class='chooce-file' @change="fileChange"/>
        </div>
        <div v-if="file !== null" class="file-name">{{ file.name}}</div>
        <div class="btn">
            <Button type="primary" @click="upload">确定</Button>
            <Button type="ghost" style="margin-left:20px" @click="closeUpLoad">取消</Button>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        url:{
            type:String
        }
    },
    data() {
        return{
           file: null
        }
    },
    methods:{
      fileChange(event){
            var _this = this;
            let fileName = event.target.files[0].name;
            let arr =fileName.split('.');
            let type = arr[arr.length-1];
            if(type != 'xls' && type != 'xlsx'){
                this.$Notice.error({
                  title:'上传文件类型不对，请选择.xls或.xlsx'
                });
                return ;
            }
            this.file=event.target.files[0];
      },
      downFile(){
         this.$emit('downFile');
      },
      success(res){
          this.$emit('success',res);
      },
      error(res){
          this.$emit('error',res);
      },
      closeUpLoad(){
          this.$emit('close');
      },
      upload(){
         let _this = this;
		 var form = new FormData();
		 form.append('file',this.file);
		 if(!this.file.name){
             this.$Notice.error({
                title:'请选择上传文件'
             });
			 return false;
		 }
		 var xhr = new XMLHttpRequest();
		 xhr.onreadystatechange = function() {
			 if (xhr.readyState === 4) {
				 if (xhr.status === 200) {
					 if (xhr.response && xhr.response.code > 0) {
						 _this.success(xhr.response);
					 } else {
                         _this.error(xhr.response);
                         _this.$Notice.error({
                            title:xhr.response.message
                         });
					 }
				 }else {
                     _this.$Notice.error({
                        title:'上传失败'
                     });
				 }
			 }
		 };
		 xhr.open('POST',this.url, true);
		 xhr.responseType = 'json';
		 xhr.send(form);
      }
    }
}
</script>

<style lang='less'>
     .import-file{
         .btn{
             margin-top: 30px;
            text-align: center;
         }
         .m-upload-file{
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
            margin-top: 38px;
        }
        .file-name{
            width: 300px;
            text-align: center;
            margin-top: 10px;
        }
        .import-logo{
            width:150px;
            height:90px;
            background:#f6f6f6;
            color: #7ab55c;
            display: inline-block;
            font-size: 80px;
            text-align: center;
            position: relative;
            border-radius: 5px;
            cursor: pointer;
            margin:0;
            overflow: hidden;
            .chooce-file{
                height: 90px;
                width:100%;
                position: absolute;
                left: 0;
                transform:translateX(0px);
                opacity: 0;
                cursor: pointer;
            }
            .import-pic{
                width:27px;
                height:27px;
                background:url(./img/Upload.svg) no-repeat center;
                background-size: 27px 27px;
                display: inline-block;
                margin-bottom: 22px;
            }
        }
        .load-demo{
            //display: inline-block;
            text-align: center;
            cursor: pointer;
            width:78px;
            height:18px;
            background:url(./img/download.svg) no-repeat left center;
            background-size: 16px 16px;
            color:#499df1;
            padding-left:15px;
            //margin-left:22px;
            vertical-align: middle;
            margin-bottom: 15px;
        }
     }
</style>
