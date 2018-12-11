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
                Liste des lieux de votes
              </v-breadcrumbs-item>
            <v-spacer></v-spacer>
  
            <v-btn
              :loading="loading"
              :disabled="loading"
              v-if="listeLieux.length < 5"
              color="orange darken-1"
              class="white--text"
              @click.native="importLieux = true"
            >
              Importer lieux de vote
              <v-icon right dark>cloud_download</v-icon>
            </v-btn>

            <v-btn
              :loading="loading"
              :disabled="loading"
              color="green darken-1"
              class="white--text"
              @click.native="addBureau = true"
            >
              Ajouter Bureau
              <v-icon right dark>add</v-icon>
            </v-btn>

            <v-speed-dial
              v-model="fab"
              :bottom=bottom
              :right=right
              :direction="'top'"
              fixed
              transition="slide-y-reverse-transition"
              style="z-index:1"
            >
              <v-btn
                slot="activator"
                v-model="fab"
                color="blue darken-2"
                dark
                fab
              >
                <v-icon>how_to_vote</v-icon>
                <v-icon>close</v-icon>
              </v-btn>

              <v-btn
                fab
                dark
                small
                color="green"
                @click.native="addLieux = true"
              >
              <v-icon>add</v-icon>
              </v-btn>

              <v-btn
                fab
                dark
                small
                color="amber"
                @click.native="editLieux = true"
              >
              <v-icon>edit</v-icon>
              </v-btn>

              <!-- <v-btn
                fab
                dark
                small
                color="red"
                @click="deleteLieux = true"
              >
              <v-icon>delete</v-icon>
              </v-btn> -->

            </v-speed-dial>

            </v-breadcrumbs>


            <v-card>
              <v-toolbar
                
                color="blue-grey lighten-4"
              >
                <v-toolbar-title style="font-size: initial;">Lieux de votes {{ user.commune }} ({{items.length}})</v-toolbar-title>
                <v-autocomplete
                  :loading="loading"
                  :items="listeLieux"
                  :search-input.sync="search"
                  v-model="select"
                  class="mx-3"
                  flat
                  hide-no-data
                  hide-details
                  label="Rechercher un lieu de vote"
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
                <!-- <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn> -->
              </v-toolbar>
            </v-card>
            <v-expansion-panel v-if="items.length > 0">
              <v-expansion-panel-content
                v-for="(item,i) in items"
                :key="i"
                style="padding: 8px 24px;"
              >
                <div slot="header">
                    <v-list-tile
                      avatar
                      ripple
                    >
                      <v-list-tile-content >
                        <v-list-tile-title style="font-size: small;"><v-icon>where_to_vote</v-icon> {{item.name}}</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-sub-title>Nombre Inscrit : <b>{{item.nbInscrit}}</b></v-list-tile-sub-title>
                      </v-list-tile-action>
                      

                    </v-list-tile>
                </div>
                <v-card>
                  <template v-for="(bv, index) in item.bv">
                    <v-list-tile
                      :key="'bv'+index"
                      avatar
                      ripple
                      style="padding-left: 41px;"
                    >
                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="text--primary" style="font-size: small;"> {{ bv.name }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-content>
                        <v-list-tile-title style="font-size: small;">
                           {{ bv.representant }}</v-list-tile-title>
                      </v-list-tile-content>
                      
                      <v-list-tile-content>
                        <v-list-tile-sub-title>
                           {{ bv.contact }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-btn 
                        small
                        ripple
                        fab
                        color="orange lighten-1"
                        dark
                        @click="getInfoBureau(bv.id)">
                          <v-icon>
                            create
                          </v-icon>
                        </v-btn>

                      </v-list-tile-action>

                      <!-- <v-list-tile-action>                        
                        <v-btn 
                        small
                        ripple
                        fab
                        color="red lighten-1"
                        dark
                        @click="deleteBureau(bv.id)">
                          <v-icon>
                            clear
                          </v-icon>
                        </v-btn>
                      </v-list-tile-action> -->

                    </v-list-tile>
                    <v-divider
                      v-if="index < item.nbBv - 1"
                      :key="'dv'+index"
                    ></v-divider>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card v-else style="padding-bottom: 21px;">
              <v-card-text>
                <v-card-media class="text-xs-center">
                  <v-spacer></v-spacer>
                    <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> add_location </v-icon>
                  <v-spacer></v-spacer>
                </v-card-media>
                    Aucun lieu de vote disponible
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- AJOUTER LIEU DE VOTE -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addLieux" persistent max-width="500px">
                <form id="addLieux">
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Ajouter un lieu de vote</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="addLieux = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Libellé Lieu de vote" 
                            v-model="newLibelleLieux"
                            prepend-icon="edit_location"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Localisation" 
                            v-model="newLocalisation"
                            prepend-icon="where_to_vote"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field label="Nombre inscrits" 
                            v-model="newNbInscrit"
                            type="number" 
                            min="0" 
                            prepend-icon="list"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field label="Nombre Bureaux de votes" 
                            v-model="newNbBureau"
                            type="number" 
                            min="1" 
                            prepend-icon="add_location"
                            required>
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="addLieux = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addNewLieux" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

          <!-- MODIFER LIEU DE VOTE -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="editLieux" persistent max-width="500px">
                <form id="editLieux">
                  <v-card>
                     <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Editer un lieu de vote</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="editLieux = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="listeLieux"
                              item-value="lieux"
                              item-text="text"
                              label="Lieux de votes"
                              v-model="select"
                              @change="checkLieuSelected"
                              chips
                              clearable
                              prepend-icon="how_to_vote"
                              required
                              single>
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                  <!-- <span>(interest)</span> -->
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Libellé Lieu de vote" 
                            v-model="editLibelleLieux"
                            prepend-icon="edit_location"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Localisation" 
                            v-model="editLocalisation"
                            prepend-icon="where_to_vote"
                            required>
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Nombre inscrits" 
                            v-model="editNbInscrit"
                            type="number" 
                            min="0" 
                            prepend-icon="list"
                            required>
                            </v-text-field>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="editLieux = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="editInfoCentre" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

         <!-- SUPPRIMER UN LIEU DE VOTE  -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="deleteLieux" persistent max-width="500px">
                <form id="deleteLieux">
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Suprimer un lieu de vote</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="cancelDeleteLieux">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-alert
                          :value="true"
                          type="error"
                          >
                          Voulez-vous vraiment supprimer ce lieu de vote ?<br>
                          En acceptant de supprimer ce lieu de vote vous acceptez<br>
                          de supprimer toutes ses informations.
                          </v-alert>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="listeLieux"
                              item-value="lieux"
                              item-text="text"
                              label="Lieux de votes"
                              @change="checkLieuForBureau"
                              chips
                              clearable
                              prepend-icon="how_to_vote"
                              required
                              single>
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="cancelDeleteLieux" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="confirmDeleteLieux" dark>Supprimer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

          <!-- AJOUTER BUREAU -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addBureau" persistent max-width="500px">
                <form id="addBureau">
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Ajouter un bureau de vote</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="addBureau = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="listeLieux"
                              item-value="lieux"
                              item-text="text"
                              label="Sélectionnez un Lieux de votes"
                              @change="checkLieuForBureau"
                              chips
                              clearable
                              prepend-icon="how_to_vote"
                              required
                              single>
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                  <!-- <span>(interest)</span> -->
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            label="Libellé du bureau" 
                            v-model="newLibelleBureau"
                            prepend-icon="edit_location"
                            required>
                            </v-text-field>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="addBureau = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addNewBureau" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

          <!-- MODIFER BUREAU  -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="editBureau" persistent max-width="500px">
                <form id="editBureau">
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Editer un bureau</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="cancelEdit">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex d-flex>
                            <v-switch
                              :label="addRepresentant ? 'Assigner representant' : 'Ne pas assigner representant'"
                              v-model="addRepresentant"
                            ></v-switch>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field 
                            v-model="libelleBureau"
                            label="libellé bureau" 
                            prepend-icon="create"
                            required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 d-flex v-if="addRepresentant">
                            <!-- <v-select
                              :items="representants"
                              label="Standard"
                            ></v-select> -->
                            <v-combobox
                              v-model="representant"
                              :items="representants"
                              item-value="representant"
                              item-text="text"
                              label="Représentant"
                              @change="checkAnswer"
                              chips
                              clearable
                              prepend-icon="account_circle"
                              single>
                              <template slot="selection" slot-scope="data">
                                <v-chip
                                  :selected="data.selected"
                                >
                                  <strong>{{ data.item }}</strong>&nbsp;
                                  <!-- <span>(interest)</span> -->
                                </v-chip>
                              </template>
                            </v-combobox>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="cancelEdit" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="editerBureau" dark>Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

         <!-- SUPPRIMER UN BUREAU DE VOTE  -->

          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="supprimer"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment supprimer ce bureau ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de supprimer ce bureau vous acceptez de supprimer toutes les informations dépendant de ce dernier.
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="cancelDeleteBureau"
                    >
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="confirmDeleteBureau"
                    >
                      Supprimer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>

         <!-- IMPORT DE LIEUX DE VOTES -->
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="importLieux" persistent max-width="500px">
                <form id="addRepresentant" ref="form" lazy-validation>
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title> Importer des lieux de votes </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="importLieux = false">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <div style="margin-bottom:20px">
                              <v-alert
                                type="info"
                                v-model="alert"
                                dismissible
                                transition="scale-transition"
                              >
                                Veuillez importer la liste des lieux de votes sous format CSV
                              </v-alert>
                            </div>
                          <div class="v-input v-text-field v-text-field--enclosed v-text-field--outline v-input--is-label-active v-input--is-dirty">
                              <div class="v-input__control">
                                  <div class="v-input__slot">
                                    <div class="v-text-field__slot">
                                      <label aria-hidden="true" class="v-label v-label--active" style="left: 0px; right: auto; position: absolute;">
                                        Importer nouveau pv
                                      </label>
                                      <input type="file" ref="file" style="margin-botom:45px" @change="getUploadedFile">
                                      <br><br><br>
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

                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="importLieux = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="sendFileBureau" dark v-if="valid === true">Enregistrer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
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
  name: "ListeLieux",
  props: {
    user: Object
  },
  components: {
    snackbar
  },
  data() {
    return {
      supprimer: false,
      deleteLieux: false,
      loadingPage: false,
      alert: true,
      // Variables du bouton flotant
      fab: false,
      hover: true,
      bottom: true,
      right: true,
      RepSelected: "",
      // Variables utilies pour ajouter un lieux
      addLieux: false,
      newLibelleLieux: "",
      newLocalisation: "",
      newNbInscrit: 0,
      newNbBureau: 1,
      // Variables utilies pour editer un lieux
      editLieux: false,
      editLibelleLieux: "",
      editLocalisation: "",
      editNbInscrit: 0,
      importLieux: false,
      valid: true,
      // Variable permettant de savoir au click le lieu selectionné
      LieuxSelected: "",
      // Variables utilies pour ajouter un bureau
      addBureau: false,
      newLibelleBureau: "",
      // Variables utilies pour editer un bureau
      idBureau: "",
      editBureau: false,
      addRepresentant: true,
      libelleBureau: "",
      selectedFile: null,
      repBureauPosition: null,
      // Variables utilies gérer les notifications
      snackbar: false,
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      loading: false,
      clear: false,
      items: [],
      search: null,
      select: null,
      // Variables utilies pour manipuler les objets representants & lieux de votes
      representantsInfos: [],
      representants: [],
      representant: "",
      lieux: [],
      listeLieux: []
    };
  },
  methods: {
    getUploadedFile(e) {
      this.selectedFile = e.target.files[0];
      let error = true;
      if (this.selectedFile.type === "application/vnd.ms-excel") {
        error = false;
      } else {
        error = true;
      }

      if (error === true) {
        this.text =
          "Erreur format de fichier... Veuillez choisir un format csv";
        this.snackbar = true;
        this.selectedFile = null;
        e.target.value = null;
      }
    },
    sendFileBureau() {
      if (this.selectedFile === null) {
        this.text = "Aucun fichier n'a été sélectionné...";
        this.snackbar = true;
      } else {
        this.importLieux = false;
        this.loadingPage = true;
        let data = new FormData();
        data.append("file", this.selectedFile);
        data.append("idCandidat", this.user.idCandidat);

        this.axios
          .post(apiConfig.baseURL + "centres/import/data", data, {
            headers: {
              "Content-type": "multipart/form-data"
            }
          })
          .then(response => {
            let data = response.data;

            if (data.statusRequete == 100) {
              // Récupérons la liste des lieux
              let newCentres = data.newCentres;
              for (let step = 0; step < newCentres.length; step++) {
                this.lieux.push(newCentres[step]);
              }
              this.items = this.lieux;
              this.listeLieux = [];
              this.getNamesCentres();

              this.loadingPage = false;
              this.text = "Fichier importé avec succès";
              this.snackbar = true;
              this.selectedFile = null;
            }
          })
          .catch(response => {
            let data = response.data;

            this.loadingPage = false;
            this.text = "Une érreur est survenu lors de l'import du fichié... ";
            this.snackbar = true;
            this.selectedFile = null;
          });
      }
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.lieux.filter(e => {
          return (
            (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },
    checkValue() {
      // console.log("test");
      if (this.search === null && this.select === "") {
        this.clear = false;
        console.log("test");
        this.items = this.lieux.filter(e => {
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
      this.items = this.lieux;
    },
    clearResearch() {
      this.clear = false;
      this.select = null;
      this.search = null;
      this.resetItem();
    },
    getNamesCentres() {
      for (let item of this.lieux) {
        this.listeLieux.push(item.name);
      }
    },
    getLieuxVotes() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "centres/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.lieux = data.listeCentres;
            this.items = this.lieux;
          }

          if (data.statusRequete == 200) {
            this.lieux = [];
            this.items = this.lieux;
          }

          this.getNamesCentres();
          this.loadingPage = false;
        });
    },
    getListeRepresentant(data) {
      this.representants = [];
      for (let item of data) {
        this.representants.push(item.nomprenom);
      }
    },
    getInfoBureau(idBureau) {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "bureau/info/" + idBureau, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.libelleBureau = data.bureau;
            this.representantsInfos = data.representantDispo;
            // Ajoutons la liste des representants dans le tableau dynamique
            this.getListeRepresentant(this.representantsInfos);

            // Voyons s'il existe un representant dans ce bureau
            if (data.representant !== null) {
              this.representants.push(data.representant);
              this.repBureauPosition = this.representants.length - 1;
              this.representant = this.representants[this.repBureauPosition];
              this.RepSelected = this.representantsInfos.filter(e => {
                if (e.nomprenom === this.representant) return e;
              });
            } else {
              this.representant = "";
            }
            this.editBureau = true;
            this.idBureau = idBureau;
          }

          if (data.statusRequete == 200) {
            // this.editBureau = false
            this.text =
              "Une érreur est survenue lors du chargement des données du bureau";
            this.snackbar = true;
          }
        });
    },
    checkAnswer(representant) {
      // Verifions si l'utilisateur veux assigner un representant ou pas au bureau
      if (this.addRepresentant) {
        this.RepSelected = this.representantsInfos.filter(e => {
          if (e.nomprenom === representant) return e;
        });
      } else {
        this.RepSelected = null;
      }
    },
    checkLieuSelected(lieux) {
      this.LieuxSelected = this.lieux.filter(e => {
        if (e.name === lieux) {
          // Renseignons les autres champs du lieux selectionné
          this.editLibelleLieux = e.name;
          this.editLocalisation = e.localisation;
          this.editNbInscrit = e.nbInscrit;
          return e;
        }
      });
    },
    checkLieuForBureau(lieux) {
      this.LieuxSelected = this.lieux.filter(e => {
        if (e.name === lieux) {
          return e;
        }
      });
    },
    editerBureau() {
      this.snackbar = false;
      let form = document.getElementById("editBureau");
      let data = new FormData(form);
      data.append("idBureau", this.idBureau);
      data.append("libelleBureau", this.libelleBureau);
      if (this.RepSelected.length !== 0) {
        data.append("idRepresentant", this.RepSelected[0].id);
      } else {
        data.append("idRepresentant", "");
      }

      this.axios
        .post(apiConfig.baseURL + "bureau/edit/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // Récupérons la réponse
          let data = response.data;
          // console.log(data);

          if (data.statusRequete == 100) {
            // Recherchons le bureau modifiée
            let bureauLibelle = data.bureau;
            let representant = data.representant;
            let contact = data.contact;
            this.lieux.filter(e => {
              for (let bv of e.bv) {
                if (bv.id === data.idBureau) {
                  bv.name = bureauLibelle;
                  bv.representant = representant;
                  bv.contact = contact;
                }
              }
            });
            this.editBureau = false;
            this.loadingPage = false;
            this.text = "Modification(s) enregistrée(s)";
            this.snackbar = true;
          }
        });
    },
    editInfoCentre() {
      this.editLieux = false;
      this.loadingPage = true;
      this.snackbar = false;
      let form = document.getElementById("editLieux");
      let data = new FormData(form);
      data.append("idCentre", this.LieuxSelected[0].id);
      data.append("libelleCentre", this.editLibelleLieux);
      data.append("localisation", this.editLocalisation);
      data.append("nbInscrit", this.editNbInscrit);

      this.axios
        .post(apiConfig.baseURL + "centres/edit/info", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;
          let oldname = "";
          if (data.statusRequete == 100) {
            // Recherchons le lieux qui à été modifié
            // Mettons à jours les nouvelles valeures
            this.lieux.filter(e => {
              if (e.id === data.idCentre) {
                e.localisation = data.localisation;
                // Récupérons l'ancien nom
                oldname = e.name;
                // Modifions le par le nouveau
                e.name = data.name;
                e.nbInscrit = data.nbInscrit;
              }
            });

            this.listeLieux = [];
            this.getNamesCentres();

            this.loadingPage = false;
            this.text = "Modification enregistrée";
            this.snackbar = true;
          }
        });
    },
    addNewLieux() {
      this.addLieux = false;
      this.loadingPage = true;
      this.snackbar = false;
      let form = document.getElementById("addLieux");
      let data = new FormData(form);
      data.append("libelleLieux", this.newLibelleLieux);
      data.append("localisation", this.newLocalisation);
      data.append("idCandidat", this.user.idCandidat);
      data.append("nbInscrit", this.newNbInscrit);
      data.append("nbBureau", this.newNbBureau);

      this.axios
        .post(apiConfig.baseURL + "centres/add/new", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // Récupérons la réponse
          let data = response.data;
          // console.log(data);

          if (data.statusRequete == 100) {
            // Rajoutons au tableau le nouvel element
            this.items.push(data.newCentre);
            this.getNamesCentres();

            this.loadingPage = false;
            this.text =
              "Nouveau lieu de vote ajouté (" + this.newLibelleLieux + ")";
            this.snackbar = true;
          }
        });
    },
    addNewBureau() {
      this.addBureau = false;
      this.loadingPage = true;
      this.snackbar = false;
      let form = document.getElementById("addBureau");
      let data = new FormData(form);
      data.append("idCentre", this.LieuxSelected[0].id);
      data.append("libelleBureau", this.newLibelleBureau);

      // console.log(this.LieuxSelected[0].id);
      // console.log(this.newLibelleBureau);

      this.axios
        .post(apiConfig.baseURL + "bureau/add/new", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          // Récupérons la réponse
          let data = response.data;

          if (data.statusRequete == 100) {
            // Rajoutons au tableau le nouvel element
            this.items.filter(e => {
              if (e.id === data.idCentre) {
                e.bv.push(data.newBureau);
              }
            });

            this.loadingPage = false;
            this.text =
              "Nouveau bureau de vote ajouté (" + this.newLibelleBureau + ")";
            this.snackbar = true;
          }
        });
    },
    cancelEdit() {
      this.editBureau = false;
      this.loadingPage = false;
    },
    deleteBureau(idBureau) {
      this.idBureau = idBureau;
      this.supprimer = true;
    },
    confirmDeleteBureau() {
      this.snackbar = false;
      this.supprimer = false;
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "bureau/delete/" + this.idBureau, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Retirons du tableau la valeure supprimée
            // Recherchons premièrement le bureau qui à été supprimé
            // Supprimons l'element qui a cette clée
            let bureauName = "";
            this.items = this.items.filter(e => {
              for (let bureau of e.bv) {
                if (bureau.id === this.idBureau) {
                  let key = e.bv.indexOf(bureau);
                  bureauName = bureau.name;
                  return e.bv.splice(key, 1);
                }
              }
            });

            this.loadingPage = false;
            this.clear = true;
            this.text = "Suppression du bureau de vote (" + bureauName + ")";
            this.snackbar = true;
          }
        });
    },
    cancelDeleteBureau() {
      this.idBureau = "";
      this.supprimer = false;
    },

    confirmDeleteLieux() {
      this.deleteLieux = false;
      this.loadingPage = true;
      this.snackbar = false;

      this.axios
        .get(apiConfig.baseURL + "centres/delete/" + this.LieuxSelected[0].id, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.getLieuxVotes();
            this.loadingPage = false;
            this.clear = true;
            this.text =
              "Suppression du lieu de vote (" +
              this.LieuxSelected[0].name +
              ")";
            this.snackbar = true;
            this.LieuxSelected = "";
          }
        });
    },
    importLieuxVote() {
      this.importLieux = false;
      this.loadingPage = true;
      this.snackbar = false;

      let data = new FormData();
      data.append("idCandidat", this.user.idCandidat);
      data.append("file", this.selectedFile);

      this.axios
        .get(apiConfig.baseURL + "centres/import/data", data, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            this.getLieuxVotes();
            this.loadingPage = false;
            this.text = "L'importation des lieux de vote à été un succès";
            this.snackbar = true;
          }
        });
    },
    cancelDeleteLieux() {
      this.LieuxSelected = "";
      this.deleteLieux = false;
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
        this.items = this.lieux;
        this.clear = false;
      }
      if (this.search === "" && val === "") {
        this.items = this.lieux;
        this.clear = false;
      }
      if (val !== "" && val !== undefined && val !== null) {
        this.items = [];
        this.items = this.lieux.filter(e => {
          if (e.name === val) {
            return e;
          }
        });
        this.clear = true;
      }
    },
    addRepresentant(v) {
      if (v === false) {
        this.RepSelected = [];
        this.representant = "";
      } else {
        this.RepSelected = this.representantsInfos.filter(e => {
          if (e.nomprenom === this.representant) return e;
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.getLieuxVotes();
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
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
</style>
