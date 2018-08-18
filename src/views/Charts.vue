<template>
  <!-- <div> -->
    <div style="padding:10px">
    <section>
      <span style="font-size: 17px;text-transform: uppercase;"> {{legend}} </span>
    </section>
      <canvas id="chart"></canvas>
    </div>
  <!-- </div> -->
</template>


<script>
export default {
  name: "Charts",
  props: ["data", "type", "options", "legend"],
  mounted() {
    this.createChart(this.data, this.type, this.options);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById("chart");
      const myChart = new Chart(ctx, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    }
  }
};
</script>