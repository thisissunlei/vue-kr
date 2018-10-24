import dateUtils from "vue-dateutils";
import utils from "~/plugins/utils";
import Buttons from "~/components/Buttons";
export default function() {
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
      align: "right",
      key: "guidePrice"
    },
    {
      title: "标准单价（元/月）",
      key: "guidePrice",
      render: (h, params) => {
        let price = params.row.originalPrice;
        return h(
          "Input",
          {
            props: {
              min: params.row.guidePrice,
              value: params.row.originalPrice
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
              value: params.row.discountNum,
              disabled: disabled
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
                if (discount === "") {
                  discount = 10;
                }
                var pattern = /^[0-9]+(.[0-9]{1,3})?$/;
                if (discount && !pattern.test(discount)) {
                  this.$Notice.error({
                    title: "单价不得多余小数点后三位"
                  });
                  var num2 = Number(discount).toFixed(5);
                  discount = num2.substring(0, num2.lastIndexOf(".") + 4);
                }
                if (discount < params.row.rightDiscount) {
                  discount = params.row.rightDiscount;
                  this.$Notice.error({
                    title: "折扣不得小于" + params.row.rightDiscount
                  });
                }
                this.changeDiscount(params.index, discount);
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
      align: "right"
    },
    {
      title: "服务费小计",
      key: "amount",
      align: "right",
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
        return h("div", [
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
                  this.deleteDtation(params.row._index);
                }
              }
            },
            "删除"
          ),
          h(Buttons, {
            props: {
              type: "text",
              label: "明细",
              checkAction: "seat_order_view",
              styles: "color:rgb(43, 133, 228);padding: 2px 7px;"
            },
            on: {
              click: () => {
                this.getServiceDetail(params.row);
              }
            }
          })
        ]);
      }
    }
  ];
}
