<template>
    <div class='create-apply-sq'>
        <SectionTitle title="同客户社区间转账申请"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerId">
                    <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转入社区名称" style="width:252px" prop="communityIn">
                    <!-- <selectCommunities test="formItem" :onchange="changeCommunity" @onGetCmtsList='onGetCmtsList' v-bind:customerId='formItem.customerId'></selectCommunities> -->
                    <Select v-model="formItem.communityIn" @on-change='changeCommunityIn' style="width:252px">
                        <Option v-for="item in communitiesIn" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="转出社区名称" style="width:252px" prop="communityOut">
                    <!-- <selectCommunities test="formItem.communityIn" :onchange="changeCommunity"></selectCommunities> -->
                    <Select v-model="formItem.communityOut" @on-change='changeCommunityOut' style="width:252px">
                        <Option v-for="item in communitiesOut" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转移余额" style="width:252px" prop="balanceOut">
                    <Input v-model="formItem.balanceOut" :placeholder="getAmountPaleceholder()" style="width: 252px"></Input>
                    <!-- <BlanceInputEdit :defaultValue="item.code" :blanceType="item.desc" @blanceChange='handleBlanceChange' :maxAmount='item.code' :placeholder="formatBlance(item.code)" /> -->
                </FormItem>
                </Col>
            </Row>

            <FormItem class="remark" label="备注" style="width:650px;">
                <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="padding-left:270px;margin-top:40px">
                <Button :disabled='submitBtnShow' type="primary" @click="handleSubmit('formItem')">提交</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import BlanceInputEdit from './blanceEdit.vue'
export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers
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
                callback(new Error('请选择社区'));
            } else {
                callback();
            }
        };
        return {
            submitBtnShow: false,
            maxAmount: 0,
            communitiesIn: [],
            communitiesOut: [],
            communities: [],
            formItem: {
                customerId: '',
                communityOut: '',
                communityIn: '',
                balanceOut: '',
                remark: ''
            },
            ruleCustom: {
                communityIn: [
                    { required: true, trigger: 'change', validator: validateCommunity }
                ],
                communityOut: [
                    { required: true, trigger: 'change', validator: validateCommunity }
                ],
                // customerId: [
                //     { required: true, trigger: 'change', validator: validateCustomerId }
                // ],
                customerId: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                balanceOut: [
                    { required: true, trigger: 'change', validator: validateFirst }
                ]
            },
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
    },
    methods: {
        getMaxAmount() {
            let parms = {
                communityId: this.formItem.communityOut,
                customerId: this.formItem.customerId
            }
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

            }).catch((error) => {
                this.submitBtnShow = false;
                _this.maxAmount = 0
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCustomer(item) {
            this.communitiesOut = [];
            this.communitiesIn = []
            this.formItem = Object.assign(this.formItem, { customerId: item })
            this.getCusomerList(item).then(
                () => {
                    this.communitiesOut = [].concat(this.communities)
                    this.communitiesIn = [].concat(this.communities)
                }
            )
        },
        changeCommunityIn(commIn) {
            this.communitiesOut = [].concat(this.communities).filter(item => item.value != commIn)
        },
        changeCommunityOut(commOut) {
            this.communitiesIn = [].concat(this.communities).filter(item => item.value != commOut)
            this.getMaxAmount()
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
        execSunmit(formItem) {
            // window.close()
            // window.open(`/order-center/apply-manage/_transferOperate`,'_self');
            let parms = {
                applyMemo: this.formItem.remark,
                communityId: this.formItem.communityIn,
                customerId: this.formItem.customerId,
                id: '',
                transferType: 'TRANSFER_COMMUNITY',
                detailStr: JSON.stringify([
                    {
                        communityIdIn: this.formItem.communityIn,
                        communityIdOut: this.formItem.communityOut,
                        transferAmount: this.formItem.balanceOut,
                        transferFeeType: 'BALANCE'
                    }
                ])
            }
            this.$http.post('get-apply-submit', parms).then((response) => {
                this.submitBtnShow = true;
                this.$Notice.info({
                    title: '操作成功'
                });

            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        handleSubmit(formItem) {
            // window.close()
            // window.open(`/order-center/apply-manage/_transferOperate`,'_self');
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

