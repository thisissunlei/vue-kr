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
        'plugins':'http://op.krspace.cn',
    },
}
const pluginsDomain  = envs[process.env.NODE_ENV].plugins+'/plugins';
const jsFiles = [
    {src: pluginsDomain+'/nav/1.0.0/nav.js'},
    {src: 'https://web.krspace.cn/kr-op/echarts/4.1.0/echarts.min.js'},
    {src: 'https://web.krspace.cn/kr-op/go/1.8.14/go.js'},
]
const cssFiles = [
    {rel:'stylesheet',href:pluginsDomain+'/nav/1.0.0/nav.css'},
    { rel: 'stylesheet', href: pluginsDomain+'/public/css/main.css' },
    { rel: 'icon', type: 'image/x-icon', href: pluginsDomain+ '/public/images/favicon.ico' },
    
]

module.exports = {
    jsFiles,
    cssFiles
};

