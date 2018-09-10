<template>
    <v-slide-y-transition mode="out-in">
  
        <!-- ############## MENU MESSAGERIE ################## -->
        <v-layout row wrap>
          <!--  Stat bar -->
          <v-flex xs4 md3 lg3>
            <v-card style="min-height: 100%">
              <v-toolbar color="light-blue" dark>

                <v-toolbar-title>Messagerie</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon @click="dialog = true">
                  <v-icon>add</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-toolbar>



              <v-list two-line subheader>


              <v-subheader inset>Menu</v-subheader>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'orange lighten-1 white--text'">email</v-icon>
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
                    <v-list-tile-title>Envoyés</v-list-tile-title>
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
                    <v-icon :class="'red lighten-1 white--text'">delete</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Corbeille</v-list-tile-title>
                    <v-list-tile-sub-title>Messages supprimés</v-list-tile-sub-title>
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
                    <v-list-tile-title>Tout mes contacts</v-list-tile-title>
                    <v-list-tile-sub-title>Tout afficher</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">34</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'grey lighten-1 white--text'">folder</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>QG</v-list-tile-title>
                    <v-list-tile-sub-title>Membres du QG</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">34</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'grey lighten-1 white--text'">folder</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Représentant</v-list-tile-title>
                    <v-list-tile-sub-title>Représentants Bureaux</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <span color="grey lighten-1">3</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>


              </v-list>
            </v-card>
          </v-flex>


        <!-- ############## LISTE DE TOUT LES CONTACTS  ################## -->
          <v-flex xs4 md3 lg3 v-if="toutAfficher === true">
            <v-card style="min-height: 100%">
              <!-- <v-toolbar light>

                <v-form>
                  <v-text-field
                    
                    label="Recherche..."
                    style="width: 200px;margin-top: 12px;"
                  ></v-text-field>
                </v-form>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>add</v-icon>
                </v-btn>

              </v-toolbar> -->
              <v-fab-transition>
              <v-btn
                v-show="toutAfficher === true"
                color="pink"
                fab
                dark
                small
                absolute
                top
                right
                @click="toutAfficher = !toutAfficher"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </v-fab-transition>
              <v-list two-line subheader>


              <v-subheader inset>
                Tout mes contacts
              </v-subheader>

                <v-list-tile
                  v-for="item in contacts"
                  :key="item.title"
                  avatar
                  @click=""
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'blue lighten-1 white--text'">person_pin</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.contact }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>


        <!-- ############## LISTE DES MSG PETIT BLOCK ################## -->
          <v-flex xs4 md6 lg6 v-if="toutAfficher === true">
            <v-card style="min-height: 100%">
               <v-card-title>
                Messages reçus
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
                  <tr :active="props.item.selected" style="cursor:pointer" @click="[props.item.selected = !props.item.selected, content = true]">
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
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Aucun élément ne correspond à votre recherche.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>

          
        <!-- ############## LISTE DES MSG GRAND BLOCK ################## -->
          <v-flex xs4 md9 lg9 v-else="toutAfficher === false">
             <v-card style="min-height: 100%">
               <v-card-title>
                Messages reçus
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
                  <tr :active="props.item.selected" style="cursor:pointer" @click="[props.item.selected = !props.item.selected, content = true]">
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
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Aucun élément ne correspond à votre recherche.
                </v-alert>
              </v-data-table>
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

        <!-- ############## MODAL AFFICHANT LE CONTENU D'UN MSG ################## -->
        <v-navigation-drawer
        v-model="content"
        right
        absolute
        temporary
          >
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon style="font-size:50px">person_pin</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Jean François</v-list-tile-title>
              </v-list-tile-content>
              
              <v-list-tile-content style="display:inline;">
                <v-btn fab dark small color="error" @click="[content = !content, unToggleAll()]" style="float:right">
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
              @click=""
            >
                <v-list-tile-action 
                style="padding-left:13px">
                  <v-icon>phone</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>Telephone: <b>09290508</b></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              
              <v-divider></v-divider>
            </v-list>

          <v-list class="pt-0" dense>
              <v-list-tile
                @click=""
              >
                <v-list-tile-action 
                style="padding-left:13px">
                  <v-icon>event_note</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>Date d'envoi: <b>05/09/2018 - 17h30</b></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              
              <v-divider></v-divider>
            </v-list>

              <v-flex xs12 md12 lg12 style="padding-left:20px; padding-top:20px; padding-right:20px; text-align:justify;">
                <h4>Message : </h4>
                <p style="padding-top:10px">
                  Some Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Tempore quasi autem ad quidem cupiditate quisquam repellendus tenetur illum et.
                  Deserunt rerum praesentium adipisci quasi reiciendis dolorum voluptatibus 
                  corporis dicta blanditiis?
                </p>
              </v-flex>
          
        </v-navigation-drawer>

        </v-layout>
  
    </v-slide-y-transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  name: "MessagerieInterface",
  components: {},
  data() {
    return {
      toutAfficher: false,
      content: false,
      search: "",
      dialog: false,
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
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
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
</style>
