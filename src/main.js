import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import router from './router'
import Chart from 'chart.js';
import store from './store'
// import axios from './axios'
// import VueAxios from 'vue-cli-plugin-axios'

import App from './App.vue'

// Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  Chart,
  store,
  render: h => h(App)
}).$mount('#app')