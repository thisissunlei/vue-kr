
<template>
    <div class="child-every-article" :data-chart="data.t_id" >
        <div v-if="!this.data.chartType && isInitial()">
        <!-- <FlagLabel v-if="getFlagShow('MEETING')" 
            :label="data.label" 
            :data="20" 
            :minCalibration="minCalibration" 
            :startDate="leftEndpoint"
        /> -->
        <div class="article" 
            v-if="getFlagShow('STAGETASK')"
            :style="{
                width:boxDetail.width * minCalibration+'px',
                left:boxDetail.office * minCalibration+'px',
                position:'relative',
                
            }"
        >
            <div class="label"></div>
            <div 
                class="plan"
                :style="{
                    width:planDetail.width * minCalibration + 'px',
                    left:planDetail.office * minCalibration + 'px'
                }"
                v-if="!data.chartType && data.data.planStartTime && data.data.planEndTime"
            >
                
            </div>
            <div 
                class="actual"
                :style="{
                    width:actualDetail.width * minCalibration+'px',
                    left:actualDetail.office * minCalibration + 'px'
                }"
                v-if="!data.chartType && data.data.actualStartTime && data.data.actualEndTime"
            >
                
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SpecificPlan from './SpecificPlan'
import FlagLabel from '~/components/FlagLabel';
export default {
   
    components:{
        SpecificPlan,
        FlagLabel
    },
    props:{
        minCalibration:{
            type:[String,Number],
            default:50
        },
        startDate:{
            type:Object,
        },
        label:{
            type:String
        },
        data:{
            type:Object,
        },
        treeKey:{
            type:[Number,String]
        },
        type:{
            type:String,
            default:'view'
        },
       
    },
    data(){
        return {
            boxDetail:{},
            planDetail:{},
            actualDetail:{} ,    
            leftEndpoint:this.startDate
        }
    },
    mounted(){
        if(!this.data.chartType){
            this.getBoxWidthAndOffice();
        }
      
      console.log()
    },
    methods:{
        isInitial(){
             if(this.data.data.actualStartTime && this.data.data.actualEndTime){
               return true;
            }
           
            if(this.data.data.planStartTime && this.data.data.planEndTime){
                return true;
            }
         
            return false
        },
        getFlagShow(event){
            if(this.data.data){
                return this.data.data.taskType == event
            }else{
                var type = 'STAGETASK';
                return type == event;
            }

        },
        getBgColor(){
                if(this.data.chartType || !this.data.data.progressStatus){
                    return "#fff";
                }
                if(this.data.data.progressStatus<0){
                    return "#FFCDCD"
                }else if(this.data.data.progressStatus>0){
                    return '#FFECD4';
                }else{
                    return "#E0F2CD"
                }
            
            
        },
       
       getBoxWidthAndOffice(){
           
            var dates = this.getEndpointDate();
            var boxDetail={};
            var planStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.data.planStartTime));
            var planEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.data.planEndTime));
            var actualStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.data.actualStartTime));
            var actualEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(this.data.data.actualEndTime));
            var max = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.max));
            var min = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            var officeStart = this.startDate.year+"-"+this.startDate.month+"-"+this.startDate.dayNum;
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
            var arr = [];
            if(this.data.data.actualStartTime){
                arr.push(this.data.data.actualStartTime)
            }
            if(this.data.data.actualEndTime){
                arr.push(this.data.data.actualEndTime)
            }
            if(this.data.data.planStartTime){
                arr.push(this.data.data.planStartTime)
            }
            if(this.data.data.planEndTime){
                arr.push(this.data.data.planEndTime)
            }
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

<style lang="less" >
.article .ivu-poptip-popper{
        left: -22px !important;
    }
.child-every-article{

    position: relative;
    padding: 8px 0px;

    
    .label{
        width: 100%;
       
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        background: #DEEEFF;
        border-radius: 7px 7px 0px 0px;
        line-height: 28px;
        height: 28px;
        color: #0561B5;
        padding: 0px 10px;
    }
   .plan{
        height: 8px;
        background: #FDBA4D ;
        border-radius:100px; 
        line-height: 8px;
        padding-left:10px;
        color: #ffffff;
        position: relative;
        cursor: pointer;

   }
   .actual{
        height: 8px;
        margin-top:1px; 
        background: #7ED321;
        border-radius:100px; 
        line-height: 8px;
        padding-left:10px;
        color: #fff;
        position: relative;
        cursor: pointer;
   }
    
}
</style>