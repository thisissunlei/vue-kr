function addAllselect(data,selectFormat){
    var dataArr =  data.map((item)=>{

        item.label = item.desc;
        item.t_id = item.code;
        return item;
    })
    return [].concat(dataArr);
}
export default selectFormat;