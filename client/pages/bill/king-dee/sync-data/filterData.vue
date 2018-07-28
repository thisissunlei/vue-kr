<template>
    <div class='filter-data-panel'>
        <SectionTitle title="应接收数据传输过滤"></SectionTitle>
        <div class="search-zone">
            <Form ref="formItem" :model="formItem" class="form-search">
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="日期区间">
                        <DatePicker v-model="startTime" type="date" :disabled='true' placeholder="开始日期" style='width:100px' />
                        <span class="u-date-txt" style='padding:0 5px'>至</span>
                        <DatePicker v-model="endTime" type="date" :disabled='true' placeholder="结束日期" style='width:100px' />
                    </FormItem>
                    </Col>
                    <!-- <Col span="6" class="col">
                    <FormItem label="测试用">
                        <Button type="primary" class="btn" @click="handleTest">测试用——切换同步类型</Button>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="测试用">
                        <Button type="primary" class="btn" @click="handleTestNotCheckAll">测试用——切换全选</Button>
                    </FormItem>
                    </Col> -->
                </Row>
                <div v-if="syncType==='INCOME'">
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label="业务员姓名">
                            <Input v-model="formItem.bizPerson" placeholder="业务员姓名" class="form-item-input" />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="财务组织编码">
                            <Input v-model="formItem.companyNumber" placeholder="财务组织编码" class="form-item-input" />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="业务类型">
                            <Select v-model="formItem.bizType" class="form-item-input">
                                <Option v-for="item in bizTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label='物料编码'>
                            <Input v-model="formItem.materialNumber" placeholder="物料编码" class="form-item-input" />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="核心单据号">
                            <Input v-model="formItem.coreBillNumber" placeholder="核心单据号" class="form-item-input" />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="销售合同号">
                            <Input v-model="formItem.contractNumber" placeholder="销售合同号" class="form-item-input" />
                        </FormItem>
                        </Col>
                    </Row>
                </div>
                <div v-if="syncType==='PAYMENT'">
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label="业务员姓名">
                            <Input v-model="formItem.bizPerson" placeholder="业务员姓名" class="form-item-input" />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="唯一交易编码">
                            <Input v-model="formItem.number" placeholder="唯一交易编码" class="form-item-input" />
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label="付款人类型">
                            <Select v-model="formItem.payerType" class="form-item-input">
                                <Option v-for="item in payerTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="核心单据号">
                            <Input v-model="formItem.coreBillNumber" placeholder="核心单据号" class="form-item-input" />
                        </FormItem>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="同步状态">
                        <Select v-model="formItem.syncStatus" placeholder="同步状态" class="form-item-input" @on-change='filterData'>
                            <Option v-for="item in syncStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="table-zone">
            <Table border ref="selection" :columns="columns" :data="data" @on-select='handleSelect' @on-select-all='handleSelectAll' @on-select-cancel='handleSelectCancel' @on-selection-change='handleSelectChange' />
            <div style='height:34px'>
                <Page :total="totalRecordCount" :page-size='params.pageSize' show-total show-elevator @on-change="onPageChange" style="float: right;" />
            </div>
        </div>
        <div class="btn-zone">
            <div style="float: right;z-index:99">
                <Button type="primary" class="btn" @click="handlePrivious">上一步</Button>
                <Button type="primary" class="btn" @click="handleSync(formItem)">开始同步</Button>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomersFinancial.vue'
import SelectSaler from '~/components/SelectSaler.vue';
export default {
    name: 'filterData',
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        SelectSaler
    },
    props: {
        // syncDataId: {
        //     type: Number,
        //     required: true,
        // },
        // syncType: {
        //     type: String,
        //     required: true,
        // },
        // startTime: {
        //     type: String,
        //     required: true,
        // },
        // endTime: {
        //     type: String,
        //     required: true,
        // },
    },
    data() {
        return {
            currentPage: 1,
            selectIdsInPages: [],//记录每一页勾选的状态 [[id1,id2],[id3,id4]]
            unSelectIdsInPages: [],//记录每一页勾选的状态 [[id1,id2],[id3,id4]]
            syncDataId: '',
            startTime: '',
            endTime: '',
            syncType: 'INCOME',//当前同步的类型 INCOME|PAYMENT
            isAllSelect: false,//是否全选
            notSelectInAllSelectState: [],//全选状态下取消勾选的id集合
            selectedIdsInNotAllSelectState: [],//非全选模式下 已选择的id集合

            formItem: {},
            syncStateList: [
                {
                    label: '已同步',
                    value: 'ALREADY_SYNC'
                },
                {
                    label: '未同步',
                    value: 'NOT_SYNC'
                },
            ],
            bizTypeList: [
                {
                    label: '普通销售',
                    value: 'SALES'
                },
                {
                    label: '普通销售退',
                    value: 'SALES_RETREAT'
                },
            ],
            payerTypeList: [
                {
                    label: 'PAYMENT',
                    value: 'PAYMENT'
                },
                {
                    label: 'CUSTOMER',
                    value: 'CUSTOMER'
                },
            ],
            params: {
                page: 1,
                pageSize: 15,
            },
            totalRecordCount: 0,

            data: [],
            syncDataIncomeDetailData: [],
            syncDataPaymentDetailData: [],
            columns: [],
            syncDataIncomeDetailColums: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    key: 'repeatStatus',
                    title: '重复状态',
                    align: 'center',
                    render(h, params) {
                        return h('span', params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                    }
                },
                {
                    key: 'bizDate',
                    title: '业务日期',
                    align: 'center',
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.bizDate))
                        return h('span', time)
                    }
                },
                { key: 'price', align: 'center', title: '不含税单价' },
                { key: 'companyNumber', align: 'center', title: '财务组织编码' },
                { key: 'arAmount', align: 'center', title: '含税金额' },
                { key: 'amount', align: 'center', title: '金额' },
                { key: 'taxAmount', align: 'center', title: '税额' },
                { key: 'asstActNumber', align: 'center', title: '客户编码' },
                { key: 'bizPerson', align: 'center', title: '业务员姓名' },
                { key: 'bizType', align: 'center', title: '销售类型' },
                { key: 'contractNumber', align: 'center', title: '销售合同行号' },
                { key: 'coreBillNumber', align: 'center', title: '核心单据号' },
                { key: 'costCenterNumber', align: 'center', title: '成本中心' },
                { key: 'currency', align: 'center', title: '币别' },
                { key: 'failedMsg', align: 'center', title: '失败消息' },
                // { key: 'incomeId', title: '原始数据id' },
                { key: 'materialNumber', align: 'center', title: '物料编码' },
                { key: 'number', align: 'center', title: '唯一交易编码' },
                { key: 'quantity', align: 'center', title: '数量' },
                // { key: 'syncDataId', title: '同步记录id' },
                {
                    key: 'syncStatus',
                    title: '同步状态',
                    render(h, params) {
                        return h('span', params.row.syncStatus.toUpperCase() === 'ALREADY_SYNC' ? '已同步' : '未同步')
                    }
                },
                { key: 'taxRate', align: 'center', title: '税率' },
                { key: 'taxPrice', align: 'center', title: '含税单价' },
                {
                    key: 'remark',
                    title: '备注',
                    width: 80,
                    render(h, params) {
                        return h('Tooltip', {
                            props: {
                                placement: 'left'
                            }
                        }, [
                                h('div', {
                                    style: {
                                        width: "40px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                }, params.row.remark || '-'),
                                h('div', {
                                    style: {
                                        wordWrap: "break-word"
                                    },
                                    slot: 'content'
                                }, params.row.remark || '-')
                            ]
                        )
                    }
                },
            ],
            syncDataPaymentDetailColums: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    key: 'repeatStatus',
                    align: 'center',
                    title: '重复状态',
                    render(h, params) {
                        return h('span', params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                    }
                },
                { key: 'amount', align: 'center', title: '金额' },
                {
                    key: 'bizDate',
                    title: '业务日期',
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.bizDate))
                        return h('span', time)
                    }
                },
                { key: 'bizPerson', align: 'center', title: '业务员姓名' },
                { key: 'companyNumber', align: 'center', title: '财务组织编码' },
                { key: 'contractNumber', align: 'center', title: '合同编号' },
                { key: 'coreBillNumber', align: 'center', title: '订单编号' },
                { key: 'costCenterNumber', align: 'center', title: 'OP系统的社区编码' },
                { key: 'currency', align: 'center', title: '币别' },
                { key: 'failedMsg', align: 'center', title: '失败消息' },
                { key: 'number', align: 'center', title: '唯一交易编码' },
                { key: 'payerAccountBank', align: 'center', title: '付款账号' },
                { key: 'payerNumber', align: 'center', title: '客户（供应商）编码' },
                { key: 'payerType', align: 'center', title: '付款人类型' },
                { key: 'recAccountBank', align: 'center', title: '银行收款账号' },
                { key: 'recBillType', align: 'center', title: '收款类型' },
                { key: 'settlementType', align: 'center', title: '结算方式' },
                // { key: 'syncDataId', title: '同步记录id' },
                {
                    key: 'syncStatus',
                    align: 'center',
                    title: '同步状态',
                    render(h, params) {
                        return h('span', params.row.syncStatus.toUpperCase() === 'ALREADY_SYNC' ? '已同步' : '未同步')
                    }
                },
                {
                    key: 'remark',
                    title: '备注',
                    align: 'center',
                    width: 80,
                    render(h, params) {
                        return h('Tooltip', {
                            props: {
                                placement: 'left'
                            }
                        }, [
                                h('div', {
                                    style: {
                                        width: "40px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                }, params.row.remark || '-'),
                                h('div', {
                                    style: {
                                        wordWrap: "break-word"
                                    },
                                    slot: 'content'
                                }, params.row.remark || '-')
                            ]
                        )
                    }
                },
            ]
        }
    },
    mounted() {
        GLOBALSIDESWITCH('false');
        this.getRouterQueryParmas();
        this.getListData();
    },
    methods: {
        handleTest() {
            if (this.syncType === 'INCOME') {
                this.syncType = 'PAYMENT'
                this.syncDataId = 81
            } else {
                this.syncType = 'INCOME'
                this.syncDataId = 117
            }
            this.getListData()
        },
        handleTestNotCheckAll() {
            this.isAllSelect = false;
        },
        filterData(val) {
            this.data = this.data.filter(item => item.syncStatus === val)
        },
        getRouterQueryParmas() {
            let { query } = this.$route;
            this.syncDataId = query.syncId
            this.startTime = query.startTime
            this.endTime = query.endTime
            this.syncType = query.syncType
        },
        getListData() {
            let parmas = this.params
            parmas.syncDataId = this.syncDataId;
            let api = 'get-sync-income-data-list'
            this.data = [];
            if (this.syncType === 'INCOME') {
                this.columns = [].concat(this.syncDataIncomeDetailColums)
                api = 'get-sync-income-data-list'
            } else if (this.syncType === 'PAYMENT') {
                this.columns = [].concat(this.syncDataPaymentDetailColums)
                api = 'get-sync-payment-data-list'
            }
            console.log('parmas', parmas)
            this.$http.post(api, parmas)
                .then(r => {
                    this.selectIdsInPages.length = r.data.pages
                    this.unSelectIdsInPages.length = r.data.pages
                    this.totalRecordCount = r.data.total
                    let data = [].concat(r.data.items)
                    if (this.isAllSelect) {
                        let unselected = this.unSelectIdsInPages[Number(this.currentPage)]
                        if (unselected && unselected.length > 0) {
                            data.map(item => {
                                unselected.includes(item.id) ? item._checked = false : item._checked = true
                            })
                        }
                    } else {
                        let selected = this.selectIdsInPages[Number(this.currentPage)]
                        if (selected && selected.length > 0) {
                            data.map(item => {
                                selected.includes(item.id) ? item._checked = true : item._checked = false
                            })
                        }
                    }
                    this.data = [].concat(data)
                })
                .then(() => {
                    if (this.isAllSelect) {
                        if (!this.unSelectIdsInPages[Number(this.currentPage)]) {
                            this.$refs.selection.selectAll(true);
                        }                       
                    }
                })
                .catch(error => {
                    this.$Notice.error({
                        title: error.message
                    });
                })

        },
        onPageChange(index) {
            let params = this.params;
            params.page = index;
            this.getListData(params);
            this.currentPage = index;
        },
        //切换为全选模式
        handleSelectAll() {
            this.isAllSelect = true;
            this.notSelectInAllSelectState = [];
        },
        //全选模式下  勾选单项时触发
        handleSelect(selection, row) {
            if (this.isAllSelect) {
                let id = row.id;
                let index = this.notSelectInAllSelectState.findIndex(item => item == id)
                if (index != -1) {
                    this.notSelectInAllSelectState.splice(index, 1)
                    console.log("notSelectInAllSelectState", this.notSelectInAllSelectState)
                }

            }
        },
        //全选模式下 取消勾选某一项
        handleSelectCancel(selection, row) {
            if (this.isAllSelect) {
                this.notSelectInAllSelectState.push(row.id)
                let arr = this.unSelectIdsInPages[Number(this.currentPage)]
                if (arr) {
                    arr.push(row.id)
                }
                else {
                    this.unSelectIdsInPages[Number(this.currentPage)] = []
                    this.unSelectIdsInPages[Number(this.currentPage)].push(row.id)
                }
                console.log("notSelectInAllSelectState", this.notSelectInAllSelectState)
            }
        },
        // 非全选模式下
        handleSelectChange(selection) {
            if (!this.isAllSelect) {
                this.selectedIdsInNotAllSelectState = selection.map(item => item.id)
                this.selectIdsInPages[Number(this.currentPage)] = [].concat(this.selectedIdsInNotAllSelectState)
                console.log("selectedIdsInNotAllSelectState", this.selectedIdsInNotAllSelectState)
            }

        },
        handlePrivious() {

        },
        handleSync(formItem) {
            let api = ''
            let parmas = {};
            if (this.isAllSelect) {
                if (this.syncType === 'INCOME') {
                    api = 'post-sync-income-data-ids'
                    let { bizPerson, syncStatus, companyNumber, bizType, materialNumber, coreBillNumber, contractNumber } = formItem
                    parmas = { bizPerson, syncStatus, companyNumber, bizType, materialNumber, coreBillNumber, contractNumber }
                    parmas.syncDataId = this.syncDataId
                    parmas.ids = this.notSelectInAllSelectState
                } else if (this.syncType === 'PAYMENT') {
                    api = 'post-sync-payment-data-ids'
                    let { number, bizPerson, syncStatus, payerType, coreBillNumber } = formItem
                    parmas = { number, bizPerson, syncStatus, payerType, coreBillNumber }
                    parmas.syncDataId = this.syncDataId
                    parmas.ids = this.notSelectInAllSelectState
                }
            } else {
                api = 'post-sync-select-data-ids'
                parmas.syncDataId = this.syncDataId
                parmas.dataIds = this.selectedIdsInNotAllSelectState
            }
            console.log('api', api)
            console.log('parmas', parmas)
            this.$http.post(api, parmas)
                .then(r => {
                    this.isAllSelect = false
                })
                .catch(error => {
                    console.log(error)
                    this.isAllSelect = false
                    this.$Notice.error({
                        title: error.message
                    });
                })

        }
    }
}
</script>
<style lang="less">
.filter-data-panel {
    padding: 20px;
    .search-zone {
        margin: 20px 0;
        .form-search {
            .ivu-form-item-label {
                width: 90px;
            }
            .form-item-input {
                width: 60%;
                display: inline-block;
            }
            .form-item-btn {
                .btn {
                    position: relative;
                    left: 80px;
                }
            }
        }
    }
    .btn-zone {
        margin: 10px;
        position: relative;
        right: 20px;
        .btn {
            margin: 0 20px;
        }
    }
}
</style>
