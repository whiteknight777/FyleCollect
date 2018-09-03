<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
  
        <v-layout row wrap style="margin-bottom:10px">
          <!--  Stat bar -->
          <v-flex xs6 md3 lg3>
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
          <v-flex xs6 md3 lg3>
            <v-card>
              <div class="card-icon-block warning" dark>
                <v-icon dark>stars</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card" style="color:#FFAB00 !important">12000</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Total de votes acquis</span>
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
          <v-flex xs6 md3 lg3>
            <v-card>
              <div class="card-icon-block success" dark>
                <v-icon dark>voice_over_off</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card" style="color:#53af50 !important">40%</span><br>
                  <span style="font-size:13px;text-transform:uppercase">Taux d'abstention</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="40"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md3 lg3>
            <v-card>
              <div class="card-icon-block primary">
                <v-icon dark>how_to_vote</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card" style="color:#3c76d2 !important">60%</span><br>
                  <span style="font-size:13px;text-transform:uppercase ">Taux de participation</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="primary" height="4" value="60"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
        </v-layout>
  
        <v-layout row wrap style="margin-bottom:10px">
  
          <!--  Graphique -->
          <v-flex xs12 md9 lg9>
            <v-card>
              <charts :data="chartData.data" :id="chartData.id" :type="chartData.type" :options="chartData.options" :legend="chartData.legend" :width="400" style="height:440px">
              </charts>
  
            </v-card>
          </v-flex>
          <!-- Fin Graphique -->
  
          <!-- Classement candidat -->
          <v-flex xs12 md3 lg3>
            <v-card>
  
              <v-list subheader>
                <v-subheader>Candidat en tête</v-subheader>
  
                <v-list-tile v-for="item in items2" :key="item.title" avatar @click="">
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>
  
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-chip :color="parseInt(item.ranking) < 3 ? 'green lighten-1' : 'yellow darken-1'" text-color="white" style="font-size:12px">
                      N°{{item.ranking}}
                    </v-chip>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
  
              <v-divider></v-divider>
              <v-list subheader>
                <v-subheader>Liste des candidats</v-subheader>
                <v-list-tile v-for="item in items" :key="item.title" avatar @click="">
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>
  
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>
  
                  <v-list-tile-action>
                    <!-- <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
                    <v-chip :color="parseInt(item.ranking) < 4 ? 'green lighten-1' : 'yellow darken-1'" text-color="white" style="font-size:12px">
                      <!-- <v-icon dark v-if="parseInt(item.ranking) < 0" style="font-size:16px">arrow_downward</v-icon>
                      <v-icon dark v-if="parseInt(item.ranking) > 0" style="font-size:16px">arrow_upward</v-icon> -->
                      N°{{item.ranking}}
                    </v-chip>
                  </v-list-tile-action>
                </v-list-tile>
  
                <v-subheader>Voir tout le classement</v-subheader>
              </v-list>
            </v-card>
          </v-flex>
          <!-- Fin Classement candidat -->

        </v-layout>
  
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import charts from "../components/Charts.vue";

export default {
  name: "UserInterface",
  components: {
    charts
  },
  data() {
    return {
      items: [
        {
          active: true,
          title: "Kone Alassane",
          ranking: "3",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
        },
        {
          active: true,
          title: "Kouakou Jean",
          ranking: "4",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
        },
        {
          title: "Yao Félicité",
          ranking: "2",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
        },
        {
          title: "Kipré Kouamé",
          ranking: "6",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
        }
      ],
      items2: [
        {
          title: "Ahoussou Jean",
          ranking: "1",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
        }
      ],
      chartData: {
        id: 1,
        legend: "Graphique des votes obtenues par centres",
        type: "line",
        data: {
          labels: ["Centre 1", "Centre 2", "Centre 3", "Centre 4", "Centre 5"],
          datasets: [
            {
              // another line graph
              label: "Nombre de voix",
              data: [31, 55, 74, 62, 90],
              backgroundColor: [
                "rgba(0, 128, 128, 0.92)" // Green
                // "rgb(0, 128, 128)", // Green
                // "rgb(0, 128, 128)", // Green
                // "rgb(0, 128, 128)", // Green
                // "rgb(0, 128, 128)" // Green
                // "#4CAF50", // Green
                // "#FFC107", // Green
                // "#607D8B" // Green
              ],
              borderColor: ["#B3E5FC"],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
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
      }
    };
  },
  methods: {},
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
