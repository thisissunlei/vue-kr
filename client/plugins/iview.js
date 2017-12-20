import Vue from 'vue';
import iView from 'iview';


import http from '~/plugins/http';


Vue.prototype.$http = http;

Vue.use(iView);
