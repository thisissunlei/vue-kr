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
          align: 'center',
          render: (h, params) => {
            let type = params.row.seatType;
            let typeName = "开放工位";
            if (type == "SPACE") {
              typeName = "独立办公室";
            } else {
              typeName = "开放工位";
            }
            return h('span',typeName);
          }
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
          render (h, params) {
            return h('span', {}, utils.thousand(params.row.guidePrice))
          }
        },
        {
          title: '标准月费',
          key: 'originalPrice',
          align: 'center',
          render (h, params) {
            return h('span', {}, utils.thousand(params.row.originalPrice))
          }
        },
        {
          title: '签约折扣',
          key: 'discountNum',
          align: 'center',
          render (h, params) {
            let str='-'
            if (params.row.discountNum) {
              str=params.row.discountNum
            }
            if (params.row.discountNum&&params.row.discountNum==10) {
              str='-'
            }
            return h('span',str)
          }
        },
        {
          title: '签约月费',
          key: 'discountedPrice',
          align: 'center',
          render (h, params) {
            return h('span', {}, utils.thousand(params.row.discountedPrice))
          }
        },
        {
          title: '服务费小计',
          key: 'amount',
          align: 'center',
          render (h, params) {
            return h('span', {}, utils.thousand(params.row.amount))
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
