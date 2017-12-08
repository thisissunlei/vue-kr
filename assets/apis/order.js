//公共的api
module.exports = {
  //获取平面图信息
  'getplanmap': {
      url: 'krspace-finance-web/cmt/floor-graph/select-info?',
      method: 'get'
  },
  //财务--审核列表--高级查询--获取社区
    'get-mainbill-community': {
        url: '/krspace-finance-web/finaVerify/data/get-mainbill-community?',
        method: 'get'
  },
  //订单中心-订单作废
 'cancel-order': {
      url: '/krspace-op-web/order/metting-room/cancel?',
      method: 'post'
  },
   //订单中心-订单列表
 'order-list': {
      url: '/krspace-op-web/order/metting-room/list?',
      method: 'get'
  },
   //订单中心-订单详情
 'order-detail': {
      url: 'krspace-op-web/order/metting-room/detail?',
      method: 'get'
  },
  //获取客户
  'get-customer': {
      url: 'krspace-finance-web/customer/my-customers?',
      method: 'get'
  },
  //获取反结算信息
  'get-release': {
    url: 'krspace-pay/bill/release?',
    method: 'get'
  },
  //批量结算
  'batch-pay': {
    url: 'krspace-pay/bill/batch-pay?',
    method: 'post'
  },
  //获取账单列表
  'get-bill-list': {
    url: 'krspace-pay/bill/list?',
    method: 'get'
  },
  //账单结算
  'bill-pay': {
    url: 'krspace-pay/bill/pay?',
    method: 'post'
  },
  //账单结算查询
  'get-balance': {
    url: 'krspace-pay/bill/get-balance?',
    method: 'get'
  },
  //账单详情
  'get-bill-detail': {
    url: 'krspace-pay/bill/detail?',
    method: 'get'
  },
  //回款列表
  'get-payment-list': {
    url: 'krspace-pay/payment/list?',
    method: 'get'
  },
  //绑定客户
  'payment-bind': {
    url: 'krspace-pay/payment/bind?',
    method: 'post'
  },
  //账单中心--获取客户 
  'getCompanyInfo':{
    url:'/krspace-finance-web/member/csr-list?',
    method:'get'
},


}
