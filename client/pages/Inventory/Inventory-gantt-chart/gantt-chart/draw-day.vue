
<template>
	<div class="draw-day" >
        <div class="day" v-for="item in monthList" :key="item.id" :style="{backgorund:item.day=='今天'?'#F3F2F7':''}">
            <div style="height:25px;line-height: 39px;">{{item.day}}</div>
            <div style="height:25px;">{{item.weekName}}</div>
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
            monthDay:this.getDayNum(),
            monthList:[]
        }
    },
    mounted(){
        this.getWeekText();   
    },
    methods:{
        getWeekText(){
            var weekArr=['日','一','二','三','四','五','六'];
            this.monthList=[];
            this.monthDay.map((item,index)=>{
                var list={};
                var week=this.data.year+'/'+this.data.month+'/'+item;
                list.day=item;
                list.week=(new Date(week)).getDay();
                list.weekName='周'+weekArr[list.week];
                this.monthList.push(list)
            })
        },
        getDayNum(){
            var num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var num = num.slice(this.data.start-1,this.data.dayNum);
            return num;
        },
        theToday(num){
             var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
             if(today === this.data.year+'-'+this.data.month+'-'+num){
                 return true;
             }else {
                 return false;
             }
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
        width: 50px;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 1px solid #F0F0F0;
        border-right: 1px solid #F0F0F0;
        transition: all 0.3;
        position: relative;
        
    }
    
}
</style>