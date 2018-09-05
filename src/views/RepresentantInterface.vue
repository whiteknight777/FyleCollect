<template>
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
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";
import charts from "../components/Charts.vue";

export default {
  name: "RepresentantInterface",
  props: {
    user: Object
  },
  components: {
    charts
  },
  data() {
    return {
      loaded: false,
      interval: setInterval(this.CheckData, 3000),
      log: {
        statBureau: false,
        statCandidats: false
      },
      nomCandidat: "",
      update: false,
      a: 0,
      ok: 0,
      nbVotant: 0,
      nbVote: 0,
      nbBulletinNul: 0,
      barChartLabel: [],
      dataChartLabel: [],
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
                "#90CAF9", // Green
                "#C5CAE9", // Green
                "#009688", // Green
                "#01579B", // Green
                "#FB8C00", // Green
                "#4CAF50", // Green
                "#FFC107", // Green
                "#607D8B" // Green
              ],
              borderColor: [
                "#90CAF9", // Green
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
                "#90CAF9", // Green
                "#C5CAE9", // Green
                "#009688", // Green
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
    getDataBarChart() {
      // console.log("test");
      // Récupération des données des candidats suivis
      this.axios
        .get(
          localDomain +
            "api/statistiques/representant/data_chart_bar/" +
            this.user.idUtilisateur,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          // console.log(response.data);
          // Récupérons la reponse renvoyée
          let data = response.data.response;
          // Récupérons la nombre de données récupérées

          // console.log(data);
          // Vérifions le status de la requete
          if (response.data.statusRequete == 100) {
            // console.log("données");
            // console.log("DONNEES", this.ok);
            // console.log(this.OK);
            let nbResult = data.length;

            // Ajoutons les informations aux différentes variables
            if (this.log.statCandidats === false) {
              // console.log("DONNEES", this.ok);
              if (
                this.dataChartLabel.length === 0 &&
                this.barChartLabel.length === 0
              ) {
                for (let i = 0; i < nbResult; i++) {
                  for (let index in data[i]) {
                    this.barChartLabel.push("" + index + "");
                    this.dataChartLabel.push(data[i][index]);
                  }
                }
              }

              this.loaded = true;
              this.chartData.data.labels = this.barChartLabel;
              this.chartData.data.datasets[0].data = this.dataChartLabel;

              this.pieData.data.labels = this.barChartLabel;
              this.pieData.data.datasets[0].data = this.dataChartLabel;

              // On reinitialise les valeures
              // this.createChart(false);
              // this.createPieChart(false);

              // On charge les nouvelles valeures
              // On affiche les nouveaux graphiques
              // this.createChart(true);
              // this.createPieChart(true);

              this.createChart(this.chartData.id, this.chartData);
              this.createChart(this.pieData.id, this.pieData);
              this.loaded = true;
              this.log.statCandidats = true;
            } else {
              this.barChartLabel = [];
              this.dataChartLabel = [];
            }

            // console.log(this.chartData.data.labels);
            // console.log(this.chartData.data.datasets[0].data);
            // console.log(this.pieData.data.datasets[0].data);
            // Mettons à jours les variables utiles pour le graphique
          }
          if (response.data.statusRequete == 200) {
            this.update = false;
            // //
            this.loaded = true;
            this.chartData.data.labels = this.barChartLabel;
            this.chartData.data.datasets[0].data = this.dataChartLabel;
            this.pieData.data.labels = this.barChartLabel;
            this.pieData.data.datasets[0].data = this.dataChartLabel;

            // On affiche les nouveaux graphiques
            this.createChart(this.chartData.id, this.chartData);
            this.createChart(this.pieData.id, this.pieData);
          } else {
            this.update = false;
            // //
            this.loaded = true;
            this.chartData.data.labels = this.barChartLabel;
            this.chartData.data.datasets[0].data = this.dataChartLabel;
            this.pieData.data.labels = this.barChartLabel;
            this.pieData.data.datasets[0].data = this.dataChartLabel;

            // On affiche les nouveaux graphiques
            // this.createChart(this.chartData.id, this.chartData);
            // this.createChart(this.pieData.id, this.pieData);
          }

          // console.log("test");
        });
    },

    getDataBureau() {
      // Récupération des données du bureau
      this.axios
        .get(localDomain + "statsbureaux/list/" + this.user.idUtilisateur, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // Récupérons la reponse renvoyée
          let data = response.data;
          // Récupérons la nombre de données récupérées

          // Vérifions le status de la requete
          // S'IL NE MANQUE PAS DE DONNEES EN BASE
          if (response.data.statusRequete == 100) {
            // console.log("bureau", this.log.statBureau);
            // if (this.log.statBureau === false) {

            this.log.statBureau = true;
            this.nbVotant = response.data.resp_stat_bureau[0].nbVotant;
            // Nombre de votes obtenu
            this.nbVote = response.data.resp_stat_cdtbureau[0].nbVote;
            // Nombre de bulletin null
            this.nbBulletinNul =
              response.data.resp_stat_bureau[0].nbBulletinNul;
            this.nomCandidat = response.data.resp_representant[0].nomCandidat;

            let newData = new Array();
            newData[0] = new Array("votant", this.nbVotant);
            newData[1] = new Array("voix", this.nbVote);
            newData[2] = new Array("bulletin", this.nbBulletinNul);
            for (let item of newData) {
              this.animateValue(item[0], 0, item[1], 4000);
            }
          }

          // S'IL MANQUE DES DONNEES EN BASE
          if (response.data.statusRequete == 200) {
            let newData = new Array();
            // console.log("bureau", response.data.resp_stat_cdtbureau.length);

            this.log.statBureau = false;
            // console.log(this.log.statBureau);

            // S'IL N'EXISTE PAS DE STATS SUR LES CANDIDATS EN LIGNE MAIS QU'IL EXISTE DES STATS SUR LE BUREAU
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

              // Créons un tableau pour gérer l'animation
              newData[0] = new Array("votant", this.nbVotant);
              newData[2] = new Array("bulletin", this.nbBulletinNul);

              for (let item of newData) {
                this.animateValue(item[0], 0, item[1], 4000);
              }
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

              // Créons un tableau pour gérer l'animation
              newData[1] = new Array("voix", this.nbVote);

              for (let item of newData) {
                this.animateValue(item[0], 0, item[1], 4000);
              }
            }
          }
        });
    },
    animateValue(id, start, end, duration) {
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
    },
    CheckData() {
      if (this.log.statBureau === false) {
        this.getDataBureau();
        // console.log(this.log.statBureau);
      }
      if (this.log.statCandidats === false) {
        this.getDataBarChart();
        // console.log(this.log.statCandidats);
      }
      if (this.log.statBureau === true && this.log.statCandidats === true) {
        // console.log("clear");
        clearInterval(this.interval);
      }
    }
  },
  computed: {
    getVotant() {
      return this.nbVotant;
    },
    getVoix() {
      return this.nbVote;
    },
    getBulletinNul() {
      return this.nbBulletinNul;
    }
  },
  beforeMount() {
    // this.CheckData();
    // this.interval = ;
    this.interval;
  },
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

.number-card {
  color: #4caf50 !important;
  font-size: 30px;
  font-weight: 600;
}
</style>
