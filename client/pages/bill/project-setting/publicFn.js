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
//鼠标滑过气泡的位置
function poptipOver(event,data) {
    var e = event || window.event;
    var dom = event.target;
    var detail = dom.getBoundingClientRect();
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');

    var tirLocation = {
        left: e.clientX,
        top: (e.clientY < detail.top ? e.clientY : detail.top) + detail.height
    }
    var obj = getToolTipContent(data);
    tirDom.innerHTML = obj.str;
    tirDom.style.left = tirLocation.left - 30 + 'px';
    tirDom.style.top = tirLocation.top + 10 - 130 + 'px';
    tirDom.style.width = obj.width + 'px';
    angleDom.style.left = tirLocation.left - 30 + 5 + 'px';
    angleDom.style.top = tirLocation.top - 130 + 'px';
    locationCorrect(tirDom, tirLocation.left - 30, tirLocation.left - 30 + obj.width)
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
}
//气泡的具体内容
function getToolTipContent(thatData) {
    var str = '<div class="title">' + thatData.label + '</div>';
    var data = Object.assign({}, thatData.data);
    var width = 155;
    if (data.planEndTime && data.planStartTime) {
        var type = 'MM/DD';

        var startYear = (new Date(data.planStartTime)).getFullYear();
        var endYear = (new Date(data.planEndTime)).getFullYear();
        if (startYear !== endYear) {
            type = 'YYYY/MM/DD';
            width = 220;
        }

        var startDay = data.planStartTime ? dateUtils.dateToStr(type, new Date(data.planStartTime)) : '';
        var endDay = data.planEndTime ? dateUtils.dateToStr(type, new Date(data.planEndTime)) : '';
        str += '<div class="content">' + '计划周期：' + startDay + ' - ' + endDay + '</div>'

    }
    if (data.actualStartTime && data.actualEndTime) {
        var type = 'MM/DD';
        var startYear = (new Date(data.actualStartTime)).getFullYear();
        var endYear = (new Date(data.actualEndTime)).getFullYear();
        if (startYear !== endYear) {
            type = 'YYYY/MM/DD';
            width = width > 155 ? width : 220;
        }
        var startDay = data.actualStartTime ? dateUtils.dateToStr(type, new Date(data.actualStartTime)) : '';
        var endDay = data.actualEndTime ? dateUtils.dateToStr(type, new Date(data.actualEndTime)) : '';

        str += '<div class="content" >' + '完成周期：' + startDay + ' - ' + endDay + '</div>'
    }
    return {
        str: str,
        width: width
    };
}
//气泡的位置微调
function locationCorrect(tirDom, nowLeft, tirRightToleft) {
    let contentDom = document.getElementById('vue-chart-right-draw-content');

    let detail = contentDom.getBoundingClientRect();
    let winWidth = document.body.clientWidth;
    let contentToRigth = winWidth - detail.right;
    let tirToRigth = winWidth - tirRightToleft - 20;
    if (contentToRigth > tirToRigth) {

        tirDom.style.left = nowLeft - (contentToRigth - tirToRigth) + 'px';
    }
}
//计划于实际文字覆盖计算
function fontCover(planContentId, actualContentId) {
    let planDom = document.getElementById(planContentId);
    let actualDom = document.getElementById(actualContentId);
    if (!planDom || !actualDom) {
        return;
    }
    let planDetail = planDom.getBoundingClientRect();
    let actualDetail = actualDom.getBoundingClientRect();
    if (planDetail.left + planDetail.width > actualDetail.left ||
        actualDetail.left + actualDetail.width > planDetail.left) {
        if (planDetail.left + planDetail.width > actualDetail.left) {
            planDom.style.width = actualDetail.left - planDetail.left + 'px';
        }
        if (actualDetail.left + actualDetail.width > planDetail.left) {
            actualDom.style.width = planDetail.left - actualDetail.left + 'px';
        }
    }
}
export default {
    getAllMaxAndMin,
    getMonthDayNum,
    poptipOver,
    fontCover
}