<template>
  <div class="create-new-order">
    <SectionTitle title="新建续租服务订单管理"></SectionTitle>
    <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form">
      <DetailStyle info="续租信息">
        <Row style="margin-bottom:20px">
          <Col class="col">
            <FormItem label="客户名称" style="width:252px" prop="customerId">
              <SelectCustomers name="renewForm.customerId" :onchange="changeCustomer"></SelectCustomers>
            </FormItem>
          </Col>
          <Col class="col">
            <FormItem label="所属社区" style="width:252px" prop="communityId">
              <SelectCommunities test="renewForm" :onchange="changeCommunity"></SelectCommunities>
            </FormItem>
          </Col>
          <Col class="col" v-if="false">
            <FormItem label="续租结束日期" style="width:252px" prop="endDate">
              <DatePicker
                type="month"
                placeholder="续租结束日期"
                format="yyyy-MM-dd"
                v-model="renewForm.endDate"
                style="display:block"
                @on-change="changeTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col class="col">
            <FormItem label="续租结束日期" style="width:252px" prop="endDate">
              <DatePicker
                type="date"
                placeholder="续租结束日期"
                format="yyyy-MM-dd"
                v-model="renewForm.endDate"
                style="display:block"
                @on-change="changeTimeStatus"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col class="col">
            <FormItem label="销售员" style="width:252px" prop="salerId">
              <SelectSaler name="renewForm.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
            </FormItem>
          </Col>
          <Col class="col">
            <FormItem label="签署日期" style="width:252px" prop="signDate">
              <DatePicker
                type="date"
                placeholder="签署日期"
                format="yyyy-MM-dd"
                v-model="renewForm.signDate"
                style="display:block"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col class="col">
            <FormItem
              v-bind:class="{requiremark:!OpportunityRequired}"
              label="机会"
              style="width:252px"
              prop="salerId"
              v-show="showSaleChance"
            >
              <SelectChance
                :disabled="chanceDisable"
                name="formItem.salerId"
                @onChange="changeChance"
                :showType="showChanceSelector"
                @gotChanceList="handleGotChancelist"
                v-show="showChanceSelector"
                :orderitems="orderitems"
                :defaultValue="defaultChanceID"
              ></SelectChance>
            </FormItem>
            <div v-if="remindinfoNewUser" class="title-container">
              (
              <span class="title-remind-info">{{chanceRemindStr}}</span>)
            </div>
            <div v-if="remindinfo" class="title-container">
              (如是
              <span class="title-remind-info">{{chanceRemindStr}}</span>)
            </div>
            <p
              v-show="!showChanceSelector"
              id="chancemsg"
              v-bind:class="{ OpportunityRequired: OpportunityRequired }"
            >{{opportunityTipStr}}</p>
          </Col>
        </Row>
      </DetailStyle>
      <!--苏岭增加客户主管理员开始-->
      <div class="m-customer-info" v-if="isManager">
        <DetailStyle info="客户主管理员信息">
          <div class="info-button">
            <Button type="primary" @click="addEditOpen" class="join-btn">{{isAddEdit?'变更':'添加'}}</Button>
          </div>
          <Row style="margin-bottom:30px">
            <div v-if="!isAddEdit" style="margin-bottom:20px;color:#ed3f14;">主管理员信息必填，请点击右上角按钮添加</div>
            <div v-if="isAddEdit">
              <LabelText label="管理员手机号" :inline="true" type="star">{{customerInfo.phone}}</LabelText>
              <LabelText label="管理员姓名" :inline="true" type="star">{{customerInfo.name}}</LabelText>
              <LabelText label="管理员电子邮箱" :inline="true" type="star">{{customerInfo.email}}</LabelText>
            </div>
          </Row>
        </DetailStyle>
      </div>
      <!--苏岭增加客户主管理员结束-->
      <DetailStyle info="金额信息">
        <Row style="margin-bottom:10px">
          <Col class="col" sapn="24">
            <Button
              type="primary"
              style="margin-right:20px;font-size:14px"
              @click="showStation"
            >选择工位</Button>
            <Button type="ghost" style="margin-right:20px;font-size:14px" @click="deleteStation">删除</Button>
            <Button type="primary" style="font-size:14px" @click="openPriceButton">批量填写价格</Button>
            <Button
              type="primary"
              style="margin-left:20px;font-size:14px"
              @click="openDiscountButton"
            >批量填写折扣</Button>
          </Col>
        </Row>
        <Row style="margin-bottom:10px">
          <Col sapn="24">
            <Table
              border=""
              ref="selection"
              :columns="columns"
              :data="selecedStation"
              @on-selection-change="selectRow"
            ></Table>
            <div class="total-money" v-if="selecedStation.length">
              <div class="left" style="padding-left: 10px;">
                <span>折扣原因：</span>
                <Input style="width:400px" :maxlength="200" v-model="renewForm.discountReason"/>
              </div>
              <div class="right">
                <span>服务费总计</span>
                <span class="money">{{renewForm.stationAmount | thousand}}</span>
                <span class="money">{{renewForm.stationAmount|amountInWords}}</span>
              </div>
            </div>
          </Col>
        </Row>
      </DetailStyle>
      <div style="padding-left:24px">
        <Row>
          <Col class="col">
            <FormItem label="首付款日期" style="width:252px" prop="firstPayTime">
              <DatePicker
                type="date"
                placeholder="首付款日期"
                style="width:252px"
                v-model="renewForm.firstPayTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col class="col">
            <span
              class="required-label"
              style="width:252px;padding:11px 12px 10px 0;color:#666;display:block"
            >付款方式</span>
            <div style="display:block;min-width:252px">
              <span
                v-for="types in payList"
                :key="types.value"
                class="button-list"
                v-on:click="selectPayType(types.value)"
                v-bind:class="{active:installmentType==types.value}"
              >{{ types.label }}</span>
            </div>
            <div class="pay-error" v-if="errorPayType">请选择付款方式</div>
          </Col>
          <Col class="col" style="max-width:560px">
            <span
              class="required-label"
              style="width:252px;padding:11px 12px 10px 0;color:#666;display:block"
            >履约保证金总额</span>
            <div style="display:block;min-width:252px">
              <span
                v-for="types in depositList"
                :key="types.value"
                class="button-list"
                v-on:click="selectDeposit(types.value)"
                v-bind:class="{active:depositAmount==types.value}"
              >{{ types.label }}</span>
            </div>
            <div class="pay-error" v-if="errorAmount">请选择履约保证金总额</div>
          </Col>
        </Row>
      </div>
      <FormItem style="padding-left:24px;margin-top:40px">
        <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
      </FormItem>
    </Form>
    <Modal
      v-model="openStation"
      title="选择工位"
      ok-text="保存"
      cancel-text="取消"
      width="600"
      class="vertical-center-modal"
    >
      <div v-if="!stationListData.length">无可续租工位</div>
      <stationList
        label="可续租工位"
        :stationList="stationListData"
        @on-station-change="onStationChange"
        v-if="openStation && stationListData.length"
      ></stationList>
      <div slot="footer">
        <Button type="primary" @click="submitStation">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="cancelStation">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="openPrice"
      title="填写单价"
      ok-text="保存"
      cancel-text="取消"
      class="vertical-center-modal"
    >
      <div v-if="openPrice">
        <span style="display:inline-block;height:32px;line-height:32px">工位单价：</span>
        <Input v-model="price" placeholder="工位单价" style="width:150px"/>
        <span
          style="display:block;height:32px;line-height:32px;color:red"
          v-if="priceError"
        >{{priceError}}</span>
      </div>
      <div slot="footer">
        <Button type="primary" @click="submitPrice">确定</Button>
        <Button @click="cancelPrice">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="openDiscount"
      title="批量填写折扣"
      ok-text="保存"
      cancel-text="取消"
      class="vertical-center-modal"
    >
      <div v-if="openDiscount">
        <span style="display:inline-block;height:32px;line-height:32px">签约折扣:</span>
        <Input v-model="batchDiscount" placeholder="签约折扣" style="width:150px"/>
        <span
          style="display:block;height:32px;line-height:32px;color:red"
          v-if="batchDiscountError"
        >{{batchDiscountError}}</span>
      </div>
      <div slot="footer">
        <Button type="primary" @click="submitDiscount">批量填写</Button>
        <Button @click="openDiscount=false">取消</Button>
      </div>
    </Modal>
    <!--苏岭增加客户主管理员开始-->
    <Modal v-model="isAddManager" :title="manageTitle" width="665">
      <AddManager
        v-if="isAddManager"
        :customerId="renewForm.customerId"
        @formData="getformData"
        @submitFn="getFunction"
      />
      <div slot="footer">
        <Button type="primary" @click="addManagerSubmit">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="addEditOpen">取消</Button>
      </div>
    </Modal>
    <!--苏岭增加客户主管理员结束-->
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
import LabelText from '~/components/LabelText';
import AddManager from '../addAdministrator';


export default {
  head() {
    return {
      title: "新建续租订单-氪空间后台管理系统"
    }
  },
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
      //苏岭
      customerInfo: {},
      isManager: false,
      submitManager: null,
      isAddManager: false,
      isAddEdit: false,
      managerId: '',
      manageTitle: "",
      //苏岭结束

      chanceDisable: false,
      remindinfoNewUser: false,
      remindinfo: false,
      chanceRemindStr: "",
      defaultChanceID: 0,
      opportunityTipStr: '您没有可用的机会，请确认登录账户或前往CRM检查',
      OpportunityRequired: true,
      showChanceSelector: true,
      showSaleChance: false,
      orderitems: {},
      showFree: false,
      discount: 0,
      disabled: false,//提交按钮是否有效
      index: 1,//优惠的index
      openStation: false,//弹窗开关
      stationAmount: '',
      renewForm: {
        communityId: '',
        customerId: '',
        endDate: '',
        saler: '',
        rentAmount: '',
        items: [],
        signDate: new Date(),
        saleChanceId: ''
      },
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
          { required: true, type: 'date', message: '此项不可为空', trigger: 'change' }
        ],
        signDate: [
          { required: true, type: 'date', message: '此项不可为空', trigger: 'change' }
        ],
      },
      stationListData: [],
      selecedStation: [],//table的数据 两个变量存储？？？
      selecedArr: [],//已选择的可续租的工位
      depositAmount: '',
      installmentType: '',
      maxDiscount: {},
      minDiscount: '',
      errorAmount: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                color: '#2b85e4',
                textAlign: 'center',
                cursor: 'pointer',
                textDecoration: 'underline'
              },
              on: {
                click: () => {
                  window.open('/inventory/goods-library/goods-detail?goodsType=' + params.row.seatType + '&id=' + params.row.id || params.row.seatId, '_blank')
                }
              }
            }, params.row.name)
          }
        },
        {
          title: '工位数',
          key: 'capacity',
          align: 'center'
        },
        {
          title: '商品定价',
          align: 'right',
          key: 'guidePrice',
        },
        {
          title: '标准单价（元/月）',
          key: 'guidePrice',
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
                    e = params.row.guidePrice
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
          title: '当前折扣权限',
          key: 'guidePrice',
          align: 'center',
          render: (h, params) => {
            let discount = params.row.rightDiscount;
            if (discount == 10 || !discount) {
              params.row.rightDiscount = 10
              return h('div', '-')
            }
            else {
              return h('div', discount + '折')
            }
          }
        },
        {
          title: '签约折扣',
          key: 'discountNum',
          align: 'center',
          render: (h, params) => {
            let discount = 10;
            let disabled = false
            if (params.row.rightDiscount === 10) {
              disabled = true
            }
            if (params.row.discountNum && params.row.discountNum < params.row.rightDiscount) {
              disabled = true
            }
            if (params.row.discountNum && params.row.discountNum === 10) {
              params.row.discountNum = ''
              // disabled=true
            }
            return h('Input', {
              props: {
                min: params.row.rightDiscount,
                value: params.row.discountNum,
                disabled: disabled,
              },
              on: {
                'on-change': (event) => {
                  let e = event.target.value;
                  if (isNaN(e)) {
                    e = ''
                  }
                  discount = e;
                },
                'on-blur': (event) => {
                  if (discount === '') {
                    discount = 10
                  }
                  var pattern = /^[0-9]+(.[0-9]{1,3})?$/;
                  if (discount && !pattern.test(discount)) {
                    this.$Notice.error({
                      title: '单价不得多余小数点后三位'
                    })
                    var num2 = Number(discount).toFixed(5);
                    discount = num2.substring(0, num2.lastIndexOf('.') + 4)
                  }
                  if (discount < params.row.rightDiscount) {
                    discount = params.row.rightDiscount
                    this.$Notice.error({
                      title: '折扣不得小于' + params.row.rightDiscount
                    })
                  }
                  this.changeDiscount(params.index, discount)
                }
              }
            }, params.row.discountNum)
          }
        },
        {
          title: '签约月费',
          key: 'discountedPrice',
          align: 'right',
        },
        {
          title: '租赁期限',
          key: 'address',
          render: (h, params) => {
            return h('strong', dateUtils.dateToStr("YYYY-MM-dd", new Date(params.row.start)) + '至' + dateUtils.dateToStr("YYYY-MM-dd", new Date(params.row.end)))
          }
        },
        {
          title: '服务费小计',
          key: 'amount',
          align: 'right',
          render(h, params) {
            return h('span', {}, utils.thousand(params.row.amount))
          }
        },
        {
          title: '操作',
          key: 'guidePrice',
          align: 'center',
          render: (h, params) => {
            let price = params.row.originalPrice;
            return h('div', {
              props: {
                min: params.row.guidePrice,
                value: params.row.originalPrice,
              },
              style: {
                color: 'rgb(43, 133, 228)',
                textAlign: 'center',
                cursor: 'pointer'
              },
              on: {
                'click': () => {
                  console.log('删除商品明细行', params.row._index)
                  this.deleteStationByIndex(params.row._index)
                },
              }
            }, '删除')

          }
        },
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
      ssoId: '',
      ssoName: '',
      salerName: '请选择',
      saleAmount: 0,
      saleAmounts: utils.smalltoBIG(0),
      change: {},
      showSaleDiv: true,
      openPrice: false,
      price: '',
      priceError: false,
      openDiscount: false,
      batchDiscount: '',
      batchDiscountError: '',

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
    SelectChance,
    LabelText,
    AddManager
  },
  mounted() {
    GLOBALSIDESWITCH("false");
    this.getFreeDeposit();
  },
  watch: {
    getStationFn() {
      if (this.renewForm.customerId && this.renewForm.communityId && this.renewForm.endDate) {
        this.getRenewStation()
      }
      if (this.renewForm.customerId && this.renewForm.communityId) {
        this.getSignUser()
      }
      if (this.renewForm.communityId) {
        this.getSaleTactics({ communityId: this.renewForm.communityId })
      }
    },
  },
  methods: {
    //苏岭增加客户主管理员开始
    addManagerSubmit(params) {
      this.submitManager && this.submitManager(this.managerSubmit);
    },
    managerSubmit() {
      let Params = Object.assign({}, this.formData);
      Params.customerId = this.renewForm.customerId;
      Params.communityId = this.renewForm.communityId;
      var _this = this;
      this.$http.post('store-change-manager', Params).then((res) => {
        this.isAddManager = false;
        this.managerId = res.data.managerId;
        this.customerInfo = Object.assign({}, this.formData);
        this.isAddEdit = true;
        this.$Notice.success({
          title: '变更管理员成功'
        });
      }).catch((err) => {
        this.$Notice.error({
          title: err.message
        });
      })
    },
    addEditOpen() {
      this.manageTitle = this.isAddEdit ? '主管理员变更' : '主管理员添加';
      this.isAddManager = !this.isAddManager;
    },
    getformData(form) {
      this.formData = form;
    },
    getFunction(form) {
      this.submitManager = form;
    },
    validIsManager() {
      this.isManager = this.renewForm.customerId && this.renewForm.communityId;
      if (!this.isManager) {
        return;
      }
      let params = {};
      params.customerId = this.renewForm.customerId;
      params.communityId = this.renewForm.communityId;
      var _this = this;
      this.$http.get('order-search-manager', params).then((res) => {
        this.isAddEdit = res.data.hasChiefManager;
        this.customerInfo = Object.assign({}, res.data);
        this.managerId = res.data.managerId ? res.data.managerId : '';
      }).catch((err) => {
        this.$Notice.error({
          title: err.message
        });
      })
    },
    //苏岭增加客户主管理员结束
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
      debugger
      stationVos = stationVos.filter(function (item, index) {
        if (selectedStation.indexOf(item.seatId) != -1) {
          return true;
        }
        return false;
      });
      let sortStationVos = [].concat(stationVos)
      sortStationVos.sort((s1, s2) => { return s2.guidePrice - s1.guidePrice })
      let maxPrice = sortStationVos[0].guidePrice;
      if (maxPrice > this.price) {
        // this.priceError = '工位单价不得小于' + maxPrice
        this.priceError = '部分或全部商品标准月费低于定价'
      } else {
        this.priceError = '';
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

    changePrice(index, e) {
      console.log(this.selecedArr, "nnnnnnn", index)
      this.selecedArr[index].originalPrice = e;
      this.getStationAmount()
    },

    changeDiscount(index, e, guidePrice) {
      if (!e || e == 10) {
        // return
      }
      this.selecedStation[index].discountNum = Number(e);
      this.selecedArr[index].discountNum = Number(e);
      this.getSaleAmount()
    },

    //批量录入价格 对于勾选的行
    openDiscountButton() {
      let stationVos = this.selecedStation;
      //选中的工位
      let selectedStation = this.selectedDel;

      if (!selectedStation.length) {
        this.$Notice.error({
          title: '请先选择录入折扣的工位'
        })
        return;
      }
      this.openDiscount = true
    },

    submitDiscount() {
      let errorStr = ''
      let stationVos = this.selecedStation;
      var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
      if (!pattern.test(this.batchDiscount)) {
        errorStr = '工位折扣不得多于三位小数'
      }
      // 选中的工位selectedDel
      let selectedStation = this.selectedDel;
      stationVos = stationVos.filter(function (item, index) {
        if (selectedStation.indexOf(item.seatId) != -1) {
          return true;
        }
        return false;
      });
      let sortStationVos = [].concat(stationVos)
      sortStationVos.sort((s1, s2) => { return s2.rightDiscount - s1.rightDiscount })
      let maxPrice = sortStationVos[0].rightDiscount;
      if (maxPrice > this.batchDiscount) {
        // this.priceError = '工位单价不得小于' + maxPrice
        this.batchDiscountError = '部分或全部商品没有此权限'
      } else {
        this.batchDiscountError = '';
        this.openDiscount = !this.openDiscount;
        this.selecedStation = this.selecedStation.map((item) => {
          if (selectedStation.indexOf(item.seatId) != -1) {
            item.discountNum = Number(this.batchDiscount);
          }

          return item
        })
        this.selectedDel = [];
        this.getSaleAmount() //价格变动后需要重新计算工位费用
      }
    },

    getSignUser() {
      let params = {
        communityId: this.renewForm.communityId,
        customerId: this.renewForm.customerId
      }
      let _this = this;
      this.$http.get('get-community-floor', params, r => {
        _this.ssoId = r.data.ssoId;
        _this.ssoName = r.data.ssoName;
        if (!_this.renewForm.salerId) {
          _this.renewForm.salerId = JSON.stringify(r.data.ssoId);
          _this.salerName = r.data.ssoName
          _this.validSaleChance();
        }

      }, e => {

        console.log('error', e)
      })
    },
    config() {
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

      let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", utils.dateParse(this.renewForm.start));
      let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.endDate));
      let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.signDate));
      let renewForm = {}

      let complete = this.dealSaleInfo(true)
      if (complete == 'complete') {
        return;
      }
      //处理已删除的数据
      let saleList = this.renewForm.items.filter(item => {
        if (!item.show) {
          return false;
        }
        return true;
      })
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
      renewForm.installmentType = this.installmentType;
      renewForm.deposit = this.depositAmount;
      renewForm.saleList = JSON.stringify(saleList);
      renewForm.seats = JSON.stringify(this.selecedStation);
      renewForm.customerId = this.renewForm.customerId;
      renewForm.communityId = this.renewForm.communityId;
      renewForm.salerId = this.renewForm.salerId;
      renewForm.opportunityId = this.renewForm.saleChanceId;//销售机会ID
      renewForm.rentAmount = this.renewForm.rentAmount;
      renewForm.signDate = signDate;
      renewForm.firstPayTime = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.renewForm.firstPayTime);

      renewForm.startDate = start;
      renewForm.endDate = end;
      let _this = this;
      this.disabled = true;
      renewForm.discountReason = this.renewForm.discountReason
      //苏岭开始
      renewForm.managerId = this.managerId;
      //苏岭结束
      this.$http.post('save-renew', renewForm).then(r => {
        window.location.href = '/order-center/order-manage/station-order-manage/' + r.data.orderSeatId + '/renewView';
        // 欢哥让删掉列表刷新
        // window.opener.location.href=window.opener.location.href;  
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
    handleSubmit(name) {
      let message = '请填写完整表单';
      this.config()
      let _this = this;

      if (!this.installmentType) {
        this.errorPayType = true
      }
      if (!this.depositAmount) {
        this.errorAmount = true
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
          if (this.errorAmount || this.errorPayType) {
            this.$Notice.error({
              title: '请填写完整表单'
            });
            _this.disabled = false;
            return;
          }
          this.disabled = true;
          this.renewFormSubmit()
        } else {
          _this.disabled = false;

          this.$Notice.error({
            title: message
          });
        }
      })
    },
    //获取选择工位
    getRenewStation() {
      let params = {
        //假数据
        customerId: this.renewForm.customerId,
        communityId: this.renewForm.communityId,
        continueDate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(this.renewForm.endDate)),
        id: null
      };
      let _this = this;

      this.$http.get('get-renew-station', params, r => {
        let station = []
        for (let i in r.data) {
          let obj = {};
          obj.name = dateUtils.dateToStr("YYYY-MM-dd", new Date(i));

          obj.value = r.data[i].map(item => {
            let obj = item;
            obj.oldPrice = obj.originalPrice;
            //毅豪修改
            if (!obj.originalPrice) {
              obj.originalPrice = item.guidePrice == 0 ? '' : item.guidePrice;
            }

            return obj;
          });

          station.push(obj)
        }
        _this.stationListData = station;


      }, e => {

        console.log('error', e)
      })

    },
    changeCustomer(value) {

      if (value) {
        this.renewForm.customerId = value;

        this.getStationFn = +new Date()
        this.clearStation()
      } else {
        this.renewForm.customerId = '';
      }

      this.validSaleChance();
      //苏岭
      this.validIsManager();


    },
    changeCommunity(value) {
      if (value) {
        this.renewForm.communityId = value;
        this.getStationFn = +new Date()
      } else {
        this.renewForm.communityId = '';
      }
      this.validSaleChance();
      this.clearStation()
      //苏岭
      this.validIsManager();
    },
    changeChance(value) {

      if (!value || value === 0 || value == -1) {
        this.renewForm.saleChanceId = '';
      } else {
        this.renewForm.saleChanceId = value;
      }

    },
    handleGotChancelist(parms) {
      // return ;
      if (parms.isNewUser) {
        this.remindinfo = false
        if (parms.count == 1) {
          this.remindinfoNewUser = false
          this.chanceRemindStr = '';
          this.showChanceSelector = true;
          // this.defaultChanceID = parms.list[1].value
          // this.$set(this.orderitems, 'saleChanceId', parms.list[1].value)
        }
        else if (parms.count > 1) {
          this.remindinfoNewUser = false
          this.chanceRemindStr = '';
          this.showChanceSelector = true;
        }
        else if (parms.count == 0) {
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
          this.defaultChanceID = ''
        }
      }
    },
    validSaleChance() {
      this.showSaleChance = this.renewForm.salerId && this.renewForm.customerId && this.renewForm.communityId;
      let obj = {};
      obj.customerId = this.renewForm.customerId;
      obj.communityId = this.renewForm.communityId;
      obj.salerId = this.renewForm.salerId;
      this.orderitems = Object.assign({}, obj);
    },
    clearStation() {
      // 清除所选的工位

      if (this.selecedStation.length) {
        console.log('this.selecedStation', this.selecedStation, "lllll")
        this.selecedStation = [];
        this.selecedArr = [];

      }
      if (this.renewForm.items.length) {
        this.renewForm.items = [];
        this.saleAmount = 0;
        this.saleAmounts = utils.smalltoBIG(0)
      }
      if (this.discountError) {
        this.discountError = false;
        this.disabled = false

      }
      this.renewForm.rentAmount = '0'

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
    changeTime(value) {
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
    changeTimeStatus(value) {
      this.clearStation()
      if (!value) {
        this.renewForm.endDate = '';
        return;

      }
      // value = this.dealEndDate(value);
      this.renewForm.endDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00", new Date(value));

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
    changeSaler(value) {
      this.renewForm.salerId = value;
      this.validSaleChance();
    },
    showStation() {
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
    selectDeposit(value) {
      this.depositAmount = value;
      this.errorAmount = false;

    },
    selectPayType(value) {
      this.installmentType = value;
      this.errorPayType = false;
    },

    deleteStationByIndex(index) {
      this.selecedStation.splice(index, 1)
      this.selecedArr = this.selecedStation
      this.getStationAmount(this.selecedStation);
    },
    deleteStation() {
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
      console.log('stationVos', stationVos)
      this.getStationAmount()

    },
    selectRow(val) {
      let selectionList = [];
      selectionList = val.map((item) => {
        return item.seatId
      })
      this.selectedDel = selectionList;
    },
    submitStation() {

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
      console.log('submitStation', this.selecedArr)
      var date = val[0].begin;
      date = new Date(date).getTime();

      let day = 1000 * 60 * 60 * 24;
      let start = date + day;
      this.renewForm.start = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(start));

      this.getStationAmount()
      this.selecedStation = [];
      // this.clearStation()

    },
 
    getStationAmount() {

      let val = [].concat(this.selecedArr);
      let _this = this;
      this.config()
      //工位原始结束日期，续租开始日期前一天
      let startDate = '';
      let originalPrice = false;

      let station = val.map(item => {
        let obj = item;
        obj.guidePrice = item.guidePrice || 0;
        if (item.originalPrice === '') {
          originalPrice = true;
        }
        obj.seatId = item.seatId;
        startDate = obj.endDate;
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

      this.selecedStation = [].concat(station)

      if (originalPrice) {
        return
      }

      if (val.length) {

        this.$http.post('get-station-amount', params, r => {
          let money = 0;
          let list = [];
          _this.selecedStation = r.data.seats.map(item => {
            let obj = item;
            money += item.amount;
            //TODO
            obj.guidePrice = item.guidePrice || 0;
            obj.start = item.startDate
            obj.end = item.endDate
            obj.rightDiscount = item.rightDiscount
            return obj;
          })
          _this.disabled = false;
          _this.selectedDel = [];
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


        })
      }
    },
    cancelStation() {
      this.selecedStation = this.selecedStation.map(item => {
        let obj = item
        obj.time = +new Date()
        return obj;
      })
      this.openStation = false;
    },
    onStationChange(val) {

      this.selecedArr = [].concat(val);
      console.log(this.selecedArr, "pppppp")
    },
    getSaleTactics(params) {//获取优惠信息
      let list = [];
      let maxDiscount = {};
      let _this = this;
      this.$http.get('sale-tactics', params, r => {
        if (r.data.length) {
          list = r.data.map(item => {
            let obj = item;
            obj.label = item.tacticsName;
            obj.value = item.tacticsType + '';
            obj.name = item.tacticsName
            obj.id = item.tacticsId;
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
        if (item.tacticsType == '1' && this.discount) {
          item.discount = this.discount
        }
        if (!item.tacticsType) {
          complete = false
        }
        if (item.tacticsType == '3' && (!item.startDate || !item.validEnd)) {
          complete = false

        }
        if (item.tacticsType == '1' && !item.discount) {
          complete = false

        } else {
          zhekou = this.dealzhekou(item.discount || this.discount)
        }
      });
      if (saleList.length) {
        this.showSaleDiv = true
      } else {
        this.showSaleDiv = false
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
        leaseBegindate: this.renewForm.start,
        leaseEnddate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.renewForm.endDate),
        seats: JSON.stringify(this.selecedStation),
        // saleList: JSON.stringify(list)
      };
      _this.disabled = false;
      _this.discountError = false;
      this.$http.post('count-sale', params, r => {
        let money = 0;
        let list = [];
        _this.selecedStation = r.data.seats.map(item => {
          let obj = item;
          money += item.amount;
          //TODO
          obj.guidePrice = item.guidePrice || 0;
          obj.start = item.startDate
          obj.end = item.endDate
          obj.rightDiscount = item.rightDiscount
          return obj;
        })
        _this.disabled = false;
        _this.selectedDel = [];
        _this.renewForm.rentAmount = Math.round(money * 100) / 100;
        _this.renewForm.stationAmount = Math.round(money * 100) / 100;
        _this.stationAmount = utils.smalltoBIG(Math.round(money * 100) / 100)
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
  top: 9px;
  left: 36px;
  font-size: 12px;
  .title-remind-info {
    color: #ed3f14;
  }
}
//苏岭开始
.create-new-order {
  .m-customer-info {
    position: relative;
    .ui-labeltext {
      width: 50%;
      max-width: 450px;
      padding-left: 0;
      height: auto;
      margin-bottom: 0;
      .ui-text {
        margin-bottom: 10px;
      }
      .ui-label {
        font-size: 12px;
        color: #495060;
        font-weight: 400;
      }
    }
    .info-button {
      position: absolute;
      top: -8px;
      right: 414px;
    }
  }
}
//苏岭结束
</style>
