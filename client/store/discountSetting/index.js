/*
* 折扣配置添加
*/

var discountSetting = {
  state: {
    communityId: "",
    schemeType: "",
    formDiscount: {},
    currentStep:0,
    openAddModal:false
  },
  mutations: {
    changeDiscountSetting(state, val) {
      debugger
      state.formDiscount = Object.assign({},state.formDiscount, val);
      debugger
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
