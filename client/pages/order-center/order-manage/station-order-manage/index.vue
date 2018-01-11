<template>
    <div class='m-bill-wrap'>
        <Tabs :value="activeKey" @on-click='tabsClick' :animated="false">
            <Tab-pane label="入驻订单" name="join">   
                <JoinList></JoinList>
            </Tab-pane>

            <Tab-pane label="减租订单" name="reduce">
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
           activeKey:'join',
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
           sessionStorage.setItem('orderMask',key);
        }
    },
    mounted(){
       if(this.$route.query.mask=='reduce'){
            this.activeKey=sessionStorage.getItem('orderMask');
       }
    }
 }
</script>