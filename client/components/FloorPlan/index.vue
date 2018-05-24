<template>
    <div class="floor-chart-box-map">

        <div  class="flow-chart-top-toolbar">
             <div class="toolbar-inner" v-for="item in colorLabels" :key="item.id">
                 <span class="map-font-tip">{{item.label}}</span>
                 <span class="map-color-tip" :style="'background:'+item.color"></span>
             </div>

             <span class="warning-tip"></span>
             <span style="font-size: 14px;color: #999999;vertical-align: middle;">图中仅展示独立办公桌和固定办公桌的库存</span> 

             <div class="export" :id="drawingPicture">导出高清图</div>    
        </div>
        
        <div class="flow-chart-content">
            <div :id="drawingBoard" class="drawing-board" :style="{background:'#f5f5f5'}"></div>  
        </div>

    </div>
</template>

<script>
import init from './draw';
import dataFormat from './dataFormat';
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
            colorLabels:[
                {label:'未租',color:'#BCE590'},
                {label:'在租',color:'#FFC684'},
                {label:'合同未生效',color:'#FFE08F'},
                {label:'不可用',color:'#E4E4E4'}
            ],
            drawingBoard:'drawingPlanBoard' + this._uid,
            drawingPicture:'drawingPlanPicture'+this._uid,
            scroll:{
                top:0,
                left:0
            }
        }
    },
    mounted(){
        //背景图
        img=new Image();
        img.src="http://optest03.krspace.cn"+this.data.graphFilePath;
        img.setAttribute("crossOrigin",'Anonymous');
        img.addEventListener('load',this.imgLoad);
    },
    destroyed(){ 
      img.removeEventListener('load',this.imgLoad); 
      scrollDom.removeEventListener('scroll',this.scrollFn); 
    },
    methods:{
        //将图片地址转换成base64格式
        getBase64Image(img) {
           var canvas = document.createElement('canvas'); 
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL("image/png");
            console.log('dataURL',dataURL);
            return dataURL
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
                this.drawingPicture,
                dataFormat.init(canvasData,{width:picImg.width,height:picImg.height},dataUrl,drawWrap),
                this.mouseClick,
                this.mouseEnter,
                this.mouseLeave
            ) 
            //滚动监听
            scrollDom=document.querySelectorAll('#'+this.drawingBoard+' > div')[0];
            if(scrollDom){
              scrollDom.addEventListener('scroll',this.scrollFn);            
            } 
        },
        scrollFn(event){
            this.scroll={
                //top:event.target.scrollTop,
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
    .flow-chart-top-toolbar{
        padding:0 20px;
        line-height: 50px;
        position: absolute;
        height: 50px;
        width: 100%;
        top: 0px;
        left: 0px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        .toolbar-inner{
             display:inline-block;
             margin-right:30px;
            .map-font-tip{
                display:inline-block;
                vertical-align: middle;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #999999;
            }
            .map-color-tip{
                display:inline-block;
                width:33px;
                height:15px;
                margin-left:10px;
                border-radius: 4px;  
                vertical-align: middle;
            }
        }
        .warning-tip{
            display:inline-block;
            width:19px;
            height:23px;
            background:url(img/warning.png) no-repeat center;
            background-size: 100%;
            margin-right:6px;
            vertical-align: middle;
        }
        .export{
            float:right;
            width:109px;
            height:30px;
            line-height: 30px;
            background: #499DF1;
            box-shadow: 0 1px 4px 0 rgba(14,94,174,0.50);
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            margin-top: 9px;
            cursor: pointer;
        }
    }
    .flow-chart-content{
        .drawing-board{
          box-sizing: border-box;
          //margin: 10px;
          border: 1px solid #E5E5E5;
          max-width: 100%;
        }
    }
}



</style>
