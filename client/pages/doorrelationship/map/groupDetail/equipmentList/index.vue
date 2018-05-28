
<template>

<div class="list">
  <div>
      <Button type="primary" @click="openAddEquipmentModalFun" class="list-btn">添加设备</Button>
      <Button type="primary" @click="deleteEquipmentFromGroup" class="list-btn">删除设备</Button>
  </div>
  <EquipmentSearch 
    :communityId="communityId" 
    @searchEquipment="searchEquipment"
  />
  <div>
      <Table  
          highlight-row 
          stripe
          size="small"
          ref="selection" 
          :columns="columnsData" 
          :data="groupDetailDoorListData.items" 
          @on-selection-change="onSelectionChange"
          
      >
      </Table>
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="groupDetailDoorListData.totalCount" :current="1" @on-change="changePage" :page-size=15></Page>
          </div>
      </div>
  </div>
   
</div>
</template>
<script>
import EquipmentSearch from './equipmentSearch';
export default{
    name:'equipmentList',
    data (){
      return{
            doorListData : {}  ,
             columnsData:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '硬件ID',
                        key: 'serialNo',
                        width: 200,
                    },
                    {
                        title: '屏幕显示标题',
                        key: 'title',
                        width: 150,
                    },
                    {
                        title: '屏幕显示编号',
                        key: 'doorCode',
                        width: 150,
                    }
                ],
              equipmentListData:[],
              selection :[],
              
      }
    },
    components:{
      EquipmentSearch,
    },
    mounted(){
        var params = {communityId : this.communityId};
        // this.getEquipmentListData(params);
        
    },
     props:[
        "communityId",
        "groupDetailDoorListData"
     ],
    methods:{
       searchEquipment(params){
         console.log("params",params);
         var sendParams = Object.assign({},{communityId:this.communityId},params)
        //  this.getEquipmentListData(sendParams)
         
       },
      //  getEquipmentListData(param){

      //   this.$http.get('getDoorListByGroup', param).then((res)=>{
          
      //     this.doorListData = res.data;
      //   }).catch((error)=>{
      //     this.$Notice.error({
      //       title:error.message
      //     });
      //   })
      //  },
       openAddEquipmentModalFun(){
         this.$emit("openAddEquipmentModalFun")
       },
       onSelectionChange(selection){
         console.log("sdklfkfdlkdld",selection);
         this.selection = selection;
       },
       changePage(){

       },
       deleteEquipmentFromGroup(){
         if(this.selection.length<1){
           this.$Message.warning('您未选择要删除的设备');
         }else{
           this.$emit("deleteEquipmentFromGroup",this.selection)
         }
       }
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">
  .list{
    padding-top: 15px;
    border-top: dashed 1px grey;
    .list-btn{
      margin-right:8px;
    }
  }
</style>