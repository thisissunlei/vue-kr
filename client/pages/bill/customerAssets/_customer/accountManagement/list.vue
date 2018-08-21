
<template>
  <div class="m-account-management">
      <div class="account-manage-form">
          <ArriveForm v-if="type=='getDetail'||type=='refundDetail'" :type="type"/>
          <ConsumptionForm v-if="type=='consumptionDetail'||type=='balanceDetail'" :type="type"/>
          <DepositForm v-if="type=='depositDetail'"/>
      </div>
      <div style="color:red;text-align:right;margin-right:20px;">金额总计:¥{{allMoney}}</div>
      <div class="account-manage-table">
          <Table 
            :columns="listColumns" 
            :data="listData"
            border
          />
       </div>
  </div>
</template>

<script>
import publicFn from './publicPage.js';
import ArriveForm from './searchForm/arriveForm';
import DepositForm from './searchForm/depositForm';
import ConsumptionForm from './searchForm/consumptionForm';
export default {
    components:{
        ArriveForm,
        DepositForm,
        ConsumptionForm,
    },
    props:{
        type:{
            type:String,
            default:""     
        }
    }, 
    data() {
        return{
           listData:[],
           listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this,this.type))),
           allMoney:''
        }
    },
    mounted(){
        
    },
    methods:{
       formattingColumns(data){
           var arr = [];
            for(let i=0;i<data.length;i++){
                let every = data[i];
                if(every.type.indexOf(this.type)!=-1){
                    arr.push(every);
                }
            }
            return arr;
       }
    }
}
</script>

<style lang="less">
  .m-account-management{
      .account-manage-table{
          margin:10px 20px 0 0px;
      }
  }
</style>
