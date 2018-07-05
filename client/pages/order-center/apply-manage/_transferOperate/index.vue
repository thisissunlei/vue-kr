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
            <Spin size="large" fix v-if="spinShow"></Spin>
            <Table :columns="columns" :data="applyDatas" border class='list-table' />
        </div>

        <Modal title="删除申请" v-model="deleteModal" ok-text='删除' @on-ok="handeDeleteApply" class="vertical-center-modal">
            <div class='modal-container'>
                <p class='modal-desc'>删除原因</p>
                <Input class='modal-textarea' v-model="modalText" type="textarea" :rows="4" :maxlength='500' placeholder="请填写删除原因"></Input>
            </div>

        </Modal>

        <Modal title="退回申请" v-model="rejectModal" ok-text='退回' @on-ok="handeRejectApply" class="vertical-center-modal">
            <div class='modal-container'>
                <p class='modal-desc'>退回原因</p>
                <Input class='modal-textarea' v-model="modalText" type="textarea" :rows="4" :maxlength='500' placeholder="请填写退回原因"></Input>
            </div>
        </Modal>

    </div>
</template>

<script>
import Buttons from '~/components/Buttons';
import SearchForm from './SearchForm.vue'
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
    name: 'apply',
    components: {
        Buttons,
        SearchForm
    },
    data() {
        return {
            spinShow:false,
            modalText: '',
            rejectModal: false,
            deleteModal: false,
            isFinancialSide: false,
            operateTypeIndex: 0,
            operateTypes: [
                {
                    name: '转社区',
                    component: 'transformZone'
                },
                {
                    name: '转营业外',
                    component: 'nonoperating'
                },
                {
                    name: '转余额',
                    component: 'balance'
                },

                {
                    name: '押金转租金',
                    component: 'depositRent'
                },
                {
                    name: '释放服务保证金',
                    component: 'releaseDeposit'
                },
            ],
            applyDatas: [],
            currentApplyId: '',//当前申请单id
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
                    key: 'detailList',
                    align: 'center',
                    render: (tag, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            lines.push(tag('p', item.transferFeeTypeName))
                        })
                        return tag('div', lines)
                    }
                },
                {
                    title: '转移金额',
                    key: 'detailList',
                    align: 'center',
                    render: (tag, params) => {
                        let lines = [];
                        params.row.detailList.map(item => {
                            let amount = utils.thousand((item.transferAmount).toFixed(2))
                            lines.push(tag('p', '￥' + amount))
                        })
                        return tag('div', lines)
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
                    render(tag, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.utime));
                        return tag('div', time)
                    }
                },
                {
                    title: '状态',
                    key: 'transferStatusName',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'id',
                    align: 'center',
                    width: 150,
                    render: (tag, params) => {

                        // 待处理时财务人员查看显示按钮“查看”和“退回”，非财务人员查看时显示“查看”；
                        // 已处理时所有人员查看只显示按钮“查看”。
                        // 已退回时所有人员查看显示按钮“查看”、“编辑”和“删除”

                        let status = params.row.transferStatusName
                        var btnRender = [];
                        btnRender.push(tag(Buttons, {
                            props: {
                                type: 'text',
                                label: '查看',
                                checkAction: 'seat_order_release',
                                styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                            },
                            on: {
                                click: () => {
                                    this.handleCheckApplyInfo(params)
                                }
                            }
                        }), )

                        if (status === '待处理' && this.isFinancialSide) {
                            btnRender.push(tag(Buttons, {
                                props: {
                                    type: 'text',
                                    label: '退回',
                                    checkAction: 'seat_order_release',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                on: {
                                    click: () => {
                                        this.handleShowRejectApply(params)
                                    }
                                }
                            }))
                        }
                        else if (status === '已退回') {
                            btnRender.push(tag(Buttons, {
                                props: {
                                    type: 'text',
                                    label: '删除',
                                    checkAction: 'seat_order_release',
                                    styles: 'color:rgb(43, 133, 228);padding: 2px 7px;'
                                },
                                on: {
                                    click: () => {
                                        this.handleShowDeleteApply(params)
                                    }
                                }
                            }))
                        }
                        return tag('div', btnRender);
                    }
                }
            ],
            formItem: {},
            params: {
                page: 1,
                pageSize: 15,
            },
            transformType2UIDic: {
                TRANSFER_COMMUNITY: 'transformZoneInfo',
                TRANSFER_BALANCE: 'balanceInfo',
                TRANSFER_NONBUSINESS: 'nonoperatingInfo',
                TRANSFER_RENT: 'depositRentInfo',
                TRANSFER_LOCK_DEPOSIT: 'releaseDepositInfo'
            }
        }
    },
    mounted() {
        this.getAllApply();
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
            this.spinShow=true;
            //过滤掉全部
            for (const key in formItem) {
                if (formItem.hasOwnProperty(key)) {
                    if (formItem[key] == 'ALL') {
                        formItem[key] = ''
                    };
                }
            }
            this.$http.get('get-apply-list', formItem, r => {
                this.spinShow=false;
                this.applyDatas = [].concat(r.data.items);
                console.log(this.applyDatas)
            }, e => {
                this.spinShow=false;
                this.$Notice.error({
                    title: e.message
                });
            })

        },
        getAllApply() {
            this.spinShow=true;
            this.$http.get('get-apply-list', {}, r => {
                this.spinShow=false;
                this.isFinancialSide = r.data.financialSide;
                this.applyDatas = [].concat(r.data.items);
            }, e => {
                this.spinShow=false;
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
            // window.open(`/order-center/apply-manage/${params.row.id}/${viewName}`, '_blank');
            // let TRANSFER_BALANCE='TRANSFER_NONBUSINESS'
            //  window.open(`/order-center/apply-manage/_transferOperate/${TRANSFER_BALANCE}/create`, '_blank');
        },

        //转营业外
        handle2YYW() {
            this.operateTypeIndex = 1;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
        },

        //转余额
        handle2YE() {
            this.operateTypeIndex = 2;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
        },

        //押金转租金
        handleYJ2ZJ() {
            this.operateTypeIndex = 3;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');

        },

        //释放服务保证金
        handleReleaseFWBZJ() {
            this.operateTypeIndex = 4;
            let ui = this.operateTypes[this.operateTypeIndex].component;
            window.open(`/order-center/apply-manage/create/${ui}`, '_blank');
        },

        //查看申请
        handleCheckApplyInfo(params) {
            let transformtype = params.row.transferType;
            var viewName = this.transformType2UIDic[transformtype];

            window.open(`/order-center/apply-manage/${params.row.id}/${viewName}`, '_blank');
        },

        //退回申请
        handleShowRejectApply(params) {
            debugger;
            this.currentApplyId = params.row.id
            this.rejectModal = true;
        },
        handleShowDeleteApply(params) {
            this.currentApplyId = params.row.id
            this.deleteModal = true;
        },
        handeRejectApply() {
            let params = {
                id: this.currentApplyId,
                refundMemo: this.modalText
            }
            this.$http.post('get-apply-reject', params).then((response) => {
                this.$Notice.info({
                    title: '操作成功'
                });
                this.rejectModal = false;
                this.getAllApply();
                this.modalText = ''
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
                this.$set(this.UIShowAble, 'rejectModal', false)
            })
        },
        handeDeleteApply() {
            let params = {
                id: this.currentApplyId,
                refundMemo: this.modalText
            }
            this.$http.delete('get-apply-delete', params).then((response) => {
                this.$Notice.info({
                    title: '操作成功'
                });
                this.deleteModal = false;
                this.modalText = ''
                this.getAllApply();
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
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
    .apply-list-table{
        position: relative;
    }
}
.modal-container {
    padding: 0 15px;
    .modal-desc {
        font-size: 16px;
    }
    .modal-textarea {
        margin-top: 20px;
    }
}
</style>
