<template>
    <div class='m-bill-wrap'>
        <Tabs active-key="key1" @on-click='tabsClick' :animated="false">
            <Tab-pane label="入驻订单" key="key1">   
                <JoinList v-if='joinKey'></JoinList>
            </Tab-pane>

            <Tab-pane label="减租订单" key="key2">
                <ReduceList v-if='reduceKey'></ReduceList>
            </Tab-pane>

        </Tabs>    
    </div>
</template>


<script>
import JoinList from './joinList';
import ReduceList from './reduceList';

export default {
   name:'List',
   data(){
       return {
           joinKey:true,
           reduceKey:false
       }
   },
   components:{
       JoinList,
       ReduceList
   },
   head() {
        return {
            title: '订单管理'
        }
    },
    methods:{
       tabsClick(key){
           this.joinKey=key==0?true:false;
           this.reduceKey=key==1?true:false;
       } 
    }
 }
</script>