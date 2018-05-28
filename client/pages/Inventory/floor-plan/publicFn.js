import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(every,all,canvas,scroll,discount) {
    var mainDom=document.getElementById('layout-content-main');
    var tirDom = document.getElementById('gantt-chart-tool-tip'+every.item.id);
    var contentDom=document.getElementById('gantt-chart-tool-tip-content'+every.item.id);
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle'+every.item.id);
    var canvasDom= document.querySelectorAll('#'+canvas+' canvas')[0];
    var tirDetail=tirDom.getBoundingClientRect();
    var canvasDetail=canvasDom.getBoundingClientRect();
    
    
    var obj = getToolTipContent(every,discount); 
    
    contentDom.innerHTML = obj.str;
    tirDetail=tirDom.getBoundingClientRect();
    contentDom=document.getElementById('gantt-chart-tool-tip-content'+every.item.id);
    
    var toolLocation={
        left:Number(every.cellCoordX)+5-(Number(tirDetail.width)-Number(every.cellWidth))/2-scroll.left,
        top:Number(every.cellCoordY)+Number(canvasDetail.top)-Number(tirDetail.height)-15-70+mainDom.scrollTop //scroll.top
    }
   
    //临近边界偏移
    var bodyWidth=document.body.clientWidth;
    var boundTip=toolLocation.left+canvasDetail.left;
    var offset=0;
    if(Number(bodyWidth)-Number(boundTip)<230){
        toolLocation.left=canvasDetail.width-tirDetail.width;
        offset=tirDetail.width/2-10;
    }
    if(toolLocation.left<0){
        offset=toolLocation.left;
        toolLocation.left=0;
    }
     
    //计算位置赋值
    tirDom.style.maxWidth = obj.width + 'px';
    tirDom.style.left = toolLocation.left+ 'px';
    tirDom.style.top = toolLocation.top+ 'px';
    angleDom.style.left = toolLocation.left+tirDetail.width/2-5+offset+ 'px';
    angleDom.style.top = toolLocation.top+tirDetail.height+ 'px';
}


//气泡的具体内容
function getToolTipContent(thatData,discount) {
    var data = Object.assign({}, thatData);
    var width = 264;
    
    var unitPrice=(data.item.unitPrice||data.item.unitPrice===0)?data.item.unitPrice:'';
    var price=(data.item.price||data.item.price===0)?data.item.price:'';
    var total=(data.item.totalPrice||data.item.totalPrice===0)?data.item.totalPrice:'';
    var disUnitPrice=discount&&unitPrice?'折后'+parseInt(unitPrice*discount*0.1):unitPrice;
    var disTotal=(discount&&total)?'折后'+parseInt(total*discount*0.1):total;
    var rentStart = data.item.recentStart ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentStart)) : '';
    var rentEnd = data.item.recentEnd ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentEnd)) : '';
    var property=data.item.property?data.item.property:'';
    var status=data.item.inventStatus;
    
    var nameStr='';
    var proStr='';
    var signStr=(status=='IN_RENT'||status=='NOT_EFFECT'&&price)?'<div>签约价：' + price + '</div>':'';
    var priceStr='';
    var dateEnd=rentEnd?'<div>可租结束日：' + rentEnd + '</div>':'';
    if(data.item.belongType=='SPACE'){
        proStr='<div>商品属性：' + property + '</div>';
        priceStr='<div>工位单价：' + disUnitPrice + '</div>';
    }else{
        nameStr='<div>固定办公桌:'+data.item.cellName+'</div>';
    }
    
    var str = '<div class="content">' + 
           nameStr+
         '<div>可租起始日：' +rentStart + '</div>' +
           dateEnd + 
           priceStr+
         '<div>商品定价：' + disTotal + '</div>'+
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