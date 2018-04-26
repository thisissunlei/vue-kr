<template>
    <div >

        <!-- 甘特图部分 -->
        <GanttChart
            v-if = "!isLoading"
            :start="params.startTime"
            :end="params.endTime"
            :listData="listData"
            @rightOver="rightOver"
        >
             <div class='chart-inventory-left' slot="leftBar">
                    <div class='chart-left-table'>
                        <div class='view-table-list'>
                                 
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
                                />
                            </div>
                            <div class='view-bottom-more' v-if="listData.length" :style="{height:scrollWidth+'px'}"></div>
                        </div>
                    </div>
            </div>
        </GanttChart>

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
import ListTable from './list-table';
import GanttChart from './gantt-chart';
import Message from '~/components/Message';
import publicFn from '../publicFn';
import Vue from 'vue';

var allPage = 1;
var nowPage = 1;
var ganttChartScrollTop = 0;
export default {
    components:{
        GanttChart,
        ListTable,
        Message
    },
    data(){
        return{
            MessageType:'',
            openMessage:false,
            warn:'',
            id:'',
            editId:'',
            propertyId:'',
            getEdit:{},
            params:{
                endTime:this.getEndDay(11),
                startTime:this.getStartDay(),
                pageSize:15,
                page:nowPage,
                status:2,
                taskTemplateIds:'0,2,3,7,9,12,15,20,19,21,23,24,26,27,28,36,40,41,47'
            },
            minDay:'',
            maxDay:'',
            listData:[],
            scrollWidth:0,
            isLoading:false,
            upperError:false,

            tabValue:'name1'
        }
    },
    mounted(){
          this.listData=[
                {
                    "area":80483,"capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"location":"测试内容8q1z","name":"测试内容1kud","property":"测试内容j42r","propertyDesc":"测试内容d5d3","quotedPrice":"测试内容0qi2","recentEnd":67706,"recentStart":31706,"timeLine":[
                    {
                        "endDate":"1525017600000","startDate":"1524499200000","status":"0"
                    },
                    {
                        "endDate":"1526140800000","startDate":"1525104000000","status":"1"
                    },
                    {
                        "endDate":"1545017600000","startDate":"1526227200000","status":"0"
                    }
                    ],"type":"测试内容63t9","unitPrice":"测试内容6p1k"
                },
                {
                    "area":80483,"capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"location":"测试内容8q1z","name":"测试内容1kud","property":"测试内容j42r","propertyDesc":"测试内容d5d3","quotedPrice":"测试内容0qi2","recentEnd":67706,"recentStart":31706,"timeLine":[
                    {
                        "endDate":"1525017600000","startDate":"1524499200000","status":"1"
                    },
                    {
                        "endDate":"1526140800000","startDate":"1525104000000","status":"0"
                    },
                    {
                        "endDate":"1545017600000","startDate":"1526227200000","status":"0"
                    }
                    ],"type":"测试内容63t9","unitPrice":"测试内容6p1k"
                },
                {
                    "area":80483,"capacity":70101,"cityName":"测试内容nfhw","communityName":"测试内容7c4n","floor":76604,"location":"测试内容8q1z","name":"测试内容1kud","property":"测试内容j42r","propertyDesc":"测试内容d5d3","quotedPrice":"测试内容0qi2","recentEnd":67706,"recentStart":31706,"timeLine":[
                    {
                        "endDate":"1525017600000","startDate":"1524499200000","status":"DISABLE"
                    }
                    ],"type":"测试内容63t9","unitPrice":"测试内容6p1k"
                }
            ];
        //this.getListData(this.params);
        GLOBALSIDESWITCH("false");
        this.scrollWidth = utils.getScrollBarSize();
        this.leftOver();
        this.rightOver();
        setTimeout(() => {
              publicFn.windowResize();
        }, 400);
        window.onresize=function(){
            publicFn.windowResize();
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
                    this.params.startTime = publicFn.compareTime(this.params.startTime,response.data.firstStartTime);
                    var endObj = this.monthAdd(response.data.lastEndTime);
                    this.params.endTime=publicFn.compareEndTime(this.params.endTime,endObj.year+'-'+endObj.month+'-'+endObj.day);
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
        isHaver(arr,val){
            for(var i=0;i<arr.length;i++){
                if(arr[i].value==val){
                    return true;
                }
            }
            return false;
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
                var leftDom=document.getElementById('vue-chart-left-table-list');
                var chartDom=document.getElementById('vue-chart-right-draw-content');
                if(leftDom&&chartDom){
                    chartDom.scrollTop=this.scrollH;
                    leftDom.scrollTop=this.scrollH;
                }
            },50);
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
                day= publicFn.getMonthDayNum(year,month);
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
            ganttChartScrollTop = leftList.scrollTop;

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
            ganttChartScrollTop = chartDom.scrollTop;
        },
        //信息提示框
        onChangeOpen(data){
            this.openMessage=data;
        },
    }
}
</script>

<style lang="less" scoped>
    .chart-inventory-left{
        width:150px;
        border: 1px solid #F6F6F6;
        display:inline-block;
        border-bottom: none;
            .chart-left-table{
                .view-table-list{
                    width:100%;
                    height:100px;
                    line-height:100px;
                    border: 1px solid #F6F6F6;
                    border-right:none;
                    border-top: none;
                    border-left:none;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    font-weight: 500;
                    background:#fff;
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
        .bar{
            border-top: 1px solid #F6F6F6;
        }
    }



</style>
