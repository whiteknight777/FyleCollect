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
              @click="getStatsCommune"
            >
              <v-icon>print</v-icon>
            </v-btn>
            </v-breadcrumbs>


            <v-card v-for="(item, i) of items" :key="i" v-if="items.length > 0">
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
                    <th class="text-xs-left">Statut Résultat</th>
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
                      <v-chip color="green" text-color="white" v-if="bureau.validerTout">
                        <v-avatar>
                          <v-icon>check_circle</v-icon>
                        </v-avatar>
                        Validé complètement
                      </v-chip>
                      <v-chip color="deep orange" text-color="white" v-else-if="bureau.valider === true && bureau.validerResultatCandidat === false">
                        <v-avatar>
                          <v-icon>refresh</v-icon>
                        </v-avatar>
                        En cours de validation 
                      </v-chip>
                      <v-chip color="deep orange" text-color="white" v-else-if="bureau.validerResultatCandidat === true && bureau.valider === false">
                        <v-avatar>
                          <v-icon>refresh</v-icon>
                        </v-avatar>
                        En cours de validation 
                      </v-chip>
                      <v-chip color="deep orange" text-color="white" v-else-if="bureau.valider === true && bureau.validerResultatCandidat === true && bureau.pvSend === false">
                        <v-avatar>
                          <v-icon>attach_file</v-icon>
                        </v-avatar>
                        En attente du pv
                      </v-chip>
                      <v-chip color="red" text-color="white" v-else>
                        <v-avatar>
                          <v-icon>error</v-icon>
                        </v-avatar>
                        En attente 
                      </v-chip>
                    </td>
                    <td class="text-xs-left">
                      <v-btn 
                      small
                      fab
                      :loading="loading"
                      :disabled="loading"
                      color="info lighten-1"
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
                      color="orange accent-3"
                      style="color:white"
                      @click="openPv(bureau.id)">
                      <v-icon>
                        attachment
                      </v-icon>
                      </v-btn>
                    
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card>

            <v-card v-if="items.length === 0" style="padding-bottom: 21px;">
              <v-card-text>
                <v-card-media class="text-xs-center">
                  <v-spacer></v-spacer>
                    <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> how_to_vote </v-icon>
                  <v-spacer></v-spacer>
                </v-card-media>
                    Aucun résultat de vote disponible
              </v-card-text>
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
                              @blur="checkNbVotant(nbVotant)"
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
                              @blur="checkNbBulletinNull(nbBulletinNull)"
                              outline
                              required
                            ></v-text-field>
                            </v-flex>
                            <div class="v-input v-text-field v-text-field--enclosed v-text-field--outline v-input--is-label-active v-input--is-dirty">
                              <div class="v-input__control">
                                  <div class="v-input__slot">
                                    <div class="v-text-field__slot">
                                      <label aria-hidden="true" class="v-label v-label--active" style="left: 0px; right: auto; position: absolute;">
                                        Importer nouveau pv
                                      </label>
                                      <input type="file" disabled ref="file" v-if="pvSend === true && bureauSelected.pvInfoBureau.id !== undefined && dejaValiderStatsBureau === true" style="margin-botom:45px" @change="getUploadedFile">
                                      <input type="file" disabled ref="file" v-else-if="pvSend === true && bureauSelected.pvInfoBureau.id !== undefined && dejaValiderStatsBureau === true && validerStatsBureau === true" style="margin-botom:45px" @change="getUploadedFile">
                                      <input type="file" ref="file" v-else-if="pvSend === true && bureauSelected.pvInfoBureau.id !== undefined && dejaValiderStatsBureau === false" style="margin-botom:45px" @change="getUploadedFile">
                                      <input type="file" disabled ref="file" v-else-if="pvSend === true && bureauSelected.pvInfoBureau.id !== undefined && validerStatsBureau === true" style="margin-botom:45px" @change="getUploadedFile">
                                      <input type="file" ref="file" v-else-if="pvSend === false && dejaValiderStatsBureau === false && validerStatsBureau === false" style="margin-botom:45px" @change="getUploadedFile">
                                      <input type="file" ref="file" v-else="pvSend === false && dejaValiderStatsBureau === false && validerStatsBureau === true" style="margin-botom:45px" @change="getUploadedFile">
                                      <br><br><br>
                                      <v-btn
                                        color="primary"
                                        v-if="pvSend === true && bureauSelected.pvInfoBureau.id !== undefined"
                                        small
                                        dark
                                        @click="checkOldPv(bureauSelected.pvInfoBureau.path)"
                                        style="padding: 20px 16px 45px;"
                                      >
                                      <v-icon> attach_file</v-icon>
                                        consulter PV
                                      </v-btn>
                                    </div>
                                  </div>
                                  <div class="v-text-field__details">
                                    <div class="v-messages">
                                      <div class="v-messages__wrapper">
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <v-flex xs12 md12 lg12>
                              <v-btn color="primary" 
                              :loading="loading"
                              :disabled="loading"
                              block 
                              large 
                              v-if="checkPvEtat"
                              @click.native="sendFileBureau" 
                              style="margin-top:30px">
                              Importer pv
                              </v-btn>
                              
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
                            <v-flex>
                              <h3>Nombre de voix restante : <b>{{diffStatsCandidat}}</b></h3>
                            </v-flex>
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
                                @keyup="checkDataStatsCandidat(data2.nbVoix)"
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
                                
                                <canvas :id="'chart'+pieData.id" :width="'400px'" :height="'432px'" style="padding-bottom: 3px;"></canvas>
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

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }} 
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
import apiConfig from "../../../apiConfig";

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
      getCumulVoix: 0,
      pvSend: null,
      pvInfo: [],
      tab: null,
      supprimer: false,
      checkData: false,
      updateBureau: false,
      snackbar: false,
      lieuSelected: null,
      mode: "",
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      items: [],
      lieux: [],
      nbVotant: "",
      bureauSelected: null,
      rvSelected: null,
      nbBulletinNull: "",
      candidatSuivis: [],
      listeLieux: [],
      items: [],
      select: null,
      search: null,
      selectedFile: null,
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
    getUploadedFile(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile.type);
      let error = true;
      if (
        this.selectedFile.type !== "application/pdf" ||
        "image/jpeg" ||
        "image/png"
      ) {
        error = false;
      } else {
        error = true;
      }

      if (error === true) {
        this.text =
          "Erreur format de fichier... Veuillez choisir un format pdf ou image";
        this.snackbar = true;
        this.selectedFile = null;
        e.target.value = null;
      }
    },
    sendFileBureau() {
      if (this.selectedFile === null) {
        this.text = "Aucun fichier n'a été sélectionné...";
        this.snackbar = true;
      } else {
        this.checkData = false;
        this.loadingPage = true;
        let data = new FormData();
        data.append("file", this.selectedFile);
        data.append("idBureau", this.bureauSelected.id);
        data.append("idClient", this.user.idClient);

        this.axios
          .post(apiConfig.baseURL + "statsbureaux/send/file", data, {
            headers: {
              "Content-type": "multipart/form-data"
            }
          })
          .then(response => {
            let data = response.data;

            if (data.statusRequete == 100) {
              this.lieux.filter(e => {
                let listeBureau = e.bv;
                for (let bureau of listeBureau) {
                  if (bureau.id === this.bureauSelected.id) {
                    bureau.pvSend = data.bureauInfo.pvSend;
                    bureau.pvInfoBureau = data.bureauInfo.pvInfoBureau;
                    // Vérifions si les stats candidats bureaux ont été validées
                    let statsCandidatsBureaux = bureau.rv;
                    let nbValider = 0;
                    for (let resultat of statsCandidatsBureaux) {
                      if (resultat.valider === true) {
                        nbValider++;
                      }
                    }

                    // Vérifions si tout les résultats on été validés
                    if (nbValider === bureau.nbRV) {
                      bureau.validerResultatCandidat = true;
                    }
                    // Vérifions si tout les résultats on été validés
                    if (
                      bureau.validerResultatCandidat === true &&
                      bureau.valider === true &&
                      bureau.pvSend === true
                    ) {
                      bureau.validerTout = true;
                    }
                  }
                }
              });
              this.items = this.lieux;
              this.listeLieux = [];
              this.getNamesCentres();

              this.loadingPage = false;
              this.text = "Pv enregistré avec succès";
              this.snackbar = true;
              this.selectedFile = null;
            }
          })
          .catch(response => {
            let data = response.data;

            this.loadingPage = false;
            this.text = "Une érreur est survenu lors de l'envoi du pv... ";
            this.snackbar = true;
            this.selectedFile = null;
          });
      }
    },
    getAllData() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "resultats/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux = data.listeCentres;
            // Vérifions si toutes les infos ont été validées
            this.lieux.filter(e => {
              for (let bureau of e.bv) {
                let statsCandidatsBureaux = bureau.rv;
                let nbValider = 0;
                for (let resultat of statsCandidatsBureaux) {
                  if (resultat.valider === true) {
                    nbValider++;
                  }
                }
                // Vérifions si tout les résultats on été validés
                if (nbValider === bureau.nbRV) {
                  bureau.validerResultatCandidat = true;
                }
                // Vérifions si tout les résultats on été validés
                if (
                  bureau.validerResultatCandidat === true &&
                  bureau.valider === true &&
                  bureau.pvSend === true
                ) {
                  bureau.validerTout = true;
                }
              }
            });
            this.items = this.lieux;
            this.getNamesCentres();
          }

          this.loadingPage = false;
        });
    },
    openStatBureau(idBureau) {
      // Récupérons les statistiques de ce bureau
      this.lieuSelected = this.lieux.filter(e => {
        let listeBureau = e.bv;
        for (let bureau of listeBureau) {
          if (bureau.id === idBureau) {
            this.bureauSelected = bureau;
            this.pvSend = bureau.pvSend;

            // Vérifions si les données du bureau sont validées
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
      this.rvSelected = this.bureauSelected.rv;
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
        this.bureauSelected.validerResultatCandidat = true;
      } else {
        this.validerResultatCandidat = false;
        this.dejaValiderResultatCandidat = false;
        this.bureauSelected.validerResultatCandidat = false;
      }

      // Vérifions si tout les résultats on été validés
      if (
        this.bureauSelected.validerResultatCandidat === true &&
        this.bureauSelected.valider === true &&
        this.bureauSelected.pvSend === true
      ) {
        this.bureauSelected.validerTout = true;
      }

      // Nombre de votant du bureau
      this.nbVotant = this.bureauSelected.nbVotant;
      this.nbBulletinNull = this.bureauSelected.nbBulletinNull;

      // Liste des candidats suivis et leur résultats
      this.candidatSuivis = this.bureauSelected.rv;
      this.checkData = true;
      this.checkDataStatsCandidat(0);
      // this.createChart(this.pieData.id, this.pieData);
    },
    openPv(idBureau) {
      this.lieux.filter(e => {
        let listeBureau = e.bv;
        for (let bureau of listeBureau) {
          if (bureau.id === idBureau) {
            this.bureauSelected = bureau;
            this.snackbar = false;
          }
        }
      });

      // Récupérons les infos sur le pv
      // Vérifions si le pv à été envoyé
      if (this.bureauSelected.pvSend) {
        this.pvInfo = this.bureauSelected.pvInfoBureau;
        let url = this.pvInfo.path;
        let win = window.open(url, "_blank");
        win.focus();
      } else {
        // Informons l'utilsateur que ce bureau n'a aucun pv rattaché
        this.text = "Aucun pv n'a été ajouté à ce bureau";
        this.snackbar = true;
      }
    },
    checkOldPv(url) {
      let win = window.open(url, "_blank");
      win.focus();
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
      // Vérifions si une nouvelle image à été chargée
      if (this.selectedFile !== null || this.selectedFile !== undefined) {
        data.append("file", this.selectedFile);
      } else {
        data.append("file", "");
      }

      this.axios
        .post(apiConfig.baseURL + "statsbureaux/edit/info", data, {
          headers: {
            "Content-type": "multipart/form-data"
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
                  bureau.pvSend = data.bureauInfo.pvSend;
                  bureau.pvInfoBureau = data.bureauInfo.pvInfoBureau;
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
        })
        .catch(response => {
          let data = response.data;
          console.log(data);

          this.loadingPage = false;
          this.text =
            "Une érreur est survenu lors de la modification des données... ";
          this.snackbar = true;
          this.selectedFile = null;
        });
    },
    getStatsCommune() {
      this.snackbar = false;
      this.loadingPage = true;
      this.axios
        .get(
          apiConfig.baseURL + "print/stats/commune/" + this.user.idCandidat,
          {
            headers: {
              "Content-type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons les infos sur le pv
            // Vérifions si le pv à été envoyé
            let url = data.urlStatsCommune;
            this.loadingPage = false;
            let win = window.open(url, "_blank");
            win.focus();
          }
          if (data.statusRequete == 200) {
            // Récupérons les infos sur le pv
            this.loadingPage = false;
            this.text = "Aucune statistique disponible pour ce candidat... ";
            this.snackbar = true;
          }
        })
        .catch(response => {
          let data = response.data;
          this.loadingPage = false;
          this.text =
            "Une érreur est survenu lors du chargement des données... ";
          this.snackbar = true;
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
        .post(apiConfig.baseURL + "statscandidatsbureaux/edit/info", data, {
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

      // Vérifions si une nouvelle image à été chargée
      if (this.selectedFile !== null || this.selectedFile !== undefined) {
        data.append("file", this.selectedFile);
      } else {
        data.append("file", "");
      }

      this.axios
        .post(apiConfig.baseURL + "statsbureaux/valider/info", data, {
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

                  // Vérifions si les stats candidats bureaux ont été validées
                  let statsCandidatsBureaux = bureau.rv;
                  let nbValider = 0;
                  for (let resultat of statsCandidatsBureaux) {
                    if (resultat.valider === true) {
                      nbValider++;
                    }
                  }

                  if (
                    nbValider === bureau.nbRV &&
                    bureau.valider === true &&
                    bureau.pvSend === true
                  ) {
                    bureau.validerTout = true;
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
        .post(apiConfig.baseURL + "statscandidatsbureaux/valider/info", data, {
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
                  let nbValider = 0;
                  for (let resultat of bureau.rv) {
                    resultat.valider = true;
                    nbValider++;
                  }

                  if (
                    nbValider === bureau.nbRV &&
                    bureau.valider === true &&
                    bureau.pvSend === true
                  ) {
                    bureau.validerTout = true;
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
    },
    checkNbVotant(v) {
      if (v > this.lieuSelected[0].nbInscrit) {
        this.nbVotant = this.lieuSelected[0].nbInscrit;
      }

      if (v < 0) {
        this.nbVotant = 0;
      }
    },
    checkNbBulletinNull(v) {
      if (v > this.nbVotant) {
        this.nbBulletinNull = this.nbVotant;
      }

      if (v < 0) {
        this.nbBulletinNull = 0;
      }
    },
    checkDataStatsCandidat() {
      // rajoutons la nouvelle valeur saisie & affichons le reste à saisir
      // récupérons le cumul des stats saisie dans le bureau selectionné
      let listeRv = this.bureauSelected.rv;
      let cumulStats = 0;
      for (let statsCandidat of listeRv) {
        if (statsCandidat.nbVoix === "") {
          cumulStats = parseInt(cumulStats) + 0;
        } else {
          cumulStats = parseInt(cumulStats) + parseInt(statsCandidat.nbVoix);
        }
      }
      return cumulStats;
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
  computed: {
    diffStatsCandidat() {
      return (
        parseInt(this.nbVotant) -
        parseInt(this.nbBulletinNull) -
        parseInt(this.checkDataStatsCandidat())
      );
    },
    checkPvEtat() {
      if (this.pvSend === false && this.dejaValiderStatsBureau === true) {
        return true;
      }
      if (
        this.pvSend === false &&
        this.validerStatsBureau === true &&
        this.dejaValiderStatsBureau === false
      ) {
        return false;
      }
    },
    disabledPV() {
      if (this.pvSend === false && this.dejaValiderStatsBureau === true) {
        return false;
      }
      if (this.pvSend === false && this.validerStatsBureau === true) {
        return false;
      }
      if (this.pvSend === false && this.dejaValiderStatsBureau === false) {
        return false;
      }
      if (this.pvSend === false && this.validerStatsBureau === true) {
        return false;
      }
    }
  },
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
.v-btn--floating.v-btn--small .v-icon {
  font-size: 18px;
  margin-left: -4px;
}
</style>
