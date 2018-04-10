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
    var d = new Date(year, month, 0);
    return d.getDate();   
}
//日期转毫秒
function dayToTime(params) {
    
}
//毫秒转日期值
function timeToDay(params) {
    
}
// 获取当月的天数
function getMonthDayNum(params) {
    
}
export default {

}