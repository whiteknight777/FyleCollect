<template>
<div>
  <div class="loading" v-if="loadingPage === true">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
      style="position:fixed; margin-left:540px; margin-top:270px"
    ></v-progress-circular>
  </div>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <!--  Stat bar -->
          <v-flex xs12 md12 lg12>
            <v-breadcrumbs divider="/" style="margin-bottom:20px">
              <v-breadcrumbs-item
                :disabled="true"
              >
                Tableau de bord
              </v-breadcrumbs-item>
              <v-breadcrumbs-item
                :disabled="false"
              >
                Liste candidats
              </v-breadcrumbs-item>
              
            </v-breadcrumbs>

            <template>
              <v-tabs
                centered
                color="blue-grey lighten-4"
                dark
                icons-and-text
              >
                <v-tabs-slider color="teal darken-4"></v-tabs-slider>

                <v-tab href="#tab-1">
                  Candidats de la commune
                  <v-icon>group</v-icon>
                </v-tab>

                <v-tab href="#tab-2" light>
                  Candidats Suivis
                  <v-icon>stars</v-icon>
                </v-tab>

                <v-tab href="#tab-3" dark>
                  Classement Candidats
                  <v-icon>account_box</v-icon>
                </v-tab>

                <v-tab-item id="tab-1">
                  <v-card >

                    <table class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left">#</th>
                          <th class="text-xs-left">Nom & prénoms</th>
                          <th class="text-xs-left">Partis</th>
                          <th class="text-xs-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item of listeCandidat">
                          <td class="text-xs-left">
                            <v-icon large>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.nomprenom }}</td>
                          <td class="text-xs-left">{{ item.parti }}</td>
                          <td class="text-xs-left">
                          <v-btn 
                            small
                            ripple
                            fab
                            color="orange lighten-1"
                            dark
                            v-if="item.suivi === true && item.nomprenom !== user.nomPrenoms"
                            @click="[getIdCandidat(item.id), notFollow = true]">
                            <v-icon
                            >
                              grade
                            </v-icon>
                            </v-btn>
                            <v-btn 
                            small
                            ripple
                            fab
                            color="blue-grey lighten-1"
                            dark
                            v-if="item.suivi === false && item.nomprenom !== user.nomPrenoms"
                            @click="[getIdCandidat(item.id), suivre = true]">
                            <v-icon
                            >
                              grade
                            </v-icon>
                            </v-btn>
                        </td>
                        </tr>
                      </tbody>
                    </table>


                  </v-card>

                </v-tab-item>

                <v-tab-item id="tab-2">
                  <v-card >
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn 
                      small
                      ripple
                      color="green lighten-1"
                      dark
                      v-if="changeOrder === true"
                      @click="changeOrderCandidat">
                      <v-icon
                      >
                        save
                      </v-icon>
                     Enregistrer le nouvel ordre
                      </v-btn>
                    </v-card-title>

                    <form id="changeOrder">
                      <table class="v-datatable v-table">
                        <thead>
                          <tr>
                            <th class="text-xs-left">#</th>
                            <th class="text-xs-left">Nom & prénoms</th>
                            <th class="text-xs-left">Partis</th>
                            <th class="text-xs-left">Ordre</th>
                            <th class="text-xs-left" width="180px">Modifier ordre</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr :key="i" v-for="(item, i) of CandidatSuivis" @mouseover="updateRank = i">
                            <td class="text-xs-left">
                              <v-icon large>person_pin</v-icon>
                            </td>
                            <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.nomprenom }}</td>
                            <td class="text-xs-left">{{ item.parti }}</td>
                            <td class="text-xs-left">{{ item.ordre }}</td>
                            <td class="text-xs-left">
                              <v-btn 
                              small
                              ripple
                              fab
                              color="green lighten-1"
                              dark
                              v-if="promote === true && updateRank === i"
                              @click="promoteCandidat(i)">
                              <v-icon
                              >
                                expand_less
                              </v-icon>
                              </v-btn>

                              <v-btn 
                              small
                              ripple
                              fab
                              color="red lighten-1"
                              dark
                              v-if="demote === true && updateRank === i"
                              @click="demoteCandidat(i)">
                              <v-icon
                              >
                                expand_more
                              </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </v-card>

                </v-tab-item>

                <v-tab-item id="tab-3">
                  <v-card >
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-menu offset-y style="position: relative;right: 15px;top: 5px;">
                        <v-btn
                          slot="activator"
                          color="primary"
                          dark
                        >
                          Filtres
                        </v-btn>
                        <v-list>
                          <v-list-tile
                            @click="checkTypeData(false)"
                          >
                            <v-list-tile-title>Données brutes</v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile
                            @click="checkTypeData(true)"
                          >
                            <v-list-tile-title>Données validées</v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </v-card-title>
                    
                    <table class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left">#</th>
                          <th class="text-xs-left">Nom & prénoms</th>
                          <th class="text-xs-left">Partis</th>
                          <th class="text-xs-left">Pourcentage voix</th>
                          <th class="text-xs-left">Classement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) of ClassementCandidat" :key="i">
                          <td class="text-xs-left">
                            <v-icon large>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.nomprenom }}</td>
                          <td class="text-xs-left">{{ item.partis }}</td>
                          <td class="text-xs-left">
                            <span>
                            <v-spacer></v-spacer>
                            {{item.voix}} %
                            <v-spacer></v-spacer>
                            </span>
                            <v-progress-linear :aria-label="item.voix+'%'" v-model="item.voix" color="green" v-if="item.classement === 1"></v-progress-linear>
                            <v-progress-linear :aria-label="item.voix+'%'" v-model="item.voix" color="amber" v-else-if="item.classement === 2"></v-progress-linear>
                            <v-progress-linear :aria-label="item.voix+'%'" v-model="item.voix" color="red" v-else></v-progress-linear>
                          </td>
                          <td class="text-xs-left">
                            <!-- {{ item.classement }} -->
                            <b v-if="item.classement === 1" style="font-size: 14px;float:left;margin-left: -5px;color:green">{{item.classement}}</b>
                            <b v-else-if="item.classement === 2" style="font-size: 14px;float: left;margin-left: -4px;color:orange">{{item.classement}}</b>
                            <b v-else style="font-size: 14px;float: left;margin-left: -4px;color:red">{{item.classement}}</b>
                            <small v-if="item.classement === 1" style="font-size: 10px;text-transform: lowercase;position: absolute;color:green">er</small>
                            <small v-else-if="item.classement === 2" style="font-size: 10px;text-transform: lowercase;position: absolute;margin-top: 1px;color:orange">ème</small>
                            <small v-else style="font-size: 10px;text-transform: lowercase;position: absolute;margin-top: 1px;color:red">ème</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </v-card>

                   
                </v-tab-item>
              </v-tabs>
            </template>
          </v-flex>


          <!-- SUIVRE CANDIDAT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="suivre"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment suivre ce candidat ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de suivre ce candidat vous acceptez d'enregistrer ses données de votes ?
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="suivre = false"
                    >
                      retour
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="confirmerSuivis"
                    >
                      Confirmer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>

          <!-- ANNULER SUIVIS D'UN CANDIDAT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="notFollow"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Renoncez-vous vraiment à suivre ce candidat ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En renonçant à suivre ce candidat vous acceptez de ne plus enregistrer ses données de votes ?
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="notFollow = false"
                    >
                      retour
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="annulerSuivis"
                    >
                      Confirmer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>

          <!-- MODIFIER ORDRE CANDIDAT  -->

          <!-- <template>
            <v-layout row justify-center>
              <v-dialog v-model="changeOrder" persistent max-width="420px">
                <form id="changeOrderCandidat">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modifier ordre candidats</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                           <v-combobox
                              v-model="NewOrderCandidatSuivis"
                              :items="OrdreCandidatSuivis"
                              label="Candidats Suivis"
                              chips
                              clearable
                              prepend-icon="account_circle"
                              multiple
                            >
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                  close
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="changeOrder = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="changeOrderCandidat" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template> -->

          <snackbar
          v-if="snackbar" 
          :text="text"
          :y="y"
          :x="x"
          >
          </snackbar>

        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "ListeCandidats",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      notFollow: false,
      updateRank: null,
      suivre: false,
      promote: false,
      demote: false,
      valider: false,
      checked: 0,
      created: 0,
      clickDonneesBrute: false,
      clickDonneesValide: false,
      load: 0,
      checkValide: "",
      checkBrute: "",
      oldClassement: [],
      loadingPage: false,
      changeOrder: false,
      addCentre: false,
      nbCandidatSuivi: null,
      idCandidat: "",
      updateRepresentant: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loader: null,
      loading: false,
      clear: false,
      search: "",
      listeCandidat: [],
      CandidatSuivis: [],
      ClassementCandidat: [],
      OrdreCandidatSuivis: [],
      NewOrderCandidatSuivis: []
    };
  },
  methods: {
    getCandidatInfo() {
      this.loadingPage = true;
      this.axios
        .get(localDomain + "candidat/info/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.listeCandidat = data.listeCandidat;
            this.CandidatSuivis = data.candidatSuivis;

            for (let item of this.CandidatSuivis) {
              this.OrdreCandidatSuivis.push(item.nomprenom);
            }
            this.NewOrderCandidatSuivis = this.OrdreCandidatSuivis;
          }
        });
    },
    annulerSuivis() {
      this.snackbar = false;
      this.notFollow = false;
      this.loadingPage = true;
      this.axios
        .get(
          localDomain +
            "candidat/annuler/suivis/" +
            this.user.idClient +
            "/" +
            this.idCandidat,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Recherchons le candidat non suivis
            // Modifions ses valeures
            this.listeCandidat.filter(e => {
              if (e.id === this.idCandidat) {
                e.suivi = false;
              }
            });

            // Mettons à jour la liste des candidats suivis
            this.CandidatSuivis = [];
            this.OrdreCandidatSuivis = [];
            this.NewOrderCandidatSuivis = [];
            this.CandidatSuivis = data.candidatSuivis;

            for (let item of this.CandidatSuivis) {
              this.OrdreCandidatSuivis.push(item.nomprenom);
            }
            this.NewOrderCandidatSuivis = this.OrdreCandidatSuivis;

            this.loadingPage = false;
            this.text = "Modification(s) enregistrée(s)";
            this.snackbar = true;
          }
        });
    },
    confirmerSuivis() {
      this.snackbar = false;
      this.suivre = false;
      this.loadingPage = true;
      this.axios
        .get(
          localDomain +
            "candidat/suivis/new/" +
            this.user.idClient +
            "/" +
            this.idCandidat,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Recherchons le candidat non suivis
            // Modifions ses valeures
            this.listeCandidat.filter(e => {
              if (e.id === this.idCandidat) {
                e.suivi = true;
              }
            });

            this.OrdreCandidatSuivis = [];
            this.NewOrderCandidatSuivis = [];
            // Supprimons ce candidat de la liste des candidats suivis
            this.CandidatSuivis.push(data.newCandidatSuivi);

            // Rechargeons l'ordre des candidats
            for (let item of this.CandidatSuivis) {
              this.OrdreCandidatSuivis.push(item.nomprenom);
            }
            this.NewOrderCandidatSuivis = this.OrdreCandidatSuivis;

            this.loadingPage = false;
            this.text = "Modification(s) enregistrée(s)";
            this.snackbar = true;
          }
        });
    },
    getIdCandidat(idCandidat) {
      this.idCandidat = idCandidat;
    },
    promoteCandidat(i) {
      // Récupérons le candidat à faire monter au rang supérieur
      let candidatUp = this.CandidatSuivis[i];
      let oldDataUp = candidatUp.ordre;

      // Récupérons le candidat à faire dessendre au rang inférieur
      let candidatDown = this.CandidatSuivis[i - 1];
      let oldDataDown = candidatDown.ordre;

      // Remplaçons les rangs
      candidatUp.ordre = oldDataDown;
      candidatDown.ordre = oldDataUp;

      //Remplaçons les deux candidats
      this.CandidatSuivis.splice(i - 1, 1, candidatUp);
      this.CandidatSuivis.splice(i, 1, candidatDown);
      this.changeOrder = true;
    },

    demoteCandidat(i) {
      // Récupérons le candidat à faire dessendre au rang inférieur
      let candidatDown = this.CandidatSuivis[i + 1];
      let oldDataDown = candidatDown.ordre;

      // Récupérons le candidat à faire monter au rang supérieur
      let candidatUp = this.CandidatSuivis[i];
      let oldDataUp = candidatUp.ordre;

      // Remplaçons les rangs
      candidatUp.ordre = oldDataDown;
      candidatDown.ordre = oldDataUp;

      //Remplaçons les deux candidats
      this.CandidatSuivis.splice(i, 1, candidatDown);
      this.CandidatSuivis.splice(i + 1, 1, candidatUp);
      this.changeOrder = true;
    },
    changeOrderCandidat() {
      this.snackbar = false;
      this.suivre = false;
      this.loadingPage = true;

      let form = document.getElementById("changeOrder");
      let data = new FormData(form);
      // Envoyons l'Id du client
      data.append("idClient", this.user.idClient);
      // Envoyons le tableau de candidat suivis
      for (let a = 0; a < this.CandidatSuivis.length; a++) {
        data.append("candidatSuivis[]", JSON.stringify(this.CandidatSuivis[a]));
      }
      this.axios
        .post(localDomain + "candidat/change/ordre", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.loadingPage = false;
            this.text = "Votre nouvel ordre à été enregistré avec succès";
            this.snackbar = true;
          }
        });
    },
    refreshData() {
      this.loader = "loading";
    },
    checkCandidat() {
      if (this.updateRank !== 0 && this.updateRank !== 1) {
        this.promote = true;
      } else {
        this.promote = false;
      }
      if (
        this.updateRank !== 0 &&
        this.updateRank !== this.nbCandidatSuivi - 1
      ) {
        this.demote = true;
      } else {
        this.demote = false;
      }
    },
    checkTypeData(value) {
      // console.log(valider);
      if (value === true) {
        if (this.clickDonneesValide === false) {
          this.loadingPage = true;
          this.valider = true;
          this.load = 0;
          window.clearInterval(this.checkBrute);
          this.checkValide = setInterval(this.getDataStatsValide, 3000);
          this.clickDonneesValide = true;
          this.clickDonneesBrute = false;
        }
      } else {
        if (this.clickDonneesBrute === false) {
          this.loadingPage = true;
          this.valider = false;
          this.load = 0;
          window.clearInterval(this.checkValide);
          this.checkBrute = setInterval(this.getDataStatsBrute, 3000);
          this.clickDonneesBrute = true;
          this.clickDonneesValide = false;
        }
      }
    },
    getDataStatsBrute() {
      // Récupération des données des candidats suivis
      this.axios
        .get(
          localDomain +
            "api/statistiques/candidat/" +
            this.user.idCandidat +
            "/brute",
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          // Récupérons la reponse renvoyée
          let data = response.data;
          // Récupérons la nombre de données récupérées
          let classement = data.classement;

          // Vérifions le status de la requete
          // Success de la requete
          if (data.statusRequete == 100) {
            //############## Renseignons les éléments du classement #################
            // Récupérons les 3 premiers candidats
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldClassement.length === 0 && this.checked === 0) {
              for (let step = 0; step < classement.length; step++) {
                // Recherchons le partis du candidat
                let el = this.CandidatSuivis.filter(e => {
                  if (e.nomprenom === classement[step].nomPrenom) return e;
                });
                let parti = el[0].parti;
                // Donnée des candidats
                this.oldClassement.push({
                  nomprenom: classement[step].nomPrenom,
                  partis: parti,
                  voix: classement[step].pourcentageVoix,
                  classement: step + 1
                });
              }

              // Mettons à jours la variable permettant d'afficher le classement
              this.ClassementCandidat = [];
              this.ClassementCandidat = this.oldClassement;
            } else {
              // Vérifions si le classement est toujour le même avant de mettre à jour le classement
              if (
                this.oldClassement[0].voix !== classement[0].pourcentageVoix
              ) {
                this.oldClassement = [];
                // Modifions les anciènnes valeures
                for (let step = 0; step < classement.length; step++) {
                  // Recherchons le partis du candidat
                  let el = this.CandidatSuivis.filter(e => {
                    if (e.nomprenom === classement[step].nomPrenom) return e;
                  });
                  let parti = el[0].parti;

                  // Donnée des candidats
                  this.oldClassement.push({
                    nomprenom: classement[step].nomPrenom,
                    partis: parti,
                    voix: classement[step].pourcentageVoix,
                    classement: step + 1
                  });
                }

                // Mettons à jours la variable permettant d'afficher le classement
                this.ClassementCandidat = [];
                this.ClassementCandidat = this.oldClassement;
              }
            }

            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
            this.loadingPage = false;
          }
        });

      this.load = 1;
    },

    getDataStatsValide() {
      // Récupération des données des candidats suivis
      this.axios
        .get(
          localDomain +
            "api/statistiques/candidat/" +
            this.user.idCandidat +
            "/valide",
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          // Récupérons la reponse renvoyée
          let data = response.data;
          // Récupérons la nombre de données récupérées
          let classement = data.classement;

          // Vérifions le status de la requete
          // Success de la requete
          if (data.statusRequete == 100) {
            //############## Renseignons les éléments du classement #################
            // Récupérons les 3 premiers candidats
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldClassement.length === 0 && this.checked === 0) {
              for (let step = 0; step < classement.length; step++) {
                // Recherchons le partis du candidat
                let el = this.CandidatSuivis.filter(e => {
                  if (e.nomprenom === classement[step].nomPrenom) return e;
                });
                let parti = el[0].parti;
                // Donnée des candidats
                this.oldClassement.push({
                  nomprenom: classement[step].nomPrenom,
                  partis: parti,
                  voix: classement[step].pourcentageVoix,
                  classement: step + 1
                });
              }

              // Mettons à jours la variable permettant d'afficher le classement
              this.ClassementCandidat = [];
              this.ClassementCandidat = this.oldClassement;
            } else {
              // Vérifions si le classement est toujour le même avant de mettre à jour le classement
              if (
                this.oldClassement[0].voix !== classement[0].pourcentageVoix
              ) {
                this.oldClassement = [];
                // Modifions les anciènnes valeures
                for (let step = 0; step < classement.length; step++) {
                  // Recherchons le partis du candidat
                  let el = this.CandidatSuivis.filter(e => {
                    if (e.nomprenom === classement[step].nomPrenom) return e;
                  });
                  let parti = el[0].parti;

                  // Donnée des candidats
                  this.oldClassement.push({
                    nomprenom: classement[step].nomPrenom,
                    partis: parti,
                    voix: classement[step].pourcentageVoix,
                    classement: step + 1
                  });
                }

                // Mettons à jours la variable permettant d'afficher le classement
                this.ClassementCandidat = [];
                this.ClassementCandidat = this.oldClassement;
              }
            }

            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
            this.loadingPage = false;
          }
        });

      this.load = 1;
    },
    compareArray(a1, a2) {
      let equal = false;
      if (a1.length != a2.length) {
        equal = false;
      } else {
        for (var a = 0; a < a1.length; ++a) {
          if (a1[a]["nomprenom"] != a2[a]["nomprenom"]) {
            equal = false;
          } else {
            equal = true;
          }

          if (a1[a]["classement"] != a2[a]["classement"]) {
            equal = false;
          } else {
            equal = true;
          }

          if (a1[a]["partis"] != a2[a]["partis"]) {
            equal = false;
          } else {
            equal = true;
          }

          if (a1[a]["voix"] != a2[a]["voix"]) {
            equal = false;
          } else {
            equal = true;
          }
        }
      }
      return equal;
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    updateRank(v) {
      this.checkCandidat();
    },
    CandidatSuivis() {
      this.nbCandidatSuivi = this.CandidatSuivis.length;
    }
  },
  computed: {},
  mounted() {
    this.getCandidatInfo();
    this.checkTypeData(false);
  },
  beforeDestroy() {
    window.clearInterval(this.checkBrute);
    window.clearInterval(this.checkValide);
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.card-icon-block {
  position: absolute;
  left: 15px;
  padding: 14px;
  top: -10px;
  box-shadow: 2px 2px #ddd;
}
::-webkit-scrollbar {
  width: 7px;
  height: 6px;
  background: #b7b7b7;
  -webkit-box-shadow: inset 1px 1px 0 0 rgb(137, 131, 117),
    inset -1px -1px 0 0 rgb(224, 220, 210);
}
.number-card {
  color: #4caf50 !important;
  font-size: 30px;
  font-weight: 600;
}
.text-xs-right {
  text-align: left !important;
}
a {
  color: #212121 !important;
  text-decoration: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
</style>
