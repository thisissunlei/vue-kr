<template>
    <div class="create-new-order">
        <SectionTitle title="新建入驻服务订单管理"></SectionTitle>
        <Form ref="formItem"
            :model="formItem"
            :rules="ruleCustom"
            class="creat-order-form">
            <DetailStyle info="基本信息">
                <BasicInfo :formItem='formItem' />
            </DetailStyle>
            <DetailStyle info="客户主管理员信息"
                v-show='showManager'>
                <CustomerManager/>
            </DetailStyle>
            <DetailStyle info="租赁信息">
                <RentInfo :formItem='formItem' />
            </DetailStyle>
            <DetailStyle info="商品价格明细">
                <AmountInfo/>
            </DetailStyle>
            <div style="padding-left:24px">
                <Row>
                    <Col class="col">
                    <FormItem label="首付款日期"
                        style="width:252px"
                        prop="firstPayTime">
                        <DatePicker type="date"
                            placeholder="首付款日期"
                            style="width:252px"
                            v-model="formItem.firstPayTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row style="">
                    <Col class="col">
                    <span class="required-label"
                        style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                    <div style="display:block;min-width:252px">
                        <span v-for="types in payList"
                            :key="types.value"
                            class="button-list"
                            v-on:click="selectPayType(types.value)"
                            v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                    </div>
                    <div class="pay-error"
                        v-if="errorPayType">请选择付款方式</div>

                    </Col>
                    <Col class="col"
                        style="max-width:560px">
                    <span class="required-label"
                        style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                    <div style="display:block;min-width:252px">
                        <span v-for="types in depositList"
                            :key="types.value"
                            class="button-list"
                            v-on:click="selectDeposit(types.value)"
                            v-bind:class="{active:depositAmount==types.value}">{{ types.label }}</span>
                    </div>
                    <div class="pay-error"
                        v-if="errorAmount">请选择履约保证金总额</div>
                    </Col>
                </Row>

            </div>
            <FormItem style="padding-left:24px;margin-top:40px">
                <Button type="primary"
                    @click="handleSubmit('formItem')"
                    :disabled="disabled"
                    v-if="!disabled">提交</Button>
                <Button disabled
                    v-if="disabled">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>


<script>
//client/store/join
import { mapGetters } from 'vuex'
import SectionTitle from '~/components/SectionTitle.vue'
import DetailStyle from '~/components/DetailStyle';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
import BasicInfo from './join/basicInfo.vue'
import CustomerManager from './join/customerManager.vue'
import RentInfo from './join/rentInfo.vue'
import AmountInfo from './join/amountInfo.vue'
// import PreferentialInfo from './join/preferentialInfo.vue'

export default {
    components: {
        SectionTitle,
        DetailStyle,
        BasicInfo,
        CustomerManager,
        RentInfo,
        AmountInfo,
        // PreferentialInfo
    },
    head() {
        return {
            title: "新建入驻订单-氪空间后台管理系统"
        }
    },
    data() {
        const validateFirst = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请先选择首付款日期'));
            } else if (new Date(this.formItem.startDate) < new Date(value)) {
                callback(new Error('首付款日期不得晚于起始日期'));
            } else {
                callback();
            }
        };
        return {
            showManager: false,
            disabled: false,
            errorAmount: false,
            amountNeedPay: '',
            payList: [
                { value: 'ONE', label: '月付' },
                { value: 'TWO', label: '两月付' },
                { value: 'THREE', label: '季付' },
                { value: 'SIX', label: '半年付' },
                { value: 'TWELVE', label: '年付' },
                { value: 'ALL', label: '全款' },
            ],
            depositList: [
                { label: '2个月', value: '2' },
                { label: '3个月', value: '3' },
                { label: '4个月', value: '4' },
                { label: '5个月', value: '5' },
                { label: '6个月', value: '6' },
            ],
            depositAmount: '',
            installmentType: '',
            timeError: false,//租赁时间校验
            params: {},
            formItem: {
                customerId: '',
                communityId: '',
                startDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date()),
                signDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date()),
                endDate: '',
                timeRange: '',
                floor: '',
                city: '',
                firstPayTime: '',
                rentAmount: '',
                items: [],
                stationAmount: 0,
                saleChanceId: ''
            },
            errorPayType: false,//付款方式的必填错误信息
            ruleCustom: {
                startDate: [
                    { required: true, type: 'date', message: '请先选择开始时间', trigger: 'change' }
                ],
                firstPayTime: [
                    { required: true, trigger: 'change', validator: validateFirst },
                ],
                endDate: [
                    { required: true, type: 'date', message: '请先选择结束时间', trigger: 'change' }
                ],
                endDateStatus: [
                    { required: true, type: 'date', message: '请先选择结束时间', trigger: 'change' }
                ],
                communityId: [
                    { required: true, message: '请选择社区', trigger: 'change' }
                ],
                customerId: [
                    { required: true, message: '请选择客户', trigger: 'change' }
                ],
                salerId: [
                    { required: true, message: '请选择销售员', trigger: 'change' }
                ],
                signDate: [
                    { required: true, type: 'date', message: '请先选择签署时间', trigger: 'change' }
                ]
            },
        }
    },
    computed: {
        ...mapGetters([
            'youhui',
            'rentAmountSale',
            'rentAmount',
            'isManager',
            'saleList',
            'stationList',
            'customerId',
            'communityId',
            'salerId',
            'opportunityId',
            'startDate',
            'endDate',
            'signDate',
            'timeRange',
            'sso',
            'managerId',
            'preferentialError',
            'discountReason'
        ])
    },
    watch: {
        rentAmountSale(val) {
            this.amountNeedPay = val
        },
        rentAmount(val) {
            this.amountNeedPay = val
        },
        isManager(val) {
            this.showManager = val
        }
    },
    mounted() {
        GLOBALSIDESWITCH("false");
        this.getFreeDeposit();
    },

    methods: {
        handleSubmit(name) {
            let message = '请填写完表单';
            this.$Notice.config({
                top: 80,
                duration: 3
            });
            let _this = this;
            if (!this.installmentType) {
                this.errorPayType = true
            }
            if (!this.depositAmount) {
                this.errorAmount = true;
            }
            if (this.timeError) {
                this.$Notice.error({
                    title: '租赁开始时间不得大于结束时间'
                });
                return
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.errorPayType || this.errorAmount) {
                        this.$Notice.error({
                            title: '请填写完表单'
                        });
                        return;
                    }
                    if (!this.stationList.length) {
                        this.$Notice.error({
                            title: '请选择入驻工位'
                        });
                        this.disabled = false;
                        return
                    }
                    if (!this.managerId) {
                        this.$Notice.error({
                            title: '请选择主管理员'
                        });
                        return;
                    }
                    // this.disabled = true;
                    if (this.preferentialError) {
                        this.$Notice.error({
                            title: this.preferentialError
                        });
                        return;
                    }
                    this.joinFormSubmit()
                } else {
                    this.disabled = false;
                    this.$Notice.error({
                        title: message
                    });
                }
            })
        },
        //提交新建表单

        joinFormSubmit() {
            let station = this.stationList;
            let priceError = false;
            station.map((item) => {
                if (item.originalPrice < item.guidePrice) {
                    priceError = true
                }
                if (!item.discountNum) {
                    item.discountNum=10
                }
            })
            if (priceError) {
                this.$Notice.error({
                    title: '工位单价不得小于最低定价'
                })
                return
            }

            //判断标准单价是否为空
            let standardPrice = false;
            station.map((item) => {
                if (item.originalPrice === '') {
                    standardPrice = true
                }
            })
            if (standardPrice) {
                this.$Notice.error({
                    title: '工位单价不得为空。'
                })
                return
            }

            //处理已删除的数据
            let saleList = this.saleList.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })

            let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.startDate));
            let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.signDate || new Date()));
            let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.endDate || this.endDateStatus));

            let formItem = {}
            saleList = saleList.map(item => {
                let obj = Object.assign({}, item);
                if (item.tacticsType == 3) {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.startDate))
                } else {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validStart))
                }
                obj.validEnd = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validEnd))

                return obj;
            })
            //支付方式
            formItem.installmentType = this.installmentType;
            formItem.firstPayTime = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.formItem.firstPayTime);
            formItem.deposit = this.depositAmount;
            formItem.rentAmount = this.amountNeedPay;
            // formItem.saleList = JSON.stringify(saleList);
            this.stationList.map(item=>item.discountNum=item.discountNum||10)
            formItem.seats = JSON.stringify(this.stationList);

            formItem.customerId = this.customerId;
            formItem.communityId = this.communityId;
            formItem.salerId = this.salerId;
            formItem.opportunityId = this.opportunityId;//销售机会ID
            formItem.signDate = signDate;
            formItem.timeRange = this.timeRange;
            formItem.startDate = start;
            formItem.endDate = end;
            formItem.ssoId = this.sso.ssoId;
            formItem.ssoName = this.sso.ssoName;
            formItem.managerId = this.managerId;
            formItem.discountReason=this.discountReason;
            let _this = this;
            this.disabled = true;
            // return
            this.$http.post('save-join', formItem).then(r => {
                window.location.href = '/order-center/order-manage/station-order-manage/' + r.data.orderSeatId + '/joinView';
            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                })
                setTimeout(function () {
                    _this.disabled = false;
                }, 500)
            })

        },
        //提交新建表单
        selectDeposit(value) {
            // 选择保证金
            this.depositAmount = value
            this.errorAmount = false;
        },
        selectPayType(value) {
            // 选择付款方式
            this.installmentType = value;
            this.errorPayType = false;
        },
        getFreeDeposit() {
            this.$http.get('get-seat-deposit-free', '').then(r => {
                this.showFree = r.data;
                if (r.data) {
                    this.depositList.push({ value: '0', label: '无押金' }, )
                    this.depositList.push({ value: '1', label: '1个月' }, )
                }
            }).catch(e => {
                this.$Notice.error({
                    title: e.message
                })

            })
        },
    }
}
</script>
<style lang="less">
.create-new-order {
    .creat-order-form {
        .col {
            display: inline-block;
            width: 50%;
            max-width: 450px;
            padding-right: 10px;
            vertical-align: top;
        }
        .required-label {
            font-size: 14px;
            position: relative;
            &::before {
                content: "*";
                display: inline-block;
                margin-right: 4px;
                line-height: 1;
                font-family: SimSun;
                font-size: 12px;
                color: #ed3f14;
            }
        }
        .pay-error {
            color: #ed3f14;
        }
    }
}
</style>
