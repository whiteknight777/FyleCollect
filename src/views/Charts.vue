<template>
  <!-- <div> -->
    <div style="padding:10px; background: white">
    <section>
      <span style="font-size: 17px;text-transform: uppercase;"> {{legend}} </span>
    </section>
      <canvas :id="'chart'+id" style="padding: 25px !important;" v-if="type != 'pie'"></canvas>
      <canvas :id="'chart'+id" style="width: 100%;" v-if="type == 'pie' || type == 'doughnut'"></canvas>
    </div>
  <!-- </div> -->
</template>


<script>
export default {
  name: "Charts",
  props: ["data", "id", "type", "options", "legend"],
  mounted() {
    this.createChart(this.data, this.type, this.options);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart" + this.id);
      const myChart = new Chart(ctx, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    }
  }
};
</script>