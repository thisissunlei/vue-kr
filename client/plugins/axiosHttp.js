 import axios from 'axios'
 import APIS from '../assets/apis/index';
 // 超时时间
 axios.defaults.timeout = 2000
 // http请求拦截器
axios.interceptors.request.use(config => {
  if(config.url.indexOf('mockjs') !==-1 ){
    console.log('mockjs')
    axios.defaults.baseURL = 'http://rap.krspace.cn';
  }else{
    axios.defaults.baseURL = '/';
  } 
  return config
}, error => {
  console.log('加载超时')
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

        // Notify.error('您没有操作权限，请联系管理员!');
    }else if(res.code === -1){
      console.log(res.message)
    }
    return res;
  }



export default {
  
  get: (url, params) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios.get(APIS[url].url, {params:params})
    .then(check401)
    .then(function (data) {
      console.log('resolve',data)
      resolve(data.data)
    })
    .catch(function (error) {
      reject(error)
    });
  }),
  post: (url, params) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios.post(APIS[url].url, params)
    .then(check401)
    .then(function (response) {
      resolve(response.data)
    })
    .catch(function (error) {
      reject(error)
    });
  }),
  put:  (url, params) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios.put(APIS[url].url, params)
    .then(check401)
    .then(function (response) {
      resolve(response.data)
    })
    .catch(function (error) {
      reject(error)
    });
  }),
  delete: (url, params) => new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios.delete(APIS[url].url, {params:params})
    .then(check401)
    .then(function (data) {
      console.log('resolve',data)
      resolve(data.data)
    })
    .catch(function (error) {
      reject(error)
    });
  }),
}
