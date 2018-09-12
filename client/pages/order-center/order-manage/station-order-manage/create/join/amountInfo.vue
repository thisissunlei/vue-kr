<template>
    <div class="amount-info-panel">
        <Row style="margin-bottom:10px">
            <Col class="col">
            <Button type="primary"
                style="margin-right:20px;font-size:14px"
                @click="showStation">选择工位</Button>
            <Button type="ghost"
                style="margin-right:20px;font-size:14px"
                @click="deleteStation">删除</Button>
            <Button type="primary"
                style="font-size:14px"
                @click="openPriceButton">录入单价</Button>
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
                <span>服务费总计</span>
                <span class="money">{{stationAmount | thousand}} </span>
                <span class="money">{{formatAmount2BIG(stationAmount)}}</span>
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
            title="填写单价"
            ok-text="保存"
            cancel-text="取消"
            class-name="vertical-center-modal">
            <div v-if="openPrice">
                <span style="display:inline-block;height:32px;line-height:32px"> 工位单价： </span>
                <Input v-model="price"
                    placeholder="工位单价"
                    style="width:150px"></Input>
                <span style="display:block;height:32px;line-height:32px;color:red"
                    v-if="priceError">{{priceError}}</span>

            </div>
            <div slot="footer">
                <Button type="primary"
                    @click="submitPrice">确定</Button>
                <Button @click="cancelPrice">取消</Button>
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
            openStation: false,
            openPrice: false,
            stationAmount: '',
            params: '',
            stationList: [],
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
                    title: '租赁期限',
                    key: 'address',
                    render: (h, params) => {
                        return h('strong', dateUtils.dateToStr("YYYY-MM-DD", new Date(this.startDate)) + '至' + dateUtils.dateToStr("YYYY-MM-DD", new Date(this.endDate)))
                    }
                },
                {
                    title: '小计',
                    key: 'originalAmount',
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.originalAmount))
                    }
                },

                {
                    title: '租赁期限',
                    key: 'address',
                    render: (h, params) => {
                        return h('strong', dateUtils.dateToStr("YYYY-MM-DD", new Date(this.startDate)) + '至' + dateUtils.dateToStr("YYYY-MM-DD", new Date(this.endDate)))
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
        }
    },
    computed: {
        ...mapGetters([
            'communityId',
            'customerId',
            'startDate',
            'endDate',
            'floors'
        ])
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
        selectRow: function (selection) {
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
            this.getStationAmount(stationVos);
            this.items = []
        },
        //批量录入价格 对于勾选的行
        submitPrice() {
            let price = false;
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
                        item.originalPrice = Number(this.price);
                    }

                    return item
                })
                this.selectedStation = [];
                this.getStationAmount() //价格变动后需要重新计算工位费用
            }
        },
        //批量录入价格 对于勾选的行

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
        submitStation: function () {//工位弹窗的提交
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
        getStationAmount(list) {
            //判断标准单价是否有值，若无值，则不提交计算总价
            let originalPrice = false;
            let val = list || this.stationList;
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
                    return obj;
                });
                this.stationData.submitData = this.stationList
                this.rentAmount = r.data.totalrent;
                this.stationAmount = r.data.totalrent;
                // this.stationAmount = utils.smalltoBIG(r.data.totalrent)
                this.selectedStation = []
                if (this.showSaleDiv) {
                    this.dealSaleInfo(false)
                }
                console.log('this.stationAmount',this.stationAmount,this);
                
            }).catch(e => {
                this.$Notice.error({
                    title: e.message
                })

            })
        },
        formatAmount2BIG(amount){
            return utils.smalltoBIG(amount)
        }
    },
}
</script>

<style lang="less">
.amount-info-panel {
}
</style>
