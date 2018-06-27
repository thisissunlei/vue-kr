<template>
    <div class='create-apply-sq'>
        <SectionTitle title="同客户社区间转账申请"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerId">
                    <selectCustomers name="formItem.customerID" :onchange="changeCustomer"></selectCustomers>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转入社区名称" style="width:252px" prop="communityId">
                    <selectCommunities test="formItem.communityOut" :onchange="changeCommunity"></selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="转出社区名称" style="width:252px" prop="communityId">
                    <selectCommunities test="formItem.communityIn" :onchange="changeCommunity"></selectCommunities>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转移余额" style="width:252px" prop="balance">
                    <Input v-model="formItem.balanceOut" placeholder='maxbalanceOut' style="width: 252px"></Input>
                </FormItem>
                </Col>
            </Row>

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
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers
    },
    props: {
        maxbalanceOut: 3000,
    },
    data() {
        let maxbalanceOut = (this.maxbalanceOut / 100).toFixed(2);
        const validateFirst = (rule, value, callback) => {
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

            formItem: {
                customerID: '',
                communityOut: '',
                communityIn: '',
                balanceOut: 0,
                remark: ''
            },
            ruleCustom: {
                communityId: [
                    { required: true, message: '请选择社区', trigger: 'change' }
                ],
                customerId: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                balance: [
                    { required: true, trigger: 'change', validator: validateFirst }
                ]
            },
        }
    },
    methods: {
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.operate
            };
            this.$http.get('join-bill-detail', from).then((response) => {
                this.basicInfo = response.data;
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCustomer() { },
        changeCommunity() { },
        handleSubmit(formItem) {
            let parms = {}
            this.$http.post('join-bill-detail', parms).then((response) => {
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

