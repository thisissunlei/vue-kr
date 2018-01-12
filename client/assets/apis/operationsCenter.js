//公共的api
export default {
    'get-from-field-list': {
        url: '/benDi/csr-with-drawal/list',
        method: 'get'
    },
    'get-from-field-view': {
        url: '/benDi/csr-with-drawal/show',
        method: 'get'
    },
    'get-from-field-status': {
        url: '/benDi/csr-with-drawal/status',
        method: 'get'
    },
    //作废
    'post-from-field-invalid': {
        url: '/benDi/csr-with-drawal/updateStatus',
        method: 'get'
    },
    //获取客户
    'get-from-field-customer': {
        url: '/benDi/csr-with-drawal/getCsrNames',
        method: 'get'
    },
    //是否可以创建离场
    'post-create-from-field': {
        url: '/benDi/csr-with-drawal/judge',
        method: 'post'
    },
    //新建撤场
    'post-from-field-newpage': {
        url: '/benDi/csr-with-drawal/save',
        method: 'post'
    }
   
}
