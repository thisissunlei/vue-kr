
module.exports = {

	plugins: [{
		src: '~plugins/iview',
		ssr: false
	}],
	css: ['iview/dist/styles/iview.css'],
	build: {
		vendor: ['axios'],
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