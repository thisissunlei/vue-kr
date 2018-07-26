<template>
    <div class='filter-data-panel'>
        <SectionTitle title="应接收数据传输过滤"></SectionTitle>
        <div class="search-zone">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="form-search">
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="日期区间">
                        <DatePicker v-model="formItem.startTime" type="date" :disabled='true' placeholder="开始日期" style='width:114px' />
                        <span class="u-date-txt" style='padding:0 5px'>至</span>
                        <DatePicker v-model="formItem.endTime" type="date" :disabled='true' placeholder="结束日期" style='width:114px' />
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="社区名称">
                        <selectCommunities :onchange="changeCommunity" class="form-item-input" />
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="客户名称">
                        <selectCustomers :onchange="changeCustomer" class="form-item-input" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6" class="col">
                    <FormItem label="业务员姓名">
                        <SelectSaler :onchange="changeSaler" :value="formItem.salerId||' '" class="form-item-input"></SelectSaler>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="交易编码">
                        <Input v-model="formItem.tradeNo" placeholder="唯一交易编码" class="form-item-input" />
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="姓名">
                        <Input v-model="formItem.name" placeholder="姓名" class="form-item-input" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6" class="col">
                    <FormItem label='收款类型'>
                        <Select v-model="formItem.cashType" class="form-item-input">
                            <Option v-for="item in cashTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="结算方式">
                        <Select v-model="formItem.payWay" placeholder="请选择支付方式" class="form-item-input">
                            <Option v-for="item in payWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="销售合同号">
                        <Input v-model="formItem.contractNo" placeholder="销售合同号" class="form-item-input" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6" class="col">
                    <FormItem label='收款类型'>
                        <Select v-model="formItem.cashType" class="form-item-input">
                            <Option v-for="item in cashTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem label="同步状态">
                        <Select v-model="formItem.syncState" placeholder="请选择支付方式" class="form-item-input">
                            <Option v-for="item in syncStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6" class="col">
                    <FormItem class="form-item-btn">
                        <Button type="primary" class="btn" @click="handleSearch">查询</Button>
                    </FormItem>
                    </Col>
                </Row>

            </Form>
        </div>
        <div class="table-zone">
            <Table :columns="columns" :data="data" border />
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
            formItem: {},
            cashTypeList: [],
            payWayList: [],
            syncStateList: [],
            data: [],
            params: {
                page: 1,
                pageSize: 15,
                customerName: "",
            },
            totalRecordCount: 0,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '重复传递',
                    key: 'name'
                },
                {
                    title: '业务日期',
                    key: 'name'
                },
                {
                    title: '不含税单价',
                    key: 'name'
                },
                {
                    title: '财务组织代码',
                    key: 'name'
                },
                {
                    title: '含税金额',
                    key: 'name'
                },
                {
                    title: '金额',
                    key: 'name'
                },
                {
                    title: '税额',
                    key: 'name'
                },
                {
                    title: '收款类型',
                    key: 'name'
                },
                {
                    title: '银行收款账号',
                    key: 'name'
                },
                {
                    title: '核心单据号',
                    key: 'name'
                },
                {
                    title: '结算方式',
                    key: 'name'
                },
                {
                    title: '业务员',
                    key: 'name'
                },
                {
                    title: '销售合同号',
                    key: 'name'
                },
                {
                    title: '付款账号',
                    key: 'name'
                },
                {
                    title: 'OP系统社区编码',
                    key: 'name'
                },
                {
                    title: '税率',
                    key: 'name'
                },
                {
                    title: '含税单价',
                    key: 'name'
                },
            ],

        }
    },
    mounted() {
        this.getListData();
    },
    methods: {
        handleSearch() {

        },
        getListData() {

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
                width: 80px;
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
    .btn-zone{
        margin: 10px;
        position: relative;
        right: 20px;
        .btn{
            margin: 0 20px;
        }
    }
}
</style>
