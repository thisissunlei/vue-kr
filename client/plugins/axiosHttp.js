import axios from "axios";
import qs from "qs";
// import { Message } from "element-ui";

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//引入apis
import APIS from '../assets/apis/index';

axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
  	 console.log('添加请求拦截器',config)
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 数据序列化成表单
      config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }

    return config;
  },
  error => {
  	console.log('error',error)
    // Message({  //  饿了么的消息弹窗组件,类似toast
    //   showClose: true,
    //   message: error,
    //   type: "error.data.error.message"
    // });
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (res.data && !res.data.success) {
    	console.log('res.data',res.data)
      // Message({ //  饿了么的消息弹窗组件,类似toast
      //   showClose: true,
      //   message: res.data.error.message.message
      //     ? res.data.error.message.message
      //     : res.data.error.message,
      //   type: "error"
      // });
      return Promise.reject(res.data);
    }
    return res;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem("loginUserBaseInfo")) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: "/login"
      });
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime();
      if (nowTime > lifeTime) {
      	console.log('登录状态信息过期,请重新登录')
      	window.location.href = '/new/login.html'
        // Message({
        //   showClose: true,
        //   message: "登录状态信息过期,请重新登录",
        //   type: "error"
        // });
        router.push({
          path: "/login"
        });
      }
    }
    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    if (error.response.status === 403) {
    	window.location.href = '/error'
    }
    if (error.response.status === 500) {
    	window.location.href = '/error'
    }
    if (error.response.status === 502) {
    	window.location.href = '/error'
    }
    if (error.response.status === 404) {
    	window.location.href = '/error'
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.data.error.message);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//   install: function(Vue, Option) {
//     Object.defineProperty(Vue.prototype, "$http", { value: Axios });
//   }
// };
export default {
  //get请求
    get:function (name,param) {
    	console.log('==============')
      return new Promise((resolve,reject) => {
      	let url = APIS[name].url;
        axios({
          method: 'get',
          url,
          params: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
    },
  //post请求
    post:function (name,param) {
      return new Promise((resolve,reject) => {
      	let url = APIS[name].url;

        axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
     }
  }
