import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0dc6096c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _79596108 = () => import('../pages/demo/index.vue' /* webpackChunkName: "pages/demo/index" */).then(m => m.default || m)
const _1977cec0 = () => import('../pages/bill/index.vue' /* webpackChunkName: "pages/bill/index" */).then(m => m.default || m)
const _78ef7b2a = () => import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */).then(m => m.default || m)
const _26744015 = () => import('../pages/order/list.vue' /* webpackChunkName: "pages/order/list" */).then(m => m.default || m)
const _177a4f40 = () => import('../pages/bill/list.vue' /* webpackChunkName: "pages/bill/list" */).then(m => m.default || m)
const _5f15731c = () => import('../pages/demo/my.vue' /* webpackChunkName: "pages/demo/my" */).then(m => m.default || m)



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
			component: _0dc6096c,
			name: "index"
		},
		{
			path: "/demo",
			component: _79596108,
			name: "demo"
		},
		{
			path: "/bill",
			component: _1977cec0,
			name: "bill"
		},
		{
			path: "/order",
			component: _78ef7b2a,
			name: "order"
		},
		{
			path: "/order/list",
			component: _26744015,
			name: "order-list"
		},
		{
			path: "/bill/list",
			component: _177a4f40,
			name: "bill-list"
		},
		{
			path: "/demo/my",
			component: _5f15731c,
			name: "demo-my"
		}
    ],
    fallback: false
  })
}
