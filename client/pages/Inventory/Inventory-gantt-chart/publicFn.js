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

//获取今天的日期
function getToDay() {
    var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
    return today;
}
//日期转毫秒
function dayToTime(params) {
    return (new Date(params + ' 00:00:00')).getTime();
}
//毫秒转日期值
function timeToDay(params) {
    return dateUtils.dateToStr("YYYY-MM-DD", new Date(date));
}
//获取计划和实际时间的最大值和最小值
function getAllMaxAndMin(data) {
    var arr = [];
    if (data.actualStartTime && data.actualEndTime) {
        arr.push(data.actualStartTime)
        arr.push(data.actualEndTime)
    }
    if (data.planStartTime && data.planEndTime) {
        arr.push(data.planStartTime)
        arr.push(data.planEndTime)
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
function getMonthDayNum(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}
//label是否显示
function getLabel(label, data) {
    if (data.data.planEndTime < data.data.actualStartTime ||
        data.data.actualEndTime < data.data.planStartTime) {
        return '';
    } else {
        return label;
    }
}
//实际的label是否显示
function getActualLabel(label, data) {
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
function poptipOver(event, data,param) {
    var e = event || window.event;
    var dom = event.target;

    var detail = dom.getBoundingClientRect();
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');

    var tirLocation = {
        left: e.clientX,
        top: (e.clientY < detail.top ? e.clientY : detail.top) + detail.height
    }
    
    var obj = getToolTipContent(data,param);
    tirDom.innerHTML = obj.str;
    tirDom.style.left = tirLocation.left - 210 + 'px';
    tirDom.style.top = tirLocation.top + 10 - 345 + 'px';
    tirDom.style.width = obj.width + 'px';
    angleDom.style.left = tirLocation.left+ 5 - 210 + 'px';
    angleDom.style.top = tirLocation.top - 345 + 'px';
    locationCorrect(tirDom, tirLocation.left - 30, tirLocation.left - 30 + obj.width)
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
}
//气泡的具体内容
function getToolTipContent(thatData,param) {
    var label='';
    var width = 285;
    if(param=='NOT_EFFECT'){
        label='合同未生效';
    }else if(param=='IN_RENT'){
        label='在租';
        width = 250;
    }else if(thatData.status=='DISABLE'&&param=='2'){
        label="不可用";
        width = 260;
    }else if(thatData.status!='DISABLE'&&param=='2'){
        label="未租";
        width = 250;
    } 
    var str = '<div class="title">' + label + '：</div>';
    var data = Object.assign({}, thatData);
    //var width = 155; 
    if (data.endDate && data.startDate) {
        /*var type = 'MM-DD';

        var startYear = (new Date(data.startDate)).getFullYear();
        var endYear = (new Date(data.endDate)).getFullYear();
        if (startYear !== endYear) {
            type = 'YYYY-MM-DD';
            width = 220;
        }*/

        var startDay = data.startDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.startDate)) : '';
        var endDay = data.endDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.endDate)) : '';
        str += '<div class="content">' + startDay + ' 至 ' + endDay + '</div>'

    }else{
        width = 150;
        str = '<div class="title">' + label + '：全年</div>'; 
    }
    /*if (data.taskStatus !== "UNKNOWN"
        && data.taskStatus !== "UNDERWAY"
        && data.taskStatus !== "OVERDUE"
        && data.taskStatus !== "PLANNED"
    ) {
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
    }*/
    return {
        str: str,
        width: width
    };
}
//气泡的位置微调
function locationCorrect(tirDom, nowLeft, tirRightToleft) {

    let contentDom = document.getElementById('vue-chart-right-draw-content');
    let angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    let tirDetail = tirDom.getBoundingClientRect();
    let detail = contentDom.getBoundingClientRect();
    let winWidth = document.body.clientWidth;
    let contentToRigth = winWidth - detail.right;
    let tirToRigth = winWidth - tirRightToleft - 20;
    if (contentToRigth > tirToRigth) {
        tirDom.style.left = nowLeft - (contentToRigth - tirToRigth) + 'px';
    }
    if (detail.top + detail.height < parseInt(tirDom.style.top) + 246 + 100) {
        tirDom.style.top = parseInt(tirDom.style.top) - tirDetail.height - 45 + 'px';
        angleDom.className = 'top-triangle';
        angleDom.style.top = parseInt(angleDom.style.top) - 35 + "px";
    } else {
        angleDom.className = 'bottom-triangle'
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

function windowResize() {
    var leftDom = document.getElementById('vue-chart-left-table-list');
    var rightDom = document.getElementById("vue-chart-right-draw-content");
    var clientHeight = document.documentElement.clientHeight;
    var dom = document.getElementById('layout-content-main');
    if (dom) {
        dom.style.height = document.documentElement.clientHeight - 130 + "px"
    }
    if (leftDom) {
        leftDom.style.maxHeight = clientHeight - 362 + "px";
    }
    if (rightDom) {
        rightDom.style.maxHeight = clientHeight - 362 + "px";
    }
}

function compareTime(data1, data2) {
    let data = '';
    data1 = data1.replace('-', '/')
    // data2 = data2.replace('-', '/')
    let startData = (new Date(data1 + ' 00:00:00')).getTime();
    let todayDate = new Date();
    let todayTime = todayDate.getTime();
    let endData = data2;
    data = startData < endData ? startData : endData;
    data = data < todayTime ? data : todayTime;
    return dateUtils.dateToStr("YYYY-MM-DD", new Date(data));
};

function compareEndTime(data1, data2) {
    data1 = data1.replace('-', '/')
    data2 = data2.replace('-', '/')
    var data = '';
    var startData = (new Date(data1 + ' 00:00:00')).getTime();
    var endData = (new Date(data2 + ' 00:00:00')).getTime();;
    data = startData > endData ? startData : endData;
    return dateUtils.dateToStr("YYYY-MM-DD", new Date(data));
};
function getActualBgColor(data) {

}
function getDivColor(value) {
    switch (value) {
        case 'NORMAL':
            return '#fff';
            break;
        case 'ADVANCE':
            return '#fff';
            break;
        case 'DELAY':
            return '#fff';
            break;
        case 'UNDERWAY':
            return 'rgb(255, 214, 105)';
            break;

        case 'OVERDUE':
            return 'rgb(246, 156, 156)';
            break;
        case 'PLANNED':
            return '#fff';
            break;
        default: 'UNKNOWN'
            return '#666';

    }
}
function getDivClass(index, obj) {
    let divClass = 'row-current-more current-more-task ';
    if (index === obj.row.tasks.length - 1) {
        divClass = 'row-current-more current-more-task noBorder';
    }
    return divClass;
}


// 实际的字体颜色
function getActualColor(taskStatus) {
    if (taskStatus === 'UNDERWAY' || taskStatus === 'OVERDUE' || taskStatus === 'UNKNOWN') {
        return '#BE8525';
    } else if (taskStatus === 'NORMAL' || taskStatus === 'ADVANCE') {
        return '#5A8C23';
    } else {
        return '#666666'
    }
}
//实际的背景色
function getActualBgColor(taskStatus) {

    switch (taskStatus) {
        case 'NORMAL'://正常完成 绿色
            return '#C2E998';
            break;
        case 'ADVANCE':// 提前完成 绿色
            return '#C2E998';
            break;
        case 'DELAY'://延期完成 红色
            return '#F69C9C';
            break;
        case 'UNDERWAY'://进行中 黄色
            return '#FFE9AF';
            break;
        case 'OVERDUE'://进行中（已逾期）黄色红边
            return '#FFE9AF';
            break;
        case 'PLANNED'://未开始 灰色
            return 'transparent';
            break;
        default: //进度未知 灰色红边
            return 'transparent'
    }
}
//实际的边框颜色
function getActualBorder(taskStatus) {
    if (taskStatus === 'OVERDUE' || taskStatus === 'UNKNOWN') {
        return '1px dashed #FF6D6D';
    } else {
        return '0px solid #FF6D6D';
    }

}
//label的字体的颜色
function getLabelColor(taskStatus) {
    if (taskStatus === 'NOT_EFFECT') {
        return '#FFE08F';
    } else if(taskStatus === 'IN_RENT'){
        return '#FDAFAF';
    } 
}
function timeToStr(time) {
    var type = Object.prototype.toString.call(time)
    if (!time) {
        return '';
    }

    if (type === "[object Date]") {
        return dateUtils.dateToStr('YYYY-MM-DD HH:mm:SS', new Date(time))
    }
    if (type === '[object String]') {
        return time + ' 00:00:00';
    }

}
export default {
    getAllMaxAndMin,
    getMonthDayNum,
    poptipOver,
    fontCover,
    windowResize,
    compareEndTime,
    compareTime,
    getDivColor,
    getDivClass,
    getActualColor,
    getActualBgColor,
    getActualBorder,
    getLabelColor,
    timeToStr,
    dayToTime
}