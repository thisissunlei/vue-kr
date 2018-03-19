
<template>
	<div class="draw-day" >
        <div class="day" v-for="item in monthDay" :key="item.id">
            {{item}}
        </div>
	</div>
</template>

<script>
export default {
    props:{
        dayNum:{
            default:30,
            type:[String,Number]
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
            num.length = this.dayNum;
            return num;
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
        border-bottom: 1px solid #CAD5E4;
        border-right: 1px solid #CAD5E4;
        transition: all 0.3;
    }
    
}
</style>