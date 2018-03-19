
<template>
	<div class="article" 
        :style="{
            background:getBgColor(),
            width:boxDetail.width * minCalibration+'px',
            left:boxDetail.office * minCalibration+'px'
            }"
    >
       
        <div 
            class="plan"
            :style="{
                width:planDetail.width * minCalibration + 'px',
                left:planDetail.office * minCalibration + 'px'
            }"
        >
            <Poptip placement="bottom-start" :width="planDetail.width * minCalibration" @on-popper-show="getSpecificData" >
                <Tooltip :content="data.label" placement="bottom-start">
                    <div class="label" :style="{width:planDetail.width * minCalibration -20 + 'px'}">{{data.label}}</div>
                </Tooltip>
            
                <div class="api" slot="content">
                    <SpecificPlan :startDate="startDate"  :minCalibration="minCalibration"/> 
                </div>
            </Poptip>
        </div>
    


        <div 
            class="actual"
            :style="{
                width:actualDetail.width * minCalibration+'px',
                left:actualDetail.office * minCalibration + 'px'
            }"
        >
            <Poptip placement="bottom-start" :width="planDetail.width* minCalibration" @on-popper-show="getSpecificData" >
                <Tooltip :content="data.label" placement="bottom-start">
                    <div class="label" :style="{width:planDetail.width * minCalibration -20 + 'px'}">
                         {{data.label}}
                    </div>
                   
                </Tooltip>
                <div class="api" slot="content">
                    <SpecificPlan :startDate="startDate"  :minCalibration="minCalibration"/> 
                </div>
            </Poptip>
        </div>
            
           
	</div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SpecificPlan from './SpecificPlan'
export default {
    components:{
        SpecificPlan
    },
    props:{
       minCalibration:{
           type:[String,Number],
           default:50
       },
       startDate:{
           type:Object,
           
       }
    },
    data(){
        return {
            data:{
                label:'意向数钱数',
                currentStatus:-40,
                planStartTime:1515513600000,
                planEndTime:1516204800000,
                actualStartTime:1515686400000,
                actualEndTime:1516377600000,

            },
            boxDetail:{},
            planDetail:{},
            actualDetail:{} ,    
            leftEndpoint:this.startDate,       
        }
    },
    mounted(){
       this.getBoxWidthAndOffice();
    },
    methods:{
       getBgColor(){
           if(this.data.currentStatus<0){
               return "#FFCDCD"
           }else if(this.data.currentStatus>0){
               return '#FFECD4';
           }else{
               return "#E0F2CD"
           }
       },
       
       getBoxWidthAndOffice(){
            var dates = this.getEndpointDate();
            var boxDetail={};
            var planStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.planStartTime));
            var planEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.planEndTime));
            var actualStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.actualStartTime));
            var actualEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.actualEndTime));
            var max = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.max));
            var min = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            var officeStart = this.leftEndpoint.year+"-"+this.leftEndpoint.month+"-"+1;
            var officeEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            console.log(planStart,min,max)
            this.boxDetail={
                width:utils.dateDiff(min,max)+1,
                office:utils.dateDiff(officeStart,officeEnd)
            }
            this.planDetail={
                width:utils.dateDiff(planStart,planEnd)+1,
                office:utils.dateDiff(min,planStart)
            };
            this.actualDetail={
                width:utils.dateDiff(actualStart,actualEnd)+1,
                office:utils.dateDiff(min,actualStart)
            }
       },
       getEndpointDate(){
           var arr = [this.data.actualStartTime,this.data.actualEndTime,this.data.planStartTime,this.data.planEndTime];
            var max = arr[0],min=arr[0];
            for (var i = 1; i < arr.length; i++) {
                if(max<arr[i])
                    max =  arr[i];
                if(min>arr[i])
                    min = arr[i];
            }
            return {
                min:min,
                max:max
            }

       },
       //获取二级部分数据
       getSpecificData(){

       }
    }
}
</script>

<style lang="less" scoped>
.article{
    position: relative;
    padding: 10px 0px;
    .label{
        width: 100%;
        height: 100%;
    }
   .plan{
        height: 25px;
        background: #4F9EED ;
        border-radius:100px; 
        line-height: 25px;
        padding-left:10px;
        color: #ffffff;
        position: relative;
        cursor: pointer;

   }
   .actual{
        height: 25px;
        margin-top:1px; 
        background: #FDBA4D;
        border-radius:100px; 
        line-height: 25px;
        padding-left:10px;
        color: #fff;
        position: relative;
        cursor: pointer;
   }
    
}
</style>