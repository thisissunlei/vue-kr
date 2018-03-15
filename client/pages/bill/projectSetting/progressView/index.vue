<template>
  <div>
        <div class='chart-ul-wrap'>
             <div>
                  
             </div>
        </div>
  </div>
</template>


<script>
import utils from '~/plugins/utils';

export default {
    data(){
        return{
            year:['2018'],
            month:["1月","2月", "3月","4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            week:["日", "一", "二", "三", "四", "五", "六"],
        }
    },
    mounted(){
       var myDate=new Date();
       
    }
}
</script>

<style lang="less">
   .chart-ul-wrap{
       width:100%;
       display:inline-block;
       text-align: center;
   }
</style>
