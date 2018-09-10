<template>
  <v-container fluid grid-list-md>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md text-xs-center>
  
        <v-layout row wrap style="margin-bottom:10px">
          <!--  Stat bar -->
          <v-flex xs12 md12 lg12>
            <v-card>
              <v-card-title>
                Historique des SMS
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
                :headers="headers"
                :items="logSms"
                :search="search"
              >
                <template slot="items" slot-scope="props">
                  <!-- <td>{{ props.item.smsid }}</td> -->
                  <td class="text-xs-right">{{ props.item.numero }}</td>
                  <td class="text-xs-right">{{ props.item.message }}</td>
                  <td class="text-xs-right">{{ props.item.dateenvoi }}</td>
                  <td class="text-xs-right">{{ props.item.datetraitement }}</td>
                  <td class="text-xs-right">{{ props.item.etat }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Aucun élément ne correspond à votre recherche.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
          <!-- Fin stat bar -->
        </v-layout>
  
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
// Config API
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "HistoriqueSms",
  props: {
    user: Object
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Numéro", value: "numero" },
        { text: "Message", value: "message" },
        { text: "Date d'envoi", value: "dateenvoi" },
        { text: "Date traitement", value: "datetraitement" },
        { text: "Etat", value: "etat" }
      ],
      logSms: [
        {
          value: false,
          // smsid: 1,
          numero: "09290508",
          message: "FCDV 33*98*72*88",
          dateenvoi: "05/09/2018 - 15:20",
          datetraitement: "05/09/2018 - 15:22",
          etat: "Traité"
        },
        {
          value: false,
          // smsid: 2,
          numero: "09290508",
          message: "FCDV 33*98*72*88",
          dateenvoi: "05/09/2018 - 15:25",
          datetraitement: "05/09/2018 - 15:22",
          etat: "Traité"
        },
        {
          value: false,
          // smsid: 3,
          numero: "09290508",
          message: "FCDV 33*98*72*88",
          dateenvoi: "05/09/2018 - 15:26",
          datetraitement: "05/09/2018 - 15:22",
          etat: "Annulé"
        },
        {
          value: false,
          // smsid: 4,
          numero: "09290508",
          message: "FCDV 33*98*72*88",
          dateenvoi: "05/09/2018 - 15:40",
          datetraitement: "05/09/2018 - 15:22",
          etat: "Annulé"
        },
        {
          value: false,
          // smsid: 5,
          numero: "09290508",
          message: "FCDV 33*98*72*88",
          dateenvoi: "05/09/2018 - 15:50",
          datetraitement: "05/09/2018 - 15:22",
          etat: "Annulé"
        }
      ]
    };
  },
  methods: {
    // Fonction permettant de récupérer les données du graphique en bar et en cercle
    getHistoriqueSms() {
      // Récupération des données des candidats suivis
      this.axios
        .get(localDomain + "api/get/sms/send/" + this.user.contact, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // Récupérons la reponse renvoyée
          let data = response.data;
          // Récupérons la nombre de données récupérées

          // Vérifions le status de la requete
          // Success de la requete
          if (response.data.statusRequete == 100) {
            // Renseignons le tableau
            this.logSms = data.response;
          }

          // Si des données sont manquantes en bd
          if (response.data.statusRequete == 200) {
            // Renseignons le tableau
            this.logSms = [];
          }
        });
    }
  },
  computed: {},
  beforeMount() {
    if (localStorage.getItem("interval") !== null) {
      clearInterval(localStorage.getItem("interval"));
    }
    this.getHistoriqueSms();
  }
};
</script>

<style>
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
.text-xs-right {
  text-align: left !important;
}
a {
  color: rgba(0, 0, 0, 0.87) !important;
  text-decoration: unset !important;
}
</style>
