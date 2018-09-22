import Vue from 'nativescript-vue';
const moment = require('moment');

Vue.mixin({
    methods: {
        $formatters_phone: function(phone) {
            /* eslint-disable-next-line no-console */
            // console.log('formatters_phone ran with ' + phone);
            if (!phone) {
                return '';
            }
            if (typeof phone != 'string') {
                phone = phone.toString();
            }
            phone = phone.replace(/\D/g, '');
            var match = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return `(${match[1]}) ${match[2]}-${match[3]}`;
            }
            return phone;
        },
        $formatters_date: function(d) {
            /* eslint-disable-next-line no-console */
            // console.log('formatters_date ran with ' + JSON.stringid);
            let m = moment(d);
            if (m.isValid()) {
                return m.format('ddd, MMM DD');
            }
            return d.toLocaleString('en-US');
        },
        $formatters_time: function(d) {
            /* eslint-disable-next-line no-console */
            //console.log('formatters_time ran with ' + d);
            let m = moment(d);
            if (m.isValid()) {
                return m.format('hh:mm a');
            }
            return '';
        },
        $formatters_sequence: function(seq) {
            /* eslint-disable-next-line no-console */
            // console.log('formatters_sequence ran with ' + seq);
            let num = seq;
            let i;
            let roman = '';
            const lookup = {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1
            };

            for (i in lookup) {
                while (num >= lookup[i]) {
                    roman += i;
                    num -= lookup[i];
                }
            }
            return roman;
        }
    }
});
