//订单管理-订单接口
export default {
  //入驻订单列表
  'join-bill-list': {
    url: '/api/krspace-op-web/order-seat-add/list',
    method: 'get'
  },
  //入驻减租订单列表-获取社区
  'join-bill-community': {
    url: '/api/krspace-op-web/cmt/community/select/use/type/list',
    method: 'get'
   },
   //减租订单列表
  'reduce-bill-list': {
    url: '/api/krspace-op-web/order-seat-reduce/list',
    method: 'get'
  },
  //入驻订单列表－详情
  'join-bill-detail': {
    url: '/api/krspace-op-web/order-seat-add/show',
    method: 'get'
  },
  //减租订单列表－详情
  'reduce-bill-detail': {
    url: '/api/krspace-op-web/order-seat-reduce/show',
    method: 'get'
  },
  //入驻减租订单列表－作废
  'join-nullify': {
    url: '/api/krspace-op-web/order-seat-add/orderStatus',
    method: 'post'
  },
  //入驻减租高级查询－下拉
  'order-pay-list': {
    url: '/api/krspace-op-web/order-seat/data',
    method: 'get'
  },
  //申请合同
  'apply-contract': {
    url: '/api/krspace-op-web/order-seat/contractApply',
    method: 'get'
  }
} 
