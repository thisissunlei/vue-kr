<template>
    <div class="seat-info-card-container ivu-collapse">
        <SeatFeeCard v-for="item in data" :key="getKey()" :columns="columns" :data="getData(item)"></SeatFeeCard>
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
    props: {
        data: {
            type: Array,
            default: () => []
        }
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
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.startDate)) + '  至  ' + dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.endDate));
                        return h('span', time)
                    }
                },
                {
                    title: '服务费计算说明',
                    key: 'feeDesc',
                    align: 'center',
                    width: 170,
                },
                {
                    title: '单价',
                    key: 'priceDesc',
                    align: 'center',
                    width: 130,
                    className: "colPadRight",
                },
                {
                    title: '数量',
                    key: 'countDesc',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '小计',
                    key: 'amount',
                    align: 'center',
                    className: "colPadRight",
                    width: 100,
                    render: (h, params) => {
                        if (params.row.amount) {
                            return h('div', '¥' + utils.thousand((params.row.amount).toFixed(2)))
                        }

                    }
                },
            ],
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
        // this.formatData();
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
.seat-info-card-container {
    width: 793px;
    padding-bottom: 15px;
}
</style>
