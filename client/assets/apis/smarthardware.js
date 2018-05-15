//公共的api
export default  {
    
    //图库管理--创建图库
    'create-tv-ad-storage': {
        url: '/api/iot-platform/tv-ad-storage/actions/create',
        method: 'post'
    },
    //图库管理--图库列表
    'get-tv-ad-storage-list': {
        url: '/api/iot-platform/tv-ad-storage/actions/list',
        method: 'get'
    },
    //图库管理--图库文件列表
    'get-tv-ad-storage-file-list': {
        url: '/api/iot-platform/tv-ad-storage-file/actions/list',
        method: 'get'
    },
    //图库管理--图片保存
    'save-pic': {
        url: '/api/iot-platform/tv-ad-storage-file/actions/create',
        method: 'post'
    },
    //图库管理--图片删除
    'delete-pic': {
        url: '/api/iot-platform/tv-ad-storage-file/actions/delete',
        method: 'delete'
    },
    //图库管理--社区下拉
    'get-select-items': {
        url: '/api/iot-platform/community/select-items',
        method: 'get'
    },
    //图库管理--获取上传文件令牌
    'get-upload-policy': {
        url: '/api/sso/common/upload-policy',
        method: 'get'
    },
   
  }
  