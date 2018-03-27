<template>
    <div class='ui-flag' :style="{width:boxDetail.width*minCalibration+'px',left:boxDetail.office*minCalibration+'px'}">
        <div class="000000" :style="{
            left:planDetail.office*minCalibration+'px',
            position:'absolute',
            top:'15px'
        }">
            <Tooltip :content="label" placement="right" >
                <div class='blueFlag'>
                    <span>{{label}}</span>
                </div>
            </Tooltip>
        </div>

        <div class="111111" :style="{
            left:actualDetail.office*minCalibration+2+'px',
            position:'absolute',
            top:'15px'
        }">
            <Tooltip :content="label" placement="right">
                    <div class='yellowFlag'>
                        <span>{{label}}</span>
                    </div>
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
           default:{},
           type:Object
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
            var planOffice = utils.dateDiff(min,planStart);
            var actualOffice = utils.dateDiff(min,actualStart);
            var office = 0;
           
            if(actualOffice == planOffice){
                office=0.5;
            }
            console.log(planOffice,"------",actualOffice)
           
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
                office:utils.dateDiff(min,actualStart)+office
            }
           
           
            
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

<style lang='less'>
     .ui-flag{
          position: relative;
          .ivu-tooltip-popper{
              top:0px !important;
               .ivu-tooltip-arrow{
                    display:none;
                }
                .ivu-tooltip-inner{
                    padding: 3px 6px;
                    min-height:0;
                    background: rgba(0,0,0,0.6);
                }
          }
         .blueFlag{
            width:26px;
            height:29px;
            background:url(images/project.png) no-repeat center;
            background-size: contain;
            span{
                display:inline-block;
                width:30px;
                font-size: 10px;
                color: #FFFFFF;
                height:20px;
                line-height:20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
         } 
        .yellowFlag{
            width:26px;
            height:29px;
            background:url(images/actual.png) no-repeat center;
            background-size: contain;
            span{
                display:inline-block;
                width:30px;
                font-size: 10px;
                color: #FFFFFF;
                height:20px;
                line-height:20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
         } 
     }
</style>
