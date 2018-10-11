<template>
    <div class="list-and-map-list">
        <div class="search-from-panel">
            <SearchForm :communityId="communityId"
                @searchClick="searchClick"
                @clearClick="clearClick"
                @initData="initData"
                @getFloor="getFloor"
                @cityFloor="cityFloor" />
        </div>
        <div class="table-list"
            :style="{height:(page.height-300)+'px'}">
            <Table ref="selectionGoodsLibrary"
                border
                :loading="loading"
                stripe
                :columns="attractColumns"
                :data="attractData"
                @on-selection-change="tableChange">
            </Table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '~/components/Loading';
import dateUtils from 'vue-dateutils';
import SearchForm from './search-form.vue';
export default {
    components: {
        SearchForm
    },
    props: {
        floors: {
            type: Array,
            default: () => []
        },
        originStationList: {
            type: Array,
            default: () => []
        },
        params: {
            type: Object,
            default: () => { }
        },
        stationData: {
            type: Array,
            default: () => []
        },
        communityId: {
            type: String,
            default: ''
        },
        addFlag: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            floorList: [],
            floorStr: '',
            tabForms: {
                page: 1,
                pageSize: 100
            },
            formItem: {
                page: 1,
                pageSize: 100,
                floor: ' ',
                goodsType: ' ',
                locationType: ' ',
                suiteType: ' '
            },
            attractColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'name',
                    align: 'center',
                    render: (h, params) => {
                        var ile = params.row.name;
                        var nes = params.row.duplicateNo;
                        var btnRender = [];
                        if (params.row.duplicateNo == 0) {
                            btnRender = [
                                h('p', {
                                }, ile),
                            ];
                        } else {
                            btnRender.push(
                                h('p', {

                                }, ile),
                                h('span', {
                                    style: {
                                        color: 'black'
                                    }
                                }, '('),
                                h('span', {
                                    style: {
                                        color: '#FF6868'
                                    }
                                }, '有重复 '),
                                h('span', {
                                    style: {
                                        color: 'black'
                                    }
                                }, ' 编号' + nes + ')'),
                            )
                        }
                        return h('div', {
                            style: {
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    this.goDetail(params.row)
                                }
                            }
                        }, btnRender)

                    }
                },
                {
                    title: '商品类型',
                    key: 'goodsTypeName',
                    align: 'center',
                    width: 120,
                },
                {
                    title: '工位数量',
                    key: 'capacity',
                    align: 'center',
                    width: 90,
                },
                {
                    title: '商品属性',
                    key: 'locationTypeName',
                    align: 'center',
                    width: 120,
                    render(h, params) {
                        var bacsk = params.row.suiteTypeName ? params.row.suiteTypeName : '';
                        var devel = params.row.locationTypeName ? params.row.locationTypeName : '';
                        let des = params.row.descr ? params.row.descr : '';
                        return h('div', [
                            h('span', devel + ' ' + bacsk),
                            h('div', des),
                        ])
                    }
                },
                {
                    title: '面积',
                    key: 'area',
                    align: 'center',
                    width: 90,
                },
                {
                    title: '商品定价',
                    key: 'quotedPrice',
                    width: 90,
                    align: 'right',
                },
                {
                    title: '当前状态',
                    key: 'goodsStatusName',
                    align: 'center',
                    width: 90,
                    render: (tag, params) => {
                        var statusName = params.row.goodsStatusName ? params.row.goodsStatusName : '-';
                        var status = params.row.goodsStatus;
                        var colorClass = '';
                        if (status == 'DISABLE' || status == 'OFF') {
                            colorClass = 'redClass'
                        } else {
                            colorClass = ''
                        }
                        return tag('span', {
                            attrs: {
                                class: colorClass
                            },
                            style: {
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                    this.openSingleStatus(params.row)
                                }
                            }
                        }, statusName);
                    }
                },

                {
                    title: '备注',
                    key: 'descr',
                    align: 'center'
                }
            ],
            attractData: [],
            loading: false,
            productList: [
                { value: ' ', label: '全部类型' },
                { value: 'OPEN', label: '固定办公桌' },
                { value: 'SPACE', label: '独立办公室' },
                { value: 'MOVE', label: '移动办公桌' }
            ],
            locationList: [
                { value: ' ', label: '全部方位' },
                { value: 'OUTSIDE_SPACE', label: '外侧间' },
                { value: 'INSIDE_SPACE', label: '内侧间' },
                { value: 'UNKNOWN', label: '未知' }
            ],
            suiteTypeList: [
                { value: ' ', label: '套间情况' },
                { value: 'SUITE', label: '有套间' },
                { value: 'UNSUITE', label: '无套间' }
            ],
            goodsStatusList: [
                { value: ' ', label: '全部' },
                { value: 'ON', label: '启用' },
                { value: 'DISABLE', label: '不可用' },
                { value: 'OFF', label: '下架' }
            ],
            endParams: {
                deleteData: [],
                submitData: []
            },
            page: {}
        }
    },
    computed: {
        ...mapGetters([
            'formDiscount'
        ])
    },
    watch: {
        tabForms: function (val, old) {
            this.getListData(this.tabForms);
            this.floor = this.tabForms.floor;
        },
        addFlag() {
            this.doAddDiscount(this.formDiscount)
        }
    },
    mounted() {


    },
    methods: {
        initData(formItem, floorList) {
            this.tabForms = Object.assign({}, this.tabForms, formItem);
            var str = '';
            if (this.tabForms.floor == ' ' || this.tabForms.floor == '') {
                // for
                for (var i = floorList.length - 1; i >= 0; i--) {
                    if (floorList[i].floor != ' ') {
                        str = str + floorList[i].floor + ','
                    }
                }
                str = str.substring(0, str.length - 1);
                this.floorStr = str;
            }
            console.log('floorListfloorListfloorListfloorList', floorList)
        },
        searchClick(values) {
            this.tabForms = Object.assign({}, this.tabForms, values, { page: 1 });
        },
        clearClick(values) {
            this.tabForms = Object.assign({}, this.tabForms, values);
        },
        getFloor(list) {
            this.floorList = [].concat(list);
        },
        cityFloor(params) {
            this.tabForms = Object.assign({}, this.tabForms, params, { page: 1 });
        },
        getListData(tabParams) {//列表
            this.loading = true;
            let params = Object.assign({}, tabParams)
            params.floor = params.floor.length > 1 ? ' ' : params.floor;
            params.cityId = ''
            this.$http.get('getGoodsList', params).then((response) => {
                this.totalCount = response.data.totalCount;
                this.attractData = response.data.items;
                this.name = response.data;
                this.loading = false;
            }).catch((error) => {
                this.openMessage = true;
                this.MessageType = "error";
                this.warn = error.message;
            })
        },
        tableChange(params) {
            let goodsIds = params.map(item => item.id)
            this.formDiscount.seatIds = goodsIds.join(',')
            this.$emit('on-result-change', goodsIds);
        },
        doAddDiscount(formItem) {
            console.log('doAddDiscount', this.formDiscount)

            if (!formItem.seatIds||!formItem.seatIds.includes(',')) {
                this.$Notice.error({
                    title: '请选择工位'
                });
                return
            }

            let { communityId, schemeType, seatIds, time: { startDate, endDate }, remark } = formItem
            let parmas = { communityId, schemeType, seatIds, startDate, endDate, remark }
            parmas.startDate = parmas.startDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.startDate)) : ''
            parmas.endDate = parmas.endDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(parmas.endDate)) : ''

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

            // post-add-discount
            console.log('add_discount', parmas)
            debugger
            this.$http.post('post-add-discount', parmas).then((response) => {
                this.$Message.success('添加成功');
                this.handleCancle(true);
            }).catch((error) => {
                this.$Notice.error({
                    title: '添加失败',
                    desc: error.message
                });
            })

        }
    }
}
</script>

<style lang='less' scoped>
.list-and-map-list {
  .search-from-panel {
  }
  .table-list {
    margin-top: 20px;
    overflow: auto;
  }
}
</style>
