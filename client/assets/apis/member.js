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
} 