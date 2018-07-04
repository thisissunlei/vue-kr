<template>
    <div class='create-apply-sq'>
        <SectionTitle title="转营业外申请"></SectionTitle>
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
                <FormItem label="转移款项" style="width:700px" prop="balance">
                    <BlanceInputGroup :dataList='dataList' @onChange="handleBlanceChange"></BlanceInputGroup>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注" style="width:650px;">
                <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="padding-left:270px;margin-top:40px">
                <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
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
        };
        const validateCummity = (rule, value, callback) => {
            if (!value) {
                callback("请选择社区")
            }
        };

        return {
            dataList: [],
            defaultList: [
                { amount: "", maxAmount: "", feeTypeName: "余额", feeType: "BALANCE" },
                { amount: "", maxAmount: "", feeTypeName: "门禁卡押金", feeType: "GUARDCARDDEPOSIT" },
                { amount: "", maxAmount: "", feeTypeName: "其他保证金", feeType: "OTHERDEPOSIT" },
            ],
            communities: [],
            targetFeeTypes: ['余额', '门禁卡押金', '其他保证金'],
            formItem: {
                customerID: 12246,
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
        this.initCheckGroup();
    },
    methods: {
        initCheckGroup() {
            this.dataList = [].concat(this.defaultList);
        },
        handleBlanceChange(receiveBlance) {
            console.log(receiveBlance)
            this.formItem.balanceOut = Object.assign({}, receiveBlance)
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
                if (r.data.length == 0)
                    this.$Notice.info({
                        title: '无可用转移款项'
                    });
                let arr = r.data.filter(item => this.targetFeeTypes.includes(item.feeTypeName));//可用的转移项
                let arr2 = _this.defaultList.filter(item => arr.filter(item2 => (item.feeTypeName == item2.feeTypeName)).length == 0);//不可用的转移项
                _this.dataList = [].concat(arr, arr2);
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCustomer(item) {
            this.formItem = Object.assign({}, this.formItem, { customerID: item }, { communityId: -1 });
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
            let detailList = []
            for (const key in this.formItem.balanceOut) {
                if (this.formItem.balanceOut.hasOwnProperty(key)) {
                    let obj = {
                        communityIdIn: this.formItem.communityIn,
                        communityIdOut: this.formItem.communityIn,
                        transferAmount: this.formItem.balanceOut[key].input,
                        transferFeeType: this.formItem.balanceOut[key].feeType,
                    };
                    detailList.push(obj)

                }
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

