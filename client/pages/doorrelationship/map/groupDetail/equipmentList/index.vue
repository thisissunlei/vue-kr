
<template>
<div >
  <EquipmentSearch :communityId="communityId"/>
  <div>

    设备列表
  </div>
   
</div>
</template>
<script>
import EquipmentSearch from './equipmentSearch';
export default{
    name:'equipmentList',
    data (){
      return{
              
              
      }
    },
    components:{
      EquipmentSearch,
    },
    mounted(){
       
    },
     props:[
        "communityId"
     ],
    methods:{
       
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>