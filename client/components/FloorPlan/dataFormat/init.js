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
                    item.parentMin=17;
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
        dom&&document.body.removeChild(dom);
        
        //scale计算
        let minW=0.5;
        let minH=0.5;
        let min=0.5;
        if(spaceArr.length){
            //两行字的高度加上icon的高度
            let fixedW=spaceArr[0].parentMin;
            let fixedH=spaceArr[0].parentMin;
            if(spaceArr[0].belongType=='SPACE'){
                fixedH=spaceArr[0].futureStatus?32+42:32;
                fixedW=spaceArr[0].futureStatus?(spaceArr[0].parentMin+42):spaceArr[0].parentMin;
            }
            minH=fixedH/spaceArr[0].cellHeight;
            minW=fixedW/spaceArr[0].cellWidth;
            
            spaceArr.map((item,index)=>{
                let switchW=item.parentMin;
                let switchH=item.parentMin;
                if(item.belongType=='SPACE'){
                    switchW=item.futureStatus?(item.parentMin+42):item.parentMin;
                    switchH=item.futureStatus?32+42:32;
                }
                if((switchW/item.cellWidth)>minW){
                    minW=switchW/item.cellWidth;
                }
                if((switchH/item.cellHeight)>minH){
                    minH=switchH/item.cellHeight;
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
            let picRen=list.item.futureStatus?(list.item.futureStatus=='FUTURE_AVAILABLE'?homePic:occupyPic):'';
            if(list.item.belongType=='SPACE'){
                list.bgsrc=picRen;
            }else{
                list.desksrc=picRen;
            }
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