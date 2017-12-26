(function (global) {
    
     var NavItems = getNavs();
     var menuCode = [];
     var navUtils = {
         activeData:[],
         activeHander:'',
         activeSide:'',
         isHome:false,
         closeRoutrs : [''],
         strDelNum:function (str) {
             
         },
         navNum:8
     }
    //获取侧边栏里的数据
     function getClickNav(arr,str) {
         for(var i=0;i<arr.length;i++){
             var every = arr[i];
             var href = "";
             if (location.hash.indexOf("#/") != -1) {
                 str = location.hash.split("#/")[1]
                 href = every.router;
             } else {
                 href = location.protocol+"//" + location.hostname + "/" + every.router;
             }
             if (href === str){
                 return every;
             }else{
                 if (every.menuItems && every.menuItems.length){
                    var data = getClickNav(every.menuItems, str)
                    if(data){
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
     GlobalRouter.prototype.pushCloseRoutrs = function(){
         var router = location.href.split('?')[0];
         if (navUtils.closeRoutrs.indexOf(router)==-1){
             navUtils.closeRoutrs.push(router)
         }
         globalNav.allSwitch()
     }
     //路由发生变化
     GlobalRouter.prototype.refresh = function () {
        var router = location.href.split('?')[0];
        var activeData = getClickNav([].concat(NavItems), router);
        if (activeData){
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
            salidNav:[],
        };
         this.isInit = false;
         this.html = '<div class="app-header">'+

                         '<div class="c-header"> ' +
 
                             '<div class="brand"></div> ' +
                             '<div class="menu-btn menu-btn-open" id="j_menu_btn"></div>' +
                             '<div class="u-header-logo"></div>' +
 
                             '<div class="header-nav" id="j_header">${header}</div>' +
 
                                 '<div class = "j_header_other">' +
                                     //'<div id = "j_msg_btn"></div>' +
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
                                '<div id="j_nav-loading" class="nav-loading" style="display:none;">'+

                                    // '<div class="item-loader-container">'+
                                       
                                    //     '<div class="la-2x" >'+
                                    //         '<div></div>'+
                                    //         '<div></div>'+
                                            
                                    //     '</div >'+
                                    //     '<span>加载中...<span>'+
                                    // '</div >'+
                                '</div>' +
                            '</div>'+
                        
                     '</div>';
 
         this.getNavData();
         this.render();
     };
 
 
     //生成头部
     GlobalNav.prototype.getCreateSidebarHtmlStr = function () {
         var sidebarNavs = Object.assign({},navUtils.activeData);
         var html = '';
         var router = location.href;
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
                    if (child.type && child.type == "vue") {
                        href = location.protocol+"//"+ location.hostname + "/" + child.router;
                    } else {
                        href =location.protocol+"//"+ location.hostname +"new/#/" + child.router;
                    }
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
         var more='<ul>';
         var html = '<ul class="more-nav-ul">';
         var { navs } = this.state;
         if (!navs.length) {
            return '';
         }
         var router = ''
         if (navUtils.activeData){
            router = navUtils.activeData.router;
         }
         navs.map(function (item,index) {
             var href ="";
            
 
             if(item.menuItems && item.menuItems.length){
                 href = item.menuItems[0].menuItems[0].router;
             }
             if (item.type && item.type == "vue") {
                 href = location.protocol+"//" + location.hostname + "/" + href;
             } else {
                 href =location.protocol+"//"+ location.hostname + "/new/#/" + href;
             }
 
             if(index > navUtils.navNum-1){
                 more+='<li class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
                 return ;
             }
             html += '<li class=' + (item.router == router ? 'active' : 'default') + '><a href="' + href + '">' + item.primaryText + '</a></li>';
             // html += '<li class=' + (item.active ? 'active' : 'default') + '><span>' + item.primaryText + '</span></li>';
         });
         if(navs.length&&navs.length>navUtils.navNum){
             more +='</ul>';
             html += 
             '<li id="more-id" class="more-name-li">'+
              '<span>更多</span>'+
              '<div class="more-nav" id="more-next"><p></p>'+more+'</div>'
             '</li>'+
            '</ul>';
         }else{
            html += '</ul>';
         }
         return html;
     }
     
 
    
     GlobalNav.prototype.allSwitch = function (isOpen) {
        
         var j_sidebar = document.getElementById('j_sidebar');
         var j_header = document.getElementById('j_header');
         var j_menu_btn = document.getElementById('j_menu_btn');
         var router = location.href.split('?')[0];    
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
         if ( j_sidebar.style.display === 'none'){
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
            var j_more_id =  document.getElementById('more-id')
            j_menu_btn.addEventListener('click', function () {
                if (!navUtils.isHome){
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
            if(j_more_id){
                j_more_id.addEventListener('mouseover',function(){
                    var next=document.getElementById('more-next');
                    next.style.display='block';
                },false);
                j_more_id.addEventListener('mouseout',function(){
                    var next=document.getElementById('more-next');
                    next.style.display='none';
                },false);
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
            var navs = [].concat(firstMenus(NavItems));
            that.setState({ navs, user });
        })
    }
  
     //ajax请求抽离方法
    GlobalNav.prototype.http = function (type,url,callback) {
        var that = this;
        var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据
        xhr.open(type, url, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
                if (xhr.response.code<0) {
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
     // console.log("GLOBALSIDESWITCH",GLOBALSIDESWITCH)
    var Router = new GlobalRouter();
    global.GLOBALSIDESWITCH = Router.pushCloseRoutrs;
    
    Router.init();
     //第一级菜单
     function firstMenus(firstData) {
 
         let arr = [];
         let changeData =firstData;
 
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
                 if (item.menuCode && item.menuCode == "public"){
                     arr.push(item);
                     break;
                 }else{
                     if (item.menuCode && item.menuCode == menuCode[i]) {
                         arr.push(item);
                     }
                 }
                
             }
 
         })
 
         return arr;
     }
 
 
 
     function getNavs() {
         var arr = [getHomeNav(), getOfficeNav(), getOANav(), getOperationNav(), getAdministrationNav(), getFinanceNav(), getPermissionNav(), getSmartHardware(),getOrderCenter(),getBillCenter()];
         
         return arr;
     }
     function getAdministrationNav() {
         return {
                 primaryText: "行政管理",
                 router: '',
                 menuItems: []
             }
     
     }
     function getFinanceNav() {
         return {
                 primaryText: "财法管理",
                 router: 'finance',
                 menuItems: [
                     {
                         primaryText: "财法主页",
                         router: 'manage',
                         iconName: 'icon-money',
                         iconColor: '#79859a',
                         menuItems: [
 
                         ]
                     },
                     {
                         primaryText: "财务管理",
                         router: 'manage',
                         iconName: 'icon-money',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: "审核列表",
                                 router: 'finance/manage/audit/auditlist',
                                 menuCode: 'fina_verify_page'
                             },
                             {
                                 primaryText: "账单列表",
                                 router: 'finance/manage/orderbill/orderList',
                                 menuCode: 'fina_account_list'
                             },
                             {
                                 primaryText: '凭证列表',
                                 router: 'finance/voucherManage/voucherList',
                                 menuCode: 'upload_evidence_base',
                             },
                             {
                                 primaryText: "同步中心",
                                 router: 'finance/manage/sync/list',
                                 menuCode: 'sync_cmt_ctrl'
                             },
 
                         ]
                     },
                     {
                         primaryText: "基础配置",
                         router: 'manage',
                         iconName: 'icon-basis',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: "款项配置",
                                 router: 'finance/manage/fundSetting/totalFund',
                                 menuCode: 'fina_category_1stPage'
                             },
 
                         ]
                     },
                 ]
             }
     }
 
     function getHomeNav() {
         return {
                 primaryText: "首页",
                 router: '',
                 menuCode: 'public',
                 openSidebar: false,
             }
         
     }
 
     function getOANav() {
         return {
                 primaryText: "人事管理",
                 router: 'oa',
                 originUrl: '#/oa/organization/home',
                 menuItems: [
                     {
                         primaryText: '人事主页',
                         iconName: 'icon-schema',
                         iconColor: '#79859a',
                         menuCode: '',
                         menuItems: [
 
                         ]
                     },
                     {
                         primaryText: '人事资料',
                         iconName: 'icon-personnel-information',
                         iconColor: '#79859a',
                         menuCode: 'hrmresourceadmin',
                         menuItems: [
                             {
                                 primaryText: '我的卡片',
                                 menuCode: 'public',
                                 router: 'oa/personData/0/myCard',
                             },
                             {
                                 primaryText: '我的同事',
                                 menuCode: 'public',
                                 router: 'oa/personData/myColleague',
                             },
                         ]
                     },
                     {
                         primaryText: '人员管理',
                         iconName: 'icon-administrator',
                         menuCode: 'hrmresourceadmin',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: '人员列表',
                                 menuCode: 'hrm_resourcesList_incumbency',
                                 router: 'oa/personalManage/peopleState',
 
                             }
                         ]
                     },
 
                     {
                         primaryText: '基础配置',
                         iconName: 'icon-basis',
                         menuCode: 'hrmbasedataadmin',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: '机构设置',
                                 menuCode: 'hrm_dim_list',
                                 router: 'oa/organization/home',
                             },
                             {
                                 primaryText: '职务类型',
                                 menuCode: 'hrm_job_type_list',
                                 router: 'oa/basicConfig/postType',
                             },
                             {
                                 primaryText: '职务列表',
                                 menuCode: 'hrm_job_list',
                                 router: 'oa/basicConfig/postList',
                             },
                             {
                                 primaryText: '职级列表',
                                 menuCode: 'hrm_job_level_list',
                                 router: 'oa/basicConfig/rankList',
                             },
                             {
                                 primaryText: '角色列表',
                                 menuCode: 'hrm_role_list',
                                 router: 'oa/organizationPower/role',
                             },
                             {
                                 primaryText: '机构分权',
                                 menuCode: 'hrm_org_auth_list',
                                 router: 'oa/organizationPower/orgList',
                             },
                         ]
                     },
 
                 ]
             }
     }
 
     function getOfficeNav(params) {
         return {
                 primaryText: "综合办公",
                 router: 'office',
                 menuItems: [
                     {
                         primaryText: "办公主页",
                         router: 'office',
                         iconName: 'icon-money',
                         iconColor: '#79859a',
                         menuItems: [
 
                         ]
                     },
                     {
                         primaryText: '新办事宜',
                         iconName: 'icon-newthing',
                         router: 'office',
                         iconColor: '#79859a',
                         menuCode: 'public',
                         menuItems: [
                             {
                                 primaryText: '发起合同',
                                 menuCode: 'public',
                                 router: 'office/officeBackground/newOffice',
                             },
                         ]
                     },
                     {
                         primaryText: '已办事宜',
                         iconName: 'icon-donething',
                         router: 'office',
                         iconColor: '#79859a',
                         menuCode: 'public',
                         menuItems: [
 
                             {
                                 primaryText: '我发起的',
                                 menuCode: 'public',
                                 router: 'office/officeBackground/ownAdd',
                             },
                         ]
                     },
                 ]
             }
         
     }
 
     function getOperationNav(params) {
         return {
                 primaryText: "运营管理",
                 router: 'operation',
                 originUrl: '#/operation/customerManage/customerList',
                 menuItems: [
                     {
                         primaryText: "运营主页",
                         iconName: 'icon-operation-home',
                         iconColor: '#79859a',
                         router: 'index',
                         menuItems: [
                             {
                                 primaryText: '运营主页',
                                 router: 'operation/index',
                                 menuCode: 'operation_home',
                             },
                         ]
                     },
                     {
                         primaryText: "客户管理",
                         iconName: 'icon-user',
                         iconColor: '#79859a',
                         router: 'communityManage',
                         menuItems: [
                             {
                                 primaryText: '客户线索',
                                 router: 'operation/customerManage/customerList',
                                 menuCode: 'oper_csr_base',
                             },
                             {
                                 primaryText: '合同列表',
                                 router: 'operation/customerManage/agreementList',
                                 menuCode: 'contract_list_base',
                             },
                             {
                                 primaryText: '客户公海',
                                 router: 'operation/customerManage/customerHighSea',
                                 menuCode: 'oper_csr_marketList_base',
                             },
                             {
                                 primaryText: '合同调整',
                                 router: 'operation/customerManage/agreementtrim',
                                 menuCode: 'contract_edit',
                             },
                         ]
                     },
                     {
                         primaryText: '会员管理',
                         iconName: 'icon-vip',
                         iconColor: '#79859a',
                         router: 'member/memberManage/list',
                         menuItems: [
                             {
                                 primaryText: "会员列表",
                                 router: 'member/memberManage/list',
                                 menuCode: 'mbr_list_base',
                             },
 
                             {
                                 primaryText: "会员卡管理",
                                 router: 'member/membermanage/cardmanage',
                                 menuCode: 'mbr_card_base',
                             },
                             {
                                primaryText: "企业管理员设置",
                                router: 'member/setting-manager',
                                type:'vue',
                                menuCode: 'fina_manager_setting_page'
                               
                            },
                         ]
                     },
                     {
                         primaryText: '社区经营',
                         iconName: 'icon-com',
                         iconColor: '#79859a',
                         router: 'community',
                         menuItems: [
                             {
                                 primaryText: '计划表',
                                 menuCode: 'cmt_run',
                                 router: 'community/communityManage/detail',
                             },
                             {
                                 primaryText: '销控表',
                                 menuCode: 'cmt_sell_control',
                                 router: 'community/communityManage/controlTable',
                             },
                             {
                                 primaryText: '催款表',
                                 menuCode: 'payment_reminder',
                                 router: 'community/paymentremindtable',
                             },
                             {
                                 primaryText: '预约参观',
                                 menuCode: 'com_sys_visitList_base',
                                 router: 'community/communityManage/visitorsToRecord'
                             },
                             {
                                 primaryText: '访客登记',
                                 menuCode: 'visitRecord',
                                 router: 'community/visitor/list'
 
                             },
                             {
                                 primaryText: '投诉建议',
                                 menuCode: 'mobile_question_base',
                                 router: 'community/communityManage/holdList'
                             },
                             {
                                 primaryText: '空间预订',
                                 menuCode: 'oper_appointment_base',
                                 router: 'community/communityManage/allAppointment'
                             },
                         ]
                     },
                     {
                         primaryText: '数据统计',
                         iconName: 'icon-statistics',
                         iconColor: '#79859a',
                         router: 'statistical',
                         menuItems: [
                             {
                                 primaryText: "集团经营",
                                 router: 'statistical/index',
                                 menuCode: 'stat_group',
                             },
                             {
                                 primaryText: "账龄统计",
                                 router: 'statistical/agingaccount',
                                 menuCode: 'finance_explan',
                             },
                             {
                                 primaryText: "客户分析",
                                 router: 'statistical/dataReport',
                                 menuCode: 'stat_csr_sourceStat_base',
                             },
                         ]
                     },
                     {
                         primaryText: 'APP管理',
                         iconName: 'icon-app',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: '我的地点',
                                 menuCode: 'communityNotice',
                                 router: 'operation/communityAllocation/myaddress'
                             },
                             {
                                 primaryText: '社群管理',
                                 menuCode: 'oper_cluster_base',
                                 router: 'operation/communityAllocation/appmanage'
                             },
                             {
                                 primaryText: '公告管理',
                                 menuCode: 'oper_notice_base',
                                 router: 'operation/communityAllocation/noticemanage'
                             },
                             {
                                 primaryText: '积分管理',
                                 menuCode: 'oper_integration_base',
                                 router: 'operation/communityAllocation/integration'
                             },
                             {
                                 primaryText: '活动管理',
                                 menuCode: 'oper_activity_base',
                                 router: 'operation/communityAllocation/activity'
                             },
                             {
                                 primaryText: '广告管理',
                                 menuCode: 'oper_advert_base',
                                 router: 'operation/communityAllocation/advert'
                             },
                             {
                                 primaryText: '意见反馈',
                                 menuCode: 'oper_opinion_base',
                                 router: 'operation/communityAllocation/opinion'
                             },
                         ]
                     },
                     {
                         primaryText: '官网管理',
                         iconName: 'icon-website',
                         iconColor: '#79859a',
                         router: 'activity',
                         menuItems: [
                             {
                                 primaryText: '活动列表',
                                 menuCode: 'main_acitvity',
                                 router: 'WebBackstage/activity/list',
                             }, {
                                 primaryText: '新闻列表',
                                 menuCode: 'main_news',
                                 router: 'WebBackstage/news/list',
                             },
                             {
                                 primaryText: '社区配置',
                                 menuCode: 'krspace_cmt',
                                 router: 'WebBackstage/communityAllocation',
                             },
                             {
                                 primaryText: '轮播图列表',
                                 menuCode: 'por_mobilepic_list',
                                 router: 'WebBackstage/picList',
                             }
                         ]
                     },
 
                     {
                         primaryText: "社区配置",
                         iconName: 'icon-community',
                         iconColor: '#79859a',
                         router: 'communityManage',
                         menuCode: 'communityBaseAdmin',
                         menuItems: [
                             {
 
                                 primaryText: '社区列表',
                                 menuCode: 'oper_cmt_communityList_base',
                                 router: 'operation/communityAllocation/communityList'
                             },
                             {
                                 primaryText: '空间列表',
                                 menuCode: 'oper_cmt_spaceList_base',
                                 router: 'operation/communityAllocation/CommunityMeetingRoom'
                             },
                             {
                                 primaryText: '设备列表',
                                 menuCode: 'oper_cmt_deviceList_base',
                                 router: 'operation/communityAllocation/equipmentList'
                             },
                             {
                                 primaryText: '工位列表',
                                 menuCode: 'oper_cmt_stationList_base',
                                 router: 'operation/communityAllocation/communityStation'
                             },
                             {
                                 primaryText: '注册地址',
                                 menuCode: 'cmt_registerAddress_list',
                                 router: 'operation/communityAllocation/registeredAddress'
                             },
                             {
                                 primaryText: '平面图配置',
                                 menuCode: 'oper_cmt_graph_base',
                                 router: 'operation/communityAllocation/communityPlanList'
                             },
 
                         ]
                     },
                     {
                         primaryText: '硬件平台',
                         iconName: 'icon-hardware',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: "门禁授权",
                                 router: 'member/memberManage/doormanage',
                                 menuCode: 'door_base',
                             },
                         ]
                     },
 
                     {
                         primaryText: "基础配置",
                         iconName: 'icon-basis',
                         iconColor: '#79859a',
                         router: 'BaseManage',
                         menuCode: 'basic_config',
                         menuItems: [
                             {
                                 primaryText: "客户来源",
                                 menuCode: 'oper_csr_sourceList_base',
                                 router: 'operation/customerManage/customerSource',
                             },
                             {
                                 primaryText: "合同配置",
                                 menuCode: 'contract_setting_base',
                                 router: 'operation/customerManage/agreement/setting/list',
                             },
                             {
                                 primaryText: '代码分类',
                                 menuCode: 'oper_cmt_codeList_base',
                                 router: 'operation/communityAllocation/codeClassification'
                             },
                             {
                                 primaryText: '商圈列表',
                                 menuCode: 'oper_cmt_businessAreaList_base',
                                 router: 'operation/basicconfig/businessList'
                             },
                             {
                                 primaryText: "出租方管理",
                                 menuCode: 'lessor_management_base',
                                 router: 'operation/customerManage/agreement/lessorManage/list',
                             },
 
                         ]
                     },
                     {
                         primaryText: "红木馆活动",
                         iconName: 'icon-activity',
                         iconColor: '#79859a',
                         router: 'BaseManage',
                         menuCode: 'basic_config',
                         menuItems: [
                             {
                                 primaryText: "后台审核",
                                 menuCode: 'oper_csr_sourceList_base',
                                 router: 'operation/redHoodActive/barrageAudit',
                             },
 
                         ]
                     },
                 ]
             }
     }
 
     function getPermissionNav(params) {
         return {
                 primaryText: "基础管理",
                 router: 'permission',
                 menuItems: [
                     {
                         primaryText: "基础主页",
                         iconName: 'icon-wendang',
                         iconColor: '#79859a',
                         router: '',
                         menuItems: [
                         ]
                     },
                     {
                         primaryText: "账户管理",
                         iconName: 'icon-accountAdmin',
                         iconColor: '#79859a',
                         router: 'accountManage',
                         menuItems: [{
                             primaryText: '账户列表',
                             router: 'permission/accountManage/accountList',
                             menuCode: 'sso_userList_base',
                         },
                         ]
                     },
 
                     {
                         primaryText: "权限管理",
                         iconName: 'icon-permissions',
                         iconColor: '#79859a',
                         router: 'permission/user',
                         menuItems: [{
                             primaryText: '角色列表',
                             router: 'permission/user',
                             menuCode: 'sso_roleList_base',
                         }, {
                             primaryText: '操作项',
                             router: 'permission/operations',
                             menuCode: 'sso_resource_base',
                         },
                         {
                             primaryText: '业务代码',
                             router: 'permission/opCode',
                             menuCode: 'sso_businessCode_base',
                         }, {
                             primaryText: '菜单配置',
                             router: 'permission/menuSetting',
                             menuCode: 'sso_module_list',
                         }]
                     },
                     {
                         primaryText: "日志管理",
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
                             }, {
                                 primaryText: '登录日志',
                                 router: 'permission/loginLog',
                                 menuCode: 'sso_loginLog_base',
                             }]
                     },
                     {
                         primaryText: "系统管理",
                         iconName: 'icon-systems',
                         iconColor: '#79859a',
                         router: 'permission/systemManage',
                         menuItems: [
                             {
                                 primaryText: 'APP版本',
                                 router: 'permission/systemManage/appLoginLogs',
                                 menuCode: 'sso_appVersion_base',
                             },
                             {
                                 primaryText: 'PC版本',
                                 router: 'permission/systemManage/update-log',
                                 menuCode: 'op_ver',
                             },
                         ]
                     },
                     {
                         primaryText: "同步中心",
                         iconName: 'icon-wendang',
                         iconColor: '#79859a',
                         router: 'permission/Synchronization',
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
                                 primaryText: '系统订阅',
                                 router: 'permission/Synchronization/content',
                                 menuCode: 'sync_main_system',
                             },
                             {
                                 primaryText: '日志列表',
                                 router: 'permission/Synchronization/journal/main/system',
                                 menuCode: 'sync_log',
                             },
                         ]
                     }, {
                         primaryText: "合同管理",
                         iconName: 'icon-process',
                         menuCode: 'hrmresourceadmin',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: '表单列表',
                                 menuCode: 'sys_form_list',
                                 router: 'permission/processManage/form',
                             },
                             {
                                 primaryText: '合同列表',
                                 menuCode: 'wf_base_list',
                                 router: 'permission/processManage/processSetting',
                             },
                             {
                                 primaryText: '公共字典',
                                 menuCode: 'sys_publicDict_list',
                                 router: 'permission/processManage/dictionary',
                             },
                             {
                                 primaryText: 'SQL模版',
                                 menuCode: 'sys_sqlTemplate_list',
                                 router: 'permission/processManage/sqlModel',
                             },
                         ]
                     },
 
                     {
                         primaryText: "知识中心",
                         iconName: 'icon-knowledge',
                         iconColor: '#79859a',
                         router: '',
                         menuItems: [
                             {
                                 primaryText: '来源系统',
                                 menuCode: 'doc_source',
                                 router: 'docSourceServiceAdmin',
                                 originUrl: '/krspace_oa_web/doc/docSourceService/toDocSourceServiceList?mid=59'
                             },
                             {
                                 primaryText: '文件类型',
                                 menuCode: 'oa_docfile_type',
                                 router: 'docFiletypeAdmin',
                                 originUrl: '/krspace_oa_web/doc/docFiletype/toDocFiletypeList?mid=56'
                             },
                             {
                                 primaryText: '文件范围',
                                 menuCode: 'oa_docfilerange',
                                 router: 'docFileRangeAdmin',
                                 originUrl: '/krspace_oa_web/doc/docFileRange/toDocFileRangeList?mid=57'
                             },
                             {
                                 primaryText: '文档设置',
                                 menuCode: 'oa_doctype',
                                 router: 'docFileAdmin',
                                 originUrl: '/krspace_oa_web/doc/docFile/toDocTypeList?mid=67'
                             },
 
                         ]
                     },
                     {
                         primaryText: '首页配置',
                         iconName: 'icon-home-setting',
                         menuCode: 'hrmbasedataadmin',
                         iconColor: '#79859a',
                         menuItems: [
                             {
                                 primaryText: '轮播图列表',
                                 menuCode: 'sys_dynamic_list',
                                 router: 'permission/homePageSetting/swperList',
                             },
                             {
                                 primaryText: '最新动态列表',
                                 menuCode: 'sys_slider_list',
                                 router: 'permission/homePageSetting/dynamicsList',
                             }
                         ]
                     },
 
                 ]
             }
     }
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
     function getOrderCenter() {
        return {
            primaryText: "订单中心",
            router: 'order',
            type:'vue',
            menuItems: [
                {
                    primaryText: "订单管理",
                    router: '',
                    iconName: 'icon-money',
                    iconColor: '#79859a',
                    type:'vue',
                    menuItems: [
                        {
                            primaryText: "订单列表",
                            router: 'order-center/order-manage',
                            type:'vue',
                            menuCode: 'order_seat_list',
                        },
                    ]
                },
                {
                    primaryText: "合同管理",
                    router: '',
                    iconName: 'icon-money',
                    iconColor: '#79859a',
                    type:'vue',
                    menuItems: [
                        {
                            primaryText: "合同列表",
                            router: 'contract-center/list',
                            type:'vue',
                            menuCode: 'iot_door_open_log',
                            //menuCode: 'fina_meeting_order_page'
                        },
                    ]
                },
            ]
        }
    }
    function getBillCenter() {
        return {
            primaryText: "账单中心",
            router: 'bill',
            type:'vue',
            menuItems: [
                {
                    primaryText: "账单中心",
                    router: '',
                    iconName: 'icon-money',
                    iconColor: '#79859a',
                    type:'vue',
                    menuItems: [
                        {
                            primaryText: "已出账单管理",
                            router: 'bill/list',
                            type:'vue',
                            menuCode: 'pay_created_bill_page'
                             //menuCode: 'pay_cerated_bill_page',
                        },
                        {
                            primaryText: "回款管理",
                            router: 'bill/payment',
                            type:'vue',
                            menuCode: 'pay_payment_page'
                            // menuCode: 'iot_door_open_log',
                        },
                        {
                            primaryText: "应收管理",
                            router: 'bill/income',
                            type:'vue',
                            menuCode: 'pay_income_page'
                            // menuCode: 'iot_door_open_log',
                        },
                        
                        {
                            primaryText: "交易流水",
                            router: 'bill/payrecord',
                            type:'vue',
                            menuCode: 'pay_deal_flow_page'
                            // menuCode: 'iot_door_open_log',
                        },
                    ]
                },
               
            ]
        }
    }
 })(window);
 