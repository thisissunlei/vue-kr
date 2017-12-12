//公共的api
export default  {
    //账单中心--获取反结算信息
    'get-release': {
      url: 'krspace-pay/bill/release?',
      method: 'get'
    },
    //账单中心--批量结算
    'batch-pay': {
      url: 'krspace-pay/bill/batch-pay?',
      method: 'post'
    },
    //账单中心--获取账单列表
    'get-bill-list': {
      url: 'krspace-pay/bill/list?',
      method: 'get'
    },
    //账单中心--账单结算
    'bill-pay': {
      url: 'krspace-pay/bill/pay?',
      method: 'post'
    },
    //账单中心--账单结算查询
    'get-balance': {
      url: 'krspace-pay/wallet/get-balance?',
      method: 'get'
    },
    //账单中心--账单详情
    'get-bill-detail': {
      url: 'krspace-pay/bill/detail?',
      method: 'get'
    },
    //账单中心--回款列表
    'get-payment-list': {
      url: '/krspace-pay/payment/list?',
      method: 'get'
    },
    //账单中心--回款详情
    'get-payment-detail': {
      url: '/krspace-pay/payment/detail?',
      method: 'get'
    },
    //账单中心--绑定客户
    'payment-bind': {
      url: '/krspace-pay/payment/bind?',
      method: 'post'
    },
    //账单中心--获取客户 
    'getCompanyInfo':{
      url:'/krspace-finance-web/member/csr-list?',
      method:'get'
    },
    //账单中心--收入管理--收入列表
    'get-income-list':{
      url:'/krspace-pay/income/list?',
      method:'get'
    },
    //账单中心--收入管理--收入详情
    'get-income-detail':{
      url:'/krspace-pay/income/detail?',
      method:'get'
    },
    //账单中心--收入管理--挂收入
    'add-income':{
      url:'/krspace-pay/income/add',
      method:'post'
    },
    //账单结算--反结算
    'bill-release': {
      url: 'krspace-pay/bill/release',
      method: 'post'
    },
    //账单中心--交易流水
    'get-payrecord-list': {
        url: '/krspace-pay/pay-record/list?',
        method: 'get'
    },
    //账单中心--导入回款明细
    'import-bank-flow': {
      url: '/krspace-pay/pay-record/importBankFlow',
      method: 'post'
    },
  }
  