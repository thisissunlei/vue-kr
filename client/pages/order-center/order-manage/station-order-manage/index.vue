<template>
    <div class='m-bill-wrap'>
        <Tabs :value="activeKey" :animated="false" @on-click='tabsClick'>
            <Tab-pane label="入驻订单" name="join">   
                <JoinList/>
            </Tab-pane>

            <Tab-pane label="减租订单" name="reduce">
                <ReduceList/>
            </Tab-pane>
        </Tabs>    
    </div>
</template>

<script>
import JoinList from './joinList';
import ReduceList from './reduceList';

export default {
   name:'List',
   head() {
        return {
            title: '订单管理'
        }
    },
   data(){
       return {
           activeKey:'join',
       }
   },
   components:{
       JoinList,
       ReduceList
   },
   mounted(){
       if(this.$route.query.mask=='reduce'){
            this.activeKey=sessionStorage.getItem('orderMask');
       }
   },
   methods:{
        tabsClick(key){
           sessionStorage.setItem('orderMask',key);
        }
    }
 }
</script>