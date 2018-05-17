import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(ev,every,all,canvas,scroll) {
    var e = ev.event || window.ev.event;
    var dom = e.target;
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var contentDom=document.getElementById('gantt-chart-tool-tip-content');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    var canvasDom= document.querySelectorAll('#'+canvas+' canvas')[0];
    var tirDetail=tirDom.getBoundingClientRect();
    var canvasDetail=canvasDom.getBoundingClientRect();
    
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
    
    var obj = getToolTipContent(every); 
    contentDom.innerHTML = obj.str;
    var toolLocation={
        left:Number(every.item.cellCoordX)+Number(canvasDetail.left)+5-(Number(tirDetail.width)-Number(every.item.cellWidth))/2-scroll.left,
        top:Number(every.item.cellCoordY)+Number(canvasDetail.top)+5-Number(tirDetail.height)-12-scroll.top
    }
   
    tirDom.style.maxWidth = obj.width + 'px';
    tirDom.style.left = toolLocation.left+ 'px';
    tirDom.style.top = toolLocation.top+ 'px';
    angleDom.style.left = toolLocation.left+tirDetail.width/2-5+ 'px';
    angleDom.style.top = toolLocation.top+tirDetail.height+ 'px';
}


//气泡的具体内容
function getToolTipContent(thatData) {
    var data = Object.assign({}, thatData);
    var width = 264;
    
    var rentStart = data.item.recentStart ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentStart)) : '';
    var rentEnd = data.item.recentEnd ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentEnd)) : '';
    var property=data.item.property?data.item.property:'';
    var unitPrice=data.item.unitPrice?data.item.unitPrice:'';
    
    var nameStr='';
    var proStr='';
    if(data.item.belongType=='SPACE'){
        proStr='<div>商品属性：' + property + '</div>';
    }else{
        nameStr='<div>固定办公桌:'+data.item.cellName+'</div>';
    }

    var str = '<div class="content">' + 
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