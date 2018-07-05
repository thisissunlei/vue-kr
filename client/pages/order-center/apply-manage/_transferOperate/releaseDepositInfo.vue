<template>
    <div class='create-apply-sq'>
        <SectionTitle title="释放服务保证金申请详情"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="申请编号" style="width:252px" prop="customerID">
                    <!-- <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.applyNo}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="操作类型" style="width:252px" prop="communityId">
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.transferTypeName}}</span>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerID">
                    <!-- <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.customerName}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="社区名称" style="width:252px" prop="communityId">
                    <selectCommunities :test="formItem" :disabled='UIDisable.cummunityIn' :onchange="changeCommunity" @onGetCusomerList='onGetCusomerList' :customerId='formItem.customerId'>
                    </selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <div style="margin-bottom:30px">
                <Col class="col amount">
                <FormItem class='formitem-balance' label="释放冻结保证金金额" style="width:700px " prop="transferAmount">
                    <div class='balance-container'>
                        <Input :disabled='UIDisable.balance' v-model="formItem.transferAmount" :placeholder="formatBlance(maxAmount)" style="width:252px;" />
                        <Button :disabled='UIDisable.balance' style='display:inline' type="text" @click='handleBlanceTransClk'>全部转移</Button>
                    </div>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注">
                <Input v-model="formItem.remark" :disabled='UIDisable.remark' :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="margin-top:40px;width:700px">
                <div class="btnContainer">
                    <Button class='operateBtn' v-if='UIShowAble.editBtn' :disabled='UIDisable.editBtn' type="primary" @click="handleEdit">编辑</Button>
                    <Button class='operateBtn' v-if='UIShowAble.approveBtn' :disabled='UIDisable.approveBtn' type="primary" @click="handleSubmit('formItem')">{{approveBtnText}}</Button>
                    <Button class='operateBtn' v-if='UIShowAble.rejectBtn' :disabled='UIDisable.rejectBtn' type="primary" @click="handleShowReject">退回</Button>
                </div>
            </FormItem>
        </Form>
        <SectionTitle title="操作记录"></SectionTitle>
        <div class="apply-list-table">
            <!-- <Table :columns="operateHistoryTableColums" :data="operateHistoryData" border class='list-table' /> -->
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
import utils from '~/plugins/utils';
import BlanceInputEdit from './blanceEdit.vue'
import OperateLog from './operateLog.vue'
import BlanceInputGroup from './blanceEdit.1.vue'

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        BlanceInputEdit,
        OperateLog,
        BlanceInputGroup
    },

    data() {
        const validateBlance = (rule, value, callback) => {
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
        const validateCustomer = (rule, value, callback) => {
            if (!value) {
                callback("请选择客户")
            }
        };
        const validateCummity = (rule, value, callback) => {
            if (!value) {
                callback("请选择社区")
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
            rejectModal: false,
            modalText: '',//退回备注
            targetFeeTypes: ['冻结服务保证金'],
            receivedApplyInfo: {},
            feeTypeArray: [],
            communities: [],
            isFinancialSide: false,//是否财务端查看 
            transferStatus: '',//申请处理状态 
            approveBtnText: '同意',
            logList: [],
            balanceOut: {},
            formItem: {
                transferAmount: '',
                customerId: 0,
                communityIn: 0,
                communityId: '',
                detailList: [],
                remark: ''
            },
            ruleCustom: {
                communityId: [
                    { required: true, trigger: 'change', validator: validateCummity }
                ],
                customerID: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                transferAmount: [
                    { required: true, trigger: 'change', validator: validateBlance }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
        this.getInfo();
    },
    methods: {
        handleBlanceTransClk() {
            this.formItem.transferAmount = this.maxAmount
        },
        formatBlance(blance) {
            return '最大' + utils.thousand((blance || 0).toFixed(2)) + '元'
        },
        //获取申请单详细信息
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.transferOperate
            };
            this.$http.get('get-apply-info-id', from).then((response) => {
                let obj = response.data;
                this.receivedApplyInfo = Object.assign({}, obj)
                this.logList = this.receivedApplyInfo.logList;
                this.isFinancialSide = this.receivedApplyInfo.financialSide;
                this.transferStatus = this.receivedApplyInfo.transferStatusName;
                this.formItem = Object.assign({}, { customerId: obj.customerId }, { communityIn: obj.communityId }, { communityId: obj.communityId }, { remark: obj.applyMemo })
                this.getFeeAmount();
                this.UIDisableBak = Object.assign({}, this.UIDisable);
            }
            ).then(() => {
                this.checkRights()
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //校验查看编辑权限
        checkRights(status, isFinancial) {
            let transferStatus = status || this.transferStatus;
            let isFinancialSide = isFinancial || this.isFinancialSide;
            // transferStatus = '已退回'
            // isFinancialSide = true;
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
        //获取转移款项
        getFeeAmount() {

            let parms = {
                communityId: this.formItem.communityId,
                customerId: this.formItem.customerId,
                id: this.receivedApplyInfo.id
            }
            var _this = this
            this.$http.get('get-max-amount', parms).then((r) => {
                if (r.data.length == 0)
                    this.$Notice.info({
                        title: '无可用转移款项'
                    });
                let arr = r.data.filter(item => this.targetFeeTypes.includes(item.feeTypeName))
                _this.maxAmount = arr[0].maxAmount
                _this.feeTypeArray = arr;
                _this.formItem = Object.assign({}, _this.formItem, { transferAmount: this.receivedApplyInfo.detailList[0].transferAmount })
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //获取该款项最大的转移值
        getMaxFeeMonut(feeType) {
            let arr = this.feeTypeArray.filter(item => item.feeType == feeType)
            if (arr.length > 0) {
                return arr[0].maxAmount;
            }
            else {
                return 0;
            }
        },

        //更改客户后重新获取转移款项
        changeCustomer(item) {
            this.formItem = Object.assign({}, this.formItem, { customerId: item }, { communityId: -1 });
            this.getFeeAmount();
        },
        //更改社区后重新获取转移款项
        changeCommunity(commIn) {
            this.$set(this.formItem, 'communityIn', commIn)
            this.getFeeAmount();
        },
        onGetCusomerList(list) {
            this.communities = [].concat(list);
        },
        //接收勾选的转移款项
        handleBlanceChange(receiveBlance) {
            this.balanceOut = Object.assign({}, receiveBlance)
        },
        //校验必填项
        verifyBlance() {
            // let hasError = true //无错误
            // this.checkGroup.map(item => {
            //     hasError = hasError && this.formItem.balanceOut[item].error
            // })
            // return !hasError
            if (this.receivedApplyInfo.applyMemo === this.formItem.remark.trim()) {
                if (this.approveBtnText === '同意') {
                    return true
                }
                else if (Object.keys(this.balanceOut) == 0) {
                    return false
                }
            }
            else
                return true;
            return true;
        },
        //开启编辑
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
                    { rejectBtn: false })
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
            if (!this.verifyBlance()) {
                this.$Notice.error({ title: '请编辑后再提交' });
                return
            }

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
                    applyMemo: this.formItem.remark.trim(),
                    communityId: this.receivedApplyInfo.communityId,
                    customerId: this.receivedApplyInfo.customerId,
                    id: this.receivedApplyInfo.id,
                    transferType: 'TRANSFER_LOCK_DEPOSIT',
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
            } else if (this.approveBtnText === '同意') {
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
    .creat-order-form {
        padding: 20px;
        .remark {
            width: 680px;
        }
        .col {
            width: 340px;
            min-width: 250px;
            display: inline-block;
            padding-right: 10px;
            vertical-align: top;
            .no-edit-customer {
                position: relative;
                top: 30px;
                left: -62px;
            }
            .formitem-balance {
                .ivu-form-item-error-tip {
                    top: 200%;
                }
                .balance-container {
                    position: relative;
                    top: 36px;
                    left: -134px;
                }
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
    }
    .apply-list-table {
        width: 720px;
    }
}
</style>

