import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _668c50b9 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _bc72df62 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _9905c810 = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _5c914d1a = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _3d41b0d0 = () => import('../pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _9c752936 = () => import('../pages/order/orderDetail.vue' /* webpackChunkName: "pages/order/orderDetail" */).then(m => m.default || m)
const _10c6ee7f = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)
const _04e780e8 = () => import('../pages/order/list.vue' /* webpackChunkName: "pages/order/list" */).then(m => m.default || m)
const _44361cc3 = () => import('../pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _2a95b7c3 = () => import('../pages/bill/list/billHighSearch.vue' /* webpackChunkName: "pages/bill/list/billHighSearch" */).then(m => m.default || m)
const _6f02bf9d = () => import('../pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)



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
			component: _668c50b9,
			name: "index"
		},
		{
			path: "/demo",
			component: _bc72df62,
			name: "demo"
		},
		{
			path: "/order",
			component: _9905c810,
			name: "order"
		},
		{
			path: "/bill",
			component: _5c914d1a,
			name: "bill"
		},
		{
			path: "/bill/list",
			component: _3d41b0d0,
			name: "bill-list"
		},
		{
			path: "/order/orderDetail",
			component: _9c752936,
			name: "order-orderDetail"
		},
		{
			path: "/demo/my",
			component: _10c6ee7f,
			name: "demo-my"
		},
		{
			path: "/order/list",
			component: _04e780e8,
			name: "order-list"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _44361cc3,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/bill/list/billHighSearch",
			component: _2a95b7c3,
			name: "bill-list-billHighSearch"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _6f02bf9d,
			name: "bill-list-antiSettlement"
		}
    ],
    fallback: false
  })
}
