
<template>
    <div class="every-view-col" :data-chart="data.t_id" >
        <div class="tag" :style="{width: todayDetail.width+ 'px',left:todayDetail.left+'px'}"></div>
        <div class="article" 
            v-if="getFlagShow('STAGETASK')"
            :style="{
                width:boxDetail.width * minCalibration+'px',
                left:boxDetail.office * minCalibration+'px',
               
            }"
        >
            
            <Tooltip :content="data.label" :placement="index==0?'bottom-start':'top-start'">
                
                <div 
                    class="plan"
                    :style="{
                        background:getPlanBgColor(),
                        width:planDetail.width * minCalibration + 'px',
                        left:planDetail.office * minCalibration + 'px'
                    }"
                >{{getActualLabel(data.label)}}
                </div>

                <div 
                    class="actual"
                    :style="{
                        width:actualDetail.width * minCalibration+'px',
                        left:actualDetail.office * minCalibration + 'px',
                        background:getActualBgColor(),
                        color:'#666666'

                    }"
                    v-if="!data.chartType && data.data.actualStartTime && data.data.actualEndTime"
                >  
                {{getActualLabel(data.label)}}
                </div>
                <div v-if="lineShow()" class="line" :style="{width:lineDetail.width*minCalibration+'px',left:lineDetail.office*minCalibration+'px'}"></div>
                <div class="label" :style="{color:'#666666'}">{{this.getLabel(data.label)}}</div>
            </Tooltip>
                   
        </div>
        
    </div>
             
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import FlagLabel from '~/components/FlagLabel';
import no from './img/no.png';
import ok from './img/ok.png';
import yeas from './img/yeas.png';
export default {
    name:'Article',
    components:{
        FlagLabel,
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
        },
        index:{
            type:[Number,String]
        },
        todayDetail:{
            type:Object
        }
    },
    data(){
        return {
            boxDetail:{},
            planDetail:{},
            actualDetail:{} ,    
            leftEndpoint:this.startDate, 
            secondObj:{},
            childLeftEndpoint:{},
            
            picColor:'',
            lineDetail:{}
        }
    },
    mounted(){
        if(!this.data.chartType){
            this.getBoxWidthAndOffice();
        }
       
    },
    methods:{
        getColor(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var nowTime = (new Date(today+' 00:00:00')).getTime();
            if(this.data.data.planEndTime<this.data.data.actualStartTime || 
                this.data.data.actualEnd<this.data.data.planStartTime){
                return 'transparent';
            }else {
                if(this.data.data.progressStatus === '' && this.planEndTime<nowTime){
                    return '#BE8525'
                }else if(this.data.data.progressStatus<0){
                    return '#666666'
                }else if(this.data.data.progressStatus>=0){
                    return '#5A8C23'
                }
            }
        },
        getActualColor(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var nowTime = (new Date(today+' 00:00:00')).getTime();
           
            if(this.data.data.planEndTime<this.data.data.actualStartTime || 
                this.data.data.actualEnd<this.data.data.planStartTime){
                if(this.data.data.progressStatus === '' &&  this.planEndTime<nowTime){
                    return '#BE8525'
                }else if(this.data.data.progressStatus<0){
                    return '#666666'
                }else if(this.data.data.progressStatus>=0){
                    return '#5A8C23'
                }
                
            }
        },
        getLabel(label){
            if(this.data.data.planEndTime<this.data.data.actualStartTime || 
                this.data.data.actualEndTime<this.data.data.planStartTime){
                    return '';
            }else {
                return label;
            }
        },
        getActualLabel(label){
            if(this.data.data.planEndTime<this.data.data.actualStartTime || 
                this.data.data.actualEndTime<this.data.data.planStartTime){
                    return label;
            }else {
                return '';
            }
        },
        lineShow(){
            if(this.data.data.planEndTime<this.data.data.actualStartTime || 
                this.data.data.actualEndTime<this.data.data.planStartTime){
                return true;
            }else {
                return false;
            }
        },
        getFlagShow(event){
            if(this.data.data){
                return this.data.data.taskType == event
            }else{
                var type = 'STAGETASK';
                return type == event;
            }

        },
       getActualBgColor(){
            if(this.data.data.progressStatus==''){
                return "#fff";
            }
            if(this.data.data.progressStatus<0){
                
                return '#F69C9C'
            }else if(this.data.data.progressStatus>=0){
                // this.picColor=yeas;
                return '#C2E998'
            }
       },
       getPlanBgColor(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var nowTime = (new Date(today+' 00:00:00')).getTime();
          
            if(!this.data.data.actualEndTime&&this.data.data.planStartTime<nowTime ){
                return '#FFE9AF';
            }else{
                return '#E9F0F6';
            }
       },
       getBoxWidthAndOffice(){
            var dates = this.getEndpointDate();
            var boxDetail={};
            var planStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.data.planStartTime));
            var planEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.data.planEndTime));
            var actualStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.data.actualStartTime));
            var actualEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+this.data.data.actualEndTime));
            var max = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.max));
            var min = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            var officeStart = this.leftEndpoint.year+"-"+this.leftEndpoint.month+"-"+1;
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
            var lineOffice = 0;
            var lineWidth = 0;
            if(this.data.data.planEndTime<this.data.data.actualStartTime){
                lineOffice = this.planDetail.width+this.planDetail.office;
                lineWidth = this.actualDetail.office - this.planDetail.office-this.planDetail.width;
            }
            if(this.data.data.actualEndTime<this.data.data.planStartTime){
                lineOffice = this.actualDetail.width+this.actualDetail.office;
                lineWidth = this.planDetail.office - this.actualDetail.office-this.actualDetail.width;
            }
            if(!this.data.data.actualEndTime || !this.data.data.actualStartTime){
                lineOffice = this.planDetail.office;
                lineWidth = this.planDetail.width;
            }
            this.lineDetail = {
                width:lineWidth,
                office:lineOffice
            }
            
       },
       getEndpointDate(){
            var arr = [];
             if(this.data.data.actualStartTime && this.data.data.actualEndTime){
                arr.push(this.data.data.actualStartTime)
                arr.push(this.data.data.actualEndTime)
            }
           
            if(this.data.data.planStartTime && this.data.data.planEndTime){
                arr.push(this.data.data.planStartTime)
                arr.push(this.data.data.planEndTime)
            }
        
            var max = arr[0],min=arr[0];
           
            for (var i = 1; i < arr.length; i++) {
                if(max<arr[i])
                    max =  arr[i];
                if(min>arr[i])
                    min = arr[i];
            }
            var minStr = dateUtils.dateToStr("YYYY-MM-DD",new Date(+min));
            var minStr = minStr.split('-')
            this.childLeftEndpoint={
                year:minStr[0],
                month:minStr[1],
                dayNum:minStr[2] 
            }
            console

            return {
                min:+min,
                max:+max
            }

       }
    }
}
</script>

<style lang="less">
.every-view-col{
    height: 32px;
    position: relative;
    border-bottom: 1px solid #F1F1F1;
    .tag{
        width: 50px;
        position: absolute;
        background: #E0C4F0;
        top: 0px;
        left: 0px;
        height: 100%;
        opacity: .1;
    }   
    .ivu-tooltip{
        height: 30px;
    }
    .ivu-tooltip-popper{
        .ivu-tooltip-arrow{
            display:none;
        }
    }

    &:last-child{
        margin-top:0px;
        border-top:none;
    }
    .ivu-poptip-rel{
            background: transparent;
    }
    .article{
        position: relative;
        background: transparent;
        height: 28px;
        .line{
            border-bottom:1px dashed #E9F0F6;
            position: relative;
            top: 2px;
        }
        .label{
            position: absolute;
            height: 28px;
            line-height: 28px;
            padding-left: 10px;
            top: -12px;
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            background: transparent;
        }
        .plan{
            height: 28px;
            background: #E9F0F6;
            border-radius: 7px 7px 8px 8px;
            line-height: 30px;
            padding-left:10px;
            color: #666666;
            position: absolute;
            cursor: pointer;
            top: -11px;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .actual{
            height: 28px;
            
            border-radius: 7px 7px 8px 8px;
            line-height: 30px;
            padding-left:10px;
            color: #fff;
            position: absolute;
            cursor: pointer;
            opacity: 0.5;
            top: -11px;
            overflow: hidden;
            text-overflow:ellipsis;
        }
    }
}

</style>