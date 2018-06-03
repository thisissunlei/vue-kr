//公共的api
export default  {
    //账单中心--获取反结算信息
    'get-invoice-list': {
      url: '/api/order/csr-invoice-list',
      method: 'get'
    },
    //开票接口
    'post-make-invoice': {
      url: '/api/order/csr-finance-openTicket',
      method: 'post'
    },
    //发票列表统一接口
    'invoice-list-unified': {
      url: '/api/order/csr-invoice-list',
      method: 'get'
    },
    //根据客户id获取可开票数据
    'get-make-invoice-detail': {
      url: '/api/order/csr-invoice-qualification/info',
      method: 'get'
    },
     //根据客户id获取开票信息
    'get-make-invoice-detail-table': {
      url: '/api/order/csr-invoice-amountDetail',
      method: 'get'
    }
   
}
  