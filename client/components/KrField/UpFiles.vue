<template>
	<div class="up-files">
         <input type="file" @change="fileChange">
	</div>
</template>

<script>
export default{
    props:{
        publicUse:{
            default:false,
            type:Boolean
        }
    },
    data(){
        return {
        
        }
    },
	methods:{
        fileChange(fileObj){
            let that = this;
			let file = event;
			var fileName= event.name;
		
			if (!file) {
				return;
			}
			let category = 'op/upload';
		
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
										
										params.name = fileName;
										params.url = fileResponse.data.url;
										params.fileId = ""+fileResponse.data.id;
										params.fileName = fileName;
										params.fileUrl = fileResponse.data.url;
										params.type = "ATTACHMENT"
										that.onSuccess(params)

									} else {
										//报错
										
										that.$Notice.error({
												title:fileResponse.msg
										});
									
									}
								} else if (xhrfile.status == 413) {
								
									
									
									that.$Notice.error({
										title:"您上传的文件过大！"
									});
									// that.onError('您上传的文件过大！');
								} else {
								
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

</style>
