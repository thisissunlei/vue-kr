import dateUtils from 'vue-dateutils';

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

export default {
    mergeCell
}