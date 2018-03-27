
<template>
    <div class="every-view-col" :data-chart="data.t_id" >
        
        <FlagLabel v-if="getFlagShow('MEETING')" 
            :label="data.label" 
            :data="data.data" 
            :minCalibration="minCalibration" 
            :startDate="leftEndpoint"
        />
        
        <div class="article" 
            v-if="getFlagShow('STAGETASK')"
            :style="{
                width:boxDetail.width * minCalibration+'px',
                left:boxDetail.office * minCalibration+'px'
            }"
        >
            <Poptip 
                v-if=" type!='edit' && !data.chartType && data.data.planStartTime && data.data.planEndTime" 
                placement="bottom-start" 
                :width="boxDetail.width  * minCalibration + 40" 
                @on-popper-show="getSpecificData" 
                @on-popper-hide="cildHide"
            >
                <Tooltip :content="data.label" :placement="index==0?'bottom-start':'top-start'">
                     <div 
                        class="label"
                        :style="{width:boxDetail.width * minCalibration+'px'}"
                    > 
                        <img :src="picColor" width="21px" height="21px" style="vertical-align: middle;margin-bottom: 3px;"/>
                        <span style="display:inline-block;font-size: 14px;color: #0561B5;padding-left:3px;">{{data.label}}</span> 
                    </div>
            
                    <div 
                        class="plan"
                        :style="{
                            width:planDetail.width * minCalibration + 'px',
                            left:planDetail.office * minCalibration + 'px'
                        }"
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
                    </Tooltip>
                    <div class="api" slot="content">
                        <ChildArticle 
                            v-if="isChild"
                            :data="secondObj"
                            :leftEndpoint="childLeftEndpoint"
                            :minCalibration="minCalibration"
                        /> 
                    </div>
               
            </Poptip>
        </div>
        
    </div>
             
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SpecificPlan from './SpecificPlan'
import FlagLabel from '~/components/FlagLabel';
import ChildArticle from './ChildArticle';
import no from './img/no.png';
import ok from './img/ok.png';
import yeas from './img/yeas.png';
export default {
    name:'Article',
    components:{
        SpecificPlan,
        FlagLabel,
        ChildArticle
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
        }
    },
    data(){
        return {
            boxDetail:{},
            planDetail:{},
            actualDetail:{} ,    
            leftEndpoint:this.startDate, 
            secondObj:{},
            isChild:true,  
            childLeftEndpoint:{},
            
            picColor:''
        }
    },
    mounted(){
        if(!this.data.chartType){
            this.getBoxWidthAndOffice();
        }
        this.getBgColor();
    },
    methods:{
        getFlagShow(event){
            if(this.data.data){
                return this.data.data.taskType == event
            }else{
                var type = 'STAGETASK';
                return type == event;
            }

        },
        cildHide(){
            this.isChild = false;
        },
       getBgColor(){
            if(this.data.chartType || !this.data.data.currentStatus){
                this.picColor="";
            }
            if(this.data.data.currentStatus<0){
                this.picColor=no;
            }else if(this.data.data.currentStatus>0){
                this.picColor=yeas;
            }else{
                this.picColor=ok;
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

       },
       //获取二级部分数据
       getSpecificData(event){
         
            this.$http.get('parent-search-kid',{pid:this.data.value}).then((response)=>{
                this.secondObj.tasks=response.data.items;
                if(!response.data.items||response.data.items.length == 0){
                    this.isChild = false;
                }else {
                    this.isChild = true;
                }

                // this.getChildLeftEndpoint(response.data.items);

            }).catch((error)=>{
                this.$Notice.error({
                title: error.message,
                });
            })
        }
    }
}
</script>

<style lang="less">
 .every-view-col{
    height: 45px;

    //border-bottom: 1px solid #E1E6EB;
   
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
  }
.article{
    position: relative;
     background: transparent;
    
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