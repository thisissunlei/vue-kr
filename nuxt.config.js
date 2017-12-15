var path = require('path')
module.exports = {
	plugins: [{
		src: '~plugins/iview',
		ssr: false
	}],
	css: ['iview/dist/styles/iview.css'],
	build: {
		vendor: ['axios'],
		extend(webpackConfig, { isDev, isClient, isServer }) {
			webpackConfig.resolve.alias['kr/axios'] = path.join(process.cwd(), 'plugins/http');
			webpackConfig.resolve.alias['kr/utils'] = path.join(process.cwd(), 'utils/index');
		}
	},
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
	],
	loading: {
		color: 'blue',
		height: '5px'
	},
	transition: 'test'
}