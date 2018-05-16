<template>
    <div class="edit-task">
        <Form  :model="params"   label-position="top" style="margin-top:25px;">
            <div class="file-box ">
                <div class="file-col"><span class="file-title">责任部门</span><span class="file-label">{{getEdit.department}}</span></div>
                <div>
                    <div class="tiem-box" style="float:left;">
                        <div class="time-view">
                            <div  class="time-title" >计划时间</div>
                            <div v-if="!planEnd &&!isStartEdit" class="time-bottom-unsuccess" @click="switchStartEdit">设置</div>
                            <div v-if="planEnd||isStartEdit" style="height:36px;line-height:36px;margin-top:20px;">
                                <DatePicker
                                    :open="startOpen"
                                    :value="newStart"
                                    confirm
                                    type="date"
                                    @on-change="startChnage"
                                    @on-clear="startClear"
                                    :clearable="false"
                                    @on-ok="startOk">
                                    <a href="javascript:void(0)" @click="switchStartTime">
                                    
                                        <div style="display:inline-block;font-size:20px;color:#333;min-width:110px;"> {{ numToDate(planEnd)}} </div>
                                        
                                        <Icon style="margin-left:10px;" type="ios-calendar-outline"></Icon>
                                    </a>
                                </DatePicker>
                            </div>
                        </div>
                        <div class="time-edit">
                            
                        </div>
                    </div>
                    <div class="tiem-box" style="margin-left:19px;">
                        <div class="time-title">完成时间</div>
                        <div v-if="!actualEnd&&!isEndEdit" class="time-bottom-success" @click="switchEndEdit"><span class="ok-icon"></span>已完成</div>
                        <div v-if="actualEnd||isEndEdit" style="height:36px;line-height:36px;margin-top:20px;">
                            <DatePicker
                                :open="endOpen"
                                :value="newEnd"
                                confirm
                                type="date"
                                :options="endOptions"
                                :clearable="false"
                                @on-change="endChange"
                                @on-clear="endClear"
                                @on-ok="endOk">
                                <a href="javascript:void(0)" @click="switchEndTime">
                                
                                    <div style="display:inline-block;font-size:20px;color:#333;min-width:110px;"> {{ numToDate(actualEnd) }} </div>
                                    
                                    <Icon style="margin-left:10px;" type="ios-calendar-outline"></Icon>
                                </a>
                            </DatePicker>
                        </div>
                    </div>
                </div>
                <div v-if="getEdit.code||getEdit.nullFields" class="file-box" style="margin-top:10px;display:inline-block;line-height:20px;">
                    <div>
                        需要填写档案&nbsp;<span style="font-size:20px;color:#666;">{{getEdit.totalFields}}</span>&nbsp;项，
                        尚未完成&nbsp;<span style="font-size:20px;color:#000;">{{getEdit.nullFields}}</span>&nbsp;项，
                        <span style="font-size:20px;color:#499DF1;cursor: pointer;" @click="goArchivesClick">去填写&nbsp;>> </span></div>
                </div>
            </div>
            
            

            <div class="segmentation-line"></div>
            <div v-if="getEdit && getEdit.operLogs && getEdit.operLogs.length" class="edit-record-title">编辑记录</div>
            <div class="edit-record" >
                <div
                    class='record-wrap'
                    v-for="item in getEdit.operLogs" 
                    :key="item.id"
                >
                    <div class='first'>{{item.uTime|dateFormat('MM-dd')}}</div>
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
        </Form>

        <Modal
            v-model="openGoArchives"
        
            width="910"
        >
            <div slot="header" style="font-size:16px;color:#333;">
                <div>已填写<span style="color:#151515;">{{validFields}}</span><span  style="color:#2A2A2A;">/{{totalFields}}</span></div>
                <div style="margin-top:8px;">{{getEdit.name}}</div>
            </div>
            <ArchivesDetail @okClick="okClick" :projectId="projectId" v-if="fileDetailData.items" :data ="fileDetailData" />
            
            <div slot="footer">
              
            </div>
        </Modal>
        <Modal
            v-model="openSure"
            title="提示"
            width="440"
            >
            <div class='sure-sign'>“确认已签署合同”后，该项目自动固化后续任务计划完成时间 </div>
            <div slot="footer">
                <Button type="primary" @click="submitSure()">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="cancelSure">取消</Button>
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
        taskId:{
            type:[Number,String]
        },
        projectId:{
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
            queryData:{},
            fileDetailData:{},
            startOpen:false,
            isStartEdit:false,
            endOpen:false,
            isEndEdit:false,
            newStart:this.planEnd||'',
            newEnd:this.actualEnd||'',
            totalFields:0,
            validFields:0,
            openSure:false,
            endOptions:{
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            }

        }
    },
    created(){    
        this.queryData=Object.assign({},this.$route.query); 
    },
    mounted(){
         
    },
   
    methods:{
         submitSure(){
            let params={
                id:this.taskId,
                projectId:this.projectId
            }
            this.$http.post('sure-sign-project',params).then((response)=>{
                this.cancelSure();
                // this.getListData(this.ids);
                this.endOk(true);
            }).catch((error)=>{
                this.$Notice.error({
                    title: error.message,
                });
                // this.MessageType="error";
                // this.openMessage=true;
                // this.warn=error.message;
            })
        },
        cancelSure(){
            this.openSure=!this.openSure;
        },
        switchStartTime(){
            this.startOpen = !this.startOpen;
            
        },
        switchEndTime(){
            this.endOpen = !this.endOpen;
            if(this.endOpen){
                this.newEnd = this.actualEnd;
            }
        },
        startChnage(date){
            this.newStart = date
        },
        startOk(){
            this.planEnd = this.newStart;
            this.params.planEndTime = this.planEnd;
            var data = Object.assign({},this.params);
            data.planEndTime = this.numToDate(data.planEndTime);
            data.actualEndTime = this.numToDate(data.actualEndTime)
            this.switchStartTime();
            this.$emit("dataChange",data);
        },
        numToDate(num){
            if(!num){
                return '';
            }
            if(!isNaN(num)){
                return dateUtils.dateToStr("YYYY-MM-DD", new Date(num));
            }
            return num;
        },
        startClear(){

        },
        switchStartEdit(){
            this.startOpen = true;
            this.newStart = (new Date()).getTime();
            this.isStartEdit = !this.isStartEdit;
        },
        endChange(data){
            this.newEnd = data;
        },
        endClear(){

        },
        okClick(){
          
              this.getArchivesDetail({projectId:this.projectId,code:this.getEdit.code},()=>{
                    console.log("=========")
                    this.params.actualEndTime = this.actualEnd;
                    this.isEndEdit = true;
                    var data = Object.assign({},this.params);
                    data.planEndTime = this.numToDate(data.planEndTime);
                    data.actualEndTime = this.numToDate(data.actualEndTime)
                    this.$emit("dataChange",data,()=>{
                        this.cancelSure()
                    });
              })
        },
        endOk(flag){
            this.actualEnd = this.newEnd;
            this.params.actualEndTime = this.actualEnd;
            var data = Object.assign({},this.params);
            data.planEndTime = this.numToDate(data.planEndTime);
            data.actualEndTime = this.numToDate(data.actualEndTime)
            if(!flag){
                this.switchEndTime();
            }
            this.$emit("dataChange",data,()=>{
                 this.cancelSure()
            });
        },
        switchEndEdit(){
            // this.endOpen = true;
           
            this.actualEnd = this.newEnd = (new Date()).getTime();
            this.params.actualEndTime = this.actualEnd;
            this.isEndEdit = true;
            var data = Object.assign({},this.params);
            data.planEndTime = this.numToDate(data.planEndTime);
            data.actualEndTime = this.numToDate(data.actualEndTime)
            this.$emit("dataChange",data,()=>{
                this.cancelSure()
            });
        },
        goArchivesClick(){
            this.getArchivesDetail({projectId:this.projectId,code:this.getEdit.code})
            
        },
        switchGoArchives(){
            this.openGoArchives = !this.openGoArchives;
            if(!this.openGoArchives){
                this.startOk();
            }
        },
        getFormItem(){
          
            return Object.assign({},this.getEdit)
        },
        //去填写详情
        getArchivesDetail(data,callback){
           console.log(data,"ooooooo")
            this.$http.get('project－archives-file-detail',data).then((response)=>{
               
                if(!callback){
                     this.fileDetailData = Object.assign({},response.data);
                    this.switchGoArchives();
                   
                    
                }
                if( callback){
                     callback();
                }
                this.totalFields=response.data.totalFields;
                this.validFields = response.data.validFields;
                
            }).catch((error)=>{
                this.$Notice.error({
                title: error.message,
                });
            })
        },
        
    }
}

</script>

<style lang='less'>
.edit-task{
    .edit-record-title{
        margin-top: 30px;
        padding-left: 20px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
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
    .segmentation-line{
        width: 100%;
        height: 5px;
        background: #F6F6F6;
        position: relative;
        left: -45px;
        padding: 0px 45px;
        margin-top: 30px;
        box-sizing:content-box;
    }
    .ok-icon{
        display: inline-block;
        height: 16px;
        width: 16px;
        background-image: url(./images/ok.svg);
        background-size:100%;
        position: relative;
        top: 5px;
        left: -5px;
        background-repeat: no-repeat;
    }
    .file-col{
        margin: 10px 0px 20px;
        .file-title{
            font-size: 16px;
            color: #333333;
            font-weight: bold;
        }
        .file-label{
            font-size: 16px;
            color: #333333;
            margin-left: 15px;
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
  
    
   
    .file-box{
        background:#F6F6F6;
        padding:15px;
        border-radius:4px; 
        position: relative;
        .tiem-box{
            display: inline-block;
            width: 250px;
            height: 113px;
            background: #ffffff;
            text-align: center;
              .time-title{
                padding-top: 20px;
                font-size: 14px;
                color: #666666;
                text-align: center;

            }
            .time-bottom-unsuccess{
                background: #FFFFFF;
                border: 1px solid #4F9EED;
                border-radius: 4px;
                font-size: 14px;
                color: #4F9EED;
                cursor: pointer;
                text-align: center;
                height: 36px;
                line-height: 36px;
                width: 150px;
                display: inline-block;
                margin: auto;
                margin-top: 20px;
                
            }
             .time-bottom-success{
                background:  #4F9EED;
                border: 1px solid #4F9EED;
                border-radius: 4px;
                font-size: 14px;
                color: #FFFFFF;
                cursor: pointer;
                text-align: center;
                height: 36px;
                line-height: 36px;
                width: 150px;
                display: inline-block;
                margin-top: 20px;
                margin: auto;
            }
        }
    }
    .time-view{
        .ivu-btn.ivu-btn-text{
            display: none;
        }
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
            padding-bottom: 18px;
            border-bottom: 1px solid #efefef;
            margin-top: 20px;
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
                margin-top: 10px; 
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