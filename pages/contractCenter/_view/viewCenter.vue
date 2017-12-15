<style lang="less"> 
   
</style>


<template>

    <div>
       <center><embed src="/pdf/git.pdf" width="850" height="890"></center>
    </div>
  
</template>
<script>
    
    export default {
        data () {
            return {
               data:''
            }
        },
        mounted(){
        //    this.getListData(this.params);
        },
        methods:{
            handleFormatError(){
                console.log("格式不正确=======")
            },
        },
        
    }
</script>