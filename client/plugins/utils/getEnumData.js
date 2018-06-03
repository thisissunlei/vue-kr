import http from '../http';
function getEnumData(params,callback){
    console.log("ooooooooo",params)
    
    this.$http.get('get-enum-all-data',params).then((res)=>{
        console.log("res",res)
        // callback([].concat(selectFormat(res.data)))
    }).catch((err)=>{
        // this.$Notice.error({
        //     title:err.message
        // });
    })
}
function selectFormat(data){
    var dataArr =  data.map((item)=>{

        item.label = item.desc;
        item.t_id = item.code;
        return item;
    })
    return [].concat(dataArr);
}
export default getEnumData;