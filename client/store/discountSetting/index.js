/*
* 折扣配置添加
*/

var discountSetting = {
  state: {
    communityId: "",
    schemeType: "",
    formDiscount: {},
    currentStep:0
  },
  mutations: {
    changeDiscountSetting(state, val) {
      state.formDiscount = Object.assign({},state.formDiscount, val);
    },
    changeStep(state, val) {
      state.currentStep = val
    },
    changeSchemeType(state, val) {
      state.formDiscount.schemeType = val
    },
    changeCommunityId(state, val) {
      state.formDiscount.communityId = val
    }
  },
  actions: {},
  getters: {
    formDiscount: state => {
      return state.formDiscount;
    },
    currentStep: state => {
      return state.currentStep;
    }
  }
};
export default discountSetting;
