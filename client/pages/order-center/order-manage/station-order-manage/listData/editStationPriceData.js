/*
新建编辑订单商品价格明细列表列定义
*/

import dateUtils from "vue-dateutils";
import utils from "~/plugins/utils";
import Buttons from "~/components/Buttons";

export default function(isCoupon,priceDetail = false) {
  console.log('id',isCoupon);
  return [
    {
      type: "selection",
      width: 60,
      align: "center"
    },
    {
      title: "商品",
      key: "name",
      align: "center",
      render: (h, params) => {
        return h(
          "div",
          {
            style: {
              color: "#2b85e4",
              textAlign: "center",
              cursor: "pointer",
              textDecoration: "underline"
            },
            on: {
              click: () => {
                window.open(
                  "/inventory/goods-library/goods-detail?goodsType=" +
                    params.row.seatType +
                    "&id=" +
                    params.row.id || params.row.seatId,
                  "_blank"
                );
              }
            }
          },
          params.row.name
        );
      }
    },
    {
      title: "工位数",
      key: "capacity",
      align: "center"
    },
    {
      title: "商品定价",
      align: "center",
      key: "guidePrice",
      renderHeader: (h, params) => {
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
                h("span", "商品定价"),
                h("Icon", {
                  props: {
                    type: "information-circled"
                  }
                })
              ]),
              h("div", { slot: "content" }, "与《一房一价表》一致")
            ]
          )
        ]);
      }
    },
    {
      title: "标准月费",
      align: "center",
      key: "guidePrice",
      renderHeader: (h, params) => {
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
                h("span", "标准月费"),
                h("Icon", {
                  props: {
                    type: "information-circled"
                  }
                })
              ]),
              h("div", { slot: "content" }, "不能低于商品定价，会显示在合同上")
            ]
          )
        ]);
      },
      render: (h, params) => {
        let price = params.row.originalPrice;
        if (price == undefined) {
          price = params.row.guidePrice;
        }
        return h(
          "Input",
          {
            props: {
              min: params.row.guidePrice,
              value: price,
              disabled: isCoupon
            },
            on: {
              "on-change": event => {
                let e = event.target.value;
                if (isNaN(e)) {
                  e = params.row.guidePrice;
                }
                price = e;
              },
              "on-blur": () => {
                var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
                if (!pattern.test(price)) {
                  this.$Notice.error({
                    title: "单价不得多余小数点后两位"
                  });
                  var num2 = Number(price).toFixed(3);
                  price = num2.substring(0, num2.lastIndexOf(".") + 3);
                }
                if (price < params.row.guidePrice) {
                  price = params.row.guidePrice;
                  this.$Notice.error({
                    title: "单价不得小于" + params.row.guidePrice
                  });
                }
                this.changePrice(params.index, price);
              }
            }
          },
          "44"
        );
      }
    },
    {
      title: "当前折扣权限",
      key: "guidePrice",
      align: "center",
      render: (h, params) => {
        let discount = params.row.rightDiscount;
        if (discount == 10 || !discount) {
          params.row.rightDiscount = 10;
          return h("div", "-");
        } else {
          return h("div", discount + "折");
        }
      }
    },
    {
      title: "签约折扣",
      key: "discountNum",
      align: "center",
      renderHeader: (h, params) => {
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
                h("span", "签约折扣"),
                h("Icon", {
                  props: {
                    type: "information-circled"
                  }
                })
              ]),
              h("div", { slot: "content" }, [
                h("p", "不能输入低于折扣权限，不能大于10，"),
                h("p", "会显示在合同上")
              ])
            ]
          )
        ]);
      },
      render: (h, params) => {
        let discount = 10;
        let disabled = false;
        if (params.row.rightDiscount === 10) {
          disabled = true;
        }
        if (
          params.row.discountNum &&
          params.row.discountNum < params.row.rightDiscount
        ) {
          disabled = true;
        }
        if (params.row.discountNum && params.row.discountNum === 10) {
          params.row.discountNum = "";
          // disabled=true
        }
        return h(
          "Input",
          {
            props: {
              min: params.row.rightDiscount,
              max: 10,
              value: params.row.discountNum,
              disabled: disabled||isCoupon
            },
            on: {
              "on-change": event => {
                let e = event.target.value;
                if (isNaN(e)) {
                  e = "";
                }
                discount = e;
              },
              "on-blur": event => {
                let value = event.target.value;
                if (event.target.value === "") {
                  value = 10;
                }
                // if (discount === "") {
                //   discount = 10;
                // }
                var pattern = /[a-zA-Z]/;
                if (pattern.test(value) || isNaN(value)) {
                  this.$Notice.error({
                    title: "折扣必须填写数字"
                  });
                  value = 10;
                }
                value = Number(value);
                pattern = /^[0-9]+(.[0-9]{1,3})?$/;
                if (value && !pattern.test(value)) {
                  this.$Notice.error({
                    title: "折扣不得多余小数点后三位"
                  });
                  var num2 = Number(value).toFixed(5);
                  value = num2.substring(0, num2.lastIndexOf(".") + 4);
                }
                if (value < params.row.rightDiscount) {
                  value = params.row.rightDiscount;
                  this.$Notice.error({
                    title: "折扣不得小于" + params.row.rightDiscount
                  });
                }
                if (value > 10) {
                  this.$Notice.error({
                    title: "折扣不得大于" + 10
                  });
                  value = 10;
                }
                this.changeDiscount(params.index, value);
              }
            }
          },
          params.row.discountNum
        );
      }
    },
    {
      title: "签约月费",
      key: "discountedPrice",
      align: "center",
      renderHeader: (h, params) => {
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
                h("span", "签约月费"),
                h("Icon", {
                  props: {
                    type: "information-circled"
                  }
                })
              ]),
              h("div", { slot: "content" }, "签约月费=标准月费*签约折扣%")
            ]
          )
        ]);
      }
    },
    {
      title: "服务费小计",
      key: "amount",
      align: "center",
      renderHeader: (h, params) => {
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
                h("span", "服务费小计"),
                h("Icon", {
                  props: {
                    type: "information-circled"
                  }
                })
              ]),
              h("div", { slot: "content" }, [
                h("p", "服务费小计=签约月费*签约时长"),
                h("p", "(签约时长不是整月的部分会换算为零散天)")
              ])
            ]
          )
        ]);
      },
      render(h, params) {
        return h("span", {}, utils.thousand(params.row.amount));
      }
    },
    {
      title: "操作",
      key: "guidePrice",
      align: "center",
      render: (h, params) => {
        let price = params.row.originalPrice;
        let btns = [
          h(
            "div",
            {
              props: {
                min: params.row.guidePrice,
                value: params.row.originalPrice
              },
              style: {
                color: "rgb(43, 133, 228)",
                textAlign: "center",
                cursor: "pointer"
              },
              on: {
                click: () => {
                  console.log("删除商品明细行", params.row._index);
                  this.delStationByIndex(params.row._index);
                }
              }
            },
            "删除"
          )
        ];
        if (priceDetail) {
          btns.push(
            h(Buttons, {
              props: {
                type: "text",
                label: "明细",
                checkAction: "seat_order_view",
                styles: "color:rgb(43, 133, 228);padding: 2px 7px;",
                disabled: isCoupon
              },
              on: {
                click: () => {
                  this.getServiceDetail(params.row);
                }
              }
            })
          );
        }
        return h("div", btns);
      }
    }
  ];
}
