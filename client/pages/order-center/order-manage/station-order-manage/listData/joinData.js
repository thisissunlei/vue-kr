import dateUtils from 'vue-dateutils';
import utils from "~/plugins/utils";
import Buttons from "~/components/Buttons";
export default function () {
  return [
    {
      title: "订单编号",
      key: "orderNum",
      align: "center",
      minWidth: 116,
      render(h, params) {
        let headNum = params.row.orderNum.substring(0, 6);
        let middleNum = params.row.orderNum.substring(6, 14);
        let tailNum = params.row.orderNum.substring(
          14,
          params.row.orderNum.length
        );
        return h("div", [
          h("span", {}, headNum),
          h(
            "span",
            {
              style: { color: "#e96900" }
            },
            middleNum
          ),
          h("span", {}, tailNum)
        ]);
      }
    },
    {
      title: "客户名称",
      key: "customerName",
      align: "center",
      minWidth: 150,
      render(h, params) {
        var hideBtn = params.row.hideBtn;
        if (hideBtn) {
          return h("div", [
            h("div", {}, "*****"),
            h("div", {}, `销售员:${params.row.salerName}`)
          ]);
        }
        return <span class="u-txt">{params.row.customerName}</span>;
      }
    },
    {
      title: "社区名称",
      key: "communityName",
      align: "center",
      minWidth: 100,
      render(tag, params) {
        var communityName = params.row.communityName;
        if (communityName&&communityName.lastIndexOf("社区") == communityName.length - 2) {
          communityName = communityName.slice(0, communityName.length - 2);
        }
        return <span class="u-txt">{communityName}</span>;
      }
    },
    {
      title: "商品名称",
      key: "seatNames",
      align: "center",
      width: 100,
      render: (h, params) => {
        let setnames = params.row.seatNames;
        if (!setnames) {
          return;
        }
        let setArray = setnames.split("、");
        let lines = [];
        let copyNames = Array.from(setArray);
        while (copyNames.length > 0) {
          let strs = copyNames.splice(0, 5);
          lines.push(h("p", {}, strs.join("、")));
        }
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top"
              }
            },
            [
              h("div", [
                h(
                  "div",
                  {
                    style: {
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      width: "64px"
                    }
                  },
                  setnames
                )
              ]),
              h("div", { slot: "content" }, lines)
            ]
          )
        ]);
      }
    },
    {
      title: "服务费总额",
      key: "rentAmount",
      align: "center",
      minWidth: 100,
      render(tag, params) {
        if (!params.row.hideBtn) {
          var money = params.row.rentAmount
            ? utils.thousand(params.row.rentAmount)
            : params.row.rentAmount;
          return <span class="u-txt">{money}</span>;
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "履约保证金",
      key: "depositAmount",
      align: "center",
      minWidth: 100,
      render(tag, params) {
        if (!params.row.hideBtn) {
          var money = params.row.depositAmount
            ? utils.thousand(params.row.depositAmount)
            : params.row.depositAmount;
          return <span class="u-txt">{money}</span>;
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "订单类型",
      key: "orderType",
      align: "center",
      minWidth: 86,
      render(tag, params) {
        let lines = [];
        var orderType = {
          IN: "入驻服务订单",
          INCREASE: "增租服务订单",
          CONTINUE: "续租服务订单"
        };
        let typeName = "";
        for (var item in orderType) {
          typeName = orderType[item];
          if (item == params.row.orderType) {
            let styles = "display:inline-block;";
            let typeName = orderType[item];
            if (typeName.lastIndexOf("服务订单") == typeName.length - 4) {
              typeName = typeName.slice(0, typeName.length - 4);
            }
            if (params.row.orderStatus == "INVALID") {
              styles = "display:inline-block;text-decoration:line-through;";
            }
            // return <span class="u-txt">{typeName}</span>;
            lines.push(tag("p", { style: styles }, typeName));
          }
        }

        var orderStatus = {
          NOT_EFFECTIVE: "未生效",
          EFFECTIVE: "已生效",
          INVALID: "已作废"
        };
        for (var item in orderStatus) {
          if (item == params.row.orderStatus) {
            var style = {};
            if (item == "NOT_EFFECTIVE") {
              style = "u-red";
            }
            lines.push(
              tag(
                "p",
                { class: `u-txts ${style}` },
                "(" + orderStatus[item] + ")"
              )
            );
          }
        }
        return tag("div", lines);
      }
    },
    {
      title: "租赁期限",
      key: "ctime",
      align: "center",
      width: 120,
      render(tag, params) {
        let lines = [];
        lines.push(
          tag(
            "p",
            dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.startDate)
            ) + " 至"
          )
        );
        lines.push(
          tag(
            "p",
            dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.endDate))
          )
        );
        return tag("div", lines);
      }
    },
    {
      title: "生效时间",
      key: "ctime",
      align: "center",
      minWidth: 100,
      render(tag, params) {
        if (!params.row.effectDate) {
          return tag("div", "-");
        }
        let time = dateUtils.dateToStr(
          "YYYY-MM-DD  HH:mm:SS",
          new Date(params.row.effectDate)
        );
        if (time.split("  ").length == 2) {
          let t1 = time.split("  ")[0];
          let t2 = time.split("  ")[1];
          let lines = [];
          lines.push(tag("p", t1));
          lines.push(tag("p", t2));
          return tag("div", lines);
        }
        return time;
      }
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: 76,
      className: "col-operate",
      render: (tag, params) => {
        if (!params.row.hideBtn) {
          var btnRender = [
            tag(Buttons, {
              props: {
                type: "text",
                checkAction: "seat_order_view",
                label: "查看",
                styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
              },
              on: {
                click: () => {
                  this.jumpView(params);
                }
              }
            })
          ];
          if (params.row.orderStatus == "NOT_EFFECTIVE") {
            btnRender.push(
              tag(Buttons, {
                props: {
                  type: "text",
                  checkAction: "seat_order_contract_apply",
                  label: "申请合同",
                  styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
                },
                on: {
                  click: () => {
                    this.showApply(params);
                  }
                }
              }),
              tag(Buttons, {
                props: {
                  type: "text",
                  checkAction: "seat_order_release",
                  label: "作废",
                  styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
                },
                on: {
                  click: () => {
                    this.showNullify(params);
                  }
                }
              })
            );
            if (params.row.versionType != 1) {
              btnRender.push(
                tag(Buttons, {
                  props: {
                    type: "text",
                    checkAction:
                      params.row.orderType == "CONTINUE"
                        ? "seat_order_continue_edit"
                        : "seat_order_in_edit",
                    label: "编辑",
                    styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
                  },
                  on: {
                    click: () => {
                      this.jumpEdit(params);
                    }
                  }
                })
              );
            }
          }
          //合同按钮
          if (
            params.row.orderStatus == "EFFECTIVE" &&
            params.row.versionType != 1
          ) {
            btnRender.push(
              tag(Buttons, {
                props: {
                  type: "text",
                  checkAction: "seat_order_view",
                  label: "合同",
                  styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
                },
                on: {
                  click: () => {
                    this.gocontractlist(params);
                  }
                }
              })
            );
          }
          return tag("div", btnRender);
        }
      }
    }
  ]
}
