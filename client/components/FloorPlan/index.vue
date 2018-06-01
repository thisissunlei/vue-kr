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
let canvasData ={};
let flowChart= '';
let scrollDom='';
let exportButton='';
let img='';
let initData='';
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
      img&&img.removeEventListener('load',this.imgLoad); 
      scrollDom&&scrollDom.removeEventListener('scroll',this.scrollFn); 
      exportButton&&exportButton.removeEventListener('click',this.exportClick);
    },
    methods:{
        //图片加载完
        imgLoad(event) {
            var picImg=event.path[0];
            var dataUrl = this.getBase64Image(picImg);
             //初始化数据
            canvasData=this.data;
            initData=dataFormat.init(canvasData,picImg,dataUrl);
            flowChart =  init(
                go,
                this.drawingBoard,
                initData,
                this.mouseClick,
                this.mouseEnter,
                this.mouseLeave,
            ) 
            
            //高度自适应图片高度
            var drawWrap=document.querySelectorAll('#'+this.drawingBoard)[0];
            drawWrap.style.height=initData.pic.height+20+'px';
            //滚动导出监听
            scrollDom=document.querySelectorAll('#'+this.drawingBoard+' > div')[0];
            scrollDom&&scrollDom.addEventListener('scroll',this.scrollFn); 
            exportButton = document.getElementById(this.exportPicture);
            exportButton&&exportButton.addEventListener('click',this.exportClick);
        },
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
        
        /*导出图片*/
        exportClick(){
            var _this=this;
            var svg = flowChart.diagram.makeImageData({
                scale:1,
                maxSize:new go.Size(initData.pic.width,initData.pic.height),
                returnType: "blob",
                callback: _this.exportCallback
            })
        },
        exportCallback(blob){
            this.downLoadPic(blob,initData.pic.picName);
        },
        downLoadPic(url,name){
            this.getUpFileUrl(url,name);
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
        /*导出图片*/
        
        //平面图滚动监听
        scrollFn(event){
            this.scroll={
                left:event.target.scrollLeft,
                top:event.target.scrollTop
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
            console.log('everoo',everyData);
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
