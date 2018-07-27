//公共的api
export default  {
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
  