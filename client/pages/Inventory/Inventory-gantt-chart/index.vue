<template>
    <div>
        <Loading v-if = "isLoading"/>
        <!-- 甘特图部分 -->
        <GanttChart
            v-if = "!isLoading"
            :start="params.lineStartDate"
            :end="params.lineEndDate"
            :endPosition="endPosition"
            :searchParams="params"
            :listData="listData"
            @rightOver="rightOver"
            @lastTurnPage="lastTurnPage"
            @nextTurnPage="nextTurnPage"
            :head="head"
            :left="left"
            :width="width"
            :identify="identify"
            :sideBar="sideBar"
        >
             <div slot="sort" style="display:inline-block;">
                 <Select
                    v-model="sortType"
                    @on-change="sortChange"
                    style="width:170px;margin-right:20px;text-align:left;color:#666;"
                >
                    <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
             </div>
             <div class='chart-inventory-left' slot="leftBar">
                    <div class='chart-left-table'>
                        <div :class="head?'view-table-list table-list-fixed':'view-table-list'">
                            <span class='table-date'>日期</span>
                            <div class='table-single'></div>  
                            <span class='table-product'>商品</span>
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
                                    v-for="(item,index) in listData"
                                    :key="index"
                                    :data="item"
                                    :index="index"
                                    :allData="listData"
                                />
                            </div>
                            <div class='view-bottom-more' v-if="listData.length" :style="{height:scrollWidth+'px'}"></div>
                        </div>
                    </div>
            </div>
        </GanttChart>

        <div style="float: right;margin: 15px 0 20px 0;marginRight:25px;">
            <Page :total="totalCount" :page-size='100' show-total show-elevator @on-change="onPageChange">
                <div slot>
                    共{{totalCount}}条商品
                </div>
            </Page>
        </div>

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
import Loading from '~/components/Loading';
import Message from '~/components/Message';
import publicFn from '../publicFn';
import Vue from 'vue';

var allPage = 1;
var nowPage = 1;
var ganttChartScrollTop = 0;
export default {
    props:{
        tabForms:{
            type:Object,
            default:{}
        },
        identify:{
           type:String,
           default:''
       }
    },
    components:{
        GanttChart,
        ListTable,
        Message,
        Loading
    },
    data(){
        return{
            MessageType:'',
            openMessage:false,
            warn:'',
            id:'',
            params:this.paramsSwitch(),
            //minDay:'',
            //maxDay:'',
            listData:[],
            scrollWidth:0,
            isLoading:false,
            totalCount:0,
            
            //最后一天定位
            endPosition:'today',
            //头部固定
            head:false,
            width:'',
            left:'',

            sideBar:true,
            //排序下拉
            sortList:[],
            sortType:'default'
        }
    },
    mounted(){
        var dom=document.getElementById('layout-content-main');
        var domContent=document.getElementById('vue-chart-right-draw-content');
        this.scrollWidth = utils.getScrollBarSize();
        if(domContent){
            this.width=domContent.getBoundingClientRect().width;
            this.left=domContent.getBoundingClientRect().left;
        }
        dom.addEventListener("scroll",this.onScrollListener);
        window.addEventListener('resize',this.onResize);  
        var _this=this;
        LISTENSIDEBAROPEN(function (params) {
            _this.sideBar=params;
        })
        this.commonParams('today');
        this.leftOver();
        this.rightOver();
        this.getSelectData();
    },
    watch:{
        tabForms:function(val){
            this.params=Object.assign({},this.paramsSwitch()); 
            this.endPosition='today';
            this.commonParams('today');
        },
        sideBar:function(val){
            this.onScrollListener();
        }
    },
    destroyed(){
        var dom=document.getElementById('layout-content-main');
        dom.removeEventListener("scroll",this.onScrollListener);
        window.removeEventListener('resize',this.onResize);  
    },
    methods:{
        getSelectData(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.op.api.enums.inventory.OrderType'
            }).then((response)=>{
               this.sortList=response.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //排序
        sortChange(param){
           this.commonParams();
        },
        //窗口
        onResize(){
            this.onScrollListener();
        },
        //滚动监听
        onScrollListener(){   
            var dom=document.getElementById('layout-content-main');  
            var domContent=document.getElementById('vue-chart-right-draw-content');
            var tableDom=document.getElementById('vue-chart-left-table-list');

            if(domContent){
                this.width=domContent.getBoundingClientRect().width;
                this.left=domContent.getBoundingClientRect().left;
            }   
            
            if(dom.scrollTop>321){
                this.head=true;
                if(domContent&&tableDom){
                    domContent.style.paddingTop="101px";
                    tableDom.style.paddingTop="101px";
                }
            }else{
                this.head=false;  
                if(domContent&&tableDom){
                    domContent.style.paddingTop="0px";
                    tableDom.style.paddingTop="0px";
                }
            }
        },
        //极限时间
        limitTime(){
            var start = this.params.lineStartDate;
            var startArr = start.split('-');
            /*向前三个月*/
            var dayMonth=+startArr[1]-3;
            var dayYear=+startArr[0];
            if(dayMonth<=0){
                dayYear-=1;
                dayMonth=dayMonth+12;
            }
            if(dayMonth<10){
                dayMonth='0'+dayMonth
            }
            /*向前三个月*/
            return dayYear+'-'+dayMonth+ '-' +'01';
        },
        //提取公共
        commonParams(param){
            if(param=='today'){
                this.params.lineStartDate=this.limitTime();
            } 
            var params=Object.assign({},this.params);
            params.lineStartDate=params.lineStartDate+' 00:00:00';
            params.lineEndDate=params.lineEndDate+' 00:00:00';
            this.head=false;
            this.getListData(params);
        },
        //格式转换
        dateSwitch(data){
            if(data){
                return utils.dateCompatible(data);
            }else{
                return '';
            }
        },
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
        paramsSwitch(){
            var params=Object.assign({},this.tabForms);
            params.page=1;
            params.pageSize=100;
            if(this.identify=='daily'){
                delete params.startDate;
                delete params.endDate;
                params.inventoryDate=this.dateSwitch(params.inventoryDate);
                params.lineStartDate=params.inventoryDate?params.inventoryDate.split(' ')[0]:this.getStartDay();
            }else{
                delete params.inventoryDate;
                params.startDate=this.dateSwitch(params.startDate);
                params.endDate=this.dateSwitch(params.endDate);
                params.lineStartDate=params.startDate?params.startDate.split(' ')[0]:this.getStartDay();
            }
            params.lineEndDate=this.getEndDay(8,params.lineStartDate);
            return params;
        },
        lastTurnPage(start){       
            var dayTime=start.split('-');
            var dayYear=+dayTime[0],dayMonth=+dayTime[1],dayDay=+dayTime[2];
            var yearRender,monthRender,dayRender;
            if(dayMonth==1){
                monthRender=12;
                yearRender=dayYear-1;
                dayRender=publicFn.getMonthDayNum(yearRender,monthRender);
            }else{
                monthRender=dayMonth-1;
                yearRender=dayYear;
                dayRender=publicFn.getMonthDayNum(yearRender,monthRender);
            }

            this.params.lineEndDate=yearRender+'-'+monthRender+'-'+dayRender;
            this.params.lineStartDate=this.getLastTime(11,yearRender,monthRender,dayRender);
            this.fixLeftRight('last',yearRender,monthRender,dayRender);
        },
        //固定左边还是右边
        fixLeftRight(param,year,month,day){
            var currentDate=this.params.inventoryDate?this.params.inventoryDate:this.params.startDate;
            var currentEnd=new Date(currentDate).getTime();
            var lineStart=new Date(this.params.lineStartDate).getTime();
            var lineEnd=new Date(this.params.lineEndDate).getTime();
            if(lineStart<currentEnd&&currentEnd<lineEnd){
                if(param=='last'){
                    this.params.lineStartDate=this.getLastTime(8,year,month,day);
                }else if(param=='next'){
                    this.params.lineStartDate=currentDate;
                    this.params.lineEndDate=this.getEndDay(8,currentDate);
                }
                this.endPosition='today';
                this.commonParams('today'); 
            }else if(param=='last'){
                this.endPosition='end';
                this.commonParams('end');
            }else if(param=='next'){
                this.endPosition='start';
                this.commonParams('start');
            }
        },
        getLastTime(n,year,month,day){
            for(var i=0;i<n;i++){
                if(month <=0){
                    month = month+12;
                    year -= 1;
                }
                month --;
            }
            day= publicFn.getMonthDayNum(year,month);
            return year+"-"+month+"-"+1;
        },
        nextTurnPage(end){
            var dayTime=end.split('-');
            var dayYear=+dayTime[0],dayMonth=+dayTime[1],dayDay=+dayTime[2];
            var yearRender,monthRender,dayRender;
            if(dayMonth==12){
                monthRender=1;
                yearRender=dayYear+1;
                dayRender=publicFn.getMonthDayNum(yearRender,monthRender);
            }else{
                monthRender=dayMonth+1;
                yearRender=dayYear;
                dayRender=publicFn.getMonthDayNum(yearRender,monthRender);
            }
            this.params.lineStartDate=yearRender+'-'+monthRender+'-'+1;
            this.params.lineEndDate=this.getEndDay(11,this.params.lineStartDate);
            this.fixLeftRight('next');
        },
        //获取进度列表数据
        getListData(params,type){
            var url=this.identify=='daily'?'getDailyTimeLine':'getOptionalTimeLine';
            this.isLoading = true;
            var data = Object.assign({},params);
            this.$http.get(url,data).then((response)=>{
                this.listData=response.data.items;
                this.totalCount=response.data.totalCount;
                this.isLoading = false;
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
        getEndDay(n,startParam){
            var today =startParam?startParam:this.getStartDay();
            var start = today.split("-");
            var year = +start[0],
                month = +start[1];
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

            var day= publicFn.getMonthDayNum(year,month);

            return year+"-"+month+"-"+day;
        },

        getDayToTime(str){
            return (new Date(str+' 00:00:00')).getTime();
        },

        getTimeToDay(date){
            return dateUtils.dateToStr("YYYY-MM-DD",new Date(date));
        },

        scroll(event){
            let chartDom=document.getElementById('vue-chart-right-draw-content');
            let leftList=document.getElementById('vue-chart-left-table-list');
            const isBottom = leftList.scrollHeight - leftList.clientHeight - leftList.scrollTop;
            chartDom.scrollTop = leftList.scrollTop;
            ganttChartScrollTop = leftList.scrollTop;

        },
        rightScroll(){
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
        onPageChange(index){
            var params=Object.assign({},this.params);
            params.lineStartDate=params.lineStartDate+' 00:00:00';
            params.lineEndDate=params.lineEndDate+' 00:00:00';
            params.page=index;
            this.head=false;
            this.getListData(params);
        }
    }
}
</script>

<style lang="less" scoped>
    .chart-inventory-left{
        width:185px;
        border: 1px solid #F6F6F6;
        display:inline-block;
        border-bottom: none;
            .chart-left-table{
                .view-table-list{
                    position: relative;
                    width:100%;
                    height:100px;
                    border: 1px solid #f1f1f1;
                    border-right:none;
                    border-top: none;
                    border-left:none;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    font-weight: 500;
                    background:#fff;
                    .table-date{
                        display: inline-block;
                        position: absolute;
                        right: 24px;
                        top: 28px;
                    }
                    .table-single{
                        width:100%;
                        height:100%;
                        background:url(./gantt-chart/img/line2.jpg) no-repeat center;
                        background-size: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .table-product{
                        display: inline-block;
                        position: absolute;
                        left: 24px;
                        bottom: 28px;
                    }
                }
                .table-list-fixed{
                    position: fixed;
                    top:77px;
                    z-index: 999;
                    width:183px;
                }
                .view-table-detail{
                    width:100%;
                    //max-height:1000px;
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
