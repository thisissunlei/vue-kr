import Vue from 'vue';
import iView from 'iview';
import filters from '~/filters'

import http from '~/plugins/http';
import ajax from '@/plugins/ajax';

import store from '~/store'
Vue.use(store);

Vue.prototype.$http = http;
Vue.prototype.$ajax = ajax;
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(iView);
