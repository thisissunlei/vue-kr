import colorStatus from './colorStatus';
import utils from '~/plugins/utils';
import homePic from '../img/can.svg';
import occupyPic from '../img/use.svg';
function init(data,picProperty,dataUrl){
    var dataRender=[];
    var scale=1;
    var dom=utils.createElement();
    if(data.figures.length){
        var spaceArr=[];
        var parentMin=32;
        data.figures.map((item,index)=>{
            //找空间最小宽度
            if(item.belongType=='SPACE'){
                var name=utils.getStrWidth(dom,item.cellName);
                var opacity=utils.getStrWidth(dom,item.capacity+'工位');
                let icon=item.futureStatus?21:0;
                parentMin=name>opacity?name:opacity;
                item.parentMin=parentMin;
                spaceArr.push(item);
            }
            
            //左上,根据中心点坐标转换成左上角坐标值
            var position={
                x:item.cellCoordX-item.cellWidth/2,
                y:item.cellCoordY-item.cellHeight/2
            }
            var list={};
            var isName=item.belongType=='SPACE'?item.cellName:'';
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
        var minW=0.5;
        var minH=0.5;
        var min=0.5;
        if(spaceArr.length){
            minW=spaceArr[0].parentMin/spaceArr[0].cellWidth;
            minH=32/spaceArr[0].cellHeight;
            
            spaceArr.map((item,index)=>{
                if((item.parentMin/item.cellWidth)>minW){
                    minW=item.parentMin/item.cellWidth;
                }
                if((32/item.cellHeight)>minH){
                    minH=32/item.cellHeight;
                }
            }) 
        }
        min=minW>minH?minW:minH;
        if(min>1){
            scale=1
        }else{
            scale=min
        }
        
        //极限尺寸
        if((picProperty.width*scale<500)&&(picProperty.height*scale<500)){
            scale=500/picProperty.width;
        }
        
        //尺寸缩放
        dataRender.map((list,index)=>{
            list.size=Number(list.cellWidth)*scale+' '+Number(list.cellHeight)*scale;
            list.cellWidth=Number(list.cellWidth)*scale;
            list.cellHeight=Number(list.cellHeight)*scale;
            list.pos=Number(list.cellCoordX)*scale+' '+Number(list.cellCoordY)*scale;
            list.cellCoordX=Number(list.cellCoordX)*scale;
            list.cellCoordY=Number(list.cellCoordY)*scale;
            list.bgsrc=occupyPic; //list.futureStatus?(list.futureStatus=='123'?homePic:occupyPic):'';
            //list.status=true;
        })
    }
    
    
    //pic尺寸
    var pic={
        width:picProperty.width*scale,
        height:picProperty.height*scale,
        pos:data.graphFilePath,
        picName:data.communityName+data.currentDate,
        dataUrl:dataUrl
    }
    
    
    return {data:[].concat(dataRender),pic:pic};
}

export default init;