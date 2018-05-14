<template>
  <div class="inventory-floor-map">
      <FloorPlan
        @click="this.singleClick"
        @enter="this.mouseEnter"
        @leave="this.mouseLeave"
        :data="canvasData"
      />
      <div id="gantt-chart-tool-tip"></div>
      <div id="gantt-chart-tool-tip-triangle" class="top-triangle"></div>
  </div>
</template>

<script>
import FloorPlan from '~/components/FloorPlan/index';
import publicFn from './publicFn';
export default {
  components: {
    FloorPlan
  },
  data(){
    return{
       sideBar:true,
       canvasData:[]
    }
  },
  mounted(){
    this.getMapData({communityId:1,currentDate:'',floor:''});
    var _this=this;
    LISTENSIDEBAROPEN(function (params) {
        _this.sideBar=params;
    })
  },
  methods:{
    //获取数据
    getMapData(values){
        this.$http.get('getInventoryMap',values).then((res)=>{
           this.canvasData=res.data.items;
        }).catch((error)=>{
           
        })        
    },
    singleClick(event,every,all){
       
    },
    mouseEnter(event,every,all){
        publicFn.poptipOver(event,every,all,this.sideBar)
    },
    mouseLeave(event,every,all){

    }
  }
}
</script>

<style lang="less" scoped> 
  .inventory-floor-map{
     position: relative;
    #gantt-chart-tool-tip{
          max-width: 280px;
          opacity: 0;
          background: rgba(70,76,91,.9);
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 4px;
          padding: 5px;
          color: #ffffff;
          z-index: 999;
          transition: all .1s;
          pointer-events:none;
          .title{
              font-size: 14px;
              background: transparent;
              display:inline-block;
              vertical-align: middle;
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
          position: absolute;
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
  }
</style>
