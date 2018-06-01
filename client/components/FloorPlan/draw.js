
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
    

    
    //点击事件
    myDiagram.addDiagramListener("ObjectSingleClicked",
        function(e) {
        clickFn(e);
    });
    
    //公共字体样式
    function textStyle() {
        return {stroke: "#999", font: "bold 12px PingFangSC-Medium" };
    }
    
    //背景图
    if(data.pic){
        myDiagram.add(
            $(go.Part,  // this Part is not bound to any model data
            { layerName: "Background", position: new go.Point(0, 0),
                selectable: false, pickable: false },
            $(go.Picture,'http://optest03.krspace.cn'+data.pic.pos,{width:data.pic.width,height:data.pic.height})
        ));
    }

    function incrementCounter(e, obj) {
        var node = obj.part;
        var data = node.data;
        console.log('data--',data);
        // if (data) {
        //   node.diagram.startTransaction("clicked");
        //   var old = data.clickCount;
        //   data.clickCount++;
        //   node.diagram.model.raiseDataChanged(data, "clickCount", old, data.clickCount);
        //   node.diagram.commitTransaction("clicked");
        // }
      }
    
    function nodeCommonStatus(){
        return null
    }
    
    //绘制
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
            //元素填充背景色
            new go.Binding("fill","color"),{ stroke:nodeCommonStatus()}),
            //元素尺寸
            new go.Binding("desiredSize", "size", go.Size.parse),
            //元素位置
            new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            //元件名称
            $(go.Panel, "Table",
                $("Button",
                { margin: 2,
                    click: incrementCounter },
                $(go.Picture,{ width: 15, height: 15, source:"img/warning.png"})),
                //元件属性
                $(go.TextBlock,textStyle(),
                { row: 0, column: 0,margin:5,textAlign:'center'},
                new go.Binding("text", "name")),      
                $(go.TextBlock,textStyle(),
                { row: 1, column: 0},
                new go.Binding("text", "property")),
            ),
            { //鼠标hover事件
                mouseEnter: function (e, node) { 
                    enterFn(e,node)
                },
                mouseLeave: function (e, node) { 
                    leaveFn(e,node)
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