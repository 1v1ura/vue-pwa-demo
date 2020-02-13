<template>
  <div class="chart">
    <h1>Chart</h1>

    <div class="chartContainer">
      <LineChart
        :chart-data="datacollection"
        :options="options"
        :plugins="plugins"
      />
    </div>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import LineChart from "@/components/LineChart";
import "chartjs-plugin-dragdata";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {
        labels: ["", "1年後", "2年後", "3年後", "4年後", "5年後", "6年後"],
        datasets: [
          {
            label: "Base Data",
            fill: false,
            backgroundColor: "rgba(4, 29, 255, 0.1)",
            borderColor: "rgba(4, 29, 255, 0.1)",
            pointRadius: 5,
            pointHoverRadius: 5,
            dragData: false,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Data Two",
            fill: false,
            backgroundColor: "rgba(4, 29, 255, 1)",
            borderColor: "rgba(4, 29, 255, 1)",
            pointRadius: 5,
            pointHoverRadius: 5,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 100,
                stepSize: 20
              }
            }
          ]
        },
        dragData: true,
        pointHitRadius: 25,
        dragDataRound: 0,
        dragOptions: {
          magnet: {
            to: value => Math.floor(value / 5) * 5
          }
        },
        // dragOptions.magnet.to の関数が実行されるには、onDragEnd に関数の設定が必須
        onDragEnd: () => {
          console.log("onDragEnd", this.datacollection.datasets[1].data);
        }
      },
      plugins: [this.drawBackground]
    };
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["", "1年後", "2年後", "3年後", "4年後", "5年後", "6年後"],
        datasets: [
          {
            label: "Base Data",
            fill: false,
            backgroundColor: "rgba(4, 29, 255, 0.1)",
            borderColor: "rgba(4, 29, 255, 0.1)",
            pointRadius: 5,
            pointHoverRadius: 5,
            dragData: false,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Data Two",
            fill: false,
            backgroundColor: "rgba(4, 29, 255, 1)",
            borderColor: "rgba(4, 29, 255, 1)",
            pointRadius: 5,
            pointHoverRadius: 5,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * 100);
    },
    drawBackground(target) {
      const xscale = target.scales["x-axis-0"];
      const yscale = target.scales["y-axis-0"];
      const left = xscale.left;

      // 異常エリア
      const abnormal_top = yscale.getPixelForValue(100);
      const abnormal_height = yscale.getPixelForValue(80) - abnormal_top;
      target.ctx.fillStyle = "rgba(254, 150, 81, 0.2)";
      target.ctx.fillRect(left, abnormal_top, xscale.width, abnormal_height);

      // 要注意エリア
      const warning_top = yscale.getPixelForValue(80);
      const warning_height = yscale.getPixelForValue(60) - warning_top;
      target.ctx.fillStyle = "rgba(250, 212, 95, 0.2)";
      target.ctx.fillRect(left, warning_top, xscale.width, warning_height);
    }
  }
};
</script>

<style lang="scss" scoped>
.chartContainer {
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>
