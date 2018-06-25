import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _c93e1f24 = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _75c28b51 = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _ca5fa27a = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _b5e3693c = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _60ba8a13 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _7ba915a9 = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _15c19cf1 = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _0bde91c8 = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _5196f3da = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _ba94b2d4 = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _67ab8498 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _604b302e = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _1143da12 = () => import('../client/pages/Inventory/publicFn.js' /* webpackChunkName: "pages/Inventory/publicFn" */).then(m => m.default || m)
const _743d2e7c = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _723bbc7a = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _71d24992 = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _17bd7e90 = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _29dbd160 = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _742e71d3 = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _1f26de66 = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _816ac6fa = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _727b3b66 = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _3bfb7f24 = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _fcdf1214 = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _63dc31c4 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _62738804 = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _0634bbf9 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _d7cc7830 = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _01213786 = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _b82923b8 = () => import('../client/pages/community/publicFn.js' /* webpackChunkName: "pages/community/publicFn" */).then(m => m.default || m)
const _6c641b76 = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _0dcce4e0 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _0c98f305 = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _9f5bae6e = () => import('../client/pages/nav-config/getColumns.js' /* webpackChunkName: "pages/nav-config/getColumns" */).then(m => m.default || m)
const _0be8648a = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _4bfd9d2c = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _3e030476 = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _3fb10560 = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _00fefcdd = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _078b3615 = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _21676248 = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _6c204307 = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _f99f23b2 = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _517da05e = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _6c18df37 = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _1dcec911 = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _38525392 = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _2e805358 = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _500e2cfc = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _7b58e02b = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _1b225c5c = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _c09c2adc = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _0c8169f5 = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _4b2bb9c0 = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _467ee656 = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _29f43792 = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _dedb5528 = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _d939d30a = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _246f9ed6 = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _a2bf65de = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _2a093641 = () => import('../client/pages/bill/project-setting/gantt-chart/index.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/index" */).then(m => m.default || m)
const _49b84db3 = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _4d1d9fcd = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _256c1b88 = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _5b0535c6 = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _373a31c8 = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _002a1978 = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _a307d4ac = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _3952a55e = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _b27e1f30 = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _1fa99928 = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _e97f5c70 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _4d28857c = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _48c2c8dd = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _5dd86f7a = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _5c476b2f = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _061fc4f8 = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _94cc896c = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _7b7233f6 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _a59bfd8a = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _3caa5730 = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _57f95688 = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _5cb25daa = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _6550f0b0 = () => import('../client/pages/Inventory/floor-plan/publicFn.js' /* webpackChunkName: "pages/Inventory/floor-plan/publicFn" */).then(m => m.default || m)
const _538085ff = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _94ee8eb8 = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _2c1128d5 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _373e485a = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _4ab8d94e = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _7405dc2a = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _7efe5a54 = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _322a9152 = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _3ea2cd80 = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _58bc892b = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _a48d8314 = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _670c9c65 = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _657876a1 = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _7d8e062a = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _769ae688 = () => import('../client/pages/Inventory/Inventory-gantt-chart/publicFn.js' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/publicFn" */).then(m => m.default || m)
const _0357eb4b = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _7ccd7b3b = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _1254ebae = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _8c1cdf66 = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _6e7f7c87 = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _35bb98c6 = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _18f6a67f = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _94623e72 = () => import('../client/pages/bill/project-setting/publicFn.js' /* webpackChunkName: "pages/bill/project-setting/publicFn" */).then(m => m.default || m)
const _505019e0 = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _75505368 = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _54db40a0 = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _52eb37a3 = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _4f9a9af0 = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _ccc0853c = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _e3718f6e = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _572454e0 = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _78ed3e66 = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _cce05340 = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _55e0787e = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _2dd4dd1b = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _0b53b165 = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _5a1fb334 = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _5db57d67 = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _0ade0cfc = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _45c51679 = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _5f10db16 = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _5a88ae87 = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _f888a74c = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _eda0f40c = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _5c4be893 = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _51bd3e9b = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _36539b21 = () => import('../client/pages/bill/project-setting/progress-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/index" */).then(m => m.default || m)
const _6073aeee = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _e7025c38 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _4dc68d7a = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _0576d88b = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _58e8f6e2 = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _12f7ca92 = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _1c96cf86 = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _278ae2b6 = () => import('../client/pages/bill/project-setting/gantt-chart/article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/article" */).then(m => m.default || m)
const _6fc28b4c = () => import('../client/pages/bill/project-setting/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-week" */).then(m => m.default || m)
const _e6bf6866 = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _3f199ea0 = () => import('../client/pages/bill/project-setting/progress-view/list-table.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/list-table" */).then(m => m.default || m)
const _60fbd2d2 = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _6f118308 = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _8a9c99f8 = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _f89e7c74 = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _3946cdaf = () => import('../client/pages/bill/project-setting/gantt-chart/view-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/view-article" */).then(m => m.default || m)
const _0c86347a = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _18f25d74 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-day" */).then(m => m.default || m)
const _06cf0df0 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _b0c360d6 = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _91ffb942 = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _38010eb0 = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _95de2438 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/index" */).then(m => m.default || m)
const _03282b4c = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _84192db2 = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _6e1b5514 = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _f14a19cc = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _4053431a = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _7748b2fe = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _2d76060c = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _9c783cea = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _2bc6ad6c = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _2b55d69d = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _2882d444 = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _623d7fe6 = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _f0d6567e = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _393c1194 = () => import('../client/pages/bill/project-setting/gantt-chart/edit-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/edit-article" */).then(m => m.default || m)
const _299b6f65 = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _5782c060 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _01f76482 = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _37ffa2b2 = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _105ab3f3 = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _26d4bd40 = () => import('../client/pages/bill/project-setting/project-view/renderData.js' /* webpackChunkName: "pages/bill/project-setting/project-view/renderData" */).then(m => m.default || m)
const _c8ed2c58 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _3c42f0c2 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _5b8a1872 = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _899acb50 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-month" */).then(m => m.default || m)
const _81a89fb0 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _6256b26f = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _ec392f02 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _78dedc98 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _6424973e = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _bc487d08 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/list.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/list" */).then(m => m.default || m)
const _1a82fb79 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _3c9fa4ac = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _45d8813d = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _5a095394 = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _7f7e11a2 = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _794bd52a = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _23820a8e = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _3be645fc = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _99e5bf80 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _064291c1 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _64f4243d = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _533308e8 = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _7191b39d = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _13380062 = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _350654f2 = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _587311a4 = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _10e5cdca = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _5c777e04 = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _8a0548d8 = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _bf8657f2 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _63dd1683 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _1aa6b202 = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _544d56a9 = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _69bb1880 = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _2a9aec46 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _5a101d55 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _5b13803a = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _2fcbe612 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _38712408 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _03d90d8a = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _660ba194 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _7350f760 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _2b48cf12 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _43761bf2 = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _5d479bb6 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _0850ec4e = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _67350391 = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _96fd3a46 = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _584f7750 = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _55d17ef3 = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _3131ecd1 = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _31542338 = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _f4b34558 = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _46cfc220 = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _fe446dde = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _0cb7bbbf = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _2c6b6da0 = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _c81c8f22 = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _7fbfa3ee = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _2c471275 = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _734141e0 = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _685c72db = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _c9bc2a12 = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _f1f7c684 = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)



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
			component: _c93e1f24,
			name: "index"
		},
		{
			path: "/ops",
			component: _75c28b51,
			name: "ops"
		},
		{
			path: "/nav-config",
			component: _ca5fa27a,
			name: "nav-config"
		},
		{
			path: "/facility-tags",
			component: _b5e3693c,
			name: "facility-tags"
		},
		{
			path: "/krmeeting",
			component: _60ba8a13,
			name: "krmeeting"
		},
		{
			path: "/about",
			component: _7ba915a9,
			name: "about"
		},
		{
			path: "/krmeetingorder",
			component: _15c19cf1,
			name: "krmeetingorder"
		},
		{
			path: "/Inventory/discount",
			component: _0bde91c8,
			name: "Inventory-discount"
		},
		{
			path: "/Inventory/over-date",
			component: _5196f3da,
			name: "Inventory-over-date"
		},
		{
			path: "/order/list",
			component: _ba94b2d4,
			name: "order-list"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _67ab8498,
			name: "Inventory-daily-inventory"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _604b302e,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/Inventory/publicFn",
			component: _1143da12,
			name: "Inventory-publicFn"
		},
		{
			path: "/app-manage/home",
			component: _743d2e7c,
			name: "app-manage-home"
		},
		{
			path: "/product/meeting",
			component: _723bbc7a,
			name: "product-meeting"
		},
		{
			path: "/app-manage/icon-manage",
			component: _71d24992,
			name: "app-manage-icon-manage"
		},
		{
			path: "/bill/income",
			component: _17bd7e90,
			name: "bill-income"
		},
		{
			path: "/app-manage/notification-manage",
			component: _29dbd160,
			name: "app-manage-notification-manage"
		},
		{
			path: "/Inventory/searchForm",
			component: _742e71d3,
			name: "Inventory-searchForm"
		},
		{
			path: "/krmeeting/timeInMeeting",
			component: _1f26de66,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/app-manage/coupon",
			component: _816ac6fa,
			name: "app-manage-coupon"
		},
		{
			path: "/nav-config/config-edit",
			component: _727b3b66,
			name: "nav-config-config-edit"
		},
		{
			path: "/demo/yihao",
			component: _3bfb7f24,
			name: "demo-yihao"
		},
		{
			path: "/app-manage/member-welfare",
			component: _fcdf1214,
			name: "app-manage-member-welfare"
		},
		{
			path: "/Inventory/statistical",
			component: _63dc31c4,
			name: "Inventory-statistical"
		},
		{
			path: "/demo/wusuling",
			component: _62738804,
			name: "demo-wusuling"
		},
		{
			path: "/Inventory/optional-inventory",
			component: _0634bbf9,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/bill/customerAssets",
			component: _d7cc7830,
			name: "bill-customerAssets"
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _01213786,
			name: "Inventory-rented-unpaid"
		},
		{
			path: "/community/publicFn",
			component: _b82923b8,
			name: "community-publicFn"
		},
		{
			path: "/bill/list",
			component: _6c641b76,
			name: "bill-list"
		},
		{
			path: "/Inventory/goods-library",
			component: _0dcce4e0,
			name: "Inventory-goods-library"
		},
		{
			path: "/Inventory/slotHead",
			component: _0c98f305,
			name: "Inventory-slotHead"
		},
		{
			path: "/nav-config/getColumns",
			component: _9f5bae6e,
			name: "nav-config-getColumns"
		},
		{
			path: "/doorrelationship/map",
			component: _0be8648a,
			name: "doorrelationship-map"
		},
		{
			path: "/demo/machaoyue",
			component: _4bfd9d2c,
			name: "demo-machaoyue"
		},
		{
			path: "/krmeetingorder/detail",
			component: _3e030476,
			name: "krmeetingorder-detail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _3fb10560,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _00fefcdd,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/bill/payment",
			component: _078b3615,
			name: "bill-payment"
		},
		{
			path: "/bill/payrecord",
			component: _21676248,
			name: "bill-payrecord"
		},
		{
			path: "/operations-center/from-field",
			component: _6c204307,
			name: "operations-center-from-field"
		},
		{
			path: "/basic/parameter",
			component: _f99f23b2,
			name: "basic-parameter"
		},
		{
			path: "/bill/settlement-list",
			component: _517da05e,
			name: "bill-settlement-list"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _6c18df37,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/Inventory/enter-field",
			component: _1dcec911,
			name: "Inventory-enter-field"
		},
		{
			path: "/customer-manage/manage",
			component: _38525392,
			name: "customer-manage-manage"
		},
		{
			path: "/Inventory/floor-plan",
			component: _2e805358,
			name: "Inventory-floor-plan"
		},
		{
			path: "/app-manage/steward-setting",
			component: _500e2cfc,
			name: "app-manage-steward-setting"
		},
		{
			path: "/bill/project-setting",
			component: _7b58e02b,
			name: "bill-project-setting"
		},
		{
			path: "/community/attract-investment",
			component: _1b225c5c,
			name: "community-attract-investment"
		},
		{
			path: "/member/setting-manager",
			component: _c09c2adc,
			name: "member-setting-manager"
		},
		{
			path: "/Inventory/over-date-unpaid",
			component: _0c8169f5,
			name: "Inventory-over-date-unpaid"
		},
		{
			path: "/operation/community",
			component: _4b2bb9c0,
			name: "operation-community"
		},
		{
			path: "/product/goods",
			component: _467ee656,
			name: "product-goods"
		},
		{
			path: "/official-website/calculator",
			component: _29f43792,
			name: "official-website-calculator"
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _dedb5528,
			name: "krmeeting-timeoutMeeting"
		},
		{
			path: "/smarthardware/openlog",
			component: _d939d30a,
			name: "smarthardware-openlog"
		},
		{
			path: "/community/publicPage",
			component: _246f9ed6,
			name: "community-publicPage"
		},
		{
			path: "/app-manage/push-manage",
			component: _a2bf65de,
			name: "app-manage-push-manage"
		},
		{
			path: "/bill/project-setting/gantt-chart",
			component: _2a093641,
			name: "bill-project-setting-gantt-chart"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _49b84db3,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _4d1d9fcd,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _256c1b88,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _5b0535c6,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/bill/income/highSearch",
			component: _373a31c8,
			name: "bill-income-highSearch"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _002a1978,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _a307d4ac,
			name: "operations-center-from-field-HeightSearch"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _3952a55e,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/bill/income/addIncome",
			component: _b27e1f30,
			name: "bill-income-addIncome"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _1fa99928,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _e97f5c70,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/app-manage/steward-setting/create",
			component: _4d28857c,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _48c2c8dd,
			name: "Inventory-enter-field-searchForm"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _5dd86f7a,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _5c476b2f,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/product/meeting/create",
			component: _061fc4f8,
			name: "product-meeting-create"
		},
		{
			path: "/bill/payment/bind",
			component: _94cc896c,
			name: "bill-payment-bind"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _7b7233f6,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _a59bfd8a,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _3caa5730,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/bill/payment/refund",
			component: _57f95688,
			name: "bill-payment-refund"
		},
		{
			path: "/bill/project-setting/archives",
			component: _5cb25daa,
			name: "bill-project-setting-archives"
		},
		{
			path: "/Inventory/floor-plan/publicFn",
			component: _6550f0b0,
			name: "Inventory-floor-plan-publicFn"
		},
		{
			path: "/basic/parameter/form",
			component: _538085ff,
			name: "basic-parameter-form"
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _94ee8eb8,
			name: "operations-center-from-field-NewPage"
		},
		{
			path: "/app-manage/home/activity",
			component: _2c1128d5,
			name: "app-manage-home-activity"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _373e485a,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/official-website/calculator/community",
			component: _4ab8d94e,
			name: "official-website-calculator-community"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _7405dc2a,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/order/list/highSearch",
			component: _7efe5a54,
			name: "order-list-highSearch"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _322a9152,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _3ea2cd80,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _58bc892b,
			name: "Inventory-over-date-unpaid-slotHead"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _a48d8314,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/smart-hardware/map-depot/createdMapDepot",
			component: _670c9c65,
			name: "smart-hardware-map-depot-createdMapDepot"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _657876a1,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _7d8e062a,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/publicFn",
			component: _769ae688,
			name: "Inventory-Inventory-gantt-chart-publicFn"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _0357eb4b,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/bill/project-setting/archives-management",
			component: _7ccd7b3b,
			name: "bill-project-setting-archives-management"
		},
		{
			path: "/bill/payment/collection",
			component: _1254ebae,
			name: "bill-payment-collection"
		},
		{
			path: "/Inventory/over-date/slotHead",
			component: _8c1cdf66,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/bill/list/highSearch",
			component: _6e7f7c87,
			name: "bill-list-highSearch"
		},
		{
			path: "/customer-manage/manage/switchCustomer",
			component: _35bb98c6,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _18f6a67f,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/bill/project-setting/publicFn",
			component: _94623e72,
			name: "bill-project-setting-publicFn"
		},
		{
			path: "/bill/list/waitList",
			component: _505019e0,
			name: "bill-list-waitList"
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _75505368,
			name: "app-manage-notification-manage-highSearch"
		},
		{
			path: "/order-center/order-manage/general-order-manage",
			component: _54db40a0,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/bill/payment/unbind",
			component: _52eb37a3,
			name: "bill-payment-unbind"
		},
		{
			path: "/app-manage/member-welfare/create",
			component: _4f9a9af0,
			name: "app-manage-member-welfare-create"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _ccc0853c,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/bill/project-setting/archives-detail",
			component: _e3718f6e,
			name: "bill-project-setting-archives-detail"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _572454e0,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _78ed3e66,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/app-manage/home/member",
			component: _cce05340,
			name: "app-manage-home-member"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/list-table",
			component: _55e0787e,
			name: "Inventory-Inventory-gantt-chart-list-table"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _2dd4dd1b,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _0b53b165,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/doorrelationship/map/allEquipmentList",
			component: _5a1fb334,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/bill/list/paidList",
			component: _5db57d67,
			name: "bill-list-paidList"
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _0ade0cfc,
			name: "order-center-contract-manage-contract-yard"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _45c51679,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _5f10db16,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _5a88ae87,
			name: "Inventory-goods-library-search-form"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _f888a74c,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _eda0f40c,
			name: "Inventory-rented-unpaid-slotHead"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _5c4be893,
			name: "bill-project-setting-project-view"
		},
		{
			path: "/app-manage/coupon/create",
			component: _51bd3e9b,
			name: "app-manage-coupon-create"
		},
		{
			path: "/bill/project-setting/progress-view",
			component: _36539b21,
			name: "bill-project-setting-progress-view"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _6073aeee,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/order-center/order-manage/station-order-manage",
			component: _e7025c38,
			name: "order-center-order-manage-station-order-manage"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _4dc68d7a,
			name: "Inventory-floor-plan-searchForm"
		},
		{
			path: "/product/goods/calendar",
			component: _0576d88b,
			name: "product-goods-calendar"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _58e8f6e2,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/bill/payment/highSearch",
			component: _12f7ca92,
			name: "bill-payment-highSearch"
		},
		{
			path: "/order-center/contract-manage/contract-list/list",
			component: _1c96cf86,
			name: "order-center-contract-manage-contract-list-list"
		},
		{
			path: "/bill/project-setting/gantt-chart/article",
			component: _278ae2b6,
			name: "bill-project-setting-gantt-chart-article"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-week",
			component: _6fc28b4c,
			name: "bill-project-setting-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _e6bf6866,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/bill/project-setting/progress-view/list-table",
			component: _3f199ea0,
			name: "bill-project-setting-progress-view-list-table"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _60fbd2d2,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _6f118308,
			name: "smart-hardware-map-depot-edit-tvCard"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceList",
			component: _8a9c99f8,
			name: "order-center-order-manage-station-order-manage-replaceList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _f89e7c74,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/bill/project-setting/gantt-chart/view-article",
			component: _3946cdaf,
			name: "bill-project-setting-gantt-chart-view-article"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _0c86347a,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-day",
			component: _18f25d74,
			name: "bill-project-setting-gantt-chart-draw-day"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/color-type",
			component: _06cf0df0,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-color-type"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _b0c360d6,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _91ffb942,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _38010eb0,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap",
			component: _95de2438,
			name: "order-center-order-manage-station-order-manage-listAndMap"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _03282b4c,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _84192db2,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/bill/project-setting/project-detail/add-task",
			component: _6e1b5514,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _f14a19cc,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _4053431a,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _7748b2fe,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _2d76060c,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceView",
			component: _9c783cea,
			name: "order-center-order-manage-station-order-manage-replaceView"
		},
		{
			path: "/bill/project-setting/project-view/add-archives",
			component: _2bc6ad6c,
			name: "bill-project-setting-project-view-add-archives"
		},
		{
			path: "/bill/project-setting/project-detail/archives-detail",
			component: _2b55d69d,
			name: "bill-project-setting-project-detail-archives-detail"
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _2882d444,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _623d7fe6,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/order-center/order-manage/general-order-manage/heightSearch",
			component: _f0d6567e,
			name: "order-center-order-manage-general-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/gantt-chart/edit-article",
			component: _393c1194,
			name: "bill-project-setting-gantt-chart-edit-article"
		},
		{
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _299b6f65,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _5782c060,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/order-center/order-manage/station-order-manage/reduceList",
			component: _01f76482,
			name: "order-center-order-manage-station-order-manage-reduceList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _37ffa2b2,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/order-center/order-manage/general-order-manage/nullify",
			component: _105ab3f3,
			name: "order-center-order-manage-general-order-manage-nullify"
		},
		{
			path: "/bill/project-setting/project-view/renderData",
			component: _26d4bd40,
			name: "bill-project-setting-project-view-renderData"
		},
		{
			path: "/bill/project-setting/archives/add-archives",
			component: _c8ed2c58,
			name: "bill-project-setting-archives-add-archives"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-day",
			component: _3c42f0c2,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-day"
		},
		{
			path: "/bill/project-setting/project-detail/watch-record",
			component: _5b8a1872,
			name: "bill-project-setting-project-detail-watch-record"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-month",
			component: _899acb50,
			name: "bill-project-setting-gantt-chart-draw-month"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _81a89fb0,
			name: "doorrelationship-map-groupDetail-equipmentList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/join",
			component: _6256b26f,
			name: "order-center-order-manage-station-order-manage-create-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _ec392f02,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _78dedc98,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/order-center/order-manage/general-order-manage/create/addOrder",
			component: _6424973e,
			name: "order-center-order-manage-general-order-manage-create-addOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap/list",
			component: _bc487d08,
			name: "order-center-order-manage-station-order-manage-listAndMap-list"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduceStation",
			component: _1a82fb79,
			name: "order-center-order-manage-station-order-manage-create-reduceStation"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _3c9fa4ac,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/stationList",
			component: _45d8813d,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _5a095394,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _7f7e11a2,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduce",
			component: _794bd52a,
			name: "order-center-order-manage-station-order-manage-create-reduce"
		},
		{
			path: "/app-manage/member-welfare/detail/:couponId?",
			component: _23820a8e,
			name: "app-manage-member-welfare-detail-couponId"
		},
		{
			path: "/member/setting-manager/detail/:csrId",
			component: _3be645fc,
			name: "member-setting-manager-detail-csrId"
		},
		{
			path: "/app-manage/steward-setting/edit/:manageId?",
			component: _99e5bf80,
			name: "app-manage-steward-setting-edit-manageId"
		},
		{
			path: "/smart-hardware/map-depot/edit/:storageId?",
			component: _064291c1,
			name: "smart-hardware-map-depot-edit-storageId"
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _64f4243d,
			name: "product-meeting-edit-id"
		},
		{
			path: "/order/list/detail/:orderId?",
			component: _533308e8,
			name: "order-list-detail-orderId"
		},
		{
			path: "/product/goods/view/:id?",
			component: _7191b39d,
			name: "product-goods-view-id"
		},
		{
			path: "/app-manage/notification-manage/edit/:notificationId?",
			component: _13380062,
			name: "app-manage-notification-manage-edit-notificationId"
		},
		{
			path: "/app-manage/member-welfare/edit/:couponId?",
			component: _350654f2,
			name: "app-manage-member-welfare-edit-couponId"
		},
		{
			path: "/bill/income/detail/:id?",
			component: _587311a4,
			name: "bill-income-detail-id"
		},
		{
			path: "/app-manage/coupon/detail/:id",
			component: _10e5cdca,
			name: "app-manage-coupon-detail-id"
		},
		{
			path: "/app-manage/icon-manage/edit/:iconId?",
			component: _5c777e04,
			name: "app-manage-icon-manage-edit-iconId"
		},
		{
			path: "/app-manage/coupon/edit/:id",
			component: _8a0548d8,
			name: "app-manage-coupon-edit-id"
		},
		{
			path: "/app-manage/push-manage/detail/:pushId?",
			component: _bf8657f2,
			name: "app-manage-push-manage-detail-pushId"
		},
		{
			path: "/bill/payment/detail/:paymentId?",
			component: _63dd1683,
			name: "bill-payment-detail-paymentId"
		},
		{
			path: "/product/goods/edit/:id?",
			component: _1aa6b202,
			name: "product-goods-edit-id"
		},
		{
			path: "/app-manage/notification-manage/detail/:notificationId?",
			component: _544d56a9,
			name: "app-manage-notification-manage-detail-notificationId"
		},
		{
			path: "/bill/list/detail/:billId?",
			component: _69bb1880,
			name: "bill-list-detail-billId"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/replaceView",
			component: _2a9aec46,
			name: "order-center-order-manage-station-order-manage-watchView-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/renew",
			component: _5a101d55,
			name: "order-center-order-manage-station-order-manage-orderEdit-renew"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/stationList",
			component: _5b13803a,
			name: "order-center-order-manage-station-order-manage-orderEdit-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/join",
			component: _2fcbe612,
			name: "order-center-order-manage-station-order-manage-orderEdit-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/replace",
			component: _38712408,
			name: "order-center-order-manage-station-order-manage-orderEdit-replace"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/joinView",
			component: _03d90d8a,
			name: "order-center-order-manage-station-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduceStation",
			component: _660ba194,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduceStation"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:orderEdit?/editOrder",
			component: _7350f760,
			name: "order-center-order-manage-general-order-manage-orderEdit-editOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/reduceView",
			component: _2b48cf12,
			name: "order-center-order-manage-station-order-manage-watchView-reduceView"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:watchView?/joinView",
			component: _43761bf2,
			name: "order-center-order-manage-general-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/renewView",
			component: _5d479bb6,
			name: "order-center-order-manage-station-order-manage-watchView-renewView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduce",
			component: _0850ec4e,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduce"
		},
		{
			path: "/bill/customerAssets/:customer/view",
			component: _67350391,
			name: "bill-customerAssets-customer-view"
		},
		{
			path: "/bill/customerAssets/:customer/changeCommunity",
			component: _96fd3a46,
			name: "bill-customerAssets-customer-changeCommunity"
		},
		{
			path: "/bill/customerAssets/:customer/changeBalance",
			component: _584f7750,
			name: "bill-customerAssets-customer-changeBalance"
		},
		{
			path: "/bill/customerAssets/:customer/giveMoney",
			component: _55d17ef3,
			name: "bill-customerAssets-customer-giveMoney"
		},
		{
			path: "/smart-hardware/space-manage/:sub?/son-space",
			component: _3131ecd1,
			name: "smart-hardware-space-manage-sub-son-space"
		},
		{
			path: "/bill/customerAssets/:customer/joinInfo",
			component: _31542338,
			name: "bill-customerAssets-customer-joinInfo"
		},
		{
			path: "/operations-center/from-field/:watchView?/view",
			component: _f4b34558,
			name: "operations-center-from-field-watchView-view"
		},
		{
			path: "/bill/customerAssets/:customer/balance",
			component: _46cfc220,
			name: "bill-customerAssets-customer-balance"
		},
		{
			path: "/bill/customerAssets/:customer/waiting",
			component: _fe446dde,
			name: "bill-customerAssets-customer-waiting"
		},
		{
			path: "/bill/customerAssets/:customer/refunds",
			component: _0cb7bbbf,
			name: "bill-customerAssets-customer-refunds"
		},
		{
			path: "/bill/customerAssets/:customer/spending",
			component: _2c6b6da0,
			name: "bill-customerAssets-customer-spending"
		},
		{
			path: "/bill/customerAssets/:customer/assets",
			component: _c81c8f22,
			name: "bill-customerAssets-customer-assets"
		},
		{
			path: "/bill/settlement-list/:billId?/edit",
			component: _7fbfa3ee,
			name: "bill-settlement-list-billId-edit"
		},
		{
			path: "/bill/customerAssets/:customer/basic",
			component: _2c471275,
			name: "bill-customerAssets-customer-basic"
		},
		{
			path: "/bill/settlement-list/:billId?/detail",
			component: _734141e0,
			name: "bill-settlement-list-billId-detail"
		},
		{
			path: "/bill/customerAssets/:customer/basic/info",
			component: _685c72db,
			name: "bill-customerAssets-customer-basic-info"
		},
		{
			path: "/bill/customerAssets/:customer/basic/annex",
			component: _c9bc2a12,
			name: "bill-customerAssets-customer-basic-annex"
		},
		{
			path: "/publicPage/:view?/pdf-view",
			component: _f1f7c684,
			name: "publicPage-view-pdf-view"
		}
    ],
    
    
    fallback: false
  })
}
