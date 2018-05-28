
<template>
<div class="group-detail">
   
     <EditForm 
        @formData="getEditForm"  
        :initialData="editInitailData" 
        v-if="showEditForm" 
        @deleteEquipmentGroup= "deleteEquipmentGroup"
        @editNodeDataInDetail="editNodeDataInDetail"
        @openDeleteTipFromDetail = "openDeleteTipFromDetail"
    />

    <EquipmentList 
        :communityId="communityId"
        @openAddEquipmentModalFun="openAddEquipmentModalFun"
        :groupDetailDoorListData="groupDetailDoorListData"
        @deleteEquipmentFromGroup="deleteEquipmentFromGroup"
    />
</div>
</template>
<script>
import EditForm from './editForm';
import EquipmentList from './equipmentList';
export default{
    name:'groupDetail',
    data (){
		return{
            showEditForm : false,
            editInitailData : {},
            editData :{},
            
		}
    },
    components:{
        EditForm,
        EquipmentList,
        
    },
    mounted(){
        console.log("editInitialDataProps",this.editInitialDataProps);
        this.editInitailData = this.editInitialDataProps;
        this.showEditForm = true;
      
    },
     props:[
        "editInitialDataProps",
        "communityId",
        "groupDetailDoorListData"
     ],
    methods:{
        getEditForm(form){
            this.editData=form;
        },
        deleteEquipmentGroup(sendMsg){
            this.$emit('deleteEquipmentGroup',sendMsg);
        },
        editNodeDataInDetail(sendMsg){
            this.$emit("editNodeDataInDetail",sendMsg);
        },
        openDeleteTipFromDetail(sendMsg){
             this.$emit("openDeleteTipFromDetail",sendMsg);
        },
        openAddEquipmentModalFun(){
            
            this.$emit("openAddEquipmentModalFun")
        },
        deleteEquipmentFromGroup(selection){

            let _this =this;
            var toDleteEquipmentArr = [];
            for(var i=0;i<selection.length;i++){
                toDleteEquipmentArr.push(selection[i].id)
            }
            var toDleteEquipmentStr = toDleteEquipmentArr.join(",");
            console.log("toDleteEquipmentStr",toDleteEquipmentStr);
            var paramsSend = {
                doorIds : toDleteEquipmentStr,
                setId : _this.editInitialDataProps.id
            }
            console.log("paramsSend",paramsSend);
            this.$emit("deleteEquipmentSendReq",paramsSend)

        },

    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>