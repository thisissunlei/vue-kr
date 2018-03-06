//公共的api
export default  {
  
  //参数配置列表
  'getParamList': {
      url: '/api/krspace-sso-web/sys-param/list?',
      method: 'get'
  },
  //保存参数配置信息
  'saveParamData': {
      url: '/api/krspace-sso-web/sys-param/save-edit?',
      method: 'post'
  },
   //获取参数配置编辑信息
  'getParamData': {
      url: '/api/krspace-sso-web/sys-param/show?',
      method: 'get'
  },
}
