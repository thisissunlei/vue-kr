<template>
    <div class="create-new-order">
        <SectionTitle title="新建入驻服务订单管理"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">
                    <Col class="col">
                    <FormItem label="客户名称" style="width:252px" prop="customerId">
                        <selectCustomers 
                            name="formItem.customerId" 
                            :onchange="changeCustomer"
                        />
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px"  prop="communityId">
                        <selectCommunities 
                            test="formItem" 
                            :onchange="changeCommunity"
                        />
                            
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="salerId">
                        <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem v-bind:class="{requiremark:!OpportunityRequired}" label="机会" style="width:252px" prop="salerId" v-show="showSaleChance">
                        <SelectChance name="formItem.opportunityId" 
                            @onChange="changeChance" 
                            @gotChanceList='handleGotChancelist' 
                            v-show="showChanceSelector" 
                            :showType="showChanceSelector" 
                            :orderitems='orderitems' 
                            :defaultValue='defaultChanceID'
                            :disabled='chanceDisable'
                          
                        ></SelectChance>
                    </FormItem>
                    <div v-if='remindinfoNewUser' class="title-container">(
                        <span class="title-remind-info">{{chanceRemindStr}}</span>)</div>
                    <div v-if='remindinfo' class="title-container">(如是
                        <span class="title-remind-info">{{chanceRemindStr}}</span>)</div>
                    <p v-if="!showChanceSelector" id='chancemsg' v-bind:class="{ OpportunityRequired: OpportunityRequired }">{{opportunityTipStr}}</p>
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="租赁信息">
                <Row style="margin-bottom:30px">
                    <Col class="col">
                    <FormItem label="租赁开始日期" style="width:252px" prop="startDate">
                        <DatePicker type="date" placeholder="租赁开始时间" v-model="formItem.startDate" style="display:block" @on-change="changeBeginTime"></DatePicker>
                        <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div>
                    </FormItem>

                    </Col>
                    <Col class="col" v-if="false">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                        <DatePicker type="month" placeholder="租赁结束日期" format="yyyy-MM-dd" v-model="formItem.endDate" style="display:block" @on-change="changeEndTime"></DatePicker>
                    </FormItem>
                    </Col>

                    <Col class="col">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                        <DatePicker type="date" placeholder="租赁结束日期" format="yyyy-MM-dd" v-model="formItem.endDate" style="display:block" @on-change="changeEndDateStatus"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="租赁时长" style="width:252px">
                        <Input v-model="formItem.timeRange" placeholder="租赁时长" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="签署日期" style="width:252px" prop="signDate">
                        <DatePicker type="date" placeholder="签署日期" format="yyyy-MM-dd" v-model="formItem.signDate" style="display:block"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

            </DetailStyle>
            <DetailStyle info="金额信息">
                <Row style="margin-bottom:10px">
                    <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="showStation">选择工位</Button>
                    <Button type="ghost" style="margin-right:20px;font-size:14px" @click="deleteStation">删除</Button>
                    <Button type="primary" style="font-size:14px" @click="openPriceButton">录入单价</Button>
                    </Col>

                </Row>
                <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <Table border ref="selection" :columns="columns4" :data.sync="stationList" @on-selection-change="selectRow"></Table>
                    <div class="total-money" v-if="stationList.length">
                        <span>服务费总计</span>
                        <span class="money">{{formItem.stationAmount | thousand}} </span>
                        <span class="money">{{stationAmount}}</span>
                    </div>
                    </Col>
                </Row>

            </DetailStyle>
            <DetailStyle info="优惠信息" v-show="youhui.length" style="margin-top:40px">
                <Row style="margin-bottom:10px">
                    <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="handleAdd">添加</Button>
                    <Button type="ghost" style="font-size:14px" @click="deleteDiscount">删除</Button>

                    <span class="pay-error" v-show="discountError">{{discountError}}</span>
                    </Col>

                </Row>
                <Row>
                    <Col span="3" class="discount-table-head">
                    <Checkbox v-model="selectAll" @on-change="selectDiscount"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-head">
                    <span> 优惠类型</span>
                    </Col>
                    <Col span="5" class="discount-table-head">
                    <span>开始时间</span>
                    </Col>
                    <Col span="5" class="discount-table-head">
                    <span>结束时间</span>

                    </Col>
                    <Col span="5" class="discount-table-head">
                    <span>折扣</span>
                    </Col>
                </Row>
                <FormItem v-for="(item, index) in formItem.items" :key="index" style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none">
                    <Row v-show="item.show">
                        <Col span="3" class="discount-table-content" style="padding:0">
                        <Checkbox v-model="item.select"></Checkbox>
                        </Col>
                        <Col span="6" class="discount-table-content">
                        <Select v-model="item.type" label-in-value @on-change="changeType">
                            <Option v-for="(types,i) in youhui" :value="types.value+'/'+index+'/'+types.name+'/'+types.id" :key="types.value+index+types.name+types.id">{{ types.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="5" class="discount-table-content" >
                        <DatePicker type="date" v-show="item.tacticsType != '3'" placeholder="开始时间" v-model="item.validStart" disabled></DatePicker >
                        <DatePicker type="date" v-show="item.tacticsType == '3'" placeholder="开始时间" v-model="item.startDate" @on-change="changeSaleTime"></DatePicker >
                    </Col>
                    <Col span="5" class="discount-table-content">
                        <DatePicker type="date" placeholder="开始时间" v-model="item.validEnd" disabled ></DatePicker >
                    </Col>
                    <Col span="5" class="discount-table-content">
                        <Input v-model="item.discount" placeholder="折扣" @on-blur="changezhekou" v-if="item.tacticsType == '1'" :number="inputNumberType"></Input>
                        <!-- <InputNumber v-model="item.discount" placeholder="折扣" v-if="item.tacticsType == '1'" :max="maxDiscount" :min="1" :step="1.2" @on-change="changezhekou"></InputNumber> -->
                        <Input v-model="item.zhekou" v-if="item.tacticsType !== '1'"  disabled></Input>
                    </Col>  
            </Row>
        </FormItem>
            <Row style="margin-bottom:10px">
                <Col sapn="24">
                    <div class="total-money" v-if="formItem.items.length && showSaleDiv">
                        <span>优惠金额总计</span>
                        <span class="money">{{saleAmount | thousand}} </span>
                        <span class="money">{{saleAmounts}}</span>
                    </div>
                    </Col>
                </Row>
            </DetailStyle>
            <div style="padding-left:24px">
                <Row>
                    <Col class="col">
                    <FormItem label="优惠后服务费总额" style="width:252px">
                        <Input v-model="formItem.rentAmount" placeholder="优惠后服务费总额" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="首付款日期" style="width:252px" prop="firstPayTime">
                        <DatePicker type="date" placeholder="首付款日期" style="width:252px" v-model="formItem.firstPayTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row style="">
                    <Col class="col">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                    <div style="display:block;min-width:252px">
                        <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                    </div>
                    <div class="pay-error" v-if="errorPayType">请选择付款方式</div>

                    </Col>
                    <Col class="col" style="max-width:560px">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                    <div style="display:block;min-width:252px">
                        <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.value)" v-bind:class="{active:depositAmount==types.value}">{{ types.label }}</span>
                    </div>
                    <div class="pay-error" v-if="errorAmount">请选择履约保证金总额</div>
                    </Col>
                </Row>

            </div>
            <FormItem style="padding-left:24px;margin-top:40px">
                <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled" v-if="!disabled">提交</Button>
                <Button disabled v-if="disabled">提交</Button>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>

        </Form>


        <Modal v-model="openStation" title="选择工位" ok-text="保存" cancel-text="取消" width="90%" class-name="vertical-center-modal">
            <ListAndMap :params.sync="params" :floors.sync="floors" :stationData.sync="stationData"  @on-result-change="onResultChange" v-if="openStation"/>
            <div slot="footer">
                <Button type="primary" @click="submitStation">确定</Button>
            </div>
        </Modal>

        <Modal v-model="openPrice" title="填写单价" ok-text="保存" cancel-text="取消" class-name="vertical-center-modal">
            <div v-if="openPrice">
                <span style="display:inline-block;height:32px;line-height:32px"> 工位单价： </span>
                <Input v-model="price" placeholder="工位单价" style="width:150px"></Input>
                <span style="display:block;height:32px;line-height:32px;color:red" v-if="priceError">{{priceError}}</span>

            </div>
            <div slot="footer">
                <Button type="primary" @click="submitPrice">确定</Button>
                <Button @click="cancelPrice">取消</Button>
            </div>
        </Modal>

    </div>
</template>


<script>


import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue';
import SelectChance from '~/components/SelectSaleChance.vue';
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
import ListAndMap from '../listAndMap';






export default {


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
            chanceDisable:false,
            remindinfoNewUser: false,
            remindinfo: false,
            chanceRemindStr: "",
            defaultChanceID:0,
            opportunityTipStr: '您没有可用的机会，请确认登录账户或前往CRM检查',
            OpportunityRequired: true,
            showChanceSelector: true,
            orderitems: {},
            test: "test",
            showSaleChance: false,
            showFree: false,
            openStation: false,
            inputNumberType: true,
            selectAll: false,
            discountError: false,
            index: 0,
            depositAmount: '',
            disabled: false,
            delStation: [],
            stationAmount: '',
            installmentType: '',
            maxDiscount: {},//折扣最大限制
            timeError: false,//租赁时间校验
            stationData: {
                submitData: [],
                deleteData: [],
                clearAll: false
            },
            stationAll: {},
            payList: [
                { value: 'ONE', label: '月付' },
                { value: 'TWO', label: '两月付' },
                { value: 'THREE', label: '季付' },
                { value: 'SIX', label: '半年付' },
                { value: 'TWELVE', label: '年付' },
                { value: 'ALL', label: '全款' },
            ],
            params: {},
            depositList: [
                { label: '2个月', value: '2' },
                { label: '3个月', value: '3' },
                { label: '4个月', value: '4' },
                { label: '5个月', value: '5' },
                { label: '6个月', value: '6' },
            ],
            saleAmount: 0,
            saleAmounts: utils.smalltoBIG(0),
            youhui: [],
            columns4: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '工位房间编号',
                    key: 'name'
                },
                {
                    title: '类型',
                    key: 'seatType',
                    render: (h, params) => {
                        let type = params.row.seatType;
                        let typeName = '开放工位';
                        if (type == 'SPACE') {
                            typeName = '独立办公室'
                        } else {
                            typeName = "开放工位"
                        }
                        return typeName
                    }
                },
                {
                    title: '工位可容纳人数',
                    key: 'capacity'
                },
                {
                    title: '定价',
                    key: 'guidePrice'
                },
                
                {
                    title: '标准单价（元/月）',
                    key: 'guidePrice',
                    render: (h, params) => {
                        let price = params.row.originalPrice;
                        
                        return h('Input', {
                            props: {
                                min:params.row.guidePrice,
                                value:params.row.originalPrice,
                            },
                            on:{
                                'on-change':(event)=>{
                                    let e = event.target.value;
                                    if(isNaN(e)){
                                        e = params.row.guidePrice
                                    }
                                    price = e;
                                },
                                'on-blur':()=>{
                                    var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                                    if(price && !pattern.test(price)){
                                        this.$Notice.error({
                                            title:'单价不得多余小数点后两位'
                                        })
                                        var num2=Number(price).toFixed(3);
                                        price = num2.substring(0,num2.lastIndexOf('.')+3) 
                                    }
                                    if(price<params.row.guidePrice){
                                        price = params.row.guidePrice
                                        this.$Notice.error({
                                            title:'单价不得小于'+params.row.guidePrice
                                        })
                                    }
                                    this.changePrice(params.index,price)
                                }
                            }
                        }, '44')
                             
                    }
                },

                {
                    title: '租赁期限',
                    key: 'address',
                    render: (h, params) => {
                        return h('strong', dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.startDate))+'至'+dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.endDate)))
                    }
                },
                {
                    title: '小计',
                    key: 'originalAmount',
                    render:function(h,params){
                        return h('span',{},utils.thousand(params.row.originalAmount))
                        }
                },
                
                {
                    title: '租赁期限',
                    key: 'address',
                    render: (h, params) => {
                        return h('strong', dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.startDate)) + '至' + dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.endDate)))
                    }
                },
                {
                    title: '小计',
                    key: 'originalAmount',
                    render: function (h, params) {
                        return utils.thousand(params.row.originalAmount)
                    }
                }
            ],
            stationList: [
            ],
            floors: [],
            selectedStation: [],
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
            getFloor: +new Date(),
            changeSale: +new Date(),
            salerName: '请选择',
            ssoId: '',
            errorAmount: false,
            ssoName: '',
            discount: 0,
            minDiscount: '',
            change: {},
            showSaleDiv: true,
            openPrice: false,
            price: '',
            priceError: false,
            //录入单价的数组
            priceToStation: []

        }
    },
    head() {
        return {
            title: '新建订单'
        }
    },
    components: {
        SectionTitle,
        selectCommunities,
        DetailStyle,
        selectCustomers,
        SelectSaler,
        planMap,
        SelectChance,
        ListAndMap
    },
    mounted() {
        GLOBALSIDESWITCH("false");
        this.getFreeDeposit();
    },
    watch: {
        getFloor() {
            let _this = this;
            this.config()
            if (this.formItem.communityId && this.formItem.customerId) {
                let params = {
                    communityId: this.formItem.communityId,
                    customerId: this.formItem.customerId
                }
                this.$http.get('get-community-floor', params, r => {
                    _this.floors = r.data.floor;
                    _this.ssoId = r.data.ssoId;
                    _this.ssoName = r.data.ssoName;
                    if (!_this.formItem.salerId) {
                        _this.formItem.salerId = JSON.stringify(r.data.ssoId);
                        _this.salerName = r.data.ssoName;
                        _this.validSaleChance()

                    }

                }, e => {
                    _this.$Notice.error({
                        title: e.message
                    });

                })
            }
        },
        disabled(val) {
            console.log('disabled-->', val)
        }
    },
    methods: {
        submitPrice() {
            let price = false;
            let _this = this;
            let stationVos = this.stationList;
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (!pattern.test(this.price)) {
                price = '工位单价不得多于三位小数'
            }
            // 选中的工位
            let selectedStation = this.selectedStation;
            stationVos = stationVos.filter(function (item, index) {
                if (selectedStation.indexOf(item.seatId) != -1) {
                    return true;
                }
                return false;
            });
            stationVos.map((item) => {
                if (item.guidePrice > this.price) {
                    price = '工位单价不得小于' + item.guidePrice;
                }
            })
            if (price) {
                this.priceError = price;
            } else {
                this.priceError = false;
                this.openPrice = !this.openPrice;
                this.stationList = this.stationList.map((item) => {
                    if (selectedStation.indexOf(item.seatId) != -1) {
                        item.originalPrice = Number(_this.price);
                    }

                    return item
                })
                this.selectedStation = [];
                this.getStationAmount()
            }



        },
        openPriceButton() {

            let stationVos = this.stationList;
            //选中的工位
            let selectedStation = this.selectedStation;
            if (!selectedStation.length) {
                this.$Notice.error({
                    title: '请先选择录入单价的工位'
                })
                return;
            }
            this.openPrice = !this.openPrice;
        },
        cancelPrice() {
            this.openPrice = !this.openPrice;
            this.priceError = false;
            this.price = ''
        },
        changePrice(index, e, guidePrice) {
            this.stationList[index].originalPrice = e;
            this.getStationAmount()
        },
        config: function () {
            this.$Notice.config({
                top: 80,
                duration: 3
            });
        },
        back() {
            window.history.go(-1);
        },
        joinFormSubmit() {


            this.config()

            let station = this.stationList;
            let priceError = false;
            station.map((item) => {
                if (item.originalPrice < item.guidePrice) {
                    priceError = true
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
            let saleList = this.formItem.items.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })
            let complete = this.dealSaleInfo(true)

            if (complete == 'complete') {
                return;
            }
            
            let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.formItem.startDate));
            let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.formItem.signDate || new Date()));
            let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.formItem.endDate || this.formItem.endDateStatus));
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
            formItem.installmentType = this.installmentType;
            formItem.deposit = this.depositAmount;
            formItem.saleList = JSON.stringify(saleList);
            formItem.seats = JSON.stringify(this.stationList);
            formItem.customerId = this.formItem.customerId;
            formItem.communityId = this.formItem.communityId;
            formItem.salerId = this.formItem.salerId;
            formItem.opportunityId = this.formItem.saleChanceId;//销售机会ID
            console.log(this.formItem.opportunityId,'joinFormSubmit_join_this.formItem.saleChanceId')
            formItem.signDate = signDate;
            formItem.timeRange = this.formItem.timeRange;

            formItem.rentAmount = this.formItem.rentAmount;
            formItem.firstPayTime = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.formItem.firstPayTime);

            formItem.startDate = start;
            formItem.endDate = end;
            formItem.ssoId = this.ssoId;
            formItem.ssoName = this.ssoName;
            let _this = this;
            this.disabled = true;


            this.$http.post('save-join', formItem).then(r => {
                window.location.href = '/order-center/order-manage/station-order-manage/' + r.data.orderSeatId + '/joinView';
                //欢哥让删掉列表刷新
                // window.opener.location.href=window.opener.location.href;  
            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                })
                setTimeout(function () {
                    _this.disabled = false;
                }, 500)

                console.log('error', e)
            })

        },
        dealSaleInfo(show) {
            this.config()
            //处理已删除的数据
            let saleList = this.formItem.items.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })
            //检查手否有未填写完整的折扣项
            let complete = true;
            let zhekou = true;
            saleList.map(item => {
                if (item.tacticsType == '1' && this.discount) {
                    item.discount = this.discount
                }
                if (!item.tacticsType) {
                    complete = false

                }
                if (item.tacticsType == '3' && (!item.startDate || !item.validEnd)) {

                    complete = false;
                }
                if (item.tacticsType == '1' && !item.discount) {
                    complete = false;
                } else {

                    zhekou = this.dealzhekou(item.discount || this.discount)
                }
            });
            // this.saleAmount = 0;
            // this.saleAmounts = utils.smalltoBIG(0)
            if (!complete && show) {
                this.$Notice.error({
                    title: '请填写完整优惠信息'
                });
                this.discountError = '请填写完整优惠信息'
                return 'complete';
            }

            if (!complete && !show) {

                return;
            }
            if (!zhekou && !show) {
                return;
            }
            if (!saleList.length) {
                this.showSaleDiv = false;
            } else {
                this.showSaleDiv = true
            }

            saleList = saleList.map(item => {
                let obj = Object.assign({}, item);
                if (item.tacticsType == '3') {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.startDate))
                } else {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validStart))
                }
                obj.validEnd = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validEnd))

                return obj;
            })

            this.getSaleAmount(saleList);
            // return complete;
        },
        getSaleAmount(list) {
            this.config()
            let params = {
                communityId: this.formItem.communityId,
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.formItem.startDate),
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.formItem.endDate),
                seats: JSON.stringify(this.stationList),
                saleList: JSON.stringify(list)
            };
            let _this = this;
            _this.disabled = false;
            _this.discountError = false;
            this.$http.post('count-sale', params, r => {

                _this.stationList = r.data.seats;
                let money = this.formItem.stationAmount - r.data.totalrent;
                _this.saleAmount = Math.round(money * 100) / 100;
                _this.saleAmounts = utils.smalltoBIG(Math.round(money * 100) / 100);
                _this.formItem.rentAmount = r.data.totalrent;
            }, e => {
                if (_this.stationList.length) {
                    _this.disabled = true;
                    _this.discountError = e.message;

                    _this.$Notice.error({
                        title: e.message
                    })
                }
            })

        },
        changezhekou(value) {

            let val = value.target.value;
            if (!val) {
                return
            }
            val = val.replace(/\s/g, '');
            if (!(/^(\d|[0-9])(\.\d)?$/.test(val))) {
                this.discountError = '折扣只能为一位小数或整数';
                this.disabled = true;

                this.$Notice.error({
                    title: '折扣只能为一位小数或整数'
                })
                return;
            }
            if (isNaN(val)) {
                this.discountError = '折扣必须是数字';
                this.disabled = true;
                return
            }
            if (val < this.minDiscount) {
                this.discountError = '折扣不得小于' + this.minDiscount;
                this.disabled = true;

                this.$Notice.error({
                    title: '折扣不得小于' + this.minDiscount
                })
                return;
            }
            if (val > 9.9) {
                this.discountError = '折扣不得大于9.9'
                this.disabled = true;
                this.$Notice.error({
                    title: '折扣不得大于9.9'
                })
                return;
            }
            this.discount = val;
            this.dealSaleInfo(false)
        },
        changeSaleTime(val) {
            let _this = this;
            setTimeout(function () {
                _this.dealSaleInfo(true)
            }, 200)
        },
        handleSubmit: function (name) {
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
                    if (!_this.stationList.length) {
                        _this.$Notice.error({
                            title: '请选择入驻工位'
                        });
                        _this.disabled = false;
                        return
                    }
                    // this.disabled = true;
                    this.joinFormSubmit()
                } else {
                    _this.disabled = false;

                    this.$Notice.error({
                        title: message
                    });
                }
            })
        },
        selectDiscount: function (value) {
            // checkbox的全选事件
            let items = this.formItem.items;
            items = items.map((item) => {
                let obj = item;
                obj.select = value;
                return obj;
            })
            this.selectAll = value;
            this.formItem.items = items;
        },
        deleteDiscount: function () {
            // 删除选中的优惠信息
            let items = this.formItem.items;
            let select = []
            select = items.map((item) => {
                return item.selelct;
            })
            items = items.map(function (item, index) {
                if (item.select) {
                    item.show = false
                }
                return item;
            });
            this.formItem.items = items;
            this.discount = ''
            this.selectDiscount(false);
            this.dealSaleInfo(true)

        },
        getTacticsId(type) {
            let typeId = '';
            typeId = this.youhui.filter((item) => {
                if (item.tacticsName != type) {
                    return false;
                }
                return true;
            })
            return typeId[0].tacticsId

        },
        dealzhekou(val) {
            if (!val) {
                return false
            }
            if (isNaN(val)) {
                this.discountError = '折扣必须是数字';
                this.disabled = true;
                return false
            }
            if (val < this.minDiscount) {
                this.discountError = '折扣不得小于' + this.minDiscount;
                this.disabled = true;

                this.$Notice.error({
                    title: '折扣不得小于' + this.minDiscount
                })
                return false;
            }
            if (val > 9.9) {
                this.discountError = '折扣不得大于9.9'
                this.disabled = true;
                this.$Notice.error({
                    title: '折扣不得大于9.9'
                })
                return false;
            }
            return true;
        },

        changeType: function (val) {
            //优惠类型选择
            if (!val) {
                return;
            }
            let label = val.label;
            let value = val.value
            this.config()
            let itemValue = value.split('/')[0];
            let itemIndex = value.split('/')[1];
            let itemName = value.split('/')[2]
            let itemId = value.split('/')[3]
            this.formItem.items[itemIndex].tacticsType = itemValue;
            this.formItem.items[itemIndex].tacticsName = itemName;
            this.formItem.items[itemIndex].tacticsId = itemId;
            let items = [];
            items = this.formItem.items.map((item) => {
                if (item.value == 'qianmian') {
                    item.validStart = this.formItem.startDate;
                    item.discount = '';
                } else if (item.tacticsType == 3 && item.show) {
                    item.validStart = item.startDate || ''
                    item.validEnd = this.formItem.endDate
                    item.tacticsId = item.tacticsId || itemId;
                    item.discount = '';
                } else if (item.tacticsType == 1 && item.show) {
                    item.validStart = this.formItem.startDate
                    item.tacticsId = item.tacticsId || itemId
                    item.discount = item.discount || ''
                    item.validEnd = this.formItem.endDate;
                }
                return item;
            })
            let error = false;
            let message = '';

            let typeList = items.map(item => {
                if (item.show) {
                    return item.tacticsType;
                } else {
                    return;
                }
            })
            let qianmian = typeList.join(",").split('qianmian').length - 1;
            let houmian = typeList.join(",").split('3').length - 1;
            let zhekou = typeList.join(",").split('1').length - 1;
            if (qianmian + houmian > 1) {
                error = true;
                message = '只能有一个免租期。'
            }
            if (zhekou > 1) {
                error = true;
                message = '只能有一个折扣。'
            }
            if (error) {
                this.$Notice.error({
                    title: message
                });
                items[itemIndex].show = false;
                this.formItem.items = items;
                return;
            }
            if (itemValue == 1) {
                this.minDiscount = this.maxDiscount[label]
            }
            this.formItem.items = items;
            this.dealSaleInfo(false)
        },
        changeCommunity: function (value) {
            // 选择社区
            if (value) {
                this.formItem.communityId = value;
                this.getSaleTactics({ communityId: value })
            } else {
                this.formItem.communityId = '';
            }
            this.clearStation();
            this.getFloor = +new Date();
            this.validSaleChance();
        },
        clearStation: function () {
            // 清除所选的工位
            if (this.stationList.length) {
                

                this.stationData = {
                    submitData: [],
                    deleteData: [],
                };
                this.stationList = [];
                this.formItem.items = [];
                this.formItem.rentAmount = '0'
            }
            if (this.formItem.items.length) {
                this.formItem.items = []
                this.saleAmount = 0;
                this.saleAmounts = utils.smalltoBIG(0)
            }
            if (this.discountError) {
                this.discountError = false;
                this.disabled = false

            }
        },
        changeCustomer(value) {
            // 客户
            if (value) {
                this.formItem.customerId = value;
            } else {
                this.formItem.customerId = '';
            }
            this.getFloor = +new Date();
            
            this.validSaleChance();
            this.clearStation()

        },
        changeSaler(value) {
            // 销售员
            this.formItem.salerId = value;
            this.validSaleChance();
        },
        changeChance(value) {
            if (!value || value === 0 || value == -1) {
                this.formItem.saleChanceId = '';
            } else {
                this.formItem.saleChanceId = value;
            }
        },
        handleGotChancelist(parms) {
            // return ;
            console.log(parms)
            if (parms.isNewUser) {
                this.remindinfo = false
                if (parms.count == 1) {
                    this.remindinfoNewUser = false
                    this.chanceRemindStr = '';
                    this.showChanceSelector = true;
                    // this.defaultChanceID =parms.list[1].value; 
                    // this.$set(this.orderitems, 'saleChanceId', parms.list[1].value)
                }
                else if(parms.count >1){
                    this.remindinfoNewUser = false
                    this.chanceRemindStr = '';
                    this.showChanceSelector = true;
                }
                else if(parms.count==0){
                    this.remindinfoNewUser = true
                    this.chanceRemindStr = '入驻订单必须绑定机会'
                    this.showChanceSelector = false;
                    this.OpportunityRequired = true;
                    this.formItem.saleChanceId = '';
                    this.opportunityTipStr = '您没有可用的机会，请确认登录账户或前往CRM检查'
                }
            }
            else {
                this.remindinfoNewUser = false
                this.remindinfo = true
                this.chanceRemindStr = '新入驻客户，须选择机会'
                this.OpportunityRequired = false;
                if (parms.count == 0) {
                    this.showChanceSelector = false;
                    this.formItem.saleChanceId="";
                    this.opportunityTipStr = '您没有可用机会，客户增租续租时不必须'
                }
                else if (parms.count >= 1) {
                    this.showChanceSelector = true;
                    // this.defaultChanceID = parms.list[1].value
                }
            }
        },
        validSaleChance() {
            this.showSaleChance = this.formItem.salerId && this.formItem.customerId && this.formItem.communityId;
            let obj = {};
            obj.customerId = this.formItem.customerId;
            obj.communityId = this.formItem.communityId;
            obj.salerId = this.formItem.salerId;
            // this.defaultChanceID = -1;
            this.orderitems = Object.assign({}, obj);
        },
        deleteStation: function () {
            // 工位表单的删除按钮
            let stationVos = this.stationList;
            let selectedStation = this.selectedStation;
            stationVos = stationVos.filter(function (item, index) {
                if (selectedStation.indexOf(item.seatId) != -1) {
                    return false;
                }
                return true;
            });
            this.getStationAmount(stationVos);
            this.formItem.items = []
        },
        showStation: function () {
            // 选择工位的按钮
            this.config()

            if (!this.formItem.communityId) {
                this.$Notice.error({
                    title: '请先选择社区'
                });
                return;
            }
            if (!this.formItem.customerId) {
                this.$Notice.error({
                    title: '请先选择客户'
                });
                return;
            }
            if (!this.formItem.startDate) {
                this.$Notice.error({
                    title: '请先选择开始时间'
                });
                return;
            }
            if (!this.formItem.endDate) {
                this.$Notice.error({
                    title: '请先选择结束时间'
                });
                return;
            }
            let floor = this.floors.map(item => {
                return item.value
            })
            let params = {
                floor: floor.join(','),
                communityId: this.formItem.communityId,
                mainBillId: null,
                startDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.startDate)),
                time: +new Date(),
                endDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.endDate))
            }
            this.openStation = true;
            this.params = params;
        },
        selectRow: function (selection) {
            // 工位表单的全选
            let selectionList = [];
            selectionList = selection.map((item) => {
                return item.seatId
            })
            this.selectedStation = selectionList;
        },
        handleAdd() {
            // 优惠信息的添加按钮
            this.config()
            this.showSaleDiv = true;
            if (!this.stationList.length) {
                this.$Notice.error({
                    title: '请先选择工位'
                });
                return;
            }
            this.index++;
            this.formItem.items.push({
                value: '',
                index: this.index,
                status: 1,
                show: true,
                discount: ''
            });
        },
        selectDeposit: function (value) {
            // 选择保证金
            this.depositAmount = value
            this.errorAmount = false;
        },
        selectPayType: function (value) {
            // 选择付款方式
            this.installmentType = value;
            this.errorPayType = false;
        },
        submitStation: function () {//工位弹窗的提交
            this.stationList = this.stationData.submitData || [];
            this.delStation = this.stationData.deleteData || [];
            this.getStationAmount()
            this.openStation = false;
            this.clearSale()


        },
        clearSale() {
            this.formItem.items = [];
            this.saleAmounts = utils.smalltoBIG(0);
            this.formItem.saleAmount = 0;
        },
        onResultChange: function (val) {//组件互通数据的触发事件
            console.log('onResultChange', val)
            this.stationData = val;

        },
        cancelStation: function () {//工位弹窗的取消
            this.stationData = {
                submitData: this.stationList,
                deleteData: [],
            };
            this.openStation = false

        },

        changeBeginTime: function (val) {//租赁开始时间的触发事件，判断时间大小
            this.clearStation()
            if (!val || !this.formItem.endDate) {
                return;
            }
            let error = false;
            this.config();
            val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(val))
            let params = {
                end: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.endDate)),
                start: val
            }
            if (new Date(val) > new Date(this.formItem.endDate)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;

        },
        dealEndDate(val) {
            let str = val.split('-');
            let year = str[0];
            let month = parseInt(str[1], 10);
            var d = new Date(year, month, 0);
            let day = d.getDate();
            val = year + '-' + month + '-' + day;
            return val;

        },
        changeEndTime: function (val) {//租赁结束时间的触发事件，判断时间大小
            this.clearStation()
            if (!val) {
                return;
            }

            val = this.dealEndDate(val);
            let error = false;

            val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(val));
            this.formItem.endDate = val;

            if (!this.formItem.startDate) {
                return;
            }
            let params = {
                start: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.startDate)),
                end: val
            }
            this.config();
            if (new Date(this.formItem.startDate) > new Date(val)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;
            this.clearStation();

        },
        changeEndDateStatus(val) {
            this.clearStation()
            if (!val) {
                return;
            }

            let error = false;

            val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(val));
            this.formItem.endDate = val;

            if (!this.formItem.startDate) {
                return;
            }
            let params = {
                start: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.startDate)),
                end: val
            }
            this.config();
            if (new Date(this.formItem.startDate) >= new Date(val)) {
                error = true;
                this.$Notice.error({
                    title: '租赁开始时间不得大于等于结束时间'
                })
            } else {
                this.contractDateRange(params)
            }
            this.timeError = error;
            this.clearStation();
        },
        contractDateRange: function (params) {//获取租赁范围
            let _this = this;
            this.config();
            this.$http.get('contract-date-range', params).then(r => {
                _this.formItem.timeRange = r.data;
            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                });

                console.log('error', e)
            })
        },
        getSaleTactics: function (params) {//获取优惠信息
            let list = [];
            let maxDiscount = {};
            let _this = this;
            this.$http.get('sale-tactics', params, r => {
                if (r.data.length) {
                    list = r.data.map(item => {
                        let obj = item;
                        obj.label = item.tacticsName;
                        obj.value = item.tacticsType + '';
                        obj.id = item.tacticsId;
                        obj.name = item.tacticsName;
                        if (item.tacticsType == 1) {
                            maxDiscount[item.tacticsName] = obj.discount;
                        }
                        return obj;
                    })
                } else {
                    list = []
                }
                _this.youhui = list;
                _this.maxDiscount = maxDiscount;

            }, e => {
                _this.youhui = [];
                console.log('error', e)
            })
        },
        getStationAmount(list) {
            this.config()
            //判断标准单价是否有值，若无值，则不提交计算总价
            let originalPrice = false;
            let val = list || this.stationList;
            let station = val.map(item => {
                let obj = item;
                obj.guidePrice = item.guidePrice || item.seatPrice || 0;

                obj.originalPrice = (!item.originalPrice && item.originalPrice !== 0 && obj.guidePrice == 0) ? '' : (item.originalPrice || obj.guidePrice);

                obj.seatId = item.id || item.seatId;
                obj.floor = item.whereFloor || item.floor;
                obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.endDate));
                obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.startDate));
                if (item.originalPrice === '') {
                    originalPrice = true;
                }
                return obj;
            })
            if (originalPrice) {
                return
            }
            let params = {
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.endDate)),
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.formItem.startDate)),
                communityId: this.formItem.communityId,
                seats: JSON.stringify(station)
            }
            let _this = this;
            this.$http.post('get-station-amount', params).then(r => {
                _this.stationList = r.data.seats.map(item => {
                    let obj = item;
                    //TODO 周一联调删除
                    obj.guidePrice = item.guidePrice;
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(item.startDate))
                    obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(item.endDate))
                    obj.belongType = item.seatType;
                    return obj;
                });
                _this.stationData.submitData = _this.stationList
                _this.formItem.rentAmount = r.data.totalrent;
                _this.formItem.stationAmount = r.data.totalrent;
                _this.stationAmount = utils.smalltoBIG(r.data.totalrent)
                _this.selectedStation = []
                if (_this.showSaleDiv) {
                    _this.dealSaleInfo(false)
                }

            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                })

            })
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
.required-label {
    // padding:10px 0;
    font-size: 14px;
    position: relative;
    margin-left: 5px;
    &&:before {
        content: "*";
        color: red;
        position: absolute;
        font-size: 18px;
        left: -7px;
        top: 14px;
    }
}
.pay-error {
    color: #ed3f14;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
#chancemsg {
    position: absolute;
    bottom: 2px;
    display: block;
    top:40px;
}
.OpportunityRequired {
    color: #ed3f14;
}
.requiremark .ivu-form-item-label::before {
    content: "";
}
.title-container {
    display: inline;
    position: absolute;
    top: 8px;
    left: 36px;
    font-size: 12px;
    .title-remind-info {
        color: #ed3f14;
    }
}
</style>
