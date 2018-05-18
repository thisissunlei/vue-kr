import colorStatus from './colorStatus';
function init(data){
    var dataRender=[];
    if(data.length){    
        var min=data[0].figures[0].cellWidth;
        data[0].figures.map((item,index)=>{
            if(item.cellWidth<min){
                min=item.cellWidth;
            }
            //左上,根据中心点坐标转换成左上角坐标值
            var position={
                x:item.cellCoordX-item.cellWidth/2,
                y:item.cellCoordY-item.cellHeight/2
            }
            var list={};
            var isName=item.belongType=='SPACE'?item.cellName:'';
            var isSuite=item.belongType=='SPACE'?item.capacity+'工位 套间':'';
            list.name=isName;
            list.property=isSuite;
            list.pos=position.x+' '+position.y;
            list.size=item.cellWidth+' '+item.cellHeight;
            list.color='#ccc'//colorStatus(item.inventStatus);
            list.cellCoordX=position.x;
            list.cellCoordY=position.y;
            list.cellWidth=item.cellWidth;
            list.cellHeight=item.cellHeight;
            list.item=item;
            dataRender.push(list);
        })
        var scale=61/min;
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