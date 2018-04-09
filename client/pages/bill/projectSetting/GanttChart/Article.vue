
<template>
    <div class="every-view-col" :data-chart="data.t_id" 
        :style="{
            width:boxDetail.width * minCalibration+'px',
            left:boxDetail.office * minCalibration+'px',
            
        }"
    
    >
        <!-- <div class="tag" :style="{width: todayDetail.width+ 'px',left:todayDetail.left+'px'}"></div> -->
        <div class="article" 
            v-if="getFlagShow('STAGETASK')"
          
        >
            
                
            <div 
                class="plan"
                :style="{
                    background:getPlanBgColor(),
                    width:planDetail.width * minCalibration + 'px',
                    left:planDetail.office * minCalibration + 'px',
                    color:getPlanColor()
                }"
                @mouseover="toolOver"
                @mouseout="toolOut"
            >
            {{getActualLabel(data.label)}}
            </div>

            <div 
                v-if="data.data.actualStartTime && data.data.actualEndTime"
                class="actual"
                :style="{
                    width:actualDetail.width * minCalibration+'px',
                    left:actualDetail.office * minCalibration + 'px',
                    background:getActualBgColor(),
                    color:getActualColor()
                }"
                @mouseover="toolOver"
                @mouseout="toolOut"
            >  
            {{getActualLabel(data.label)}}
            </div>
            <div v-if="lineShow()" class="line" :style="{width:lineDetail.width*minCalibration+'px',left:lineDetail.office*minCalibration+'px'}"></div>
            <div 
                class="label" 
                :style="{color:getLabelColor(),width:boxDetail.width*minCalibration+'px'}"
                @mouseover="toolOver"
                @mouseout="toolOut"
            >
                {{this.getLabel(data.label)}}
            </div>
        
                   
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
        toolOver(event){
            // return ;
            var e = event || window.event;
            var dom = event.target;
            var detail = dom.getBoundingClientRect();
            var tirDom = document.getElementById('gantt-chart-tool-tip');
            tirDom.style.display = "inline-block";
            var tirLocation = {
                left:e.clientX,
                top:(e.clientY<detail.top?e.clientY:detail.top)+detail.height
            }
            var obj  = this.getToolTipContent();
            tirDom.innerHTML = obj.str;
            tirDom.style.left = tirLocation.left-30 + 'px';
            tirDom.style.top  = tirLocation.top +5 - 130 + 'px';
            tirDom.style.width = obj.width + 'px';
        },
        getToolTipContent(){

            var str  = '<div class="title">'+this.data.label+'</div>';
            var data = Object.assign({},this.data.data);
            var width = 150;
            if(data.planEndTime && data.planStartTime){
                var type ='MM/DD';

                var startYear = (new Date(data.planStartTime)).getFullYear();
                var endYear = (new Date(data.planEndTime)).getFullYear();
                if(startYear !== endYear){
                    type = 'YYYY/MM/DD';
                    width=215;
                }
                
                var startDay = data.planStartTime?dateUtils.dateToStr(type,new Date(data.planStartTime)):'';
                var endDay = data.planEndTime?dateUtils.dateToStr(type,new Date(data.planEndTime)):'';
                str += '<div class="content">'+'计划周期：'+startDay+' - '+endDay+'</div>'
                
            }
            if(data.actualStartTime || data.actualEndTime){
                var type ='MM/DD';
                var startYear = (new Date(data.actualStartTime)).getFullYear();
                var endYear = (new Date(data.actualEndTime)).getFullYear();
                if(startYear !== endYear){
                    type = 'YYYY/MM/DD';
                    width=width>155?width:220;
                }
                var startDay = data.actualStartTime?dateUtils.dateToStr(type,new Date(data.actualStartTime)):'';
                var endDay = data.actualEndTime?dateUtils.dateToStr(type,new Date(data.actualEndTime)):'';
                
                str += '<div class="content" >'+'完成周期：'+startDay+' - '+endDay+'</div>'
            }
            return {
                str:str,
                width:width

            };
        },
        toolOut(event){
            var tirDom = document.getElementById('gantt-chart-tool-tip');
            tirDom.style.display = "none";
        },
        getLabelColor(){
            var planColor = this.getPlanBgColor();
            var actualColor = this.getActualBgColor();
            if(planColor == '#FFE9AF'){
                return '#BE8525';
            }else if(actualColor=='rgba(194,233,152,0.6)'){
                return '#5A8C23';
            }else {
                return '#666666';
            }
        },
        getPlanColor(){
            var bgColor = this.getPlanBgColor();
            if(bgColor=='#EEEEEE'){
                return '#666666';
            }else {
                return '#BE8525';
            }
            
        },
       
        getActualColor(){
            var bgColor = this.getActualBgColor();
            if(bgColor == 'rgba(246,156,156,0.5)'){
                return '#666666';
            }else {
                return '#5A8C23'
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
            
            if(this.data.data.progressStatus<0){ 
                return 'rgba(246,156,156,0.5)';
            }else if(this.data.data.progressStatus>=0){
               
                return 'rgba(194,233,152,0.6)'
            }
       },
       getPlanBgColor(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var nowTime = (new Date(today+' 00:00:00')).getTime();
          
            if(!this.data.data.actualEndTime&&this.data.data.planStartTime<nowTime ){
                return '#FFE9AF';
            }else{
                return '#EEEEEE';
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
            var officeStart = this.leftEndpoint.year+"-"+this.leftEndpoint.month+"-"+this.leftEndpoint.start;
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
            //  console.log(officeStart,min,"pppp",this.planDetail)
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
            // console.log(this.boxDetail,"oooooooo",this.startDat,this.minCalibration);
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
    position: absolute;
    top: 0px;
    width: 100%;
    left: 0px;
   
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
        .every-view-col{
            top:0px;
        }
    }
    .ivu-poptip-rel{
            background: transparent;
    }
    .article{
        position: relative;
        background: transparent;
        height: 30px;
        top: -1px;
        width: 100%;
        .line{
            border-bottom:1px dashed #E9F0F6;
            position: relative;
            top: 2px;
            
            
        }
        .label{
            position: absolute;
            height: 29px;
            line-height: 30px;
            padding-left: 6px;
            
            overflow: hidden;
            width: 100%;
           overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            background: transparent;
            font-weight:bold;
            top: 2px;
            cursor: pointer;
        }
        .plan{
            height: 29px;
            background: #E9F0F6;
            border-radius: 7px 7px 8px 8px;
            line-height: 30px;
            padding-left:6px;
            color: #666666;
            position: absolute;
            cursor: pointer;
            top: 2px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;  
            font-weight:bold;
        }
        .actual{
            height: 29px;
            border-radius: 7px 7px 8px 8px;
            line-height: 30px;
            padding-left:6px;
            color: #fff;
            position: absolute;
            cursor: pointer;
            top: 2px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;  
            font-weight:bold;
        }
    }
}

</style>