import Vue from 'nativescript-vue';
import store from './store';
import './styles.scss';
import './mixins';
import './plugins';
import Home from './components/Home';

// Uncomment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
    store,
    render: h => h(Home)
}).$start();
