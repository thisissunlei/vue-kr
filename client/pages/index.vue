<style lang="less"> 
    .page {
        margin-top:20px;
    }
   
</style>


<template>

  <Buttons 
   label='新建'  
   type='primary' 
   v-on:click='buttonClick' 
   checkAction='order_seat_export'
   styles="color:#499df1;"
 />
  
</template>


<script>
    import Buttons from '~/components/Buttons';

    export default {
        components:{
            Buttons
        },
        mounted(){
           
            // window.onresize = function (params) {
            //     console.log("000000000")
            //     dom.style.height = document.documentElement.clientHeight-130 + "px"
            // }
            // var dom = document.getElementById('layout-content-main');
            // dom.style.height = document.documentElement.clientHeight-130 + "px"
        },
         
        methods:{
            buttonClick(){
                //console.log('--pp',window.resourcesCode);
            }
        }
    }
</script>
