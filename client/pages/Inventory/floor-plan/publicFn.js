import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(every,all,canvas,scroll,discount) {
    let mainDom=document.getElementById('layout-content-main');
    let tirDom = document.getElementById('gantt-chart-tool-tip'+every.item.id);
    let contentDom=document.getElementById('gantt-chart-tool-tip-content'+every.item.id);
    let angleDom = document.getElementById('gantt-chart-tool-tip-triangle'+every.item.id);
    let canvasDom= document.querySelectorAll('#'+canvas+' canvas')[0];
    let tirDetail=tirDom.getBoundingClientRect();
    let canvasDetail=canvasDom.getBoundingClientRect();
    
    
    let obj = getToolTipContent(every,discount); 
    
    contentDom.innerHTML = obj.str;
    tirDetail=tirDom.getBoundingClientRect();
    contentDom=document.getElementById('gantt-chart-tool-tip-content'+every.item.id);
    
    let toolLocation={
        left:Number(every.cellCoordX)+5-(Number(tirDetail.width)-Number(every.cellWidth))/2-scroll.left,
        top:Number(every.cellCoordY)+Number(canvasDetail.top)-Number(tirDetail.height)-15-70+mainDom.scrollTop //scroll.top
    }
   
    //临近边界偏移
    let bodyWidth=document.body.clientWidth;
    let boundTip=toolLocation.left+canvasDetail.left;
    let offset=0;
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
    let data = Object.assign({}, thatData);
    let width = 264;
    
    let unitPrice=(data.item.unitPrice||data.item.unitPrice===0)?data.item.unitPrice:'';
    let price=(data.item.price||data.item.price===0)?data.item.price:'';
    let total=(data.item.totalPrice||data.item.totalPrice===0)?data.item.totalPrice:'';
    let disUnitPrice=discount&&unitPrice?'折后'+parseInt(unitPrice*discount*0.1):unitPrice;
    let disTotal=(discount&&total)?'折后'+parseInt(total*discount*0.1):total;
    let rentStart = data.item.recentStart ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentStart)) : '';
    let rentEnd = data.item.recentEnd ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.recentEnd)) : '';
    let startDate = data.item.startDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.startDate)) : '';
    let endDate = data.item.endDate ? dateUtils.dateToStr('YYYY-MM-DD', new Date(data.item.endDate)) : '';
    let property=data.item.property?data.item.property:'';
    let status=data.item.inventStatus;
    
    let nameStr='';
    let proStr='';
    let signStr='';
    let dateRange='';
    let priceStr='';
    let customerName='';
    let isName=data.item.customerName;
    let dateEnd=rentEnd?'<div>可租结束日：' + rentEnd + '</div>':'';
    let line='';
    if(status=='IN_RENT'||status=='NOT_EFFECT'){
        signStr=price?'<div>签约价：' + price + '</div>':'';
        dateRange='<div>'+startDate+'至'+endDate+'</div>';
        customerName=isName?'<div>'+isName+'</div>':'<div>*****</div>';
        line='<span style="width:100%;height: 1px;display: inline-block;background: #fff;vertical-align: middle;"></span>';
    }
    
    if(data.item.belongType=='SPACE'){
        proStr='<div>商品属性：' + property + '</div>';
        priceStr='<div>工位单价：' + disUnitPrice + '</div>';
    }else{
        let typeName=data.item.goodsType=='OPEN'?'固定办公桌':'移动办公桌'
        nameStr='<div>'+typeName+':'+data.item.cellName+'</div>';
    }
    
    let str = '<div class="content">' + 
           nameStr+
         '<div>可租起始日：' +rentStart + '</div>' +
           dateEnd + 
           priceStr+
         '<div>商品定价：' + disTotal + '</div>'+
           proStr+
           line+
           customerName+
           dateRange+
           signStr+
         '</div>'

    return {
        str: str,
        width: width
    };
}

//获取今天的日期
function getToDay() {
    let today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
    return today; 
}

export default {
    poptipOver,
    getToDay
}