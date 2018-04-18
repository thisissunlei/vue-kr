<template>
    <div class="create-new-order">
        <SectionTitle title="新建换租订单"  v-if="orderStatus=='create'"></SectionTitle>
        <div class="create-order creat-order-form" v-if="orderStatus=='create'">

            <Steps :current="status" status="process" style="margin-bottom:20px">
                <Step :title="returnTitle(0)" content="客户信息页"></Step>
                <Step :title="returnTitle(1)" content="原工位选择页"></Step>
                <Step :title="returnTitle(2)" content="新工位选择页"></Step>
                <Step :title="returnTitle(3)" content="服务费信息页"></Step>
            </Steps>
            <Card id="step-one" v-show="status==0">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem style="width:252px" label="客户名称" class="bill-search-class" prop="customerId">
                            <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers>
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                    @on-change="changeCommunity"
                                >
                                    <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="saleTime">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTime" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="reason"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="primary" @click="next('formItemOne')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-two" v-if="status==1">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <Form ref="formItemTwo" :model="formItem" :rules="ruleValidateTwo" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="换租服务开始日：" class="bill-search-class" prop="beginTime">
                                <DatePicker type="date" placeholder="换租服务开始日：" v-model="formItem.beginTime" @on-change="changeBeginTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        
                        <Col >
                            <div class="header">
                                <span class="select">
                                    <Checkbox v-model="selectAllChecked" @on-change="selectAll"></Checkbox>
                                </span>
                                <span class="header-name">
                                    工位编号/房间名称
                                </span>
                                <span class="header-name">产品类型</span>
                                <span class="header-name">原服务开始日</span>
                                <span class="header-name">原服务结束日</span>
                                <span class="header-name">预更换服务期</span>
                            </div>
                            <div class="station-table" v-for="(item,index) in oldStation" :key="item.seatId" v-bind:class="{error: item.timeType=='error' }">
                                <span class="select">
                                    <Checkbox v-model="item.checked" @on-change="selectRow" :disabled="item.disabled"></Checkbox>
                                </span>
                                <span class="header-name">
                                    {{item.seatName}}
                                </span>
                                <span class="header-name">
                                {{item.seatType=='SPACE'?'独立办公室':'开放工位'}}</span>
                                <span class="header-name">{{item.startDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name">{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name" v-if="item.checked == false || !formItem.beginTime">--</span>
                                <span class="header-name" v-if="item.checked == true && formItem.beginTime">{{formItem.beginTime| dateFormat('YYYY-MM-dd')}}至{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
                            </div>
                           
                        </Col>
                        <Col>
                            <div class="error" v-show="errorObj.oldStation == true">请选择要更换的原工位</div>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons" style="margin-top:20px">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next('formItemTwo')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-three" v-if="status==2">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <Form ref="formItemThree" :model="formItem" :rules="ruleValidateThree" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="换租服务开始日" class="bill-search-class" >
                                <DatePicker type="date" placeholder="换租服务开始日" v-model="formItem.beginTime" style="width:252px" :disabled="disabledValue"></DatePicker >
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="换租服务结束日" class="bill-search-class" prop="endDate"> 
                                 <DatePicker type="date" placeholder="换租服务结束日" v-model="formItem.endDate" @on-change="changeEndTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                    </Row>
                    <!-- 选择工位 -->
                    <Row>
                        <Button type="primary" @click="openPlanMap">选择工位</Button>

                    </Row>

                    
                    <!-- 设置免租 -->
                    <Row>
                        <Col class="sale-tactics">

                            <div style="display:inline-block">
                                <span v-for="types in discount.list" :key="types.sale" class="button-list" v-on:click="selectDiscount(types)" v-bind:class="{active:discountType==types.sale}">{{ types.sale }}折</span>
                            </div>
                            <div style="display:inline-block;vertical-align:top">
                            <Input v-model="discountNum" :placeholder="'最大折扣'+discount.minDiscount+'折'" style="width: 120px;" ></Input>
                            <span style="padding:0 15px"> 天</span>
                            <Button type="primary" @click="setfreeMap">设置</Button>

                            </div>


                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div class="title">签约价明细</div>
                            <Table :columns="signPriceColumns" :data="selecedStationList"></Table>
                        </Col>
                    </Row>
                    <!-- 设置折扣 -->
                    <Row>
                        <Col class="sale-tactics">

                            <div style="display:inline-block">
                                <span v-for="types in freeMap.list" :key="types.month" class="button-list" v-on:click="selectFree(types)" v-bind:class="{active:freeType==types.month}">赠{{ types.month }}个月</span>
                            </div>
                            <div style="display:inline-block;vertical-align:top">
                            <Input v-model="freeDays" :placeholder="'最大允许赠送'+freeMap.maxDays+'天'" style="width: 120px;" ></Input>
                            <span style="padding:0 15px"> 天</span>
                            <Button type="primary" @click="setfreeMap">设置</Button>

                            </div>


                        </Col>
                    </Row>

                    <Row>  
                        <Col class="col">
                            <span class="required-label" style="width:252px;padding:11px 12px 10px 4px;color:#666;display:block">付款周期</span>
                                <div style="display:block;min-width:252px">
                                    <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                                </div>
                                <div class="pay-error" v-if="errorObj.payType">请选择付款方式</div>

                         </Col>
                         <Col class="col" style="max-width:560px">
                            <span class="required-label"  style="width:252px;padding:11px 12px 10px 4px;color:#666;display:block">服务保证金</span>
                                <div style="display:block;min-width:252px">
                                    <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.value)" v-bind:class="{active:depositAmount==types.value}" >{{ types.label }}</span>
                                </div>
                                <div class="pay-error" v-if="errorObj.deposit">请选择履约保证金总额</div>
                         </Col>
                        
                        <Col class="col" style="margin-top:10px">
                            <FormItem label="首付款日期" class="bill-search-class" prop="firstDate"> 
                                 <DatePicker type="date" placeholder="开始时间" v-model="formItem.firstDate" @on-change="changeFirstTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next('formItemThree')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-four" v-if="status==3">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <Form ref="formItemFour" :model="formItem" :rules="ruleValidateFour" class="demo-m" label-position="top">
                     <Row>  
                        <Col>
                            <FormItem label="旧工位信息">
                                <Table :columns="oldStationInfo" :data="oldStationData"></Table>
                            </FormItem>
                        </Col>
                        
                        <Col >
                            <FormItem label="新工位信息"> 
                                <Table :columns="newStationInfo" :data="newStationData"></Table>
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="退还服务费" style="width:252px">
                                <Input 
                                    v-model="formItem.back" 
                                    placeholder="旧服务保证金转新"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="旧服务保证金转新" style="width:252px" prop="oldChangeNew">
                                 <Input 
                                    v-model="formItem.money" 
                                    placeholder="旧服务保证金转新"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="扣除服务保证金" class="bill-search-class" > 
                                <Input 
                                    v-model="formItem.back" 
                                    placeholder="扣除服务保证金"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="submit">提交</Button>
                    
                </div>
            </Card>
        </div>
        <Modal
            v-model="showMap"
            title="选择工位"
            ok-text="保存"
            cancel-text="取消"
            width="90%"
            class-name="vertical-center-modal"
         >
            <planMap :floors.sync="floors" :params.sync="params" :stationData.sync="stationData" @on-result-change="onResultChange" v-if="showMap"></planMap>
            <div slot="footer">
                <Button type="primary" @click="submitStation">确定</Button>
            </div>
        </Modal>
        <div class="view" v-if="orderStatus=='view'">
            <ReplaceView @editCards="editCard"/>
        </div>
    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle.vue'
    import SelectSaler from '~/components/SelectSaler.vue'
    import ReplaceView from '../replaceView.vue'
    import selectCustomers from '~/components/SelectCustomers.vue'
    import dateUtils from 'vue-dateutils';
    import planMap from '~/components/PlanMap.vue';




    export default {
        data() {
            const validateChangeTime = (rule, value, callback) => {
                var today = new Date()
                today = today.setDate(today.getDate()+1);
                today = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(today))
                today = new Date(today).getTime()
                if (value === '') {
                    callback(new Error('请先选择换租服务开始日'));
                } else if(value.getTime() < today){
                    callback(new Error('换租服务开始日不得小于等于今日'));
                }else if(value.getTime() > this.oldStation[0].endDate){
                     callback(new Error('换租服务开始日不得大于原结束日期'));
                }else{
                     callback();
                }
            };
            const validateFirst = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先选择首付款日期'));
                } else if(value > this.formItem.beginTime){
                    callback(new Error('首付款日期不能大于换租服务开始日'));
                }else{
                     callback();
                }
            };
            const validateEndDate = (rule, value, callback) => {
                console.log('validateEndDate---------',value,'==',this.formItem.beginTime)
                if (value === '') {
                    callback(new Error('请先选择换租服务结束日'));
                } else if(value < this.formItem.beginTime){
                    callback(new Error('换租服务结束日不能小于换租服务开始日'));
                }else{
                     callback();
                }
            };
            return {
                // 新选择的工位
                stationData:{
                    submitData:[],
                    deleteData:[],
                },
                selecedStationList:[],
                signPriceColumns:[
                    {
                        title: '工位编号/房间名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '产品类型',
                        key: 'seatType',
                        align: 'center'
                    },
                    {
                        title: '指导价(元/月/房间)',
                        key: 'seatName',
                        align: 'center'
                    },
                    {
                        title: '下单价(元/月/房间)',
                        key: 'seatName',
                        align: 'center'
                    },
                    {
                        title: '优惠',
                        key: 'seatName',
                        align: 'center'
                    },
                    {
                        title: '签约价',
                        key: 'seatName',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteDtation(params.index)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                showMap:false,
                params:{},
                floors:[],//楼层数
                //付款周期
                payList:[
                    {value:'ONE',label:'月付'},
                    {value:'TWO',label:'两月付'},
                    {value:'THREE',label:'季付'},
                    {value:'SIX',label:'半年付'},
                    {value:'TWELVE',label:'年付'},
                    {value:'ALL',label:'全款'},
                ],
                //付款周期的值
                installmentType:'',
                depositAmount:'',
                //折扣列表
                discount:{},
                freeMap:{},
                freeDays:'',
                freeType:'',
                discountType:'',
                discountNum:'',
                // 服务保证金
                depositList:[
                    {label:'2个月',value:'2'},
                    {label:'3个月',value:'3'},
                    {label:'4个月',value:'4'},
                    {label:'5个月',value:'5'},
                    {label:'6个月',value:'6'},
                ],
                //订单模式（create：创建中；view：预览）
                orderStatus:'create',
                showHeader:true,
                //不可编辑
                disabledValue:true,
                //错误提示
                errorObj:{
                    oldStation:false,
                    payType:false,
                    deposit:false,
                },
                status:0,
                rows:4,
                oldEndTime:new Date(),
                //优惠信息
                saleList:[],
                salerName:'请选择',
                //选中的原有工位
                selectedOldStation:[],
                //表单数据
                formItem:{
                    saleTime:new Date(),
                    beginTime:new Date(),
                },
                getFloor:new Date(),
                //全选
                selectAllChecked:false,
                //step1校验规则
                ruleValidateOne:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    customerId:[
                        { required: true, message: '请填写客户名称'},
                    ],
                    salerId:[
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    saleTime:[
                        { required: true, type: 'date',message: '请选择销售时间', trigger: 'change' }
                    ],
                    reason:[
                        { required: true, message: '请填写换租原因', trigger: 'blur' }
                    ]
                },
                ruleValidateTwo:{
                    beginTime:[
                        { required: true, trigger: 'change' ,validator: validateChangeTime},
                    ]
                },
                ruleValidateFour:{
                    oldChangeNew:[
                        { required: true, message: '请填写', trigger: 'blur' }

                    ],

                },
                ruleValidateThree:{
                    endDate:[
                        { required: true, trigger: 'change',validator:validateEndDate }
                    ],
                    firstDate:[
                        { required: true,  trigger: 'change' ,validator:validateFirst}
                    ]

                },
                communityList:[{
                    label:'1',
                    value:'111'
                }],
                oldStation:[],
                oldStationInfo:[
                    {
                        title: '减少服务费',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '已交服务费中涉及到更换的金额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '已交保证金涉及到更换的金额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                ],
                oldStationData:[],
                newStationInfo:[
                    {
                        title: '服务费总额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '服务保证金',
                        key: 'reduceMoney',
                        align:'center'
                    },
                ],
                newStationData:[],

                


            }
        },

        head() {
            return {
                title: '新建换租订单'
            }
        },
        components: {
            SectionTitle,
            SelectSaler,
            selectCustomers,
            ReplaceView,
            planMap
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            GLOBALHEADERSET('订单合同');
            this.getSaleList()
        },
        watch:{
            getFloor(){
                let _this = this;
                if(this.formItem.communityId && this.formItem.customerId){
                    let params = {
                        // communityId:this.formItem.communityId || 4,
                        communityId:4,

                        customerId:1715
                        // customerId:this.formItem.customerId
                    }
                     this.$http.get('get-community-floor', params).then( r => {
                        _this.floors = r.data.floor;
                        _this.ssoId = r.data.ssoId;
                        _this.ssoName = r.data.ssoName;
                        if(!_this.formItem.salerId){
                            _this.formItem.salerId = JSON.stringify(r.data.ssoId);
                            _this.salerName = r.data.ssoName

                        }

                    }).catch( e => {
                        _this.$Notice.error({
                            title:e.message
                        });

                    })
                }
           },
        },
        methods: {
            changeSaler(value){
                this.formItem.salerId = value;
            },
            changeSaleTime(value){
                this.formItem.saleTime = value;
            },
            getSelectedOldStation(){
                this.selectedOldStation = this.oldStation.filter(item=>{
                    if(item.checked){
                        return true;
                    }
                    return false
                })
            },
            next(name){

                if(name == 'formItemTwo'){
                    this.getSelectedOldStation()
                    if(!this.selectedOldStation.length){
                        this.errorObj.oldStation = true;
                    }else{
                        this.errorObj.oldStation = false;
                    }
                }
                if(this.errorObj.oldStation){
                    return
                }
                this.$refs[name].validate((valid) => {
                    if(valid){
                        if(name == 'formItemOne'){
                            this.getOldStation()

                        }
                        if(name == 'formItemTwo'){
                            this.getSelectedOldStation()
                            if(!this.selectedOldStation.length){
                                this.errorObj.oldStation = true;
                            }else{
                                this.errorObj.oldStation = false;
                            }

                        }
                        if(name == 'formItemThree'){
                            if(!this.installmentType){
                                this.errorObj.payType = true;
                            }
                            if(!this.depositAmount){
                                this.errorObj.deposit = true;
                            }
                        }
                        let next = true;
                        for(let i in this.errorObj){
                            if(this.errorObj[i]){
                                next = false
                            }
                        }


                        if(next){
                            this.status ++ ;
                        }
                        
                       

                    }
                })
            },
            previous(){
                this.status -- ;
            },
            returnTitle(value){
                let title = '未进行';
                if(value == this.status){
                    title = '进行中'
                }else if(value<this.status){
                    title = '已完成'
                }else{
                    title = '未进行'
                }
                return title;
            },
            submit(){
                this.orderStatus = 'view'
            },
            editCard(value){
                this.orderStatus = 'create';
                this.status = value;
            },
            changeCustomer(value){
                this.formItem.customerId = value;
                console.log('changeCustomer',value)
            },
            changeCommunity(value){
                console.log('changeCommunity',value)
                // 选择社区
                if(value){
                    this.formItem.communityId = 64 || value;
                    this.getSaleList()
                }else{
                    this.formItem.communityId = '';
                }
                //清除step1以后所有内容
                //
                //
                this.getFloor = +new Date()
            },
            //获取原有工位数据
            getOldStation(){
                this.$http.get('join-bill-detail', {id:10551}).then( r => {
                    this.oldStation = r.data.orderSeatDetailVo.map(item=>{
                        item.checked = false;
                        item.disabled = true;
                        return item
                    })
                }).catch( e => {
                    console.log('error',e)
                })
            },
            changeBeginTime(value){
                //TODO 联调时需修改判断条件

                //出发更新列表中的欲更换信息
                var today = new Date()
                this.selectAllChecked = false;
                today = today.setDate(today.getDate()+1);
                today = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(today))
                today = new Date(today).getTime()
                //选择日期小于当前日+1或大于原服务结束日，否则全部不可选
                // if(new Date(value).getTime()<today || new Date(value).getTime()>this.oldStation[0].endDate){
                //     this.oldStation = this.oldStation.map((item,index)=>{
                //         item.checked = false;
                //         return item
                //     })
                //     return
                // }

                    this.oldStation = this.oldStation.map((item,index)=>{
                            item.checked = false;
                            //判断当前已选工位是否符合开始时间
                            // if(value<item.startDate || value>item.endDate){
                            if(new Date(value).getTime()<today  ){
                                item.disabled = true;
                                item.timeType='error';
                                this.errorObj.errorRow = true;
                            }else{
                                item.disabled = false;
                                item.timeType='';
                                this.errorObj.errorRow = false;
                            }
                        // item._checked = true设置为选中状态
                        return item
                    })

            },
            selectRow(status){
                if(!status){
                    this.selectAllChecked = false;
                }
            },
            selectAll(status){
                this.selectAllChecked = status;
                this.oldStation = this.oldStation.map(item=>{
                    item.checked = status;
                    return item;
                })
                
            },
            changeEndTime(value){
                //换租结束时间
            },
            selectPayType:function(value){
                // 选择付款方式
                this.installmentType = value;
                this.errorObj.payType = false;
            },
            selectDeposit:function(value){
                // 选择保证金
                this.depositAmount = value
                this.errorObj.deposit = false;
            },
            changeFirstTime(){

            },
            getSaleList(){//获取优惠信息
                var list = [
                    {
                        "discountList": [
                            8,
                            8.5,
                            9
                        ],
                        "minDiscount": 8.5,
                        "tacticsType": 1
                    },
                    {
                        "freeMap": {
                            "1": {
                                "31": 1546272000000
                            },
                            '2':{
                                "30":1546272000000
                            }
                        },
                        "tacticsType": 3,
                        "maxDays":61
                    }
                ];
                let discount = []
                discount = list.filter(item=>{
                    if(item.discountList){
                        return true;
                    }
                    return false
                })
                let freeMap = []
                freeMap = list.filter(item=>{
                    if(item.freeMap){
                        return true;
                    }
                    return false
                })
                let discountList = discount[0].discountList; 
                let discountArray = []
                for(let i in discountList){
                    let obj = {};
                    obj.sale = discountList[i];
                    discountArray.push(obj)

                }
                //折扣列表
                this.discount = {
                    list:discountArray,
                    minDiscount:discount[0].minDiscount,
                    tacticsType:discount[0].tacticsType
                }
                // 处理免租数据
                let freeMapList = freeMap[0].freeMap;
                let freeMapContent = []
                // let list = []
                for(let i in freeMapList){
                    let obj = {}
                    obj.month = i;
                    obj.days = Object.keys(freeMapList[i])[0];
                    obj.date = freeMapList[i][Object.keys(freeMapList[i])[0]]
                    freeMapContent.push(obj)
                }
                //免租列表
                this.freeMap = {
                    tacticsType:freeMap[0].tacticsType,
                    maxDays:freeMap[0].maxDays,
                    list:freeMapContent
                }
                console.log('getSaleList---free',this.freeMap)
                console.log('getSaleList--discount',this.discount)
            },
            selectFree(obj){
                this.freeType = obj.month;
                this.freeDays = obj.days;

            },
            setfreeMap(){
                //设置免租天数
            },
            selectDiscount(obj){
                this.discountType = obj.sale;
                this.discountNum = obj.sale
            },
            openPlanMap(){
                if(!this.formItem.endDate){
                    this.$Notice.error({
                        title:'请先选择换租服务结束日'
                    })
                    return
                }
                let floor = this.floors.map(item=>{
                    return item.value
                })
                let params = {
                    floor:floor.join(','),
                    // communityId:this.formItem.communityId,
                    communityId:4,
                    mainBillId:null,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.beginTime)),
                    time:+new Date(),
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate))
                }
                this.params = params;
                this.showMap = true;
            },
            onResultChange:function(val){//组件互通数据的触发事件
                this.stationData = val;
            },
            cancelStation:function(){//工位弹窗的取消
                this.stationData = {
                    submitData:this.selecedStationList,
                    deleteData:[],
                };
                this.showMap = false

            },
            submitStation:function(){//工位弹窗的提交
                this.showMap = false;
                this.selecedStationList = this.stationData.submitData;
                console.log('submitStation',this.selecedStationList)


            },
            deleteDtation(index){
                console.log('deleteDtation',index)
            }

        }
    }


</script>
<style lang="less" scoped> 
    .create-order{
        padding:30px 40px;
        .buttons{
            text-align: center;
            margin:10px auto 30px;
        }
        .col{
            width:49%;
            display: inline-block;
            vertical-align: top;
            padding-right: 1%;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
        .ivu-card-head{
            background-color: rgb(247, 247, 247);
        }
        .error{
            color:red;
        }
        .header ,.station-table{
            width: 100%;
            height: 40px;
            display: flex;
            line-height: 40px;
            background-color:#f8f8f9;
            border:1px solid #e9eaec;
            .select{
                width:60px;
                display:inline-block;
                text-align:center;
            }
            .header-name{
                display: inline-block;
                word-wrap:normal;
                vertical-align: middle;
                white-space:nowrap;
                flex:1;
                overflow:hidden;
                text-align: center;
                // font-size: 12px;
                font-weight: 700;
                color:#495060;

            }
        }
        .error{
           .header-name{
            color:red;
           }
        }
        .station-table{
            background-color:#fff;
            border-top:none;
            .header-name{
                border-top:none;
                font-weight: 500;
            }
        }
        .required-label{
            font-size: 12px;
            position: relative;
            margin-left: 5px;
            padding-left: 4px;
            &:before{
                content:'*';
                color: red;
                position: absolute;
                font-size: 17px;
                font-weight: 100;
                left:-5px;
                top:11px;
            }
       } 
       .pay-error{
        color:#ed3f14;
        font-size: 12px;
       }
       .sale-tactics{
        text-align: right;
       }
        .button-list{
                font-size: 14px;
                color: #499df1;
                display: inline-block;
                border:1px solid #499df1;
                border-radius: 4px;
                margin-right: 5px;
                height: 32px;
                line-height: 32px;
                padding:0 14px;
                cursor: pointer;
                margin-bottom: 6px;
            }
            .active{
                background-color: #499df1;
                color: #fff;
            }

    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    
</style>
