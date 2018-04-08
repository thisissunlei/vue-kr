<template>
    <div>
       
        <!-- 甘特图部分 -->
        <GanttChart 
            v-if = "!isLoading"
            type='view' 
            :start="params.startTime" 
            :end="params.endTime"
            @treeClick="treeClick"
            @treeChange="treeChange"
            @rightOver="rightOver"
            :treeData="treeData"
            :listData="listData"
            :treeIds="treeIds"
        >
             <div class='chart-tab-left' slot="leftBar">
                <div class='chart-left'>
                    <Tabs size="small" :value="tabValue" @on-click="tabsClick">
                        <TabPane label="待开业项目" name="name1">

                            <div class='chart-left-table' v-if="mask">
                                 <div class='view-table-list'>
                                    <p>项目名称</p>
                                    <p style="border-right:none;">城市</p>
                                </div> 
                                <div                         
                                    @mouseover='leftOver'
                                    class='view-table-detail' 
                                    id="vue-chart-left-table-list"
                                >
                                    <div 
                                        v-if="!isLoading"
                                    >
                                        <ListTable
                                       
                                        v-for="item in listData"
                                        :key="item.id"
                                        :data="item"
                                        test="PREPARE"
                                        @rowClick="rowClick"
                                        
                                    />
                                    </div>
                                    
                                    <div class='view-bottom-more' v-if="listData.length" :style="{height:scrollWidth+'px'}"></div>
                                    
                                </div>   
                            </div>

                        </TabPane>
                        <TabPane label="投拓期项目" name="name2">

                            <div class='chart-left-table' v-if="!mask">
                                 <div class='view-table-list'>
                                    <p>项目名称</p>
                                    <p>城市</p>
                                    <!-- <p style="width:136px;">操作</p> -->
                                </div> 
                                <div 
                                    @mouseover='leftOver' 
                                    class='view-table-detail' 
                                    id="vue-chart-left-table-list"
                                >
                                    <div 
                                        v-if="!isLoading"
                                    >
                                        <ListTable
                                          
                                            v-for="item in listData"
                                            :key="item.id"
                                            :data="item"
                                            test="INVEST"
                                            @rowClick="rowClick"
                                            @operationClick="operationClick"
                                        />
                                    </div>
                                    <div class='view-bottom-more' v-if="listData.length" :style="{height:scrollWidth+'px'}"></div>
                                </div>   
                            </div>

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </GanttChart>
        <!-- 左侧切换部分内容 -->
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
    
    </div>

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import ListTable from './ListTable';
import GanttChart from '../GanttChart';
import Vue from 'vue';

var allPage = 1;
var nowPage = 1;
export default {
    components:{
        GanttChart,
        ListTable
    },
    data(){
        return{
            openSure:false,
            id:'',
            params:{
                endTime:this.getEndDay(24),
                startTime:this.getStartDay(),
                pageSize:15,
                page:nowPage,
                status:2,
                taskTemplateIds:''
            },
            minDay:'',
            maxDay:'',
            listData:[],
            treeData:[],
            mask:true,
            scrollWidth:0,
            isLoading:false,

            tabValue:'name1',

            treeMiddle:[],
            treeIds:''
        }

    },
    mounted(){
        this.getTreeData();
        this.scrollWidth = utils.getScrollBarSize();
        this.leftOver();
        this.rightOver();
        setTimeout(() => {
            return;
            var leftDom=document.getElementById('vue-chart-left-table-list');
            var rightDom = document.getElementById("vue-chart-right-draw-content");
            var clientHeight = document.documentElement.clientHeight;
            leftDom.style.maxHeight = clientHeight - 362+"px";
            rightDom.style.maxHeight = clientHeight - 362 +"px";
           
        }, 400);

        window.onresize=function(){
            var leftDom=document.getElementById('vue-chart-left-table-list');
            var rightDom = document.getElementById("vue-chart-right-draw-content");
            var clientHeight = document.documentElement.clientHeight;
            
            var dom = document.getElementById('layout-content-main');
            
            dom.style.height = document.documentElement.clientHeight-130 + "px"
            leftDom.style.maxHeight = clientHeight - 362+"px";
            rightDom.style.maxHeight = clientHeight - 362 +"px";
        }
    },
    
    methods:{
        leftOver(event){
            var leftDom=document.getElementById('vue-chart-left-table-list');
            var rightDom=document.getElementById('vue-chart-right-draw-content');
            if(leftDom&&rightDom){
                leftDom.addEventListener('scroll',this.scroll);
                rightDom.removeEventListener('scroll',this.rightScroll);
            }
        },
        rightOver(event){
            var rightDom=document.getElementById('vue-chart-right-draw-content');
            var leftDom=document.getElementById('vue-chart-left-table-list');
            if(rightDom&&leftDom){
                rightDom.addEventListener('scroll',this.rightScroll);
                leftDom.removeEventListener('scroll',this.scroll);
            }
        },
        
        //获取进度列表数据
        getListData(params,type){
            if(allPage<params.page){
                return;
            }
            this.isLoading = true;
            var data = Object.assign({},params);
            var startTime = data.startTime.split(" ")[0]+' 00:00:00';
            var endTime = data.endTime.split(" ")[0]+' 00:00:00';
            data.startTime = '';
            data.endTime = '';
            this.$http.get('project-progress-list',data).then((response)=>{
              
                this.listData=response.data.items;
               
                
                if(response.data.hasTime){
                    this.minDay = this.getTimeToDay(response.data.firstStartTime);
                    this.maxDay =  this.getTimeToDay(response.data.lastEndTime);
                    this.params.startTime = this.compareTime(this.params.startTime,this.minDay);
                    var endObj = this.monthAdd(response.data.lastEndTime);
                    this.params.endTime=this.compareEndTime(this.params.endTime,endObj.year+'-'+endObj.month+'-'+endObj.day);
                
                }
                var totalPages=response.data.totalPages;
                allPage = totalPages==0?1:totalPages;
                this.isLoading = false;
                this.params.page = response.data.page+1;
                
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
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
        compareTime(data1,data2){
            data1 = data1.replace(/-/g,'/');
            data2 = data2.replace(/-/g,'/');
            var data='';
            var startData=(new Date(data1+' 00:00:00')).getTime();
            var endData=data2;
            data=startData<endData?startData:endData;
            return dateUtils.dateToStr("YYYY-MM-DD",new Date(data)); 
        },

        compareEndTime(data1,data2){
            data1 = data1.replace(/-/g,'/');
            data2 = data2.replace(/-/g,'/');
            var data='';
            var startData=(new Date(data1+' 00:00:00')).getTime();
            var endData=(new Date(data2+' 00:00:00')).getTime();;
            data=startData>endData?startData:endData;
            return dateUtils.dateToStr("YYYY-MM-DD",new Date(data)); 
        },
       
        //获取甘特图任务数据
        getTreeData(){     
            this.$http.get('project-status-search').then((response)=>{
                var array=[];
                array.push(
                    {
                        label:'全部任务',
                        value:0,
                        t_id:0,
                        children:response.data.items
                    }
                );
                this.treeData=array;
                this.recursiveFn(this.treeData);
                this.params.taskTemplateIds=this.treeMiddle.join(',');
                this.treeIds=this.params.taskTemplateIds;
                this.getListData(this.params);
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
        //列表跳转详情
        rowClick(item){
            window.location.href=`./projectSetting/projectDetail?name=${item.name}&id=${item.id}&status=${this.params.status}`;
        },


        //树
        treeClick(params){
            var treeArray=[];
            if(!params.length){
                treeArray=this.treeData[0].checked?this.treeMiddle:[];
            }else{
                params.map((item,index)=>{
                  treeArray.push(item.value);
                })
            } 
            this.params.taskTemplateIds=treeArray.join(',');
            this.treeIds=this.params.taskTemplateIds?this.params.taskTemplateIds:'no';
            this.params.page=1;
            this.getListData(this.params);
        },
        treeChange(selectArr){
            this.nodeChecked(selectArr); 
        },
        nodeChecked(selectArr){
                var treeData = [].concat(this.treeData);
                for (let i = 0; i < treeData.length; i++) {
                    const element = treeData[i];
                    if(this.isHaver(selectArr,element.value)){
                        Vue.set(treeData[i],"checked",true);             
                    }else{
                        Vue.set(treeData[i],"checked",false);       
                    } 
                }
                this.treeData = [].concat(treeData);
        },
        isHaver(arr,val){
            for(var i=0;i<arr.length;i++){
                if(arr[i].value==val){
                    return true;
                }
            }
            return false;
        },


       
        operationClick(item){
            this.cancelSure();
            this.id=item.id;
        },
        submitSure(){
            this.$http.post('sure-sign-project',{propertyId:this.id}).then((response)=>{
                this.tabValue='name1';
                this.mask=true;
                this.params.page=1;
                this.params.status=2;
                this.getListData(this.params);
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
        //tab切换
        tabsClick(key){
            if(key=='name2'){
                this.tabValue=key;
                this.mask=false;
                this.params.status = 1;
                this.params.page=1;
                this.getListData(this.params);
            }else{
                this.tabValue=key;
                this.mask=true;
                this.params.status =2;
                this.params.page=1;
                this.getListData(this.params);
            }
            setTimeout(() => {
                var leftDom=document.getElementById('vue-chart-left-table-list');
                var rightDom = document.getElementById("vue-chart-right-draw-content");
                var clientHeight = document.documentElement.clientHeight;
                leftDom.style.maxHeight = clientHeight - 362+"px";
                rightDom.style.maxHeight = clientHeight - 362 +"px";
           
            }, 200);
        },
        //获取当月的天数
        getDayNum(year,month){
            var d= new Date(year, month, 0);  
            return d.getDate();   
        },
        //获取今天日期
        getStartDay(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            return today;
        },
        //结束日期
        getEndDay(n){
            var today =this.getStartDay();
            var start = today.split("-");
            var year = +start[0],
                month = +start[1],
                day= this.getDayNum(year,month);
            for(var i=0;i<n;i++){
              
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
        getDayToTime(str){
            return (new Date(str+' 00:00:00')).getTime();
        },
        getTimeToDay(date){
            return dateUtils.dateToStr("YYYY-MM-DD",new Date(date));
        },


        scroll(event){
            
            if(!this.params.startTime || !this.params.endTime){
                return;
            }
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            let leftList=document.getElementById('vue-chart-left-table-list');
            const isBottom = leftList.scrollHeight - leftList.clientHeight - leftList.scrollTop;
            chartDom.scrollTop = leftList.scrollTop;
            if(isBottom<=0){
                if(this.isLoading ){
                   return;
                }
                this.getListData(this.params,true)
            }
        },

       rightScroll(){
            if(!this.params.startTime || !this.params.endTime){
                return;
            }
            let leftList=document.getElementById('vue-chart-left-table-list');
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            const isBottom = chartDom.scrollHeight - chartDom.clientHeight - chartDom.scrollTop;
            const isRight = chartDom.scrollWidth - chartDom.clientWidth - chartDom.scrollLeft;
            leftList.scrollTop = chartDom.scrollTop;
            var startTime = this.getDayToTime(this.params.startTime);
            var endTime = this.getDayToTime(this.params.endTime);
            var minTime = this.getDayToTime(this.minDay);
            var maxTime = this.getDayToTime(this.maxDay);
            
            if(isRight<=0){
                
               
               if(this.isLoading ||endTime>=maxTime){
                   return;
               }
                this.addAfterMonthNum(this.params.endTime,2);

            }
            if(chartDom.scrollLeft<=5){
                if(this.isLoading ||startTime<=minTime){
                   return;
                }
                this.addBeforeMonthNum(this.params.startTime,2)

            }
            if(isBottom<=0){
                if(this.isLoading){

                   return;
                }
                
                this.getListData(this.params,true)
            }
        },
        //向前增加一个月
        addBeforeMonthNum(startTime,n){
            var allDay = startTime.split("-");
            var year = Number(allDay[0]),month=Number(allDay[1]);
            for (var i = 1; i <= n; i++) {
                month -=1;
                if(month<1){
                    month =  12 -month;
                    year -= 1;
                }
            }
            this.params.startTime = year + '-'+month+'-'+1;
            this.getListData(this.params)
        },
        // 向后加一个月
        addAfterMonthNum(endTime,n){
            var allDay = endTime.split("-");
            var year = Number(allDay[0]),month=Number(allDay[1]);
            for (var i = 1; i <= n; i++) {
                month +=1;
                if(month>12){
                    month = month - 12;
                    year += 1;
                }
            }
            this.params.endTime = year + '-'+month+'-'+1;
            this.getListData(this.params)
        }
    }
}
</script>

<style lang="less">
    .sure-sign{
        text-align: center;
        max-width: 300px;
        margin: 0 auto;
        line-height: 26px;
        font-size: 14px;
    }
    .chart-tab-left{
        width:346px;
        border: 1px solid #F6F6F6;
        display:inline-block;
        border-bottom: none;
        .chart-left{
            .ivu-tabs-nav{
                width:100%;
                height: 51px;
                padding-top: 8px;
                .ivu-tabs-ink-bar{
                    // width:58px !important;
                    // left: 56px;
                    top: auto;
                }
            }
            .chart-left-table{
                .view-table-list{
                    width:100%;
                    height:49px;
                    line-height:49px;
                    border: 1px solid #F6F6F6;
                    border-right:none;
                    border-top: none;
                    border-left:none;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #666666;
                    font-weight: 500;
                    display:table;
                    background:#FAFCFF;   
                    p{
                        display:inline-block;
                        border-right:1px solid #F6F6F6;
                        width:50%;
                        text-align: center;
                        display:table-cell;
                        &:nth-child(3){
                            border-right:none;
                        }
                    }
                }
                .view-table-detail{
                    width:100%;
                    max-height:500px;
                    overflow: auto;
                    border-bottom: solid 1px #F6F6F6;
                    background: #F6F6F6;
                }
                ::-webkit-scrollbar {
                    width:0px;
                }
                .view-bottom-more{
                    background:#fff;
                }
            }
        }
        .ivu-tabs-mini .ivu-tabs-tab{
            width:50%;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #666;
        }
       .ivu-tabs-mini .ivu-tabs-tab-active{
           font-weight:bolder;
        }

        .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #4A90E2;

        }
        .bar{
            border-top: 1px solid #F6F6F6;
        }
    }
       
       
   
</style>
