import Vue from 'vue';
import VueRouter from 'vue-router';

//Import the various views
import Profile from '@/views/Profile';
import Plans from '@/views/Plans/Plans';
import Plan from '@/views/Plans/Plan';
import About from '@/views/About';
import Links from '@/views/Links';

Vue.use(VueRouter);

const routes = [{
        path: '/:slug',
        name: 'Plans',
        component: Profile,
        meta: {
            hideHeader: true
        },

        children: [{
            path: '/:slug',
            component: Plans,
            props: true,
            meta: {
                showRouteModal: true
            }
        }, {
            path: '/:slug/about',
            component: About,
            props: true,
            meta: {
                showRouteModal: true
            }
        }, {
            path: '/:slug/links',
            component: Links,
            props: true,
            meta: {
                showRouteModal: true
            }
        }]
    },

    {
        path: '/:slug/plans/:plan',
        name: 'Plan',
        component: Plan,
        meta: {
            hideHeader: true
        }
    },
    {
        path: "/",
        beforeEnter() {
            location.href = 'https://coach.skipperfit.com/sign-up'
        }
    },
    {
        path: "*",
        beforeEnter() {
            location.href = 'https://coach.skipperfit.com/sign-up'
        }
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