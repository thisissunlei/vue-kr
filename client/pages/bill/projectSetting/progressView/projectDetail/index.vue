<template>
  <div>
        <div class='chart-ul-wrap'>
            <div class='detail-title'>
                <div class='title-left'>
                    <span>项目档案</span>
                    <span>{{queryData.name}}</span>
                </div>
                <div class='title-right'><Button type="primary" @click="watchTask">查看记录</Button></div>
            </div>

            <div class='detail-detail'>
                <Tabs>
                    <TabPane label="项目档案">
                       123
                    </TabPane>
                    <TabPane label="项目开业进度">
                        <DetailTaskList 
                            :data="listData"
                            @addClick="addTask"
                            @editClick="editTask"
                            />
                    </TabPane>
              </Tabs>
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
                <WatchRecord :watchRecord="watchRecord"/>
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
import DetailTaskList from './detailTaskList';

export default {
    data(){
        return{
            queryData:{},
            listData:[
             {
               name:'信息收集',
               tId:'1',
               children:[
                 {name:'意向书',tId:'2',children:[]},
                 {name:'意向书',tId:'3',children:[]}
               ]
             },
             {
               name:'项目评估',
               tId:'4',
               children:[]
             }
           ],


            openAddTask:false,
            openEditTask:false,
            openWatch:false,
            upperError:false,
            addData:{},
            editData:{},
            id:'',


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
    components:{
        AddTask,
        EditTask,
        WatchRecord,
        DetailTaskList
    },
    created(){
        this.queryData=this.$route.query;
    },
    methods:{
        getListData(params){

        },
        addTask(id){
            this.openAddTask=!this.openAddTask;
            this.id=id;
        },
        editTask(id){
            this.openEditTask=!this.openEditTask;
            this.id=id;
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
                this.addData.id=this.id;
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
                this.editData.id=this.id;
                this.params=Object.assign({},this.params,{time:+new Date()});
                this.$http.post('apply-contract',this.editData).then((response)=>{
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
       background: #F9F9FC;
       display:inline-block;
       .detail-title{
           height:70px;
           line-height:70px;
           .title-left{
                display:inline-block;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #666666;
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
