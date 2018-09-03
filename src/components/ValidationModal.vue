<template>
     <v-layout row justify-center>
    <v-btn
      color="primary"
      dark
      @click="dialog = true"
    >
      Open Dialog
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline" style="text-align:center">Voulez-vous vraiment vous déconnecter ?</v-card-title>

        <v-card-text style="text-align:center">
          En acceptant de vous déconnecter, vous fermer votre session.
        </v-card-text>

        <v-card-actions style="padding-bottom:20px">
          <v-spacer></v-spacer>
          <v-btn
            class="green darken-1"
            flat="flat"
            @click="$emit('logout')"
            dark
          >
            Confirmer
          </v-btn>

          <v-btn
            class="red darken-1"
            flat="flat"
            @click="$emit('abortLogout')"
            dark
          >
            Annuler 
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "ValidationModal",
  data() {
    return {
      dialog: true
    };
  }
};
</script>