//商品产品的api
export default  {
  
    //会议室商品列表接口
    'get-krmting-room-list': {
        url: '/api/krspace-finance-web/krmting/room/list',
        method: 'get'
    },
    //会议室商品--新建、编辑
    'add-krmting-room': {
        url: '/api/krspace-finance-web/krmting/room/add',
        method: 'get'
    },
    //会议室商品--删除
    'delete-krmting-room': {
        url: '/api/krspace-finance-web/krmting/room/delete',
        method: 'post'
    },
    //会议室商品--楼层
    'get-krmting-room-floor-list': {
        url: '/api/krspace-finance-web/krmting/room/floor/list',
        method: 'get'
    },
    //会议室商品--会议室设备
    'get-krmting-room-device-list': {
        url: '/api/krspace-finance-web/krmting/room/device/list',
        method: 'get'
    },
    //会议室商品--会议室详情
    'get-krmting-room-detail': {
        url: '/api/krspace-finance-web/krmting/room/detail',
        method: 'get'
    },
    //社区商品配置--社区列表
    'get-krmting-mobile-community-list': {
        url: '/api/krspace-op-web/krmting/mobile/community/list',
        method: 'get'
    },
    //社区商品配置--社区详情
    'get-krmting-mobile-community-detail': {
        url: '/api/krspace-op-web/krmting/mobile/community/detail',
        method: 'get'
    },
    //社区商品配置--编辑社区
    'edit-krmting-mobile-community': {
        url: '/api/krspace-op-web/krmting/mobile/community/edit',
        method: 'post'
    },
    
  }
  