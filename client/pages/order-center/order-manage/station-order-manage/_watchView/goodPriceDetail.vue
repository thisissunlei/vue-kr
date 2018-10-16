<template>
  <div>
    <Table border
      ref="selection"
      :columns="columns"
      :data="stationList"></Table>
  </div>
</template>

<script>
import utils from '~/plugins/utils';

export default {
  props: {
    stationList: {
      type: Array,
      default: () => []
    },
    discountCreaterName:{
      style:String,
      default:''
    },
    discountReason:{
      style:String,
      default:''
    },
  },
  data() {
    return {
      columns: [
        {
          title: '商品',
          key: 'seatName',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                color: '#2b85e4',
                textAlign: 'center',
                cursor: 'pointer',
                textDecoration: 'underline'
              },
              on: {
                click: () => {
                  window.open('/inventory/goods-library/goods-detail?goodsType=' + params.row.seatType + '&id=' +params.row.seatId, '_blank')
                }
              }
            }, params.row.seatName)
          }
        },
        {
          title: '工位类型',
          key: 'seatType',
          align: 'center'
        },
        {
          title: '工位数',
          key: 'capacity',
          align: 'center'
        },
        {
          title: '商品定价',
          key: 'guidePrice',
          align: 'center',
          render: function (h, params) {
            return h('span', {}, utils.thousand(params.row.guidePrice))
          }
        },
        {
          title: '标准月费',
          key: 'price',
          align: 'center',
          render: function (h, params) {
            return h('span', {}, utils.thousand(params.row.price))
          }
        },
        {
          title: '签约折扣',
          key: 'discountNum',
          align: 'center',
        },
        {
          title: '签约月费',
          key: 'originalPrice',
          align: 'center',
          render: function (h, params) {
            return h('span', {}, utils.thousand(params.row.originalPrice))
          }
        },
        {
          title: '服务费小计',
          key: 'originalAmount',
          align: 'center',
          render: function (h, params) {
            return h('span', {}, utils.thousand(params.row.originalAmount))
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
