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
                            <Select v-model="formItem.companyNumber" placeholder="选择出租方主体" class="form-item-input" @on-change='filterData' filterable clearable>
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
                <Button type="primary" class="btn" @click="startSync">开始同步</Button>
            </div>
        </div>
        <Modal v-model="openLoading" :title="titleMessage" :closable="false" :mask-closable="false">
            <div>
                <Loading />
            </div>
            <div slot="footer"></div>
        </Modal>
    
        <Modal v-model="confirmSend" title="提示"  :closable="false" :mask-closable="false">
            
            <div class="confimInfo">
                确认是否同步！
            </div>
            <div slot="footer">
                <Button type="primary" @click="confirm">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
            </div>
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
        props: {},
        data() {
            return {
                confirmSend:false,
                currentPage: 1,
                selectIdsInPages: [], //记录每一页勾选的状态ids [[id1,id2],[id3,id4]]
                unSelectIdsInPages: [], //记录每一页取消勾选的状态ids [[id1,id2],[id3,id4]]
                syncDataId: '',
                startTime: '',
                endTime: '',
                syncType: 'INCOME', //当前同步的类型 INCOME|PAYMENT
                isAllSelect: false, //是否全选
                notSelectInAllSelectState: [], //全选状态下取消勾选的id集合
                selectedIdsInNotAllSelectState: [], //非全选模式下 已选择的id集合
                openLoading: false,
                formItem: {},
                fileList: [],
                titleMessage: '等待同步中....',
                repeatStatusList: [{
                        label: '是',
                        value: 'IS_REPEAT'
                    },
                    {
                        label: '否',
                        value: 'NO_REPEAT'
                    },
                ],
                syncStateList: [{
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
                bizTypeList: [{
                        label: '普通销售',
                        value: 'SALES'
                    },
                    {
                        label: '普通销售退',
                        value: 'SALES_RETREAT'
                    },
                ],
                payerTypeList: [{
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
                syncDataIncomeDetailColums: [{
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
                            if (params.row.repeatStatus.toUpperCase() === 'IS_REPEAT') {
                                return h('span', {
                                    style: {
                                        color: 'red'
                                    }
                                }, params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                            }
                            return h('span', {}, params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                        }
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '主体',
                        key: 'companyNumberName',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '主体ID',
                        key: 'companyNumber',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '客户',
                        key: 'customerName',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '客户ID',
                        key: 'asstActNumber',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '收入类型',
                        key: 'materialNumberDesc',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '收入ID',
                        key: 'materialNumber',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '金额（含税）',
                        key: 'arAmount',
                        align: 'center',
                        width: 120,
                        render: function(h, params) {
                            return h('span', {}, utils.thousand(params.row.arAmount))
                        }
                    },
                    {
                        title: '税率',
                        key: 'taxRate',
                        align: 'center',
                        width: 120,
                    },
    
                    {
                        title: '税额',
                        key: 'taxAmount',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '金额（不含税）',
                        key: 'amount',
                        align: 'center',
                        width: 120,
                        render: function(h, params) {
                            return h('span', {}, utils.thousand(params.row.amount))
                        }
                    },
                    {
                        title: '确认日期',
                        key: 'bizDate',
                        align: 'center',
                        width: 150,
                        render(tag, params) {
                            let time = params.row.bizDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(params.row.bizDate)) : '-';
                            return tag('span', time)
                        }
                    },
                    {
                        title: '含税单价',
                        key: 'taxPrice',
                        align: 'center',
                        width: 120,
                        render: function(h, params) {
                            return h('span', {}, utils.thousand(params.row.taxPrice))
                        }
                    },
                    {
                        title: '不含税单价',
                        key: 'price',
                        align: 'center',
                        width: 120,
                        render: function(h, params) {
                            return h('span', {}, utils.thousand(params.row.price))
                        }
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'quantity',
                        width: 150,
                    },
                    {
                        title: '销售类型',
                        align: 'center',
                        key: 'bizTypeName',
                        width: 150,
                    },
                    {
                        title: '核心单据号',
                        key: 'coreBillNumber',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '唯一交易编码',
                        key: 'number',
                        align: 'center',
                        width: 150,
                    },
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
                            ])
                        }
                    },
                ],
                syncDataPaymentDetailColums: [{
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        key: 'repeatStatus',
                        align: 'center',
                        title: '重复状态',
                        width: 120,
                        //    fixed: 'left',
                        render(h, params) {
                            if (params.row.repeatStatus.toUpperCase() === 'IS_REPEAT') {
                                return h('span', {
                                    style: {
                                        color: 'red'
                                    }
                                }, params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                            }
                            return h('span', {}, params.row.repeatStatus.toUpperCase() === 'IS_REPEAT' ? '是' : '否')
                        }
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '主体',
                        key: 'companyNumberName',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '主体ID',
                        key: 'companyNumber',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '客户',
                        key: 'customerName',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '客户ID',
                        key: 'payerNumber',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '收款类型',
                        key: 'entrysRecBillNumberDesc',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '结算方式',
                        key: 'settlementTypeDesc',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '金额',
                        key: 'amount',
                        align: 'center',
                        width: 150,
                        render: function(h, params) {
                            return h('span', {}, utils.thousand(params.row.amount))
                        }
                    },
                    {
                        title: '回款日期',
                        key: 'bizDate',
                        align: 'center',
                        width: 150,
                        render(tag, params) {
                            let time = params.row.bizDate ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS", new Date(params.row.bizDate)) : '-';
                            return tag('span', time)
                        }
                    },
                    {
                        title: '唯一交易编码',
                        key: 'number',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '付款人类型',
                        key: 'payerTypeName',
                        align: 'center',
                        width: 150,
                    },
                    {
                        title: '收款账号',
                        key: 'recAccountBank',
                        align: 'center',
                        width: 150,
                    },
                    {
                        key: 'remark',
                        title: '备注',
                        align: 'center',
                        width: 250,
                        render(h, params) {
                            return h('Tooltip', {}, [
                                h('div', {}, params.row.remark || '-'),
                                h('div', {
                                    style: {
                                        wordWrap: "break-word"
                                    },
                                    slot: 'content'
                                }, params.row.remark || '-')
                            ])
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
            isAllSelect: function(newVal, old) {
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
            // 主体 
            getMainBody() {
                this.$http.get('krspace-op-web-fna-corporation').then((response) => {
                    this.fileList = response.data;
                }).catch((error) => {
                    this.openMessage = true;
                    this.MessageType = "error";
                    this.warn = error.message;
                })
            },
              startSync(){
                  this.confirmSend = true;
                // let form = this.formItem;
                // let result = this.data && this.data.some((item)=>item.repeatStatus === 'IS_REPEAT'); 
                // if(result){
                //     this.confirmSend = true;
                //     return;
                // }
                // this.handleSync(form);
            },
            confirm(){
                this.handleSync(this.formItem);
                this.cancel();
            },
            cancel(){
                this.confirmSend = false;
            },
            filterData(val) {
                this.params.page = 1
                this.getListData();
            },
            getRouterQueryParmas() {
                let {
                    query
                } = this.$route;
                this.syncDataId = query.syncId
                this.startTime = query.startTime
                this.endTime = query.endTime
                this.syncType = query.syncType
            },
            getListData() {
                let result_data;
                let parmas = Object.assign({}, this.params)
                parmas.syncDataId = this.syncDataId;
                let api = 'get-sync-income-data-list'
                this.data = [];
                if (this.syncType === 'INCOME') {
                    let {
                        companyNumber,
                        bizType,
                        materialNumber,
                        coreBillNumber,
                        contractNumber,
                        repeatStatus
                    } = this.formItem
                    let p = {
                        companyNumber,
                        bizType,
                        materialNumber,
                        coreBillNumber,
                        contractNumber,
                        repeatStatus
                    }
                    p.syncDataId = this.syncDataId
                    if (this.isAllSelect) {
                        p.ids = this.notSelectInAllSelectState
                    } else {
                        p.ids = this.selectedIdsInNotAllSelectState
                    }
                    parmas = Object.assign({}, parmas, p)
                    this.columns = [].concat(this.syncDataIncomeDetailColums)
                    api = 'get-sync-income-data-list'
                } else if (this.syncType === 'PAYMENT') {
                    let {
                        number,
                        payerType,
                        coreBillNumber,
                        repeatStatus
                    } = this.formItem
                    let p = {
                        number,
                        payerType,
                        coreBillNumber,
                        repeatStatus
                    }
                    p.syncDataId = this.syncDataId
                    if (this.isAllSelect) {
                        p.ids = this.notSelectInAllSelectState
                    } else {
                        p.ids = this.selectedIdsInNotAllSelectState
                    }
                    parmas = Object.assign({}, parmas, p)
                    this.columns = [].concat(this.syncDataPaymentDetailColums)
                    api = 'get-sync-payment-data-list'
                }
                // 祛除值为空的 删选条件 
                for (var key in parmas) {
                    if (!parmas[key]) {
                        delete parmas[key]
                    }
                }
                this.$http.post(api, parmas)
                    .then(r => {
                        result_data = !r.data.pages;
                        if (result_data) {
                            this.$Notice.warning({
                                title: r.data
                            });
                            return;
                        }
                        this.selectIdsInPages.length = r.data.pages
                        this.unSelectIdsInPages.length = r.data.pages
                        this.totalRecordCount = r.data.total
                        let data = [].concat(r.data.items)
                        this.data = [].concat(data)
                    })
                    .then(() => {
                        if (result_data) {
                            return;
                        };
                        if (this.isAllSelect) {
                            let arr = this.unSelectIdsInPages[Number(this.currentPage)];
                            if (!arr || !arr.length) {
                                this.$refs.selection.selectAll(true);
                            }
                        }
                    }).then(() => {
                        if (result_data) {
                            return;
                        };
                        let data = [].concat(this.data);
                        if (this.isAllSelect) {
                            console.log('this.unSelectIdsInPages', this.unSelectIdsInPages)
                            let unselected = this.unSelectIdsInPages[Number(this.currentPage)]
                            if (unselected && unselected.length > 0) {
                                data.map(item => {
                                    unselected.includes(item.id) ? item._checked = false : item._checked = true
                                })
                            } else {
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
                if (this.isAllSelect) { // 先取消 之后再选中 
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
                    } else {
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
                this.$router.push({
                    path: '/bill/king-dee/sync-data/createSyncOne'
                });
            },
          
            handleSync(formItem) {
                let api = ''
                let parmas = {};
                if (this.isAllSelect) {
                    if (this.syncType === 'INCOME') {
                        api = 'post-sync-income-data-ids'
                        let {
                            companyNumber,
                            bizType,
                            materialNumber,
                            coreBillNumber,
                            contractNumber,
                            repeatStatus
                        } = formItem
                        parmas = {
                            companyNumber,
                            bizType,
                            materialNumber,
                            coreBillNumber,
                            contractNumber,
                            repeatStatus
                        }
                        parmas.syncDataId = this.syncDataId
                        parmas.ids = this.notSelectInAllSelectState
                    } else if (this.syncType === 'PAYMENT') {
                        api = 'post-sync-payment-data-ids'
                        let {
                            number,
                            payerType,
                            coreBillNumber,
                            repeatStatus
                        } = formItem
                        parmas = {
                            number,
                            payerType,
                            coreBillNumber,
                            repeatStatus
                        }
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
    
                this.$http.get('get-sync-findSyncStatus-loop', {
                        syncDataId: this.$route.query.syncId,
                    })
                    .then(r => {
    
                        if (r.data.syncStatus == "ALREADY_SYNC") {
                            this.titleMessage = '同步成功';
                            this.$Notice.success({
                                title: '同步成功'
                            });
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
                                this.$router.replace({
                                    path: '/bill/king-dee/sync-data/data-sync-view',
                                    query: {
                                        type: this.syncType,
                                        syncDataId: this.syncDataId
                                    }
                                });
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
        .confimInfo{
            font-size: 14px;
        }
    }
</style>
