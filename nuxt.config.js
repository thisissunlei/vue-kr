var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  //mode:'spa',
  srcDir: 'client/',
  cache:{ max: 20, maxAge: 600000 },
  transition: {
    name: 'page',
    mode: 'out-in',
  },
  router: {
    base: '/'
  },
  head: {
    title: '氪空间管理后台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://www.krspace.cn/vendors/images/logofav.png' }
    ]
  },

  plugins: [
    { src: '~plugins/iview', ssr: true },
    { src: '~plugins/vue-pdf', ssr: false }
  ],
  css: ['~assets/css/main.css'],
  loading: { color: '#000000' },
  build: {
    vendor: ['iview', 'vue-pdf'],
    publicPath: '/',
    extend(webpackConfig, { isDev, isClient, isServer }) {
      //webpackConfig.resolve.alias['kr/axios'] = path.join(process.cwd(), 'plugins/http');
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'styles.css'
      })
    ]
  }
}