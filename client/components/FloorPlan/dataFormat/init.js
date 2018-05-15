import colorStatus from './colorStatus';
function init(data){
    var dataRender=[{name:'1',pos:"0 0",size:'100 100',color:"#ccc",item:{cellWidth:100,cellHeight:100,cellCoordX:0,cellCoordY:0}}];
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