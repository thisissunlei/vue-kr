
<template>
	<div class="draw-month" :style="{width:data.length * minCalibration+'px'}">
       <span class="label" :style="{fontSize:size+'px'}">
           {{this.getMonth()}}
       </span>
	</div>
</template>

<script>
export default {
    props:{
        dayNum:{
            default:30,
            type:[String,Number]
        },
        data:{
            type:Object,
        },
        minCalibration:{
            type:[String,Number],
            default:50
        },
        size:{
            type:[String,Number]
        },
        type:{
            type:String
        }
    },
    data(){
        return {
           month:this.getMonth()
        }
    },
    methods:{
        getMonth(){
            if(this.type=='month'){
                return this.data.month+'月';
            }else {
                return this.data.year+'.'+((+this.data.month<10)?'0'+this.data.month:this.data.month);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.draw-month{
        height: 50px;
        line-height: 50px;
        text-align: left;
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 1px solid #F0F0F0;
        border-right: 1px solid #F0F0F0;
        overflow: hidden;
        transition: all 0.3;
        .label{
            display: inline-block;
            padding-left:20px; 
        }
}
</style>