import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from '@/App.vue'
import store from "@/store";

//Importing the main routes for the App
import routerSubDirectory from '@/router/subdirectory';
import routerSubDomain from '@/router/subdomain';

//Importing Master CSS
import "@/assets/styles/_reset.css";
import "@/assets/styles/_global.scss";
import "@/assets/styles/_framework.scss";

//Importing Mixin Functions
import GlobalFunctions from '@/mixins/Functions'
Vue.mixin(GlobalFunctions);

//Adding VueMeta for custom headers
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})

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
    uniSnapchatGhost,
    uniClock,
    uniEnvelope,
    uniPaperclip,
    uniVideo,
} from 'vue-unicons/dist/icons';
Unicon.add([uniTrashAlt, uniAngleRight, uniAngleLeft, uniLock, uniFacebookF, uniInstagram, uniWhatsapp, uniTwitter, uniYoutube, uniTimes, uniPlay, uniCheck, uniDumbbell, uniHeart, uniSnapchatGhost, uniClock, uniEnvelope, uniPaperclip, uniVideo]);
Vue.use(Unicon);

Vue.config.productionTip = false

//START: Subdomain logic
const subdomain = window.location.host.split('.')[0];
const router = () => {
    let routes;
    if (subdomain != 'www' && subdomain != 'skpr' && subdomain != 'localhost:8081') {
        store.commit("updateIsSubDomain", true);
        routes = routerSubDomain;
    } else {
        store.commit("updateIsSubDomain", false);
        routes = routerSubDirectory;
    }
    return routes;
};
//END: Subdomain logic

new Vue({
    store,
    router: router(),
    render: h => h(App),
}).$mount('#app')