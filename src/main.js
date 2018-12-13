import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import router from './router'
import Chart from 'chart.js';
import store from './store'

import App from './App.vue'
import VueResource from 'vue-resource';

Vue.config.productionTip = false

new Vue({
  router,
  VueResource,
  Chart,
  store,
  render: h => h(App)
}).$mount('#app')