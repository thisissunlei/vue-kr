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
            if (val.length==0) {
                // console.log('qingkong_seats')
                this.commit('changeRentAmount',0)
            }
            state.seats = [].concat(val);
        },
        changeRentAmount(state, val) {
            if (val==0) {
                // console.log('qingkong_rentAmount')
            }
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
