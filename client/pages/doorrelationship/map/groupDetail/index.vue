
<template>
<div class="group-detail">
   
     <EditForm 
        @formData="getEditForm"  
        :initialData="editInitailData" 
        v-if="showEditForm" 
        @deleteEquipmentGroup= "deleteEquipmentGroup"
        @editNodeDataInDetail="editNodeDataInDetail"
        @closeDetailPage = "closeDetailPage"
    />

    <EquipmentList 
        :communityId="communityId"
        @openAddEquipmentModalFun="openAddEquipmentModalFun"
        :groupDetailDoorListData="groupDetailDoorListData"
        @deleteEquipmentFromGroup="deleteEquipmentFromGroup"
        @searchEquipment="searchEquipment"
        :doorTypeOptions = "doorTypeOptions"
        @getEquipmentList ="getEquipmentList"
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
        this.editInitailData = this.editInitialDataProps;
        this.showEditForm = true;
      
    },
     props:[
        "editInitialDataProps",
        "communityId",
        "groupDetailDoorListData",
        "doorTypeOptions"
     ],
    methods:{
        getEditForm(form){
            this.editData=form;
        },
        deleteEquipmentGroup(sendMsg){
            this.$emit('deleteEquipmentGroup',sendMsg);
        },
        editNodeDataInDetail(sendMsg,res){
            this.$emit("editNodeDataInDetail",sendMsg,res);
        },
       
        openAddEquipmentModalFun(){
            
            this.$emit("openAddEquipmentModalFun")
        },
        deleteEquipmentFromGroup(selection){

            let _this =this;
            var toDleteEquipmentArr = [];
            for(var i=0;i<selection.length;i++){
                toDleteEquipmentArr.push(selection[i].doorId)
            }
            var toDleteEquipmentStr = toDleteEquipmentArr.join(",");
            var paramsSend = {
                doorIds : toDleteEquipmentStr,
                setId : _this.editInitialDataProps.id
            }
            this.$emit("deleteEquipmentSendReq",paramsSend)

        },
        searchEquipment(msg){
            this.$emit("searchEquipment",msg)
        },
        getEquipmentList(page){
            this.$emit("changeDetailEquipmentListPage",page)
        },
        closeDetailPage(){
            this.$emit("closeDetailPage")
        }

    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>