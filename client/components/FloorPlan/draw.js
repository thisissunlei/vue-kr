
function draw (go,content,data,clickFn,enterFn,leaveFn) {
    if (window.goSamples) goSamples();  
    
    //gojs初始化
    var $ = go.GraphObject.make;  
    var myDiagram =
       $(go.Diagram, content,         
        {   
            //在视口中左上对齐(背景可以不被拖动)
            contentAlignment:go.Spot.TopLeft,
            //不允许用户更改图表
            isReadOnly: true,
            //是否可以缩放
            allowZoom: false,
            //是否可以移动对象
            allowMove: false
        });
    //库存平面图
    let isElementEnter=false;
    let isIconEnter=false;
    let isElementLeave=false;
    let isIconLeave=false;
    let elData={};
    let iconData={};
    
    
    //点击事件
    myDiagram.addDiagramListener("ObjectSingleClicked",
        function(e) {
        clickFn(e);
    });
    
    //公共字体样式
    function textStyle() {
        return {stroke: "#999", font: "bold 12px PingFangSC-Medium"};
    }
    
    /*function linkProblemConverter(msg) {
        if (msg) return "red";
        return null;
    }*/
    
    //背景图
    if(data.pic){
        myDiagram.add(
            $(go.Part,  // this Part is not bound to any model data
            { layerName: "Background", position: new go.Point(0, 0),
                selectable: false, pickable: false },
            $(go.Picture,data.pic.dataUrl,{width:data.pic.width,height:data.pic.height})
        ));
    }
    
    //picture公共hover事件
    function picHoverEnter(e,node,picName1,picName2,param){
        //为了解决没有图片问题
        if(!picName1&&!picName2){
            return ;
        }
        if(picName1&&param=='big'){
            return ;
        }
        isIconEnter=true;
        isIconLeave=false;
        enterFn(e,iconData.nods,'icon');
        if(isElementEnter){
            isElementLeave=true;
            isElementEnter=false;
            leaveFn(elData.e,elData.node);
        }
    }
    
    function picHoverLeave(e,node,picName1,picName2,param){
        //为了解决没有图片问题
        if(!picName1&&!picName2){
            return ;
        }
        if(picName1&&param=='big'){
            return ;
        }
        if(isIconLeave){
            return ;
        }
        isIconLeave=true;
        isIconEnter=false;
        leaveFn(e,iconData.nods,'icon')
        if(isElementLeave){
            isElementEnter=true;
            isElementLeave=false;
            enterFn(elData.e,elData.node);
        }
    }
    
    //绘制
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
            //元素填充背景色
            new go.Binding("fill","color"),{ stroke: null }),
            /*点击产生同一状态*/
            /*new go.Binding("stroke",'status',linkProblemConverter)),*/
            //元素尺寸
            new go.Binding("desiredSize", "size", go.Size.parse),
            //元素位置
            new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            //元件名称
            $(go.Panel, "Table",
                //元件属性
                $(go.TextBlock,textStyle(),
                { row: 0, column: 0,margin:2.5},
                new go.Binding("text", "name")),      
                $(go.TextBlock,textStyle(),
                { row: 1, column: 0,margin:2.5},
                new go.Binding("text", "property")),
            ),
            $(go.Panel,
                {alignment: go.Spot.TopRight},
                $(go.Picture,
                {width:16, height: 16,margin:5},
                new go.Binding('source','bgsrc')),
                { //鼠标hover事件
                    mouseEnter: function (e, node) {
                        let nods={data:node.part.Sd};
                        iconData={e,nods};
                        picHoverEnter(e,node,nods.data.desksrc,nods.data.bgsrc,'big');
                    },
                    mouseLeave: function (e, node) {
                        picHoverLeave(e,node,iconData.nods.data.desksrc,iconData.nods.data.bgsrc,'big');
                    }
                }
            ),
            $(go.Panel,
                {alignment: go.Spot.TopRight},
                $(go.Picture,
                {width:12, height: 12,margin:5},
                new go.Binding('source','desksrc')),
                { //鼠标hover事件
                    mouseEnter: function (e, node) {
                        let nods={data:node.part.Sd};
                        iconData={e,nods};
                        picHoverEnter(e,node,nods.data.desksrc,nods.data.bgsrc,'small');
                    },
                    mouseLeave: function (e, node) {
                        picHoverLeave(e,node,iconData.nods.data.desksrc,iconData.nods.data.bgsrc,'small');
                    }
                }
            ),
            { //鼠标hover事件
                mouseEnter: function (e, node) { 
                    isElementEnter=true;
                    isElementLeave=false;
                    elData={e,node};
                    enterFn(e,node)
                    if(isIconEnter){
                        isIconLeave=true;
                        isIconEnter=false;
                        leaveFn(iconData.e,iconData.nods,'icon');
                    }
                },
                mouseLeave: function (e, node) { 
                    if(isElementLeave){
                        return ;
                    }
                    isElementLeave=true;
                    isElementEnter=false;
                    leaveFn(e,node);
                }
            }
        );
    
    var endData=data.data?data.data:[];
    var myModel = $(go.Model);
    myModel.nodeDataArray =[].concat(endData);
    myDiagram.model = myModel;
    
    return {diagram:myDiagram};
}

export default draw; 