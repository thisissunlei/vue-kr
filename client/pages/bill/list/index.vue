<template>
    <div class="m-bill-wrap">
        <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="未付清账单" name="wait">
                <WaitList :mask="key" :billType="billType"/>
            </Tab-pane>
            <Tab-pane label="已付清账单" name="paid">   
                <PaidList :mask="key"  :billType="billType"/>
            </Tab-pane>
           
        </Tabs>    
    </div>
</template>

<script>
import PaidList from './paidList';
import WaitList from './waitList';
import utils from '~/plugins/utils';

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
           key:'',
           billType:[],
          
       }
   },
   components:{
       PaidList,
       WaitList
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('paymentMask')||'wait';
      this.getBillType();
   },
   methods:{
        tabsClick(key){
           this.key=key;
           sessionStorage.setItem('paymentMask',key);
        },
         getBillType(){
                this.$http.get('get-bill-type', '').then((res)=>{
                    res.data.enums.map((item)=>{
                         this.billType[item.code]=item.name;  
                    })
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },
    }
 }
</script>