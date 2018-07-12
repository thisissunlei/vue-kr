<template>
    <div class="order-info-container">
        <div class='info-title'>
            <span class='order-number'>{{nunber}}</span>
            <span class='order-amount'>{{amount}}</span>
        </div>
        <div class='order-fees-stages'>
            <Table border :columns="feesStagesColumns" :data="feesStagesDatas"></Table>
        </div>
        <div class='order-fees-bill'>
            <Table border :columns="feesOtherColumns" :data="feesOtherDatas"></Table>
        </div>
    </div>
</template>
<script>
import utils from '~/plugins/utils';

export default {
    data() {
        return {
            nunber: '入驻订单—DD021806121624360001（18.01.01至18.12.31）',
            amount: '¥' + utils.thousand((1200000).toFixed(2)),
            feesStagesColumns: [
                {
                    title: '费用信息',
                    align: 'center',
                    children: [
                        {
                            title: '分期数',
                            key: 'stage',
                            align: 'center',
                        },
                        {
                            title: '工位/房间明细',
                            key: 'seatRoom',
                            align: 'center',
                        },
                        {
                            title: '费用项',
                            key: 'feeTypeName',
                            align: 'center',
                            render: (h, params) => {
                                debugger;
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h('div', item.feeTypeName))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '费用期间',
                            key: 'feePeroid',
                            align: 'center',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h('div', item.feePeroid))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '最晚付息日',
                            key: 'latestPayDay',
                            align: 'center',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h('div', item.latestPayDay))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '费用金额',
                            key: 'feeAmount',
                            align: 'center',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    let amount = utils.thousand((item.feeAmount).toFixed(2))
                                    lines.push(h('div', '¥' + amount))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '相关订单',
                            key: 'orderNum',
                            align: 'center',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h(
                                        'span',
                                        {
                                            style: {
                                                color: '#2b85e4',
                                                cursor: 'pointer'
                                            },
                                            on: {
                                                click: () => {
                                                    this.jump2OrderDetail(params.row.orderNum)
                                                }
                                            }
                                        },
                                        params.row.orderNum))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '操作',
                            key: 'operate',
                            align: 'center',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h(
                                        'span',
                                        {
                                            style: {
                                                color: '#2b85e4',
                                                cursor: 'pointer'
                                            },
                                            on: {
                                                click: () => {
                                                    this.jump2CalDetail(params.row.customerId)
                                                }
                                            }
                                        },
                                        '操作'))
                                })
                                return h('div', lines)
                            }
                        },
                    ]
                },
                {
                    title: '已付信息',
                    align: 'center',
                    children: [
                        {
                            title: '已付金额',
                            align: 'center',
                            key: 'hasPay',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    let amount = utils.thousand((item.hasPay).toFixed(2))
                                    lines.push(h('div', '¥' + amount))
                                })
                                return h('div', lines)
                            }
                        },
                        {
                            title: '支付状态',
                            align: 'center',
                            key: 'payStaus',
                            render: (h, params) => {
                                let lines = [];
                                params.row.detailList.map(item => {
                                    lines.push(h('div', item.payStaus))
                                })
                                return h('div', lines)
                            }
                        },
                    ]
                }
            ],
            feesOtherColumns: [
                {
                    title: '费用信息',
                    align: 'center',
                    children: [
                        {
                            title: '账单类型—编号',
                            align: 'center',
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
                                                this.jump2OrderDetail(params.row.customerId)
                                            }
                                        }
                                    },
                                    params.row.customerName)
                            }
                        },
                        {
                            title: '费用类型',
                            align: 'center',
                            key: 'billNo'
                        },
                        {
                            title: '最晚付款日',
                            align: 'center',
                            key: 'billNo'
                        },
                        {
                            title: '账单金额',
                            align: 'center',
                            key: 'billNo'
                        }
                    ]
                },
                {
                    title: '已付信息',
                    align: 'center',
                    children: [
                        {
                            title: '已付金额',
                            align: 'center',
                            key: 'key'
                        },
                        {
                            title: '支付状态',
                            align: 'center',
                            key: 'key'
                        },
                    ]
                },
                {
                    title: '欠款信息',
                    align: 'center',
                    children: [
                        {
                            title: '欠款额',
                            align: 'center',
                            key: 'key'
                        },
                        {
                            title: '欠款天数',
                            align: 'center',
                            key: 'key'
                        },
                    ]
                }
            ],
            feesStagesDatas: [],
            feesOtherDatas: [],


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
        }
    },
    mounted() {
        this.formatDataList();
    },
    methods: {
        //格式化接收数据
        formatDataList() {
            this.feesStagesDatasDemo.map(item => {
                if (item.detailList.length > 1) {
                    item.cellClassName = {
                        feeAmount: 'table-column-special feeAmount',
                        hasPay: 'table-column-special hasPay',

                        feeTypeName: 'table-column-special',
                        feePeroid: 'table-column-special',
                        latestPayDay: 'table-column-special',
                        orderNum: 'table-column-special',
                        operate: 'table-column-special',
                        operate: 'table-column-special',
                    }
                }
            })
            this.feesStagesDatas = [].concat(this.feesStagesDatasDemo)
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
    }
}
</style>
