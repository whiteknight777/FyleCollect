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
    <v-layout row wrap>
    
        <v-flex xs12 md12 lg12>
    
            <v-layout row wrap>    
    
    
                <v-flex xs6 md8 lg8 fill-height :class="'bg-login'" :style="'background:url('+Bg+');height:700px;background-size: cover;'">
    
                    <!-- <v-container> -->
                        <v-card-text style="position: absolute;bottom: 0;">    
                        <p class="text-xs-left display-2" style="color:white">FYLE COLLECT</p>
                        <p style="color:white">
                            Votre web application qui communique, collect, centralise & calcule<br>
                            vos données en temps réel.<br>
                            <v-btn
                            dark
                            icon
                            style="margin-left:0"
                            >
                            <v-icon size="24px">fa fa-facebook-square</v-icon>
                            </v-btn>

                            <v-btn
                            dark
                            icon
                            style="margin-left:0"
                            >
                            <v-icon size="24px">fa fa-twitter-square</v-icon>
                            </v-btn>

                            <v-btn
                            dark
                            icon
                            style="margin-left:0"
                            >
                            <v-icon size="24px">fa fa-linkedin-square</v-icon>
                            </v-btn>
                            
                        </p>
                    </v-card-text>
                    <!-- </v-container> -->
    
                </v-flex>
    
    
    
                <v-flex xs12 md4 lg4 :class="'div-form'" style="background: white;">
    
                    <v-container>
    
                        <v-layout align-center justify-center column fill-height>
    
                            <img src="../assets/logo_fc_ob_411x100.png" class="responsive" width="100%" style="margin-left: -5px;margin-bottom: 30px;margin-top: 60px;">
                            <!-- <span width="50%" style="border-radius:100%" class="deep-orange darken-3">
                                <v-icon>how_to_vote</v-icon>
                            </span> -->
    
                        </v-layout>
    
    
    
                        <v-layout align-center justify-center column fill-height>
    
                            <h3>ESPACE DE CONNEXION</h3>
                            <p>
                               Connectez-vous à votre compte
                            </p>
    
                        </v-layout>
    
    
    
                        <v-layout align-center justify-center column fill-height>
                            <v-alert
                              v-model="error"
                              dismissible
                              type="error"
                              color="error"
                              style="margin-bottom: 30px;margin-left: 0px;width: 100%;margin-right: 0;"
                            >
                            {{errorMsg}}
                            </v-alert>
    
                            <v-form id="login" ref="form" style="width:100%">
    
                                <v-text-field v-model="email" :rules="emailRules" label="Email" required @keyup.enter="submit"></v-text-field>
    
                                <v-text-field v-model="password" type="password" label="Password" required @keyup.enter="submit"></v-text-field>
    
                                <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" required></v-select> -->
    
                                <v-checkbox v-model="checkbox" label="Mémoriser"></v-checkbox>
    
    
                                <!-- <v-flex xs12 md12 lg12> -->
                                    <v-btn block @click.prevent="submit" color="blue accent-2" dark>
                                        Connexion
                                    </v-btn>
                                <!-- </v-flex> -->
                                <!-- <v-btn @click="clear">clear</v-btn> -->
    
                            </v-form>
    
                        </v-layout>

                        <v-layout align-center justify-center column fill-height style="padding-top: 58px;">
    
                            <p>Copyright @ 2018</p>
    
                        </v-layout>
    
                    </v-container>
    
                </v-flex>
    
    
    
            </v-layout>
    
        </v-flex>
    
    
    
    <snackbar
    v-if="snackbar" 
    :text="errorMsg"
    :y="'top'"
    :x="'right'"
    >
    </snackbar>
    </v-layout>
</div>
</template>
<script>
import Bg1 from "../assets/Bg-4.png";
import snackbar from "../components/Snackbar";
import apiConfig from "../apiConfig";

export default {
  name: "Login",
  components: {
    snackbar
  },

  data() {
    return {
      loadingPage: false,
      Bg: Bg1,
      error: false,
      errorMsg: "Erreur de connexion... Utilisateur inconnue",
      email: "",
      emailRules: [
        v => !!v || "E-mail obligatoire",
        v => /.+@.+[(.)].+/.test(v) || "E-mail doit être valide"
      ],
      password: "",
      select: null,
      //   items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = false;
        this.loadingPage = true;
        // Native form submission is not yet supported
        let form = document.getElementById("login");
        let data = new FormData(form);
        data.append("email", this.email);
        data.append("password", this.password);
        this.snackbar = false;
        // let data = [username => this.username, password => this.password];
        // console.log(form);
        this.axios
          .post(apiConfig.baseURL + "api/checkuser", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            // console.log(response.data);
            // console.log(this.$router.history.current.path);
            if (response.data.statusRequete == 100) {
              // Récupération des données récupérée
              data = JSON.stringify(response.data.response);
              // Sauvegarde des données récupérée dans la séssion
              sessionStorage.setItem("userConnected", data);
              let user = JSON.parse(sessionStorage.getItem("userConnected"));
              // Vérification & redirection sur la bonne page
              this.loadingPage = false;
              if (user.grades == 2) {
                this.$router.push("/dashboard-candidat");
              } else if (user.grades == 3) {
                this.$router.push("/dashboard-representant");
              }
            }
            if (response.data.statusRequete == 200) {
              this.loadingPage = false;
              this.errorMsg =
                "Erreur... Veuillez vérifier votre password & votre email";
              this.snackbar = true;
            }
          })
          .catch(response => {
            this.loadingPage = false;
            this.errorMsg =
              "Problème de connexion au serveur... Veuillez réessayer";
            this.snackbar = true;
          });
      }
    }
  }
};
</script>
<style>
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .bg-login {
    display: none;
  }
  .div-form {
    display: block;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .bg-login {
    display: none;
  }
  .div-form {
    display: block;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .bg-login {
    display: block;
  }
  .div-form {
    display: block;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .bg-login {
    display: block;
  }
  .div-form {
    display: block;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .bg-login {
    display: block;
  }
  .div-form {
    display: block;
  }
}
</style>
