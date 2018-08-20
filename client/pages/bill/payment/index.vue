<template>
    <div class="m-bill-wrap">
        <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="已绑定回款" name="bind">   
                <Bind :mask="key"/>
            </Tab-pane>
            <Tab-pane label="未绑定回款" name="unbind">
                <Unbind :mask="key"/>
            </Tab-pane>
        </Tabs>    
    </div>
</template>

<script>
import Bind from './bind';
import Unbind from './unbind';

export default {
   name:'paymentList',
   head() {
        return {
            title: '回款-氪空间后台管理系统'
        }
    },
   data(){
       return {
           activeKey:'bind',
           key:''
       }
   },
   components:{
       Bind,
       Unbind
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('paymentMask')||'bind';
   },
   methods:{
        tabsClick(key){
           this.key=key;
           sessionStorage.setItem('paymentMask',key);
        }
    }
 }
</script>