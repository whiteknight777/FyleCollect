<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style scoped>
.jumbotron__wrapper {
  height: 100%;
  overflow: hidden;
  position: relative;
  -webkit-transition: inherit;
  transition: inherit;
  width: 100%;
}
.hr-nav {
  margin: 5px 12px;
  border: 0.5px solid #e64a2b;
}
.user-div {
  border: 14px solid #e64a2b;
  padding: 8px;
  display: inline-block;
  border-radius: 90px;
  margin-top: 28px;
  margin-left: 60px;
}
.p-user {
  margin-top: 30px;
  text-align: center;
  margin-left: 5px;
}

::-webkit-scrollbar {
  /* Scrollbars */
  width: 7px;
  background: #b7b7b7;
  -webkit-box-shadow: inset 1px 1px 0 0 rgb(137, 131, 117),
    inset -1px -1px 0 0 rgb(224, 220, 210);
}
::-webkit-scrollbar-thumb:hover {
  /* Barre */
  -webkit-box-shadow: inset 0 0 0 1px rgb(90, 90, 90),
    inset 0 0 0 6px rgb(110, 110, 110);
  border-radius: 3px;
}
</style>
