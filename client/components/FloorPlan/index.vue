<template>
    <div class="floor-chart-box-map">
        <div  class="flow-chart-top-toolbar">      
        </div>

        <div class="flow-chart-content">
            <div :id="drawingBoard" class="drawing-board" :style="{height:'700px',background:'#f5f5f5'}"></div>  
        </div>

        <div  :id="drawingPicture">导出</div>
         
    </div>
</template>

<script>
import init from './draw';
import dataFormat from './dataFormat';
var canvasData =[]
var flowChart= '';
var scrollDom='';
 export default {
    props:{
        data:{
          default:()=>[],
          type:Array 
        }
    },
    data(){
        return{
            drawingBoard:'drawingPlanBoard' + this._uid,
            drawingPicture:'drawingPlanPicture'+this._uid,
            scroll:{
                top:0,
                left:0
            }
        }
    },
    mounted(){
        canvasData=this.data;
        flowChart =  init(
            go,
            this.drawingBoard,
            this.drawingPicture,
            dataFormat.init(canvasData),
            this.mouseClick,
            this.mouseEnter,
            this.mouseLeave
        )
        scrollDom=document.querySelectorAll('#'+this.drawingBoard+' > div')[0];
        if(scrollDom){
          scrollDom.addEventListener('scroll',this.canvasScroll);            
        } 
    },
    methods:{
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
        },
        canvasScroll(){ 
            this.scroll={
                top:scrollDom.scrollTop,
                left:scrollDom.scrollLeft
            }
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
        position: absolute;
        height: 50px;
        width: 100%;
        top: 0px;
        left: 0px;
        background: #F6F6F6;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .flow-chart-content{
        .drawing-board{
          box-sizing: border-box;
          margin: 10px;
          border: 1px solid #E5E5E5;
          max-width: 100%;
        }
    }
}



</style>
