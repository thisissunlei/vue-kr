webpackJsonp([69,166],{"+zWg":function(t,e,i){"use strict";function n(t){i("AlS5")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("DwMB"),l=i("btkF"),c=i("VU/8"),s=n,o=c(a.a,l.a,!1,s,null,null);e.default=o.exports},"/FcJ":function(t,e,i){"use strict";e.a={props:{detail:{type:Object,default:{}}},data:function(){return{communityList:[],indeterminate:!0,checkAll:!1,checkAllGroup:[],checkList:""}},created:function(){this.getCommunityList()},mounted:function(){},methods:{getCommunityList:function(){var t=this,e=this.$route.params,i={csrId:e.csrId,mbrId:this.detail.mbrId};this.$http.get("get-manage-cmt-list",i).then(function(e){t.communityList=e.data.cmtList;var i=[];e.data.cmtList.map(function(t){"1"==t.isManager&&i.push(t.cmtId)}),t.checkAllGroup=i,t.checkAllGroup.length==t.communityList.length?t.checkAll=!0:t.checkAll=!1}).catch(function(e){t.$Notice.error({title:e.message})})},onCheckAll:function(){var t=[];this.checkAll?(this.communityList.map(function(e){t.push(e.cmtId)}),this.checkAllGroup=[].concat(t),this.checkList=t.join(",")):(this.checkAllGroup=[],this.checkList=""),this.$emit("checkData",this.checkList)},checkGroupChange:function(t){var e=[].concat(this.checkAllGroup);this.checkList=e.join(","),e.length==this.communityList.length?this.checkAll=!0:this.checkAll=!1,this.$emit("checkData",this.checkList)}}}},"4O/J":function(t,e,i){"use strict";e.a={name:"detailStyle",props:["info"]}},"61ld":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.getClassName()},[i("div",{staticClass:"ui-label",class:{circle:"circle"==t.type}},[t._v("\n\t\t"+t._s(t.label)+"\n\t")]),i("div",{staticClass:"ui-text"},[t._t("default")],2)])},a=[],l={render:n,staticRenderFns:a};e.a=l},A7Ww:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.ui-labeltext{width:45%;height:14px;font-size:14px;color:#333;line-height:14px;padding-left:14px;margin-bottom:24px;display:inline-block}.ui-labeltext .circle:before{content:"";display:inline-block;width:8px;height:8px;border:1px solid #333;border-radius:5px}.ui-labeltext .ui-label{font-weight:700;line-height:20px}.ui-label-text-inline .ui-label,.ui-label-text-inline .ui-text{display:inline-block}.ui-label-text-unline .ui-label{margin-bottom:8px}.ui-label-text-unline .ui-label,.ui-label-text-unline .ui-text{display:block}',""])},AlS5:function(t,e,i){var n=i("hGt5");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("4e57004a",n,!0,{sourceMap:!1})},DwMB:function(t,e,i){"use strict";var n=i("J0i4"),a=i("yWLh"),l=i("SP/+"),c=i("g4Hp"),s=(i.n(c),i("vSiw"));e.a={components:{SectionTitle:n.a,DetailStyle:a.a,LabelText:l.a,CommunityManage:s.default},data:function(){var t=this;return{detail:{},openTip:!1,basicInfo:{},incomeType:null,dealDate:"",ctime:"",listInfo:[],totalCount:0,pageSize:15,Params:{page:1,pageSize:15},itemDetail:{},managerCount:0,mbrName:"",companyInfo:{},cmtIds:"",companyColumns:[{title:"社区名称",key:"cmtName",align:"center"},{title:"当前入驻状态",key:"enterStatusDesc",align:"center"},{title:"该社区管理员数量",key:"managerNum",align:"center"}],list:[{title:"姓名",key:"mbrName",align:"center"},{title:"联系电话",key:"mbrPhone",align:"center"},{title:"邮箱",key:"mbrEmail",align:"center"},{title:"入驻社区",key:"enterCmtName",align:"center"},{title:"管理员",key:"isManager",align:"center",render:function(t,e){return"1"==e.row.isManager?"是":"否"}},{title:"管理的社区",key:"manageCmtName",align:"center"},{title:"操作",key:"operation",align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"text",size:"small"},style:{color:"#2b85e4"},on:{click:function(){t.setManager(i.row)}}},"设置管理员")])}}],companyList:[]}},mounted:function(){GLOBALSIDESWITCH("false"),this.getInfo()},methods:{setManager:function(t){this.itemDetail=t,this.hideTip()},getInfo:function(){var t=this,e=this.$route.params;this.Params.csrId=e.csrId,this.getCompanyInfo(e),this.$http.get("customer-manager-staff-list",this.Params).then(function(e){t.listInfo=e.data.items,t.totalCount=e.data.totalCount}).catch(function(e){t.$Notice.error({title:e.message})})},getCompanyInfo:function(t){var e=this;this.$http.get("customer-community-enter-info",{csrId:t.csrId}).then(function(t){e.companyInfo=t.data,e.companyList=t.data.enterList}).catch(function(t){e.$Notice.error({title:t.message})})},changePage:function(t){this.Params.page=t,this.getInfo()},hideTip:function(){this.openTip=!this.openTip},tipSubmit:function(){var t=this,e={mbrId:this.itemDetail.mbrId,cmtIds:this.cmtIds};console.log("Params",e),this.$http.post("edit-customer-manager",e).then(function(e){t.getInfo(),t.openTip=!1,t.$Notice.success({title:"设置管理员成功"})}).catch(function(e){t.$Notice.error({title:e.message})})},lowerSubmit:function(){this.Params.page=1,this.Params.mbrName=this.mbrName,this.getInfo()},getCheckData:function(t){this.cmtIds=t}}}},HifN:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-community-manage"},[i("div",{staticClass:"u-tip"},[t._v("\n        温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可；\n    ")]),i("div",{staticClass:"u-community-check-list"},[i("div",{staticClass:"u-all-check"},[i("Checkbox",{on:{"on-change":t.onCheckAll},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}},[t._v("全选")])],1),i("CheckboxGroup",{on:{"on-change":t.checkGroupChange},model:{value:t.checkAllGroup,callback:function(e){t.checkAllGroup=e},expression:"checkAllGroup"}},t._l(t.communityList,function(e){return i("Checkbox",{key:e.cmtId,attrs:{label:e.cmtId}},[t._v(t._s(e.cmtName))])}))],1)])},a=[],l={render:n,staticRenderFns:a};e.a=l},J0i4:function(t,e,i){"use strict";function n(t){i("pY0k")}var a=i("tBD1"),l=i("P67S"),c=i("VU/8"),s=n,o=c(a.a,l.a,!1,s,"data-v-872aada8",null);e.a=o.exports},Kozl:function(t,e,i){"use strict";e.a={name:"labelText",props:["label","inline","type"],data:function(){return{labeltextClass:"ui-labeltext",inlineClass:"inline",unlineClass:"unline"}},methods:{getClassName:function(){var t="ui-labeltext";return this.inline?t+=" ui-label-text-unline":t+=" ui-label-text-inline",t}}}},NpwQ:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ui-detail-layout"},[i("div",{staticClass:"ui-content-title"},[i("span",{staticClass:"ui-circle"},[t._v(t._s(t.info))])]),t._t("default")],2)},a=[],l={render:n,staticRenderFns:a};e.a=l},P67S:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.classType[t.type]},[t._v("\n    "+t._s(t.title)+"\n")])},a=[],l={render:n,staticRenderFns:a};e.a=l},RbUi:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".g-community-manage .u-tip{font-size:14px;color:#999}.g-community-manage .u-community-check-list{margin-top:16px;padding:0 26px}.g-community-manage .u-community-check-list .u-all-check{margin-bottom:12px}",""])},"SP/+":function(t,e,i){"use strict";function n(t){i("dhjp")}var a=i("Kozl"),l=i("61ld"),c=i("VU/8"),s=n,o=c(a.a,l.a,!1,s,null,null);e.a=o.exports},Ucgj:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.section-title[data-v-872aada8]{border-bottom:1px solid #e8e9e9;height:50px;font-size:16px;color:#666;line-height:50px;padding-left:25px;position:relative}.section-title[data-v-872aada8]:before{height:24px;border:2px solid #499df1;position:absolute;width:0;content:"";display:inline-block;top:12px;left:0}.section-detail-title[data-v-872aada8]{border-bottom:1px solid #e8e9e9;height:50px;font-size:16px;color:#666;line-height:50px;padding-left:15px;position:relative}',""])},btkF:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-setting-detail"},[i("SectionTitle",{attrs:{title:"设置企业管理员"}}),i("div",{staticClass:"m-detail-content"},[i("div",{staticClass:"u-company-info"},[i("Card",{attrs:{id:"u-step-one"}},[i("p",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[t._v("\n\t\t\t\t\t企业信息\n\t\t\t\t")]),i("LabelText",{attrs:{inline:!1,label:"企业名称："}},[t._v("\n                    "+t._s(t.companyInfo.csrName)+"\n                ")]),i("Table",{staticStyle:{"margin-bottom":"20px"},attrs:{columns:t.companyColumns,data:t.companyList}})],1)],1),i("div",{staticClass:"u-company-info"},[i("Card",{attrs:{id:"u-step-two"}},[i("p",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[t._v("\n\t\t\t\t\t员工信息\n\t\t\t\t")]),i("div",{staticClass:"u-search-box"},[i("div",{staticStyle:{float:"right"}},[i("Input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入员工姓名"},model:{value:t.mbrName,callback:function(e){t.mbrName=e},expression:"mbrName"}}),i("div",{staticClass:"m-search",on:{click:t.lowerSubmit}},[t._v("搜索")])],1)]),i("Table",{attrs:{border:"",columns:t.list,data:t.listInfo}}),t.totalCount>15?i("div",{staticStyle:{margin:"10px",height:"40px",overflow:"hidden"}},[i("div",{staticStyle:{float:"right"}},[i("Page",{attrs:{total:t.totalCount,"page-size":t.pageSize,"show-total":"","show-elevator":""},on:{"on-change":t.changePage}})],1)]):t._e()],1)],1)]),i("Modal",{attrs:{title:"提示","ok-text":"确定","cancel-text":"取消",width:"600"},model:{value:t.openTip,callback:function(e){t.openTip=e},expression:"openTip"}},[t.openTip?i("CommunityManage",{attrs:{detail:t.itemDetail},on:{checkData:t.getCheckData}}):t._e(),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("Button",{attrs:{type:"primary"},on:{click:t.tipSubmit}},[t._v("确定")]),i("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:t.hideTip}},[t._v("取消")])],1)],1)],1)},a=[],l={render:n,staticRenderFns:a};e.a=l},dhjp:function(t,e,i){var n=i("A7Ww");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("6397b5a0",n,!0,{sourceMap:!1})},gnYt:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.u-clearfix{zoom:1}.u-clearfix:after{clear:both;content:".";height:0;display:block;visibility:hidden}.left{float:left}.ui-detail-layout{padding:0 24px;font-size:14px;color:#333;line-height:14px}.ui-detail-layout .ui-content-title{margin-bottom:24px}.ui-detail-layout .ui-circle{font-weight:700}.ui-detail-layout .ui-circle:before{content:"";width:7px;height:7px;display:inline-block;border:1px solid #333;border-radius:100% 100%;margin-right:6px;vertical-align:middle;margin-top:-3px}',""])},hGt5:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".g-setting-detail{height:auto}.g-setting-detail .m-detail-content{margin-bottom:20px}.g-setting-detail .u-company-info{margin:30px}.g-setting-detail .u-company-info .ivu-card-head{background-color:#f7f7f7}.g-setting-detail .ui-labeltext{padding-left:0}.g-setting-detail .u-search-box{height:32px;margin:16px 0}.g-setting-detail .u-search-box .m-search{display:inline-block;padding:0 10px}.u-tip{text-align:center}",""])},lNj5:function(t,e,i){var n=i("gnYt");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("65d89b4e",n,!0,{sourceMap:!1})},mJcV:function(t,e,i){var n=i("RbUi");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("7d89f683",n,!0,{sourceMap:!1})},pY0k:function(t,e,i){var n=i("Ucgj");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("f811f5dc",n,!0,{sourceMap:!1})},tBD1:function(t,e,i){"use strict";e.a={props:{title:String,type:{default:"listTitle",type:String}},data:function(){return{classType:{listTitle:"section-title",detailTitle:"section-detail-title"}}}}},vSiw:function(t,e,i){"use strict";function n(t){i("mJcV")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("/FcJ"),l=i("HifN"),c=i("VU/8"),s=n,o=c(a.a,l.a,!1,s,null,null);e.default=o.exports},yWLh:function(t,e,i){"use strict";function n(t){i("lNj5")}var a=i("4O/J"),l=i("NpwQ"),c=i("VU/8"),s=n,o=c(a.a,l.a,!1,s,null,null);e.a=o.exports}});
//# sourceMappingURL=_csrId.013762e8702415466e4f.js.map