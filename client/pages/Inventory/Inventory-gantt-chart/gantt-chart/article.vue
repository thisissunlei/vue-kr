<template>
    <div class="every-view-col"
        :style="{
            background:this.getBackground()
        }"
        @mouseenter="((event)=>{
            this.toolOver(event,'2')
        })"
        @mouseleave="((event)=>{
            this.toolOut(event,'2')
        })"
    >
       
        <div class="article"
        >
            <div
                class="plan"
                :style="{
                    background:this.getLabelColor(),
                    width:planDetail.width * minCalibration + 'px',
                    left:planDetail.office * minCalibration + 'px',
                    color:'#666666'
                }"
                @mouseenter="((event)=>{
                    this.toolOver(event,data.status)
                })"
                @mouseleave="((event)=>{
                    this.toolOut(event,data.status)
                })"
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
        },
        start:{
            type:String,
        },
        end:{
            type:String
        },
        sideBar:{
            type:Boolean
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
        }
    },
    methods:{
        getBackground(){
            var status=this.data.status;
            if(status=='DISABLE'){
                return '#bfc4cf';
            }else if(status=='AVAILABLE'&&!this.data.startDate&&!this.data.endDate){
                return '#BCE590';
            }else if(status=='OFF'&&!this.data.startDate&&!this.data.endDate){
                return '#E4E4E4';
            }
        },
        toolOver(event,param){
            event.cancelBubble = true;
            var time={
                startTime:this.start,
                endTime:this.end
            }
            publicFn.poptipOver(event,this.data,param,time,this.sideBar)
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

            if(!data.startDate&&!data.endDate){
                return ;
            }  
            var boxDetail={};
            var planStart = data.startDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.startDate)):this.start;
            var planEnd = data.endDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(+data.endDate)):this.end;
            var officeStart = this.leftEndpoint.year+"-"+this.leftEndpoint.month+"-"+this.leftEndpoint.start;
            
            this.planDetail={
                width:utils.dateDiff(planStart,planEnd)+1,
                office:utils.dateDiff(officeStart,planStart)
            };

       },

    }
}
</script>

<style lang="less">
.every-view-col{
    height: 32px;
    position: absolute;
    top: 11px;
    width: 100%;
    left: 0px;
    //border-bottom: 1px solid #F1F1F1;
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
        //top: -1px;
        top:0;
        width: 100%;
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
            top: 0px;
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
