webpackJsonp([162],{"8hl8":function(t,e,a){"use strict";var i=a("woOf"),s=a.n(i);a("/5sW");e.a={props:{close:Function,params:Object},data:function(){return{dateError:!1,validate:{cmtId:"",csrId:"",leaveDate:""},ruleValidate:{cmtId:[{required:!0,message:"社区名称为必填项"}],csrId:[{required:!0,message:"客户名称为必填项"}],leaveDate:[{required:!0,message:"撤场日期为必填项"}]},customerList:[],communityList:[]}},mounted:function(){this.getCommunityList()},methods:{getCommunityList:function(){var t=this;this.$http.get("join-bill-community","",function(e){t.communityList=e.data.items},function(e){t.$Notice.error({title:e.message})})},getCustomerList:function(){var t=this;if(this.validate.cmtId){var e={communityId:this.validate.cmtId};this.$http.get("get-from-field-customer",e,function(e){t.customerList=e.data},function(e){t.$Notice.error({title:e.message})})}}},updated:function(){var t=!1,e=!1;for(var a in this.validate)this.validate[a]||(e=!0);e||(t=s()({},this.validate)),this.$emit("newPageData",t)}}},EFIf:function(t,e,a){"use strict";function i(t){a("x7sp")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("8hl8"),l=a("uNmL"),r=a("VU/8"),c=i,o=r(s.a,l.a,!1,c,"data-v-e4b0ffce",null);e.default=o.exports},uNmL:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Form",{ref:"fromFieldValidate",attrs:{model:t.validate,rules:t.ruleValidate,"label-position":"top"}},[a("FormItem",{staticClass:"bill-search-class",attrs:{label:"社区名称",prop:"cmtId"}},[a("Select",{staticStyle:{width:"252px"},attrs:{placeholder:"请输入社区名称",filterable:"",clearable:""},on:{"on-change":t.getCustomerList},model:{value:t.validate.cmtId,callback:function(e){t.$set(t.validate,"cmtId",e)},expression:"validate.cmtId"}},t._l(t.communityList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{staticClass:"bill-search-class",attrs:{label:"客户名称",prop:"csrId"}},[a("Select",{staticStyle:{width:"252px"},attrs:{placeholder:"请输入客户名称",filterable:"",clearable:""},model:{value:t.validate.csrId,callback:function(e){t.$set(t.validate,"csrId",e)},expression:"validate.csrId"}},t._l(t.customerList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{staticClass:"bill-search",attrs:{label:"撤场日期",prop:"leaveDate"}},[a("DatePicker",{staticStyle:{width:"252px"},attrs:{type:"date",placeholder:"请选择撤场日期"},model:{value:t.validate.leaveDate,callback:function(e){t.$set(t.validate,"leaveDate",e)},expression:"validate.leaveDate"}})],1)],1)},s=[],l={render:i,staticRenderFns:s};e.a=l},x7sp:function(t,e,a){var i=a("zRWw");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("19cff080",i,!0,{sourceMap:!1})},zRWw:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".bill-search-class[data-v-e4b0ffce]{width:50%}.bill-search-class[data-v-e4b0ffce],.bill-search[data-v-e4b0ffce]{display:inline-block;padding-left:32px}.bill-search .u-date-txt[data-v-e4b0ffce]{padding:0 25px;font-size:14px;color:#666}",""])}});
//# sourceMappingURL=NewPage.6561dad805bb16c89e49.js.map