<template>
<div class="project-view">
    <div class="u-search" >
        <Button type="primary"  @click="newArchives">新建项目</Button>
        <div class="u-search-content">
            <div class="u-select">
                <span>仅看</span>
                 <Select
                        v-model="formItem.doneTaskId"
                        style="width:120px"
                        placeholder="请选择"
                        filterable
                        clearable
                        @on-change="doneTaskChange"
                    >
                         <Option  v-for="item in taskSelectData" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
                <span>已完成项目</span>
            </div>
           <div class="u-select">
                <span>仅看</span>
                 <Select
                        v-model="formItem.undoneTaskId"
                        style="width:120px"
                        placeholder="请选择"
                        filterable
                        clearable
                        @on-change="dundoneTaskChange"
                    >
                         <Option  v-for="item in taskSelectData" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
                <span>未完成项目</span>
            </div>
        </div>
        <div class="u-search-form">
            <SearchForm 
                :searchFilter="searchFilter"
                :onSubmit="onSubmit"
            />
        </div>
         <div class="u-color-block">
            <span class="u-prepare">未完成</span>
            <span class="u-opened">已完成</span>
        </div>
    </div>
    <div class="u-table-list">
            <div :class="[tableFlag?'u-left-show':'u-left-hide','u-table-left']">
                 <div :class="[tableFlag?'u-right-arrow':'u-left-arrow','u-table-arrow']" @click="stretchTable"></div>
                 <div class="u-table-box">
                        <div class="u-table-content">
                            <Table  border :columns="projectTabColumns" :data="projectList" ></Table>
                        </div>
                 </div>
            </div>
            <div class="u-table-right">
                <div class="u-table-box" style="overflow-x:auto;">
                    <div :class="[tableFlag?'u-show':'u-hide','u-table-box-right']">
                        <Table  border :columns="projectTabColumns" :data="projectList"></Table>
                    </div>
                </div>
                <div style="margin: 10px;overflow: hidden">
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
import SearchForm from '~/components/SearchForm';
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
            EditTask,
            SearchForm
        },
        data () {
            return {
                totalCount:0,
                openMessage:false,
                taskStatus:'',
                itemDetail:{},
                pageSize:15,
                page:1,
                tableFlag:false,
                tabParams:{
                    page:1,
                    pageSize:15,
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
                formItem:{
                    doneTaskId:'',
                    undoneTaskId:'',
                },
                warn:'',
                MessageType:'',
                allowSubmit:true,
                editTaskData:{},
                projectList:[],
                taskSelectData:[],
                searchFilter:[
                    {
                        label:'项目名称',
                        value:'projectName'
                    },
                    {
                        label:'项目编号',
                        value:'projectCode'
                    }
                ],
                projectTabColumns:[
                    {
                        title: '项目名称',
                        key: 'name',
                        align:'center',
                        width:160,
                        render:(h, obj)=>{
                            return h('div', {
                                       on: {
                                            click: () => {
                                                this.goView(obj.row)
                                            }
                                        }
                                  },obj.row.name);
                        }
                       
                    },
                    {
                        title: '城市',
                        key: 'city',
                        align:'center',
                        width:80,
                        render:(h, obj)=>{
                             return h('div', {
                                       on: {
                                            click: () => {
                                                this.goView(obj.row)
                                            }
                                        }
                            },obj.row.city);
                           
                        }
                       
                    },
                    {
                        title: '项目编号',
                        key: 'code',
                        align:'center',
                        width:100,
                        render:(h, obj)=>{
                             return h('div', {
                                       on: {
                                            click: () => {
                                                this.goView(obj.row)
                                            }
                                        }
                            },obj.row.code);
                          
                        }
                    },
                    {
                        title: '项目立项',
                        key: 'k1',
                        align:'center',
                        render(h, obj){
                             switch (obj.row.k1.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                        }
                    },
                    {
                        title: '项目决策',
                        key: 'k2',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k2.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                        
                    },
                    {
                        title: '意向书签订',
                        key: 'k3',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k3.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },
                    {
                        title: '支付意向金',
                        key: 'k4',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k4.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },
                    {
                        title: '租赁合同签订',
                        key: 'k5',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k5.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                        }
                    }, 
                    {
                        title: '支付履约保证金',
                        key: 'k6',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k6.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    }, 
                    {
                        title: '产品平面决策',
                        key: 'k7',
                        align:'center',
                        render(h, obj){
                             switch (obj.row.k7.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },
                     {
                        title: '工程收房',
                        key: 'k8',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k8.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },
                    {
                        title: '图纸完成',
                        key: 'k9',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k9.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    }, 
                    {
                        title: '报审完成',
                        key: 'k10',
                        align:'center',
                        render(h, obj){
                             switch (obj.row.k10.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    }, 
                     {
                        title: '项目开工',
                        key: 'k11',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k11.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },
                    {
                        title: '项目竣工',
                        key: 'k12',
                        align:'center',
                        render(h, obj){
                             switch (obj.row.k12.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    }, 
                    {
                        title: '项目交付',
                        key: 'k13',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k13.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    }, 
                     {
                        title: '项目正式开业',
                        key: 'k14',
                        align:'center',
                        render(h, obj){
                            switch (obj.row.k14.taskStatus){
                                case 'DONE':
                                    return <div class="u-status-done">{obj.row.k1.actualEndTime}</div>
                                break;
                                case 'UNDONE':
                                    return <div class="u-status-undone">{obj.row.k1.planEndTime}</div>
                                break;
                                case 'UNPLANNED':
                                     return <div class="u-status-undone"></div>
                                     
                                break;
                             }    
                           
                        }
                    },   
                ],
                
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

            let tab=sessionStorage.getItem('chartSetting') || 'PREPARE';
            this.tabParams.projectStatus=tab;
            this.getTableData(this.tabParams);
            this.getSelect();
        },
        methods:{
            dundoneTaskChange(form){
                this.tabParams.undoneTaskId=form;
                this.getTableData(this.tabParams);
            },
            doneTaskChange(form){
                this.tabParams.doneTaskId=form;
                this.getTableData(this.tabParams);
            },
            onSubmit(form){ 
                if(this.tabParams.projectName){
                    this.tabParams.projectName="";
                }
                if(this.tabParams.projectCode){
                    this.tabParams.projectCode="";
                }
                 let params=Object.assign(form,this.tabParams);
                this.getTableData(params);
                // utils.addParams(params);
            },
            getSelect(){
                
                 this.$http.get('get-task-template-list', "").then((res)=>{
                            this.taskSelectData = [].concat(res.data.items);
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                    })

            },
            getTableData(tabParams){
                    this.$http.get('get-project-home', tabParams).then((res)=>{
                            this.projectList=res.data.items;
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                    })
            },
            stretchTable(){
                this.tableFlag=!this.tableFlag;
            },
            //跳转查看页面
            goView(params){
                window.location.href=`./project-setting/project-detail?name=${params.name}&id=${params.id}&city=${params.city}&status=1`; //${params.status}
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
                dataParams.projectId=this.projectId;
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
.u-clearfix { zoom:1; }
.u-clearfix:after {
  clear: both;
  content: '.';
  height: 0;
  display: block;
  visibility: hidden;
}
.project-view{
    padding:0 20px;
    .ivu-table-cell{
        padding:0;
        margin:0;
    }
    .u-search{
        position: relative;
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
    .u-search-content{
        position: absolute;
        left:150px;
        width:550px;
        top:0;
         .u-select{
             width:240px;
             margin-right:30px;
             float:left;
             span{
                 padding:0 10px;
                 vertical-align: -2px;
             }
         }
    }
    .u-search-form{
       position: absolute;
       left:700px;
       top:0;
    }
    .u-color-block{
        width:172px;
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
   
   .u-status-done{
       width:105px;
       text-align: center;
       height:32px;
       line-height:32px;
       background: #AFD882;
       border-radius: 7px 7px 8px 8px;
       margin:0 auto;
   }
   .u-status-undone{
       width:105px;
       text-align: center;
       height:32px;
       line-height:32px;
       background: #EEEEEE;
       border-radius: 7px 7px 8px 8px;
       margin:0 auto;
   }

    .u-table-list{
       
        position: relative;
        .u-table-left{
            position: absolute;
            left:0;
            top:0;
            z-index:100;
            .u-table-content{
                width:2000px;
            }
           .u-table-box{
              overflow: hidden;
           }
            .u-table-arrow{
                width:15px;
                height:30px;
                position: absolute;
                z-index:100;
                right:-10px;
                top:50%;
                transform: translateY(-50%);
            }
            .u-left-arrow{
                background: url('~/assets/images/arrow_left.png') no-repeat center center;
                background-size:100% 100%;
            }
            .u-right-arrow{
                background: url('~/assets/images/arrow_right.png') no-repeat center center;
                background-size:100% 100%;
            }
           
        }
        .u-left-hide{
            width:240px;
        }
        .u-left-show{
            width:340px;
        }
        
        .u-table-right{
           overflow: hidden;
          .u-table-box{
              overflow-x:auto;
          }
           .u-table-box-right{
                width:2000px;
           }
           .u-hide{
               transform: translateX(-100px);
           }
           .u-show{
               transform: translateX(0);
           }
        }
    }

}





</style>
