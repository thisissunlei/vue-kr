<style lang="less"> 
    .section-title {
        border-bottom: 1px solid #E8E9E9;
        height: 50px;
        font-size: 16px;
        color: #666;
        line-height: 50px;
        padding-left: 25px;
        position: relative;
        &::before{
            height: 24px;
            border:2px solid #499df1;
            position: absolute;
            width: 0;
            content: '';
            display:inline-block;
            top: 12px;
            left: 0;
        }
    }
   
</style>



<template>
    <div class="section-title">
        {{label}}
    </div>
</template>


<script>
    export default {
        props:{
            label:String
        },
        data () {
            return {
                
            };
        }
    }
</script>