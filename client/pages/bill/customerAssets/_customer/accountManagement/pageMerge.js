import utils from '~/plugins/utils';
//判断单元格最后一个不加border
function getDivClass(index,obj){
    let divClass = 'row-current-more current-more-task ';
    if (index === obj.length - 1) {
        divClass = 'row-current-more current-more-task noBorder';
    }
    return divClass;
}

//列表一行分成多个单元格
function mergeCell(h,rowArray,param,type){
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
            if(type=='money'){
                pageData=item[param]?'¥'+utils.thousand(item[param]):'¥0.00';
            }
            return h('div', [
                h('Tooltip', {
                    props: {
                        placement: 'top',
                        content:pageData
                    }
                }, [
                h('div', {
                    attrs: {
                        class:getDivClass(index,rowArray),
                    }
                },pageData)
            ])
          ])
        })
        return row
    }
}
export default {
    mergeCell
}