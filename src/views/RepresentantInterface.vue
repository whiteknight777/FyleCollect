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
                  <span class="number-card" style="color:#e64a2b !important">22000</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Nombre Total de votant</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="deep-orange darken-2" height="4" value="90"></v-progress-linear>
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
                  <span class="number-card" style="color:#FFAB00 !important">12000</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Votes obtenus</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="warning" height="4" value="60"></v-progress-linear>
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
                  <span class="number-card" style="color:#53af50 !important">130</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Nombre de Bulletin Nul</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="40"></v-progress-linear>
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
            <v-card>
              <charts v-if="loaded" :data="chartData.data" :id="chartData.id" :type="chartData.type" :options="chartData.options" :legend="chartData.legend" :width="400" style="height:440px">
              </charts>
  
            </v-card>
          </v-flex>

          
          <v-flex xs12 md6 lg6>
            <v-card>
              <charts v-if="loaded" :data="pieData.data" :id="pieData.id" :type="pieData.type" :options="pieData.options" :legend="pieData.legend" :height="440" style="height:440px">
              </charts>
  
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
          labels: [],
          datasets: [
            {
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
    getDataBarChart() {
      this.axios
        .get(
          apiDomain +
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

          console.log(response.data);
          // Vérifions le status de la requete
          if (response.data.statusRequete == 100) {
            let nbResult = data.length;

            // Ajoutons les informations aux différentes variables
            for (let i = 0; i < nbResult; i++) {
              for (let index in data[i]) {
                this.barChartLabel.push("" + index + "");
                this.dataChartLabel.push(data[i][index]);
              }
            }

            // Mettons à jours les variables utiles pour le graphique
            this.loaded = true;
            this.chartData.data.labels = this.barChartLabel;
            this.chartData.data.datasets[0].data = this.dataChartLabel;

            this.pieData.data.labels = this.barChartLabel;
            this.pieData.data.datasets[0].data = this.dataChartLabel;
          } else {
            //
            this.loaded = true;
            this.chartData.data.labels = [];
            this.chartData.data.datasets[0].data = this.dataChartLabel;

            this.pieData.data.labels = [];
            this.pieData.data.datasets[0].data = this.dataChartLabel;
          }
        });
    }
  },
  beforeMount() {
    this.getDataBarChart();
  },
  mounted() {
    $(".number-card").each(function() {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text()
          },
          {
            duration: 4000,
            easing: "swing",
            step: function(now) {
              $(this).text(Math.ceil(now));
            }
          }
        );
    });
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
