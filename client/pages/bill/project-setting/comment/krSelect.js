
 function getSelectData(value,callback){
  
}
function selectFormat(data){
  var dataArr =  data.map((item)=>{

      item.label = item.desc;
      item.t_id = item.code;
      return item;
  })
  return [].concat(dataArr);
}