<template>
    <div class='create-apply-sq'>
        <SectionTitle title="转营业外申请"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerID">
                    <selectCustomers url="get-customer-noAuth" types="ajax"  :onchange="changeCustomer"></selectCustomers>
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
                <FormItem label="转移款项" style="width:700px" prop="balance">
                    <BlanceInputGroup :readOnly="blanceInputGroupReadOnly" :dataList='dataList' @onChange="handleBlanceChange" @onCheckGroupChange='handleCheckGroupChange'></BlanceInputGroup>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注" style="width:650px;">
                <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="padding-left:270px;margin-top:40px">
                <Button type="primary" :disabled='submitBtnShow' @click="handleSubmit('formItem')">提交</Button>
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


export default {
    head() {
        return {
            title: '转营业外-氪空间后台管理系统'
        }
    },
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        BlanceInputEdit,
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
            else callback()
        };
        const validateCummity = (rule, value, callback) => {
            if (!value) {
                callback("请选择社区")
            } else callback()
        };

        return {
            checkBalance:[],
            blanceInputGroupReadOnly: false,
            submitBtnShow: true,
            dataList: [],
            defaultList: [
                { amount: "", maxAmount: "", feeTypeName: "余额", feeType: "BALANCE" },
                { amount: "", maxAmount: "", feeTypeName: "门禁卡押金", feeType: "GUARDCARDDEPOSIT" },
                { amount: "", maxAmount: "", feeTypeName: "其他保证金", feeType: "OTHERDEPOSIT" },
            ],
            communities: [],
            targetFeeTypes: ['余额', '门禁卡押金', '推柜门钥匙押金', '场地租赁押金', '注册地址押金'],
            formItem: {
                customerID: "",
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
                balance: [
                    { required: true, validator: validateBlance, trigger: 'change' }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
        // this.initCheckGroup();
    },
    methods: {
        initCheckGroup() {
            this.dataList = [].concat(this.defaultList);
        },
        handleBlanceChange(receiveBlance) {
            console.log(receiveBlance)
            this.formItem.balanceOut = Object.assign({}, receiveBlance)
        },
        handleCheckGroupChange(checkItems) {
            this.checkBalance = [].concat(checkItems)
        },
        //获取操作款项枚举
        getMoneyTypeList() {
            this.moneyTypes = [{ "code": -1, "desc": "全部" }, { "code": 1, "desc": "余额", "value": "BALANCE" }, { "code": 3, "desc": "可用服务保证金", "value": "DEPOSIT" }, { "code": 14, "desc": "门禁卡押金", "value": "GUARDCARDDEPOSIT" }, { "code": 4, "desc": "冻结服务保证金", "value": "FROZEN_DEPOSIT" }, { "code": 54, "desc": "推柜门钥匙押金", "value": "KEYDOORDEPOSIT" }, { "code": 57, "desc": "场地租赁押金", "value": "LEASEHOLDDEPOSIT" }, { "code": 58, "desc": "注册地址押金", "value": "REGISTEREDEPOSIT" }];
            let canEdit = {};
            this.moneyTypes.map(item => {
                canEdit[item.desc] = false
            })
            this.initBlanceCanEdit = Object.assign({}, canEdit);
            this.blanceCanEdit = Object.assign({}, canEdit)

            // [{code label amountmax blance}]
            this.dataList = [
                { 'amountmax': 20, 'blance': 10, "code": -1, "label": "全部" },
                { 'amountmax': 20, 'blance': 11, "code": 1, "label": "余额", "value": "BALANCE" },
                { 'amountmax': 20, 'blance': 12, "code": 3, "label": "可用服务保证金", "value": "DEPOSIT" },
                { 'amountmax': 20, 'blance': 13, "code": 14, "label": "门禁卡押金", "value": "GUARDCARDDEPOSIT" },
                { 'amountmax': 20, 'blance': 14, "code": 4, "label": "冻结服务保证金", "value": "FROZEN_DEPOSIT" },
                { 'amountmax': 20, 'blance': 15, "code": 54, "label": "推柜门钥匙押金", "value": "KEYDOORDEPOSIT" },
                { 'amountmax': 20, 'blance': 16, "code": 57, "label": "场地租赁押金", "value": "LEASEHOLDDEPOSIT" },
                { 'amountmax': 20, 'blance': 17, "code": 58, "label": "注册地址押金", "value": "REGISTEREDEPOSIT" }];


            return

            this.$http.get('get-money-type-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferFeeType'
            }).then((r) => {
                this.dataList = [].concat(r.data);

            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
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
                let arr = r.data.filter(item => this.targetFeeTypes.includes(item.feeTypeName));//可用的转移项
                // let arr2 = _this.defaultList.filter(item => arr.filter(item2 => (item.feeTypeName == item2.feeTypeName)).length == 0);//不可用的转移项
                // _this.dataList = [].concat(arr, arr2);
                _this.dataList = [].concat(arr);
                if (arr.length == 0) {
                    this.$Notice.error({
                        title: '无可用转移款项'
                    });
                    _this.submitBtnShow = true;
                }
                else {
                    _this.submitBtnShow = false;
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
             this.checkBalance = []
        },
        changeCommunity(commIn) {
            this.$set(this.formItem, 'communityIn', commIn)
            this.getFeeAmount();
             this.checkBalance = []
        },
        onGetCusomerList(list) {
            this.communities = [].concat(list);
        },
        execSubmit(formItem) {
            let detailList = []
            let balanceOut = Object.assign({}, this.formItem.balanceOut)
            for (const key in balanceOut) {
                if (balanceOut.hasOwnProperty(key)&& this.checkBalance.includes(key)) {
                    if (balanceOut[key].error) {
                        this.$Notice.error({
                            title: '输入转移金额有误'
                        });
                        return
                    }
                    if (!balanceOut[key].input) {
                        this.$Notice.error({
                            title: '请填写要转移的款项: ' + key
                        });
                        return;
                    }
                    let obj = {
                        // communityIdIn: this.formItem.communityIn,
                        // communityIdOut: this.formItem.communityIn,
                        transferAmount: balanceOut[key].input,
                        transferFeeType: balanceOut[key].feeType,
                    };
                    detailList.push(obj)

                }
            }
            if (detailList.length == 0) {
                this.$Notice.error({
                    title: '请填写转移款项'
                });
                return
            }
            let detailStr = JSON.stringify([].concat(detailList));
            let parms = {
                applyMemo: this.formItem.remark,
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerID,
                id: '',
                transferType: 'TRANSFER_NONBUSINESS',
                detailStr: detailStr
            }
            this.$http.post('get-apply-submit', parms).then((response) => {
                this.submitBtnShow = true;
                this.blanceInputGroupReadOnly = true;
                this.$Notice.info({
                    title: '操作成功'
                });
                setTimeout(() => {
                    window.close()
                    window.opener.location.reload()
                }, 1000)
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
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
                    this.execSubmit(formItem)
                }
            }
            )
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

