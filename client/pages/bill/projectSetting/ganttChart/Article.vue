
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
                :id = "articleId"
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
                <div 
                    class="label"
                    :style="{width:boxDetail.width * minCalibration+'px'}"
                > {{data.label}} </div>
               
                    
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
import ChildArticle from './ChildArticle'
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
           articleId:'article'+this.data.t_id,
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
       changePoptip(flag){
           var articleDom = document.getElementById(this.articleId);
           var popDom = articleDom.querySelectorAll('.ivu-poptip-popper')[0];
           if(!flag){
               popDom.style.opacity=0;
           }else{
               popDom.style.opacity=1;
           }    
       },
       //获取二级部分数据
       getSpecificData(event){
           this.changePoptip(false);
           this.$http.get('parent-search-kid',{pid:this.data.value}).then((response)=>{
                this.secondObj.tasks=response.data.items;
                if(!response.data.items||response.data.items.length == 0){
                    this.isChild = false;
                    this.changePoptip(false)
                }else {
                     this.isChild = true;
                     this.changePoptip(true);
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
    
    border-bottom: 1px solid #E1E6EB;
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