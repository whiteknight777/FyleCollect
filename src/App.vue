<template>
  <v-app>

  <!-- LEFT SIDEBAR  -->
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      
      <v-list class="">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
  
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>

      
      <v-list>
        <v-list-tile value="true">
          <v-list-tile-action>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>drag_indicator</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ajouter un élément</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  
      <v-list class="pa-0" style="position: absolute;bottom: 0;">
        <v-list-tile avatar>
         <v-list-tile-action>
            <v-icon> settings_power </v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>Déconnexion</v-list-tile-title>
          </v-list-tile-content>
  
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
  <!-- END LEFT SIDEBAR  -->

  <!-- TOPBAR  -->
    <v-toolbar app :clipped-left="clipped">
  
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
  
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  
  
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>sort</v-icon>
      </v-btn>
    </v-toolbar>
  <!-- END TOPBAR -->

  <!-- CONTENT  -->
    <v-content>
      <router-view/>
    </v-content>
  <!-- END CONTENT  -->

  <!-- LEFT MODAL  -->
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  <!-- END LEFT MODAL  -->
  
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      clipped: false,
      drawer: true,
      miniVariant: true,
      right: true,
      rightDrawer: false
    };
  }
};
</script>
