import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

<<<<<<< HEAD
const _3b854af1 = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _509e0302 = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _231711b3 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _47ae4d5e = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _24049b23 = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _3afca549 = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _86ad78f0 = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _51aeb616 = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _d6919ad2 = () => import('../client/pages/Inventory/publicFn.js' /* webpackChunkName: "pages/Inventory/publicFn" */).then(m => m.default || m)
const _9b287852 = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _27b10fce = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _dd135132 = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _76b96529 = () => import('../client/pages/nav-config/getColumns.js' /* webpackChunkName: "pages/nav-config/getColumns" */).then(m => m.default || m)
const _64b9548b = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _3a95ae33 = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _19a96628 = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _12289ad2 = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _31e199cc = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _2b8ad059 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _1bde1500 = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _4ac44d48 = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _48a03d30 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _3c04dfc6 = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _15560a75 = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _9a72721c = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _6fe02b9e = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _51fe4dc0 = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _41448dc4 = () => import('../client/pages/community/publicFn.js' /* webpackChunkName: "pages/community/publicFn" */).then(m => m.default || m)
const _0a29be96 = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _78bc0c1a = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _f631b41c = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _02f9a2c0 = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _3062c2b0 = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _26f58423 = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _54c38554 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _50a7e726 = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _407870bc = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _e7ab0c36 = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _2bea12f6 = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _6a5c8164 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _d1ddd356 = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _0077f49a = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _5bbf6a98 = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _0d682397 = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _23ac9565 = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _56d11664 = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _95d2c3a0 = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _7abd7e1c = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _5c2535ca = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _ec9e8472 = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _1a63c765 = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _298e7c7d = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _607ce0b1 = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _ef5f7716 = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _7c95ad1e = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _156e4e2c = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _53dda3ca = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _3ff3406d = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _7ebcb79e = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _34ba7120 = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _57700bda = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _0608ad20 = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _74dac8ef = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _3fa64534 = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _63197ac0 = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _157fb4fe = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _534055cc = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _ef4f556c = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _65f326a6 = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _ea62e9fe = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _a863ca62 = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _730c7c38 = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _1a5a33c2 = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _030a217a = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _41216a0a = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _54488a54 = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _23b48964 = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _4ac22fe8 = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _322346d5 = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _1f0c3502 = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _a57d7ff0 = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _feee53b0 = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _027000ca = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _3b64d396 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _61b7bd0a = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _3fb1e30c = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _36bb7821 = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _6b8051c7 = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _c197d428 = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _b28a03f4 = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _0f0d33b7 = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _71fdbb14 = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _7497e0db = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _6c3a80c8 = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _18f25e28 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _26e5e8ee = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _6aade14b = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _c6b76126 = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _595b1586 = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _3008343c = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _00f01c10 = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _4751add0 = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _0f18cd80 = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _7865cd10 = () => import('../client/pages/Inventory/floor-plan/publicFn.js' /* webpackChunkName: "pages/Inventory/floor-plan/publicFn" */).then(m => m.default || m)
const _5e2f0257 = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _86aa800c = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _21f22619 = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _4015b3b2 = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _201a26ae = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _19e7c25f = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _3d18df9a = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _a426e908 = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _52f2daea = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _6e3885b2 = () => import('../client/pages/bill/project-setting/publicFn.js' /* webpackChunkName: "pages/bill/project-setting/publicFn" */).then(m => m.default || m)
const _43adfe6a = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _44a995f8 = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _8c799596 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _61db9b4e = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _9046e378 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _7d617986 = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _62c25ee8 = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _35f169d3 = () => import('../client/pages/customer-manage/manage/editCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/editCustomer" */).then(m => m.default || m)
const _6bec9f26 = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _5d66508a = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _4b218bfa = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _49da345c = () => import('../client/pages/Inventory/Inventory-gantt-chart/publicFn.js' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/publicFn" */).then(m => m.default || m)
const _30fe7df6 = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _28adffab = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _571348cb = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _34e6b8e7 = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _5903cabe = () => import('../client/pages/bill/project-setting/gantt-chart/index.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/index" */).then(m => m.default || m)
const _61ff062a = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _13bf325a = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _f24c2e76 = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _be5cc63c = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _5620e781 = () => import('../client/pages/bill/project-setting/progress-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/index" */).then(m => m.default || m)
const _0d9376ba = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _45ba3d4f = () => import('../client/pages/bill/project-setting/gantt-chart/view-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/view-article" */).then(m => m.default || m)
const _97dc8196 = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _13ab7174 = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _0ac0d640 = () => import('../client/pages/bill/project-setting/project-view/renderData.js' /* webpackChunkName: "pages/bill/project-setting/project-view/renderData" */).then(m => m.default || m)
const _ee58e4f2 = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _14d52966 = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _dcea01dc = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _60a67e37 = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _7eb4977a = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _82cb24a8 = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _9003efa6 = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _15242aba = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _45af8134 = () => import('../client/pages/bill/project-setting/gantt-chart/edit-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/edit-article" */).then(m => m.default || m)
const _2aed26f0 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _48f504d2 = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _1ecc8a48 = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _1628a764 = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _0377af05 = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _76c5ebba = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _5d2b35f0 = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _dc57128c = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _66e428a4 = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _63f63000 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _3b6e50a6 = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _4a68afbf = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _04b57621 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _1a62c5d8 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-day" */).then(m => m.default || m)
const _48bf37bc = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _0d3ad5eb = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _04fed63d = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _0c07db05 = () => import('../client/pages/bill/project-setting/gantt-chart/article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/article" */).then(m => m.default || m)
const _0d3c43ff = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _320e67dd = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _498a4f5a = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _5d2380a8 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-week" */).then(m => m.default || m)
const _5ca19b60 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _a47d9c68 = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _4b8d0e40 = () => import('../client/pages/bill/project-setting/progress-view/list-table.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/list-table" */).then(m => m.default || m)
const _ca07273e = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _e2051c10 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-month" */).then(m => m.default || m)
const _0595c398 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _66503e46 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _61c3981f = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _b8b853fc = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _98d6a018 = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _e7731790 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _60c5690c = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _8464b262 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _41ae19ce = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _ef6b48c4 = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _1ce571cb = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _7c69e3a7 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _379f533c = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _1ab39ec6 = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _052c5ae3 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _1125b640 = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _d6b1b36e = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _b7446018 = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _80722028 = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _c55fc8e4 = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _6408c25c = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _bdfd8ffc = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _f5a48224 = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _3b1b57fd = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _5730b89e = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _260fde21 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _0aa1f57b = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _e62d4040 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _054a21e7 = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _53f1aa72 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _6ac6cd9c = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _21ed9356 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _1db9197d = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _8aba3616 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _37318667 = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _57000d9b = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _589b56d6 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _37f6ef00 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _8b16d652 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _e3cbe04c = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _8bd1cea4 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _e6e9d01e = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _2b3679b4 = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _2c1a4ef0 = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _2e366942 = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _f0f3e4ae = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _4bcbd6b0 = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _de6a5a78 = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _d981a4e0 = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _22fcd1c0 = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _da44bd9e = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _06235215 = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _5d0ad8b1 = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _77d79662 = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _7e165b06 = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _4a0db2da = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _74fe2a97 = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _efac818a = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _a0d8c744 = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)
const _5ab4800e = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
=======
const _0ec325da = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _689462a4 = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _f83adb56 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _7a032422 = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _46ada27e = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _51b0286b = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _6dcde1aa = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _4a97cb13 = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _1eb5da8e = () => import('../client/pages/Inventory/publicFn.js' /* webpackChunkName: "pages/Inventory/publicFn" */).then(m => m.default || m)
const _25adc00e = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _626e6bf0 = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _a33700f6 = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _5d8ef9c7 = () => import('../client/pages/nav-config/getColumns.js' /* webpackChunkName: "pages/nav-config/getColumns" */).then(m => m.default || m)
const _4faf0aae = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _216b42d1 = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _3b778a46 = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _4b29c935 = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _6ef480ea = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _4878f877 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _7b26dfbc = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _1e9370fa = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _7c24fa52 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _78707638 = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _37242e93 = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _0704dd90 = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _4d112680 = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _27fa3344 = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _c59b2434 = () => import('../client/pages/community/publicFn.js' /* webpackChunkName: "pages/community/publicFn" */).then(m => m.default || m)
const _6f73bb38 = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _6c990b3c = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _4db586e0 = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _97c37e3c = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _62b79974 = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _d0e17a76 = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _8be4fc14 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _f7a6b770 = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _5d6698da = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _26140af2 = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _36e2b2d8 = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _5e398086 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _49f2a41a = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _9e2eb856 = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _458f70d2 = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _4a7b0ab5 = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _1e223307 = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _8abad228 = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _11047e52 = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _6e9a7d3e = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _257618e8 = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _7d8dbce9 = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _3c31eb83 = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _4a99cac2 = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _5af27e53 = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _bf72b7d2 = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _15f3400f = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _68b7ff08 = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _5ef26886 = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _7377fd8f = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _3410ca4f = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _0770eb8e = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _183d91b1 = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _40c60942 = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _9c249fe6 = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _1d091808 = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _2a474044 = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _87e39fc0 = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _3ba9d1bc = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _01df2128 = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _2144834b = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _b08699c2 = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _415a501e = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _4e3ca702 = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _698b0041 = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _16714ee5 = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _fbe53ece = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _6fe05374 = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _de785e28 = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _67b05806 = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _db231e1a = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _c039deb8 = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _bdc381ac = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _31ad744a = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _d9d62a8e = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _1e79abb8 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _0c370899 = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _7336a02e = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _d1f2bb82 = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _e5631436 = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _15ec300e = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _4fd517a8 = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _addc6756 = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _8a43bcd0 = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _a1558606 = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _9f9fcf34 = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _88df1874 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _651737e0 = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _d4226b2e = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _5fade6e2 = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _17480cdb = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _c68afd00 = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _90c88ea4 = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _fa34b78c = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _3586805e = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _66b838a4 = () => import('../client/pages/Inventory/floor-plan/publicFn.js' /* webpackChunkName: "pages/Inventory/floor-plan/publicFn" */).then(m => m.default || m)
const _626e7e0e = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _3d819b9c = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _6efebd8a = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _60cc01c9 = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _503e16c7 = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _00bd56fd = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _1e4fcad5 = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _35af709a = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _a23e89e8 = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _1d21d3c5 = () => import('../client/pages/bill/project-setting/publicFn.js' /* webpackChunkName: "pages/bill/project-setting/publicFn" */).then(m => m.default || m)
const _5effdc6d = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _77afcda2 = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _5c614ad3 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _d53f4f20 = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _6e882ae2 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _67ddbe5f = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _b29012f4 = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _926f7516 = () => import('../client/pages/customer-manage/manage/editCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/editCustomer" */).then(m => m.default || m)
const _8432a0e2 = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _5e5512b0 = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _f4422fc8 = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _f2932204 = () => import('../client/pages/Inventory/Inventory-gantt-chart/publicFn.js' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/publicFn" */).then(m => m.default || m)
const _e3e187b2 = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _459c27c9 = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _502bb726 = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _1bbc4d85 = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _0281f882 = () => import('../client/pages/bill/project-setting/gantt-chart/index.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/index" */).then(m => m.default || m)
const _56c36209 = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _57b4c9f8 = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _34f5fb3a = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _48e20df8 = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _9667fdc2 = () => import('../client/pages/bill/project-setting/progress-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/index" */).then(m => m.default || m)
const _d98a457e = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _10b47671 = () => import('../client/pages/bill/project-setting/gantt-chart/view-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/view-article" */).then(m => m.default || m)
const _7f0bf857 = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _e456e7dc = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _b88ca2fc = () => import('../client/pages/bill/project-setting/project-view/renderData.js' /* webpackChunkName: "pages/bill/project-setting/project-view/renderData" */).then(m => m.default || m)
const _430a7aa5 = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _bd083ff0 = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _b9d1c4a0 = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _2565964e = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _038a78d0 = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _4b41244e = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _6ea9a4cb = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _f338fb48 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _10a9ba56 = () => import('../client/pages/bill/project-setting/gantt-chart/edit-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/edit-article" */).then(m => m.default || m)
const _bd95edb4 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _0498bf20 = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _eac3590c = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _5a7054fc = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _7a2fc927 = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _7ed3f741 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _f3adfeb4 = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _cbf6d750 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _332b567c = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _2ef06922 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _8ce12562 = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _5298cd5d = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _237d6d43 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _6986b736 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-day" */).then(m => m.default || m)
const _4d180b78 = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _6c4bf7ee = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _02d26c5f = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _6ab2f4a3 = () => import('../client/pages/bill/project-setting/gantt-chart/article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/article" */).then(m => m.default || m)
const _78303ec6 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _50d65eff = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _d51c751e = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _31b969ca = () => import('../client/pages/bill/project-setting/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-week" */).then(m => m.default || m)
const _e833c124 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _420e1cea = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _16874762 = () => import('../client/pages/bill/project-setting/progress-view/list-table.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/list-table" */).then(m => m.default || m)
const _72430203 = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _38178b9a = () => import('../client/pages/bill/project-setting/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-month" */).then(m => m.default || m)
const _5d804852 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _11cc34ff = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _fc89657e = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _faba75c0 = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _75be62dc = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _638d09da = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _3fc4582a = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _7a6cd4ed = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _8f4e728a = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _67494abc = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _2e719069 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _22f85ec9 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _6bf33b80 = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _d577738a = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _423f4201 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _cbe98b04 = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _9921c52a = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _17ccf612 = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _3336160a = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _251300ac = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _03e54a0c = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _12408fa4 = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _350e2de8 = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _7a4385ca = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _4ff0d780 = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _f68a1082 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _5ee00c19 = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _03a17a02 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _63f53b85 = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _32f09990 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _a089bc84 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _09c53210 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _6a428c9f = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _88fc4cd2 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _de7092f6 = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _9ed3848e = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _aed6ed10 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _1126c2a2 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _073f3575 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _4ab8fa08 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _55d28f68 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _ad0d7fe2 = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _b540d75c = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _55972edc = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _e11972fe = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _7b792c6a = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _66ba9b5c = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _87e8883c = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _82ffd2a4 = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _6ce9663c = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _19ae6962 = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _7cdb6c37 = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _039953d3 = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _5e18cd6d = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _e821e8c2 = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _17d56135 = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _2893768e = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _32564e4e = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _60b83a80 = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)
const _71680330 = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4



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
			path: "/ops",
			component: _0ec325da,
			name: "ops"
		},
		{
			path: "/facility-tags",
<<<<<<< HEAD
			component: _509e0302,
			name: "facility-tags"
		},
		{
			path: "/krmeeting",
			component: _231711b3,
			name: "krmeeting"
		},
		{
			path: "/krmeetingorder",
			component: _47ae4d5e,
			name: "krmeetingorder"
		},
		{
			path: "/nav-config",
			component: _24049b23,
			name: "nav-config"
		},
		{
			path: "/about",
			component: _3afca549,
			name: "about"
		},
		{
			path: "/bill/customerAssets",
			component: _86ad78f0,
			name: "bill-customerAssets"
		},
		{
			path: "/community/publicPage",
			component: _51aeb616,
			name: "community-publicPage"
		},
		{
			path: "/Inventory/publicFn",
			component: _d6919ad2,
			name: "Inventory-publicFn"
		},
		{
			path: "/official-website/calculator",
			component: _9b287852,
			name: "official-website-calculator"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _27b10fce,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/operations-center/from-field",
			component: _dd135132,
			name: "operations-center-from-field"
		},
		{
			path: "/nav-config/getColumns",
			component: _76b96529,
			name: "nav-config-getColumns"
		},
		{
			path: "/bill/project-setting",
			component: _64b9548b,
			name: "bill-project-setting"
		},
		{
			path: "/Inventory/searchForm",
			component: _3a95ae33,
			name: "Inventory-searchForm"
=======
			component: _689462a4,
			name: "facility-tags"
		},
		{
			path: "/krmeeting",
			component: _f83adb56,
			name: "krmeeting"
		},
		{
			path: "/krmeetingorder",
			component: _7a032422,
			name: "krmeetingorder"
		},
		{
			path: "/nav-config",
			component: _46ada27e,
			name: "nav-config"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/about",
			component: _51b0286b,
			name: "about"
		},
		{
<<<<<<< HEAD
			path: "/customer-manage/manage",
			component: _12289ad2,
			name: "customer-manage-manage"
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _31e199cc,
			name: "krmeeting-timeoutMeeting"
		},
		{
			path: "/Inventory/optional-inventory",
			component: _2b8ad059,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _1bde1500,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/app-manage/steward-setting",
			component: _4ac44d48,
			name: "app-manage-steward-setting"
		},
		{
			path: "/Inventory/goods-library",
			component: _48a03d30,
			name: "Inventory-goods-library"
		},
		{
			path: "/nav-config/config-edit",
			component: _3c04dfc6,
			name: "nav-config-config-edit"
		},
		{
			path: "/bill/payment",
			component: _15560a75,
			name: "bill-payment"
=======
			path: "/bill/customerAssets",
			component: _6dcde1aa,
			name: "bill-customerAssets"
		},
		{
			path: "/community/publicPage",
			component: _4a97cb13,
			name: "community-publicPage"
		},
		{
			path: "/Inventory/publicFn",
			component: _1eb5da8e,
			name: "Inventory-publicFn"
		},
		{
			path: "/official-website/calculator",
			component: _25adc00e,
			name: "official-website-calculator"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _626e6bf0,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/operations-center/from-field",
			component: _a33700f6,
			name: "operations-center-from-field"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/nav-config/getColumns",
			component: _5d8ef9c7,
			name: "nav-config-getColumns"
		},
		{
<<<<<<< HEAD
			path: "/demo/wusuling",
			component: _6fe02b9e,
			name: "demo-wusuling"
		},
		{
			path: "/app-manage/notification-manage",
			component: _51fe4dc0,
			name: "app-manage-notification-manage"
		},
		{
			path: "/community/publicFn",
			component: _41448dc4,
			name: "community-publicFn"
=======
			path: "/bill/project-setting",
			component: _4faf0aae,
			name: "bill-project-setting"
		},
		{
			path: "/Inventory/searchForm",
			component: _216b42d1,
			name: "Inventory-searchForm"
		},
		{
			path: "/Inventory/discount",
			component: _3b778a46,
			name: "Inventory-discount"
		},
		{
			path: "/customer-manage/manage",
			component: _4b29c935,
			name: "customer-manage-manage"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _6ef480ea,
			name: "krmeeting-timeoutMeeting"
		},
		{
<<<<<<< HEAD
			path: "/product/meeting",
			component: _78bc0c1a,
			name: "product-meeting"
		},
		{
			path: "/app-manage/icon-manage",
			component: _f631b41c,
			name: "app-manage-icon-manage"
		},
		{
			path: "/operation/community",
			component: _02f9a2c0,
			name: "operation-community"
		},
		{
			path: "/bill/payrecord",
			component: _3062c2b0,
			name: "bill-payrecord"
		},
		{
			path: "/app-manage/coupon",
			component: _26f58423,
			name: "app-manage-coupon"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _54c38554,
			name: "Inventory-daily-inventory"
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _50a7e726,
			name: "Inventory-rented-unpaid"
		},
		{
			path: "/community/attract-investment",
			component: _407870bc,
			name: "community-attract-investment"
		},
		{
			path: "/bill/list",
			component: _e7ab0c36,
			name: "bill-list"
		},
		{
			path: "/order/list",
			component: _2bea12f6,
			name: "order-list"
		},
		{
			path: "/Inventory/statistical",
			component: _6a5c8164,
			name: "Inventory-statistical"
=======
			path: "/Inventory/optional-inventory",
			component: _4878f877,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _7b26dfbc,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/app-manage/steward-setting",
			component: _1e9370fa,
			name: "app-manage-steward-setting"
		},
		{
			path: "/Inventory/goods-library",
			component: _7c24fa52,
			name: "Inventory-goods-library"
		},
		{
			path: "/nav-config/config-edit",
			component: _78707638,
			name: "nav-config-config-edit"
		},
		{
			path: "/bill/payment",
			component: _37242e93,
			name: "bill-payment"
		},
		{
			path: "/member/setting-manager",
			component: _0704dd90,
			name: "member-setting-manager"
		},
		{
			path: "/demo/wusuling",
			component: _4d112680,
			name: "demo-wusuling"
		},
		{
			path: "/app-manage/notification-manage",
			component: _27fa3344,
			name: "app-manage-notification-manage"
		},
		{
			path: "/community/publicFn",
			component: _c59b2434,
			name: "community-publicFn"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/app-manage/member-welfare",
			component: _6f73bb38,
			name: "app-manage-member-welfare"
		},
		{
<<<<<<< HEAD
			path: "/Inventory/over-date",
			component: _0077f49a,
			name: "Inventory-over-date"
		},
		{
			path: "/Inventory/floor-plan",
			component: _5bbf6a98,
			name: "Inventory-floor-plan"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _0d682397,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/krmeetingorder/detail",
			component: _23ac9565,
			name: "krmeetingorder-detail"
		},
		{
			path: "/demo/yihao",
			component: _56d11664,
			name: "demo-yihao"
		},
		{
			path: "/bill/income",
			component: _95d2c3a0,
			name: "bill-income"
		},
		{
			path: "/app-manage/home",
			component: _7abd7e1c,
			name: "app-manage-home"
		},
		{
			path: "/demo/machaoyue",
			component: _5c2535ca,
			name: "demo-machaoyue"
=======
			path: "/product/meeting",
			component: _6c990b3c,
			name: "product-meeting"
		},
		{
			path: "/app-manage/icon-manage",
			component: _4db586e0,
			name: "app-manage-icon-manage"
		},
		{
			path: "/operation/community",
			component: _97c37e3c,
			name: "operation-community"
		},
		{
			path: "/bill/payrecord",
			component: _62b79974,
			name: "bill-payrecord"
		},
		{
			path: "/app-manage/coupon",
			component: _d0e17a76,
			name: "app-manage-coupon"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _8be4fc14,
			name: "Inventory-daily-inventory"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _f7a6b770,
			name: "Inventory-rented-unpaid"
		},
		{
<<<<<<< HEAD
			path: "/Inventory/slotHead",
			component: _1a63c765,
			name: "Inventory-slotHead"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _298e7c7d,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/Inventory/enter-field",
			component: _607ce0b1,
			name: "Inventory-enter-field"
		},
		{
			path: "/product/goods",
			component: _ef5f7716,
			name: "product-goods"
		},
		{
			path: "/app-manage/push-manage",
			component: _7c95ad1e,
			name: "app-manage-push-manage"
		},
		{
			path: "/doorrelationship/map",
			component: _156e4e2c,
			name: "doorrelationship-map"
=======
			path: "/community/attract-investment",
			component: _5d6698da,
			name: "community-attract-investment"
		},
		{
			path: "/bill/list",
			component: _26140af2,
			name: "bill-list"
		},
		{
			path: "/order/list",
			component: _36e2b2d8,
			name: "order-list"
		},
		{
			path: "/Inventory/statistical",
			component: _5e398086,
			name: "Inventory-statistical"
		},
		{
			path: "/Inventory/over-date-unpaid",
			component: _49f2a41a,
			name: "Inventory-over-date-unpaid"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/Inventory/over-date",
			component: _9e2eb856,
			name: "Inventory-over-date"
		},
		{
<<<<<<< HEAD
			path: "/krmeeting/timeInMeeting",
			component: _3ff3406d,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/bill/settlement-list",
			component: _7ebcb79e,
			name: "bill-settlement-list"
		},
		{
			path: "/bill/list/waitList",
			component: _34ba7120,
			name: "bill-list-waitList"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _57700bda,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _0608ad20,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _74dac8ef,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _3fa64534,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/app-manage/home/member",
			component: _63197ac0,
			name: "app-manage-home-member"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _157fb4fe,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _534055cc,
			name: "Inventory-floor-plan-searchForm"
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _ef4f556c,
			name: "operations-center-from-field-HeightSearch"
		},
		{
			path: "/Inventory/over-date/slotHead",
			component: _65f326a6,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _ea62e9fe,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _a863ca62,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/product/meeting/create",
			component: _730c7c38,
			name: "product-meeting-create"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _1a5a33c2,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/bill/payment/unbind",
			component: _030a217a,
			name: "bill-payment-unbind"
		},
		{
			path: "/app-manage/coupon/create",
			component: _41216a0a,
			name: "app-manage-coupon-create"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _54488a54,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _23b48964,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _4ac22fe8,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _322346d5,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _1f0c3502,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/bill/income/addIncome",
			component: _a57d7ff0,
			name: "bill-income-addIncome"
		},
		{
			path: "/bill/payment/refund",
			component: _feee53b0,
			name: "bill-payment-refund"
=======
			path: "/Inventory/floor-plan",
			component: _458f70d2,
			name: "Inventory-floor-plan"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _4a7b0ab5,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/krmeetingorder/detail",
			component: _1e223307,
			name: "krmeetingorder-detail"
		},
		{
			path: "/demo/yihao",
			component: _8abad228,
			name: "demo-yihao"
		},
		{
			path: "/bill/income",
			component: _11047e52,
			name: "bill-income"
		},
		{
			path: "/app-manage/home",
			component: _6e9a7d3e,
			name: "app-manage-home"
		},
		{
			path: "/demo/machaoyue",
			component: _257618e8,
			name: "demo-machaoyue"
		},
		{
			path: "/basic/parameter",
			component: _7d8dbce9,
			name: "basic-parameter"
		},
		{
			path: "/Inventory/slotHead",
			component: _3c31eb83,
			name: "Inventory-slotHead"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _4a99cac2,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/Inventory/enter-field",
			component: _5af27e53,
			name: "Inventory-enter-field"
		},
		{
			path: "/product/goods",
			component: _bf72b7d2,
			name: "product-goods"
		},
		{
			path: "/app-manage/push-manage",
			component: _15f3400f,
			name: "app-manage-push-manage"
		},
		{
			path: "/doorrelationship/map",
			component: _68b7ff08,
			name: "doorrelationship-map"
		},
		{
			path: "/smarthardware/openlog",
			component: _5ef26886,
			name: "smarthardware-openlog"
		},
		{
			path: "/krmeeting/timeInMeeting",
			component: _7377fd8f,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/bill/settlement-list",
			component: _3410ca4f,
			name: "bill-settlement-list"
		},
		{
			path: "/bill/list/waitList",
			component: _0770eb8e,
			name: "bill-list-waitList"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _183d91b1,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _40c60942,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _9c249fe6,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _1d091808,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/app-manage/home/member",
			component: _2a474044,
			name: "app-manage-home-member"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _87e39fc0,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _3ba9d1bc,
			name: "Inventory-floor-plan-searchForm"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _01df2128,
			name: "operations-center-from-field-HeightSearch"
		},
		{
<<<<<<< HEAD
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _3b64d396,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _61b7bd0a,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _3fb1e30c,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/list-table",
			component: _36bb7821,
			name: "Inventory-Inventory-gantt-chart-list-table"
		},
		{
			path: "/bill/list/paidList",
			component: _6b8051c7,
			name: "bill-list-paidList"
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _c197d428,
			name: "app-manage-notification-manage-highSearch"
		},
		{
			path: "/doorrelationship/map/allEquipmentList",
			component: _b28a03f4,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _0f0d33b7,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/order/list/highSearch",
			component: _71fdbb14,
			name: "order-list-highSearch"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _7497e0db,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _6c3a80c8,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _18f25e28,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/official-website/calculator/community",
			component: _26e5e8ee,
			name: "official-website-calculator-community"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _6aade14b,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _c6b76126,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _595b1586,
			name: "Inventory-enter-field-searchForm"
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _3008343c,
			name: "order-center-contract-manage-contract-yard"
		},
		{
			path: "/order-center/order-manage/general-order-manage",
			component: _00f01c10,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _4751add0,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _0f18cd80,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/Inventory/floor-plan/publicFn",
			component: _7865cd10,
			name: "Inventory-floor-plan-publicFn"
		},
		{
			path: "/bill/payment/highSearch",
			component: _5e2f0257,
			name: "bill-payment-highSearch"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _86aa800c,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _21f22619,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _4015b3b2,
			name: "Inventory-goods-library-search-form"
=======
			path: "/Inventory/over-date/slotHead",
			component: _2144834b,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _b08699c2,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _415a501e,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/product/meeting/create",
			component: _4e3ca702,
			name: "product-meeting-create"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _698b0041,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/bill/payment/unbind",
			component: _16714ee5,
			name: "bill-payment-unbind"
		},
		{
			path: "/app-manage/coupon/create",
			component: _fbe53ece,
			name: "app-manage-coupon-create"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _6fe05374,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _de785e28,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _67b05806,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _db231e1a,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _c039deb8,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/bill/income/addIncome",
			component: _bdc381ac,
			name: "bill-income-addIncome"
		},
		{
			path: "/bill/payment/refund",
			component: _31ad744a,
			name: "bill-payment-refund"
		},
		{
			path: "/bill/project-setting/archives-management",
			component: _d9d62a8e,
			name: "bill-project-setting-archives-management"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _1e79abb8,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _0c370899,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _7336a02e,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/list-table",
			component: _d1f2bb82,
			name: "Inventory-Inventory-gantt-chart-list-table"
		},
		{
			path: "/bill/list/paidList",
			component: _e5631436,
			name: "bill-list-paidList"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _15ec300e,
			name: "app-manage-notification-manage-highSearch"
		},
		{
<<<<<<< HEAD
			path: "/basic/parameter/form",
			component: _19e7c25f,
			name: "basic-parameter-form"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _3d18df9a,
			name: "bill-project-setting-project-view"
		},
		{
			path: "/bill/income/highSearch",
			component: _a426e908,
			name: "bill-income-highSearch"
		},
		{
			path: "/bill/payment/bind",
			component: _52f2daea,
			name: "bill-payment-bind"
		},
		{
			path: "/bill/project-setting/publicFn",
			component: _6e3885b2,
			name: "bill-project-setting-publicFn"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _43adfe6a,
			name: "Inventory-over-date-unpaid-slotHead"
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _44a995f8,
			name: "operations-center-from-field-NewPage"
		},
		{
			path: "/app-manage/home/activity",
			component: _8c799596,
			name: "app-manage-home-activity"
		},
		{
			path: "/bill/payment/collection",
			component: _61db9b4e,
			name: "bill-payment-collection"
=======
			path: "/doorrelationship/map/allEquipmentList",
			component: _4fd517a8,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _addc6756,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/order/list/highSearch",
			component: _8a43bcd0,
			name: "order-list-highSearch"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _a1558606,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _9f9fcf34,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _88df1874,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/official-website/calculator/community",
			component: _651737e0,
			name: "official-website-calculator-community"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _d4226b2e,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _5fade6e2,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _17480cdb,
			name: "Inventory-enter-field-searchForm"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _c68afd00,
			name: "order-center-contract-manage-contract-yard"
		},
		{
<<<<<<< HEAD
			path: "/customer-manage/manage/switchCustomer",
			component: _7d617986,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/app-manage/member-welfare/create",
			component: _62c25ee8,
			name: "app-manage-member-welfare-create"
		},
		{
			path: "/customer-manage/manage/editCustomer",
			component: _35f169d3,
			name: "customer-manage-manage-editCustomer"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _6bec9f26,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _5d66508a,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _4b218bfa,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/publicFn",
			component: _49da345c,
			name: "Inventory-Inventory-gantt-chart-publicFn"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _30fe7df6,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _28adffab,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/bill/project-setting/archives",
			component: _571348cb,
			name: "bill-project-setting-archives"
		},
		{
			path: "/bill/list/highSearch",
			component: _34e6b8e7,
			name: "bill-list-highSearch"
		},
		{
			path: "/bill/project-setting/gantt-chart",
			component: _5903cabe,
			name: "bill-project-setting-gantt-chart"
		},
		{
			path: "/product/goods/calendar",
			component: _61ff062a,
			name: "product-goods-calendar"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _13bf325a,
			name: "Inventory-rented-unpaid-slotHead"
=======
			path: "/order-center/order-manage/general-order-manage",
			component: _90c88ea4,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _fa34b78c,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _3586805e,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/Inventory/floor-plan/publicFn",
			component: _66b838a4,
			name: "Inventory-floor-plan-publicFn"
		},
		{
			path: "/bill/payment/highSearch",
			component: _626e7e0e,
			name: "bill-payment-highSearch"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _3d819b9c,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _6efebd8a,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _60cc01c9,
			name: "Inventory-goods-library-search-form"
		},
		{
			path: "/bill/project-setting/archives-detail",
			component: _503e16c7,
			name: "bill-project-setting-archives-detail"
		},
		{
			path: "/basic/parameter/form",
			component: _00bd56fd,
			name: "basic-parameter-form"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _1e4fcad5,
			name: "bill-project-setting-project-view"
		},
		{
			path: "/bill/income/highSearch",
			component: _35af709a,
			name: "bill-income-highSearch"
		},
		{
			path: "/bill/payment/bind",
			component: _a23e89e8,
			name: "bill-payment-bind"
		},
		{
			path: "/bill/project-setting/publicFn",
			component: _1d21d3c5,
			name: "bill-project-setting-publicFn"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _5effdc6d,
			name: "Inventory-over-date-unpaid-slotHead"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _77afcda2,
			name: "operations-center-from-field-NewPage"
		},
		{
<<<<<<< HEAD
			path: "/app-manage/steward-setting/create",
			component: _be5cc63c,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/bill/project-setting/progress-view",
			component: _5620e781,
			name: "bill-project-setting-progress-view"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _0d9376ba,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/bill/project-setting/gantt-chart/view-article",
			component: _45ba3d4f,
			name: "bill-project-setting-gantt-chart-view-article"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _97dc8196,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
			path: "/bill/project-setting/project-detail/add-task",
			component: _13ab7174,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/bill/project-setting/project-view/renderData",
			component: _0ac0d640,
			name: "bill-project-setting-project-view-renderData"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _ee58e4f2,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _14d52966,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _dcea01dc,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _60a67e37,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _7eb4977a,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _82cb24a8,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _9003efa6,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _15242aba,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/bill/project-setting/gantt-chart/edit-article",
			component: _45af8134,
			name: "bill-project-setting-gantt-chart-edit-article"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _2aed26f0,
			name: "doorrelationship-map-groupDetail-equipmentList"
=======
			path: "/app-manage/home/activity",
			component: _5c614ad3,
			name: "app-manage-home-activity"
		},
		{
			path: "/bill/payment/collection",
			component: _d53f4f20,
			name: "bill-payment-collection"
		},
		{
			path: "/order-center/order-manage/station-order-manage",
			component: _6e882ae2,
			name: "order-center-order-manage-station-order-manage"
		},
		{
			path: "/customer-manage/manage/switchCustomer",
			component: _67ddbe5f,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/app-manage/member-welfare/create",
			component: _b29012f4,
			name: "app-manage-member-welfare-create"
		},
		{
			path: "/customer-manage/manage/editCustomer",
			component: _926f7516,
			name: "customer-manage-manage-editCustomer"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _8432a0e2,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _5e5512b0,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _f4422fc8,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/publicFn",
			component: _f2932204,
			name: "Inventory-Inventory-gantt-chart-publicFn"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _e3e187b2,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _459c27c9,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/bill/project-setting/archives",
			component: _502bb726,
			name: "bill-project-setting-archives"
		},
		{
			path: "/bill/list/highSearch",
			component: _1bbc4d85,
			name: "bill-list-highSearch"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/bill/project-setting/gantt-chart",
			component: _0281f882,
			name: "bill-project-setting-gantt-chart"
		},
		{
<<<<<<< HEAD
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _1ecc8a48,
			name: "smart-hardware-map-depot-edit-tvCard"
=======
			path: "/product/goods/calendar",
			component: _56c36209,
			name: "product-goods-calendar"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _57b4c9f8,
			name: "Inventory-rented-unpaid-slotHead"
		},
		{
			path: "/smart-hardware/map-depot/createdMapDepot",
			component: _34f5fb3a,
			name: "smart-hardware-map-depot-createdMapDepot"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/app-manage/steward-setting/create",
			component: _48e20df8,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/bill/project-setting/progress-view",
			component: _9667fdc2,
			name: "bill-project-setting-progress-view"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _d98a457e,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/bill/project-setting/gantt-chart/view-article",
			component: _10b47671,
			name: "bill-project-setting-gantt-chart-view-article"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _7f0bf857,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
<<<<<<< HEAD
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _0377af05,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _76c5ebba,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _5d2b35f0,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _dc57128c,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _66e428a4,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _63f63000,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _3b6e50a6,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _4a68afbf,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _04b57621,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
=======
			path: "/bill/project-setting/project-detail/add-task",
			component: _e456e7dc,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/bill/project-setting/project-view/renderData",
			component: _b88ca2fc,
			name: "bill-project-setting-project-view-renderData"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _430a7aa5,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _bd083ff0,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _b9d1c4a0,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _2565964e,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _038a78d0,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _4b41244e,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _6ea9a4cb,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _f338fb48,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/bill/project-setting/gantt-chart/edit-article",
			component: _10a9ba56,
			name: "bill-project-setting-gantt-chart-edit-article"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _bd95edb4,
			name: "doorrelationship-map-groupDetail-equipmentList"
		},
		{
			path: "/bill/project-setting/project-detail/watch-record",
			component: _0498bf20,
			name: "bill-project-setting-project-detail-watch-record"
		},
		{
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _eac3590c,
			name: "smart-hardware-map-depot-edit-tvCard"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceList",
			component: _5a7054fc,
			name: "order-center-order-manage-station-order-manage-replaceList"
		},
		{
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _7a2fc927,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _7ed3f741,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _f3adfeb4,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _cbf6d750,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _332b567c,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _2ef06922,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _8ce12562,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _5298cd5d,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _237d6d43,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-day",
			component: _6986b736,
			name: "bill-project-setting-gantt-chart-draw-day"
		},
		{
			path: "/order-center/order-manage/station-order-manage/reduceList",
			component: _4d180b78,
			name: "order-center-order-manage-station-order-manage-reduceList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceView",
<<<<<<< HEAD
			component: _0d3ad5eb,
=======
			component: _6c4bf7ee,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-replaceView"
		},
		{
			path: "/bill/project-setting/project-detail/archives-detail",
<<<<<<< HEAD
			component: _04fed63d,
=======
			component: _02d26c5f,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-project-setting-project-detail-archives-detail"
		},
		{
			path: "/bill/project-setting/gantt-chart/article",
<<<<<<< HEAD
			component: _0c07db05,
=======
			component: _6ab2f4a3,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-project-setting-gantt-chart-article"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-day",
<<<<<<< HEAD
			component: _0d3c43ff,
=======
			component: _78303ec6,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-day"
		},
		{
			path: "/order-center/contract-manage/contract-list/list",
<<<<<<< HEAD
			component: _320e67dd,
=======
			component: _50d65eff,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-contract-manage-contract-list-list"
		},
		{
			path: "/order-center/order-manage/general-order-manage/nullify",
<<<<<<< HEAD
			component: _498a4f5a,
=======
			component: _d51c751e,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-general-order-manage-nullify"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-week",
<<<<<<< HEAD
			component: _5d2380a8,
=======
			component: _31b969ca,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-project-setting-gantt-chart-draw-week"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/color-type",
<<<<<<< HEAD
			component: _5ca19b60,
=======
			component: _e833c124,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "Inventory-Inventory-gantt-chart-gantt-chart-color-type"
		},
		{
			path: "/bill/project-setting/project-view/add-archives",
			component: _420e1cea,
			name: "bill-project-setting-project-view-add-archives"
		},
		{
			path: "/bill/project-setting/progress-view/list-table",
<<<<<<< HEAD
			component: _4b8d0e40,
=======
			component: _16874762,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-project-setting-progress-view-list-table"
		},
		{
			path: "/order-center/order-manage/general-order-manage/heightSearch",
<<<<<<< HEAD
			component: _ca07273e,
=======
			component: _72430203,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-general-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-month",
<<<<<<< HEAD
			component: _e2051c10,
=======
			component: _38178b9a,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-project-setting-gantt-chart-draw-month"
		},
		{
			path: "/bill/project-setting/archives/add-archives",
			component: _5d804852,
			name: "bill-project-setting-archives-add-archives"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/stationList",
<<<<<<< HEAD
			component: _66503e46,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _61c3981f,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _b8b853fc,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _98d6a018,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _e7731790,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _60c5690c,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
=======
			component: _11cc34ff,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _fc89657e,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _faba75c0,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _75be62dc,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _638d09da,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _3fc4582a,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			path: "/order-center/order-manage/station-order-manage/create/join",
			component: _7a6cd4ed,
			name: "order-center-order-manage-station-order-manage-create-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduceStation",
			component: _8f4e728a,
			name: "order-center-order-manage-station-order-manage-create-reduceStation"
		},
		{
			path: "/order-center/order-manage/general-order-manage/create/addOrder",
			component: _67494abc,
			name: "order-center-order-manage-general-order-manage-create-addOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduce",
<<<<<<< HEAD
			component: _1ce571cb,
=======
			component: _2e719069,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-create-reduce"
		},
		{
			path: "/app-manage/push-manage/detail/:pushId?",
			component: _22f85ec9,
			name: "app-manage-push-manage-detail-pushId"
		},
		{
			path: "/product/goods/edit/:id?",
<<<<<<< HEAD
			component: _379f533c,
			name: "product-goods-edit-id"
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _1ab39ec6,
			name: "product-meeting-edit-id"
=======
			component: _6bf33b80,
			name: "product-goods-edit-id"
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _d577738a,
			name: "product-meeting-edit-id"
		},
		{
<<<<<<< HEAD
			path: "/bill/list/detail/:billId?",
			component: _1125b640,
=======
			path: "/bill/payment/detail/:paymentId?",
			component: _423f4201,
			name: "bill-payment-detail-paymentId"
		},
		{
			path: "/bill/list/detail/:billId?",
			component: _cbe98b04,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-list-detail-billId"
		},
		{
			path: "/app-manage/notification-manage/detail/:notificationId?",
			component: _9921c52a,
			name: "app-manage-notification-manage-detail-notificationId"
		},
		{
			path: "/app-manage/coupon/edit/:id",
<<<<<<< HEAD
			component: _b7446018,
=======
			component: _17ccf612,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-coupon-edit-id"
		},
		{
			path: "/order/list/detail/:orderId?",
<<<<<<< HEAD
			component: _80722028,
=======
			component: _3336160a,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-list-detail-orderId"
		},
		{
			path: "/bill/income/detail/:id?",
			component: _251300ac,
			name: "bill-income-detail-id"
		},
		{
			path: "/member/setting-manager/detail/:csrId",
<<<<<<< HEAD
			component: _6408c25c,
=======
			component: _03e54a0c,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "member-setting-manager-detail-csrId"
		},
		{
			path: "/app-manage/notification-manage/edit/:notificationId?",
<<<<<<< HEAD
			component: _bdfd8ffc,
=======
			component: _12408fa4,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-notification-manage-edit-notificationId"
		},
		{
			path: "/app-manage/member-welfare/detail/:couponId?",
<<<<<<< HEAD
			component: _f5a48224,
=======
			component: _350e2de8,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-member-welfare-detail-couponId"
		},
		{
			path: "/product/goods/view/:id?",
			component: _7a4385ca,
			name: "product-goods-view-id"
		},
		{
			path: "/app-manage/icon-manage/edit/:iconId?",
<<<<<<< HEAD
			component: _5730b89e,
=======
			component: _4ff0d780,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-icon-manage-edit-iconId"
		},
		{
			path: "/smart-hardware/map-depot/edit/:storageId?",
			component: _f68a1082,
			name: "smart-hardware-map-depot-edit-storageId"
		},
		{
			path: "/app-manage/coupon/detail/:id",
<<<<<<< HEAD
			component: _0aa1f57b,
=======
			component: _5ee00c19,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-coupon-detail-id"
		},
		{
			path: "/app-manage/steward-setting/edit/:manageId?",
<<<<<<< HEAD
			component: _e62d4040,
=======
			component: _03a17a02,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-steward-setting-edit-manageId"
		},
		{
			path: "/app-manage/member-welfare/edit/:couponId?",
<<<<<<< HEAD
			component: _054a21e7,
=======
			component: _63f53b85,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "app-manage-member-welfare-edit-couponId"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/join",
<<<<<<< HEAD
			component: _53f1aa72,
=======
			component: _32f09990,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/replace",
<<<<<<< HEAD
			component: _6ac6cd9c,
=======
			component: _a089bc84,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-replace"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/renewView",
<<<<<<< HEAD
			component: _21ed9356,
=======
			component: _09c53210,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-watchView-renewView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/replaceView",
			component: _6a428c9f,
			name: "order-center-order-manage-station-order-manage-watchView-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/renew",
<<<<<<< HEAD
			component: _8aba3616,
=======
			component: _88fc4cd2,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-renew"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:watchView?/joinView",
<<<<<<< HEAD
			component: _37318667,
=======
			component: _de7092f6,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-general-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/joinView",
			component: _9ed3848e,
			name: "order-center-order-manage-station-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduceStation",
<<<<<<< HEAD
			component: _589b56d6,
=======
			component: _aed6ed10,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-reduceStation"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:orderEdit?/editOrder",
<<<<<<< HEAD
			component: _37f6ef00,
=======
			component: _1126c2a2,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-general-order-manage-orderEdit-editOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/reduceView",
			component: _073f3575,
			name: "order-center-order-manage-station-order-manage-watchView-reduceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/stationList",
<<<<<<< HEAD
			component: _e3cbe04c,
=======
			component: _4ab8fa08,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduce",
<<<<<<< HEAD
			component: _8bd1cea4,
=======
			component: _55d28f68,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "order-center-order-manage-station-order-manage-orderEdit-reduce"
		},
		{
			path: "/bill/customerAssets/:customer/view",
<<<<<<< HEAD
			component: _e6e9d01e,
=======
			component: _ad0d7fe2,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-view"
		},
		{
			path: "/operations-center/from-field/:watchView?/view",
<<<<<<< HEAD
			component: _2b3679b4,
=======
			component: _b540d75c,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "operations-center-from-field-watchView-view"
		},
		{
			path: "/bill/customerAssets/:customer/changeBalance",
			component: _55972edc,
			name: "bill-customerAssets-customer-changeBalance"
		},
		{
			path: "/bill/customerAssets/:customer/refunds",
<<<<<<< HEAD
			component: _2e366942,
=======
			component: _e11972fe,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-refunds"
		},
		{
			path: "/bill/settlement-list/:billId?/edit",
<<<<<<< HEAD
			component: _f0f3e4ae,
=======
			component: _7b792c6a,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-settlement-list-billId-edit"
		},
		{
			path: "/bill/settlement-list/:billId?/detail",
<<<<<<< HEAD
			component: _4bcbd6b0,
=======
			component: _66ba9b5c,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-settlement-list-billId-detail"
		},
		{
			path: "/bill/customerAssets/:customer/joinInfo",
<<<<<<< HEAD
			component: _de6a5a78,
=======
			component: _87e8883c,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-joinInfo"
		},
		{
			path: "/bill/customerAssets/:customer/spending",
			component: _82ffd2a4,
			name: "bill-customerAssets-customer-spending"
		},
		{
			path: "/bill/customerAssets/:customer/balance",
<<<<<<< HEAD
			component: _22fcd1c0,
=======
			component: _6ce9663c,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-balance"
		},
		{
			path: "/smart-hardware/space-manage/:sub?/son-space",
<<<<<<< HEAD
			component: _da44bd9e,
=======
			component: _19ae6962,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "smart-hardware-space-manage-sub-son-space"
		},
		{
			path: "/bill/customerAssets/:customer/basic",
<<<<<<< HEAD
			component: _06235215,
=======
			component: _7cdb6c37,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-basic"
		},
		{
			path: "/bill/customerAssets/:customer/waiting",
			component: _039953d3,
			name: "bill-customerAssets-customer-waiting"
		},
		{
			path: "/bill/customerAssets/:customer/assets",
<<<<<<< HEAD
			component: _77d79662,
=======
			component: _5e18cd6d,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-assets"
		},
		{
			path: "/bill/customerAssets/:customer/changeCommunity",
<<<<<<< HEAD
			component: _7e165b06,
=======
			component: _e821e8c2,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-changeCommunity"
		},
		{
			path: "/bill/customerAssets/:customer/giveMoney",
<<<<<<< HEAD
			component: _4a0db2da,
=======
			component: _17d56135,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-giveMoney"
		},
		{
			path: "/bill/customerAssets/:customer/basic/annex",
			component: _2893768e,
			name: "bill-customerAssets-customer-basic-annex"
		},
		{
			path: "/bill/customerAssets/:customer/basic/info",
<<<<<<< HEAD
			component: _efac818a,
=======
			component: _32564e4e,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "bill-customerAssets-customer-basic-info"
		},
		{
			path: "/publicPage/:view?/pdf-view",
			component: _60b83a80,
			name: "publicPage-view-pdf-view"
		},
		{
			path: "/",
<<<<<<< HEAD
			component: _5ab4800e,
=======
			component: _71680330,
>>>>>>> 1a22363c9ac6d3f78b90d986948e91b63adf8cc4
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
