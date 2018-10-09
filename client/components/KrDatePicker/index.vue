<template>
    <div class="date-picker">
        <!-- <div class="input-wrapper" @mouseenter="showCancel = true" @mouseleave="showCancel = false">
            <div class="input" @click="togglePanel" v-text="range ? value[0] + ' -- ' + value[1] : value"></div>
            <transition name="fade">
                <img class="cancel-btn" src="./cancel.png" v-show="showCancel" @click="clear">
                <button class="cancel-btn"  v-show="showCancel" @click="clear" />
            </transition>
        </div> -->
        <transition name="toggle">
            <div class="date-panel" v-show="panelState" :style="coordinates">
                <div class="panel-header" v-show="panelType !== 'year'">
                    <div class="arrow-left" @click="prevMonthPreview()">&lt;</div>
                    <div class="year-month-box">
                        <div class="month-box" @click="chType('month')">{{tmpMonth+1| month(language)}}</div>
                        <div class="year-box" @click="chType('year')">{{tmpYear}}年</div>
                    </div>
                    <div class="arrow-right" @click="nextMonthPreview()">&gt;</div>
                </div>
                <div class="panel-header" v-show="panelType === 'year'">
                    <div class="arrow-left" @click="chYearRange(0)">&lt;</div>
                    <div class="year-range">
                        <span v-text="yearList[0]"></span> -
                        <span v-text="yearList[yearList.length - 1]"></span>
                    </div>
                    <div class="arrow-right" @click="chYearRange(1)">&gt;</div>
                </div>
                <div class="type-year" v-show="panelType === 'year'">
                    <ul class="year-list">
                        <li v-for="item in yearList" v-text="item" :key="item" :class="{selected: isSelected('year', item), invalid: validateYear(item)}" @click="selectYear(item)">
                        </li>
                    </ul>
                </div>
                <div class="type-month" v-show="panelType === 'month'">
                    <ul class="month-list">
                        <li v-for="(item, index) in monthList" :key="item" :class="{selected: isSelected('month', index), invalid: validateMonth(index)}" @click="selectMonth(index)">
                            {{item | month(language)}}
                        </li>
                    </ul>
                </div>
                <div class="type-date" v-show="panelType === 'date'">
                    <ul class="weeks">
                        <li v-for="item in weekList" :key="item">{{item | week(language)}}</li>
                    </ul>
                    <ul class="date-list">
                        <li v-for="(item, index) in dateList" :key="index" :class="{preMonth: item.previousMonth||isLessToday(item), nextMonth: item.nextMonth,
                                invalid: validateDate(item), firstItem: (index % 7) === 0,weekend:validateWeekend(item),today: isToday(item)==='今天'}" @click="selectDate(item)">
                            <div class="message" :class="{selected: isSelected('date', item)}">
                                <div class="bg"></div>
                                <span>{{isToday(item)}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        language: { default: 'zh-cn' },
        min: { default: '1970-01-01' },
        max: { default: '3016-01-01' },
        value: {
            type: [Number, Array],
            default: () => []
        },
        range: {
            type: Boolean,
            default: false
        },
        disabled:{
            default:false,
            type:Boolean
        }
    },
    data() {
        let now = new Date();
        let tempDate = now;
        tempDate = this.value.length ? new Date(this.value[0]) : new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return {
            showCancel: false,
            panelState: true,
            panelType: 'date',
            coordinates: {},

            year: tempDate.getFullYear(),
            month: tempDate.getMonth(),
            date: tempDate.getDate(),

            tmpYear: tempDate.getFullYear(),
            tmpMonth: tempDate.getMonth(),
            tempDay: tempDate.getDate(),

            minYear: Number,
            minMonth: Number,
            minDate: Number,
            maxYear: Number,
            maxMonth: Number,
            maxDate: Number,
            yearList: Array.from({ length: 12 }, (value, index) => new Date().getFullYear() + index),
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            weekList: [0, 1, 2, 3, 4, 5, 6],
            rangeStart: false
        }
    },
    watch: {
        min(v) {
            let minArr = v.split('-')
            this.minYear = Number(minArr[0])
            this.minMonth = Number(minArr[1])
            this.minDate = Number(minArr[2])
        },
        max(v) {
            let maxArr = v.split('-')
            this.maxYear = Number(maxArr[0])
            this.maxMonth = Number(maxArr[1])
            this.maxDate = Number(maxArr[2])
        }
    },
    computed: {
        dateList() {
            let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
            let dateList = Array.from({ length: currentMonthLength }, (val, index) => {
                return {
                    currentMonth: true,
                    value: index + 1
                }
            })
            let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay()
            let previousMongthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate()
            for (let i = 0, len = startDay; i < len; i++) {
                dateList = [{ previousMonth: true, value: previousMongthLength - i }].concat(dateList)
            }
            for (let i = dateList.length, item = 1; i < 42; i++ , item++) {
                dateList[dateList.length] = { nextMonth: true, value: item }
            }
            return dateList
        }
    },
    filters: {
        week: (item, lang) => {
            switch (lang) {
                case 'en':
                    return { 0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa' }[item]
                case 'zh-cn':
                    return { 0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' }[item]
                case 'uk':
                    return { 0: 'Пн', 1: 'Вт', 2: 'Ср', 3: 'Чт', 4: 'Пт', 5: 'Сб', 6: 'Нд' }[item]
                case 'es':
                    return { 0: 'Do', 1: 'Lu', 2: 'Ma', 3: 'Mi', 4: 'Ju', 5: 'Vi', 6: 'Sa' }[item]
                default:
                    return item
            }
        },
        month: (item, lang) => {
            switch (lang) {
                case 'en':
                    return {
                        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
                    }[item]
                case 'zh-cn':
                    return {
                        1: '1月', 2: '2月', 3: '3月', 4: '4月', 5: '5月', 6: '6月',
                        7: '7月', 8: '8月', 9: '9月', 10: '10月', 11: '11月', 12: '12月'
                    }[item]
                case 'uk':
                    return {
                        1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
                        7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'
                    }[item]
                case 'es':
                    return {
                        1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
                        7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
                    }[item]
                default:
                    return item
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300) {
                this.coordinates = { right: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px` }
            } else {
                this.coordinates = { left: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px` }
            }
            let minArr = this.min.split('-')
            this.minYear = Number(minArr[0])
            this.minMonth = Number(minArr[1])
            this.minDate = Number(minArr[2])
            let maxArr = this.max.split('-')
            this.maxYear = Number(maxArr[0])
            this.maxMonth = Number(maxArr[1])
            this.maxDate = Number(maxArr[2])
        })
    },

    methods: {
        togglePanel() {
            this.panelState = !this.panelState
            this.rangeStart = false
        },
        isSelected(type, item) {
            switch (type) {
                case 'year':
                    return item === this.tmpYear
                case 'month':
                    return item === this.tmpMonth && this.year === this.tmpYear
                case 'date':
                    if (item.value == 12) {
                        // debugger
                    }
                    let month = this.tmpMonth
                    if (item.nextMonth) {
                        month++
                    } else if (item.previousMonth) {
                        month--
                    }
                    let ticks = (new Date(this.tmpYear, month, item.value)).getTime()
                    return this.value.includes(ticks)
            }
        },
        chType(type) {
            this.panelType = type
        },
        //改变年份
        chYearRange(next) {
            if (next) {
                this.yearList = this.yearList.map((i) => i + 12)
            } else {
                this.yearList = this.yearList.map((i) => i - 12)
            }
        },
        //上一月
        prevMonthPreview() {
            this.tmpMonth = this.tmpMonth - 1
            
            if (this.tmpMonth < 0) {
                this.tmpMonth = 11
                this.tmpYear--
            }
        },
        //下一月
        nextMonthPreview() {
            this.tmpMonth = this.tmpMonth + 1
           
            if (this.tmpMonth == 11) {
                // console.log('this.tmpMonth', this.tmpMonth);
                this.tmpMonth = 0
                this.tmpYear++
            }
        },
        selectYear(year) {
            if (this.validateYear(year)) return
            this.tmpYear = year
            this.panelType = 'month'
        },
        selectMonth(month) {
            if (this.validateMonth(month)) return
            this.tmpMonth = month
            this.panelType = 'date'
        },
        selectDate(date) {
           
            if(this.isLessToday(date)){
                return ;
            }
            if(this.disabled){
                return ;
            }
            // setTimeout(() => {
            if (this.validateDate(date)) return
            if (date.previousMonth) {
                if (this.tmpMonth === 0) {
                    this.year -= 1
                    this.tmpYear -= 1
                    this.month = this.tmpMonth = 11
                } else {
                    this.month = this.tmpMonth - 1
                    this.tmpMonth -= 1
                }
            } else if (date.nextMonth) {
                if (this.tmpMonth === 11) {
                    this.year += 1
                    this.tmpYear += 1
                    this.month = this.tmpMonth = 0
                } else {
                    this.month = this.tmpMonth + 1
                    this.tmpMonth += 1
                }
            }

            let temp = `${this.tmpYear}-${('0' + (this.tmpMonth + 1)).slice(-2)}-${('0' + date.value).slice(-2)}`
            let tempDate = new Date(this.tmpYear, this.tmpMonth, date.value)

            let tempTick = tempDate.getTime();
            console.log(new Date(tempTick))
            // debugger
            let propsValue = Array.from(this.value);
            let index = propsValue.indexOf(tempTick);
            if (index != -1) propsValue.splice(index, 1)
            else propsValue.push(tempTick)

            this.$emit('input', propsValue)

            return
            // }, 0)
        },
        validateYear(year) {
            return (year > this.maxYear || year < this.minYear) ? true : false
        },
        validateMonth(month) {
            if (new Date(this.tmpYear, month).getTime() >= new Date(this.minYear, this.minMonth - 1).getTime()
                && new Date(this.tmpYear, month).getTime() <= new Date(this.maxYear, this.maxMonth - 1).getTime()) {
                return false
            }
            return true
        },
        validateDate(date) {
            // debugger
            let mon = this.tmpMonth
            if (date.previousMonth) {
                mon -= 1
            } else if (date.nextMonth) {
                mon += 1
            }
            if (new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
                && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()) {
                return false
            }
            return true
        },
        validateWeekend(date) {
           
            return false
            
            let day = new Date(this.tmpYear, this.tmpMonth, date.value).getDay()
            if (date.currentMonth && (day === 0 || day === 6)) {
                return true
            }
            return false
        },
        isLessToday(date){
             if (date.currentMonth) {
               
                let selectTime = (new Date(this.tmpYear+'/'+(this.tmpMonth+1)+'/'+date.value+' 23:59:59')).getTime();
                let nowTime = (new Date()).getTime();
                //   console.log(selectTime,nowTime,"ppppppp");
                if (selectTime<nowTime) {
                    return true;
                }
                
                   
            }
             return false
        },
        isToday(date) {
            if (date.currentMonth) {
                let now = new Date()
                if (now.getFullYear() == this.tmpYear && this.tmpMonth == now.getMonth() && date.value == now.getDate()) {
                    return '今天'
                }
                else
                    return date.value
            }
            return date.value
        },
        close(e) {
            return
            if (!this.$el.contains(e.target)) {
                this.panelState = false
                this.rangeStart = false
            }
        },
        clear() {
            this.$emit('input', this.range ? ['', ''] : '')
        },
        
    }
}
</script>

<style  lang='less'>
.date-picker {
    // position: relative;
    // height: 32px;
    user-select: none;

    .input-wrapper {
        border: 1px solid #ccc;
        border-radius: 2px;
        vertical-align: middle;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        padding: 6px 10px 6px 4px;
        height: 32px;
        box-sizing: border-box;

        .input {
            height: 100%;
            width: 100%;
            font-size: inherit;
            padding-left: 4px;
            box-sizing: border-box;
            outline: none;
        }
        .cancel-btn {
            height: 14px;
            width: 14px;
        }
    }

    .date-panel {
        // position: absolute;
        @selected: #d3d3d3;

        z-index: 5000;
        border: 1px solid #eee;
        box-sizing: border-box;
        width: 320px;
        padding: 5px 10px 10px;
        box-sizing: border-box;
        background-color: #fff;
        transform: translateY(4px);

        .panel-header {
            display: flex;
            flex-flow: row nowrap;
            width: 100%;

            .arrow-left,
            .arrow-right {
                flex: 1;
                font-size: 16px;
                line-height: 2;
                background-color: #fff;
                text-align: center;
                cursor: pointer;
            }
            .year-month-box {
                flex: 3;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                .year-box,
                .month-box {
                    transition: all ease 0.1s;
                    font-family: Roboto, sans-serif;
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                    line-height: 2;
                    cursor: pointer;
                    background-color: #fff;
                }
            }
            .year-range {
                font-size: 16px;
                line-height: 2;
                flex: 3;
                display: flex;
                justify-content: center;
            }
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .type-year,
        .type-month,
        .type-year {
            background-color: #fff;
        }

        .year-list,
        .month-list {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            li {
                font-family: Roboto, sans-serif;
                transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
                cursor: pointer;
                text-align: center;
                font-size: 16px;
                width: 33%;
                padding: 10px 0;
                &:hover {
                    background-color: #6ac1c9;
                    color: #fff;
                }
                &.selected {
                    background-color: #0097a7;
                    color: #fff;
                }
                &.invalid {
                    cursor: not-allowed;
                    color: #ccc;
                }
            }
        }

        .type-date {
            .weeks,
            .date-list {
                width: 100%;
                text-align: center;
                font-style: normal;
                font-size: 14px;

                .preMonth,
                .nextMonth {
                    color: #ccc;
                }
                li {
                    font-family: Roboto;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                }
            }
            .date-list {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;

                .valid:hover {
                    background-color: #eee;
                }
                .weekend {
                    .message {
                        background-color: @selected;
                        // border-radius: 50%;
                        border-radius: 3px;
                    }
                }
                .today {
                    border-radius: 3px;
                    box-shadow: inset 0 0 0 1px #2d8cf0;
                    font-size: 12px;
                    &::after {
                        content: "";
                        display: block;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #2d8cf0;
                        position: absolute;
                        top: 1px;
                        right: 1px;
                    }
                    span {
                        width: 100%;
                    }
                }
                li {
                    transition: all ease 0.1s;
                    cursor: pointer;
                    box-sizing: border-box;
                    border-bottom: 1px solid #fff;
                    position: relative;
                    margin: 2px;
                    &:not(.firstItem) {
                        margin-left: 10px;
                    }

                    .message {
                        // font-family: Roboto, sans-serif;
                        // font-weight: 300;
                        // font-size: 12px;
                        position: relative;
                        height: 30px;
                        &.selected {
                            .bg {
                                background-color: @selected;
                            }
                            span {
                                color: #fff;
                            }
                        }
                        &:not(.selected) {
                            .bg {
                                transform: scale(0);
                                opacity: 0;
                            }
                            &:hover {
                                .bg {
                                    background-color: #2d8cf0;
                                    transform: scale(1);
                                    opacity: 0.6;
                                }
                                span {
                                    color: #fff;
                                }
                            }
                        }
                        .bg {
                            height: 30px;
                            width: 100%;
                            transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1)
                                0ms;
                            // border-radius: 50%;
                            border-radius: 3px;
                            position: absolute;
                            z-index: 10;
                            top: 0;
                            left: 0;
                        }
                        span {
                            position: absolute;
                            z-index: 20;
                            left: 50%;
                            top: 50%;
                            transform: translate3d(-50%, -50%, 0);
                        }
                    }
                    &.invalid {
                        cursor: not-allowed;
                        color: #ccc;
                    }
                }
            }
            .weeks {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                border-bottom: 1px solid rgb(232, 234, 236);
                li {
                    font-weight: 600;
                }
            }
        }

        .toggle-enter,
        .toggle-leave-active {
            opacity: 0;
            transform: translateY(-10px);
        }
        .toggle-enter-active,
        .toggle-leave-active {
            transition: all ease 0.2s;
        }
        .fade-enter,
        .fade-leave-active {
            opacity: 0;
            transform: scale3d(0, 0, 0);
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: all ease 0.1s;
        }
    }
}
</style>