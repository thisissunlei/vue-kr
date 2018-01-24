//公共的api
export default  {
    //app管理--管家设置--删除管家
    'delete-steward': {
        url: '/api/krspace-finance-web/cmt/steward/delete',
        method: 'post'
    },
    //app管理--管家设置--搜索会员列表
      'search-mbr-list': {
          url: '/api/krspace-finance-web/cmt/steward/search-mbr-list',
          method: 'get'
    },
    //app管理--管家设置--新增管家
    'create-steward': {
        url: '/api/krspace-finance-web/cmt/steward/create',
        method: 'post'
    },
    //app管理--管家设置--获取管家列表
    'get-steward-list': {
        url: '/api/krspace-finance-web/cmt/steward/list',
        method: 'get'
    },
    //app管理--管家设置--获取管家详情
   'get-steward-detail': {
        url: '/api/krspace-finance-web/cmt/steward/detail',
        method: 'get'
    },
     //app管理--管家设置--编辑管家
   'edit-steward': {
        url: '/api/krspace-finance-web/cmt/steward/edit',
        method: 'post'
    }
  }
  