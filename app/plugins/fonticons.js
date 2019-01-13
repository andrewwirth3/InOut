import Vue from 'nativescript-vue';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.paths = {
    fa: 'fontawesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
