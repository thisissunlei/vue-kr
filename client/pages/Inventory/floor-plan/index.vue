<template>
  <div class="inventory-floor-map">
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
      
      
      <div id="gantt-chart-tool-tip">
          <div class="title" @click="this.closePop"/>
          <div id="gantt-chart-tool-tip-content" />
      </div>
      <div id="gantt-chart-tool-tip-triangle" class="top-triangle" />

  </div>
</template>

<script>
import FloorPlan from '~/components/FloorPlan/index';
import SectionTitle from '~/components/SectionTitle';
import SearchForm from './searchForm';
import publicFn from './publicFn';
import Discount from './discount';
import utils from '~/plugins/utils';
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
       isClick:false,
       tabForms:{},
       isLoading:false,
       discount:""
    }
  },
  methods:{
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
       this.isClick=true;
    },
    mouseEnter(event,every,all,canvas,scroll){
         var tirDom = document.getElementById('gantt-chart-tool-tip');
         var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
         tirDom.style.display = 'block';
         angleDom.style.display = 'block';
         publicFn.poptipOver(event,every,all,canvas,scroll,this.discount)
    },
    mouseLeave(event,every,all){
        if(!this.isClick){
            this.closeCommon();
        }
    },
    closeCommon(){
        var tirDom = document.getElementById('gantt-chart-tool-tip');
        var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
        tirDom.style.display = 'none';
        angleDom.style.display = 'none';
    },
    closePop(){
        this.isClick=false;
        this.closeCommon();        
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
    #gantt-chart-tool-tip{
          max-width: 280px;
          display: none;
          //opacity: 0;
          background: #575D6A;
          position: fixed;
          top: 0px;
          left: 0px;
          border-radius: 4px;
          padding: 5px;
          color: #ffffff;
          z-index: 999;
          transition: all .1s;
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
          #gantt-chart-tool-tip-content{
              padding-right:14px;
          }
      }
      .top-triangle{
          border-color: rgba(70,76,91,.9) transparent transparent transparent;
      }
      .bottom-triangle{
          border-color: transparent transparent rgba(70,76,91,.9)  transparent;
      }
      #gantt-chart-tool-tip-triangle{
          //opacity: 0;
          position: fixed;
          display:none;
          width:0;
          height:0;
          border-style:solid;
          border-width:5px;
          top: 0px;
          left: 10px;
          transition: all .1s;
          z-index: 999;
      }
      .bar{
          position: relative;
          margin-bottom:5px;
      }
  }
</style>
