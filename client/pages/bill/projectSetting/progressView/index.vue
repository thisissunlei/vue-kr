<template>
  <div>
         <Select>
            <Option 
               v-for="item in data" 
               :value="''+item.value" 
               :key="item.value"
               >
                 {{ item.label}}
               </Option>
         </Select>
        
        <div class='chart-ul-wrap'>
             {{month}}
        </div>
  </div>
</template>


<script>
import utils from '~/plugins/utils';

export default {
    data(){
        return{
            data:[
                {label:'年',value:'year'},
                {label:'月',value:'month'},
                {label:'日',value:'day'}
            ],
            month:''
        }
    },
    mounted(){
        var myDate = new Date();
        this.month=myDate.getMonth()+1;
    }
}
</script>

<style lang="less">
   .chart-ul-wrap{
       width:100%;
       display:inline-block;
       text-align: center;
   }
   .year-li{
      text-decoration:none;
      display:inline-block;
      margin:5px 10px;
   }
</style>
