import axios from 'axios'
import APIS from '@/assets/apis';
import Qs from 'qs';

axios.defaults.timeout = 10000
// http请求拦截器

const env = process.env.NODE_ENV;


axios.defaults.withCredentials = true;

axios.defaults.mode = 'cors';


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
//数据格式化
function changeData(url,params){
  var data = '';
  if(APIS[url].dataType=='json'){
   data= Object.assign({},params);
  }else{
     data = Qs.stringify(params);
  }
  return data;
}
//404跳转
function check401(res) {
 res = res.data;
   if (res.code ===-4011) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `/new/login.html?RU=${redirectUrl}`;
   } else if (res.code ===-4033) {
   }
   return res;
 }



export default {
  getJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(aInterceptor);
    axios.get(APIS[url].url, params)
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

  postJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(aInterceptor);
    axios.post(APIS[url].url, params)
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

  putJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(aInterceptor);
    axios.put(APIS[url].url, params)
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

  delJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(aInterceptor);
    axios.delete(APIS[url].url, params)
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
 get: (url, params, success, failure) => new Promise((resolve, reject) => {

   if (params) {
     params = filterNull(params)
   }
   if(!APIS[url].url){
     return
   }
   axios.get(APIS[url].url, {params:params})
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

  axios.post(APIS[url].url, params)
   .then(check401)
   .then(function (response) {
     if(parseInt(response.code)>0){
       success && success(response)
       resolve(response)
     }else{


       if(failure){
         failure && failure(response)
       }else{
         return Promise.reject(response)
       }


     }
   })
   .catch(function (error) {

     if(error.response){
       error = error.response.data;
       failure && failure(error);
        reject && reject(error)
     }else{
       reject(error)
     }

   });
 }),
 put:  (url, params, success, failure) => new Promise((resolve, reject) => {
   if (params) {
     params = filterNull(params)
   }
   if(!APIS[url].url){
     return
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
