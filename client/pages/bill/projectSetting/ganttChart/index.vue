<template>
    <div>
        <!-- 甘特图部分 -->
        <div class='chart-ul-wrap' >
           
                <div class="hander" >
                    <div class='header-left'>
                        <div style="display:inline-block;margin-top: 6px;">
                            <span style="vertical-align:middle;color:#999;font-size:14px;font-family: PingFangSC-Medium;">任务计划</span>
                            <span 
                                class="article" 
                                style="background:#DBE1E8;vertical-align:middle;"
                            ></span>
                        </div>
                        <div style="display:inline-block;margin-left:20px;margin-top: 6px;">
                            <span style="vertical-align:middle;color:#999;font-size:14px;font-family: PingFangSC-Medium;">准时或提前完成</span>
                            <span 
                                class="article" 
                                style="background: #A8DD6F;vertical-align:middle;"
                            ></span>
                        </div>
                         <div style="display:inline-block;margin-top: 6px;margin-left:20px;">
                            <span style="vertical-align:middle;color:#999;font-size:14px;font-family: PingFangSC-Medium;">延期完成</span>
                            <span 
                                class="article" 
                                style="background:#F69C9C;vertical-align:middle;"
                            ></span>
                        </div>
                         <div style="display:inline-block;margin-top: 6px;margin-left:20px;">
                            <span style="vertical-align:middle;color:#999;font-size:14px;font-family: PingFangSC-Medium;">进度未知</span>
                            <span 
                                class="article" 
                                style="background:#FFD669;vertical-align:middle;"
                            ></span>
                        </div>
                    </div>

                    <div style="display:inline-block;margin-left:10px;">
                        <span style="margin-top:8px;margin-right:15px;font-size:14px;color:#333333;">
                         甘特图显示任务项
                        </span>
                        <Form label-position="left" style="display:inline-block;">      
                                <KrField 
                                    v-if="mask"
                                    type="selectTree" 
                                    :data="treeData" 
                                    @okClick="treeClick"
                                    @checkChange="treeChange"
                                    :treeIds="treeIds"
                                />
                        </Form>
                    </div>
                
                    <div style="display:inline-block;">
                            <span style="margin-top:6px;margin-right:15px;margin-left:10px;font-size:14px;color:#333333;">
                                时间轴最小刻度
                            </span>
                            <Select 
                                v-model="barType" 
                                @on-change="selectChange"
                                style="width:100px;margin-right:20px;text-align:left;"
                            >
                                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </div>
                    

                    </div>


            <div 
               
                class="right-draw" 
                :style="{left:type=='edit'?'271px':'371px'}"
            >
                <div class="calibration" >
                 <div  style="position:relative;overflow:hidden;"  >
                    <div ref="rightBar" v-if="!isLoading" class="bar" :style="{width: dayAllNum * minCalibration+scrollWidth+'px'}">
                        <div :style="{width:dayAllNum*minCalibration+'px'}">
                            <div class="year-bar" v-if="years && years.length && barType=='month'">
                                <div class="year" :style="{width:item.length * minCalibration + 'px'}" v-for=" item in years" :key="item.id"><span>{{item.year}}</span></div>
                            </div>
                            <div class='month-bar' :style="{background:barType=='month'?'#FAFCFF;':'#fff'}" >
                                <div v-if="barType=='month'" class="bar-line" :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                                
                                <DrawMonth 
                                    v-for="( item ) in showData" 
                                    :key="item.id"  
                                    :dayNum="item.dayNum" 
                                    :data="item"
                                    :minCalibration="minCalibration"
                                    :size="barType=='month'?12:16"
                                    :type="barType"
                                    
                                />
                                
                                <div v-if="barType=='month'" class="today" :style="{left:tagToLeft+minCalibration/2+'px'}">今天</div>
                                
                            </div>
                            <div v-if="barType=='week'" class='week-bar' style="background:#FAFCFF">
                                <div v-if="barType=='week'" class="bar-line" :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                                
                                <DrawWeek 
                                    v-for="(item) in weeks" 
                                    :key="item.id" 
                                    :data="item" 
                                    :minCalibration="minCalibration"
                                    
                                />
                                <div v-if="barType=='week'"  class="today" :style="{left:tagToLeft+minCalibration/2+'px',}">今天</div>
                                
                            </div>
                            
                            <div v-if="barType=='day'" class='day-bar' style="background:#FAFCFF">
                                <div v-if="barType=='day'" class="bar-line" :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                                
                                <DrawDay 
                                    v-for="( item ) in showData" 
                                    :key="item.id" 
                                    :data="item"  
                                    :dayNum="item.dayNum"
                                    :minCalibration="minCalibration"
                                    
                                />

                                <div v-if="barType=='day'"  class="today" :style="{left:tagToLeft+minCalibration/2+'px'}">今天</div>
                            </div>
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

                        
                        <EditArticle 
                            v-if="leftEndpoint.year && type== 'edit'"
                            :minCalibration="minCalibration"
                            :startDate="leftEndpoint"
                            :data="item"
                            v-for="(item,index) in data" 
                            :key="item.id"
                            :type="type"
                            :index="index"
                            :todayDetail="{width:minCalibration,left:tagToLeft}"
                            @editClick="editClick"
                        />
                        
                        <ViewArticle  
                            v-if="leftEndpoint.year && type== 'view'"
                            v-for="item in listData"
                            :data="item"
                            :key="item.id"
                            :id="item.id" 
                            :leftEndpoint="leftEndpoint"
                            :minCalibration="minCalibration"
                            :todayDetail="{width:minCalibration,left:tagToLeft}"
                        />
                        <div class='today-flag' :style="{left:tagToLeft+'px',width:minCalibration+'px'}"></div>
                    </div>
                </div>
            </div>
            <div id="gantt-chart-tool-tip"></div>
            <slot name="leftBar"></slot>
        </div>      
    </div>

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import DrawDay from './DrawDay';
import DrawMonth from './DrawMonth';
import DrawWeek from './DrawWeek';
import EditArticle from './EditArticle';
import ViewArticle from './ViewArticle';
import KrField from '~/components/KrField';
export default {
    components:{
        DrawDay,
        DrawMonth,
        DrawWeek,
        EditArticle,
        KrField,
        ViewArticle
    },
    props:{
        data:{
            type:Array,
            default:()=>[]
        },
        type:{
            type:String,
            default:'view'
        },
        start:{
            type:String,
        },
        end:{
            type:String
        },
        treeData:{
            default:()=>[],
            type:Array,
        },
        listData:{
            default:()=>[],
            type:Array,
        },
        treeIds:{
            default:'',
            type:String
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
                dayNum:this.getDayNum(this.getToday().year,this.getToday().month)
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
                    label: '月'
                },
                {
                    value: 'week',
                    label: '周'
                },
                {
                    value: 'day',
                    label: '天'
                }
            ],
            //下拉的默认值
            barType: 'week',
            isLoading:true,
            mask:false,
            scrollWidth:0,
            tagToLeft:0,
        }
    },
    mounted(){
        this.scrollWidth = utils.getScrollBarSize()
       
        this.limitDay(this.barType);
        setTimeout(() => {
            this.scroolFix()
        }, 100);

        if(this.data.length){
            this.circleId(this.data);
        }
    },
   
    updated(){
        this.mask=this.treeData.length?true:false;
    },
    methods:{
        editClick(id,pid){
            this.$emit('editClick',id,pid);
        },
        circleId(data,param){
            data.map((item,index)=>{
                item.pid=param?param:'';
                if(item.children&&item.children.length){
                    this.circleId(item.children,item.value);
                }
            })
        },
        scroolFix(data){
            var dom = document.getElementById("vue-chart-right-draw-content");
            if(dom){
                var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
                var offerLeft = 0;
                var todayIsWeek = 0;
                if(this.barType == 'day' || this.barType == 'week'){
                    var todayIsWeek = (new Date()).getDay();
                    offerLeft = (todayIsWeek+6) * this.minCalibration

                }else{
                    var todayArr = today.split('-');
                    var todayObj = {
                        year:+today[0],
                        month:+today[1],
                        dayNum:+today[2],
                    }
                    todayObj.month -=1;
                    if(todayObj.month<0){
                        todayObj.month = 12 - todayObj.month;
                        todayObj.year -=1;
                    }
                    offerLeft = (this.getDayNum(todayObj.year,todayObj.month)+todayObj.dayNum)*this.minCalibration;

                }   
                dom.scrollLeft = (this.getTodayTOLeft(this.showData)-offerLeft);
            }
        },
        getTodayTOLeft(data){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+startMonth.start;

            this.tagToLeft = utils.dateDiff(today,startTime)*this.minCalibration;
            return utils.dateDiff(today,startTime)*this.minCalibration;
        },
        treeClick(params){
            this.$emit('treeClick',params);
        },
        treeChange(event){
            this.$emit('treeChange',event);
        },
        //获取年数组
        getYears(startTime,endTime){
            var startArr = startTime.split('-');
            var endArr = endTime.split('-');
            var startObj = {
                year:+startArr[0],
                month:+startArr[1],
            }
            var endObj = {
                year:+endArr[0],
                month:+endArr[1]
            }
            endObj.month = endObj.month +1;
            if(endObj>12){
                endObj.month = endObj.month -1;
                endObj.year = endObj.year +1;
            }
            var yearArr = [];
            if(startObj.year == endObj.year){
               yearArr=[{
                   year:startObj.year,
                   start:this.startTime,
                   end:endObj.year+'-'+endObj.month+'-'+this.getDayNum(endObj.year,endObj.month)
               }]
            }else{
                yearArr=[{
                    year:startObj.year,
                    start:startObj.year+'-'+startObj.month+'-'+1,
                    end:startObj.year+'-'+12+'-'+this.getDayNum(startObj.year,12)
                }]
                for (var year = startObj.year; ;) {
                        year++;
                        if(year == endObj.year){
                            yearArr.push({
                                year:endObj.year,
                                start:endObj.year+'-'+1+'-'+1,
                                end:endObj.year+'-'+endObj.month+'-'+this.getDayNum(endObj.year,endObj.month)
                            })
                            break;
                        }
                        yearArr.push({
                            year:year,
                            start:year+'-'+1+'-'+1,
                            end:year+'-'+12+'-'+this.getDayNum(year,12)
                        })
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
                this.minCalibration = 10;
            }
            this.limitDay(event);
            this.scroolFix();
        },
        limitDay(type){
            var start = this.startTime;
            var startArr = start.split('-');
            var startObj= {
                year:+startArr[0],
                month:+startArr[1],
                day:+startArr[2]
            };
            if(type=='week' || type =='day'){
                var startToWeek = (new Date(start)).getDay();
                var offset = 7+startToWeek-1;
                if(startObj.day-offset<0){
                    startObj.month -=1;
                    if(startObj.month<0){
                        startObj.month = 12+ startObj.month;
                        startObj.year -=1;
                    }
                    startObj.day = this.getDayNum(startObj.year,startObj.month)+startObj.day-offset;
                }else{
                    
                     startObj.day = startObj.day-offset;
                }
            }else{
                startObj.month -=1;
                if(startObj.month<0){
                    startObj.month = 12+ startObj.month;
                    startObj.year -=1;
                }
                startObj.day =1;
            }
            this.init(startObj.year+'-'+startObj.month+ '-' +startObj.day,this.endTime);
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
        //获取当月的天数
        getDayNum(year,month){
            var d= new Date(year, month, 0);  
            return d.getDate();   
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
                    length:this.getDayNum(year,month)-startDay+1,
                    dayNum:this.getDayNum(year,month),
                })
                if((year+'-'+month) == (endObj.year+'-'+endObj.month)){
                    break;
                }
                month++;
            }
            this.showData = [].concat(showData);
            this.leftEndpoint = this.showData[0];
            this.isLoading = false;
            this.getDayBarWidth()
            //获取周的具体数据
            this.getWeekStartAndEnd(showData);
            this.getTodayTOLeft(showData);
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
                day:min.start + weekObj.start,
            }
            if(end.day>this.getDayNum(end.year,end.month)){
               end.day = end.day -this.getDayNum(end.year,end.month)-1;
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

            })
            this.weeks = [].concat(arr);
            
        },
        //每周的具体内容校正
        dayToWeekDetail(weeks){
            
            var obj = Object.assign({},weeks);
            var dayNum = this.getDayNum(obj.year,obj.month)
           
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

        },
        rightOver(event){
            this.$emit('rightOver',event);
        },
    },
   

}
</script>

<style lang="less">
   .chart-ul-wrap{
        width:100%;
        box-sizing: border-box;
        display:inline-block;
        position: relative;
        padding-left:25px; 
         #gantt-chart-tool-tip{
                width: 250px;
                min-height: 50px;
                display: none;
                background: rgba(70,76,91,.9);
                position: absolute;
                top: 500px;
                left: 500px;
                border-radius: 4px;
                padding: 5px;
                color: #ffffff;
                .title{
                    font-size: 14px;
                    background: transparent;

                }
                .content{
                    font-size: 12px;
                    background: transparent;
                    
                }
            }
            #gantt-chart-tool-tip::before{
                content: '';
                position: absolute;
                display:block;
                // margin:10px;
                width:0;
                height:0;
                border-style:solid;
                border-width:5px;
                top: -10px;
                left: 10px;
                border-color:transparent transparent rgba(70,76,91,.9) transparent;
            }
        .chart-tab-left{
            width:346px;
            border: 1px solid #F6F6F6;
            border-right:5px solid #F6F6F6;
            display:inline-block;
            border-bottom: none;
            .chart-left{
                overflow: hidden;
                .ivu-tabs-nav{
                   width:100%;
                   height: 51px;
                   line-height: 51px;
                //    padding-top: 8px;
                   .ivu-tabs-ink-bar{
                    //    width:58px !important;
                    //    left: 56px;
                    height: 2px;
                   }
                }
            }
            .ivu-tabs-mini .ivu-tabs-tab{
                width:50%;
                text-align: center;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                line-height: 20px;
                position: relative;
                top: -10px;
            }
            .ivu-tabs-nav .ivu-tabs-tab-active{
                color: #4A90E2;
            }
        }
        .right-draw{
            position: absolute;
            overflow:auto;
            left: 371px;
            right: 0px;
           
            .calibration  {
                width:100%;
                position:relative;
                overflow:hidden;
                height: 101px;
                ::-webkit-scrollbar {
                        width:0px;
                }
            }
            
        }
        #vue-chart-right-draw-content{
            max-height:500px;
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
            }
            
        }
        .content{
            position: relative;
          
            background: #F6F6F6;
            .view-article:first-child .view-channel:first-child .every-view-col:first-child .article{
                top: 0px;
            }
           
        }
        .hander{
            margin-top:20px;
            height: 50px; 
            width: 100%;
            text-align: right;
            //padding-left: 250px;
            .header-left{
                display:inline-block;
                float:left;
            }
            .article{
                display: inline-block;
                width: 30px;
                height: 15px;
                border-radius: 100px;
                margin-left: 10px; 
            }
        }
        .day-bar,.month-bar,.week-bar,.year-bar{
            height: 50px;
            position: relative;
            

        }
        .year-bar{
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
            width: 30px;
            height: 15px;
            background: #499DF1;
            border-radius: 0 0 4px 4px;
            text-align: center;
            line-height: 15px;
            position: absolute;
            top: 0px;
            color: #ffffff;
            font-size: 12px;
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
   }
   .tab-second-title{
        height:45px;
    }
   
</style>
