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
    },
    //app管理--管家设置--根据会员ID查询会员信息
   'search-mbr': {
        url: '/api/krspace-finance-web/cmt/steward/search-mbr',
        method: 'get'
    },
    //app管理--Icon管理--列表
   'get-icon-list': {
        url: '/api/krspace-finance-web/app/icon/list',
        method: 'get'
    },
    //app管理--Icon管理--删除
   'delete-icon': {
        url: '/api/krspace-finance-web/app/icon/delete',
        method: 'post'
    },
    //app管理--Icon管理--新增
   'create-icon': {
        url: '/api/krspace-finance-web/app/icon/create',
        method: 'post'
    },
    //app管理--Icon管理--编辑
   'edit-icon': {
        url: '/api/krspace-finance-web/app/icon/edit',
        method: 'post'
    },
    //app管理--Icon管理--详情
   'get-icon-detail': {
        url: '/api/krspace-finance-web/app/icon/detail',
        method: 'get'
    },
    //app管理--Icon管理--icon位置
   'get-icon-location': {
        url: '/api/krspace-finance-web/app/icon/location/list',
        method: 'get'
    },
    //app管理--推送管理--推送列表
   'get-app-push-page': {
        url: '/api/krspace-finance-web/app/push/page',
        method: 'get'
    },
    //app管理--推送管理--推送详情
    'get-app-push-detail': {
        url: ' /api/krspace-finance-web/app/push/detail',
        method: 'get'
    },
    //app管理--推送管理--新建推送
    'create-app-push': {
        url: '/api/krspace-finance-web/app/push/create',
        method: 'post'
    },
    //app管理--推送管理--根据活动标题查询活动
    'get-title-list': {
        url: '/api/krspace-finance-web/activity/management/title/list',
        method: 'get'
    },
    //app管理--推送管理--社区列表
    'get-community-new-list': {
        url: '/api/krspace-finance-web/cmt/community/new/list',
        method: 'get'
    },


}
  