import dateUtils from 'vue-dateutils';
import utils from "~/plugins/utils";
import Buttons from "~/components/Buttons";
export default function () {
  return [
    {
      title: "订单编号",
      key: "orderNum",
      align: "center",
      width: 116,
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
        if (communityName.lastIndexOf("社区") == communityName.length - 2) {
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
          lines.push(h("p", copyNames.splice(0, 5).join("、")));
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
      render(h, params) {
        if (!params.row.hideBtn) {
          var money = params.row.rentAmount
            ? utils.thousand(params.row.rentAmount)
            : params.row.rentAmount;
          return h("div", [
            h(
              "span",
              {
                props: {
                  class: "u-txt"
                }
              },
              money
            )
          ]);
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "服务保证金",
      key: "depositAmount",
      align: "center",
      render(h, params) {
        if (!params.row.hideBtn) {
          var money = params.row.depositAmount
            ? utils.thousand(params.row.depositAmount)
            : params.row.depositAmount;
          return h("div", [
            h(
              "span",
              {
                props: {
                  class: "u-txt"
                }
              },
              money
            )
          ]);
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "服务期限",
      key: "startDate",
      align: "center",
      width: 120,
      render(h, params) {
        // let time= dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.startDate))+'至'+dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.endDate))
        // return h('span',time)
        let lines = [];
        lines.push(
          h(
            "p",
            dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.startDate)
            ) + " 至"
          )
        );
        lines.push(
          h(
            "p",
            dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.endDate))
          )
        );
        return h("div", lines);
      }
    },
    {
      title: "旧服务费退还",
      key: "refundRentAmount",
      minWidth: 120,
      align: "center",
      render(h, params) {
        if (!params.row.hideBtn) {
          var money = params.row.refundRentAmount
            ? utils.thousand(params.row.refundRentAmount)
            : params.row.refundRentAmount;
          return h("div", [
            h(
              "span",
              {
                props: {
                  class: "u-txt"
                }
              },
              money
            )
          ]);
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "保证金旧转新",
      key: "transferDepositAmount",
      minWidth: 120,
      align: "center",
      render(h, params) {
        if (!params.row.hideBtn) {
          var money = params.row.transferDepositAmount
            ? utils.thousand(params.row.transferDepositAmount)
            : params.row.transferDepositAmount;
          return h("div", [
            h(
              "span",
              {
                props: {
                  class: "u-txt"
                }
              },
              money
            )
          ]);
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "扣除保证金",
      key: "deductRentAmount",
      minWidth: 120,
      align: "center",
      render(h, params) {
        if (!params.row.hideBtn) {
          var money = params.row.deductRentAmount
            ? utils.thousand(params.row.deductRentAmount)
            : params.row.deductRentAmount;
          return h("div", [
            h(
              "span",
              {
                props: {
                  class: "u-txt"
                }
              },
              money
            )
          ]);
        } else {
          return <span class="u-txt">*****</span>;
        }
      }
    },
    {
      title: "订单状态",
      key: "orderStatusName",
      align: "center"
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
  ];
}
