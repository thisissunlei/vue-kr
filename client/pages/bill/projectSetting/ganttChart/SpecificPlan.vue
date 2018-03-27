
<template>
	<div class="specific-plan" >
        <div class="triangle"></div>
        <div class="label">{{data.lable}}</div>
        <div>
            <div 
                class="plan"
                :style="{
                    width:planDetail.width*minCalibration+'px',
                    left:planDetail.office*minCalibration + 'px'
                }"
            >{{data.label}}</div>
            <div 
                class="actual"
                :style="{
                    width:actualDetail.width*minCalibration+'px',
                    left:actualDetail.office*minCalibration + 'px'
                }"
            >{{data.label}}</div>
         </div>
	</div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
export default {
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

       }
    }
}
</script>

<style lang="less" scoped>
.specific-plan{
   
    top: 30px;
    padding: 10px 0px;
    .triangle{
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid #fff;
    }
   .plan{
       height: 25px;
       background: #4F9EED ;
       border-radius:100px; 
       line-height: 25px;
       padding-left:10px;
       color: #ffffff;
        position: absolute;

   }
   .actual{
        height: 25px;
        margin-top:1px; 
        background: #FDBA4D;
        border-radius:100px; 
        line-height: 25px;
        padding-left:10px;
        color: #fff;
        position: absolute;
   }
    
}
</style>