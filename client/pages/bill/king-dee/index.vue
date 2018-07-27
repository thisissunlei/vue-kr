<template>
    <div class='filter-data-panel'>
        <SectionTitle title="应接收数据传输过滤"></SectionTitle>
        <div class="search-zone">
            <Form ref="formItem" :model="formItem" class="form-search">
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="日期区间">
                        <DatePicker v-model="formItem.startTime" type="date" :disabled='true' placeholder="开始日期" style='width:114px' />
                        <span class="u-date-txt" style='padding:0 5px'>至</span>
                        <DatePicker v-model="formItem.endTime" type="date" :disabled='true' placeholder="结束日期" style='width:114px' />
                    </FormItem>
                    </Col>

                    <Col span="6" class="col">
                    <FormItem label="测试用">
                        <Button type="primary" class="btn" @click="handleTest">切换同步类型</Button>
                    </FormItem>
                    </Col>
                    <!-- <Col span="6" class="col">
                    <FormItem label="社区名称">
                        <selectCommunities :onchange="changeCommunity" class="form-item-input" />
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="客户名称">
                        <selectCustomers :onchange="changeCustomer" class="form-item-input" />
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
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="同步状态">
                        <Select v-model="formItem.syncState" placeholder="请选择支付方式" class="form-item-input" @on-change='filterData'>
                            <Option v-for="item in syncStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <!-- <Col span="6" class="col">
                    <FormItem class="form-item-btn">
                        <Button type="primary" class="btn" @click="handleSearch">查询</Button>
                    </FormItem>
                    </Col> -->
                </Row>

            </Form>
        </div>
        <div class="table-zone">
            <Table :columns="columns" :data="data" @on-selection-change='handleSelectChange' border />
            <div style="float: right;">
                <Page :total="totalRecordCount" :page-size='params.pageSize' show-total show-elevator @on-change="onPageChange" />
            </div>
        </div>
        <div class="btn-zone">
            <Button type="primary" class="btn" @click="handlePrivious">上一步</Button>
            <Button type="primary" class="btn" @click="handleSync(formItem)">下一步</Button>
        </div>
    </div>
</template>
<script>
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
    data() {
        return {
            syncType: 'INCOME',
            syncDataId: 117,
            formItem: {},
            cashTypeList: [],
            payWayList: [],
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
                { key: 'repeatStatus', title: '重复传递' },
                { key: 'bizDate', title: '业务日期' },
                { key: 'price', title: '不含税单价' },
                { key: 'companyNumber', title: '财务组织编码' },
                { key: 'arAmount', title: '含税金额' },
                { key: 'amount', title: '金额' },
                { key: 'taxAmount', title: '税额' },
                { key: 'asstActNumber', title: '客户编码' },
                { key: 'bizPerson', title: '业务员姓名' },
                { key: 'bizType', title: '销售类型' },
                { key: 'contractNumber', title: '销售合同行号' },
                { key: 'coreBillNumber', title: '核心单据号' },
                { key: 'costCenterNumber', title: '成本中心' },
                { key: 'currency', title: '币别' },
                { key: 'failedMsg', title: '失败消息' },
                // { key: 'incomeId', title: '原始数据id' },
                { key: 'materialNumber', title: '物料编码' },
                { key: 'number', title: '唯一交易编码' },
                { key: 'quantity', title: '数量' },
                // { key: 'syncDataId', title: '同步记录id' },
                { key: 'syncStatus', title: '同步状态' },
                { key: 'taxRate', title: '税率' },
                { key: 'taxPrice', title: '含税单价' },
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
                { key: 'amount', title: '金额' },
                { key: 'bizDate', title: '业务日期' },
                { key: 'bizPerson', title: '业务员姓名' },
                { key: 'companyNumber', title: '财务组织编码' },
                { key: 'contractNumber', title: '合同编号' },
                { key: 'coreBillNumber', title: '订单编号' },
                { key: 'costCenterNumber', title: 'OP系统的社区编码' },
                { key: 'currency', title: '币别' },
                { key: 'failedMsg', title: '失败消息' },
                { key: 'number', title: '唯一交易编码' },
                { key: 'payerAccountBank', title: '付款账号' },
                { key: 'payerNumber', title: '客户（供应商）编码' },
                { key: 'payerType', title: '付款人类型' },
                { key: 'recAccountBank', title: '银行收款账号' },
                { key: 'recBillType', title: '收款类型' },

                { key: 'repeatStatus', title: '重复状态' },
                { key: 'settlementType', title: '结算方式' },
                { key: 'syncDataId', title: '同步记录id' },
                { key: 'syncStatus', title: '同步状态' },

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
            ]
        }
    },
    mounted() {
        this.getListData();
    },
    methods: {
        handleSearch() {

        },
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
        filterData(val) {
            this.data = this.data.filter(item => item.syncStatus === val)
        },
        getListData() {
            let parmas = {};
            parmas.page = 1;
            parmas.pageSize = this.params.pageSize
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

            this.$http.post(api, parmas).then(r => {
                this.totalRecordCount = r.data.totalCount
                this.data = [].concat(r.data.items)
            }).catch(error => {
                console.log(error)
                this.$Notice.error({
                    title: error.message
                });
            })

        },
        changeCommunity(val) {
            this.formItem.communityIds = val;
        },
        changeCustomer(val) {
            this.formItem.customerIds = val;
        },
        changeSaler(val) {
            this.formItem.salerId = val;
        },
        onPageChange(index) {
            let params = this.params;
            params.page = index;
            this.getListData(params);
        },
        handleSelectChange(selection) {
            console.log(selection)
            debugger;
        },
        handlePrivious() {

        },
        handleSync() {

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
