import Vue from 'vue';
import iView from 'iview';


import http from '~/plugins/http';
// import https from '~/plugins/axiosHttp';
// Vue.use(https);

Vue.prototype.$http = http;

Vue.use(iView);
