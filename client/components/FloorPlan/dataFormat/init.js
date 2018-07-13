import colorStatus from './colorStatus';
import utils from '~/plugins/utils';
import homePic from '~/assets/images/can.svg';
import occupyPic from '~/assets/images/use.svg';
function init(data,picProperty,dataUrl){
    let dataRender=[];
    let scale=1;
    let dom=utils.createElement();
    if(data.figures.length){
        let spaceArr=[];
        let parentMin=32;
        data.figures.map((item,index)=>{
            //找空间最小宽度
            if(item.belongType=='SPACE'){
                let name=utils.getStrWidth(dom,item.cellName);
                let opacity=utils.getStrWidth(dom,item.capacity+'工位');
                parentMin=name>opacity?name:opacity;
                item.parentMin=parentMin;
                spaceArr.push(item);
            }else{
                if(item.futureStatus){
                    item.parentMin=22;
                    spaceArr.push(item);
                }            
            }
            
            //左上,根据中心点坐标转换成左上角坐标值
            let position={
                x:item.cellCoordX-item.cellWidth/2,
                y:item.cellCoordY-item.cellHeight/2
            }
            let list={};
            let isName=item.belongType=='SPACE'?item.cellName:'';
            let isSuite=item.belongType=='SPACE'?item.capacity+'工位':'';
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
        let minW=0.5;
        let minH=0.5;
        let min=0.5;
        if(spaceArr.length){
            minW=spaceArr[0].parentMin/spaceArr[0].cellWidth;
            //两行字的高度加上icon的高度
            let fixed='';
            if(spaceArr[0].belongType=='SPACE'){
                fixed=spaceArr[0].futureStatus?32+34:32;
            }else{
                fixed=spaceArr[0].parentMin;
            }
            minH=fixed/spaceArr[0].cellHeight;
            
            spaceArr.map((item,index)=>{
                let fixItem=item.parentMin;
                if(item.belongType=='SPACE'){
                    fixItem=item.futureStatus?32+34:32;
                }
                if((item.parentMin/item.cellWidth)>minW){
                    minW=item.parentMin/item.cellWidth;
                }
                if((fixItem/item.cellHeight)>minH){
                    minH=fixItem/item.cellHeight;
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
            list.bgsrc=list.item.futureStatus?(list.item.futureStatus=='FUTURE_AVAILABLE'?homePic:occupyPic):'';
            //list.status=true;
        })
    }
    
    
    //pic尺寸
    let pic={
        width:picProperty.width*scale,
        height:picProperty.height*scale,
        pos:data.graphFilePath,
        picName:data.communityName+data.currentDate,
        dataUrl:dataUrl
    }
    
    
    return {data:[].concat(dataRender),pic:pic};
}

export default init;