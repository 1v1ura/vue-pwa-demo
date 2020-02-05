// vue.config.js
module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 3000
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "/index.html"
    }
  }
};
