// 金蝶数据同步
export default {
    //获取同步数据记录列表
    "king-getList": {
        url: "/ben/sync/listKdSyncDataByPage",
        method: "get"
    },
    //订单中心-订单作废
    "cancel-order": {
        url: "/ben/krspace-op-web/order/metting-room/cancel?",
        method: "post"
    },
    //获取同步类型列表
    "get-sync-data-type-list-enum": {
        url: "/ben/api/krspace-sso-web/sys/enmu",
        method: "get"
    },
    //新建同步
    'post-creat-sync-data':{
        url: "/ben/sync/addKdSyncData",
        method: "post"
    },
    //传输数据过滤
    'get-sync-income-data-list':{
        url: "/ben/sync/listKdSyncIncomeDataByPage",
        method: "post"
    },
    //传输数据过滤
    'get-sync-payment-data-list':{
        url: "/ben/sync/listKdSyncPaymentDataByPage",
        method: "post"
    },
    //金蝶数据同步详情页
    'getKingDeeDetail': {
        url: '/ben/sync/findSyncDataDetailById',
        method: 'get'
    },
    //原始应收数据
    'getOriginalAccountsData': {
        url: '/ben/sync/listKdDataDetail1',
        method: 'get'
    },
    //原始传输数据
    'getOriginalReceivableData': {
        url: '/ben/sync/listKdDataDetail2',
        method: 'get'
    },
    //传输数据应收数据
    'getTransmissionAccountsData':{
        url: '/ben/sync/listKdSendData1',
        method: 'get'
    },
    //传输数据回款数据
    'getTransmissionReceivableData':{
        url: '/ben/sync/listKdSendData2',
        method: 'get'
    }

  }
  
