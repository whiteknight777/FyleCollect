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
              @click.native="addRepresentant = true"
              style="right: 45px;position: absolute;top: 30px;"
            >
              Ajouter représentant
              <v-icon right dark>person_pin</v-icon>
            </v-btn>
            </v-breadcrumbs>

            <template>
              <v-card>
                <v-card-title class="blue-grey lighten-4">
                  <span>Liste des représentants ({{items.length}})</span>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    :loading="loading"
                    :items="representants"
                    :search-input.sync="search"
                    v-model="select"
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Rechercher un representant"
                    solo-inverted
                    @blur="checkValue"
                  ></v-autocomplete>
                  <v-btn 
                  icon
                  fab
                  small
                  v-if="clear === true" 
                  @click="clearResearch">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-card-title>
                  <table v-if="items.length > 0" class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left">#</th>
                          <th class="text-xs-left">Nom & prénoms</th>
                          <th class="text-xs-left">Email</th>
                          <th class="text-xs-left">Contact</th>
                          <th class="text-xs-left">Lieu de vote</th>
                          <th class="text-xs-left">Bureau</th>
                          <th class="text-xs-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) of items" :key="i">
                          <td class="text-xs-left">
                            <v-icon medium>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;width:170px">{{ item.nomprenom }}</td>
                          <td class="text-xs-left">{{ item.email }}</td>
                          <td class="text-xs-left">{{ item.contact }}</td>
                          <td class="text-xs-left">{{ item.lieu }}</td>
                          <td class="text-xs-left">{{ item.bureau }}</td>
                          <td class="text-xs-left">
                            <v-btn 
                              small
                              ripple
                              fab
                              color="orange lighten-1"
                              dark
                              @click="editRepresentant(item.id)">
                              <v-icon
                              >
                                create
                              </v-icon>
                              </v-btn>

                              <!-- <v-btn 
                              small
                              ripple
                              fab
                              color="red lighten-1"
                              dark
                              @click="deleteRepresentant(item.id)">
                              <v-icon
                              >
                                clear
                              </v-icon>
                              </v-btn> -->
                          </td>
                        </tr>
                      </tbody>
                  </table>

                  <v-card v-else style="padding-bottom: 21px;">
                    <v-card-text>
                      <v-card-media class="text-xs-center">
                        <v-spacer></v-spacer>
                          <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> person_pin </v-icon>
                        <v-spacer></v-spacer>
                      </v-card-media>
                          Aucun representant disponible
                    </v-card-text>
                  </v-card>
              </v-card>
            </template>
          </v-flex>

          <!-- AJOUTER REPRESENTANT -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addRepresentant" persistent max-width="500px">
                <form id="addRepresentant" ref="form" lazy-validation>
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title> Ajouter un représentant</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="addRepresentant = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            v-model="newNomprenom"
                            label="Nom & Prénom(s)" 
                            prepend-icon="account_circle"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            v-model="newEmail"
                            label="Email" 
                            :rules="emailRules"
                            prepend-icon="alternate_email"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <div style="margin-left:30px">
                              <v-alert
                                v-model="alert"
                                dismissible
                                transition="scale-transition"
                              >
                                {{alertContact}}
                              </v-alert>
                            </div>
                            <v-text-field 
                            v-model="newContact"
                            label="Contact" 
                            :counter="8"
                            :rules="contactRules"
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>
                          
                          <v-flex xd12 md12 lg12>

                            <v-text-field
                              v-model="newPass"
                              type="password"
                              prepend-icon="lock"
                              label="Nouveau mot de passe"
                              required
                            ></v-text-field>
          
                          </v-flex>

                          <v-flex xd12 md12 lg12>
                            
                            <v-text-field
                              v-model="confirmPass"
                              type="password"
                              prepend-icon="lock_open"
                              label="Confirmer mot de passe"
                              required
                            ></v-text-field>
          
                          </v-flex>

                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="addRepresentant = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addNewRepresentant" dark v-if="valid === true">Enregistrer</v-btn>
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
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title> Modifier un représentant</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="updateRepresentant = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <v-flex xs12>
                            <v-switch
                              :label="updatePass ? 'Veuillez saisir les informations' : 'Voulez-vous modifier le mot de passe du représentant ?'"
                              v-model="updatePass"
                              style="padding-bottom:20px"
                            ></v-switch>

                            <v-text-field 
                            v-model="newNomprenom"
                            label="Nom & Prénom(s)" 
                            prepend-icon="account_circle"
                            required>
                            </v-text-field>
                          </v-flex>

                          <v-flex xs12>
                            <v-text-field 
                            v-model="newEmail"
                            :rules="emailRules"
                            label="Email" 
                            prepend-icon="alternate_email"
                            required>
                            </v-text-field>
                          </v-flex>

                          <v-flex xs12>
                            <div style="margin-left:30px">
                              <v-alert
                                v-model="alert"
                                dismissible
                                transition="scale-transition"
                              >
                                {{alertContact}}
                              </v-alert>
                            </div>
                            <v-text-field 
                            v-model="newContact"
                            :counter="8"
                            :rules="contactRules"
                            label="Contact" 
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>

                          <v-flex xd12 md12 lg12>

                            <v-text-field
                              v-model="newPass"
                              v-if="updatePass === true"
                              type="password"
                              prepend-icon="lock"
                              label="Nouveau mot de passe"
                              required
                            ></v-text-field>
          
                          </v-flex>

                          <v-flex xd12 md12 lg12>
                            
                            <v-text-field
                              v-model="confirmPass"
                              v-if="updatePass === true"
                              type="password"
                              prepend-icon="lock_open"
                              label="Confirmer mot de passe"
                              required
                            ></v-text-field>
          
                          </v-flex>

                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="updateRepresentant = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="updateRepresentantData" dark v-if="valid === true">Enregistrer</v-btn>
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
                max-width="350"
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
                      @click="confirmDeleteRepresentant"
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

    <snackbar
    v-if="snackbar" 
    :text="text"
    :y="y"
    :x="x"
    >
    </snackbar>
</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
import apiConfig from "../../../apiConfig";

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
      valid: false,
      loadingPage: false,
      addRepresentant: false,
      updateRepresentant: false,
      alertContact: "",
      alert: false,
      newNomprenom: "",
      newEmail: "",
      newContact: "",
      representantId: "",
      newPass: "",
      confirmPass: "",
      oldPass: "",
      updatePass: false,
      emailRules: [
        v => !!v || "E-mail obligatoire",
        v => /.+@.+[(.)].+/.test(v) || "E-mail doit être valide"
      ],
      contactRules: [
        v => !!v || "Contact obligatoire",
        v => /[0-9]{7}.+/.test(v) || "Saisissez un contact valide",
        v => (v && v.length <= 8) || "Votre numéro doit contenir 8 chiffres"
      ],
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      search: "",
      listeRepresentants: [],
      representants: [],
      items: [],
      search: null,
      select: null
    };
  },
  methods: {
    getListeRepresentant() {
      this.loadingPage = true;
      this.axios
        .get(
          apiConfig.baseURL + "representants/listAll/" + this.user.idCandidat,
          {
            headers: {
              "Content-type": apiConfig.headers.Content_type
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.listeRepresentants = data.listeRepresentants;
            this.items = this.listeRepresentants;

            this.getNamesRepresentant();
            this.loadingPage = false;
          }

          if (data.statusRequete == 200) {
            this.listeRepresentants = [];
            this.items = this.listeRepresentants;
          }
        });
    },
    checkContact(contact) {
      this.axios
        .get(apiConfig.baseURL + "representants/check_contact/" + contact, {
          headers: {
            "Content-type": apiConfig.headers.Content_type
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Signalons qu'un numéro similaire existe deja en bd
            let rep = data.representant;
            if (rep.id !== this.representantId) {
              this.alertContact =
                "Numéro déjà existant (" +
                rep.nomprenom +
                ") veuillez le modifier !";
              this.alert = true;
              this.valid = false;
            }
          }

          if (data.statusRequete == 200) {
            this.alert = false;
            this.valid = true;
          }
        });
    },
    addNewRepresentant() {
      if (this.valid === true) {
        this.addRepresentant = false;
        this.loadingPage = true;
        this.snackbar = false;
        let form = document.getElementById("addRepresentant");
        let data = new FormData(form);
        data.append("idCandidat", this.user.idCandidat);
        data.append("nomprenom", this.newNomprenom);
        data.append("email", this.newEmail);
        data.append("contact", this.newContact);
        // Vérifions les informations saisies
        let validPass = false;
        let valid = false;
        // Vérifions si le nouveau mot de passe est identique au champ confirmer
        if (this.newPass === this.confirmPass) {
          valid = true;
          data.append("password", this.confirmPass);
        }

        if (valid === true) {
          this.axios
            .post(apiConfig.baseURL + "representants/add/new", data, {
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            })
            .then(response => {
              let data = response.data;

              if (data.statusRequete == 100) {
                this.listeRepresentants.push(data.newRepresentant);
                this.items = this.listeRepresentants;

                this.getNamesRepresentant();
                this.loadingPage = false;
                this.text = "Nouveau representant ajouté";
                this.snackbar = true;

                // Réinitialisons les variables
                this.newNomprenom = "";
                this.newEmail = "";
                this.newContact = "";
                this.newPass = "";
                this.confirmPass = "";
                this.valid = false;
              }
            });
        } else {
          // Vérifions si le nouveau mot de passe est identique à celui qui doit être ressaisie
          this.loadingPage = false;
          this.newPass = "";
          this.confirmPass = "";
          this.text = "Erreur... Veuillez saisir le même mot de passe";
          this.snackbar = true;
        }
      }
    },
    updateRepresentantData() {
      if (this.valid === true) {
        this.updateRepresentant = false;
        this.snackbar = false;
        let sendData = true;

        let form = document.getElementById("updateRepresentant");
        let data = new FormData(form);
        data.append("idRepresentant", this.representantId);
        data.append("nomprenom", this.newNomprenom);
        data.append("email", this.newEmail);
        data.append("contact", this.newContact);

        let validPass = false;
        if (this.updatePass === true) {
          if (this.newPass === this.confirmPass) {
            validPass = true;
            data.append("newPassword", this.confirmPass);
            this.loadingPage = true;
          } else {
            sendData = false;
          }
        }

        if (sendData === true) {
          this.axios
            .post(apiConfig.baseURL + "representants/edit/info", data, {
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            })
            .then(response => {
              let data = response.data;

              if (data.statusRequete == 100) {
                // Recupérons les nouvelles données
                let representant = data.newInfo;

                // Recherchons dans notre liste le representant modifier
                this.items.filter(e => {
                  if (e.id === representant.id) {
                    e.nomprenom = representant.nomprenom;
                    e.email = representant.email;
                    e.contact = representant.contact;
                    e.lieu = representant.lieu;
                    e.bureau = representant.bureau;
                  }
                });

                this.representants = [];
                this.getNamesRepresentant();
                this.loadingPage = false;
                this.text = "Modification(s) enreggistrée(s)";
                this.snackbar = true;

                // Réinitialisons les variables
                this.newNomprenom = "";
                this.newEmail = "";
                this.newContact = "";
                this.newPass = "";
                this.confirmPass = "";
                this.valid = false;
              }
            });
        } else {
          // Vérifions si le nouveau mot de passe est identique à celui qui doit être ressaisie
          this.newPass = "";
          this.confirmPass = "";
          this.text = "Erreur... Veuillez saisir le même mot de passe";
          this.snackbar = true;
        }
      }
    },
    confirmDeleteRepresentant() {
      this.supprimer = false;
      this.loadingPage = true;
      this.snackbar = false;
      this.axios
        .get(
          apiConfig.baseURL + "representants/delete/" + this.representantId,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Recherchons dans notre liste le representant supprimer

            this.listeRepresentants.filter(e => {
              if (e.id === this.representantId) {
                let key = this.listeRepresentants.indexOf(e);
                this.listeRepresentants.splice(key, 1);
              }
            });
            // console.log(this.listeRepresentants.length);
            // console.log(this.items);
            this.items = this.listeRepresentants;
            this.representants = [];
            this.getNamesRepresentant();
            this.clearResearch();
            this.loadingPage = false;
            this.text = "suppression(s) effectuée(s)";
            this.snackbar = true;
          }
        });
    },
    editRepresentant(idRepresentant) {
      this.representantId = idRepresentant;
      // Recherchons le representant ayant cette id
      let representant = this.items.filter(e => {
        if (e.id === idRepresentant) return e;
      });

      this.newNomprenom = representant[0].nomprenom;
      this.newEmail = representant[0].email;
      this.newContact = representant[0].contact;
      this.updateRepresentant = true;
    },
    deleteRepresentant(idRepresentant) {
      this.supprimer = true;
      this.representantId = idRepresentant;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.listeRepresentants.filter(e => {
          return (
            (e.nomprenom || "").toLowerCase().indexOf((v || "").toLowerCase()) >
              -1 ||
            (e.email || "").toLowerCase().indexOf((v || "").toLowerCase()) >
              -1 ||
            (e.contact || "").toLowerCase().indexOf((v || "").toLowerCase()) >
              -1 ||
            (e.lieu || "").toLowerCase().indexOf((v || "").toLowerCase()) >
              -1 ||
            (e.bureau || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },
    checkValue() {
      // console.log("test");
      if (this.search === null && this.select === "") {
        this.clear = false;
        // console.log("test");
        this.items = this.listeRepresentants.filter(e => {
          return (
            (e.name || "")
              .toLowerCase()
              .indexOf((this.search || "").toLowerCase()) > -1
          );
        });
      }
      if (this.search === undefined && this.select === null) {
        this.clear = false;
      }
    },
    resetItem() {
      this.items = this.listeRepresentants;
    },
    clearResearch() {
      this.clear = false;
      this.select = null;
      this.search = null;
      this.resetItem();
    },
    getNamesRepresentant() {
      for (let item of this.listeRepresentants) {
        this.representants.push(item.nomprenom);
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
        this.select = null;
        this.clear = false;
      }
    },
    select(val) {
      if (this.search === null && val === null) {
        this.items = this.listeRepresentants;
        this.clear = false;
      }
      if (this.search === "" && val === "") {
        this.items = this.listeRepresentants;
        this.clear = false;
      }
      if (val !== "" && val !== undefined && val !== null) {
        this.items = [];
        this.items = this.listeRepresentants.filter(e => {
          if (e.nomprenom === val) {
            return e;
          }
        });
        this.clear = true;
      }
    },
    newContact(v) {
      // Vérifions si le numéro est correct
      if (!/[0-9]{7}.+/.test(v)) this.valid = false;

      // Vérifions si le champ n'est pas vide
      if (v.length === 0) this.valid = false;

      // Vérifions si le champ comporte uniquement 8 chiffres
      if ((v && v.length < 8) || (v && v.length > 8)) this.valid = false;

      // Vérifions si le tout est ok
      if (
        this.newNomprenom.length > 0 &&
        v.length > 0 &&
        this.newEmail.length > 0 &&
        /[0-9]{7}.+/.test(v) === true &&
        v.length < 9
      ) {
        this.checkContact(v);
        // this.valid = true;
      } else this.valid = false;
    },
    newEmail(v) {
      // Vérifions si l'email est correct
      if (!/.+@.+[(.)].+/.test(v)) this.valid = false;

      // Vérifions si le champ n'est pas vide
      if (v.length === 0) this.valid = false;

      // Vérifions si le tout est ok
      if (
        this.newContact.length > 0 &&
        v.length > 0 &&
        this.newNomprenom.length > 0 &&
        /.+@.+[(.)].+/.test(v) === true
      ) {
        this.valid = true;
      } else this.valid = false;
    },
    newNomprenom(v) {
      // Vérifions si le champ n'est pas vide
      if (v.length === 0) this.valid = false;

      // Vérifions si le tout est ok
      if (
        this.newContact.length < 9 &&
        this.newContact.length > 0 &&
        v.length > 0 &&
        this.newEmail.length > 0 &&
        /[0-9]{7}.+/.test(this.newContact) === true &&
        /.+@.+[(.)].+/.test(this.newEmail) === true
      )
        this.valid = true;
      else this.valid = false;
    }
  },
  computed: {},
  mounted() {
    this.getListeRepresentant();
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
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(101, 101, 101);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
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
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
</style>
