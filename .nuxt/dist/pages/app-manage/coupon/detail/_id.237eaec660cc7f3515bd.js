webpackJsonp([99],{"4O/J":function(t,e,i){"use strict";e.a={name:"detailStyle",props:["info"]}},"5OjN":function(t,e,i){"use strict";function a(t){i("90JH")}Object.defineProperty(e,"__esModule",{value:!0});var l=i("o1OA"),n=i("NxMj"),s=i("VU/8"),o=a,r=s(l.a,n.a,!1,o,null,null);e.default=r.exports},"61ld":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.getClassName()},[i("div",{staticClass:"ui-label",class:{circle:"circle"==t.type}},[t._v("\n\t\t"+t._s(t.label)+"\n\t")]),i("div",{staticClass:"ui-text"},[t._t("default")],2)])},l=[],n={render:a,staticRenderFns:l};e.a=n},"67sL":function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".g-member-welfare-detail .m-detail-content{padding:30px 24px}.g-member-welfare-detail .u-img-content{width:100%;display:inline-block;margin-bottom:6px}.g-member-welfare-detail .u-img-content .u-img-title{float:left;color:#333;margin-left:14px}.g-member-welfare-detail .u-img-content .u-img-url{max-width:132px;float:left;margin-bottom:30px}.g-member-welfare-detail .u-table{padding:0 20px}.g-member-welfare-detail .u-table .u-page{margin:10px;padding-bottom:5px;overflow:hidden}",""])},"90JH":function(t,e,i){var a=i("67sL");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("460b0bde",a,!0,{sourceMap:!1})},A7Ww:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.ui-labeltext{width:45%;height:14px;font-size:14px;color:#333;line-height:14px;padding-left:14px;margin-bottom:24px;display:inline-block}.ui-labeltext .circle:before{content:"";display:inline-block;width:8px;height:8px;border:1px solid #333;border-radius:5px}.ui-labeltext .ui-label{font-weight:700;line-height:20px}.ui-label-text-inline .ui-label,.ui-label-text-inline .ui-text{display:inline-block}.ui-label-text-unline .ui-label{margin-bottom:8px}.ui-label-text-unline .ui-label,.ui-label-text-unline .ui-text{display:block}',""])},J0i4:function(t,e,i){"use strict";function a(t){i("pY0k")}var l=i("tBD1"),n=i("P67S"),s=i("VU/8"),o=a,r=s(l.a,n.a,!1,o,"data-v-872aada8",null);e.a=r.exports},Kozl:function(t,e,i){"use strict";e.a={name:"labelText",props:["label","inline","type"],data:function(){return{labeltextClass:"ui-labeltext",inlineClass:"inline",unlineClass:"unline"}},methods:{getClassName:function(){var t="ui-labeltext";return this.inline?t+=" ui-label-text-unline":t+=" ui-label-text-inline",t}}}},NpwQ:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ui-detail-layout"},[i("div",{staticClass:"ui-content-title"},[i("span",{staticClass:"ui-circle"},[t._v(t._s(t.info))])]),t._t("default")],2)},l=[],n={render:a,staticRenderFns:l};e.a=n},NxMj:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-member-welfare-detail"},[i("SectionTitle",{attrs:{title:"会员福利-福利详情"}}),i("div",{staticClass:"m-detail-content"},[i("DetailStyle",{attrs:{info:"基本信息"}},[i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"创建人："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"创建时间："}},[t._v("\n                  "+t._s(t.basicInfo.incomeType)+"\n                ")])],1),i("DetailStyle",{attrs:{info:"领取信息"}},[i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"会员点击次数："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"会员已领取数量："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")])],1),i("DetailStyle",{attrs:{info:"展示信息"}},[i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"福利类型："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"福利标题："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"福利面值："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("div",{staticClass:"u-img-content"},[i("div",{staticClass:"u-img-title"},[t._v("福利封面：")]),i("div",[i("img",{staticClass:"u-img-url",attrs:{src:t.basicInfo.imgUrl}}),t._v(t._s(t.basicInfo.imgUrl?"":"无"))])]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"福利标签："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")])],1),i("DetailStyle",{attrs:{info:"福利限制"}},[i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"领取有效期："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"可抵扣账单期限："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"发放总数量："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"每个团队限领数量："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")]),i("LabelText",{staticStyle:{width:"1100px"},attrs:{label:"每个会员限领数量："}},[t._v("\n                  "+t._s(t.basicInfo.id)+"\n                ")])],1),i("DetailStyle",{attrs:{info:"领取记录"}},[i("div",{staticClass:"u-table"},[i("Table",{attrs:{border:"",columns:t.columns,data:t.couponList}}),i("div",{staticClass:"u-page"},[i("div",{staticStyle:{float:"right"}},[i("Page",{attrs:{current:t.page,total:t.totalCount,"page-size":t.pageSize,"show-total":"","show-elevator":""},on:{"on-change":t.changePage}})],1)])],1)])],1)],1)},l=[],n={render:a,staticRenderFns:l};e.a=n},P67S:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.classType[t.type]},[t._v("\n    "+t._s(t.title)+"\n")])},l=[],n={render:a,staticRenderFns:l};e.a=n},"SP/+":function(t,e,i){"use strict";function a(t){i("dhjp")}var l=i("Kozl"),n=i("61ld"),s=i("VU/8"),o=a,r=s(l.a,n.a,!1,o,null,null);e.a=r.exports},Ucgj:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.section-title[data-v-872aada8]{border-bottom:1px solid #e8e9e9;height:50px;font-size:16px;color:#666;line-height:50px;padding-left:25px;position:relative}.section-title[data-v-872aada8]:before{height:24px;border:2px solid #499df1;position:absolute;width:0;content:"";display:inline-block;top:12px;left:0}.section-detail-title[data-v-872aada8]{border-bottom:1px solid #e8e9e9;height:50px;font-size:16px;color:#666;line-height:50px;padding-left:15px;position:relative}',""])},dhjp:function(t,e,i){var a=i("A7Ww");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("6397b5a0",a,!0,{sourceMap:!1})},gnYt:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,'.u-clearfix{zoom:1}.u-clearfix:after{clear:both;content:".";height:0;display:block;visibility:hidden}.left{float:left}.ui-detail-layout{padding:0 24px;font-size:14px;color:#333;line-height:14px}.ui-detail-layout .ui-content-title{margin-bottom:24px}.ui-detail-layout .ui-circle{font-weight:700}.ui-detail-layout .ui-circle:before{content:"";width:7px;height:7px;display:inline-block;border:1px solid #333;border-radius:100% 100%;margin-right:6px;vertical-align:middle;margin-top:-3px}',""])},lNj5:function(t,e,i){var a=i("gnYt");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("65d89b4e",a,!0,{sourceMap:!1})},o1OA:function(t,e,i){"use strict";var a=i("J0i4"),l=i("yWLh"),n=i("SP/+"),s=i("g4Hp");i.n(s);e.a={components:{DetailStyle:l.a,LabelText:n.a,SectionTitle:a.a},data:function(){return{basicInfo:{},couponList:[],pageSize:15,page:1,totalCount:0,columns:[{title:"序号",key:"mbrName",align:"center"},{title:"姓名",key:"mbrName",align:"center"},{title:"手机号",key:"mbrName",align:"center"},{title:"所在社区",key:"mbrName",align:"center"},{title:"所属团队",key:"mbrName",align:"center"},{title:"领取时间",key:"mbrName",align:"center"}]}},mounted:function(){GLOBALSIDESWITCH("false"),this.couponList=[{mbrName:111}]},methods:{getInfo:function(){var t=this,e=this.$route.params,i={notificationId:e.notificationId};this.$http.get("get-notification-detail",i).then(function(e){var i=e.data;i.jump=jumplist[i.jumpType],t.targetDetail=i.targetDetail||"",t.basicInfo=i}).catch(function(e){t.$Notice.error({title:e.message})})},changePage:function(t){this.tabParams.page=t,this.page=t,this.getTableData(this.tabParams)}}}},pY0k:function(t,e,i){var a=i("Ucgj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("f811f5dc",a,!0,{sourceMap:!1})},tBD1:function(t,e,i){"use strict";e.a={props:{title:String,type:{default:"listTitle",type:String}},data:function(){return{classType:{listTitle:"section-title",detailTitle:"section-detail-title"}}}}},yWLh:function(t,e,i){"use strict";function a(t){i("lNj5")}var l=i("4O/J"),n=i("NpwQ"),s=i("VU/8"),o=a,r=s(l.a,n.a,!1,o,null,null);e.a=r.exports}});
//# sourceMappingURL=_id.237eaec660cc7f3515bd.js.map