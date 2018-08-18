<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
  
  
  
  
  
          <v-flex xs9>
            <v-card style="height: 441px">
              <canvas id="planet-chart"></canvas>
            </v-card>
          </v-flex>
  
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
  
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import planetChartData from "../charts/planet-charts.js";
export default {
  name: "Home",
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
      planetChartData: planetChartData
    };
  },
  mounted() {
    this.createChart("planet-chart", this.planetChartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
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
</style>
