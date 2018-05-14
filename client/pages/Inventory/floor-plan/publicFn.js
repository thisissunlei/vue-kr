import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(ev,every,all,sideBar) {
    var e = ev.event || window.ev.event;
    var dom = e.target;
    var detail = dom.getBoundingClientRect();
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    var tirDetail=tirDom.getBoundingClientRect();
   
    var tirLocation = {
        left:e.clientX,
        top:e.clientY
    }
    //侧边栏是否关闭
    var leftOffset=sideBar?180:0;
    
    var obj = getToolTipContent(every); 
    tirDom.innerHTML = obj.str;
    tirDom.style.left = tirLocation.left - leftOffset-obj.width/2 + 'px';
    tirDom.style.top = tirLocation.top -50-every.item.cellHeight+ 'px';
    tirDom.style.width = obj.width + 'px';
    angleDom.style.left = tirLocation.left - leftOffset-5+ 'px';
    //50是canvas上面有50高的toolbar
    angleDom.style.top = tirLocation.top -50-every.item.cellHeight+tirDetail.height+ 'px';
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
}
//气泡的具体内容
function getToolTipContent(thatData) {
    var data = Object.assign({}, thatData);
    var str = '<div class="title"></div>';
    var width = 250;
   
    var rentStart = data.item.recentStart ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentStart)) : '';
    var rentEnd = data.item.recentEnd ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentEnd)) : '';
    var property=data.item.property?data.item.property:'';
    var unitPrice=data.item.unitPrice?data.item.unitPrice:'';

    var nameStr='';
    var proStr='';
    if(data.item.belongType=='SPACE'){
        proStr='<div>商品属性：' + property + '</div>';
    }else{
        nameStr='<div>固定办公桌:'+data.name+'</div>';
    }

    str += '<div class="content">' + 
           nameStr+
         '<div>可租起始日：' +rentStart + '</div>' +
         '<div>可租结束日：' + rentEnd + '</div>' + 
         '<div>工位单价：' + unitPrice + '</div>' +
           proStr+  
         '</div>'

    return {
        str: str,
        width: width
    };
}

export default {
    poptipOver
}