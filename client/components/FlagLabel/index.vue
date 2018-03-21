<template>
    <div class='ui-flag'>
        <div ref="blueFlag">
            <Tooltip :content="label" placement="right" >
                    <div class='blueFlag'/>
            </Tooltip>
        </div>
        <div ref="yellowFlag" v-if="mask">
            <Tooltip :content="label" placement="right">
                    <div class='yellowFlag'/>
            </Tooltip>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
export default {
    props:{
        label:{
            default:'',
            type:String
        },
        time:{
            default:{},
            type:Object
        },
        minCalibration:{
            type:[Number,String]
        }
    },
    data(){
        return {
            mask:false
        }
    },
    mounted(){
       if(this.time['actualStartTime']&&this.time['actualEndTime']){
        this.mask=true;
        var actualStart=dateUtils.dateToStr("YYYY-MM-DD",new Date(this.time.actualStartTime));
        var actualEnd=dateUtils.dateToStr("YYYY-MM-DD",new Date(this.time.actualEndTime));
        var planRange=utils.dateDiff(actualStart,actualEnd);
        let yellowDom=this.$refs.yellowFlag;  
         yellowDom.style.left=planRange*Number(this.minCalibration)+'px';
       }else{
           this.mask=false;
       }
       var planStart=dateUtils.dateToStr("YYYY-MM-DD",new Date(this.time.planStartTime));
       var planEnd=dateUtils.dateToStr("YYYY-MM-DD",new Date(this.time.planEndTime));
       var planRange=utils.dateDiff(planStart,planEnd);
       let blueDom=this.$refs.blueFlag;  
       blueDom.style.left=planRange*Number(this.minCalibration)+'px';
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
