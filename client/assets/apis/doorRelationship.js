//公共的api
export default  {
    //每日库存列表+查询
    'newCreateDoorRelationship': {
        url: '/api/iot-platform/door-set/actions/create',
        method: 'post'
    },
    'getDoorRelationshipData': {
        url: '/api/iot-platform/door-set/relation-map',
        method: 'get'
    },
    'editDoorRelationshipData': {
        url: '/api/iot-platform/door-set/actions/edit',
        method: 'post'
    },
    'newCreateDoorGroupConnect': {
        url: '/api/iot-platform/door-set/actions/create-relation',
        method: 'post'
    },
    'deleteLinkConnect': {
        url: '/api/iot-platform/door-set/actions/delete-relation',
        method: 'delete'
    },
    'deleteDoorGroupInRelation':{
        url : '/api/iot-platform/door-set/actions/delete',
        method: 'delete'
    },
    'getFloorOptions':{
        url :'/api/krspace-finance-web/cmt/community/select/use/floor',
        method: 'get'
    }
    
  }
  