

<template>
    <div class="perferential-info-panel">
        <Row style="margin-bottom:10px">
            <Col class="col">
            <Button type="primary"
                style="margin-right:20px;font-size:14px"
                @click="handleAdd">添加</Button>
            <Button type="ghost"
                style="font-size:14px"
                @click="deleteDiscount">删除</Button>

            <span class="pay-error"
                v-show="discountError">{{discountError}}</span>
            </Col>

        </Row>
        <Row>
            <Col span="3"
                class="discount-table-head">
            <Checkbox v-model="selectAll"
                @on-change="selectDiscount"></Checkbox>
            </Col>
            <Col span="6"
                class="discount-table-head">
            <span> 优惠类型</span>
            </Col>
            <Col span="5"
                class="discount-table-head">
            <span>开始时间</span>
            </Col>
            <Col span="5"
                class="discount-table-head">
            <span>结束时间</span>

            </Col>
            <Col span="5"
                class="discount-table-head">
            <span>折扣</span>
            </Col>
        </Row>
        <div v-for="(item, index) in formItem.items"
            :key="index"
            style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none">
            <Row v-show="item.show">
                <Col span="3"
                    class="discount-table-content"
                    style="padding:0">
                <Checkbox v-model="item.select"></Checkbox>
                </Col>
                <Col span="6"
                    class="discount-table-content">
                <Select v-model="item.type"
                    label-in-value
                    @on-change="changeType">
                    <Option v-for="(types,i) in youhui"
                        :value="types.value+'/'+index+'/'+types.name+'/'+types.id"
                        :key="types.value+index+types.name+types.id">{{ types.label }}</Option>
                </Select>
                </Col>
                <Col span="5"
                    class="discount-table-content">
                <DatePicker type="date"
                    v-show="item.tacticsType != '3'"
                    placeholder="开始时间"
                    v-model="item.validStart"
                    disabled></DatePicker>
                <DatePicker type="date"
                    v-show="item.tacticsType == '3'"
                    placeholder="开始时间"
                    v-model="item.startDate"
                    @on-change="changeSaleTime"></DatePicker>
                </Col>
                <Col span="5"
                    class="discount-table-content">
                <DatePicker type="date"
                    placeholder="开始时间"
                    v-model="item.validEnd"
                    disabled></DatePicker>
                </Col>
                <Col span="5"
                    class="discount-table-content">
                <Input v-model="item.discount"
                    placeholder="折扣"
                    @on-blur="changezhekou"
                    v-if="item.tacticsType == '1'"
                    :number="inputNumberType"></Input>
                <!-- <InputNumber v-model="item.discount" placeholder="折扣" v-if="item.tacticsType == '1'" :max="maxDiscount" :min="1" :step="1.2" @on-change="changezhekou"></InputNumber> -->
                <Input v-model="item.zhekou"
                    v-if="item.tacticsType !== '1'"
                    disabled></Input>
                </Col>
            </Row>
        </div>
        <Row style="margin-bottom:10px">
            <Col sapn="24">
            <div class="total-money"
                v-if="formItem.items.length && showSaleDiv">
                <span>优惠金额总计</span>
                <span class="money">{{saleAmount | thousand}} </span>
                <span class="money">{{saleAmount|amountInWords}}</span>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';


export default {
    components: {

    },
    data() {
        return {
            youhui: [],//当前登陆人在当前社区拥有的折扣和免租项 优惠=》youhui 拼音？？？！！！
            formItem: { items: [] },//所添加的优惠项 只提交show=true的
            discountError: false,
            selectAll: false,
            inputNumberType: true,
            showSaleDiv: true,
            saleAmount: 0,
            stationList: [],
        }
    },
    computed: {
        ...mapGetters([
            // 'stationList',
            'communityId',
            'startDate',
            'endDate',
            'seats',
        ])
    },
    watch: {
        communityId(val) {
            if (val) {
                this.getSaleTactics({ communityId: val })
            }
        },
        seats(val) {
            this.stationList = [].concat(this.seats)
            if (this.stationList.length == 0) {
                this.formItem = Object.assign({}, { items: [] }, { rentAmount: 0 })             
            } 
            this.dealSaleInfo(true)
        },
    },
    mounted() {
        this.stationList = [].concat(this.seats)
    },
    methods: {
        //社区切换时重新获取当前登陆人拥有的优惠项
        getSaleTactics(params) {
            let list = [];
            let maxDiscount = {};
            this.$http.get('sale-tactics', params, r => {
                if (r.data.length) {
                    list = r.data.map(item => {
                        let obj = item;
                        obj.label = item.tacticsName;
                        obj.value = item.tacticsType + '';
                        obj.id = item.tacticsId;
                        obj.name = item.tacticsName;
                        obj.rightType = item.rightType;
                        if (item.tacticsType == 1) {//1 折扣 3免租
                            maxDiscount[item.tacticsName] = obj.discount;
                        }
                        return obj;
                    })
                } else {
                    list = []
                }
                this.youhui = list;
                this.$store.commit('changeYouhui', list)
                this.maxDiscount = maxDiscount;

            }, e => {
                this.youhui = [];
            })
        },
        handleAdd() {
            // 优惠信息的添加按钮
            this.showSaleDiv = true;
            if (!this.stationList.length) {
                this.$Notice.error({
                    title: '请先选择工位'
                });
                return;
            }
            if (this.formItem.items.length == this.youhui.length) {
                this.$Notice.warning({
                    title: `最多只能添加${this.youhui.length}条`
                })
                return
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
        deleteDiscount: function () {
            // 删除选中的优惠信息

            let items = this.formItem.items;
            let select = []
            select = items.map((item) => {
                return item.selelct;
            })
            // items = items.map(function (item, index) {
            //     if (item.select) {
            //         item.show = false
            //     }
            //     return item;
            // });
            items = items.filter(function (item, index) {
                return !item.select
            });
            this.formItem.items = items;
            this.discount = ''
            this.selectDiscount(false);
            this.dealSaleInfo(true)

        },
        //切换优惠全选/全不选
        selectDiscount(value) {
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
        //切换优惠全选/全不选

        changeSaleTime(val) {
            let _this = this;
            setTimeout(function () {
                _this.dealSaleInfo(true)
            }, 200)
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
        changeType(val) {
            //优惠类型选择
            if (!val || !val.value) {
                return;
            }
            let label = val.label;
            let value = val.value
            let itemValue = value.split('/')[0];
            let itemIndex = value.split('/')[1];
            let itemName = value.split('/')[2]
            let itemId = value.split('/')[3]
            console.log('itemIndex', itemIndex)
            this.formItem.items[itemIndex].tacticsType = itemValue;
            this.formItem.items[itemIndex].tacticsName = itemName;
            this.formItem.items[itemIndex].tacticsId = itemId;
            let items = [];
            let _this = this
            items = this.formItem.items.map((item) => {
                let obj = _this.youhui.find(y => y.id == item.tacticsId)
                if (obj) {
                    item.rightType = obj.rightType;
                }
                else {
                    // item.show=false
                }
                if (item.value == 'qianmian') {
                    item.validStart = this.formItem.startDate;
                    item.discount = '';
                } else if (item.tacticsType == 3 && item.show) {
                    item.validStart = item.startDate || ''
                    item.validEnd = this.endDate
                    item.tacticsId = item.tacticsId || itemId;
                    item.discount = '';
                } else if (item.tacticsType == 1 && item.show) {
                    item.validStart = this.startDate
                    item.tacticsId = item.tacticsId || itemId
                    item.discount = item.discount || ''
                    item.validEnd = this.endDate;
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
        //计算优惠信息
        //show? 是否显示错误消息提示
        dealSaleInfo(show) {
            //处理已删除的数据
            let saleList = this.formItem.items.filter(item => {
                if (!item.show) {
                    return false;
                }
                return true;
            })
            //检查手否有未填写完整的折扣项
            let complete = true;
            let zhekou = true;//是否是折扣
            saleList.map(item => {//1 折扣  3免租
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
                obj.rightType = item.rightType;
                return obj;
            })
            this.$store.commit('changeSaleList', saleList)
            this.getSaleAmount(saleList);
            // return complete;
        },
        //计算优惠信息

        //提交给后端计算优惠后的金额        
        getSaleAmount(list) {
            let params = {
                communityId: this.communityId,
                leaseBegindate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.startDate),
                leaseEnddate: dateUtils.dateToStr("YYYY-MM-dd 00:00:00", this.endDate),
                seats: JSON.stringify(this.stationList),
                saleList: JSON.stringify(list)
            };
            this.disabled = false;
            this.discountError = false;
            this.$http.post('count-sale', params, r => {

                this.stationList = r.data.seats;
                let money = r.data.discountAmount;
                this.saleAmount = Math.round(money * 100) / 100;
                // this.saleAmounts = utils.smalltoBIG(Math.round(money * 100) / 100);
                this.formItem.rentAmount = r.data.totalrent;
                this.$store.commit('changeRentAmountSale', r.data.totalrent)
            }, e => {
                if (this.stationList.length) {
                    this.disabled = true;
                    this.discountError = e.message;

                    this.$Notice.error({
                        title: e.message
                    })
                }
            })

        },
        //提交给后端计算优惠后的金额   
        clearStation() {
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
    },
}
</script>

<style lang="less">
.perferential-info-panel {
}
</style>
