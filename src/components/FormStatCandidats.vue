<template>
  <v-container row justify-center>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
  
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
  
      <v-card>
  
        <v-toolbar dark color="primary">
  
          <v-btn icon dark @click.native="$emit('closeFormCandidat')">
  
            <v-icon>close</v-icon>
  
          </v-btn>
  
          <v-toolbar-title>Ajouter Résultats des candidats</v-toolbar-title>
  
          <v-spacer></v-spacer>
  
           <v-toolbar-items>
  
            <v-btn flat 
            :loading="loading"
            :disabled="loading"
            @click.native="sendFormData">
            Enregistrer
            </v-btn>
  
          </v-toolbar-items>
  
        </v-toolbar>

        <v-layout>
          <v-container grid-list-md text-xs-center>
              <v-form id="addResultatsCandidat" v-model="valid">
                
               <v-layout row wrap>
                 <v-flex xs12 md12 lg12>
                  <v-text-field
                    v-model="userinfo.idUtilisateur"
                    disabled="disabled"
                    type="hidden"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md6 lg6 v-for="data in dataTable1" style="display: inherit">
                  <v-text-field
                    :id="'candidat-'+data.id"
                    v-model="data.nbVoix"
                    :label="data.name"
                    type="number"
                    placeholder="Nombre de voix"
                    outline
                    min=0
                    required
                  ></v-text-field>
          
                </v-flex>

                <v-flex xs12 md6 lg6 v-for="data2 in dataTable2" style="display: inherit">
                  <v-text-field
                    :id="'candidat-'+data2.id"
                    v-model="data2.nbVoix"
                    :label="data2.name"
                    type="number"
                    placeholder="Nombre de voix"
                    outline
                    min=0
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12 lg12>
                   <v-btn color="primary" 
                   :loading="loading"
                   :disabled="loading"
                   block large @click.native="sendFormData" 
                   style="margin-top:30px">
                   Enregistrer
                   <!-- <span slot="loader">Loading...</span> -->
                   </v-btn>
                </v-flex>
                
               </v-layout>
              </v-form>
          </v-container>
        </v-layout>
  
      </v-card>
  
    </v-dialog>
</v-container>
</template>
<script>
const apiDomain = "http://31.207.34.70/fylecollect_api/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";

export default {
  name: "FormStatCandidats",
  props: {
    dataTable1: Array,
    dataTable2: Array,
    userinfo: {}
  },
  data() {
    return {
      dialog: true,
      notifications: false,
      sound: true,
      widgets: false,
      valid: false,
      loader: null,
      loading: false
    };
  },
  methods: {
    sendFormData() {
      this.loader = "loading";
      let form = document.getElementById("addResultatsCandidat");
      let data = new FormData(form);
      data.append("idUtilisateur", this.userinfo.idUtilisateur);
      // data.append("idClient", this.userinfo.idClient);
      for (let item of this.dataTable1) {
        data.append("id_" + item.id, item.nbVoix);
      }
      for (let item2 of this.dataTable2) {
        data.append("id_" + item2.id, item2.nbVoix);
      }
      this.axios
        .post(localDomain + "statscandidatsbureaux/add", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // console.log(response.data);
          this.$emit("saveCandidatsDataForm");
        });
      // console.log(data);
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>
<style>
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