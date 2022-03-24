import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        coach: {},
        user: {},
        isSubDomain: false
    },
    mutations: {
        updateCoach(state, coach) {
            state.coach = coach;
        },
        updateUser(state, user) {
            state.user = user;
        },
        updateIsSubDomain(state, val) {
            state.isSubDomain = val;
        },
    },
});