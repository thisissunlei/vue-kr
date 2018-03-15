<template>
  <div>
        <div class='chart-ul-wrap'>
             <div style="width:100%;">
                     <ul style="display:block;">
                         <li
                           v-for="item in year"
                           :key="item"
                           class="chart-day-li"
                         >
                            {{item}}
                             <ul style="display:block;">
                                    <li
                                    v-for="items in month"
                                    :key="items"
                                    class="chart-day-li"
                                    >
                                        {{items}}
                                        <ul style="display:block;">
                                                <li
                                                v-for="itemss in day"
                                                :key="itemss"
                                                class="chart-day-li"
                                                >
                                                    {{itemss}} 
                                                </li>
                                        </ul>
                                    </li>
                               </ul>
                         </li>
                    </ul>
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
            day:[],
            today:'',
            toMonth:'',
            toYear:''
        }
    },
    mounted(){
       var myDate=new Date();
       this.today=myDate.getDate();
       this.toMonth=myDate.getMonth()+1;
       this.toYear=myDate.getFullYear();
       this.month.map((item,index)=>{
           this.day=[];
           for(var i=1;i<=utils.getDaysInOneMonth(this.toYear,item);i++){
               this.day.push(i);
           }
       })
    }
}
</script>

<style lang="less">
   .chart-ul-wrap{
       width:100%;
       display:inline-block;
       text-align: center;
       .chart-day-li{
           border:solid 1px #444;
           display:inline-block;
       }
   }
</style>
