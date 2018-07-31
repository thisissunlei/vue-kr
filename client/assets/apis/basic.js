//公共的api
export default {
    //参数配置列表
    getParamList: {
        url: "/api/krspace-sso-web/sys-param/list?",
        method: "get"
    },
    //保存参数配置信息
    saveParamData: {
        url: "/api/krspace-sso-web/sys-param/save-edit?",
        method: "post"
    },
    //获取参数配置编辑信息
    getParamData: {
        url: "/api/krspace-sso-web/sys-param/show?",
        method: "get"
    },
    // 获取枚举类接口(参数名：enmuKey)
    "get-enmu-list": {
        url: "/api/krspace-sso-web/sys/enmu?",
        method: "get"
    },
    // 优惠列表接口
    "get-sale-list": {
        url: "/api/krspace-op-web/cmt-sale-tactics/list",
        method: "get"
    },
    // 优惠列表接口
    "get-discont-list": {
        // url: "/api/krspace-op-web/cmt/discount/list",
        url: "/ben/cmt/discount/list",
        method: "get"
    },
    //添加折扣配置
    "post-add-discount": {
        // url: "/api/krspace-op-web/cmt/discount/add",
        url: "/ben/cmt/discount/add",
        method: "post"
    },
    //获取级别权限类型
    "get-discount-rights": {
        // url: "/ben/api/krspace-op-web/cmt/discount/getRight",
        url: "/ben/cmt/discount/getRight",
        method: "get"
    },
    "put-stop-discount": {
        // url: "/ben/api/krspace-op-web/cmt/discount/getRight",
        url: "/ben/cmt/discount/stop",
        method: "put"
    }
};
