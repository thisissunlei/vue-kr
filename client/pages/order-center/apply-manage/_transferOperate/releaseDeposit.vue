<template>
    <div class='create-apply-sq'>
        <SectionTitle title="释放服务保证金申请"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerID">
                    <selectCustomers name="formItem.customerID" :onchange="changeCustomer"></selectCustomers>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="社区名称" style="width:252px" prop="communityId">
                    <selectCommunities test="formItem" :onchange="changeCommunity" @onGetCusomerList='onGetCusomerList' v-bind:customerId='formItem.customerID'>
                    </selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <div style="margin-bottom:30px">
                <Col class="col amount">
                <!-- <FormItem label="转移款项" style="width:700px" prop="balance">
                    <BlanceInputGroup :dataList='dataList' @onChange="handleBlanceChange"></BlanceInputGroup>
                </FormItem> -->
                <FormItem class='formitem-balance' label="释放冻结保证金金额" style="width:700px " prop="transferAmount">
                    <div class='balance-container'>
                        <Input v-model="formItem.transferAmount" :placeholder="formatBlance(maxAmount)" style="width:252px;" />
                        <Button style='display:inline' type="text" @click='handleBlanceTransClk'>全部转移</Button>
                    </div>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注" style="width:650px;">
                <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="padding-left:270px;margin-top:40px">
                <Button :disabled="submitBtnDisable" type="primary" @click="handleSubmit('formItem')">提交</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import BlanceInputEdit from './blanceEdit.vue'
import BlanceInputGroup from './blanceEdit.1.vue'
import utils from '~/plugins/utils';

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        BlanceInputEdit,
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
            }
            if (Number(value) == 0) {
                callback(new Error('转移金额须大于0'));
            }
            else {
                callback();
            }
        };
        const validateCustomer = (rule, value, callback) => {
            debugger
            if (!value || value == '-1') {
                callback("请选择客户")
            } else {
                callback();
            }
        };
        const validateCummity = (rule, value, callback) => {

            if (!value || value == '-2') {
                callback("请选择社区")
            } else {
                callback();
            }
        };

        return {
            submitBtnDisable: false,
            maxAmount: 0,
            dataList: [],
            communities: [],
            targetFeeType: 'FROZEN_DEPOSIT',
            targetFeeTypes: ['冻结服务保证金'],
            formItem: {
                transferAmount: '',
                customerID:'',
                communityIn: '',
                balanceOut: {},
                remark: ''
            },
            ruleCustom: {
                communityId: [
                    { required: true, validator: validateCummity, trigger: 'change' }
                ],
                customerID: [
                    { required: true, validator: validateCustomer, trigger: 'change' }
                ],
                transferAmount: [
                    { required: true, validator: validateBlance, trigger: 'change' }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
    },
    methods: {
        formatBlance(blance) {
            return '最大' + utils.thousand((blance || 0).toFixed(2)) + '元'
        },
        handleBlanceTransClk() {
            this.formItem.transferAmount = this.maxAmount
        },
        handleBlanceChange(receiveBlance) {
            console.log(receiveBlance)
            this.formItem.balanceOut = Object.assign({}, receiveBlance)
        },
        getFeeAmount() {
            let parms = {
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerID,
                id: ''
            }
            if (!parms.communityId || !parms.customerId)
                return
            var _this = this
            this.$http.get('get-max-amount', parms).then((r) => {

                let arr = r.data.filter(item => this.targetFeeTypes.includes(item.feeTypeName))
                if (arr.length == 0) {
                    _this.maxAmount = 0
                    _this.$Notice.info({
                        title: '无可用转移款项'
                    });
                    _this.submitBtnDisable = true;
                }
                else {
                    _this.maxAmount = arr[0].maxAmount
                    _this.dataList = arr;
                    _this.submitBtnDisable = false;
                }
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCustomer(item) {
            this.formItem = Object.assign(this.formItem, { customerID: item }, { communityId: -1 });
            this.getFeeAmount();
        },
        changeCommunity(commIn) {
            this.$set(this.formItem, 'communityIn', commIn)
            this.getFeeAmount();
        },
        onGetCusomerList(list) {
            this.communities = [].concat(list);
        },

        handleSubmit(formItem) {
            this.$refs[formItem].validate((valid) => {
                if (!valid) {
                    this.$Notice.error({
                        title: '请填写完表单'
                    });
                    return;
                }
                else {
                    execSubmit(formItem)
                }
            }
            )
        },
        execSubmit(formItem) {
            let detailList = []
            let obj = {
                transferAmount: this.formItem.transferAmount,
                transferFeeType: this.targetFeeType
            }
            detailList.push(obj)

            let detailStr = JSON.stringify([].concat(detailList));
            let parms = {
                applyMemo: this.formItem.remark,
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerID,
                id: '',
                transferType: 'TRANSFER_LOCK_DEPOSIT',
                detailStr: detailStr
            }
            this.$http.post('get-apply-submit', parms).then((response) => {
                this.submitBtnDisable = true;
                this.$Notice.info({
                    title: '操作成功'
                });
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

