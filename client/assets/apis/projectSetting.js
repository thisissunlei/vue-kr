//项目管理api
module.exports = {
     //项目管理－新建任务
     'project-add-task': {
      url: '/api/krspace-erp-web/pm/task/add',
      method: 'post'
    },
    //任务名称唯一性校验
    'project-name-check': {
      url: '/api/krspace-erp-web/pm/task/unique',
      method: 'get'
    },
    //项目管理－编辑任务
    'project-edit-task': {
      url: '/api/krspace-erp-web/pm/task/edit',
      method: 'post'
    },
    //项目管理－删除任务
    'project-delete-task': {
      url: '/api/krspace-erp-web/pm/task/delete',
      method: 'delete'
    },
    //项目管理－查询任务
    'project-get-task': {
      url: '/api/krspace-erp-web/pm/task/detail',
      method: 'get'
    },
    //项目管理－查询任务列表
    'project-list-task': {
      url: '/api/krspace-erp-web/pm/task/list',
      method: 'get'
    },
    //项目管理－项目进度列表
    'project-progress-list': {
      url: '/api/krspace-erp-web/pm/file/list/type/schedule',
      method: 'get'
    },
     //项目管理－根据项目状态类型查询甘特图显示任务项
     'project-status-search': {
      url: '/api/krspace-erp-web/pm/task-template/list',
      method: 'get'
    },
    //项目档案管理列表
    'project-archives-list': {
      url: '/api/krspace-erp-web/pm/file/list/type/dashboard',
      method: 'get'
    },
    //项目档案管理列表-新增项目
    'project-archives-add': {
      url: '/api/krspace-erp-web/pm/file/save',
      method: 'post'
    },
    //确定签署合同（项目进入待开业期）
    'sure-sign-project': {
      url: '/api/krspace-erp-web/pm/file/signed',
      method: 'post'
    },
    //项目详情星星
    'project-detail-star': {
      url: '/api/krspace-erp-web/pm/task/focus',
      method: 'post'
    },
    //根据项目id查询甘特图显示任务项
    'project-id-search': {
      url: '/api/krspace-erp-web/pm/task/tree',
      method: 'get'
    },
    //项目管理-档案管理-档案树部
    'project－archives-tree': {
      url:'/api/krspace-pm-web/pm/form-group/list/type/tree',
      method: 'get'
    },
    //项目管理-档案管理-获取字段编辑记录
    'project－field-record': {
      url:'/api/krspace-pm-web/pm/operate-log/field',
      method: 'get'
    },
}
