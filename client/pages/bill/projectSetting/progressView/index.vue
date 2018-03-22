<template>
    <div>
       
        <!-- 甘特图部分 -->
        <GanttChart 
           type='view' 
           :startTime="this.getStartDay()" 
           :endTime="this.getEndDay()"
           @scroll="chartScroll"
           :treeData="treeData"
           :listData="listData"
        >
             <div class='chart-tab-left' slot="leftBar">
                <div class='chart-left'>
                    <Tabs size="small" value="name1" @on-click="tabsClick">
                        <TabPane label="待开业项目" name="name1">
                            <TableList
                                :listData="listData"
                                test="PREPARE"
                                @rowClick="rowClick"
                                @scroll="scroll"
                                v-if="mask"
                            />
                        </TabPane>
                        <TabPane label="投拓期项目" name="name2">
                            <TableList
                                :listData="listData"
                                test="INVEST"
                                @rowClick="rowClick"
                                @operationClick="operationClick"
                                @scroll="scroll"
                                v-if="!mask"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </GanttChart>
        <!-- 左侧切换部分内容 -->
        <Modal
            v-model="openSure"
            title="添加任务"
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

import TableList from './tableList';
import GanttChart from '../ganttChart';
export default {
    components:{
        TableList,
        GanttChart
    },
    data(){
        return{
            difference:7,
            openSure:false,
            id:'',
            params:{
                endTime:this.getEndDay()+' 00:00:00',
                startTime:this.getStartDay()+' 00:00:00',
                pageSize:2,
                page:1,
                status:2,
                taskTemplateIds:[]
            },
            treeParams:{
               statusType:"PREPARE" 
            },
           
            listData:[],
            treeData:[],
            mask:true,
        }
    },
    mounted(){
        this.getTreeData(this.treeParams);
        this.getListData(this.params);
    },
    updated(){
        if(this.listData.length){
            this.listData.map((item,index)=>{
                 var leftDom = document.querySelectorAll('li[data-box-id="'+item.id+'"]')[0];
                 var rightDom= document.querySelectorAll('div[data-article-id="'+item.id+'"]')[0];
                 if(leftDom&&rightDom){
                    if(leftDom.offsetHeight>rightDom.offsetHeight){
                        rightDom.style.height=leftDom.offsetHeight+'px';
                    }else{
                        leftDom.style.height=rightDom.offsetHeight+'px';
                    }
                 }
            })
        }
    },
    methods:{  
        //获取进度列表数据
        getListData(params){
            this.$http.get('project-progress-list',params).then((response)=>{
                this.listData=response.data.items;
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
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/projectDetail?name=${item.name}&id=${item.id}&city=${item.cityName}`,'_blank');
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
                this.getListData(this.params);
                this.treeParams.statusType='INVEST';
                this.getTreeData(this.treeParams);
            }else{
                this.mask=true;
                this.params.status = 2;
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
        getEndDay(){
           
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
        // 简单的防抖动函数
         throttle(func,delay) {
            var timer = null;
            var startTime = Date.now();

            return function(){
                var curTime = Date.now();
                var remaining = delay-(curTime-startTime);
                var context = this;
                var args = arguments;

                clearTimeout(timer);
                if(remaining<=0){
                    func.apply(context,args);
                    startTime = Date.now();
                }else{
                    timer = setTimeout(func,remaining);
                }
            }
        },
        realFunc(){
           this.params.page+=1;
           this.getListData(this.params);
        },
        scrollBottom(dom){
                var htmlHeight = dom.scrollHeight;
                var clientHeight = dom.clientHeight;
                var scrollTop = dom.scrollTop;
                if(scrollTop+clientHeight==htmlHeight){
                     this.throttle(this.realFunc(),1000)
                }
        },
        scroll(event){
            let leftList=document.getElementById('vue-chart-left-table-list');
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            chartDom.scrollTop=leftList.scrollTop;
            this.scrollBottom(leftList);
        },
        chartScroll(){
            let leftList=document.getElementById('vue-chart-left-table-list');
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            leftList.scrollTop=chartDom.scrollTop;
            this.scrollBottom(chartDom);
            if(chartDom.scrollLeft>=chartDom.clientWidth){
                
            }
            // if(chartDom.scrollLeft<10){
            //       console.log('滑倒最左边了');
            // }
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
