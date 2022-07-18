import Vue from "vue";
import VueRouter from "vue-router";

//Import the various views
import Profile from "@/views/Profile";
import Offerings from "@/views/Offerings/Offerings";
import Plan from "@/views/Offerings/Plan";
import Offering from "@/views/Offerings/Offering";
import About from "@/views/About";
import Links from "@/views/Links";
import Download from "@/views/Download";

//Transactions
import TransactionSuccess from "@/views/Transaction/Success";
import TransactionCancel from "@/views/Transaction/Cancel";

//Coach Policies
import Policy from "@/views/Policy";
import Contact from "@/views/Contact";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Offerings",
      component: Profile,
      meta: {
        hideHeader: true,
      },

      children: [
        {
          path: "/",
          component: Offerings,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/about",
          component: About,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/links",
          component: Links,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/download",
          component: Download,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/contact",
          component: Contact,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/transaction-success/:sessionID?",
          component: TransactionSuccess,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/transaction-failure",
          component: TransactionCancel,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/privacy-policy",
          name: "Privacy Policy",
          component: Policy,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/terms-of-use",
          name: "Terms Of Use",
          component: Policy,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/cancellation-policy",
          name: "Cancellation Policy",
          component: Policy,
          meta: {
            showRouteModal: true,
          },
        },
      ],
    },

    {
      path: "/plans/:plan",
      name: "Plan",
      component: Plan,
      meta: {
        hideHeader: true,
      },
    },
    {
      path: "/offerings/:offering",
      name: "Offering",
      component: Offering,
      meta: {
        hideHeader: true,
      },
    },
    {
      path: "/",
      beforeEnter() {
        location.href = "https://app.skipperfit.com/sign-up";
      },
    },
    {
      path: "*",
      beforeEnter() {
        location.href = "https://app.skipperfit.com/sign-up";
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
  },
});
