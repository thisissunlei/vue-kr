<template>
    <div class="new-sync-panel">
        <SectionTitle title="基本信息"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <FormItem label="选择时间" prop="syncTime" class='form-item'>
                <DatePicker v-model="formItem.syncTime.startTime" type="date" placeholder="开始日期" style="width: 170px" />
                <span class="u-date-txt" style='padding:0 20px'>至</span>
                <DatePicker v-model="formItem.syncTime.endTime" type="date" placeholder="结束日期" style="width: 170px" />
            </FormItem>
            <FormItem label="选择社区" class='form-item'>
                <selectCommunities :onchange="changeCommunity" style="display:inline-block;width:170px" />
            </FormItem>
            <FormItem label="选择客户" class='form-item'>
                <selectCustomers :onchange="changeCustomer" style="display:inline-block;width:170px" />
            </FormItem>
            <FormItem label="同步类型" prop="syncDataType" class='form-item'>
                <Select v-model="formItem.syncDataType" style="width:170px">
                    <Option v-for="item in syncDataTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="备注" class="form-item form-item-remark">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="备注..." />
            </FormItem>

            <FormItem class="form-item-btn">
                <div class="btn-container">
                    <Button type="primary" class="btn" @click="handleCancle">取消</Button>
                    <Button type="primary" class="btn" @click="handleNext(formItem)">下一步</Button>
                </div>

            </FormItem>
        </Form>
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomersFinancial.vue'

export default {
    name: 'createSync',
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers
    },
    data() {
        const validateDate = (rule, value, callback) => {
            if (!value.startTime) {
                callback("请输入开始日期")
            } else if (!value.endTime) {
                callback("请输入结束日期")
            } else if (value.startTime > value.endTime) {
                callback('开始日期不能大于结束日期')
            } else {
                callback()
            }
        };
        return {
            formItem: { syncTime: {} },
            syncDataTypeList: [],
            ruleCustom: {
                syncTime: [
                    { required: true, validator: validateDate, trigger: 'change' }
                ],
                syncDataType: [
                    { required: true, type: 'date', message: '请先选择开始时间', trigger: 'change' }
                ]
            },
        }
    },
    mounted() {
        this.getSyncDataTypeList();
    },
    methods: {
        changeCommunity(val) {
            this.formItem.communityIds = val;
        },
        changeCustomer(val) {
            this.formItem.customerIds = val;
        },
        getSyncDataTypeList() {
            this.$http.get('get-sync-data-type-list-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferStatus'
            }).then((r) => {
                this.syncDataTypeList = [].concat(r.data);
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        handleCancle() {

        },
        handleNext(formItem) {
            debugger
        }
    }
}
</script>

<style lang="less">
.new-sync-panel {
    .creat-order-form {
        width: 600px;
        margin: 50px auto;
        .ivu-form-item-label {
            width: 90px;
        }
        .form-item {
            width: 500px;
            .ivu-form-item-error-tip {
                left: 90px;
            }
        }
        .form-item-remark {
            width: 400px;
            .ivu-form-item-content {
                position: relative;
                left: 90px;
                top: -30px;
            }
        }
        .form-item-btn {
            width: 500px;
            .btn-container {
                float: right;
                .btn {
                    margin: 0 10px;
                }
            }
        }
    }
}
</style>
