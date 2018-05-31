<template>
    <div class="floor-chart-box-map">

        <div class="flow-chart-toolbar">
            <slot name="toolbar"></slot>
            <slot name='export' :id="exportPicture"></slot>
        </div>
        
        <div class="flow-chart-content">
            <div :id="drawingBoard" class="drawing-board"></div>  
        </div>

    </div>
</template>

<script>
import init from './draw';
import dataFormat from './dataFormat';
import utils from '~/plugins/utils';
var canvasData ={};
var flowChart= '';
var scrollDom='';
var img='';
 export default {
    props:{
        data:{
          type:Object,
          default:{}
        }
    },
    data(){
        return{
            drawingBoard:'drawingPlanBoard' + this._uid,
            exportPicture:'drawingPlanPicture'+this._uid,
            scroll:{
                top:0,
                left:0
            }
        }
    },
    mounted(){
        //背景图
        img=new Image();
        img.src='http://optest03.krspace.cn'+this.data.graphFilePath;
        //img.src='http://'+window.location.host+this.data.graphFilePath;
        //img.setAttribute("crossOrigin",'Anonymous');
        img.addEventListener('load',this.imgLoad);
    },
    destroyed(){ 
      img.removeEventListener('load',this.imgLoad); 
      if(scrollDom){
          scrollDom.removeEventListener('scroll',this.scrollFn); 
      }
    },
    methods:{
        //将图片地址转换成base64格式
        getBase64Image(img) {
            // var canvas = document.createElement('canvas'); 
            // canvas.width = img.width;
            // canvas.height = img.height;
            // var ctx = canvas.getContext("2d");
            // ctx.drawImage(img, 0, 0, img.width, img.height);
            // var dataURL = canvas.toDataURL("image/png");
            // return dataURL
        },
        //图片加载完
        imgLoad(event) {
            var picImg=event.path[0];
            var dataUrl = this.getBase64Image(picImg);
            var drawWrap=document.querySelectorAll('#'+this.drawingBoard)[0];
             //初始化数据
            canvasData=this.data;
            flowChart =  init(
                go,
                this.drawingBoard,
                this.exportPicture,
                dataFormat.init(canvasData,{width:picImg.width,height:picImg.height},dataUrl,drawWrap),
                this.mouseClick,
                this.mouseEnter,
                this.mouseLeave,
                this.downLoadPic
            ) 
            //滚动监听
            scrollDom=document.querySelectorAll('#'+this.drawingBoard+' > div')[0];
            if(scrollDom){
              scrollDom.addEventListener('scroll',this.scrollFn);            
            } 
        },
        getUpFileUrl(url,name){
			let category = 'op/upload';
			let that = this;
			let file = url;
			var fileName= name;
			var form = new FormData();
			this.$http.get('get-vue-upload-url', {
				category:'op/upload',
				isPublic:false
			}).then((res)=>{
				var response = res.data;
				form.append('OSSAccessKeyId', response.ossAccessKeyId);
				form.append('policy', response.policy);
				form.append('Signature', response.sign);
				form.append('key', response.pathPrefix+'/'+fileName);
				form.append('uid', response.uid);
				form.append('callback', response.callback);
				form.append('x:original_name', fileName);
                form.append('file', file);
				that.upfile(form,response.serverUrl)
			}).catch((err)=>{
				this.$Notice.error({
					title:err.message
				});
			})
        },
        upfile(form,serverUrl){
			var that  = this;
			var xhrfile = new XMLHttpRequest();
			xhrfile.timeout = 600000;
			xhrfile.onreadystatechange = function() {
				if (xhrfile.readyState === 4) {
					var fileResponse = xhrfile.response;
					if (xhrfile.status === 200) {
						if (fileResponse && fileResponse.code > 0) {
                            var data = fileResponse.data;
							utils.downImg(data.url);
						} 
					} else{
						that.$Notice.error({
							title:'上传失败请稍后重试'
						});
                    }
				}
			};
			xhrfile.open('POST', serverUrl, true);
			xhrfile.responseType = 'json';
			xhrfile.send(form);
		},
        downLoadPic(url,name){
            this.getUpFileUrl(url,name);
        },
        scrollFn(event){
            this.scroll={
                left:event.target.scrollLeft
            }
            this.$emit('scroll',canvasData,this.drawingBoard,this.scroll);
        },
        mouseEnter(event,node){
             var every=node.data;
             var everyData =every?every:{};
             this.$emit('enter',event,everyData,canvasData,this.drawingBoard,this.scroll);
        },
        mouseLeave(event,node){
             var every=node.data;
             var everyData =every?every:{};
             this.$emit('leave',event,everyData,canvasData);
        },
        mouseClick(event){
            var every=event.subject.part.data;
            var everyData =every?every:{};
            this.$emit('click',event,everyData,canvasData); 
        }
    }
 }
</script>

<style lang="less" scoped> 
.floor-chart-box-map {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 50px;
    background: #DAE4E4;
    transition: all 0.3 ease;
    .flow-chart-content{
        .drawing-board{
          box-sizing: border-box;
          //margin: 10px;
          border: 1px solid #E5E5E5;
          max-width: 100%;
          background:'#f5f5f5'
        }
    }
    .flow-chart-toolbar{
        background:#fff;
    }
}



</style>
