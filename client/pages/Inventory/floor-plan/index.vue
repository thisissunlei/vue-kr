<template>
  <div class="inventory-floor-map" id="inventory-floor-map-wrap">
      <SectionTitle title="库存平面图"/>
      <div class="bar">
          <SearchForm 
           @searchForm="searchForm"
          />
          <Discount 
           @countChange="countChange"
          />
      </div>
      
      <FloorPlan
            v-if="isLoading"
            v-for="item in canvasData"
            :key="item.id"
            @click="mouseClick"
            @enter="mouseEnter"
            @leave="mouseLeave"
            :data="item"
      />
      
  </div>
</template>

<script>
import FloorPlan from '~/components/FloorPlan/index';
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchForm';
import publicFn from './publicFn';
import Discount from './discount';
import utils from '~/plugins/utils';
var wrapDom='';
var mainDom='';
//点击的dom存进一个数组
var clickNone=[];
export default {
  components: {
    FloorPlan,
    SectionTitle,
    SearchForm,
    Discount
  },
  data(){
    return{
       canvasData:[],
       tabForms:{},
       isLoading:false,
       discount:"",
       isFirstClick:false   
    }
  },
  mounted(){
     wrapDom=document.getElementById('inventory-floor-map-wrap');  
     mainDom=document.getElementById('layout-content-main');
     mainDom.addEventListener('scroll',this.mainScroll);
  },
  destroyed(){ 
     document.body.removeEventListener('click',this.bodyClick);
     mainDom.removeEventListener('scroll',this.mainScroll);
  },
  methods:{
    mainScroll(event){
        this.isFirstClick=true;
    },
    //获取数据
    getMapData(values){
        this.isLoading=false;
        values.currentDate=utils.dateCompatible(values.currentDate);
        this.$http.get('getInventoryMap',values).then((res)=>{
           this.canvasData=[].concat(res.data.items);
           this.isLoading=true;
        }).catch((error)=>{
           this.$Notice.error({
              title:error.message
            });
        })        
    },
    searchForm(formItem){
        this.tabForms=Object.assign({},formItem);
        this.getMapData(this.tabForms);
    },
    countChange(param,countRadio){
        this.discount=countRadio==1?'':param;
    },
    mouseClick(event,every,all){
        if(!this.isFirstClick){
            mainDom.scrollTop=0;
            this.isFirstClick=true;
        }
        clickNone.push(every.item.id);
    },
    mouseEnter(event,every,all,canvas,scroll){
         if(clickNone.indexOf(every.item.id)!=-1){
            return ;
         } 
         this.createDom(every);
         //监听click事件
         document.body.addEventListener('click',this.bodyClick);
         //显示
         var tirDom = document.getElementById('gantt-chart-tool-tip'+every.item.id);
         var angleDom = document.getElementById('gantt-chart-tool-tip-triangle'+every.item.id);
         tirDom.style.display = 'block';
         angleDom.style.display = 'block';
         publicFn.poptipOver(event,every,all,canvas,scroll,this.discount)
    },
    bodyClick(event){
        var id=event.target.getAttribute('data-titleId');
        var parentNode=event.target.parentNode.parentNode;
        if(id){
            this.titleClose(parentNode,id);
        }
    },
    mouseLeave(event,every,all){
        if(clickNone.indexOf(every.item.id)!=-1){
            return ;
        }    
        var parentNode=document.getElementById('gantt-chart-tool-tip'+every.item.id).parentNode;
        this.closeCommon(parentNode,every.item.id);
    },
    //关闭dom
    closeCommon(parentNode,id){
        wrapDom.removeChild(parentNode);
    },
    //点击关闭套弹窗
    titleClose(parentNode,id){
        var index =clickNone.indexOf(id);
        if (index > -1) {
           clickNone.splice(index, 1);
        }
        this.closeCommon(parentNode,id);    
    },
    //生成dom
    createDom(every){
         var productDom=
            '<div id="gantt-chart-tool-tip'+every.item.id+'" class="gantt-chart-tool-tip">'+
                '<div class="title" data-titleId='+every.item.id+'></div>'+
                '<div id="gantt-chart-tool-tip-content'+every.item.id+'" class="gantt-chart-tool-tip-content"></div>'+
            '</div>'+
            '<div id="gantt-chart-tool-tip-triangle'+every.item.id+'" class="top-triangle gantt-chart-tool-tip-triangle" />';
         var el = document.createElement('div');
         el.innerHTML = productDom;
         wrapDom.appendChild(el);
    }
  }
}
</script>

<style lang="less"> 
  .inventory-floor-map{
     position: relative;
     background: #f5f7f9;
     .section-title{
         background:#fff;
     }
    .gantt-chart-tool-tip{
          max-width: 280px;
          display: none;
          //opacity: 0;
          background: #575D6A;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 4px;
          padding: 5px;
          color: #ffffff;
          z-index: 999;
          //transition: all .1s;
          .title{
              position: absolute;
              right:6px;
              top:10px;
              width:10px;
              height:10px;
              font-size: 14px;
              background:url(img/close.png) no-repeat center;
              background-size:100%;
              cursor: pointer;
          }
          .content{
              font-size: 14px;
              padding: 0px;
              background: transparent;
              display:inline-block;
              vertical-align: middle;
          }
          .gantt-chart-tool-tip-content{
              padding-right:14px;
          }
      }
      .top-triangle{
          border-color: rgba(70,76,91,.9) transparent transparent transparent;
      }
      .bottom-triangle{
          border-color: transparent transparent rgba(70,76,91,.9)  transparent;
      }
      .gantt-chart-tool-tip-triangle{
          //opacity: 0;
          position: absolute;
          display:none;
          width:0;
          height:0;
          border-style:solid;
          border-width:5px;
          top: 0px;
          left: 10px;
          //transition: all .1s;
          z-index: 999;
      }
      .bar{
          position: relative;
          margin-bottom:5px;
      }
  }
</style>
