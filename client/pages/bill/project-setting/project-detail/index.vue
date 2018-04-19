<template>
    <div>
        <div class='edit-left-bar'>
            <div class='detail-title'>
                <div class='title-left'>
                    <div class='title-name-line'><span class='title-name'>项目档案</span></div>
                    <div class='title-bread'>
                        <Breadcrumb separator=">">
                            <BreadcrumbItem to="/bill/project-setting">开业进度总览</BreadcrumbItem>
                            <BreadcrumbItem><span @click="currentClick" style="cursor:pointer;">{{queryData.name}}</span></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div class='title-right'><Button type="primary" @click="watchTask">查看编辑记录</Button></div>
                <!-- <div class='title-right' v-if="signMask" style="margin-right:20px;"><Button type="primary" @click="cancelSure">确认合同已签署</Button></div> -->
            </div>
            <GanttChart
                v-if="!isLoading "
                :data="listData"
                :treeData="treeData"
                type="edit"
                :start="startTime"
                :end="endTime"
                :treeIds="taskIds"
                @rightOver="rightOver"
                @treeClick="treeClick"
                @editClick="editTask"
            >
                <div class='detail-detail' slot="leftBar">
                    <DetailTaskList
                        :data="listData"
                        @addClick="addTask"
                        @editClick="editTask"
                        @leftOver="leftOver"
                        @iconClick="iconClick"
                        :scrollWidth="scrollWidth"
                    />
                </div>
            </GanttChart>

        </div>

        <Drawer 
            :openDrawer="openEditTask"
            iconType="view-icon"
            :close="cancelEditTask"
            width="735"
        >   
            <ObjectDetailTitle slot="title" :taskStatus="taskStatus" :data="getEdit" />
            <EditTask 
                :id="editId"  
                @dataChange="dataChange" 
                v-if="openEditTask" 
                :getEdit="Object.assign({},getEdit)"
            />
        </Drawer>

        <Modal
            v-model="openWatch"
            title="查看记录"
            width="660"
        >
                <WatchRecord 
                    :id="queryData.id"
                    :watchRecord="watchRecord" 
                    @searchClick="searchClick" 
                    :watchTotalCount="watchTotalCount"
                    :watchPage = "watchPage"
                />
                <div slot="footer" style="text-align:center;">
                    <Button type="primary" @click="cancelWatch" style="width: 90px;height: 34px;">确定</Button>
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
            <div class='sure-sign'>“确认已签署合同”后，该项目进入“待开业项目”列表并自动固化后续任务计划时间</div>
            <div slot="footer">
                <Button type="primary" @click="submitSure()">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="cancelSure">取消</Button>
            </div>
        </Modal>

        <Modal
            v-model="openStar"
            title="提示"
            width="440"
            >
            <div class='sure-sign' v-if="grayStar==0">设置为“管理层关注”任务后，该任务会在项目总览中显示</div>
            <div class='sure-sign' v-if="grayStar==1">取消设置“管理层关注”任务后，该任务不会在项目总览中显示</div>
            <div slot="footer">
                <Button type="primary" @click="submitStar()">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="cancelStar">取消</Button>
            </div>
        </Modal>

        <Message
            :type="MessageType"
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onChangeOpen"
        />
    </div>
</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import AddTask from './add-task';
import EditTask from './edit-task';
import WatchRecord from './watch-record';
import DetailTaskList from './detail-task-list';
import GanttChart from '../gantt-chart';
import Message from '~/components/Message';
import Vue from 'vue';
import publicFn from '../publicFn';
import Drawer from '~/components/Drawer';
import ObjectDetailTitle from './object-detail-title';
var ganttChartScrollTop = 0;


export default {
    components:{
        AddTask,
        EditTask,
        WatchRecord,
        DetailTaskList,
        GanttChart,
        Message,
        Drawer,
        ObjectDetailTitle
    },
    data(){
        return{
            queryData:{},
            listData:[],
            openMessage:false,
            openAddTask:false,
            openEditTask:false,
            openWatch:false,
            openDelete:false,
            openStar:false,
            upperError:false,
            addData:{},
            editData:{},
            getEdit:{},
            addId:'',
            editId:'',
            parentId:'',
            objectId:'',
            params:{
                page:1,
                pageSize:15
            },
            watchParams:{
                endTime:'',
                id:0,
                startTime:'',
                updator:'',
                page:1,
                pageSize:10,
                totalPages:1,
            },
            difference:7,
            endTime:this.getEndDay(11),
            watchRecord:[],
            startTime:this.getStartDay(),
            isLoading:true,
            taskStatus:'',

            treeData:[],
            signMask:false,
            openSure:false,
            scrollWidth:0,

            ids:'',
            MessageType:'',
            warn:'',

            scrollH:'',
            //树组件传參
            taskIds:'',

            //星星初始化
            grayStar:0,
            treeMiddle:[],
            //任务项枚举
            taskList:[],
            watchTotalCount:1,
            watchPage:1,
        }
    },
    created(){
        this.queryData=this.$route.query;
    },
    mounted(){
         this.scrollWidth= utils.getScrollBarSize();
         GLOBALSIDESWITCH("false");
         this.signMask=this.queryData.status==1?true:false;

         this.leftOver();
         this.rightOver();
         this.getSelectData();
         setTimeout(() => {
            var leftDom=document.getElementById('vue-chart-left-detail-list');
            var rightDom = document.getElementById("vue-chart-right-draw-content");
            var clientHeight = document.documentElement.clientHeight;
            if(leftDom){
                leftDom.style.maxHeight = clientHeight - 362+"px";
            }
            if(rightDom){
                rightDom.style.maxHeight = clientHeight - 362 +"px";
            }
         }, 200);
         window.addEventListener('resize',()=>{
            var leftDom=document.getElementById('vue-chart-left-detail-list');
            var rightDom = document.getElementById("vue-chart-right-draw-content");
            var clientHeight = document.documentElement.clientHeight;
            var dom = document.getElementById('layout-content-main');
            dom.style.height = document.documentElement.clientHeight-130 + "px"
            leftDom.style.maxHeight = clientHeight - 362+"px";
            rightDom.style.maxHeight = clientHeight - 362 +"px";
         },false)
    
    },
    methods:{
        leftOver(event){
            var leftDom=document.getElementById('vue-chart-left-detail-list');
            var rightDom=document.getElementById('vue-chart-right-draw-content');
            if(leftDom&&rightDom){
                leftDom.addEventListener('scroll',this.scroll);
                rightDom.removeEventListener('scroll',this.chartScroll);
            }
        },
        //查看记录页面搜索被点击
        searchClick(params){
           
            this.watchParams = Object.assign({},params);
            this.getWatchData(this.watchParams);
           
        },
        selectFormat(data){
            var dataArr =  data.map((item)=>{

                item.label = item.desc;
                item.t_id = item.code;
                return item;
            })
            this.taskList = [].concat(dataArr);

            this.initTree();

        },
        getSelectData(){

            this.$http.post('get-enum-all-data',{
                enmuKey:'com.krspace.erp.api.enums.pm.PmDepartment'
            }).then((response)=>{
               this.selectFormat(response.data)

            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
        rightOver(event){
            var rightDom=document.getElementById('vue-chart-right-draw-content');
            var leftDom=document.getElementById('vue-chart-left-detail-list');
            if(rightDom&&leftDom){
                rightDom.addEventListener('scroll',this.chartScroll);
                leftDom.removeEventListener('scroll',this.scroll);
            }
        },

        initTree(){
            this.treeMiddle=[];
            var array=[];
            array.push(
                {
                    label:'全部任务',
                    value:'-ALL-',
                    t_id:'-ALL-',
                    children:this.taskList
                }
            );
            this.treeData=array;
            this.recursiveFn(this.treeData);
            this.params.departments=this.treeMiddle.join(',');
            this.taskIds=this.treeMiddle.join(',');
            this.ids=this.treeMiddle.join(',');
            this.getListData(this.params.departments);
        },
        iconClick(id,mask){
           this.editId=id;
           this.grayStar=mask;
           this.cancelStar();
        },
        currentClick(){
           this.initTree();
        },
        cancelStar(){
            this.openStar=!this.openStar;
        },
        submitStar(){
            var params={
                id:this.editId,
                focus:this.grayStar==1?0:1
            }
            this.$http.post('project-detail-star',params).then((response)=>{
                this.cancelStar();
                this.MessageType="success";
                this.openMessage=true;
                this.warn="设置成功";
                this.getListData(this.ids);
            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
        //获取列表数据
        getListData(ids){
            let params={
                propertyId:this.queryData.id,
                departments:ids?ids:''
            }
            params.departments = params.departments.replace('-ALL-,','');
            this.isLoading = true;
            this.$http.get('project-list-task',params).then((response)=>{
                this.listData=response.data.items;
                if(response.data.hasTime){
                    this.startTime = publicFn.compareTime(this.startTime,response.data.firstStartTime);
                    var endObj = this.monthAdd(response.data.lastEndTime);
                    this.endTime=publicFn.compareEndTime(this.endTime,endObj.year+'-'+endObj.month+'-'+endObj.day);
                }
                this.isLoading = false;
                this.scrollPosititon();
                 setTimeout(() => {
                    var leftDom=document.getElementById('vue-chart-left-detail-list');
                    var rightDom = document.getElementById("vue-chart-right-draw-content");
                    var clientHeight = document.documentElement.clientHeight;
                    if(leftDom){
                        leftDom.style.maxHeight = clientHeight - 362+"px";
                    }
                    if(rightDom){
                        rightDom.style.maxHeight = clientHeight - 362 +"px";
                    }
                }, 200);

            }).catch((error)=>{
                this.$Notice.error({
                 title: error.message,
                });
            })
        },
        setTime(old,now){
            var oldTime = new Date('')
        },
         setScrollTop(){
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            chartDom.scrollTop = ganttChartScrollTop;
        },
        monthAdd(num){
            var endTime = dateUtils.dateToStr("YYYY-MM-DD",new Date(num));
            var endArr = endTime.split("-");
            var endObj = {
                year:+endArr[0],
                month:+endArr[1],
                day:+endArr[2]
            }
            endObj.month+=1;
            if(endObj.month>12){
                endObj.month = endObj.month - 12;
                endObj.year = endArr.year+1;
            }
            return endObj;
        },
         //获取查看编辑记录
        getWatchData(params){
            var data= Object.assign({},params)
            this.$http.get('watch-edit-record',data).then((response)=>{
                this.watchRecord=response.data.items;
                this.watchPage = response.data.page;
                this.watchTotalCount = response.data.totalCount;
                
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
                Vue.set(item,"checked",true);
                Vue.set(item,"expand",true);
                this.treeMiddle.push(item.value)
                if(item.children&&item.children.length){
                    this.recursiveFn(item.children);
                }
            })
            return data;
        },

        //树点击事件
        treeClick(params){
            var treeArray=[];
            params.map((item,index)=>{
                treeArray.push(this.fnTree(item.value,this.treeData));
            })
            var middle=treeArray.join(',');
            var ids=middle.split(',');
            var res = [];
            ids.map((item,index)=>{
                var current = item;
                if (res.indexOf(current) === -1&&item!='false') {
                    res.push(current)
                }
            })
            this.ids=res.join(',');
            this.taskIds=res.join(',')?res.join(','):'no';
            this.getListData(this.ids);
        },

        //递归找父级
        fnTree(id,data){
            var cityLable = '';
            for(var i=0;i<data.length;i++){
                let item = data[i];
                cityLable = item.value;
                if(!item.children && item.value == id ){
                        this.key = item.value;
                        cityLable = item.value;
                        return cityLable;
                }else{
                    if(item.children){
                        let text = this.fnTree(id,item.children);
                        if(text){
                            return cityLable+=','+text;
                        }
                    }
                }
            }
            return false;
        },

         //获取今天日期
        getStartDay(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            return today;
        },
        getEndDay(n){
            var today =this.getStartDay();
            var start = today.split("-");
            var year = +start[0],
                month = +start[1],
                day= +start[2];
            for(var i=0;i<n;i++){
                if(month > 12){
                    month = month-12;
                    year += 1;
                }
                month ++;
            }
            if(month > 12){
                month = month-12;
                year += 1;
            }

            return year+"-"+month+"-"+day;

        },

        //打开新建任务
        addTask(id){
            this.cancelAddTask();
            this.addId=id;
        },
        cancelAddTask(){
            this.openAddTask=!this.openAddTask;
        },
        cancelEditTask(){
            this.openEditTask=!this.openEditTask;
        },
        //打开编辑任务
        editTask(id,callback){
            this.editId=id;
            this.$http.get('project-get-task',{id:id}).then((response)=>{
                var data = Object.assign({},response.data)
               
                data.planStartTime=this.timeApplyFox(data.planStartTime,true);
                data.planEndTime=this.timeApplyFox(data.planEndTime,true);
                data.actualStartTime=this.timeApplyFox(data.actualStartTime,true);
                data.actualEndTime=this.timeApplyFox(data.actualEndTime,true)
                data.focus=data.focus==1?'1':'0';
                this.getEdit=Object.assign({},data);
                this.taskStatus = data.taskStatus;
                console.log(this.taskStatus,"pppppp");
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
        //取消查看任务
        cancelWatch(){
           
            
            this.openWatch=!this.openWatch;
        },
        //打开查看任务
        watchTask(){
            this.watchParams.id = this.queryData.id;
            this.getWatchData(this.watchParams);
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
                this.getListData(this.ids);

                this.MessageType="success";
                this.openMessage=true;
                this.warn="删除成功";
                this.scrollPosititon();
            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
        //新建对象传递校验
        onAddChange(params,error){
            this.upperError=error;
            this.addData=params;
        },
        //编辑对象传递校验
        dataChange(params){ 
            var data = Object.assign({},params);
            this.submitEditTask(data)
        
           
        },
        
          //编辑任务提交
        submitEditTask(params){
            var dataParams = Object.assign({},params);
            dataParams.id=this.editId;
            dataParams.propertyId=this.queryData.id;
            dataParams.planStartTime=this.timeApplyFox(dataParams.planStartTime);
            dataParams.planEndTime=this.timeApplyFox(dataParams.planEndTime);
            dataParams.actualStartTime=this.timeApplyFox(dataParams.actualStartTime);
            dataParams.actualEndTime=this.timeApplyFox(dataParams.actualEndTime);
            this.$http.post('project-edit-task',dataParams).then((response)=>{
                this.getListData(this.ids);

                if(response.code>1){
                    this.cancelSure();
                }else{
                    this.MessageType="success";
                    this.openMessage=true;
                    this.warn="编辑成功";
                }
                this.editTask(this.editId,()=>{});
                this.scrollPosititon();
            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
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
        scrollPosititon(){
            setTimeout(() => {
                let leftDetail=document.getElementById('vue-chart-left-detail-list');
                let chartDom=document.getElementById('vue-chart-right-draw-content');
                if(leftDetail&&chartDom){
                    chartDom.scrollTop=this.scrollH;
                    leftDetail.scrollTop=this.scrollH;
                }
            },50);
        },
        scroll(event){
            let leftDetail=document.getElementById('vue-chart-left-detail-list');
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            chartDom.scrollTop=leftDetail.scrollTop;
            this.scrollH=leftDetail.scrollTop;
            ganttChartScrollTop = leftDetail.scrollTop;
        },
        chartScroll(){

            let leftDetail=document.getElementById('vue-chart-left-detail-list');
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            leftDetail.scrollTop=chartDom.scrollTop;
            this.scrollH=chartDom.scrollTop;
            ganttChartScrollTop=chartDom.scrollTop;
        },
        submitSure(){
            let params={
                id:this.editId,
                propertyId:this.queryData.id
            }
            this.$http.post('sure-sign-project',params).then((response)=>{
                this.cancelSure();
                this.getListData(this.ids);
            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
        //信息提示框
        onChangeOpen(data){
            this.openMessage=data;
        },
        cancelSure(){
            this.openSure=!this.openSure;
        },
     }
}
</script>

<style lang="less">
   .edit-left-bar{

       width:100%;
       background: #fff;
       display:inline-block;
       .detail-title{
           background: #F5F6FA;
           height:50px;
           .title-left{
                display:inline-block;
                margin-top: 5px;
                .title-name-line{
                    display:inline-block;
                    padding-right:6px;
                    height:14px;
                    line-height: 14px;
                    border-right:2px solid #999;
                    margin-right:6px;
                    .title-name{
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #666666;
                    }
                }
                .title-bread{
                    display:inline-block;
                    .ivu-breadcrumb .ivu-breadcrumb-item-link{
                        color:#499df1;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .ivu-breadcrumb .ivu-breadcrumb-item-separator{
                        font-size: 14px;
                        color: #2A2A2A;
                        font-family: PingFangSC-Medium;
                        margin: 0 6px 0 3px;
                    }
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
