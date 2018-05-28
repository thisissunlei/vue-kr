
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
        "communityId"
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
        }
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>