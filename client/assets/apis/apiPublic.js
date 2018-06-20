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



    //权限
    'type-page':{
        url:'/api/pm/role/list/type/page',
        method:'get'
    },
    'roledetail':{
        url:'/api/pm/role/action/detail',
        method:'get'
    },
    'roleSave':{
        url:'/api/pm/role/action/add',
        method:'post'
    },
    'getSsoUserListAll':{
        url:'/api/pm/role-resource/pmUser',
        method:'get'
    },
    'existUserListAll':{
        url:'/api/pm/role-resource/exist',
        method:'get'
    },
    'addUser':{
        url:'/api/pm/role-resource/add',
        method:'get'
    },
    'roleEdit':{
        url:'/api/pm/role/action/edit',
        method:'get'
    },
    'roleDelete':{
        url:'/api/pm/role/action/delete',
        method:'delete'
    },
    'roleEidtDetail':{//'/api/pm/role/action/detail',
        url:'/api/pm/role/action/edit',
        method:'post'
    }
}
