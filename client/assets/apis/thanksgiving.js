//公共的api
export default  {
    //添加优惠券
    'orderSeatCouponCheck': {
        url: '/ben/op/order-seat/seat-coupon-check',
        method: 'post'
    },
    //优惠券折扣更新
    'orderSeatCouponFlush': {
        url: '/ben/op/order-seat/seat-coupon-flush',
        method: 'get'
    },
    //优惠券折扣移除
    'orderSeatCouponRemove': {
        url: '/ben/op/order-seat/seat-coupon-removed',
        method: 'post'
    },
    //优惠券折扣核销
    'orderSeatCouponUse': {
        url: '/ben/op/order-seat/seat-coupon-used',
        method: 'post'
    },
    //优惠券再次添加
    'orderSeatCouponAdd': {
        url: '/ben/op/order-seat/seat-coupon-add',
        method: 'post'
    },
    //优惠券判断是入还是增
    'orderSeatCouponIsAdd': {
        url: '/ben/op/order-seat/order-seat-type',
        method: 'post'
    }
  }

