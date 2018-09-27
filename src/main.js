import Vue from 'nativescript-vue';
// import VueDevtools from 'nativescript-vue-devtools';

import store from './store';

import './styles.scss';
import Home from './components/Home';

import './mixins/formatters';
// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

// import Pager from 'nativescript-pager/vue';

// TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    fa: 'fontawesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
// Vue.use(VueDevtools);
// Vue.use(Pager);

new Vue({
    store,
    render: h => h(Home)
}).$start();
