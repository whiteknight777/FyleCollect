<template>
<div>
  <div class="loading" v-show="loading">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
      style="position:absolute; margin-left:540px; margin-top:270px"
    ></v-progress-circular>
  </div>
  
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
        <v-layout>
          
          <v-menu offset-y style="position: absolute;right: 50px;">
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
        </v-layout>

        <v-layout row wrap style="margin-bottom:10px" v-if="valider === false">
         <!-- <v-layout row wrap block> -->
           <v-flex xs12 md12 lg12 style="margin-bottom: 20px;">

            <v-breadcrumbs divider="/">
              <v-breadcrumbs-item
                :disabled="true"
              >
                Tableau de bord
              </v-breadcrumbs-item>
              <v-breadcrumbs-item
                :disabled="false"
                v-if="load === 1"
              >
                Données brutes
              </v-breadcrumbs-item>
            </v-breadcrumbs>
           </v-flex>
          <!-- </v-layout> -->
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block deep-orange darken-2" dark>
                <v-icon dark>supervised_user_circle</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="votant" class="number-card" style="color:#e64a2b !important">{{nbVotant}}</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Nombre Total de <br>votant à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="deep-orange darken-2" height="4" :value="nbVotant"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block warning" dark>
                <v-icon dark>stars</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="voix" class="number-card" style="color:#FFAB00 !important">{{nbVote}}</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Total de votes <br>acquis soit <b>{{tauxVoixObtenue}} %</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="warning" height="4" :value="nbVote"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block success" dark>
                <v-icon dark>voice_over_off</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="abstention" class="number-card" style="color:#53af50 !important">{{tauxAbstention}}%</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Taux d'abstention <br>à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" :value="tauxAbstention"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block primary">
                <v-icon dark>how_to_vote</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="participation" class="number-card" style="color:#3c76d2 !important">{{tauxParticipation}}%</span><br>
                  <span style="font-size:11px;text-transform:uppercase ">Taux de participation <br>à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="primary" height="4" :value="tauxParticipation"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->

          <!--  Stat bar -->
          <v-flex xs6 md4 lg4>
            <v-card v-if="load === 1">
              <!-- <div class="card-icon-block primary">
                <v-icon dark>how_to_vote</v-icon>
              </div> -->
              <!-- <v-card-title style="padding-top: 50px;padding-bottom:0"> -->
                <v-list>
                  <v-list-tile
                    v-for="(item, i) in classement"
                    :key="'brute'+i"
                    avatar
                    @click=""
                  >
                  
                    <v-list-tile-action>
                      <v-btn icon ripple style="position: relative;font-size: large;" :color="item.color" dark>
                        <span ripple icon>
                          <b v-if="item.ranking === 1" style="float:left;margin-left: -5px;">{{item.ranking}}</b>
                          <b v-else style="float: left;margin-left: -11px;">{{item.ranking}}</b>
                          <small v-if="item.ranking === 1" style="font-size: 8px;text-transform: lowercase;position: absolute;">er</small>
                          <small v-else style="font-size: 8px;text-transform: lowercase;position: absolute;right: 4px;">ème</small>
                        </span>
                      </v-btn>
                      <!-- <span ripple icon v-text="item.ranking"></span> -->
                      <!-- <v-icon v-if="item.icon" color="pink">star</v-icon> -->
                    </v-list-tile-action>

                    <!-- <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar> -->

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <span style="color:green"><b>{{item.voix}}</b></span>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              <!-- </v-card-title> -->
              <!-- <v-card-actions>
                <v-progress-linear color="primary" height="4" :value="tauxParticipation"></v-progress-linear>
              </v-card-actions> -->
            </v-card>
            <v-card v-else style="height:184px">
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
        </v-layout>

        <v-layout row wrap style="margin-bottom:10px" v-if="valider === true">
          <v-flex xs12 md12 lg12 style="margin-bottom: 20px;">
            <v-breadcrumbs divider="/">
              <v-breadcrumbs-item
                :disabled="true"
              >
                Tableau de bord
              </v-breadcrumbs-item>
              <v-breadcrumbs-item
                :disabled="false"
                v-if="load === 1"
              >
                Données validées
              </v-breadcrumbs-item>
            </v-breadcrumbs>
           </v-flex>
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block deep-orange darken-2" dark>
                <v-icon dark>supervised_user_circle</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="votant" class="number-card" style="color:#e64a2b !important">{{nbVotant}}</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Nombre Total de <br>votant à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="deep-orange darken-2" height="4" :value="nbVotant"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block warning" dark>
                <v-icon dark>stars</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="voix" class="number-card" style="color:#FFAB00 !important">{{nbVote}}</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Total de votes <br>acquis soit <b>{{tauxVoixObtenue}} %</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="warning" height="4" :value="nbVote"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block success" dark>
                <v-icon dark>voice_over_off</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="abstention" class="number-card" style="color:#53af50 !important">{{tauxAbstention}}%</span><br>
                  <span style="font-size:11px;text-transform:uppercase">Taux d'abstention <br>à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="success" height="4" :value="tauxAbstention"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
          <!--  Stat bar -->
          <v-flex xs6 md2 lg2>
            <v-card>
              <div class="card-icon-block primary">
                <v-icon dark>how_to_vote</v-icon>
              </div>
              <v-card-title style="padding-top: 50px;padding-bottom:0">
                <div style="text-align: right;width:100%">
                  <span id="participation" class="number-card" style="color:#3c76d2 !important">{{tauxParticipation}}%</span><br>
                  <span style="font-size:11px;text-transform:uppercase ">Taux de participation <br>à <b>{{user.commune}}</b></span>
                  <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-progress-linear color="primary" height="4" :value="tauxParticipation"></v-progress-linear>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->

          <!--  Stat bar -->
          <v-flex xs6 md4 lg4>
            <v-card v-if="load === 1">
              <!-- <div class="card-icon-block primary">
                <v-icon dark>how_to_vote</v-icon>
              </div> -->
              <!-- <v-card-title style="padding-top: 50px;padding-bottom:0"> -->
                <v-list>
                  <v-list-tile
                    v-for="(item, i) in classement"
                    :key="'valide'+i"
                    avatar
                    @click=""
                  >
                  
                    <v-list-tile-action>
                      <v-btn icon ripple style="position: relative;font-size: large;" :color="item.color" dark>
                        <span ripple icon>
                          <b v-if="item.ranking === 1" style="float:left;margin-left: -5px;">{{item.ranking}}</b>
                          <b v-else style="float: left;margin-left: -11px;">{{item.ranking}}</b>
                          <small v-if="item.ranking === 1" style="font-size: 8px;text-transform: lowercase;position: absolute;">er</small>
                          <small v-else style="font-size: 8px;text-transform: lowercase;position: absolute;right: 4px;">ème</small>
                        </span>
                      </v-btn>
                      <!-- <span ripple icon v-text="item.ranking"></span> -->
                      <!-- <v-icon v-if="item.icon" color="pink">star</v-icon> -->
                    </v-list-tile-action>

                    <!-- <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar> -->

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <span style="color:green"><b>{{item.voix}}</b></span>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              <!-- </v-card-title> -->
              <!-- <v-card-actions>
                <v-progress-linear color="primary" height="4" :value="tauxParticipation"></v-progress-linear>
              </v-card-actions> -->
            </v-card>
            <v-card v-else style="height:184px">
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
  
        </v-layout>
        
  
        <v-layout row wrap style="margin-bottom:10px">
  
          <!--  Graphique -->
          <v-flex xs12 md12 lg12>
            <v-card v-if="loaded">
              <!-- <charts :data="chartData.data" :id="chartData.id" :type="" :options="chartData.options" :legend="">
              </charts> -->
                <section style="padding-top: 10px;">
                  <span style="font-size: 17px;text-transform: uppercase;"> {{chartData.legend}} </span>
                </section>
                <div id="divGraph" style="padding:10px; background: white">
                <canvas :id="'chart'+chartData.id" :width="400" :height="500"></canvas>
                </div>
  
            </v-card>
          </v-flex>
          <!-- Fin Graphique -->

        </v-layout>
  
      </v-container>
    </v-slide-y-transition>
  </v-container>
  
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
// Config API
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "UserInterface",
  props: {
    user: Object
  },
  components: {},
  data() {
    return {
      // Affiche les graphiques
      loading: false,
      clickDonneesBrute: false,
      clickDonneesValide: false,
      loaded: true,
      valider: false,
      checked: 0,
      created: 0,
      load: 0,
      checkValide: "",
      checkBrute: "",

      // verifie en BD si des stats sont disponibles

      oldData: [],
      oldLabel: [],
      oldStatsCandidat: [0, 0, 0, 0, 0],
      oldClassement: [],
      newStatsCandidat: [],

      // affiche le nom du candidat
      nomCandidat: "",

      // Affiche les statistiques du bureau de vote
      nbVotant: 0,
      nbVote: 0,
      classement: [],
      tauxAbstention: 0,
      tauxParticipation: 0,
      tauxVoixObtenue: 0,

      // Variable tempon de la fonction affichant les graphiques
      barChartLabel: [],
      dataChartLabel: [],

      // Objet permettant de créer le graphique en bar
      chartData: {
        id: 1,
        legend: "Graphique des voix du candidats par centres",
        type: "line",
        data: {
          // labels: [],
          datasets: [
            {
              // another line graph
              label: "Nombre de voix",
              backgroundColor: "#7E57C2",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: [],
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
  methods: {
    // Fonction permettant de récupérer les données du graphique en bar et en cercle
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

          // Vérifions le status de la requete
          // Success de la requete
          if (data.statusRequete == 100) {
            let resultatsCentres = data.stats_candidat_centres;

            //############## Renseignons les statistiques des différents centres #################
            if (
              this.oldLabel.length === 0 &&
              this.oldData.length === 0 &&
              this.checked === 0
            ) {
              // Renseignons les données des candidats récupérées dans des variables
              for (let key in resultatsCentres) {
                // Récupérons le premier objet
                let centre = resultatsCentres[key];

                // Remplissons les nouvelles valeures
                this.oldLabel.push(centre.libelleCentre);
                this.oldData.push(centre.nbVote);
              }
              // Remplissons les valeures du tableau
              this.barChartLabel = this.oldLabel;
              this.dataChartLabel = this.oldData;

              this.chartData.data.labels = this.barChartLabel;
              this.chartData.data.datasets[0].data = this.dataChartLabel;
              // Créons les différents graphes
              if (this.created === 0) {
                // Créons les différents graphes
                this.createChart(this.chartData.id, this.chartData);
                this.created++;
              }
            } else {
              // Une première valeur à été déja stocké dans les anciennes variables
              // Renseignons les nouvelles valeures dans d'autres variables
              // Initialisons les nouvelle variables
              let newLabel = [];
              let newData = [];

              for (let key in resultatsCentres) {
                // Récupérons le premier objet
                let centre = resultatsCentres[key];

                // Remplissons les nouvelles valeures
                newLabel.push(centre.libelleCentre);
                newData.push(centre.nbVote);
              }

              // Renseignons les données du candidats récupérées dans le graphe en bar
              if (
                this.compareArray(newLabel, this.oldLabel) === false &&
                this.compareArray(newData, this.oldData) === false
              ) {
                this.created = 0;
                // Remplissons le tableau avec les nouvelles valeures
                this.oldLabel = newLabel;
                this.barChartLabel = this.oldLabel;
                this.chartData.data.labels = this.barChartLabel;

                // Remplissons le tableau avec les nouvelles valeures
                this.oldData = newData;
                this.dataChartLabel = this.oldData;
                this.chartData.data.datasets[0].data = this.dataChartLabel;

                // this.loaded = true;
                if (this.created === 0) {
                  // Supprimons l'ancien graph
                  let oldGraph = document.getElementById(
                    "chart" + this.chartData.id
                  );

                  // Récupérons le parent
                  let parent = document.getElementById("divGraph");

                  // Div generée
                  let div = document.getElementsByClassName(
                    "chartjs-size-monitor"
                  );

                  if (oldGraph !== null) {
                    this.loaded = false;

                    this.chartData.id = this.chartData.id + 1;

                    // Créons le nouveau graphique
                    let newGraph = document.createElement("canvas");
                    newGraph.setAttribute("id", "chart" + this.chartData.id);
                    newGraph.setAttribute("width", "400px");
                    newGraph.setAttribute("height", "380px");

                    // Vérifions si l'une des div générée automatiquement existe
                    if (div.length > 0) {
                      let positionDiv = div.length - 1;
                      parent.removeChild(div[positionDiv]);
                    }

                    // Supprimons l'ancien graph et ajoutons le nouveau graph
                    parent.removeChild(oldGraph);
                    parent.appendChild(newGraph);

                    // Créons les différents graphes
                    this.createChart(this.chartData.id, this.chartData);
                    this.loaded = true;
                  }

                  this.created++;
                }
              }
            }

            //############## Renseignons les autres statistiques #################
            // Récupérons le nombre total de votant
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldStatsCandidat.length === 0 && this.checked === 0) {
              // Renseignons les nouvelles valeures dans la variable
              this.oldStatsCandidat[0] = data.nbTotalVotant;
              this.oldStatsCandidat[1] = data.nbTotalVotesAcquis;
              this.oldStatsCandidat[2] = data.pourcentageVoixObtenue;
              this.oldStatsCandidat[3] = data.tauxAbstention;
              this.oldStatsCandidat[4] = data.tauxParticipation;

              // Renseignons les variables à base de notre variable de log
              this.nbVotant = this.oldStatsCandidat[0];
              this.nbVote = this.oldStatsCandidat[1];
              this.tauxVoixObtenue = this.oldStatsCandidat[2];
              this.tauxAbstention = this.oldStatsCandidat[3];
              this.tauxParticipation = this.oldStatsCandidat[4];

              // let newDataNumber = new Array();
              // newDataNumber[0] = new Array("votant", this.nbVotant);
              // newDataNumber[1] = new Array("voix", this.nbVote);

              // for (let item of newDataNumber) {
              //   this.animateValue(item[0], 0, item[1], 4000);
              // }
            } else {
              // LORSQUE C'EST LA DEUXIEME FOIS QU'IL RECUPERE LES DONNEES
              // Renseignons les nouvelles valeures dans la nouvelle variable
              this.newStatsCandidat[0] = data.nbTotalVotant;
              this.newStatsCandidat[1] = data.nbTotalVotesAcquis;
              this.newStatsCandidat[2] = data.pourcentageVoixObtenue;
              this.newStatsCandidat[3] = data.tauxAbstention;
              this.newStatsCandidat[4] = data.tauxParticipation;

              // Comarons les anciènnes valeures et les nouvelles valeures
              if (this.newStatsCandidat[0] > this.oldStatsCandidat[0]) {
                this.nbVotant = this.newStatsCandidat[0];
              }
              if (this.newStatsCandidat[1] > this.oldStatsCandidat[1]) {
                this.nbVote = this.newStatsCandidat[1];
              }
              if (this.newStatsCandidat[2] > this.oldStatsCandidat[2]) {
                this.tauxVoixObtenue = this.newStatsCandidat[2];
              }
              if (this.newStatsCandidat[3] > this.oldStatsCandidat[3]) {
                this.tauxAbstention = this.newStatsCandidat[3];
              }
              if (this.newStatsCandidat[4] > this.oldStatsCandidat[4]) {
                this.tauxParticipation = this.newStatsCandidat[4];
              }
            }

            //############## Renseignons les éléments du classement #################
            // Récupérons les 3 premiers candidats
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldClassement.length === 0 && this.checked === 0) {
              let classement = data.classement;
              for (let step = 0; step < 3; step++) {
                // Donnée du candidat en tête
                if (step === 0) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "green",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 1,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }
                // Donnée du candidat numéro 2
                if (step === 1) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "orange accent-3",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 2,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }
                // Donnée du candidat nuémro 3
                if (step === 2) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "amber accent-3",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 3,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }

                // Mettons à jours la variable permettant d'afficher le classement
                this.classement = [];
                this.classement = this.oldClassement;
              }
            } else {
              // Vérifions si le classement est toujour le même avant de mettre à jour le classement
              let classement = data.classement;
              if (
                this.oldClassement[0] !==
                classement[0].pourcentageVoix + "%"
              ) {
                // Modifions les anciènnes valeures
                this.oldClassement[0] = {
                  title: classement[0].nomPrenom,
                  color: "green",
                  voix: classement[0].pourcentageVoix + "%",
                  ranking: 1,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                this.oldClassement[1] = {
                  title: classement[1].nomPrenom,
                  color: "orange accent-3",
                  voix: classement[1].pourcentageVoix + "%",
                  ranking: 2,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                this.oldClassement[2] = {
                  title: classement[2].nomPrenom,
                  color: "amber accent-3",
                  voix: classement[2].pourcentageVoix + "%",
                  ranking: 3,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                // Mettons à jours la variable permettant d'afficher le classement
                this.classement = [];
                this.classement = this.oldClassement;
              }
            }
            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
          }

          // Si des données sont manquantes en bd
          if (data.statusRequete == 200) {
            // Réinitialisons les variables des graphiques
            if (
              this.oldLabel.length === 0 &&
              this.oldData.length === 0 &&
              this.checked === 0
            ) {
              // Remplissons les valeures du tableau
              this.barChartLabel = this.oldLabel;
              this.dataChartLabel = this.oldData;

              this.loaded = true;
              this.chartData.data.labels = this.barChartLabel;
              this.chartData.data.datasets[0].data = this.dataChartLabel;

              // Créons les différents graphes
              // this.createChart(this.chartData.id, this.chartData);

              // Affichons des données de classement / defaut
              this.oldClassement = [];
              this.oldClassement[0] = {
                title: "-",
                color: "green",
                voix: "-",
                ranking: 1,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };

              this.oldClassement[1] = {
                title: "-",
                color: "orange accent-3",
                voix: "-",
                ranking: 2,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };

              this.oldClassement[2] = {
                title: "-",
                color: "amber accent-3",
                voix: "-",
                ranking: 3,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };
            }

            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
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

          // Vérifions le status de la requete
          // Success de la requete
          if (data.statusRequete == 100) {
            let resultatsCentres = data.stats_candidat_centres;

            //############## Renseignons les statistiques des différents centres #################
            if (
              this.oldLabel.length === 0 &&
              this.oldData.length === 0 &&
              this.checked === 0
            ) {
              // Renseignons les données des candidats récupérées dans des variables
              for (let key in resultatsCentres) {
                // Récupérons le premier objet
                let centre = resultatsCentres[key];

                // Remplissons les nouvelles valeures
                this.oldLabel.push(centre.libelleCentre);
                this.oldData.push(centre.nbVote);
              }
              // Remplissons les valeures du tableau
              this.barChartLabel = this.oldLabel;
              this.dataChartLabel = this.oldData;

              this.chartData.data.labels = this.barChartLabel;
              this.chartData.data.datasets[0].data = this.dataChartLabel;
              // Créons les différents graphes
              if (this.created === 0) {
                // Créons les différents graphes
                this.createChart(this.chartData.id, this.chartData);
                this.created++;
              }
            } else {
              // Une première valeur à été déja stocké dans les anciennes variables
              // Renseignons les nouvelles valeures dans d'autres variables
              // Initialisons les nouvelle variables
              let newLabel = [];
              let newData = [];

              for (let key in resultatsCentres) {
                // Récupérons le premier objet
                let centre = resultatsCentres[key];

                // Remplissons les nouvelles valeures
                newLabel.push(centre.libelleCentre);
                newData.push(centre.nbVote);
              }
              // Renseignons les données du candidats récupérées dans le graphe en bar
              if (
                this.compareArray(newLabel, this.oldLabel) === false &&
                this.compareArray(newData, this.oldData) === false
              ) {
                this.created = 0;
                // Remplissons le tableau avec les nouvelles valeures
                this.oldLabel = newLabel;
                this.barChartLabel = this.oldLabel;
                this.chartData.data.labels = this.barChartLabel;

                // Remplissons le tableau avec les nouvelles valeures
                this.oldData = newData;
                this.dataChartLabel = this.oldData;
                this.chartData.data.datasets[0].data = this.dataChartLabel;

                // this.loaded = true;
                if (this.created === 0) {
                  // Supprimons l'ancien graph
                  let oldGraph = document.getElementById(
                    "chart" + this.chartData.id
                  );

                  // Récupérons le parent
                  let parent = document.getElementById("divGraph");

                  // Div generée
                  let div = document.getElementsByClassName(
                    "chartjs-size-monitor"
                  );

                  if (oldGraph !== null) {
                    this.loaded = false;

                    this.chartData.id = this.chartData.id + 1;

                    // Créons le nouveau graphique
                    let newGraph = document.createElement("canvas");
                    newGraph.setAttribute("id", "chart" + this.chartData.id);
                    newGraph.setAttribute("width", "400px");
                    newGraph.setAttribute("height", "380px");

                    // Vérifions si l'une des div générée automatiquement existe
                    if (div.length > 0) {
                      let positionDiv = div.length - 1;
                      parent.removeChild(div[positionDiv]);
                    }

                    // Supprimons l'ancien graph et ajoutons le nouveau graph
                    parent.removeChild(oldGraph);
                    parent.appendChild(newGraph);

                    // Créons les différents graphes
                    this.createChart(this.chartData.id, this.chartData);
                    this.loaded = true;
                  }

                  this.created++;
                }
              }
            }

            //############## Renseignons les autres statistiques #################
            // Récupérons le nombre total de votant
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldStatsCandidat.length === 0 && this.checked === 0) {
              // Renseignons les nouvelles valeures dans la variable
              this.oldStatsCandidat[0] = data.nbTotalVotant;
              this.oldStatsCandidat[1] = data.nbTotalVotesAcquis;
              this.oldStatsCandidat[2] = data.pourcentageVoixObtenue;
              this.oldStatsCandidat[3] = data.tauxAbstention;
              this.oldStatsCandidat[4] = data.tauxParticipation;

              // Renseignons les variables à base de notre variable de log
              this.nbVotant = this.oldStatsCandidat[0];
              this.nbVote = this.oldStatsCandidat[1];
              this.tauxVoixObtenue = this.oldStatsCandidat[2];
              this.tauxAbstention = this.oldStatsCandidat[3];
              this.tauxParticipation = this.oldStatsCandidat[4];

              // let newDataNumber = new Array();
              // newDataNumber[0] = new Array("votant", this.nbVotant);
              // newDataNumber[1] = new Array("voix", this.nbVote);

              // for (let item of newDataNumber) {
              //   this.animateValue(item[0], 0, item[1], 4000);
              // }
            } else {
              // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
              // Renseignons les nouvelles valeures dans la nouvelle variable
              this.newStatsCandidat[0] = data.nbTotalVotant;
              this.newStatsCandidat[1] = data.nbTotalVotesAcquis;
              this.newStatsCandidat[2] = data.pourcentageVoixObtenue;
              this.newStatsCandidat[3] = data.tauxAbstention;
              this.newStatsCandidat[4] = data.tauxParticipation;

              // Comarons les anciènnes valeures et les nouvelles valeures
              if (this.newStatsCandidat[0] > this.oldStatsCandidat[0]) {
                this.nbVotant = this.newStatsCandidat[0];
              }
              if (this.newStatsCandidat[1] > this.oldStatsCandidat[1]) {
                this.nbVote = this.newStatsCandidat[1];
              }
              if (this.newStatsCandidat[2] > this.oldStatsCandidat[2]) {
                this.tauxVoixObtenue = this.newStatsCandidat[2];
              }
              if (this.newStatsCandidat[3] > this.oldStatsCandidat[3]) {
                this.tauxAbstention = this.newStatsCandidat[3];
              }
              if (this.newStatsCandidat[4] > this.oldStatsCandidat[4]) {
                this.tauxParticipation = this.newStatsCandidat[4];
              }
            }

            //############## Renseignons les éléments du classement #################
            // Récupérons les 3 premiers candidats
            // LORSQUE C'EST LA PREMIERE FOIS QU'IL RECUPERE LES DONNEES
            if (this.oldClassement.length === 0 && this.checked === 0) {
              let classement = data.classement;
              for (let step = 0; step < 3; step++) {
                // Donnée du candidat en tête
                if (step === 0) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "green",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 1,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }
                // Donnée du candidat numéro 2
                if (step === 1) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "orange accent-3",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 2,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }
                // Donnée du candidat nuémro 3
                if (step === 2) {
                  this.oldClassement.push({
                    title: classement[step].nomPrenom,
                    color: "amber accent-3",
                    voix: classement[step].pourcentageVoix + "%",
                    ranking: 3,
                    avatar:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                  });
                }

                // Mettons à jours la variable permettant d'afficher le classement
                this.classement = [];
                this.classement = this.oldClassement;
              }
            } else {
              // Vérifions si le classement est toujour le même avant de mettre à jour le classement
              let classement = data.classement;
              if (
                this.oldClassement[0].voix !==
                classement[0].pourcentageVoix + "%"
              ) {
                // Modifions les anciènnes valeures
                this.oldClassement[0] = {
                  title: classement[0].nomPrenom,
                  color: "green",
                  voix: classement[0].pourcentageVoix + "%",
                  ranking: 1,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                this.oldClassement[1] = {
                  title: classement[1].nomPrenom,
                  color: "orange accent-3",
                  voix: classement[1].pourcentageVoix + "%",
                  ranking: 2,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                this.oldClassement[2] = {
                  title: classement[2].nomPrenom,
                  color: "amber accent-3",
                  voix: classement[2].pourcentageVoix + "%",
                  ranking: 3,
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
                };

                // Mettons à jours la variable permettant d'afficher le classement
                this.classement = [];
                this.classement = this.oldClassement;
              }
            }

            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
          }

          // Si des données sont manquantes en bd
          if (data.statusRequete == 200) {
            // Réinitialisons les variables des graphiques
            if (
              this.oldLabel.length === 0 &&
              this.oldData.length === 0 &&
              this.checked === 0
            ) {
              // Remplissons les valeures du tableau
              this.barChartLabel = this.oldLabel;
              this.dataChartLabel = this.oldData;

              this.loaded = true;
              this.chartData.data.labels = this.barChartLabel;
              this.chartData.data.datasets[0].data = this.dataChartLabel;

              // Créons les différents graphes
              // this.createChart(this.chartData.id, this.chartData);

              // Affichons des données de classement / defaut
              this.oldClassement = [];
              this.oldClassement[0] = {
                title: "-",
                color: "green",
                voix: "-",
                ranking: 1,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };

              this.oldClassement[1] = {
                title: "-",
                color: "orange accent-3",
                voix: "-",
                ranking: 2,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };

              this.oldClassement[2] = {
                title: "-",
                color: "amber accent-3",
                voix: "-",
                ranking: 3,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_tXpPKVwoWQynT736mi5UMQf8cTJeqbrBTjnIc35fU103_bQ"
              };
            }

            // Incrémentons la variable montrant que nous attaquons la bd
            this.checked++;
          }
        });

      this.load = 1;
    },

    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart" + chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
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
    checkTypeData(value) {
      // console.log(valider);
      if (value === true) {
        if (this.clickDonneesValide === false) {
          this.valider = true;
          this.load = 0;
          window.clearInterval(this.checkBrute);
          this.checkValide = setInterval(this.getDataStatsValide, 3000);
          this.clickDonneesValide = true;
          this.clickDonneesBrute = false;
        }
      } else {
        if (this.clickDonneesBrute === false) {
          this.valider = false;
          this.load = 0;
          window.clearInterval(this.checkValide);
          this.checkBrute = setInterval(this.getDataStatsBrute, 3000);
          this.clickDonneesBrute = true;
          this.clickDonneesValide = false;
        }
      }
    },
    compareArray(a1, a2) {
      let equal = false;
      if (a1.length != a2.length) {
        equal = false;
      } else {
        for (var a = 0; a < a1.length; ++a) {
          if (a1[a] != a2[a]) {
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
    load(v) {
      if (v === 0) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    }
  },
  mounted() {
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
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
.number-card {
  color: #4caf50 !important;
  font-size: 30px;
  font-weight: 600;
}
</style>
