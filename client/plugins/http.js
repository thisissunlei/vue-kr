 import axios from 'axios'
 import APIS from '../assets/apis/index';
 import envs from '../configs/envs';
 import Qs from 'qs'; 
 // 超时时间
 // axios.defaults.timeout = 6000
 // http请求拦截器

 const env = process.env.NODE_ENV;
 

const hostname = envs[env]['test']||  "" ;

 axios.defaults.withCredentials = true;
 
 axios.defaults.mode = 'cors';
var requestUrl = [] ,saveTime = 1000;

axios.interceptors.request.use(config => {
  if(config.method  == 'post'){
    let data = Qs.stringify(config.data);
    config.data = data;
  }
  if(config.url.indexOf('mockjs') !==-1 ){
    config.baseURL = 'http://rap.krspace.cn';
  }else{
    config.baseURL = '/';
  } 
  console.log(config.baseURL,"ppppppp")

  return config
}, error => {
  return Promise.reject(error)
})


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

 function check401(res) {
  res = res.data;
    if (res.code ===-4011) {
      window.location.href = '/new/login.html';
    } else if (res.code ===-4033) {
      // console.log('您没有操作权限，请联系管理员')
    }
    return res;
  }



export default {
  
  get: (url, params, success, failure) => new Promise((resolve, reject) => {

    if (params) {
      params = filterNull(params)
    }
    if(!APIS[url].url){
      return
    }
    axios.get(hostname+APIS[url].url, {params:params})
    .then(check401)
    .then(function (data) {
      if(parseInt(data.code)>0){
        success && success(data)
        resolve(data)
      }else{
        failure && failure(data)
        reject(data);
      }
      
    })
    .catch(function (error) {
      error = error.response.data
      failure && failure(error)
      reject(error)
    });
  }),
  post: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    if(!APIS[url].url){
      return;
    }

    let nowTime = new Date().getTime();
    requestUrl = requestUrl.filter((item) => {
      return (item.setTime + saveTime) > nowTime;
    });
    let sessionUrl = requestUrl.filter((item) => {
      return item.url === APIS[url].url;
    });
    if (sessionUrl.length > 0) {
      // console.log(obj.url + '请求重复 中断请求!');
      return;
    }
    let item = { url: APIS[url].url, setTime: new Date().getTime() };


    requestUrl.push(item);
    axios.post(hostname+APIS[url].url, params)
    .then(check401)
    .then(function (response) {
      if(parseInt(response.code)>0){
        success && success(response)
        resolve(response)
      }else{
        failure && failure(response)
        reject(response);
      }
    })
    .catch(function (error) {
      error = error.response.data
      failure && failure(error)
      reject(error)
    });
  }),
  put:  (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    if(!APIS[url].url){
      return
    }
    axios.put(hostname+APIS[url].url, params)
    .then(check401)
    .then(function (response) {
      if(parseInt(response.code)>0){
        success && success(response)
        resolve(response)
      }else{
        failure && failure(response)
        reject(response);
      }
    })
    .catch(function (error) {
      error = error.response.data
      failure && failure(error)
      reject(error)
    });
  }),
  delete: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    if(!APIS[url].url){
      return
    }
    axios.delete(hostname+APIS[url].url, {params:params})
    .then(check401)
    .then(function (data) {
      if(parseInt(data.code)>0){
        success && success(data)
        resolve(data)
      }else{
        failure && failure(data)
        reject(data);
      }
    })
    .catch(function (error) {
      error = error.response.data
      failure && failure(error)
      reject(error)
    });
  }),
}
