const envs = {
    'development':{
        'plugins':'http://optest03.krspace.cn',
    },
    'test01':{
        'plugins':'http://optest01.krspace.cn',
    },
    'test02':{
        'plugins':'http://optest02.krspace.cn',
    },
    'test03':{
        'plugins':'http://optest03.krspace.cn',
    },
    'test04':{
        'plugins':'http://optest04.krspace.cn',
    },
    'dev01':{
        'plugins':'http://dev01.krspace.cn',
    },
    'dev02':{
        'plugins':'http://dev02.krspace.cn',
    },
    'production':{
        'plugins':'',
    },
}
const jsFiles = [
    {src: 'https://web.krspace.cn/kr-op/nav/1.0.0/nav.js'},
    {src: 'https://web.krspace.cn/kr-op/echarts/4.1.0/echarts.min.js'},
    {src: 'https://web.krspace.cn/kr-op/go/1.8.14/go.js'},
    {src: 'https://web.krspace.cn/plugins/watermark.js'},
    {src: 'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.config.js'},
    {src: 'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.all.js'},
    {src: 'https://web.krspace.cn/kr-op/umeditor/1.0.0/lang/zh-cn/zh-cn.js'},
]
const cssFiles = [
    {rel:'stylesheet',href:'https://web.krspace.cn/kr-op/iview/2.8.0/styles/iview.css'},
    {rel:'stylesheet',href:'https://web.krspace.cn/kr-op/nav/1.0.0/nav.css'},
    { rel: 'stylesheet', href: 'https://web.krspace.cn/kr-op/public/css/main.css' },
    { rel: 'stylesheet', href: 'https://web.krspace.cn/kr-op/public/images/favicon.ico' },
    { rel: 'stylesheet', href: 'https://web.krspace.cn/kr-op/icomoon/1.0.0/style.css'},
    
]

module.exports = {
    jsFiles,
    cssFiles
};

