/*
* 优惠信息
*/

var perferentialInfo = {
    state: {
        youhui: [],
        saleList: [],
        rentAmountSale: ""//扣除优惠后的总金额
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
        }
    }
};
export default perferentialInfo;
