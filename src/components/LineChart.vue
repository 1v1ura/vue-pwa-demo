<script>
/* eslint-disable no-unused-vars */

import { Line, Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.addPluginDecorator();
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    addPluginDecorator() {
      if (this.plugins.length <= 0) {
        return;
      }

      this.plugins.forEach(plugin => {
        this.addPlugin({
          id: plugin.name.split(" ")[1],
          beforeDraw: plugin
        });
      });
    }
  }
};
</script>
