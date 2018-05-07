<template>
<div class="project-view">
    
    <div class="u-search" >
        <Button type="primary"  @click="newArchives">新建项目</Button>
         <div class="u-color-block">
            <span class="u-prepare">未完成</span>
            <span class="u-opened">已完成</span>
        </div>
    </div>
    <div class="u-table-left">
        <Table  border :columns="projectTabColumns" :data="projectList" ></Table>
    </div>
    <div class="u-table-right">
        <Table  border :columns="projectListColumns" :data="projectList"></Table>
        <div style="margin: 10px;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page 
                    :current="page"
                    :total="totalCount"
                    :page-size="pageSize" 
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
        </div>
    </div>
    <Modal
        v-model="openNewArchives"
        title="新建项目"
        ok-text="确定"
        cancel-text="取消"
        width="373"
        className="vertical-center-modal"
     >
        <AddArchives @bindData="onAddArchives" ref="fromFieldArchives" v-if="openNewArchives"/>
        <div slot="footer" style="text-align:center;">

            <Button type="primary" :disabled="!allowSubmit" @click="submitAddArchives('formRight')">完成并创建</Button>
        </div>
    </Modal>
    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    /> 
    <Drawer 
        :openDrawer="openEditTask"
        iconType="view-icon"
        :close="cancelEditTask"
        width="650"
    >   
        <ObjectDetailTitle slot="title"  :taskStatus="taskStatus" :data="editTaskData" />
        <EditTask 
            :projectId="projectId"
            :taskId="taskId||51"  
            @dataChange="dataChange" 
            v-if="openEditTask" 
            :getEdit="Object.assign({},editTaskData)"
        />
    </Drawer>

</div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import KrField from '~/components/KrField';
import KrTree from '~/components/KrTree';
import AddArchives from './add-archives';
import publicFn from '../publicFn';
import Loading from '~/components/Loading'
import Drawer from '~/components/Drawer';
import ObjectDetailTitle from '../project-detail/object-detail-title';
import EditTask from '../project-detail/edit-task';
    export default {
        components:{
            SectionTitle,
            Message,
            Buttons,
            KrField,
            KrTree,
            AddArchives,
            Loading,
            Drawer,
            ObjectDetailTitle,
            EditTask
        },
        data () {
            return {
                totalCount:0,
                openMessage:false,
                taskStatus:'',
                itemDetail:{},
                pageSize:15,
                page:1,
                tabParams:{
                    page:1,
                    pageSize:15,
                    query:'CTIMEDESC'
                },
                taskId:1869,//任务id
                projectId:51,//项目id
                addData:{},
                fileDetailData:{},
                /**
                 * 开关部分内容
                */
                openNewArchives:false,
    
                openEditTask:false,
            
                warn:'',
                MessageType:'',
                allowSubmit:true,
                editTaskData:{},
                undoneTaskId:'',
                projectList:[],
                projectTabColumns:[
                    {
                        title: '项目名称',
                        key: 'name',
                        align:'center',
                    },
                    {
                        title: '城市',
                        key: 'cityName',
                        align:'center',
                    },
                ],
                projectListColumns:[
                    {
                        title: '账单编号',
                        key: 'billNo',
                        align:'center',
                        width:160,
                        fixed:'left'
                    }, 
                ]
            }
        },
        created(){
            //  this.getTableData(this.$route.query);

            //  if(!this.$route.query.customerName){
            //      this.$route.query.customerName=""
            //  }
            //  this.tabParams=Object.assign({},this.$route.query,{page:1,pageSize:15});
          
            
            
        },
        mounted(){
            //    this.$nextTick(()=>{
            //         let tableDom = document.querySelectorAll('#object-seting-archives table')[0];
            //         utils.tableSort(tableDom,this.shortChange);
            //     })
            this.getBaseicInfo();
        },
        methods:{
            getBaseicInfo(){
                    let tab=sessionStorage.getItem('chartSetting') || 'PREPARE';
                    let form={
                        projectStatus:tab,
                    }
                    if(this.undoneTaskId){
                        form.undoneTaskId=this.undoneTaskId;
                    }
                    this.$http.get('get-project-home', form).then((res)=>{
                            res.data.enums.map((item)=>{
                                this.billType[item.code]=item.name; 
                                item.label=item.name;
                                item.value=item.code; 
                            })
                            this.typeList=res.data.enums;
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                    })
            },
            //跳转查看页面
            goView(params){
                window.location.href=`./project-setting/project-detail?name=${params.name}&id=${params.id}&city=${params.city}&status=${params.status}`;
            },
            //新建页数据更新
            onAddArchives(params){
                this.addData=params;
            },
            //项目详情的侧滑
            cancelEditTask(){
                this.openEditTask = !this.openEditTask;
            },
            dataChange(params){ 
                var data = Object.assign({},params);
                this.submitEditTask(data);
            },
            //获取侧滑页面数据
            getEditTaskData(id,callback){
                this.$http.get('project-get-task',{id:id}).then((response)=>{
                    var data = Object.assign({},response.data)
                    data.planStartTime=this.timeApplyFox(data.planStartTime,true);
                    data.planEndTime=this.timeApplyFox(data.planEndTime,true);
                    data.actualStartTime=this.timeApplyFox(data.actualStartTime,true);
                    data.actualEndTime=this.timeApplyFox(data.actualEndTime,true)
                    data.focus=data.focus==1?'1':'0';
                    this.editTaskData=Object.assign({},data);
                    this.taskStatus = data.taskStatus;
                    if(!callback){
                        this.cancelEditTask();
                    }else{

                    }
                }).catch((error)=>{
                    this.$Notice.error({
                        title: error.message,
                    });
                })
            },
            //侧滑编辑任务提交
            submitEditTask(params){
                var dataParams = Object.assign({},params);
                dataParams.id=this.taskId;
                dataParams.propertyId=this.queryData.id;
                dataParams.planStartTime=this.timeApplyFox(dataParams.planStartTime);
                dataParams.planEndTime=this.timeApplyFox(dataParams.planEndTime);
                dataParams.actualStartTime=this.timeApplyFox(dataParams.actualStartTime);
                dataParams.actualEndTime=this.timeApplyFox(dataParams.actualEndTime);
                this.$http.post('project-edit-task',dataParams).then((response)=>{
                    // this.getListData(this.ids);
                
                    // if(response.code>1){
                    //     this.cancelSure();
                    // }else{
                    //     this.MessageType="success";
                    //     this.openMessage=true;
                    //     this.warn="编辑成功";
                    // }
                    // this.editTask(this.taskId,()=>{});
                    // this.scrollPosititon();
                }).catch((error)=>{
                    this.MessageType="error";
                    this.openMessage=true;
                    this.warn=error.message;
                })
            },
            //火狐时间兼容
            timeApplyFox(str,param){
                if(str){
                if(str.typeof == 'string'){
                    str = str.replace(/-/g,'/');
                }
                str = param?dateUtils.dateToStr("YYYY-MM-DD",new Date(str)):dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(str));
                }else{
                str = '';
                }
                return str;
            },
            //新建项目创建成功
            submitAddArchives(name){
                var newPageRefs = this.$refs.fromFieldArchives.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                this.addData.province=this.addData.citys[0];
                this.addData.city=this.addData.citys[1];
                this.addData.county=this.addData.citys[2];
                this.allowSubmit = false;
                this.$http.post('project-archives-add',this.addData).then((res)=>{
                    // this.getTableData(this.tabParams);
                    this.newArchives();
                    this.openMessage=true;
                    this.warn='新建成功';
                    this.MessageType="success";
                    this.allowSubmit = true;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                    this.allowSubmit = true;
                })
            },
            //信息提示框
            onChangeOpen(data){
                this.openMessage=data;
            },
            //页面发生改变
            changePage(page){
                this.tabParams.page=page;
                this.page=page;
                // this.getTableData(this.tabParams);
            },
            //新建按钮被点击
            newArchives(){
                this.getEditTaskData(this.taskId)
                // this.cancelEditTask;
                return;
                utils.clearForm(this.addData);
                this.openNewArchives = !this.openNewArchives;
                if(this.openNewArchives){
                    this.allowSubmit = true;
                }
            }           
        }
    }
</script>

<style lang="less">
.project-view{
    padding:0 20px;
    //iview组件样式修改
    // .ivu-icon-arrow-up-b::before{
    //     //  content: '';
    // }
    // .ivu-icon-arrow-down-b::before{
    //     //  content: '';
    // }
    .u-search{
            height:32px;
            margin:16px 0;
            .u-high-search{
                width:22px;
                height:22px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;
                float:right;
                cursor:pointer;

            }
    }
    .u-color-block{
        width:172px;
        height:71px;
        float:right;
        span{
            width:80px;
            height:30px;
            line-height: 30px;
            display: inline-block;
            text-align: center;
            font-size: 14px;
            color: #666666;
            border-radius: 7px;
        }

        .u-prepare{
           background: #EEEEEE; 
           margin-right:12px;
        }
        .u-opened{
            background: #AFD882;
        }

    }
    .table-null{
        line-height: 47px;
    }
    .ivu-modal-footer{
    padding-top:10px; 
}
    .current-range{
        .ivu-table-cell{
            padding:0;
            height:100%;
        .ivu-tooltip{
            .row-current-more{
               
                padding: 15px 0 10px 0;
            }
            .noBorder{
                border-bottom:none;
            }
        }
      }
      .ivu-table-cell > div{
            border-bottom:solid 1px #e9eaec;
            &:last-child{
                border-bottom:none;
            }
      }
    }
    .ivu-table-header{
        .ivu-table-cell{
            height:auto;
        }
        thead{
            tr{
                th{
                    &:nth-child(5){
                        border-bottom:solid 1px #e9eaec;
                    }
                    &:nth-child(6){
                        border-bottom:solid 1px #e9eaec;
                    }
                }
            }
        }
    }
    tr.ivu-table-row-hover td{
        background-color: #F7F9FB;
    }
    .ivu-table-header{
        thead{
            height:50px;
            line-height:50px;
        }
    }
    .ivu-table th{
         background-color: #FAFCFF;
    }
}
.ivu-modal-footer{
    padding-top:10px; 
}

.ivu-tooltip{
    width:100%;
    .ivu-tooltip-rel{
       width:100%;
    }
}
.current-more-task{
    width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

</style>
