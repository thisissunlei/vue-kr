import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _31457df0 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _34da7960 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _64cb4284 = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _fa3355f2 = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _d0092c0e = () => import('../pages/order/list.vue' /* webpackChunkName: "pages/order/list" */).then(m => m.default || m)
const _5d3458dc = () => import('../pages/bill/list.vue' /* webpackChunkName: "pages/bill/list" */).then(m => m.default || m)
const _bdc5f1e4 = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)



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
			path: "/demo",
			component: _34da7960,
			name: "demo"
		},
		{
			path: "/bill",
			component: _64cb4284,
			name: "bill"
		},
		{
			path: "/order",
			component: _fa3355f2,
			name: "order"
		},
		{
			path: "/order/list",
			component: _d0092c0e,
			name: "order-list"
		},
		{
			path: "/bill/list",
			component: _5d3458dc,
			name: "bill-list"
		},
		{
			path: "/demo/my",
			component: _bdc5f1e4,
			name: "demo-my"
		}
    ],
    fallback: false
  })
}
