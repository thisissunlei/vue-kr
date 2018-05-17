import dateUtils from 'vue-dateutils';

//判断单元格最后一个不加border
function getDivClass(index,obj){
    let divClass = 'row-current-more current-more-task ';
    if (index === obj.length - 1) {
        divClass = 'row-current-more current-more-task noBorder';
    }
    return divClass;
}

//列表一行分成多个单元格
function mergeCell(h,rowArray,param,isTime){
    var row='';
    if(!rowArray){
        return  h('div', {
            attrs: {
                class: 'row-current-more current-more-task table-null'
            },
        }, '-')
    }
    if(rowArray){
        row=rowArray.map((item,index)=>{
            var otherName=param=='discount'?'折':(param=='rentTime'?'天':'');
            var pageData=item[param]?item[param]+otherName:'-';
            var popData=(item[param]&&isTime)?dateUtils.dateToStr("YYYY-MM-DD",new Date(item[param])):pageData;
            return h('div', [
                h('Tooltip', {
                    props: {
                        placement: 'top',
                        content:popData
                    }
                }, [
                h('div', {
                    attrs: {
                        class:getDivClass(index,rowArray),
                    },
                },popData)
            ])
          ])
        })
        return row
    }
}

//检查输入字符串字节长度
function fucCheckLength(strTemp){
    var i,sum;
    sum=0;
    var length = strTemp.length ;
    for(i=0;i<length;i++) {
        if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
            sum=sum+1;
        }else {
            sum=sum+2;
        }
    }
    return sum;
}

//渠道来源格式转换
function sourceStyleSwitch(data){
     var renderData=[].concat(data);
     renderData.map((item,index)=>{
         item.value=item.id;
         item.label=item.name;
         if(item.subSources){
            item.children=item.subSources;
            sourceStyleSwitch(item.children); 
         }
     })
    return renderData 
}

export default {
    mergeCell,
    fucCheckLength,
    sourceStyleSwitch
}