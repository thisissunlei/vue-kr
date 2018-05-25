
<template>
<div class="group-detail">
   
     <EditForm @formData="getEditForm"  :initialData="editInitailData" v-if="showEditForm" @closeGroupDetailModal= "closeGroupDetailModal"/>

     <EquipmentList :communityId="communityId"/>
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
        closeGroupDetailModal(){
            this.$emit('closeGroupDetailModal');
        }
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>