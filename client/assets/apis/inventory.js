//公共的api
export default  {
    //每日库存列表+查询
    'getDailyInventory': {
        url: '/api/krspace-op-web/inventory/list',
        method: 'get'
    },
    //每日库存列表-社区接口
    'getDailyCommunity': {
        url: '/api/krspace-finance-web/inventory/community',
        method: 'get'
    },
    //每日库存列表-城市接口
    'getDailyCity': {
        url: '/api/krspace-finance-web/inventory/city',
        method: 'get'
    },
    //每日库存列表-社区下楼层接口
    'getDailyFloor': {
        url: '/api/krspace-finance-web/inventory/community-floor',
        method: 'get'
    },
    //每日库存列表-统计
    'getDailyStatiscal': {
        url: '/api/krspace-finance-web/inventory/statistics',
        method: 'get'
    },
    //可租库存列表+查询
    'getOptionalInventory': {
        url: '/api/krspace-finance-web/inventory/rent-list',
        method: 'get'
    },
    //可租库存列表-统计
    'getOptionalStatiscal': {
        url: '/api/krspace-finance-web/inventory/rent-statistics',
        method: 'get'
    },
    //每日库存-时间轴
    'getDailyTimeLine': {
        url: '/api/krspace-finance-web/inventory/list/timeline',
        method: 'get'
    },
    //可租库存-时间轴
    'getOptionalTimeLine': {
        url: '/api/krspace-finance-web/inventory/rent-list/timeline',
        method: 'get'
    },
    // 运营主页
    'getOperating': {
        url: '/api/order/operation/home',
        method: 'get'
    },
    // 即将到期
    'getDueList': {
        url: '/api/order/operation/due/list',
        method: 'post'
    },
    // 即将到期导出
    'excelDueList': {
        url: '/api/order/operation/due/list-excel',
        method: 'post'
    },
    //已起租未付
    'unpaidList': {
        url: '/api/order/operation/rentNoPay/list',
        method: 'get'
    },
     //逾期未付
     'Overduelist': {
        url: '/api/order/operation/overDateNoPay/list',
        method: 'get'
    },
    //社区招商
    'community-investment-list': {
        url: '/api/krspace-finance-web/inventory/cmt-investment/list',
    },
    //每日库存-平面图
    'getInventoryMap': {
        url: '/api/krspace-finance-web/cmt/floor-graph/list',
        method: 'get'
    },
    // 即将进场
    'getImtPutawayList': {
        url: '/api/order/operation/imtPutaway/list',
        method: 'post'
    },
    // 即将进场导出
    'excelImtPutawayList': {
        url: '/api/order/operation/imtPutaway/list-excel',
        method: 'get'
    },
      // 预约参观
      'AnappointmentList': {
        url: '/api/krspace-finance-web/sys/visit-record/list',
        method: 'get'
    },
    
    // 方可
    'gitVisitorsList': {
        url: '/api/krspace-finance-web/cmt/visit/get-visit-list',
        method: 'get'
    },
  }
  