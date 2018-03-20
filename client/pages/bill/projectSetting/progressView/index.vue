<template>
    <div>
       
        <!-- 甘特图部分 -->
        <GanttChart type='view' :startTime="getStartDay()" :endTime="getEndDay()">
             <div class='chart-tab-left' slot="leftBar">
                <div class='chart-left'>
                    <Tabs size="small" value="name1" @on-click="tabsClick">
                        <TabPane label="待开业项目" name="name1">
                            <TableList
                                :listData="listData"
                                @rowClick="rowClick"
                                v-if="mask"
                            />
                        </TabPane>
                        <TabPane label="投拓期项目" name="name2">
                            <TableList
                                :listData="listData"
                                @rowClick="rowClick"
                                v-if="!mask"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </GanttChart>
        <!-- 左侧切换部分内容 -->
           
    
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
            todoData:[
                {name:'俊浩中牙膏公园你好好俊浩中牙膏公园你好好',communityName:'俊浩中牙膏公园skdjsjkjckjksjkvjcksjkvkdhdfkdsjhjhsdjkhjhsdjf',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            downData:[
                {name:'1',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            mask:true,
            params:{
                endTime:this.getEndDay(),
                startTime:this.getStartDay(),
                pageSize:4,
                page:1,
                status:'',
                taskTemplateIds:[]
            },
            difference:7,
            listData:[],
            mask:true,
            treeData:[],
            params:{
                page:1,
                pageSize:4,
                status:2,
                taskTemplateIds:[]
            }
        }
    },
    mounted(){
        this.getListData(this.params);
    },
    
    methods:{
      
        //获取进度列表数据
        getListData(params){
            this.$http.get('project-progress-list',params).then((response)=>{
                
            }).catch((error)=>{
                this.$Notice.error({
                   title: error.message,
                });
            })
        },
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
        },
        //tab切换
        tabsClick(key){
            if(key=='name2'){
                this.mask=false;
                this.params.status = 1;
                this.getListData();
            }else{
                this.mask=true;
                this.params.status = 2;
                 this.getListData();
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
        getAllData(){
            this.isLoading = true;
            this.$http.get('project-list-progress').then((response)=>{
                console.log(response,"pppppppp")
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
