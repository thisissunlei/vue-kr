/*
* 租赁信息
*/

var amountInfo = {
    state: {
        seats:[]
    },
    mutations: {
        changeSeats(state, val) {
            state.startDate =[].concat(val)
        }
    },
    actions: {},
    getters: {
        seats: state => {
            return state.seats;
        }
    }
};
export default amountInfo;
