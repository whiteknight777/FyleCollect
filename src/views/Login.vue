<template>
    <v-layout row wrap>
    
        <v-flex xs12 md12 lg12>
    
            <v-layout row wrap>    
    
    
                <v-flex xs6 md8 lg8 fill-height :class="'bg-login'" :style="'background:url('+Bg+');height:-webkit-fill-available;background-size: cover;'">
    
                    <!-- <v-container> -->
                        <v-card-text style="position: absolute;bottom: 0;">    
                        <p class="text-xs-left display-2" style="color:white">Fyle Group</p>
                        <p style="color:white">
                            some Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
                            Iste, dolorum maiores in ipsum officiis distinctio illo laudantium <br>
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
    
                            <img src="../assets/logo.png" class="responsive" width="50%" style="margin-left: -23px;">
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
    
                                <v-text-field v-model="username" :rules="nameRules" :counter="15" label="Username" required></v-text-field>
    
                                <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
    
                                <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" required></v-select> -->
    
                                <v-checkbox v-model="checkbox" label="Mémoriser"></v-checkbox>
    
    
                                <!-- <v-flex xs12 md12 lg12> -->
                                    <v-btn block @click.prevent="submit" class="blue accent-2" dark>
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
</template>
<script>
import Bg1 from "../assets/Bg-4.png";
import snackbar from "../components/Snackbar";

export default {
  name: "Login",
  components: {
    snackbar
  },

  data() {
    return {
      Bg: Bg1,
      error: false,
      errorMsg: "Erreur Utilisateur inconnue...",
      username: "desire.arra",
      nameRules: [
        v => !!v || "Username requis",
        v => (v && v.length <= 15) || "username must be less than 12 characters"
      ],
      password: "1234",
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
        // Native form submission is not yet supported
        let form = document.getElementById("login");
        let data = new FormData(form);
        data.append("username", this.username);
        data.append("password", this.password);
        // let data = [username => this.username, password => this.password];
        // console.log(form);
        this.axios
          .post("http://localhost:8000/api/checkuser", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            // console.log(this.$router.history.current.path);
            if (response.data.username != undefined) {
              // Récupération des données récupérée
              data = JSON.stringify(response.data);

              // Sauvegarde des données récupérée dans la séssion
              sessionStorage.setItem("userConnected", data);
              let user = JSON.parse(sessionStorage.getItem("userConnected"));

              // Vérification & redirection sur la bonne page
              if (user.grades == 2) {
                this.$router.push("/dashboard-candidat");
              } else if (user.grades == 3) {
                this.$router.push("/dashboard-representant");
              }
            } else {
              this.snackbar = true;
              this.text = "Erreur Utilisateur inconnue";
              // this.errorMsg = "Erreur Utilisateur inconnue...";
              // this.error = true;
            }
          });
      }
    }
  }
};
</script>
<style>
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
