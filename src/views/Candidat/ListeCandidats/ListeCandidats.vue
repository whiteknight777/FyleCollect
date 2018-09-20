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
                Liste candidats
              </v-breadcrumbs-item>
              
            </v-breadcrumbs>

            <template>
              <v-tabs
                centered
                color="blue-grey lighten-4"
                dark
                icons-and-text
              >
                <v-tabs-slider color="teal darken-4"></v-tabs-slider>

                <v-tab href="#tab-1">
                  Candidats de la commune
                  <v-icon>group</v-icon>
                </v-tab>

                <v-tab href="#tab-2" light>
                  Candidats Suivis
                  <v-icon>stars</v-icon>
                </v-tab>

                <v-tab href="#tab-3" dark>
                  Classement Candidats
                  <v-icon>account_box</v-icon>
                </v-tab>

                <v-tab-item id="tab-1">
                  <v-card >
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Rechercher un candidat"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>

                    <v-data-table
                      :headers="headers1"
                      :items="listeCandidat"
                      :search="search"
                    >
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-left">
                          <v-icon large>person_pin</v-icon>
                        </td>
                        <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ props.item.nomprenom }}</td>
                        <td class="text-xs-left">{{ props.item.partis }}</td>
                        <td class="text-xs-left">
                          <v-btn 
                            small
                            ripple
                            fab
                            color="orange lighten-1"
                            dark
                            v-if="props.item.favorite === false"
                            @click="suivre = true">
                            <v-icon
                            >
                              grade
                            </v-icon>
                            </v-btn>
                        </td>
                      </template>
                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Aucun résultat pour cette recherche "{{ search }}".
                      </v-alert>
                    </v-data-table>
                  </v-card>

                </v-tab-item>

                <v-tab-item id="tab-2">
                  <v-card >
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn 
                      small
                      ripple
                      color="green lighten-1"
                      dark
                      @click="changeOrder = true">
                      <v-icon
                      >
                        keyboard_arrow_up
                      </v-icon>
                      Modifier ordre des candidats
                      </v-btn>
                    </v-card-title>

                    <table class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left">#</th>
                          <th class="text-xs-left">Nom & prénoms</th>
                          <th class="text-xs-left">Partis</th>
                          <th class="text-xs-left">Ordre</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item of CandidatSuivis">
                          <td class="text-xs-left">
                            <v-icon large>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.nomprenom }}</td>
                          <td class="text-xs-left">{{ item.partis }}</td>
                          <td class="text-xs-left">{{ item.ordre }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </v-card>

                </v-tab-item>

                <v-tab-item id="tab-3">
                  <v-card >
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn 
                      small

                      :loading="loading"
                      :disabled="loading"
                      color="green lighten-1"
                    style="color:white"
                      @click="refreshData">
                      <v-icon>
                        refresh
                      </v-icon>
                      Actualiser
                      </v-btn>
                    </v-card-title>
                    
                    <table class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left">#</th>
                          <th class="text-xs-left">Nom & prénoms</th>
                          <th class="text-xs-left">Partis</th>
                          <th class="text-xs-left">Pourcentage voix</th>
                          <th class="text-xs-left">Classement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) of ClassementCandidat" :key="i">
                          <td class="text-xs-left">
                            <v-icon large>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.nomprenom }}</td>
                          <td class="text-xs-left">{{ item.partis }}</td>
                          <td class="text-xs-left">
                            <span>
                            <v-spacer></v-spacer>
                            {{item.voix}} %
                            <v-spacer></v-spacer>
                            </span>
                            <v-progress-linear :aria-label="item.voix+'%'" v-model="item.voix" color="green"></v-progress-linear>
                          </td>
                          <td class="text-xs-left">{{ item.classement }}</td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </v-card>

                   
                </v-tab-item>
              </v-tabs>
            </template>
          </v-flex>

          <!-- AJOUTER CANDIDAT -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addCentre" persistent max-width="500px">
                <form id="addCentre">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Ajouter un représentant</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Nom & Prénom(s)" 
                            prepend-icon="account_circle"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Email" 
                            prepend-icon="alternate_email"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Contact" 
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="addCentre = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addCentre = false" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

          <!-- EDITER CANDIDAT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="updateRepresentant" persistent max-width="500px">
                <form id="updateRepresentant">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modifier un représentant</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Nom & Prénom(s)" 
                            prepend-icon="account_circle"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Email" 
                            prepend-icon="alternate_email"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Contact" 
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="updateRepresentant = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="updateRepresentant = false" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

          <!-- SUIVRE CANDIDAT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="suivre"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment suivre ce candidat ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de suivre ce candidat vous acceptez d'enregistrer ses données de votes.
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="suivre = false"
                    >
                      retour
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="suivre = false"
                    >
                      Confirmer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>

          <!-- MODIFIER ORDRE CANDIDAT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="changeOrder" persistent max-width="500px">
                <form id="changeOrderCandidat">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modifier ordre candidats</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                           <v-combobox
                              v-model="NewOrderCandidatSuivis"
                              :items="OrdreCandidatSuivis"
                              label="Candidats Suivis"
                              chips
                              clearable
                              prepend-icon="account_circle"
                              multiple
                            >
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                  close
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                  <!-- <span>(interest)</span> -->
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="changeOrder = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="changeOrderCandidat" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
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
  name: "ListeCandidats",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      suivre: false,
      changeOrder: false,
      addCentre: false,
      updateRepresentant: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loader: null,
      loading: false,
      clear: false,
      search: "",
      headers1: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "#"
        },
        { text: "Nom & prénoms", value: "nomprenom" },
        { text: "Partis ", value: "partis" },
        { text: "Action", value: "bureau" }
      ],
      listeCandidat: [
        {
          value: false,
          nomprenom: "Candidat 1",
          partis: "RHDP",
          favorite: false
        },
        {
          value: false,
          nomprenom: "Candidat 2",
          partis: "INDEPENDANT",
          favorite: true
        },
        {
          value: false,
          nomprenom: "Candidat 3",
          partis: "PDCI",
          favorite: false
        },
        {
          value: false,
          nomprenom: "Candidat 4",
          partis: "UPCI",
          favorite: true
        }
      ],
      CandidatSuivis: [
        {
          value: false,
          nomprenom: "Candidat 2",
          ordre: "1",
          partis: "INDEPENDANT",
          favorite: true
        },
        {
          value: false,
          nomprenom: "Candidat 4",
          ordre: "2",
          partis: "UPCI",
          favorite: true
        }
      ],
      ClassementCandidat: [
        {
          value: false,
          nomprenom: "Candidat 2",
          ordre: "1",
          partis: "INDEPENDANT",
          voix: "52",
          classement: "1",
          favorite: true
        },
        {
          value: false,
          nomprenom: "Candidat 4",
          ordre: "2",
          partis: "UPCI",
          voix: "28",
          classement: "2",
          favorite: true
        }
      ],
      OrdreCandidatSuivis: [],
      NewOrderCandidatSuivis: []
    };
  },
  methods: {
    changeOrderCandidat() {
      // Préparons le nouveau tableau
      let newTab = [];

      // Faisons une boucle à partir du nouvel ordre
      for (let item of this.NewOrderCandidatSuivis) {
        // Récupérons l'objet du candidat
        let candidat = this.CandidatSuivis.find(e => e.nomprenom === item);

        // Modifions l'ordre des candidats
        candidat.ordre = this.NewOrderCandidatSuivis.indexOf(item) + 1;

        // Rajoutons les candidat selon le nouvelle ordre
        newTab.push(candidat);
      }

      // Vidons la table des candidat suivis
      this.CandidatSuivis.slice(0, 0);

      // Remplissons la table des candidats suivis selon le nouvel ordre
      this.CandidatSuivis = newTab;
      // for (let item of newTab) {
      //   this.CandidatSuivis.push(item);
      // }

      this.OrdreCandidatSuivis = [];
      for (let item of this.CandidatSuivis) {
        this.OrdreCandidatSuivis.push(item.nomprenom);
      }

      this.NewOrderCandidatSuivis = this.OrdreCandidatSuivis;
      this.changeOrder = false;
      // console.log(newTab);
      // console.log(this.CandidatSuivis);
      // console.log(this.NewOrderCandidatSuivis);
    },
    refreshData() {
      this.loader = "loading";
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  computed: {},
  mounted() {
    for (let item of this.CandidatSuivis) {
      this.OrdreCandidatSuivis.push(item.nomprenom);
    }
    this.NewOrderCandidatSuivis = this.OrdreCandidatSuivis;
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
