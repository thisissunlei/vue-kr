<template>
<div :id="projectViewId" class="project-view">
    <div class="u-search" >
        <Button class="new-btn"  type="primary"   v-if="tab!='OPENED'" @click="newArchives">新建项目</Button>
        <div style="display:inline-block;width:80px;" v-if="tab == 'OPENED' && (tdType == '1220-1400'||tdType=='<1220' )"></div>
         <div class="u-color-block">
            <span class="u-prepare">未完成</span>
            <span class="u-opened">已完成</span>
        </div>
        <div class="u-search-content" >
            <div class="u-select" style="width:140px;">
                 <Select
                        v-model="formItem.cityId"
                        style="width:140px"
                        placeholder="请选择城市"
                        filterable
                        clearable
                        @on-change="cityChange"
                    >
                         <Option  v-for="item in citySelectData" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
            </div>
            <div class="u-select task-select-box" >
                <span>仅看</span>
                 <Select
                        v-model="formItem.doneTaskId"
                        class="task-select"
                        placeholder="请选择"
                        filterable
                        clearable
                        @on-change="doneTaskChange"
                    >
                         <Option  v-for="item in taskSelectData" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
                <span>已完成项目</span>
            </div>
           <div class="u-select task-select-box" >
                <span>仅看</span>
                 <Select
                        class="task-select"
                        v-model="formItem.undoneTaskId"
                        placeholder="请选择"
                        filterable
                        clearable
                        @on-change="dundoneTaskChange"
                    >
                         <Option  v-for="item in taskSelectData" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                </Select>
                <span>未完成项目</span>
            </div>
            <div class="u-search-form" style="display:inline-block;position:absolute;top:0px;">
                <SearchForm 
                    :searchFilter="searchFilter"
                    :onSubmit="onSubmit"
                />
            </div>
        </div>
        
        
    </div>
    <div class="u-table-list" :style="{height:'40px',position:'fixed',top:'60px',overflow:'hidden',zIndex:'200'}" v-show="showHander">
            <div class="u-table-left">
                 
                 <div :class="[tableFlag?'u-left-box-show':'u-left-box-hide','u-table-box']">
                        <div class="u-table-content project-view-table-content">
                            <!--  -->
                            <Table  border :columns="projectTabColumns" :data="[]" ></Table>
                        </div>
                 </div>
            </div>
            <div :id="handerId" class="u-table-right" style="position:relative;">
                <div  style="overflow-x:auto;">
                    <div :class="[tableFlag?'u-show':'','u-table-box-right','project-view-table-content']">
                        <Table  border :columns="projectTabColumns" :data="[]"></Table>
                    </div>
                </div>
                
            </div>
    </div>

    <div class="u-table-list" >
            <div class="u-table-left">
                 <div :id="arrowId" :class="[tableFlag?'u-left-arrow':'u-right-arrow','u-table-arrow']" @click="stretchTable"></div>
                 <div :class="[tableFlag?'u-left-box-show':'u-left-box-hide','u-table-box']">
                        <div class="u-table-content project-view-table-content">
                            <!--  -->
                            <Table  border :columns="projectTabColumns" :data="projectList" ></Table>
                        </div>
                 </div>
            </div>
            <div class="u-table-right">
                <div :id="contentId" style="overflow-x:auto;" >
                    <div :class="[tableFlag?'u-show':'','u-table-box-right','project-view-table-content']">
                        <Table  border :columns="projectTabColumns" :data="projectList"></Table>
                    </div>
                </div>
                
            </div>
    </div>
    <div v-if="isloading">
        <Loading/>
    </div>
    
    <div id="gantt-chart-tool-tip"></div>
    <div id="gantt-chart-tool-tip-triangle" class="bottom-triangle"></div>
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
      
        :close="cancelEditTask"
        width="660"
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
import renderData from './renderData';
import EditTask from '../project-detail/edit-task';

let mainDom = null;
let projectViewDom = null;
let isEnd = false;
var scrollWidth = 0; 
let arrowDom = null; 
let windowHeight = 0;
let handerDom = null;
let contentDom = null;


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
                page:1,
                arrowId:'arrow'+this._uid,
                // pageSize:20,
                tdType:'>1500',
                projectViewId:'projectView'+this._uid,
                handerId:'handerList'+this._uid,
                contentId:'contentList'+this._uid,
                openMessage:false,
                taskStatus:'',
                itemDetail:{},
                tableFlag:false,
                isloading:false,
                tabParams:{
                    page:1,
                    pageSize:200,
                    projectName:'',
                    projectCode:'',
                    cityId:'',
                    doneTaskId:'',
                    undoneTaskId:'',

                },
                citySelectData:[],
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
                    undoneTaskId:''
                },
                showHander:false,
                tab:'',
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
                projectTabColumns:[].concat(renderData.call(this)),
                
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
            mainDom = document.getElementById('layout-content-main');
            projectViewDom = document.getElementById(this.projectViewId);
            arrowDom = document.getElementById(this.arrowId);
            contentDom = document.getElementById(this.contentId);
            handerDom = document.getElementById(this.handerId);
            console.log("-----",contentDom,handerDom)
            var wWidth = document.body.clientWidth;
            this.setContentWidth(wWidth);

            scrollWidth = utils.getScrollBarSize();
           

            this.tab=sessionStorage.getItem('chartSetting') ||'PREPARE';
            this.tabParams.projectStatus=this.tab;
            
           
          
            windowHeight = document.body.clientHeight;
            this.response(true);
            window.addEventListener('resize',this.response);

            this.getTableData(this.tabParams);
            this.getCityData(this.tab);
            this.getSelect();
           
           
           
            if(mainDom){
                mainDom.addEventListener('scroll',this.mainScroll);
            }
            if(contentDom){
                contentDom.addEventListener('scroll',this.contentScroll);
            }
           
        },
       
        beforeDestroy(){
            mainDom.removeEventListener('scroll',this.mainScroll)
            window.removeEventListener('resize',this.response);
        },
        
        methods:{
            contentScroll(){
                if(this.showHander){
                    
                
                    let scrollLeft = contentDom.scrollLeft;
                    
                    handerDom.style.left = -scrollLeft+'px'
                }
               
            },
            mainScroll(){
                let scrollTop = mainDom.scrollTop;
                arrowDom.style.top = scrollTop+ (windowHeight-190)/2+'px'
                if(scrollTop>110){
                    this.showHander = true;
                }else{
                    this.showHander = false;
                }
                var wWidth = document.body.clientWidth;
                this.setContentWidth(wWidth);
                if(!isEnd && (mainDom.scrollTop + mainDom.clientHeight >= mainDom.scrollHeight)){
                    
                    if(this.totalCount>this.tabParams.page*this.tabParams.pageSize){
                        this.tabParams.page +=1;
                        this.getTableData(Object.assign({},this.tabParams));
                    }
                    isEnd = true;
                }
            },
            setContentWidth(wWidth){
                var contentdom = document.querySelectorAll('.project-view-table-content');
                for(let i=0;i<contentdom.length;i++){
                     contentdom[i].style.width = wWidth-70+400-scrollWidth +'px';
                }
            },
            response(flag){
                var data =[].concat(this.projectTabColumns);
                var arr = [];
                
                var wWidth = document.body.clientWidth;
                // var boxDom = document.getElementById('projectView'+this._uid);
                // console.log(boxDom.style.width)
                // if(boxDom){
                     
                // }
               this.setContentWidth(wWidth);
              
                if(wWidth>1500  &&( flag||this.tdType!=='>1500')){
                    arr = data.map((item,index)=>{
                        delete item.width;
                        if(item.key=='name'){
                            item.width = 160;
                        }
                        if(item.key=='city'){
                            item.width = 80;
                        }
                        if(item.key=='code'||
                            item.key == 'rentalArea'||
                            item.key == 'cmtName'||
                            item.key == 'totalSeatNum'
                        ){
                            item.width = 100;
                        }
                      
                        return item;
                    })
                    this.tdType = 'max'
                }
                if(wWidth>1400 && wWidth<1500&&( flag||this.tdType!=='1400-1500')){
                    arr = data.map((item,index)=>{
                        item.width=80;
                        if(item.key=='name'){
                            item.width = 160;
                        }
                        if(item.key=='city'){
                            item.width = 80;
                        }
                        if(item.key=='code'||
                            item.key == 'rentalArea'||
                            item.key == 'cmtName'||
                            item.key == 'totalSeatNum'
                        ){
                            item.width = 100;
                        }
                        if(item.key=='k14'||item.key=='k13'||item.key=='k12'){
                            delete item.width;
                        }
                      
                        return item;
                    })
                    this.tdType = 'max'
                }
                if(wWidth<=1400 && wWidth>1220 && (flag||this.tdType!=='1220-1400')){
                    arr = data.map((item,index)=>{
                        item.width=74;
                        if(item.key=='code'||
                            item.key == 'rentalArea'||
                            item.key == 'cmtName'||
                            item.key == 'totalSeatNum'
                        ){
                            item.width = 100;
                        }
                         if(item.key=='name'){
                            item.width = 90;
                        }
                         if(item.key=='city'){
                            item.width = 57;
                        }
                       
                        if(item.key=='k14'){
                            delete item.width;
                        }
                        return item;
                    })
                    this.tdType = 'min';
                }
                 if(wWidth<=1220 && (flag||this.tdType!=='<1220')){
                    arr = data.map((item,index)=>{
                        item.width = 72;
                        if(item.key=='code'||
                            item.key == 'rentalArea'||
                            item.key == 'cmtName'||
                            item.key == 'totalSeatNum'
                        ){
                            item.width = 100;
                        }
                        if(item.key=='city'){
                            item.width = 77;
                        }
                        
                        return item;
                    })
                    this.tdType = 'min';
                }

                
                this.projectTabColumns = [].concat(arr);
            },
            getCityData(projectStatus){
                this.$http.get('get-task-city-data',{
                    projectStatus:projectStatus
                }).then((res)=>{
                    this.citySelectData = [].concat(res.data);
                    
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })

            },
            cityChange(value){
               
                this.tabParams.cityId = value;
                var params = Object.assign({},this.tabParams);
                this.getTableData(params);
            },
            toolOut(event){
                var tirDom = document.getElementById('gantt-chart-tool-tip');
                var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
                tirDom.style.display = 'none';
                angleDom.style.display = 'none';
            },
            openEditTaskDraw(params){
                this.taskId=params.value;
                this.projectId = params.projectId;
                this.getEditTaskData(this.taskId)
            } ,
            dundoneTaskChange(form){
                this.tabParams.undoneTaskId=form;
                this.tabParams.page = 1;
                this.getTableData(this.tabParams);
            },
            doneTaskChange(form){
                this.tabParams.doneTaskId=form;
                this.tabParams.page = 1;
                this.getTableData(this.tabParams);
            },
            onSubmit(form){ 
                
                
                this.tabParams.projectName=form.projectName||'';
                this.tabParams.projectCode=form.projectCode||'';
                let params = Object.assign({},this.tabParams);
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
                this.isloading = true;
                this.$http.get('get-project-home', tabParams).then((res)=>{
                        let arr = [].concat(this.projectList); 
                        this.isloading = false;
                        this.projectList=arr.concat(res.data.items);
                        this.tabParams.page = res.data.page;
                        this.totalCount=res.data.totalCount;
                        isEnd = false;
                    }).catch((err)=>{
                        this.$Notice.error({
                            title:err.message
                        });
                })
            },
            stretchTable(){
                
                if(!contentDom || !handerDom){
                    contentDom = document.getElementById(this.contentId);
                    handerDom = document.getElementById(this.handerId);
                    contentDom.addEventListener('scroll',this.contentScroll);
                }
                this.tableFlag=!this.tableFlag;
            },
            //跳转查看页面
            goView(params){
                window.open(`./project-setting/project-detail?name=${params.name}&id=${params.id}&city=${params.city}&status=1`)
           
            },
            //新建页数据更新
            onAddArchives(params){
                this.addData=params;
            },
            //项目详情的侧滑
            cancelEditTask(){
                this.openEditTask = !this.openEditTask;
            },
            dataChange(params,callback){ 
                var data = Object.assign({},params);
                this.submitEditTask(data,callback);
            },
            //获取侧滑页面数据
            getEditTaskData(id,callback){
                this.$http.get('project-get-task',{id:id}).then((response)=>{
                    var data = Object.assign({},response.data)
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
            submitEditTask(params,callback){
                var dataParams = Object.assign({},params);
                dataParams.id=this.taskId;
                dataParams.projectId=this.projectId;
              
                dataParams.planEndTime= dataParams.planEndTime?dataParams.planEndTime+' 00:00:00':'';
              
                dataParams.actualEndTime= dataParams.actualEndTime?dataParams.actualEndTime+' 00:00:00':'';
                this.$http.post('project-edit-task',dataParams).then((response)=>{
                    this.getTableData(this.tabParams);
                    this.getEditTaskData(this.taskId,()=>{})
                   
                    if(callback){
                        callback(response.code);
                    }
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
                    this.getTableData(this.tabParams);
                    this.newArchives();
                    this.getCityData(this.tab);
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
                this.getTableData(this.tabParams);
            },
            //新建按钮被点击
            newArchives(){
                utils.clearForm(this.addData);
                this.openNewArchives = !this.openNewArchives;
                if(this.openNewArchives){
                    this.allowSubmit = true;
                }
            },
                     
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
    .edit-label{
       padding-right:0px !important;
   }
    .ivu-tooltip-popper{
        position: fixed;
    }
    .ivu-table-cell{
        padding:0;
        margin:0;
    }
    .ivu-table-header{
        th{
            background:  #E4ECF4;
            border-right:1px solid #F6F6F6;
        }
        
    }
    .u-search{
        position: relative;
        height:32px;
        margin:16px 0;
        .new-btn{
            width: 80px;
           vertical-align:top;
        }
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
        position: relative;
        display: inline-block;
        margin-left: 20px;
       
        .u-select{
            width:250px;
            margin-right:15px;
            float:left;
            font-size: 13px;
            span{
                padding:0 10px;
                vertical-align: -2px;
            }
            .task-select{
                width: 170px;
            }
        }
        .task-select-box{
            width: 300px;
        }
    }
    .u-search-form{
       top:0;
    }
    .u-color-block{
        width:132px;
        float:right;
        span{
            width:60px;
            height:30px;
            line-height: 30px;
            display: inline-block;
            text-align: center;
            font-size: 13px;
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
       width:80px;
       text-align: center;
       height:32px;
       line-height:32px;
       background: #AFD882;
       border-radius: 7px 7px 8px 8px;
       margin:0 auto;
   }
   .u-status-undone{
       width:80px;
       text-align: center;
       height:32px;
       line-height:32px;
       background: #EEEEEE;
       border-radius: 7px 7px 8px 8px;
       margin:0 auto;
   }

    .u-table-list{
       
        position: relative;
        .task-name{
            width: 160px;
        }
        .task-city{
            width: 80px;
        }
        .u-table-content{
            width: 1600px;
        }
        .u-table-left{
            position: absolute;
            left:0;
            top:0;
            z-index:100;
            
           .u-table-box{
              overflow: hidden;
              border-right: 5px solid #F6F6F6;
              .ivu-table-body{
                  overflow: hidden;
              }
           }
           table{
               td{
                    &:nth-child(1){
                        font-size:13px;
                    }
                    &:nth-child(2){
                        font-size:13px;
                    }
                     &:nth-child(3){
                        font-size:13px;
                    }
               }
              
           }
            .u-table-arrow{
                width:15px;
                height:30px;
                position: absolute;
                z-index:100;
                right:-10px;
                top:50%;
                cursor: pointer;
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
        .u-left-box-hide{
            width:240px;
            transition:width .2s;
        }
        .u-left-box-show{
            width:640px;
            transition:width .2s;
        }
        
        .u-table-right{
           overflow-x: hidden;
          .u-table-box{
              overflow-x:auto;
              
          }
           .u-table-box-right{
                width:100%; 
                // min-width:1600px;
                margin-left: -400px;
                transition:all .2s;
                table{
                        th,td{
                            &:nth-child(3){
                                border-right:none !important;
                            }
                        }
                }
           }
           .u-show{
                transition:all .2s;
                margin-left: 0px;
           }
        }
    }
    #gantt-chart-tool-tip{
        width: 250px;
        min-height: 50px;
        display: none;
        background: rgba(70,76,91,.9);
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 4px;
        padding:6px 12px 9px;
        color: #ffffff;
        z-index: 999;
       
        pointer-events:none;
        .title{
            font-size: 12px;
            background: transparent;
        }
        .content{
            font-size: 12px;
            background: transparent;
        }
    }
    #gantt-chart-tool-tip-triangle{

       
        position: absolute;
        display:none;
        // margin:10px;
        width:0;
        height:0;
        border-style:solid;
        border-width:5px;
        top: -10px;
        left: 10px;
       
        z-index: 999;

    }
    .bottom-triangle{
        border-color: transparent transparent rgba(70,76,91,.9)  transparent;
    }
    .top-triangle{
        border-color:rgba(70,76,91,.9) transparent transparent  transparent   ;
    }
    .sure-sign{
        text-align: center;
        max-width: 300px;
        margin: 0 auto;
        line-height: 26px;
        font-size: 14px;
    }

}
@media all and (max-width: 1220px){
    .project-view {
        .u-status-done{
            width: 60px;
        }
        .u-status-undone{
            width: 60px;
        }
        .u-table-list .task-name{
            width: 60px;
            margin: auto;
        }
        .u-table-list .task-city{
            width: 60px;
             margin: auto;
        }
     }
}
@media all and (min-width: 1220px)  and (max-width: 1400px){
    .project-view {
        .u-status-done{
            width: 60px;
        }
        .u-status-undone{
            width: 60px;
        }
        .u-table-list .task-name{
            width: 90px;
            margin: auto;
        }
        .u-table-list .task-city{
            width: 46px;
             margin: auto;
        }
        .u-table-list{
            .u-left-box-hide{
                width:152px;
                transition:width .2s;
            }
            .u-left-box-show{
                width:552px;
                transition:width .2s;
            }

        }
        
     }
}
@media all and (min-width: 1440px)  and (max-width: 1500px){
    .project-view {
        .u-search{
            height: 75px;
            .new-btn{
                width: 108px;
            }
       
            .u-search-content{

                width: 100%;
                margin-top: 10px;
                margin-left: 0px;
                .u-select{
                    .task-select{
                        width: 170px;
                    }
                }
                .task-select-box{
                    width: 300px;
                }
            }
        }
        .u-status-done{
            width: 70px;
        }
        .u-status-undone{
            width: 70px;
        }
        .u-table-list .task-name{
            width: 150px;
            margin: auto;
        }
        .u-table-list .task-city{
            width: 60px;
             margin: auto;
        }
     }
}

@media all and (max-width: 1300px) {
    .project-view {
        .u-search{
            height: 75px;
            .new-btn{
                width: 108px;
            }
       
            .u-search-content{

                width: 100%;
                margin-top: 10px;
                margin-left: 0px;
                .u-select{
                    .task-select{
                        width: 170px;
                    }
                }
                .task-select-box{
                    width: 300px;
                }
            }
        }
       
       .u-table-list .u-left-box-hide{
            width:147px;
            transition:width .2s;
        }
        .u-table-list .u-left-box-show{
            width:547px;
            transition:width .2s;
        }
       
    }
}


</style>
