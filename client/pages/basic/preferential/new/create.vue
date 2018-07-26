<template>
    <div class='discount-set-from-panel'>
        <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="formContent" class='discount-set-from'>
            <FormItem label="适用社区" prop="community">
                <selectCommunities v-model="formItem.community" :multiple='true'></selectCommunities>
            </FormItem>
            <FormItem label="优惠类型" prop="discountType">
                <Select :v-model="formItem.discountType">
                    <Option v-for="(option, index) in discountTypeList" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="折扣期间" class="bill-search" prop="time">
                <DatePicker v-model="formItem.cStartDate" type="date" placeholder="开始日期" style="width: 140px" />
                <span class="u-date-txt" style='padding:0 15px'>至</span>
                <DatePicker v-model="formItem.cEndDate" type="date" placeholder="结束日期" style="width: 140px" />
                <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>
            </FormItem>
            <FormItem label="优惠方案" prop="discount">
                <span style='padding:0 13px'>满</span>
                <Input v-model="formItem.full" :number='true' style="width: 120px" />
                <span style='padding:0 14px'>赠</span>
                <Input v-model="formItem.extend" :number='true' style="width: 120px" />
            </FormItem>
            <FormItem label="折扣配置" class="form-item-discount" prop="discount">
                <div class="form-item-discount-input">
                    <Row class="row-discount" v-for='role in roleList' :key='role.id'>
                        <Col class="col-discount-col1">{{role.name}}</Col>
                        <Col class="col-discount-col2">
                        <div>
                            <span>最低</span>
                            <Input :number='true' v-model="formItem.discount[role.name]" :placeholder="''+role.discount" />
                            <span>折</span>
                        </div>
                        </Col>
                    </Row>
                </div>
                <div class="form-item-discount-select">
                    <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                    <CheckboxGroup v-model="formItem.checkAllGroup" @on-change="checkAllGroupChange">
                        <Checkbox v-for="role in roleList" :key='role.id' :label="role.name" class='form-item-discount-select-item'></Checkbox>
                    </CheckboxGroup>
                </div>
            </FormItem>
            <FormItem label="备注" class='form-item-remark'>
                <Input v-model="formItem.remark" />
            </FormItem>
            <FormItem class="form-item-btn">
                <Button class="btn" @click="handleCancle">取消</Button>
                <Button type="primary" class="btn" @click="handleSubmit('formItem')">确定</Button>
            </FormItem>

        </Form>

    </div>
</template>
<script>
import CreateSale from './createSale.vue';
// import selectCommunities from '~/components/SelectCommunities.vue'
import selectCommunities from './SelectCommunities.vue'

export default {
    components: {
        CreateSale,
        selectCommunities,

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
        return {
            indeterminate: true,
            checkAll: false,

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
                    name: '总部管理人员',
                    discount: 7.5
                },
                {
                    id: 2,
                    name: '区域招商经理',
                    discount: 8
                },
                {
                    id: 3,
                    name: '招商经理',
                    discount: 8.5
                },
                {
                    id: 4,
                    name: '招商主管',
                    discount: 9
                },
            ],
            saleForm: {},
            openSale: false,
            formItem: {
                discount: {},
                checkAllGroup: []
            },
            ruleCustom: {
                community: [
                    { required: true, validator: validateCummity, trigger: 'change' }
                ],
                discountType: [
                    { required: true, message: '请选择优惠类型', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请填写时间' }
                ],
                sale: [
                    { required: true, message: '请选择优惠类型' }
                ],
                discount: [
                    { required: true, message: '请选择优惠类型' }
                ],
            },
            dateError: false,
            saleList: [
                {
                    paramName: "1222",
                },
                {
                    paramName: "1222",
                },
                {
                    paramName: "1222",
                },
                {
                    paramName: "1222",
                },
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '优惠',
                    key: 'paramName',
                    align: 'center'
                },
                {
                    title: '优惠描述',
                    key: 'paramName',
                    align: 'center'
                },

            ]
        }
    },
    watch: {},
    methods: {
        checkAllGroupChange(data) {
            if (data.length === 3) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.formItem.checkAllGroup = ['香蕉', '苹果', '西瓜'];
            } else {
                this.formItem.checkAllGroup = [];
            }
        },
        handleSubmit() {

        },
        handleCancle() {

        },
        deleteValue(index) {
            let arr = this.formItem.items.splice(index, 1)
        },
        addValue() {
            this.formItem.items.push({ name: '' })
        },
        selectChange(array) {
            this.formItem.sale = array
            console.log('selectChange', array)
        },
        createSale() {
            this.openSale = true
        },
        cancelCreate() {
            this.openSale = false;
        },
        onSubmitSale(name) {
            var newPageRefs = this.$refs.fromFieldNewSale.$refs;
            var isSubmit = true;
            newPageRefs[name].validate((valid, data) => {
                if (!valid) {
                    isSubmit = false
                } else {
                    this.openSale = false
                    return;
                    // 提交数据
                    this.$http.post('saveParamData', this.parameterData).then((res) => {
                        this.getTableData()
                        this.openCreate = false;
                    }).catch((err) => {
                        this.$Notice.error({
                            title: err.message
                        });
                    })

                }
            })
        },
        newSale(data) {
            this.saleForm = data;
        }
    },
    updated: function () {
        if (this.formItem.cStartDate && this.formItem.cEndDate) {
            this.formItem.time = '-'
            if (this.formItem.cStartDate > this.formItem.cEndDate) {
                this.dateError = true;
            } else {
                this.dateError = false;
            }
        } else {
            this.dateError = false;
        }



        let data = {}
        data = Object.assign({}, this.formItem);
        this.$emit('newPageData', data);



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
                    .ivu-checkbox{
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
