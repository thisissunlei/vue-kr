/*
* 优惠信息
*/

var perferentialInfo = {
    state: {
        youhui: [],
        saleList: [],
        rentAmountSale: "",//扣除优惠后的总金额,
        preferentialError:"",//优惠输入是否有误
    },
    mutations: {
        changeYouhui(state, val) {
            state.youhui = [].concat(val);
        },
        changeSaleList(state, val) {
            state.saleList =  [].concat(val);
        },
        changeRentAmountSale(state, val) {
            state.rentAmountSale = val
        },
        changePreferentialError(state,val){
            state.preferentialError=val
        }
    },
    actions: {},
    getters: {
        youhui(state) {
            return state.youhui;
        },
        saleList(state) {
            return state.saleList;
        },
        rentAmountSale(state) {
            return state.rentAmountSale;
        },
        preferentialError(state){
            return state.preferentialError;
        }
    }
};
export default perferentialInfo;
