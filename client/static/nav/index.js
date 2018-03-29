(function (global) {

    var NavItems = getNavs();
    var menuCode = [];
    var navUtils = {
        activeData: [],
        isHome: false,
        closeRoutrs: [''],
        strDelNum: function (str) {

        },
        navNum: 8
    }
    function getRouter() {
        var router = location.href.split('?')[0];
        return router;
    }
    function setHref(type, router) {
        var href = '';
        var alias = '/new/#/';
        var port = location.port || '';
        if (port) {
            port = ":" + port;
        }
        if (type && type == "vue") {
            alias = '/';
        }
        href = location.protocol + "//" + location.hostname + port + alias + router;
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
                href = every.router;
            } else {
                href = location.protocol + "//" + location.hostname + port + "/" + every.router;
            }
            if (href === str) {
                return every;
            } else {
                if (every.menuItems && every.menuItems.length) {
                    var data = getClickNav(every.menuItems, str)
                    if (data) {
                        return every;
                    }

                }

            }
        }
    }

    //路由
    function GlobalRouter() {
        this.routes = {};
        this.currentUrl = '';
    }
    //将所有侧边栏需要关闭的数组存入侧边栏
    GlobalRouter.prototype.pushCloseRoutrs = function () {
        var router = getRouter();
        if (navUtils.closeRoutrs.indexOf(router) == -1) {
            navUtils.closeRoutrs.push(router)
        }
        globalNav.allSwitch()
    }
    //路由发生变化
    GlobalRouter.prototype.refresh = function () {
        var router = getRouter();
        var activeData = getClickNav([].concat(NavItems), router);
        if (activeData) {
            navUtils.activeData = Object.assign({}, activeData);
        }
        var j_sidebar = document.getElementById('j_sidebar');
        var j_header = document.getElementById('j_header');
        globalNav.allSwitch();
        j_sidebar.innerHTML = globalNav.getCreateSidebarHtmlStr();
        j_header.innerHTML = globalNav.getCreateHeaderHtmlStr();
    };

    GlobalRouter.prototype.init = function () {
        this.refresh();
    }
    //导航渲染
    var GlobalNav = function () {
        this.state = {
            navs: [],
            user: {
                nickname: ''
            },
            salidNav: [],
        };
        this.isInit = false;
        this.html = '<div class="app-header">' +

            '<div class="c-header"> ' +

            '<div class="brand"></div> ' +
            '<div class="menu-btn menu-btn-open" id="j_menu_btn"></div>' +
            '<div class="u-header-logo"></div>' +

            '<div class="header-nav" id="j_header">${header}</div>' +

            '<div class = "j_header_other">' +

            // '<div id = "j_msg_btn"></div>' +

            '<div id = "j_account_btn"></div>' +
            '<div id="j_account_box" style = "display:none">' +
            '<div id = "j_account_detail">' +

            '<a href = "/new/#/permission/personalCenter" class = "j_account_list username" id="j_username"></a>' +

            '<div id = "j_account_esc" class = "j_account_list">退出</div>' +

            '</div>' +
            '<div id = "j_account_detail_mask"></div>' +
            '</div>' +
            '</div>' +
            '</div> ' +

            '<div id="j_sidebar" class="sidebar" style = "display:none;"> ${sidebar} </div> ' +
            '<div id="j_nav-loading" class="nav-loading" style="display:none;">' +

            // '<div class="item-loader-container">'+

            //     '<div class="la-2x" >'+
            //         '<div></div>'+
            //         '<div></div>'+

            //     '</div >'+
            //     '<span>加载中...<span>'+
            // '</div >'+
            '</div>' +
            '</div>' +

            '</div>';

        this.getNavData();
        this.render();
    };


    //侧边栏
    GlobalNav.prototype.getCreateSidebarHtmlStr = function () {
        var sidebarNavs = Object.assign({}, navUtils.activeData);
        var html = '';
        var router = getRouter();
        if (!sidebarNavs) {
            return html;
        }
        if (!(sidebarNavs && sidebarNavs.hasOwnProperty('menuItems') && sidebarNavs.menuItems.length)) {
            return html;
        }
        sidebarNavs.menuItems.map(function (item) {
            let iconName = item.iconName ? item.iconName : '';
            html += '<div class="item"><div class="item-title"><span class = "icon-style ' + iconName + '"></span>' + item.primaryText + '</div>';
            if (item.hasOwnProperty('menuItems') && item.menuItems.length) {
                html += '<ul>';
                item.menuItems.map(function (child) {
                    var href = ""
                    href = setHref(child.type, child.router)
                    html += '<li class=' + (href == router ? 'active' : 'default') + '><a href="' + href + '">' + child.primaryText + '</a></li>';
                })
                html += '</ul>';
            }

            html += '</div>';

        });

        return html;

    }

    //用户名
    GlobalNav.prototype.getUserHtmlStr = function () {
        return this.state.user.nickname;
    }
    //生成头部导航
    GlobalNav.prototype.getCreateHeaderHtmlStr = function () {
        var more = '<ul>';
        var html = '<ul class="more-nav-ul">';
        var { navs } = this.state;
        if (!navs.length) {
            return '';
        }
        var router = ''
        if (navUtils.activeData) {
            router = navUtils.activeData.router;
        }

        navs.map(function (item, index) {
            var href = "";


            if (item.menuItems && item.menuItems.length) {
                href = item.menuItems[0].menuItems[0].router;
            }
            href = setHref(item.type, href)
            if (index > navUtils.navNum - 1) {
                more += '<li class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
                return;
            }
            html += '<li class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
            // html += '<li class=' + (item.active ? 'active' : 'default') + '><span>' + item.primaryText + '</span></li>';
        });
        if (navs.length && navs.length > navUtils.navNum) {
            more += '</ul>';
            html +=
                '<li id="more-id" class="more-name-li">' +
                '<span>更多</span>' +
                '<div class="more-nav" id="more-next"><p></p>' + more + '</div>'
            '</li>' +
                '</ul>';
        } else {
            html += '</ul>';
        }
        return html;
    }



    GlobalNav.prototype.allSwitch = function (isOpen) {

        var j_sidebar = document.getElementById('j_sidebar');
        var j_header = document.getElementById('j_header');
        var j_menu_btn = document.getElementById('j_menu_btn');
        var router = getRouter();
        var docBody = document.body;
        if (navUtils.closeRoutrs.indexOf(router) != -1) {
            j_sidebar.style.display = 'none';
            docBody.style.paddingLeft = '0px';
            j_menu_btn.setAttribute('class', 'menu-btn menu-btn-close')
            return;
        }
        if (j_sidebar.style.display === 'block') {
            j_sidebar.style.display = 'none';
            docBody.style.paddingLeft = '0px';
            j_menu_btn.setAttribute('class', 'menu-btn menu-btn-close')
            return;
        }
        if (j_sidebar.style.display === 'none') {
            j_menu_btn.setAttribute('class', 'menu-btn menu-btn-open')
            j_sidebar.style.display = 'block';
            docBody.style.paddingLeft = '180px';
        }

    }
    GlobalNav.prototype.registerEvent = function () {
        var that = this;
        window.addEventListener('load', function () {
            var j_sidebar = document.getElementById('j_sidebar');
            var j_menu_btn = document.getElementById('j_menu_btn');
            var docBody = document.body;
            var j_account_btn = document.getElementById('j_account_btn');
            var j_account_box = document.getElementById('j_account_box');
            var j_account_list = document.querySelectorAll('.j_account_list');
            var j_account_detail_mask = document.getElementById('j_account_detail_mask');
            var j_more_id = document.getElementById('more-id')
            j_menu_btn.addEventListener('click', function () {
                if (!navUtils.isHome) {
                    globalNav.allSwitch()
                }
            });
            j_account_btn.addEventListener('click', function () {
                if (j_account_box.style.display == 'none') {
                    j_account_box.style.display = 'block';
                }
            })

            j_account_list[0].addEventListener('click', function () {

                if (j_account_box.style.display == 'block') {
                    j_account_box.style.display = 'none';
                }
            })
            j_account_list[1].addEventListener('click', function () {
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
            })
            j_account_detail_mask.addEventListener('click', function () {
                if (j_account_box.style.display == 'block') {
                    j_account_box.style.display = 'none';
                }
            })

            /*nav更多*/
            if (j_more_id) {
                j_more_id.addEventListener('mouseover', function () {
                    var next = document.getElementById('more-next');
                    next.style.display = 'block';
                }, false);
                j_more_id.addEventListener('mouseout', function () {
                    var next = document.getElementById('more-next');
                    next.style.display = 'none';
                }, false);
            }
        });

    }

    GlobalNav.prototype.setState = function (state) {
        this.state = Object.assign({}, this.state, state);
        this.render();
    };

    GlobalNav.prototype.componentDidMount = function () {
        this.registerEvent();
        this.header = document.getElementById('j_header');
        this.sidebar = document.getElementById('j_sidebar');
        this.username = document.getElementById('j_username');
    }
    //变量替换
    GlobalNav.prototype.getCreateHtmlStr = function () {
        var header = this.getCreateHeaderHtmlStr();
        var sidebar = this.getCreateSidebarHtmlStr();
        var html = this.html;
        html = html.replace('${header}', header).replace('${sidebar}', sidebar).replace('${username}', this.state.user.realName);
        return html;
    }
    //html渲染
    GlobalNav.prototype.render = function () {

        if (!this.isInit) {
            document.write(this.getCreateHtmlStr());
            this.componentDidMount();
            this.isInit = true;
            return;
        }
        this.header.innerHTML = this.getCreateHeaderHtmlStr();
        this.sidebar.innerHTML = this.getCreateSidebarHtmlStr();
        this.username.innerHTML = this.getUserHtmlStr();
    };
    //获取后台权限数据
    GlobalNav.prototype.getNavData = function () {
        var that = this;
        this.http('GET', "/api/krspace-sso-web/sso/sysOwn/findUserData?forceUpdate=1", function (response) {
            menuCode = response.data.menusCode;
            var user = response.data.userInfo;
            window.resourcesCode = response.data.resourcesCode;
            var navs = [].concat(firstMenus(NavItems));
            that.setState({ navs, user });
        })
    }

    //ajax请求抽离方法
    GlobalNav.prototype.http = function (type, url, callback) {
        var that = this;
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


    /**
     * ===================数据部分=======================
     */
    var globalNav = new GlobalNav();
    var Router = new GlobalRouter();
    global.GLOBALSIDESWITCH = Router.pushCloseRoutrs;

    Router.init();
    //第一级菜单
    function firstMenus(firstData) {

        let arr = [];
        let changeData = firstData;

        changeData.map((item, index) => {

            if (item.menuItems && item.menuItems.length) {
                item.menuItems = twoMenus(item.menuItems);
            }
            if (item.menuItems && item.menuItems.length) {

                arr.push(item);
            }
        });


        arr.unshift({
            primaryText: "首页",
            router: '',
            iconName: 'icon-money',
            iconColor: '#79859a',
        });

        return arr;

    }
    //第二级菜单
    function twoMenus(twoData) {

        let arr = [];
        let changeData = twoData;
        changeData.map((item, index) => {

            if (item.menuItems && item.menuItems.length) {
                item.menuItems = lastMenus(item.menuItems);
            }
            if (item.menuItems && item.menuItems.length) {

                arr.push(item);
            }

        })

        return arr;
    }
    //第三级菜单
    function lastMenus(lastData) {

        let arr = [];
        let changeData = lastData;
        changeData.map((item, index) => {

            for (let i = 0; i < menuCode.length; i++) {
                if (item.menuCode && item.menuCode == "public") {
                    arr.push(item);
                    break;
                } else {
                    if (item.menuCode && item.menuCode == menuCode[i]) {
                        arr.push(item);
                    }
                }

            }

        })

        return arr;
    }




    function getNavs() {
        var arr = [getHomeNav(), getOperationNav(),getUserNav(), getProductNav(),  getOrderCenter(), getBillCenter(), getSmartHardware(), getPermissionNav()];

        return arr;
    }

    function getHomeNav() {
        return {
            primaryText: "首页",
            router: '',
            menuCode: 'public',
            openSidebar: false,
        }

    }

    function getUserNav() {
        return {
            primaryText: "客户会员",
            router: 'user',
            originUrl: '#/user/customerManage/customerList',
            menuItems: [
                {
                    primaryText: '客户',
                    iconName: 'icon-donething',
                    iconColor: '#79859a',
                    router:'index',
                    menuItems: [
                        {
                            primaryText: '客户线索',
                            router: 'user/customerManage/customerList',
                            menuCode: 'oper_csr_base',
                        },
                        {
                            primaryText: '客户账户',
                            router: 'bill/customerAssets',
                            type:'vue',
                            menuCode: 'customer_assets'
                        },
                        {
                            primaryText: "客户管理员",
                            router: 'member/setting-manager',
                            type:'vue',
                            menuCode: 'fina_manager_setting_page'
                        },
                        {
                            primaryText: "客户门禁权限",
                            router: 'user/memberManage/doormanage',
                            menuCode: 'door_base',
                        },
                    ]   
                }, 
                {
                    primaryText: '会员',
                    iconName: 'icon-donething',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '工作人员',
                            menuCode: 'hrm_resourcesList_incumbency',
                            router: 'user/personalManage/peopleState',

                        },
                        {
                            primaryText: "会员",
                            router: 'user/memberManage/list',
                            menuCode: 'mbr_list_base',
                        },
                        {
                            primaryText: "会员卡",
                            router: 'user/membermanage/cardmanage',
                            menuCode: 'mbr_card_base',
                        },
                        {
                            primaryText: '会员APP禁言',
                            menuCode: 'oper_cluster_base',
                            router: 'user/communityAllocation/appmanage'
                        },
                    ]   
                }, 
            ]
        }
    }
    // 商品产品
    function getProductNav(params) {
        return {
            primaryText: "产品商品",
            router: 'product',
            originUrl: '#/product/statistical/index',
            menuItems: [ 
                {
                    primaryText: '产品商品',
                    iconName: 'icon-donething',
                    iconColor: '#79859a',
                    router:'index',
                    menuItems: [
                        {
                            primaryText: "招商数据",
                            router: 'product/statistical/index',
                            menuCode: 'stat_group',
                        },
                        {

                            primaryText: '社区',
                            menuCode: 'oper_cmt_communityList_base',
                            router: 'product/communityAllocation/communityList'
                        },
                        {
                            primaryText: '社区平面图',
                            menuCode: 'oper_cmt_graph_base',
                            router: 'product/communityAllocation/communityPlanList'
                        },
                        {
                            primaryText: '空间',
                            menuCode: 'oper_cmt_spaceList_base',
                            router: 'product/communityAllocation/CommunityMeetingRoom'
                        },
                        {
                            primaryText: '工位',
                            menuCode: 'oper_cmt_stationList_base',
                            router: 'product/communityAllocation/communityStation'
                        },
                        {
                            primaryText: '注册地址',
                            menuCode: 'cmt_registerAddress_list',
                            router: 'product/communityAllocation/registeredAddress'
                        },
                        {
                            primaryText: "我方合同主体",
                            menuCode: 'lessor_management_base',
                            router: 'product/customerManage/lessorManage',
                        },
                        {
                            primaryText: '会议室设备配置',
                            menuCode: 'oper_cmt_deviceList_base',
                            router: 'product/communityAllocation/equipmentList'
                        },
                        {
                            primaryText: '库存平面图',
                            menuCode: 'cmt_run',
                            router: 'product/communityManage/detail',
                        },
                        {
                            primaryText: '销控',
                            menuCode: 'cmt_sell_control',
                            router: 'product/communityManage/controlTable',
                        },
                    ]   
                }, 
            ]
        }

    }
    // 社区运营
    function getOperationNav(params) {
        return {
        primaryText: "社区运营",
        router: 'community',
        originUrl: '#/community/operation/index',
        menuItems: [
            {
                primaryText: "社区运营",
                iconName: 'icon-operation-home',
                iconColor: '#79859a',
                router: 'index',
                menuItems: [
                    {
                        primaryText: '社区主页',
                        router: 'community/operation/index',
                        menuCode: 'operation_home',
                    },
                    {
                        primaryText: '预约参观',
                        menuCode: 'com_sys_visitList_base',
                        router: 'community/communityManage/visitorsToRecord'
                    },
                    {
                        primaryText: '访客',
                        menuCode: 'visitRecord',
                        router: 'community/visitor/list'

                    },
                    {
                        primaryText: '会议室',
                        menuCode: 'oper_appointment_base',
                        router: 'community/communityManage/allAppointment'
                    },
                    {
                        primaryText: '撤场',
                        router: 'operations-center/from-field',
                        type: 'vue',
                        menuCode: 'checklist_list',
                    },
                ]
            },
            



        ]
    }
    }
    // 系统配置
    function getPermissionNav(params) {
        return {
            primaryText: "系统配置",
            router: 'permission',
            menuItems: [
                {
                    primaryText: 'APP管理',
                    iconName: 'icon-app',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '公告',
                            menuCode: 'oper_notice_base',
                            router: 'operation/communityAllocation/noticemanage'
                        },
                        {
                            primaryText: '活动',
                            menuCode: 'oper_activity_base',
                            router: 'operation/communityAllocation/activity'
                        },
                        {
                            primaryText: '广告',
                            menuCode: 'oper_advert_base',
                            router: 'operation/communityAllocation/advert'
                        },
                        {
                            primaryText: '管家',
                            menuCode: 'oper_steward_base',
                            type:'vue',
                            router: 'app-manage/steward-setting',
                        },
                        {
                            primaryText: '通知',
                            menuCode: 'app_console_notification',
                            type: 'vue',
                            router: 'app-manage/notification-manage'
                        },
                        {
                            primaryText: '图标',
                            menuCode: 'app_console_common_icon',
                            type: 'vue',
                            router: 'app-manage/icon-manage'
                        },
                        {
                            primaryText: '推送',
                            menuCode: 'app_console_push',
                            type: 'vue',
                            router: 'app-manage/push-manage'
                        },
                        {
                            primaryText: '意见反馈',
                            menuCode: 'oper_opinion_base',
                            router: 'operation/communityAllocation/opinion'
                        },
                        {
                            primaryText: '版本更新通知',
                            router: 'permission/systemManage/appLoginLogs',
                            menuCode: 'sso_appVersion_base',
                        },
                        {
                            primaryText: '登录日志',
                            router: 'permission/loginLog',
                            menuCode: 'sso_loginLog_base',
                        }
                        //少登陆日志（待与pc版拆分）    
                    ]
                },
                {
                    primaryText: '官网管理',
                    iconName: 'icon-website',
                    iconColor: '#79859a',
                    router: 'activity',
                    menuItems: [
                        {
                            primaryText: '新闻动态',
                            menuCode: 'main_news',
                            router: 'WebBackstage/news/list',
                        },
                        {
                            primaryText: '社区信息',
                            menuCode: 'krspace_cmt',
                            router: 'WebBackstage/communityAllocation',
                        },
                        {
                            primaryText: '服务及设施配置',
                            menuCode: 'brightpoint_label_list',
                            type:'vue',
                            router: 'facility-tags/',
                        },
                    ]
                },
                {
                    primaryText: 'OP配置',
                    iconName: 'icon-website',
                    iconColor: '#79859a',
                    menuItems: [

                        {
                            primaryText: "客户来源配置",
                            menuCode: 'oper_csr_sourceList_base',
                            router: 'operation/customerManage/customerSource',
                        },
                        {
                            primaryText: '菜单配置',
                            router: 'permission/menuSetting',
                            menuCode: 'sso_module_list',
                        },
                        {
                            primaryText: '参数配置',
                            router: 'basic/parameter',
                            type: 'vue',
                            menuCode: 'system_param',
                        },
                        {
                            primaryText: '首页轮播图列表',
                            menuCode: 'sys_dynamic_list',
                            router: 'permission/homePageSetting/swperList',
                        },
                        {
                            primaryText: '首页动态列表',
                            menuCode: 'sys_slider_list',
                            router: 'permission/homePageSetting/dynamicsList',
                        },
                        {
                            primaryText: '版本更新通知',
                            router: 'permission/systemManage/update-log',
                            menuCode: 'op_ver',
                        },
                    ]
                },
                {
                    primaryText: 'OP权限',
                    iconName: 'icon-website',
                    iconColor: '#79859a',
                    // router: 'activity',
                    menuItems: [
                        {
                            primaryText: '账号权限',
                            router: 'permission/accountManage/accountList',
                            menuCode: 'sso_userList_base',
                        },
                        {
                            primaryText: '角色权限',
                            router: 'permission/user',
                            menuCode: 'sso_roleList_base',
                        },
                        {
                            primaryText: '操作项权限',
                            router: 'permission/operations',
                            menuCode: 'sso_resource_base',
                        },
                        {
                            primaryText: '业务代码配置',
                            router: 'permission/opCode',
                            menuCode: 'sso_businessCode_base',
                        },
                        {
                            primaryText: '其他合同角色权限列表',
                            menuCode: 'hrm_role_list',
                            router: 'oa/organizationPower/role',
                        },
                    ]
                },
                {
                    primaryText: "OP日志",
                    iconName: 'icon-theLog',
                    iconColor: '#79859a',
                    router: 'permission/systemManage',
                    menuItems: [
                        {
                            primaryText: '操作日志',
                            router: 'permission/accountManage/operationsLogs',
                            menuCode: 'sso_actionLog_base',
                        },
                        {
                            primaryText: '消息日志',
                            router: 'permission/systemManage/messageList',
                            menuCode: 'sso_infoList_base',
                        },
                        {
                            primaryText: '登录日志',
                            router: 'permission/loginLog',
                            menuCode: 'sso_loginLog_base',
                        }
                    ]
                },
                {
                    primaryText: "OP合同配置",
                    iconName: 'icon-theLog',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '表单配置',
                            menuCode: 'sys_form_list',
                            router: 'permission/processManage/form',
                        },
                        {
                            primaryText: '类型配置',
                            menuCode: 'wf_base_list',
                            router: 'permission/processManage/processSetting',
                        },
                        {
                            primaryText: '公共字典',
                            menuCode: 'sys_publicDict_list',
                            router:'permission/processManage/dictionary',
                        },
                        {
                            primaryText: 'SQL模版',
                            menuCode: 'sys_sqlTemplate_list',
                            router: 'permission/processManage/sqlModel',
                        },
                    ]
                },
                {
                    primaryText: "同步财务",
                    iconName: 'icon-wendang',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '同步主体',
                            router: 'permission/Synchronization/main',
                            menuCode: 'sync_main_part',
                        },
                        {
                            primaryText: '同步系统',
                            router: 'permission/Synchronization/system',
                            menuCode: 'sync_system',
                        },
                        {
                            primaryText: '同步日志',
                            router: 'permission/Synchronization/journal/main/system',
                            menuCode: 'sync_log',
                        },
                    ]
                },
            ]
        }
    }
    // 智能硬件
    function getSmartHardware(params) {
        return {
            primaryText: "智能硬件",
            router: 'smarthardware',
            originUrl: './#/smarthardware/doormanage/equipmentmanage',
            menuItems: [
                {
                    primaryText: "门禁管理",
                    iconName: 'icon-card',
                    iconColor: '#79859a',
                    router: '',
                    menuItems: [
                        {
                            primaryText: '设备管理',
                            menuCode: 'sysDeviceDefinitionList',
                            router: 'smarthardware/doorManage/equipmentmanage',
                        }, {
                            primaryText: '开门记录',
                            menuCode: 'iot_door_open_log',
                            router: 'smarthardware/doorManage/openlog',
                        },
                        {
                            primaryText: '故障报警',
                            menuCode: 'iot_device_alarm',
                            router: 'smarthardware/doorManage/warning',
                        },
                        {
                            primaryText: '升级管理',
                            menuCode: 'iot_upgrade_package',
                            router: 'smarthardware/doorManage/upgrademanage',
                        }
                    ]
                },],
        }
    }
    // 订单合同
    function getOrderCenter() {
        return {
        primaryText: "订单合同",
        router:'order',
        type:'vue',
        menuItems: [
            {
                primaryText: '订单',
                iconName: 'icon-donething',
                router: 'office',
                iconColor: '#79859a',
                menuCode: 'public',
                menuItems: [
                    {
                        primaryText: "工位订单",
                        router: 'order-center/order-manage/station-order-manage',
                        type: 'vue',
                        menuCode: 'seat_order_list',
                    },
                    {
                        primaryText: "会议室订单",
                        router: 'order/list',
                        type: 'vue',
                        menuCode: 'fina_meeting_order_page'
                    },
                    {
                        primaryText: "通用订单",
                        router: 'order-center/order-manage/general-order-manage',
                        type: 'vue',
                        menuCode: 'orderCurrency_list',
                    },
                ]   
            }, 
            {
                primaryText: '合同',
                iconName: 'icon-donething',
                router: 'office',
                iconColor: '#79859a',
                menuCode: 'wf_contract_list',
                menuItems: [
                    {
                        primaryText: "工位合同",
                        router: 'order-center/contract-manage/contract-list/list',
                        type: 'vue',
                        menuCode: 'stationContract_list',
                    },
                    {
                        primaryText: '其他合同',
                        menuCode: 'public',
                        router: 'office/officeBackground/newOffice',
                    },
                    {
                        primaryText: '我发起的合同',
                        menuCode: 'public',
                        router: 'office/officeBackground/ownAdd',
                    },
                    {
                        primaryText: '合同库',
                        menuCode: 'wf_contract_list',
                        router: 'office/officeBackground/contractMonitor',
                    },
                    {
                        primaryText: '合同扫码',
                        menuCode: 'pigeonhole',
                        router: 'order-center/contract-manage/contract-yard',
                    }
                ]   
            }, 
        ]
    }
    }
    // 账单财务
    function getBillCenter() {
        return {
        primaryText: "账单财务",
        router: 'finance',
        type:'vue',
        menuItems: [
            {
                primaryText: "账单中心",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    {
                        primaryText: "账单(老数据)",
                        router: 'finance/manage/orderbill/orderList',
                        menuCode: 'fina_account_list'
                    },
                    {
                        primaryText: "已出账单管理",
                        router: 'bill/list',
                        type: 'vue',
                        menuCode: 'pay_created_bill_page',
                    },
                    {
                        primaryText: "回款管理",
                        router: 'bill/payment',
                        type: 'vue',
                        menuCode: 'pay_payment_page',
                    },
                    {
                        primaryText: "应收管理",
                        router: 'bill/income',
                        type: 'vue',
                        menuCode: 'pay_income_page',
                    },
                    {
                        primaryText: "结算单管理",
                        router: 'bill/settlement-list',
                        type: 'vue',
                        menuCode: 'checklist_list',
                    },
                    {
                        primaryText: "交易流水",
                        router: 'bill/payrecord',
                        type: 'vue',
                        menuCode: 'pay_deal_flow_page'
                    },
                    {
                        primaryText: "账款数据",
                        router: 'statistical/agingaccount',
                        menuCode: 'finance_explan',
                    },
                    ]
                },
        ]
        }
    }
})(window);
