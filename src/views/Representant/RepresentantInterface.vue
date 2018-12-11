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
  
        <v-layout row wrap style="margin-bottom:10px">
          <!--  Stat bar -->
          <v-flex xs6 md4 lg4>
            <v-card>
              <div class="card-icon-block deep-orange darken-2" dark>
                <v-icon dark>supervised_user_circle</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="votant" class="number-card" style="color:#e64a2b !important">{{getVotant}}</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Nombre Total de votant <br><b>{{user.bureauRepresentant}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="deep-orange darken-2" height="4" :value="getVotant">
                  {{getVotant}}
                </v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md4 lg4>
            <v-card>
              <div class="card-icon-block warning" dark>
                <v-icon dark>stars</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="voix" class="number-card" style="color:#FFAB00 !important">{{getVoix}}</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Votes obtenus<br>Candidat <b>{{nomCandidat}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="warning" height="4" :value="getVoix">
                  {{getVoix}}
                </v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs12 md4 lg4>
            <v-card>
              <div class="card-icon-block success" dark>
                <v-icon dark>voice_over_off</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="bulletin" class="number-card" style="color:#53af50 !important">{{getBulletinNul}}</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Nombre de Bulletin Nul <br><b>{{user.bureauRepresentant}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" :value="getBulletinNul">
                  {{getBulletinNul}}
                </v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->

          <!-- <v-flex xs6 md3 lg3>
            <v-card>
              <charts :data="pieData.data" :id="pieData.id" :type="pieData.type" :options="pieData.options" :legend="pieData.legend" style="">
              </charts>
  
            </v-card>
          </v-flex> -->
  
  
        </v-layout>
  
        <v-layout row wrap style="margin-bottom:10px">
  
          <!--  Graphique -->
          <v-flex xs12 md6 lg6>
            <v-card  v-if="loaded">
              <!-- <charts :data="chartData.data" :id="chartData.id" :type="" :options="chartData.options" :legend="">
              </charts> -->
                <section style="padding-top: 10px;">
                  <span style="font-size: 17px;text-transform: uppercase;"> {{chartData.legend}} </span>
                </section>
                <div style="padding:10px; background: white">
                
                <canvas :id="'chart'+chartData.id" :width="400" :height="400"></canvas>
                </div>
  
            </v-card>
          </v-flex>

          
          <v-flex xs12 md6 lg6>
            <v-card  v-if="loaded">
              <!-- <charts v-if="loaded" :data="pieData.data" :id="pieData.id" :type="pieData.type" :options="pieData.options" :legend="pieData.legend" :height="440" style="height:440px">
              </charts> -->
               <section>
                  <span style="font-size: 17px;text-transform: uppercase;"></span>
                </section>
                <div style="padding:10px; background: white">
                
                <canvas :id="'chart'+pieData.id" :width="400" :height="432" style="padding-bottom: 3px;"></canvas>
                </div>
            </v-card>
          </v-flex>
        </v-layout>

  
      </v-container>
    </v-slide-y-transition>
  </v-container>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
// Config API
import apiConfig from "../../apiConfig";

export default {
  name: "RepresentantInterface",
  props: {
    user: Object
  },
  data() {
    return {
      // Affiche les graphiques
      loaded: false,

      // verifie en BD si des stats sont disponibles
      interval: setInterval(this.CheckData, 2000),

      // Fait un log des stats récupérées
      log: {
        statBureau: false,
        statCandidats: false
      },
      loadingPage: false,

      // affiche le nom du candidat
      nomCandidat: "",

      // Affiche les statistiques du bureau de vote
      nbVotant: 0,
      nbVote: 0,
      nbBulletinNul: 0,

      // Variable tempon de la fonction affichant les graphiques
      barChartLabel: [],
      dataChartLabel: [],

      // Objet permettant de créer le graphique en bar
      chartData: {
        id: 1,
        legend: "Graphique des voix par candidats",
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              // another line graph
              label: "Nombre de voix",
              data: [],
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
                "#607D8B", // Green
                "#90CAF9", // Green
                "#FB8C00", // Green
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
              ],
              borderColor: [
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
                "#FB8C00", // Green
                "#FFC107", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#4CAF50", // Green
                "#FFC107", // Green
                "#607D8B" // Green
              ],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 2,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 26
                }
              }
            ]
          }
        }
      },

      // Objet permettant de créer le graphique en cercle
      pieData: {
        id: 2,
        // legend: "Graphique des votes par bureau de vote",
        type: "pie",
        data: {
          labels: ["Aucune données"],
          datasets: [
            {
              data: [0],
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
    // Fonction permettant de creer un graphique
    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart" + chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },

    // Fonction permettant de récupérer les données du graphique en bar et en cercle
    getDataBarChart() {
      // Récupération des données des candidats suivis
      this.axios
        .get(
          apiConfig.baseURL +
            "api/statistiques/representant/data_chart_bar/" +
            this.user.idUtilisateur,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          // Récupérons la reponse renvoyée
          let data = response.data.response;
          // Récupérons la nombre de données récupérées

          // Vérifions le status de la requete
          // Success de la requete
          if (response.data.statusRequete == 100) {
            if (response.data.response !== undefined) {
              let nbResult = data.length;

              // Ajoutons les informations aux différentes variables
              // Vérifions si les candidats on déja été chargé
              if (this.log.statCandidats === false) {
                // Vérifions si les données des candidats sont bien dans les variables
                if (
                  this.dataChartLabel.length === 0 &&
                  this.barChartLabel.length === 0
                ) {
                  // Renseignons les données des candidats récupérées dans des variables
                  for (let i = 0; i < nbResult; i++) {
                    for (let index in data[i]) {
                      this.barChartLabel.push("" + index + "");
                      this.dataChartLabel.push(data[i][index]);
                    }
                  }
                }
                // Renseignons les données des candidats récupérées dans le graphe en bar
                this.loaded = true;
                this.chartData.data.labels = this.barChartLabel;
                this.chartData.data.datasets[0].data = this.dataChartLabel;

                // Renseignons les données des candidats récupérées dans le graphe en cercle
                this.pieData.data.labels = this.barChartLabel;
                this.pieData.data.datasets[0].data = this.dataChartLabel;

                // Créons les différents graphes
                this.createChart(this.chartData.id, this.chartData);
                this.createChart(this.pieData.id, this.pieData);

                // Marquons que la récupération des données des candidats à été un succes
                this.log.statCandidats = true;
              } else {
                // Réinitialisons les variables des graphiques
                this.barChartLabel = [];
                this.dataChartLabel = [];
              }
            }
          }

          // Si des données sont manquantes en bd
          if (response.data.statusRequete == 200) {
            // Affichons un graphique avec des valeurs par défaut
            this.loaded = true;
            this.chartData.data.labels = this.barChartLabel;
            this.chartData.data.datasets[0].data = this.dataChartLabel;
            this.pieData.data.labels = this.barChartLabel;
            this.pieData.data.datasets[0].data = this.dataChartLabel;

            // On affiche les nouveaux graphiques
            // this.createChart(this.chartData.id, this.chartData);
            // this.createChart(this.pieData.id, this.pieData);
          }
        });
    },

    // Fonction permettant de récupérer les statistiques d'un bureau de vote
    getDataBureau() {
      // Récupération des données du bureau
      this.axios
        .get(
          apiConfig.baseURL + "statsbureaux/list/" + this.user.idUtilisateur,
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

          // Vérifions le status de la requete
          // S'IL NE MANQUE PAS DE DONNEES EN BASE
          if (response.data.statusRequete == 100) {
            // Nombre de votant
            this.nbVotant = response.data.resp_stat_bureau[0].nbVotant;
            // Nombre de votes obtenu
            this.nbVote = response.data.resp_stat_cdtbureau[0].nbVote;
            // Nombre de bulletin null
            this.nbBulletinNul =
              response.data.resp_stat_bureau[0].nbBulletinNul;
            // Récupérons le nom du candidat
            this.nomCandidat = response.data.resp_representant[0].nomCandidat;

            // Créons un tableau pour gérer l'animation des nombres
            // let newData = new Array();
            // newData[0] = new Array("votant", this.nbVotant);
            // newData[1] = new Array("voix", this.nbVote);
            // newData[2] = new Array("bulletin", this.nbBulletinNul);
            // for (let item of newData) {
            //   this.animateValue(item[0], 0, item[1], 4000);
            // }

            // Marquons que la requete à été un succes
            this.log.statBureau = true;
          }

          // S'IL MANQUE DES DONNEES EN BASE
          if (response.data.statusRequete == 200) {
            // Créons un tableau pour gérer l'animation des nombres
            let newData = new Array();

            // Marquons que la requete est incomplete
            this.log.statBureau = false;

            // S'IL N'EXISTE PAS DE STATS SUR LES CANDIDATS EN LIGNE MAIS QU'IL EXISTE DES STATS SUR LE BUREAU
            if (
              response.data.resp_stat_bureau !== undefined &&
              response.data.resp_stat_cdtbureau !== undefined
            ) {
              if (
                response.data.resp_stat_bureau.length > 0 &&
                response.data.resp_stat_cdtbureau.length === 0
              ) {
                // Nombre de votant récupéré
                this.nbVotant = response.data.resp_stat_bureau[0].nbVotant;
                // Nombre de bulletin null récupéré
                this.nbBulletinNul =
                  response.data.resp_stat_bureau[0].nbBulletinNul;
                // Nombre de votes obtenu récupéré
                this.nbVote = 0;
                // Récupérons le nom du candidat
                this.nomCandidat =
                  response.data.resp_representant[0].nomCandidat;

                // Créons un tableau pour gérer l'animation
                newData[0] = new Array("votant", this.nbVotant);
                newData[2] = new Array("bulletin", this.nbBulletinNul);

                // for (let item of newData) {
                //   this.animateValue(item[0], 0, item[1], 4000);
                // }
              }

              // S'IL EXISTE DES STATS SUR LES CANDIDATS EN LIGNE ET QU'IL N'EXISTE PAS DE STATS SUR LE BUREAU
              if (
                response.data.resp_stat_cdtbureau.length > 0 &&
                response.data.resp_stat_bureau.length === 0
              ) {
                // Nombre de votant récupéré
                this.nbVotant = 0;
                // Nombre de bulletin null récupéré
                this.nbBulletinNul = 0;
                // Nombre de votes obtenu récupéré
                this.nbVote = response.data.resp_stat_cdtbureau[0].nbVote;
                // Récupérons le nom du candidat
                this.nomCandidat =
                  response.data.resp_representant[0].nomCandidat;

                // Créons un tableau pour gérer l'animation
                newData[1] = new Array("voix", this.nbVote);

                // for (let item of newData) {
                //   this.animateValue(item[0], 0, item[1], 4000);
                // }
              }
            }
          }
        });
    },

    // Fonction permettant d'animer des nombres
    animateValue(id, start, end, duration) {
      if (end > start) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = document.getElementById(id);
        let timer = setInterval(function() {
          current += increment;
          obj.innerHTML = current;
          if (current == end) {
            clearInterval(timer);
          }
        }, stepTime);
      }
    },

    // Fonction permettant de stopper les vérifications en BD lorsque tous les éléments sont bien chargés
    CheckData() {
      if (this.log.statBureau === false) {
        this.getDataBureau();
      }
      if (this.log.statCandidats === false) {
        this.getDataBarChart();
      }
      if (this.log.statBureau === true && this.log.statCandidats === true) {
        clearInterval(this.interval);
      }
    }
  },
  computed: {
    // Fonction retournant le nombre de votant
    getVotant() {
      return this.nbVotant;
    },
    // Fonction retournant le nombre de votes obtenue par le candidat du representant
    getVoix() {
      return this.nbVote;
    },
    // Fonction retournant le nombre de bulletin null
    getBulletinNul() {
      return this.nbBulletinNul;
    }
  },
  beforeMount() {
    localStorage.setItem("interval", this.interval);
    // Fonction déclenchant les vérifications en BD
    this.interval;
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
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

.number-card {
  color: #4caf50 !important;
  font-size: 30px;
  font-weight: 600;
}
</style>
