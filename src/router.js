import Vue from 'vue'
import Router from 'vue-router'
import HomeCandidat from './views/Candidat/HomeCandidat.vue'
import HomeRepresentant from './views/Representant/HomeRepresentant.vue'
import HomeMessagerie from './views/Candidat/Messagerie/HomeMessagerie.vue'
import SmsRepresentant from './views/Representant/SmsRepresentant.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      name: 'login',
      // beforeEnter: checkUser,
      component: Login
    },
    {
      path: '/dashboard-candidat',
      name: 'home-candidat',
      // beforeEnter: checkUser,
      component: HomeCandidat
    },
    {
      path: '/dashboard-representant',
      name: 'home-representant',
      // beforeEnter: checkUser,
      component: HomeRepresentant
    },
    {
      path: '/historique-sms',
      name: 'historique-sms',
      // beforeEnter: checkUser,
      component: SmsRepresentant
    },
    {
      path: '/messagerie',
      name: 'messagerie',
      // beforeEnter: checkUser,
      component: HomeMessagerie
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/*',
      redirect: '/404'
    }
  ]
})

// function checkUser() {
// //   let current_route = router.history.current.path
//   let userSession = JSON.parse(sessionStorage.getItem("userConnected"))
//   if (userSession === null) {
//     console.log('erreur')
//     // this.router.push("/");
//   } else {
//     console.log(userSession)
//   }
// }