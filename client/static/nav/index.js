(function (global) {

    // var NavItems = getNavs();
    var menuCode = [];
    var navUtils = {
        activeData: [],
        isHome: false,
        closeRoutrs: [''],
        strDelNum: function (str) {


        },
        
        user:{},
        navs:[{
            iconUrl: "icon-card",
          
            name: "首页",
         
            showFlag: "YES",
            sideFoldFlag: "YES",
           
            topFoldFlag: "YES",
            url: "/"
        }],
        navNum: 7,
        bodyDom:'',
        contentDom:'',
        menuBtnBacks:[],
        closeRoutrs:[],
    
    }
    var menuId = 'j_menu_btn' + Math.round(Math.random()*10);
    var navId = 'j_nav_loading'+ Math.round(Math.random()*10);
    var moreId = 'j_more' + Math.round(Math.random()*10);
    var sidebarId = 'j_sidebar'+ Math.round(Math.random()*10);
    var accountBtnId =  'j_account_btn'+ Math.round(Math.random()*10);
    var accountBoxId =  'j_account_box'+ Math.round(Math.random()*10);
    var exitBtnId = 'j_exit_btn'+ Math.round(Math.random()*10);
    var maskId = 'j_detail_mask'+ Math.round(Math.random()*10);
    //获取url
    function getRouter() {
        var router = location.href.split('?')[0];
        return router;
    }
    //设置跳转路径
    function setHref(type, router) {
        var href = '';
        var alias = '/new/#';
        var hostname = location.hostname;
        var port = location.port || '';
        if (port) {
            port = ":" + port;
        }
        if (type && type == "vue") {
            alias = '';
        }
        if(type && type == "member"){
            alias = '/';
            hostname =  'memberadmintest.krspace.cn';
        }   
        href = location.protocol + "//" + hostname + port + alias + router;
        return href;
    }
    //获取侧边栏里的数据
    function getClickNav(arr, str) {
    
        for (var i = 0; i < arr.length; i++) {
            var every = arr[i];
            var href = "";
            var port = location.port || '';
            if (port) {
                port = ":" + port;
            }
            if (location.hash.indexOf("#/") != -1) {
                str = location.hash.split("#/")[1]
                href = every.url;
            } else {
                href = location.protocol + "//" + location.hostname + port + every.url;
            }
            if (href === str) {
                return every;
            } else {
                if (every.childList && every.childList.length) {
                    var data = getClickNav(every.childList, str)
                    if (data) {
                        return every;
                    }

                }

            }
        }
    }
    function moreClick(){

    }
    function navLoadingClick(){

    }
    function menuClick(event){
        var sidebarDom =  document.getElementById(sidebarId);
        var dom = event.target;
        var flag = false;
        var router = getRouter();
        
        if(dom.className=='menu-btn menu-btn-close'){
            for(let i=0;i<navUtils.closeRoutrs.length;i++){
                if(router == navUtils.closeRoutrs[i]){
                    sidebarDom.style.display='none';
                    return ;
                }
            }
            sidebarDom.style.display='block';
            dom.setAttribute('class', 'menu-btn menu-btn-open');
            navUtils.contentDom.style.paddingLeft = '180px';
            flag = true;
        }else{
            sidebarDom.style.display='none';
            dom.setAttribute('class', 'menu-btn menu-btn-close')
            navUtils.contentDom.style.paddingLeft = '0px';
            flag = false;
        }
        if (!navUtils.menuBtnBacks || !navUtils.menuBtnBacks.length){
            return;
        }
        for (var i = 0; i < navUtils.menuBtnBacks.length; i++) {
            var everyCallback = navUtils.menuBtnBacks[i];
            if (everyCallback){
                everyCallback(flag);
            }
        }
    }
    function listenSidebarOpen(){
        if (!callback){
            return;
        }
       
        navUtils.menuBtnBacks.push(callback);
    }
    function accountBtnClick(){
        var accountBoxDom = document.getElementById(accountBoxId);
        if(accountBoxDom.style.display=='none'){
            accountBoxDom.style.display = 'block';
        }else{
            accountBoxDom.style.display = 'none';
        }
    }
    function maskClick(){
        var accountBoxDom = document.getElementById(accountBoxId);
        if(accountBoxDom.style.display=='none'){
            accountBoxDom.style.display = 'block';
        }else{
            accountBoxDom.style.display = 'none';
        }
    }
    //头部和侧栏渲染
    function renderHanderAndSidebar(){
        var showSidebar = 'block';
        var menuName = 'menu-btn menu-btn-open';
        var router = getRouter();
        for(let i=0;i<navUtils.closeRoutrs.length;i++){
            if(router == navUtils.closeRoutrs[i]){
                navUtils.contentDom.style.paddingLeft = "0px";
                showSidebar = 'none';
                menuName = 'menu-btn menu-btn-close';
               break;
            }
        }
        
        var html = '<div class="app-header">' +

            '<div class="c-header"> ' +

            '<div class="brand"></div> ' +
            '<div class="'+menuName+'" id="'+menuId+'"></div>' +
            '<div class="u-header-logo"></div>' +

            '<div class="header-nav" id="j_header">'+renderHander(navUtils.navs)+'</div>' +

            '<div class = "j_header_other">' +


            '<div id = "'+accountBtnId+'" class="j_account_btn"></div>' +
            '<div id="'+accountBoxId+'" class="j_account_box" style = "display:none">' +
            '<div id = "j_account_detail">' +

            '<a href = "/new/#/permission/personalCenter" class = "j_account_list username" id="j_username">'+navUtils.user.nickname+'</a>' +

            '<div id = "'+exitBtnId+'" class = "j_account_list">退出</div>' +

            '</div>' +
            '<div class = "j_account_detail_mask" id="'+maskId+'"></div>' +
            '</div>' +
            '</div>' +
            '</div> ' +renderSidebar(navUtils.activeData,showSidebar)+
            '<div id="'+navId+'" class="nav-loading" style="display:none;">' +
            '</div>' +
            '</div>' +

        '</div>';
        // document.body.innerHTML = html;
        if(!navUtils.bodyDom){
            return ;
        }
        navUtils.bodyDom.innerHTML = html;
        var moreDom = document.getElementById(moreId);
        var navDom = document.getElementById(navId)
        var sidebarDom =  document.getElementById(sidebarId);
        if(moreDom){
            moreDom.onclick = moreClick
        }
        if(navDom){
            navDom.onclick = navLoadingClick
        }
        
        document.getElementById(navId).onclick = navLoadingClick;
        document.getElementById(menuId).onclick = menuClick;
        document.getElementById(accountBtnId).onclick = accountBtnClick;
        document.getElementById(maskId).onclick = maskClick;
        document.getElementById(accountBoxId).onclick = function(){

        }
        
        
        document.getElementById(exitBtnId).onclick = function(){
            var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
                xhr.open('GET', "/api/krspace-sso-web/sso/sysOwn/logout", true);
                xhr.responseType = 'json';
                xhr.withCredentials = true;
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
                        window.location.href = "/new/login.html";
                        if (j_account_box.style.display == 'block') {
                            j_account_box.style.display = 'none';
                        }
                    }
                };
                xhr.send();
        }
        sidebarDom.onclick = menuClick;
        if(sidebarDom.style.display=='none'){
            navUtils.contentDom.style.paddingLeft = '0px'
        }else{
            navUtils.contentDom.style.paddingLeft = '180px'

        }
    }
    //渲染头部
    function renderHander(navs){
        // console.log(navs,"pppppp")
        var more = '<ul>';
        var html = '<ul class="more-nav-ul">';
        if (!navs.length) {
            return '';
        }
        var router = getRouter();
       
        

        navs.map(function (item, index) {
            var href = "";
            // var sideFoldFlag = false;


            if (item.childList && item.childList.length) {
                href = item.childList[0].childList[0].url;
                // sideFoldFlag = item.childList[0].childList[0].sideFoldFlag == 'YES'?true:false;
                item.type = item.childList[0].childList[0].projectType || ''
            }
            href = setHref(item.type, href)
            //默认第一个（毅豪说的）
            if (index > navUtils.navNum - 1) {
                more += '<li  class=' + (router == href ? 'active' : 'default') + '><a href="' + href + '">' + item.name + '</a></li>';
                return;
            }
            html += '<li class=' + (router == href ? 'active' : 'default') + '><a href="' + href + '">' + item.name + '</a></li>';
            // html += '<li class=' + (item.active ? 'active' : 'default') + '><span>' + item.primaryText + '</span></li>';
        });
        if (navs.length && navs.length > navUtils.navNum) {
            more += '</ul>';
            html +=
                '<li id="'+moreId+'" class="more-name-li">' +
                    '<span>更多</span>' +
                    '<div class="more-nav" id="more-next"><p></p>' + more + '</div>'
                '</li>' +
                '</ul>';
        } else {
            html += '</ul>';
        }
        return html;
    }
    //渲染侧栏
    function renderSidebar(sidebarData,showSidebar){
        var sidebarNavs = Object.assign(sidebarData);
       
        var html = '';

        var router = getRouter();
        if (!sidebarNavs) {
            return '<div id="'+sidebarId+'" class="sidebar" style="display:'+showSidebar+';"> '+html+' </div> ' ;
        }
        if (!(sidebarNavs && sidebarNavs.hasOwnProperty('childList') && sidebarNavs.childList.length)) {
            return '<div id="'+sidebarId+'" class="sidebar" style="display:'+showSidebar+';"> '+html+' </div> ' ;
        }
        sidebarNavs.childList.map(function (item) {
            let iconName = item.iconUrl ? item.iconUrl : '';
            if (item.hasOwnProperty('childList') && item.childList.length) {
                html += '<div class="item"><div class="item-title"><span class = "icon-style ' + iconName + '"></span><span style="padding-left:40px">' + item.name + '</span></div>';

                html += '<ul>';
                item.childList.map(function (child) {
                    var href = ""
                    href = setHref(child.projectType, child.url);
                    if(href == router){
                        if(child.sideFoldFlag=="YES"){
                            showSidebar = 'block';
                        }else{
                            showSidebar = 'none';
                        }
                    }

                    html += '<li class=' + (href == router ? 'active' : 'default') + '><a href="' + href + '">' + child.name + '</a></li>';
                })
                html += '</ul>';
            }

            html += '</div>';

        });

        return '<div id="'+sidebarId+'" class="sidebar" style="display:'+showSidebar+';"> '+html+' </div> ' ;
    }

    //路由发生变化
    function routerRefresh() {
        var navs = [].concat(navUtils.navs);
        var router = getRouter();
        var activeData = getClickNav([].concat(navs), router);
        if (activeData) {
            navUtils.activeData = Object.assign({}, activeData);
        }
        renderHanderAndSidebar();
       
    };

    function pushCloseRoutrs(flag){
        if(flag == 'false'){
            navUtils.closeRoutrs.push(getRouter());
        }
        // renderHanderAndSidebar();
       
    }
    //http封装
    function http(type, url, callback){
       
        var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
        xhr.open(type, url, true);
        xhr.responseType = 'json';
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
                if (xhr.response.code < 0) {
                    window.location = '/new/login.html';
                    return;
                }
                callback(xhr.response)
            }
        };
        xhr.send();
    }
  
    
    global.vueNavRender = function(dom,contentDom){
        // console.log(dom)
        navUtils.bodyDom = dom;
        navUtils.contentDom = contentDom;
        renderHanderAndSidebar();
        // console.log("pppppp------",dom)
        http('GET','/api/krspace-sso-web/sso/sysOwn/getUserMenu',function(response){
            var navs = [].concat(response.data);
          
            http('GET', "/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate=1", function (response) {
                
                var user = response.data.userInfo;
               
                navUtils.navs = [].concat(navUtils.navs,navs);
                navUtils.user = Object.assign(user);
                routerRefresh();
            })
           
        })
    }
    global.GLOBALSIDESWITCH = pushCloseRoutrs;
    // // global.GLOBALHEADERSET = Router.setDefaultHeader;
    // // global.listenSidebarOpen = Router.listenSidebarOpen;
    // global.LISTENSIDEBAROPEN = navUtils.listenSidebarOpen;

    // global.GLOBALHEADERSET = Router.setDefaultHeader;

    // Router.init();
    
})(window);
