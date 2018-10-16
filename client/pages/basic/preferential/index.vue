<template>
    <div class="g-order">
        <SectionTitle title="社区优惠配置"></SectionTitle>
        <div class="u-search">
            <Button type="primary"
                @click="onCreate"
                style="display:none">新建社区优惠</Button>
            <span style="padding:0 10px"></span>
            <div style="display:inline-block;width:200px;">
                社区：
                <Select v-model="communityId"
                    @on-change="changeCommunity"
                    filterable
                    clearable
                    style="width:150px">
                    <Option v-for="(option, index) in communityList"
                        :value="option.value"
                        :key="option.value">{{option.label}}</Option>
                </Select>
            </div>
            <span style="padding:0 10px"></span>
            <div style="display:inline-block;width:400px;">
                <CheckboxGroup style="font-size:12px"
                    v-model="statusList"
                    @on-change="checkAllGroupChange">状态：
                    <Checkbox v-for='(option, index) in stateList'
                        :key='option.value'
                        :label="option.value">{{option.desc}}</Checkbox>
                </CheckboxGroup>
            </div>
            <div class='u-create'>
                <Button type="primary"
                    @click="onCreate">添加</Button>
            </div>
        </div>
        <div class="u-table">
            <Table border
                :columns="columns"
                :data="tableData"
                stripe></Table>
            <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page :current="page"
                        :total="totalCount"
                        :page-size="params.pageSize"
                        @on-change="changePage"
                        show-total
                        show-elevator></Page>
                </div>
            </div>
        </div>

        <Modal v-model="createModal"
            id='create-discount-modal'
            title="添加优惠"
            ok-text="确定"
            cancel-text="取消"
            width="90%"
            :mask-closable='false'
            :styles="{top: '20px'}">
            <Create ref="fromFieldNewPage"
                v-if="openAddModal" />
            <div slot="footer">
            </div>
        </Modal>

        <Modal v-model="openStop"
            title="确定要停用?"
            ok-text="确定"
            cancel-text="取消"
            width="300"
            :styles="{top: '20px'}">
            <div style='font-size:14px'>停用将让此优惠立即失效，不可撤销。</div>
            <div slot="footer">
                <Button type="primary"
                    @click="submitStop('formContent')">确定</Button>
                <Button type="ghost"
                    style="margin-left: 8px"
                    @click="cancelStop">取消</Button>
            </div>
        </Modal>
        <Modal v-model="openGoods"
            title="查看商品"
            ok-text="确定"
            cancel-text="取消"
            width="60%"
            :styles="{top: '20px'}">
            <Table border
                :columns="goodsColumns"
                :data="goodsTableData"
                stripe></Table>
            <div slot="footer">

            </div>
        </Modal>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import Create from './thirdPeriod';


export default {
    name: 'DiscountList',
    components: {
        SectionTitle,
        Create
    },
    head() {
        return {
            title: "工位折扣-氪空间后台管理系统"
        }
    },
    data() {
        return {
            openGoods: false,
            createModal: false,
            currentID: '',
            statusList: [],//优惠可用状态
            stateList: [],//优惠可用状态列表 
            communityList: [],
            communityId: ' ',
            openCreate: false,
            openStop: false,
            totalCount: 1,
            tableData: [],
            page: 1,
            params: {
                page: 1,
                pageSize: 15
            },
            columns: [
                {
                    title: '折扣方案',
                    key: 'discountScheme',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let schemeTypeName = params.row.schemeTypeName
                        if (schemeTypeName === '全社区') {
                            return h('div', schemeTypeName)
                        } else if (params.row.goodsInfo) {
                            let arr=JSON.parse(params.row.goodsInfo)
                            let str = `${schemeTypeName}(${arr.length}个)`
                            return h('div', {
                                style: {
                                    color: '#2b85e4',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                },
                                on: {
                                    click: () => {
                                        this.showGoods(params.row.goodsInfo)
                                    }
                                }
                            }, str)
                        }

                    }
                },
                // {
                //     title: '折扣类型',
                //     key: 'discountType',
                //     align: 'center',
                //     width: 100,
                //     render: (h, params) => {
                //         let str = ''
                //         if (params.row.discountType == 'DISCOUNT') {
                //             str = '折扣'
                //         } else if (params.row.discountType == 'AFTER_FREE') {
                //             str = '后免租'
                //         }
                //         return h('span', str)
                //     }
                // },
                {
                    title: '社区名称',
                    key: 'communityName',
                    align: 'center'
                },
                {
                    title: '有效期开始',
                    key: 'startDate',
                    align: 'center',
                    // width: 105,
                    render: (h, params) => {
                        let date = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.startDate))
                        return h('div', date)
                    }
                },
                {
                    title: '有效期结束',
                    key: 'endDate',
                    align: 'center',
                    // width: 105,
                    render: (h, params) => {
                        let date = dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.endDate))
                        return h('div', date)
                    }
                },
                {
                    title: '权限',
                    key: 'rightContent',
                    align: 'center',
                    minWidth: 160,
                    render: (h, params) => {
                        let lines = [];
                        let content = params.row.rightContent.split(';')
                        content.map(item => {
                            lines.push(
                                h('p', { style: 'margin: 4px 1px' }, item)
                            )
                        })
                        return h('div', lines)
                    }
                },
                {
                    title: '创建日期',
                    key: 'ctime',
                    align: 'center',
                    // width: 140,
                    render: (h, params) => {
                        let date = dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(params.row.ctime))
                        return h('div', date)
                    }
                },
                {
                    title: '创建人',
                    key: 'createrName',
                    align: 'center',
                    width: 80
                },
                {
                    title: '备注',
                    key: 'remark',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        let str = params.row.remark
                        if (str) {
                            return h('Tooltip', {
                                props: {
                                    placement: 'top'
                                }
                            }, [
                                    h('div', {
                                        style: {
                                            width: "100px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }
                                    }, str),
                                    h('div', {
                                        style: {
                                            wordWrap: "break-word",
                                            with: '100px',
                                            whiteSpace: "normal"
                                        },
                                        slot: 'content'
                                    }, str)
                                ]
                            )
                        }
                    }
                },
                {
                    title: '状态',
                    key: 'statusName',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        let style;
                        let result = params.row.statusName
                        if (result === '已失效') {
                            style = 'color: red'
                        } else if (result === '生效中') {
                            style = 'color: #495060'
                        } else if (result === '未开始') {
                            style = 'color: green'
                        }
                        return h('span', { style: style }, result)
                    }
                },
                {
                    title: '操作',
                    key: 'operation',
                    align: 'center',
                    width: 60,
                    render: (h, params) => {
                        let result = params.row.statusName == '已失效';
                        let style;
                        if (result) {
                            return h('div', '-')
                        } else {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleStopDiscount(params.row)
                                        }
                                    }
                                }, '停用')
                            ]);
                        }
                    }
                }
            ],
            goodsColumns: [
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
            goodsTableData: []
        }
    },
    computed: {
        ...mapGetters([
            'openAddModal'
        ])
    },
    watch: {
        openAddModal(val) {
            this.createModal = val
            this.getTableData(this.params);
            this.$store.commit('changeStep', 0)
            this.$store.commit('resetDiscountSetting', {})
        },
        createModal(val) {
            if (val != this.openAddModal) {
                this.$store.commit('changeModalState', val)
            }
        }

    },
    created() {
        this.getTableData(this.params);
        this.getCmtList();
        this.getStateList();
    },
    methods: {
        //获取折扣状态枚举
        getStateList() {
            this.$http.get('get-enum-all-data', {
                enmuKey: 'com.krspace.order.api.enums.discount.DiscountStatus'
            }).then((r) => {
                let data = r.data;
                this.stateList = [].concat(data)
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })

        },
        //获取社区列表
        getCmtList() {
            this.$http.get('join-bill-community', '').then((response) => {
                let list = response.data.items;
                list.map((item) => {
                    let obj = item;
                    obj.label = item.name;
                    obj.value = item.id + '';
                    return obj;
                });
                list.unshift({
                    label: '全部',
                    value: ' '
                })
                this.communityList = list;
            }).catch((error) => {
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        //停用折扣
        submitStop() {
            this.$http.put('put-stop-discount', { id: this.currentID }).then((res) => {
                this.openStop = false;
                this.$Message.success('操作成功');
                this.communityId = ' ',
                    this.statusList = [],
                    this.getTableData(this.params)

            }).catch((err) => {
                this.openStop = false;
                this.$Notice.error({
                    title: err.message
                });
            })
        },
        //获取折扣列表数据
        getTableData(params) {
            this.$http.get('get-discont-list', params).then((res) => {
                this.tableData = res.data.items;
                this.totalCount = res.data.totalCount;
            }).catch((err) => {
                this.$Notice.error({
                    title: err.message
                });
            })
        },
        changeCommunity(value) {
            this.page = 1;
            let params = Object.assign({}, this.params, { statusList: this.statusList.join(',') }, { communityId: value })
            this.getTableData(params);
        },
        changePage(page) {
            this.page = page;
            let params = Object.assign({}, this.params, { page: page }, { statusList: this.statusList.join(',') }, { communityId: this.communityId })
            this.getTableData(params);
        },
        checkAllGroupChange() {
            this.page = 1;
            let params = Object.assign({}, this.params, { statusList: this.statusList.join(',') }, { communityId: this.communityId })
            this.getTableData(params)
        },
        //停用
        handleStopDiscount(item) {
            this.currentID = item.id;
            this.openStop = true;
        },

        cancelStop() {
            this.openStop = false;
        },
        //打开新建折扣弹窗
        onCreate() {
            this.$store.commit('changeModalState', true)
        },
        //查看商品
        showGoods(goods) {
            this.$http.post('post-goods-info', goods).then(r => {
                this.goodsTableData = r.data;
                this.openGoods = true
            }).catch(error => {
                this.$Notice.error({
                    title: '查看失败',
                    desc: error.message
                });
            })
        }

    }

}
</script>

<style lang="less">
.g-order {
  .u-search {
    height: 32px;
    margin: 16px 20px;
    .u-create {
      float: right;
      right: 50px;
    }
  }
  .ivu-table-cell {
    padding: 0;
  }
  .u-table {
    padding: 0 20px;
  }
  .m-search {
    color: #2b85e4;
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
.u-cancel-title {
  width: 334px;
  text-align: center;
  margin: 40px auto 35px;
  font-size: 14px;
}
#create-discount-modal {
  .ivu-modal-footer {
    display: none;
  }
}
</style>