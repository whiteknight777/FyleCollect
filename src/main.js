import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Chart from 'chart.js';
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  Chart,
  store,
  render: h => h(App)
}).$mount('#app')