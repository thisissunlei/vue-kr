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
        var hostname = location.hostname;
        var port = location.port || '';
        if (port) {
            port = ":" + port;
        }
        if (type && type == "vue") {
            alias = '/';
        }
        if(type && type == "member"){
            alias = '/';
            hostname =  'memberadmin.krspace.cn';
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
    //设置页面的一级路由
    GlobalRouter.prototype.setDefaultHeader = function (value) {
        var j_li = document.getElementsByName(value)[0];
        if(j_li){
            j_li.setAttribute("class", "active");
        }else{
            return
        }
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
        this.menuBtnBacks = [];
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
            if (item.hasOwnProperty('menuItems') && item.menuItems.length) {
                html += '<div class="item"><div class="item-title"><span class = "icon-style ' + iconName + '"></span><span style="padding-left:40px">' + item.primaryText + '</span></div>';

                html += '<ul>';
                item.menuItems.map(function (child) {
                    var href = ""
                    href = setHref(child.type, child.router);
                    html += '<li class=' + (href == router ? 'active' : 'default') + '><a href="' + href + '">' + child.primaryText + '</a></li>';
                })
                html += '</ul>';
            }

            html += '</div>';

        });

        return html;

    }
    //侧边栏开关监听
    GlobalNav.prototype.listenSidebarOpen= function (callback) {
        if (!callback){
            return;
        }
       
        globalNav.menuBtnBacks.push(callback);
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
                item.type = item.menuItems[0].menuItems[0].type || ''
            }
            href = setHref(item.type, href)
            //默认第一个（毅豪说的）
            if (index > navUtils.navNum - 1) {
                more += '<li name="'+item.primaryText+'" class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
                return;
            }
            html += '<li name="'+item.primaryText+'" class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
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
    GlobalNav.prototype.menuBtnBackRender = function (flag) {
        if (!this.menuBtnBacks || !this.menuBtnBacks.length){
            return;
        }
        for (var i = 0; i < this.menuBtnBacks.length; i++) {
            var everyCallback = this.menuBtnBacks[i];
            if (everyCallback){
                everyCallback(flag);
            }
        }
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
            //===按钮被点击
            j_menu_btn.addEventListener('click', function () {
                if (!navUtils.isHome) {
                   
                    var open = true;
                    if (j_menu_btn.className.indexOf('menu-btn-open')>0){
                        open = false;
                    }
                    globalNav.menuBtnBackRender(open);
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
    // global.GLOBALHEADERSET = Router.setDefaultHeader;
    // global.listenSidebarOpen = Router.listenSidebarOpen;
    global.LISTENSIDEBAROPEN = globalNav.listenSidebarOpen;

    global.GLOBALHEADERSET = Router.setDefaultHeader;

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
        var arr = [getHomeNav(), objecrSetting(), getOperationNav(), getUserNav(), getProductNav(), getOrderCenter(), getBillCenter(), getSmartHardware(), getPermissionNav(),devToolSetting()];

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
            router:'customer',
            type:'vue',

            menuItems: [
                {
                    primaryText: '客户',
                    iconName: 'icon-customers',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '客户账户',
                            router: 'bill/customerAssets',
                            type:'vue',
                            menuCode: 'customer_assets'
                        },
                        {
                            primaryText: '客户管理',
                            router: 'customer-manage/manage',
                            type:'vue',
                            menuCode: 'customer_center'
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
                        {
                            primaryText: '客户线索',
                            router: 'user/customerManage/customerList',
                            menuCode: 'oper_csr_base',
                        },
                        {
                            primaryText: '协助客户授权',
                            router: 'accredit',
                            type:'member',
                            menuCode: 'op_admin_auth'
                        },
                    ]
                },
                {
                    primaryText: '会员',
                    iconName: 'icon-members',
                    iconColor: '#79859a',
                    menuItems: [
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
                            primaryText: '会员门禁权限组',
                            menuCode: 'auth_user_group_list',
                            router: 'doorpermission/doorgroupmanage',
                        },
                        {
                            primaryText: '会员APP禁言',
                            menuCode: 'oper_cluster_base',
                            router: 'user/communityAllocation/appmanage'
                        },
                        {
                            primaryText: '工作人员',
                            menuCode: 'hrm_resourcesList_incumbency',
                            router: 'user/personalManage/peopleState',

                        },
                        {
                            primaryText: '工作人员职务',
                            menuCode: 'hrm_job_list',
                            router: 'user/basicConfig/postList',
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
                    iconName: 'icon-product-goods',
                    iconColor: '#79859a',
                    router:'index',
                    menuItems: [
                        {

                            primaryText: '社区',
                            menuCode: 'oper_cmt_communityList_base',
                            router: 'product/communityAllocation/communityList'
                        },
                        // {
                        //     primaryText: '空间',
                        //     menuCode: 'oper_cmt_spaceList_base',
                        //     router: 'product/communityAllocation/CommunityMeetingRoom'
                        // },
                        // {
                        //     primaryText: '工位',
                        //     menuCode: 'oper_cmt_stationList_base',
                        //     router: 'product/communityAllocation/communityStation'
                        // },
                        {
                            primaryText: "商品库",
                            router: 'inventory/goods-library',
                            type: 'vue',
                            menuCode: 'goods_list',
                        },
                        {
                            primaryText: "折扣配置",
                            router: 'basic/preferential',
                            type: 'vue',
                            menuCode: 'zhekou',
                        },
                        {
                            primaryText: '平面图配置',
                            menuCode: 'oper_cmt_graph_base',
                            router: 'product/communityAllocation/communityPlanList'
                        },
                        
                        {
                            primaryText: "每日库存查询",
                            router: 'inventory/daily-inventory',
                            type: 'vue',
                            menuCode: 'daily_inventory',
                        },
                        {
                            primaryText: "可租商品查询",
                            router: 'inventory/optional-inventory',
                            type: 'vue',
                            menuCode: 'inventory',
                        },
                        {
                            primaryText: '库存平面图',
                            router: 'inventory/floor-plan',
                            type: 'vue',
                            menuCode: 'inventory_graph',
                        },
                        {
                            primaryText: "社区招商情况",
                            router: 'community/attract-investment',
                            type: 'vue',
                            menuCode: 'cmt_investment',
                        },
                        {
                            primaryText: '销控',
                            menuCode: 'cmt_sell_control',
                            router: 'product/communityManage/controlTable',
                        },
                        {
                            primaryText: "招商数据",
                            router: 'product/statistical/index',
                            menuCode: 'stat_group',
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
                        // {
                        //     primaryText: '库存平面图',
                        //     menuCode: 'cmt_run',
                        //     router: 'product/communityManage/detail',
                        //},
                        {
                            primaryText: '社区商品配置',
                            router: 'product/goods',
                            type: 'vue',
                            menuCode: 'mobile_community_goods',
                        },
                        {
                            primaryText: '会议室',
                            router: 'product/meeting',
                            type: 'vue',
                            menuCode: 'meeting_room_goods',
                        },
                        {
                            primaryText: '会议室设备配置',
                            menuCode: 'oper_cmt_deviceList_base',
                            router: 'product/communityAllocation/equipmentList'
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
        menuItems: [
            {
                primaryText: "社区运营",
                iconName: 'icon-operation-home',
                iconColor: '#79859a',
                menuItems: [
                    {
                        primaryText: '社区主页',
                        router: 'operation/community',
                        type:'vue',
                        menuCode: 'op_home',
                    },
                    {
                        primaryText: '即将到期',
                        router: 'inventory/over-date',
                        type:'vue',
                        menuCode: 'vueList',
                    },
                    {
                        primaryText: '即将进场',
                        router: 'inventory/enter-field',
                        type:'vue',
                        menuCode: 'imt_putaway_list',
                    },
                    {
                        primaryText: '已起租未付',
                        router: 'inventory/rented-unpaid',
                        type:'vue',
                        menuCode: 'rent_no_pay',
                    },
                    {
                        primaryText: '逾期未付',
                        router: 'inventory/over-date-unpaid',
                        type:'vue',
                        menuCode: 'overdate_no_pay',
                    },
                    {
                        primaryText: '预约参观',
                        menuCode: 'com_sys_visitList_base',
                        router: 'community/communityManage/visitorsToRecord'
                    },
                    {
                        primaryText: '预约访客',
                        menuCode: 'visitRecord',
                        router: 'community/visitor/list'
                    },
                    {
                        primaryText: "KM会议",
                        router: 'krmeeting',
                        type: 'vue',
                        menuCode: 'kr_meeting'
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
                    {
                        primaryText: '电视图库管理',
                        menuCode: 'tv_ad_storage',
                        type: 'vue',
                        router: 'smart-hardware/map-depot'
                    }
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
                    primaryText: 'APP',
                    iconName: 'icon-app',
                    iconColor: '#79859a',
                    menuItems: [
                        {
                            primaryText: '产品运营主页',
                            menuCode: 'mobile_app_operate_home',
                            type: 'vue',
                            router: 'app-manage/home'
                        },
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
                            primaryText: '会员福利',
                            menuCode: 'op_member_coupon_external',
                            type: 'vue',
                            router: 'app-manage/member-welfare'
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
                            primaryText: '登录日志',
                            router: 'permission/loginLog',
                            menuCode: 'sso_loginLog_base',
                        },
                        {
                            primaryText: '版本更新通知',
                            router: 'permission/systemManage/appLoginLogs',
                            menuCode: 'sso_appVersion_base',
                        }
                       
                       
                    ]
                },
                {
                    primaryText: '官网',
                    iconName: 'icon-website',
                    iconColor: '#79859a',
                    router: 'activity',
                    menuItems: [

                        {
                            primaryText: '社区信息',
                            menuCode: 'krspace_cmt',
                            router: 'WebBackstage/communityAllocation',
                        },
                        {
                            primaryText: '新闻动态',
                            menuCode: 'main_news',
                            router: 'WebBackstage/news/list',
                        },
                        {
                            primaryText: '服务及设施配置',
                            menuCode: 'brightpoint_label_list',
                            type:'vue',
                            router: 'facility-tags/',
                        },
                        {
                            primaryText: '轮播图列表',
                            menuCode: 'por_mobilepic_list',
                            router: 'WebBackstage/picList',
                        },
                        {
                            primaryText: '关键词配置',
                            menuCode: 'sem_list',
                            router: 'WebBackstage/keyword',
                        },
                        {
                            primaryText: '计算器配置',
                            menuCode: 'cbd_list',
                            type:'vue',
                            router: 'official-website/calculator',
                        }
                    ]
                },
                {
                    primaryText: 'OP配置',
                    iconName: 'icon-op-set',
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
                            primaryText: '首页轮播图配置',
                            menuCode: 'sys_dynamic_list',
                            router: 'permission/homePageSetting/swperList',
                        },
                        {
                            primaryText: '首页动态配置',
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
                    iconName: 'icon-op-permission',
                    iconColor: '#79859a',
                    // router: 'activity',
                    menuItems: [

                        {
                            primaryText: '角色权限',
                            router: 'permission/user',
                            menuCode: 'sso_roleList_base',
                        },
                        {
                            primaryText: '其他合同角色权限',
                            menuCode: 'hrm_role_list',
                            router: 'oa/organizationPower/role',
                        },
                        {
                            primaryText: '账号权限',
                            router: 'permission/accountManage/accountList',
                            menuCode: 'sso_userList_base',
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
                            primaryText: '项目管理权限',
                            menuCode: 'pm_manage_role',
                            type: 'vue',
                            router: 'nav-config'
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
                            primaryText: '登录日志',
                            router: 'permission/loginLog',
                            menuCode: 'sso_loginLog_base',
                        },
                        {
                            primaryText: '消息日志',
                            router: 'permission/systemManage/messageList',
                            menuCode: 'sso_infoList_base',
                        },
                    ]
                },
                {
                    primaryText: "OP合同配置",
                    iconName: 'icon-op-contract',
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
                        iconName: 'icon-placket-manage',
                        iconColor: '#79859a',
                        router :'',
                        menuItems: [
                            {
                                primaryText: '设备管理',
                                menuCode: 'sysDeviceDefinitionList',
                                router: 'smarthardware/doorManage/equipmentmanage',
                            },{
                                primaryText: '开门记录',
                                menuCode: 'iot_door_open_log',
                                type: 'vue',
                                router: 'smarthardware/openlog',
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
                            },
                            {
                                primaryText: '门禁级联关系',
                                menuCode: 'door_relation',
                                type: 'vue',
                                router: 'doorrelationship/map',
                            }
                        ]
                }, {
                        primaryText: "打印管理",
                        iconName: 'icon-card',
                        iconColor: '#79859a',
                        router :'',
                        menuItems: [
                            {
                                primaryText: '打印机管理',
                                menuCode: 'printer_manage',
                                router: 'smarthardware/printmanage/equipmentmanage',
                            },{
                                primaryText: '社区打印配置',
                                menuCode: 'print_community_config',
                                router: 'smarthardware/printmanage/printerconfig',
                            },
                            {
                                primaryText: '费用配置',
                                menuCode: 'print_price_config',
                                router: 'smarthardware/printmanage/priceconfig',
                            },
                            {
                                primaryText: '打印记录',
                                menuCode: 'print_record',
                                router: 'smarthardware/printmanage/printlog',
                            }
                        ]
                },{
                    primaryText: "中央控制管理",
                    iconName: 'icon-central-control',
                    iconColor: '#79859a',
                    router :'',
                    menuItems: [

                        {
                            primaryText: '设备管理',
                            menuCode: 'gateway_list',
                            router: 'smarthardware/centercontrolmanage/equipmentmanage',
                        },{
                            primaryText: '操作记录',
                            menuCode: 'gateway_click_list',
                            router: 'smarthardware/centercontrolmanage/operatelog',
                        }
                    ]
            },{
                primaryText: "设备管理",
                iconName: 'icon-equipment-manage',
                iconColor: '#79859a',
                router :'',
                menuItems: [

                    {
                        primaryText: '设备查询',
                        menuCode: 'device_deploy_search',
                        router: 'smarthardware/equipmentmanage/equipmentsearch',
                    },{
                        primaryText: 'IP冲突检测',
                        menuCode: 'device_ip_detection',
                        router: 'smarthardware/equipmentmanage/checkrepeatip',
                    }
                ]
        },
        {
                primaryText: "空间管理",
                iconName: 'icon-space-manage',
                iconColor: '#79859a',
                router :'',
                menuItems: [
                        {
                            primaryText: '空间管理',
                            menuCode: 'basic_space',
                            type: 'vue',
                            router: 'smart-hardware/space-manage'
                        },
                    ]
            },
        ],
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
                iconName: 'icon-orders',
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
                        primaryText: "APP会议室订单",
                        router: 'order/list',
                        type: 'vue',
                        menuCode: 'fina_meeting_order_page'
                    },
                    {
                        primaryText: "KM会议室订单",
                        router: 'krmeetingorder',
                        type: 'vue',
                        menuCode: 'krm_order_base'
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
                iconName: 'icon-contracts',
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
                        type: 'vue',
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
                primaryText: "账单财务",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type:'vue',
                menuItems: [

                    {
                        primaryText: "账单",
                        router: 'bill/list',
                        type: 'vue',
                        menuCode: 'pay_created_bill_page',
                    },
                    {
                        primaryText: "账单(老数据)",
                        router: 'finance/manage/orderbill/orderList',
                        menuCode: 'fina_account_list'
                    },
                    {
                        primaryText: "审核列表(老数据)",
                        router: 'finance/manage/audit/auditlist',
                        menuCode: 'fina_verify_page'
                    },
                    {
                        primaryText: "回款",
                        router: 'bill/payment',
                        type: 'vue',
                        menuCode: 'pay_payment_page',
                    },
                    {
                        primaryText: "应收",
                        router: 'bill/income',
                        type: 'vue',
                        menuCode: 'pay_income_page',
                    },
                    {
                        primaryText: "结算单",
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
                    {primaryText: "财务端",
                        router: 'bill/make-invoice',
                        type: 'vue',
                        menuCode: 'invoice_finance'
                    },
                    {
                        primaryText: "运营端",
                        router: 'inventory/make-invoice',
                        type: 'vue',
                        menuCode: 'invoice_operation'
                    },
                    {
                        primaryText: "增票资质",
                        router: 'bill/financial-invoice',
                        type: 'vue',
                        menuCode: 'qualification'
                    }, 
                    // {
                    //     primaryText: "客户资金转移",
                    //     type: 'vue',
                    //     router: 'order-center/apply-manage/_transferOperate',
                    //     menuCode: 'wallet_transfer',
                    // }
                    ]
                },
        ]
        }

    }
    function objecrSetting() {
        return {
            primaryText: "项目管理",
            router: 'project',
            type: 'vue',
            menuItems: [
                {
                    primaryText: "项目管理",
                    iconName: 'icon-money',
                    iconColor: '#79859a',
                    type: 'vue',
                    menuItems: [
                        {
                            primaryText: "项目管理",
                            router: 'bill/project-setting',
                            type: 'vue',
                            menuCode: 'pm_manage_list'
                        }
                    ]
                }

            ]
        }
    }
    function devToolSetting(){
        return  {
            primaryText: "开发工具",
            router: 'dev',
            type: 'vue',
            menuItems: [
                {
                    primaryText: '后端工具',
                    iconName: 'icon-money',
                    iconColor: '#79859a',
                    type: 'vue',
                    menuItems: [
                        {
                            primaryText: "订单数据监控",
                            router: 'management-tool/data-monitoring',
                            type: 'vue',
                            menuCode: 'order_validate_list'
                        },
                        {
                            primaryText: '运维工具',
                            menuCode: 'ops_tool_management',
                            type: 'vue',
                            router: 'ops'
                        },
                    ]
                }

            ]
        }
    }
    
})(window);
