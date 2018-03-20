<template>
    <div class='ui-flag' ref="tipFlag">
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
        },
        offset:{
           default:'',
           type:[Number,String]  
        },
        minCalibration:{
           default:'',
           type:[Number,String]  
        }
    },
    data() {
        return{
            flagClass:'',
        }
    },
    mounted(){
        this.flagClass=this.type=='lanqi'?'blueFlag':'yellowFlag';
        let flagDom=this.$refs.tipFlag;  
        flagDom.style.left=Number(this.offset)*Number(this.minCalibration)+'px';
    }
}
</script>

<style lang='less' scoped>
     .ui-flag{
          position: relative;
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
