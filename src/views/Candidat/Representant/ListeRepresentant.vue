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
                Liste des représentants
              </v-breadcrumbs-item>
              
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="green darken-1"
              class="white--text"
              @click.native="addCentre = true"
              style="right: 45px;position: absolute;top: 30px;"
            >
              Ajouter représentant
              <v-icon right dark>person_pin</v-icon>
            </v-btn>
            </v-breadcrumbs>

            <template>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Rechercher un représentant"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>

                <v-data-table
                  :headers="headers"
                  :items="listeRepresentants"
                  :search="search"
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">
                      <v-icon large>person_pin</v-icon>
                    </td>
                    <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ props.item.nomprenom }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td class="text-xs-left">{{ props.item.contact }}</td>
                    <td class="text-xs-left">{{ props.item.lieu }}</td>
                    <td class="text-xs-left">{{ props.item.bureau }}</td>
                    <td class="text-xs-left">
                       <v-btn 
                        small
                        ripple
                        fab
                        color="orange lighten-1"
                        dark
                        @click="updateRepresentant = true">
                        <v-icon
                        >
                          create
                        </v-icon>
                        </v-btn>

                        <v-btn 
                        small
                        ripple
                        fab
                        color="red lighten-1"
                        dark
                        @click="supprimer = true">
                        <v-icon
                        >
                          clear
                        </v-icon>
                        </v-btn>
                    </td>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Aucun résultat pour cette recherche "{{ search }}".
                  </v-alert>
                </v-data-table>
              </v-card>
            </template>
          </v-flex>

          <!-- AJOUTER REPRESENTANT -->

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

          <!-- EDITER REPRESENTANT  -->

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

          <!-- SUPPRIMER REPRESENTANT  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="supprimer"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment supprimer ce représentant ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de supprimer ce représentant vous acceptez de supprimer toutes les informations dépendant de ce dernier.
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
  name: "ListeRepresentant",
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
      updateRepresentant: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      search: "",
      headers: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "#"
        },
        { text: "Nom & prénoms", value: "nomprenom" },
        { text: "Email", value: "email" },
        { text: "Contact", value: "contact" },
        { text: "Lieu de vote", value: "lieu" },
        { text: "Bureau", value: "bureau" },
        { text: "Action", value: "bureau" }
      ],
      listeRepresentants: [
        {
          value: false,
          nomprenom: "Representant 1",
          email: "email@gmail.com",
          contact: "09228877",
          lieu: "LYCEE TECHNIQUE",
          bureau: "Bureau 1"
        },
        {
          value: false,
          nomprenom: "Representant 2",
          email: "email@gmail.com",
          contact: "08228877",
          lieu: "GS DEUX PLATEAU SUD 1-2",
          bureau: "Bureau 1"
        },
        {
          value: false,
          nomprenom: "Representant 3",
          email: "email@gmail.com",
          contact: "07228877",
          lieu: "ECOLE DE LA GENDARMERIE",
          bureau: "Bureau 1"
        },
        {
          value: false,
          nomprenom: "Representant 4",
          email: "email@gmail.com",
          contact: "09222877",
          lieu: "ECOLE DE POLICE",
          bureau: "Bureau 1"
        }
      ]
    };
  },
  methods: {},
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
