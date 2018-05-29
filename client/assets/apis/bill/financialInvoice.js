//公共的api
export default  {
    //资质审核--列表
    'get-financial-invoice-list': {
      url: '/ben/csr-invoice-qualification/list',
      method: 'get'
    },
    //开票接口
    'post-financial-invoice-detail': {
      url: '/ben/csr-invoice-qualification/view',
      method: 'post'
    }
}
  