<template>
    <div class="every-view-col"
        :style="{
            width:boxDetail.width * minCalibration+'px',
            left:boxDetail.office * minCalibration+'px',
            background:data.status=='DISABLE'?'#E4E4E4':'#BCE590'
        }"
        @mouseover="toolOver"
        @mouseout="toolOut"
    >
        <!-- <div class="tag" :style="{width: todayDetail.width+ 'px',left:todayDetail.left+'px'}"></div> -->
        <div class="article"
            v-if="getFlagShow('STAGETASK')"
        >
            <div
                class="plan"
                :style="{
                    background:this.getLabelColor(),
                    width:planDetail.width * minCalibration + 'px',
                    left:planDetail.office * minCalibration + 'px',
                    color:'#666666'
                }"
                @mouseover="toolOver"
                @mouseout="toolOut"
                @click="editClick(data.value)"
            >
               
            </div>
           
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import publicFn from '../publicFn'
export default {
    name:'Article',
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
        type:{
            type:String,
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
            picColor:'',
            lineDetail:{}
        }
    },
    mounted(){
        this.getBoxWidthAndOffice();
    },
    watch:{
        startDate:{
            handler:function(){
                this.leftEndpoint = this.startDate;
                this.getBoxWidthAndOffice();
            }
        },
    },
    methods:{
        toolOver(event){
            publicFn.poptipOver(event,this.data)
        },
        toolOut(event){
            var tirDom = document.getElementById('gantt-chart-tool-tip');
            var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
            tirDom.style.opacity = 0;
            angleDom.style.opacity = 0;
        },
        getLabelColor(){
            let taskStatus = this.data.status;
            return publicFn.getLabelColor(taskStatus);
        },
        
       getBoxWidthAndOffice(){
            var  data = Object.assign({},this.data);
            if(!data.actualStartTime && !data.actualEndTime){
                data.actualStartTime = data.planStartTime;
                data.actualEndTime = data.planEndTime; 
            }      
            var dates = publicFn.getAllMaxAndMin(data);
            var boxDetail={};
            var planStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.startDate));
            var planEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.endDate));
            var actualStart = dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.actualStartTime));
            var actualEnd = dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.actualEndTime));
            var max = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.max));
            var min = dateUtils.dateToStr("YYYY-MM-DD",new Date(dates.min));
            var officeStart = this.leftEndpoint.year+"-"+this.leftEndpoint.month+"-"+this.leftEndpoint.start;
            var officeEnd = min;

            this.boxDetail={
                width:utils.dateDiff(startDate,endDate)+1,
                office:utils.dateDiff(officeStart,startDate)
            }
            this.planDetail={
                width:utils.dateDiff(planStart,planEnd)+1,
                office:utils.dateDiff(officeStart,planStart)
            };
            this.actualDetail={
                width:utils.dateDiff(actualStart,actualEnd)+1,
                office:utils.dateDiff(min,actualStart)
            }
            //  console.log(officeStart,min,"pppp",this.planDetail)
            var lineOffice = 0;
            var lineWidth = 0;
            if(data.planEndTime<data.actualStartTime){
                lineOffice = this.planDetail.width+this.planDetail.office;
                lineWidth = this.actualDetail.office - this.planDetail.office-this.planDetail.width;
            }
            if(data.actualEndTime<data.planStartTime){
                lineOffice = this.actualDetail.width+this.actualDetail.office;
                lineWidth = this.planDetail.office - this.actualDetail.office-this.actualDetail.width;
            }
            if(!data.actualEndTime || !data.actualStartTime){
                lineOffice = this.planDetail.office;
                lineWidth = this.planDetail.width;
            }
            this.lineDetail = {
                width:lineWidth,
                office:lineOffice
            }

       },

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
        cursor: pointer;
        .line{
            border-bottom:1px dashed #E9F0F6;
            position: relative;
            top: 19px;
            z-index: 1;


        }
        .label{
            position: absolute;
            height: 29px;
            line-height: 30px;
            padding-left: 6px;
            z-index: 3;
            overflow: hidden;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            background: transparent;
            font-weight:bold;
            top: 2px;

        }
        .plan{
            height: 32px;
            //background: #E9F0F6;
            //border-radius: 7px 7px 8px 8px;
            line-height: 32px;
            padding-left:6px;
            color: #666666;
            position: absolute;
            cursor: pointer;
            top: 1px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-weight:bold;
            z-index: 2;
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
            z-index: 2;
        }
    }
}

</style>
