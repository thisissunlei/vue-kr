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
                    key: 'applyNo',
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
                    key: 'transferTypeName',
                    align: 'center'
                },
                {
                    title: '操作款项',
                    key: 'transferFeeTypeName',
                    align: 'center'
                },
                {
                    title: '转移金额',
                    key: 'transferAmount',
                    align: 'center',
                    render: (h, params) => {
                        return '￥' + utils.thousand((params.row.transferAmount / 100).toFixed(2))
                    }
                },
                {
                    title: '操作人员',
                    key: 'operaterUserName',
                    align: 'center'
                },
                {
                    title: '操作时间',
                    key: 'utime',
                    align: 'center',
                    width: 100,
                    render(tag, params) {
                        return dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.utime));
                    }
                },
                {
                    title: '状态',
                    key: 'transferStatusName',
                    align: 'center',
                    render(tag, params) {
                        var orderStatus = {
                            'PROCESSED': '待处理',
                            'PENDING': '已处理',
                            'RETREATE': '已退回'
                        }
                        for (var item in orderStatus) {
                            if (item == params.row.transferStatus) {
                                var style = {};
                                if (item == 'PROCESSED') {
                                    style = 'u-red';
                                }
                                if (item == 'PENDING') {
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
            ],
            formItem: {},
            params: {
                page: 1,
                pageSize: 15,
            },
        }
    },
    methods: {

        initData(formItem) {
            let obj = {};
            obj.applyNo = formItem.applyNum
            obj.cityId = formItem.cityId
            obj.communityId = formItem.communityId
            obj.customerId = formItem.customerID
            obj.page = this.params.page
            obj.pageSize = this.params.pageSize
            obj.transferStatus = formItem.applyState
            obj.transferType = formItem.operateType
            obj.uEndTime = formItem.operateEndDate
            obj.uStartTime = formItem.operateStartDate
            this.formItem = obj;
        },
        //搜索
        handleSearch(formItem) {


            let obj = {};
            obj.applyNo = formItem.applyNum
            obj.cityId = Number(formItem.cityId)
            obj.communityId = Number(formItem.communityId)
            obj.customerId = Number(formItem.customerID)
            obj.page = this.params.page
            obj.pageSize = this.params.pageSize
            obj.transferStatus = formItem.applyState
            obj.transferType = formItem.operateType
            obj.uEndTime = formItem.operateEndDate
            obj.uStartTime = formItem.operateStartDate


            obj.pageSize = 12
            obj.communityId = 1
            obj.customerId = 1
            obj.applyNo = 1
            obj.transferType = 1
            obj.cityId = 1
            obj.transferStatus = 1
            obj.uEndTime = 1
            obj.uStartTime = 1
            obj.page = 1



            this.formItem = obj;

            debugger;
            this.$http.get('get-apply-list', this.formItem, r => {
                debugger;
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
        margin: 0 0 20px 10px;
        .operate-btn {
            margin-right: 10px;
        }
    }
}
</style>
