<template>
    <div class="order-info-container">
        <div class='info-title'>
            <span class='order-number'>{{nunber}}</span>
            <span class='order-amount'>{{amount}}</span>
        </div>
        <div class='order-fees-stages'>
            <!-- <Table border :columns="feesStagesColumns" :data="feesStagesDatas"></Table> -->
        </div>
        <div class='order-fees-bill'>
            <Table border :columns="billDetailColumns" :data="billDetailData"></Table>
        </div>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
export default {
    data() {
        return {
            nunber: '入驻订单—DD021806121624360001（18.01.01至18.12.31）',
            amount: '¥' + utils.thousand((1200000).toFixed(2)),

            billDetailColumns: [
                {
                    title: '账单类型—编号',
                    align: 'center',
                    width: 260,
                    key: 'billNo',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style: {
                                    color: '#2b85e4',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.jump2OrderDetail(params.row.id)
                                    }
                                }
                            },
                            params.row.billNo)
                    }
                },
                {
                    title: '费用类型',
                    align: 'center',
                    key: 'feeName'
                },
                {
                    title: '最晚付款日',
                    align: 'center',
                    key: 'lastPayDay',
                    render(tag, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.lastPayDay))
                        return tag('span', time)
                    }
                },
                {
                    title: '账单金额',
                    align: 'center',
                    key: 'needPaid',
                    className: "colPadRight",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.needPaid).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '已付金额',
                    align: 'center',
                    key: 'paid',
                    className: "colPadRight amount",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.paid).toFixed(2))
                        let obj = { clear: false }
                        if (Number(params.row.needPaid) === Number(params.row.paid)) {
                            obj.clear = true
                        }
                        return h('div', { 'class': obj },'¥' + amount)
                    }
                },
                {
                    title: '支付状态',
                    align: 'center',
                    key: 'paid',
                    className: "colPadRight amount",
                    render: (h, params) => {
                        let str = ''
                        let obj = { clear: false }
                        if (Number(params.row.needPaid) === Number(params.row.paid)) {
                            str = '已付清'
                            obj.clear = true
                        }
                        else if (Number(params.row.needPaid) > Number(params.row.paid)) {
                            str = '未付清'
                        }
                        return h('div', { 'class': obj }, str)
                    }
                },
                {
                    title: '欠款额',
                    align: 'center',
                    key: 'unpaid',
                    className: "colPadRight",
                    render: (h, params) => {
                        if (params.row.unpaid) {
                            let amount = utils.thousand((params.row.unpaid).toFixed(2))
                            return h('div', '¥' + amount)
                        }
                    }
                },
                {
                    title: '欠款天数',
                    align: 'center',
                    key: 'unpaidDays',
                    className: "colPadRight",
                },
            ],
            feesStagesDatas: [],
            billDetailData: [],


            feesStagesDatasDemo: [
                {
                    stage: '第1期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    detailList: [
                        {
                            feeTypeName: '服务保证金',
                            feePeroid: '2018.01.01至2018.12.31',
                            latestPayDay: '2018.01.01',
                            feeAmount: 31234,
                            orderNum: '减租—DD0318020101010001',
                            hasPay: 12390,
                            payStaus: '已支付'
                        },
                        {
                            feeTypeName: '工位服务费',
                            feePeroid: '2018.01.01至2018.12.31',
                            latestPayDay: '2018.01.01',
                            feeAmount: 557567,
                            orderNum: '-',
                            hasPay: 677,
                            payStaus: '未付清'
                        },
                    ]
                },
                {
                    stage: '第2期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    detailList: [
                        {
                            feeTypeName: '工位服务费',
                            feePeroid: '2018.01.01至2018.12.31',
                            latestPayDay: '2018.01.01',
                            feeAmount: 557567,
                            orderNum: '-',
                            hasPay: 677,
                            payStaus: '未付清'
                        },
                    ]
                }

            ],
            billDetailDataDemo: [
                {
                    billNo: '增值账单—ZD031806011001010001',
                    feeName: '会议室账单',
                    lastPayDay: 1531486394915,
                    needPaid: 23450,
                    paid: 34,
                    unpaid: 0,
                    unpaidDays: 0
                }
            ]
        }
    },
    mounted() {
        this.formatDataList();
    },
    methods: {
        //格式化接收数据
        formatDataList() {
            this.feesStagesDatas = [].concat(this.feesStagesDatasDemo)
            this.billDetailData = [].concat(this.billDetailDataDemo)
        },
        //跳转至订单详情
        jump2OrderDetail(orderNo) {

        },
        //跳转至订单的计算明细
        jump2CalDetail(orderNo) {
            this.$emit('onShowCalDetail', orderNo)
        }

    }
}
</script>
<style lang="less">
.order-info-container {
    .info-title {
        @titleHeight: 52px;
        font-size: 14px;
        height: @titleHeight;
        width: 100%;
        background-color: #f0f0f0;
        margin: 10px 0;
        .order-number {
            color: #000bff;
            height: @titleHeight;
            line-height: @titleHeight;
            padding-left: 24px;
            float: left;
        }
        .order-amount {
            height: @titleHeight;
            line-height: @titleHeight;
            padding-right: 24px;
            float: right;
            color: red;
        }
    }
    .order-fees-stages {
        margin-bottom: 20px;
        .table-column-special {
            @rowHeight: 38px;
            .ivu-table-cell {
                padding-left: 0;
                padding-right: 0;
                div {
                    display: flex;
                    flex-direction: column;
                    div {
                        height: @rowHeight;
                        line-height: @rowHeight;
                        flex: 1;
                        display: inline-block;
                        width: 100%;
                        border-bottom: 1px solid rgb(215, 215, 215);
                        &::after {
                            content: "--";
                            opacity: 0;
                            user-select: none;
                        }
                    }
                    div:last-child {
                        border: none;
                    }
                }
            }
        }
        .feeAmount,
        .hasPay {
            text-align: right;
        }
    }
    .order-fees-bill {
        margin-bottom: 20px;
        .colPadRight {
            .ivu-table-cell {
                text-align: right;
                padding-right: 5px;
            }
        }
        .amount {
            .ivu-table-cell {
                div {
                    color: red;
                }
                .clear{
                    color: #2E8E00;
                }
            }
        }
    }
}
</style>
