"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Profile = _interopRequireDefault(require("@/views/Profile"));

var _Plans = _interopRequireDefault(require("@/views/Plans/Plans"));

var _Plan = _interopRequireDefault(require("@/views/Plans/Plan"));

var _About = _interopRequireDefault(require("@/views/About"));

var _Links = _interopRequireDefault(require("@/views/Links"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Import the various views
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/:slug',
  name: 'Plans',
  component: _Profile["default"],
  meta: {
    hideHeader: true
  },
  children: [{
    path: '/:slug',
    component: _Plans["default"],
    props: true,
    meta: {
      showRouteModal: true
    }
  }, {
    path: '/:slug/about',
    component: _About["default"],
    props: true,
    meta: {
      showRouteModal: true
    }
  }, {
    path: '/:slug/links',
    component: _Links["default"],
    props: true,
    meta: {
      showRouteModal: true
    }
  }]
}, {
  path: '/:slug/plans/:plan',
  name: 'Plan',
  component: _Plan["default"],
  meta: {
    hideHeader: true
  }
}, {
  path: "/",
  beforeEnter: function beforeEnter() {
    location.href = 'https://coach.skipperfit.com/sign-up';
  }
}, {
  path: "*",
  beforeEnter: function beforeEnter() {
    location.href = 'https://coach.skipperfit.com/sign-up';
  }
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
var _default = router;
exports["default"] = _default;