//公共的api
export default  {
  //获取平面图信息
  'getplanmap': {
      url: 'krspace-finance-web/cmt/floor-graph/select-info?',
      method: 'get'
  },
  //获取社区List组件
    'get-mainbill-community': {
        url: '/krspace-finance-web/finaVerify/data/get-mainbill-community?',
        method: 'get'
  },
  //获取客户List组件
  'get-saler': {
      url: 'krspace-sso-web/sso/ssoUser/select?',
      method: 'get'
  },
  //获取售货员List组件
  'get-customer': {
      url: 'krspace-finance-web/customer/my-customers?',
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
  
  //获取反结算信息
  'get-release': {
    url: 'krspace-pay/bill/release?',
    method: 'get'
  },
  //获取客户
  'get-customer': {
      url: 'krspace-finance-web/customer/my-customers?',
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
    url: 'krspace-pay/wallet/get-balance?',
    method: 'get'
  },
  //账单详情
  'get-bill-detail': {
    url: 'krspace-pay/bill/detail?',
    method: 'get'
  },
  //回款列表
  'get-payment-list': {
    url: '/krspace-pay/payment/list?',
    method: 'get'
  },
  //回款详情
  'get-payment-detail': {
    url: '/krspace-pay/payment/detail?',
    method: 'get'
  },
  //绑定客户
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
  //本地联调测试接口
  'get-order-detail': {
    url: 'krspace-finance-web/checkinagreement/checkin-agreement/actions/show?',
    method: 'get'
  },
   //计算合同租赁期限
  'contract-date-range': {
    url: 'krspace-op-web/finacontractdetail/contract-date-range?',
    method: 'get'
  },
  //优惠选项communityId
    'sale-tactics': {
        url: 'krspace-finance-web/sale-tactics?',
        method: 'get'
    },
    //计算优惠
    'count-sale': {
        url: 'krspace-finance-web/count-order-sale',
        method: 'post'
    },
    //获取可选择的续租工位
     'get-renew-station': {
        url: 'krspace-finance-web/order-seat-detail/continue?',
        method: 'get'
    },
    //获取可选择的减租工位
     'get-reduce-station': {
        url: 'krspace-finance-web/order-seat-detail/reduce?',
        method: 'get'
    },
    //入驻新建提交
     'save-join': {
        url: 'krspace-finance-web/order-seat-add',
        method: 'post'
    },
    //续驻新建提交
     'save-renew': {
        url: 'krspace-finance-web/order-seat-continue',
        method: 'post'
    },
    'save-reduce': {
        url: 'krspace-finance-web/order-seat-reduce',
        method: 'post'
    },
    //计算工位服务费小计
    'get-station-amount': {
        url: 'krspace-finance-web/order-seat-detail/amount',
        method: 'post'
    },
    // 获取社区-楼层接口
    'get-community-floor': {
        url: 'krspace-finance-web/order-seat/community-floor?',
        method: 'get'
    },
    // 获取社区-楼层接口
    'get-reduce-station-amount': {
        url: 'krspace-finance-web/seat-reduce-amount?',
        method: 'get'
    },
     // 
}
