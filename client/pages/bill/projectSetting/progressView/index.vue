<template>
    <div>
        <!-- 甘特图部分 -->
        <div class='chart-ul-wrap' v-if="!isLoading">
            <div class="hander">
                <div style="display:inline-block">
                     <span style="vertical-align:middle;">项目计划</span>
                     <span 
                        class="article" 
                        style="background:#4F9EED;vertical-align:middle;"
                    ></span>
                </div>
                <div style="display:inline-block;margin-left:40px;">
                    <span style="vertical-align:middle;">当前进展</span>
                    <span 
                        class="article" 
                        style="background:#FDBA4D;vertical-align:middle;"
                    ></span>
                </div>
               
                <Select 
                    v-model="barType" 
                    @on-change="selectChange"
                    style="width:200px;float:right;margin-right:20px;"
                >
                    <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
           
            <div class="right-draw" style="overflow:auto;">

           
                <div class="bar" :style="{width:dayAllNum*minCalibration+'px'}">
                    <div :style="{width:dayAllNum*minCalibration+'px'}">
                        <div class="year-bar" v-if="years && years.length">
                            <div class="year" :style="{width:item.dayNum * minCalibration + 'px'}" v-for=" item in years" :key="item.id"><span>{{item.year}}</span></div>
                        </div>
                        <div class='month-bar' style="background:#F5F6FA;" >
                            <DrawMonth 
                                v-for="( item ) in showData" 
                                :key="item.id"  
                                :dayNum="item.dayNum" 
                                :data="item"
                                :minCalibration="minCalibration"
                            />
                        </div>
                        <div v-if="barType=='week'" class='week-bar'>
                            <DrawWeek 
                                v-for="(item) in weeks" 
                                :key="item.id" 
                                :data="item" 
                                :minCalibration="minCalibration"
                            />
                        </div>
                        
                        <div v-if="barType=='day'" class='day-bar' >
                            <DrawDay 
                                v-for="( item ) in showData" 
                                :key="item.id" :data="item"  
                                :dayNum="item.dayNum"
                                :minCalibration="minCalibration"
                            />
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div style="position:relative;">
                        <Article 
                            :minCalibration="minCalibration"
                            :startDate="leftEndpoint"
                        />
                    </div>
                </div>
            </div>
             <!-- 左侧切换部分内容 -->
            <div class='chart-tab-left'>
                <div class='chart-left'>
                    <Tabs size="small">
                        <TabPane label="待开业项目">
                            <TableList
                                :listData="todoData"
                                @rowClick="rowClick"
                                v-if="mask"
                            />
                        </TabPane>
                        <TabPane label="投拓期项目">
                            <TableList
                                :listData="downData"
                                @rowClick="rowClick"
                                v-if="!mask"
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>      
    </div>

</template>

<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import DrawDay from './DrawDay';
import DrawMonth from './DrawMonth';
import DrawWeek from './DrawWeek';
import Article from './Article';
import TableList from './tableList';
export default {
    components:{
        DrawDay,
        DrawMonth,
        DrawWeek,
        Article,
        TableList
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
            minCalibration:50,
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
            barType: 'day',
            isLoading:true,


            todoData:[
                {name:'俊浩中牙膏公园你好好',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            downData:[
                {name:'1',communityName:'2',city:'3',tId:'1'},
                {name:'6',communityName:'7',city:'8',tId:'2'},
            ],
            mask:true
        }
    },
    mounted(){
        this.init(2);
        this.getDayBarWidth()
        //获取周的具体数据
        this.getWeekStartAndEnd();
        this.getYears(this.showData);

    },
    methods:{
        getYears(arr){
         var allYears = [];
         var everuYearDayNum = 0;
           for (var i = 0; i < arr.length; i++) {
               for(var j=0;j<allYears.length;j++){
                //    if(allYears[j].year !=arr[i].year){
                //         if(allYears.length){
                //             allYears[allYears.length-1].dayNum=everuYearDayNum;
                //         }
                            
                            
                //             everuYearDayNum = arr[i].dayNum;
                //             allYears.push({year:arr[i].year,dayNum:0});
                        
                            
                        
                //     }else{
                //         break;
                //             everuYearDayNum +=arr[i].dayNum;
                //     }
               }
           }
           if(allYears.length == 1){
               allYears[allYears.length-1].dayNum=everuYearDayNum;
           }
           
           this.years = [].concat(allYears);
        },
        //数组去重
        distinct(arr) {
          
        },
        //跳转编辑页
        rowClick(item){
            window.open(`./projectSetting/progressView/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
        },
        //下拉事件被触发
        selectChange(event){
            if(event=="week"){
                this.minCalibration = 20;
            }else if(event=='day'){
                this.minCalibration = 50;
            }
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
        init(volatility=2){
            var nowMonth = {
                year:this.today.year,
                month:this.today.month
            }
            this.prev(nowMonth,volatility);
            this.next(nowMonth,volatility);
            this.leftEndpoint = this.showData[0];
            this.isLoading = false;
        },
        //数据向前初始化
        prev(nowMonth,volatility){
            var everyMonth={};
            for(var i=1;i<=volatility;i++){
                var month = nowMonth.month - i;
                if(month <= 0){
                    var addNum = month%12==0?1:0;
                   everyMonth = {
                        year: nowMonth.year + Math.floor(month/12)-addNum,
                        month: 12 + month%12
                    }
                }else{
                    everyMonth = {
                        year: nowMonth.year,
                        month: month%12
                    }
                }

                everyMonth.dayNum = this.getDayNum(everyMonth.year,everyMonth.month);
                this.showData.unshift(everyMonth)
            }
        },
        //数据向后初始化
        next(nowMonth,volatility){
            var everyMonth={};
            for(var i=1;i<=volatility;i++){
                var month = nowMonth.month + i;
                var addNum = month%12==0?1:0;
                var addMonth= month%12==0?12:0;
                if(month >= 12){
                    everyMonth={
                        year: nowMonth.year + Math.floor(month/12)-addNum,
                        month: (month-12)%12 + addMonth
                    }
                }else{
                    everyMonth = {
                        year: nowMonth.year,
                        month: month%12
                    }
                }
                everyMonth.dayNum = this.getDayNum(everyMonth.year,everyMonth.month);
                this.showData.push(everyMonth)
            }
        },
        //获取某日为周几
        getWeekNum(year,month,day){
            var date = new Date(year,month-1,day);
            return date.getDay()==0?7:date.getDay()
        },
        //获取周的数据
        getWeekStartAndEnd(){
            var min = this.showData[0];
            var max = this.showData[this.showData.length-1];
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
            for (var i = 0; i <weekObj.weeks ;i++) {
               
                start.day = end.day + 1,
                start = Object.assign(this.dayToWeekDetail(start));
                end.day = start.day + 6;
                end = Object.assign(this.dayToWeekDetail(end));
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
        dayToWeekDetail(weeks,start){
            
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
        //列表跳转详情
        rowClick(item){
            window.open(`./projectSetting/projectDetail?name=${item.name}&id=${item.tId}&city=${item.city}`,'_blank');
        },
        //tab切换
        tabsClick(key){
            if(key=='name2'){
                this.mask=false;
            }else{
                this.mask=true;
            }
        }
    }

}
</script>

<style lang="less">
   .chart-ul-wrap{
        width:100%;
        height: 400px;
        box-sizing: border-box;
      
        display:inline-block;
        overflow: auto;
        .chart-tab-left{
            
            padding: 16px 0px 0px 0px;
            width:246px;
            border: 1px solid #E1E6EB;
            display:inline-block;
            .chart-left{
                .ivu-tabs-bar{
                    width:195px;
                    margin:0 auto;
                }
            }
        }
        .right-draw{
            position: absolute;
           
            left: 246px;
            right: 0px;
        }
        .content{
           
            overflow:-webkit-paged-x;
        }
        .hander{
            margin-top:20px;
            height: 50px; 
            width: 100%;
            padding-left: 250px;
            .article{
                display: inline-block;
                width: 80px;
                height: 15px;
                border-radius: 100px;
                margin-left: 10px; 
            }
        }
        .day-bar,.month-bar,.week-bar,.day-bar{
            height: 50px;

        }
        .day-bar{
            .year{
               
                height: 50px;
                line-height: 50px;
                width: 50px;
                text-align: center;
                display: inline-block;
                box-sizing: border-box;
                border-bottom: 1px solid #CAD5E4;;
                border-right: 1px solid #CAD5E4;
                transition: all 0.3;
            }
        }
        
        .bar{
            border-top: 1px solid #CAD5E4;
            border-left: 1px solid #CAD5E4;
        }
   }
   .tab-second-title{
        height:70px;
    }
   
</style>
