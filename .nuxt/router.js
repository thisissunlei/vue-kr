import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0193667a = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _1b19c946 = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _00288d92 = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _3c48e896 = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _146acd65 = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _d4ec3dc2 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _b5f98724 = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _e06dae12 = () => import('../client/pages/smarthardware/powerowner/index.vue' /* webpackChunkName: "pages/smarthardware/powerowner/index" */).then(m => m.default || m)
const _0fc86cf6 = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _4bf11b2c = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _05a0bbf4 = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _ce089f0e = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _7285f4e9 = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _0b7ce72e = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _afd04070 = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _3dce4f70 = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _48bb7e1f = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _41e4c0c8 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _2b3ccf0a = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _a5bf8bee = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _697f2404 = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _2d5252ab = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _72d7a247 = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _8a6f93fc = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _48b89a86 = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _0ca7a2d1 = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _d82418ee = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _f713dd26 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _6b9a1eda = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _1d1d99d4 = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _692084e0 = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _5613429c = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _d2cd8d76 = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _2da531f4 = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _6157e60a = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _02c56d5e = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _4aba0c88 = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _3a590fd0 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _31d56cdc = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _96af6928 = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _2a8f5c3a = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _4977ee1d = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _59ad4c33 = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _2befb0e2 = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _0561fcc0 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _09389c3c = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _cd389c60 = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _81e788f2 = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _44a70eab = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _201092bc = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _3ab0e99f = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _07d1310a = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _896473f4 = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _4695043e = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _533eba4e = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _956bdf7a = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _cf7d6188 = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _ccb66e44 = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _7754de92 = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _29ab0f42 = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _37787027 = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _bab43b92 = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _0f6e048c = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _53fab1b5 = () => import('../client/pages/bill/project-setting/gantt-chart/index.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/index" */).then(m => m.default || m)
const _3311b1d9 = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _fdb0bd34 = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _7089db9f = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _ae6afdd0 = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _daa28c58 = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _e530f53c = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _3682eb51 = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _1b902a37 = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _693cc024 = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _5a1979a9 = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _38edd324 = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _5229b673 = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _6cff62d8 = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _ff6a111e = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _2fb28454 = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _f20366f4 = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _ac57ecd6 = () => import('../client/pages/bill/project-setting/progress-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/index" */).then(m => m.default || m)
const _44fc6ae0 = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _423b7d3b = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _4ba7006a = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _643ab084 = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _a9ed1494 = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _659633e9 = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _5904ff49 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _6d28acfb = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _809fc14c = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _52e028af = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _06630c8f = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _d2049e3c = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _b8a51e08 = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _02d48802 = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _2141a5c3 = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _4ae5ea4e = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _0b236982 = () => import('../client/pages/customer-manage/manage/editCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/editCustomer" */).then(m => m.default || m)
const _18210154 = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _7c359350 = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _13e1fe10 = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _6309934b = () => import('../client/pages/smarthardware/powerowner/deviceData.vue' /* webpackChunkName: "pages/smarthardware/powerowner/deviceData" */).then(m => m.default || m)
const _6a2e6535 = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _8f97af88 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _6f4328d2 = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _08e6f98c = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _3cb4991c = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _388c67d6 = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _612a1248 = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _07b3bf94 = () => import('../client/pages/Inventory/goods-library/editGoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/editGoods" */).then(m => m.default || m)
const _7d3dce74 = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _1584068b = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _37d4c802 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _036d0cc1 = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _a7cc97fa = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _b71bf0da = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _77762d47 = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _2bcf8a4a = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _53c17510 = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _b8a02d64 = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _20293258 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _361642af = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _be09f22c = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _741a5608 = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _a36c292c = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _335de59e = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _8a8746f6 = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _76efa86e = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _cbf3824e = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _89f750a0 = () => import('../client/pages/smarthardware/doormanage/devicedetail/index.vue' /* webpackChunkName: "pages/smarthardware/doormanage/devicedetail/index" */).then(m => m.default || m)
const _7eb1150f = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _2365d9bd = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _fccd7e82 = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _f6749814 = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _99d92622 = () => import('../client/pages/bill/project-setting/comment/index.vue' /* webpackChunkName: "pages/bill/project-setting/comment/index" */).then(m => m.default || m)
const _75215f84 = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _4dffd866 = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _aadca046 = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-price.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-price" */).then(m => m.default || m)
const _5fbafd19 = () => import('../client/pages/bill/project-setting/gantt-chart/article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/article" */).then(m => m.default || m)
const _30a80b48 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _952e97b4 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _9645ac5a = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _36176988 = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _5953736e = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _204aac41 = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _34825a34 = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _a70dca02 = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _f8c1c65c = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _04e12cc0 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-week" */).then(m => m.default || m)
const _52d6109c = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _35e11640 = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _611f1cba = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _2d646118 = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _95322710 = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _888df220 = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _6e34331c = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _6fb1b0e0 = () => import('../client/pages/bill/project-setting/comment/KrInput.vue' /* webpackChunkName: "pages/bill/project-setting/comment/KrInput" */).then(m => m.default || m)
const _38f26c66 = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _2ad33519 = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _6c2fb138 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-month" */).then(m => m.default || m)
const _0f1a7c90 = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _7588e813 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _1043308e = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _2146e9e2 = () => import('../client/pages/bill/project-setting/comment/overFlowLabel.vue' /* webpackChunkName: "pages/bill/project-setting/comment/overFlowLabel" */).then(m => m.default || m)
const _70cd47bb = () => import('../client/pages/bill/project-setting/gantt-chart/view-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/view-article" */).then(m => m.default || m)
const _2628cf71 = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _157fbd80 = () => import('../client/pages/bill/project-setting/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/draw-day" */).then(m => m.default || m)
const _8089a6e4 = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _59632164 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _62eec767 = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _4c50f937 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _5a4c4f26 = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _b40556e6 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _2dccc2ae = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _076e1e64 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _e1ed8b28 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _70c28ba0 = () => import('../client/pages/bill/project-setting/gantt-chart/edit-article.vue' /* webpackChunkName: "pages/bill/project-setting/gantt-chart/edit-article" */).then(m => m.default || m)
const _10877c9b = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _76a018ac = () => import('../client/pages/bill/project-setting/progress-view/list-table.vue' /* webpackChunkName: "pages/bill/project-setting/progress-view/list-table" */).then(m => m.default || m)
const _41b66cbe = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _2da97cf0 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/index" */).then(m => m.default || m)
const _0aed056e = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _565e5cb8 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _5d0bebe3 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _34b27c42 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _63af20f0 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/list.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/list" */).then(m => m.default || m)
const _25f7f6b2 = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _9da76aea = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _0319f7c0 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _7c560008 = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _66e52485 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _41517116 = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _4108958f = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _3c6b45f7 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _d482f600 = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _d2a22218 = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _8ebea7fc = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _7a556508 = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _13c59576 = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _66354abc = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _6ab09711 = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _1bad9a0a = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _a0caff68 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _79c30035 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _35ef04b5 = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _4145c16e = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _15341a13 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _58fd43fb = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _dc300a9e = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _2f280e70 = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _8099bf28 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _8099110a = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _b1a2c02e = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _5ac8f242 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _1cc174f4 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _40fc02a2 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _acac767c = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _cf0f2bf0 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _2a3e90eb = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _5aaea73e = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _ba6b827c = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _178f9646 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _e198fe3a = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _27f0462e = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _735ee376 = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _6a0f71ff = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _1048b81c = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _35134df6 = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _114769d8 = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _8871efa8 = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _28d47281 = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _fca1fc6a = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _4da271c8 = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _1455e1c6 = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _13bbc4a4 = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _eb374bd6 = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _6705045c = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _48463d62 = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _d0a169fa = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _0ee9d66c = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)



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
			component: _0193667a,
			name: "index"
		},
		{
			path: "/ops",
			component: _1b19c946,
			name: "ops"
		},
		{
			path: "/nav-config",
			component: _00288d92,
			name: "nav-config"
		},
		{
			path: "/about",
			component: _3c48e896,
			name: "about"
		},
		{
			path: "/krmeetingorder",
			component: _146acd65,
			name: "krmeetingorder"
		},
		{
			path: "/krmeeting",
			component: _d4ec3dc2,
			name: "krmeeting"
		},
		{
			path: "/facility-tags",
			component: _b5f98724,
			name: "facility-tags"
		},
		{
			path: "/smarthardware/powerowner",
			component: _e06dae12,
			name: "smarthardware-powerowner"
		},
		{
			path: "/app-manage/push-manage",
			component: _0fc86cf6,
			name: "app-manage-push-manage"
		},
		{
			path: "/operation/community",
			component: _4bf11b2c,
			name: "operation-community"
		},
		{
			path: "/bill/customerAssets",
			component: _05a0bbf4,
			name: "bill-customerAssets"
		},
		{
			path: "/Inventory/slotHead",
			component: _ce089f0e,
			name: "Inventory-slotHead"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _7285f4e9,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/Inventory/over-date-unpaid",
			component: _0b7ce72e,
			name: "Inventory-over-date-unpaid"
		},
		{
			path: "/Inventory/floor-plan",
			component: _afd04070,
			name: "Inventory-floor-plan"
		},
		{
			path: "/app-manage/steward-setting",
			component: _3dce4f70,
			name: "app-manage-steward-setting"
		},
		{
			path: "/Inventory/over-date",
			component: _48bb7e1f,
			name: "Inventory-over-date"
		},
		{
			path: "/Inventory/goods-library",
			component: _41e4c0c8,
			name: "Inventory-goods-library"
		},
		{
			path: "/operations-center/from-field",
			component: _2b3ccf0a,
			name: "operations-center-from-field"
		},
		{
			path: "/community/publicPage",
			component: _a5bf8bee,
			name: "community-publicPage"
		},
		{
			path: "/doorrelationship/map",
			component: _697f2404,
			name: "doorrelationship-map"
		},
		{
			path: "/customer-manage/manage",
			component: _2d5252ab,
			name: "customer-manage-manage"
		},
		{
			path: "/Inventory/searchForm",
			component: _72d7a247,
			name: "Inventory-searchForm"
		},
		{
			path: "/app-manage/member-welfare",
			component: _8a6f93fc,
			name: "app-manage-member-welfare"
		},
		{
			path: "/product/meeting",
			component: _48b89a86,
			name: "product-meeting"
		},
		{
			path: "/krmeetingorder/detail",
			component: _0ca7a2d1,
			name: "krmeetingorder-detail"
		},
		{
			path: "/bill/payment",
			component: _d82418ee,
			name: "bill-payment"
		},
		{
			path: "/Inventory/optional-inventory",
			component: _f713dd26,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/nav-config/config-edit",
			component: _6b9a1eda,
			name: "nav-config-config-edit"
		},
		{
			path: "/app-manage/notification-manage",
			component: _1d1d99d4,
			name: "app-manage-notification-manage"
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _692084e0,
			name: "krmeeting-timeoutMeeting"
		},
		{
			path: "/bill/income",
			component: _5613429c,
			name: "bill-income"
		},
		{
			path: "/bill/settlement-list",
			component: _d2cd8d76,
			name: "bill-settlement-list"
		},
		{
			path: "/member/setting-manager",
			component: _2da531f4,
			name: "member-setting-manager"
		},
		{
			path: "/demo/wusuling",
			component: _6157e60a,
			name: "demo-wusuling"
		},
		{
			path: "/bill/list",
			component: _02c56d5e,
			name: "bill-list"
		},
		{
			path: "/app-manage/home",
			component: _4aba0c88,
			name: "app-manage-home"
		},
		{
			path: "/Inventory/statistical",
			component: _3a590fd0,
			name: "Inventory-statistical"
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _31d56cdc,
			name: "Inventory-rented-unpaid"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _96af6928,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _2a8f5c3a,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/Inventory/enter-field",
			component: _4977ee1d,
			name: "Inventory-enter-field"
		},
		{
			path: "/basic/parameter",
			component: _59ad4c33,
			name: "basic-parameter"
		},
		{
			path: "/app-manage/coupon",
			component: _2befb0e2,
			name: "app-manage-coupon"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _0561fcc0,
			name: "Inventory-daily-inventory"
		},
		{
			path: "/demo/yihao",
			component: _09389c3c,
			name: "demo-yihao"
		},
		{
			path: "/community/attract-investment",
			component: _cd389c60,
			name: "community-attract-investment"
		},
		{
			path: "/smarthardware/openlog",
			component: _81e788f2,
			name: "smarthardware-openlog"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _44a70eab,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/bill/payrecord",
			component: _201092bc,
			name: "bill-payrecord"
		},
		{
			path: "/bill/project-setting",
			component: _3ab0e99f,
			name: "bill-project-setting"
		},
		{
			path: "/order/list",
			component: _07d1310a,
			name: "order-list"
		},
		{
			path: "/app-manage/icon-manage",
			component: _896473f4,
			name: "app-manage-icon-manage"
		},
		{
			path: "/product/goods",
			component: _4695043e,
			name: "product-goods"
		},
		{
			path: "/krmeeting/timeInMeeting",
			component: _533eba4e,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/official-website/calculator",
			component: _956bdf7a,
			name: "official-website-calculator"
		},
		{
			path: "/Inventory/discount",
			component: _cf7d6188,
			name: "Inventory-discount"
		},
		{
			path: "/demo/machaoyue",
			component: _ccb66e44,
			name: "demo-machaoyue"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _7754de92,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _29ab0f42,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _37787027,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _bab43b92,
			name: "Inventory-over-date-unpaid-slotHead"
		},
		{
			path: "/bill/payment/collection",
			component: _0f6e048c,
			name: "bill-payment-collection"
		},
		{
			path: "/bill/project-setting/gantt-chart",
			component: _53fab1b5,
			name: "bill-project-setting-gantt-chart"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _3311b1d9,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _fdb0bd34,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _7089db9f,
			name: "bill-project-setting-project-view"
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _ae6afdd0,
			name: "operations-center-from-field-NewPage"
		},
		{
			path: "/app-manage/home/member",
			component: _daa28c58,
			name: "app-manage-home-member"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _e530f53c,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _3682eb51,
			name: "Inventory-enter-field-searchForm"
		},
		{
			path: "/bill/project-setting/archives",
			component: _1b902a37,
			name: "bill-project-setting-archives"
		},
		{
			path: "/order-center/order-manage/general-order-manage",
			component: _693cc024,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/customer-manage/manage/switchCustomer",
			component: _5a1979a9,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _38edd324,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/basic/parameter/form",
			component: _5229b673,
			name: "basic-parameter-form"
		},
		{
			path: "/bill/payment/refund",
			component: _6cff62d8,
			name: "bill-payment-refund"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _ff6a111e,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _2fb28454,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _f20366f4,
			name: "Inventory-floor-plan-searchForm"
		},
		{
			path: "/bill/project-setting/progress-view",
			component: _ac57ecd6,
			name: "bill-project-setting-progress-view"
		},
		{
			path: "/bill/income/highSearch",
			component: _44fc6ae0,
			name: "bill-income-highSearch"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _423b7d3b,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _4ba7006a,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/bill/list/waitList",
			component: _643ab084,
			name: "bill-list-waitList"
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _a9ed1494,
			name: "operations-center-from-field-HeightSearch"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _659633e9,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/app-manage/home/activity",
			component: _5904ff49,
			name: "app-manage-home-activity"
		},
		{
			path: "/bill/list/highSearch",
			component: _6d28acfb,
			name: "bill-list-highSearch"
		},
		{
			path: "/official-website/calculator/community",
			component: _809fc14c,
			name: "official-website-calculator-community"
		},
		{
			path: "/bill/payment/unbind",
			component: _52e028af,
			name: "bill-payment-unbind"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _06630c8f,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/order/list/highSearch",
			component: _d2049e3c,
			name: "order-list-highSearch"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _b8a51e08,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/product/goods/calendar",
			component: _02d48802,
			name: "product-goods-calendar"
		},
		{
			path: "/bill/payment/highSearch",
			component: _2141a5c3,
			name: "bill-payment-highSearch"
		},
		{
			path: "/smart-hardware/map-depot/createdMapDepot",
			component: _4ae5ea4e,
			name: "smart-hardware-map-depot-createdMapDepot"
		},
		{
			path: "/customer-manage/manage/editCustomer",
			component: _0b236982,
			name: "customer-manage-manage-editCustomer"
		},
		{
			path: "/bill/payment/bind",
			component: _18210154,
			name: "bill-payment-bind"
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _7c359350,
			name: "app-manage-notification-manage-highSearch"
		},
		{
			path: "/product/meeting/create",
			component: _13e1fe10,
			name: "product-meeting-create"
		},
		{
			path: "/smarthardware/powerowner/deviceData",
			component: _6309934b,
			name: "smarthardware-powerowner-deviceData"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/list-table",
			component: _6a2e6535,
			name: "Inventory-Inventory-gantt-chart-list-table"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _8f97af88,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _6f4328d2,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _08e6f98c,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/doorrelationship/map/allEquipmentList",
			component: _3cb4991c,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _388c67d6,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _612a1248,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/Inventory/goods-library/editGoods",
			component: _07b3bf94,
			name: "Inventory-goods-library-editGoods"
		},
		{
			path: "/bill/income/addIncome",
			component: _7d3dce74,
			name: "bill-income-addIncome"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _1584068b,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _37d4c802,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/Inventory/over-date/slotHead",
			component: _036d0cc1,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _a7cc97fa,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _b71bf0da,
			name: "Inventory-goods-library-search-form"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _77762d47,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/bill/list/paidList",
			component: _2bcf8a4a,
			name: "bill-list-paidList"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _53c17510,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/app-manage/steward-setting/create",
			component: _b8a02d64,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/order-center/order-manage/station-order-manage",
			component: _20293258,
			name: "order-center-order-manage-station-order-manage"
		},
		{
			path: "/bill/project-setting/archives-management",
			component: _361642af,
			name: "bill-project-setting-archives-management"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _be09f22c,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/app-manage/member-welfare/create",
			component: _741a5608,
			name: "app-manage-member-welfare-create"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _a36c292c,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _335de59e,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _8a8746f6,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _76efa86e,
			name: "Inventory-rented-unpaid-slotHead"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _cbf3824e,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/smarthardware/doormanage/devicedetail",
			component: _89f750a0,
			name: "smarthardware-doormanage-devicedetail"
		},
		{
			path: "/app-manage/coupon/create",
			component: _7eb1150f,
			name: "app-manage-coupon-create"
		},
		{
			path: "/bill/project-setting/archives-detail",
			component: _2365d9bd,
			name: "bill-project-setting-archives-detail"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _fccd7e82,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _f6749814,
			name: "order-center-contract-manage-contract-yard"
		},
		{
			path: "/bill/project-setting/comment",
			component: _99d92622,
			name: "bill-project-setting-comment"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _75215f84,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _4dffd866,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-price",
			component: _aadca046,
			name: "Inventory-goods-library-bulk-changes-change-price"
		},
		{
			path: "/bill/project-setting/gantt-chart/article",
			component: _5fbafd19,
			name: "bill-project-setting-gantt-chart-article"
		},
		{
			path: "/bill/project-setting/archives/add-archives",
			component: _30a80b48,
			name: "bill-project-setting-archives-add-archives"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _952e97b4,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _9645ac5a,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/bill/project-setting/project-detail/add-task",
			component: _36176988,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/order-center/contract-manage/contract-list/list",
			component: _5953736e,
			name: "order-center-contract-manage-contract-list-list"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _204aac41,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/bill/project-setting/project-detail/watch-record",
			component: _34825a34,
			name: "bill-project-setting-project-detail-watch-record"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceView",
			component: _a70dca02,
			name: "order-center-order-manage-station-order-manage-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _f8c1c65c,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-week",
			component: _04e12cc0,
			name: "bill-project-setting-gantt-chart-draw-week"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _52d6109c,
			name: "doorrelationship-map-groupDetail-equipmentList"
		},
		{
			path: "/bill/project-setting/project-view/add-archives",
			component: _35e11640,
			name: "bill-project-setting-project-view-add-archives"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _611f1cba,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _2d646118,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceList",
			component: _95322710,
			name: "order-center-order-manage-station-order-manage-replaceList"
		},
		{
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _888df220,
			name: "smart-hardware-map-depot-edit-tvCard"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _6e34331c,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/bill/project-setting/comment/KrInput",
			component: _6fb1b0e0,
			name: "bill-project-setting-comment-KrInput"
		},
		{
			path: "/order-center/order-manage/general-order-manage/heightSearch",
			component: _38f26c66,
			name: "order-center-order-manage-general-order-manage-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _2ad33519,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-month",
			component: _6c2fb138,
			name: "bill-project-setting-gantt-chart-draw-month"
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _0f1a7c90,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-day",
			component: _7588e813,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-day"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _1043308e,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/bill/project-setting/comment/overFlowLabel",
			component: _2146e9e2,
			name: "bill-project-setting-comment-overFlowLabel"
		},
		{
			path: "/bill/project-setting/gantt-chart/view-article",
			component: _70cd47bb,
			name: "bill-project-setting-gantt-chart-view-article"
		},
		{
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _2628cf71,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/bill/project-setting/gantt-chart/draw-day",
			component: _157fbd80,
			name: "bill-project-setting-gantt-chart-draw-day"
		},
		{
			path: "/order-center/order-manage/station-order-manage/reduceList",
			component: _8089a6e4,
			name: "order-center-order-manage-station-order-manage-reduceList"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/color-type",
			component: _59632164,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-color-type"
		},
		{
			path: "/order-center/order-manage/general-order-manage/nullify",
			component: _62eec767,
			name: "order-center-order-manage-general-order-manage-nullify"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _4c50f937,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _5a4c4f26,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _b40556e6,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/project-detail/archives-detail",
			component: _2dccc2ae,
			name: "bill-project-setting-project-detail-archives-detail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _076e1e64,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _e1ed8b28,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/bill/project-setting/gantt-chart/edit-article",
			component: _70c28ba0,
			name: "bill-project-setting-gantt-chart-edit-article"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _10877c9b,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/bill/project-setting/progress-view/list-table",
			component: _76a018ac,
			name: "bill-project-setting-progress-view-list-table"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _41b66cbe,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap",
			component: _2da97cf0,
			name: "order-center-order-manage-station-order-manage-listAndMap"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/stationList",
			component: _0aed056e,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _565e5cb8,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/join",
			component: _5d0bebe3,
			name: "order-center-order-manage-station-order-manage-create-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduce",
			component: _34b27c42,
			name: "order-center-order-manage-station-order-manage-create-reduce"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap/list",
			component: _63af20f0,
			name: "order-center-order-manage-station-order-manage-listAndMap-list"
		},
		{
			path: "/order-center/order-manage/general-order-manage/create/addOrder",
			component: _25f7f6b2,
			name: "order-center-order-manage-general-order-manage-create-addOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _9da76aea,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _0319f7c0,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _7c560008,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduceStation",
			component: _66e52485,
			name: "order-center-order-manage-station-order-manage-create-reduceStation"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _41517116,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/app-manage/coupon/detail/:id",
			component: _4108958f,
			name: "app-manage-coupon-detail-id"
		},
		{
			path: "/bill/payment/detail/:paymentId?",
			component: _3c6b45f7,
			name: "bill-payment-detail-paymentId"
		},
		{
			path: "/order/list/detail/:orderId?",
			component: _d482f600,
			name: "order-list-detail-orderId"
		},
		{
			path: "/bill/list/detail/:billId?",
			component: _d2a22218,
			name: "bill-list-detail-billId"
		},
		{
			path: "/app-manage/member-welfare/detail/:couponId?",
			component: _8ebea7fc,
			name: "app-manage-member-welfare-detail-couponId"
		},
		{
			path: "/app-manage/coupon/edit/:id",
			component: _7a556508,
			name: "app-manage-coupon-edit-id"
		},
		{
			path: "/product/goods/edit/:id?",
			component: _13c59576,
			name: "product-goods-edit-id"
		},
		{
			path: "/bill/income/detail/:id?",
			component: _66354abc,
			name: "bill-income-detail-id"
		},
		{
			path: "/product/goods/view/:id?",
			component: _6ab09711,
			name: "product-goods-view-id"
		},
		{
			path: "/app-manage/icon-manage/edit/:iconId?",
			component: _1bad9a0a,
			name: "app-manage-icon-manage-edit-iconId"
		},
		{
			path: "/app-manage/steward-setting/edit/:manageId?",
			component: _a0caff68,
			name: "app-manage-steward-setting-edit-manageId"
		},
		{
			path: "/smart-hardware/map-depot/edit/:storageId?",
			component: _79c30035,
			name: "smart-hardware-map-depot-edit-storageId"
		},
		{
			path: "/app-manage/notification-manage/detail/:notificationId?",
			component: _35ef04b5,
			name: "app-manage-notification-manage-detail-notificationId"
		},
		{
			path: "/app-manage/notification-manage/edit/:notificationId?",
			component: _4145c16e,
			name: "app-manage-notification-manage-edit-notificationId"
		},
		{
			path: "/app-manage/push-manage/detail/:pushId?",
			component: _15341a13,
			name: "app-manage-push-manage-detail-pushId"
		},
		{
			path: "/app-manage/member-welfare/edit/:couponId?",
			component: _58fd43fb,
			name: "app-manage-member-welfare-edit-couponId"
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _dc300a9e,
			name: "product-meeting-edit-id"
		},
		{
			path: "/member/setting-manager/detail/:csrId",
			component: _2f280e70,
			name: "member-setting-manager-detail-csrId"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:orderEdit?/editOrder",
			component: _8099bf28,
			name: "order-center-order-manage-general-order-manage-orderEdit-editOrder"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:watchView?/joinView",
			component: _8099110a,
			name: "order-center-order-manage-general-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/replaceView",
			component: _b1a2c02e,
			name: "order-center-order-manage-station-order-manage-watchView-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduceStation",
			component: _5ac8f242,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduceStation"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/join",
			component: _1cc174f4,
			name: "order-center-order-manage-station-order-manage-orderEdit-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/joinView",
			component: _40fc02a2,
			name: "order-center-order-manage-station-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/renewView",
			component: _acac767c,
			name: "order-center-order-manage-station-order-manage-watchView-renewView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/replace",
			component: _cf0f2bf0,
			name: "order-center-order-manage-station-order-manage-orderEdit-replace"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/reduceView",
			component: _2a3e90eb,
			name: "order-center-order-manage-station-order-manage-watchView-reduceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/renew",
			component: _5aaea73e,
			name: "order-center-order-manage-station-order-manage-orderEdit-renew"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduce",
			component: _ba6b827c,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduce"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/stationList",
			component: _178f9646,
			name: "order-center-order-manage-station-order-manage-orderEdit-stationList"
		},
		{
			path: "/bill/customerAssets/:customer/assets",
			component: _e198fe3a,
			name: "bill-customerAssets-customer-assets"
		},
		{
			path: "/bill/customerAssets/:customer/changeCommunity",
			component: _27f0462e,
			name: "bill-customerAssets-customer-changeCommunity"
		},
		{
			path: "/smart-hardware/space-manage/:sub?/son-space",
			component: _735ee376,
			name: "smart-hardware-space-manage-sub-son-space"
		},
		{
			path: "/bill/customerAssets/:customer/giveMoney",
			component: _6a0f71ff,
			name: "bill-customerAssets-customer-giveMoney"
		},
		{
			path: "/bill/settlement-list/:billId?/detail",
			component: _1048b81c,
			name: "bill-settlement-list-billId-detail"
		},
		{
			path: "/bill/customerAssets/:customer/view",
			component: _35134df6,
			name: "bill-customerAssets-customer-view"
		},
		{
			path: "/bill/customerAssets/:customer/joinInfo",
			component: _114769d8,
			name: "bill-customerAssets-customer-joinInfo"
		},
		{
			path: "/bill/customerAssets/:customer/balance",
			component: _8871efa8,
			name: "bill-customerAssets-customer-balance"
		},
		{
			path: "/bill/customerAssets/:customer/basic",
			component: _28d47281,
			name: "bill-customerAssets-customer-basic"
		},
		{
			path: "/bill/customerAssets/:customer/refunds",
			component: _fca1fc6a,
			name: "bill-customerAssets-customer-refunds"
		},
		{
			path: "/operations-center/from-field/:watchView?/view",
			component: _4da271c8,
			name: "operations-center-from-field-watchView-view"
		},
		{
			path: "/bill/customerAssets/:customer/waiting",
			component: _1455e1c6,
			name: "bill-customerAssets-customer-waiting"
		},
		{
			path: "/bill/customerAssets/:customer/spending",
			component: _13bbc4a4,
			name: "bill-customerAssets-customer-spending"
		},
		{
			path: "/bill/settlement-list/:billId?/edit",
			component: _eb374bd6,
			name: "bill-settlement-list-billId-edit"
		},
		{
			path: "/bill/customerAssets/:customer/changeBalance",
			component: _6705045c,
			name: "bill-customerAssets-customer-changeBalance"
		},
		{
			path: "/bill/customerAssets/:customer/basic/info",
			component: _48463d62,
			name: "bill-customerAssets-customer-basic-info"
		},
		{
			path: "/bill/customerAssets/:customer/basic/annex",
			component: _d0a169fa,
			name: "bill-customerAssets-customer-basic-annex"
		},
		{
			path: "/publicPage/:view?/pdf-view",
			component: _0ee9d66c,
			name: "publicPage-view-pdf-view"
		}
    ],
    fallback: false
  })
}
