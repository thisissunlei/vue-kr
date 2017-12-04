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
}
