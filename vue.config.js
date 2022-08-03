const { defineConfig } = require("@vue/cli-service")

const miniprogram = {
  css: {
    extract: {
      filename: "[name].wxss",
      chunkFilename: "[name].wxss",
    },
  },
  pages: {
    app: "./src/main.ts",
  },
  chainWebpack: (config) => {
    config.devtool("source-map").target("web")
    config.output
      .library("createApp")
      .libraryExport("default")
      .libraryTarget("window")
      .filename("[name].js")
      .end()
    config.optimization.runtimeChunk(false).splitChunks({
      chunks: "all",
      minSize: 1000,
      maxSize: 5000,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: "~",
      // name: true
    })
    config
      .plugin("mp")
      .use(require("mp-webpack-plugin"), [require("./mp.config")])
  },
}

module.exports = defineConfig({
  ...miniprogram,
  transpileDependencies: true,
})
