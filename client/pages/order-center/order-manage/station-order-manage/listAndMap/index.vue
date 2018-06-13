
<template>
   <div class="order-map-list">
       <Tabs size="default" value="list" :animated="false">
            <TabPane label="以列表方式选择" name="list">
               <List  :floors.sync="floors" @on-result-change="onResultChange" :originStationList.sync="originStationList"/>
            </TabPane>
            <TabPane label="以平面图方式选择" name="map">
                <planMap  :params.sync="params" :floors.sync="floors" :stationData.sync="stationData" :originStationList.sync="originStationList" @on-result-change="onResultChange"></planMap>
            </TabPane>
        </Tabs>
   </div>
</template>

<script>
import planMap from '~/components/PlanMap.vue';
import List from './list';
export default { 
    props:{
        params:{
            type:Object,
            default:{}
        },
        floors:{
            type:Array,
            default:()=>[]
        },
        stationData:{
            type:Object,
            default:{}
        },
        originStationList:{
            type:Array,
            default:()=>[]
        },
    },  
    components:{
       planMap,
       List
    }, 
    data() {
        return{
          
        }
    },
    mounted(){ 
       
    },
    methods:{
       onResultChange(val){
           this.$emit('on-result-change',val);
       }
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
