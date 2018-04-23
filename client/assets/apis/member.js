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
        url: '/st/api/krspace-op-web/customer-center/list',
        method: 'get'
    },
    //客户来源
    'get-customer-source': {
        url: '/api/krspace-op-web/customer-center/source/list',
        method: 'get'
    },
    //客户基本信息详情
    'get-customer-info-detail': {
        url: '/st/api/krspace-op-web/customer-center/info-detail',
        method: 'get'
    },
    //新增客户
    'add-customer': {
        url: '/api/krspace-op-web/customer-center/add',
        method: 'post'
    },
    //客户名称校验接口
    'check-company': {
        url: '/api/krspace-op-web/customer-center/check-company',
        method: 'get'
    },
    //顶部客户名称、状态
    'top-customer': {
        url: '/api/krspace-op-web/customer-center/customer',
        method: 'get'
    },
    
    //客户列表－转移客户
    'customer-list-switch': {
        url: '/st/api/krspace-op-web/customer-center/transfer',
        method: 'post'
    },
    //客户列表－按钮权限接口
    'customer-permission-btn': {
        url: '/st/api/krspace-op-web/customer-center/authority',
        method: 'get'
    },
    //客户转移－领取人下拉列表
    'customer-switch-leader': {
        url: '/st/api/krspace-op-web/customer-center/transfer/receive-list',
        method: 'get'
    },
    //客户转移－获取社区下拉数据
    'customer-switch-community': {
        url: '/st/api/krspace-op-web/customer-center/transfer/community-list',
        method: 'get'
    },
    //客户转移－入驻信息接口
    'customer-join-info': {
        url: '/st/api/krspace-op-web/seat-lock-detail/info/list',
        method: 'get'
    }
} 