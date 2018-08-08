<template>
    <div class='filter-data-panel'>
        <SectionTitle title="应接收数据传输过滤"></SectionTitle>
        <div class="search-zone">
            <Form ref="formItem" :model="formItem" class="form-search">
                <Row>
                    <Col span="7" class="col">
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
                        <!-- <Col span="6" class="col">
                        <FormItem label="业务员姓名">
                            <Input v-model="formItem.bizPerson" placeholder="业务员姓名" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col> -->
                        <Col span="6" class="col">
                        <!-- <FormItem label="财务组织编码">
                            <Input v-model="formItem.companyNumber" placeholder="财务组织编码" class="form-item-input" @on-blur='filterData' />
                        </FormItem> -->
                         <FormItem label="主体">
                              <Select 
                                v-model="formItem.companyNumber" 
                                placeholder="选择出租方主体" 
                                class="form-item-input" 
                                @on-change='filterData'
                                filterable
                                clearable
                            >
                                <Option v-for="item in fileList" :value="item.id" :key="item.id">{{ item.corporationName }}</Option>
                            </Select> 
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="业务类型">
                            <Select v-model="formItem.bizType" class="form-item-input" @on-change='filterData'>
                                <Option v-for="item in bizTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="重复状态">
                            <Select v-model="formItem.repeatStatus" class="form-item-input" @on-change='filterData'>
                                <Option v-for="item in repeatStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label='物料编码'>
                            <Input v-model="formItem.materialNumber" placeholder="物料编码" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col>
                        <Col span="6" class="col">
                        <FormItem label="核心单据号">
                            <Input v-model="formItem.coreBillNumber" placeholder="核心单据号" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col>
                        <!-- <Col span="6" class="col">
                        <FormItem label="销售合同号">
                            <Input v-model="formItem.contractNumber" placeholder="销售合同号" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col> -->
                    </Row>
                </div>
                <div v-if="syncType==='PAYMENT'">
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label="核心单据号">
                            <Input v-model="formItem.coreBillNumber" placeholder="核心单据号" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col>
                        <!-- <Col span="6" class="col">
                        <FormItem label="业务员姓名">
                            <Input v-model="formItem.bizPerson" placeholder="业务员姓名" class="form-item-input" @on-blur='filterData'/>
                        </FormItem>
                        </Col> -->
                        <Col span="6" class="col">
                        <FormItem label="唯一交易编码">
                            <Input v-model="formItem.number" placeholder="唯一交易编码" class="form-item-input" @on-blur='filterData' />
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" class="col">
                        <FormItem label="付款人类型">
                            <Select v-model="formItem.payerType" class="form-item-input" @on-change='filterData'>
                                <Option v-for="item in payerTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        
                        <Col span="6" class="col">
                        <FormItem label="重复状态">
                            <Select v-model="formItem.repeatStatus" class="form-item-input" @on-change='filterData'>
                                <Option v-for="item in repeatStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
                <!-- <Row>
                    <Col span="6" class="col">
                    <FormItem label="同步状态">
                        <Select v-model="formItem.syncStatus" placeholder="同步状态" class="form-item-input" @on-change='filterData'>
                            <Option v-for="item in syncStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row> -->
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
        <Modal v-model="openLoading" :title="titleMessage" :closable="false" :mask-closable="false">
            <div>
                <Loading />
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunitiesByCustomer.vue'
import selectCustomers from '~/components/SelectCustomersFinancial.vue'
import SelectSaler from '~/components/SelectSaler.vue';
import Loading from '~/components/Loading.vue';
export default {
    name: 'filterData',
    components: {
        SectionTitle,
        selectCommunities,
        selectCustomers,
        SelectSaler,
        Loading
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
            selectIdsInPages: [],//记录每一页勾选的状态ids [[id1,id2],[id3,id4]]
            unSelectIdsInPages: [],//记录每一页取消勾选的状态ids [[id1,id2],[id3,id4]]
            syncDataId: '',
            startTime: '',
            endTime: '',
            syncType: 'INCOME',//当前同步的类型 INCOME|PAYMENT
            isAllSelect: false,//是否全选
            notSelectInAllSelectState: [],//全选状态下取消勾选的id集合
            selectedIdsInNotAllSelectState: [],//非全选模式下 已选择的id集合
            openLoading: false,
            formItem: {},
            fileList:[],
            titleMessage: '等待同步中....',
            repeatStatusList: [
                {
                    label: '是',
                    value: 'IS_REPEAT'
                },
                {
                    label: '否',
                    value: 'NO_REPEAT'
                },
            ],
            syncStateList: [
                {
                    label: '未同步',
                    value: 'NOT_SYNC'
                },
                {
                    label: '已同步',
                    value: 'ALREADY_SYNC'
                },
                {
                    label: '同步失败',
                    value: 'FAILED_SYNC'
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
                    label: '供应商',
                    value: 'PAYMENT'
                },
                {
                    label: '客户',
                    value: 'CUSTOMER'
                },
            ],
            params: {
                page: 1,
                pageSize: 20,
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
                    align: 'center',
                    fixed: 'left',
                },
                {
                    key: 'repeatStatus',
                    title: '重复状态',
                    align: 'center',
                    width: 120,
                    render(h, params) {
                        return h('span', params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                    }
                },
                {
                    key: 'communityName',
                    title: '社区名称',
                    align: 'center',
                    width: 120,
                },
                { key: 'asstActNumber', align: 'center', title: '客户编码', width: 120,  },
                 {
                    key: 'customerName',
                    title: '客户姓名',
                    align: 'center',
                    width: 120,
                },
                {
                    key: 'companyNumberName',
                    title: '财务组织名单',
                    align: 'center',
                    width: 120,
                },
                {
                    key: 'bizDate',
                    title: '业务日期',
                    align: 'center',
                    width: 110,
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY.MM.DD", new Date(params.row.bizDate))
                        return h('span', time)
                    }
                },
                {  key: 'price', align: 'center', title: '不含税单价', width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.price))
                    },
                },
                { key: 'companyNumber', align: 'center', title: '财务组织编码', width: 120, },
                  {
                    key: 'materialNumberDesc',
                    title: '物料编码(收入类型)描述',
                    align: 'center',
                    width: 150,
                },
                {     key: 'arAmount', align: 'center', title: '含税金额', width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.arAmount))
                    }
                },
                {  key: 'amount', align: 'center', title: '金额', width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.amount))
                    }
                },
                {   key: 'taxAmount', align: 'center', title: '税额', width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.taxAmount))
                    }
                },
                { key: 'bizType', align: 'center', title: '销售类型', width: 120, },
                { key: 'coreBillNumber', align: 'center', title: '核心单据号', width: 120, },
                { key: 'costCenterNumber', align: 'center', title: '成本中心', width: 120, },
                //  { key: 'currency', align: 'center', title: '币别' },

                // { key: 'incomeId', title: '原始数据id' },
                { key: 'materialNumber', align: 'center', title: '物料编码', width: 120, },
                { key: 'number', align: 'center', title: '唯一交易编码', width: 120, },
                { key: 'quantity', align: 'center', title: '数量', width: 120, },
                // { key: 'syncDataId', title: '同步记录id' },
                { key: 'taxRate', align: 'center', title: '税率', width: 120, },
                {
                    key: 'taxPrice',
                    align: 'center',
                    title: '含税单价',
                    width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.taxPrice))
                    }
                },
                // {
                //     key: 'syncStatus',
                //     title: '同步状态',
                //     align: 'center',
                //     fixed:'right',
                //     width:120, 
                //     render(h, params) {
                //         let status = params.row.syncStatus.toUpperCase().trim();
                //         let ststusEnum = [
                //             {
                //                 label: '已同步',
                //                 value: 'ALREADY_SYNC'
                //             },
                //             {
                //                 label: '未同步',
                //                 value: 'NOT_SYNC'
                //             },
                //             {
                //                 label: '同步失败',
                //                 value: 'FAILED_SYNC'
                //             },]
                //         let label = '-';
                //         let item = ststusEnum.filter(s => s.value == status)
                //         if (item.length > 0) {
                //             label = item[0].label
                //         }
                //         return h('span', label)
                //     }
                // },
                // { key: 'failedMsg', align: 'center', title: '失败消息' ,width:120, fixed:'right'},
                {
                    key: 'remark',
                    title: '备注',
                    align: 'center',
                 //   fixed: 'right',
                    width: 250,
                    render(h, params) {
                        return h('Tooltip', {
                            // props: {
                            //     placement: 'left'
                            // }
                        }, [
                                h('div', {
                                    // style: {
                                    //     width: "40px",
                                    //     overflow: "hidden",
                                    //     textOverflow: "ellipsis",
                                    //     whiteSpace: "nowrap"
                                    // }
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
                    align: 'center',
                    fixed: 'left',
                },
                // {
                //     width: 100,
                //     key: 'id',
                //     fixed: 'left',
                // },
                {
                    key: 'repeatStatus',
                    align: 'center',
                    title: '重复状态',
                    width: 120,
                //    fixed: 'left',
                    render(h, params) {
                        return h('span', params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                    }
                },
                
                 {
                    key: 'communityName',
                    title: '社区名称',
                    align: 'center',
                    width: 120,
                },
                  { key: 'payerNumber', align: 'center', title: '客户（供应商）编码', width: 120, },
                 {
                    key: 'customerName',
                    title: '客户姓名',
                    align: 'center',
                    width: 120,
                },
                {
                    key: 'companyNumberName',
                    title: '财务组织名单',
                    align: 'center',
                    width: 120,
                },

                {
                    key: 'bizDate',
                    title: '业务日期',
                    align: 'center',
                    width: 110,
                    render(h, params) {
                        let time = dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(params.row.bizDate))
                        return h('span', time)
                    }
                },
                {  key: 'amount', align: 'center', title: '金额', width: 120,
                    render: function (h, params) {
                        return h('span', {}, utils.thousand(params.row.amount))
                    }
                },

                // { key: 'bizPerson', align: 'center', title: '业务员姓名' },
                { key: 'companyNumber', align: 'center', title: '财务组织编码', width: 120, },
              //  { key: 'contractNumber', align: 'center', title: '合同编号', width: 120, },
                { key: 'coreBillNumber', align: 'center', title: '核心单据号', width: 120, },
                { key: 'costCenterNumber', align: 'center', title: 'OP系统的社区编码', width: 180, },
                //   { key: 'currency', align: 'center', title: '币别' },
                { key: 'number', align: 'center', title: '唯一交易编码', width: 120, },
               // { key: 'payerAccountBank', align: 'center', title: '付款账号', width: 120, },
                {
                    key: 'payerType',
                    align: 'center',
                    title: '付款人类型',
                    width: 120,
                    render(h, params) {
                        let payer = params.row.payerType;
                        return h('span', payer.toUpperCase().trim() == 'CUSTOMER' ? '客户' : '供应商')
                    }
                },
                { key: 'recAccountBank', align: 'center', title: '银行收款账号', width: 180 },
                { key: 'recBillTypeDesc', align: 'center', title: '收款类型', width: 120, },
                { key: 'settlementTypeDesc', align: 'center', title: '结算方式', width: 120, },
                // { key: 'syncDataId', title: '同步记录id' },
                // {
                //     key: 'syncStatus',
                //     align: 'center',
                //     title: '同步状态',
                //     fixed:'right',
                //     width:120,
                //     render(h, params) {
                //         let status = params.row.syncStatus.toUpperCase().trim();
                //         let ststusEnum = [
                //             {
                //                 label: '已同步',
                //                 value: 'ALREADY_SYNC'
                //             },
                //             {
                //                 label: '未同步',
                //                 value: 'NOT_SYNC'
                //             },
                //             {
                //                 label: '同步失败',
                //                 value: 'FAILED_SYNC'
                //             },]
                //         let label = '-';
                //         let item = ststusEnum.filter(s => s.value == status)
                //         if (item.length > 0) {
                //             label = item[0].label
                //         }
                //         return h('span', label)
                //     }

                // },

                //     { key: 'failedMsg', align: 'center', title: '失败消息' ,width:120, fixed:'right'},
                {
                    key: 'remark',
                    title: '备注',
                    align: 'center',
                    width: 250,
                    render(h, params) {
                        return h('Tooltip', {
                            // props: {
                            //     placement: 'left'
                            // }
                        }, [
                                h('div', {
                                    style: {
                                        //   width: "40px",
                                        //   overflow: "hidden",
                                        //   textOverflow: "ellipsis",
                                        //   whiteSpace: "nowrap"
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
        this.getMainBody();
    },
    watch: {
        isAllSelect: function (newVal, old) {
            if (newVal !== old) {
                // 重置本地状态 
                this.selectIdsInPages = [];
                this.unSelectIdsInPages = [];
                this.notSelectInAllSelectState = [];
                this.selectedIdsInNotAllSelectState = [];
            }
        },
    },
    methods: {
        // handleTest() {
        //     if (this.syncType === 'INCOME') {
        //         this.syncType = 'PAYMENT'
        //         this.syncDataId = 81
        //     } else {
        //         this.syncType = 'INCOME'
        //         this.syncDataId = 117
        //     }
        //     this.getListData()
        // },
        // handleTestNotCheckAll() {
        //     this.isAllSelect = false;
        // },
         // 主体 
        getMainBody(){
            this.$http.get('krspace-op-web-fna-corporation').then((response)=>{
              this.fileList = response.data;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        filterData(val) {
            this.params.page = 1
            this.getListData();
        },
        getRouterQueryParmas() {
            let { query } = this.$route;
            this.syncDataId = query.syncId
            this.startTime = query.startTime
            this.endTime = query.endTime
            this.syncType = query.syncType
        },
        getListData() {
            let parmas = Object.assign({}, this.params)
            parmas.syncDataId = this.syncDataId;
            let api = 'get-sync-income-data-list'
            this.data = [];
            if (this.syncType === 'INCOME') {
                let { companyNumber, bizType, materialNumber, coreBillNumber, contractNumber, repeatStatus } = this.formItem
                let p = { companyNumber, bizType, materialNumber, coreBillNumber, contractNumber, repeatStatus }
                p.syncDataId = this.syncDataId
                if (this.isAllSelect) {
                    p.ids = this.notSelectInAllSelectState
                }
                else {
                    p.ids = this.selectedIdsInNotAllSelectState
                }
                parmas = Object.assign({}, parmas, p)
                this.columns = [].concat(this.syncDataIncomeDetailColums)
                api = 'get-sync-income-data-list'
            } else if (this.syncType === 'PAYMENT') {
                let { number, payerType, coreBillNumber, repeatStatus } = this.formItem
                let p = { number, payerType, coreBillNumber, repeatStatus }
                p.syncDataId = this.syncDataId
                if (this.isAllSelect) {
                    p.ids = this.notSelectInAllSelectState
                }
                else {
                    p.ids = this.selectedIdsInNotAllSelectState
                }
                parmas = Object.assign({}, parmas, p)
                this.columns = [].concat(this.syncDataPaymentDetailColums)
                api = 'get-sync-payment-data-list'
            }
            // 祛除值为空的 删选条件 
            for(var key in parmas){
                if(!parmas[key]){
                    delete parmas[key]
                }
            }
            this.$http.post(api, parmas)
                .then(r => {
                    if(!r.data.pages){
                        this.$Notice.warning({
                        title: r.data
                    });
                  //  return;
                    }
                    this.selectIdsInPages.length = r.data.pages
                    this.unSelectIdsInPages.length = r.data.pages
                    this.totalRecordCount = r.data.total
                    let data = [].concat(r.data.items)
                    this.data = [].concat(data)
                })
                .then(() => {
                    console.log(22322);
                    if (this.isAllSelect) {
                        let arr = this.unSelectIdsInPages[Number(this.currentPage)];
                        if (!arr || !arr.length) {
                            this.$refs.selection.selectAll(true);
                        }
                    }
                }).then(() => {
                    let data = [].concat(this.data)
                    if (this.isAllSelect) {
                        console.log('this.unSelectIdsInPages', this.unSelectIdsInPages)
                        let unselected = this.unSelectIdsInPages[Number(this.currentPage)]
                        if (unselected && unselected.length > 0) {
                            data.map(item => {
                                unselected.includes(item.id) ? item._checked = false : item._checked = true
                            })
                        }
                        else {
                            data.map(item => {
                                item._checked = true
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
                .catch(error => {
                    this.$Notice.error({
                        title: error.message
                    });
                })

        },
        onPageChange(index) {
            let params = this.params;
            params.page = index;
            this.getListData();
            this.currentPage = index;
        },
        //切换为全选模式   只有被选为true的时候触发 
        handleSelectAll() {
            this.isAllSelect = true;
          //  console.log(this.isAllSelect, '只有全选状态置为true的时候才触发');
            this.notSelectInAllSelectState = [];
        },
        //全选模式下  勾选单项时触发  被选为true的时候 触发 
        handleSelect(selection, row) {
            console.log('选中单项被选中时才触发');
            if (this.isAllSelect) {  // 先取消 之后再选中 
                let id = row.id;
                let index = this.notSelectInAllSelectState.findIndex(item => item == id)
                if (index != -1) {
                    this.notSelectInAllSelectState.splice(index, 1)
                //    console.log("notSelectInAllSelectState", this.notSelectInAllSelectState)
                }
            }
        },
        //全选模式下 取消勾选某一项   取消选中的时候触发 
        handleSelectCancel(selection, row) {
            console.log('取消单项时触发');
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
                // console.log("notSelectInAllSelectState", this.notSelectInAllSelectState)
                // console.log("unSelectIdsInPages", this.unSelectIdsInPages)
            }
        },
        // 非全选模式下
        handleSelectChange(selection) {
            console.log('只要发生变化就会触发', selection);
            if (!selection.length) {
                this.isAllSelect = false;
            }
            if (!this.isAllSelect) {
                this.selectedIdsInNotAllSelectState = selection.map(item => item.id)
                this.selectIdsInPages[Number(this.currentPage)] = [].concat(this.selectedIdsInNotAllSelectState)
                console.log("selectedIdsInNotAllSelectState", this.selectedIdsInNotAllSelectState)
            }

        },
        handlePrivious() {
            this.$router.push({path:'/bill/king-dee/sync-data/createSyncOne'});
        },
        handleSync(formItem) {
            let api = ''
            let parmas = {};
            if (this.isAllSelect) {
                if (this.syncType === 'INCOME') {
                    api = 'post-sync-income-data-ids'
                    let { companyNumber, bizType, materialNumber, coreBillNumber, contractNumber, repeatStatus } = formItem
                    parmas = { companyNumber, bizType, materialNumber, coreBillNumber, contractNumber, repeatStatus }
                    parmas.syncDataId = this.syncDataId
                    parmas.ids = this.notSelectInAllSelectState
                } else if (this.syncType === 'PAYMENT') {
                    api = 'post-sync-payment-data-ids'
                    let { number, payerType, coreBillNumber, repeatStatus } = formItem
                    parmas = { number, payerType, coreBillNumber, repeatStatus }
                    parmas.syncDataId = this.syncDataId
                    parmas.ids = this.notSelectInAllSelectState
                }
            } else {
                api = 'post-sync-select-data-ids'
                parmas.syncDataId = this.syncDataId
                parmas.dataIds = this.selectedIdsInNotAllSelectState
            }

            this.$http.post(api, parmas)
                .then(r => {
                    this.isAllSelect = false
                    this.openLoading = true;
                    this.loopSuccess();
                })
                .catch(error => {
                    console.log(error)
                    this.isAllSelect = false
                    this.$Notice.error({
                        title: error.message
                    });
                })

        },
        //获取同步状态
        loopSuccess() {
            console.log("hhhhhh")
            this.$http.get('get-sync-findSyncStatus-loop', {
                syncDataId: this.$route.query.syncId,
            })
                .then(r => {
                    console.log(r, "ppppppp")
                    if (r.data.syncStatus == "ALREADY_SYNC") {
                        this.titleMessage = '同步成功';
                        this.$Notice.success({ title: '同步成功' });
                        setTimeout(() => {
                            this.openLoading = false;
                            window.location.href = '/bill/king-dee/sync-data';
                        }, 2000);
                        return;
                    }
                    if (r.data.syncStatus == 'FAILED_SYNC') {
                        this.titleMessage = '同步失败';
                        this.$Notice.error({
                            title: r.data.failedMsg
                        });
                        setTimeout(() => {
                            this.openLoading = false;
                            this.$router.replace({ path: '/bill/king-dee/sync-data/data-sync-view', query: { type: this.syncType, syncDataId: this.syncDataId } });
                            //  window.location.reload();
                        }, 2000);
                        // this.openLoading = false;
                        // this.$Notice.error({
                        //     title: '同步失败'
                        // });
                        return;
                    }
                    setTimeout(() => {
                        this.loopSuccess();
                    }, 1000)
                    // this.openLoading = false;
                    // alert("8888888")
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
