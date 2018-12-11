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
                Liste des paramètres
              </v-breadcrumbs-item>
              
            <!-- <v-btn
              :loading="loading"
              :disabled="loading"
              color="green darken-1"
              class="white--text"
              @click.native="addCentre = true"
              style="right: 45px;position: absolute;top: 30px;"
            >
              Ajouter représentant
              <v-icon right dark>person_pin</v-icon>
            </v-btn> -->
            </v-breadcrumbs>

            <template>
              <v-card>
                <v-list
                    subheader
                    three-line
                  >
                    <v-subheader>Comptes & Paramètres Fyle SMS</v-subheader>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Compte Client</v-list-tile-title>
                        <v-list-tile-sub-title>L'ensemble des comptes du candidat sont rattaché aux client</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Code Client"
                          type="text"
                          readonly=""
                          :value="parameters.compteClient"
                          box
                          min=0
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Compte FyleSMS</v-list-tile-title>
                        <v-list-tile-sub-title>Compte permettant d'utiliser l'API de Fyle SMS</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Code Fyle SMS"
                          type="text"
                          readonly=""
                          :value="parameters.loginFyleSms"
                          box
                          min=0
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Donnée CDS</v-list-tile-title>
                        <v-list-tile-sub-title>Paramètre compte Fyle SMS</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Code Fyle SMS"
                          type="text"
                          readonly=""
                          :value="parameters.cds"
                          box
                          min=0
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Mot clée FC</v-list-tile-title>
                        <v-list-tile-sub-title>Mot clée permettant d'envoyer des données de vote par SMS</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Code Fyle SMS"
                          type="text"
                          readonly=""
                          :value="parameters.motCle"
                          box
                          min=0
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Donnée SPE</v-list-tile-title>
                        <v-list-tile-sub-title>Paramètre compte Fyle SMS</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Code Fyle SMS"
                          type="text"
                          readonly=""
                          :value="parameters.spe"
                          box
                          min=0
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                  </v-list>

                  <v-divider></v-divider>

                  <v-list
                    subheader
                    three-line
                  >
                    <v-subheader>Syntaxes Sms</v-subheader>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Syntaxe Résultats de votes</v-list-tile-title>
                        <v-list-tile-sub-title>Exemple de syntaxe RV : <b>{{parameters.syntaxeRV}} voixCandidat1*voixCandidat2*voixCandidat3</b></v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Syntaxe Résultats de votes"
                          type="text"
                          readonly=""
                          :value="parameters.syntaxeRV"
                          box
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                  <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Syntaxe Résultats du bureau de vote</v-list-tile-title>
                        <v-list-tile-sub-title>Exemple de syntaxe RB : <b>{{parameters.syntaxeRB}} NombreVotants*NombreBulletinNull</b></v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-text-field
                          label="Syntaxe Résultats du bureau de vote"
                          type="text"
                          readonly=""
                          :value="parameters.syntaxeRB"
                          box
                          required
                        ></v-text-field>
                      </v-list-tile-action>
                    </v-list-tile>

                  </v-list>

                  <v-divider></v-divider>


                  <v-list
                    subheader
                    three-line
                  >
                    <v-subheader>Paramètres généraux</v-subheader>

                    

                     <v-flex xd12 md12 lg12 style="padding-left:17px;padding-right:17px">
                      <v-switch
                        :label="updatePass ? 'Modifier votre mot de passe' : ''"
                        v-model="updatePass"
                        style="padding-bottom:20px"
                      ></v-switch>

                      <v-text-field
                        v-model="oldPass"
                        :disabled="!updatePass"
                        type="password"
                        box
                        label="Ancien mot de passe"
                        required
                      ></v-text-field>
    
                    </v-flex>

                    <v-flex xd12 md12 lg12 style="padding-left:17px;padding-right:17px">

                      <v-text-field
                        v-model="newPass"
                        :disabled="!updatePass"
                        type="password"
                        box
                        label="Nouveau mot de passe"
                        required
                      ></v-text-field>
    
                    </v-flex>

                    <v-flex xd12 md12 lg12 style="padding-left:17px;padding-right:17px">
                      
                      <v-text-field
                        v-model="confirmPass"
                        :disabled="!updatePass"
                        type="password"
                        box
                        label="Confirmer mot de passe"
                        required
                      ></v-text-field>
    
                    </v-flex>

                    <v-flex xd12 md12 lg12 style="padding-left:17px;padding-right:17px">
                      <v-btn color="primary" 
                      :loading="loading"
                      v-if="updatePass"
                      block large 
                      @click="updateMyPass()" 
                      style="margin-top:30px">
                      Enregistrer
                      <!-- <span slot="loader">Loading...</span> -->
                      </v-btn>
                    </v-flex>

                  </v-list>
              </v-card>
            </template>
          </v-flex>

        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
  
  <v-snackbar
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ text }} 
    <v-btn
      color="pink"
      flat
      @click="snackbar = false"
    >
      Fermer
    </v-btn>
  </v-snackbar>

</div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
import apiConfig from "../../../apiConfig";

export default {
  name: "Parametres",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      notifications: false,
      updatePass: false,
      sound: true,
      widgets: false,
      supprimer: false,
      loadingPage: false,
      addCentre: false,
      newPass: "",
      confirmPass: "",
      oldPass: "",
      updateRepresentant: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      parameters: {
        compteClient: "",
        loginFyleSms: "",
        motCle: "",
        cds: "",
        spe: "",
        syntaxeRV: "",
        syntaxeRB: ""
      }
    };
  },
  methods: {
    getParameters() {
      this.loadingPage = true;

      this.axios
        .get(
          apiConfig.baseURL + "parametres/candidat/" + this.user.idCandidat,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Recupérons les différents paramètres
            this.parameters = data.parametresCandidat;
            this.loadingPage = false;
          }
        });
    },
    updateMyPass() {
      this.loadingPage = true;
      this.snackbar = false;
      let valid = false;
      let badPass = true;
      // Vérifions si les données saisie sont correctes
      if (this.oldPass === this.user.password) {
        badPass = false;
        // Vérifions si le nouveau mot de passe est identique à champ confirmer
        if (this.newPass === this.confirmPass) {
          valid = true;
        }
      }

      let data = new FormData();
      data.append("idRepresentant", this.user.idRepresentant);
      data.append("newPassword", this.newPass);
      data.append("gradeUser", this.user.grades);

      if (valid === true) {
        this.axios
          .post(apiConfig.baseURL + "parametres/update/password", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            let data = response.data;
            if (data.statusRequete == 100) {
              // Recupérons les différents paramètres
              this.user.password = this.newPass;

              this.oldPass = "";
              this.newPass = "";
              this.confirmPass = "";
              this.loadingPage = false;
              this.text = "Mot de passe modifé avec succcès";
              this.snackbar = true;
            }
          })
          .catch(response => {
            this.loadingPage = false;
            this.text = "Une erreur s'est produite... Veuillez rééssayer";
            this.snackbar = true;
          });
      } else {
        // Vérifions si nous avons saisie le bon mot de passe
        if (badPass === true) {
          this.loadingPage = false;
          this.text = "Erreur... Veuillez saisir le bon mot de passe";
          this.snackbar = true;
        } else {
          // Vérifions si le nouveau mot de passe est identique à celui qui doit être ressaisie
          this.loadingPage = false;
          this.text = "Erreur... Veuillez saisir le même mot de passe";
          this.snackbar = true;
        }
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.getParameters();
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
