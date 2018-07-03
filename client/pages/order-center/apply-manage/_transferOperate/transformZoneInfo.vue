<template>
    <div class='create-apply-sq'>
        <SectionTitle title="同客户社区间转账申请详情查看"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="申请编号" style="width:252px" prop="customerId">
                    <!-- <selectCustomers name="formItem.applyNo" :onchange="changeCustomer"></selectCustomers> -->
                    <span class="noEditFormItem">{{formItem.applyNo}}</span>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="操作类型" style="width:252px" prop="communityId">
                    <!-- <selectCommunities test="formItem.operateType" :onchange="changeCommunity"></selectCommunities> -->
                    <span class="noEditFormItem">{{basicInfo.transferTypeName}}</span>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="客户名称" style="width:252px" prop="customerId">
                    <selectCustomers name="formItem.customerID" :disabled="UIDisable.customer" :onchange="changeCustomer"></selectCustomers>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转入社区名称" style="width:252px" prop="communityId">
                    <selectCommunities test="formItem.communityIn" :disabled='UIDisable.cummunityIn' :onchange="changeCommunity" @onGetCmtsList='onGetCmtsList' v-bind:customerId='formItem.customerID'></selectCommunities>
                </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom:30px">
                <Col class="col">
                <FormItem label="转出社区名称" style="width:252px" prop="communityId">
                    <!-- <selectCommunities test="formItem" :disabled='UIDisable.cummunityOut' :onchange="changeCommunity" @onGetCmtsList='onGetCmtsList' v-bind:customerId='formItem.customerID'></selectCommunities>                        -->
                    <Select v-model="formItem.communityOut" :disabled='UIDisable.cummunityOut' style="width:252px">
                        <Option v-for="item in communitiesOut" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="转移余额" style="width:252px" prop="balance">
                    <Input v-model="formItem.balanceOut" :disabled="UIDisable.balance" placeholder='maxbalanceOut' style="width: 252px"></Input>
                </FormItem>
                </Col>
            </Row>

            <FormItem class="remark" label="备注" style="width:100%;">
                <Input v-model="formItem.applyMemo" :disabled='UIDisable.remark' :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.applyMemo?formItem.applyMemo.length+"/500":0+"/500"}}</div>
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
import OperateLog from './operateLog.vue'

export default {
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        OperateLog
    },
    props: {
        maxbalanceOut: 0,
    },
    data() {
        let maxbalanceOut = (this.maxbalanceOut / 100).toFixed(2);
        const validateFirst = (rule, value, callback) => {
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (isNaN(value)) {
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
            UIShowAble: {
                editBtn: true,//true显示
                approveBtn: false,
                rejectBtn: false
            },
            UIDisable: {
                customer: true,//true 禁用
                cummunityIn: false,
                cummunityOut: true,
                balance: false,
                remark: false,
                editBtn: false,
                approveBtn: false,
                rejectBtn: false
            },
            basicInfo:{},
            communitiesOut: [],
            communities: [],
            isEdit: false,
            approveBtnText: '同意',
            operateHistoryData: [],
            formItem: {
                applyNo: '',
                operateType: '',
                customerID: '',
                communityIdOut: '',
                communityIdIn: '',
                transferAmount: 0,
                applyMemo: ''
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
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            let { params } = this.$route;
            let from = {
                id: params.transferOperate
            };
            this.$http.get('get-apply-info-id', from).then((response) => {
                this.basicInfo = response.data;
                this.formItem=Object.assign(this.formItem,
                {customerID:this.basicInfo.customerId},
                {applyNo:this.basicInfo.applyNo},
                {applyMemo:this.basicInfo.customerId},
                {communityIdIn:this.basicInfo.detailList[0].communityIdIn},
                {communityIdOut:this.basicInfo.detailList[0].communityIdOut},
                {transferAmount:this.basicInfo.detailList[0].transferAmount}
                )
                console.log(this.basicInfo)
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        changeCustomer() { },
        changeCommunity() {
            this.$set(this.formItem, 'communityIn', commIn)
            let all = [].concat(this.communities);
            this.communitiesOut = all.filter(item => item.value !== commIn)
            this.getMaxAmount();
        },
        onGetCmtsList(list) {
            this.communities = [].concat(list);
        },
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
    width: 60%;
    max-width: 800px;

    .creat-order-form {
        padding: 20px;
        .noEditFormItem {
            position: absolute;
            top: 35px;
            left: 4px;
        }
        .remark {
            width: 680px;
        }
        .col {
            width: 50%;
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
        .btnContainer {
            position: absolute;
            left: 50%;
            top: -20px;
            transform: translateX(-50%);
            .operateBtn {
                margin: 0 20px;
            }
        }
    }

    .apply-list-table {
        padding-top: 20px;
        .list-table {
            margin: 20px;
            margin-top: 0px;
        }
    }
}
</style>

