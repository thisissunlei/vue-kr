<template>
    <div class='discount-set-from-panel'>
        <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="formContent" class='discount-set-from'>
            <FormItem label="适用社区" prop="community">
                <selectCommunities v-model="formItem.community" :multiple='true'></selectCommunities>
            </FormItem>
            <FormItem label="优惠类型" prop="discountType">
                <Select v-model="formItem.discountType" @on-change='handleSelectDiscountTypeChange'>
                    <Option v-for="(option, index) in discountTypeList" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="折扣期间" class="bill-search" prop="time">
                <DatePicker v-model="formItem.time.startTime" type="date" placeholder="开始日期" style="width: 140px" />
                <span class="u-date-txt" style='padding:0 15px'>至</span>
                <DatePicker v-model="formItem.time.endTime" type="date" placeholder="结束日期" style="width: 140px" />
            </FormItem>
            <FormItem label="优惠方案" prop="scheme" v-if="showRent">
                <span style='padding:0 13px'>满</span>
                <Input v-model="formItem.scheme.full" :number='true' placeholder="1-36" style="width: 120px" />
                <span style='padding:0 14px'>赠</span>
                <Input v-model="formItem.scheme.extend" :number='true' placeholder="1-12" style="width: 120px" />
            </FormItem>
            <FormItem label="折扣配置" class="form-item-discount" prop="discountSet">
                <SelectDiscount v-show="!showRent" :roleList='roleList' v-model="formItem.discountSet.discountList"></SelectDiscount>
                <RentFree v-show="showRent" :roleList='roleList' v-model="formItem.discountSet.rentFreeList"></RentFree>
            </FormItem>
            <FormItem label="备注" class='form-item-remark'>
                <Input v-model="formItem.remark" />
            </FormItem>
            <FormItem class="form-item-btn">
                <Button class="btn" @click="handleCancle">取消</Button>
                <Button type="primary" class="btn" @click="handleSubmit(formItem)">确定</Button>
            </FormItem>

        </Form>

    </div>
</template>
<script>
import CreateSale from './createSale.vue';
import selectCommunities from './SelectCommunities.vue'
import RentFree from './rentFree.vue'
import SelectDiscount from './discountSelect.vue'

export default {
    components: {
        CreateSale,
        selectCommunities,
        SelectDiscount,
        RentFree
    },
    props: {
        editData: Object,
        editStatus: String,
    },
    data() {
        const validateCummity = (rule, value, callback) => {
            if (value == null || value.length == 0) {
                callback("请选择社区")
            }
            else
                callback()
        };
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
        //full extend
        const validatescheme = (rule, value, callback) => {
            if (isNaN(value.full) || isNaN(value.extend)) {
                callback("请输入数字")
            } else if (value.full > 36 || value.extend > 12) {
                callback('输入有误')
            } else if (value.full < 0 || value.extend < 0) {
                callback('输入有误')
            } else if (value.extend > value.full) {
                callback('输入有误')
            } else {
                callback()
            }
        };
        const validateDiscountSet = (rule, value, callback) => {
            debugger
            if (value.rentFreeList.length == 0) {
                callback('至少勾选一个级别')
            } else {
                callback()
            }
        };
        return {
            showRent: false,
            discountTypeList: [
                {
                    label: '折扣',
                    value: 1
                },
                {
                    label: '免租-后免',
                    value: 2
                }
            ],
            roleList: [
                {
                    id: 1,
                    level: 1,
                    name: '总部管理人员',
                    discount: 7.5
                },
                {
                    id: 2,
                    level: 2,
                    name: '区域招商经理',
                    discount: 8
                },
                {
                    id: 3,
                    level: 3,
                    name: '招商经理',
                    discount: 8.5
                },
                {
                    id: 4,
                    level: 4,
                    name: '招商主管',
                    discount: 9
                },
            ],
            formItem: {
                time: {},
                scheme: {},
                discountSet: {
                    discountList: [],
                    rentFreeList: []
                }

            },
            ruleCustom: {
                community: [
                    { required: true, validator: validateCummity, trigger: 'change' }
                ],
                discountType: [
                    { required: true, message: '请选择优惠类型', trigger: 'blur' }
                ],
                time: [
                    { required: true, validator: validateDate, trigger: 'change' }
                ],
                sale: [
                    { required: true, message: '请选择优惠类型' }
                ],
                discount: [
                    { required: true, message: '请选择优惠类型' }
                ],
                scheme: [
                    { required: true, validator: validatescheme, trigger: 'change' }
                ],
                discountSet: [
                    { required: true, type: 'array', validator: validateDiscountSet, trigger: 'change' }
                ]
            }
        }
    },
    watch: {
        rentFreeList() {
            // console.log('免租列表——', this.rentFreeList)
        }
    },
    mounted() {
        this.formItem.discountType = 2
    },
    methods: {
        handleSelectChange(data) {
            debugger
            this.formItem.rentFreeList = data;
        },
        handleSelectDiscountTypeChange(val) {
            if (val === 1)
                this.showRent = false;
            else
                this.showRent = true;
        },
        handleSubmit(formItem) {
            console.log(formItem)
        },
        handleCancle() {

        }

    }
}
</script>


<style lang="less">
.discount-set-from-panel {
    .discount-set-from {
        position: relative;
        left: -25px;
        .form-item-discount {
            .ivu-form-item-content {
                padding-top: 20px;
                .form-item-discount-input {
                    // position: relative;
                    // left: -70px;
                    width: 326px;
                    .row-discount {
                        margin: 15px 0;
                        .col-discount-col1 {
                            display: inline-block;
                            width: 100px;
                        }
                        .col-discount-col2 {
                            display: inline-block;
                            div {
                                span {
                                    margin-left: 5px;
                                    margin-right: 5px;
                                }
                                div {
                                    display: inline-block;
                                    width: 168px;
                                }
                            }
                        }
                    }
                }
                .form-item-discount-select {
                    .ivu-checkbox {
                        margin-right: 10px;
                    }
                    .form-item-discount-select-item {
                        display: block;
                    }
                }
            }
        }
        .form-item-remark {
            .ivu-form-item-label {
                text-align: left;
                padding: 10px 12px 10px 29px;
            }
        }
        .form-item-btn {
            .btn {
                margin: 0 45px;
            }
        }
    }
}
</style>
