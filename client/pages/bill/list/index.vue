<template>
    <div class="m-bill-wrap">
        <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="未付清账单" name="wait">
                <WaitList :mask="key"/>
            </Tab-pane>
            <Tab-pane label="已付清账单" name="paid">   
                <PaidList :mask="key"/>
            </Tab-pane>
           
        </Tabs>    
    </div>
</template>

<script>
import PaidList from './paidList';
import WaitList from './waitList';

export default {
   name:'billList',
    head () {
            return {
                title: "已出账单管理"
            }
    },
   data(){
       return {
           activeKey:'wait',
           key:''
       }
   },
   components:{
       PaidList,
       WaitList
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('paymentMask')||'wait';
   },
   methods:{
        tabsClick(key){
           this.key=key;
           sessionStorage.setItem('paymentMask',key);
        }
    }
 }
</script>