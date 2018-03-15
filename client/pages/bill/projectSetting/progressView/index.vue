<template>
  <div>
        <div class='chart-ul-wrap'>
             <div class='chart-out'>
                  <Button type="primary" @click="addTask" class='join-btn'>添加任务</Button>
                  <Button type="primary" @click="editTask" class='join-btn'>编辑任务</Button>
                  <Button type="primary" @click="watchTask" class='join-btn'>查看记录</Button>
             </div>
        </div>

        <Modal
                v-model="openAddTask"
                title="添加任务"
                width="660"
            >
                <AddTask  @bindData="onAddChange" v-if="openAddTask" ref="fromFieldTask"/>
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
                <EditTask  @bindData="onEditChange" :editRecord="editRecord" v-if="openEditTask" ref="fromFieldTask"/>
                <div slot="footer">
                    <Button type="primary" @click="submitEditTask('formItem')">确定</Button>
                    <Button type="ghost" style="margin-left:8px" @click="editTask">取消</Button>
                </div>
        </Modal>

         <Modal
                v-model="openWatch"
                title="查看记录"
                width="660"
            >
                <WatchRecord :recordData="recordData"/>
                <div slot="footer">
                    <Button type="primary" @click="submitWatch">确定</Button>
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

export default {
    data(){
        return{
            openAddTask:false,
            openEditTask:false,
            openWatch:false,
            addData:{},
            upperError:false,
            editData:{},
            params:{
                page:1,
                pageSize:15
            },

            recordData:[
                {time:'2月22日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"},
                {time:'2月23日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"}
            ],

            editRecord:[
                {time:'2月22日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"},
                {time:'2月23日 23:32',detail:'AI 编辑了社区开业进度详情',who:"编辑任务  项目评估"} 
            ]
        }
    },
    components:{
        AddTask,
        EditTask,
        WatchRecord
    },
    methods:{
        getListData(params){

        },
        addTask(){
            this.openAddTask=!this.openAddTask;
        },
        editTask(){
            this.openEditTask=!this.openEditTask;
        },
        watchTask(){
            this.openWatch=!this.openWatch;
        },
        submitWatch(){
            this.watchTask();
        },
        onAddChange(params,error){
            this.upperError=error;
            this.addData=params;
        },
        onEditChange(params,error1,error2){
            this.upperError=(error1||error2)?true:false;
            this.editData=params;
        },
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
                this.params=Object.assign({},this.params,{time:+new Date()});
                this.$http.post('apply-contract',this.addData).then((response)=>{
                     this.addTask();
                     this.getListData(this.params);
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                })
          },
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
                this.params=Object.assign({},this.params,{time:+new Date()});
                this.$http.post('apply-contract',this.addData).then((response)=>{
                     this.editTask();
                     this.getListData(this.params);
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                })
          }
     }
}
</script>

<style lang="less">
   .chart-ul-wrap{
       width:100%;
       display:inline-block;
       .chart-out{
           width:600px;
           height:500px;
           border:solid 1px #ddd;
           margin:0 auto;
           overflow: scroll;
       }
       .chart-li-day{
           width:30px;
           border:solid 1px #ddd;
           list-style: none;
       }
   }
</style>
