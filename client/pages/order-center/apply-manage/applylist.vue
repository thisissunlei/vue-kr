<template>
    <div class="apply-manage-container">
        <div class='apply-search-panel'>
            <SearchFrom @searchClick="handleSearch" @clearClick="handleClear" @initData="initData" :type="type" />
        </div>
        <div class="business-operation-btns">

            <Button type="primary" @click="handle2SQ" class='join-btn'>转社区</Button>
            <Button type="primary" @click="handle2YYW" class='join-btn'>转营业外</Button>
            <Button type="primary" @click="handle2YE" class='join-btn'>转余额</Button>
            <Button type="primary" @click="handleYJ2ZJ" class='join-btn'>押金转租金</Button>
            <Button type="primary" @click="handleReleaseFWBZJ" class='join-btn'>释放服务保证金</Button>

        </div>
        <div class="apply-list-table">
            <Table :columns="columns" :data="applyDatas" border class='list-table' />
        </div>
    </div>
</template>

<script>
import Buttons from '~/components/Buttons';
import SearchForm from './SearchForm.vue'

export default {
    name: 'apply',
    components: {
        Buttons,
        SearchForm
    },
    data() {
        return {
            applyDatas: [],
            columns: [
                {
                    title: '单据编号',
                    key: 'orderNum',
                    align: 'center'
                },
                {
                    title: '客户名称',
                    key: 'customerName',
                    align: 'center'
                },
                {
                    title: '社区名称',
                    key: 'communityName',
                    align: 'center'
                },
                {
                    title: '操作类型',
                    key: 'rentAmount',
                    align: 'center'
                },
                {
                    title: '操作款项',
                    key: 'depositAmount',
                    align: 'center'
                },
                {
                    title: '转移金额',
                    key: 'totalRent',
                    align: 'center',
                    render: (h, params) => {
                        return '￥' + utils.thousand(params.row.totalRent)
                    }
                },
                {
                    title: '操作人员',
                    key: 'totalRent',
                    align: 'center'
                },
                {
                    title: '操作时间',
                    key: 'ctime',
                    align: 'center',
                    width: 100,
                    render(tag, params) {
                        return dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.ctime));
                    }
                },
                {
                    title: '状态',
                    key: 'orderStatus',
                    align: 'center',
                    render(tag, params) {
                        var orderStatus = {
                            'NOT_EFFECTIVE': '未生效',
                            'EFFECTIVE': '已生效',
                            'INVALID': '已作废'
                        }
                        for (var item in orderStatus) {
                            if (item == params.row.orderStatus) {
                                var style = {};
                                if (item == 'NOT_EFFECTIVE') {
                                    style = 'u-red';
                                }
                                if (item == 'INVALID') {
                                    style = 'u-nullify';
                                }
                                return <span class={`u-txt ${style}`}>{orderStatus[item]}</span>;
                            }
                        }
                    }
                },

                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (tag, params) => {
                        var btnRender = [
                            tag(Buttons, {
                                props: {
                                    type: 'text',
                                    checkAction: 'seat_order_view',
                                    label: '查看',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                on: {
                                    click: () => {
                                        this.handleCheckApplyInfo(params)
                                    }
                                }
                            }),
                            tag(Buttons, {
                                props: {
                                    type: 'text',
                                    checkAction: 'seat_order_view',
                                    label: '退回',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                on: {
                                    click: () => {
                                        this.handleRejectApply(params)
                                    }
                                }
                            })
                        ];
                        return tag('div', btnRender);
                    }
                }
            ]
        }
    },
    methods: {

        //搜索
        handleSearch() {

        },

        //清除
        handleClear() {

        },
        //转社区
        handle2SQ() {
            return;

        },

        //转营业外
        handle2YYW() {
            return;

        },

        //转余额
        handle2YE() {
            return;

        },

        //押金转租金
        handleYJ2ZJ() {
            return;

        },

        //释放服务保证金
        handleReleaseFWBZJ() {
            return;
        },

        //查看申请
        handleCheckApplyInfo(params) {

        },

        //退回申请
        handleRejectApply(params) {

        }
    }
    ,
}

</script>

<style lang="less">
</style>
