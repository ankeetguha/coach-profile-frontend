import Vue from 'vue';
import VueRouter from 'vue-router';

//Import the various views
import Profile from '@/views/Profile';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Profile',
        component: Profile,
        meta: {
            hideHeader: true
        }
    },

    {
        path: "*",
        redirect: '/404',
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

export default router;