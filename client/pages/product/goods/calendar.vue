<template>
    <div class="date">
        <div class="mouth">
            <ul>
                <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
                <li class="arrow prev" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-month">{{ currentMonth }}月&nbsp;</span>
                    <span class="choose-year">{{ currentYear }}年</span>
                </li>
                <li class="arrow next" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div>
        <ul class="weekdays">
            <li>周一</li>
            <li>周二</li>
            <li>周三</li>
            <li>周四</li>
            <li>周五</li>
            <li>周六</li>
            <li>周日</li>
        </ul>
        <ul class="days">
            <li  v-for="dayobject in days">
                <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                <span v-else>
                    <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                    <span v-else-if="dayobject.day.getDay() == '0' || dayobject.day.getDay() == '6' " class="weekend" >{{ dayobject.day.getDate() }}</span>
                    <span v-else @click="pick(dayobject)">{{ dayobject.day.getDate() }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentYear: 1970,  // 年份
            currentMonth: 1, // 月份
            currentDay: 1,  // 日期
            currentWeek: 1,  // 星期
            days: [],
        }
    },
 
    mounted () {
 
    },
 
    created () {
        this.initData(null)
    },
    methods: {
        pick(day){
            console.log(day)
            
        },
        initData: function(cur) {
            var leftcount=0; //存放剩余数量
            var date;


            if (cur) {
                date = new Date(cur);
            } else {
                var now=new Date();
                var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                d.setDate(35);
                date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            //第一天是星期几
            this.currentWeek = date.getDay(); // 1...6,0
            
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                
                var d = new Date(str);
              
                d.setDate(d.getDate() - i);
              
                var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                dayobject.day=d;
                this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用

            }
            //其他周
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                var dayobject={};
                dayobject.day=d;
                this.days.push(dayobject);
            }

        },
        pickPre: function(year, month) {

            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        // pickYear: function(year, month) {
        //     alert(year + "," + month);
        // },

        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },

    }
}
</script>

<style lang="less">
    .date{
        width: 420px;
        height: 300px;
        background: #f5f7f9;
        margin-left: -140px;
        .mouth{
            height: 30px;
            text-align: center;
            line-height: 30px;
            .year-month{
                text-align: center;
            }
            .prev{
                float:left;
                margin-left: 10px;
            }
            .next{
                float: right;
                margin-right: 10px;
                margin-top: -30px;
            }
        }
        .weekdays{
            height: 50px;
        }
        .weekdays li{
            float: left;
            width: 60px;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }
        .days li{
            float: left;
            width:60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            .other-month{
                color: #ccc;
            }
            .active{
                color: red;
            }
            .weekend{
                color: blue;
            }
        }
    }
</style>


