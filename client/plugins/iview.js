import Vue from 'vue';
import iView from 'iview';
import http from '~/plugins/http';


import 'iview/dist/styles/iview.css'

Vue.prototype.$http = http;

Vue.use(iView);


