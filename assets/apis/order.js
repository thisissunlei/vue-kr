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
      method: 'get'
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
    url: 'krspace-op-web/bill/release?',
    method: 'get'
  },
  //批量结算
  'batch-pay': {
    url: 'krspace-op-web/bill/batch-pay?',
    method: 'get'
  },
  //获取账单列表
  'get-bill-list': {
    url: 'krspace-op-web/bill/list?',
    method: 'get'
  },
  //账单结算
  'bill-pay': {
    url: 'krspace-op-web/bill/pay?',
    method: 'get'
  },
  //账单结算查询
  'get-balance': {
    url: 'krspace-op-web/bill/get-balance?',
    method: 'get'
  },
  //账单详情
  'get-detail': {
    url: 'krspace-op-web/bil/detail?',
    method: 'get'
  },
}
