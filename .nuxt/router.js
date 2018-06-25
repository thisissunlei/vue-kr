import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6e51ac03 = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _b7dd1734 = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _5fdc57e4 = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _4e99d13e = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _014ce130 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _27509e37 = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _486cb688 = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _5011683e = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _1167df5a = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _0ff31ce0 = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _5ed52359 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _5ab52b7a = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _0c4b1bf2 = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _4f06f75d = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _27862cf5 = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _0abedada = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _1bec324b = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _d9a839fc = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _c1343a06 = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _49bf2b9a = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _3afeb5b0 = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _41bc76f8 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _686cf79a = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _40650650 = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _f2e11234 = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _7ba8e32b = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _7d9079f9 = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _7e295fbc = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _3c6dc41b = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _84c5cd80 = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _82514912 = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _34661a25 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _31212bda = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _6685f909 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _4cdeb894 = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _0129dc47 = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _6a202815 = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _ea9efab6 = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _2127565d = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _6f362011 = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _46f799df = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _5df559dc = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _17e13632 = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _1a0e96c0 = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _450d4b92 = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _07b87760 = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _3a36799e = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _cb44357c = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _5f02dfaa = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _3578f35c = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _2bb91d62 = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _34937b96 = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _5d601e4c = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _2971ad75 = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _52bf071e = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _6d34ae0f = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _4bfff420 = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _19ae4e0c = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _0a580604 = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _3a4b3545 = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _0495d12a = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _bba267ca = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _55a4eb10 = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _4922fbf2 = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _d0d81078 = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _6345759d = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _699c1996 = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _c51edc00 = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _034db7da = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _18d9e974 = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _48882827 = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _f52d4a2a = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _3c13fb94 = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _00f35f7e = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _2d9a3e0e = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _7b197c13 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _2fbb6e62 = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _6611499c = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _22e0da0e = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _5ccd2a82 = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _288cbf5f = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _539a9a66 = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _01d08a9a = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _159d114c = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _0755ca6f = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _0c430fb0 = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _2f15a93e = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _82fb5b3c = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _1407a40b = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _2bd07b7b = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _c1869148 = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _1f8c3b50 = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _34878452 = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _47761854 = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _79751cca = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _6256f458 = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _bc8c3c06 = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _9e05f0d6 = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _3cd9014c = () => import('../client/pages/bill/project-setting/gantt-chart/index.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/index" */).then(m => m.default || m)
const _da72f89a = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _2b77c001 = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _19888dca = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _1bea5320 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _4da17843 = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _b7e6eb8a = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _1104e000 = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _7bf2512f = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _ef2ba73c = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _13d43322 = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _69469d18 = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _3a8624a2 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _57ee7014 = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _43587392 = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _5c19e326 = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _b9150230 = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _30017de6 = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _ed633c5a = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _0515d0b0 = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _5b84c096 = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _890c772a = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _165ada00 = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _61155e8f = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _2127ccf3 = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _419668e6 = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _1706fb0c = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _4bc5f757 = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _328e00e3 = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _3e657f2c = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _38b7c922 = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _504cd939 = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _57466128 = () => import('../client/pages/bill/project-setting/progress-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/index" */).then(m => m.default || m)
const _7ee92842 = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _1a445047 = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _1569cbf3 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _3c0fb289 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-day" */).then(m => m.default || m)
const _8b2854b6 = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _e76203a6 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-month" */).then(m => m.default || m)
const _60fdee04 = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _25408a8f = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _791861b2 = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _ad55e3ca = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _1c52b916 = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _35e10416 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _3aac6135 = () => import('../client/pages/bill/project-setting/progress-view/list-table.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/list-table" */).then(m => m.default || m)
const _34ced429 = () => import('../client/pages/bill/project-setting/gantt-chart/edit-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/edit-article" */).then(m => m.default || m)
const _5054b1ef = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _6ee0ee96 = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _93a54c3c = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _47d29142 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _e55daeb6 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _8e398a64 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _15b33a28 = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _4fb9ef97 = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _9f604e52 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-week" */).then(m => m.default || m)
const _eb787a20 = () => import('../client/pages/bill/project-setting/gantt-chart/article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/article" */).then(m => m.default || m)
const _fb3bd58e = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/index" */).then(m => m.default || m)
const _b99ddbac = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _34d99044 = () => import('../client/pages/bill/project-setting/gantt-chart/view-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/view-article" */).then(m => m.default || m)
const _6339f5d2 = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _381ca36a = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _bac93262 = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _4cb8c47a = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _80bd9c1a = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _bae78512 = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _3a4330d0 = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _45e561aa = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _74153a0a = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _372bd1bd = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _7d19be32 = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _3a36c37d = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _531582f5 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _531a5261 = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _602af66d = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _e4dc8292 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _74dd9394 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _5c40745f = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _6634ec0c = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _0196704e = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _1a6448f2 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/list.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/list" */).then(m => m.default || m)
const _037d2752 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _5f1fa8a6 = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _95d29d6e = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _62df3dd8 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _efdc08c8 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _e4995072 = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _b23bb434 = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _dbbbc6e4 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _f8f3ec5c = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _167849d3 = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _479c8192 = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _599442cb = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _19351f1f = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _54cd4e88 = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _37ebb839 = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _53ab1556 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _745a9784 = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _349e3f17 = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _549216b0 = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _7ecbf30d = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _b76873e8 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _640f5819 = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _35b6a0ce = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _69c5d862 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _276144aa = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _5a646c35 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _60ed318b = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _5abc1d72 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _fe83ffc6 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _15f8d474 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _445b108b = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _bd27d7de = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _3492837c = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _5595e2dc = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _0bb48d22 = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _40220c1c = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _327a681e = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _9fd7b51c = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _71bf3a5c = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _296bdb25 = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _4fd317c2 = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _4f64678a = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _68b2f0a6 = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _c609d570 = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _16e63958 = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _24826b8c = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _2ea4e9b5 = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _06cbd78a = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _0b1367e5 = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _83817fe8 = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _0665a726 = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _db5f885a = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)



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
			component: _6e51ac03,
			name: "index"
		},
		{
			path: "/ops",
			component: _b7dd1734,
			name: "ops"
		},
		{
			path: "/nav-config",
			component: _5fdc57e4,
			name: "nav-config"
		},
		{
			path: "/about",
			component: _4e99d13e,
			name: "about"
		},
		{
			path: "/krmeeting",
			component: _014ce130,
			name: "krmeeting"
		},
		{
			path: "/facility-tags",
			component: _27509e37,
			name: "facility-tags"
		},
		{
			path: "/krmeetingorder",
			component: _486cb688,
			name: "krmeetingorder"
		},
		{
			path: "/order/list",
			component: _5011683e,
			name: "order-list"
		},
		{
			path: "/Inventory/discount",
			component: _1167df5a,
			name: "Inventory-discount"
		},
		{
			path: "/Inventory/slotHead",
			component: _0ff31ce0,
			name: "Inventory-slotHead"
		},
		{
			path: "/Inventory/statistical",
			component: _5ed52359,
			name: "Inventory-statistical"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _5ab52b7a,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _0c4b1bf2,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/member/setting-manager",
			component: _4f06f75d,
			name: "member-setting-manager"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _27862cf5,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/demo/wusuling",
			component: _0abedada,
			name: "demo-wusuling"
		},
		{
			path: "/app-manage/member-welfare",
			component: _1bec324b,
			name: "app-manage-member-welfare"
		},
		{
			path: "/customer-manage/manage",
			component: _d9a839fc,
			name: "customer-manage-manage"
		},
		{
			path: "/bill/customerAssets",
			component: _c1343a06,
			name: "bill-customerAssets"
		},
		{
			path: "/krmeetingorder/detail",
			component: _49bf2b9a,
			name: "krmeetingorder-detail"
		},
		{
			path: "/Inventory/over-date",
			component: _3afeb5b0,
			name: "Inventory-over-date"
		},
		{
			path: "/Inventory/optional-inventory",
			component: _41bc76f8,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/bill/list",
			component: _686cf79a,
			name: "bill-list"
		},
		{
			path: "/app-manage/coupon",
			component: _40650650,
			name: "app-manage-coupon"
		},
		{
			path: "/Inventory/enter-field",
			component: _f2e11234,
			name: "Inventory-enter-field"
		},
		{
			path: "/app-manage/notification-manage",
			component: _7ba8e32b,
			name: "app-manage-notification-manage"
		},
		{
			path: "/demo/yihao",
			component: _7d9079f9,
			name: "demo-yihao"
		},
		{
			path: "/basic/parameter",
			component: _7e295fbc,
			name: "basic-parameter"
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _3c6dc41b,
			name: "Inventory-rented-unpaid"
		},
		{
			path: "/Inventory/over-date-unpaid",
			component: _84c5cd80,
			name: "Inventory-over-date-unpaid"
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _82514912,
			name: "krmeeting-timeoutMeeting"
		},
		{
			path: "/Inventory/goods-library",
			component: _34661a25,
			name: "Inventory-goods-library"
		},
		{
			path: "/bill/payrecord",
			component: _31212bda,
			name: "bill-payrecord"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _6685f909,
			name: "Inventory-daily-inventory"
		},
		{
			path: "/bill/project-setting",
			component: _4cdeb894,
			name: "bill-project-setting"
		},
		{
			path: "/app-manage/steward-setting",
			component: _0129dc47,
			name: "app-manage-steward-setting"
		},
		{
			path: "/doorrelationship/map",
			component: _6a202815,
			name: "doorrelationship-map"
		},
		{
			path: "/bill/income",
			component: _ea9efab6,
			name: "bill-income"
		},
		{
			path: "/app-manage/icon-manage",
			component: _2127565d,
			name: "app-manage-icon-manage"
		},
		{
			path: "/app-manage/home",
			component: _6f362011,
			name: "app-manage-home"
		},
		{
			path: "/Inventory/floor-plan",
			component: _46f799df,
			name: "Inventory-floor-plan"
		},
		{
			path: "/app-manage/push-manage",
			component: _5df559dc,
			name: "app-manage-push-manage"
		},
		{
			path: "/community/attract-investment",
			component: _17e13632,
			name: "community-attract-investment"
		},
		{
			path: "/bill/payment",
			component: _1a0e96c0,
			name: "bill-payment"
		},
		{
			path: "/operations-center/from-field",
			component: _450d4b92,
			name: "operations-center-from-field"
		},
		{
			path: "/smarthardware/openlog",
			component: _07b87760,
			name: "smarthardware-openlog"
		},
		{
			path: "/Inventory/searchForm",
			component: _3a36799e,
			name: "Inventory-searchForm"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _cb44357c,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/product/goods",
			component: _5f02dfaa,
			name: "product-goods"
		},
		{
			path: "/bill/settlement-list",
			component: _3578f35c,
			name: "bill-settlement-list"
		},
		{
			path: "/krmeeting/timeInMeeting",
			component: _2bb91d62,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/operation/community",
			component: _34937b96,
			name: "operation-community"
		},
		{
			path: "/official-website/calculator",
			component: _5d601e4c,
			name: "official-website-calculator"
		},
		{
			path: "/demo/machaoyue",
			component: _2971ad75,
			name: "demo-machaoyue"
		},
		{
			path: "/nav-config/config-edit",
			component: _52bf071e,
			name: "nav-config-config-edit"
		},
		{
			path: "/product/meeting",
			component: _6d34ae0f,
			name: "product-meeting"
		},
		{
			path: "/community/publicPage",
			component: _4bfff420,
			name: "community-publicPage"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _19ae4e0c,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _0a580604,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _3a4b3545,
			name: "Inventory-rented-unpaid-slotHead"
		},
		{
			path: "/app-manage/home/member",
			component: _0495d12a,
			name: "app-manage-home-member"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _bba267ca,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/bill/payment/unbind",
			component: _55a4eb10,
			name: "bill-payment-unbind"
		},
		{
			path: "/bill/list/paidList",
			component: _4922fbf2,
			name: "bill-list-paidList"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _d0d81078,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/bill/payment/refund",
			component: _6345759d,
			name: "bill-payment-refund"
		},
		{
			path: "/product/goods/calendar",
			component: _699c1996,
			name: "product-goods-calendar"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _c51edc00,
			name: "Inventory-over-date-unpaid-slotHead"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _034db7da,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/bill/project-setting/archives-management",
			component: _18d9e974,
			name: "bill-project-setting-archives-management"
		},
		{
			path: "/bill/income/highSearch",
			component: _48882827,
			name: "bill-income-highSearch"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _f52d4a2a,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _3c13fb94,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _00f35f7e,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _2d9a3e0e,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _7b197c13,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _2fbb6e62,
			name: "Inventory-floor-plan-searchForm"
		},
		{
			path: "/customer-manage/manage/switchCustomer",
			component: _6611499c,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _22e0da0e,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _5ccd2a82,
			name: "operations-center-from-field-HeightSearch"
		},
		{
			path: "/bill/payment/bind",
			component: _288cbf5f,
			name: "bill-payment-bind"
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _539a9a66,
			name: "order-center-contract-manage-contract-yard"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _01d08a9a,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/list-table",
			component: _159d114c,
			name: "Inventory-Inventory-gantt-chart-list-table"
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _0755ca6f,
			name: "operations-center-from-field-NewPage"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _0c430fb0,
			name: "Inventory-enter-field-searchForm"
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _2f15a93e,
			name: "app-manage-notification-manage-highSearch"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _82fb5b3c,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _1407a40b,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/order-center/order-manage/general-order-manage",
			component: _2bd07b7b,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _c1869148,
			name: "Inventory-goods-library-search-form"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _1f8c3b50,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/bill/list/highSearch",
			component: _34878452,
			name: "bill-list-highSearch"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _47761854,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/bill/list/waitList",
			component: _79751cca,
			name: "bill-list-waitList"
		},
		{
			path: "/bill/project-setting/archives-detail",
			component: _6256f458,
			name: "bill-project-setting-archives-detail"
		},
		{
			path: "/bill/income/addIncome",
			component: _bc8c3c06,
			name: "bill-income-addIncome"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _9e05f0d6,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/bill/project-setting/gantt-chart",
			component: _3cd9014c,
			name: "bill-project-setting-gantt-chart"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _da72f89a,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _2b77c001,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/basic/parameter/form",
			component: _19888dca,
			name: "basic-parameter-form"
		},
		{
			path: "/app-manage/home/activity",
			component: _1bea5320,
			name: "app-manage-home-activity"
		},
		{
			path: "/bill/payment/collection",
			component: _4da17843,
			name: "bill-payment-collection"
		},
		{
			path: "/doorrelationship/map/allEquipmentList",
			component: _b7e6eb8a,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _1104e000,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _7bf2512f,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _ef2ba73c,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _13d43322,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/Inventory/over-date/slotHead",
			component: _69469d18,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/order-center/order-manage/station-order-manage",
			component: _3a8624a2,
			name: "order-center-order-manage-station-order-manage"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _57ee7014,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _43587392,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _5c19e326,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _b9150230,
			name: "bill-project-setting-project-view"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _30017de6,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/app-manage/member-welfare/create",
			component: _ed633c5a,
			name: "app-manage-member-welfare-create"
		},
		{
			path: "/smart-hardware/map-depot/createdMapDepot",
			component: _0515d0b0,
			name: "smart-hardware-map-depot-createdMapDepot"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _5b84c096,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/order/list/highSearch",
			component: _890c772a,
			name: "order-list-highSearch"
		},
		{
			path: "/bill/project-setting/archives",
			component: _165ada00,
			name: "bill-project-setting-archives"
		},
		{
			path: "/product/meeting/create",
			component: _61155e8f,
			name: "product-meeting-create"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _2127ccf3,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/app-manage/coupon/create",
			component: _419668e6,
			name: "app-manage-coupon-create"
		},
		{
			path: "/bill/payment/highSearch",
			component: _1706fb0c,
			name: "bill-payment-highSearch"
		},
		{
			path: "/app-manage/steward-setting/create",
			component: _4bc5f757,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/official-website/calculator/community",
			component: _328e00e3,
			name: "official-website-calculator-community"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _3e657f2c,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _38b7c922,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _504cd939,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/bill/project-setting/progress-view",
			component: _57466128,
			name: "bill-project-setting-progress-view"
		},
		{
			path: "/bill/project-setting/project-detail/add-task",
			component: _7ee92842,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _1a445047,
			name: "smart-hardware-map-depot-edit-tvCard"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _1569cbf3,
			name: "doorrelationship-map-groupDetail-equipmentList"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-day",
			component: _3c0fb289,
			name: "bill-project-setting-gantt-chart-draw-day"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _8b2854b6,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-month",
			component: _e76203a6,
			name: "bill-project-setting-gantt-chart-draw-month"
		},
		{
			path: "/order-center/order-manage/general-order-manage/nullify",
			component: _60fdee04,
			name: "order-center-order-manage-general-order-manage-nullify"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceList",
			component: _25408a8f,
			name: "order-center-order-manage-station-order-manage-replaceList"
		},
		{
			path: "/bill/project-setting/project-detail/archives-detail",
			component: _791861b2,
			name: "bill-project-setting-project-detail-archives-detail"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _ad55e3ca,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceView",
			component: _1c52b916,
			name: "order-center-order-manage-station-order-manage-replaceView"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _35e10416,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/progress-view/list-table",
			component: _3aac6135,
			name: "bill-project-setting-progress-view-list-table"
		},
		{
			path: "/bill/project-setting/gantt-chart/edit-article",
			component: _34ced429,
			name: "bill-project-setting-gantt-chart-edit-article"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _5054b1ef,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/order-center/order-manage/general-order-manage/heightSearch",
			component: _6ee0ee96,
			name: "order-center-order-manage-general-order-manage-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _93a54c3c,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/archives/add-archives",
			component: _47d29142,
			name: "bill-project-setting-archives-add-archives"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _e55daeb6,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _8e398a64,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _15b33a28,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/order-center/order-manage/station-order-manage/reduceList",
			component: _4fb9ef97,
			name: "order-center-order-manage-station-order-manage-reduceList"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-week",
			component: _9f604e52,
			name: "bill-project-setting-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/gantt-chart/article",
			component: _eb787a20,
			name: "bill-project-setting-gantt-chart-article"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap",
			component: _fb3bd58e,
			name: "order-center-order-manage-station-order-manage-listAndMap"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _b99ddbac,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
			path: "/bill/project-setting/gantt-chart/view-article",
			component: _34d99044,
			name: "bill-project-setting-gantt-chart-view-article"
		},
		{
			path: "/order-center/contract-manage/contract-list/list",
			component: _6339f5d2,
			name: "order-center-contract-manage-contract-list-list"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-day",
			component: _381ca36a,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-day"
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _bac93262,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _4cb8c47a,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _80bd9c1a,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/bill/project-setting/project-view/add-archives",
			component: _bae78512,
			name: "bill-project-setting-project-view-add-archives"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _3a4330d0,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _45e561aa,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/color-type",
			component: _74153a0a,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-color-type"
		},
		{
			path: "/bill/project-setting/project-detail/watch-record",
			component: _372bd1bd,
			name: "bill-project-setting-project-detail-watch-record"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _7d19be32,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _3a36c37d,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _531582f5,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _531a5261,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _602af66d,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _e4dc8292,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduce",
			component: _74dd9394,
			name: "order-center-order-manage-station-order-manage-create-reduce"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _5c40745f,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/join",
			component: _6634ec0c,
			name: "order-center-order-manage-station-order-manage-create-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduceStation",
			component: _0196704e,
			name: "order-center-order-manage-station-order-manage-create-reduceStation"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap/list",
			component: _1a6448f2,
			name: "order-center-order-manage-station-order-manage-listAndMap-list"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/stationList",
			component: _037d2752,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _5f1fa8a6,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/order-center/order-manage/general-order-manage/create/addOrder",
			component: _95d29d6e,
			name: "order-center-order-manage-general-order-manage-create-addOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _62df3dd8,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/app-manage/push-manage/detail/:pushId?",
			component: _efdc08c8,
			name: "app-manage-push-manage-detail-pushId"
		},
		{
			path: "/member/setting-manager/detail/:csrId",
			component: _e4995072,
			name: "member-setting-manager-detail-csrId"
		},
		{
			path: "/app-manage/coupon/detail/:id",
			component: _b23bb434,
			name: "app-manage-coupon-detail-id"
		},
		{
			path: "/bill/payment/detail/:paymentId?",
			component: _dbbbc6e4,
			name: "bill-payment-detail-paymentId"
		},
		{
			path: "/app-manage/member-welfare/edit/:couponId?",
			component: _f8f3ec5c,
			name: "app-manage-member-welfare-edit-couponId"
		},
		{
			path: "/app-manage/icon-manage/edit/:iconId?",
			component: _167849d3,
			name: "app-manage-icon-manage-edit-iconId"
		},
		{
			path: "/app-manage/notification-manage/edit/:notificationId?",
			component: _479c8192,
			name: "app-manage-notification-manage-edit-notificationId"
		},
		{
			path: "/bill/list/detail/:billId?",
			component: _599442cb,
			name: "bill-list-detail-billId"
		},
		{
			path: "/app-manage/coupon/edit/:id",
			component: _19351f1f,
			name: "app-manage-coupon-edit-id"
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _54cd4e88,
			name: "product-meeting-edit-id"
		},
		{
			path: "/bill/income/detail/:id?",
			component: _37ebb839,
			name: "bill-income-detail-id"
		},
		{
			path: "/app-manage/steward-setting/edit/:manageId?",
			component: _53ab1556,
			name: "app-manage-steward-setting-edit-manageId"
		},
		{
			path: "/app-manage/notification-manage/detail/:notificationId?",
			component: _745a9784,
			name: "app-manage-notification-manage-detail-notificationId"
		},
		{
			path: "/order/list/detail/:orderId?",
			component: _349e3f17,
			name: "order-list-detail-orderId"
		},
		{
			path: "/product/goods/view/:id?",
			component: _549216b0,
			name: "product-goods-view-id"
		},
		{
			path: "/product/goods/edit/:id?",
			component: _7ecbf30d,
			name: "product-goods-edit-id"
		},
		{
			path: "/smart-hardware/map-depot/edit/:storageId?",
			component: _b76873e8,
			name: "smart-hardware-map-depot-edit-storageId"
		},
		{
			path: "/app-manage/member-welfare/detail/:couponId?",
			component: _640f5819,
			name: "app-manage-member-welfare-detail-couponId"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduce",
			component: _35b6a0ce,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduce"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/stationList",
			component: _69c5d862,
			name: "order-center-order-manage-station-order-manage-orderEdit-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/renew",
			component: _276144aa,
			name: "order-center-order-manage-station-order-manage-orderEdit-renew"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:orderEdit?/editOrder",
			component: _5a646c35,
			name: "order-center-order-manage-general-order-manage-orderEdit-editOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduceStation",
			component: _60ed318b,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduceStation"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/replaceView",
			component: _5abc1d72,
			name: "order-center-order-manage-station-order-manage-watchView-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/join",
			component: _fe83ffc6,
			name: "order-center-order-manage-station-order-manage-orderEdit-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/joinView",
			component: _15f8d474,
			name: "order-center-order-manage-station-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/renewView",
			component: _445b108b,
			name: "order-center-order-manage-station-order-manage-watchView-renewView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/replace",
			component: _bd27d7de,
			name: "order-center-order-manage-station-order-manage-orderEdit-replace"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/reduceView",
			component: _3492837c,
			name: "order-center-order-manage-station-order-manage-watchView-reduceView"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:watchView?/joinView",
			component: _5595e2dc,
			name: "order-center-order-manage-general-order-manage-watchView-joinView"
		},
		{
			path: "/bill/customerAssets/:customer/joinInfo",
			component: _0bb48d22,
			name: "bill-customerAssets-customer-joinInfo"
		},
		{
			path: "/bill/customerAssets/:customer/view",
			component: _40220c1c,
			name: "bill-customerAssets-customer-view"
		},
		{
			path: "/bill/settlement-list/:billId?/edit",
			component: _327a681e,
			name: "bill-settlement-list-billId-edit"
		},
		{
			path: "/bill/customerAssets/:customer/changeCommunity",
			component: _9fd7b51c,
			name: "bill-customerAssets-customer-changeCommunity"
		},
		{
			path: "/smart-hardware/space-manage/:sub?/son-space",
			component: _71bf3a5c,
			name: "smart-hardware-space-manage-sub-son-space"
		},
		{
			path: "/bill/customerAssets/:customer/changeBalance",
			component: _296bdb25,
			name: "bill-customerAssets-customer-changeBalance"
		},
		{
			path: "/operations-center/from-field/:watchView?/view",
			component: _4fd317c2,
			name: "operations-center-from-field-watchView-view"
		},
		{
			path: "/bill/customerAssets/:customer/basic",
			component: _4f64678a,
			name: "bill-customerAssets-customer-basic"
		},
		{
			path: "/bill/customerAssets/:customer/waiting",
			component: _68b2f0a6,
			name: "bill-customerAssets-customer-waiting"
		},
		{
			path: "/bill/customerAssets/:customer/giveMoney",
			component: _c609d570,
			name: "bill-customerAssets-customer-giveMoney"
		},
		{
			path: "/bill/customerAssets/:customer/refunds",
			component: _16e63958,
			name: "bill-customerAssets-customer-refunds"
		},
		{
			path: "/bill/customerAssets/:customer/assets",
			component: _24826b8c,
			name: "bill-customerAssets-customer-assets"
		},
		{
			path: "/bill/customerAssets/:customer/balance",
			component: _2ea4e9b5,
			name: "bill-customerAssets-customer-balance"
		},
		{
			path: "/bill/customerAssets/:customer/spending",
			component: _06cbd78a,
			name: "bill-customerAssets-customer-spending"
		},
		{
			path: "/bill/settlement-list/:billId?/detail",
			component: _0b1367e5,
			name: "bill-settlement-list-billId-detail"
		},
		{
			path: "/bill/customerAssets/:customer/basic/annex",
			component: _83817fe8,
			name: "bill-customerAssets-customer-basic-annex"
		},
		{
			path: "/bill/customerAssets/:customer/basic/info",
			component: _0665a726,
			name: "bill-customerAssets-customer-basic-info"
		},
		{
			path: "/publicPage/:view?/pdf-view",
			component: _db5f885a,
			name: "publicPage-view-pdf-view"
		}
    ],
    fallback: false
  })
}
