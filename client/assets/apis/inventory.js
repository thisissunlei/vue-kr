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
    }
  }
  