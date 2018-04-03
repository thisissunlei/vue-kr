
<template>
	<div class="draw-week" :style="{width:data.length * minCalibration+'px'}" >
        {{data.start.month+'/'+data.start.day+' - '+data.end.month+'/'+data.end.day}}
	</div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object
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
.draw-week{
    text-align: center;
    height: 50px;
    line-height: 50px;
    width: 50px;
    overflow: hidden;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    border-bottom: 1px solid #F0F0F0;
    border-right: 1px solid #F0F0F0;
    transition: all 0.3;
}
</style>