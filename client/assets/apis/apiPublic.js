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
    },
    'down-file':{
        url:'/api/op/sys/downFile',
        method:'get'
    },
    'type/page':{
        url:'/mockdata/77/pm/role/list/type/page',
        method:'get'
    },
    'roledetail':{
        url:'/mockdata/77/api/pm/role/action/detail',
        method:'get'
    },
    'roleSave':{
        url:'/mockdata/77/api/pm/role/action/add',
        method:'post'
    },
    'getSsoUserListAll':{
        url:'/mockdata/77/api/pm/role-resource/pmUser',
        method:'get'
    },
    'existUserListAll':{
        url:'/mockdata/77/api/pm/role-resource/exist',
        method:'get'
    },
    'addUser':{
        url:'/mockdata/77/api/pm/role-resource/add',
        method:'get'
    },
}
