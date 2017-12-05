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
      url: 'krspace-op-web/order/metting-room/list?',
      method: 'get'
  },
   //订单中心-订单详情
 'order-detail': {
      url: 'krspace-op-web/order/metting-room/detail?orderId={orderId}',
      method: 'get'
  },
  //获取客户
  'get-customer': {
      url: 'krspace-finance-web/customer/my-customers?',
      method: 'get'
  },
}
