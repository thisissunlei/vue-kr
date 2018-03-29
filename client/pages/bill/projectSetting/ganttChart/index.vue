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
                                <div class="year" :style="{width:item.dayNum * minCalibration + 'px'}" v-for=" item in years" :key="item.id"><span>{{item.year}}</span></div>
                            </div>
                            <div class='month-bar' :style="{background:barType=='month'?'#FAFCFF;':'#fff'}" >
                                <div v-if="barType=='month'" class="bar-line" :style="{left:tagToLeft+minCalibration/2+'px',}"></div>
                                
                                <DrawMonth 
                                    v-for="( item ) in showData" 
                                    :key="item.id"  
                                    :dayNum="item.dayNum" 
                                    :data="item"
                                    :minCalibration="minCalibration"
                                    
                                />
                                
                                <div v-if="barType=='month'" class="today" :style="{left:tagToLeft+minCalibration/2+'px'}">今天</div>
                                
                            </div>
                            <div v-if="barType=='week'" class='week-bar' style="background:#FAFCFF">
                                <div v-if="barType=='week'" class="bar-line" :style="{left:tagToLeft+minCalibration/2+'px',}"></div>
                                
                                <DrawWeek 
                                    v-for="(item) in weeks" 
                                    :key="item.id" 
                                    :data="item" 
                                    :minCalibration="minCalibration"
                                    
                                />
                                <div v-if="barType=='week'"  class="today" :style="{left:tagToLeft+minCalibration/2+'px',}">今天</div>
                                
                            </div>
                            
                            <div v-if="barType=='day'" class='day-bar' style="background:#FAFCFF">
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
                        
                    </div>
                </div>
            </div>
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
        startTime:{
            type:String,
        },
        endTime:{
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
        this.init(this.startTime,this.endTime);
        this.getYears(this.startTime,this.endTime);
        setTimeout(() => {
            this.scroolFix()
           
        }, 100);
       
    },
   
    updated(){
        this.mask=this.treeData.length?true:false;
    },
    methods:{
        scroolFix(data){
            var dom = document.getElementById("vue-chart-right-draw-content");
            dom.scrollLeft = this.getTodayTOLeft(this.showData);
        },
        getTodayTOLeft(data){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var startMonth = data[0];
            var startTime = startMonth.year + '-'+startMonth.month+'-'+1;

            this.tagToLeft = utils.dateDiff(today,startTime)*this.minCalibration;
            return utils.dateDiff(today,startTime)*this.minCalibration;
        },
        treeClick(params){
            this.$emit('treeClick',params);
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
            var yearArr = [];
            if(startObj.year == endObj.year){
               yearArr=[{
                   year:startObj.year,
                   start:this.startTime,
                   end:this.endTime
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
                            start:year+'-'+1+1,
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
            this.scroolFix();
        },
        //获取进度条的总长度
        getDayBarWidth(){
            var barWidth = 0;
            for (var i = 0; i < this.showData.length; i++) {
                barWidth += this.showData[i].dayNum;
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
                
                if(month >12){
                    month = month-12;
                    year +=1; 
                }
               
                showData.push({
                    year:year,
                    month:month,
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
            var start = new Date(min.year,min.month-1,1);
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
                    day:1
            }
            var length = weekObj.start;
            var end= {
                year:start.year,
                month:start.month,
                day:weekObj.start,
            }
            var arr = [{
                start:Object.assign({},start),
                length:length,
                end:Object.assign({},end)
            }]
            for (var i = 1; i <weekObj.weeks ;i++) {
               
                start.day = +end.day + 1,
                start.month = end.month,
                start = Object.assign({},this.dayToWeekDetail(start));
                // console.log(start,"ooooooooo")
                end.day = start.day + 6;
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
        height: 800px;
        box-sizing: border-box;
        display:inline-block;
        overflow: auto;
        position: relative;
        padding-left:25px; 
        .chart-tab-left{
            width:346px;
            border: 1px solid #F6F6F6;
            border-right:5px solid #F6F6F6;
            display:inline-block;
            border-bottom: none;
            .chart-left{
                .ivu-tabs-tab{
                    color:#333;
                }
                .ivu-tabs-nav{
                   width:100%;
                   height: 51px;
                   padding-top: 8px;
                   .ivu-tabs-ink-bar{
                    //    width:58px !important;
                    //    left: 56px;
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
            
        }
        .content{
            position: relative;
          
            background: #F6F6F6;
           
           
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
            width: 1px;
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
