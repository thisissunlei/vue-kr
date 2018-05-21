function draw (go,content,pic,data,clickFn,enterFn,leaveFn) {
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
       
    //导出
    var button = document.getElementById(pic);
        button.addEventListener('click', function() {
          var newWindow = window.open("","newWindow");
          if (!newWindow) return;
          var newDocument = newWindow.document;
          var svg = myDiagram.makeSvg({
            document: newDocument,  // create SVG DOM in new document context
            scale:1
          });
          newDocument.body.appendChild(svg);
    }, false);
    

    //点击事件
    myDiagram.addDiagramListener("ObjectSingleClicked",
        function(e) {
        clickFn(e);
    });
    
    //公共字体样式
    function textStyle() {
        return {stroke: "white", font: "bold 12px PingFangSC-Medium" };
    }

    
    myDiagram.add(
        $(go.Part,  // this Part is not bound to any model data
          { layerName: "Background", position: new go.Point(0, 0),
            selectable: false, pickable: false },
          $(go.Picture, "http://optest03.krspace.cn/krspace_oa_web/doc/docFile/viewFile?sourceservicetoken=AF6nQfcS0uARjSHa6gf4EDwKqoPfHQctOaDrWZTN7GB_Sw_ciIv4_J1PT1Edew1D&operater=2&fileId=54194")
        ));
    
    //绘制
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
            //元素填充背景色
            new go.Binding("fill","color")),
            //元素尺寸
            new go.Binding("desiredSize", "size", go.Size.parse),
            //元素位置
            new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
            //元件名称
            $(go.Panel, "Table",
                $(go.TextBlock,textStyle(),
                { row: 0, column: 0,margin:5,textAlign:'center'},
                new go.Binding("text", "name")),
                //元件属性
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
    
    var myModel = $(go.Model);
    myModel.nodeDataArray =[].concat(data);
    myDiagram.model = myModel;

    return {diagram:myDiagram};
}

export default draw; 