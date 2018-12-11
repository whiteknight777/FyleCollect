import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import router from './router'
import Chart from 'chart.js';
import store from './store'
// import VueAxios from 'vue-cli-plugin-axios'

import App from './App.vue'
import VueResource from 'vue-resource';
// router.beforeEach((to, from, next) => {
//   let current_route = router.history.current.path
//   let userSession = JSON.parse(localStorage.getItem("userConnected"))
//   if (userSession != null) {
//     console.log('ok')
//     next()
//   } else {
//     // console.log('oooh ohh')
//     router.push("/");
//   }

// })

Vue.config.productionTip = false

new Vue({
  router,
  VueResource,
  Chart,
  store,
  render: h => h(App)
}).$mount('#app')