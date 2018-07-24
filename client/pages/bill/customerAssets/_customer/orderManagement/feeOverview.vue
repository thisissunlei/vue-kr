<template>
    <div class='fee-overview-container'>
        <Table border class='service-charge' :row-class-name="rowClassName" :columns="serviceChargeColumns" :data="serviceChargeData"></Table>
        <Table border class='service-charge deposit-cash' :row-class-name="rowClassName" :columns="depositCashColumns" :data="depositCashData "></Table>
    </div>
</template>
<script>
import utils from '~/plugins/utils';

export default {
    props: {
        serviceChargeData: {
            type: Array,
            default: []
        },
        depositCashData: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            serviceChargeColumns: [
                {
                    title: '费用类型',
                    key: 'feeName',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.feeName)
                    }
                },
                {
                    title: '应交金额',
                    key: 'needPaid',
                    align: 'center',
                    className: "colPadRight",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.needPaid).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '已交金额',
                    key: 'paid',
                    align: 'center',
                    className: "colPadRight",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.paid).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '未交金额',
                    key: 'unpaid',
                    align: 'center',
                    className: "colPadRight unpaid",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.unpaid).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
            ],
            depositCashColumns: [
                {
                    title: '费用类型',
                    key: 'feeName',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.feeName)
                    }
                },
                {
                    title: '应交金额',
                    key: 'needPaid',
                    align: 'center',
                    className: "colPadRight",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.needPaid).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '可用服务保证金',
                    key: 'depositFree',
                    align: 'center',
                    className: "colPadRight",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.depositFree).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '在押服务保证金',
                    key: 'deposit',
                    align: 'center',
                    className: "colPadRight unpaid",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.deposit).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
                {
                    title: '冻结服务保证金',
                    key: 'lockDeposit',
                    align: 'center',
                    className: "colPadRight  unpaid",
                    render: (h, params) => {
                        let amount = utils.thousand((params.row.lockDeposit).toFixed(2))
                        return h('div', '¥' + amount)
                    }
                },
            ],
            serviceChargeDataDemo: [
                {
                    feeName: '工位服务费',
                    needPaid: 20000,
                    paid: 300,
                    unpaid: 1700,
                },
                {
                    feeName: '打印服务费',
                    needPaid: 20000,
                    paid: 300,
                    unpaid: 1700,
                },
                {
                    feeName: '服务保证金1',
                    needPaid: 20000,
                    paid: 300,
                    unpaid: 1700,
                },
                {
                    feeName: '工位服务费2',
                    needPaid: 20000,
                    paid: 300,
                    unpaid: 1700,
                },
                {
                    feeName: '打印服务费3',
                    needPaid: 20000,
                    paid: 300,
                    unpaid: 1700,
                },
            ],
            depositCashDataDemo: [
                {
                    feeName: '工位服务费',
                    needPaid: 20000,
                    depositFree: 300,
                    deposit: 1700,
                    lockDeposit: 1700,
                }
            ]

        }
    },
    mounted() {
        // this.formatData();
        // this.mergeHeader();
    },
    methods: {
        mergeHeader() {
            let width = 0;
            let headerDom = document.getElementById('merge-table-header')
            let columns2Merge = document.querySelectorAll('#fee-overview-container .merge')
            Array.prototype.forEach.call(columns2Merge, function (el) {
                width += el.offsetWidth
            });
            headerDom.innerText = '费用信息'
            headerDom.style.width = width + 'px'
        },
        formatData() {
            // this.serviceChargeData = [].concat(this.serviceChargeDataDemo);
            // this.depositCashData = [].concat(this.depositCashDataDemo)
        },
        //table 奇偶行附className 以显示不同颜色
        rowClassName(row, index) {
            if ((index & 1) === 0) {
                return 'table-even-row';
            } else {
                return 'table-odd-row';
            }
            return '';
        },
    }
}
</script>
<style lang="less">
.fee-overview-container {
    width: 1200px;
    .service-charge {
        width: 500px;
        display: inline-block;
        margin-right: 50px;
        .table-even-row td {
            background-color: #ffffff;
        }

        .table-odd-row td {
            background-color: #f0f0f0;
        }

        .colPadRight {
            .ivu-table-cell {
                text-align: right;
                padding-left: 5px;
                padding-right: 5px;
            }
        }
        .unpaid {
            .ivu-table-cell div {
                color: red;
            }
        }
    }
    .deposit-cash {
        float: right;
        right:-58px;
        width: 600px;
    }
}
</style>
