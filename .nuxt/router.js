import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _31457df0 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _fa3355f2 = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _64cb4284 = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _34da7960 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _bdc5f1e4 = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)
const _29c54598 = () => import('../pages/order/orderDetail.vue' /* webpackChunkName: "pages/order/orderDetail" */).then(m => m.default || m)
const _5439ca5f = () => import('../pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _d0092c0e = () => import('../pages/order/list.vue' /* webpackChunkName: "pages/order/list" */).then(m => m.default || m)
const _25505414 = () => import('../pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _0bafef14 = () => import('../pages/bill/list/billHighSearch.vue' /* webpackChunkName: "pages/bill/list/billHighSearch" */).then(m => m.default || m)
const _501cf6ee = () => import('../pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _e4f5b20a = () => import('../pages/bill/list/billDetail.vue' /* webpackChunkName: "pages/bill/list/billDetail" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _31457df0,
			name: "index"
		},
		{
			path: "/order",
			component: _fa3355f2,
			name: "order"
		},
		{
			path: "/bill",
			component: _64cb4284,
			name: "bill"
		},
		{
			path: "/demo",
			component: _34da7960,
			name: "demo"
		},
		{
			path: "/demo/my",
			component: _bdc5f1e4,
			name: "demo-my"
		},
		{
			path: "/order/orderDetail",
			component: _29c54598,
			name: "order-orderDetail"
		},
		{
			path: "/bill/list",
			component: _5439ca5f,
			name: "bill-list"
		},
		{
			path: "/order/list",
			component: _d0092c0e,
			name: "order-list"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _25505414,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/bill/list/billHighSearch",
			component: _0bafef14,
			name: "bill-list-billHighSearch"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _501cf6ee,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/bill/list/billDetail",
			component: _e4f5b20a,
			name: "bill-list-billDetail"
		}
    ],
    fallback: false
  })
}
