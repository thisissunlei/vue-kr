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
                    <selectCommunities test="formItem" :onchange="changeCommunity" @onGetCusomerList='onGetCusomerList' v-bind:customerId='formItem.customerID'></selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <div style="margin-bottom:30px">
                <Col class="col amount">
                <FormItem label="转移款项" style="width:700px" >
                    <CheckboxGroup v-model="checkGroup" @on-change='checkgroupchange'>
                        <ul>
                            <li v-for="(item,index) in moneyTypes" :key="item.code" :rowkey="index">
                                <Row :class="{firstrow:index===0}" class="amount-row">
                                    <Col class='amount-col1 '>
                                    <Checkbox :label="item.desc" />
                                    </Col>
                                    <Col class='amount-col2 '>
                                    <!-- <Input v-model="formItem.balanceOut" :placeholder="formatBlance(item.code)" style="width: 252px"></Input>
                                    <Button style='display:inline' type="text" @click='handleBlanceTransClk($event)'>全部转移</Button>
                                    <span class='blance-error'>error</span> -->
                                    <BlanceInputEdit :defaultValue="item.code" :blanceType="item.desc" @blanceChange='handleBlanceChange' :maxAmount='item.code' :placeholder="formatBlance(item.code)"/>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </CheckboxGroup>
                </FormItem>
                </Col>
            </div>

            <FormItem class="remark" label="备注" style="width:650px;">
                <Input v-model="formItem.remark" :maxlength="200" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/200":0+"/200"}}</div>
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
import utils from '~/plugins/utils';
import BlanceInputEdit from './blanceEdit.vue'


export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        BlanceInputEdit
    },

    data() {
        let maxbalanceOut = (this.maxbalanceOut / 100).toFixed(2);
        const validateFirst = (rule, value, callback) => {
            debugger;
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;

            if (isNaN(value)) {
                console.log('isNaN(value)', isNaN(value))
                callback(new Error('转移金额请填写数字'))
            }
            if (Number(value) > Number(maxbalanceOut)) {
                callback(new Error('转移金额不得大于可转金额'));
            }
            if (value === '') {
                callback(new Error('请填写转移金额'));
            } else {
                callback();
            }
        };
        return {
            // moneyTypes: [],//操作款项

            moneyTypes: [{ "code": -1, "desc": "全部" }, { "code": 1, "desc": "余额", "value": "BALANCE" }, { "code": 3, "desc": "可用服务保证金", "value": "DEPOSIT" }, { "code": 14, "desc": "门禁卡押金", "value": "GUARDCARDDEPOSIT" }, { "code": 4, "desc": "冻结服务保证金", "value": "FROZEN_DEPOSIT" }, { "code": 54, "desc": "推柜门钥匙押金", "value": "KEYDOORDEPOSIT" }, { "code": 57, "desc": "场地租赁押金", "value": "LEASEHOLDDEPOSIT" }, { "code": 58, "desc": "注册地址押金", "value": "REGISTEREDEPOSIT" }],

            checkGroup: [],
            maxAmount: '0',
            communitiesOut: [],
            communities: [],
            formItem: {
                customerID: 12246,
                communityIn: '',
                balanceOut:[],
                remark: ''
            },
            ruleCustom: {
                communityId: [
                    { required: true, message: '请选择社区', trigger: 'change' }
                ],
                customerID: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                balance: [
                    { required: true, trigger: 'change', validator: validateFirst }
                ]
            },
        }
    },
    mounted() {
        this.getMoneyTypeList();
    },
    methods: {
        handleBlanceChange(receiveBlance){
            console.log(receiveBlance)
        },
        checkgroupchange() {
            console.log(this.checkGroup)
        },
        //转移金额BtnClick
        handleBlanceTransClk(event) {
            let current = event.currentTarget;
            let target = event.target;
            let btn;
            if (current.nodeName.toLowerCase() === 'button') {
                btn = current;
            }
            else if (target.nodeName.toLowerCase() === 'button') {
                btn = target
            }
            let li = btn.parentElement.parentElement.parentElement;
            let maxamount = li.getAttribute('rowkey');
            console.log(maxamount)

        },
        formatBlance(blance) {
            return '最大' + utils.thousand((blance / 100).toFixed(2)) + '元'
        },
        //获取操作款项枚举
        getMoneyTypeList() {
            this.$http.get('get-money-type-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferFeeType'
            }).then((r) => {
                this.moneyTypes = [].concat(r.data);
                
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        getMaxAmount() {
            let maxAmount = 0
            let parms = {
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerID
            }
            var _this = this
            this.$http.post('get-max-amount', parms).then((r) => {
                _this.maxAmount = r.data
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })

            this.maxAmount = maxAmount;
        },
        changeCustomer(item) {
            this.formItem = Object.assign({}, this.formItem, { customerID: item }, { communityId: -1 });

        },
        changeCommunity(commIn) {
            this.$set(this.formItem, 'communityIn', commIn)
            this.getMaxAmount();
        },
        onGetCusomerList(list) {
            this.communities = [].concat(list);
        },
        handleSubmit(formItem) {
            debugger;
            let parms = {
                applyMemo: this.formItem.remark,
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerID,
                id: '',
                transferType: 'TRANSFER_COMMUNITY',
                detailList: [
                    {
                        communityIdIn: this.formItem.communityIn,
                        communityIdOut: this.formItem.communityOut,
                        transferAmount: this.formItem.balanceOut,
                        transferFeeType: ''
                    }
                ]
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
            min-width: 400px;
            display: inline-block;
            padding-right: 10px;
            vertical-align: top;
        }
        .amount {
            .ivu-form-item-content {
                width: 600px;
            }
            .ivu-checkbox-group {
                .amount-row {
                    top: 40px;
                    margin-bottom: 20px;
                    .amount-col1 {
                        width: 150px;
                        display: inline-block;
                    }
                    .amount-col2 {
                        width: 380px;
                        display: inline-block;
                    }
                }
                .firstrow {
                    .amount-col1 {
                        position: absolute;
                        left: 0px;
                    }
                    .amount-col2 {
                        position: absolute;
                        left: 150px;
                    }
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

