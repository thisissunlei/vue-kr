//公共的api
export default  {
    //资质审核--列表
    'get-financial-invoice-list': {
      url: '/st/api/csr-invoice-qualification/list',
      method: 'get'
    },
    //财务端-资质查看详情
    'get-financial-invoice-detail': {
      url: '/ben/csr-invoice-qualification/view',
      method: 'get'
    },
    //财务端-资质编辑
    'get-financial-invoice-edit': {
      url: '/ben/csr-invoice-qualification/edit',
      method: 'post'
    },
    //财务端-资质驳回
     'get-financial-invoice-rejected': {
      url: '/ben/csr-invoice-qualification/handle',
      method: 'post'
    },
}
  