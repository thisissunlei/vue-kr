import Vue from 'vue';
import iView from 'iview';
import filters from '~/filters'

import http from '~/plugins/http';

Vue.prototype.$http = http;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(iView);
