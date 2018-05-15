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
            var pageData=item[param]?item[param]:'-';
            var popData=(item[param]&&isTime)?dateUtils.dateToStr("YYYY-MM-DD",new Date(item[param])):isHas;
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
                },pageData)
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

export default {
    mergeCell,
    fucCheckLength
}