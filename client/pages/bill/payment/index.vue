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
   name:'List',
   head() {
        return {
            title: '订单管理'
        }
    },
   data(){
       return {
           activeKey:'unbind',
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