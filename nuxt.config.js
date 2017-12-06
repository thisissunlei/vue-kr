var path = require('path')
console.log(path.join(process.cwd(), 'plugins/http'),"ooooooooo---ooooooo")
module.exports = {
	plugins: [{
		src: '~plugins/iview',
		ssr: false
	}],	
	css: ['iview/dist/styles/iview.css'],
	build: {
		vendor: ['axios'],
		extend(webpackConfig, { isDev, isClient, isServer }) {
			console.log(webpackConfig.resolve.alias,"kkkk")
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