<template>
    <div class='create-apply-sq'>
        <SectionTitle title="转营业外申请详情"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="申请编号" style="width:180px" prop="customerID">
                    <!-- <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.applyNo}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="操作类型" style="width:180px" prop="communityId">
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.transferTypeName}}</span>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:180px" prop="customerID">
                    <!-- <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem no-edit-customer">{{receivedApplyInfo.customerName}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="社区名称" style="width:180px" prop="communityId">
                    <selectCommunities :test="formItem" :disabled='UIDisable.cummunityIn' :onchange="changeCommunity" @onGetCusomerList='onGetCusomerList' :customerId='formItem.customerId'>
                    </selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <div style="margin-bottom:30px">
                <Col class="col amount">
                <FormItem label="转移款项" style="width:700px" prop="balance">
                    <BlanceInputGroup :dataList='feeTypeArray' :readOnly='UIDisable.balance' @onChange="handleBlanceChange"></BlanceInputGroup>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注">
                <Input v-model="formItem.remark" :disabled='UIDisable.remark' :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="margin-top:40px">
                <div class="btnContainer">
                    <Button class='operateBtn' v-if='UIShowAble.editBtn' :disabled='UIDisable.editBtn' type="primary" @click="handleEdit">编辑</Button>
                    <Button class='operateBtn' v-if='UIShowAble.approveBtn' :disabled='UIDisable.approveBtn' type="primary" @click="handleSubmit('formItem')">{{approveBtnText}}</Button>
                    <Button class='operateBtn' v-if='UIShowAble.rejectBtn' :disabled='UIDisable.rejectBtn' type="primary" @click="handleReject('formItem')">退回</Button>
                </div>
            </FormItem>
        </Form>
        <SectionTitle title="操作记录"></SectionTitle>
        <div class="apply-list-table">
            <!-- <Table :columns="operateHistoryTableColums" :data="operateHistoryData" border class='list-table' /> -->
            <OperateLog :data="operateHistoryData" class='list-table' />
        </div>
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
            callback()
            return;
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
                rejectBtn: false
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
            receivedApplyInfo: {},
            feeTypeArray: [],
            communities: [],
            isFinancialSide: false,//是否财务端查看 
            transferStatus: '',//申请处理状态 
            approveBtnText: '同意',
            operateHistoryData: [],
            formItem: {
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
                balance: [
                    { required: true, trigger: 'change', validator: validateBlance }
                ]
            },
        }
    },
    mounted() {
        this.getInfo();
        this.checkRights();
    },
    methods: {
        //获取申请单详细信息
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.transferOperate
            };
            this.$http.get('get-apply-info-id', from).then((response) => {
                let obj = response.data;
                this.receivedApplyInfo = Object.assign({}, obj)
                this.formItem = Object.assign({}, { customerId: obj.customerId }, { communityIn: obj.communityId }, { communityId: obj.communityId }, { remark: obj.applyMemo }, { detailList: obj.detailList })
                console.log('转移社区', this.formItem.communityIn)
                this.getFeeAmount();
            }
            ).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //校验查看编辑权限
        checkRights(status, isFinancialSide) {
            //   UIShowAble: {
            //         editBtn: false,//true显示
            //         approveBtn: false,
            //         rejectBtn: false
            //     },
            //  UIDisable: {
            //         customer: true,//true 禁用
            //         cummunityIn: true,
            //         cummunityOut: true,
            //         balance: true,
            //         remark: true,
            //         editBtn: false,
            //         approveBtn: false,
            //         rejectBtn: false
            //     },

            if (status === '待处理') {
                if (isFinancialSide) {
                    this.UIShowAble = Object.assign({}, this.UIShowAble, { editBtn: true }, { approveBtn: true }, { rejectBtn: true })
                    this.UIDisable = Object.assign({}, this.UIDisable, { editBtn: false }, { approveBtn: false }, { rejectBtn: false })
                }
            } else if (status === '已处理') {

            } else if (status === '已退回') {
                this.UIShowAble = Object.assign({}, this.UIShowAble, { editBtn: true }, { approveBtn: true }, { rejectBtn: false })
                this.UIDisable = Object.assign({}, this.UIDisable, { editBtn: false }, { approveBtn: false }, { rejectBtn: true })
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

                _this.feeTypeArray = [].concat(r.data);
                var list = [];
                _this.receivedApplyInfo.detailList.map(item => {
                    list.push({
                        feeType: item.transferFeeType,
                        feeTypeName: item.transferFeeTypeName,
                        amount: item.transferAmount,
                        maxAmount: _this.getMaxFeeMonut(item.transferFeeType)
                    })
                })
                _this.feeTypeArray = [].concat(list);

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
            console.log(receiveBlance)
            this.formItem.balanceOut = Object.assign({}, receiveBlance)
        },
        //校验必填项
        verifyBlance() {
            let hasError = true //无错误
            this.checkGroup.map(item => {
                hasError = hasError && this.formItem.balanceOut[item].error
            })
            return !hasError
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
        handleReject() { },
        handleSubmit(formItem) {

            if (!this.verifyBlance()) {
                this.$Notice.error({ title: '转移金额填写有误' });
                return
            }
            let detailList = []
            this.checkGroup.map(item => {
                this.formItem.balanceOut[item]
                let obj = {
                    communityIdIn: this.formItem.communityIn,
                    communityIdOut: this.formItem.communityIn,
                    transferAmount: this.formItem.balanceOut[item].blance,
                    transferFeeType: this.formItem.balanceOut[item].blanceType,
                };
                detailList.push(obj)
            })

            let parms = {
                applyMemo: this.formItem.remark,
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerId,
                id: '',
                transferType: 'TRANSFER_NONBUSINESS',
                detailList: [].concat(detailList)
            }
            this.$http.post('get-apply-submit', parms).then((response) => {
                this.basicInfo = response.data;
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
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
}
</style>

