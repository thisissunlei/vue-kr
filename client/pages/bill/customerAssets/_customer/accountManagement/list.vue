
<template>
  <div class="m-account-management">
      <div class="account-manage-form">
          <ArriveForm 
                v-if="type=='getDetail'||type=='refundDetail'" 
                :type="type" 
                :communityList="communityList"
                @init="init"
                @searchClick="searchClick"
                @clearClick="clearClick"
           />
          <ConsumptionForm 
                v-if="type=='consumptionDetail'||type=='balanceDetail'" 
                :type="type" 
                :communityList="communityList"
                @init="init"
                @searchClick="searchClick"
                @clearClick="clearClick"
            />
          <DepositForm 
                v-if="type=='depositDetail'" 
                :communityList="communityList"
                @init="init"
                @searchClick="searchClick"
                @clearClick="clearClick"
           />
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
           allMoney:'',
           communityList:[]
        }
    },
    mounted(){
        this.getCommunityData();
    },
    methods:{
       init(params){
           this.getListData(params);
       },
       searchClick(params){
           this.getListData(params);
       },
       clearClick(params){
           this.getListData(params);
       },
       formattingColumns(data){
           var arr = [];
            for(let i=0;i<data.length;i++){
                let every = data[i];
                if(every.type.indexOf(this.type)!=-1){
                    arr.push(every);
                }
            }
            return arr;
       },
       goView(params){
           let name=params.payWayName;
           if(name=='银行转账'||name=='支付宝'){
               window.open('/bill/payment/detail/'+params.recordId,'_blank');
           }else if(name=='资金转移'){
               window.open('/order-center/apply-manage/'+params.recordId+'/releaseDepositInfo','_blank');
           }
       },
       getCommunityData(params){
            this.$http.get('join-bill-community','').then((response)=>{    
                this.communityList=response.data.items 
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getListData(params){
            let newParams={};
            let dateArray=['dateStart','dateEnd'];
            let newDate=publicFn.dateFormat(dateArray,params);
            newParams=Object.assign({},params,newDate);
            newParams.customerId=this.$route.params.customer;
            let typeUrl='';
            switch (this.type) {
                case 'getDetail':
                    typeUrl='account-payment-detail'
                    break;
                case 'refundDetail':
                    typeUrl='account-refund-detail'
                    break;
                default:
                    break;
            }
            this.$http.get(typeUrl,newParams).then((response)=>{    
                this.listData=response.data.details;
                this.allMoney=response.data.total;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        }
    }
}
</script>

<style lang="less">
  .m-account-management{
      .account-manage-table{
          margin:10px 20px 0 0px;
      }
      .statusClass{
            .ivu-table-cell{
                padding:0 5px;
            }
      }
  }
</style>
