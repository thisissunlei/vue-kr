<template>
    <div class="amount-info-panel">
        <Row style="margin-bottom:10px">
            <Col sapn='24'>
            <Button type="primary"
                style="margin-right:20px;font-size:14px"
                @click="showStation">选择工位</Button>
            <Button type="ghost"
                style="margin-right:20px;font-size:14px"
                @click="deleteStation">删除</Button>
            <Button type="primary"
                style="margin-right:20px;font-size:14px"
                @click="openPriceButton">批量填写价格</Button>
            <Button type="primary"
                style="margin-right:20px;font-size:14px"
                @click="openDiscountButton">批量填写折扣</Button>
            </Col>

        </Row>
        <Row style="margin-bottom:10px">
            <Col sapn="24">
            <Table border
                ref="selection"
                :columns="columns4"
                :data.sync="stationList"
                @on-selection-change="selectRow"></Table>
            <div class="total-money"
                v-if="stationList.length">
                <div class="left"> <span>折扣原因：</span><Input style="width:400px"
                        :maxlength="200"
                        v-model="discountReason"></Input></div>
                <div class="right"> <span>服务费总计</span>
                    <span class="money">{{stationAmount | thousand}} </span>
                    <span class="money">{{stationAmount| amountInWords}}</span></div>
            </div>
            </Col>
        </Row>
        <Modal v-model="openStation"
            title="选择工位"
            ok-text="保存"
            cancel-text="取消"
            width="90%"
            class-name="vertical-center-modal">
            <ListAndMap :params.sync="params"
                :floors.sync="floors"
                :stationData.sync="stationData"
                @on-result-change="onResultChange"
                v-if="openStation" />
            <div slot="footer">
                <Button type="primary"
                    @click="submitStation">确定</Button>
            </div>
        </Modal>

        <Modal v-model="openPrice"
            title="批量填写价格"
            ok-text="保存"
            cancel-text="取消"
            class-name="vertical-center-modal">
            <div v-if="openPrice">
                <span style="display:inline-block;height:32px;line-height:32px"> 标准月费： </span>
                <Input v-model="price"
                    placeholder="标准月费"
                    style="width:150px"></Input>
                <span style="display:block;height:32px;line-height:32px;color:red"
                    v-if="priceError">{{priceError}}</span>

            </div>
            <div slot="footer">
                <Button type="primary"
                    @click="submitPrice">批量填写</Button>
                <Button @click="cancelPrice">取消</Button>
            </div>
        </Modal>
        <Modal v-model="openDiscount"
            title="批量填写折扣"
            ok-text="保存"
            cancel-text="取消"
            class-name="vertical-center-modal">
            <div v-if="openDiscount">
                <span style="display:inline-block;height:32px;line-height:32px"> 签约折扣: </span>
                <Input v-model="batchDiscount"
                    placeholder="签约折扣"
                    style="width:150px"></Input>
                <span style="display:block;height:32px;line-height:32px;color:red"
                    v-if="batchDiscountError">{{batchDiscountError}}</span>

            </div>
            <div slot="footer">
                <Button type="primary"
                    @click="submitDiscount">批量填写</Button>
                <Button @click="openDiscount=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ListAndMap from '../../listAndMap';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
    components: {
        ListAndMap
    },
    data() {
        return {
            discountReason: '',//折扣原因
            seatDiscountMap: {},//工位-折扣字典 seatType_seatId:rightDiscount
            openStation: false,
            openPrice: false,
            openDiscount: false,
            price: '',
            batchDiscount: '',
            priceError: '',
            batchDiscountError: '',
            stationAmount: '',
            params: '',
            stationList: [],
            selectedStation: [],
            stationData: {
                submitData: [],
                deleteData: [],
                clearAll: false
            },
            columns4: [
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
                    title: '标准月费',
                    key: 'guidePrice',
                    align: 'center',
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
                                    if (price && !pattern.test(price)) {
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
                        if (params.row.discountNum&&params.row.discountNum===10) {
                            params.row.discountNum=''
                            // disabled=true
                        }
                        return h('Input', {
                            props: {
                                min: params.row.rightDiscount,
                                value: params.row.discountNum,
                                disabled: params.row.rightDiscount === 10,
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
                                    if (discount==='') {
                                        discount=10
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
        }
    },
    computed: {
        ...mapGetters([
            'communityId',
            'customerId',
            'startDate',
            'endDate',
            'floors',
            'seats'
        ])
    },
    watch: {
        //更改客户和社区时需要清空工位
        seats(val) {
            if (val && val.length == 0) {
                this.stationList = [];
                this.selectedStation = []
                this.stationAmount = ''
                this.stationData = {
                    submitData: [],
                    deleteData: [],
                };
            }
        },
        openPrice() {
            this.priceError = ''
            this.price = ''
        },
        openDiscount() {
            this.batchDiscountError = ''
            this.price = ''
        },
        discountReason(val) {
            this.$store.commit('changeDiscountReson', val)
        }
    },
    methods: {
        showStation() {
            if (!this.communityId) {
                this.$Notice.error({
                    title: '请先选择社区'
                });
                return;
            }
            if (!this.customerId) {
                this.$Notice.error({
                    title: '请先选择客户'
                });
                return;
            }
            if (!this.startDate) {
                this.$Notice.error({
                    title: '请先选择开始时间'
                });
                return;
            }
            if (!this.endDate) {
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
                communityId: this.communityId,
                mainBillId: null,
                startDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate)),
                time: +new Date(),
                endDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.endDate))
            }
            this.openStation = true;
            this.params = params;
        },
        selectRow(selection) {
            // 工位表单的全选
            let selectionList = [];
            selectionList = selection.map((item) => {
                return item.seatId
            })
            this.selectedStation = selectionList;
        },
        deleteStation() {
            // 工位表单的删除按钮
            let stationVos = this.stationList;
            let selectedStation = this.selectedStation;
            stationVos = stationVos.filter(function (item, index) {
                if (selectedStation.indexOf(item.seatId) != -1) {
                    return false;
                }
                return true;
            });
            this.stationList = stationVos
            this.$store.commit('changeSeats', this.stationList)
            this.getStationAmount(stationVos);
            this.items = []
        },
        deleteStationByIndex(index) {
            this.stationList.splice(index, 1)
            this.$store.commit('changeSeats', this.stationList)
            this.getStationAmount(this.stationList);
        },
        //批量录入价格 对于勾选的行
        submitPrice() {
            let errorStr = ''
            let stationVos = this.stationList;
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (!pattern.test(this.price)) {
                errorStr = '工位单价不得多于三位小数'
            }
            // 选中的工位
            let selectedStation = this.selectedStation;
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
            }

            else {
                this.priceError = '';
                this.openPrice = !this.openPrice;
                this.stationList = this.stationList.map((item) => {
                    if (selectedStation.indexOf(item.seatId) != -1) {
                        item.originalPrice = Number(this.price);
                    }
                    return item
                })
                this.selectedStation = [];
                this.getStationAmount() //价格变动后需要重新计算工位费用
            }
        },
        cancelPrice() {
            this.openPrice = !this.openPrice;
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

        submitDiscount() {
            let errorStr = ''
            let stationVos = this.stationList;
            var pattern = /^[0-9]+(.[0-9]{1,2})?$/;
            if (!pattern.test(this.batchDiscount)) {
                errorStr = '工位折扣不得多于三位小数'
            }
            // 选中的工位
            let selectedStation = this.selectedStation;
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
                // this.batchDiscountError = '工位折扣不得小于' + maxPrice
                this.batchDiscountError = '部分或全部商品没有此权限'
            }

            else {
                this.batchDiscountError = '';
                this.openDiscount = !this.openDiscount;
                this.stationList = this.stationList.map((item) => {
                    if (selectedStation.indexOf(item.seatId) != -1) {
                        item.discountNum = Number(this.batchDiscount);
                    }
                    return item
                })
                this.selectedStation = [];
                this.getSaleAmount() //价格变动后需要重新计算工位费用
            }
        },
        //批量录入价格 对于勾选的行
        openDiscountButton() {
            let stationVos = this.stationList;
            //选中的工位
            let selectedStation = this.selectedStation;
            if (!selectedStation.length) {
                this.$Notice.error({
                    title: '请先选择录入单价的工位'
                })
                return;
            }
            this.openDiscount = true
        },

        changePrice(index, e, guidePrice) {
            this.stationList[index].originalPrice = e;
            this.getStationAmount()
        },
        changeDiscount(index, e, guidePrice) {
            if (!e || e == 10) {
                // this.stationList[index].discountNum
                // return
            }
            this.stationList[index].discountNum = Number(e);
            this.getSaleAmount()
        },
        submitStation() {//工位弹窗的提交
            this.stationList = this.stationData.submitData || [];
            this.delStation = this.stationData.deleteData || [];
            this.getStationAmount()
            this.openStation = false;
            this.clearSale()
        },
        clearSale() {
            this.items = [];
            this.saleAmounts = utils.smalltoBIG(0);
            this.saleAmount = 0;
        },
        onResultChange(val) {//组件互通数据的触发事件
            this.stationData = val;

        },
        cancelStation() {//工位弹窗的取消
            this.stationData = {
                submitData: this.stationList,
                deleteData: [],
            };
            this.openStation = false
        },
        getStationAmount(list) {

            //判断标准单价是否有值，若无值，则不提交计算总价
            let originalPrice = false;
            let val = list || this.stationList;
            if (this.stationList.length === 0) {
                return
            }
            let station = val.map(item => {
                let obj = item;
                obj.guidePrice = item.guidePrice || item.seatPrice || 0;

                obj.originalPrice = (!item.originalPrice && item.originalPrice !== 0 && obj.guidePrice == 0) ? '' : (item.originalPrice || obj.guidePrice);

                obj.seatId = item.id || item.seatId;
                obj.floor = item.whereFloor || item.floor;
                obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.endDate));
                obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate));
                if (item.originalPrice === '') {
                    originalPrice = true;
                }
                return obj;
            })
            if (originalPrice) {
                return
            }
            let params = {
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.endDate)),
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate)),
                communityId: this.communityId,
                seats: JSON.stringify(station)
            }
            this.$http.post('get-station-amount', params).then(r => {
                this.stationList = r.data.seats.map(item => {
                    let obj = item;
                    //TODO 周一联调删除
                    obj.guidePrice = item.guidePrice;
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(item.startDate))
                    obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(item.endDate))
                    obj.belongType = item.seatType;
                    obj.rightDiscount = item.rightDiscount
                    return obj;
                });
                this.stationData.submitData = this.stationList
                this.$store.commit('changeSeats', this.stationList)
                this.rentAmount = r.data.totalrent;
                this.$store.commit('changeRentAmount', r.data.totalrent)
                this.stationAmount = r.data.totalrent;
                this.selectedStation = []
                if (this.showSaleDiv) {
                    this.dealSaleInfo(false)
                }
            }).catch(e => {
                this.$Notice.error({
                    title: e.message
                })

            })
        },

        getSaleAmount() {
            let params = {
                communityId: this.communityId,
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.endDate)),
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date(this.startDate)),
                seats: JSON.stringify(this.stationList),
                // saleList: JSON.stringify(list)
            };
            this.disabled = false;
            this.$http.post('count-sale', params, r => {
                this.stationList = r.data.seats;
                let money = r.data.discountAmount;
                this.saleAmount = Math.round(money * 100) / 100;
                // this.saleAmounts = utils.smalltoBIG(Math.round(money * 100) / 100);
                this.stationAmount = r.data.totalrent;
                this.discountErrorStr = ''
                this.$store.commit('changeSeats', this.stationList)
                // this.$store.commit('changeRentAmountSale', r.data.totalrent)
            }, e => {
                if (this.stationList.length) {
                    this.disabled = true;
                    this.discountErrorStr = e.message;
                    this.$Notice.error({
                        title: e.message
                    })
                }
            })

        },
    },
}
</script>

<style lang="less">
.amount-info-panel {
 .total-money {
  .left {
   float: left;
   text-align: left;
   padding-left: 10px;
   width: 500px;
  }
  .right {
   float: right;
  }
 }
}
</style>
