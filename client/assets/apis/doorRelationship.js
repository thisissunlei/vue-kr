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
    
  }
  