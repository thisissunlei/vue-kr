<template>
    <div class='ui-flag' :style="{width:boxDetail.width*minCalibration+'px',left:boxDetail.office*minCalibration+'px'}">
        <div :style="{
            left:planDetail.office*minCalibration+'px',
            position:'relative'
        }">
            <Tooltip :content="label" placement="right" >
                    <div class='blueFlag'/>
            </Tooltip>
        </div>
        <div :style="{
            left:actualDetail.office*minCalibration+'px',
            position:'relative'
        }">
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
        data:{
            type:[Number,String],
        },
        startDate:{
            default:{},
            type:Object
        },
        minCalibration:{
            type:[Number,String]
        }
    },
    data(){
        return {
            mask:false,
            boxDetail:{},
            planDetail:{},
            actualDetail:{}
        }
    },
    mounted(){
    //    
        this.getBoxWidthAndOffice();
    },
    methods:{
        getBoxWidthAndOffice(){
           
            var dates = this.getEndpointDate();
            var boxDetail={};
            var planStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.planStartTime));
            var planEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.planEndTime));
            var actualStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.actualStartTime));
            var actualEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.actualEndTime));
            var max = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.max));
            var min = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            var officeStart = this.startDate.year+"-"+this.startDate.month+"-"+1;
            var officeEnd = min;
           
            this.boxDetail={
                width:utils.dateDiff(min,max)+1,
                office:utils.dateDiff(officeStart,min)
            }
            this.planDetail={
                width:utils.dateDiff(planStart,planEnd)+1,
                office:utils.dateDiff(min,planStart)
            };
            this.actualDetail={
                width:utils.dateDiff(actualStart,actualEnd)+1,
                office:utils.dateDiff(min,actualStart)
            }
           
            console.log( this.boxDetail,"-----------",min)
           
            
       },
         getEndpointDate(){
                var arr = [];
                if(this.data.actualStartTime){
                    arr.push(this.data.actualStartTime)
                }
                if(this.data.actualEndTime){
                    arr.push(this.data.actualEndTime)
                }
                if(this.data.planStartTime){
                    arr.push(this.data.planStartTime)
                }
                if(this.data.planEndTime){
                    arr.push(this.data.planEndTime)
                }
            
                var max = arr[0],min=arr[0];
                for (var i = 1; i < arr.length; i++) {
                    if(max<arr[i])
                        max =  arr[i];
                    if(min>arr[i])
                        min = arr[i];
                }
                return {
                    min:+min,
                    max:+max
                }

        },
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
