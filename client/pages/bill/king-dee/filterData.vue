<template>
    <div class='filter-data-panel'>
        <SectionTitle title="应接收数据传输过滤"></SectionTitle>
        <div class="search-zone">
            <Row>
                <Col class="col">
                <FormItem label="日期区间" style="width:252px">
                    <DatePicker v-model="formItem.startTime" type="date" :disabled='true' placeholder="开始日期" /> -
                    <span class="u-date-txt" style='padding:0 20px'>至</span>
                    <DatePicker v-model="formItem.endTime" type="date" :disabled='true' placeholder="结束日期" />
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="社区名称" style="width:252px">
                    <selectCommunities :onchange="changeCommunity" />
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="客户名称" style="width:252px">
                    <selectCustomers :onchange="changeCustomer" />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col class="col">
                <FormItem label="业务员姓名" style="width:252px">
                    <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="交易编码" style="width:252px">
                    <Input v-model="formItem.tradeNo" placeholder="唯一交易编码" />
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="姓名" style="width:252px">
                    <Input v-model="formItem.name" placeholder="姓名" />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col class="col">
                <FormItem label='收款类型' style="width:252px">
                    <Select v-model="formItem.cashType">
                        <Option v-for="item in cashTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="结算方式" style="width:252px">
                    <Select v-model="formItem.payWay" placeholder="请选择支付方式">
                        <Option v-for="item in payWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="销售合同号" style="width:252px">
                    <Input v-model="formItem.contractNo" placeholder="销售合同号" />
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col class="col">
                <FormItem label='收款类型' style="width:252px">
                    <Select v-model="formItem.cashType">
                        <Option v-for="item in cashTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col class="col">
                <FormItem label="同步状态" style="width:252px">
                    <Select v-model="formItem.syncState" placeholder="请选择支付方式">
                        <Option v-for="item in syncStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <FormItem class="form-item-btn">
                <Button type="primary" class="btn" @click="handleSearch">查询</Button>
            </FormItem>
        </div>
        <div class="table-zone">
            <Table :columns="columns" :data="data" border />
            <div style="float: right;">
                <Page :total="totalCount" :page-size='params.pageSize' show-total show-elevator @on-change="onPageChange" />
            </div>
        </div>
        <div class="btn-zone">
            <Button type="primary" class="btn" @click="handlePrivious">上一步</Button>
            <Button type="primary" class="btn" @click="handleSync('formItem')">下一步</Button>
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
</style>
