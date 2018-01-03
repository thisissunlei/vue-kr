 import axios from 'axios'
 import APIS from '../assets/apis/index';
 import Qs from 'qs'; 
 // 超时时间
 // axios.defaults.timeout = 2000
 // http请求拦截器
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
      console.log('登录')
      window.location.href = '/new/login.html';
    } else if (res.code ===-4033) {
      console.log('您没有操作权限，请联系管理员')
      // this.$Notice.error({
      //   title:e.message
      // });

        // Notify.error('您没有操作权限，请联系管理员!');
    }
    return res;
  }



export default {
  
  get: (url, params, success, failure) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios.get(APIS[url].url, {params:params})
    .then(check401)
    .then(function (data) {
      if(parseInt(data.code)>0){
        success && success(data)
        resolve(data)
      }else{
        console.log(data, "ooooooo")
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
    // let params = Qs.stringify(params);
    axios.post(APIS[url].url, params)
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
    axios.put(APIS[url].url, params)
    .then(check401)
    .then(function (response) {
      if(parseInt(response.code)>0){
        success && success(response)
        resolve(response)
      }else{
        failure && failure(response)
        reject(response);
      }
      // success && success(response)
      // resolve(response)
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
    axios.delete(APIS[url].url, {params:params})
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
