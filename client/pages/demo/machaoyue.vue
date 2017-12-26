<style lang="less"> 
   
</style>


<template>

    <div>
        
        
    </div>
  
</template>
<script>
import http from '~/plugins/axiosHttp';
    export default {
        head () {
            return {
                title: "合同列表"
            }
           
        },
        data () {
            return {
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                http("post-contract-take-effect", {
                    requestId:2
                }).then( (response) => {
                    console.log('=======>',response)
                }).catch( (error) => {
                    console.log('======>',error)
                }) 
            }
            
            
        },
        
    }
</script>