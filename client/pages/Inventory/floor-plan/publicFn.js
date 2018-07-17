import dateUtils from 'vue-dateutils';
//鼠标滑过气泡的位置
function poptipOver(every,all,canvas,scroll,discount,isIcon) {
    let selectId=isIcon=='icon'?(every.item.id+'icon'+every.item.id):every.item.id;
    var mainDom=document.getElementById('layout-content-main');
    var tirDom = document.getElementById('gantt-chart-tool-tip'+selectId);
    var contentDom=document.getElementById('gantt-chart-tool-tip-content'+selectId);
    var angleDom = document.getElementById('gantt-chart-tool-tip-triangle'+selectId);
    var canvasDom= document.querySelectorAll('#'+canvas+' canvas')[0];
    var tirDetail=tirDom.getBoundingClientRect();
    var canvasDetail=canvasDom.getBoundingClientRect();
    
    
    var obj = {};
    if(isIcon=='icon'){
        obj=getIconToolTipContent(every,discount);
    }else{
        obj=getToolTipContent(every,discount);
    } 
    
    contentDom.innerHTML = obj.str;
    tirDetail=tirDom.getBoundingClientRect();
    contentDom=document.getElementById('gantt-chart-tool-tip-content'+selectId);
    
    let toolLocation={
        left:Number(every.cellCoordX)+5-(Number(tirDetail.width)-Number(every.cellWidth))/2-scroll.left,
        top:Number(every.cellCoordY)+Number(canvasDetail.top)-Number(tirDetail.height)-15-70+mainDom.scrollTop //scroll.top
    }
    if(toolLocation.top<=0){
        toolLocation.top=0;
    }
    
    if(isIcon=='icon'){
        toolLocation.left=Number(every.cellCoordX)+6+Number(every.cellWidth)-Number(tirDetail.width)-scroll.left;
    }
    
    
    //临近边界偏移
    var bodyWidth=document.body.clientWidth;
    var boundTip=toolLocation.left+canvasDetail.left;
    var offset=0;
    if(isIcon!='icon'){
        if(Number(bodyWidth)-Number(boundTip)<230){
            toolLocation.left=canvasDetail.width-tirDetail.width;
            offset=tirDetail.width/2-10;
        }
    }
    if(toolLocation.left<0){
        offset=toolLocation.left;
        toolLocation.left=0;
    }
     
    //计算位置赋值
    tirDom.style.maxWidth = obj.width + 'px';
    tirDom.style.left = toolLocation.left+ 'px';
    tirDom.style.top = toolLocation.top+ 'px';
    if(isIcon=='icon'){
        angleDom.style.left = toolLocation.left+tirDetail.width-18+offset+ 'px';  
    }else{
        angleDom.style.left = toolLocation.left+tirDetail.width/2-5+offset+ 'px';
    }
    angleDom.style.top = toolLocation.top+tirDetail.height+ 'px';
}

//图标浮框内容
function getIconToolTipContent(thatData,discount){
    var data = Object.assign({}, thatData);
    var width = 225;
    let status=data.item.futureStatus;
    let customerName='';
    let typeName=data.item.goodsType=='OPEN'?'固定办公桌':'移动办公桌';
    let nameStr='';
    let inventStatus=data.item.inventStatus;
    let startTime = data.item.futureStart ? dateUtils.dateToStr('YYYY-MM-DD',new Date(data.item.futureStart)) : '';
    let statusName=status=='FUTURE_AVAILABLE'?'<div>可预租：' + startTime + '</div>':'<div>未来被占用：' + startTime + '起</div>';
    let useType=status=='FUTURE_OCCUPIED'?'<div>被占用类型：' +data.item.futureType+ '</div>':''
    if(status=='FUTURE_OCCUPIED'){
        customerName='<div>'+data.item.futureCustomerName+'</div>';
    }
    if(data.item.belongType!='SPACE'){
        nameStr='<div>'+typeName+':'+data.item.cellName+'</div>';
    }
    var str = '<div class="content">'+
                nameStr+
                statusName+
                useType+
                customerName+
          '</div>'
    return {
        str: str,
        width: width
    };
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
    let dateEnd=rentEnd?'<div>可租结束日：' + rentEnd + '</div>':'';
    let line='';
    if(status=='IN_RENT'||status=='NOT_EFFECT'){
        signStr=price?'<div>签约价：' + price + '</div>':'';
        dateRange='<div>'+startDate+'至'+endDate+'</div>';
        customerName='<div>'+data.item.customerName+'</div>';
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