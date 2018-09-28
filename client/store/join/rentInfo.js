/*
* 租赁信息
*/

var rentInfo = {
    state: {
        startDate: "", //客户
        endDate: "", //社区
        signDate: "", //销售员
        timeRange: "" //机会
    },
    mutations: {
        changeStartDate(state, val) {
            state.startDate = val;
            //清空工位
            this.commit("changeSeats", []);
        },
        changeEndDate(state, val) {
            state.endDate = val;
            //清空工位
            this.commit("changeSeats", []);
        },
        changeSignDate(state, val) {
            state.signDate = val;
        },
        changeTimeRange(state, val) {
            state.timeRange = val;
        }
    },
    actions: {},
    getters: {
        startDate: state => {
            return state.startDate;
        },
        endDate: state => {
            return state.endDate;
        },
        signDate: state => {
            return state.signDate;
        },
        timeRange: state => {
            return state.timeRange;
        }
    }
};
export default rentInfo;
