<template>
  <div>
    <Table border
      ref="selection"
      :columns="columns"
      :data="stationList"></Table>
  </div>
</template>

<script>
export default {
  props: {
    stationList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
       
        {
          title: '商品',
          key: 'name',
          align: 'center'
        },
        {
          title: '工位数',
          key: 'capacity',
          align: 'center'
        },
        {
          title: '商品定价',
          align: 'right',
          key: 'guidePrice',
        },
        {
          title: '标准月费',
          key: 'guidePrice',
          align: 'center',
          render: (h, params) => {
            let price = params.row.originalPrice;
            return h('Input', {
              props: {
                min: params.row.guidePrice,
                value: params.row.originalPrice,
              },
              on: {
                'on-change': (event) => {
                  let e = event.target.value;
                  if (isNaN(e)) {
                    e = params.row.guidePrice
                  }
                  price = e;
                },
                'on-blur': () => {
                  var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
                  if (price && !pattern.test(price)) {
                    this.$Notice.error({
                      title: '单价不得多余小数点后两位'
                    })
                    var num2 = Number(price).toFixed(3);
                    price = num2.substring(0, num2.lastIndexOf('.') + 3)
                  }
                  if (price < params.row.guidePrice) {
                    price = params.row.guidePrice
                    this.$Notice.error({
                      title: '单价不得小于' + params.row.guidePrice
                    })
                  }
                  this.changePrice(params.index, price)
                }
              }
            }, '44')

          }
        },
        {
          title: '当前折扣权限',
          key: 'guidePrice',
          align: 'center',
          render: (h, params) => {
            let discount = params.row.rightDiscount;
            if (discount == 10 || !discount) {
              params.row.rightDiscount = 10
              return h('div', '-')
            }
            else {
              return h('div', discount + '折')
            }
          }
        },
        {
          title: '签约折扣',
          key: 'discountNum',
          align: 'center',
          render: (h, params) => {
            let discount = 10;
            return h('Input', {
              props: {
                min: params.row.rightDiscount,
                value: params.row.discountNum,
                disabled: params.row.rightDiscount === 10,
              },
              on: {
                'on-change': (event) => {
                  let e = event.target.value;
                  if (isNaN(e)) {
                    e = ''
                  }
                  discount = e;
                },
                'on-blur': (event) => {
                  var pattern = /^[0-9]+(.[0-9]{1,3})?$/;
                  if (discount && !pattern.test(discount)) {
                    this.$Notice.error({
                      title: '单价不得多余小数点后三位'
                    })
                    var num2 = Number(discount).toFixed(5);
                    discount = num2.substring(0, num2.lastIndexOf('.') + 4)
                  }
                  if (discount < params.row.rightDiscount) {
                    discount = params.row.rightDiscount
                    this.$Notice.error({
                      title: '折扣不得小于' + params.row.rightDiscount
                    })
                  }
                  this.changeDiscount(params.index, discount)
                }
              }
            }, params.row.discountNum)
          }
        },
        {
          title: '签约月费',
          key: 'guidePrice',
          align: 'right',
        },
        {
          title: '服务费小计',
          key: 'originalAmount',
          align: 'right',
          render: function (h, params) {
            return h('span', {}, utils.thousand(params.row.originalAmount))
          }
        },
        {
          title: '操作',
          key: 'guidePrice',
          align: 'center',
          render: (h, params) => {
            let price = params.row.originalPrice;
            return h('div', {
              props: {
                min: params.row.guidePrice,
                value: params.row.originalPrice,
              },
              style: {
                color: 'rgb(43, 133, 228)',
                textAlign: 'center',
                cursor: 'pointer'
              },
              on: {
                'click': () => {
                  console.log('删除商品明细行', params.row._index)
                  this.deleteStationByIndex(params.row._index)
                },
              }
            }, '删除')

          }
        },


      ],
    }
  },
  methods: {

  },
}
</script>

<style lang="less">
</style>
