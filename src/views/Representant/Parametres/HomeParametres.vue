<template>
<div>
      <!-- LEFT SIDEBAR  -->
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app width=230>
      <!-- <v-jumbotron :gradient="gradient" dark src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" style="height: 100%;"> -->

        <!-- LOGO -->
        <v-list style="padding-bottom: 0;">
          
          <v-list-tile>
              <img src="../../../assets/logo_fc_ob_411x100.png" style="border-radius: 0;margin-bottom: 5px;width: 100%"> 
          </v-list-tile>
        </v-list>
        <!-- FIN LOGO -->

        <hr class="hr-nav">

        <!-- USER CONNECTED -->
        <v-list class="">
          <v-list-tile avatar>
            <v-list-tile-avatar class="user-div">
              <div data-v-7ba5bd90="" class="v-avatar" style="width: 80px;">
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ" style="width:80px">
                 
              </div>
            </v-list-tile-avatar>
           
            <!-- <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content> -->
  
          </v-list-tile>
        </v-list>
         <p class="p-user"> 
           <b>Représentant</b> <br>
           du <b>{{userinfo.bureauRepresentant}}</b><br>
           au <b>{{userinfo.centreRepresentant}}</b> <br>
         <span style="font-size:18px"><b> {{userinfo.nomPrenoms}} </b></span>
        </p>
        <!-- FIN USER CONNECTED -->
  
  
        <!-- LEFT MENU -->
        <v-list class="pa-0">
           <v-list-tile @click="active = 1" class="" :class="{'active-item': active === 1}">
            <v-list-tile-action>
                <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <router-link to="/dashboard-representant">
              <v-list-tile-content @click="active = 1">
                <v-list-tile-title  class="" :class="{'active-color': active === 1}">
                  Tableau de bord
                </v-list-tile-title>
              </v-list-tile-content>
            </router-link>

          </v-list-tile>
        </v-list>

        
        <v-list class="pa-0">
          <v-list-tile avatar @click="addCandidatsResult">
            <v-list-tile-action>
              <v-icon> how_to_vote </v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Résultats candidats</v-list-tile-title>
            </v-list-tile-content>
  
          </v-list-tile>
        </v-list>
        
        <v-list class="pa-0">
          <v-list-tile avatar @click="addBureauResult">
            <v-list-tile-action>
              <v-icon> notes </v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Stats Bureau de vote</v-list-tile-title>
            </v-list-tile-content>
  
          </v-list-tile>
        </v-list>

        <v-list class="pa-0">
           <v-list-tile @click="active = 2" class="" :class="{'active-item': active === 2}">
            <v-list-tile-action>
                <v-icon>settings</v-icon>
            </v-list-tile-action>

            <router-link to="/parametres-representant">
              <v-list-tile-content @click="active = 2">
                <v-list-tile-title  class="" :class="{'active-color': active === 2}">
                  Parametres
                </v-list-tile-title>
              </v-list-tile-content>
            </router-link>

          </v-list-tile>
        </v-list>
        <!-- FIN LEFT MENU -->

    </v-navigation-drawer>
    <!-- END LEFT SIDEBAR  -->
  
    <!-- TOPBAR  -->
    <v-toolbar app :clipped-left="clipped" class="light-blue darken-2" dark>
  
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
  
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="fullscreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
  
      <v-spacer></v-spacer>

      <v-form>
        <v-text-field
          
          label="Recherche..."
          style="width: 200px;margin-top: 12px;"
        ></v-text-field>
      </v-form>

      <v-btn icon @click.stop="">
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>sort</v-icon>
      </v-btn>

      <v-btn icon @click.stop="checkLogout">
        <v-icon>settings_power</v-icon>
      </v-btn>

    </v-toolbar>
    <!-- END TOPBAR -->
  
    <!-- CONTENT  -->
    <v-content>
      <parametres :user="userinfo"></parametres>
    </v-content>
    <!-- END CONTENT  -->
  
    <!-- RIGHT MODAL  -->
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app width=250>

      <v-list
          subheader
          three-line
        >
          <v-subheader>User Controls</v-subheader>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict appts that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          three-line
        >
          <v-subheader>General</v-subheader>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="notifications"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="notifications = !notifications">
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="sound"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="sound = !sound">
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="widgets"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="widgets = !widgets">
              <v-list-tile-title>Auto-add widgets</v-list-tile-title>
              <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

    
    </v-navigation-drawer>
    <!-- END RIGTH MODAL  -->
     <snackbar
    v-if="snackbar" 
    :text="text"
    :y="y"
    :x="x"
    >
    </snackbar>
    <snackbar
    v-if="successForm1" 
    :text="text"
    :y="y"
    :x="x"
    >
    </snackbar>
    <snackbar
    v-if="successForm2" 
    :text="text"
    :y="y"
    :x="x"
    >
    </snackbar>

    <ValidationModal
    v-if="validation" 
    v-on:logout="logout"
    v-on:abortLogout="abortLogout">
    </ValidationModal>
   
    <FormStatCandidats 
    :userinfo="userinfo" 
    :dataTable1="dataTable1" 
    :dataTable2="dataTable2" 
    v-if="addCandidatStats === true" 
    @closeFormCandidat="closeFormCandidat" 
    @saveCandidatsDataForm="saveCandidatsDataForm">
    </FormStatCandidats>
    
    <FormStatsBureau 
    :userinfo="userinfo" 
    v-if="addBureauStats === true" 
    @closeFormBureau="closeFormBureau" 
    @saveBureauDataForm="saveBureauDataForm">
    </FormStatsBureau>

</div>  
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import parametres from "./Parametres.vue";
import ValidationModal from "../../../components/ValidationModal";
import snackbar from "../../../components/Snackbar";
import FormStatCandidats from "../../../components/FormStatCandidats";
import FormStatsBureau from "../../../components/FormStatsBureau";
import apiConfig from "../../../apiConfig";

export default {
  name: "HomeParametres",
  components: {
    ValidationModal,
    snackbar,
    FormStatCandidats,
    FormStatsBureau,
    parametres
  },
  data() {
    return {
      userinfo: this.getUserConnected(),
      open: true,
      validation: false,
      active: 2,
      addCandidatStats: false,
      addBureauStats: false,
      notifications: false,
      validation: false,
      sound: true,
      widgets: false,
      clipped: false,
      drawer: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      snackbar: false,
      successForm1: false,
      successForm2: false,
      y: "bottom",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Bienvenue dans votre interface!",
      dataGet: [],
      dataTable1: [],
      dataTable2: []
    };
  },
  methods: {
    fullscreen() {
      let elem = document.body;
      if (
        (document.fullScreenElement !== undefined &&
          document.fullScreenElement === null) ||
        (document.msFullscreenElement !== undefined &&
          document.msFullscreenElement === null) ||
        (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
        (document.webkitIsFullScreen !== undefined &&
          !document.webkitIsFullScreen)
      ) {
        if (elem.requestFullScreen) {
          elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
          elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    checkLogout() {
      this.validation = true;
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    abortLogout() {
      this.validation = false;
    },
    closeFormCandidat() {
      this.addCandidatStats = false;
      this.dataTable1 = [];
      this.dataTable2 = [];
    },
    saveCandidatsDataForm() {
      this.addCandidatStats = false;
      this.dataTable1 = [];
      this.dataTable2 = [];
      this.y = "top";
      this.x = "right";
      this.text = "Les données des candidats ont été enregistrées avec succès";
      this.successForm1 = true;
    },
    addCandidatsResult() {
      this.successForm1 = false;
      this.addCandidatStats = !this.addCandidatStats;
      let middle = this.dataGet.length / 2;
      let o = 0;
      for (let data of this.dataGet) {
        if (o < middle) {
          this.dataTable1.push({
            id: data.id,
            name: data.name,
            nbVoix: data.nbVoix
          });
        } else {
          this.dataTable2.push({
            id: data.id,
            name: data.name,
            nbVoix: data.nbVoix
          });
        }
        o++;
      }
    },
    addBureauResult() {
      this.successForm2 = false;
      this.addBureauStats = !this.addBureauStats;
    },
    closeFormBureau() {
      this.addBureauStats = false;
    },
    saveBureauDataForm() {
      this.addBureauStats = false;
      this.y = "top";
      this.x = "right";
      this.text = "Les données du bureau ont été enregistrées avec succès";
      this.successForm2 = true;
    },
    getCandidatsSuivis() {
      this.axios
        .get(apiConfig.baseURL + "get/candidats/" + this.userinfo.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;
          // console.log(data);
          let nbResult = data["nbResultat"];
          var i = 0;
          for (i; i < nbResult; i++) {
            this.dataGet.push({
              id: data["" + i + ""].idCandidat,
              name: data["" + i + ""].nomPrenom,
              nbVoix: Number
            });
          }
        });
    },
    getUserConnected() {
      return JSON.parse(sessionStorage.getItem("userConnected"));
    }
  },
  mounted() {
    // let userinfo = this.getUserConnected();
    if (this.userinfo === null) {
      this.router.push("/");
    } else {
      this.getCandidatsSuivis();
    }
  }
};
</script>

<style>
.jumbotron__wrapper {
  height: 100%;
  overflow: hidden;
  position: relative;
  -webkit-transition: inherit;
  transition: inherit;
  width: 100%;
}
.hr-nav {
  margin: 5px 12px;
  border: 0.5px solid #e64a2b;
}
.user-div {
  border: 14px solid #e64a2b;
  padding: 8px;
  display: inline-block;
  border-radius: 90px;
  margin-top: 28px;
  margin-left: 60px;
}
.p-user {
  margin-top: 30px;
  text-align: center;
  margin-left: 5px;
}
.active-item {
  background: #e64a19;
  color: white;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
}
.v-list__group__header .v-list__group__header__append-icon,
.v-list__group__header .v-list__group__header__prepend-icon {
  padding: 0 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  right: 0;
}
::-webkit-scrollbar {
  /* Scrollbars */
  width: 7px;
  background: #b7b7b7;
  -webkit-box-shadow: inset 1px 1px 0 0 rgb(137, 131, 117),
    inset -1px -1px 0 0 rgb(224, 220, 210);
}
::-webkit-scrollbar-thumb:hover {
  /* Barre */
  -webkit-box-shadow: inset 0 0 0 1px rgb(90, 90, 90),
    inset 0 0 0 6px rgb(110, 110, 110);
  border-radius: 3px;
}
.card-icon-block {
  position: absolute;
  left: 15px;
  padding: 14px;
  top: -10px;
  box-shadow: 2px 2px #ddd;
}

.active-color {
  color: white !important;
}
.number-card {
  color: #4caf50 !important;
  font-size: 30px;
  font-weight: 600;
}
.container {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
  margin: auto;
  padding: 24px;
  width: 101%;
}
.active-sub-item {
  background: #efefef;
  border-left: 10px solid dimgray;
}
a {
  color: #212121 !important;
  text-decoration: none;
}
</style>
