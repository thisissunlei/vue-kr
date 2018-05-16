import colorStatus from './colorStatus';
function init(data){
    var dataRender=[{pos:"0 0",size:'0 0',color:"transparent",item:{cellWidth:0,cellHeight:0,cellCoordX:0,cellCoordY:0}}];
    if(data.length){    
        data[0].figures.map((item,index)=>{
            var list={};
            list.name=item.belongType=='SPACE'?item.cellName:'';
            list.property=item.belongType=='SPACE'?item.property:'';
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