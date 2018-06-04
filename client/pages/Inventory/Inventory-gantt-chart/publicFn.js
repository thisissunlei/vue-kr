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

// 获取当月的天数
function getMonthDayNum(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}

//鼠标滑过气泡的位置
function poptipOver(event, data,param,time,sideBar) {
    var e = event || window.event;
    var dom = event.target;

    var detail = dom.getBoundingClientRect();
    var domMain=document.getElementById('layout-content-main');  
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    
    var tirLocation = {
        left: sideBar?e.clientX:e.clientX+160,
        top: (e.clientY < detail.top ? e.clientY : detail.top) + detail.height
    }
    var obj = getToolTipContent(data,param,time);
    tirDom.innerHTML = obj.str;
    tirDom.style.left = tirLocation.left - 215 + 'px';
    tirDom.style.top = tirLocation.top + 10 + domMain.scrollTop-345+ 'px';
    tirDom.style.width = obj.width + 'px';
    angleDom.style.left = tirLocation.left+ 5 - 215 + 'px';
    angleDom.style.top = tirLocation.top + domMain.scrollTop-345+ 'px';
    locationCorrect(tirDom, tirLocation.left - 30, tirLocation.left - 30 + obj.width,sideBar)
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
}
//气泡的具体内容
function getToolTipContent(thatData,param,time) {
    var label='';
    var width = 280;
    var data = Object.assign({}, thatData);
    if(param=='NOT_EFFECT'){
        label='合同未生效';
    }else if(param=='IN_RENT'){
        label='在租';
        width=235;
    }else if(param=='AVAILABLE'||(thatData.status=='AVAILABLE'&&param=='2')){
        if(!data.endDate){
            width=163;
        }else{
            width=235;
        }
        label="未租";
    }else if(param=='OFF'||(thatData.status=='OFF'&&param=='2')){
        if(!data.endDate){
            width=163;
        }else{
            width=235;
        }
        label="下架";
    }else if(thatData.status=='DISABLE'&&param=='2'){
        label="不可用";
        width = 180;
    }
    var str = '<div class="title">' + label + '：</div>';      
        var startDay = data.startDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.startDate)) :time.startTime;
        var endDay = data.endDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.endDate)) :'-';
        str += '<div class="content">' + startDay + ' 至 ' + endDay + '</div>'

    return {
        str: str,
        width: width
    };
}
//气泡的位置微调
function locationCorrect(tirDom, nowLeft, tirRightToleft,sideBar) {

    let contentDom = document.getElementById('vue-chart-right-draw-content');
    let angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    var domMain=document.getElementById('layout-content-main');  
    let tirDetail = tirDom.getBoundingClientRect();
    let detail = contentDom.getBoundingClientRect();
    
    let winWidth = document.body.clientWidth;
    let contentToRigth = winWidth - detail.right;
    let tirToRigth = winWidth - tirRightToleft - 20;

    if(sideBar){
        if (contentToRigth > tirToRigth) {
            tirDom.style.left = nowLeft - (contentToRigth - tirToRigth)-180-30+'px';
        }
    }else{
        if (contentToRigth > tirToRigth+150) {
            tirDom.style.left = nowLeft - (contentToRigth - tirToRigth)-180+170-30+'px';
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

//label的字体的颜色
function getLabelColor(taskStatus) {
    if (taskStatus === 'NOT_EFFECT') {
        return '#fea877';
    } else if(taskStatus === 'IN_RENT'){
        return '#fedc82';
    } else if(taskStatus === 'AVAILABLE'){
        return '#BCE590';
    } else if(taskStatus === 'OFF'){
        return '#BCE590';
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
    getMonthDayNum,
    poptipOver,
    windowResize,
    compareEndTime,
    compareTime,
    getLabelColor,
    timeToStr,
    dayToTime
}