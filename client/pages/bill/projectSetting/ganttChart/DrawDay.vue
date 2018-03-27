
<template>
	<div class="draw-day" >
        <div class="day" v-for="item in monthDay" :key="item.id" :style="{backgorund:item=='今天'?'#F3F2F7':''}">
            {{item}}
        </div>
	</div>
</template>

<script>
import dateUtils from 'vue-dateutils';

export default {
    props:{
        dayNum:{
            default:30,
            type:[String,Number]
        },
        data:{
            type:Object
        }
    },
    data(){
        return {
            monthDay:this.getDayNum()
        }
    },
    methods:{
        getDayNum(){
            var num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var todyObj = today.split("-");
             num.length = this.dayNum;
            if(+todyObj[0]===this.data.year && +todyObj[1]==this.data.month){
                num[+todyObj[2]-1] = '今天'
            }
           
            return num;
        },
        showLabel(num){
            var month = +this.data.month<10?0+''+this.data.month:this.data.month;
            var num = num<10?0+''+num:num;
            var timeString = this.data.year+'-'+month+'-'+num;
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            if(today == timeString){
                return '今天';
            }else {
                return num;
            }
        } 
    }
}
</script>

<style lang="less" scoped>
.draw-day{
    display: inline-block;
    .day{
        height: 50px;
        line-height: 50px;
        width: 50px;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 1px solid #F0F0F0;
        border-right: 1px solid #F0F0F0;
        transition: all 0.3;
    }
    
}
</style>