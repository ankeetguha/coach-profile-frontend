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

//Coach Policies
import Policy from "@/views/Policy";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:slug",
      name: "Offerings",
      component: Profile,
      meta: {
        hideHeader: true,
      },

      children: [
        {
          path: "/:slug",
          component: Offerings,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/:slug/about",
          component: About,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/:slug/links",
          component: Links,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/:slug/download",
          component: Download,
          props: true,
          meta: {
            showRouteModal: true,
          },
        },
        {
          path: "/:slug/privacy-policy",
          name: "Privacy Policy",
          component: Policy,
          meta: {
            showRouteModal: true,
          },
        }, {
            path: "/:slug/terms-of-use",
            name: "Terms Of Use",
            component: Policy,
            meta: {
              showRouteModal: true,
            },
          },
          {
            path: "/:slug/cancellation-policy",
            name: "Cancellation Policy",
            component: Policy,
            meta: {
              showRouteModal: true,
            },
          }
      ],
    },

    {
      path: "/:slug/plans/:plan",
      name: "Plan",
      component: Plan,
      meta: {
        hideHeader: true,
      },
    },
    {
      path: "/:slug/offerings/:offering",
      name: "Offering",
      component: Offering,
      meta: {
        hideHeader: true,
      },
    },
    {
      path: "/",
      beforeEnter() {
        location.href = "https://dashboard.skipperfit.com/sign-up";
      },
    },
    {
      path: "*",
      beforeEnter() {
        location.href = "https://dashboard.skipperfit.com/sign-up";
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
  },
});
