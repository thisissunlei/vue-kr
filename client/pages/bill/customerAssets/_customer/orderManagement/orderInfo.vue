<template>
    <div class="order-info-container">
        <div class='info-title'>
            <span class='order-number'>{{nunber}}</span>
            <span class='order-amount'>{{amount}}</span>
        </div>
        <div class='bill-table order-fees-stages '>
            <div class='stages-header'>
                <div class='right'>已付信息</div>
                <div class='left'>费用信息</div>
            </div>
            <Table border :columns="feesStagesColumns" :data="feesStagesDatas"></Table>
        </div>
        <div class='bill-table order-fees-bill'>
            <div class='stages-header bill-header'>
                <div class='right2'>欠款信息</div>
                <div class='right1'>已付信息</div>
                <div class='left'>费用信息</div>
            </div>
            <Table border :columns="billDetailColumns" :data="billDetailData"></Table>
        </div>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
export default {
    data() {
        const statusWidth = 90
        const amountWidth = 130
        return {
            nunber: '入驻订单—DD021806121624360001（18.01.01至18.12.31）',
            amount: '¥' + utils.thousand((1200000).toFixed(2)),

            feesStagesColumns: [
                {
                    title: '分期数',
                    align: 'center',
                    key: 'stage',
                    width: 85,
                },
                {
                    title: '工位/房间明细',
                    align: 'center',
                    key: 'seatRoom'
                },
                {
                    title: '费用项',
                    align: 'center',
                    key: 'feeTypeName'
                },
                {
                    title: '费用期间',
                    align: 'center',
                    key: 'feePeroid',
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.startDate)) + '  至  ' + dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.endDate));
                        return h('span', time)
                    }
                },
                {
                    title: '最晚付款日',
                    align: 'center',
                    key: 'latestPayDay',
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.latestPayDay))
                        return h('span', time)
                    }
                },
                {
                    title: '费用金额',
                    align: 'center',
                    key: 'needPaid',
                    className: "colPadRight",
                    render: (h, params) => {
                        if (params.row.needPaid) {
                            let amount = utils.thousand((params.row.needPaid).toFixed(2))
                            return h('div', '¥' + amount)
                        }
                    }
                },
                {
                    title: '相关订单',
                    align: 'center',
                    key: 'orderNum',
                    render: (h, params) => {
                        if (params.row.orderNum) {
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
                                params.row.orderNum)
                        }
                        else {
                            return h('span', '-')
                        }
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'operate',
                    render: (h, params) => {
                        if (params.row.orderNum) {
                            return h(
                                'span',
                                {
                                    style: {
                                        color: '#2b85e4',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.jump2CalDetail(params.row.id)
                                        }
                                    }
                                },
                                '计算明细')
                        }
                        else {
                            return h('span', '-')
                        }
                    }
                },
                {
                    title: '已付金额',
                    align: 'center',
                    key: 'paid',
                    width: amountWidth,
                    className: "colPadRight amount",
                    render: (h, params) => {
                        if (params.row.paid && params.row.needPaid) {
                            let amount = utils.thousand((params.row.paid).toFixed(2))
                            let obj = { clear: false }
                            if (Number(params.row.needPaid) === Number(params.row.paid)) {
                                obj.clear = true
                            }
                            return h('div', { 'class': obj }, '¥' + amount)
                        }
                    }
                },
                {
                    title: '支付状态',
                    align: 'center',
                    key: 'paid',
                    width: statusWidth,
                    className: "colPadRight amount",
                    render: (h, params) => {
                        let str = '未付清'
                        let obj = { clear: false }
                        if (params.row.needPaid && params.row.paid) {
                            if (Number(params.row.needPaid) === Number(params.row.paid)) {
                                str = '已付清'
                                obj.clear = true
                            }
                            else if (Number(params.row.needPaid) > Number(params.row.paid)) {
                                str = '未付清'
                            }
                        }
                        return h('div', { 'class': obj }, str)
                    }
                },
            ],
            feesStagesDatas: [],
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
                        if (params.row.needPaid) {
                            let amount = utils.thousand((params.row.needPaid).toFixed(2))
                            return h('div', '¥' + amount)
                        }
                    }
                },
                {
                    title: '已付金额',
                    align: 'center',
                    key: 'paid',
                    width: amountWidth,
                    className: "colPadRight amount",
                    render: (h, params) => {
                        if (params.row.paid && params.row.needPaid) {
                            let amount = utils.thousand((params.row.paid).toFixed(2))
                            let obj = { clear: false }
                            if (Number(params.row.needPaid) === Number(params.row.paid)) {
                                obj.clear = true
                            }
                            return h('div', { 'class': obj }, '¥' + amount)
                        }
                    }
                },
                {
                    title: '支付状态',
                    align: 'center',
                    key: 'paid',
                    width: statusWidth,
                    className: "colPadRight amount",
                    render: (h, params) => {
                        let str = '未付清'
                        let obj = { clear: false }
                        if (params.row.needPaid && params.row.paid) {
                            if (Number(params.row.needPaid) === Number(params.row.paid)) {
                                str = '已付清'
                                obj.clear = true
                            }
                            else if (Number(params.row.needPaid) > Number(params.row.paid)) {
                                str = '未付清'
                            }
                        }
                        return h('div', { 'class': obj }, str)
                    }
                },
                {
                    title: '欠款额',
                    align: 'center',
                    key: 'unpaid',
                    width: amountWidth,
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
                    width: statusWidth,
                    className: "colPadRight",
                },
            ],
            billDetailData: [],

            feesStagesDatasDemo: [
                {
                    stage: '第1期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    feeTypeName: '服务保证金',
                    startDate: 1531886394915,
                    endDate: 1531486374915,
                    latestPayDay: 1531486394715,
                    needPaid: 31234,
                    orderNum: '减租—DD0318020101010001',
                    paid: 31234,
                    payStaus: '已支付'
                },
                {
                    stage: '第2期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    feeTypeName: '服务保证金',
                    startDate: 1531436394915,
                    endDate: 1531486594915,
                    latestPayDay: 1531786394915,
                    needPaid: 31234,
                    orderNum: '',
                    paid: 12390,
                    payStaus: '已支付'
                },
                {
                    stage: '第3期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    feeTypeName: '服务保证金',
                    startDate: 1531486374915,
                    endDate: 1531486894915,
                    latestPayDay: 1551486394915,
                    needPaid: 31234,
                    orderNum: '减租—DD0318020101010001',
                    paid: 12390,
                    payStaus: '已支付'
                },
                {
                    stage: '第4期',
                    seatRoom: '03001—03004,03006,301—304,306',
                    feeTypeName: '服务保证金',
                    startDate: 1531486374915,
                    endDate: 1531486894915,
                    latestPayDay: 1551486394915,
                    needPaid: 31234,
                    payStaus: '已支付'
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
            this.seatFeeListLoading = true
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

    .bill-table {
        margin-bottom: 20px;
        @headerWidth: 40px;
        .stages-header {
            width: 100%;
            height: @headerWidth;
            line-height: @headerWidth;
            background-color: #f8f8f9;
            border: 1px solid #e9eaec;
            border-bottom: none;
            text-align: center;
            color: #495060;
            font-size: 12px;
            font-weight: 700;
            .left {
                width: 100%;
                border: none;
                padding-right: 220px;
            }
            .right {
                float: right;
                top: 0;
                width: 220px;
                border: none;
                border-left: 1px solid #e9eaec;
            }
        }
        .bill-header {
            .left {
                padding-right: 440px;
                border: none;
            }
            .right1 {
                float: right;
                width: 220px;
                border: none;
                border-left: 1px solid #e9eaec;
            }
            .right2 {
                float: right;
                width: 220px;
                border: none;
                border-left: 1px solid #e9eaec;
            }
        }
        .colPadRight {
            .ivu-table-cell {
                text-align: right;
                padding-right: 5px;
                padding-left: 5px;
            }
        }
        .amount {
            .ivu-table-cell {
                div {
                    color: red;
                }
                .clear {
                    color: #2e8e00;
                }
            }
        }
    }
}
</style>
