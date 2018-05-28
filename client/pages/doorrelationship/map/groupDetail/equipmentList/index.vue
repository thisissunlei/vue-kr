
<template>

<div >
  <div>
      <Button type="primary" @click="openAddEquipmentModalFun">添加设备</Button>
  </div>
  <EquipmentSearch 
    :communityId="communityId" 
    @searchEquipment="searchEquipment"
  />
  <div>
    <ul>

      <li v-for="item in doorListData.items">
        {{item.title}}
      </li>
    </ul>
  </div>
   
</div>
</template>
<script>
import EquipmentSearch from './equipmentSearch';
export default{
    name:'equipmentList',
    data (){
      return{
            doorListData : {}  
              
      }
    },
    components:{
      EquipmentSearch,
    },
    mounted(){
        var params = {communityId : this.communityId};
        this.getEquipmentListData(params);
    },
     props:[
        "communityId"
     ],
    methods:{
       searchEquipment(params){
         console.log("params",params);
         var sendParams = Object.assign({},{communityId:this.communityId},params)
         this.getEquipmentListData(sendParams)
         
       },
       getEquipmentListData(param){

        this.$http.get('getDoorListByGroup', param).then((res)=>{
          
          this.doorListData = res.data;
        }).catch((error)=>{
          this.$Notice.error({
            title:error.message
          });
        })
       },
       openAddEquipmentModalFun(){
        //  console.log(":--------");
         this.$emit("openAddEquipmentModalFun")
       }
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>