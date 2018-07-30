// var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pluginsDomain  = require('./config/plugins.env')[process.env.NODE_ENV].plugins;
console.log( process.env.NODE_ENV,"ppppppp")
module.exports = {
  srcDir: 'client/',
  cache:{ max: 20, maxAge: 700000 },
  transition: {
    name: 'page',
    mode: 'out-in',
  },
  router: {
    base: '/'
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  head: {
    title: '氪空间管理后台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: pluginsDomain + '/plugins/public/images/favicon.ico' }
    ]
  },

  plugins: [
    { src: '~plugins/iview', ssr: true },
  ],
  css: ['~assets/css/main.css'],
  loading: { color: '#000000' },
  build: {
    vendor: ['iview'],
    publicPath: '/',
    extend(webpackConfig, { isDev, isClient, isServer }) {
      webpackConfig.performance.maxAssetSize = 700000;
      //webpackConfig.resolve.alias['kr/axios'] = path.join(process.cwd(), 'plugins/http');
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'styles.css'
      })
    ]
  }
}