<template>
    <div class='seat-info-card-container ivu-collapse'>
        <SeatFeeCard v-for='item in dataList' :key='getKey()' :columns='columns' :data='getData(item)'></SeatFeeCard>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import uuid from 'uuid'
import SeatFeeCard from './seatFeeCard.vue'

export default {
    components: {
        SeatFeeCard
    },
    data() {
        return {
            columns: [
                {
                    title: '服务期',
                    key: 'servicePriod',
                    align: 'center',
                    width: 200,
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.startDate)) + '  至  ' + dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.endDate));
                        return h('span', time)
                    }
                },
                {
                    title: '服务费计算说明',
                    key: 'feeCalDesc',
                    align: 'center',
                    width: 170,
                },
                {
                    title: '单价',
                    key: 'price',
                    align: 'center',
                    width:130,
                    className: "colPadRight",
                    render(h, params) {
                        let priceStr = `${params.row.price}元/月/${params.row.type.substr(-2)}`
                        return h('span', priceStr)
                    }
                },
                {
                    title: '数量',
                    key: 'count',
                    align: 'center',
                    width: 150,
                    render(h, params) {
                        let countStr = `${params.row.month}月*${params.row.seatCount}${params.row.type.substr(-2)}`
                        return h('span', countStr)
                    }
                },
                {
                    title: '小计',
                    key: 'sum',
                    align: 'center',
                    className: "colPadRight",
                    width: 100,
                    render: (h, params) => {
                        let price = params.row.price
                        let month = params.row.month
                        let seatCount = params.row.seatCount
                        if (price && month && seatCount) {
                            let amount = 1 * price * month * seatCount;
                            if (amount) {
                                return h('div', '¥' + utils.thousand((amount).toFixed(2)))
                            }
                        }
                    }
                },
            ],
            dataList: [],
            dataListDemo: [
                {
                    type: '工位',
                    seats: '03001—03004,03006',
                    startDate: 1331886394915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 30,
                    seatCount: 50,
                },
                {
                    type: '独立房间',
                    seats: '301—304,306',
                    startDate: 1531886894915,
                    endDate: 1531486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 3,
                    seatCount: 5,
                },
                {
                    type: '独立房间',
                    seats: '301—304',
                    startDate: 1931886794915,
                    endDate: 1231486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 1200,
                    month: 6,
                    seatCount: 3,
                },
                {
                    type: '工位',
                    seats: '03001—03004,03006',
                    startDate: 1131886394915,
                    endDate: 3031486374915,
                    feeCalDesc: '整月以月计算服务费',
                    price: 200,
                    month: 8,
                    seatCount: 9,
                }
            ]
        }
    },
    mounted() {
        this.formatData();
    },
    methods: {
        formatData() {
            this.dataList = [].concat(this.dataListDemo)
        },

        getData(item) {
            let data = [];
            data.push(item)
            return data
        },
        getKey() {
            return uuid.v1()
        }
    }
}
</script>

<style lang="less">
.seat-info-card-container{
    width: 793px;
}
</style>
