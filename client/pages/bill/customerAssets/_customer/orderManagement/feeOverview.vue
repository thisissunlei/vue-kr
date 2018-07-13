<template>
    <div class='fee-overview-container' id='fee-overview-container'>
        <div id='merge-header'></div>
        <Table border :row-class-name="rowClassName" :columns="columns" :data="dataList"></Table>
    </div>
</template>
<script>
import utils from '~/plugins/utils';

export default {
    props:{
        data:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            columns: [
                {
                    title: '社区',
                    key: 'communityName',
                    align: 'center',
                    className:"merge"
                },
                {
                    title: '费用类型',
                    key: 'feeTypeName',
                    align: 'center',
                     className:"merge",
                    render: (h, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            lines.push(h('div', item.feeTypeName))
                        })
                        return h('div', lines)
                    }
                },
                {
                    title: '应交金额',
                    key: 'amountShould',
                    align: 'center',
                     className:"merge",
                    render: (h, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            let amount = utils.thousand((item.amountShould).toFixed(2))
                            lines.push(h('div', '¥' + amount))
                        })
                        return h('div', lines)
                    }
                },
                {
                    title: '已交金额',
                    key: 'amountHas',
                    align: 'center',
                    
                    render: (h, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            let amount = utils.thousand((item.amountHas).toFixed(2))
                            lines.push(h('div', '¥' + amount))
                        })
                        return h('div', lines)
                    }
                },
                {
                    title: '未交金额',
                    key: 'amountNo',
                    align: 'center',
                    
                    render: (h, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            let amount = utils.thousand((item.amountNo).toFixed(2))
                            lines.push(h('div', '¥' + amount))
                        })
                        return h('div', lines)
                    }
                },
            ],
            dataList: [],
            dataDemo: [
                {
                    communityName: '大街社区',
                    detailList: [{
                        feeTypeName: '服务保证金',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    {
                        feeTypeName: '工位服务费',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    {
                        feeTypeName: '打印服务费',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    ]
                },
                {
                    communityName: '创业社区',
                    detailList: [{
                        feeTypeName: '服务保证金1',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    {
                        feeTypeName: '工位服务费2',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    {
                        feeTypeName: '打印服务费3',
                        amountShould: 20000,
                        amountHas: 300,
                        amountNo: 1700,
                    },
                    ]
                }
            ]
        }
    },
    
    mounted() {
        this.formatData();
        this.mergeHeader();
    },
    methods: {
        mergeHeader()
        {
            let columns2Merge=document.querySelectorAll('#fee-overview-container .merge')
            [].Foreach.call(columns2Merge)
            console.log(columns2Merge)
        },
        formatData() {
            this.dataDemo.map(item => {
                if (item.detailList.length > 1) {
                    item.cellClassName = {
                        feeTypeName: 'table-column-special feeTypeName',
                        amountShould: 'table-column-special amountShould',
                        amountHas: 'table-column-special amountHas',
                        amountNo: 'table-column-special amountNo',
                    }
                }
            })
            this.dataList = [].concat(this.dataDemo)
        },
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
    .ivu-table {
        .table-even-row td {
            background-color: #ffffff;
        }

        .table-odd-row td {
            background-color: #f0f0f0;
        }

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
                            user-select:none
                        }
                    }
                    div:last-child {
                        border: none;
                    }
                }
            }
        }
        .feeTypeName {
            text-align: center;
        }
        .amountShould,
        .amountHas,
        .amountNo {
            text-align: right;
            &::after {
                content: "  ";
            }
        }
        .amountNo {
            color: red;
        }
    }
}
</style>
