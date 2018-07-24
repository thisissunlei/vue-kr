<template>
    <div class="order-bill-info-container">
        <div class='order-zone'>
            <div v-for='item in orderData' :key="item.orderId" class="order-single">
                <div class="info-title">
                    <span class="order-number" @click="jump2OrderDetail(item)">{{formatNumber(item)}}</span>
                    <span class="order-amount">{{formatAmount(item)}}</span>
                </div>
                <div>
                    <div class="bill-zone order-fees-stages ">
                        <div class="stages-header">
                            <div class="right">已付信息</div>
                            <div class="left">费用信息</div>
                        </div>
                        <Table border :columns="orderColumns" :data="getOrderData(item)"></Table>
                    </div>
                </div>
            </div>
        </div>
        <div class="bill-zone order-fees-bill">
            <div class="stages-header bill-header">
                <div class="right2">欠款信息</div>
                <div class="right1">已付信息</div>
                <div class="left">费用信息</div>
            </div>
            <Table border :columns="billColumns" :data="billData"></Table>
        </div>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
export default {
    props: {
        billData: {
            type: Array,
            default: () => []
        },
        orderData: {
            type: Array,
            default: () => { }
        }
    },
    data() {
        const statusWidth = 90
        const amountWidth = 130
        return {
            orderColumns: [
                {
                    title: '分期数',
                    align: 'center',
                    key: 'periodsName',
                    width: 85,
                },
                {
                    title: '工位/房间明细',
                    align: 'center',
                    key: 'seatNames',
                    render(h, params) {
                        return h('Tooltip', {
                            props: {
                                placement: 'top'
                            }
                        }, [
                                h('div', {
                                    style: {
                                        maxWidth: "200px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                }, params.row.seatNames),
                                h('div', {
                                    style: {
                                        wordWrap: "break-word"
                                    },
                                    slot: 'content'
                                }, params.row.seatNames)
                            ]
                        )
                    }

                },
                {
                    title: '费用项',
                    align: 'center',
                    key: 'feeName',
                    width: 140,
                },
                {
                    title: '费用期间',
                    align: 'center',
                    key: 'feePeroid',
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.installmentStart)) + '  至  ' + dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.installmentEnd));
                        return h('span', time)
                    }
                },
                {
                    title: '最晚付款日',
                    align: 'center',
                    key: 'lastPaymentDate',
                    width: 110,
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.lastPaymentDate))
                        return h('span', time)
                    }
                },
                {
                    title: '费用金额',
                    align: 'center',
                    key: 'amount',
                    width: 140,
                    className: "colPadRight",
                    render: (h, params) => {
                        if (params.row.amount != null) {
                            let amount = utils.thousand((params.row.amount).toFixed(2))
                            return h('div', '¥' + amount)
                        }
                    }
                },
                {
                    title: '相关订单',
                    align: 'center',
                    key: 'reduceOrder',
                    width: 250,
                    className: 'col-related-order',
                    render: (h, params) => {
                        if (params.row.reduceOrder == null || params.row.reduceOrder.length == 0) {
                            return h('span', '-')
                        }
                        else {
                            let lines = []
                            let reduceOrders = Array.from(params.row.reduceOrder)
                            reduceOrders.map(item => {
                                let str = '-'
                                if (item.orderTypeName && item.orderId) {
                                    str = `${item.orderTypeName}-${item.orderNo}`
                                }
                                if (str == '-')
                                    lines.push('p', str)
                                else {
                                    lines.push(h('p',
                                        {
                                            style: {
                                                color: '#3F4EFC',
                                                cursor: 'pointer'
                                            },
                                            on: {
                                                click: () => {
                                                    this.jump2OrderDetail({ orderType: item.orderType, orderId: item.orderId })
                                                }
                                            }
                                        }, str))
                                }
                            }
                            )
                            return h('div', lines)
                        }
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'operate',
                    className: 'col-related-order',
                    width: 90,
                    render: (h, params) => {
                        let lines = []
                        let reduceOrders = Array.from(params.row.reduceOrder)
                        if (reduceOrders.length == 0) {
                            reduceOrders.push(0)
                        }
                        reduceOrders.map(item => {
                            lines.push(h('p',
                                {
                                    style: {
                                        color: '#3F4EFC',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.jump2CalDetail(params.row)
                                        }
                                    }
                                }, '计算明细'))
                        }
                        )
                        return h('div', lines)
                    }
                },
                {
                    title: '已付金额',
                    align: 'center',
                    key: 'paid',
                    width: amountWidth,
                    className: "colPadRight amount",
                    render: (h, params) => {
                        if (params.row.paid != null && params.row.amount != null) {
                            let amount = utils.thousand((params.row.paid).toFixed(2))
                            let obj = { clear: false }
                            if (Number(params.row.amount) === Number(params.row.paid)) {
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
                        if (params.row.amount != null && params.row.paid != null) {
                            if (Number(params.row.amount) === Number(params.row.paid)) {
                                str = '已付清'
                                obj.clear = true
                            }
                            else if (Number(params.row.amount) > Number(params.row.paid)) {
                                str = '未付清'
                            }
                        }
                        return h('div', { 'class': obj }, str)
                    }
                },
            ],
            billColumns: [
                {
                    title: '账单类型—编号',
                    align: 'center',
                    width: 270,
                    key: 'billNo',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style: {
                                    color: '#3F4EFC',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.jump2BillDetail(params.row.id)
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
                    key: 'need',
                    className: "colPadRight",
                    render: (h, params) => {
                        if (params.row.need) {
                            let amount = utils.thousand((params.row.need).toFixed(2))
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
                        if (params.row.paid && params.row.need) {
                            let amount = utils.thousand((params.row.paid).toFixed(2))
                            let obj = { clear: false }
                            if (Number(params.row.need) === Number(params.row.paid)) {
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
                        if (params.row.need && params.row.paid) {
                            if (Number(params.row.need) === Number(params.row.paid)) {
                                str = '已付清'
                                obj.clear = true
                            }
                            else if (Number(params.row.need) > Number(params.row.paid)) {
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

            orderDataDemo: [
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
            billDataDemo: [
                {
                    billNo: '增值账单—ZD031806011001010001',
                    feeName: '会议室账单',
                    lastPayDay: 1531486394915,
                    needPaid: 23450,
                    paid: 34,
                    unpaid: 0,
                    unpaidDays: 0
                }
            ],
            orderId: '',
            demoData: '{"code":1,"data":{"fee":[{"feeName":"工位服务费","needPaid":0,"paid":0,"unpaid":0}],"deposit":[{"deposit":1540.00,"depositFree":0.00,"feeName":"服务保证金","lockDeposit":0.00,"needPaid":0}],"bill":[],"order":[{"end":1543507200000,"installmentFee":[{"amount":300.00,"feeName":"工位服务费","installmentEnd":1532966400000,"installmentStart":1530374400000,"lastPaymentDate":1530374400000,"paid":0,"periods":1,"periodsName":"首期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":300.00,"feeName":"工位服务费","installmentEnd":1535644800000,"installmentStart":1533052800000,"lastPaymentDate":1531584000000,"paid":0,"periods":2,"periodsName":"第2期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":300.00,"feeName":"工位服务费","installmentEnd":1538236800000,"installmentStart":1535731200000,"lastPaymentDate":1534262400000,"paid":0,"periods":3,"periodsName":"第3期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":300.00,"feeName":"工位服务费","installmentEnd":1540915200000,"installmentStart":1538323200000,"lastPaymentDate":1536940800000,"paid":0,"periods":4,"periodsName":"第4期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":300.00,"feeName":"工位服务费","installmentEnd":1543507200000,"installmentStart":1541001600000,"lastPaymentDate":1539532800000,"paid":0,"periods":5,"periodsName":"第5期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"}],"orderId":13074,"orderName":"DD031807181316020001","start":1530374400000,"totalRentAmount":1500.00},{"end":1548864000000,"installmentFee":[{"amount":470.00,"feeName":"工位服务费","installmentEnd":1535644800000,"installmentStart":1533052800000,"lastPaymentDate":1533052800000,"paid":0,"periods":1,"periodsName":"首期","reduceOrder":[],"seat":[],"seatNames":"666,665"},{"amount":470.00,"feeName":"工位服务费","installmentEnd":1538236800000,"installmentStart":1535731200000,"lastPaymentDate":1534262400000,"paid":0,"periods":2,"periodsName":"第2期","reduceOrder":[],"seat":[],"seatNames":"666,665"},{"amount":470.00,"feeName":"工位服务费","installmentEnd":1540915200000,"installmentStart":1538323200000,"lastPaymentDate":1536940800000,"paid":0,"periods":3,"periodsName":"第3期","reduceOrder":[],"seat":[],"seatNames":"666,665"},{"amount":470.00,"feeName":"工位服务费","installmentEnd":1543507200000,"installmentStart":1541001600000,"lastPaymentDate":1539532800000,"paid":0,"periods":4,"periodsName":"第4期","reduceOrder":[],"seat":[],"seatNames":"666,665"},{"amount":470.00,"feeName":"工位服务费","installmentEnd":1546185600000,"installmentStart":1543593600000,"lastPaymentDate":1542211200000,"paid":0,"periods":5,"periodsName":"第5期","reduceOrder":[],"seat":[],"seatNames":"666,665"},{"amount":470.00,"feeName":"工位服务费","installmentEnd":1548864000000,"installmentStart":1546272000000,"lastPaymentDate":1544803200000,"paid":0,"periods":6,"periodsName":"第6期","reduceOrder":[],"seat":[],"seatNames":"666,665"}],"orderId":13076,"orderName":"DD031807181447120001","start":1533052800000,"totalRentAmount":2820.00},{"end":1564502400000,"installmentFee":[{"amount":480.00,"feeName":"工位服务费","installmentEnd":1548864000000,"installmentStart":1543593600000,"lastPaymentDate":1531843200000,"paid":0,"periods":1,"periodsName":"首期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":480.00,"feeName":"工位服务费","installmentEnd":1553961600000,"installmentStart":1548950400000,"lastPaymentDate":1547481600000,"paid":0,"periods":2,"periodsName":"第2期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":480.00,"feeName":"工位服务费","installmentEnd":1559232000000,"installmentStart":1554048000000,"lastPaymentDate":1552579200000,"paid":0,"periods":3,"periodsName":"第3期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"},{"amount":480.00,"feeName":"工位服务费","installmentEnd":1564502400000,"installmentStart":1559318400000,"lastPaymentDate":1557849600000,"paid":0,"periods":4,"periodsName":"第4期","reduceOrder":[],"seat":[],"seatNames":"彗星,06002"}],"orderId":13078,"orderName":"DD031807181514100001","start":1543593600000,"totalRentAmount":1920.00}]},"message":"ok"}',
        }
    },
    mounted() {
        this.formatDataList();
    },
    methods: {
        getOrderData(item){
            item.installmentFee.map(fee=>{
                fee.orderId=item.orderId
            })           
            return item.installmentFee;
        },
        formatNumber(data) {
            // '入驻订单—DD021806121624360001（18.01.01至18.12.31）',
            let { orderTypeName, orderName, start, end, orderId } = data
            this.orderId = orderId;
            let time = dateUtils.dateToStr("YY.MM.DD", new Date(start)) + '至' + dateUtils.dateToStr("YY.MM.DD", new Date(end))
            return `${orderTypeName}-${orderName}(${time})`
        },
        formatAmount(data) {
            let { totalRentAmount } = data
            return '¥' + utils.thousand((totalRentAmount).toFixed(2))
        },
        //格式化接收数据
        formatDataList() {
            this.orderDataDemo = JSON.parse(this.demoData).data.order;
        },
        //跳转至订单详情
        jump2OrderDetail(params) {
            if ((typeof params) == 'object') {
                let viewName = '';
                let orderType = params.orderType
                if (orderType == 'CONTINUE') {
                    viewName = 'renewView';
                } else if (orderType == 'IN') {
                    viewName = 'joinView';
                }
                else if (orderType == 'INCREASE') {
                    viewName = 'joinView';
                } else if (orderType == 'REDUCE') {
                    viewName = 'reduceView';
                }
                else if (orderType == 'REPLACE') {
                    viewName = 'replaceView';
                }
                window.open(`/order-center/order-manage/station-order-manage/${params.orderId}/${viewName}`, '_blank');
            }
        },
        jump2BillDetail(billNo) {
            billNo = billNo
            window.open(`/bill/list/detail/${billNo}`, '_blank');
        },
        //跳转至订单的计算明细
        jump2CalDetail(row) {
            this.seatFeeListLoading = true
            let params = {
                orderId: row.orderId,
                seatVO: JSON.stringify(row.seat)
            }
            this.$emit('onShowCalDetail', params)
        }

    }
}
</script>
<style lang="less">
.order-bill-info-container {
    .order-zone {
        .order-single {
            margin-bottom: 10px;
            .info-title {
                @titleHeight: 52px;
                font-size: 14px;
                height: @titleHeight;
                width: 100%;
                background-color: #f0f0f0;
                margin: 10px 0;
                .order-number {
                    color: #3f4efc;
                    height: @titleHeight;
                    line-height: @titleHeight;
                    padding-left: 24px;
                    float: left;
                    cursor: pointer;
                }
                .order-amount {
                    height: @titleHeight;
                    line-height: @titleHeight;
                    padding-right: 24px;
                    float: right;
                    color: red;
                }
            }
            .col-related-order {
                .ivu-table-cell {
                    padding: 0;
                    @lineHeight: 36px;
                    div {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        p {
                            flex: 1;
                            height: @lineHeight;
                            line-height: @lineHeight;
                            text-align: center;
                            border-bottom: 1px solid #e9eaec;
                            display: inline-block;
                            width: 100%;
                        }
                        p:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
        }
    }

    .bill-zone {
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
                    color: #5dd462;
                }
            }
        }
    }
}
</style>
