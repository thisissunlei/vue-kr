### 环境
1. 项目依赖node环境,需要在开发环境安装node ，相关安装因系统不同而定，请自行google 安装node

### 项目启动

1. npm i 
2. npm run dev //启动环境在nginx配置

###项目目录
kr-vue
	.nuxt 项目打包文件
	client 开发文件夹
		assets 项目静态内容（api,公共样式，图片）
		components 项目公用组件
		configs	配置文件
		filters 项目过滤器文件夹
		layouts 静态公用页面
		middleware 
		pages 开发内容详情区
		plugins 公用方法（通过import引入使用）
		static 静态文件（icon，菜单栏等）