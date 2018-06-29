//客户资金转移申请接口

export default {
    //获取资金申请处理状态枚举
    "get-apply-state-enum": {
        url: "/api/krspace-sso-web/sys/enmu",
        method: "get"
    },
    //获取操作类型
    "get-operate-type-enum": {
        url: "/api/krspace-sso-web/sys/enmu",
        method: "get"
    },
    //获取操作款项
    "get-money-type-enum": {
        url: "/api/krspace-sso-web/sys/enmu",
        method: "get"
    },
    //获取申请列表
    "get-apply-list": {
        url: "/mockdata/98/transfer/list?",
        method: "get"
    },
    // //获取申请列表
    // "get-apply-list": {
    //     url: "/ben/transfer/list?",
    //     method: "get"
    // },
    //获取操作款项
    "get-cmts-customerid": {
        url: "/ben/transfer/getTransferCmts?",
        method: "get"
    },
    //获取最大转移金额
    "get-max-amount": {
        url: "/api/krspace-pay-web/transfer/max-amount-fee",
        method: "get"
    },
    //获取申请详情
    'get-apply-info-id':{
        url: "/ben/transfer/view",
        method: "get"
    },
    //提交申请
    'get-apply-submit':{
        url: "/ben/transfer/submit",
        method: "get"
    }
};
