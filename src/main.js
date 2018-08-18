import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Chart from 'chart.js';

Vue.config.productionTip = false

new Vue({
  router,
  Chart,
  render: h => h(App)
}).$mount('#app')