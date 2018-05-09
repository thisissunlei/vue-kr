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
                                    :value="planEnd"
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
                        <div v-if="!actualEnd&&!isEndEdit" class="time-bottom-success" @click="switchEndEdit">✔️已完成</div>
                        <div v-if="actualEnd||isEndEdit" style="height:36px;line-height:36px;margin-top:20px;">
                            <DatePicker
                                :open="endOpen"
                                :value="actualEnd"
                                confirm
                                type="date"
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
                <div v-if="getEdit.code" class="file-box" style="margin-top:10px;display:inline-block;line-height:20px;">
                    <div>需要填写档案
                        <span style="font-size:20px;color:#ccc;">{{getEdit.totalFields}}</span>项，尚未完成
                        <span style="font-size:20px;color:#000;">{{getEdit.nullFields}}</span>项，
                        <span style="font-size:20px;color:#499DF1;cursor: pointer;" @click="goArchivesClick">去填写&nbsp;>> </span></div>
                </div>
            </div>
            
            

            <div class="segmentation-line"></div>
            <div class="edit-record" >
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
        </Form>

        <Modal
            v-model="openGoArchives"
           
            width="900"
        >
            <div slot="header" style="font-size:16px;color:#333;">
                <div>已填写<span style="color:#151515;">{{getEdit.totalFields-getEdit.nullFields}}</span><span  style="color:#2A2A2A;">/{{getEdit.totalFields}}</span></div>
                <div style="margin-top:8px;">{{getEdit.name}}</div>
            </div>
            <ArchivesDetail :projectId="projectId" v-if="fileDetailData.items" :data ="fileDetailData" />
            
            <div slot="footer">
              
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
            newStart:'',
            newEnd:''

        }
    },
    created(){    
        this.queryData=Object.assign({},this.$route.query); 
    },
    mounted(){
         
    },
   
    methods:{
        switchStartTime(){
            this.startOpen = !this.startOpen;
        },
        switchEndTime(){
            this.endOpen = !this.endOpen;
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
            this.isStartEdit = !this.isStartEdit;
        },
        endChange(data){
            this.newEnd = data;
        },
        endClear(){

        },
        endOk(){
            this.actualEnd = this.newEnd;
            this.params.actualEndTime = this.actualEnd;
            var data = Object.assign({},this.params);
            data.planEndTime = this.numToDate(data.planEndTime);
            data.actualEndTime = this.numToDate(data.actualEndTime)
            this.switchEndTime();
            console.log(data.actualEndTime,"kkkkkk")
            this.$emit("dataChange",data);
        },
        switchEndEdit(){
            this.endOpen = true;
            this.isEndEdit = !this.isEndEdit;
        },
        goArchivesClick(){
           
            this.getArchivesDetail({projectId:this.projectId,code:this.getEdit.code})
            
        },
        switchGoArchives(){
            this.openGoArchives = !this.openGoArchives;
        },
        getFormItem(){
          
            return Object.assign({},this.getEdit)
        },
        //去填写详情
        getArchivesDetail(data){
            this.fileDetailData = {};
            this.$http.get('project－archives-file-detail',data).then((response)=>{
                this.fileDetailData = Object.assign({},response.data);
                this.switchGoArchives();
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