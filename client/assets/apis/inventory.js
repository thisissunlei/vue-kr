//公共的api
export default  {
    //每日库存列表+查询
    'getDailyInventory': {
        url: '/mockjsdata/krspace-op-web/inventory/list',
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
  }
  