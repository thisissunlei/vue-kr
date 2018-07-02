import cityData from './../../components/KrField/data/cityData.json'

export default (cityValue)=>{
   return getProvince(cityValue);
}

//获取省
function getProvince(values,data=cityData){
            
  if(!values || !values.length){
      return '';
  }
  var children = [];
  var str = '';
  for(var i=0;i<data.length;i++){
      if(data[i].id == values[0]){
          children = [].concat(data[i].children);
          str += data[i].label;
          break;
      }
  }

  return str +=getCity(values,children);
}
function getCity(values,data){
  var children = [];
  var str = '';
  for(var i=0;i<data.length;i++){
      if(data[i].id == values[1]){
          children = [].concat(data[i].children);
          str += '/' + data[i].label;
          break;
      }
  }
  return str += getCounty(values,children);
}
function getCounty(values,data){
  var str= '';
  var children = [];
  for(var i=0;i<data.length;i++){
      if(data[i].id == values[2]){
          return str += '/' + data[i].label;
          break;
      }
  }

}

