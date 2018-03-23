<template>
  <div>
        <div class='edit-left-bar'>
            <div class='detail-title'>
                <div class='title-left'>
                    <span>项目档案</span>
                    <span>{{queryData.name}}</span>
                </div>
                <div class='title-right' v-if="signMask"><Button type="primary" @click="cancelSure">确认合同已签署</Button></div>
                <div class='title-right'><Button type="primary" @click="watchTask">查看编辑记录</Button></div>
            </div>
            <GanttChart 
                v-if="!isLoading && listData.length" 
                :data="listData"
                :treeData="treeData"
                type="edit"
                :startTime="this.getStartDay()" 
                :endTime="this.getEndDay()"
                @scroll="chartScroll"
            >
                <div class='detail-detail' slot="leftBar">
                    <DetailTaskList 
                        :data="listData"
                        @addClick="addTask"
                        @editClick="editTask"
                        @scroll="scroll"
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
                <EditTask :id="editId"  @bindData="onEditChange" v-if="openEditTask" ref="fromFieldTask" :getEdit="getEdit"/>
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
                    <Button type="primary" @click="cancelWatch">确定</Button>
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

        <Modal
            v-model="openSure"
            title="提示"
            width="440"
            >
            <div class='sure-sign'>“确认已签署合同”后，该项目进入“待开业项目”列表并自动生成后续任务模板</div>
            <div slot="footer">
                <Button type="primary" @click="submitSure()">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="cancelSure">取消</Button>
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
            difference:7,
            watchRecord:[],
            endTime:'',
            startTime:this.getStartDay(),
            isLoading:true,

            treeData:[],
            signMask:false,
            openSure:false
        }
    },
    created(){    
        this.queryData=this.$route.query; 
    },
    mounted(){
         GLOBALSIDESWITCH("false");
         this.getListData(); 
         let status=this.queryData.status==1?'INVEST':'PREPARE'
         this.signMask=this.queryData.status==1?true:false;
         this.getTreeData({statusType:status});
    },
    methods:{
        //获取查看编辑记录
        getWatchData(id){
            this.$http.get('watch-edit-record',{id:id}).then((response)=>{
                this.watchRecord=response.data.items;
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        //获取树列表数据
        getTreeData(params){     
            this.$http.get('project-status-search',params).then((response)=>{
                this.treeData=response.data.items;
                this.recursiveFn(this.treeData);
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
         //递归甘特图任务赋值
        recursiveFn(data){
            data.map((item,index)=>{
                item.title=item.label;
                item.expand=false;
                if(item.children&&item.children.length){
                    this.recursiveFn(item.children);
                }
            })
            return data;
        },
         //获取今天日期
        getStartDay(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            return today;
        },
        getEndDay(){
           
             if(this.params.endTime){
                return this.params.endTime;
            }
           
            var today =this.getStartDay();
            var start = today.split("-");
            var year = +start[0],
                month = +start[1],
                day= +start[2];

            for(var i=0;i<this.difference;i++){
              
               
                if(month > 12){
                    month = month-12;
                    year += 1;
                }
                month ++ 
            }
            if(month > 12){
                month = month-12;
                year += 1;
            }
          
            return year+"-"+month+"-"+day;
            
        },
        //获取树数据
        getListData(){
            let params={
                propertyId:this.queryData.id
            }
            this.isLoading = true;
            this.$http.get('project-list-task',params).then((response)=>{
                this.listData=response.data.items; 
               
                //后面进行组件优化
                this.isLoading = false;
                this.listData.map((item,index)=>{
                   item.children=item.children?item.children:[];
                   item.children.push({label:'添加自任务',chartType:'single'})
                })
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
        //取消查看任务
        cancelWatch(){
            this.openWatch=!this.openWatch;
        },
        //打开查看任务
        watchTask(){
            this.getWatchData(this.queryData.id);
            this.cancelWatch();  
        },
        //打开删除任务
        cancelTask(){
           this.openDelete=!this.openDelete; 
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
                this.addData.pid=this.addId?this.addId:0;
                this.addData.planEndTime=this.addData.type=='STAGETASK'?this.addData.planEndTime:this.addData.planStartTime;
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
                if(this.editData.error){
                    this.$Notice.error({
                        title: '任务名称重复'
                    });
                    return ;
                }
                var dataParams=this.editData;
                dataParams.id=this.editId;
                dataParams.pid=this.parentId?this.parentId:0;
                dataParams.propertyId=this.queryData.id;
                dataParams.planStartTime=dataParams.planStartTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(dataParams.planStartTime)):'';
                dataParams.planEndTime=dataParams.planEndTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(dataParams.planEndTime)):'';
                dataParams.actualStartTime=dataParams.actualStartTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(dataParams.actualStartTime)):'';
                dataParams.actualEndTime=dataParams.actualEndTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(dataParams.actualEndTime)):'';
                this.$http.post('project-edit-task',dataParams).then((response)=>{
                     this.cancelEditTask();
                     this.getListData();
                 }).catch((error)=>{
                     this.$Notice.error({
                        title: error.message,
                     });
                })
          },
          scroll(event){
              let leftDetail=document.getElementById('vue-chart-left-detail-list');
              let chartDom=document.getElementById('vue-chart-right-draw-content');
              chartDom.scrollTop=leftDetail.scrollTop;
          },
          chartScroll(){
              let leftDetail=document.getElementById('vue-chart-left-detail-list');
              let chartDom=document.getElementById('vue-chart-right-draw-content');
              leftDetail.scrollTop=chartDom.scrollTop;
              if(chartDom.scrollLeft>=chartDom.clientWidth){
                  console.log('划到最右边了');
              }
            //   if(chartDom.scrollLeft<10){
            //       console.log('滑倒最左边了');
            //   }
          },
          submitSure(){
            this.$http.post('sure-sign-project',{propertyId:this.queryData.id}).then((response)=>{
                window.close();
                window.opener.location.reload();
                this.cancelSure();
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
                })
            },
            cancelSure(){
                this.openSure=!this.openSure;
            },
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
   .sure-sign{
        text-align: center;
        max-width: 300px;
        margin: 0 auto;
        line-height: 26px;
        font-size: 14px;
    }
</style>
