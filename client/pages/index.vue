<style lang="less"> 
    .page {
        margin-top:20px;
    }
   
</style>


<template>

  <Buttons label='新建'  type='primary' v-on:click='buttonClick' checkAction='order_seat_export'/>
  
</template>


<script>
    import Buttons from '~/components/Buttons';

    export default {
         components:{
            Buttons
         },
         methods:{
            buttonClick(){
                //console.log('--pp',window.resourcesCode);
            }
        }
    }
</script>
