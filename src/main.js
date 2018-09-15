import Vue from 'nativescript-vue';

import store from './store';

import './styles.scss';
import Home from './components/Home';

// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

// TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    fa: 'fontawesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
    store,
    render: h => h(Home)
}).$start();
