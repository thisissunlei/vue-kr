//公共的api
export default  {
  //获取平面图信息
  'getplanmap': {
      url: '/api/krspace-finance-web/cmt/floor-graph/select-info?',
      method: 'get'
  },
  //获取社区List组件
    'get-mainbill-community': {
        url: '/api/krspace-finance-web/finaVerify/data/get-mainbill-community?',
        method: 'get'
  },
  //获取客户List组件
  'get-saler': {
      url: '/api/krspace-sso-web/sso/ssoUser/select?',
      method: 'get'
  },
  //获取售货员List组件
  'get-customer': {
      url: '/api/krspace-finance-web/customer/my-customers?',
      method: 'get'
  },
  //订单中心-订单作废
 'cancel-order': {
      url: '/api/krspace-op-web/order/metting-room/cancel?',
      method: 'post'
  },
   //订单中心-订单列表
 'order-list': {
      url: '/api/krspace-op-web/order/metting-room/list?',
      method: 'get'
  },
   //订单中心-订单详情
 'order-detail': {
      url: '/api/krspace-op-web/order/metting-room/detail?',
      method: 'get'
  },
  //获取客户
  'get-customer': {
      url: '/api/krspace-finance-web/customer/my-customers?',
      method: 'get'
  },
  //获取作废提示文字
  'get-cancel-msg': {
    url: '/api/krspace-op-web/order/metting-room/cancel/msg?',
    method: 'get'
},
}
