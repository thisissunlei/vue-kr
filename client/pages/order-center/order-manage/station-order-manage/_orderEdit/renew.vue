<template>
    <div class="create-new-order">
        <SectionTitle title="编辑续租服务订单管理"></SectionTitle>
        <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="续租信息">
                <Row style="margin-bottom:20px">
                    <Col class="col">
                    <FormItem label="客户名称" style="width:252px" prop="customerId">
                        <SelectCustomers :disabled='customerdisabled'  name="renewForm.customerId" :onchange="changeCustomer" :value="customerName"></SelectCustomers>
                    </FormItem>
                    </Col>

                    <Col class="col">
                    <FormItem label="所属社区" style="width:252px" prop="communityId">
                        <SelectCommunities :disabled='cummunitydisabled'  test="renewForm" :onchange="changeCommunity" :value="communityName"></SelectCommunities>
                    </FormItem>
                    </Col>
                    <Col class="col" v-if="false">
                    <FormItem label="续租结束日期" style="width:252px" prop="endDate">
                        <DatePicker type="month" placeholder="续租结束日期" format="yyyy-MM-dd" v-model="renewForm.endDate" style="display:block" @on-change="changeTime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="续租结束日期" style="width:252px" prop="endDate">
                        <DatePicker type="date" placeholder="续租结束日期" format="yyyy-MM-dd" v-model="renewForm.endDate" style="display:block" @on-change="changeTimeStatus"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="salerId">
                        <SelectSaler  :disabled='salerdisabled' name="renewForm.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="签署日期" style="width:252px" prop="signDate">
                        <DatePicker type="date" placeholder="签署日期" format="yyyy-MM-dd" v-model="renewForm.signDate" style="display:block"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem v-bind:class="{requiremark:!OpportunityRequired}" label="机会" style="width:252px" prop="salerId" v-show="showSaleChance">
                        <SelectChance  
                            type='edit' 
                            :disabled='chancedisabled' 
                            name="formItem.salerId" 
                            @onChange="changeChance" 
                            @gotChanceList='handleGotChancelist' 
                            :showType="showChanceSelector" 
                            v-show="showChanceSelector" 
                            :orderitems='orderitems' 
                            :defaultValue='defaultChanceID'
                            
                        ></SelectChance>
                    </FormItem>
                    <!-- <div v-if='remindinfoNewUser' class="title-container">(
                        <span class="title-remind-info">{{chanceRemindStr}}</span>)</div>
                    <div v-if='remindinfo' class="title-container">(如是
                        <span class="title-remind-info">{{chanceRemindStr}}</span>)</div> -->
                    <p v-show="!showChanceSelector" id='chancemsg' v-bind:class="{ OpportunityRequired: OpportunityRequired }">{{opportunityTipStr}}</p>
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
                    <Table border ref="selection" :columns="columns" :data="selecedStation" @on-selection-change="selectRow"></Table>
                    <div class="total-money" v-if="selecedStation.length">
                        <span>服务费总计</span>
                        <span class="money">{{renewForm.stationAmount | thousand}}</span>
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
                    <span class="pay-error" v-show="discountError" style="padding-left:15px">{{discountError}}</span>
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
                <FormItem v-for="(item, index) in renewForm.items" :key="index" style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none">
                    <Row v-show="item.show">
                        <Col span="3" class="discount-table-content" style="padding:0">
                        <Checkbox v-model="item.select"></Checkbox>
                        </Col>
                        <Col span="6" class="discount-table-content">
                        <Select v-model="item.type" label-in-value @on-change="changeType">
                            <Option v-for="(types,i) in youhui" :value="types.value+'/'+index+'/'+types.name+'/'+types.id" :key="types.value+types.name+types.id">{{ types.label }}</Option>
                        </Select>
                        </Col>
                        <Col span="5" class="discount-table-content">
                       
                            <DatePicker type="date" v-show="item.tacticsType != '3'" placeholder="开始时间" v-model="item.validStart" disabled></DatePicker>
                            <DatePicker type="date" v-show="item.tacticsType == '3'" placeholder="开始时间" v-model="item.startDate" @on-change="changeSaleTime"></DatePicker>
                        </Col>
                        <Col span="5" class="discount-table-content">
                        <DatePicker type="date" placeholder="开始时间" v-model="item.validEnd" disabled></DatePicker>

                        </Col>
                        <Col span="5" class="discount-table-content">
                        <Input v-model="item.discount" placeholder="折扣" @on-blur="changezhekou" v-if="item.tacticsType == '1'"></Input>
                        <!-- <InputNumber v-model="item.discount" placeholder="折扣" v-if="item.tacticsType == '1'" :max="maxDiscount" :min="1" :step="1.2" @on-change="changezhekou"></InputNumber> -->
                        <Input v-model="item.zhekou" v-if="item.tacticsType !== '1'" disabled></Input>

                        </Col>
                    </Row>
                </FormItem>
                <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <div class="total-money" v-if="renewForm.items.length && showSaleDiv">
                        <span>优惠金额总计</span>
                        <span class="money">{{saleAmount| thousand}} </span>
                        <span class="money">{{saleAmounts}}</span>
                    </div>
                    </Col>
                </Row>
            </DetailStyle>
            <div style="padding-left:24px">
                <Row>
                    <Col class="col">
                    <FormItem label="优惠后服务费总额" style="width:252px">
                        <Input v-model="renewForm.rentAmount" placeholder="优惠后服务费总额" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col class="col">
                    <FormItem label="首付款日期" style="width:252px">
                        <DatePicker type="date" placeholder="首付款日期" style="width:252px" v-model="renewForm.firstPayTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
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
                    </Col>
                </Row>
            </div>

            <FormItem style="padding-left:24px;margin-top:40px">
                <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
                <!-- <Button type="ghost" style="margin-left: 8px">重置</Button> -->
            </FormItem>
        </Form>
        <Modal v-model="openStation" title="选择工位" ok-text="保存" cancel-text="取消" width="600" class-name="vertical-center-modal">
            <div v-if="!stationListData.length">无可续租工位</div>
            <stationList label="可续租工位" :stationList="stationListData" @on-station-change="onStationChange" v-if="openStation && stationListData.length"></stationList>
            <div slot="footer">
                <Button type="primary" @click="submitStation">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancelStation">取消</Button>
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
import SelectCommunities from '~/components/SelectCommunities.vue'
import SelectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import stationList from './stationList.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
import SelectChance from '~/components/SelectSaleChance.vue';




export default {
    data() {
        const validateFirst = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请先选择首付款日期'));
            } else if (new Date(this.renewForm.start) < new Date(value)) {
                callback(new Error('首付款日期不得晚于起始日期'));
            } else {
                callback()
            }
        };
        return {
            orderId:'',
            chancedisabled:true,
            salerdisabled:true,
            cummunitydisabled:true,
            customerdisabled:true,
            remindinfoNewUser: false,
            remindinfo: false,
            chanceRemindStr: "",
            defaultChanceID: 0,
            opportunityTipStr: '您没有可用的机会，请确认登录账户或前往CRM检查',
            OpportunityRequired: true,
            showChanceSelector: true,
            orderitems: {},
            showSaleChance: true,
            showFree: false,
            disabled: false,//提交按钮是否有效
            index: 1,//优惠的index
            openStation: false,//弹窗开关
            stationAmount: '',
            communityName: '',
            customerName: '',
            salerName: '',
            renewForm: {
                communityId: '',
                customerId: '',
                endDate: '',
                saler: '',
                rentAmount: '',
                items: []
            },
            saleAmount: 0,
            saleAmounts: 0,
            disabled: false,//提交按钮是否禁止
            discountError: false,
            selectedDel: [],//选择要删除的工位
            ruleCustom: {
                communityId: [
                    { required: true, message: '此项不可为空', trigger: 'change' }
                ],
                customerId: [
                    { required: true, message: '此项不可为空', trigger: 'change' }
                ],
                salerId: [
                    { required: true, message: '此项不可为空', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'date', message: '此项不可为空!', trigger: 'change' }
                ],
                firstPayTime: [
                    { required: true, trigger: 'change', validator: validateFirst },
                ],
                endDate: [
                    { required: true, message: '此项不可为空' }
                ],
                signDate: [
                    { required: true, type: 'date', message: '此项不可为空', trigger: 'change' }
                ],
            },
            stationListData: [],
            selecedStation: [],
            selecedArr: [],
            depositAmount: '',
            installmentType: '',
            maxDiscount: {},
            minDiscount: '',
            columns: [
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
                    key: 'originalPrice',
                    render: (h, params) => {
                        let price = params.row.originalPrice;
                        return h('Input', {
                            props: {
                                min: params.row.guidePrice,
                                value: params.row.originalPrice,
                            },
                            on: {
                                'on-change': (event) => {
                                    let e = event.target.value;
                                    if (isNaN(e)) {
                                        e = params.row.originalPrice
                                    }
                                    price = e;
                                },
                                'on-blur': () => {
                                    var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
                                    if (!pattern.test(price)) {
                                        this.$Notice.error({
                                            title: '单价不得多余小数点后两位'
                                        })
                                        var num2 = Number(price).toFixed(3);
                                        price = num2.substring(0, num2.lastIndexOf('.') + 3)
                                    }
                                    if (price < params.row.guidePrice) {
                                        price = params.row.guidePrice
                                        this.$Notice.error({
                                            title: '单价不得小于' + params.row.guidePrice
                                        })
                                    }
                                    this.changePrice(params.index, price)
                                }
                            }
                        }, '44')
                    }
                },
                {
                    title: '租赁期限',
                    key: 'address',
                    render: (h, params) => {
                        return h('strong', dateUtils.dateToStr("YYYY-MM-dd", new Date(params.row.start)) + '至' + dateUtils.dateToStr("YYYY-MM-dd", new Date(params.row.end)))
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
            selectAll: false,//工位全选
            youhui: [],
            errorPayType: false,
            getStationFn: '',
            stationAmount: '',
            orderSeatId: '',
            corporationName: '',
            change: {},
            showSaleDiv: true,
            openPrice: false,
            price: '',
            priceError: false,

        }
    },
    head() {
        return {
            title: '编辑续租服务订单管理'
        }
    },
    components: {
        SectionTitle,
        SelectCommunities,
        DetailStyle,
        SelectCustomers,
        SelectSaler,
        stationList,
        planMap,
        SelectChance
    },
    mounted() {
        this.getDetailData();
        this.getFreeDeposit();
        GLOBALSIDESWITCH("false");
    },
    watch: {
        getStationFn: function () {
            if (this.renewForm.customerId && this.renewForm.communityId && this.renewForm.endDate) {
                this.getRenewStation()
            }
            if (this.renewForm.communityId) {
                this.getSaleTactics({ communityId: this.renewForm.communityId })
            }
        },
    },
    methods: {
                //获取销售机会列表
        getSalerChanceList() {
        // let chanceid=this.renewForm.saleChanceId;
            if(this.defaultChanceID){
                this.chancedisabled=true
                return;
            }
            else{
                    let parms = {
                    customerId: this.renewForm.customerId,
                    communityId: this.renewForm.communityId,
                    receiveId: this.renewForm.salerId,
                    orderId:this.orderId
                }
                let list = [];
                let _this = this;

                this.$http.get('get-salechance', parms, r => {
                    // debugger;
                    if (r.data.items.data.length==0) {                       
                        _this.remindinfoNewUser = false
                        _this.remindinfo = true
                        _this.chanceRemindStr = '新入驻客户，须选择机会'
                        _this.OpportunityRequired = false;
                        _this.showChanceSelector = false;
                        _this.opportunityTipStr = '您没有可用机会，客户增租续租时不必须'
                        return;
                    }
                    else{
                        _this.validSaleChance();
                        _this.chancedisabled=false
                        _this.remindinfo = false
                        _this.remindinfoNewUser = false
                        _this.chanceRemindStr = '';
                        _this.showChanceSelector = true;
                        
                    }
                    console.log(this.chancedisabled,'chancedisabled')
                }, error => {
                    this.$Notice.error({
                        title: error.message
                    });
                })
            }
        },
        submitPrice() {
            let price = false;
            let _this = this;
            let stationVos = this.selecedStation;
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (!pattern.test(this.price)) {
                price = '工位单价不得多于三位小数'
            }
            // 选中的工位selectedDel
            let selectedStation = this.selectedDel;
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
                this.selecedArr = this.selecedArr.map((item) => {
                    if (selectedStation.indexOf(item.seatId) != -1) {
                        item.originalPrice = Number(_this.price);
                    }

                    return item
                })
                this.selectedDel = [];
                this.getStationAmount()
            }



        },
        openPriceButton() {

            let stationVos = this.selecedStation;
            //选中的工位
            let selectedStation = this.selectedDel;
            console.log('====>', selectedStation)
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
        },
        changePrice(index, e) {
            this.selecedArr[index].originalPrice = e;
            this.getStationAmount()
        },

        getDetailData() {
            let _this = this;
            let { params } = this.$route;
            let from = {
                id: params.orderEdit
            };
            this.orderId=from.id;
            this.$http.get('join-bill-detail', from, r => {
                let data = r.data;
                let money = 0;
                data.orderSeatDetailVo = data.orderSeatDetailVo.map(item => {
                    let obj = item;
                    money += item.amount;
                    obj.guidePrice = item.guidePrice || 0;
                    obj.name = item.seatName;
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.startDate));
                    obj.start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.startDate));
                    obj.end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.endDate));
                    obj.endDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.endDate));
                    return obj;
                })
                 _this.orderitems = Object.assign({}, {
                     customerId:data.customerId,
                     communityId:data.communityId,
                     salerId:data.salerId
                 });
                 console.log(this.orderitems,"oooooo")
                _this.getSaleTactics({ communityId: data.communityId })
                _this.renewForm.customerId = JSON.stringify(data.customerId);
                _this.customerName = data.customerName;
                _this.renewForm.communityId = JSON.stringify(data.communityId);
                _this.salerName = data.salerName;
                _this.renewForm.salerId = JSON.stringify(data.salerId);
                _this.communityName = data.communityName;
                _this.renewForm.endDate = new Date(data.endDate);
                _this.renewForm.signDate = new Date(data.signDate);


                _this.renewForm.rentAmount = data.rentAmount;
                _this.renewForm.stationAmount = data.seatRentAmount;
                _this.stationAmount = utils.smalltoBIG(data.seatRentAmount)

                _this.renewForm.start = data.startDate;
                _this.selecedStation = data.orderSeatDetailVo;
                _this.selecedArr = data.orderSeatDetailVo;
                // _this.renewForm.rentAmount = data.rentAmount;
                _this.installmentType = data.installmentType;
                _this.depositAmount = data.deposit + '';
                _this.renewForm.firstPayTime = data.firstPayTime;
                // _this.getStationAmount()
                _this.defaultChanceID = data.opportunityId;
                _this.saleAmount = data.tactiscAmount
                _this.saleAmounts = utils.smalltoBIG(data.tactiscAmount)

                setTimeout(function () {

                    data.contractTactics = data.contractTactics.map((item, index) => {
                        let obj = {};
                        obj.status = 1;
                        obj.show = true;
                        obj.validStart = item.freeStart;
                        if (item.tacticsType == 3) {
                            obj.startDate = item.freeStart;
                        } else {
                            obj.startDate = '';
                        }

                        obj.validEnd = item.freeEnd;
                        obj.tacticsId = item.tacticsId;
                        obj.discount = item.discountNum;
                        let i = _this.youhui.filter((items, i) => {
                            if (items.name == item.tacticsName) {
                                return true
                            }
                            return false
                        })
                        obj.type = item.tacticsType + '/' + index + '/' + i[0].name + '/' + i[0].id;
                        obj.tacticsType = JSON.stringify(item.tacticsType);
                        return obj;
                    })

                    _this.renewForm.items = data.contractTactics;
                    _this.dealSaleInfo(false)
                }, 500)
                _this.getStationFn = +new Date();
                _this.getSalerChanceList();
            }, e => {
                _this.$Notice.error({
                    title: e.message
                });
            })
        },
        config: function () {
            this.$Notice.config({
                top: 80,
                duration: 3
            });
        },
        renewFormSubmit() {
            this.config();


            let station = this.selecedStation;
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

            let complete = this.dealSaleInfo(true);
            if (complete == 'complete') {
                return;
            }
            let { params } = this.$route;
            let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.start));
            let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.signDate));
            let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.endDate));
            let renewForm = {}
            // let saleList = this.renewForm.items;
            let saleList = this.renewForm.items.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })
            saleList = saleList.map(item => {
                let obj = Object.assign({}, item);
                obj.validEnd = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validEnd))
                if (item.tacticsType == '3') {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.startDate))
                } else {
                    obj.validStart = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(item.validStart))
                }
                return obj;
            })
            renewForm.id = params.orderEdit;
            renewForm.installmentType = this.installmentType;
            renewForm.deposit = this.depositAmount;
            renewForm.saleList = JSON.stringify(saleList);
            renewForm.seats = JSON.stringify(this.selecedStation);
            renewForm.customerId = this.renewForm.customerId;
            renewForm.communityId = this.renewForm.communityId;
            renewForm.salerId = this.renewForm.salerId;
            renewForm.opportunityId = this.renewForm.saleChanceId||'';//销售机会ID
            renewForm.rentAmount = this.renewForm.rentAmount;
            renewForm.signDate = signDate;
            renewForm.startDate = start;
            renewForm.firstPayTime = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.firstPayTime));
            renewForm.endDate = end;
            let _this = this;
            this.disabled = true;
            
            this.$http.post('save-renew', renewForm).then(r => {
        
                window.location.href = '/order-center/order-manage/station-order-manage/' + params.orderEdit + '/renewView';
                // window.close();
                window.opener.location.reload();
            }).catch(e => {
                _this.$Notice.error({
                    title: e.message
                });
                setTimeout(function () {
                    _this.disabled = false;
                }, 500)

                console.log('error', e)
            })

        },
        handleSubmit: function (name) {
            let message = '请填写完整表单';
            this.config()
            let _this = this;
            this.disabled = true;
            if (!this.installmentType) {
                this.errorPayType = true
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (!this.selecedStation.length) {
                        this.$Notice.error({
                            title: '请选择续租工位'
                        });
                        _this.disabled = false;
                        return;
                    }
                    this.renewFormSubmit()
                } else {
                    _this.disabled = false;

                    this.$Notice.error({
                        title: message
                    });
                }
            })
        },
        getRenewStation() {
            let { params } = this.$route;
            let paramsform = {
                //假数据
                customerId: this.renewForm.customerId,
                communityId: this.renewForm.communityId,
                continueDate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.endDate)),
                id: params.orderEdit
            };
            let _this = this;
            this.$http.get('get-renew-station', paramsform, r => {
                let station = []
                for (let i in r.data) {
                    let obj = {};
                    obj.name = dateUtils.dateToStr("YYYY-MM-dd", new Date(i));

                    obj.value = r.data[i].map(item => {
                        let obj = item;
                        obj.oldPrice = item.guidePrice == 0 ? '' : item.guidePrice;
                        obj.originalPrice = item.guidePrice == 0 ? '' : item.guidePrice;
                        return obj;
                    });

                    station.push(obj)
                }
                _this.stationListData = station;

            }, e => {

                console.log('error', e)
            })

        },
        changeCustomer: function (value) {
            if (value) {
                this.renewForm.customerId = value;
                 this.clearStation()
                this.getStationFn = +new Date()
               
            } else {
                this.renewForm.customerId = '';
            }
            this.validSaleChance();
        },
        changeCommunity: function (value) {
            if (value) {
                this.renewForm.communityId = value;
                this.getStationFn = +new Date()
            } else {
                this.renewForm.communityId = '';
            }
            this.validSaleChance();
            this.clearStation()
        },
        changeChance(value) {
            if (!value || value === 0 || value == -1) {
                this.renewForm.saleChanceId = '';
            } else {
                this.renewForm.saleChanceId = value;
            }
        },
        validSaleChance() {
            // this.showSaleChance = this.renewForm.salerId && this.renewForm.customerId && this.renewForm.communityId;
            let obj = {};
            obj.customerId = this.renewForm.customerId;
            obj.communityId = this.renewForm.communityId;
            obj.salerId = this.renewForm.salerId;
            obj.orderId=this.orderId
            this.orderitems = Object.assign({}, obj);
        },
         handleGotChancelist(parms) {
            
             return;
            if (parms.isNewUser) {
                this.remindinfo = false
                if (parms.count == 1) {
                    this.remindinfoNewUser = false
                    this.chanceRemindStr = '';
                    this.showChanceSelector = true;
                    this.defaultChanceID = parms.list[1].value
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
                    this.opportunityTipStr = '您没有可用机会，客户增租续租时不必须'
                }
                else if (parms.count >= 1) {
                    this.showChanceSelector = true;
                    // this.defaultChanceID = parms.list[1].value
                }
            }
        },
        clearStation() {
            // 清除所选的工位
            if (this.selecedStation.length) {
                this.selecedStation = [];
                this.selecedArr = [];
            }
            if (this.renewForm.items.length) {
                this.renewForm.items = []
                this.saleAmount = 0;
                this.saleAmounts = utils.smalltoBIG(0)
            }
            if (this.discountError) {
                this.discountError = false;
                this.disabled = false;
            }
            this.renewForm.rentAmount = '0'

            //   if (this.stationList.length) {
            //     this.stationData = {
            //         submitData: [],
            //         deleteData: [],
            //     };
            //     this.stationList = [];
            //     this.formItem.items = []
            // }
            // if (this.formItem.items.length) {
            //     this.formItem.items = []
            //     this.saleAmount = 0;
            //     this.saleAmounts = utils.smalltoBIG(0)
            // }
            // if (this.discountError) {
            //     this.discountError = false;
            //     this.disabled = false

            // }

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
        changeTimeStatus(value) {
            this.clearStation()
            if (!value) {
                this.renewForm.endDate = '';
                return;
            }
            value = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(value))

            this.renewForm.endDate = value;

            let _this = this;
            setTimeout(function () {
                _this.getStationFn = +new Date()
                _this.selecedStation = []
                _this.discountError = false;
                _this.renewForm.items = _this.renewForm.items.map(item => {
                    let obj = item;
                    obj.show = false;
                    return obj;
                })

            }, 200)
        },
        changeTime: function (value) {
            this.clearStation()
            if (!value) {
                this.renewForm.endDate = '';
                return;
            }

            value = this.dealEndDate(value);
            this.renewForm.endDate = value;

            let _this = this;
            setTimeout(function () {
                _this.getStationFn = +new Date()

            }, 200)
        },
        changeSaler: function (value) {
            this.renewForm.salerId = value;
        },
        showStation: function () {
            this.config();
            if (!this.renewForm.communityId) {
                this.$Notice.error({
                    title: '请先选择社区'
                });
                return
            }
            if (!this.renewForm.customerId) {
                this.$Notice.error({
                    title: '请先选择客户'
                });
                return
            }
            if (!this.renewForm.endDate) {
                this.$Notice.error({
                    title: '请先选择续租结束时间'
                });
                return
            }
            this.openStation = true;
        },
        selectDeposit: function (value) {
            this.depositAmount = value;

        },
        selectPayType: function (value) {
            this.installmentType = value;
            this.errorPayType = false;
        },
        handleAdd: function () {
            this.config()

            if (!this.renewForm.communityId) {
                this.$Notice.error({
                    title: '请先选择社区'
                });
                return
            }
            if (!this.renewForm.customerId) {
                this.$Notice.error({
                    title: '请先选择客户'
                });
                return
            }
            if (!this.renewForm.endDate) {
                this.$Notice.error({
                    title: '请先选择续租结束时间'
                });
                return
            }
            if (!this.selecedStation.length) {
                this.$Notice.error({
                    title: '请先选择续租工位'
                });
                return
            }
            this.showSaleDiv = true;
            this.index++;
            this.renewForm.items.push({
                value: '',
                index: this.index,
                show: true,
                status: 1,
                type: ''
            });
        },
        deleteDiscount: function () {
            let items = this.renewForm.items;
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
            this.renewForm.items = items;
            this.discount = ''
            this.selectDiscount(false)
            this.dealSaleInfo(true)

            // this.setCheckFalse(items)

        },
        deleteStation: function () {
            let stationVos = this.selecedStation;
            let delArr = this.selectedDel;
            stationVos = stationVos.filter(function (item, index) {
                if (delArr.indexOf(item.seatId) != -1) {
                    return false;
                }
                return true;
            });
            this.selecedStation = stationVos;
            this.selecedArr = stationVos;
            this.getStationAmount()

        },
        selectRow: function (val) {
            let selectionList = [];
            selectionList = val.map((item) => {
                return item.seatId
            })
            this.selectedDel = selectionList;
        },
        selectDiscount: function (value) {
            let items = this.renewForm.items;
            items = items.map((item) => {
                let obj = item;
                obj.select = value;
                return obj;
            })
            this.selectAll = value;
            this.renewForm.items = items;
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
        //优惠类型选择
        changeType: function (val) {
            //优惠类型选择
            if (!val) {
                return;
            }
            let label = val.label;
            let value = val.value;
            this.config()
            let _this = this;
            let itemValue = value.split('/')[0];
            let itemIndex = value.split('/')[1];
            let itemName = value.split('/')[2]
            let itemId = value.split('/')[3]
            this.renewForm.items[itemIndex].tacticsName = itemName;
            this.renewForm.items[itemIndex].tacticsId = itemId;
            this.renewForm.items[itemIndex].tacticsType = itemValue;

            let items = [];
            items = this.renewForm.items.map((item) => {
                if (item.tacticsType == 'qianmian') {
                    item.validStart = this.renewForm.start;
                    item.discount = '';
                    item.name = label
                    item.tacticsId = this.getTacticsId()
                } else if (item.tacticsType == 3 && item.show) {
                    item.validStart = item.startDate || ''
                    item.validEnd = this.renewForm.endDate
                    item.tacticsId = item.tacticsId || itemId;
                    item.discount = '';
                } else if (item.tacticsType == 1 && item.show) {
                    item.validStart = this.renewForm.start
                    item.tacticsId = item.tacticsId || itemId;
                    item.discount = item.discount || ''
                    item.validEnd = this.renewForm.endDate
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
                this.renewForm.items = items;
                return;
            }
            if (itemValue == 1) {
                this.minDiscount = this.maxDiscount[label]
            }
            this.renewForm.items = items;
            this.dealSaleInfo(false)
        },
        submitStation: function () {
            let val = this.selecedArr || [];
            this.openStation = false
            if (!val.length) {
                return;
            }
            this.selecedArr = this.selecedArr.map(item => {
                let obj = item;
                obj.originalPrice = item.oldPrice;
                return obj;
            })
            var date = val[0].begin;
            date = new Date(date).getTime();
            this.clearSale()
            let day = 1000 * 60 * 60 * 24;
            let start = date + day;
            this.renewForm.start = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(start));
            this.getStationAmount()

        },
        clearSale() {
            this.renewForm.items = [];
            this.renewForm.saleAmount = 0;
            this.saleAmount = utils.smalltoBIG(0)

        },
        getStationAmount() {
            //工位原始结束日期，续租开始日期前一天
            let startDate = '';

            let val = this.selecedArr;
            let _this = this;
            this.config()
            let originalPrice = false;



            let station = val.map(item => {
                let obj = item;
                // obj.originalPrice = item.price;
                obj.seatId = item.seatId;
                startDate = obj.endDate;
                if (item.originalPrice == '') {
                    originalPrice = true;
                }
                obj.floor = item.whereFloor || item.floor;
                obj.startDate = this.renewForm.start;
                obj.start = this.renewForm.start;
                obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.renewForm.endDate));
                obj.end = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.renewForm.endDate));
                return obj;
            })
            let params = {
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.renewForm.endDate)),
                leaseBegindate: this.renewForm.start,
                communityId: this.renewForm.communityId,
                seats: JSON.stringify(station)
            }
            this.selecedStation = station
            if (originalPrice) {
                return
            }
            if (val.length) {
                this.$http.post('get-station-amount', params, r => {
                    let money = 0;
                    _this.selecedStation = r.data.seats.map(item => {
                        let obj = item;
                        money += item.amount;
                        obj.start = item.startDate
                        obj.end = item.endDate
                        return obj;
                    });
                    _this.renewForm.rentAmount = Math.round(money * 100) / 100;
                    _this.renewForm.stationAmount = Math.round(money * 100) / 100;
                    _this.stationAmount = utils.smalltoBIG(Math.round(money * 100) / 100)
                    if (_this.showSaleDiv) {
                        _this.dealSaleInfo(false)
                    }


                }, e => {
                    _this.$Notice.error({
                        title: e.message
                    });

                    console.log('error', e)
                })
            }
        },
        cancelStation: function () {
            this.selecedStation = this.selecedStation.map(item => {
                let obj = item
                obj.time = +new Date()
                return obj;
            })
            this.openStation = false
        },
        onStationChange: function (val) {
            this.selecedArr = val;
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
                _this.youhui = []

                console.log('error', e)
            })
        },
        setCheckFalse(item) {
            //删除后优惠checkbox全部设为false
            this.selectDiscount(false)

        },
        changeSaleTime(val) {
            let _this = this;
            setTimeout(function () {
                _this.dealSaleInfo(true)
            }, 200)
        },
        changezhekou(val) {
            val = val.target.value;
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
            this.dealSaleInfo(true)
        },
        dealSaleInfo(show) {
            this.config()
            //处理已删除的数据
            let saleList = this.renewForm.items.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })
            //检查手否有未填写完整的折扣项
            let complete = true;
            let zhekou = true;
            saleList.map(item => {
                if (!item.tacticsType) {
                    complete = false
                }
                if (item.tacticsType != '1' && (!item.startDate || !item.validEnd)) {
                    complete = false

                }
                if (item.tacticsType == '1' && !item.discount) {
                    complete = false

                } else {
                    zhekou = this.dealzhekou(item.discount || this.discount)
                }
            });
            if (saleList.length) {
                this.showSaleDiv = true;
            } else {
                this.showSaleDiv = false;
            }
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
            this.getSaleAmount(saleList)
        },
        dealzhekou(val) {
            if (!val) {
                return false;
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
        getSaleAmount(list) {
            this.config()
            let _this = this;
            let params = {
                communityId: this.renewForm.communityId,
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.start)),
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.endDate)),
                seats: JSON.stringify(this.selecedStation),
                saleList: JSON.stringify(list)
            };
            _this.disabled = false;
            _this.discountError = false;
            this.$http.post('count-sale', params, r => {

                _this.renewForm.rentAmount = Math.round(r.data.totalrent * 100) / 100;
                let money = this.renewForm.stationAmount - r.data.totalrent;

                // let money = r.data.originalTotalrent - r.data.totalrent;
                _this.saleAmount = Math.round(money * 100) / 100;
                _this.saleAmounts = utils.smalltoBIG(Math.round(money * 100) / 100);
            }, e => {
                _this.disabled = true;
                _this.discountError = e.message;
                _this.$Notice.error({
                    title: e.message
                });

                console.log('error', e)
            })

        },
        getFreeDeposit() {
            this.$http.get('get-seat-deposit-free', '').then(r => {
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
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
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
#chancemsg {
    position: absolute;
    bottom: 2px;
    display: block;
    top: 40px;
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