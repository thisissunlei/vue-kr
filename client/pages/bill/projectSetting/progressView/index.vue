<template>
    <div>
       
        <!-- 甘特图部分 -->
        <GanttChart 
           type='view' 
           :startTime="params.startTime" 
           :endTime="params.endTime"
           @treeClick="treeClick"
           @scroll="rightScroll"
           :treeData="treeData"
           :listData="listData"
        >
             <div class='chart-tab-left' slot="leftBar">
                <div class='chart-left'>
                    <Tabs size="small" value="name1" @on-click="tabsClick">
                        <TabPane label="待开业项目" name="name1">

                            <div class='chart-left-table' v-if="mask">
                                 <div class='view-table-list'>
                                    <p>项目名称</p>
                                    <p>城市</p>
                                </div> 
                                <div @scroll="scroll" class='view-table-detail' id="vue-chart-left-table-list">
                                     <ListTable
                                        v-for="item in listData"
                                        :key="item.id"
                                        :data="item"
                                        test="PREPARE"
                                        @rowClick="rowClick"
                                    />
                                    <div :style="{height:scrollWidth+'px'}"></div>
                                    
                                </div>   
                            </div>

                        </TabPane>
                        <TabPane label="投拓期项目" name="name2">

                            <div class='chart-left-table' v-if="!mask">
                                 <div class='view-table-list'>
                                    <p>项目名称</p>
                                    <p>城市</p>
                                    <p>操作</p>
                                </div> 
                                <div @scroll="scroll" class='view-table-detail' id="vue-chart-left-table-list">
                                     <ListTable
                                        v-for="item in listData"
                                        :key="item.id"
                                        :data="item"
                                        test="INVEST"
                                        @rowClick="rowClick"
                                        @operationClick="operationClick"
                                    />
                                    <div :style="{height:scrollWidth+'px'}"></div>
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
import ListTable from './ListTable';
import GanttChart from '../ganttChart';
var isLoading = false;
var allPage = 1;
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
                endTime:this.getEndDay(10),
                startTime:this.getStartDay(),
                pageSize:6,
                page:1,
                status:2,
                taskTemplateIds:[]
            },
            treeParams:{
               statusType:"PREPARE" 
            },
            minDay:'',
            maxDay:'',
            listData:[],
            treeData:[],
            mask:true,
            scrollWidth:0,
        }

    },
    mounted(){
        this.getTreeData(this.treeParams);
        this.getListData(this.params);
        this.scrollWidth = utils.getScrollBarSize()
       
    },
    
    methods:{  
        //获取进度列表数据
        getListData(params,type){
          
            if(allPage<params.page){
                return;
            }
            isLoading = true;
            var data = Object.assign({},params);
            var startTime = data.startTime.split(" ")[0]+' 00:00:00';
            var endTime = data.endTime.split(" ")[0]+' 00:00:00';
            data.startTime = startTime;
            data.endTime = endTime;
            this.$http.get('project-progress-list',data).then((response)=>{
                console.log(response.data);
                if(type){
                    this.listData=this.listData.concat(response.data.items);
                }else{
                    this.listData=response.data.items;
                }
                
                if(response.data.hasTime){
                    this.minDay = this.getTimeToDay(response.data.firstStartTime);
                    this.maxDay =  this.getTimeToDay(response.data.lastEndTime);
                }
                allPage = response.data.totalPages;
                isLoading = false;
                this.params.page = response.data.page+1;
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        //获取甘特图任务数据
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
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/projectDetail?name=${item.name}&id=${item.id}&city=${item.cityName}&status=${this.params.status}`,'_blank');
        },
        //树
        treeClick(params){
            var treeArray=[];
            params.map((item,index)=>{
                treeArray.push(item.value);
            })
            this.params.taskTemplateIds=treeArray.join(',');
            this.getListData(this.params);
        },
        operationClick(item){
            this.cancelSure();
            this.id=item.id;
        },
        submitSure(){
            this.$http.post('sure-sign-project',{propertyId:this.id}).then((response)=>{
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
                this.mask=false;
                this.params.status = 1;
                this.params.page=1;
                this.getListData(this.params);
                this.treeParams.statusType='INVEST';
                this.getTreeData(this.treeParams);
            }else{
                this.mask=true;
                this.params.status = 2;
                this.params.page=1;
                this.getListData(this.params);
                this.treeParams.statusType='PREPARE';
                this.getTreeData(this.treeParams);
            }
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
                day= +start[2];
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
                if(isLoading){
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
            if(isRight<=0){
                
               if(isLoading ||endTime>=this.maxDay){
                   return;
               }
                this.addAfterMonthNum(this.params.startTime,2);

            }
            if(chartDom.scrollLeft<=0){
                if(isLoading ||startTime<=this.minDay){
                   return;
                }
                this.addBeforeMonthNum(this.params.endTime,2)

            }
            if(isBottom<=0){
                if(isLoading){

                   return;
                }
                this.getListData(this.params,true)
            }
        },
        //向前增加一个月
        addBeforeMonthNum(startTime,n){
            var allDay = startTime.split("-");
            var year = allDay[0],month=allDay[1];
            for (var i = 1; i <= n; i++) {
                month -=1;
                if(month<1){
                    month =  12 -month;
                    year -= 1;
                }
            }
            this.params.start = year + '-'+month+'-'+1;
            this.getListData(this.params)
        },
        // 向后加一个月
        addAfterMonthNum(endTime,n){
            var allDay = endTime.split("-");
            var year = allDay[0],month=allDay[1];
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
        width:246px;
        border: 1px solid #E1E6EB;
        display:inline-block;
        border-bottom: none;
        .chart-left{
            .ivu-tabs-nav{
                width:100%;
                height: 51px;
                padding-top: 8px;
                .ivu-tabs-ink-bar{
                    width:58px !important;
                    left: 31px;
                }
            }
            .chart-left-table{
                .view-table-list{
                    width:100%;
                    height:49px;
                    line-height:49px;
                    border: 1px solid #E1E6EB;
                    border-right:none;
                    border-top: none;
                    border-left:none;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #666666;
                    font-weight: 500;
                    display:table;   
                    p{
                        display:inline-block;
                        border-right:1px solid #E1E6EB;
                        width:33%;
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
                    border-bottom: solid 1px #E1E6EB;
                }
                ::-webkit-scrollbar {
                    width:0px;
                }
            }
        }
        .ivu-tabs-mini .ivu-tabs-tab{
            width:50%;
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: 14px;
        }

        .ivu-tabs-nav .ivu-tabs-tab-active{
            color: #4A90E2;

        }
        .bar{
            border-top: 1px solid #E1E6EB;
        }
    }
       
       
   
</style>
