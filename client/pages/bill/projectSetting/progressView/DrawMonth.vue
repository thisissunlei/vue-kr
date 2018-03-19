
<template>
	<div class="draw-month" :style="{width:dayNum * minCalibration+'px'}">
       <span class="label">
           {{data.year+'/'+data.month}}
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
        }
    },
    data(){
        return {
           
        }
    },
    methods:{
       
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
        border-bottom: 1px solid #CAD5E4;
        border-right: 1px solid #CAD5E4;
        transition: all 0.3;
        .label{
            display: inline-block;
            padding-left:20px; 
        }
}
</style>