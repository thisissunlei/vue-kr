import Vue from "vue";
import Vuex from "vuex";
import basicInfo from "./join/basicInfo.js";
import rentInfo from "./join/rentInfo.js";
import amountInfo from "./join/amountInfo.js";
import perferentialInfo from './join/perferentialInfo.js'

Vue.use(Vuex);


const store = () =>
    new Vuex.Store({
        modules: {
            basicInfo,
            rentInfo,
            amountInfo,
            perferentialInfo
        }
    });

export default store;
