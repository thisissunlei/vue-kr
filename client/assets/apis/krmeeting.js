



export default {
    //会议状况
    'getkrmeetingstatus': {
        url: '/api/op/krmting/roomOrder/listStatus',
        method: 'get'
    },
    'get-kr-meeting-list': {
        url: '/api/op/krmting/roomOrder/list',
        method: 'get'
    },
    'get-kr-meeting-detail': {
        url: '/api/op/krmting/roomOrder/detail',
        method: 'get'
    },
    // 散座商品详情页
    'get-kr-meeting-seat-detail': {
        url: '/api/krseat/inventory/view',
        method: 'get'
    },
} 