//订单管理-合同管理api
module.exports = {
    //获取合同列表
    'get-center-list-contract': {
        url: '/api/krspace-erp-web/wf/station/contract/enter/search',
        method: 'get'
    },
    //获取准备数据
    'get-center-prepare-data':{
        url: '/api/krspace-erp-web/wf/station/contract/AllContractType/search',
        method: 'get'
    },
    //合同生效
    'post-contract-take-effect': {
        url: '/api/krspace-erp-web/wf/station/contract/actions/start',
        method: 'post'
    },
    //合同生成其他约定方法
    'post-contract-other-convention': {
        url: '/wf/station/contract/other-agreed',
        method: 'post'
    },
    //获取工位合同PDF
    'get-station-contract-pdf-id': {
        url: '/api/krspace-erp-web/wf/station/contract/pdf',
        method: 'get'
    },
   
}
