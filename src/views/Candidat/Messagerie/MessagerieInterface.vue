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
        <!-- ############## MENU MESSAGERIE ################## -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-breadcrumbs divider="/" style="margin-bottom:20px">
              <v-breadcrumbs-item
                :disabled="true"
              >
                Tableau de bord
              </v-breadcrumbs-item>
              <v-breadcrumbs-item
                :disabled="false"
              >
                Messagerie
              </v-breadcrumbs-item>

              <v-spacer></v-spacer>

            <!-- ############## LISTE DES ACTIONS DES CONTACTS ################## -->

              <v-btn
              fab
              small
              color="blue ligthen-4"
              class="white--text"
              @click.native="addContact = true"
              style="right: 45px;position: absolute;top: 30px;"
              v-if="active === 4"
            >
              
              <v-icon dark>person_add</v-icon>
            </v-btn>

            <!-- ############## LISTE DES ACTION DU GROUPE ################## -->

            <v-btn
              fab
              small
              color="blue ligthen-4"
              class="white--text"
              @click.native="openNewGroupForm"
              style="right: 45px;position: absolute;top: 30px;"
              v-if="active === 5"
            >
              
            <v-icon dark>create_new_folder</v-icon>
            </v-btn>

            <v-btn
              fab
              small
              color="orange lighten-1"
              class="white--text"
              @click.native="openEditGroupForm"
              style="right: 105px;position: absolute;top: 30px;"
              v-if="active === 5"
            >
              
            <v-icon dark>create</v-icon>
            </v-btn>

            <v-btn
              fab
              small
              color="red darken-1"
              class="white--text"
              @click.native="deleteGroupe = true"
              style="right: 165px;position: absolute;top: 30px;"
              v-if="active === 5"
            >
             
              <v-icon dark>delete_forever</v-icon>
            </v-btn>

            <!-- ############## LISTE DES ACTIONS DES LOGS SMS ################## -->

            <v-btn
              fab
              small
              color="blue ligthen-4"
              class="white--text"
              @click.native="findSmsRecuData"
              style="right: 45px;position: absolute;top: 30px;"
              v-if="active === 2"
            >
             
              <v-icon dark>refresh</v-icon>
            </v-btn>
            </v-breadcrumbs>
          </v-flex>
          <!--  Stat bar -->
          <v-flex xs4 md3 lg3>
            <v-card style="min-height: 100%">
              <!-- <v-toolbar color="light-blue" dark>

                <v-toolbar-title>Messagerie</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>refresh</v-icon>
                </v-btn>
              </v-toolbar> -->



              <v-list two-line subheader>


              <v-subheader inset>Menu</v-subheader>


                <v-list-tile
                  avatar
                  @click="openNewSmsForm"
                  class="" :class="{'active-sub-menu': active === 1}"
                >
                  <v-list-tile-avatar>
                    <v-icon :class="'orange lighten-1 white--text'">textsms</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Envoyer Sms</v-list-tile-title>
                    <v-list-tile-sub-title>Envoyer un message</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <!-- <v-list-tile-action>
                    <v-btn icon >
                      <span color="grey lighten-1">32</span>
                    </v-btn>
                  </v-list-tile-action> -->
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click="getSmsRecu"
                  class="" :class="{'active-sub-menu': active === 2}"
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
                      <span color="grey lighten-1">{{listMessage.length}}</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click="getSmsEnvoye"
                  class="" :class="{'active-sub-menu': active === 3}"
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
                      <span color="green lighten-1">{{messageEnvoye.length}}</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

                <v-list-tile
                  avatar
                  @click="getContact"
                  class="" :class="{'active-sub-menu': active === 4}"
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
                      <span color="grey lighten-1">{{contacts.length}}</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>


              <v-divider inset></v-divider>

                <v-subheader inset>Mes groupes</v-subheader>

                <v-list-tile
                  avatar
                  @click="getGroupeListe"
                  class="" :class="{'active-sub-menu': active === 5}"
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
                      <span color="grey lighten-1">{{groupeListe.length}}</span>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>

        <!-- ############## LISTE DES CONTACTS ################## -->
          <v-flex xs4 md9 lg9 v-if="contact == true">
             <template>
              <v-card>
                <v-card-title class="blue-grey lighten-4">
                  <span>Liste des contacts ({{contacts.length}})</span>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    :loading="loading"
                    :items="infoListe"
                    :search-input.sync="search"
                    v-model="select"
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Rechercher un contact"
                    solo-inverted
                    @blur="checkValue"
                  ></v-autocomplete>
                  <v-btn 
                  icon
                  fab
                  small
                  v-if="clear === true" 
                  @click="clearResearch(contacts)">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-card-title>
                  <table class="v-datatable v-table">
                      <thead>
                        <tr>
                          <th class="text-xs-left" width="50">#</th>
                          <th class="text-xs-left" width="370">Nom & Prenoms</th>
                          <th class="text-xs-left">Contact</th>
                          <th class="text-xs-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) of items" :key="'contact'+i" v-if="items.length > 0">
                          <td style="padding-top: 20px;padding-bottom: 20px;">
                           <v-icon medium>person_pin</v-icon>
                          </td>
                          <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;width:170px">{{ item.name }}</td>
                          <td class="text-xs-left">{{ item.contact }}</td>
                          <td class="text-xs-left">
                            <v-btn 
                            small
                            ripple
                            fab
                            color="orange lighten-1"
                            dark
                            @click="openEditContact(item)">
                            <v-icon
                            >
                              create
                            </v-icon>
                            </v-btn>

                            <v-btn 
                            small
                            ripple
                            fab
                            color="red lighten-1"
                            dark
                            @click="deleteContact(item)">
                            <v-icon
                            >
                              clear
                            </v-icon>
                            </v-btn>
                          </td>
                          
                        </tr>
                        
                      </tbody>
                  </table>
                  <v-card v-if="items.length === 0" style="padding-bottom: 21px">
                    <v-card-text>
                      <v-card-media class="text-xs-center">
                        <v-spacer></v-spacer>
                          <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> person_pin </v-icon>
                        <v-spacer></v-spacer>
                      </v-card-media>
                          Aucun contact disponible
                    </v-card-text>
                  </v-card>
              </v-card>
            </template>
          </v-flex>
          
         <!-- ############## LISTE DES MSGS RECUS ################## -->
          <v-flex xs4 md9 lg9 v-if="smsRecu == true">
             <template>
              <v-card>
                <v-card-title class="blue-grey lighten-4">
                  <span>Boîte de réception ({{listMessage.length}})</span>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    :loading="loading"
                    :items="infoListe"
                    :search-input.sync="search"
                    v-model="select"
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Rechercher un contact"
                    solo-inverted
                    @blur="checkValue"
                  ></v-autocomplete>
                  <v-btn 
                  icon
                  fab
                  small
                  v-if="clear === true" 
                  @click="clearResearch(listMessage)">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-card-title>
                 <table class="v-datatable v-table">
                  <thead>
                    <tr>
                      <!-- <th class="text-xs-left" width="50">
                        #
                      </th> -->
                      <th class="text-xs-left">Message</th>
                      <th class="text-xs-left" >Etat</th>
                      <th class="text-xs-left" >Emetteur</th>
                      <th class="text-xs-left">Date Réception</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) of items" 
                    :key="i" 
                    class=""
                    :class="{'active-sub-item': item.selected === true}" 
                    v-if="items.length > 0">
                      <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;">{{ item.content }}</td>
                      <td class="text-xs-left" v-if="item.traiter">
                            <v-icon color="green lighten-1" text-color="white">check_circle</v-icon>
                      </td>
                      <td class="text-xs-left" v-else>
                            <v-icon color="red lighten-1" text-color="white">error</v-icon>
                      </td>
                      <td class="text-xs-left">
                            {{ item.emetteur }}
                      </td>
                      <td class="text-xs-left">{{ item.dateReception }}</td>
                      
                    </tr>
                  </tbody>
                </table>
                <v-card v-if="items.length === 0" style="padding-bottom: 21px">
                  <v-card-text>
                    <v-card-media class="text-xs-center">
                      <v-spacer></v-spacer>
                        <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> email </v-icon>
                      <v-spacer></v-spacer>
                    </v-card-media>
                        Aucun message disponible
                  </v-card-text>
                </v-card>
              </v-card>
            </template>
          </v-flex>

         <!-- ############## LISTE DES MSGS ENVOYES ################## -->
          <v-flex xs4 md9 lg9 v-if="smsEnvoye == true">
             <template>
              <v-card>
                <v-card-title class="blue-grey lighten-4">
                  <span>Sms Envoyés ({{messageEnvoye.length}})</span>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    :loading="loading"
                    :items="infoListe"
                    :search-input.sync="search"
                    v-model="select"
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Rechercher un contact"
                    solo-inverted
                    @blur="checkValue"
                  ></v-autocomplete>
                  <v-btn 
                  icon
                  fab
                  small
                  v-if="clear === true" 
                  @click="clearResearch(messageEnvoye)">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-card-title>
                 <table class="v-datatable v-table">
                  <thead>
                    <tr>
                      <th class="text-xs-left">Message</th>
                      <th class="text-xs-left">Destinataire</th>
                      <th class="text-xs-left">Date Envoie</th>
                      <th class="text-xs-left" width="50">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) of items" 
                    :key="i" 
                    @click="selectItem(item)"
                    v-if="items.length > 0"
                    >
                      
                      <td class="text-xs-left" style="padding-top: 25px;padding-bottom: 25px;width:170px">{{ item.content }}</td>
                      <td class="text-xs-left" v-if="item.groupe === true">
                        <v-chip color="blue-grey lighten-1" text-color="white">
                          <v-avatar>
                            <v-icon small>group</v-icon>
                          </v-avatar>
                            {{item.destinataire}} 
                        </v-chip>
                      </td>
                      <td class="text-xs-left" v-else>
                          {{item.destinataire}}
                      </td>
                      <!-- <td class="text-xs-left">{{ item.contact }}</td> -->
                      <td class="text-xs-left">{{ item.dateEnvoie }}</td>
                      <td>
                        <v-btn 
                        small
                        ripple
                        fab
                        color="red lighten-1"
                        dark
                        @click="deleteSmsEnvoyer(item)">
                        <v-icon
                        >
                          clear
                        </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-card v-if="items.length === 0" style="padding-bottom: 21px">
                  <v-card-text>
                    <v-card-media class="text-xs-center">
                      <v-spacer></v-spacer>
                        <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> chat </v-icon>
                      <v-spacer></v-spacer>
                    </v-card-media>
                        Aucun message envoyé
                  </v-card-text>
                </v-card>
              </v-card>
            </template>
          </v-flex>

         <!-- ############## LISTE DES GROUPES CREES ################## -->
          <v-flex xs4 md9 lg9 v-if="groupe == true">
             <template>
              <v-card>
                <v-card-title class="blue-grey lighten-4">
                  <span>Liste des groupes ({{groupeListe.length}})</span>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    :loading="loading"
                    :items="infoListe"
                    :search-input.sync="search"
                    v-model="select"
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Rechercher un groupe"
                    solo-inverted
                    @blur="checkValue"
                  ></v-autocomplete>
                  <v-btn 
                  icon
                  fab
                  small
                  v-if="clear === true" 
                  @click="clearResearch(groupeListe)">
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-card-title>
                <v-expansion-panel v-if="items.length > 0">
                  <v-expansion-panel-content
                    v-for="(item,i) of items"
                    :key="i"
                    style="padding: 20px 0px;"
                  >
                    <div slot="header" style="display:inline">
                        <v-list-tile-avatar style="position: absolute;top:3px">
                          <v-icon class="grey lighten-1 white--text">folder</v-icon>
                        </v-list-tile-avatar>
                        <span style="margin-left:50px">{{item.name}}</span>
                    </div>
                    <v-card>
                      <template v-for="(contact, index) in item.contacts">
                        <v-list-tile
                          :key="'contact'+index"
                          avatar
                          ripple
                          style="padding-left: 41px;padding-top: 5px;padding-bottom: 5px;"
                        >
                          
                          <v-list-tile-content>
                            <v-list-tile-sub-title class="text--primary" style="font-size: small;">
                               {{ contact.name }}
                            </v-list-tile-sub-title>
                          </v-list-tile-content>

                          <v-list-tile-content>
                            <v-list-tile-title style="font-size: small;">
                              {{ contact.number }}</v-list-tile-title>
                          </v-list-tile-content>

                          <v-list-tile-action>                        
                            <v-btn 
                            small
                            ripple
                            fab
                            color="red lighten-1"
                            dark
                            @click="openRemoveContact(contact.id, item.id)">
                              <v-icon>
                                clear
                              </v-icon>
                            </v-btn>
                          </v-list-tile-action>

                        </v-list-tile>
                        <v-divider
                          v-if="index < item.contacts.length - 1"
                          :key="'dv'+index"
                        ></v-divider>
                      </template>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-card v-if="items.length === 0" style="padding-bottom: 21px">
                  <v-card-text>
                    <v-card-media class="text-xs-center">
                      <v-spacer></v-spacer>
                        <v-icon style="font-size: 90px;padding-bottom: 21px;padding-top: 20px;"> folder_open </v-icon>
                      <v-spacer></v-spacer>
                    </v-card-media>
                        Aucun groupe disponible
                  </v-card-text>
                </v-card>
              </v-card>
            </template>
          </v-flex>

        <!-- ############## ENVOYER DES MSGS ################## -->
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
                      :label="single ? 'Envoi unique' : 'Envoi multiple'"
                      v-model="single"
                    ></v-switch>
                    
                    <v-switch
                      v-if="single === false"
                      :label="multiple ? 'Selectionner un groupe' : 'Selectionner plusieurs contacts'"
                      v-model="multiple"
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

                      <v-autocomplete
                        v-if="single === false && multiple === false"
                        v-model="selectedContact"
                        :items="contacts"
                        box
                        chips
                        label="Mes contacts"
                        item-text="name"
                        item-value="contact"
                        multiple
                      >
                        <template
                          slot="selection"
                          slot-scope="data"
                        >
                          <v-chip
                            :selected="data.selected"
                            close
                            class="chip--select-multi"
                            @input="remove(data.item.contact)"
                          >
                            <v-avatar>
                              <v-icon medium>person_pin</v-icon>
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template
                          slot="item"
                          slot-scope="data"
                        >
                          <!-- <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template> -->
                          <template>
                            <v-list-tile-avatar>
                              <v-icon medium>person_pin</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                              <v-list-tile-sub-title v-html="data.item.contact"></v-list-tile-sub-title>
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      <v-autocomplete
                        v-if="single === false && multiple === true"
                        v-model="selectedGroup"
                        :items="groupeListe"
                        box
                        chips
                        label="Mes groupes"
                        item-text="name"
                        item-value="id"
                        multiple
                      >
                        <template
                          slot="selection"
                          slot-scope="data"
                        >
                          <v-chip
                            :selected="data.selected"
                            close
                            class="chip--select-multi"
                            @input="remove(data.item.id)"
                          >
                            <v-avatar>
                              <v-icon medium>folder</v-icon>
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template
                          slot="item"
                          slot-scope="data"
                        >
                        
                          <template>
                            <v-list-tile-avatar>
                              <v-icon medium>folder</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                              <!-- <v-list-tile-sub-title v-html="data.item.contact"></v-list-tile-sub-title> -->
                            </v-list-tile-content>
                          </template>
                        </template>
                      </v-autocomplete>

                      
                    <v-textarea
                      v-model="sms"
                      name="input-7-1"
                      prepend-icon="textsms"
                      label="Saisissez le sms"
                      
                     
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

        <!-- ############## MODAL PERMETTANT D'AJOUTER UN GROUPE ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addGroupe" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                <v-card style="min-height: 100%">
                  <v-toolbar color="light-blue" dark>

                    <v-toolbar-title> Ajouter un groupe</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="addGroupe = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="listeContactForGroupe"
                              item-value="contacts"
                              item-text="text"
                              label="Liste des contacts"
                              @change="checkContactsForGroupe"
                              chips
                              clearable
                              prepend-icon="how_to_vote"
                              required
                              multiple>
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
                            label="Libellé du groupe" 
                            v-model="newLibelleGroupe"
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
                      <v-btn color="red darken-2" small @click.native="addGroupe = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addNewGroupe" dark>Enregistrer</v-btn>
                    </v-card-actions>

                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>

        <!-- ############## MODAL PERMETTANT D'EDITER UN GROUPE ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="editGroupe" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                <v-card style="min-height: 100%">
                  <v-toolbar color="light-blue" dark>

                    <v-toolbar-title> Editer un groupe</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="editGroupe = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="infoListe"
                              item-value="groupe"
                              item-text="text"
                              label="Sélectionnez un groupe"
                              v-model="select"
                              @change="checkGroupeSelected"
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
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="listeContactForGroupe"
                              item-value="contacts"
                              item-text="text"
                              label="Liste des contacts"
                              v-model="existingContactGroupe"
                              @change="checkContactsForGroupe"
                              chips
                              clearable
                              prepend-icon="how_to_vote"
                              required
                              multiple>
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
                            label="Libellé du groupe" 
                            v-model="editLibelleGroupe"
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
                      <v-btn color="red darken-2" small @click.native="editGroupe = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="confirmEditGroupe" dark>Enregistrer</v-btn>
                    </v-card-actions>

                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>
        
        <!-- ############## MODAL PERMETTANT DE SUPPRIMER UN CONTACT DU GROUPE ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="removeContactGroupe"
                max-width="350"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Suppression d'un contact du groupe</v-card-title>

                  <v-card-text style="text-align:center">
                    Voulez-vous vraiment retirer ce contact de ce groupe ?
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="removeContactGroupe = false"
                    >
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="removeContactOfGroupe"
                    >
                      Supprimer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>

        <!-- ############## MODAL PERMETTANT DE SUPPRIMER UN GROUPE ################## -->

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="deleteGroupe" persistent max-width="500px">
                <form id="deleteLieux">
                  <v-card>
                    <v-toolbar color="light-blue" dark>

                      <v-toolbar-title>Supression d'un groupe</v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn icon @click="deleteGroupe = false">
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
                          Voulez-vous vraiment supprimer ce groupe ?<br>
                          En acceptant de supprimer ce groupe, vous acceptez<br>
                          de supprimer tous les messages rattachés à ce dernier ?
                          </v-alert>
                          <v-flex xs12 sm12 d-flex>
                            <v-combobox
                              :items="infoListe"
                              item-value="lieux"
                              item-text="text"
                              label="Selectionnez un groupe"
                              @change="checkGroupeSelected"
                              chips
                              clearable
                              prepend-icon="folder"
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
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="deleteGroupe = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="removeGroupe" dark>Supprimer</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>

        <!-- ############## MODAL PERMETTANT D'AJOUTER UN CONTACT ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="addContact" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                <v-card style="min-height: 100%">
                  <v-toolbar color="light-blue" dark>

                    <v-toolbar-title> Ajouter un nouveau contact</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="addContact = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Nom & prenom" 
                            v-model="newNameContact"
                            prepend-icon="person_pin"
                            required>
                            </v-text-field>
                          </v-flex>
                          
                          <v-flex xs12>
                            <v-text-field 
                            label="Numéro de tel" 
                            v-model="newNumberContact"
                            :counter="8"
                            type="number"
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="addContact = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="addNewContact" dark>Enregistrer</v-btn>
                    </v-card-actions>

                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>
        
        <!-- ############## MODAL PERMETTANT D'EDITER UN CONTACT ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="editContact" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                <v-card style="min-height: 100%">
                  <v-toolbar color="light-blue" dark>

                    <v-toolbar-title> Modifier contact</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="editContact = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Nom & prenom" 
                            v-model="editNameContact"
                            prepend-icon="person_pin"
                            required>
                            </v-text-field>
                          </v-flex>
                          
                          <v-flex xs12>
                            <v-text-field 
                            label="Numéro de tel" 
                            v-model="editNumberContact"
                            type="number"
                            prepend-icon="dialpad"
                            required>
                            </v-text-field>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="editContact = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="confirmEditContact" dark>Enregistrer</v-btn>
                    </v-card-actions>

                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>

        <!-- ############## MODAL PERMETTANT DE SUPPRIMER UN CONTACT ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog
                v-model="supprimerContact"
                max-width="350"
              >
                <v-card>
                  <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment supprimer ce contact ?</v-card-title>

                  <v-card-text style="text-align:center">
                    En acceptant de supprimer ce contact vous acceptez de le supprimer de tous les groupes auxquels il est rattaché ?
                  </v-card-text>

                  <v-card-actions style="padding-bottom:20px">
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red ligthen-4"
                      small
                      dark
                      @click="supprimerContact = false"
                    >
                      Annuler
                    </v-btn>

                    <v-btn
                      color="green ligthen-1"
                      small
                      dark
                      @click="confirmDeleteContact"
                    >
                      Supprimer
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>

        <!-- ############## MODAL PERMETTANT DE MODIFIER LES DONNEES DES SMS ################## -->
        <div>
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="editLogSms" persistent max-width="500px">
                <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
                <v-card style="min-height: 100%">
                  <v-toolbar color="light-blue" dark>

                    <v-toolbar-title> Modifier sms reçu</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="editLogSms = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text v-if="selectedSms !== null">
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field 
                            label="Message" 
                            v-model="selectedSms.content"
                            prepend-icon="create"
                            required>
                            </v-text-field>
                          </v-flex>
                         
                        </v-layout>
                      </v-container>
                      <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions style="padding-bottom: 15px;padding-right: 35px;">
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" small @click.native="editLogSms = false" dark>Annuler</v-btn>
                      <v-btn color="green darken-1" small @click.native="confirmEditLogSms" dark>Enregistrer</v-btn>
                    </v-card-actions>

                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </div>

      

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
      active: null,
      loadingPage: false,
      editLogSms: false,
      addGroupe: false,
      selectedGroup: [],
      removeContactGroupe: false,
      deleteGroupe: false,
      editGroupe: false,
      addContact: false,
      editContact: false,
      supprimerContact: false,
      selectedSms: null,
      selectAll: false,
      smsEnvoye: false,
      multiple: false,
      groupe: false,
      contact: false,
      smsRecu: true,
      sendSms: false,
      content: false,
      search: "",
      dialog: false,
      clear: false,
      select: null,
      newLibelleGroupe: null,
      editLibelleGroupe: null,
      newNameContact: null,
      newNumberContact: null,
      idContact: null,
      editNameContact: null,
      editNumberContact: null,
      listeContactForGroupe: null,
      groupeSelected: null,
      idGroupe: null,
      existingContactGroupe: [],
      destinataire: "",
      destinataires: [],
      selectedContact: [],
      sms: "",
      valid: false,
      loader: null,
      loading: false,
      snackbar: false,
      mode: "",
      y: "top",
      x: "right",
      mode: "",
      timeout: 6000,
      text: "",
      contacts: [],
      selected: [],
      infoListe: [],
      deleteElement: [],
      listMessage: [],
      messageEnvoye: [],
      groupeListe: [],
      items: [],
      ContactForGroupe: []
    };
  },
  methods: {
    toggle() {},
    remove(item) {
      if (this.single === false && this.multiple === false) {
        const index = this.selectedContact.indexOf(item);
        if (index >= 0) this.selectedContact.splice(index, 1);
      }
      if (this.single === false && this.multiple === true) {
        const index = this.selectedGroup.indexOf(item);
        if (index >= 0) this.selectedGroup.splice(index, 1);
      }
    },
    toggleAll(el) {
      for (let item of el) {
        item.selected = true;
      }
    },
    unToggleAll(el) {
      for (let item of el) {
        item.selected = false;
      }
    },
    openEditLogSms(logSms) {
      // this.selectItem(logSms);
      this.selectedSms = logSms;
      this.editLogSms = true;
    },
    openEditContact(el) {
      // this.selectItem(logSms);
      this.idContact = el.id;
      this.editNameContact = el.name;
      this.editNumberContact = el.contact;
      this.editContact = true;
    },
    deleteContact(el) {
      // this.selectItem(logSms);
      this.idContact = el.id;
      this.supprimerContact = true;
    },
    openRemoveContact(idContact, idGroupe) {
      // this.selectItem(logSms);
      this.idContact = idContact;
      this.idGroupe = idGroupe;
      this.removeContactGroupe = true;
    },
    openNewGroupForm() {
      this.addGroupe = true;
      this.listeContactForGroupe = [];
      for (let item of this.contacts) {
        this.listeContactForGroupe.push(item.name);
      }
    },
    openEditGroupForm() {
      this.editGroupe = true;
      this.listeContactForGroupe = [];
    },
    openNewSmsForm() {
      this.active = 1;
      this.smsRecu = false;
      this.contact = false;
      this.smsEnvoye = false;
      this.groupe = false;

      this.sendSms = true;
    },
    checkContactsForGroupe(contacts) {
      let contactSelected = contacts;
      this.ContactForGroupe = this.contacts.filter(e => {
        for (let item of contactSelected) {
          if (e.name === item) {
            return e;
          }
        }
      });
    },
    checkGroupeSelected(groupe) {
      this.groupeSelected = groupe;
    },
    getSmsRecu() {
      this.active = 2;
      this.sendSms = false;
      this.contact = false;
      this.smsEnvoye = false;
      this.groupe = false;

      //Récupérons les dernières info en ligne
      this.findSmsRecuData();
      this.infoListe = [];
      this.getNamesListe(this.active);
      this.smsRecu = true;
    },
    closeNewSmsForm() {
      this.active = 3;
      this.contact = false;
      this.sendSms = false;
      this.smsRecu = false;
      this.groupe = false;

      //Récupérons les dernières info en ligne
      this.findContactsCandidat();
      this.findSmsEnvoyes();
      this.getNamesListe(this.active);
      this.smsEnvoye = true;
    },
    getSmsEnvoye() {
      this.active = 3;
      this.sendSms = false;
      this.contact = false;
      this.smsRecu = false;
      this.groupe = false;

      //Récupérons les dernières info en ligne
      this.findSmsEnvoyes();
      this.infoListe = [];
      this.getNamesListe(this.active);
      this.smsEnvoye = true;
    },
    getContact() {
      this.active = 4;
      this.smsRecu = false;
      this.sendSms = false;
      this.smsEnvoye = false;
      this.groupe = false;

      //Récupérons les dernières info en ligne
      this.findContactsCandidat();
      this.infoListe = [];
      this.getNamesListe(this.active);
      this.contact = true;
    },
    getGroupeListe() {
      this.active = 5;
      this.smsRecu = false;
      this.sendSms = false;
      this.smsEnvoye = false;
      this.contact = false;

      //Récupérons les dernières info en ligne
      this.findGroupesCandidat();
      this.infoListe = [];
      this.getNamesListe(this.active);
      this.groupe = true;
    },
    selectItem(item) {
      let selected = item.selected;
      if (selected === true) {
        // Passons l'objet à faux et retirons le du tableau
        item.selected = !item.selected;
        // console.log(this.deleteElement.indexOf(item));
      } else {
        // Passons l'objet à vrai et ajoutons le du tableau
        item.selected = !item.selected;
      }
    },
    getNamesListe(el) {
      if (el === 2) {
        this.infoListe = [];
        for (let item of this.listMessage) {
          this.infoListe.push(item.emetteur);
        }
        this.resetItemWith(this.listMessage);
      }
      if (el === 3) {
        this.infoListe = [];
        for (let item of this.messageEnvoye) {
          this.infoListe.push(item.destinataire);
        }
        this.resetItemWith(this.messageEnvoye);
      }
      if (el === 4) {
        this.infoListe = [];
        for (let item of this.contacts) {
          this.infoListe.push(item.name);
        }
        this.resetItemWith(this.contacts);
      }
      if (el === 5) {
        this.infoListe = [];
        for (let item of this.groupeListe) {
          this.infoListe.push(item.name);
        }
        this.resetItemWith(this.groupeListe);
      }
    },
    resetItemWith(el) {
      this.items = el;
    },
    clearResearch(el) {
      this.clear = false;
      this.select = null;
      this.search = null;
      this.resetItemWith(el);
    },
    checkValue() {
      // console.log("test");
      if (this.search === null && this.select === "") {
        this.clear = false;
        // console.log("test");
        this.items = this.listMessage.filter(e => {
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
    querySelections(v, el) {
      this.loading = true;
      // Simulated ajax query
      if (el === 2) {
        setTimeout(() => {
          this.items = this.listeMessage.filter(e => {
            return (
              (e.content || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1 ||
              (e.emetteur || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1 ||
              (e.dateReception || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1 ||
              (e.contact || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1
            );
          });
          this.loading = false;
        }, 500);
      }

      if (el === 3) {
        setTimeout(() => {
          this.items = this.messageEnvoye.filter(e => {
            return (
              (e.content || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1 ||
              (e.destinataire || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1 ||
              (e.dateEnvoie || "")
                .toLowerCase()
                .indexOf((v || "").toLowerCase()) > -1 ||
              (e.contact || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1
            );
          });
          this.loading = false;
        }, 500);
      }

      if (el === 4) {
        setTimeout(() => {
          this.items = this.contacts.filter(e => {
            return (
              (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1 ||
              (e.contact || "").toLowerCase().indexOf((v || "").toLowerCase()) >
                -1
            );
          });
          this.loading = false;
        }, 500);
      }

      if (el === 5) {
        setTimeout(() => {
          this.items = this.groupeListe.filter(e => {
            return (
              (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
          this.loading = false;
        }, 500);
      }
    },
    findSmsRecuData() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "logsms/listlog/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons la liste des sms reçu
            this.listMessage = data.listLogSms;
            this.getNamesListe(this.active);
            this.loadingPage = false;
          }
          if (data.statusRequete == 200) {
            // Récupérons la liste des sms reçu
            this.listMessage = [];
            this.loadingPage = false;
          }
        });
    },
    findSmsEnvoyes() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "sms/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons la liste des sms reçu
            this.messageEnvoye = data.listSmsEnvoyes;
            this.getNamesListe(this.active);
            this.loadingPage = false;
          }

          if (data.statusRequete == 200) {
            // Récupérons la liste des sms reçu
            this.messageEnvoye = [];
            this.loadingPage = false;
          }
        });
    },
    findContactsCandidat() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "contact/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons la liste des sms reçu
            this.contacts = data.listContact;
            this.loadingPage = false;
          }

          if (data.statusRequete == 200) {
            // Récupérons la liste des sms reçu
            this.contacts = [];
            this.loadingPage = false;
          }
        });
    },
    findGroupesCandidat() {
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "groupe/listAll/" + this.user.idCandidat, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons la liste des sms reçu
            this.groupeListe = data.listGroupes;
            this.loadingPage = false;
          }

          if (data.statusRequete == 200) {
            // Récupérons la liste des sms reçu
            this.groupeListe = [];
            this.loadingPage = false;
          }
        });
    },
    confirmEditLogSms() {
      this.editLogSms = false;
      this.loadingPage = true;
      let data = new FormData();
      data.append("idLogSms", this.selectedSms.id);
      data.append("message", this.selectedSms.content);
      this.axios
        .post(apiConfig.baseURL + "logsms/editSms", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let logSms = data.logSms;
            this.listMessage.filter(e => {
              if (e.id === logSms.id) {
                e.content = logSms.content;
              }
            });

            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
          }
        });
    },
    addNewContact() {
      this.addContact = false;
      this.snackbar = false;
      this.loadingPage = true;
      let data = new FormData();
      data.append("idCandidat", this.user.idCandidat);
      data.append("nomPrenom", this.newNameContact);
      data.append("cel", this.newNumberContact);
      this.axios
        .post(apiConfig.baseURL + "contact/addContact", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let contact = data.newContact;
            this.contacts.push(contact);

            this.active = 4;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Contact ajouté avec succès";
            this.snackbar = true;
          }
        });
    },
    confirmEditContact() {
      this.editContact = false;
      this.snackbar = false;
      this.loadingPage = true;
      let data = new FormData();
      data.append("idContact", this.idContact);
      data.append("nomPrenom", this.editNameContact);
      data.append("cel", this.editNumberContact);
      this.axios
        .post(apiConfig.baseURL + "contact/editContact", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let contact = data.editContact;
            this.contacts.filter(e => {
              if (e.id === contact.id) {
                e.name = contact.name;
                e.contact = contact.contact;
              }
            });

            this.active = 4;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Contact modifié avec succès";
            this.snackbar = true;
          }
        });
    },
    confirmDeleteContact() {
      this.supprimerContact = false;
      this.snackbar = false;
      this.loadingPage = true;
      this.axios
        .get(apiConfig.baseURL + "contact/delete/" + this.idContact, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let contact = data.deleteContact;
            this.contacts = this.contacts.filter(e => {
              if (e.id !== contact.id) {
                return e;
              }
            });

            // Mettons à jours la liste des sms et retirons les sms du contact supprimé
            this.findSmsEnvoyes();
            this.findGroupesCandidat();

            this.active = 4;
            this.infoListe = [];
            this.getNamesListe(this.active);
            this.resetItemWith(this.contacts);

            this.loadingPage = false;
            this.text = "Contact supprimé avec succès";
            this.snackbar = true;
          }

          if (data.statusRequete == 200) {
            // Récupérons l'objet sms modifié
            this.loadingPage = false;
            this.text = "Nous n'avons pas reussi à supprimer ce contact";
            this.snackbar = true;
          }
        });
    },
    addNewGroupe() {
      this.addGroupe = false;
      this.snackbar = false;
      this.loadingPage = true;
      let data = new FormData();
      data.append("idCandidat", this.user.idCandidat);
      data.append("libelle", this.newLibelleGroupe);
      for (let n = 0; n < this.ContactForGroupe.length; n++) {
        data.append("contacts[" + n + "]", this.ContactForGroupe[n].id);
      }

      this.axios
        .post(apiConfig.baseURL + "groupe/addgroupe", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let newGroupe = data.newGroupe;
            this.groupeListe.push(newGroupe);

            this.active = 5;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Nouveau groupe ajouté avec succès";
            this.snackbar = true;
          }
        });
    },
    confirmEditGroupe() {
      this.editGroupe = false;
      this.snackbar = false;
      this.loadingPage = true;
      let data = new FormData();

      // Récupérons l'id du groupe
      let groupe = this.items.filter(e => {
        if (e.name === this.groupeSelected) return e;
      });

      data.append("groupeId", groupe[0].id);
      data.append("libelle", this.editLibelleGroupe);
      if (this.ContactForGroupe.length !== 0) {
        for (let n = 0; n < this.ContactForGroupe.length; n++) {
          data.append("contacts[" + n + "]", this.ContactForGroupe[n].id);
        }
      }

      this.axios
        .post(apiConfig.baseURL + "groupe/edit", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;
          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let editingGroupe = data.editingGroupe;
            this.groupeListe.filter(e => {
              if (e.id === editingGroupe.id) {
                e.name = editingGroupe.name;
                e.contacts = editingGroupe.contacts;
              }
            });

            // Réinitialisons les données
            this.groupeSelected = "";
            this.editLibelleGroupe = "";
            this.existingContactGroupe = [];
            this.listeContactForGroupe = [];

            this.active = 5;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Groupe modifié avec succès";
            this.snackbar = true;
          }

          if (data.statusRequete == 200) {
            this.loadingPage = false;
            this.text = "Nous n'avons pas réussie à modifié ce groupe";
            this.snackbar = true;
          }
        });
    },
    removeContactOfGroupe() {
      this.removeContactGroupe = false;
      this.snackbar = false;
      this.loadingPage = true;
      let data = new FormData();
      data.append("idGroupe", this.idGroupe);
      data.append("idContact", this.idContact);

      this.axios
        .post(apiConfig.baseURL + "groupe/remove/contact", data, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Récupérons l'objet sms modifié
            let newGroupe = data.newGroupe;
            this.groupeListe.filter(e => {
              if (e.id === this.idGroupe) {
                let contacts = e.contacts.filter(c => {
                  if (c.id !== this.idContact) return c;
                });
                // Mettons à jours les anciens contacts du groupe
                e.contacts = contacts;
              }
            });

            this.active = 5;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Contact retiré du groupe avec succès";
            this.snackbar = true;
          }
        });
    },
    removeGroupe() {
      this.deleteGroupe = false;
      this.snackbar = false;
      this.loadingPage = true;
      let groupe = this.items.filter(e => {
        if (e.name === this.groupeSelected) return e;
      });

      this.axios
        .get(apiConfig.baseURL + "groupe/delete/" + groupe[0].id, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Retirons le groupe supprimé de la liste
            this.groupeListe = this.groupeListe.filter(e => {
              if (e.id !== groupe[0].id) {
                return e;
              }
            });

            this.findSmsEnvoyes();
            this.active = 5;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Groupe supprimé avec succès";
            this.snackbar = true;
          }
        });
    },
    sendMySms() {
      this.loader = "loading";

      // Envoi à une seule personne
      if (this.single === true) {
        let data = new FormData();
        data.append("idCandidat", this.user.idCandidat);
        data.append("destinataire", this.destinataire);
        data.append("type", "single");
        data.append("sms", this.sms);
        this.axios
          .post(apiConfig.baseURL + "sms/send/single", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            let data = response.data;
            // console.log(data);
            if (data.statusRequete == 100) {
              let newContact = data.newContact;
              this.contacts.push(newContact);
              this.text = "Sms envoyé avec succès";
              this.snackbar = true;

              //Vidons les champs
              this.destinataire = "";
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 200) {
              this.text = "Le Sms n'a pas pu être envoyé avec succès";
              this.snackbar = true;

              //Vidons les champs
              this.destinataire = "";
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 300) {
              this.text =
                "Une erreur est survenue lors de l'envoi du message, veuillez vérifier vos paramètres FyleSms...";
              this.snackbar = true;

              //Vidons les champs
              this.destinataire = "";
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }
          })
          .catch(response => {
            // console.log(data);
            this.text =
              "Une erreur au niveau du serveur est survenu lors de l'envoi du message...";
            this.snackbar = true;
            //Vidons les champs
            this.destinataire = "";
            this.sms = "";
            //Fermons le formulaire
            this.closeNewSmsForm();
          });
      }

      // Envoi à une ou plusieurs contacts
      if (this.single === false && this.multiple === false) {
        let data = new FormData();
        data.append("idCandidat", this.user.idCandidat);
        // Récupérons tout les numéros sélectionnés
        if (this.selectedContact.length > 0) {
          for (let step = 0; step < this.selectedContact.length; step++) {
            data.append(
              "destinataires[" + step + "]",
              this.selectedContact[step]
            );
          }
        }
        data.append("type", "multiple");
        data.append("sms", this.sms);
        this.axios
          .post(apiConfig.baseURL + "sms/send/multiple", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            let data = response.data;
            // console.log(data);
            if (data.statusRequete == 100) {
              this.text = "Sms envoyé avec succès";
              this.snackbar = true;

              //Vidons les champs
              this.selectedContact = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 200) {
              if (data.error !== undefined) {
                this.text = data.error;
              } else {
                this.text = "Le sms n'a pas pu être envoyé avec succès";
              }
              this.snackbar = true;

              //Vidons les champs
              this.selectedContact = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 300) {
              if (data.error !== undefined) {
                this.text = data.error;
              } else {
                this.text =
                  "Une erreur est survenue lors de l'envoi du message, veuillez vérifier vos paramètres FyleSms...";
              }

              this.snackbar = true;

              //Vidons les champs
              this.selectedContact = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }
          })
          .catch(response => {
            let data = response.data;
            // console.log(data);
            this.text =
              "Une erreur au niveau du serveur est survenu lors de l'envoi du message...";
            this.snackbar = true;
            //Vidons les champs
            this.selectedContact = [];
            this.sms = "";
            //Fermons le formulaire
            this.closeNewSmsForm();
          });
      }

      // Envoi à un ou plusieurs groupes
      if (this.single === false && this.multiple === true) {
        let data = new FormData();
        data.append("idCandidat", this.user.idCandidat);
        // Récupérons tout les numéros sélectionnés
        if (this.selectedGroup.length > 0) {
          for (let step = 0; step < this.selectedGroup.length; step++) {
            data.append("listeGroupe[" + step + "]", this.selectedGroup[step]);
          }
        }
        data.append("type", "groupe");
        data.append("sms", this.sms);

        let dataSend = [
          "idCandidat : " + this.user.idCandidat,
          this.selectedGroup,
          "type: groupe",
          "sms: " + this.sms
        ];

        this.axios
          .post(apiConfig.baseURL + "sms/send/groupe", data, {
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            let data = response.data;
            if (data.statusRequete == 100) {
              this.text = "Sms envoyé avec succès";
              this.snackbar = true;

              //Vidons les champs
              this.selectedGroup = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 200) {
              if (data.error !== undefined) {
                this.text = data.error;
              } else {
                this.text = "Le sms n'a pas pu être envoyé avec succès";
              }
              this.snackbar = true;

              //Vidons les champs
              this.selectedGroup = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }

            if (data.statusRequete == 300) {
              if (data.error !== undefined) {
                this.text = data.error;
              } else {
                this.text =
                  "Une erreur est survenue lors de l'envoi du message, veuillez vérifier vos paramètres FyleSms...";
              }

              this.snackbar = true;

              //Vidons les champs
              this.selectedGroup = [];
              this.sms = "";

              //Fermons le formulaire
              this.closeNewSmsForm();
            }
          })
          .catch(response => {
            let data = response.data;
            this.text =
              "Une erreur au niveau du serveur est survenu lors de l'envoi du message...";
            this.snackbar = true;
            //Vidons les champs
            this.selectedGroup = [];
            this.sms = "";
            //Fermons le formulaire
            this.closeNewSmsForm();
          });
      }
    },
    deleteSmsEnvoyer(item) {
      this.snackbar = false;
      this.loadingPage = true;

      this.axios
        .get(apiConfig.baseURL + "sms/delete/" + item.id, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          let data = response.data;

          if (data.statusRequete == 100) {
            // Retirons le groupe supprimé de la liste
            this.messageEnvoye = this.messageEnvoye.filter(e => {
              if (e.id !== item.id) {
                return e;
              }
            });

            this.active = 3;
            this.infoListe = [];
            this.getNamesListe(this.active);

            this.loadingPage = false;
            this.text = "Message supprimé avec succès";
            this.snackbar = true;
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
    },
    search(val) {
      // val && val !== this.select && this.querySelections(val);
      if (val !== this.select) {
        this.querySelections(val, this.active);
        this.clear = true;
      }
      if (val === "") {
        this.select = null;
        this.clear = false;
      }
    },
    select(val) {
      if (this.search === null && val === null) {
        if (this.active === 2) {
          this.resetItemWith(this.listMessage);
          this.clear = false;
        }
        if (this.active === 3) {
          this.resetItemWith(this.messageEnvoye);
          this.clear = false;
        }
        if (this.active === 4) {
          this.resetItemWith(this.contacts);
          this.clear = false;
        }
        if (this.active === 5) {
          this.resetItemWith(this.groupeListe);
          this.clear = false;
        }
      }
      if (this.search === "" && val === "") {
        if (this.active === 2) {
          this.resetItemWith(this.listMessage);
          this.clear = false;
        }
        if (this.active === 3) {
          this.resetItemWith(this.messageEnvoye);
          this.clear = false;
        }
        if (this.active === 4) {
          this.resetItemWith(this.contacts);
          this.clear = false;
        }
        if (this.active === 5) {
          this.resetItemWith(this.groupeListe);
          this.clear = false;
        }
      }
      if (val !== "" && val !== undefined && val !== null) {
        this.items = [];
        if (this.active === 2) {
          this.items = this.listMessage.filter(e => {
            if (e.emetteur === val) {
              return e;
            }
          });
          this.clear = true;
        }
        if (this.active === 3) {
          this.items = this.messageEnvoye.filter(e => {
            if (e.destinataire === val) {
              return e;
            }
          });
          this.clear = true;
        }
        if (this.active === 4) {
          this.items = this.contacts.filter(e => {
            if (e.name === val) {
              return e;
            }
          });
          this.clear = true;
        }
        if (this.active === 5) {
          this.items = this.groupeListe.filter(e => {
            if (e.name === val) {
              return e;
            }
          });
          this.clear = true;
        }
      }
    },
    groupeSelected(val) {
      // Retrouvons le groupe selectionné
      let groupe = this.items.filter(e => {
        if (e.name === val) return e;
      });
      // Affichons les contact appartenenant déjà au groupe
      this.existingContactGroupe = [];
      this.editLibelleGroupe = "";
      if (groupe.length !== 0) {
        // Récupérons la liste des contacts du groupe selectionné
        let contacts = groupe[0].contacts;
        if (contacts.length !== 0) {
          for (let item of contacts) {
            this.existingContactGroupe.push(item.name);
          }
        }

        // Renseignons le libéllé du groupe sélectionné
        this.editLibelleGroupe = groupe[0].name;
      }
      // Chargeons toute la liste des contacts également
      this.listeContactForGroupe = [];
      for (let item of this.contacts) {
        this.listeContactForGroupe.push(item.name);
      }
    }
  },
  computed: {
    checkedContact() {
      return this.selectedContact.length === this.destinataire.length;
    }
  },
  mounted() {
    this.active = 2;
    this.findSmsRecuData();
    this.findContactsCandidat();
    this.findSmsEnvoyes();
    this.findGroupesCandidat();
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
.container.grid-list-md .layout .flex {
  padding: 0px;
}
.active-sub-menu {
  background: #f5f5f5;
}
.loading {
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}
.responsive {
  width: 100%;
}
</style>
