//公共的api
export default {
    //企业管理员列表
    'customer-manager-list': {
        url: '/api/krspace-op-web/customer/manager/list',
        method: 'get'
    },
    //获取企业管理员详情
    'customer-manager-detail': {
        url: '/api/krspace-op-web/customer/manager/detail',
        method: 'get'
    },
    //修改管理员
    'edit-customer-manager': {
        url: '/api/krspace-op-web/customer/manager/edit',
        method: 'post'
    },
    //获取管理员数量
    'get-manager-count': {
        url: '/api/krspace-op-web/customer/manager/manager-count',
        method: 'get'
    },
    //客户信息列表请求
    'get-client-list': {
        url: '/api/krspace-op-web/customer-center/list',
        method: 'get'
    },
    //客户来源
    'get-customer-source': {
        url: '/api/krspace-op-web/customer-center/source/list',
        method: 'get'
    },
    //客户基本信息详情
    'get-customer-info-detail': {
        url: '/api/krspace-op-web/customer-center/info-detail',
        method: 'get'
    },
    //新增客户
    'add-customer': {
        url: '/api/krspace-op-web/customer-center/add',
        method: 'post'
    },
} 