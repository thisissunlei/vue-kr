
<template>
<div class="g-high-search">
   
     <EditForm @formData="getEditForm"  :initialData="editInitailData"/>
</div>
</template>
<script>
import EditForm from './editForm';
export default{
    name:'groupDetail',
    data (){
		return{
            editInitailData : {},
			editData :{}
		}
    },
    components:{
   
        EditForm
    },
    mounted(){

      
    },
     props:[
        
     ],
    methods:{
        getEditForm(form){
            this.editData=form;
        },
    },
    updated:function(){

       
    }

}
</script>
<style lang="less">

</style>