<style lang="less"> 
   
</style>


<template>

    <div>
       <center><embed src="/pdf/git.pdf" width="850" height="890" name="打印"></center>
       
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
          GLOBALSIDESWITCH("false"); 
        //    this.getListData(this.params);
        },
        methods:{
            handleFormatError(){
                console.log("格式不正确=======")
            },
        },
        
    }
</script>