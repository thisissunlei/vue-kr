//公共的api
module.exports = {
    'post-list-upload-url': {
        url: '/api/krspace-erp-web/wf/request-attachment/add',
        method: 'post'
    }, 
    
    'get-vue-upload-url': {
        url: '/api/krspace-op-web/sys/upload-policy',
        method: 'get'
    },
    'get-enum-all-data':{
        url:'/api/krspace-sso-web/sys/enmu',
        method:'get'
    }
}
