//订单管理-合同管理api
export default {
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
        url: '/api/krspace-erp-web/wf/station/contract/other-agreed/type/edit',
        method: 'post'
    },
    //获取工位合同PDF
    'get-station-contract-pdf-id': {
        url: '/api/krspace-erp-web/wf/station/contract/pdf',
        method: 'get'
    },
   //获取pdf地址
    'get-station-contract-pdf-url': {
        url: '/api/krspace-op-web/sys/down-file',
        method: 'post'
    },
    'get-station-contract-ivew-show': {
        url: '/api/krspace-op-web/sys/downFile',
        method: 'get'
    },
    //获取其他约定的数据
    'get-contract-other-convention-data': {
        url: '/api/krspace-erp-web/wf/station/contract/info/type/other-agreed',
        method: 'get'
    },

    //合同扫码列表
    'contract-yard-list': {
        url: '/api/krspace-erp-web/wf/station/contract/pigeonhole/search',
        method: 'get'
    },
    //合同扫码-批量归档
    'contract-batch-file': {
        url: '/api/krspace-erp-web/wf/station/contract/pigeonhole/update',
        method: 'post'
    }
}
