//公共的api
export default  {
    //账单中心--获取反结算信息
    'get-release': {
      url: '/api/krspace-pay/bill/release?',
      method: 'get'
    },
    //账单中心--批量结算
    'batch-pay': {
      url: '/api/krspace-pay/bill/batch-pay?',
      method: 'post'
    },
    //账单中心--获取账单列表
    'get-bill-list': {
      url: '/api/krspace-pay/bill/list',
      method: 'get'
    },
    //账单中心--账单结算
    'bill-pay': {
      url: '/api/krspace-pay/bill/pay?',
      method: 'post'
    },
    //账单中心--账单结算查询
    'get-balance': {
      url: '/api/krspace-pay/wallet/get-balance?',
      method: 'get'
    },
    //账单中心--账单详情
    'get-bill-detail': {
      url: '/api/krspace-pay/bill/detail?',
      method: 'get'
    },
    //账单中心--回款列表
    'get-payment-list': {
      url: '/api/krspace-pay/payment/list?',
      method: 'get'
    },
    //账单中心--回款详情
    'get-payment-detail': {
      url: '/api/krspace-pay/payment/detail?',
      method: 'get'
    },
    //账单中心--绑定客户
    'payment-bind': {
      url: '/api/krspace-pay/payment/bind?',
      method: 'post'
    },
    //账单中心--获取客户 
    'getCompanyInfo':{
      url:'/api/krspace-finance-web/member/csr-list?',
      method:'get'
    },
    //账单中心--收入管理--收入列表
    'get-income-list':{
      url:'/api/krspace-pay/income/list?',
      method:'get'
    },
    //账单中心--收入管理--收入详情
    'get-income-detail':{
      url:'/api/krspace-pay/income/detail?',
      method:'get'
    },
    //账单中心--收入管理--挂收入
    'add-income':{
      url:'/api/krspace-pay/income/add',
      method:'post'
    },
    //账单结算--反结算
    'bill-release': {
      url: '/api/krspace-pay/bill/release',
      method: 'post'
    },
    //账单中心--交易流水
    'get-payrecord-list': {
        url: '/api/krspace-pay/pay-record/list?',
        method: 'get'
    },
    //账单中心--导入回款明细
    'import-bank-flow': {
      url: '/api/krspace-pay/pay-record/importBankFlow',
      method: 'post'
    },
    //账单中心--账单类型
    'get-bill-type': {
      url: '/api/krspace-pay/bill/bill-type',
      method: 'get'
    },
    //账单中心--收入类型
    'get-fee-type': {
      url: '/api/krspace-pay/income/fee-type',
      method: 'get'
    },
    //账单中心--回款--退款
    'payment-refund': {
      url: '/api/krspace-pay/payment/refund',
      method: 'post'
    },
    //账单中心--回款--回款
    'payment-add': {
      url: '/api/krspace-pay/payment/add',
      method: 'post'
    },
     //账单中心--回款--开票
     'payment-invoice': {
      url: '/api/krspace-pay/payment/invoice',
      method: 'post'
    },

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
    
    //根据父级ID查询子级任务列表
    'parent-search-kid': {
      url: '/api/krspace-erp-web/pm/task/sub-list',
      method: 'get'
    }

  }
  