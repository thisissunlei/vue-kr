<template>
    <div class='discount-set-from-panel' id='discount-set-from-panel'>
        
            <FormItem label="折扣类型" prop="discountType">
                <span>折扣</span>
            </FormItem>
            <FormItem label="优惠期间" class="bill-search" prop="time">
                <DatePicker v-model="formItem.time.startDate" type="date" placeholder="开始日期" style="width: 140px" />
                <span class="u-date-txt" style='padding:0 15px'>至</span>
                <DatePicker v-model="formItem.time.endDate" type="date" placeholder="结束日期" style="width: 140px" />
            </FormItem>
            <FormItem label="优惠方案" prop="scheme" v-show="showRent">
                <span style='padding:0 13px'>满</span>
                <InputNumber v-model="formItem.scheme.target" :max="36" :min="1" placeholder="1-36" style="width: 120px" />
                <span style='padding:0 14px'>赠</span>
                <InputNumber v-model="formItem.scheme.present" :max="12" :min="1" placeholder="1-12" style="width: 120px" />
            </FormItem>

            <FormItem label="折扣配置" v-show="!showRent" class="form-item-discount" prop="discountList">
                <SelectDiscount :roleList='roleList' v-model="formItem.discountList"></SelectDiscount>
            </FormItem>

            <FormItem label="折扣配置" v-show="showRent" class="form-item-discount" prop="rentFreeList">
                <RentFree :roleList='roleList' v-model="formItem.rentFreeList" @input='handleRentFreeInput'></RentFree>
                <div v-if='showError' class="ivu-form-item-error-tip">至少勾选一个级别</div>
            </FormItem>

            <FormItem label="备注" class='form-item-remark'>
                <!-- <Input v-model="formItem.remark" /> -->
                <Input v-model="formItem.remark" :maxlength="100" type="textarea" :autosize="{minRows: 3,maxRows:3}" style="width:100%;" placeholder="备注..." />
                <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/100":0+"/100"}}</div>
            </FormItem>
            <FormItem class="form-item-btn">
                <!-- <Button type="primary" class="btn" @click="handleSubmit(formItem)">确定</Button> -->
                <!-- <Button class="btn" @click="handleCancle(false)">取消</Button> -->
            </FormItem>
    </div>
</template>
<script>
import selectCommunities from './SelectCommunities.vue'
import RentFree from './rentFree.vue'
import SelectDiscount from './discountSelect.vue'
import dateUtils from 'vue-dateutils';

export default {
    components: {
        selectCommunities,
        SelectDiscount,
        RentFree
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
            if (!value.startDate) {
                callback("请输入开始日期")
            } else if (!value.endDate) {
                callback("请输入结束日期")
            } else if (value.startDate > value.endDate) {
                callback('开始日期不能大于结束日期')
            } else {
                callback()
            }
        };
        //target present
        const validatescheme = (rule, value, callback) => {
            if (isNaN(value.target) || isNaN(value.present)) {
                callback("请输入数字")
            } else if (value.target > 36 ||value.target < 1 ) {
                callback('输入有误,有效范围1-36')
            } else if ( value.present > 12|| value.present < 1) {
                callback('输入有误,有效范围1-12')
            } else if (value.present > value.target) {
                callback('输入有误，后者不能大于前者')
            } else {
                callback()
            }
        };
        const validateRentFreeList = (rule, value, callback) => {
            if (value.length == 0) {
                callback('至少勾选一个级别')
            } else {
                callback()
            }
        };
        const validateDiscountList = (rule, value, callback) => {
            debugger
            if (Object.keys(value).length == 0) {
                callback('至少输入一个级别')
            } else if (!checkDiscountExtexnd(value)) {
                callback('折扣输入有误，应该大于0小于10')
            } else if (checkDiscount(value)) {
                callback()
            } else {
                callback('上级折扣权限不能低于下级')
            }
        };
        var checkDiscountExtexnd = function (obj) {
            debugger
            let values = Object.values(obj).map(key => Number(key))
            let arr = values.filter(item => item >= 10 || item <= 0)
            if (arr == null || arr.length > 0) {
                return false
            }
            return true
        };
        var checkDiscount = function (obj) {
            debugger
            let keys = Object.keys(obj).map(key => Number(key))
            let values = Object.values(obj).map(key => Number(key))
            let maxLevel = Math.max.apply(null, keys)
            let minLevel = Math.min.apply(null, keys)
            if (minLevel != 1) {
                return false
            }
            if (maxLevel + 1 - minLevel != keys.length) {
                return false
            } else {
                let i = 0;
                for (i = 0; i < keys.length; i++) {
                    if (i != keys.length - 1) {
                        if (values[i] > values[i + 1]) {
                            return false
                        }
                    }
                }
            }
            return true;
        };
        return {
            showError: false,
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
                discountList: {},
                rentFreeList: [],
                scheme: {
                    present: 1,
                    target: 1
                },
            },
            ruleCustom: {
                communityId: [
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
                rentFreeList: [
                    { required: true, type: 'array', validator: validateRentFreeList, trigger: 'change' }
                ],
                discountList: [
                    { required: true, validator: validateDiscountList,trigger: 'blur'}
                ],
            }
        }
    },
    mounted() {
        this.formItem.discountType = 'DISCOUNT'
        // this.formItem.discountType = 2
        this.getDiscountTypeList();
        this.getRoleRightList();
    },
    methods: {
        getDiscountTypeList() {
            this.$http.get('get-enum-all-data', {
                enmuKey: 'com.krspace.order.api.enums.discount.DiscountType'
            }).then((r) => {
                let data = r.data;
                let arr = data.filter(item => item.value != 'BEFORE_FREE')
                if (arr != null && arr.length > 0) {
                    this.discountTypeList = [].concat(arr)
                }
                // this.discountTypeList = [].concat({ value: 'ALL', desc: '全部' }, r.data);
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        getRoleRightList() {
            this.$http.get('get-discount-rights', '').then((r) => {
                let data = r.data;
                let list = [];
                let keys = Object.keys(data);
                keys.map((key, index) => {
                    if (data.hasOwnProperty(key)) {
                        let obj = {}
                        obj.name = data[key];
                        obj.level = index + 1;
                        obj.id = key;
                        obj.discount = ''
                        list.push(obj)
                    }
                })
                this.roleList = list
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },

        handleRentFreeInput(list) {
            if (this.formItem.rentFreeList.length == 0) {
                this.showError = true
            }
            else {
                this.showError = false
            }
        },
        handleSelectDiscountTypeChange(val) {
            if (val === 'DISCOUNT')
                this.showRent = false;
            else
                this.showRent = true;
        },
        handleSubmit(formItem) {
            console.log('formItem', formItem)
            this.$refs['formContent'].validate((valid) => {
                setTimeout(() => {//校验后 ivu-form-item-error-tip dom生成需要时间
                    let pass = true
                    if (!valid) {
                        let nodelist = document.querySelectorAll('#discount-set-from-panel .ivu-form-item-error')
                        Array.prototype.forEach.call(nodelist, function (node) {
                            console.log(node.style.display)
                            if (pass) {
                                if (node.style.display == "none") {
                                    pass = true
                                }
                                else {
                                    pass = false
                                }
                            }
                        });
                    }
                    if (pass) {
                        this.doSubmit(formItem);
                    }
                    else {
                        this.$Notice.error({
                            title: '请填写完表单'
                        });
                    }
                }, 300);
            })
        },
        doSubmit(formItem) {
            let { communityId, discountType, time: { startDate, endDate }, remark } = formItem
            let parmas = { communityId, discountType, startDate, endDate, remark }
            parmas.startDate = parmas.startDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.startDate)) : ''
            parmas.endDate = parmas.endDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.endDate)) : ''
            if (this.showRent) {
                parmas.target = formItem.scheme.target
                parmas.present = formItem.scheme.present;
                let arr = [];
                formItem.rentFreeList.map(item => {
                    arr.push(this.roleList.find(r => r.name == item).id)
                })
                parmas.rightDetail = JSON.stringify(arr)
            }
            else {
                let res = {};
                let obj = formItem.discountList
                Object.keys(obj).map(item => {
                    let temp = this.roleList.filter(r => {
                        return r.level == Number(item)
                    })
                    if (temp != null && temp.length > 0) {
                        res[temp[0].id] = obj[item]
                    }
                })
                parmas.rightDetail = JSON.stringify(res);
            }

            // post-add-discount
            console.log('add_discount', parmas)

            this.$http.post('post-add-discount', parmas).then((response) => {
                this.$Message.success('添加成功');
                this.handleCancle(true);
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },

        handleCancle(reload) {
            this.$emit('closeAddModal', reload)
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
                text-align: right;
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
