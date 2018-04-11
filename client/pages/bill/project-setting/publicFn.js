import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
//设置甘特图高度随页面改变
function setContentHeight() {
    var leftDom = document.getElementById('vue-chart-left-table-list');
    var rightDom = document.getElementById("vue-chart-right-draw-content");
    var clientHeight = document.documentElement.clientHeight;
    leftDom.style.maxHeight = clientHeight - 362 + "px";
    rightDom.style.maxHeight = clientHeight - 362 + "px";
}
//获取每一个数据里的最大值与最小值
function getDataMaxAndMin(params) {
    
}
//获取今天的日期
function getToDay(year,month) {
    var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
    return today; 
}
//日期转毫秒
function dayToTime(params) {
    return (new Date(str + ' 00:00:00')).getTime();
}
//毫秒转日期值
function timeToDay(params) {
    return dateUtils.dateToStr("YYYY-MM-DD", new Date(date));
}
//获取计划和实际时间的最大值和最小值
function getAllMaxAndMin(data) {
    var arr = [];
    if (data.data.actualStartTime && data.data.actualEndTime) {
        arr.push(data.data.actualStartTime)
        arr.push(data.data.actualEndTime)
    }
    if (data.data.planStartTime && data.data.planEndTime) {
        arr.push(data.data.planStartTime)
        arr.push(data.data.planEndTime)
    }
    var max = arr[0], min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (max < arr[i])
            max = arr[i];
        if (min > arr[i])
            min = arr[i];
    }
    var minStr = dateUtils.dateToStr("YYYY-MM-DD", new Date(+min));
    var minStr = minStr.split('-')
    return {
        min: +min,
        max: +max
    }

}
// 获取当月的天数
function getMonthDayNum(params) {
    var d = new Date(year, month, 0);
    return d.getDate();
}
//label是否显示
function getLabel(label,data) {
    if (data.data.planEndTime < data.data.actualStartTime ||
        data.data.actualEndTime < data.data.planStartTime) {
        return '';
    } else {
        return label;
    }
}
//实际的label是否显示
function getActualLabel(label,data) {
    if (data.data.planEndTime < data.data.actualStartTime ||
        data.data.actualEndTime < data.data.planStartTime) {
        return label;
    } else {
        return '';
    }
}
function lineShow(data) {
    if (data.data.planEndTime < data.data.actualStartTime ||
        this.data.data.actualEndTime < data.data.planStartTime) {
        return true;
    } else {
        return false;
    }
}
export default {
    getAllMaxAndMin,
    getMonthDayNum
}