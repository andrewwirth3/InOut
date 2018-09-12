import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import inout from './modules/inout';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    modules: {
        inout
    },
    strict: debug
});

Vue.prototype.$store = store;

module.exports = store;
