webpackJsonp([166],{"/FcJ":function(t,c,e){"use strict";c.a={props:{detail:{type:Object,default:{}}},data:function(){return{communityList:[],indeterminate:!0,checkAll:!1,checkAllGroup:[],checkList:""}},created:function(){this.getCommunityList()},mounted:function(){},methods:{getCommunityList:function(){var t=this,c=this.$route.params,e={csrId:c.csrId,mbrId:this.detail.mbrId};this.$http.get("get-manage-cmt-list",e).then(function(c){t.communityList=c.data.cmtList;var e=[];c.data.cmtList.map(function(t){"1"==t.isManager&&e.push(t.cmtId)}),t.checkAllGroup=e,t.checkAllGroup.length==t.communityList.length?t.checkAll=!0:t.checkAll=!1}).catch(function(c){t.$Notice.error({title:c.message})})},onCheckAll:function(){var t=[];this.checkAll?(this.communityList.map(function(c){t.push(c.cmtId)}),this.checkAllGroup=[].concat(t),this.checkList=t.join(",")):(this.checkAllGroup=[],this.checkList=""),this.$emit("checkData",this.checkList)},checkGroupChange:function(t){var c=[].concat(this.checkAllGroup);this.checkList=c.join(","),c.length==this.communityList.length?this.checkAll=!0:this.checkAll=!1,this.$emit("checkData",this.checkList)}}}},HifN:function(t,c,e){"use strict";var i=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",{staticClass:"g-community-manage"},[e("div",{staticClass:"u-tip"},[t._v("\n        温馨提示：如需取消该员工管理员身份，将所有社区取消勾选并点击“确认”即可；\n    ")]),e("div",{staticClass:"u-community-check-list"},[e("div",{staticClass:"u-all-check"},[e("Checkbox",{on:{"on-change":t.onCheckAll},model:{value:t.checkAll,callback:function(c){t.checkAll=c},expression:"checkAll"}},[t._v("全选")])],1),e("CheckboxGroup",{on:{"on-change":t.checkGroupChange},model:{value:t.checkAllGroup,callback:function(c){t.checkAllGroup=c},expression:"checkAllGroup"}},t._l(t.communityList,function(c){return e("Checkbox",{key:c.cmtId,attrs:{label:c.cmtId}},[t._v(t._s(c.cmtName))])}))],1)])},n=[],s={render:i,staticRenderFns:n};c.a=s},RbUi:function(t,c,e){c=t.exports=e("FZ+f")(!1),c.push([t.i,".g-community-manage .u-tip{font-size:14px;color:#999}.g-community-manage .u-community-check-list{margin-top:16px;padding:0 26px}.g-community-manage .u-community-check-list .u-all-check{margin-bottom:12px}",""])},mJcV:function(t,c,e){var i=e("RbUi");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("7d89f683",i,!0,{sourceMap:!1})},vSiw:function(t,c,e){"use strict";function i(t){e("mJcV")}Object.defineProperty(c,"__esModule",{value:!0});var n=e("/FcJ"),s=e("HifN"),o=e("VU/8"),l=i,a=o(n.a,s.a,!1,l,null,null);c.default=a.exports}});
//# sourceMappingURL=communityManage.cbf353c4ac0e8ca57e62.js.map