import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _46ada27e = () => import('../client/pages/nav-config/index.vue' /* webpackChunkName: "pages/nav-config/index" */).then(m => m.default || m)
const _f83adb56 = () => import('../client/pages/krmeeting/index.vue' /* webpackChunkName: "pages/krmeeting/index" */).then(m => m.default || m)
const _7a032422 = () => import('../client/pages/krmeetingorder/index.vue' /* webpackChunkName: "pages/krmeetingorder/index" */).then(m => m.default || m)
const _51b0286b = () => import('../client/pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _0ec325da = () => import('../client/pages/ops/index.vue' /* webpackChunkName: "pages/ops/index" */).then(m => m.default || m)
const _689462a4 = () => import('../client/pages/facility-tags/index.vue' /* webpackChunkName: "pages/facility-tags/index" */).then(m => m.default || m)
const _37242e93 = () => import('../client/pages/bill/payment/index.vue' /* webpackChunkName: "pages/bill/payment/index" */).then(m => m.default || m)
const _27fa3344 = () => import('../client/pages/app-manage/notification-manage/index.vue' /* webpackChunkName: "pages/app-manage/notification-manage/index" */).then(m => m.default || m)
const _62b79974 = () => import('../client/pages/bill/payrecord/index.vue' /* webpackChunkName: "pages/bill/payrecord/index" */).then(m => m.default || m)
const _5d8ef9c7 = () => import('../client/pages/nav-config/getColumns.js' /* webpackChunkName: "pages/nav-config/getColumns" */).then(m => m.default || m)
const _a33700f6 = () => import('../client/pages/operations-center/from-field/index.vue' /* webpackChunkName: "pages/operations-center/from-field/index" */).then(m => m.default || m)
const _3410ca4f = () => import('../client/pages/bill/settlement-list/index.vue' /* webpackChunkName: "pages/bill/settlement-list/index" */).then(m => m.default || m)
const _d4c5b5fe = () => import('../client/pages/smarthardware/powerowner/index.vue' /* webpackChunkName: "pages/smarthardware/powerowner/index" */).then(m => m.default || m)
const _4878f877 = () => import('../client/pages/Inventory/optional-inventory/index.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/index" */).then(m => m.default || m)
const _3b778a46 = () => import('../client/pages/Inventory/discount.vue' /* webpackChunkName: "pages/Inventory/discount" */).then(m => m.default || m)
const _3c31eb83 = () => import('../client/pages/Inventory/slotHead.vue' /* webpackChunkName: "pages/Inventory/slotHead" */).then(m => m.default || m)
const _c59b2434 = () => import('../client/pages/community/publicFn.js' /* webpackChunkName: "pages/community/publicFn" */).then(m => m.default || m)
const _4db586e0 = () => import('../client/pages/app-manage/icon-manage/index.vue' /* webpackChunkName: "pages/app-manage/icon-manage/index" */).then(m => m.default || m)
const _1eb5da8e = () => import('../client/pages/Inventory/publicFn.js' /* webpackChunkName: "pages/Inventory/publicFn" */).then(m => m.default || m)
const _7c24fa52 = () => import('../client/pages/Inventory/goods-library/index.vue' /* webpackChunkName: "pages/Inventory/goods-library/index" */).then(m => m.default || m)
const _15f3400f = () => import('../client/pages/app-manage/push-manage/index.vue' /* webpackChunkName: "pages/app-manage/push-manage/index" */).then(m => m.default || m)
const _9e2eb856 = () => import('../client/pages/Inventory/over-date/index.vue' /* webpackChunkName: "pages/Inventory/over-date/index" */).then(m => m.default || m)
const _78707638 = () => import('../client/pages/nav-config/config-edit.vue' /* webpackChunkName: "pages/nav-config/config-edit" */).then(m => m.default || m)
const _4133bad4 = () => import('../client/pages/Inventory/make-invoice/index.vue' /* webpackChunkName: "pages/Inventory/make-invoice/index" */).then(m => m.default || m)
const _04992e80 = () => import('../client/pages/order-center/apply-manage/index.vue' /* webpackChunkName: "pages/order-center/apply-manage/index" */).then(m => m.default || m)
const _4d112680 = () => import('../client/pages/demo/wusuling.vue' /* webpackChunkName: "pages/demo/wusuling" */).then(m => m.default || m)
const _7d8dbce9 = () => import('../client/pages/basic/parameter/index.vue' /* webpackChunkName: "pages/basic/parameter/index" */).then(m => m.default || m)
const _4a97cb13 = () => import('../client/pages/community/publicPage/index.vue' /* webpackChunkName: "pages/community/publicPage/index" */).then(m => m.default || m)
const _36e2b2d8 = () => import('../client/pages/order/list/index.vue' /* webpackChunkName: "pages/order/list/index" */).then(m => m.default || m)
const _0ccb1d02 = () => import('../client/pages/management-tool/data-monitoring/index.vue' /* webpackChunkName: "pages/management-tool/data-monitoring/index" */).then(m => m.default || m)
const _0704dd90 = () => import('../client/pages/member/setting-manager/index.vue' /* webpackChunkName: "pages/member/setting-manager/index" */).then(m => m.default || m)
const _8abad228 = () => import('../client/pages/demo/yihao.vue' /* webpackChunkName: "pages/demo/yihao" */).then(m => m.default || m)
const _d0e17a76 = () => import('../client/pages/app-manage/coupon/index.vue' /* webpackChunkName: "pages/app-manage/coupon/index" */).then(m => m.default || m)
const _f7a6b770 = () => import('../client/pages/Inventory/rented-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/index" */).then(m => m.default || m)
const _4faf0aae = () => import('../client/pages/bill/project-setting/index.vue' /* webpackChunkName: "pages/bill/project-setting/index" */).then(m => m.default || m)
const _4b29c935 = () => import('../client/pages/customer-manage/manage/index.vue' /* webpackChunkName: "pages/customer-manage/manage/index" */).then(m => m.default || m)
const _11047e52 = () => import('../client/pages/bill/income/index.vue' /* webpackChunkName: "pages/bill/income/index" */).then(m => m.default || m)
const _458f70d2 = () => import('../client/pages/Inventory/floor-plan/index.vue' /* webpackChunkName: "pages/Inventory/floor-plan/index" */).then(m => m.default || m)
const _230ba822 = () => import('../client/pages/basic/preferential/index.vue' /* webpackChunkName: "pages/basic/preferential/index" */).then(m => m.default || m)
const _4a99cac2 = () => import('../client/pages/krmeetingorder/searchform.vue' /* webpackChunkName: "pages/krmeetingorder/searchform" */).then(m => m.default || m)
const _6f73bb38 = () => import('../client/pages/app-manage/member-welfare/index.vue' /* webpackChunkName: "pages/app-manage/member-welfare/index" */).then(m => m.default || m)
const _9587bf94 = () => import('../client/pages/bill/financial-invoice/index.vue' /* webpackChunkName: "pages/bill/financial-invoice/index" */).then(m => m.default || m)
const _49f2a41a = () => import('../client/pages/Inventory/over-date-unpaid/index.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/index" */).then(m => m.default || m)
const _5af27e53 = () => import('../client/pages/Inventory/enter-field/index.vue' /* webpackChunkName: "pages/Inventory/enter-field/index" */).then(m => m.default || m)
const _25adc00e = () => import('../client/pages/official-website/calculator/index.vue' /* webpackChunkName: "pages/official-website/calculator/index" */).then(m => m.default || m)
const _1e223307 = () => import('../client/pages/krmeetingorder/detail/index.vue' /* webpackChunkName: "pages/krmeetingorder/detail/index" */).then(m => m.default || m)
const _7b26dfbc = () => import('../client/pages/Inventory/Inventory-gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/index" */).then(m => m.default || m)
const _68b7ff08 = () => import('../client/pages/doorrelationship/map/index.vue' /* webpackChunkName: "pages/doorrelationship/map/index" */).then(m => m.default || m)
const _26140af2 = () => import('../client/pages/bill/list/index.vue' /* webpackChunkName: "pages/bill/list/index" */).then(m => m.default || m)
const _6e9a7d3e = () => import('../client/pages/app-manage/home/index.vue' /* webpackChunkName: "pages/app-manage/home/index" */).then(m => m.default || m)
const _216b42d1 = () => import('../client/pages/Inventory/searchForm.vue' /* webpackChunkName: "pages/Inventory/searchForm" */).then(m => m.default || m)
const _4287c392 = () => import('../client/pages/bill/make-invoice/index.vue' /* webpackChunkName: "pages/bill/make-invoice/index" */).then(m => m.default || m)
const _5d6698da = () => import('../client/pages/community/attract-investment/index.vue' /* webpackChunkName: "pages/community/attract-investment/index" */).then(m => m.default || m)
const _6c990b3c = () => import('../client/pages/product/meeting/index.vue' /* webpackChunkName: "pages/product/meeting/index" */).then(m => m.default || m)
const _626e6bf0 = () => import('../client/pages/smart-hardware/space-manage/index.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/index" */).then(m => m.default || m)
const _6dcde1aa = () => import('../client/pages/bill/customerAssets/index.vue' /* webpackChunkName: "pages/bill/customerAssets/index" */).then(m => m.default || m)
const _4a7b0ab5 = () => import('../client/pages/smart-hardware/map-depot/index.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/index" */).then(m => m.default || m)
const _1e9370fa = () => import('../client/pages/app-manage/steward-setting/index.vue' /* webpackChunkName: "pages/app-manage/steward-setting/index" */).then(m => m.default || m)
const _6ef480ea = () => import('../client/pages/krmeeting/timeoutMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/index" */).then(m => m.default || m)
const _72189d70 = () => import('../client/pages/smarthardware/temperaturehumiditymap/index.vue' /* webpackChunkName: "pages/smarthardware/temperaturehumiditymap/index" */).then(m => m.default || m)
const _bf72b7d2 = () => import('../client/pages/product/goods/index.vue' /* webpackChunkName: "pages/product/goods/index" */).then(m => m.default || m)
const _5e398086 = () => import('../client/pages/Inventory/statistical.vue' /* webpackChunkName: "pages/Inventory/statistical" */).then(m => m.default || m)
const _7377fd8f = () => import('../client/pages/krmeeting/timeInMeeting/index.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/index" */).then(m => m.default || m)
const _8be4fc14 = () => import('../client/pages/Inventory/daily-inventory/index.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/index" */).then(m => m.default || m)
const _5ef26886 = () => import('../client/pages/smarthardware/openlog/index.vue' /* webpackChunkName: "pages/smarthardware/openlog/index" */).then(m => m.default || m)
const _257618e8 = () => import('../client/pages/demo/machaoyue.vue' /* webpackChunkName: "pages/demo/machaoyue" */).then(m => m.default || m)
const _97c37e3c = () => import('../client/pages/operation/community/index.vue' /* webpackChunkName: "pages/operation/community/index" */).then(m => m.default || m)
const _3469f6f9 = () => import('../client/pages/bill/make-invoice/pubilcFn.js' /* webpackChunkName: "pages/bill/make-invoice/pubilcFn" */).then(m => m.default || m)
const _fee23378 = () => import('../client/pages/smarthardware/temperaturehumiditymap/table.vue' /* webpackChunkName: "pages/smarthardware/temperaturehumiditymap/table" */).then(m => m.default || m)
const _0f6d29f4 = () => import('../client/pages/smarthardware/temperaturehumiditymap/searchForm.vue' /* webpackChunkName: "pages/smarthardware/temperaturehumiditymap/searchForm" */).then(m => m.default || m)
const _db231e1a = () => import('../client/pages/Inventory/optional-inventory/optionalTable.vue' /* webpackChunkName: "pages/Inventory/optional-inventory/optionalTable" */).then(m => m.default || m)
const _60cc01c9 = () => import('../client/pages/Inventory/goods-library/search-form.vue' /* webpackChunkName: "pages/Inventory/goods-library/search-form" */).then(m => m.default || m)
const _35af709a = () => import('../client/pages/bill/income/highSearch.vue' /* webpackChunkName: "pages/bill/income/highSearch" */).then(m => m.default || m)
const _d98a457e = () => import('../client/pages/Inventory/daily-inventory/dailyTable.vue' /* webpackChunkName: "pages/Inventory/daily-inventory/dailyTable" */).then(m => m.default || m)
const _4786225a = () => import('../client/pages/bill/project-setting/public-hander/index.vue' /* webpackChunkName: "pages/bill/project-setting/public-hander/index" */).then(m => m.default || m)
const _8432a0e2 = () => import('../client/pages/bill/list/pdfDownload.vue' /* webpackChunkName: "pages/bill/list/pdfDownload" */).then(m => m.default || m)
const _40c60942 = () => import('../client/pages/bill/settlement-list/heightSearch.vue' /* webpackChunkName: "pages/bill/settlement-list/heightSearch" */).then(m => m.default || m)
const _6e882ae2 = () => import('../client/pages/order-center/order-manage/station-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/index" */).then(m => m.default || m)
const _7336a02e = () => import('../client/pages/app-manage/icon-manage/create.vue' /* webpackChunkName: "pages/app-manage/icon-manage/create" */).then(m => m.default || m)
const _96d442fe = () => import('../client/pages/management-tool/data-monitoring/list.vue' /* webpackChunkName: "pages/management-tool/data-monitoring/list" */).then(m => m.default || m)
const _d9d62a8e = () => import('../client/pages/bill/project-setting/archives-management/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-management/index" */).then(m => m.default || m)
const _3d819b9c = () => import('../client/pages/customer-manage/manage/heightSearch.vue' /* webpackChunkName: "pages/customer-manage/manage/heightSearch" */).then(m => m.default || m)
const _f2932204 = () => import('../client/pages/Inventory/Inventory-gantt-chart/publicFn.js' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/publicFn" */).then(m => m.default || m)
const _15ec300e = () => import('../client/pages/app-manage/notification-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/notification-manage/highSearch" */).then(m => m.default || m)
const _502bb726 = () => import('../client/pages/bill/project-setting/archives/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives/index" */).then(m => m.default || m)
const _56c36209 = () => import('../client/pages/product/goods/calendar.vue' /* webpackChunkName: "pages/product/goods/calendar" */).then(m => m.default || m)
const _b08699c2 = () => import('../client/pages/krmeeting/timeInMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeInMeeting/searchForm" */).then(m => m.default || m)
const _8a43bcd0 = () => import('../client/pages/order/list/highSearch.vue' /* webpackChunkName: "pages/order/list/highSearch" */).then(m => m.default || m)
const _29d45493 = () => import('../client/pages/bill/financial-invoice/search-from.vue' /* webpackChunkName: "pages/bill/financial-invoice/search-from" */).then(m => m.default || m)
const _88df1874 = () => import('../client/pages/bill/list/antiSettlement.vue' /* webpackChunkName: "pages/bill/list/antiSettlement" */).then(m => m.default || m)
const _5effdc6d = () => import('../client/pages/Inventory/over-date-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/slotHead" */).then(m => m.default || m)
const _31ad744a = () => import('../client/pages/bill/payment/refund/index.vue' /* webpackChunkName: "pages/bill/payment/refund/index" */).then(m => m.default || m)
const _daa08a6e = () => import('../client/pages/bill/make-invoice/list.vue' /* webpackChunkName: "pages/bill/make-invoice/list" */).then(m => m.default || m)
const _415a501e = () => import('../client/pages/Inventory/floor-plan/discount.vue' /* webpackChunkName: "pages/Inventory/floor-plan/discount" */).then(m => m.default || m)
const _503e16c7 = () => import('../client/pages/bill/project-setting/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/index" */).then(m => m.default || m)
const _6fe05374 = () => import('../client/pages/app-manage/member-welfare/highSearch.vue' /* webpackChunkName: "pages/app-manage/member-welfare/highSearch" */).then(m => m.default || m)
const _1e79abb8 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/index.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/index" */).then(m => m.default || m)
const _5c614ad3 = () => import('../client/pages/app-manage/home/activity.vue' /* webpackChunkName: "pages/app-manage/home/activity" */).then(m => m.default || m)
const _c68afd00 = () => import('../client/pages/order-center/contract-manage/contract-yard/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/index" */).then(m => m.default || m)
const _01df2128 = () => import('../client/pages/operations-center/from-field/HeightSearch.vue' /* webpackChunkName: "pages/operations-center/from-field/HeightSearch" */).then(m => m.default || m)
const _9c249fe6 = () => import('../client/pages/Inventory/enter-field/slotHead.vue' /* webpackChunkName: "pages/Inventory/enter-field/slotHead" */).then(m => m.default || m)
const _d4226b2e = () => import('../client/pages/doorrelationship/map/groupDetail/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/index" */).then(m => m.default || m)
const _6af17538 = () => import('../client/pages/bill/financial-invoice/pubilcFn.js' /* webpackChunkName: "pages/bill/financial-invoice/pubilcFn" */).then(m => m.default || m)
const _2a474044 = () => import('../client/pages/app-manage/home/member.vue' /* webpackChunkName: "pages/app-manage/home/member" */).then(m => m.default || m)
const _771653f9 = () => import('../client/pages/bill/project-setting/comment/index.vue' /* webpackChunkName: "pages/bill/project-setting/comment/index" */).then(m => m.default || m)
const _90c88ea4 = () => import('../client/pages/order-center/order-manage/general-order-manage/index.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/index" */).then(m => m.default || m)
const _c877e458 = () => import('../client/pages/bill/make-invoice/search-from.vue' /* webpackChunkName: "pages/bill/make-invoice/search-from" */).then(m => m.default || m)
const _5e5512b0 = () => import('../client/pages/app-manage/home/joinMember.vue' /* webpackChunkName: "pages/app-manage/home/joinMember" */).then(m => m.default || m)
const _3aae1cf4 = () => import('../client/pages/management-tool/data-monitoring/SelectCustomers.vue' /* webpackChunkName: "pages/management-tool/data-monitoring/SelectCustomers" */).then(m => m.default || m)
const _a1558606 = () => import('../client/pages/app-manage/push-manage/highSearch.vue' /* webpackChunkName: "pages/app-manage/push-manage/highSearch" */).then(m => m.default || m)
const _d53f4f20 = () => import('../client/pages/bill/payment/collection/index.vue' /* webpackChunkName: "pages/bill/payment/collection/index" */).then(m => m.default || m)
const _3ba9d1bc = () => import('../client/pages/Inventory/floor-plan/searchForm.vue' /* webpackChunkName: "pages/Inventory/floor-plan/searchForm" */).then(m => m.default || m)
const _4fd517a8 = () => import('../client/pages/doorrelationship/map/allEquipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/index" */).then(m => m.default || m)
const _3586805e = () => import('../client/pages/community/fixHead/attract-head.vue' /* webpackChunkName: "pages/community/fixHead/attract-head" */).then(m => m.default || m)
const _087f9caf = () => import('../client/pages/basic/preferential/create.vue' /* webpackChunkName: "pages/basic/preferential/create" */).then(m => m.default || m)
const _0e942e8a = () => import('../client/pages/Inventory/make-invoice/list.vue' /* webpackChunkName: "pages/Inventory/make-invoice/list" */).then(m => m.default || m)
const _a23e89e8 = () => import('../client/pages/bill/payment/bind.vue' /* webpackChunkName: "pages/bill/payment/bind" */).then(m => m.default || m)
const _57b4c9f8 = () => import('../client/pages/Inventory/rented-unpaid/slotHead.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/slotHead" */).then(m => m.default || m)
const _de785e28 = () => import('../client/pages/bill/list/settleAccounts.vue' /* webpackChunkName: "pages/bill/list/settleAccounts" */).then(m => m.default || m)
const _addc6756 = () => import('../client/pages/Inventory/goods-library/bind-service.vue' /* webpackChunkName: "pages/Inventory/goods-library/bind-service" */).then(m => m.default || m)
const _23513bd4 = () => import('../client/pages/basic/preferential/createSale.vue' /* webpackChunkName: "pages/basic/preferential/createSale" */).then(m => m.default || m)
const _67b05806 = () => import('../client/pages/Inventory/rented-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/rented-unpaid/searchForm" */).then(m => m.default || m)
const _0770eb8e = () => import('../client/pages/bill/list/waitList.vue' /* webpackChunkName: "pages/bill/list/waitList" */).then(m => m.default || m)
const _17480cdb = () => import('../client/pages/Inventory/enter-field/searchForm.vue' /* webpackChunkName: "pages/Inventory/enter-field/searchForm" */).then(m => m.default || m)
const _fa34b78c = () => import('../client/pages/smart-hardware/space-manage/editSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/editSpace" */).then(m => m.default || m)
const _34f5fb3a = () => import('../client/pages/smart-hardware/map-depot/createdMapDepot.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/createdMapDepot" */).then(m => m.default || m)
const _1bbc4d85 = () => import('../client/pages/bill/list/highSearch.vue' /* webpackChunkName: "pages/bill/list/highSearch" */).then(m => m.default || m)
const _77afcda2 = () => import('../client/pages/operations-center/from-field/NewPage.vue' /* webpackChunkName: "pages/operations-center/from-field/NewPage" */).then(m => m.default || m)
const _fbe53ece = () => import('../client/pages/app-manage/coupon/create.vue' /* webpackChunkName: "pages/app-manage/coupon/create" */).then(m => m.default || m)
const _651737e0 = () => import('../client/pages/official-website/calculator/community.vue' /* webpackChunkName: "pages/official-website/calculator/community" */).then(m => m.default || m)
const _66b838a4 = () => import('../client/pages/Inventory/floor-plan/publicFn.js' /* webpackChunkName: "pages/Inventory/floor-plan/publicFn" */).then(m => m.default || m)
const _b29012f4 = () => import('../client/pages/app-manage/member-welfare/create.vue' /* webpackChunkName: "pages/app-manage/member-welfare/create" */).then(m => m.default || m)
const _926f7516 = () => import('../client/pages/customer-manage/manage/editCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/editCustomer" */).then(m => m.default || m)
const _34052fec = () => import('../client/pages/Inventory/goods-library/editGoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/editGoods" */).then(m => m.default || m)
const _00bd56fd = () => import('../client/pages/basic/parameter/form.vue' /* webpackChunkName: "pages/basic/parameter/form" */).then(m => m.default || m)
const _4e3ca702 = () => import('../client/pages/product/meeting/create.vue' /* webpackChunkName: "pages/product/meeting/create" */).then(m => m.default || m)
const _48e20df8 = () => import('../client/pages/app-manage/steward-setting/create.vue' /* webpackChunkName: "pages/app-manage/steward-setting/create" */).then(m => m.default || m)
const _1e4fcad5 = () => import('../client/pages/bill/project-setting/project-view/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/index" */).then(m => m.default || m)
const _d1f2bb82 = () => import('../client/pages/Inventory/Inventory-gantt-chart/list-table.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/list-table" */).then(m => m.default || m)
const _e5631436 = () => import('../client/pages/bill/list/paidList.vue' /* webpackChunkName: "pages/bill/list/paidList" */).then(m => m.default || m)
const _9ab740d0 = () => import('../client/pages/Inventory/make-invoice/pubilcFn.js' /* webpackChunkName: "pages/Inventory/make-invoice/pubilcFn" */).then(m => m.default || m)
const _f4422fc8 = () => import('../client/pages/member/setting-manager/highSearch.vue' /* webpackChunkName: "pages/member/setting-manager/highSearch" */).then(m => m.default || m)
const _1f638d81 = () => import('../client/pages/smarthardware/powerowner/deviceData.vue' /* webpackChunkName: "pages/smarthardware/powerowner/deviceData" */).then(m => m.default || m)
const _2f4b0ef3 = () => import('../client/pages/Inventory/make-invoice/search-from.vue' /* webpackChunkName: "pages/Inventory/make-invoice/search-from" */).then(m => m.default || m)
const _5fade6e2 = () => import('../client/pages/app-manage/push-manage/create.vue' /* webpackChunkName: "pages/app-manage/push-manage/create" */).then(m => m.default || m)
const _1d21d3c5 = () => import('../client/pages/bill/project-setting/publicFn.js' /* webpackChunkName: "pages/bill/project-setting/publicFn" */).then(m => m.default || m)
const _bdc381ac = () => import('../client/pages/bill/income/addIncome.vue' /* webpackChunkName: "pages/bill/income/addIncome" */).then(m => m.default || m)
const _626e7e0e = () => import('../client/pages/bill/payment/highSearch.vue' /* webpackChunkName: "pages/bill/payment/highSearch" */).then(m => m.default || m)
const _67ddbe5f = () => import('../client/pages/customer-manage/manage/switchCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/switchCustomer" */).then(m => m.default || m)
const _41d18d9d = () => import('../client/pages/order-center/apply-manage/search-from.vue' /* webpackChunkName: "pages/order-center/apply-manage/search-from" */).then(m => m.default || m)
const _c039deb8 = () => import('../client/pages/krmeeting/timeoutMeeting/searchForm.vue' /* webpackChunkName: "pages/krmeeting/timeoutMeeting/searchForm" */).then(m => m.default || m)
const _2933bbe6 = () => import('../client/pages/smarthardware/doormanage/devicedetail/index.vue' /* webpackChunkName: "pages/smarthardware/doormanage/devicedetail/index" */).then(m => m.default || m)
const _e3e187b2 = () => import('../client/pages/customer-manage/manage/createCustomer.vue' /* webpackChunkName: "pages/customer-manage/manage/createCustomer" */).then(m => m.default || m)
const _6efebd8a = () => import('../client/pages/Inventory/over-date-unpaid/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date-unpaid/searchForm" */).then(m => m.default || m)
const _459c27c9 = () => import('../client/pages/Inventory/goods-library/fixed-head.vue' /* webpackChunkName: "pages/Inventory/goods-library/fixed-head" */).then(m => m.default || m)
const _1d091808 = () => import('../client/pages/smart-hardware/space-manage/createSpace.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/createSpace" */).then(m => m.default || m)
const _698b0041 = () => import('../client/pages/bill/project-setting/project-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/index" */).then(m => m.default || m)
const _183d91b1 = () => import('../client/pages/smarthardware/openlog/searchForm.vue' /* webpackChunkName: "pages/smarthardware/openlog/searchForm" */).then(m => m.default || m)
const _17d07b20 = () => import('../client/pages/order-center/apply-manage/list.vue' /* webpackChunkName: "pages/order-center/apply-manage/list" */).then(m => m.default || m)
const _0c370899 = () => import('../client/pages/Inventory/over-date/searchForm.vue' /* webpackChunkName: "pages/Inventory/over-date/searchForm" */).then(m => m.default || m)
const _2144834b = () => import('../client/pages/Inventory/over-date/slotHead.vue' /* webpackChunkName: "pages/Inventory/over-date/slotHead" */).then(m => m.default || m)
const _0d37fcea = () => import('../client/pages/bill/financial-invoice/list.vue' /* webpackChunkName: "pages/bill/financial-invoice/list" */).then(m => m.default || m)
const _16714ee5 = () => import('../client/pages/bill/payment/unbind.vue' /* webpackChunkName: "pages/bill/payment/unbind" */).then(m => m.default || m)
const _9f9fcf34 = () => import('../client/pages/Inventory/goods-library/newgoods.vue' /* webpackChunkName: "pages/Inventory/goods-library/newgoods" */).then(m => m.default || m)
const _72b8c342 = () => import('../client/pages/order-center/apply-manage/pubilcFn.js' /* webpackChunkName: "pages/order-center/apply-manage/pubilcFn" */).then(m => m.default || m)
const _87e39fc0 = () => import('../client/pages/app-manage/notification-manage/create.vue' /* webpackChunkName: "pages/app-manage/notification-manage/create" */).then(m => m.default || m)
const _918bbe28 = () => import('../client/pages/bill/project-setting/comment/indexData.js' /* webpackChunkName: "pages/bill/project-setting/comment/indexData" */).then(m => m.default || m)
const _dd92d8da = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-price.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-price" */).then(m => m.default || m)
const _2ef06922 = () => import('../client/pages/member/setting-manager/detail/communityManage.vue' /* webpackChunkName: "pages/member/setting-manager/detail/communityManage" */).then(m => m.default || m)
const _4b41244e = () => import('../client/pages/order-center/contract-manage/contract-yard/ContractYard.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-yard/ContractYard" */).then(m => m.default || m)
const _2565964e = () => import('../client/pages/bill/project-setting/project-detail/object-detail-title.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/object-detail-title" */).then(m => m.default || m)
const _78303ec6 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-day" */).then(m => m.default || m)
const _74324ed4 = () => import('../client/pages/bill/project-setting/comment/krCity.js' /* webpackChunkName: "pages/bill/project-setting/comment/krCity" */).then(m => m.default || m)
const _5a7054fc = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceList" */).then(m => m.default || m)
const _b9d1c4a0 = () => import('../client/pages/order-center/order-manage/station-order-manage/applyContract.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/applyContract" */).then(m => m.default || m)
const _7f0bf857 = () => import('../client/pages/bill/project-setting/project-detail/edit-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/edit-task" */).then(m => m.default || m)
const _5d804852 = () => import('../client/pages/bill/project-setting/archives/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/archives/add-archives" */).then(m => m.default || m)
const _d51c751e = () => import('../client/pages/order-center/order-manage/general-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/nullify" */).then(m => m.default || m)
const _1682aa26 = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/index.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/index" */).then(m => m.default || m)
const _eac3590c = () => import('../client/pages/smart-hardware/map-depot/edit/tvCard.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/tvCard" */).then(m => m.default || m)
const _7ed3f741 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-month" */).then(m => m.default || m)
const _3e96fd6a = () => import('../client/pages/bill/project-setting/comment/KrInput.vue' /* webpackChunkName: "pages/bill/project-setting/comment/KrInput" */).then(m => m.default || m)
const _038a78d0 = () => import('../client/pages/Inventory/goods-library/bulk-changes/change-status.vue' /* webpackChunkName: "pages/Inventory/goods-library/bulk-changes/change-status" */).then(m => m.default || m)
const _6c4bf7ee = () => import('../client/pages/order-center/order-manage/station-order-manage/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/replaceView" */).then(m => m.default || m)
const _430a7aa5 = () => import('../client/pages/order-center/order-manage/station-order-manage/nullify.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/nullify" */).then(m => m.default || m)
const _cbf6d750 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/view-article" */).then(m => m.default || m)
const _7a2fc927 = () => import('../client/pages/doorrelationship/map/groupDetail/editForm.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/editForm" */).then(m => m.default || m)
const _5298cd5d = () => import('../client/pages/order-center/order-manage/station-order-manage/errorView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/errorView" */).then(m => m.default || m)
const _8ce12562 = () => import('../client/pages/order-center/order-manage/station-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/heightSearch" */).then(m => m.default || m)
const _0498bf20 = () => import('../client/pages/bill/project-setting/project-detail/watch-record.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/watch-record" */).then(m => m.default || m)
const _02d26c5f = () => import('../client/pages/bill/project-setting/project-detail/archives-detail/index.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/archives-detail/index" */).then(m => m.default || m)
const _f3adfeb4 = () => import('../client/pages/doorrelationship/map/allEquipmentList/searchForm.vue' /* webpackChunkName: "pages/doorrelationship/map/allEquipmentList/searchForm" */).then(m => m.default || m)
const _e833c124 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/color-type" */).then(m => m.default || m)
const _4d180b78 = () => import('../client/pages/order-center/order-manage/station-order-manage/reduceList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/reduceList" */).then(m => m.default || m)
const _6ea9a4cb = () => import('../client/pages/bill/project-setting/project-detail/detail-task-list.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/detail-task-list" */).then(m => m.default || m)
const _e456e7dc = () => import('../client/pages/bill/project-setting/project-detail/add-task.vue' /* webpackChunkName: "pages/bill/project-setting/project-detail/add-task" */).then(m => m.default || m)
const _92b736d6 = () => import('../client/pages/bill/project-setting/comment/indexMethod.js' /* webpackChunkName: "pages/bill/project-setting/comment/indexMethod" */).then(m => m.default || m)
const _237d6d43 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/draw-week" */).then(m => m.default || m)
const _332b567c = () => import('../client/pages/bill/project-setting/archives-detail/record-detail.vue' /* webpackChunkName: "pages/bill/project-setting/archives-detail/record-detail" */).then(m => m.default || m)
const _bd083ff0 = () => import('../client/pages/order-center/order-manage/station-order-manage/joinList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/joinList" */).then(m => m.default || m)
const _f338fb48 = () => import('../client/pages/Inventory/Inventory-gantt-chart/gantt-chart/article.vue' /* webpackChunkName: "pages/Inventory/Inventory-gantt-chart/gantt-chart/article" */).then(m => m.default || m)
const _50d65eff = () => import('../client/pages/order-center/contract-manage/contract-list/list/index.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/index" */).then(m => m.default || m)
const _bd95edb4 = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/index.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/index" */).then(m => m.default || m)
const _420e1cea = () => import('../client/pages/bill/project-setting/project-view/add-archives.vue' /* webpackChunkName: "pages/bill/project-setting/project-view/add-archives" */).then(m => m.default || m)
const _1c34c819 = () => import('../client/pages/bill/project-setting/comment/overFlowLabel.vue' /* webpackChunkName: "pages/bill/project-setting/comment/overFlowLabel" */).then(m => m.default || m)
const _b88ca2fc = () => import('../client/pages/bill/project-setting/project-view/renderData.js' /* webpackChunkName: "pages/bill/project-setting/project-view/renderData" */).then(m => m.default || m)
const _72430203 = () => import('../client/pages/order-center/order-manage/general-order-manage/heightSearch.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/heightSearch" */).then(m => m.default || m)
const _0f37d3a3 = () => import('../client/pages/bill/project-setting/comment/krSelect.js' /* webpackChunkName: "pages/bill/project-setting/comment/krSelect" */).then(m => m.default || m)
const _b5ff160c = () => import('../client/pages/order-center/order-manage/station-order-manage/listAndMap/list.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/listAndMap/list" */).then(m => m.default || m)
const _fc89657e = () => import('../client/pages/order-center/order-manage/station-order-manage/create/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/replace" */).then(m => m.default || m)
const _3fc4582a = () => import('../client/pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch.vue' /* webpackChunkName: "pages/doorrelationship/map/groupDetail/equipmentList/equipmentSearch" */).then(m => m.default || m)
const _faba75c0 = () => import('../client/pages/order-center/contract-manage/contract-list/list/PrintAgreement.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/PrintAgreement" */).then(m => m.default || m)
const _638d09da = () => import('../client/pages/order-center/order-manage/station-order-manage/create/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/renew" */).then(m => m.default || m)
const _11cc34ff = () => import('../client/pages/order-center/order-manage/station-order-manage/create/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/stationList" */).then(m => m.default || m)
const _75be62dc = () => import('../client/pages/order-center/contract-manage/contract-list/list/heightSearch.vue' /* webpackChunkName: "pages/order-center/contract-manage/contract-list/list/heightSearch" */).then(m => m.default || m)
const _8f4e728a = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduceStation" */).then(m => m.default || m)
const _7a6cd4ed = () => import('../client/pages/order-center/order-manage/station-order-manage/create/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/join" */).then(m => m.default || m)
const _2e719069 = () => import('../client/pages/order-center/order-manage/station-order-manage/create/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/create/reduce" */).then(m => m.default || m)
const _67494abc = () => import('../client/pages/order-center/order-manage/general-order-manage/create/addOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/create/addOrder" */).then(m => m.default || m)
const _22f85ec9 = () => import('../client/pages/app-manage/push-manage/detail/_pushId.vue' /* webpackChunkName: "pages/app-manage/push-manage/detail/_pushId" */).then(m => m.default || m)
const _5ee00c19 = () => import('../client/pages/app-manage/coupon/detail/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/detail/_id" */).then(m => m.default || m)
const _03a17a02 = () => import('../client/pages/app-manage/steward-setting/edit/_manageId.vue' /* webpackChunkName: "pages/app-manage/steward-setting/edit/_manageId" */).then(m => m.default || m)
const _3336160a = () => import('../client/pages/order/list/detail/_orderId.vue' /* webpackChunkName: "pages/order/list/detail/_orderId" */).then(m => m.default || m)
const _7a4385ca = () => import('../client/pages/product/goods/view/_id.vue' /* webpackChunkName: "pages/product/goods/view/_id" */).then(m => m.default || m)
const _9921c52a = () => import('../client/pages/app-manage/notification-manage/detail/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/detail/_notificationId" */).then(m => m.default || m)
const _63f53b85 = () => import('../client/pages/app-manage/member-welfare/edit/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/edit/_couponId" */).then(m => m.default || m)
const _d577738a = () => import('../client/pages/product/meeting/edit/_id.vue' /* webpackChunkName: "pages/product/meeting/edit/_id" */).then(m => m.default || m)
const _12408fa4 = () => import('../client/pages/app-manage/notification-manage/edit/_notificationId.vue' /* webpackChunkName: "pages/app-manage/notification-manage/edit/_notificationId" */).then(m => m.default || m)
const _423f4201 = () => import('../client/pages/bill/payment/detail/_paymentId.vue' /* webpackChunkName: "pages/bill/payment/detail/_paymentId" */).then(m => m.default || m)
const _cbe98b04 = () => import('../client/pages/bill/list/detail/_billId.vue' /* webpackChunkName: "pages/bill/list/detail/_billId" */).then(m => m.default || m)
const _350e2de8 = () => import('../client/pages/app-manage/member-welfare/detail/_couponId.vue' /* webpackChunkName: "pages/app-manage/member-welfare/detail/_couponId" */).then(m => m.default || m)
const _6bf33b80 = () => import('../client/pages/product/goods/edit/_id.vue' /* webpackChunkName: "pages/product/goods/edit/_id" */).then(m => m.default || m)
const _03e54a0c = () => import('../client/pages/member/setting-manager/detail/_csrId.vue' /* webpackChunkName: "pages/member/setting-manager/detail/_csrId" */).then(m => m.default || m)
const _4ff0d780 = () => import('../client/pages/app-manage/icon-manage/edit/_iconId.vue' /* webpackChunkName: "pages/app-manage/icon-manage/edit/_iconId" */).then(m => m.default || m)
const _251300ac = () => import('../client/pages/bill/income/detail/_id.vue' /* webpackChunkName: "pages/bill/income/detail/_id" */).then(m => m.default || m)
const _f68a1082 = () => import('../client/pages/smart-hardware/map-depot/edit/_storageId.vue' /* webpackChunkName: "pages/smart-hardware/map-depot/edit/_storageId" */).then(m => m.default || m)
const _17ccf612 = () => import('../client/pages/app-manage/coupon/edit/_id.vue' /* webpackChunkName: "pages/app-manage/coupon/edit/_id" */).then(m => m.default || m)
const _55d28f68 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduce.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduce" */).then(m => m.default || m)
const _aed6ed10 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/reduceStation" */).then(m => m.default || m)
const _32f09990 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/join.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/join" */).then(m => m.default || m)
const _09c53210 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/renewView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/renewView" */).then(m => m.default || m)
const _de7092f6 = () => import('../client/pages/order-center/order-manage/general-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _9ed3848e = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/joinView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/joinView" */).then(m => m.default || m)
const _4ab8fa08 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/stationList.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/stationList" */).then(m => m.default || m)
const _88fc4cd2 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/renew.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/renew" */).then(m => m.default || m)
const _6a428c9f = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/replaceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/replaceView" */).then(m => m.default || m)
const _1126c2a2 = () => import('../client/pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder.vue' /* webpackChunkName: "pages/order-center/order-manage/general-order-manage/_orderEdit/editOrder" */).then(m => m.default || m)
const _073f3575 = () => import('../client/pages/order-center/order-manage/station-order-manage/_watchView/reduceView.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_watchView/reduceView" */).then(m => m.default || m)
const _a089bc84 = () => import('../client/pages/order-center/order-manage/station-order-manage/_orderEdit/replace.vue' /* webpackChunkName: "pages/order-center/order-manage/station-order-manage/_orderEdit/replace" */).then(m => m.default || m)
const _7e73c042 = () => import('../client/pages/order-center/apply-manage/_transferOperate/index.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/index" */).then(m => m.default || m)
const _0cd6c0da = () => import('../client/pages/order-center/apply-manage/_transferOperate/transformZoneInfo.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/transformZoneInfo" */).then(m => m.default || m)
const _2056b44c = () => import('../client/pages/order-center/apply-manage/_transferOperate/releaseDeposit.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/releaseDeposit" */).then(m => m.default || m)
const _7cdb6c37 = () => import('../client/pages/bill/customerAssets/_customer/basic/index.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/index" */).then(m => m.default || m)
const _5e08ce36 = () => import('../client/pages/order-center/apply-manage/_transferOperate/nonoperatingInfo.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/nonoperatingInfo" */).then(m => m.default || m)
const _17d56135 = () => import('../client/pages/bill/customerAssets/_customer/giveMoney.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/giveMoney" */).then(m => m.default || m)
const _3d61c963 = () => import('../client/pages/order-center/apply-manage/_transferOperate/operateLog.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/operateLog" */).then(m => m.default || m)
const _19ae6962 = () => import('../client/pages/smart-hardware/space-manage/_sub/son-space.vue' /* webpackChunkName: "pages/smart-hardware/space-manage/_sub/son-space" */).then(m => m.default || m)
const _47650776 = () => import('../client/pages/order-center/apply-manage/_transferOperate/transformZone.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/transformZone" */).then(m => m.default || m)
const _3b92f6a8 = () => import('../client/pages/order-center/apply-manage/_transferOperate/releaseDepositInfo.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/releaseDepositInfo" */).then(m => m.default || m)
const _194998bc = () => import('../client/pages/publicPage/make-invoice/_view/view-detail.vue' /* webpackChunkName: "pages/publicPage/make-invoice/_view/view-detail" */).then(m => m.default || m)
const _66836222 = () => import('../client/pages/order-center/apply-manage/_transferOperate/SearchForm.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/SearchForm" */).then(m => m.default || m)
const _1d5217c4 = () => import('../client/pages/order-center/apply-manage/_transferOperate/depositRent.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/depositRent" */).then(m => m.default || m)
const _66ba9b5c = () => import('../client/pages/bill/settlement-list/_billId/detail.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/detail" */).then(m => m.default || m)
const _e11972fe = () => import('../client/pages/bill/customerAssets/_customer/refunds.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/refunds" */).then(m => m.default || m)
const _773029ff = () => import('../client/pages/bill/make-invoice/_add/add-invoice.vue' /* webpackChunkName: "pages/bill/make-invoice/_add/add-invoice" */).then(m => m.default || m)
const _375627e6 = () => import('../client/pages/order-center/apply-manage/_transferOperate/SelectCustomers.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/SelectCustomers" */).then(m => m.default || m)
const _ad0d7fe2 = () => import('../client/pages/bill/customerAssets/_customer/view.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/view" */).then(m => m.default || m)
const _55972edc = () => import('../client/pages/bill/customerAssets/_customer/changeBalance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeBalance" */).then(m => m.default || m)
const _78c3c7a9 = () => import('../client/pages/order-center/apply-manage/_transferOperate/balance.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/balance" */).then(m => m.default || m)
const _039953d3 = () => import('../client/pages/bill/customerAssets/_customer/waiting.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/waiting" */).then(m => m.default || m)
const _b540d75c = () => import('../client/pages/operations-center/from-field/_watchView/view.vue' /* webpackChunkName: "pages/operations-center/from-field/_watchView/view" */).then(m => m.default || m)
const _e821e8c2 = () => import('../client/pages/bill/customerAssets/_customer/changeCommunity.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/changeCommunity" */).then(m => m.default || m)
const _6ce9663c = () => import('../client/pages/bill/customerAssets/_customer/balance.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/balance" */).then(m => m.default || m)
const _7eb9ee97 = () => import('../client/pages/order-center/apply-manage/_transferOperate/nonoperating.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/nonoperating" */).then(m => m.default || m)
const _3e728bc9 = () => import('../client/pages/order-center/apply-manage/_transferOperate/blanceEdit.1.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/blanceEdit.1" */).then(m => m.default || m)
const _5e18cd6d = () => import('../client/pages/bill/customerAssets/_customer/assets.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/assets" */).then(m => m.default || m)
const _147f5a76 = () => import('../client/pages/bill/financial-invoice/_add/view-invoice.vue' /* webpackChunkName: "pages/bill/financial-invoice/_add/view-invoice" */).then(m => m.default || m)
const _7b792c6a = () => import('../client/pages/bill/settlement-list/_billId/edit.vue' /* webpackChunkName: "pages/bill/settlement-list/_billId/edit" */).then(m => m.default || m)
const _87e8883c = () => import('../client/pages/bill/customerAssets/_customer/joinInfo.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/joinInfo" */).then(m => m.default || m)
const _7d98f9f4 = () => import('../client/pages/order-center/apply-manage/_transferOperate/blanceEdit.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/blanceEdit" */).then(m => m.default || m)
const _b05d38dc = () => import('../client/pages/order-center/apply-manage/_transferOperate/depositRentInfo.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/depositRentInfo" */).then(m => m.default || m)
const _dd22ce12 = () => import('../client/pages/order-center/apply-manage/_transferOperate/balanceInfo.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/balanceInfo" */).then(m => m.default || m)
const _82ffd2a4 = () => import('../client/pages/bill/customerAssets/_customer/spending.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/spending" */).then(m => m.default || m)
const _2893768e = () => import('../client/pages/bill/customerAssets/_customer/basic/annex.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/annex" */).then(m => m.default || m)
const _32564e4e = () => import('../client/pages/bill/customerAssets/_customer/basic/info.vue' /* webpackChunkName: "pages/bill/customerAssets/_customer/basic/info" */).then(m => m.default || m)
const _0008082b = () => import('../client/pages/order-center/apply-manage/_transferOperate/_template/editInfoTemplate.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/_template/editInfoTemplate" */).then(m => m.default || m)
const _5634cef5 = () => import('../client/pages/order-center/apply-manage/_transferOperate/_template/create.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/_template/create" */).then(m => m.default || m)
const _fea714e2 = () => import('../client/pages/order-center/apply-manage/_transferOperate/_template/createTemplate.vue' /* webpackChunkName: "pages/order-center/apply-manage/_transferOperate/_template/createTemplate" */).then(m => m.default || m)
const _60b83a80 = () => import('../client/pages/publicPage/_view/pdf-view.vue' /* webpackChunkName: "pages/publicPage/_view/pdf-view" */).then(m => m.default || m)
const _71680330 = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			path: "/nav-config",
			component: _46ada27e,
			name: "nav-config"
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
			path: "/about",
			component: _51b0286b,
			name: "about"
		},
		{
			path: "/ops",
			component: _0ec325da,
			name: "ops"
		},
		{
			path: "/facility-tags",
			component: _689462a4,
			name: "facility-tags"
		},
		{
			path: "/bill/payment",
			component: _37242e93,
			name: "bill-payment"
		},
		{
			path: "/app-manage/notification-manage",
			component: _27fa3344,
			name: "app-manage-notification-manage"
		},
		{
			path: "/bill/payrecord",
			component: _62b79974,
			name: "bill-payrecord"
		},
		{
			path: "/nav-config/getColumns",
			component: _5d8ef9c7,
			name: "nav-config-getColumns"
		},
		{
			path: "/operations-center/from-field",
			component: _a33700f6,
			name: "operations-center-from-field"
		},
		{
			path: "/bill/settlement-list",
			component: _3410ca4f,
			name: "bill-settlement-list"
		},
		{
			path: "/smarthardware/powerowner",
			component: _d4c5b5fe,
			name: "smarthardware-powerowner"
		},
		{
			path: "/Inventory/optional-inventory",
			component: _4878f877,
			name: "Inventory-optional-inventory"
		},
		{
			path: "/Inventory/discount",
			component: _3b778a46,
			name: "Inventory-discount"
		},
		{
			path: "/Inventory/slotHead",
			component: _3c31eb83,
			name: "Inventory-slotHead"
		},
		{
			path: "/community/publicFn",
			component: _c59b2434,
			name: "community-publicFn"
		},
		{
			path: "/app-manage/icon-manage",
			component: _4db586e0,
			name: "app-manage-icon-manage"
		},
		{
			path: "/Inventory/publicFn",
			component: _1eb5da8e,
			name: "Inventory-publicFn"
		},
		{
			path: "/Inventory/goods-library",
			component: _7c24fa52,
			name: "Inventory-goods-library"
		},
		{
			path: "/app-manage/push-manage",
			component: _15f3400f,
			name: "app-manage-push-manage"
		},
		{
			path: "/Inventory/over-date",
			component: _9e2eb856,
			name: "Inventory-over-date"
		},
		{
			path: "/nav-config/config-edit",
			component: _78707638,
			name: "nav-config-config-edit"
		},
		{
			path: "/Inventory/make-invoice",
			component: _4133bad4,
			name: "Inventory-make-invoice"
		},
		{
			path: "/order-center/apply-manage",
			component: _04992e80,
			name: "order-center-apply-manage"
		},
		{
			path: "/demo/wusuling",
			component: _4d112680,
			name: "demo-wusuling"
		},
		{
			path: "/basic/parameter",
			component: _7d8dbce9,
			name: "basic-parameter"
		},
		{
			path: "/community/publicPage",
			component: _4a97cb13,
			name: "community-publicPage"
		},
		{
			path: "/order/list",
			component: _36e2b2d8,
			name: "order-list"
		},
		{
			path: "/management-tool/data-monitoring",
			component: _0ccb1d02,
			name: "management-tool-data-monitoring"
		},
		{
			path: "/member/setting-manager",
			component: _0704dd90,
			name: "member-setting-manager"
		},
		{
			path: "/demo/yihao",
			component: _8abad228,
			name: "demo-yihao"
		},
		{
			path: "/app-manage/coupon",
			component: _d0e17a76,
			name: "app-manage-coupon"
		},
		{
			path: "/Inventory/rented-unpaid",
			component: _f7a6b770,
			name: "Inventory-rented-unpaid"
		},
		{
			path: "/bill/project-setting",
			component: _4faf0aae,
			name: "bill-project-setting"
		},
		{
			path: "/customer-manage/manage",
			component: _4b29c935,
			name: "customer-manage-manage"
		},
		{
			path: "/bill/income",
			component: _11047e52,
			name: "bill-income"
		},
		{
			path: "/Inventory/floor-plan",
			component: _458f70d2,
			name: "Inventory-floor-plan"
		},
		{
			path: "/basic/preferential",
			component: _230ba822,
			name: "basic-preferential"
		},
		{
			path: "/krmeetingorder/searchform",
			component: _4a99cac2,
			name: "krmeetingorder-searchform"
		},
		{
			path: "/app-manage/member-welfare",
			component: _6f73bb38,
			name: "app-manage-member-welfare"
		},
		{
			path: "/bill/financial-invoice",
			component: _9587bf94,
			name: "bill-financial-invoice"
		},
		{
			path: "/Inventory/over-date-unpaid",
			component: _49f2a41a,
			name: "Inventory-over-date-unpaid"
		},
		{
			path: "/Inventory/enter-field",
			component: _5af27e53,
			name: "Inventory-enter-field"
		},
		{
			path: "/official-website/calculator",
			component: _25adc00e,
			name: "official-website-calculator"
		},
		{
			path: "/krmeetingorder/detail",
			component: _1e223307,
			name: "krmeetingorder-detail"
		},
		{
			path: "/Inventory/Inventory-gantt-chart",
			component: _7b26dfbc,
			name: "Inventory-Inventory-gantt-chart"
		},
		{
			path: "/doorrelationship/map",
			component: _68b7ff08,
			name: "doorrelationship-map"
		},
		{
			path: "/bill/list",
			component: _26140af2,
			name: "bill-list"
		},
		{
			path: "/app-manage/home",
			component: _6e9a7d3e,
			name: "app-manage-home"
		},
		{
			path: "/Inventory/searchForm",
			component: _216b42d1,
			name: "Inventory-searchForm"
		},
		{
			path: "/bill/make-invoice",
			component: _4287c392,
			name: "bill-make-invoice"
		},
		{
			path: "/community/attract-investment",
			component: _5d6698da,
			name: "community-attract-investment"
		},
		{
			path: "/product/meeting",
			component: _6c990b3c,
			name: "product-meeting"
		},
		{
			path: "/smart-hardware/space-manage",
			component: _626e6bf0,
			name: "smart-hardware-space-manage"
		},
		{
			path: "/bill/customerAssets",
			component: _6dcde1aa,
			name: "bill-customerAssets"
		},
		{
			path: "/smart-hardware/map-depot",
			component: _4a7b0ab5,
			name: "smart-hardware-map-depot"
		},
		{
			path: "/app-manage/steward-setting",
			component: _1e9370fa,
			name: "app-manage-steward-setting"
		},
		{
			path: "/krmeeting/timeoutMeeting",
			component: _6ef480ea,
			name: "krmeeting-timeoutMeeting"
		},
		{
			path: "/smarthardware/temperaturehumiditymap",
			component: _72189d70,
			name: "smarthardware-temperaturehumiditymap"
		},
		{
			path: "/product/goods",
			component: _bf72b7d2,
			name: "product-goods"
		},
		{
			path: "/Inventory/statistical",
			component: _5e398086,
			name: "Inventory-statistical"
		},
		{
			path: "/krmeeting/timeInMeeting",
			component: _7377fd8f,
			name: "krmeeting-timeInMeeting"
		},
		{
			path: "/Inventory/daily-inventory",
			component: _8be4fc14,
			name: "Inventory-daily-inventory"
		},
		{
			path: "/smarthardware/openlog",
			component: _5ef26886,
			name: "smarthardware-openlog"
		},
		{
			path: "/demo/machaoyue",
			component: _257618e8,
			name: "demo-machaoyue"
		},
		{
			path: "/operation/community",
			component: _97c37e3c,
			name: "operation-community"
		},
		{
			path: "/bill/make-invoice/pubilcFn",
			component: _3469f6f9,
			name: "bill-make-invoice-pubilcFn"
		},
		{
			path: "/smarthardware/temperaturehumiditymap/table",
			component: _fee23378,
			name: "smarthardware-temperaturehumiditymap-table"
		},
		{
			path: "/smarthardware/temperaturehumiditymap/searchForm",
			component: _0f6d29f4,
			name: "smarthardware-temperaturehumiditymap-searchForm"
		},
		{
			path: "/Inventory/optional-inventory/optionalTable",
			component: _db231e1a,
			name: "Inventory-optional-inventory-optionalTable"
		},
		{
			path: "/Inventory/goods-library/search-form",
			component: _60cc01c9,
			name: "Inventory-goods-library-search-form"
		},
		{
			path: "/bill/income/highSearch",
			component: _35af709a,
			name: "bill-income-highSearch"
		},
		{
			path: "/Inventory/daily-inventory/dailyTable",
			component: _d98a457e,
			name: "Inventory-daily-inventory-dailyTable"
		},
		{
			path: "/bill/project-setting/public-hander",
			component: _4786225a,
			name: "bill-project-setting-public-hander"
		},
		{
			path: "/bill/list/pdfDownload",
			component: _8432a0e2,
			name: "bill-list-pdfDownload"
		},
		{
			path: "/bill/settlement-list/heightSearch",
			component: _40c60942,
			name: "bill-settlement-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage",
			component: _6e882ae2,
			name: "order-center-order-manage-station-order-manage"
		},
		{
			path: "/app-manage/icon-manage/create",
			component: _7336a02e,
			name: "app-manage-icon-manage-create"
		},
		{
			path: "/management-tool/data-monitoring/list",
			component: _96d442fe,
			name: "management-tool-data-monitoring-list"
		},
		{
			path: "/bill/project-setting/archives-management",
			component: _d9d62a8e,
			name: "bill-project-setting-archives-management"
		},
		{
			path: "/customer-manage/manage/heightSearch",
			component: _3d819b9c,
			name: "customer-manage-manage-heightSearch"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/publicFn",
			component: _f2932204,
			name: "Inventory-Inventory-gantt-chart-publicFn"
		},
		{
			path: "/app-manage/notification-manage/highSearch",
			component: _15ec300e,
			name: "app-manage-notification-manage-highSearch"
		},
		{
			path: "/bill/project-setting/archives",
			component: _502bb726,
			name: "bill-project-setting-archives"
		},
		{
			path: "/product/goods/calendar",
			component: _56c36209,
			name: "product-goods-calendar"
		},
		{
			path: "/krmeeting/timeInMeeting/searchForm",
			component: _b08699c2,
			name: "krmeeting-timeInMeeting-searchForm"
		},
		{
			path: "/order/list/highSearch",
			component: _8a43bcd0,
			name: "order-list-highSearch"
		},
		{
			path: "/bill/financial-invoice/search-from",
			component: _29d45493,
			name: "bill-financial-invoice-search-from"
		},
		{
			path: "/bill/list/antiSettlement",
			component: _88df1874,
			name: "bill-list-antiSettlement"
		},
		{
			path: "/Inventory/over-date-unpaid/slotHead",
			component: _5effdc6d,
			name: "Inventory-over-date-unpaid-slotHead"
		},
		{
			path: "/bill/payment/refund",
			component: _31ad744a,
			name: "bill-payment-refund"
		},
		{
			path: "/bill/make-invoice/list",
			component: _daa08a6e,
			name: "bill-make-invoice-list"
		},
		{
			path: "/Inventory/floor-plan/discount",
			component: _415a501e,
			name: "Inventory-floor-plan-discount"
		},
		{
			path: "/bill/project-setting/archives-detail",
			component: _503e16c7,
			name: "bill-project-setting-archives-detail"
		},
		{
			path: "/app-manage/member-welfare/highSearch",
			component: _6fe05374,
			name: "app-manage-member-welfare-highSearch"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart",
			component: _1e79abb8,
			name: "Inventory-Inventory-gantt-chart-gantt-chart"
		},
		{
			path: "/app-manage/home/activity",
			component: _5c614ad3,
			name: "app-manage-home-activity"
		},
		{
			path: "/order-center/contract-manage/contract-yard",
			component: _c68afd00,
			name: "order-center-contract-manage-contract-yard"
		},
		{
			path: "/operations-center/from-field/HeightSearch",
			component: _01df2128,
			name: "operations-center-from-field-HeightSearch"
		},
		{
			path: "/Inventory/enter-field/slotHead",
			component: _9c249fe6,
			name: "Inventory-enter-field-slotHead"
		},
		{
			path: "/doorrelationship/map/groupDetail",
			component: _d4226b2e,
			name: "doorrelationship-map-groupDetail"
		},
		{
			path: "/bill/financial-invoice/pubilcFn",
			component: _6af17538,
			name: "bill-financial-invoice-pubilcFn"
		},
		{
			path: "/app-manage/home/member",
			component: _2a474044,
			name: "app-manage-home-member"
		},
		{
			path: "/bill/project-setting/comment",
			component: _771653f9,
			name: "bill-project-setting-comment"
		},
		{
			path: "/order-center/order-manage/general-order-manage",
			component: _90c88ea4,
			name: "order-center-order-manage-general-order-manage"
		},
		{
			path: "/bill/make-invoice/search-from",
			component: _c877e458,
			name: "bill-make-invoice-search-from"
		},
		{
			path: "/app-manage/home/joinMember",
			component: _5e5512b0,
			name: "app-manage-home-joinMember"
		},
		{
			path: "/management-tool/data-monitoring/SelectCustomers",
			component: _3aae1cf4,
			name: "management-tool-data-monitoring-SelectCustomers"
		},
		{
			path: "/app-manage/push-manage/highSearch",
			component: _a1558606,
			name: "app-manage-push-manage-highSearch"
		},
		{
			path: "/bill/payment/collection",
			component: _d53f4f20,
			name: "bill-payment-collection"
		},
		{
			path: "/Inventory/floor-plan/searchForm",
			component: _3ba9d1bc,
			name: "Inventory-floor-plan-searchForm"
		},
		{
			path: "/doorrelationship/map/allEquipmentList",
			component: _4fd517a8,
			name: "doorrelationship-map-allEquipmentList"
		},
		{
			path: "/community/fixHead/attract-head",
			component: _3586805e,
			name: "community-fixHead-attract-head"
		},
		{
			path: "/basic/preferential/create",
			component: _087f9caf,
			name: "basic-preferential-create"
		},
		{
			path: "/Inventory/make-invoice/list",
			component: _0e942e8a,
			name: "Inventory-make-invoice-list"
		},
		{
			path: "/bill/payment/bind",
			component: _a23e89e8,
			name: "bill-payment-bind"
		},
		{
			path: "/Inventory/rented-unpaid/slotHead",
			component: _57b4c9f8,
			name: "Inventory-rented-unpaid-slotHead"
		},
		{
			path: "/bill/list/settleAccounts",
			component: _de785e28,
			name: "bill-list-settleAccounts"
		},
		{
			path: "/Inventory/goods-library/bind-service",
			component: _addc6756,
			name: "Inventory-goods-library-bind-service"
		},
		{
			path: "/basic/preferential/createSale",
			component: _23513bd4,
			name: "basic-preferential-createSale"
		},
		{
			path: "/Inventory/rented-unpaid/searchForm",
			component: _67b05806,
			name: "Inventory-rented-unpaid-searchForm"
		},
		{
			path: "/bill/list/waitList",
			component: _0770eb8e,
			name: "bill-list-waitList"
		},
		{
			path: "/Inventory/enter-field/searchForm",
			component: _17480cdb,
			name: "Inventory-enter-field-searchForm"
		},
		{
			path: "/smart-hardware/space-manage/editSpace",
			component: _fa34b78c,
			name: "smart-hardware-space-manage-editSpace"
		},
		{
			path: "/smart-hardware/map-depot/createdMapDepot",
			component: _34f5fb3a,
			name: "smart-hardware-map-depot-createdMapDepot"
		},
		{
			path: "/bill/list/highSearch",
			component: _1bbc4d85,
			name: "bill-list-highSearch"
		},
		{
			path: "/operations-center/from-field/NewPage",
			component: _77afcda2,
			name: "operations-center-from-field-NewPage"
		},
		{
			path: "/app-manage/coupon/create",
			component: _fbe53ece,
			name: "app-manage-coupon-create"
		},
		{
			path: "/official-website/calculator/community",
			component: _651737e0,
			name: "official-website-calculator-community"
		},
		{
			path: "/Inventory/floor-plan/publicFn",
			component: _66b838a4,
			name: "Inventory-floor-plan-publicFn"
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
			path: "/Inventory/goods-library/editGoods",
			component: _34052fec,
			name: "Inventory-goods-library-editGoods"
		},
		{
			path: "/basic/parameter/form",
			component: _00bd56fd,
			name: "basic-parameter-form"
		},
		{
			path: "/product/meeting/create",
			component: _4e3ca702,
			name: "product-meeting-create"
		},
		{
			path: "/app-manage/steward-setting/create",
			component: _48e20df8,
			name: "app-manage-steward-setting-create"
		},
		{
			path: "/bill/project-setting/project-view",
			component: _1e4fcad5,
			name: "bill-project-setting-project-view"
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
		},
		{
			path: "/Inventory/make-invoice/pubilcFn",
			component: _9ab740d0,
			name: "Inventory-make-invoice-pubilcFn"
		},
		{
			path: "/member/setting-manager/highSearch",
			component: _f4422fc8,
			name: "member-setting-manager-highSearch"
		},
		{
			path: "/smarthardware/powerowner/deviceData",
			component: _1f638d81,
			name: "smarthardware-powerowner-deviceData"
		},
		{
			path: "/Inventory/make-invoice/search-from",
			component: _2f4b0ef3,
			name: "Inventory-make-invoice-search-from"
		},
		{
			path: "/app-manage/push-manage/create",
			component: _5fade6e2,
			name: "app-manage-push-manage-create"
		},
		{
			path: "/bill/project-setting/publicFn",
			component: _1d21d3c5,
			name: "bill-project-setting-publicFn"
		},
		{
			path: "/bill/income/addIncome",
			component: _bdc381ac,
			name: "bill-income-addIncome"
		},
		{
			path: "/bill/payment/highSearch",
			component: _626e7e0e,
			name: "bill-payment-highSearch"
		},
		{
			path: "/customer-manage/manage/switchCustomer",
			component: _67ddbe5f,
			name: "customer-manage-manage-switchCustomer"
		},
		{
			path: "/order-center/apply-manage/search-from",
			component: _41d18d9d,
			name: "order-center-apply-manage-search-from"
		},
		{
			path: "/krmeeting/timeoutMeeting/searchForm",
			component: _c039deb8,
			name: "krmeeting-timeoutMeeting-searchForm"
		},
		{
			path: "/smarthardware/doormanage/devicedetail",
			component: _2933bbe6,
			name: "smarthardware-doormanage-devicedetail"
		},
		{
			path: "/customer-manage/manage/createCustomer",
			component: _e3e187b2,
			name: "customer-manage-manage-createCustomer"
		},
		{
			path: "/Inventory/over-date-unpaid/searchForm",
			component: _6efebd8a,
			name: "Inventory-over-date-unpaid-searchForm"
		},
		{
			path: "/Inventory/goods-library/fixed-head",
			component: _459c27c9,
			name: "Inventory-goods-library-fixed-head"
		},
		{
			path: "/smart-hardware/space-manage/createSpace",
			component: _1d091808,
			name: "smart-hardware-space-manage-createSpace"
		},
		{
			path: "/bill/project-setting/project-detail",
			component: _698b0041,
			name: "bill-project-setting-project-detail"
		},
		{
			path: "/smarthardware/openlog/searchForm",
			component: _183d91b1,
			name: "smarthardware-openlog-searchForm"
		},
		{
			path: "/order-center/apply-manage/list",
			component: _17d07b20,
			name: "order-center-apply-manage-list"
		},
		{
			path: "/Inventory/over-date/searchForm",
			component: _0c370899,
			name: "Inventory-over-date-searchForm"
		},
		{
			path: "/Inventory/over-date/slotHead",
			component: _2144834b,
			name: "Inventory-over-date-slotHead"
		},
		{
			path: "/bill/financial-invoice/list",
			component: _0d37fcea,
			name: "bill-financial-invoice-list"
		},
		{
			path: "/bill/payment/unbind",
			component: _16714ee5,
			name: "bill-payment-unbind"
		},
		{
			path: "/Inventory/goods-library/newgoods",
			component: _9f9fcf34,
			name: "Inventory-goods-library-newgoods"
		},
		{
			path: "/order-center/apply-manage/pubilcFn",
			component: _72b8c342,
			name: "order-center-apply-manage-pubilcFn"
		},
		{
			path: "/app-manage/notification-manage/create",
			component: _87e39fc0,
			name: "app-manage-notification-manage-create"
		},
		{
			path: "/bill/project-setting/comment/indexData",
			component: _918bbe28,
			name: "bill-project-setting-comment-indexData"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-price",
			component: _dd92d8da,
			name: "Inventory-goods-library-bulk-changes-change-price"
		},
		{
			path: "/member/setting-manager/detail/communityManage",
			component: _2ef06922,
			name: "member-setting-manager-detail-communityManage"
		},
		{
			path: "/order-center/contract-manage/contract-yard/ContractYard",
			component: _4b41244e,
			name: "order-center-contract-manage-contract-yard-ContractYard"
		},
		{
			path: "/bill/project-setting/project-detail/object-detail-title",
			component: _2565964e,
			name: "bill-project-setting-project-detail-object-detail-title"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-day",
			component: _78303ec6,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-day"
		},
		{
			path: "/bill/project-setting/comment/krCity",
			component: _74324ed4,
			name: "bill-project-setting-comment-krCity"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceList",
			component: _5a7054fc,
			name: "order-center-order-manage-station-order-manage-replaceList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/applyContract",
			component: _b9d1c4a0,
			name: "order-center-order-manage-station-order-manage-applyContract"
		},
		{
			path: "/bill/project-setting/project-detail/edit-task",
			component: _7f0bf857,
			name: "bill-project-setting-project-detail-edit-task"
		},
		{
			path: "/bill/project-setting/archives/add-archives",
			component: _5d804852,
			name: "bill-project-setting-archives-add-archives"
		},
		{
			path: "/order-center/order-manage/general-order-manage/nullify",
			component: _d51c751e,
			name: "order-center-order-manage-general-order-manage-nullify"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap",
			component: _1682aa26,
			name: "order-center-order-manage-station-order-manage-listAndMap"
		},
		{
			path: "/smart-hardware/map-depot/edit/tvCard",
			component: _eac3590c,
			name: "smart-hardware-map-depot-edit-tvCard"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-month",
			component: _7ed3f741,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-month"
		},
		{
			path: "/bill/project-setting/comment/KrInput",
			component: _3e96fd6a,
			name: "bill-project-setting-comment-KrInput"
		},
		{
			path: "/Inventory/goods-library/bulk-changes/change-status",
			component: _038a78d0,
			name: "Inventory-goods-library-bulk-changes-change-status"
		},
		{
			path: "/order-center/order-manage/station-order-manage/replaceView",
			component: _6c4bf7ee,
			name: "order-center-order-manage-station-order-manage-replaceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/nullify",
			component: _430a7aa5,
			name: "order-center-order-manage-station-order-manage-nullify"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/view-article",
			component: _cbf6d750,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-view-article"
		},
		{
			path: "/doorrelationship/map/groupDetail/editForm",
			component: _7a2fc927,
			name: "doorrelationship-map-groupDetail-editForm"
		},
		{
			path: "/order-center/order-manage/station-order-manage/errorView",
			component: _5298cd5d,
			name: "order-center-order-manage-station-order-manage-errorView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/heightSearch",
			component: _8ce12562,
			name: "order-center-order-manage-station-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/project-detail/watch-record",
			component: _0498bf20,
			name: "bill-project-setting-project-detail-watch-record"
		},
		{
			path: "/bill/project-setting/project-detail/archives-detail",
			component: _02d26c5f,
			name: "bill-project-setting-project-detail-archives-detail"
		},
		{
			path: "/doorrelationship/map/allEquipmentList/searchForm",
			component: _f3adfeb4,
			name: "doorrelationship-map-allEquipmentList-searchForm"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/color-type",
			component: _e833c124,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-color-type"
		},
		{
			path: "/order-center/order-manage/station-order-manage/reduceList",
			component: _4d180b78,
			name: "order-center-order-manage-station-order-manage-reduceList"
		},
		{
			path: "/bill/project-setting/project-detail/detail-task-list",
			component: _6ea9a4cb,
			name: "bill-project-setting-project-detail-detail-task-list"
		},
		{
			path: "/bill/project-setting/project-detail/add-task",
			component: _e456e7dc,
			name: "bill-project-setting-project-detail-add-task"
		},
		{
			path: "/bill/project-setting/comment/indexMethod",
			component: _92b736d6,
			name: "bill-project-setting-comment-indexMethod"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/draw-week",
			component: _237d6d43,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-draw-week"
		},
		{
			path: "/bill/project-setting/archives-detail/record-detail",
			component: _332b567c,
			name: "bill-project-setting-archives-detail-record-detail"
		},
		{
			path: "/order-center/order-manage/station-order-manage/joinList",
			component: _bd083ff0,
			name: "order-center-order-manage-station-order-manage-joinList"
		},
		{
			path: "/Inventory/Inventory-gantt-chart/gantt-chart/article",
			component: _f338fb48,
			name: "Inventory-Inventory-gantt-chart-gantt-chart-article"
		},
		{
			path: "/order-center/contract-manage/contract-list/list",
			component: _50d65eff,
			name: "order-center-contract-manage-contract-list-list"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList",
			component: _bd95edb4,
			name: "doorrelationship-map-groupDetail-equipmentList"
		},
		{
			path: "/bill/project-setting/project-view/add-archives",
			component: _420e1cea,
			name: "bill-project-setting-project-view-add-archives"
		},
		{
			path: "/bill/project-setting/comment/overFlowLabel",
			component: _1c34c819,
			name: "bill-project-setting-comment-overFlowLabel"
		},
		{
			path: "/bill/project-setting/project-view/renderData",
			component: _b88ca2fc,
			name: "bill-project-setting-project-view-renderData"
		},
		{
			path: "/order-center/order-manage/general-order-manage/heightSearch",
			component: _72430203,
			name: "order-center-order-manage-general-order-manage-heightSearch"
		},
		{
			path: "/bill/project-setting/comment/krSelect",
			component: _0f37d3a3,
			name: "bill-project-setting-comment-krSelect"
		},
		{
			path: "/order-center/order-manage/station-order-manage/listAndMap/list",
			component: _b5ff160c,
			name: "order-center-order-manage-station-order-manage-listAndMap-list"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/replace",
			component: _fc89657e,
			name: "order-center-order-manage-station-order-manage-create-replace"
		},
		{
			path: "/doorrelationship/map/groupDetail/equipmentList/equipmentSearch",
			component: _3fc4582a,
			name: "doorrelationship-map-groupDetail-equipmentList-equipmentSearch"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/PrintAgreement",
			component: _faba75c0,
			name: "order-center-contract-manage-contract-list-list-PrintAgreement"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/renew",
			component: _638d09da,
			name: "order-center-order-manage-station-order-manage-create-renew"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/stationList",
			component: _11cc34ff,
			name: "order-center-order-manage-station-order-manage-create-stationList"
		},
		{
			path: "/order-center/contract-manage/contract-list/list/heightSearch",
			component: _75be62dc,
			name: "order-center-contract-manage-contract-list-list-heightSearch"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduceStation",
			component: _8f4e728a,
			name: "order-center-order-manage-station-order-manage-create-reduceStation"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/join",
			component: _7a6cd4ed,
			name: "order-center-order-manage-station-order-manage-create-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/create/reduce",
			component: _2e719069,
			name: "order-center-order-manage-station-order-manage-create-reduce"
		},
		{
			path: "/order-center/order-manage/general-order-manage/create/addOrder",
			component: _67494abc,
			name: "order-center-order-manage-general-order-manage-create-addOrder"
		},
		{
			path: "/app-manage/push-manage/detail/:pushId?",
			component: _22f85ec9,
			name: "app-manage-push-manage-detail-pushId"
		},
		{
			path: "/app-manage/coupon/detail/:id",
			component: _5ee00c19,
			name: "app-manage-coupon-detail-id"
		},
		{
			path: "/app-manage/steward-setting/edit/:manageId?",
			component: _03a17a02,
			name: "app-manage-steward-setting-edit-manageId"
		},
		{
			path: "/order/list/detail/:orderId?",
			component: _3336160a,
			name: "order-list-detail-orderId"
		},
		{
			path: "/product/goods/view/:id?",
			component: _7a4385ca,
			name: "product-goods-view-id"
		},
		{
			path: "/app-manage/notification-manage/detail/:notificationId?",
			component: _9921c52a,
			name: "app-manage-notification-manage-detail-notificationId"
		},
		{
			path: "/app-manage/member-welfare/edit/:couponId?",
			component: _63f53b85,
			name: "app-manage-member-welfare-edit-couponId"
		},
		{
			path: "/product/meeting/edit/:id?",
			component: _d577738a,
			name: "product-meeting-edit-id"
		},
		{
			path: "/app-manage/notification-manage/edit/:notificationId?",
			component: _12408fa4,
			name: "app-manage-notification-manage-edit-notificationId"
		},
		{
			path: "/bill/payment/detail/:paymentId?",
			component: _423f4201,
			name: "bill-payment-detail-paymentId"
		},
		{
			path: "/bill/list/detail/:billId?",
			component: _cbe98b04,
			name: "bill-list-detail-billId"
		},
		{
			path: "/app-manage/member-welfare/detail/:couponId?",
			component: _350e2de8,
			name: "app-manage-member-welfare-detail-couponId"
		},
		{
			path: "/product/goods/edit/:id?",
			component: _6bf33b80,
			name: "product-goods-edit-id"
		},
		{
			path: "/member/setting-manager/detail/:csrId",
			component: _03e54a0c,
			name: "member-setting-manager-detail-csrId"
		},
		{
			path: "/app-manage/icon-manage/edit/:iconId?",
			component: _4ff0d780,
			name: "app-manage-icon-manage-edit-iconId"
		},
		{
			path: "/bill/income/detail/:id?",
			component: _251300ac,
			name: "bill-income-detail-id"
		},
		{
			path: "/smart-hardware/map-depot/edit/:storageId?",
			component: _f68a1082,
			name: "smart-hardware-map-depot-edit-storageId"
		},
		{
			path: "/app-manage/coupon/edit/:id",
			component: _17ccf612,
			name: "app-manage-coupon-edit-id"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduce",
			component: _55d28f68,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduce"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/reduceStation",
			component: _aed6ed10,
			name: "order-center-order-manage-station-order-manage-orderEdit-reduceStation"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/join",
			component: _32f09990,
			name: "order-center-order-manage-station-order-manage-orderEdit-join"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/renewView",
			component: _09c53210,
			name: "order-center-order-manage-station-order-manage-watchView-renewView"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:watchView?/joinView",
			component: _de7092f6,
			name: "order-center-order-manage-general-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/joinView",
			component: _9ed3848e,
			name: "order-center-order-manage-station-order-manage-watchView-joinView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/stationList",
			component: _4ab8fa08,
			name: "order-center-order-manage-station-order-manage-orderEdit-stationList"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/renew",
			component: _88fc4cd2,
			name: "order-center-order-manage-station-order-manage-orderEdit-renew"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/replaceView",
			component: _6a428c9f,
			name: "order-center-order-manage-station-order-manage-watchView-replaceView"
		},
		{
			path: "/order-center/order-manage/general-order-manage/:orderEdit?/editOrder",
			component: _1126c2a2,
			name: "order-center-order-manage-general-order-manage-orderEdit-editOrder"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:watchView?/reduceView",
			component: _073f3575,
			name: "order-center-order-manage-station-order-manage-watchView-reduceView"
		},
		{
			path: "/order-center/order-manage/station-order-manage/:orderEdit?/replace",
			component: _a089bc84,
			name: "order-center-order-manage-station-order-manage-orderEdit-replace"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?",
			component: _7e73c042,
			name: "order-center-apply-manage-transferOperate"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/transformZoneInfo",
			component: _0cd6c0da,
			name: "order-center-apply-manage-transferOperate-transformZoneInfo"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/releaseDeposit",
			component: _2056b44c,
			name: "order-center-apply-manage-transferOperate-releaseDeposit"
		},
		{
			path: "/bill/customerAssets/:customer/basic",
			component: _7cdb6c37,
			name: "bill-customerAssets-customer-basic"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/nonoperatingInfo",
			component: _5e08ce36,
			name: "order-center-apply-manage-transferOperate-nonoperatingInfo"
		},
		{
			path: "/bill/customerAssets/:customer/giveMoney",
			component: _17d56135,
			name: "bill-customerAssets-customer-giveMoney"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/operateLog",
			component: _3d61c963,
			name: "order-center-apply-manage-transferOperate-operateLog"
		},
		{
			path: "/smart-hardware/space-manage/:sub?/son-space",
			component: _19ae6962,
			name: "smart-hardware-space-manage-sub-son-space"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/transformZone",
			component: _47650776,
			name: "order-center-apply-manage-transferOperate-transformZone"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/releaseDepositInfo",
			component: _3b92f6a8,
			name: "order-center-apply-manage-transferOperate-releaseDepositInfo"
		},
		{
			path: "/publicPage/make-invoice/:view?/view-detail",
			component: _194998bc,
			name: "publicPage-make-invoice-view-view-detail"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/SearchForm",
			component: _66836222,
			name: "order-center-apply-manage-transferOperate-SearchForm"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/depositRent",
			component: _1d5217c4,
			name: "order-center-apply-manage-transferOperate-depositRent"
		},
		{
			path: "/bill/settlement-list/:billId?/detail",
			component: _66ba9b5c,
			name: "bill-settlement-list-billId-detail"
		},
		{
			path: "/bill/customerAssets/:customer/refunds",
			component: _e11972fe,
			name: "bill-customerAssets-customer-refunds"
		},
		{
			path: "/bill/make-invoice/:add?/add-invoice",
			component: _773029ff,
			name: "bill-make-invoice-add-add-invoice"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/SelectCustomers",
			component: _375627e6,
			name: "order-center-apply-manage-transferOperate-SelectCustomers"
		},
		{
			path: "/bill/customerAssets/:customer/view",
			component: _ad0d7fe2,
			name: "bill-customerAssets-customer-view"
		},
		{
			path: "/bill/customerAssets/:customer/changeBalance",
			component: _55972edc,
			name: "bill-customerAssets-customer-changeBalance"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/balance",
			component: _78c3c7a9,
			name: "order-center-apply-manage-transferOperate-balance"
		},
		{
			path: "/bill/customerAssets/:customer/waiting",
			component: _039953d3,
			name: "bill-customerAssets-customer-waiting"
		},
		{
			path: "/operations-center/from-field/:watchView?/view",
			component: _b540d75c,
			name: "operations-center-from-field-watchView-view"
		},
		{
			path: "/bill/customerAssets/:customer/changeCommunity",
			component: _e821e8c2,
			name: "bill-customerAssets-customer-changeCommunity"
		},
		{
			path: "/bill/customerAssets/:customer/balance",
			component: _6ce9663c,
			name: "bill-customerAssets-customer-balance"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/nonoperating",
			component: _7eb9ee97,
			name: "order-center-apply-manage-transferOperate-nonoperating"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/blanceEdit.1",
			component: _3e728bc9,
			name: "order-center-apply-manage-transferOperate-blanceEdit.1"
		},
		{
			path: "/bill/customerAssets/:customer/assets",
			component: _5e18cd6d,
			name: "bill-customerAssets-customer-assets"
		},
		{
			path: "/bill/financial-invoice/:add?/view-invoice",
			component: _147f5a76,
			name: "bill-financial-invoice-add-view-invoice"
		},
		{
			path: "/bill/settlement-list/:billId?/edit",
			component: _7b792c6a,
			name: "bill-settlement-list-billId-edit"
		},
		{
			path: "/bill/customerAssets/:customer/joinInfo",
			component: _87e8883c,
			name: "bill-customerAssets-customer-joinInfo"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/blanceEdit",
			component: _7d98f9f4,
			name: "order-center-apply-manage-transferOperate-blanceEdit"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/depositRentInfo",
			component: _b05d38dc,
			name: "order-center-apply-manage-transferOperate-depositRentInfo"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/balanceInfo",
			component: _dd22ce12,
			name: "order-center-apply-manage-transferOperate-balanceInfo"
		},
		{
			path: "/bill/customerAssets/:customer/spending",
			component: _82ffd2a4,
			name: "bill-customerAssets-customer-spending"
		},
		{
			path: "/bill/customerAssets/:customer/basic/annex",
			component: _2893768e,
			name: "bill-customerAssets-customer-basic-annex"
		},
		{
			path: "/bill/customerAssets/:customer/basic/info",
			component: _32564e4e,
			name: "bill-customerAssets-customer-basic-info"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/:template?/editInfoTemplate",
			component: _0008082b,
			name: "order-center-apply-manage-transferOperate-template-editInfoTemplate"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/:template?/create",
			component: _5634cef5,
			name: "order-center-apply-manage-transferOperate-template-create"
		},
		{
			path: "/order-center/apply-manage/:transferOperate?/:template?/createTemplate",
			component: _fea714e2,
			name: "order-center-apply-manage-transferOperate-template-createTemplate"
		},
		{
			path: "/publicPage/:view?/pdf-view",
			component: _60b83a80,
			name: "publicPage-view-pdf-view"
		},
		{
			path: "/",
			component: _71680330,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
