//门禁权限api
export default  {

    //获取子集列表
    'get-son-group-list': {
        url: '/api/iot-platform/auth-group/child-list',
        method: 'get'
    },
    //删除父子组之间的关系
    'delete-father-son-relation':{
        
        url : '/api/iot-platform/auth-group-relation/actions/delete',
        method: 'post'
    },

    'get-father-group-list':{
        url: '/api/iot-platform/auth-group/parent-list',
        method: 'get'
    },
     //门禁权限组列表
     'get-door-group-list':{
        url: '/api/iot-platform/auth/user-group/list',
        method: 'get'
    },

  }

