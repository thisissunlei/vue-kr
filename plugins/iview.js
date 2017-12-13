import Vue from 'vue';

import iView from 'iview';

import 'iview/dist/styles/iview.css'
// import axios from './api.js';

import http from '~/plugins/http';

Vue.prototype.$http = http;

Vue.use(iView);


