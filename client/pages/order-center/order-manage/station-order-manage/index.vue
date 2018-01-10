<template>
    <div class='m-bill-wrap'>
        <Tabs :value="activeKey" :animated="false">
            <Tab-pane label="入驻订单" name="key1">   
                <JoinList></JoinList>
            </Tab-pane>

            <Tab-pane label="减租订单" name="key2">
                <ReduceList></ReduceList>
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
           activeKey:'key1'
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
    mounted(){
       if(this.$route.query.mask=='reduce'){
           this.activeKey='key2';
       }
    }
 }
</script>