<template>
    <div class='chart-inventory-wrap-out'>
        <!-- 甘特图部分 -->
        <div class='chart-inventory-wrap'>

                <div class="hander" >
                    <!-- 刻度选择 -->
                    <div style="display:inline-block;">
                        <Select
                            v-model="barType"
                            @on-change="selectChange"
                            style="width:220px;margin-right:20px;text-align:left;color:#666;"
                        >
                            <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>

                    <!-- 工位类型 -->
                    <div class='header-left'>
                        <ColorType 
                            v-for="(item,index) in colorTypes" 
                            :title="item.title" 
                            :color="item.color" 
                            :key="index" 
                        />
                    </div>

                </div>
            <div

                class="right-draw"
            >
                <div 
                    :class="head?'calibration calibrationFixed':'calibration'" 
                    id="gantt-chart-calibration"
                    :style="{left:(head?left:0)+'px',width:width+'px'}"
                  >
                 <div  style="position:relative;overflow:hidden;"  >
                    <div class="time-shaft-fixed"></div>
                    <div
                        ref="rightBar"
                        v-if="!isLoading"
                        class="bar"
                        :style="{width: dayAllNum * minCalibration+scrollWidth+'px'}"
                    >

                        <div class="add-left" ref='addLeftPic' @click="lastTurnPage">
                            <span class='add-left-pic'></span>
                        </div>
                        <div :style="{width:dayAllNum*minCalibration+'px'}">
                            <div class="year-bar" v-if="years && years.length && barType=='month'">
                                <div class="year"
                                    :style="{width:item.dayNum * minCalibration + 'px'}"
                                    v-for=" item in years" :key="item.id">
                                    <span>{{item.year}}</span>
                                </div>
                            </div>
                        
                            <div class='month-bar' :style="{background:barType=='month'?'#FAFCFF;':'#fff'}" >
                                <div
                                    v-if="barType=='month'&&tagToLeft!=0"
                                    class="bar-line"
                                    :style="{
                                        left:tagToLeft+'px',
                                        width:minCalibration+'px'
                                    }"
                                >
                                </div>
                                <div  v-if="barType=='month'&&startRentLeft!=0" class="bar-line rent-line" :style="{left:startRentLeft+'px',width:2+'px'}"></div>
                                <div  v-if="barType=='month'&&endRentLeft!=0"  class="bar-line rent-line" :style="{left:endRentLeft+'px',width:2+'px'}"></div>
                                <div  v-if="barType=='month'&&inventoryRentLeft!=0"  class="bar-line" :style="{left:inventoryRentLeft+'px',width:minCalibration+'px'}"></div>
                                <div  v-if="barType=='month'" class="start-to-end" :style="{left:startRentLeft+'px',width:endRentLeft-startRentLeft+'px'}"></div>

                                <div  v-if="barType=='month'" class='hover-flag-line' :style="{left:hoverLeft+'px',width:endMonthDay*minCalibration+'px'}"></div>
                                <DrawMonth
                                    v-for="( item ) in showData"
                                    :key="item.id"
                                    :dayNum="item.dayNum"
                                    :data="item"
                                    :minCalibration="minCalibration"
                                    :size="barType=='month'?12:16"
                                    :type="barType"

                                />
                                <div v-if="barType=='month'&&tagToLeft!=0" class="today" :style="{left:tagToLeft+minCalibration/2+'px'}"></div>

                            </div>
                            <div v-if="barType=='week'" class='week-bar' style="background:#FAFCFF">
                                 <div  v-if="barType=='week'&&tagToLeft!=0" class="bar-line" :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                                 <div  v-if="barType=='week'&&startRentLeft!=0" class="bar-line rent-line" :style="{left:startRentLeft+'px',width:2+'px'}"></div>
                                 <div  v-if="barType=='week'&&endRentLeft!=0" class="bar-line rent-line" :style="{left:endRentLeft+'px',width:2+'px'}"></div>
                                 <div  v-if="barType=='week'&&inventoryRentLeft!=0" class="bar-line" :style="{left:inventoryRentLeft+'px',width:minCalibration+'px'}"></div>
                                 <div  v-if="barType=='week'" class="start-to-end" :style="{left:startRentLeft+'px',width:endRentLeft-startRentLeft+'px'}"></div>

                                 <div  v-if="barType=='week'" class='hover-flag-line' :style="{left:hoverLeft+'px',width:endMonthDay*minCalibration+'px'}"></div>

                                <DrawWeek
                                    :ref = "'ganttChartTimeShaft'+index"
                                    v-for="(item,index) in weeks"
                                    :key="item.id"
                                    :data="item"
                                    :minCalibration="minCalibration"

                                />
                                <div v-if="barType=='week'&&tagToLeft!=0"  class="today" :style="{left:tagToLeft+minCalibration/2+'px',}"></div>

                            </div>

                            <div v-if="barType=='day'" class='day-bar' style="background:#FAFCFF">
                                <div  v-if="barType=='day'&&tagToLeft!=0" class="bar-line" :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                                <div  v-if="barType=='day'&&startRentLeft!=0" class="bar-line rent-line" :style="{left:startRentLeft+'px',width:2+'px'}"></div>
                                <div  v-if="barType=='day'&&endRentLeft!=0" class="bar-line rent-line" :style="{left:endRentLeft+'px',width:2+'px'}"></div>
                                <div  v-if="barType=='day'&&inventoryRentLeft!=0" class="bar-line" :style="{left:inventoryRentLeft+'px',width:minCalibration+'px'}"></div>
                                <div  v-if="barType=='day'" class="start-to-end" :style="{left:startRentLeft+'px',width:endRentLeft-startRentLeft+'px'}"></div>

                                <div v-if="barType=='day'" class='hover-flag-line' :style="{left:hoverLeft+'px',width:minCalibration+'px'}"></div>

                                <DrawDay
                                    v-for="( item ) in showData"
                                    :key="item.id"
                                    :data="item"
                                    :dayNum="item.dayNum"
                                    :minCalibration="minCalibration"
                                />

                                <div v-if="barType=='day'&&tagToLeft!=0"  class="today" :style="{left:tagToLeft+minCalibration/2+'px'}"></div>
                            </div>
                           
                        </div>
                        <div class="add-right" @click="nextTurnPage" ref='addRightPic' :style="{right:scrollWidth+'px'}">
                            <span class='add-right-pic' id="add-right-pic-inventory"></span>
                        </div>
                    </div>

                 </div>
                </div>
                <div
                    @scroll="rightScroll"
                    @mouseover='rightOver'
                    id="vue-chart-right-draw-content"
                >

                    <div
                        class="content"
                        :style="{width:dayAllNum*minCalibration+'px'}"
                    >
                    <div class="add-left" @click="lastTurnPage"></div>
                       
                        <ViewArticle
                            v-if="leftEndpoint.year"
                            v-for="item in listData"
                            :data="item"
                            :key="item.id"
                            :id="item.id"
                            :start="start"
                            :end="end"
                            :leftEndpoint="leftEndpoint"
                            :minCalibration="minCalibration"
                            :todayDetail="{width:minCalibration,left:tagToLeft}"
                        />
                        <div class="add-right" @click="nextTurnPage"></div>
                        <div class='today-flag' v-if="tagToLeft!=0" :style="{left:tagToLeft+30+'px',width:minCalibration+'px'}"></div>
                        <div class='start-flag' v-if="startRentLeft!=0" :style="{left:startRentLeft+30+'px',width:2+'px'}"></div>
                        <div class='today-flag' v-if="inventoryRentLeft!=0" :style="{left:inventoryRentLeft+30+'px',width:minCalibration+'px'}"></div>
                        <div class='end-flag' v-if="endRentLeft!=0" :style="{left:endRentLeft+30+'px',width:2+'px'}"></div>
                        <div class='start-to-end' :style="{left:startRentLeft+30+'px',width:endRentLeft-startRentLeft+'px'}"></div>

                        <div class='hover-flag'  :style="{left:hoverLeft+30+'px',width:(barType=='month'||barType=='week'?(endMonthDay*minCalibration):minCalibration)+'px'}"></div>
                    </div>
                </div>
            </div>
            <div id="gantt-chart-tool-tip"></div>
            <div id="gantt-chart-tool-tip-triangle" class="bottom-triangle"></div>
            <slot name="leftBar"></slot>
        </div>
    </div>

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import DrawDay from './draw-day';
import DrawMonth from './draw-month';
import DrawWeek from './draw-week';
import ViewArticle from './view-article';
import publicFn from '../publicFn';
import KrField from '~/components/KrField';
import ColorType from './color-type';
var drawContent='';
var noMonth='';
var noWeek='';
var noDay='';
export default {
    components:{
        DrawDay,
        DrawMonth,
        DrawWeek,
        KrField,
        ViewArticle,
        ColorType
    },
    props:{
        start:{
            type:String,
        },
        end:{
            type:String
        },
        listData:{
            default:()=>[],
            type:Array,
        },
        searchParams:{
            type:Object,
            default:{}
        },
        endPosition:{
            type:String
        },
        head:{
            type:Boolean 
        },
        width:{
            type:[Number,String] 
        },
        left:{
            type:[Number,String] 
        },
        identify:{
           type:String,
           default:''
        }
    },
    data(){
        return{
            //今天的值
            today:this.getToday(),
            years:[],
            //所有月的数组数据
            showData:[{
                year:this.getToday().year,
                month:this.getToday().month,
                dayNum:publicFn.getMonthDayNum(this.getToday().year,this.getToday().month)
            }],
            volatility:2,
            dayBarWidth:0,
            dayAllNum:0,
            startTime:this.start,
            endTime:this.end,
            //所有周的数组数据
            weeks:[],
            //最小刻度的大小
            minCalibration:20,
            //原点数据
            leftEndpoint:{},
            //刻度的下拉选择项
            timeList: [
                {
                    value: 'month',
                    label: '按月展示时间轴'
                },
                {
                    value: 'week',
                    label: '按周展示时间轴'
                },
                {
                    value: 'day',
                    label: '按天展示时间轴'
                }
            ],
            //下拉的默认值
            barType: 'week',
            isLoading:true,
            scrollWidth:0,
            tagToLeft:0,
            startRentLeft:0,
            endRentLeft:0,
            inventoryRentLeft:0,
            hoverLeft:0,
            endMonthDay:0,
            colorTypes:[
                {
                    title:'未租',
                    color:"#BCE590"
                },
                {
                    title:'在租',
                    color:"#FDAFAF"
                },
                {
                    title:'合同未生效',
                    color:"#FFE08F"
                },
                {
                    title:'不可用',
                    color:"#E4E4E4"
                }
            ]
        }
    },
    mounted(){
        drawContent=document.getElementById("vue-chart-right-draw-content");
        this.scrollWidth = utils.getScrollBarSize();
        this.limitDay();
        setTimeout(() => {
            this.scroolFix(this.showData)          
        }, 100);
    },
    methods:{
        scroolFix(data){
            var offerLeft = 0;
            if(drawContent){
                var today = dateUtils.dateToStr("YYYY/MM/DD",new Date(this.start));

                var todayIsWeek = 0;
                if(this.barType == 'day' || this.barType == 'week'){
                    var todayIsWeek = (new Date(this.start)).getDay();
                    offerLeft = (todayIsWeek+6) * this.minCalibration;

                }else{
                    var todayArr = today.split('/');
                    var todayObj = {
                        year:+todayArr[0],
                        month:+todayArr[1],
                        dayNum:+todayArr[2],
                    }
                    todayObj.month -=1;
                    if(todayObj.month<0){
                        todayObj.month = 12 - todayObj.month;
                        todayObj.year -=1;
                    }
                    offerLeft = (publicFn.getMonthDayNum(todayObj.year,todayObj.month)+todayObj.dayNum-1)*this.minCalibration;
                }
                var scrollLeft = (this.identify=='daily'?this.getInventoryLeft(data):this.getStartLeft(data))-offerLeft;
                var timeShaftFixed = document.querySelectorAll('.time-shaft-fixed')[0];
                if(!this.listData.length){
                    if(timeShaftFixed){
                        timeShaftFixed.style.opacity=0;
                    }
                    if(this.$refs.addLeftPic){
                        this.$refs.addLeftPic.style.opacity='1';
                        this.$refs.addLeftPic.style.pointerEvents='none';
                    }
                    return;
                }
                if(this.endPosition=='start'){
                    if(timeShaftFixed){
                        timeShaftFixed.style.opacity=0;
                    }
                    if(this.$refs.addLeftPic){
                        this.$refs.addLeftPic.style.opacity='1';
                    }
                    setTimeout(() => { 
                      drawContent.scrollLeft = 0;           
                    }, 100);
                }else if(this.endPosition=='end'){
                    if(timeShaftFixed){
                        timeShaftFixed.style.opacity=1;
                    }
                    if(this.$refs.addRightPic){
                        this.$refs.addRightPic.style.opacity='1';
                    }
                    setTimeout(() => {
                      drawContent.scrollLeft = drawContent.scrollWidth-drawContent.clientWidth;
                    }, 100);
                }else{
                    if(timeShaftFixed){
                        timeShaftFixed.style.opacity=1;
                    }
                    setTimeout(() => {
                      drawContent.scrollLeft = scrollLeft;
                    }, 100);
                }
            }
        },
        //时间差
        timeRange(sDate1,sDate2){
            var aDate, oDate1, oDate2, iDays;
            aDate = sDate1.split("-")
            oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])    //转换为12-18-2002格式  
            aDate = sDate2.split("-")
            oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
            if(oDate1<oDate2){
                return 0;
            }
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数  
            return iDays  
        },
        getTodayTOLeft(data){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+startMonth.start;
            this.tagToLeft = this.timeRange(today,startTime)*this.minCalibration;
            return this.timeRange(today,startTime)*this.minCalibration;
        },
        getInventoryLeft(data){
            var today =this.searchParams.inventoryDate;
            var otherDay = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var todayTime=today?today.split(' ')[0]:otherDay;
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+startMonth.start;
            this.inventoryRentLeft=todayTime?this.timeRange(todayTime,startTime)*this.minCalibration:0;
            return this.timeRange(todayTime,startTime)*this.minCalibration;
        },
        getStartLeft(data){
            var today =this.searchParams.startDate;
            var otherDay=this.searchParams.endDate;
            var todayTime=today?today.split(' ')[0]:otherDay.split(' ')[0];
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+startMonth.start;
            this.startRentLeft=todayTime?this.timeRange(todayTime,startTime)*this.minCalibration:0;
            return this.timeRange(todayTime,startTime)*this.minCalibration;
        },
        getEndLeft(data){
            var today =this.searchParams.endDate;
            var otherDay=this.searchParams.startDate;
            var todayTime=today?today.split(' ')[0]:otherDay.split(' ')[0];
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+startMonth.start;
            var canculateTime=this.timeRange(todayTime,startTime)?this.timeRange(todayTime,startTime)+1:0;
            this.endRentLeft=todayTime?canculateTime*this.minCalibration:0;
            return this.timeRange(todayTime,startTime)*this.minCalibration;
        },
        lastTurnPage(){
           this.$emit('lastTurnPage',this.start);
        },
        nextTurnPage(){
           this.$emit('nextTurnPage',this.end);
        },
        //获取年数组
        getYears(startTime,endTime){

            var startArr = startTime.split('-');
            var endArr = endTime.split('-');
            var startObj = {
                year:+startArr[0],
                month:+startArr[1],
                day:+startArr[2]
            }
            var endObj = {
                year:+endArr[0],
                month:+endArr[1],
                day:+endArr[2]
            }

            if(endObj.month>12){
                endObj.month = endObj.month -12;
                endObj.year = endObj.year +1;
            }

            var yearArr = [];
            if(startObj.year == endObj.year){
                yearArr=[{
                    year:startObj.year,
                    start:startTime,
                    end:endObj.year+'-'+endObj.month+'-'+endObj.day
                }];
            }else{
                yearArr=[{
                    year:startObj.year,
                    start:startObj.year+'-'+startObj.month+'-'+1,
                    end:startObj.year+'-'+12+'-'+publicFn.getMonthDayNum(startObj.year,12)
                }];
                for (var year = startObj.year; ;) {
                    year++;
                    if(year == endObj.year){
                        yearArr.push({
                            year:endObj.year,
                            start:endObj.year+'-'+1+'-'+1,
                            end:endObj.year+'-'+endObj.month+'-'+publicFn.getMonthDayNum(endObj.year,endObj.month)
                        });
                        break;
                    }
                    yearArr.push({
                        year:year,
                        start:year+'-'+1+'-'+1,
                        end:year+'-'+12+'-'+publicFn.getMonthDayNum(endObj.year,12)
                    });
                }

            }
           for (var i = 0; i < yearArr.length; i++) {
               yearArr[i].dayNum = utils.dateDiff(yearArr[i].start,yearArr[i].end)+1;
           }
            
           this.years = [].concat(yearArr);
        },
        //下拉事件被触发
        selectChange(event){
            if(event=="week"){
                this.minCalibration = 20;
            }else if(event=='day'){
                this.minCalibration = 50;
            }else if(event=='month'){
                this.minCalibration = 4;
            }
            this.limitDay(event);
        },
        //极限时间
        limitDay(type){   
            this.init(this.start,this.endTime);
            this.scroolFix(this.showData);
        },
        //获取进度条的总长度
        getDayBarWidth(){
            var barWidth = 0;
            for (var i = 0; i < this.showData.length; i++) {
                barWidth += this.showData[i].length;
            }
            this.dayAllNum = barWidth;
        },
        //获取今天日期
        getToday(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var arr = today.split("-");
            return {year:+arr[0],month:+arr[1],day:+arr[2]}
        },
        //数据初始化
        init(startTime,endTime){
            var start = startTime.split("-"),
                end = endTime.split("-");
            var startObj = {
                year:+start[0],
                month:+start[1]
            },
            endObj = {
                year:+end[0],
                month:+end[1]
            }
            var showData = [];
            for(var month=startObj.month,year=startObj.year;; ){
                var startDay = 1;
                if(month >12){
                    month = month-12;
                    year +=1;
                }
                if(month==startObj.month && year == startObj.year ){
                    startDay = +start[2];
                }
                showData.push({
                    year:year,
                    month:month,
                    start:startDay,
                    length:publicFn.getMonthDayNum(year,month)-startDay+1,
                    dayNum:publicFn.getMonthDayNum(year,month),
                })
                if((year+'-'+month) == (endObj.year+'-'+endObj.month)){
                    break;
                }
                month++;
            }
            this.showData = [].concat(showData);
            this.leftEndpoint = Object.assign({}, this.leftEndpoint,this.showData[0]);

            this.isLoading = false;
            this.getDayBarWidth()
            //获取周的具体数据
            this.getWeekStartAndEnd(showData);
            this.getTodayTOLeft(showData);
            if(this.identify=='daily'){
                this.getInventoryLeft(showData);
            }else{
                this.getStartLeft(showData);
                this.getEndLeft(showData);
            }  
            this.getYears(startTime,endTime);
        },

        //获取某日为周几
        getWeekNum(year,month,day){
            var date = new Date(year,month-1,day);
            return date.getDay()==0?7:date.getDay()
        },

        //获取周的数据
        getWeekStartAndEnd(showData){
            var min = showData[0];
            var max = showData[showData.length-1];
            var start = new Date(min.year,min.month-1,min.start);
            var end = new Date(max.year,max.month-1,max.dayNum);
            var Obj = {
                start:start.getDay()==0?7:start.getDay(),
                end:end.getDay()==0?7:end.getDay()
            }
            var weekData = {
                start:8 - Obj.start,
                end:Obj.end
            }
            weekData.weeks = (this.dayAllNum-weekData.start-weekData.end)/7;
            weekData.dayNum = this.dayAllNum-weekData.start-weekData.end;
            this.getWeeks(weekData,min,max);

        },
        //获取每一周的具体数据
        getWeeks(weekObj,min,max){
            var start={
                year:min.year,
                month:min.month,
                day:min.start
            }
            var length = weekObj.start;
            var end= {
                year:start.year,
                month:start.month,
                day:min.start + weekObj.start-1,
            }
            if(end.day>publicFn.getMonthDayNum(end.year,end.month)){
               end.day = end.day -publicFn.getMonthDayNum(end.year,end.month)-1;
                end.month+=1;
                if(end.month>12){
                    end.month=end.month-12;
                    end.year+=1;
                }
            }
            var arr = [{
                start:Object.assign({},start),
                length:length,
                end:Object.assign({},end)
            }]
            for (var i = 0; i <weekObj.weeks ;i++) {

                start.day = +end.day + 1,
                start.month = end.month,
                end.day = start.day + 6;
                start = Object.assign({},this.dayToWeekDetail(start));
                end = Object.assign({},this.dayToWeekDetail(end));
                length = 7;
                arr.push({
                    start:Object.assign({},start),
                    length:length,
                    end:Object.assign({},end)
                });
            }
            arr.push({
                start:{
                    year:max.year,
                    month:max.month,
                    day:max.dayNum - weekObj.end +1
                },
                length:weekObj.end,
                end:{
                    year:max.year,
                    month:max.month,
                    day:max.dayNum
                }

            });
            this.weeks = [].concat(arr);

        },
        //固定顶部的时间轴
        timeShaftFixed(left,contentDom){
            let type = this.barType;
            let contentDetail = contentDom.getBoundingClientRect();
            let contentToLeft = contentDetail.left;
            let timeShaftFixed = document.querySelectorAll('.time-shaft-fixed')[0];
            timeShaftFixed.style.opacity=1;
            let timeShaftDetail = timeShaftFixed.getBoundingClientRect();
            let topShaftDomArr = document.querySelectorAll('.month-bar .draw-month');
            if(type == 'month'){
               topShaftDomArr = document.querySelectorAll('.year-bar .year');
            }
            let contentLeft = contentDom.scrollLeft;
            for (let i = 0; i < topShaftDomArr.length; i++) {
                let thatDom = topShaftDomArr[i];
                let thatDomDetail = thatDom.getBoundingClientRect();
                let thatStartToLeft = thatDomDetail.left;
                let thatEndToLeft = thatDomDetail.width + thatDomDetail.left;
                if(contentToLeft>=thatStartToLeft && contentToLeft<=thatEndToLeft){
                    timeShaftFixed.innerHTML = thatDom.innerHTML;
                    if(thatEndToLeft- contentDetail.left<90){
                        timeShaftFixed.style.left =-(90 - (thatEndToLeft- contentDetail.left))-1 +'px';
                    }else {
                        timeShaftFixed.style.left = 0;
                    }
                    break;
                }
            }
            if(contentLeft<50){
                timeShaftFixed.style.left = 50 -contentLeft + 'px';
            }
        },
        //每周的具体内容校正
        dayToWeekDetail(weeks){

            var obj = Object.assign({},weeks);
            var dayNum = publicFn.getMonthDayNum(obj.year,obj.month);
            if(obj.day>dayNum){
                obj.day = obj.day - dayNum;
                obj.month = obj.month + 1;
                if(obj.month>12){
                    obj.month = obj.month - 12;
                    obj.year = obj.year + 1;
                }
            }
            return obj;
        },
        rightScroll(event){
            var el = event.target;
            var top = el.scrollTop;
            var left = el.scrollLeft;
            this.$refs.rightBar.style.left = -left+'px';

            if(left<1){
                this.$refs.addLeftPic.style.opacity='1';
            }else{
                this.$refs.addLeftPic.style.opacity='0';
            }
            
            if(el.scrollWidth<=left+el.clientWidth){
                this.$refs.addRightPic.style.opacity='1';
            }else{
                this.$refs.addRightPic.style.opacity='0';
            }
            this.timeShaftFixed(left,el);
        },
        rightOver(event){
            var e = event || window.event;
            if(e&&drawContent){
                var num=0;
                var left=e.clientX+drawContent.scrollLeft-drawContent.getBoundingClientRect().left;
                num=Math.ceil(left/this.minCalibration+0.4);

                var endDate=utils.dateRange(this.start,num-2);
                var endYear=new Date(endDate).getFullYear();
                var endDayTime=new Date(endDate).getDate();
                var endMonth=new Date(endDate).getMonth()+1;
                var endDay=new Date(endDate).getDay()==0?7:new Date(endDate).getDay();
                if(this.barType == 'month'){
                    if(endYear+'-'+endMonth === noMonth){
                        return;
                    }
                    this.canculateMonth(this.start,endDate);
                }else if(this.barType == 'week'){  
                    if(noWeek==this.getWeekStart(endYear,endMonth,endDayTime,endDay)+this.getWeekEnd(endYear,endMonth,endDayTime,endDay)){
                        return;
                    }
                    this.canculateWeek(this.start,endDate);
                }else{
                    if(endYear+'-'+endMonth+'-'+endDayTime === noDay){
                        return;
                    }
                    this.canculateDay(this.start,endDate);
                }
            }
            this.$emit('rightOver',event);
        },
        canculateMonth(start,endDate){
            var endYear=new Date(endDate).getFullYear();
            var endDay=new Date(endDate).getDate();
            var endMonth=new Date(endDate).getMonth()+1;
            this.endMonthDay=publicFn.getMonthDayNum(endYear,endMonth);
            var num=utils.dateDiff(endDate,start);
            var endNum=num-endDay;
            noMonth=endYear+'-'+endMonth;
            this.hoverLeft=(endNum+1)*this.minCalibration;
        },
        canculateWeek(start,endDate){
            var endYear=new Date(endDate).getFullYear();
            var endDayTime=new Date(endDate).getDate();
            var endMonth=new Date(endDate).getMonth()+1;
            var endDay=new Date(endDate).getDay()==0?7:new Date(endDate).getDay();
            var num=utils.dateDiff(endDate,start);
            this.endMonthDay=7;
            var endNum=num-endDay;     
            noWeek=this.getWeekStart(endYear,endMonth,endDayTime,endDay)+this.getWeekEnd(endYear,endMonth,endDayTime,endDay)
            this.hoverLeft=(endNum+1)*this.minCalibration;
        },
        canculateDay(start,endDate){
            var endYear=new Date(endDate).getFullYear();
            var endDayTime=new Date(endDate).getDate();
            var endMonth=new Date(endDate).getMonth()+1;
            noDay=endYear+'-'+endMonth+'-'+endDayTime;
            this.hoverLeft=utils.dateDiff(endDate,start)*this.minCalibration; 
        },
         
        getWeekStart(endYear,endMonth,endDate,endDay){
            var date = endDate,
                month = endMonth,
                year = endYear;
            var range = date-endDay;

            if(range<0){
                month = month-1;
                if(month<=0){
                    year = year-1;
                    month = 12+month;
                    date = publicFn.getMonthDayNum(year,month)+date;
                }
            }
            return year+'-'+month+'-'+(Number(range)+1);
        },
        getWeekEnd(endYear,endMonth,endDate,endDay){
            var date = endDate,
                month = endMonth,
                year = endYear;
            var range = date+(6-endDay);
            var newMonthNum = publicFn.getMonthDayNum(year,month)+date;
            if(range>newMonthNum){
                month = month+1;
                if(month>12){
                    year = year+1;
                    month = month-12;
                    date = date-newMonthNum;
                }
            }
            return year+'-'+month+'-'+(Number(range)+1);
        }
    }
}
</script>

<style lang="less">
.chart-inventory-wrap-out{
   .chart-inventory-wrap{
        width:100%;
        box-sizing: border-box;
        display:inline-block;
        position: relative;
        padding-left:25px;
        margin-top: 3px;
        #gantt-chart-tool-tip{
            max-width: 280px;
            //min-height: 50px;
            opacity: 0;
            background: rgba(70,76,91,.9);
            position: absolute;
            top: 0px;
            left: 0px;
            border-radius: 4px;
            padding: 5px;
            color: #ffffff;
            z-index: 999;
            transition: all .1s;
            pointer-events:none;
            .title{
                font-size: 14px;
                background: transparent;
                display:inline-block;
                vertical-align: middle;
            }
            .content{
                font-size: 14px;
                padding: 0px;
                background: transparent;
                display:inline-block;
                vertical-align: middle;
            }
        }
        .top-triangle{
            border-color: rgba(70,76,91,.9) transparent transparent transparent;
        }
        .bottom-triangle{
            border-color: transparent transparent rgba(70,76,91,.9)  transparent;
          

        }
        #gantt-chart-tool-tip-triangle{

            opacity: 0;
            position: absolute;
            display:block;
            //margin:10px;
            width:0;
            height:0;
            border-style:solid;
            border-width:5px;
            top: -10px;
            left: 10px;
            transition: all .1s;
            z-index: 999;
        }
        .right-draw{
            position: absolute;
            overflow:auto;
            left: 210px;
            right: 0px;
            .time-shaft-fixed{
                position: absolute;
                background: #ffffff;
                width:90px;
                z-index: 99;
                top: 1px;
                left: 0px;
                height: 48px;
                padding-left: 20px;
                line-height: 50px;
                font-size: 16px;
               
            }
            .bar{
                padding: 0px 30px;
                box-sizing: content-box;
                .add-left-pic{
                    position: absolute;
                    left:8px;
                    top:50%;
                    z-index:11;
                    transform: translateY(-50%);
                    display:inline-block;
                    width:13px;
                    height:20px;
                    background:url(img/left.svg) no-repeat center;
                    background-size:100%;
                    cursor: pointer;
                }
                .add-right-pic{
                    position: absolute;
                    right:10px;
                    top:50%;
                    z-index:11;
                    transform: translateY(-50%);
                    display:inline-block;
                    width:13px;
                    height:20px;
                    background:url(img/right.svg) no-repeat center;
                    background-size:100%;
                    cursor: pointer;
                }
            }

            .calibration  {
                width:100%;
                position:relative;
                overflow:hidden;
                height: 101px;
                ::-webkit-scrollbar {
                    width:0px;
                }
            }
            .calibrationFixed{
                position: fixed;
                top:77px;
                z-index: 999;
            }
        }
        
        #vue-chart-right-draw-content{
            //max-height:1000px;
            width: 100%;
            overflow:auto;
            border-bottom: 1px solid #F6F6F6;
            .today-flag{
                background: rgba(73,157,241,0.20);
                height: 100%;
                position: absolute;
                top: 0px;
                width: 50px;
                pointer-events:none;
                z-index:3;
            }
            .start-flag{
                background:#499DF1;
                height: 100%;
                position: absolute;
                top: 0px;
                width: 10px;
                pointer-events:none;
                z-index:3;
                box-shadow: 2px 0 4px 0 #499DF1;
            }
            .end-flag{
                background:#499DF1;
                height: 100%;
                position: absolute;
                top: 0px;
                width: 10px;
                pointer-events:none;
                z-index:3;
                box-shadow: 2px 0 4px 0 #499DF1;
            }
            .start-to-end{
                background: rgba(73,157,241,0.10);
                height: 100%;
                position: absolute;
                top: 0px;
                pointer-events:none;
                z-index:3;
            }
            .hover-flag{
                background: rgba(186,198,205,0.30);
                height: 100%;
                position: absolute;
                top: 0px;
                width: 50px;
                pointer-events:none;
                z-index:3;
            }
        }
           .add-left{
                position: absolute;
                width: 30px;
                height: 100%;
                background: #fff;
                left: 0px;
                top: 0px;
                z-index: 10;
                border-right: solid 1px #F6F6F6;
                cursor: pointer;
            }
            .add-right{
                position: absolute;
                width: 30px;
                height: 100%;
                background: #fff;
                right: 0px;
                top: 0px;
                z-index: 10;
                border-left: solid 1px #F6F6F6;
                border-right: solid 1px #F6F6F6;
                cursor: pointer;
            }
         
        .content{
            position: relative;
            background: #F6F6F6;
            padding-left: 30px;
            padding-right: 30px;
            box-sizing: content-box;
            overflow: hidden;
            .view-article:first-child .view-channel:first-child .every-view-col:first-child .article{
                top: 0px;
            }
           
           
        }
        .hander{
            margin-top:0px;
            height: 55px;
            width: 100%;
            text-align: left;
            .ivu-select-selected-value{
                font-size: 14px;
            }
            .header-left{
                display:inline-block;
                //float:left;
            }
            .article{
                display: inline-block;
                width: 33px;
                height: 15px;
                border-radius: 5px;
                margin-left: 10px;
            }
        }
       
        .day-bar,.month-bar,.week-bar,.year-bar{
            height: 50px;
            position: relative;


        }
        .year-bar{
            background: #fff;
            .year{

                height: 50px;
                line-height: 50px;
                width: 50px;
                text-align: left;
                display: inline-block;
                box-sizing: border-box;
                padding-left:20px;
                border-bottom: 1px solid #F6F6F6;
                border-right: 1px solid #F6F6F6;
                transition: all 0.3;
                font-size: 16px;
            }
        }

        .bar{
            position: relative;
            border-top: 1px solid #F6F6F6;

        }
        .today{
            width: 24px;
            height: 12px;
            background:url(img/today.png) no-repeat center;
            background-size: 100%;
            position: absolute;
            top: 0px;
            transform: translateX(-50%);
        }
        .bar-line{
            position: absolute;
            width: 50px;
            height: 50px;
            top: 0px;
            background: #499DF1;
            opacity: 0.3;
        }
        .rent-line{
            box-shadow: 2px 0 4px 0 #499DF1;
            opacity: 1;
        }
        .hover-flag-line{
            background: rgba(186,198,205,0.30);
            height: 50px;
            position: absolute;
            top: 0px;
            width: 50px;
            z-index:3;
        }
        .start-to-end{
            background: rgba(73,157,241,0.10);
            height: 100%;
            position: absolute;
            top: 0px;
            pointer-events:none;
            z-index:3;
        }
   }
}
   .tab-second-title{
        height:45px;
   }

</style>
