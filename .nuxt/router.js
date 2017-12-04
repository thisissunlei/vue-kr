import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0a00302c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _5a966b2e = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _0c8798e2 = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _46d26084 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _f9aa827e = () => import('../pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _56b17d70 = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)
const _14f2699a = () => import('../pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _201ddccf = () => import('../pages/orderCenter/orderManage/heightSearch.vue' /* webpackChunkName: "pages/orderCenter/orderManage/heightSearch" */).then(m => m.default || m)
const _50404784 = () => import('../pages/orderCenter/orderManage/list.vue' /* webpackChunkName: "pages/orderCenter/orderManage/list" */).then(m => m.default || m)
const _484f2df2 = () => import('../pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _2eaec8f2 = () => import('../pages/bill/list/billHighSearch.vue' /* webpackChunkName: "pages/bill/list/billHighSearch" */).then(m => m.default || m)
const _731bd0cc = () => import('../pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _3a479fd9 = () => import('../pages/bill/list/billDetail.vue' /* webpackChunkName: "pages/bill/list/billDetail" */).then(m => m.default || m)
const _ac93ccc0 = () => import('../pages/order/list/orderHighSearch.vue' /* webpackChunkName: "pages/order/list/orderHighSearch" */).then(m => m.default || m)
const _4edb1526 = () => import('../pages/orderCenter/orderManage/create/join.vue' /* webpackChunkName: "pages/orderCenter/orderManage/create/join" */).then(m => m.default || m)
const _323fe302 = () => import('../pages/order/list/orderDetail/_orderId.vue' /* webpackChunkName: "pages/order/list/orderDetail/_orderId" */).then(m => m.default || m)



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
			component: _0a00302c,
			name: "index"
		},
		{
			path: "/order",
			component: _5a966b2e,
			name: "order"
		},
		{
			path: "/bill",
			component: _0c8798e2,
			name: "bill"
		},
		{
			path: "/demo",
			component: _46d26084,
			name: "demo"
		},
		{
			path: "/bill/list",
			component: _f9aa827e,
			name: "bill-list"
		},
		{
			path: "/demo/my",
			component: _56b17d70,
			name: "demo-my"
		},
		{
			path: "/order/list",
			component: _14f2699a,
			name: "order-list"
		},
		{
			path: "/orderCenter/orderManage/heightSearch",
			component: _201ddccf,
			name: "orderCenter-orderManage-heightSearch"
		},
		{
			path: "/orderCenter/orderManage/list",
			component: _50404784,
			name: "orderCenter-orderManage-list"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _484f2df2,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/bill/list/billHighSearch",
			component: _2eaec8f2,
			name: "bill-list-billHighSearch"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _731bd0cc,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/bill/list/billDetail",
			component: _3a479fd9,
			name: "bill-list-billDetail"
		},
		{
			path: "/order/list/orderHighSearch",
			component: _ac93ccc0,
			name: "order-list-orderHighSearch"
		},
		{
			path: "/orderCenter/orderManage/create/join",
			component: _4edb1526,
			name: "orderCenter-orderManage-create-join"
		},
		{
			path: "/order/list/orderDetail/:orderId?",
			component: _323fe302,
			name: "order-list-orderDetail-orderId"
		}
    ],
    fallback: false
  })
}
