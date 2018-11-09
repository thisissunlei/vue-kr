class statusFn{
    constructor(){
 
    }
    
    getStatus(response){
      switch (response.status) {
         case 401:
             const redirectUrl = encodeURIComponent(window.location.href);
             window.location.href = `/new/login.html?RU=${redirectUrl}`;
             return ;
         case 404:
             response.data.message="发出的请求针对的是不存在的记录"
             break;
         case 400:
             response.data.message="发出的请求有错误，服务器没有进行新建或修改数据的操作"
             break;
         case 500:
             response.data.message="服务器发生错误，请检查服务器"
             break;
         case 502:
             response.data.message="'网关错误"
             break;
         case 504:
             response.data.message="网关超时"
             break;
         case 503:
             response.data.message="'服务不可用，服务器暂时过载或维护"
             break;
         default:
             break;
        }
         return Promise.reject(response);
    }
 }
 
 var status=new statusFn();
 export default{
     getStatus:status.getStatus
 }