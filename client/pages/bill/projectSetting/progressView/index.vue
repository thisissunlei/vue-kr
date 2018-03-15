<template>
  <div>
        <div class='chart-ul-wrap'>
             <div class='chart-out'>
                  
             </div>
        </div>
  </div>
</template>


<script>
import utils from '~/plugins/utils';

export default {
    data(){
        return{
            year:['2017','2018'],
            month:["1月","2月", "3月","4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            week:["日", "一", "二", "三", "四", "五", "六"],
            dateData:[]
        }
    },
    mounted(){
       var myDate=new Date();
       this.today=myDate.getDate();
       var dateData=[];
       this.year.map((item,index)=>{
           this.month.map((items,indexs)=>{
                var list={};
                var day=[];
                list.year=item;
                list.month=items;
                for(var i=1;i<=utils.getDaysInOneMonth(item,items);i++){
                    day.push(i);
                }
                list.day=day;
                dateData.push(list);
            })
       })
       this.dateData=[].concat(dateData);
       console.log('this--',this.dateData);
    }
}
</script>

<style lang="less">
   .chart-ul-wrap{
       width:100%;
       display:inline-block;
       .chart-out{
           width:600px;
           height:500px;
           border:solid 1px #ddd;
           margin:0 auto;
           overflow: scroll;
       }
       .chart-li-day{
           width:30px;
           border:solid 1px #ddd;
           list-style: none;
       }
   }
</style>
