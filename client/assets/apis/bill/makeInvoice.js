//公共的api
export default  {
    //账单中心--获取反结算信息
    'get-invoice-list': {
      url: '/ben/csr-finance-list',
      method: 'get'
    },
    //开票接口
    'post-make-invoice': {
      url: 'csr-finance-openTicket',
      method: 'post'
    }
}
  