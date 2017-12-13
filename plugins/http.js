//引入apis
import APIS from '../assets/apis/index';

import Qs from 'qs';

// 引用axios
var axios = require('axios')


// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}


function apiAxios (method, name, params, success, failure) {

  if (params) {
    params = filterNull(params)
  }

  let root = '';
  let url = APIS[name].url;

  if(url.indexOf('mockjs') !==-1){
       root='http://rap.krspace.cn';
  }

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false,
  }).then(function (res) {
    if (res.status === 200) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        console.log('api error, HTTP CODE: ' + JSON.stringify(res.data))
      }
    }
  }).catch(function (err) {
    
    let res = err.response
    if (err) {
      console.log('api error, HTTP CODE: ' + res)
    }
  })
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {

  if(config.method  == 'post'){
    let data = Qs.stringify(config.data);
    config.data = data;
  }

  return config;

},(error) =>{
  return Promise.reject(error);
});

axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

export default {
  
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}