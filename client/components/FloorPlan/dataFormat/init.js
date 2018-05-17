import colorStatus from './colorStatus';
function init(data){
    var dataRender=[];
    if(data.length){    
        data[0].figures.map((item,index)=>{
            var list={};
            list.name=item.belongType=='SPACE'?item.cellName:'';
            list.property=item.belongType=='SPACE'?item.capacity+'工位 '+item.property:'';
            list.pos=item.cellCoordX+' '+item.cellCoordY;
            list.size=item.cellWidth+' '+item.cellHeight;
            list.color=colorStatus(item.inventStatus);
            list.item=item;
            dataRender.push(list);
        })
    }
    return [].concat(dataRender);
}
export default init;