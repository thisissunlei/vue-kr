import colorStatus from './colorStatus';
function init(data){
    var dataRender=[];
    if(data.length){    
        var min=data[0].figures[0].cellWidth;
        data[0].figures.map((item,index)=>{
            if(item.cellWidth<min){
                min=item.cellWidth;
            }
            var list={};
            list.name=item.belongType=='SPACE'?item.cellName:'';
            list.property=item.belongType=='SPACE'?item.capacity+'工位 套间':'';
            list.pos=item.cellCoordX+' '+item.cellCoordY;
            list.size=item.cellWidth+' '+item.cellHeight;
            list.color='#ccc'//colorStatus(item.inventStatus);
            list.item=item;
            dataRender.push(list);
        })
        var scale=61/min;
        dataRender.map((list,index)=>{
            list.size=Number(list.item.cellWidth)*scale+' '+Number(list.item.cellHeight)*scale;
            list.item.cellWidth=Number(list.item.cellWidth)*scale;
            list.item.cellHeight=Number(list.item.cellHeight)*scale;
            list.pos=Number(list.item.cellCoordX)*scale+' '+Number(list.item.cellCoordY)*scale;
            list.item.cellCoordX=Number(list.item.cellCoordX)*scale;
            list.item.cellCoordY=Number(list.item.cellCoordY)*scale;
        })
    }
    return [].concat(dataRender);
}
export default init;