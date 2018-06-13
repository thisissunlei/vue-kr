
<template>
   <div class="order-map-list">
       <Tabs size="default" value="list" @on-click="tabsClick" :animated="false">
            <TabPane label="以列表方式选择" name="list">
                123
            </TabPane>
            <TabPane label="以平面图方式选择" name="map">
                456
            </TabPane>
        </Tabs>
   </div>
</template>

<script>
import planMap from '~/components/PlanMap.vue';
export default { 
    props:{
        params:{
            type:Object,
            default:{}
        },
        floors:{
            type:Object,
            default:()=>[]
        },
        stationData:{
            type:Object,
            default:{}
        }
    },  
    components:{
       planMap
    }, 
    data() {
        return{
          
        }
    },
    mounted(){
       
    },
    methods:{
     
    }
}
</script>

<style lang="less">
  .order-map-list{
      .ivu-tabs{
            overflow: visible;
        }
        .nav-text.ivu-tabs-nav{
            width: 100%;
        }
        .ivu-tabs-ink-bar{
            top:0px;
            height: 4px;
            border-top: 0px;
            border-bottom: 0px;
            box-sizing: border-box;
        }
      .ivu-tabs-nav .ivu-tabs-tab{
            width: 50%;
            text-align: center;
            line-height: 35px;
            padding: 8px 20px;   
        }
  }
</style>
