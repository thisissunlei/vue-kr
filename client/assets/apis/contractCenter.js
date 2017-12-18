//订单管理-合同管理api
module.exports = {
    //获取合同列表
    'get-center-list-contract': {
        url: '/api/krspace-erp-web/wf/station/contract/enter/search?',
        method: 'get'
    },
    'get-center-prepare-data':{
        url: '/api/krspace-erp-web/wf/station/contract/AllContractType/search',
        method: 'get'
    },

    //获取平面图信息
    'get-list-contract': {
        url: '/mockjs/66/api/krspace-erp-web/wf/request/contract/enter/search?',
        method: 'get'
    },
    'get-center-export': {
        url: '/api/krspace-erp-web/wf/station/contract/enter/export',
        method: 'get'
    },
}
