<template>
    <div class="edit-task">
        <Form ref="formItem" :model="formItem"  :rules="ruleValidate" label-position="top" style="margin-top:25px;max-height:556px;">
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                <div slot="content" class="time-box plan-time" > 
                     
                        <Form-item label="开始日" class="bill-search" prop="planStartTime">
                            <DatePicker 
                                v-model="formItem.planStartTime"
                                type="date" 
                                placeholder="开始日期" 
                                style="width: 245px"
                                @on-change="planStartChange"
                            />
                            <span class="u-date-txt" ></span>
                        </Form-item>
                     
                   
                        <Form-item label="结束日"  prop="planEndTime" style="display:inline-block;">
                            <DatePicker 
                                v-model="formItem.planEndTime"
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
                                    v-model="formItem.actualStartTime"
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
                                    v-model="formItem.actualEndTime"
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
                        {{!formItem.focus?'否':'是'}}
                    </LabelText>
                    <LabelText label="责任部门" >
                        {{getEdit.department}}
                    </LabelText>
                    <div>
                        <LabelText label="上游任务" >
                            {{!formItem.downstream?'-':formItem.downstream}}
                        </LabelText>
                    </div>
                    <div>
                        <LabelText label="下游任务" >
                           {{!formItem.upstream?'-':formItem.upstream}}
                        </LabelText>
                    </div>
                    <LabelText label="描述" >
                        {{!formItem.descr?'-':formItem.descr}}
                    </LabelText>
                </div>
                
            </ClassificationBox>
            <ClassificationBox value="4" title="基本信息" :isBorder="false" type="num">
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
            formItem:{
                name:this.getEdit.name?this.getEdit.name:'',
                planStartTime:this.getEdit.planStartTime?this.getEdit.planStartTime:'',
                planEndTime:this.getEdit.planEndTime?this.getEdit.planEndTime:'',
                actualStartTime:this.getEdit.actualStartTime?this.getEdit.actualStartTime:'',
                actualEndTime:this.getEdit.actualEndTime?this.getEdit.actualEndTime:'',
                descr:this.getEdit.descr?this.getEdit.descr:'',
                operDescr:this.getEdit.operDescr?this.getEdit.operDescr:'',
                focus:this.getEdit.focus
            },
            ruleValidate: {
                name: [
                    {  message: '请输入任务名称且最多20个字符', trigger: 'change',max:20 }
                ],
                planStartTime:[
                    { type: 'date', message: '请输入开始日期', trigger: 'change' }
                ],
                planEndTime:[
                    {  type: 'date',message: '请输入结束日期', trigger: 'change' }
                ],
                focus:[
                    {  message: '请选择是否关注', trigger: 'change' }
                ]
            },

            actualStart:this.getEdit.actualStartTime,
            actualEnd:this.getEdit.actualEndTime,
            planStart:this.getEdit.planStartTime,
            planEnd:this.getEdit.planEndTime
        }
    },
    created(){    
        this.queryData=this.$route.query; 
    },
    updated:function(){
        this.$emit('bindData',this.formItem,this.dateError,this.cDateError);
    },
    methods:{
        nameChange(event){
            this.formItem.name=event.target.value.trim();
            if(!this.formItem.name){
                return ;
            }
            let params={
                name:event.target.value,
                propertyId:this.queryData.id,
                id:this.id
            }
            this.$http.get('project-name-check',params).then((response)=>{
                    this.formItem.error=false;
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                    });
                    this.formItem.error=true;
                 })
        },
        selectTodayStart(){
            this.formItem.actualStartTime = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            this.actualStartChange( this.formItem.actualStartTime)
        },
        selectTodayEnd(){
            this.formItem.actualEndTime = dateUtils.dateToStr("YYYY-MM-DD",new Date());  
             this.actualEndChange( this.formItem.actualEndTime)
        },
        planStartChange(params){
            this.planStart=params;
            if(this.planStart&&this.planEnd&&this.planStart>this.planEnd){
                this.dateError=true;
            }else{
                this.dateError=false;
            }
        },
        planEndChange(params){
            this.planEnd=params;
            if(this.planStart&&this.planEnd&&this.planStart>this.planEnd){
                this.dateError=true;
            }else{
                this.dateError=false;
            }
        },
        actualStartChange(params){
            this.actualStart=params;
            if((this.actualStart&&this.actualEnd&&this.actualStart>this.actualEnd)||this.actualEnd&&!this.actualStart){
                this.cDateError=true;
            }else{
                this.cDateError=false;
            }
        },
        actualEndChange(params){
            this.actualEnd=params;
            if((this.actualStart&&this.actualEnd&&this.actualStart>this.actualEnd)||this.actualEnd&&!this.actualStart){
                this.cDateError=true;
            }else{
                this.cDateError=false;
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
        .ui-label{
            width: 100px;
            text-align: left;
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
                padding:0px 10px;
                width: 330px;
                background: #F6F6F6;
                margin-top: 10px;
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                color: #666;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                border-radius: 4px;
            }
        }
    }
}

</style>  