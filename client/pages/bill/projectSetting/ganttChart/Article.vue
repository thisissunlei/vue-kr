
<template>
    <div>
         
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
                        background:getBgColor(),
                        width:boxDetail.width * minCalibration+'px',
                        left:boxDetail.office * minCalibration+'px'
                    }"
                >
                <Poptip v-if="type!='edit'" placement="bottom-start" :width="planDetail.width * minCalibration+40" @on-popper-show="getSpecificData" @on-popper-hide="cildHide">
                    
                    <div 
                        class="plan"
                        :style="{
                            width:planDetail.width * minCalibration + 'px',
                            left:planDetail.office * minCalibration + 'px'
                        }"
                        v-if="!data.chartType && data.data.planStartTime && data.data.planEndTime"
                    >
                        <span  v-if="type == 'edit'">{{data.label}}</span>
                            <Tooltip :content="data.label" placement="right">
                                <div class="label" :style="{width:planDetail.width * minCalibration -20 + 'px'}">{{data.label}}</div>
                            </Tooltip>
                        
                           
                        
                    </div>
                


                    <div 
                        class="actual"
                        :style="{
                            width:actualDetail.width * minCalibration+'px',
                            left:actualDetail.office * minCalibration + 'px'
                        }"
                        v-if="!data.chartType && data.data.actualStartTime && data.data.actualEndTime"
                    >
                        <span  v-if="type == 'edit'">{{data.label}}</span>
                            <Tooltip :content="data.label" placement="right">
                                <div class="label" :style="{width:planDetail.width * minCalibration -20 + 'px'}">
                                    {{data.label}}
                                </div>
                            
                            </Tooltip>
                            
                    </div>
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
             
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SpecificPlan from './SpecificPlan'
import FlagLabel from '~/components/FlagLabel';
import ViewArticle from './ViewArticle';
import ChildArticle from './ChildArticle'
export default {
    name:'Article',
    components:{
        SpecificPlan,
        FlagLabel,
        ViewArticle,
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
            default:'view'
        }
    },
    data(){
        return {
            boxDetail:{},
            planDetail:{},
            actualDetail:{} ,    
            leftEndpoint:this.startDate, 
            secondObj:{},
            isChild:false,  
            childLeftEndpoint:{},
           
        }
    },
    mounted(){
        if(!this.data.chartType){
            this.getBoxWidthAndOffice();
        }
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
                return "#fff";
            }
            if(this.data.data.currentStatus<0){
                return "#FFCDCD"
            }else if(this.data.data.currentStatus>0){
                return '#FFECD4';
            }else{
                return "#E0F2CD"
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
                this.isChild = true;
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
    height: 70px;
    border-top: 1px solid #E1E6EB;;
    border-bottom: 1px solid #E1E6EB;
  }
.article{
    position: relative;
    padding: 8px 0px;
    .label{
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
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
        .tip-label{
            display:inline-block;
            .ivu-tooltip-popper{
                .ivu-tooltip-arrow{
                    display:none;
                }
            }
        }
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