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
            <Row style="margin-bottom:30px">
                <Col class="col amount">
                <FormItem label="转移款项" style="width:252px" prop="balance">
                    <CheckboxGroup v-model="disabledGroup">
                        <Row class="amount-row">
                            <Col><Checkbox label="余额" /></Col>
                            <Col><Input v-model="formItem.balanceOut" :placeholder='maxAmount' style="width: 252px"></Input></Col>
                        </Row>
                        <Row class="amount-row">
                            <Col><Checkbox label="门禁卡押金" /> </Col>
                            <Col><Input v-model="formItem.balanceOut" :placeholder='maxAmount' style="width: 252px"></Input></Col>
                        </Row>
                         <Row class="amount-row">
                            <Col><Checkbox label="其他保证金" /> </Col>
                            <Col><Input v-model="formItem.balanceOut" :placeholder='maxAmount' style="width: 252px"></Input></Col>
                        </Row>  
                    </CheckboxGroup>                   
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
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomers.vue'

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers
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
            disabledGroup:[],
            maxAmount:'0',
            communitiesOut:[],
            communities:[],
            formItem: {
                customerID: 12246,
                communityOut: '',
                communityIn: '',
                balanceOut:'',
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
    methods: {
        getMaxAmount(){
            let maxAmount=0
            let parms={
                communityId:this.formItem.communityIn,
                customerId:this.formItem.customerID
            }
            var _this=this
            this.$http.post('get-max-amount', parms).then((r) => {
                _this.maxAmount=r.data
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })

            this.maxAmount=maxAmount;
        },
        changeCustomer(item) { 
            this.formItem=Object.assign({},this.formItem,{customerID:item})
        },
        changeCommunity(commIn) { 
            this.$set(this.formItem,'communityIn',commIn)
            let all=[].concat(this.communities);
            this.communitiesOut=all.filter(item=>item.value!==commIn)
            console.log(this.communitiesOut)
            this.getMaxAmount();
        },
        onGetCusomerList(list){
            this.communities=[].concat(list);
        },
        handleSubmit(formItem) {
            debugger;
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
        .amount{
            .ivu-form-item-content{
                width: 600px;
            }
            .ivu-checkbox-group{
 
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

