const envs = {
    'development':{
        'op':'http://optest02.krspace.cn',
        'local':'http://local.krspace.cn',
        'test':'http://optest01.krspace.cn',
        'rap':'http://rap.krspace.cn'
    },
    'test':{
        'op':'http://optest.krspace.cn',
        'i':'http://itest.krspace.cn',
        'app':'http://apptest.krspace.cn',
    },
    'test01':{
        'op':'http://optest01.krspace.cn',
        'i':'http://i.krspace.cn',
        'app':'http://app.krspace.cn',
    },
    'test02':{
        'op':'http://optest02.krspace.cn',
        'i':'http://i.krspace.cn',
        'app':'http://app.krspace.cn',
    },
    'production':{
        'op':'http://op.krspace.cn',
        'i':'https://i.krspace.cn',
        'app':'https://app.krspace.cn',
    },
}

module.exports = envs;

