import Vue from 'vue'
import App from '@/App.vue'
import store from "@/store";

//Importing the main routes for the App
import router from '@/router';

//Importing Master CSS
import "@/assets/styles/_reset.css";
import "@/assets/styles/_global.scss";
import "@/assets/styles/_framework.scss";

//Importing Mixin Functions
import GlobalFunctions from '@/mixins/Functions'
Vue.mixin(GlobalFunctions);

//Adding Vue Headful for custom headers
import vueHeadful from 'vue-headful';
Vue.component('vue-headful', vueHeadful);

//Importing Font Awesome icons
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import {
  uniAngleRight,
  uniTrashAlt,
  uniLock,
  uniFacebookF,
  uniInstagram,
  uniWhatsapp,
  uniTwitter,
  uniYoutube,
  uniTimes,
  uniPlay,
  uniCheck,
  uniDumbbell,
  uniAngleLeft,
  uniHeart,
} from 'vue-unicons/dist/icons';
Unicon.add([uniTrashAlt, uniAngleRight, uniAngleLeft, uniLock, uniFacebookF, uniInstagram, uniWhatsapp, uniTwitter, uniYoutube, uniTimes, uniPlay, uniCheck, uniDumbbell, uniHeart]);
Vue.use(Unicon);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')