// 金蝶数据同步 
export default  {
  
  //获取同步数据记录列表
  'king-getList': {
      url: '/zhong/api/sync/listKdSyncDataByPage',
      method: 'get'
  },
  //订单中心-订单作废
 'cancel-order': {
      url: '/api/krspace-op-web/order/metting-room/cancel?',
      method: 'post'
  },
}
