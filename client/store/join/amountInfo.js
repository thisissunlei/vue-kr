/*
* 选择工位 金额信息
*/

var amountInfo = {
    state: {
        seats: [],
        rentAmount: ""//总金额
    },
    mutations: {
        changeSeats(state, val) {
            state.seats = [].concat(val);
        },
        changeRentAmount(state, val) {
            state.rentAmount = val;
        }
    },
    actions: {},
    getters: {
        seats(state) {
            return [].concat(state.seats);
        },
        stationList(state) {
            return [].concat(state.seats);
        },
        rentAmount(state) {
            return state.rentAmount;
        }
    }
};
export default amountInfo;
