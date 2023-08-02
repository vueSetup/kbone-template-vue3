const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

const miniprogramPlugin = require('mp-webpack-plugin')
const miniprogramConfig = require('./configs/mp.config')

const pxtoviewport = require('postcss-px-to-viewport')

const isMiniprogram = JSON.stringify(process.env.VUE_APP_isMiniprogram)
const isDevelopment = process.env.NODE_ENV === 'development'

console.warn('isDevelopment', isDevelopment)

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist/mp/common',
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    ]
  },
  // [Vue CLI 3] 配置解析之 css.extract
  // https://segmentfault.com/a/1190000016390112
  css: {
    extract: isMiniprogram
      ? {
          filename: `css/[name].wxss`,
          chunkFilename: `css/[name].wxss`
        }
      : true,
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            pxtoviewport({
              viewportWidth: 375,
              mediaQuery: true,
              exclude: [/vant/]
            })
          ]
        }
      }
    }
  },
  // https://cli.vuejs.org/guide/webpack.html#chaining-advanced
  // https://github.com/neutrinojs/webpack-chain
  chainWebpack: (config) => {
    if (!isMiniprogram) return
    config.target('web').devtool('cheap-module-source-map').watch(isDevelopment)
    config.output
      .library('createApp')
      .libraryExport('default')
      .libraryTarget('window')
      .filename('[name].js')
    // config.optimization.runtimeChunk(false).splitChunks({
    //   chunks: 'all',
    //   minSize: 1000,
    //   maxSize: 5000,
    //   minChunks: 1,
    //   maxAsyncRequests: 100,
    //   maxInitialRequests: 100,
    //   automaticNameDelimiter: '~',
    //   // name: true,
    //   cacheGroups: {
    //     vendors: {
    //       name: 'chunk-vendors',
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     default: {
    //       name: 'chunk-default',
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
    // })
    config.plugin('mp').use(miniprogramPlugin, [miniprogramConfig])
  }
})
