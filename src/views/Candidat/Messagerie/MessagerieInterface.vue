<template>
    <v-slide-y-transition mode="out-in">
  
        <!-- ############## MENU MESSAGERIE ################## -->
        <v-layout row wrap>
          <!--  Stat bar -->
          <v-flex xs4 md3 lg3>
            <v-card style="min-height: 605px">
              <v-toolbar color="light-blue" dark>

                <v-toolbar-title>Messagerie</v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- <v-btn icon @click="dialog = true">
                  <v-icon>add</v-icon>
                </v-btn> -->

                <v-btn icon>
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-toolbar>



              <v-list two-line subheader>


              <v-subheader inset>Menu</v-subheader>


                <v-list-tile
                  avatar
                  @click="openNewSmsForm"
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'orange lighten-1 white--text'">textsms</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Envoyer Sms</v-list-tile-title>
                    <v-list-tile-sub-title>Envoyer un message</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">32</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'blue lighten-1 white--text'">email</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Boîte de réception</v-list-tile-title>
                    <v-list-tile-sub-title>Messages reçus</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">32</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'green lighten-1 white--text'">chat</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Sms Envoyés</v-list-tile-title>
                    <v-list-tile-sub-title>Messages envoyés</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="green lighten-1">24</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'red lighten-1 white--text'">list_alt</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Contacts</v-list-tile-title>
                    <v-list-tile-sub-title>Mes contacts</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">12</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>


              <v-divider inset></v-divider>

                <v-subheader inset>Mes groupes</v-subheader>

                <v-list-tile
                  avatar
                  @click="toutAfficher = true"
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'grey lighten-1 white--text'">folder</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Groupes</v-list-tile-title>
                    <v-list-tile-sub-title>Classer vos contacts</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">34</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>



          
        <!-- ############## LISTE DES MSG GRAND BLOCK ################## -->
          <v-flex xs4 md9 lg9 v-if="smsReçu == true">
             <v-card style="min-height: 100%">
               <v-card-title>
                BOÎTE DE RECEPTION
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Rechercher"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="listMessage"
                :search="search"
                :pagination.sync="pagination"
                item-key="name"
                hide-actions
                class="elevation-1"
              >
                <template slot="headers" slot-scope="props">
                  <tr style="text-align: left;">
                    <th>
                      <v-checkbox
                        :input-value="props.all"
                        :indeterminate="props.indeterminate"
                        primary
                        hide-details
                        @click.native="toggleAll"
                      ></v-checkbox>
                    </th>
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value)"
                    >
                      <v-icon small>arrow_upward</v-icon>
                      {{ header.text }}
                    </th>
                  </tr>
                </template>
                <template slot="items" slot-scope="props">
                  <tr :active="props.item.selected" style="cursor:pointer" @click="[props.item.selected = !props.item.selected, content = true, props.expanded = !props.expanded]">
                    <td>
                      <v-checkbox
                        :input-value="props.item.selected"
                        primary
                        hide-details
                      ></v-checkbox>
                    </td>
                    <td>{{ props.item.content }}</td>
                    <td class="text-xs-left">{{ props.item.destinataire }}</td>
                    <td class="text-xs-left">{{ props.item.dateReception }}</td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <v-card-text>Peek-a-boo!</v-card-text>
                  </v-card>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Aucun élément ne correspond à votre recherche.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>


        <!-- ############## LISTE DES MSG GRAND BLOCK ################## -->
          <v-flex xs4 md9 lg9 v-if="sendSms === true">
             <v-card style="min-height: 100%">
               <v-card-title>
                <h3 style="text-decoration:underline">ENVOYEZ UN NOUVEAU SMS</h3>
                <v-spacer></v-spacer>
                <v-btn color="error" 
                :loading="loading"
                :disabled="loading"
                fab small @click.native="closeNewSmsForm" 
                style="margin-top:30px">
                <v-icon dark>clear</v-icon>
                <!-- <span slot="loader">Loading...</span> -->
                </v-btn>
              </v-card-title>

                  
              <v-container grid-list-md text-xs-center>
                  <v-form id="newSms" v-model="valid">
                    <v-switch
                      :label="single ? 'single' : 'multiple'"
                      v-model="single"
                    ></v-switch>
                  <v-layout row wrap>
                    <v-flex xs12 md12 lg12 >
                      <v-text-field
                        v-if="single === true"
                        v-model="destinataire"
                        type="number"
                        label="Destinataire"
                        placeholder="225 XXXXXXXX"
                        prepend-icon="dialpad"
                        regular
                        min=0
                        required
                      ></v-text-field>
                    <v-select
                        v-if="single === false"
                        v-model="selectedContact"
                        :items="destinataires"
                        prepend-icon="dialpad"
                        label="Mes contacts"
                        multiple
                      >
                        <v-list-tile
                          slot="prepend-item"
                          ripple
                          @click="toggle"
                        >
                          <v-list-tile-action>
                            <v-icon :color="'indigo darken-4'">person_pin</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-title>Tout selectionner</v-list-tile-title>
                        </v-list-tile>
                        <v-divider
                          slot="prepend-item"
                          class="mt-2"
                        ></v-divider>
                        <v-divider
                          slot="append-item"
                          class="mb-2"
                        ></v-divider>
                        <v-list-tile
                          slot="append-item"
                          disabled
                        >
                        </v-list-tile>
                      </v-select>

                      
                    <v-textarea
                      v-model="sms"
                      name="input-7-1"
                      prepend-icon="textsms"
                      label="Saisissez le sms"
                      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                     
                    ></v-textarea>
                    </v-flex>

                    <v-flex xs12 md12 lg12>
                      <v-btn color="primary" 
                      :loading="loading"
                      :disabled="loading"
                      block large @click.native="sendMySms" 
                      style="margin-top:30px">
                      Enregistrer
                      <!-- <span slot="loader">Loading...</span> -->
                      </v-btn>
                    </v-flex>
                    
                    </v-layout>
                  </v-form>
              </v-container>
            </v-card>
          </v-flex>

        <!-- ############## MODAL PERMETTANT D'AJOUTER DE NOUVEAU ELEMENTS ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                 <v-card style="min-height: 100%">
              <v-toolbar color="light-blue" dark>

                <v-toolbar-title>Ajouter élément</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="dialog = false">
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-toolbar>



              <v-list two-line subheader style="padding-bottom:30px;padding-top:30px">


              <!-- <v-subheader inset></v-subheader> -->

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'orange lighten-1 white--text'">email</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Envoyez Message</v-list-tile-title>
                    <v-list-tile-sub-title>Saisir nouveau message</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="green lighten-1">
                        <v-icon>arrow_forward</v-icon>
                      </span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'green lighten-1 white--text'">person_pin</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Ajouter un contact</v-list-tile-title>
                    <v-list-tile-sub-title>Créer Nouveau contact</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="green lighten-1">
                        <v-icon>arrow_forward</v-icon>
                      </span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'red lighten-1 white--text'">folder</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Créer un groupe</v-list-tile-title>
                    <v-list-tile-sub-title>Créer Nouveau groupe</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="green lighten-1">
                        <v-icon>arrow_forward</v-icon>
                      </span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

              </v-list>
            </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>


        </v-layout>
  
    </v-slide-y-transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import snackbar from "../../../components/Snackbar";
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "MessagerieInterface",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      single: true,
      smsReçu: true,
      sendSms: false,
      content: false,
      search: "",
      dialog: false,
      destinataire: "",
      destinataires: ["09290508", "77575649", "48608618", "03170001"],
      selectedContact: [],
      sms: "",
      valid: false,
      loader: null,
      loading: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      contacts: [
        {
          name: "Kouakou Celestin",
          contact: "09115463"
        },
        {
          name: "Kouakou Celestin",
          contact: "09115463"
        },
        {
          name: "Kouakou Celestin",
          contact: "09115463"
        },
        {
          name: "Kouakou Celestin",
          contact: "09115463"
        }
      ],
      pagination: {
        sortBy: "name"
      },
      selected: [],
      headers: [
        {
          text: "Message reçu",
          align: "left",
          value: "content"
        },
        { text: "Destinataire", value: "destinataire" },
        { text: "Date Reception", value: "dateReception" }
      ],
      listMessage: [
        {
          value: false,
          content: "Some lorem ipsum Some...",
          destinataire: "Jean François",
          dateReception: "05/09/2018 - 15:20",
          selected: false
        },
        {
          value: false,
          content: "Some lorem ipsum...",
          destinataire: "Jean François",
          dateReception: "05/09/2018 - 15:20",
          selected: false
        },
        {
          value: false,
          content: "Some lorem ipsum...",
          destinataire: "Jean François",
          dateReception: "05/09/2018 - 15:20",
          selected: false
        },
        {
          value: false,
          content: "Some lorem ipsum...",
          destinataire: "Jean François",
          dateReception: "05/09/2018 - 15:20",
          selected: false
        }
      ]
    };
  },
  methods: {
    toggleAll() {
      for (let item of this.listMessage) {
        item.selected = !item.selected;
      }
    },
    unToggleAll() {
      for (let item of this.listMessage) {
        item.selected = false;
      }
    },
    openNewSmsForm() {
      this.smsReçu = false;
      this.sendSms = true;
    },
    closeNewSmsForm() {
      this.smsReçu = true;
      this.sendSms = false;
    },
    sendMySms() {
      this.loader = "loading";

      // console.log(this.selectedContact);
      // console.log(this.sms);
      if (this.single === true) {
        // let form = document.getElementById("newSms");
        // let data = new FormData(form);
        // data.append("idUtilisateur", this.user.idUtilisateur);
        // data.append("destinataire", this.destinataire);
        // data.append("sms", this.sms);
        this.axios
          .get(
            "http://www.fylesms.com/envoisms.php?login=FYLECOLLECT&spe=254&cds=4855315673F&numero=" +
              this.destinataire +
              "&message=" +
              this.sms,
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(response => {
            this.text = "Sms envoyé avec succès";
            this.snackbar = true;

            //Vidons les champs
            this.destinataire = "";
            this.sms = "";

            //Fermons le formulaire
            this.closeNewSmsForm();
          });
      } else {
        // let form = document.getElementById("newSms");
        // let data = new FormData(form);
        // data.append("idUtilisateur", this.user.idUtilisateur);
        // data.append("destinataires[]", this.selectedContact);
        // data.append("sms", this.sms);
        for (let tel of this.selectedContact) {
          // console.log(tel);
          this.axios
            .get(
              "http://www.fylesms.com/envoisms.php?login=FYLECOLLECT&spe=254&cds=4855315673F&numero=" +
                tel +
                "&message=" +
                this.sms,
              {
                headers: {
                  "Content-type": "application/x-www-form-urlencoded"
                }
              }
            )
            .then(response => {
              this.text = "Sms envoyé avec succès";
              this.snackbar = true;

              //Vidons les champs
              this.destinataire = "";
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            });
        }
      }

      // this.axios
      //   .post(localDomain + "api/send/sms", data, {
      //     headers: {
      //       "Content-type": "application/x-www-form-urlencoded"
      //     }
      //   })
      //   .then(response => {
      //     this.text = "Sms envoyé avec succès";
      //     this.snackbar = true;

      //     //Vidons les champs
      //     this.destinataire = "";
      //     this.sms = "";

      //     //Fermons le formulaire
      //     this.closeNewSmsForm();
      //   });
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.checkedContact) {
          this.selectedContact = [];
        } else {
          this.selectedContact = this.destinataire.slice();
        }
      });
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
  computed: {
    checkedContact() {
      return this.selectedContact.length === this.destinataire.length;
    }
  },
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
