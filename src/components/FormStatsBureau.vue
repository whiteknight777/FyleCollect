<template>
  <v-container row justify-center>
  
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
  
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
  
      <v-card>
  
        <v-toolbar dark color="primary">
  
          <v-btn icon dark @click.native="$emit('closeFormBureau')">
  
            <v-icon>close</v-icon>
  
          </v-btn>
  
          <v-toolbar-title>Ajouter Résultats du bureau 1</v-toolbar-title>
  
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
              <v-form id="addResultatsBureau" v-model="valid">
                
               <v-layout row wrap>
                 <v-flex xs12 md12 lg12>
                  <v-text-field
                    v-model="userinfo.idUtilisateur"
                    disabled="disabled"
                    type="hidden"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12 lg12 >
                  <v-text-field
                    v-model="nb_votant"
                    type="number"
                    label="Nombre de votants"
                    placeholder="0"
                    :disabled="dataSend"
                    min=0
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="nb_bulletin_null"
                    type="number"
                    label="Nombre de bulletin null"
                    placeholder="0"
                    :disabled="dataSend"
                    min=0
                    outline
                    required
                  ></v-text-field>
                  <div>
                    <v-alert
                      v-model="alert"
                      dismissible
                      transition="scale-transition"
                    >
                      {{text}}
                    </v-alert>
                  </div>
                  <div class="v-input v-text-field v-text-field--enclosed v-text-field--outline v-input--is-label-active v-input--is-dirty">
                    <div class="v-input__control">
                        <div class="v-input__slot">
                          <div class="v-text-field__slot">
                            <label aria-hidden="true" class="v-label v-label--active" style="left: 0px; right: auto; position: absolute;">
                              Télécharger pv
                            </label>
                            <input type="file" style="margin-botom:45px" @change="getUploadedFile">
                            <br><br><br>
                            <v-btn
                              color="primary"
                              v-if="pvSend === true"
                              small
                              dark
                              @click="checkOldPv(pvPath)"
                              style="padding: 20px 16px 45px;"
                            >
                            <v-icon> attach_file</v-icon>
                              consulter PV
                            </v-btn>
                          </div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages">
                            <div class="v-messages__wrapper">
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
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
import apiConfig from "../apiConfig";

export default {
  name: "FormStatsBureau",
  props: {
    userinfo: {}
  },
  data() {
    return {
      dialog: true,
      notifications: false,
      sound: true,
      widgets: false,
      nb_votant: Number,
      nb_bulletin_null: Number,
      valid: false,
      loader: null,
      selectedFile: null,
      alert: false,
      text: "",
      pvSend: false,
      pvPath: "",
      dataSend: false,
      loading: false
    };
  },
  methods: {
    sendFormData() {
      this.loader = "loading";
      let form = document.getElementById("addResultatsBureau");
      let data = new FormData(form);
      data.append("idUtilisateur", this.userinfo.idUtilisateur);
      data.append("idClient", this.userinfo.idClient);
      data.append("nbVotant", this.nb_votant);
      data.append("nbBulletinNul", this.nb_bulletin_null);
      // Vérifions si une nouvelle image à été chargée
      if (this.selectedFile !== null || this.selectedFile !== undefined) {
        data.append("file", this.selectedFile);
      } else {
        data.append("file", "");
      }
      this.axios
        .post(apiConfig.baseURL + "statsbureaux/add", data, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(response => {
          // console.log(response.data);
          this.pvSend = data.pvSend;
          this.pvPath = data.pvPath;
          this.dataSend = data.dataSend;
          this.$emit("saveBureauDataForm");
        });
    },
    getUploadedFile(e) {
      // this.alert = false;
      // this.selectedFile = e.target.files[0];
      // if (
      //   this.selectedFile.type !== "application/pdf" ||
      //   "image/jpeg" ||
      //   "image/png"
      // ) {
      //   this.text =
      //     "Erreur format de fichier... Veuillez choisir un format pdf ou image";
      //   this.alert = true;
      //   this.selectedFile = null;
      //   e.target.value = null;
      // }
      this.alert = false;
      this.selectedFile = e.target.files[0];
      let error = true;
      if (
        this.selectedFile.type !== "application/pdf" ||
        "image/jpeg" ||
        "image/png"
      ) {
        error = false;
      } else {
        error = true;
      }

      if (error === true) {
        this.text =
          "Erreur format de fichier... Veuillez choisir un format pdf ou image";
        this.snackbar = true;
        this.selectedFile = null;
        e.target.value = null;
      }
    },
    checkOldPv(url) {
      let win = window.open(url, "_blank");
      win.focus();
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