<template>
    <div class="m-bill-wrap">
        <Tabs :value="activeKey" :animated="false" @on-click="tabsClick">
            <Tab-pane label="未付清账单" name="wait">
                <WaitList 
                    :mask="key" 
                    :billType="billType" 
                    :typeList="typeList"
                    :communityList="communityList"
                />
            </Tab-pane>
            <Tab-pane label="已付清账单" name="paid">   
                <PaidList 
                    :mask="key"  
                    :billType="billType"  
                    :typeList="typeList"
                    :communityList="communityList"
                />
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
                title: "账单-氪空间后台管理系统"
            }
    },
   data(){
       return {
           activeKey:'wait',
           key:'',
           billType:[],
           typeList:[],
           communityList:[]
       }
   },
   components:{
       PaidList,
       WaitList
   },
   mounted(){
      this.activeKey=sessionStorage.getItem('billMask')||'wait';
      this.getBillType();
      this.getCommunity();
   },
   methods:{
        tabsClick(key){
           this.key=key;
           sessionStorage.setItem('billMask',key);
        },
        getBillType(){
                this.$http.get('get-bill-type', '').then((res)=>{
                    res.data.enums.map((item)=>{
                         this.billType[item.code]=item.name; 
                         item.label=item.name;
                        item.value=item.code; 
                    })
                    this.typeList=res.data.enums;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
        },
        getCommunity(){
              this.$http.get('join-bill-community','').then((res)=>{
                this.communityList=res.data.items;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
        }
    }
 }
</script>