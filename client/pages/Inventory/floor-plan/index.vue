<template>
  <div class="inventory-floor-map">
      <SectionTitle title="库存平面图"/>
      <div class="bar">
          <SearchForm />
          <Discount />
      </div>
      
      <FloorPlan
            v-if="canvasData.length"
            @click="this.mouseClick"
            @enter="this.mouseEnter"
            @leave="this.mouseLeave"
            :data="canvasData"
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
import Discount from './discount'
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
       isClick:false
    }
  },
  mounted(){
    this.getMapData({communityId:1,currentDate:'',floor:''});
  },
  methods:{
    //获取数据
    getMapData(values){
        this.$http.get('getInventoryMap',values).then((res)=>{
           this.canvasData=[].concat(res.data.items);
        }).catch((error)=>{
           this.$Notice.error({
              title:error.message
            });
        })        
    },
    mouseClick(event,every,all){
       this.isClick=true;
    },
    mouseEnter(event,every,all,canvas,scroll){
        publicFn.poptipOver(event,every,all,canvas,scroll)
    },
    mouseLeave(event,every,all){
        if(!this.isClick){
            this.closeCommon();
        }
    },
    closeCommon(){
        var tirDom = document.getElementById('gantt-chart-tool-tip');
        var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
        tirDom.style.opacity = 0;
        angleDom.style.opacity = 0;
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
          opacity: 0;
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
              float: right;
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
      }
      .top-triangle{
          border-color: rgba(70,76,91,.9) transparent transparent transparent;
      }
      .bottom-triangle{
          border-color: transparent transparent rgba(70,76,91,.9)  transparent;
      }
      #gantt-chart-tool-tip-triangle{
          opacity: 0;
          position: fixed;
          display:block;
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
