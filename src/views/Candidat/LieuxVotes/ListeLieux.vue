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
                Liste des lieux de votes
              </v-breadcrumbs-item>
              
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="green darken-1"
              class="white--text"
              @click.native="addCentre = true"
              style="right: 45px;position: absolute;top: 30px;"
            >
              Ajouter lieu de vote
              <v-icon right dark>how_to_vote</v-icon>
            </v-btn>
            </v-breadcrumbs>


            <v-card>
              <v-toolbar
                dark
                color="light-blue darken-2"
              >
                <v-toolbar-title style="font-size: initial;">Lieux de votes {{ user.commune }} ({{items.length}})</v-toolbar-title>
                <v-autocomplete
                  :loading="loading"
                  :items="listeLieux"
                  :search-input.sync="search"
                  v-model="select"
                  cache-items
                  class="mx-3"
                  flat
                  hide-no-data
                  hide-details
                  label="Rechercher un lieu de vote"
                  solo-inverted
                  @blur="checkValue"
                ></v-autocomplete>
                <v-btn 
                icon
                fab
                small
                color="blue lighten-4"
                dark
                v-if="clear === true" 
                @click="clearResearch">
                  <v-icon>clear</v-icon>
                </v-btn>
                <!-- <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn> -->
              </v-toolbar>
            </v-card>
            <v-expansion-panel>
              <v-expansion-panel-content
                v-for="(item,i) in items"
                :key="i"
                style="padding: 8px 24px;"
              >
                <div slot="header">
                    <v-list-tile
                      avatar
                      ripple
                    >
                      <v-list-tile-content>
                        <v-list-tile-title style="font-size: small;"><v-icon>where_to_vote</v-icon> {{item.name}}</v-list-tile-title>
                      </v-list-tile-content>

                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="text--primary" style="font-size: small;">{{item.localisation}}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Nombre Inscrit : <b>{{item.nbInscrit}}</b></v-list-tile-sub-title>
                      </v-list-tile-content>

                      

                    </v-list-tile>
                </div>
                <v-card>
                  <template v-for="(bv, index) in item.bv">
                    <v-list-tile
                      :key="'bv'+index"
                      avatar
                      ripple
                      style="padding-left: 41px;"
                    >
                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="text--primary" style="font-size: small;"> {{ bv.name }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-content>
                        <v-list-tile-title style="font-size: small;"><v-icon>account_circle</v-icon> {{ bv.representant }}</v-list-tile-title>
                      </v-list-tile-content>
                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title><v-icon>call</v-icon> {{ bv.contact }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-btn 
                        small
                        ripple
                        fab
                        color="orange lighten-1"
                        dark
                        @click="updateBureau = true">
                          <v-icon>
                            create
                          </v-icon>
                        </v-btn>

                      </v-list-tile-action>

                      <v-list-tile-action>                        
                        <v-btn 
                        small
                        ripple
                        fab
                        color="red lighten-1"
                        dark
                        @click="supprimer = true">
                          <v-icon>
                            clear
                          </v-icon>
                        </v-btn>
                      </v-list-tile-action>

                    </v-list-tile>
                    <v-divider
                      v-if="index < items.length"
                      :key="'dv'+index"
                    ></v-divider>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>

          <!-- AJOUTER LIEU DE VOTE -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addCentre" persistent max-width="500px">
                <form id="addCentre">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Ajouter un lieu de vote</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Libellé Lieu de vote" 
                            prepend-icon="where_to_vote"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Localisation" 
                            prepend-icon="edit_location"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field label="Nombre inscrits" 
                            type="number" 
                            min="0" 
                            prepend-icon="list"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field label="Nombre Bureaux de votes" 
                            type="number" 
                            min="1" 
                            prepend-icon="add_location"
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

          <!-- EDITER BUREAU  -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="updateBureau" persistent max-width="400px">
                <form id="updateBureau">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Editer un bureau</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="libellé bureau" 
                            prepend-icon="create"
                            required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 d-flex>
                            <!-- <v-select
                              :items="representants"
                              label="Standard"
                            ></v-select> -->
                            <v-combobox
                              :items="representants"
                              label="Représentant"
                              chips
                              clearable
                              prepend-icon="account_circle"
                              single
                            >
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                  close
                                  @input="remove(data.item)"
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
                      <v-btn color="red darken-2" small @click.native="updateBureau = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="updateBureau = false" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

       <!-- SUPPRIMER UN LIEU DE VOTE  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="supprimer"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment supprimer ce bureau ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de supprimer ce bureau vous acceptez de supprimer toutes les informations dépendant de ce dernier.
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="supprimer = false"
                    >
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="supprimer = false"
                    >
                      Supprimer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
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
  name: "ListeLieux",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      supprimer: false,
      addCentre: false,
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
      search: null,
      select: null,
      representants: [
        "REP 1",
        "REP 2",
        "REP 3",
        "REP 4",
        "REP 5",
        "REP 6",
        "REP 7",
        "REP 8",
        "REP 9",
        "REP 10",
        "REP 11",
        "REP 12",
        "REP 13",
        "REP 14",
        "REP 15",
        "REP 16",
        "REP 17",
        "REP 18",
        "REP 19",
        "REP 20",
        "REP 21",
        "REP 22",
        "REP 23",
        "REP 24",
        "REP 25",
        "REP 26",
        "REP 27",
        "REP 28",
        "REP 29",
        "REP 30"
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
              contact: "08123344"
            },
            {
              id: 2,
              name: "BUREAU 2",
              representant: "PAT KOFFI",
              contact: "08123344"
            },
            {
              id: 3,
              name: "BUREAU 3",
              representant: "ZAMBLE YVES",
              contact: "08123344"
            }
          ]
        },
        {
          name: "GS DEUX PLATEAU SUD 1-2",
          localisation: "2 PLATEAUX ANGRE",
          nbInscrit: "2377",
          bv: [
            {
              id: 4,
              name: "BUREAU 1",
              representant: "FRANCK YAO",
              contact: "08123344"
            },
            {
              id: 5,
              name: "BUREAU 2",
              representant: "PAT KOFFI",
              contact: "08123344"
            },
            {
              id: 6,
              name: "BUREAU 3",
              representant: "ZAMBLE YVES",
              contact: "08123344"
            }
          ]
        }
      ],
      listeLieux: []
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
    checkValue() {
      if (this.search === null && this.select === "") {
        this.clear = false;
      }
      if (this.search === undefined && this.select === null) {
        this.clear = false;
      }
    },
    clearResearch() {
      this.clear = false;
      this.items = [];
      this.items = this.lieux;
      this.select = "";
      this.search = "";
    },
    getNamesCentres() {
      for (let item of this.lieux) {
        this.listeLieux.push(item.name);
      }
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
        this.select = "";
        this.clear = false;
      }
    },
    select(val) {
      if (this.search === null && val === undefined) {
        this.items = this.lieux.filter(e => {
          if (e.name === val) {
            return e;
          }
        });
        this.clear = false;
      }
      if (this.search === "" && val === "") {
        this.items = this.lieux;
        this.clear = false;
      }
      if (val !== "" && val !== undefined) {
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
  computed: {},
  mounted() {
    this.getNamesCentres();
    this.items = this.lieux;
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
</style>
