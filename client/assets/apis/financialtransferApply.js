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
        // url: "/ben/transfer/list?",
        url: "/api/krspace-sso-web/transfer/list?",
        method: "get"
    },
    // //获取申请列表
    // "get-apply-list": {
    //     url: "/ben/transfer/list?",
    //     method: "get"
    // },
    //获取操作款项
    "get-cmts-customerid": {
        // url: "/ben/transfer/getTransferCmts?",
        url: "/api/krspace-sso-web/transfer/getTransferCmts?",
        method: "get"
    },
    //获取最大转移金额
    "get-max-amount": {
        // url: "/api/krspace-pay-web/transfer/max-amount-fee",
        url: "/api/krspace-sso-web/transfer/max-amount-fee",
        method: "get"
    },
    //获取申请详情
    "get-apply-info-id": {
        // url: "/ben/transfer/view",
        url: "/api/krspace-sso-web/transfer/view",
        method: "get"
    },
    //提交申请
    "get-apply-submit": {
        // url: "/ben/transfer/submit",
        url: "/api/krspace-sso-web/transfer/submit",
        method: "post"
    },
    //同意申请
    "get-apply-approve": {
        // url: "/ben/transfer/agree-apply",
        url: "/api/krspace-sso-web/transfer/agree-apply",
        method: "post"
    },
    //退回申请 /api/krspace-pay-web/transfer/refund-apply
    "get-apply-reject": {
        // url: "/ben/transfer/refund-apply",
        url: "/api/krspace-sso-web/transfer/refund-apply",
        method: "post"
    },
    //删除申请
    "get-apply-delete": {
        // url: "/ben/transfer/delete",
        url: "/api/krspace-sso-web/transfer/delete",
        method: "delete"
    }
};
