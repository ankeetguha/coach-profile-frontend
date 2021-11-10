import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        coach: {},
        isSubDomain: false
    },
    mutations: {
        updateCoach(state, coach) {
            state.coach = coach;
        },
        updateIsSubDomain(state, val) {
            state.isSubDomain = val;
        },
    },
});