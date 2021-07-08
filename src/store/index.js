import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        coach: {
            fullName: null,
            email: null,
            groups: [],
            loggedIn: false
        },
    },
    mutations: {
        updateCoach(state, coach) {
            state.coach.fullName = coach.fullName;
            state.coach.email = coach.email;
            state.coach.groups = coach.groups;
            state.coach.loggedIn = coach.loggedIn;
        },
    },
});