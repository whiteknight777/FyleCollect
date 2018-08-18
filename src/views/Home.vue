<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
  
        <v-layout row wrap style="margin-bottom:10px">
          <!--  Stat bar -->
          <v-flex xs3>
            <v-card>
              <div class="card-icon-block warning" dark>
                <v-icon dark>sort</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card">900</span><br>
                  <span style="font-size:16px">Total de votes acquis</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="15"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs3>
            <v-card>
              <div class="card-icon-block info" dark>
                <v-icon dark>sort</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card">900</span><br>
                  <span style="font-size:16px">Total de votes acquis</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="15"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs3>
           <v-card>
              <div class="card-icon-block success" dark>
                <v-icon dark>sort</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card">900</span><br>
                  <span style="font-size:16px">Total de votes acquis</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="15"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs3>
             <v-card>
              <div class="card-icon-block primary">
                <v-icon dark>sort</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span class="number-card">900</span><br>
                  <span style="font-size:16px">Total de votes acquis</span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" value="15"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
        </v-layout>

        <v-layout row wrap>
          <!--  Graphique -->
          <v-flex xs9>
            <v-card>
              <charts :data="chartData.data" :type="chartData.type" :options="chartData.options" :legend="chartData.legend" :width="400"
              style="height:440px">
              </charts>
  
            </v-card>
          </v-flex>
          <!-- Fin Graphique -->
  
          <!-- Classement candidat -->
          <v-flex xs3>
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
                    <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
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
import charts from "./Charts.vue";

export default {
  name: "Home",
  components: {
    charts
  },
  data() {
    return {
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ],
      items2: [
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
        }
      ],
      chartData: {
        legend: "Graphique des votes par bureau de vote",
        type: "line",
        data: {
          labels: [
            "Bureau 1",
            "Bureau 2",
            "Bureau 3",
            "Bureau 4",
            "Bureau 5",
            "Bureau 6",
            "Bureau 7",
            "Bureau 8"
          ],
          datasets: [
            {
              // another line graph
              label: "Vous",
              data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
              backgroundColor: [
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)", // Green
                "rgba(71, 183,132,.5)" // Green
              ],
              borderColor: ["#47b784"],
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
