const envs = {
    'development':{
        'plugins':'http://optest04.krspace.cn',
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
const pluginsDomain  = envs[process.env.NODE_ENV].plugins+'/plugins';
const jsFiles = [
//    {src: pluginsDomain+'/nav/1.0.0/nav.js'},
//    {src: pluginsDomain+'/echarts/4.1.0/echarts.min.js'},
]
const cssFiles = [
    pluginsDomain+'/public/css/main.css',
   
]

module.exports = {
    jsFiles,
    cssFiles
};

