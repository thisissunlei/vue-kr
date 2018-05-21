import colorStatus from './colorStatus';
function init(data){
    var dataRender=[];
    if(data.figures.length){
        var spaceArr=[];
        var minW=36;
        var minH=36;
        var min=36;
        data.figures.map((item,index)=>{
            //找空间最小宽度
            if(item.belongType=='SPACE'){
                spaceArr.push(item);
                minW=spaceArr[0].cellWidth;
                minH=spaceArr[0].cellHeight;
            }
            
            //左上,根据中心点坐标转换成左上角坐标值
            var position={
                x:item.cellCoordX-item.cellWidth/2,
                y:item.cellCoordY-item.cellHeight/2
            }
            var list={};
            var isName=item.belongType=='SPACE'?'305':'';
            var isSuite=item.belongType=='SPACE'?item.capacity+'工位':'';
            list.name=isName;
            list.property=isSuite;
            list.pos=position.x+' '+position.y;
            list.size=item.cellWidth+' '+item.cellHeight;
            list.color=colorStatus(item.inventStatus);
            list.cellCoordX=position.x;
            list.cellCoordY=position.y;
            list.cellWidth=item.cellWidth;
            list.cellHeight=item.cellHeight;
            list.item=item;
            dataRender.push(list);
        })

        //scale计算
        spaceArr.map((item,index)=>{
            if(Number(item.cellWidth)<Number(minW)){
                minW=Number(item.cellWidth);
            }
            if(Number(item.cellHeight)<Number(minH)){
                minH=Number(item.cellHeight);
            }
            min=minW<minH?minW:minH;
        })
        var scale=(36/min)<0.3?0.3:(36/min);

        //尺寸缩放
        dataRender.map((list,index)=>{
            list.size=Number(list.cellWidth)*scale+' '+Number(list.cellHeight)*scale;
            list.cellWidth=Number(list.cellWidth)*scale;
            list.cellHeight=Number(list.cellHeight)*scale;
            list.pos=Number(list.cellCoordX)*scale+' '+Number(list.cellCoordY)*scale;
            list.cellCoordX=Number(list.cellCoordX)*scale;
            list.cellCoordY=Number(list.cellCoordY)*scale;
        })
    }
    return [].concat(dataRender);
}
export default init;