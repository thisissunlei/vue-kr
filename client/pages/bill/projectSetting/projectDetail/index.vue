<template>
  <div>
        <div class='edit-left-bar'>
            <div class='detail-title'>
                <div class='title-left'>
                    <span>项目档案</span>
                    <span>{{queryData.name}}</span>
                </div>
                <div class='title-right'><Button type="primary" @click="watchTask">查看记录</Button></div>
            </div>
            <GanttChart>
                <div class='detail-detail' slot="leftBar">
                    <DetailTaskList 
                        :data="listData"
                        @addClick="addTask"
                        @editClick="editTask"
                    />
                </div>
            </GanttChart>
          
        </div>
       
        <Modal
                v-model="openAddTask"
                title="添加任务"
                width="660"
            >
                <AddTask  :id="addId" @bindData="onAddChange" v-if="openAddTask" ref="fromFieldTask"/>
                <div slot="footer">
                    <Button type="primary" @click="submitAddTask('formItem')">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="addTask">取消</Button>
                </div>
        </Modal>

        <Modal
                v-model="openEditTask"
                title="编辑任务"
                width="660"
            >
                <EditTask :id="editId"  @bindData="onEditChange" :editRecord="editRecord" v-if="openEditTask" ref="fromFieldTask" :getEdit="getEdit"/>
                <div slot="footer">
                    <Button type="primary" @click="submitEditTask('formItem')">确认编辑</Button>
                    <Button type="ghost" style="margin-left:8px" @click="cancelTask">删除任务</Button>
                </div>
        </Modal>

         <Modal
                v-model="openWatch"
                title="查看记录"
                width="660"
            >
                <WatchRecord :watchRecord="watchRecord"/>
                <div slot="footer">
                    <Button type="primary" @click="submitWatch">确定</Button>
                </div>
        </Modal>

        <Modal
                v-model="openDelete"
                title="删除任务"
                width="400"
            >
                <p style="text-align:center;">删除任务后不可恢复，确定要继续删除任务吗？</p>
                <div slot="footer">
                    <Button type="primary" @click="submitDelete">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="cancelTask">取消</Button>
                </div>
        </Modal>
  </div>
</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import AddTask from './addTask';
import EditTask from './editTask';
import WatchRecord from './watchRecord';
import DetailTaskList from './detailTaskList';
import GanttChart from '../ganttChart';


export default {
    components:{
        AddTask,
        EditTask,
        WatchRecord,
        DetailTaskList,
        GanttChart
    },
    data(){
        return{
            queryData:{},
            listData:[],


            openAddTask:false,
            openEditTask:false,
            openWatch:false,
            openDelete:false,
            upperError:false,
            addData:{},
            editData:{},
            getEdit:{},
            addId:'',
            editId:'',
            parentId:'',


            params:{
                page:1,
                pageSize:15
            },
            
            watchRecord:[
                {time:'2月22日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"},
                {time:'2月23日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"}
            ],

            editRecord:[
                {time:'2月22日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"},
                {time:'2月23日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"} 
            ]
        }
    },
    created(){    
        this.queryData=this.$route.query; 
    },
    mounted(){
         GLOBALSIDESWITCH("false");
         this.getListData();  
    },
    methods:{
        //获取树数据
        getListData(){
            let params={
                propertyId:this.queryData.id
            }
            this.$http.get('project-list-task',params).then((response)=>{
                     this.listData=response.data.items; 
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                 })
        },
        //打开新建任务
        addTask(id){
            this.openAddTask=!this.openAddTask;
            this.addId=id;
        },
        cancelEditTask(){
            this.openEditTask=!this.openEditTask;
        },
        //打开编辑任务
        editTask(id,parentId){
            this.editId=id;
            this.parentId=parentId;
            this.$http.get('project-get-task',{id:id}).then((response)=>{
                    this.getEdit=response.data;
                    this.cancelEditTask();
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                 })
        },
        //打开查看任务
        watchTask(){
            this.openWatch=!this.openWatch;
        },
        //打开删除任务
        cancelTask(){
           this.openDelete=!this.openDelete; 
        },
        //提交查看任务
        submitWatch(){
            this.watchTask();
        },
        //提交删除任务
        submitDelete(){
            var params={
                id:this.editId
            }
            this.$http.delete('project-delete-task',params).then((response)=>{
                     this.cancelTask();
                     this.cancelEditTask();
                     this.getListData();
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                 });
             })
        },
        //新建对象传递校验
        onAddChange(params,error){
            this.upperError=error;
            this.addData=params;
        },
        //编辑对象传递校验
        onEditChange(params,error1,error2){
            this.upperError=(error1||error2)?true:false;
            this.editData=params;
        },
        //新建任务提交
        submitAddTask(name){     
                var newPageRefs = this.$refs.fromFieldTask.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                if(this.upperError){
                    return ;
                }
                if(this.addData.error){
                    this.$Notice.error({
                        title: '任务名称重复'
                    });
                    return ;
                }
                this.addData.pid=this.addId;
                this.addData.propertyId=this.queryData.id;
                this.addData.planStartTime=this.addData.planStartTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.addData.planStartTime)):'';
                this.addData.planEndTime=this.addData.planEndTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.addData.planEndTime)):'';
                this.$http.post('project-add-task',this.addData).then((response)=>{
                     this.addTask();
                     this.getListData();
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                })
          },
          //编辑任务提交
          submitEditTask(name){
                var newPageRefs = this.$refs.fromFieldTask.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                if(this.upperError){
                    return ;
                }
                // if(this.editData.error){
                //     this.$Notice.error({
                //         title: '任务名称重复'
                //     });
                //     return ;
                // }
                this.editData.id=this.editId;
                this.editData.pid=this.parentId;
                this.editData.propertyId=this.queryData.id;
                this.editData.planStartTime=this.editData.planStartTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.editData.planStartTime)):'';
                this.editData.planEndTime=this.editData.planEndTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.editData.planEndTime)):'';
                this.editData.actualStartTime=this.editData.actualStartTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.editData.actualStartTime)):'';
                this.editData.actualEndTime=this.editData.actualEndTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.editData.actualEndTime)):'';
                this.$http.post('project-edit-task',this.editData).then((response)=>{
                     this.editTask();
                     this.getListData();
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                })
          }
     }
}
</script>

<style lang="less" scoped>
   .edit-left-bar{
       width:100%;
       background: #fff;
       display:inline-block;
       .detail-title{
           background: #F5F6FA;
           height:50px;
           .title-left{
                display:inline-block;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #666666;
                margin-top: 5px;
                span:nth-child(1){
                    padding-right:10px;
                }
           }
           .title-right{
               float:right;
           }
       }
       .detail-detail{
           width:100%;
           background: #fff;
           display:inline-block;
       }
   }
</style>
