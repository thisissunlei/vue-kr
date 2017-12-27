import Promise from 'promise-polyfill';
import APIS from '../assets/apis/index';
import Qs from 'qs';
var axios = require('axios')
var root = '/'

function getUrl(path) {
    var url = APIS[path].url;

    if(!url){
      return ;
    }
   
    if(url.indexOf('mockjs') !==-1){
       root='http://rap.krspace.cn';
    }
  }
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



  function getMethod(path) {
    const apiConfig = APIS[path];
    return apiConfig.method;
  }
  function jsonParse(res){
    return res.data;
  }
  function check401(res) {
    if (res.code ===-4011) {
      window.location.href = '/new/login.html';
    } else if (res.code ===-4033) {
       this.$Notice.error({
          title:'您没有操作权限，请联系管理员!'
       })
    }
    return res;
  }

  const http = {
    transformPreResponse(response){
      var data = response;
      if(Object.prototype.toString.call(response) === '[object Array]'){
        data = response.pop();
      }
      return data;
    },
    transformResponse:function(response){
      return response.data;
    },
    get: (url, params) => new Promise((resolve, reject) => {

      if (!url) {
        return;
      }
      getUrl(url)
      if (params) {
        params = filterNull(params)
      }

      axios({
          method: 'get',
          url: APIS[url].url,
          params: params,
          baseURL: root,
          withCredentials: false,
        })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(function(err){
        if(err == 'TypeError: Failed to fetch'){
            return ;
        }
        reject(err)
      });

      
    }),

    post: (url, params, payload) => new Promise((resolve, reject) => {

      if (!url) {
        return
      }
      console.log('POST========',url,params)
      // getUrl(url)

      axios({
          method: 'POST',
          url: APIS[url].url,
          data: params,
          params: null,
          baseURL: root,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
       .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(function(err){
        if(err == 'TypeError: Failed to fetch'){
            return ;
        }
        reject(err)
      });
    }),

    update: (url, params, payload) => new Promise((resolve, reject) => {
      const searchParams = new URLSearchParams();

      if (!url) {
        return
      }
      axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

      getUrl(url)
 if (params) {
        params = filterNull(params)
      }
      axios({
          method: method,
          url: APIS[url].url,
          data: method === 'POST' || method === 'PUT' ? params : null,
          params: method === 'GET' || method === 'DELETE' ? params : null,
          baseURL: root,
          withCredentials: false,
        })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(function(err){
        if(err == 'TypeError: Failed to fetch'){
            return ;
        }
        reject(err)
      });
    }),

    remove: (url, params, payload) => new Promise((resolve, reject) => {
      const searchParams = new URLSearchParams();

      if (!url) {
        return
      }
      getUrl(url)
 if (params) {
        params = filterNull(params)
      }
      axios({
          method: method,
          url: APIS[url].url,
          data: method === 'POST' || method === 'PUT' ? params : null,
          params: method === 'GET' || method === 'DELETE' ? params : null,
          baseURL: root,
          withCredentials: false,
        })
      .then(jsonParse)
      .then(check401)
      .then(http.transformPreResponse)
      .then(json => {
        if(parseInt(json.code)>0){
          //处理数据格式
          resolve(http.transformResponse(json));
        }else{
          reject(json);
        }
      })
      .catch(function(err){
        if(err == 'TypeError: Failed to fetch'){
            return ;
        }
        reject(err)
      });
    }),
  }


export default http;
