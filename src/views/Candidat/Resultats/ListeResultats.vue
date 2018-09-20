<template>
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
              
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="green darken-1"
              class="white--text"
              @click.native=""
              style="right: 45px;position: absolute;top: 30px;"
            >
              Imprimer
              <v-icon right dark>print</v-icon>
            </v-btn>
            </v-breadcrumbs>


            <v-card v-for="(item, i) of lieux" :key="i">
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
                    <th class="text-xs-left">Bulletin Null</th>
                    <th class="text-xs-left">Nombre de voix</th>
                    <th class="text-xs-left" width=170>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bureau, a) of item.bv" :key="a">
                    <td class="text-xs-left">
                      {{ bureau.name }}
                    </td>
                    <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ bureau.representant }}</td>
                    <td class="text-xs-left">{{ bureau.nbBulletinNull }}</td>
                    <td class="text-xs-left">
                      {{ bureau.nbVotant }}
                    </td>
                    <td class="text-xs-left">
                      <v-btn 
                      small
                      fab
                      :loading="loading"
                      :disabled="loading"
                      color="green lighten-1"
                      style="color:white"
                      @click="checkData = true">
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
              <v-dialog v-model="checkData" persistent max-width="500px">
                  <v-toolbar tabs>
                    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

                    <v-toolbar-title>Statistiques du bureau 1</v-toolbar-title>

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

                  <v-tabs-items v-model="tab" class="white elevation-1">

                    <v-tab-item id="mobile-tabs-5-1">
                      <form id="addStatBureau">
                        <v-container grid-list-md style="padding: 40px;">
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-text-field 
                              label="Nombre de votants" 
                              type="number"
                              placeholder="0"
                              min=0
                              outline
                              required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                              type="number"
                              label="Nombre de bulletin null"
                              placeholder="0"
                              min=0
                              outline
                              required
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md12 lg12>
                              <v-btn color="primary" 
                              :loading="loading"
                              :disabled="loading"
                              block large @click.native="" 
                              style="margin-top:30px">
                              Enregistrer
                              <!-- <span slot="loader">Loading...</span> -->
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
                            <v-flex xs12 md6 lg6 :key="i" v-for="(data2, i) in candidatSuivis" style="display: inherit">
                              <v-text-field
                                :id="'candidat-'+data2.id"
                                v-model="data2.nbVoix"
                                :label="data2.name"
                                type="number"
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
                              block large @click.native="" 
                              style="margin-top:30px">
                              Enregistrer
                              <!-- <span slot="loader">Loading...</span> -->
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
      representants: [
        "REP 1",
        "REP 2",
        "REP 3",
        "REP 4",
        "REP 5",
        "REP 6",
        "REP 7",
        "REP 8",
        "REP 9"
      ],
      lieux: [
        {
          name: "LYCEE TECHNIQUE",
          localisation: "COCODY, CITE DES ARTS",
          nbInscrit: "3977",
          bv: [
            {
              id: 1,
              name: "BUREAU 1",
              representant: "FRANCK YAO",
              nbVotant: "598",
              nbBulletinNull: "32",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            },
            {
              id: 2,
              name: "BUREAU 2",
              representant: "PAT KOFFI",
              nbVotant: "398",
              nbBulletinNull: "22",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            },
            {
              id: 3,
              name: "BUREAU 3",
              representant: "ZAMBLE YVES",
              nbVotant: "898",
              nbBulletinNull: "132",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            }
          ]
        },
        {
          name: "GS DEUX PLATEAU SUD 1-2",
          localisation: "2 PLATEAUX ANGRE",
          nbInscrit: "2377",
          bv: [
            {
              id: 1,
              name: "BUREAU 1",
              representant: "FRANCK YAO",
              nbVotant: "598",
              nbBulletinNull: "32",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            },
            {
              id: 2,
              name: "BUREAU 2",
              representant: "PAT KOFFI",
              nbVotant: "398",
              nbBulletinNull: "22",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            },
            {
              id: 3,
              name: "BUREAU 3",
              representant: "ZAMBLE YVES",
              nbVotant: "898",
              nbBulletinNull: "132",
              contact: "08123344",
              rv: [
                { name: "candidat 1", nbVoix: "250" },
                { name: "candidat 2", nbVoix: "250" },
                { name: "candidat 3", nbVoix: "250" },
                { name: "candidat 4", nbVoix: "250" },
                { name: "candidat 5", nbVoix: "250" },
                { name: "candidat 6", nbVoix: "250" },
                { name: "candidat 7", nbVoix: "250" },
                { name: "candidat 8", nbVoix: "250" }
              ]
            }
          ]
        }
      ],
      candidatSuivis: [
        { id: 1, name: "Candidat 1", nbVoix: 0 },
        { id: 2, name: "Candidat 2", nbVoix: 0 },
        { id: 3, name: "Candidat 3", nbVoix: 0 },
        { id: 4, name: "Candidat 4", nbVoix: 0 }
      ],
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
    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart" + chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    launchChart() {
      this.createChart(this.pieData.id, this.pieData);
      // this.loaded = true;
      // console.log(document.getElementById("chart"));
    }
  },
  watch: {},
  computed: {},
  mounted() {}
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
</style>
