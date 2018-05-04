<template>
    <div class="edit-task">
        <Form  :model="params"   label-position="top" style="margin-top:25px;">
            <ClassificationBox value="1" title="计划工期" :isBorder="true" type="num">
                <div slot="content" class="time-box plan-time" > 
                    <Form-item label="开始日" class="bill-search" prop="planStartTime">
                        <DatePicker 
                        
                            v-model="params.planStartTime"
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 245px"
                            :clearable="false"
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
                            :clearable="false"
                            @on-change="planEndChange"
                        /> 
                    </Form-item>
                    <div  style="color:red;padding-left:32px;padding-bottom:15px;" v-show="dateError">开始日期不能大于结束日期</div> 
                </div>
            </ClassificationBox>
            <ClassificationBox value="2" :promptText="editActualEndTime('title')?'':'（请先填写“计划工期”）'" title="执行情况" :isBorder="true" type="num">
                <div slot="content" > 
                    <div class="time-box actual-time" >
                        
                        <!-- <Tooltip v-if="!actualStart" placement="top" class="start"> -->
                            <Form-item label="开始日" class="bill-search ">
                                <DatePicker 
                                    v-model="params.actualStartTime"
                                    type="date" 
                                    :clearable="false"
                                    placeholder="开始日期" 
                                    style="width: 245px"
                                    @on-change="actualStartChange"
                                />
                               
                                <span class="u-date-txt"></span>
                                <div 
                                    v-if="editActualEndTime('start') && !this.actualStart" 
                                    class="actual-select-today" 
                                    @click="selectTodayStart"
                                >
                                    今天开始的？
                                </div>
                                <div v-if="!editActualEndTime('start')" class="mask"></div>
                            </Form-item>
                            
                        <!-- </Tooltip> -->
                       
                        <!-- <Tooltip v-if="!actualEnd" placement="top" class="end"> -->
                            <Form-item  class="end" label="结束日"  prop="actualEndTime" style="display:inline-block;">
                                <DatePicker 
                                    v-model="params.actualEndTime"
                                    type="date" 
                                    :clearable="false"
                                    placeholder="结束日期" 
                                    style="width: 245px"
                                    @on-change="actualEndChange"
                                /> 
                                <div 
                                    v-if="editActualEndTime('end')&&!this.actualEnd" 
                                    class="actual-select-today"
                                    @click="selectTodayEnd"
                                >今天完成的?</div>
                                 <div v-if="!editActualEndTime('end')" class="mask"></div>
                            </Form-item>
                          
                        <!-- </Tooltip>    -->
                        <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError">开始日期不能大于结束日期且不能只有结束日期</div> 
                        <!-- <div style="color:red;padding-left:32px;padding-bottom:15px;" v-show="cDateError1">计划工期必填</div>  -->
                       
                    </div>

                    <div class="time-box" style="margin-top:10px;display:inline-block;line-height:20px;">
                        <div>需要填写档案<span>{{getEdit.nullFields}}</span>项，尚未完成<span>{{getEdit.totalFields}}</span>箱，<span style="color:#499DF1;cursor: pointer;" @click="goArchivesClick">去填写&nbsp;>> </span></div>
                    </div>
                </div>
            </ClassificationBox>
            
            <ClassificationBox value="3" title="基本信息" :isBorder="true" type="num">
                <div slot="content"> 

                    <LabelText label="管理层关注" >
                        {{params.focus=="0"?'否':'是'}}
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
            <ClassificationBox value="4" title="编辑记录" :isBorder="true" :isEnd="true" type="num">
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
                                 <div class="mod-triangle">
                                    <div class="t-border"></div>
                                    <div class="t-inset"></div>
                                </div>
                                {{item.descr}}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </ClassificationBox>                
        </Form>

        <Modal
            v-model="openGoArchives"
            title="提示信息"
            width="900"
        >
            <p style="text-align:center;">是否保存提交本次修改</p>
            <ArchivesDetail/>
            <div slot="footer">
               <!--  <Button type="primary" @click="submitClick">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeMask">取消</Button> -->
            </div>
        </Modal>
    </div>
</template>


<script>
import dateUtils from 'vue-dateutils';
import ClassificationBox from '~/components/ClassificationBox'
import LabelText from '~/components/LabelText'
import ArchivesDetail from '../archives-detail'

import Vue from 'vue';
export default {
    components:{
        ClassificationBox,
        LabelText,
        ArchivesDetail
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
            cDateError1:false,
            params:this.getFormItem(),
            actualStart:this.getEdit.actualStartTime,
            actualEnd:this.getEdit.actualEndTime,
            planStart:this.getEdit.planStartTime,
            planEnd:this.getEdit.planEndTime,
            openGoArchives:false,
        }
    },
    created(){    
        // this.queryData=this.$route.query; 
    },
    mounted(){
         
    },
   
    methods:{
        goArchivesClick(){
            console.log("----------")
            this.switchGoArchives();
        },
        switchGoArchives(){
            this.openGoArchives = !this.openGoArchives;
        },
        editActualEndTime(value){
            
            if(value == "start" && this.planStart && this.planEnd && this.planStart<=this.planEnd){
                return true;
            }
            if(value=="end"&& this.planStart && this.planEnd && this.planStart<=this.planEnd && this.actualStart){
                return true;
            }
            if(value == "title" && this.planStart && this.planEnd && this.planStart<=this.planEnd){
                return true;
            }
            return false;
        },
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
    .mask{
        position: absolute;
        cursor: not-allowed;
        top: 0px;
        bottom: 0px;
        width: 100%;
        z-index: 10;

    }
    .bill-search-class{
        display:inline-block;
        width:50%;
        padding-left:32px;
        padding-bottom: 20px;
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
            font-weight: normal;
           
        }
        .ui-text{
            width: 450px;
            vertical-align: top;
            line-height: 1.5;
            font-weight: bold;
        }
    }
  
    
    .ivu-form-item{
        margin-bottom: 0px;
    }
    .time-box{
        background:#F6F6F6;
        padding:10px;
        border-radius:4px; 
        position: relative;
    }
    .actual-select-today{
        position: absolute;
        top: -43px;
        left: 50px;
        cursor: pointer;
        max-width: 250px;
        min-height: 34px;
        padding: 0px 12px;
        color: #fff;
        text-align: left;
        text-decoration: none;
        background-color: rgba(70,76,91,.9);
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        white-space: nowrap;
    }
    .actual-select-today::before{
        content: '';
        display: inline-block;
        position: absolute;
        left: -5px;
        top: 50%;
        margin-top: -3px;
        border-width: 5px 5px 5px 0;
        border-right-color: rgba(70,76,91,.9);
        border-style: solid;
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
             position: relative;
        }
       .ivu-date-picker-rel{
            input{
                color: #333;
                font-size: 14px;
            }
        } 
        .start .ivu-tooltip-popper{
            position: absolute !important;
            left: 50px !important;
            top: -10px !important;
            display: block !important;
           
        }
        .end .ivu-tooltip-popper{
            position: absolute !important;
            left: 50px !important;
            top: -10px !important;
            display: block !important;
        }
        .ivu-tooltip-arrow{
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            bottom: 3px;
            border-width: 5px;
            border-right-color: rgba(70,76,91,.9);
            margin-left: auto;
            top: 50%;
            left: -10px;
            margin-top: -5px;
        }
    }
    
    .bill-search{
        position: relative;;
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
                position: relative;
               .mod-triangle {
                    display:block;
                    position: absolute;
                    left:5px;
                    top:-13px;
                    z-index:20;
                    .t-border,
                    .t-inset{
                        left:0px;
                        top:0px;
                        width:0;
                        height:0;
                        font-size:0;
                        overflow:hidden;
                        position:absolute;
                        border-width:8px;
                        border-style: solid;
                    }
                    .t-border{
                        border-color:transparent  transparent #EEEEEE transparent;
                        top:-1px;
                    }
                    .t-inset{
                        border-color: transparent  transparent #F6F6F6 transparent;
                    }       
                }
            }
           

        }
    }
}

</style>  