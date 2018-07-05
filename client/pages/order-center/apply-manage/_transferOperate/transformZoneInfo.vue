<template>
    <div class='create-apply-sq'>
        <SectionTitle title="同客户社区间转账申请详情查看"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="申请编号" style="width:252px" prop="customerId">
                    <!-- <selectCustomers name="formItem.applyNo" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem">{{formItem.applyNo}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="操作类型" style="width:252px" prop="customerId">
                    <!-- <selectCommunities test="formItem.operateType" :onchange="changeCommunity"></selectCommunities> -->
                    <span class="noEditFormItem">{{receivedApplyInfo.transferTypeName}}</span>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerId">
                    <span class="noEditFormItem">{{receivedApplyInfo.customerName}}</span>
                    <!-- <selectCustomers name="formItem.customerId" :value='formItem.customerId' :disabled="UIDisable.customer" :onchange="changeCustomer"></selectCustomers> -->
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转入社区名称" style="width:252px" prop="communityIdIn">
                    <Select v-model="formItem.communityIdIn" @on-change='changeCommunityIn' :disabled='UIDisable.cummunityOut' style="width:252px">
                        <Option v-for="item in communitiesIn" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="转出社区名称" style="width:252px" prop="communityIdOut">
                    <!-- <selectCommunities test="formItem" :disabled='UIDisable.cummunityOut' :onchange="changeCommunity" @onGetCmtsList='onGetCmtsList' v-bind:customerId='formItem.customerId'></selectCommunities>                        -->
                    <Select v-model="formItem.communityIdOut" @on-change='changeCommunityOut' :disabled='UIDisable.cummunityOut' style="width:252px">
                        <Option v-for="item in communitiesOut" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转移余额" style="width:252px" prop="transferAmount">
                    <Input v-model="formItem.transferAmount" :disabled="UIDisable.balance" :placeholder="getAmountPaleceholder()" style="width: 252px"></Input>
                </FormItem>
                </Col>
            </Row>

            <FormItem class="remark" label="备注" style="width:100%;">
                <Input v-model="formItem.applyMemo" :disabled='UIDisable.remark' :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.applyMemo?formItem.applyMemo.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="margin-top:40px">
                <div class="btnContainer">
                    <Button class='operateBtn' v-if='UIShowAble.editBtn' :disabled='UIDisable.editBtn' type="primary" @click="handleEdit">编辑</Button>
                    <Button class='operateBtn' v-if='UIShowAble.approveBtn' :disabled='UIDisable.approveBtn' type="primary" @click="handleSubmit('formItem')">{{approveBtnText}}</Button>
                    <Button class='operateBtn' v-if='UIShowAble.rejectBtn' :disabled='UIDisable.rejectBtn' type="primary" @click="handleShowReject">退回</Button>
                </div>
            </FormItem>

        </Form>
        <SectionTitle title="操作记录"></SectionTitle>
        <div class="apply-list-table">
            <!-- <Table :columns="operateHistoryTableColums" :data="logList" border class='list-table' /> -->
            <OperateLog :data="logList" class='list-table' />
        </div>
        <Modal title="退回申请" v-model="UIShowAble.rejectModal" ok-text='退回' @on-ok="handeRejectApply" class="vertical-center-modal">
            <div class='modal-container'>
                <p class='modal-desc'>退回原因</p>
                <Input class='modal-textarea' v-model="modalText" type="textarea" :rows="4" :maxlength='500' placeholder="请填写退回原因"></Input>
            </div>
        </Modal>
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import OperateLog from './operateLog.vue'

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        OperateLog
    },
    props: {
        maxbalanceOut: 0,
    },
    data() {
        const validateFirst = (rule, value, callback) => {
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (isNaN(value)) {
                callback(new Error('转移金额请填写数字'))
            }
            if (Number(value) > Number(this.maxAmount)) {
                callback(new Error('转移金额不得大于可转金额'));
            }
            if (value === '') {
                callback(new Error('请填写转移金额'));
            } else {
                callback();
            }
        };
        const validateCommunity = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择社区'));
            } else {
                callback();
            }
        };
        const validateCustomerId = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择客户'));
            } else {
                callback();
            }
        };
        return {
            UIShowAble: {
                editBtn: false,//true显示
                approveBtn: false,
                rejectBtn: false,
                rejectModal: false
            },
            UIDisable: {
                customer: true,//true 禁用
                cummunityIn: true,
                cummunityOut: true,
                balance: true,
                remark: true,
                editBtn: true,
                approveBtn: true,
                rejectBtn: true
            },
            maxAmount: 0,
            UIDisableBak: {},
            modalText: '',//退回备注
            receivedApplyInfo: {},
            communitiesOut: [],
            communitiesIn: [],
            communities: [],
            isFinancialSide: false,//是否财务端查看 
            transferStatus: '',//申请处理状态 
            approveBtnText: '同意',
            logList: [],
            UIDisableBak: {},
            formItem: {
                applyNo: '',
                operateType: '',
                customerId: '',
                communityIdOut: '',
                communityIdIn: '',
                transferAmount: 0,
                applyMemo: ''
            },
            ruleCustom: {
                communityIdIn: [
                    { required: true, trigger: 'change', validator: validateCommunity }
                ],
                communityIdOut: [
                    { required: true, trigger: 'change', validator: validateCommunity }
                ],
                customerId: [
                    { required: true, trigger: 'change', validator: validateCustomerId }
                ],
                transferAmount: [
                    { required: true, trigger: 'change', validator: validateFirst }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
        this.getInfo();
    },
    methods: {
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.transferOperate
            };
            this.$http.get('get-apply-info-id', from).then((response) => {
                this.receivedApplyInfo = response.data;
                this.logList = this.receivedApplyInfo.logList;
                this.isFinancialSide = this.receivedApplyInfo.financialSide;
                this.transferStatus = this.receivedApplyInfo.transferStatusName;
                this.formItem.communityIdIn = this.receivedApplyInfo.detailList[0].communityIdIn;
                this.formItem.communityIdOut = this.receivedApplyInfo.detailList[0].communityIdOut;
                this.formItem.customerId = this.receivedApplyInfo.customerId;
                this.getMaxAmount().then(() => {
                    let { customerId, applyNo, applyMemo, detailList, detailList: [{ communityIdIn, communityIdOut, transferAmount }] } = this.receivedApplyInfo;
                    let obj = { customerId, applyNo, applyMemo, communityIdIn, communityIdOut, transferAmount };
                    this.formItem = Object.assign({}, this.formItem, obj)
                    this.UIDisableBak = Object.assign({}, this.UIDisable);
                    this.getCusomerList(obj.customerId).then(
                        () => {
                            this.communitiesOut = [].concat(this.communities)
                            this.communitiesIn = [].concat(this.communities)
                        }
                    )
                });

            }).then(() => {
                this.checkRights();
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        checkRights(status, isFinancial) {
            let transferStatus = status || this.transferStatus;
            let isFinancialSide = isFinancial || this.isFinancialSide;
            if (transferStatus === '待处理') {
                if (isFinancialSide) {
                    this.UIShowAble = Object.assign({}, this.UIShowAble, { editBtn: false }, { approveBtn: true }, { rejectBtn: true })
                    this.UIDisable = Object.assign({}, this.UIDisable, { editBtn: true }, { approveBtn: false }, { rejectBtn: false })
                    this.approveBtnText = '同意'
                    this.UIDisable = Object.assign({}, this.UIDisable, { balance: true })
                }
            } else if (transferStatus === '已处理') {

            } else if (transferStatus === '已退回') {
                this.UIShowAble = Object.assign({}, this.UIShowAble, { editBtn: true }, { approveBtn: true }, { rejectBtn: false })
                this.UIDisable = Object.assign({}, this.UIDisable, { editBtn: false }, { approveBtn: false }, { rejectBtn: true })
                this.approveBtnText = '提交'
            }

        },
        getMaxAmount() {
            let parms = {
                communityId: this.formItem.communityIdOut,
                customerId: this.formItem.customerId,
                id: this.receivedApplyInfo.id
            }
            console.log(parms)
            return new Promise((resolve, reject) => {
                var _this = this
                this.$http.post('get-max-amount', parms).then((r) => {
                    let arr = r.data.filter(item => item.feeType == 'BALANCE')
                    if (r.data.length == 0 || arr.length == 0) {
                        _this.maxAmount = 0
                        _this.$Notice.info({
                            title: '无可用转移金额'
                        });
                    }
                    else {
                        _this.maxAmount = arr[0].maxAmount
                    }
                }).then(
                    () => {
                        resolve()
                    }
                ).catch((error) => {
                    _this.maxAmount = 0
                    this.$Notice.error({
                        title: error.message
                    });
                })
            })
            // var _this = this
            // this.$http.post('get-max-amount', parms).then((r) => {
            //     let arr = r.data.filter(item => item.feeType == 'BALANCE')

            //     if (r.data.length == 0 || arr.length == 0) {
            //         _this.maxAmount = 0
            //         _this.$Notice.info({
            //             title: '无可用转移金额'
            //         });
            //     }
            //     else {
            //         _this.maxAmount = arr[0].maxAmount
            //     }

            // }).catch((error) => {
            //     _this.maxAmount = 0
            //     this.$Notice.error({
            //         title: error.message
            //     });
            // })
        },
        changeCustomer() { },

        changeCommunityIn(commIn) {
            this.communitiesOut = [].concat(this.communities).filter(item => item.value != commIn)
        },
        changeCommunityOut(commOut) {
            this.communitiesIn = [].concat(this.communities).filter(item => item.value != commOut)
            this.getMaxAmount();
        },
        onGetCmtsList(list) {
            this.communities = [].concat(list);
        },
        getCusomerList(customerId) {
            let params = {
                customerId: Number(customerId)
            }
            return new Promise((resolve, reject) => {
                this.$http.get('get-cmts-customerid', params).then((response) => {
                    let list = [];
                    let _this = this;
                    response.data.map((item) => {
                        let obj = Object.create(null);
                        obj.label = item.name;
                        obj.value = item.id;
                        list.push(obj)
                    });
                    this.communities = [].concat(list);
                    resolve();
                })
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        getAmountPaleceholder() {
            if (this.maxAmount == 0) {
                return '无可用转移金额'
            }
            else {
                return "最大转移金额为" + this.maxAmount + '元'
            }
        },
        onGetCmtsList(list) {
            this.communities = [].concat(list);
            this.communitiesOut = list.filter(item => item.value !== this.formItem.communityIdIn)
        },
        handleEdit() {
            let obj = {
                customer: false,
                cummunityIn: false,
                cummunityOut: false,
                balance: false,
                remark: false,
                editBtn: false,
                approveBtn: false,
                rejectBtn: false
            };
            this.UIDisable = Object.assign({}, this.UIDisable, obj)

        },
        handleShowReject() {
            this.$set(this.UIShowAble, 'rejectModal', true)
        },
        handeRejectApply() {
            let params = {
                id: this.receivedApplyInfo.id,
                refundMemo: this.modalText
            }
            this.$http.post('get-apply-reject', params).then((response) => {
                this.UIShowAble = Object.assign({}, this.UIShowAble,
                    { editBtn: false },
                    { approveBtn: false },
                    { rejectBtn: false },
                    { rejectModal: false })
                this.$Notice.info({
                    title: '操作成功'
                });
                // this.getInfo();
                // this.checkRights();
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
                this.$set(this.UIShowAble, 'rejectModal', false)
            })
        },
        handleSubmit(formItem) {
            if (this.approveBtnText === '提交') {
                let detailStr = '';
                let detailList = []
                for (const key in this.balanceOut) {
                    if (this.balanceOut.hasOwnProperty(key)) {
                        let obj = {
                            communityIdIn: this.formItem.communityIn,
                            communityIdOut: this.formItem.communityIn,
                            transferAmount: this.balanceOut[key].input,
                            transferFeeType: this.balanceOut[key].feeType,
                        };
                        detailList.push(obj)
                    }
                }
                // 可能没有经过编辑 直接提交
                if (detailList.length == 0) {
                    detailStr = JSON.stringify(this.receivedApplyInfo.detailList)
                } else {
                    detailStr = JSON.stringify([].concat(detailList));
                }

                let parms = {
                    applyMemo: this.formItem.applyMemo.trim(),
                    communityId: this.receivedApplyInfo.communityId,
                    customerId: this.receivedApplyInfo.customerId,
                    id: this.receivedApplyInfo.id,
                    transferType: 'TRANSFER_COMMUNITY',
                    detailStr: detailStr
                }

                this.$http.post('get-apply-submit', parms).then((response) => {
                    this.$Notice.info({
                        title: '操作成功'
                    });
                    this.UIShowAble = Object.assign({}, this.UIShowAble, { approveBtn: false }, { editBtn: false })
                    this.UIDisable = Object.assign({}, this.UIDisableBak);
                }).catch((error) => {
                    this.$Notice.error({
                        title: error.message
                    });
                })
            }
            else if (this.approveBtnText === '同意') {
                this.$http.post('get-apply-approve', { id: this.receivedApplyInfo.id }).then((response) => {
                    this.$Notice.info({
                        title: '操作成功'
                    });
                    this.UIShowAble = Object.assign({}, this.UIShowAble, { approveBtn: false }, { editBtn: false })
                    this.UIDisable = Object.assign({}, this.UIDisableBak);
                }).catch((error) => {
                    this.$Notice.error({
                        title: error.message
                    });
                })
            }
        }

    }
}
</script>


<style lang="less">
.create-apply-sq {
    width: 60%;
    max-width: 800px;
    .creat-order-form {
        padding: 20px;
        .noEditFormItem {
            position: absolute;
            top: 25px;
            left: 10px;
        }
        .remark {
            width: 680px;
        }
        .col {
            width: 340px;
            min-width: 250px;
            display: inline-block;
            padding-right: 10px;
            vertical-align: top;
        }
        .vertical-center-modal {
            .modal-container {
                padding: 0 15px;
                .modal-desc {
                    font-size: 16px;
                }
                .modal-textarea {
                    margin-top: 20px;
                }
            }
        }
        .required-label {
            font-size: 14px;
            position: relative;
            margin-left: 5px;
            &:before {
                content: "*";
                color: red;
                position: absolute;
                font-size: 18px;
                left: -7px;
                top: 14px;
            }
        }
        .btnContainer {
            display: inline-block;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            .operateBtn {
                margin: 0 10px;
            }
        }
    }

    .apply-list-table {
        padding-top: 20px;
        .list-table {
            margin: 20px;
            margin-top: 0px;
        }
    }
}
</style>

