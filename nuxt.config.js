var path = require('path')
module.exports = {
	plugins: [
		{src: '~plugins/iview',ssr: false},
	],
	css: ['iview/dist/styles/iview.css'],
	build: {
		vendor: ['axios'],
		extend(webpackConfig, { isDev, isClient, isServer }) {
			// webpackConfig.resolve.alias['axios'] = path.resolve(__dirname, 'plugins/http');
			webpackConfig.resolve.alias['kr/axios'] = path.join(process.cwd(), 'plugins/http');
			// path.join(process.cwd(), '/src/Page/App/index.js')
		}
	},
	proxy: [
		['/api', {
			target: 'http://optest.krspace.cn'
		}]
	],
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],
}