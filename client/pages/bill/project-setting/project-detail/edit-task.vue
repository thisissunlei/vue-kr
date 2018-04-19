<template>
    <div class="edit-task">
        <Form  :model="params"   label-position="top" style="margin-top:25px;max-height:556px;">
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                <div slot="content" class="time-box plan-time" > 
                    <Form-item label="开始日" class="bill-search" prop="planStartTime">
                        <DatePicker 
                            v-model="params.planStartTime"
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 245px"
                            @on-change="planStartChange"
                        />
                        <span class="u-date-txt" ></span>
                    </Form-item>
                    
                    <Form-item label="结束日"  prop="planEndTime" style="display:inline-block;">
                        <DatePicker 
                            v-model="params.planEndTime"
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 245px"
                            @on-change="planEndChange"
                        /> 
                    </Form-item>
                    <div  style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
                </div>
            </ClassificationBox>
            <ClassificationBox value="2" title="执行情况" :isBorder="true" type="num">
                <div slot="content" > 
                    <div class="time-box actual-time" >
                        <Tooltip placement="top">
                            <Form-item label="开始日" class="bill-search">
                                <DatePicker 
                                    v-model="params.actualStartTime"
                                    type="date" 
                                    placeholder="开始日期" 
                                    style="width: 245px"
                                    @on-change="actualStartChange"
                                />
                                <span class="u-date-txt"></span>
                            </Form-item>
                            <div 
                                slot="content" 
                                class="actual-select-today" 
                                @click="selectTodayStart"
                            >
                                今天开始的？
                            </div>
                        </Tooltip>
                        <Tooltip placement="top">
                            <Form-item label="结束日"  prop="actualEndTime" style="display:inline-block;">
                                <DatePicker 
                                    v-model="params.actualEndTime"
                                    type="date" 
                                    placeholder="结束日期" 
                                    style="width: 245px"
                                    @on-change="actualEndChange"
                                /> 
                            </Form-item>
                            <div 
                                slot="content" 
                                class="actual-select-today"
                                @click="selectTodayEnd"
                            >今天完成的</div>
                        </Tooltip>   
                        <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期且不能只有结束日期</div> 
                    </div>

                    <div class="time-box" style="margin-top:10px;display:inline-block;line-height:20px;">
                        <div>需要填写档案10项，尚未完成3箱，<span style="color:#499DF1;">去填写&nbsp;>></span></div>
                    </div>
                </div>
            </ClassificationBox>
            
            <ClassificationBox value="3" title="基本信息" :isBorder="true" type="num">
                <div slot="content"> 

                    <LabelText label="管理层关注" >
                        {{!params.focus?'否':'是'}}
                    </LabelText>
                    <LabelText label="责任部门" >
                        {{getEdit.department}}
                    </LabelText>
                   
                    <div>
                        <LabelText label="上游任务" >
                           {{!params.upstream?'-':params.upstream}}
                        </LabelText>
                    </div>
                     <div>
                        <LabelText label="下游任务" >
                            {{!params.downstream?'-':params.downstream}}
                        </LabelText>
                    </div>
                    <LabelText label="描述" >
                        {{!params.descr?'-':params.descr}}
                    </LabelText>
                </div>
                
            </ClassificationBox>
            <ClassificationBox value="4" title="编辑记录" :isBorder="false" type="num">
                <div class="edit-record" slot="content">
                    <div
                        class='record-wrap'
                        v-for="item in getEdit.operLogs" 
                        :key="item.id"
                    >
                        <div class='first'>{{item.uTime|dateFormat('YYYY-MM-dd HH:mm')}}</div>
                        <div style="display:inline-block;">
                            <div class='second'>
                                <span style="font-weight:bold; ">{{item.updatorName}}&nbsp;</span>
                                <span >{{item.comment}}</span>
                            </div>
                            <div class='third' v-if="item.descr">
                                {{item.descr}}
                            </div>
                        </div>
                    </div>
                </div>
            </ClassificationBox>                
        </Form>
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
import ClassificationBox from '~/components/ClassificationBox'
import LabelText from '~/components/LabelText'

import Vue from 'vue';
export default {
    components:{
        ClassificationBox,
        LabelText
    },
    props:{
        id:{
            type:[Number,String]
        },
        getEdit:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            dateError:false,
            cDateError:false,
            params:this.getFormItem(),
            actualStart:this.getEdit.actualStartTime,
            actualEnd:this.getEdit.actualEndTime,
            planStart:this.getEdit.planStartTime,
            planEnd:this.getEdit.planEndTime
        }
    },
    created(){    
        // this.queryData=this.$route.query; 
    },
    mounted(){
      
         
    },
   
    methods:{
        getFormItem(){
          
            return Object.assign({},this.getEdit)
        },
        selectTodayStart(){
           
            this.params.actualStartTime = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            this.actualStartChange( this.params.actualStartTime)
        },
        selectTodayEnd(){
        
            this.params.actualEndTime = dateUtils.dateToStr("YYYY-MM-DD",new Date());  
            this.actualEndChange( this.params.actualEndTime)
        },
        planStartChange(params){
        
            this.planStart=params;
            if(this.planStart&&this.planEnd&&this.planStart>this.planEnd){
                this.dateError=true;
            }else{
                this.dateError=false;
                this.params.planStartTime = params;
                var data = Object.assign({},this.params);
               
                this.$emit('dataChange',data)
            }
        },
        planEndChange(params){
            this.planEnd=params;
            if(this.planStart&&this.planEnd&&this.planStart>this.planEnd){
                this.dateError=true;
            }else{
                this.dateError=false;
                this.params.planEndTime = params;
                var data = Object.assign({},this.params);
                
                this.$emit('dataChange',data)
            }
        },
        actualStartChange(params){
          
            this.actualStart=params;
            if((this.actualStart&&this.actualEnd&&this.actualStart>this.actualEnd)||this.actualEnd&&!this.actualStart){
                this.cDateError=true;
            }else{
                this.cDateError=false;
                this.params.actualStartTime = params;
                var data = Object.assign({},this.params);
                this.$emit('dataChange',data)
            }
        },
        actualEndChange(params){
            
            this.actualEnd=params;
            if((this.actualStart&&this.actualEnd&&this.actualStart>this.actualEnd)||this.actualEnd&&!this.actualStart){
                this.cDateError=true;
            }else{

                this.cDateError=false;
                this.params.actualEndTime = params;
                var data = Object.assign({},this.params);
                this.$emit('dataChange',data)
            }
        }
    }
}

</script>

<style lang='less'>
.edit-task{
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
    }
    .dep-class{
        .ivu-form-item-content{
            line-height:34px;
        }
    }
    .ui-labeltext{
        display: block;
        height: auto;
        width: auto;
        .ui-label{
            width: 100px;
            text-align: left;
            float: left;
           
        }
        .ui-text{
            width: 450px;
            vertical-align: top;
            line-height: 1.5;
        }
    }
    
    .ivu-form-item{
        margin-bottom: 0px;
    }
    .time-box{
        background:#F6F6F6;
        padding:10px;
        border-radius:4px; 
    }
    .actual-select-today{
        cursor: pointer;
    }
    //时间样式修改
    .ivu-date-picker-rel{
        input{
            font-weight: bold;
            font-size: 16px;
        }
    }
    .actual-time{
        .ivu-tooltip, .ivu-tooltip .ivu-tooltip-rel{
             width: auto;
        }
       .ivu-date-picker-rel{

            input{
                color: #999999;
                font-size: 14px;
            }
        } 
    }
    .pop-position{
        .ivu-poptip-popper{
            .ivu-poptip-arrow{
            border-top-color: rgba(0,0,0,0.7);
            }
            .ivu-poptip-arrow:after{
                border-top-color: rgba(0,0,0,0.1);
            }
            .ivu-poptip-inner{
                background-color: rgba(0,0,0,0.7);
            }
            .ivu-poptip-body-content-inner{
                color:#fff;
            }
        }
        .single-radio-ok{
            display:inline-block;
            margin-right:40px;
        }
        .single-radio-no{
            display:inline-block;
        }
    }
    .bill-search{
        display:inline-block;
        // padding-left:32px;
        .u-date-txt{
            padding:0 20px;
            font-size: 14px;
            color: #666;
        }
    }
    .edit-record{
        padding:10px;
        margin-left: 12px;
        width:600px;
        display:inline-block;
        border-radius: 4px;
        box-sizing: border-box;
        .record-wrap{
            width: 540px;
            padding-bottom:15px;
            border-bottom:1px solid #EFEFEF;
            .first{
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
                display:inline-block;
                padding-right:30px;
                vertical-align: top;
            }
            .second{
                display:inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
            }
            .third{
                padding:5px 10px;
                width: 330px;
                background: #F6F6F6;
              
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                color: #666;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                border-radius: 4px;
                line-height: 18px;
            }
        }
    }
}

</style>  