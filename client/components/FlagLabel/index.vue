<template>
    <div class='ui-flag'>
       <Tooltip :content="label" placement="right">
            <div :class='flagClass' ref="proFlag" />
       </Tooltip>
    </div>
</template>

<script>

export default {
    props:{
        label:{
            default:'',
            type:String
        },
        type:{
            default:'lanqi',
            type:String
        }
    },
    data() {
        return{
            flagClass:'',
        }
    },
    mounted(){
        this.flagClass=this.type=='lanqi'?'blueFlag':'yellowFlag';
    }
}
</script>

<style lang='less' scoped>
     .ui-flag{
         float:right;
         .blueFlag{
            width:20px;
            height:25px;
            background:url(images/lanqi.png) no-repeat center;
            background-size: contain;
         } 
        .yellowFlag{
            width:20px;
            height:25px;
            background:url(images/huangqi.png) no-repeat center;
            background-size: contain;
         } 
     }
</style>
