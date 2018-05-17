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
            list.property=item.belongType=='SPACE'?item.capacity+'工位 '+item.property:'';
            list.pos=item.cellCoordX+' '+item.cellCoordY;
            list.size=item.cellWidth+' '+item.cellHeight;
            list.color=colorStatus(item.inventStatus);
            list.item=item;
            dataRender.push(list);
        })
        var scale=114/min;
        console.log('min',min);
        dataRender.map((item,index)=>{
            item.size=parseInt(item.item.cellWidth*scale)+' '+parseInt(item.item.cellHeight*scale);
            item.item.cellWidth=parseInt(item.item.cellWidth*scale);
            item.item.cellHeight=parseInt(item.item.cellHeight*scale);
        })
    }
    return [].concat(dataRender);
}
export default init;