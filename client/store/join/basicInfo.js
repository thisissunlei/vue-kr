/*
* 基本信息
*/

var basicInfo = {
    state: {
        customerId: "",//客户
        communityId: "",//社区
        salerId: "",//销售员
        opportunityId: "",//机会
        floors:[]//社区楼层
    },
    mutations: {
        changeCustomer(state, val) {
            state.customerId = val;
        },
        changeCommunity(state, val) {
            state.communityId = val;
        },
        changeSaler(state, val) {
            state.salerId = val;
        },
        changeChance(state, val) {
            state.opportunityId = val;
        },
        setFloors(state, val) {
            state.floors = [].concat(val)
        },
    },
    actions: {},
    getters: {
        customerId: state => {
            return state.customerId
        },
        communityId: state => {
            return state.communityId
        },
        salerId: state => {
            return state.salerId
        },
        floors: state => {
            return state.floors
        }
    }
};
export default basicInfo;
