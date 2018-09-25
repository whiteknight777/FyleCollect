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
                Liste des résultats
              </v-breadcrumbs-item>
              
              <v-autocomplete
                :loading="loading"
                :items="listeLieux"
                :search-input.sync="search"
                v-model="select"
                class="md2 mx-3"
                flat
                hide-no-data
                hide-details
                label="Rechercher un lieu de vote"
                solo-inverted
                style="width:400px;"
                @blur="checkValue"
              ></v-autocomplete>
              <v-btn 
              icon
              fab
              small
              v-if="clear === true" 
              dark
              color="deep-orange darken-3"
              @click="clearResearch">
              <v-icon>clear</v-icon>
              </v-btn>

              <v-btn
              absolute
              fixed
              dark
              fab
              bottom
              right
              color="green darken-1"
              style="bottom: 20px;"
            >
              <v-icon>print</v-icon>
            </v-btn>
            </v-breadcrumbs>


            <v-card v-for="(item, i) of items" :key="i">
              <v-toolbar color="blue-grey lighten-4">
                <v-card-title style="padding-left:0px;">
                  <v-card-text style="padding-left:0px;">{{item.name}}</v-card-text>
                </v-card-title>
                <v-card-actions>Nombre inscrit: {{item.nbInscrit}}</v-card-actions>
              </v-toolbar>
              <table class="v-datatable v-table">
                <thead>
                  <tr>
                    <!-- <th class="text-xs-left">#</th> -->
                    <th class="text-xs-left">Bureau</th>
                    <th class="text-xs-left">Representant</th>
                    <th class="text-xs-left">Nombre de votant</th>
                    <th class="text-xs-left">Bulletin Null</th>
                    <th class="text-xs-left" width=170>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bureau, a) of item.bv" :key="a">
                    <td class="text-xs-left">
                      {{ bureau.name }}
                    </td>
                    <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ bureau.representant }}</td>
                    <td class="text-xs-left">
                      {{ bureau.nbVotant }}
                    </td>
                    <td class="text-xs-left">{{ bureau.nbBulletinNull }}</td>
                    <td class="text-xs-left">
                      <v-btn 
                      small
                      fab
                      :loading="loading"
                      :disabled="loading"
                      color="green lighten-1"
                      style="color:white"
                      @click="openStatBureau(bureau.id)">
                      <v-icon>
                        list
                      </v-icon>
                      </v-btn>

                      <v-btn 
                      small
                      fab
                      :loading="loading"
                      :disabled="loading"
                      color="primary lighten-1"
                      style="color:white"
                      @click="">
                      <v-icon>
                        attachment
                      </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card>

          </v-flex>

          <!-- AJOUTER LIEU DE VOTE -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="checkData" persistent max-width="650px">
                  <v-toolbar tabs>
                    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

                    <v-toolbar-title v-if="checkData">Résultats du {{bureauSelected.name}}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="checkData = false">
                      <v-icon>clear</v-icon>
                    </v-btn>

                    <v-tabs
                      slot="extension"
                      v-model="tab"
                      fixed-tabs
                      color="transparent"
                    >
                      <v-tabs-slider></v-tabs-slider>
                      <v-tab href="#mobile-tabs-5-1" class="primary--text">
                        <v-icon>list</v-icon>
                      </v-tab>

                      <v-tab href="#mobile-tabs-5-2" class="primary--text">
                        <v-icon>group</v-icon>
                      </v-tab>

                      <!-- <v-tab href="#mobile-tabs-5-3" class="primary--text" @click="launchChart">
                        <v-icon>bubble_chart</v-icon>
                      </v-tab> -->
                    </v-tabs>
                  </v-toolbar>

                  <v-tabs-items v-model="tab" class="white elevation-1" v-if="checkData">

                    <v-tab-item id="mobile-tabs-5-1">
                      <form id="addStatBureau">
                        <v-container grid-list-md style="padding: 40px;">
                          <v-layout wrap>
                            <v-flex d-flex>
                            <v-switch
                              v-if="dejaValiderStatsBureau === false"
                              :label="validerStatsBureau === false ? 'Enregistrer / Modifier les stats du Bureau' : 'Valider les stats du Bureau'"
                              v-model="validerStatsBureau"
                              color="green"
                            ></v-switch>
                            <v-alert
                              v-else
                              :value="true"
                              type="success"
                              style="margin-bottom: 20px"
                            >
                              Les statistiques de ce bureau ont été validées.
                            </v-alert>
                          </v-flex>
                            <v-flex xs12>
                              <v-text-field 
                              label="Nombre de votants" 
                              type="number"
                              :disabled="validerStatsBureau === true || bureauSelected.valider === true"
                              v-model="nbVotant"
                              min=0
                              outline
                              required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                              type="number"
                              :disabled="validerStatsBureau === true || bureauSelected.valider === true"
                              label="Nombre de bulletin null"
                              v-model="nbBulletinNull"
                              min=0
                              outline
                              required
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md12 lg12>
                              <v-btn color="primary" 
                              :loading="loading"
                              :disabled="loading"
                              v-if="validerStatsBureau === false"
                              block large 
                              @click.native="updateStatsBureau" 
                              style="margin-top:30px">
                              Enregistrer
                              </v-btn>
                              
                              <v-btn color="green" 
                              :loading="loading"
                              :disabled="loading"
                              v-if="dejaValiderStatsBureau === false && validerStatsBureau === true"
                              block large 
                              dark
                              @click.native="confirmerValidationStatsBureau" 
                              style="margin-top:30px">
                              Valider statistique
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </form>
                    </v-tab-item>

                    <v-tab-item id="mobile-tabs-5-2">
                      <form id="addStatCandidat">
                        <v-container grid-list-md style="padding: 40px;">
                          <v-layout wrap>
                            <v-flex xs12 d-flex>
                            <v-switch
                              v-if="dejaValiderResultatCandidat === false"
                              :label="validerResultatCandidat === false ? 'Enregistrer / Modifier les résultats des candidats' : 'Valider les résultats des candidats'"
                              v-model="validerResultatCandidat"
                              color="green"
                            ></v-switch>
                            <v-alert
                              v-else
                              :value="true"
                              type="success"
                              style="margin-bottom: 20px"
                            >
                              Les résultats de vote de ce bureau ont été validés.
                            </v-alert>
                            </v-flex>
                            <v-flex xs12 md6 lg6 :key="i" v-for="(data2, i) in candidatSuivis" style="display: inherit">
                              <v-text-field
                                :id="'candidat-'+data2.id"
                                v-model="data2.nbVoix"
                                :label="data2.name"
                                type="number"
                                :disabled="validerResultatCandidat === true || data2.valider === true"
                                placeholder="Nombre de voix"
                                outline
                                min=0
                                required
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md12 lg12>
                              <v-btn color="primary" 
                              :loading="loading"
                              :disabled="loading"
                              v-if="validerResultatCandidat === false"
                              block large 
                              @click.native="updateStatsCandidatBureau" 
                              style="margin-top:30px">
                              Enregistrer
                              </v-btn>
                              
                              <v-btn color="green" 
                              :loading="loading"
                              :disabled="loading"
                              v-if="dejaValiderResultatCandidat === false && validerResultatCandidat === true"
                              block large 
                              dark
                              @click.native="confirmerValidationResultatsBureau" 
                              style="margin-top:30px">
                              Valider résultats
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </form>
                    </v-tab-item>
                    
                    <!-- <v-tab-item id="mobile-tabs-5-3">
                      <v-container grid-list-md style="padding: 40px;">
                        <v-layout wrap>
                         <v-flex xs12 md12 lg12>
                            <v-card>
                              <section>
                                <span style="font-size: 17px;text-transform: uppercase;"></span>
                                </section>
                                <div style="padding:10px;">
                                
                                <canvas :id="'chart'+pieData.id" :width="400" :height="432" style="padding-bottom: 3px;"></canvas>
                                </div>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-tab-item> -->

                  </v-tabs-items>

              </v-dialog>
            </v-layout>
          </template>



        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>

    <snackbar
    v-if="snackbar" 
    :text="text"
    :y="y"
    :x="x"
    >
    </snackbar>

</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "ListeResultats",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      loaded: false,
      loadingPage: false,
      validerStatsBureau: false,
      validerResultatCandidat: false,
      dejaValiderStatsBureau: false,
      dejaValiderResultatCandidat: false,
      tab: null,
      supprimer: false,
      checkData: false,
      updateBureau: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      items: [],
      lieux: [],
      nbVotant: 0,
      bureauSelected: null,
      nbBulletinNull: 0,
      candidatSuivis: [],
      listeLieux: [],
      items: [],
      select: null,
      search: null,
      pieData: {
        id: 2,
        // legend: "Graphique des votes par bureau de vote",
        type: "pie",
        data: {
          labels: ["Candidat 1", "Candidat 2", "Candidat 3", "Candidat 4"],
          datasets: [
            {
              data: [29, 65, 33, 13],
              backgroundColor: [
                "#4CAF50", // Green
                "#FFC107", // Green
                "#607D8B", // Green
                "#90CAF9", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#4CAF50", // Green
                "#FFC107", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#FB8C00", // Green
                "#607D8B", // Green
                "#90CAF9", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#4CAF50", // Green
                "#FFC107", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#FB8C00", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#4CAF50", // Green
                "#FFC107", // Green
                "#607D8B" // Green
              ]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    };
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.lieux.filter(e => {
          return (
            (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart" + chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    checkValue() {
      // console.log("test");
      if (this.search === null && this.select === "") {
        this.clear = true;
        this.items = this.lieux.filter(e => {
          return (
            (e.name || "")
              .toLowerCase()
              .indexOf((this.search || "").toLowerCase()) > -1
          );
        });
      }
      if (this.search === undefined && this.select === null) {
        this.clear = false;
      }
    },
    resetItem() {
      this.items = this.lieux;
    },
    clearResearch() {
      this.clear = false;
      this.select = null;
      this.search = null;
      this.resetItem();
    },
    getNamesCentres() {
      for (let item of this.lieux) {
        this.listeLieux.push(item.name);
      }
    },
    launchChart() {
      this.createChart(this.pieData.id, this.pieData);
    },
    getAllData() {
      this.loadingPage = true;
      this.axios
        .get(localDomain + "resultats/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux = data.listeCentres;
            this.items = this.lieux;
            this.getNamesCentres();
          }

          this.loadingPage = false;
        });
    },
    openStatBureau(idBureau) {
      // Récupérons les statistiques de ce bureau
      let lieuSelected = this.lieux.filter(e => {
        let listeBureau = e.bv;
        for (let bureau of listeBureau) {
          if (bureau.id === idBureau) {
            this.bureauSelected = bureau;
            if (this.bureauSelected.valider === true) {
              this.validerStatsBureau = true;
              this.dejaValiderStatsBureau = true;
            } else {
              this.validerStatsBureau = false;
              this.dejaValiderStatsBureau = false;
            }

            return e;
          }
        }
      });

      // Vérifions si les stats candidats bureaux ont été validées
      let statsCandidatsBureaux = this.bureauSelected.rv;
      let nbValider = 0;
      for (let resultat of statsCandidatsBureaux) {
        if (resultat.valider === true) {
          nbValider++;
        }
      }
      // Vérifions maintenant si tout les résultats ont été validés
      if (nbValider === this.bureauSelected.nbRV) {
        this.validerResultatCandidat = true;
        this.dejaValiderResultatCandidat = true;
      } else {
        this.validerResultatCandidat = false;
        this.dejaValiderResultatCandidat = false;
      }

      // Nombre de votant du bureau
      this.nbVotant = this.bureauSelected.nbVotant;
      this.nbBulletinNull = this.bureauSelected.nbBulletinNull;

      // Liste des candidats suivis et leur résultats
      this.candidatSuivis = this.bureauSelected.rv;
      this.checkData = true;
    },
    updateStatsBureau() {
      this.checkData = false;
      this.snackbar = false;
      this.loadingPage = true;

      let form = document.getElementById("addStatBureau");
      let data = new FormData(form);
      data.append("idBureau", this.bureauSelected.id);
      data.append("nbVotant", this.nbVotant);
      data.append("nbBn", this.nbBulletinNull);
      data.append("idCandidat", this.user.idCandidat);

      this.axios
        .post(localDomain + "statsbureaux/edit/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux.filter(e => {
              let listeBureau = e.bv;
              for (let bureau of listeBureau) {
                if (bureau.id === this.bureauSelected.id) {
                  bureau.nbVotant = this.nbVotant;
                  bureau.nbBulletinNull = this.nbBulletinNull;
                }
              }
            });
            this.items = this.lieux;
            this.listeLieux = [];
            this.getNamesCentres();

            this.text = "Modification effectuée";
            this.snackbar = true;
            this.loadingPage = false;
          }
        });
    },
    updateStatsCandidatBureau() {
      this.checkData = false;
      this.snackbar = false;
      this.loadingPage = true;

      let form = document.getElementById("addStatCandidat");
      let data = new FormData(form);
      data.append("idBureau", this.bureauSelected.id);
      data.append("idCandidat", this.user.idCandidat);
      // Envoyons le tableau de candidat suivis
      for (let a = 0; a < this.candidatSuivis.length; a++) {
        data.append(
          "candidat_" + this.candidatSuivis[a].id,
          this.candidatSuivis[a].nbVoix
        );
      }

      this.axios
        .post(localDomain + "statscandidatsbureaux/edit/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux.filter(e => {
              let listeBureau = e.bv;
              for (let bureau of listeBureau) {
                if (bureau.id === this.bureauSelected.id) {
                  bureau.rv = this.candidatSuivis;
                }
              }
            });
            this.items = this.lieux;
            this.listeLieux = [];
            this.getNamesCentres();

            this.text = "Modification effectuée";
            this.snackbar = true;
            this.loadingPage = false;
          }
        });
    },
    confirmerValidationStatsBureau() {
      this.checkData = false;
      this.snackbar = false;
      this.loadingPage = true;

      let form = document.getElementById("addStatBureau");
      let data = new FormData(form);
      data.append("idBureau", this.bureauSelected.id);
      data.append("nbVotant", this.nbVotant);
      data.append("nbBn", this.nbBulletinNull);
      data.append("idCandidat", this.user.idCandidat);

      this.axios
        .post(localDomain + "statsbureaux/valider/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux.filter(e => {
              let listeBureau = e.bv;
              for (let bureau of listeBureau) {
                if (bureau.id === this.bureauSelected.id) {
                  bureau.nbVotant = this.nbVotant;
                  bureau.nbBulletinNull = this.nbBulletinNull;
                  bureau.valider = true;
                }
              }
            });

            this.items = this.lieux;
            this.listeLieux = [];
            this.getNamesCentres();

            this.text = "Modification effectuée";
            this.snackbar = true;
            this.loadingPage = false;
          }
        });
    },
    confirmerValidationResultatsBureau() {
      this.checkData = false;
      this.snackbar = false;
      this.loadingPage = true;

      let form = document.getElementById("addStatCandidat");
      let data = new FormData(form);
      data.append("idBureau", this.bureauSelected.id);
      data.append("idCandidat", this.user.idCandidat);
      // Envoyons le tableau de candidat suivis
      for (let a = 0; a < this.candidatSuivis.length; a++) {
        data.append(
          "candidat_" + this.candidatSuivis[a].id,
          this.candidatSuivis[a].nbVoix
        );
      }

      this.axios
        .post(localDomain + "statscandidatsbureaux/valider/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux.filter(e => {
              let listeBureau = e.bv;
              for (let bureau of listeBureau) {
                if (bureau.id === this.bureauSelected.id) {
                  bureau.rv = this.candidatSuivis;
                  for (let resultat of bureau.rv) {
                    resultat.valider = true;
                  }
                }
              }
            });

            this.items = this.lieux;
            this.listeLieux = [];
            this.getNamesCentres();

            this.text = "Modification effectuée";
            this.snackbar = true;
            this.loadingPage = false;
          }
        });
    }
  },
  watch: {
    search(val) {
      // val && val !== this.select && this.querySelections(val);
      if (val !== this.select) {
        this.querySelections(val);
        this.clear = true;
      }
      if (val === "") {
        this.select = null;
        this.clear = false;
      }
    },
    select(val) {
      if (this.search === null && val === null) {
        this.items = this.lieux;
        this.clear = false;
      }
      if (this.search === null && val === "") {
        this.items = this.lieux;
        this.clear = false;
      }
      if (val !== "" && val !== undefined && val !== null) {
        this.items = [];
        this.items = this.lieux.filter(e => {
          if (e.name === val) {
            return e;
          }
        });
        this.clear = true;
      }
    }
  },
  computed: {},
  mounted() {
    this.getAllData();
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
.application
  .theme--light.v-text-field--solo-inverted.v-text-field--solo
  .v-input__slot,
.theme--light .v-text-field--solo-inverted.v-text-field--solo .v-input__slot {
  background: rgba(0, 0, 0, 0.16);
  width: 450px;
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
</style>
