import Vue from 'vue'
import Router from 'vue-router'
import HomeCandidat from './views/Candidat/HomeCandidat.vue'
import LieuxVotes from './views/Candidat/LieuxVotes/HomeLieux.vue'
import ListeRepresentant from './views/Candidat/Representant/HomeRepresentant.vue'
import ListeCandidats from './views/Candidat/ListeCandidats/HomeCandidatsListe.vue'
import ListeResultats from './views/Candidat/Resultats/HomeResultats.vue'
import Messagerie from './views/Candidat/Messagerie/HomeMessagerie.vue'
import Parametres from './views/Candidat/Parametres/HomeParametres.vue'
import HomeRepresentant from './views/Representant/HomeRepresentant.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard-candidat',
      name: 'home-candidat',
      component: HomeCandidat
    },
    {
      path: '/dashboard-representant',
      name: 'home-representant',
      component: HomeRepresentant
    },
    {
      path: '/lieux-de-votes',
      name: 'lieux-de-votes',
      component: LieuxVotes
    },
    {
      path: '/liste-representant',
      name: 'liste-representant',
      component: ListeRepresentant
    },
    {
      path: '/liste-candidats',
      name: 'liste-candidats',
      component: ListeCandidats
    },
    {
      path: '/liste-resultats',
      name: 'liste-resultats',
      component: ListeResultats
    },
    {
      path: '/messagerie',
      name: 'messagerie',
      component: Messagerie
    },
    {
      path: '/parametres',
      name: 'messagerie',
      component: Parametres
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