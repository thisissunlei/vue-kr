import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(ev,every,all,canvas,scroll,discount) {
    var tirDom = document.getElementById('gantt-chart-tool-tip');
    var contentDom=document.getElementById('gantt-chart-tool-tip-content');
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle');
    var canvasDom= document.querySelectorAll('#'+canvas+' canvas')[0];
    var tirDetail=tirDom.getBoundingClientRect();
    var canvasDetail=canvasDom.getBoundingClientRect();
    
    
    var obj = getToolTipContent(every,discount); 
    contentDom.innerHTML = obj.str;
    
    var toolLocation={
        left:Number(every.cellCoordX)+Number(canvasDetail.left)+5-(Number(tirDetail.width)-Number(every.cellWidth))/2-scroll.left,
        top:Number(every.cellCoordY)+Number(canvasDetail.top)+5-Number(tirDetail.height)-12-scroll.top
    }
    
    tirDom.style.maxWidth = obj.width + 'px';
    tirDom.style.left = toolLocation.left+ 'px';
    tirDom.style.top = toolLocation.top+ 'px';
    angleDom.style.left = toolLocation.left+tirDetail.width/2-5+ 'px';
    angleDom.style.top = toolLocation.top+tirDetail.height+ 'px';
    tirDom.style.opacity = 1;
    angleDom.style.opacity = 1;
}


//气泡的具体内容
function getToolTipContent(thatData,discount) {
    var data = Object.assign({}, thatData);
    var width = 264;
    
    var unitPrice=data.item.unitPrice?data.item.unitPrice:'';
    var price=data.item.price?data.item.price:'';
    var disUnitPrice=discount&&unitPrice?'折后'+parseInt(unitPrice*discount*0.1):unitPrice;
    var disPrice=discount&&price?'折后'+parseInt(price*discount*0.1):price;
    var rentStart = data.item.recentStart ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentStart)) : '';
    var rentEnd = data.item.recentEnd ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentEnd)) : '';
    var property=data.item.property?data.item.property:'';
    var status=data.item.inventStatus;
    
    var nameStr='';
    var proStr='';
    var signStr='';
    if(data.item.belongType=='SPACE'){
        proStr='<div>商品属性：' + property + '</div>';
        signStr=(status=='IN_RENT'||status=='NOT_EFFECT')?'<div>签约价：' + disPrice + '</div>':'';
    }else{
        nameStr='<div>固定办公桌:'+data.item.cellName+'</div>';
    }

    var str = '<div class="content">' + 
           nameStr+
         '<div>可租起始日：' +rentStart + '</div>' +
         '<div>可租结束日：' + rentEnd + '</div>' + 
         '<div>工位单价：' + disUnitPrice + '</div>' +
           signStr+
           proStr+  
         '</div>'

    return {
        str: str,
        width: width
    };
}

//获取今天的日期
function getToDay() {
    var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
    return today; 
}

export default {
    poptipOver,
    getToDay
}