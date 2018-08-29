<template>
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
        Close
      </v-btn>
    </v-snackbar>
</template>
<script>
export default {
  name: "Snackbar",
  props: {
    text: String,
    y: String,
    x: String
  },
  data() {
    return {
      snackbar: true,
      mode: "",
      timeout: 6000
    };
  }
};
</script>