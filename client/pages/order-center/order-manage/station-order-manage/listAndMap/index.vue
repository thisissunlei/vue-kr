
<template>
   <div class="order-map-list">
       <div style="text-align:right;font-size:14px;margin-bottom: 10px;">
           <span>找不到商品?</span>
           <span style="cursor:pointer;text-decoration:underline;" @click="goSearch">去查询</span>
       </div>
       <Tabs size="default" value="list" :animated="false" @on-click="tabClick">
            <TabPane label="以平面图方式选择" name="list">
                <planMap  v-if="key=='list'" :params.sync="params" :floors.sync="floors" :stationData.sync="stationData" :originStationList.sync="originStationList" @on-result-change="onResultChange"></planMap> 
                <span v-if="stationNum&&key=='list'" class="select-num">已选中<span style="color:red;">{{stationNum}}</span>个商品</span>    
            </TabPane>
            <TabPane label="以列表方式选择" name="map">
                <List 
                    v-if="key=='map'"
                    :params.sync="params" 
                    :floors.sync="floors" 
                    @on-result-change="onResultChange" 
                    :originStationList.sync="originStationList" 
                    @clear="clear"
                />
                <span v-if="stationNum&&key=='map'" class="select-num">已选中<span style="color:red;">{{stationNum}}</span>个商品</span>
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
           stationNum:0,
           key:'list'
        }
    },
    mounted(){ 
       
    },
    methods:{
       tabClick(val){
           this.clear();
           this.key=val;
       },
       unique(songs){
            let result = {};
            let finalResult=[];
            for(let i=0;i<songs.length;i++){
                result[songs[i].id]=songs[i];
            }
            for(var item in result){
                finalResult.push(result[item]);
            }
            return finalResult;
        },
        onResultChange(val){
           let rend=Object.assign({},val);
           let firstLen=val.submitData.length;
           let secondLen=this.originStationList.length;
           if(this.key=='list'){
               this.stationNum=firstLen;
           }else{
                rend.submitData=this.unique(val.submitData);
                this.stationNum=(firstLen-secondLen)>=0?(firstLen-secondLen):0;
           }
           this.$emit('on-result-change',rend);
       },
       goSearch(){
           window.open('/inventory/daily-inventory','_blank');
       },
       clear(){
           this.stationNum=0;
       }
    }
}
</script>

<style lang="less">
  .order-map-list{
       .select-num{
        display: inline-block;
        position: absolute;
        right: 150px;
        bottom: -55px;
       }
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
