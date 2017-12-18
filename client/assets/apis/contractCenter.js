//订单管理-合同管理api
module.exports = {
    //获取合同列表
    'get-center-list-contract': {
        url: '/krspace-erp-web/wf/station/contract/enter/search?',
        method: 'get'
    },
    'get-center-prepare-data':{
        url: '/krspace-erp-web/wf/station/contract/AllContractType/search',
        method: 'get'
    },
    'get-center-export': {
        url: '/krspace-erp-web/wf/station/contract/enter/export',
        method: 'get'
    },
    
   

}
