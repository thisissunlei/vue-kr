var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  plugins: [
    {src: '~plugins/iview',ssr: true},
  ],
  
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css','iview/dist/styles/iview.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000000' },
  build: {
    vendor: ['iview'],
    publicPath: '/v/cdn/',
    vendor: ['axios'],
    extend(webpackConfig, { isDev, isClient, isServer }) {

      if(!webpackConfig.resolve.plugins){
         webpackConfig.resolve.plugins = [];
      }
      if(isClient){
           webpackConfig.resolve.plugins.push(new ExtractTextPlugin({ filename: 'styles/app.css', disable: false, allChunks: true }));
      } 
      
			webpackConfig.resolve.alias['kr/axios'] = path.join(process.cwd(), 'plugins/http');
		}
  },
}
