//公共的api
module.exports = {
  //入驻订单列表
  'join-bill-list': {
    url: '/mockjs/66/api/krspace-op-web/order-seat-add/list',
    method: 'get'
  },
  //入驻减租订单列表-获取社区
  'join-bill-community': {
    url: '/krspace-op-web/cmt/community/select/use/type/list',
    method: 'get'
   },
   //减租订单列表
  'reduce-bill-list': {
    url: '/mockjs/66/api/krspace-op-web/order-seat-reduce/list',
    method: 'get'
  },
  //入驻订单列表－详情
  'reduce-bill-detail': {
    url: '/mockjs/66/api/krspace-op-web/order-seat-add/show',
    method: 'get'
  },

} 