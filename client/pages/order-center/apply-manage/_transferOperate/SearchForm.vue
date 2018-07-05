<template>
    <div class='make-invoice-form'>
        <div class="community-header">
            <!-- :rules="ruleInvestment" -->
            <Form ref="formItemOperation" :model="formItem" :rules="ruleOperation" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;width:850px;">
                    <Form-item label="申请编号" class='daily-form' prop="applyNo">
                        <i-input v-model="formItem.applyNo" placeholder="请输入申请编号" style="width: 200px" @keyup.enter.native="onKeyEnter($event)" />
                    </Form-item>

                    <Form-item label="客户名称" class='daily-form' prop="customerID">
                        <SelectCustomers name="formItem.customerID" :onchange="handleChangeCustomer" style="width: 200px"></SelectCustomers>
                    </Form-item>

                    <Form-item class="daily-form priceForm community-form">
                        <span class="attract-font">社
                            <span style="display:inline-block;width:26px;"></span>区</span>
                        <Select v-model="formItem.cityId" placeholder="请选择社区" style="width: 90px;margin-right:20px;" @on-change="handleChangeCity">
                            <Option v-for="item in cityList" :value="item.cityId" :key="item.cityId">
                                {{ item.cityName }}
                            </Option>
                        </Select>
                        <Select v-model="formItem.communityId" placeholder="请输入社区" style="width: 90px;" @on-change="handleChangeCommunity">
                            <Option v-for="item in communityList" :value="item.id" :key="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
                    <div style="width:850px;display:inline-block;">
                        <Form-item label="操作类型" class='daily-form'>
                            <Select v-model="formItem.transferType" placeholder="请输入操作类型" style="width: 200px" clearable>
                                <Option v-for="item in operateTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select>
                        </Form-item>

                        <Form-item label="操作款项" class='daily-form'>
                            <Select v-model="formItem.transferFeeType" placeholder="请输入操作款项" style="width: 200px" clearable>
                                <Option v-for="item in moneyTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select>
                        </Form-item>
                        <div style="display:inline-block">
                            <Form-item label="操作日期" class='priceForm' prop="uStartTime">
                                <DatePicker v-model="formItem.uStartTime" placeholder="开始日期" style="width: 90px" />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item class='priceForm' prop="uEndTime">
                                <DatePicker v-model="formItem.uEndTime" placeholder="结束日期" style="width: 90px" />
                            </Form-item>
                        </div>

                    </div>

                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第三行-->

                <div style="white-space: nowrap;">
                    <div style="display:inline-block;width:850px;">
                        <span class="attract-font status">状
                            <span style="display:inline-block;width:22px;"></span>态</span>
                        <Form-item class='daily-form ' prop="transferStatus">
                            <Select v-model="formItem.transferStatus" placeholder="请选择状态" filterable remote :label-in-value="labelValue" style="width: 200px">
                                <Option v-for="option in applyStates" :value="option.value" :key="option.value">{{option.desc}}</Option>
                            </Select>
                        </Form-item>

                    </div>
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import SelectCustomers from '~/components/SelectCustomers.vue'
export default {
    name: 'searchform',
    components: {
        SelectCustomers
    },
    data() {
        const validateName = (rule, value, callback) => {
            if (value && value.length > 20) {
                callback('长度最多20');
            } else {
                callback();
            }
        };
        const validateTime = (rule, value, callback) => {
            var start = '';
            var end = '';
            if (rule.field == 'uStartTime' || rule.field == 'uEndTime') {
                start = this.formItem.uStartTime;
                end = this.formItem.uEndTime;
            }
            if (rule.field == 'receiveStartDate' || rule.field == 'receiveEndDate') {
                start = this.formItem.receiveStartDate;
                end = this.formItem.receiveEndDate;
            }
            if (rule.field == 'callbackStartDate' || rule.field == 'callbackEndDate') {
                start = this.formItem.callbackStartDate;
                end = this.formItem.callbackEndDate;
            }
            if (start && end && start > end) {
                callback('后者需要大于前者');
            } else {
                callback();
            }
        };

        return {
            labelValue: true,
            loading: false,
            params: {},
            communityList: [],
            cityList: [],
            operateTypes: [],
            moneyTypes: [],
            applyStates: [],
            formItemOld: {
                uEndTime: '',
                uStartTime: ''
            },
            ruleOperation: {
                applyNo: [
                    { validator: validateName, trigger: 'change' }
                ],
                customerID: [
                    { validator: validateName, trigger: 'change' }
                ],
                uEndTime: [
                    { validator: validateTime, trigger: 'change' }
                ],
                uStartTime: [
                    { validator: validateTime, trigger: 'change' }
                ],
                transferStatus: [
                    { validator: validateName, trigger: 'change' }
                ],
            },
            formItem: {
                applyNo: '',//申请编号
                customerId: '',
                communityId: '',
                cityId: '', 
                transferType:'' ,
                moneyType:'',
                uEndTime: '',
                uStartTime: '',
                transferStatus: '',
                transferFeeType:''
            },
        }
    },
    mounted() {
        this.getCityList();
        this.getApplyStateList();
        this.getOperateTypeList();
        this.getMoneyTypeList();
        var _this = this;
        this.params = _this.$route.query;
        _this.$emit('initData', this.formItem);
        let params = Object.assign({}, this.$route.query);
        if (params.uStartTime) {
            params.uStartTime = new Date(parseInt(params.uStartTime)).getTime();
        }
        if (params.uEndTime) {
            params.uEndTime = new Date(parseInt(params.uEndTime)).getTime();
        }
        this.formItem = Object.assign({}, this.formItem, params);

        // setTimeout(() => {
        //     if (!_this.formItem.moneyType) {
        //         _this.formItem.moneyType = ' ';
        //     }
        //     if (!_this.formItem.transferType) {
        //         _this.formItem.transferType = ' ';
        //     }
        // }, 500);

    },
    methods: {
        remoteFun(query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.getApplyStateList(query)
                }, 200);
            }
        },
        //获取申请状态枚举
        getApplyStateList: function (name) {
            this.$http.get('get-apply-state-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferStatus'
            }).then((r) => {
                this.applyStates = [].concat({ value: 'ALL', desc: '全部' }, r.data);

            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        //获取操作类型枚举
        getOperateTypeList() {
            this.$http.get('get-operate-type-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferType'
            }).then((r) => {
                this.operateTypes = [].concat({ value: 'ALL', desc: '全部' }, r.data);

            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        //获取操作款项枚举
        getMoneyTypeList() {
            this.$http.get('get-money-type-enum', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.TransferFeeType'
            }).then((r) => {
                this.moneyTypes = [].concat({ value: 'ALL', desc: '全部' }, r.data);
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        //社区接口
        getCommunityList(id) {
            this.$http.get('getDailyCommunity', { cityId: id }).then((res) => {
                res.data.unshift({ cityId: ' ', name: '全部社区', id: ' ' })
                this.communityList = res.data.map(item => {
                    item.id = item.id + '';
                    return item;
                });
                if (this.params.communityId) {
                    this.formItem.communityId = this.params.communityId;
                } else {
                    this.formItem.communityId = res.data.length ? res.data[0].id : '';
                }
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //城市接口
        getCityList() {
            this.$http.get('getDailyCity').then((res) => {
                res.data.unshift({ cityId: ' ', cityName: '全部城市' })

                this.cityList = res.data.map(item => {
                    item.cityId = item.cityId + ''
                    return item;
                });

                if (this.params.cityId) {
                    this.formItem.cityId = this.params.cityId;
                } else {
                    this.formItem.cityId = res.data.length ? res.data[0].cityId : '';
                }
                this.getCommunityList(this.formItem.cityId)
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //获取今天的日期
        getToDay() {
            var today = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date());
            return today;
        },

        handleChangeCustomer(item) {
            this.formItem.customerId = item;
        },
        //城市change事件
        handleChangeCity(param) {
            if (this.params.cityId == param) {
                this.getCommunityList(param)
            } else {
                this.getCommunityList(param)
                this.param = {}
            }

        },
        //社区change事件
        handleChangeCommunity(param) {

        },
        //搜索
        searchClick() {
            this.$refs['formItemOperation'].validate((valid) => {
                if (valid) {
                    this.$emit('searchClick', this.formItem);
                }
            })
        },
        //清除
        clearClick() {
            this.formItem = Object.assign({}, this.formItemOld);
            this.$emit('clearClick', this.formItem);
        },
        //回车
        onKeyEnter() {
            this.searchClick();
        },

    }
}
</script>

<style lang='less'>
.make-invoice-form {
    .community-header {
        padding: 30px 10px 10px 20px;
        .ivu-form .ivu-form-item-label {
            color: #333;
            font-weight: 500;
        }
        .daily-form {
            display: inline-block;
            margin-right: 20px;
            .ivu-form-item-content {
                display: inline-block;
            }
        }
        .community-form {
            vertical-align: middle;
            .ivu-select-dropdown {
                min-width: 100px;
                width: auto !important;
                left: auto !important;
            }
        }
        .priceForm {
            display: inline-block;
            .ivu-form-item-content {
                display: inline-block;
            }
        }
        .attract-font {
            font-weight: bold;
            display: inline-block;
            margin-right: 12px;
        }
        .attract-line {
            display: inline-block;
            margin: 0 4px 0 5px;
            padding-top: 6px;
        }
        .tip-pic {
            display: inline-block;
            width: 16px;
            height: 16px;
            // background: url(img/q1.svg) no-repeat center;
            background-size: 100%;
            vertical-align: middle;
            margin-right: 5px;
            margin-top: -2px;
        }
        .ivu-tooltip-popper {
            word-break: break-all;
            word-wrap: break-word;
            max-width: 150px;
        }
        .ivu-tooltip-inner {
            white-space: normal;
        }
        .status {
            position: relative;
            top: 8px;
        }
    }
}
</style>
