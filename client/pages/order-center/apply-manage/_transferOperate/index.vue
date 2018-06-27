<template>
    <div class="apply-manage-container">
        <div class='apply-search-panel'>
            <SearchForm @searchClick="handleSearch" @clearClick="handleClear" @initData="initData" />
        </div>
        <div class="business-operation-btns">

            <Button type="primary" @click="handle2SQ" class='operate-btn'>转社区</Button>
            <Button type="primary" @click="handle2YYW" class='operate-btn'>转营业外</Button>
            <Button type="primary" @click="handle2YE" class='operate-btn'>转余额</Button>
            <Button type="primary" @click="handleYJ2ZJ" class='operate-btn'>押金转租金</Button>
            <Button type="primary" @click="handleReleaseFWBZJ" class='operate-btn'>释放服务保证金</Button>

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
            operateTypeIndex: 0,
            operateTypes: [
                {
                    name: '转社区',
                    component: 'QS'
                },
                {
                    name: '转营业外',
                    component: 'YYW'
                },
                {
                    name: '转余额',
                    component: 'YE'
                },

                {
                    name: '押金转租金',
                    component: 'YJ2ZJ'
                },
                {
                    name: '释放服务保证金',
                    component: 'ReleaseFWBZJ'
                },
            ],
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
                        return '￥' + utils.thousand((params.row.totalRent / 100).toFixed(2))
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
                            'PROCESSED': '待处理',
                            'PENDING': '已处理',
                            'RETREATE': '已退回'
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

        initData(formItem) {
            console.log(formItem)
        },
        //搜索
        handleSearch(params) {
            // this.applyDatas
            let list = [];
            let _this = this;
            this.$http.get('get-apply-list', params, r => {
                this.applyDatas = r.data.items;
            }, e => {
                this.$Notice.error({
                    title: e.message
                });
            })

        },

        //清除
        handleClear() {

        },
        //转社区
        handle2SQ() {
            this.operateTypeIndex = 0;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
        },

        //转营业外
        handle2YYW() {
            this.operateTypeIndex = 1;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
            return;

        },

        //转余额
        handle2YE() {
            this.operateTypeIndex = 2;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
            return;

        },

        //押金转租金
        handleYJ2ZJ() {
            this.operateTypeIndex = 3;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
            return;

        },

        //释放服务保证金
        handleReleaseFWBZJ() {
            this.operateTypeIndex = 4;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
            return;
        },

        //查看申请
        handleCheckApplyInfo(params) {
            var viewName = '';
            if (params.row.orderType == 'CONTINUE') {
                viewName = 'renewView';
            } else {
                viewName = 'joinView';
            }
            window.open(`/order-center/apply-manage/${params.row.id}/${viewName}`, '_blank');
        },

        //退回申请
        handleRejectApply(params) {
            var viewName = '';
            if (params.row.orderType == 'CONTINUE') {
                viewName = 'renewView';
            } else {
                viewName = 'joinView';
            }
            window.open(`/order-center/order-manage/station-order-manage/${params.row.id}/${viewName}`, '_blank');
        }
    }
    ,
}

</script>

<style lang="less">
.apply-manage-container {
    .business-operation-btns {
        margin: 0 0 10px 10px;
        .operate-btn {
            margin-right: 10px;
        }
    }
}
</style>
