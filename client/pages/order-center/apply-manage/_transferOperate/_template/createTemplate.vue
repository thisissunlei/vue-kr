<template>
    <div class='create-apply-sq'>
        <SectionTitle :title="title"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerId">
                    <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="社区名称" style="width:252px" prop="communityId">
                    <selectCommunities test="formItem" :onchange="changeCommunity" @onGetCusomerList='onGetCusomerList' v-bind:customerId='formItem.customerId'>
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
                <Input v-model="formItem.applyMemo" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.applyMemo?formItem.applyMemo.length+"/500":0+"/500"}}</div>
            </FormItem>

            <FormItem style="padding-left:270px;margin-top:40px">
                <Button type="primary":disabled='submitBtnShow' @click="handleSubmit('formItem')">提交</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import BlanceInputEdit from '../blanceEdit.vue'
import BlanceInputGroup from '../blanceEdit.1.vue'


export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        BlanceInputEdit,
        BlanceInputGroup
    },
    props: {
        //新建的标题
        title: {
            type: String,
            default: '新建'
        },
        //要转换的类型
        defaultList: {
            required: true,
            type: Array,
        },
        //转换的类型
        transferType: {
            required: true,
            type: String
        },
    },
    data() {
        const validateBlance = (rule, value, callback) => {
            callback()
            return;
        };
        const validateCustomer = (rule, value, callback) => {
            debugger;
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
            submitBtnShow:false,
            dataList: [],
            communities: [],
            formItem: {
                customerId: ' ',
                communityId: '',
                balanceOut: {},
                applyMemo: ''
            },
            ruleCustom: {
                communityId: [
                    { required: true, validator: validateCummity, trigger: 'change' }
                ],
                customerId: [
                    { required: true, validator: validateCustomer, trigger: 'change' }
                ],
                balance: [
                    { required: true, validator: validateBlance, trigger: 'change' }
                ]
            },
        }
    },
    computed: {
        targetFeeTypes() {
            return this.defaultList.reduce((acc, item) => acc.concat(item.feeTypeName), [])
        }
    },
    mounted() {
        this.initCheckGroup();
    },
    methods: {
        //默认的转移款项
        initCheckGroup() {
            this.dataList = [].concat(this.defaultList);
        },
        //后去勾选的转移款项
        handleBlanceChange(receiveBlance) {
            console.log(receiveBlance)
            this.formItem.balanceOut = Object.assign({}, receiveBlance)
        },
        //获取最大的款项值
        getFeeAmount() {
            let { communityId, customerId } = this.formItem
            let parms = { communityId, customerId, id: '' };
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
            this.formItem = Object.assign({}, this.formItem, { customerId: item }, { communityId: -1 });
            this.getFeeAmount();
        },
        changeCommunity(commIn) {
            this.$set(this.formItem, 'communityId', commIn)
            this.getFeeAmount();
        },
        onGetCusomerList(list) {
            this.communities = [].concat(list);
        },
        validateInput() {
            let balancesInputs = Object.values(this.formItem.balanceOut);
            if (balancesInputs.length == 0) {
                this.$Notice.error({
                    title: '请勾选转移项并填写转移金额'
                });
                return false
            } else {
                let hasError = balancesInputs.some(item => item.error)
                if (hasError) {
                    this.$Notice.error({
                        title: '请正确输入转移金额'
                    });
                    return false
                }
            }
            return true
        },
        handleSubmit(formItem) {
            if (this.validateInput()) {
                return;
            }

            let detailList = []
            for (const key in this.formItem.balanceOut) {
                if (this.formItem.balanceOut.hasOwnProperty(key)) {
                    let obj = {
                        communityIdIn: this.formItem.communityId,
                        communityIdOut: this.formItem.communityId,
                        transferAmount: this.formItem.balanceOut[key].input,
                        transferFeeType: this.formItem.balanceOut[key].feeType,
                    };
                    detailList.push(obj)
                }
            }
            let detailStr = JSON.stringify([].concat(detailList));
            let parms = {
                applyMemo: this.formItem.applyMemo,
                communityId: this.formItem.communityId,
                customerId: this.formItem.customerId,
                id: '',
                transferType: this.transferType,
                detailStr: detailStr
            }
            this.$http.post('get-apply-submit', parms).then((response) => {
                this.basicInfo = response.data;
                this.submitBtnShow = true;
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

