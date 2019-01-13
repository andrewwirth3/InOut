/*global TNS_ENV*/

import Vue from 'nativescript-vue';
import store from './store';
import './app.scss';
import './mixins';
import './plugins';
import Home from './components/Home.vue';

import VueDevtools from 'nativescript-vue-devtools';

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools);
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

new Vue({
    store,
    render: h => h(Home)
}).$start();
