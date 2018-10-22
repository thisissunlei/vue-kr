/*
* 折扣配置添加
*/

var discountSetting = {
  state: {
    communityId: "",//社区
    schemeType: "",//折扣方案 [按商品Goods,安社区Community]
    formDiscount: {},//所设置的优惠信息 {有效期间,不通权限对应的折扣,...}
    currentStep:0,//当前的步骤
    openAddModal:false//折扣添加模态窗的打开状态
  },
  mutations: {
    changeDiscountSetting(state, val) {
      state.formDiscount = Object.assign({},state.formDiscount, val);
    },
    resetDiscountSetting(state, val) {
      state.formDiscount = {}
    },
    changeStep(state, val) {
      state.currentStep = val
    },
    changeSchemeType(state, val) {
      state.formDiscount.schemeType = val
    },
    changeCommunityId(state, val) {
      state.formDiscount.communityId = val
    },
    changeModalState(state, val) {
      state.openAddModal = val
      state.formDiscount = {}
    },
  },
  actions: {},
  getters: {
    formDiscount: state => {
      return state.formDiscount;
    },
    currentStep: state => {
      return state.currentStep;
    },
    openAddModal: state => {
      return state.openAddModal;
    }
  }
};
export default discountSetting;
