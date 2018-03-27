
<template>
    <div class="edit-article">
        <div class="every-col" :data-chart="data.t_id" style="background:#fff; position:relative;"
            @mouseover="overShow(data.t_id)"
            @mouseout="outHide(data.t_id)"
        >
            <div class="tag" :style="{width: todayDetail.width+ 'px',left:todayDetail.left+'px'}"></div>
            <div v-if="!this.data.chartType && isInitial()">
            <FlagLabel v-if="getFlagShow('MEETING')" 
                :label="data.label" 
                :data="data.data" 
                :minCalibration="minCalibration" 
                :startDate="leftEndpoint"
            />
                <div class='col-tool-label'>
                    
                        <div class="article" 
                            v-if="getFlagShow('STAGETASK')"
                            :style="{
                                width:boxDetail.width * minCalibration+'px',
                                left:boxDetail.office * minCalibration+'px'
                            }"
                        >   
                        <Tooltip :content="data.label" :placement="index==0?'bottom-start':'top-start'">

                            <div 
                                class="label"
                                :style="{width:boxDetail.width * minCalibration+'px'}"
                            > 
                                <img v-if="picColor" :src="picColor" width="21px" height="21px" style="vertical-align: middle;"/>
                                <span style="display:inline-block;font-size: 14px;color: #0561B5;padding-left:3px;">{{data.label}}</span> 
                            </div>
                    
                            <div 
                                class="plan"
                                :style="{
                                    width:planDetail.width * minCalibration + 'px',
                                    left:planDetail.office * minCalibration + 'px'
                                }"
                                v-if="!data.chartType && data.data.planStartTime && data.data.planEndTime"
                            ></div>
                            <div 
                                class="actual"
                                :style="{
                                    width:actualDetail.width * minCalibration+'px',
                                    left:actualDetail.office * minCalibration + 'px'
                                }"
                                v-if="!data.chartType && data.data.actualStartTime && data.data.actualEndTime"
                            ></div>
                        </Tooltip> 
                    </div>
                </div>
            </div>
        
        </div>
        <EditArticle 
            v-if="leftEndpoint.year && type== 'edit'"
            :minCalibration="minCalibration"
            :startDate="leftEndpoint"
            :data="item"
            v-for="(item,index) in data.children" 
            :key="item.id"
            :type="type"
            :index="index"
            :todayDetail="todayDetail"
        />
    
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SpecificPlan from './SpecificPlan'
import FlagLabel from '~/components/FlagLabel';
import no from './img/no.png';
import ok from './img/ok.png';
import yeas from './img/yeas.png';
export default {
    name:'EditArticle',
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

            picColor:''
        }
    },
    mounted(){
        if(!this.data.chartType){
            this.getBoxWidthAndOffice();
        }
        setTimeout(() => {
             this.getBgColor();
        },100);
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
                this.picColor="";
                return ;
            }
            if(this.data.data.progressStatus<0){
                this.picColor=no;
            }else if(this.data.data.progressStatus>0){
                this.picColor=yeas;
            }else{
                this.picColor=ok;
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
            var officeStart = this.startDate.year+"-"+this.startDate.month+"-"+1;
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
           
       },
       overShow(id){
            var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-chart="'+id+'"]')[0];
            if(leftDom&&rightDom){
                leftDom.style.background="#F7F9FB";
                rightDom.style.background="#F7F9FB";
            }
        },
        outHide(id){
            var leftDom = document.querySelectorAll('div[data-box-id="'+id+'"]')[0];
            var rightDom= document.querySelectorAll('div[data-chart="'+id+'"]')[0];
            if(leftDom&&rightDom){
                leftDom.style.background="#fff";
                rightDom.style.background="#fff";
            }
        }
    }
}
</script>

<style lang="less">
.edit-article{

     .tag{
        width: 50px;
        position: absolute;
        background: #E0C4F0;
        top: 0px;
        left: 0px;
        height: 100%;
        opacity: .1;
    }

    .col-tool-label{
        .ivu-tooltip-popper{
            .ivu-tooltip-arrow{
                display:none;
            }
        }
    }

     .every-col{
                height: 49px;
                //border-top: 1px solid #E1E6EB;;
                border-bottom: 1px solid #F0F0F0;
            }
.article{
    position: relative;
   
    
    .label{
        width: 100%;
       
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        background: #DEEEFF;
        border-radius: 7px 7px 8px 8px;
        line-height: 30px;
        height: 30px;
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
}
</style>