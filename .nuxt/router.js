import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _a9f3b728 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _22396ea0 = () => import('../pages/orderManage/index.vue' /* webpackChunkName: "pages/orderManage/index" */).then(m => m.default || m)
const _fe27d708 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _9e4644c0 = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _8defc52a = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _1e1aa172 = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)
const _37e5f5d6 = () => import('../pages/order/list.vue' /* webpackChunkName: "pages/order/list" */).then(m => m.default || m)
const _668f6ad0 = () => import('../pages/order/orderDetail.vue' /* webpackChunkName: "pages/order/orderDetail" */).then(m => m.default || m)
const _cc8e7e7a = () => import('../pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _57c2f10a = () => import('../pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _1355e930 = () => import('../pages/bill/list/billHighSearch.vue' /* webpackChunkName: "pages/bill/list/billHighSearch" */).then(m => m.default || m)
const _2cf64e30 = () => import('../pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)



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
			component: _a9f3b728,
			name: "index"
		},
		{
			path: "/orderManage",
			component: _22396ea0,
			name: "orderManage"
		},
		{
			path: "/demo",
			component: _fe27d708,
			name: "demo"
		},
		{
			path: "/bill",
			component: _9e4644c0,
			name: "bill"
		},
		{
			path: "/order",
			component: _8defc52a,
			name: "order"
		},
		{
			path: "/demo/my",
			component: _1e1aa172,
			name: "demo-my"
		},
		{
			path: "/order/list",
			component: _37e5f5d6,
			name: "order-list"
		},
		{
			path: "/order/orderDetail",
			component: _668f6ad0,
			name: "order-orderDetail"
		},
		{
			path: "/bill/list",
			component: _cc8e7e7a,
			name: "bill-list"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _57c2f10a,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/bill/list/billHighSearch",
			component: _1355e930,
			name: "bill-list-billHighSearch"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _2cf64e30,
			name: "bill-list-settleAccounts"
		}
    ],
    fallback: false
  })
}
