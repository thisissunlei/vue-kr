<template>
    <div>
        <!-- 甘特图部分 -->
        <div class='chart-ul-wrap' >
           
                <div class="hander" >
                    <div style="display:inline-block;margin-top: 6px;">
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
                        
                        <span style="float:right;margin-top:6px;margin-right:20px;margin-left:40px;font-size:14px;color:#333333;">
                        时间轴最小刻度
                        </span>

                        <Form label-position="left" style="float:right;">      
                                <KrField 
                                    v-if="mask"
                                    type="selectTree" 
                                    :data="treeData" 
                                    @okClick="treeClick"
                                />
                        </Form>

                        <span style="float:right;margin-top:8px;margin-right:20px;font-size:14px;color:#333333;">
                        甘特图显示任务项
                        </span>

                    </div>


            <div 
               
                class="right-draw" 
                style="overflow:hidden;"
            >
                 <div style="overflow:hidden;width:100%;position:relative;"  >
                    <div ref="rightBar" v-if="!isLoading" class="bar" :style="{width: dayAllNum * minCalibration+'px'}">
                        <div :style="{width:dayAllNum*minCalibration+'px'}">
                            <div class="year-bar" v-if="years && years.length && barType=='month'" style="background:#F5F6FA;">
                                <div class="year" :style="{width:item.dayNum * minCalibration + 'px'}" v-for=" item in years" :key="item.id"><span>{{item.year}}</span></div>
                            </div>
                            <div class='month-bar' :style="{background:barType=='month'?'#fff':'#F5F6FA'}" >
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

                 </div>
                <div
                    @scroll="rightScroll"
                    id="vue-chart-right-draw-content"
                >
                    <div    
                        class="content"
                        :style="{width:dayAllNum*minCalibration+'px'}"
                       
                    >
                    
                        <EditArticle 
                            v-if="leftEndpoint && type== 'edit'"
                            :minCalibration="minCalibration"
                            :startDate="leftEndpoint"
                            :data="item"
                            v-for="item in data" 
                            :key="item.id"
                            :type="type"
                        />
                         <!-- <Article 
                            v-if="leftEndpoint && type== 'view'"
                            :minCalibration="minCalibration"
                            :startDate="leftEndpoint"
                            v-for="item in listData"
                            :data="listData"
                            :key="item.id"
                        /> -->
                        <ViewArticle  
                            v-if="type== 'view'"
                            v-for="item in listData"
                            :data="listData"
                            :key="item.id" 
                            :leftEndpoint="leftEndpoint"
                            :minCalibration="minCalibration"
                        />
                    </div>

                    <div style="height:1000px"></div>
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
            mask:false
        }
    },
    mounted(){
        this.init(this.startTime,this.endTime);
        this.getDayBarWidth()
        //获取周的具体数据
        this.getWeekStartAndEnd();
        this.getYears(this.showData);
    },
    updated(){
        if(this.treeData.length){
           this.recursiveFn(this.treeData);
        }
        this.mask=this.treeData.length?true:false;
    },
    methods:{
        treeClick(params){
            console.log('gggg',params);
        },
        //递归赋值
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
        //获取年数组
        getYears(arr){
            var allYears = [];
            var startMonth = arr[0] ,
                endMonth = arr[arr.length - 1];
            var startDay = '',endDay='';
            if(startMonth.year === endMonth.year){
                startDay = startMonth.year+'-'+startMonth.month+'-'+'1';
                endDay = endMonth.year+'-'+endMonth.month+'-'+endMonth.dayNum;
                allYears.push({
                    year:startMonth.year,
                    dayNum:utils.dateDiff(startDay,endDay)+1
                })
            }else{
                for (var i = startMonth.year; i <= endMonth.year; i++) {
                    startDay = i+'-'+1+'-'+1;
                    endDay =i.year+'-'+12+'-'+this.getDayNum(i,12);
                    if(i==startMonth.year){
                        startDay = startMonth.year+'-'+startMonth.month+'-'+'1';
                    }
                    if(i==endMonth.year){
                        endDay = startMonth.year+'-'+startMonth.month+'-'+this.getDayNum(endMonth.year,endMonth.month);
                    }
                    allYears.push({
                        year:i,
                        dayNum:utils.dateDiff(startDay,endDay)+1
                    })
                }
            }
            this.years = [].concat(allYears);
        },
        //下拉事件被触发
        selectChange(event){
            if(event=="week"){
                this.minCalibration = 20;
            }else if(event=='day'){
                this.minCalibration = 50;
            }else if(event=='month'){
                this.minCalibration = 5;
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
                 console.log(startObj,endObj,"ooooooo")
            var showData = [];
            for(var month=startObj.month,year=startObj.year;!(month==endObj.month && year == endObj.year); month++){
                if(month >12){
                    month = month-12;
                    year +=1; 
                }
                
                showData.push({
                    year:year,
                    month:month,
                    dayNum:this.getDayNum(year,month),
                })
                

            }
           

            this.showData = [].concat(showData);
            
            this.leftEndpoint = this.showData[0];
            console.log(this.leftEndpoint,"pppppp")
            this.isLoading = false;
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
        rightScroll(event){
            var el = event.target;
            var top = el.scrollTop;
            var left = el.scrollLeft;
            this.$refs.rightBar.style.left = -left+'px';

            this.$emit('scroll',event);
        }
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
        }
        .right-draw{
            position: absolute;
           
            left: 271px;
            right: 0px;
        }
        #vue-chart-right-draw-content{
            max-height:500px;
            width: 100%;
            overflow:auto;
        }
        .content{
          
           
            .every-col{
                height: 70px;
                border-top: 1px solid #E1E6EB;;
                border-bottom: 1px solid #E1E6EB;
            }
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
        .day-bar,.month-bar,.week-bar,.year-bar{
            height: 50px;

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
                border-bottom: 1px solid #E1E6EB;;
                border-right: 1px solid #E1E6EB;
                transition: all 0.3;
            }
        }
        
        .bar{
            position: relative;
            border-top: 1px solid #E1E6EB;
        }
   }
   .tab-second-title{
        height:70px;
    }
   
</style>
