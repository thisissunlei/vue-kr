<template>
  <div class="edit-task">
      <Form ref="formItem" :model="formItem"  :rules="ruleValidate" label-position="top" style="margin-top:25px;max-height:556px;">
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                <div slot="content"> 
                    <Form-item label="开始日" class="bill-search" prop="planStartTime">
                        <DatePicker 
                            v-model="formItem.planStartTime"
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 252px"
                            @on-change="planStartChange"
                        />
                        <span class="u-date-txt" >至</span>
                    </Form-item>
                    <Form-item label="结束日"  prop="planEndTime" style="display:inline-block;">
                        <DatePicker 
                            v-model="formItem.planEndTime"
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 252px"
                            @on-change="planEndChange"
                        /> 
                    </Form-item>
                    <div  style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
                </div>
            </ClassificationBox>
            <ClassificationBox value="2" title="执行情况" :isBorder="true" type="num">
                <div slot="content"> 
                    <Form-item label="开始日" class="bill-search">
                        <DatePicker 
                            v-model="formItem.actualStartTime"
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 252px"
                            @on-change="actualStartChange"
                        />
                        <span class="u-date-txt">至</span>
                    </Form-item>
                
                    <Form-item label="结束日"  prop="actualEndTime" style="display:inline-block;">
                        <DatePicker 
                            v-model="formItem.actualEndTime"
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 252px"
                            @on-change="actualEndChange"
                        /> 
                    </Form-item>
                    <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期且不能只有结束日期</div> 
                    
                    <div>需要填写档案10项，尚未完成3箱，<span style="color:#499DF1;">去填写</span></div>
                </div>
            </ClassificationBox>
            
            <ClassificationBox value="3" title="基本信息" :isBorder="true" type="num">
                <div slot="content">
                    <LabelText label="任务名称" :inline="true">
                        {{formItem.name}}
                    </LabelText>
                    <LabelText label="管理层关注" :inline="true">
                        {{!formItem.focus?'否':'是'}}
                    </LabelText>
                    <LabelText label="责任部门" :inline="true">
                        {{getEdit.department}}
                    </LabelText>
                    <div>
                        <LabelText label="上游任务" :inline="true">
                            {{!formItem.downstream?'-':formItem.downstream}}
                        </LabelText>
                    </div>
                    <div>
                        <LabelText label="下游任务" :inline="true">
                           {{!formItem.upstream?'-':formItem.upstream}}
                        </LabelText>
                    </div>
                    <LabelText label="描述" :inline="true">
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
                            <div class='first'><span class='circle'></span>{{item.uTime|dateFormat('YYYY-MM-dd HH:mm')}}</div>
                            <div style="display:inline-block;">
                                <div class='second'>
                                    <span style="font-weight:bold; ">{{item.updatorName}}</span>
                                    <span >{{item.comment}}</span>
                                </div>
                                <div class='third' v-if="item.descr">
                                    {{item.descr}}
                                </div>
                            </div>
                    </div>
                </div>
            </ClassificationBox>                
                    <!-- <Form-item label="任务名称"  class="bill-search-class" prop="name" style="width:100%;">
                        <i-input 
                            v-model="formItem.name" 
                            placeholder="请输入任务名称"
                            style="width: 252px"
                            @on-change="nameChange"
                            disabled 
                        />
                    </Form-item>

                    <Form-item label="管理层关注"  class="bill-search-class pop-position" prop="focus">
                            <RadioGroup v-model="formItem.focus">
                                <div class='single-radio-ok'><Poptip  content="设置为“管理层关注”任务后，该任务会在项目总览中显示">
                                    <Radio label="1">是</Radio>
                                </Poptip></div>
                                <div class='single-radio-no'><Poptip  content="取消设置“管理层关注”任务后，该任务不会在项目总览中显示">
                                    <Radio label="0">否</Radio>
                                </Poptip></div>
                            </RadioGroup>
                    </Form-item>

                    <Form-item label="责任部门"  class="bill-search-class dep-class">
                        <span>{{getEdit.department}}</span>
                    </Form-item>

                   
              

                   <Form-item label="完成起止日期" class="bill-search">
                        <DatePicker 
                            v-model="formItem.actualStartTime"
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 252px"
                            @on-change="actualStartChange"
                        />
                        <span class="u-date-txt">至</span>
                        <DatePicker 
                            v-model="formItem.actualEndTime"
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 252px"
                            @on-change="actualEndChange"
                        /> 
                   </Form-item>
                   <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期且不能只有结束日期</div> 
        

                    <FormItem label="任务描述"  class="bill-search-class" style="width:575px;margin-bottom: 5px;">
                            <Input v-model="formItem.descr" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入任务描述..."/>
                            <div style="text-align:right">{{formItem.descr?formItem.descr.length+"/500":0+"/500"}}</div>
                    </FormItem>


              <div class='edit-record'>
                    <FormItem label="内部备注" style="width:545px;margin-left:10px;">
                            <Input v-model="formItem.operDescr" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入内部备注..."/>
                            <div style="text-align:right">{{formItem.operDescr?formItem.operDescr.length+"/500":0+"/500"}}</div>
                    </FormItem>
   
                    <div class='title-wrap'>
                        <span class='title-record'>编辑记录</span>
                        <div
                            class='record-wrap'
                            v-for="item in getEdit.operLogs" 
                            :key="item.id"
                            >
                                <div class='first'><span class='circle'></span>{{item.uTime|dateFormat('MM-dd HH:mm')}}</div>
                                <div style="display:inline-block;">
                                    <div class='second'>
                                        <span style="padding-right: 10px;">{{item.updatorName}}</span>
                                        <span>{{item.comment}}</span>
                                    </div>
                                    <div class='third' v-if="item.descr">
                                        {{item.descr}}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div> -->

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
            padding:0 13px;
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
            margin-bottom:20px;
            .first{
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #666666;
                display:inline-block;
                padding-right:30px;
                vertical-align: top;
                .circle{
                    width:2px;
                    height:2px;
                    border-radius: 50%;
                    background:#666;
                    display:inline-block;
                    vertical-align: middle;
                    margin-right:10px;
                    margin-top: -2px;
                }
                .circle:befor{
                    height: 0px;
                    width: 0px;
                }
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
                background: #fff;
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