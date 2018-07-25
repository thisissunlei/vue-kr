<template>
    <div>
        <Form :model="formItem" :label-width="100" style="padding:0 20px" :rules="ruleCustom" ref="formContent">
            <FormItem label="适用社区" prop="community">
                <selectCommunities v-model="formItem.community" :multiple='true'></selectCommunities>
            </FormItem>
            <FormItem label="优惠类型" prop="discountType">
                <Select :v-model="formItem.discountType">
                    <Option v-for="(option, index) in discountList" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="创建日期" class="bill-search" prop="time">
                <DatePicker v-model="formItem.cStartDate" type="date" placeholder="创建开始日期" style="width: 150px" />
                <span class="u-date-txt" style='padding:0 20px'>至</span>
                <DatePicker v-model="formItem.cEndDate" type="date" placeholder="创建结束日期" style="width: 150px" />
                <div style="color:red;" v-show="dateError">开始日期不能大于结束日期</div>
            </FormItem>
            <FormItem label="优惠列选" prop="sale">

                <Table border :columns="columns" :data="saleList" @on-selection-change="selectChange"></Table>
                <Input v-model="formItem.sale" placeholder="名称" style="width:252px;display:none"></Input>
            </FormItem>
            <Button type="primary" @click="createSale">新建优惠</Button>

        </Form>

        <Modal v-model="openSale" title="新建社区优惠" ok-text="确定" cancel-text="取消" width="460" :styles="{top: '20px'}">
            <CreateSale ref="fromFieldNewSale" v-if="openSale" @newPageData="newSale" :editData.sync="editData" editStatus="create" />

            <div slot="footer">
                <Button type="primary" @click="onSubmitSale('formContent')">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancelCreate">取消</Button>
            </div>
        </Modal>
        <discountSelect></discountSelect>
    </div>
</template>
<script>
import CreateSale from './createSale.vue';
// import selectCommunities from '~/components/SelectCommunities.vue'
import selectCommunities from './SelectCommunities.vue'
import discountSelect from './discountSelect.vue'

export default {
    components: {
        CreateSale,
        selectCommunities,
        discountSelect
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
            discountList: [
                {
                    label: '折扣',
                    value: 1
                },
                {
                    label: '免租-后免',
                    value: 2
                }
            ],
            saleForm: {},
            openSale: false,
            formItem: {},
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
