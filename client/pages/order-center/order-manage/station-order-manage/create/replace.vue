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
                            <selectCustomers name="formItem.customerId" :onchange="changeCustomer" :labelInValue="labelInValue"></selectCustomers>
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
                                    :label-in-value='labelInValue'
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
                            <FormItem label="销售时间" style="width:252px" prop="signDate">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.signDate" @on-change="changeSaleTime" style="width:252px"></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class"> 
                                <Input 
                                    v-model="formItem.replaceMemo" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                    :maxlength="replaceMemoLength"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="primary" @click="next('formItemOne')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-two" v-show="status==1">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <Form ref="formItemTwo" :model="formItem" :rules="ruleValidateTwo" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="换租服务开始日：" class="bill-search-class" prop="leaseBegindate">
                                <DatePicker type="date" placeholder="换租服务开始日：" v-model="formItem.leaseBegindate" @on-change="changeBeginTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        
                        <Col >
                            <div class="header">
                                <span class="select">
                                    <Checkbox v-model="selectAllChecked" @on-change="selectAll" :disabled="selectAllAbled"></Checkbox>
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
                                    {{item.seatNum}}
                                </span>
                                <span class="header-name">
                                {{item.seatType=='SPACE'?'独立办公室':'开放工位'}}</span>
                                <span class="header-name">{{item.startDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name">{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name" v-if="item.checked == false ">--</span>
                                <span class="header-name" v-if="item.checked == true">{{formItem.leaseBegindate | dateFormat('YYYY-MM-dd')}}至{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
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
            <Card id="step-three" v-show="status==2">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <Form ref="formItemThree" :model="formItem" :rules="ruleValidateThree" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="换租服务开始日" class="bill-search-class" >
                                <DatePicker type="date" placeholder="换租服务开始日" v-model="formItem.leaseBegindate" style="width:252px" :disabled="disabledValue"></DatePicker >
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="换租服务结束日" class="bill-search-class" prop="leaseEnddate"> 
                                 <DatePicker type="date" placeholder="换租服务结束日" v-model="formItem.leaseEnddate" @on-change="changeEndTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                    </Row>
                    <!-- 选择工位 -->
                    <Row style="margin-bottom:30px">
                        <Button type="primary" @click="openPlanMap">选择工位</Button>

                    </Row>

                    
                    <!-- 设置折扣 -->
                    <Row style="margin-bottom:10px">
                        <Col style='display:inline-block;width:30%'>
                            <div class="title">签约价明细</div>
                        </Col>
                        <Col class="sale-tactics" style='display:inline-block;width:70%' v-if="discount.list.length && selecedStationList.length">

                            <div style="display:inline-block">
                                <span v-for="types in discount.list" :key="types.sale" class="button-list" v-on:click="selectDiscount(types)" v-bind:class="{active:discountType==types.sale}">{{ types.sale }}折</span>
                            </div>
                            <div style="display:inline-block;vertical-align:top">
                            <Input v-model="discountNum" :placeholder="'最大折扣'+discount.minDiscount+'折'" style="width: 120px;" @on-blur="checkDiscount" :maxlength="maxlength"></Input>
                            <span style="padding:0 15px"> 折</span>
                            <Button type="primary" @click="setDiscountNum">设置</Button>

                            </div>


                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Table :columns="signPriceColumns" :data.sync="selecedStationList"></Table>
                        </Col>
                    </Row>
                    <!-- 设置免租 -->
                    <Row style="margin-top:30px;margin-bottom:10px;"> 
                        <Col style='display:inline-block;width:30%'>
                             <div class="title">服务费明细</div>
                        </Col>
                        <Col class="sale-tactics" style='display:inline-block;width:70%' v-if="freeMap.list.length && selecedStationList.length">

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
                        <Col>
                           
                            <Table :columns="serviceDetailsColumns" :data="serviceDetailsList"></Table>
                        </Col>
                    </Row>

                    <Row>  
                        <Col class="col">
                            <span class="required-label" style="width:252px;padding:11px 12px 10px 4px;color:#666;display:block">付款周期</span>
                                <div style="display:block;min-width:252px">
                                    <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types)" v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                                </div>
                                <div class="pay-error" v-if="errorObj.payType">请选择付款方式</div>

                         </Col>
                         <Col class="col" style="max-width:560px">
                            <span class="required-label"  style="width:252px;padding:11px 12px 10px 4px;color:#666;display:block">服务保证金</span>
                                <div style="display:block;min-width:252px">
                                    <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.value)" v-bind:class="{active:deposit==types.value}" >{{ types.label }}</span>
                                </div>
                                <div class="pay-error" v-if="errorObj.deposit">请选择履约保证金总额</div>
                         </Col>
                        
                        <Col class="col" style="margin-top:10px">
                            <FormItem label="首付款日期" class="bill-search-class" prop="firstPayTime"> 
                                 <DatePicker type="date" placeholder="开始时间" v-model="formItem.firstPayTime" @on-change="changeFirstTime" style="width:252px" ></DatePicker >
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
            <Card id="step-four" v-show="status==3">
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
                                    v-model="formItem.changeServiceFee" 
                                    placeholder="退还服务费"
                                    style="width: 252px"
                                    :disabled="disabledValue"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="旧服务保证金转新" style="width:252px" prop="transferDepositAmount">
                                 <Input 
                                    v-model="formItem.transferDepositAmount" 
                                    placeholder="旧服务保证金转新"
                                    style="width: 252px"
                                    @on-blur="getBack"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="扣除服务保证金" class="bill-search-class" > 
                                <Input 
                                    v-model="back" 
                                    placeholder="扣除服务保证金"
                                    style="width: 252px"
                                    :disabled="disabledValue"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="submit('formItemFour')">提交</Button>
                    
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
            <ReplaceView @editCards="editCard" :data.sync="overViewData"/>
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
    import Buttons from '~/components/Buttons';

    // 新建换租订单步骤说明
    // step：1
    // 选择客户名称->根据客户带出相对应的社区；其他为必填项；
    // 点击下一步时：根据所选社区，客户，获取其名下的所有工位
    // step：2
    // steep3:
    // 1）选择工位后出现优惠选项
    // 2）选择工位点击确认后 ，发送一个获取服务费明细的请求；
    // 3）修改-下单价，会重新获取签约价明细（getStationAmount）和服务费明细（getSeatCombin）
    // 4）修改优惠内容，点击设置，验证优惠是否合法，
    // 若合法，拼优惠saleList数组，
    // 然后重新重新获取签约价明细（getStationAmount）和服务费明细（getSeatCombin

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
                }else if(value.getTime() > this.oldStation[0].leaseEnddate){
                     callback(new Error('换租服务开始日不得大于原结束日期'));
                }else{
                     callback();
                }
            };
            const validateFirst = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先选择首付款日期'));
                } else if(value > this.formItem.leaseBegindate  ){
                    callback(new Error('首付款日期不能大于换租服务开始日'));
                }else{
                     callback();
                }
            };
            const validateEndDate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先选择换租服务结束日'));
                } else if(value < this.formItem.leaseBegindate  ){
                    callback(new Error('换租服务结束日不能小于换租服务开始日'));
                }else{
                     callback();
                }
            };
            return {
                labelInValue:true,
                replaceMemoLength:500,
                overViewData:{},
                maxlength:3,
                selectAllAbled:false,
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
                        align: 'center',
                        render:(h,params)=>{
                            let type = '开放工位';
                            if(params.row.seatType == 'SPACE'){
                                type = '独立房间';
                            }else{
                                type = '开放工位';
                            }
                            return type;
                        }
                    },
                    {
                        title: '指导价(元/月/房间)',
                        key: 'guidePrice',
                        align: 'center'
                    },
                    {
                        title: '下单价(元/月/房间)',
                        key: 'guidePrice',
                        align: 'center',
                        render: (h, params) => {
                            let price = params.row.guidePrice;
                            
                            return h('Input', {
                                    props: {
                                        min:params.row.guidePrice,
                                        value:params.row.originalPrice ||params.row.guidePrice ,
                                    },
                                    on:{
                                        'on-change':(event)=>{
                                            let e = event.target.value;
                                            if(isNaN(e)){
                                                e = params.row.guidePrice
                                            }
                                            price = e;
                                        },
                                        'on-blur':()=>{
                                            var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                                            if(price && !pattern.test(price)){
                                                this.$Notice.error({
                                                    title:'单价不得多余小数点后两位'
                                                })
                                                var num2=Number(price).toFixed(3);
                                                price = num2.substring(0,num2.lastIndexOf('.')+3) 
                                            }
                                            if(price<params.row.guidePrice){
                                                price = params.row.guidePrice
                                                this.$Notice.error({
                                                    title:'单价不得小于'+params.row.guidePrice
                                                })
                                            }
                                            this.changePrice(params.index,price)
                                        }
                                    }
                                },'44')
                        }
                    },
                    {
                        title: '优惠',
                        key: 'saleNum',
                        align: 'center'
                    },
                    {
                        title: '签约价',
                        key: 'discountedPrice',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return  h(Buttons, {
                                    props: {
                                        type: 'text',
                                        label:'删除',
                                        checkAction:'seat_order_view',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                           this.deleteDtation(params.index)
                                        }
                                    }
                                })
                        }
                    }
                ],
                serviceDetailsList:[],
                serviceDetailsColumns:[
                    {
                        title: '工位编号/房间名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '服务开始日',
                        key: 'seatType',
                        align: 'center',
                        render: (h, params) => {
                            return dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseBegindate))
                        }
                    },
                    {
                        title: '服务结束日',
                        key: 'seatPrice',
                        align: 'center',
                        render: (h, params) => {
                            return dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseEnddate))
                        }
                    },
                    {
                        title: '不计算服务费区间',
                        key: 'freeStartDate',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.freeStartDate){
                                return dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.freeStartDate))+'至'+dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseEnddate))
                            }else{
                                return '暂无免租'
                            }
                            
                        }

                    },
                    {
                        title: '签约价',
                        key: 'signPrice',
                        align: 'center'
                    },
                    {
                        title: '金额',
                        key: 'totalRent',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return  h(Buttons, {
                                    props: {
                                        type: 'text',
                                        label:'明细',
                                        checkAction:'seat_order_view',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    on: {
                                        click: () => {
                                           this.getServiceDetail(params.row)
                                        }
                                    }
                                })
                        }
                    }
                ],
                showMap:false,
                params:{},
                floors:[
                    {value: "2", label: "2"},
                    {value: "3", label: "3"},
                    {value: "4", label: "4"},
                ],//楼层数
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
                deposit:'',
                //折扣列表
                discount:{
                    list:[]
                },
                freeMap:{
                    list:[]
                },
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
                    selecedStation:false,
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
                    signDate:new Date(),
                    leaseBegindate:'',
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
                    signDate:[
                        { required: true, type: 'date',message: '请选择销售时间', trigger: 'change' }
                    ],
                    replaceMemo:[
                        { required: true, message: '请填写换租原因', trigger: 'blur' }
                    ]
                },
                ruleValidateTwo:{
                    leaseBegindate  :[
                        { required: true, trigger: 'change' ,validator: validateChangeTime},
                    ]
                },
                ruleValidateFour:{
                    transferDepositAmount:[
                        { required: true, message: '请填写', trigger: 'blur' }

                    ],

                },
                ruleValidateThree:{
                    leaseEnddate:[
                        { required: true, trigger: 'change',validator:validateEndDate }
                    ],
                    firstPayTime:[
                        { required: true,  trigger: 'change' ,validator:validateFirst}
                    ]

                },
                communityList:[],
                oldStation:[],
                oldStationInfo:[
                    {
                        title: '减少服务费',
                        key: 'reduceServiceFee',
                        align:'center'
                    },
                    {
                        title: '已交服务费中涉及到更换的金额',
                        key: 'changeServiceFee',
                        align:'center'
                    },
                    {
                        title: '已交保证金涉及到更换的金额',
                        key: 'changeDeposit',
                        align:'center'
                    },
                ],
                oldStationData:[],
                newStationInfo:[
                    {
                        title: '服务费总额',
                        key: 'totalServiceFee',
                        align:'center'
                    },
                    {
                        title: '服务保证金',
                        key: 'totalDeposit',
                        align:'center'
                    },
                ],
                newStationData:[],
                watchServiceDetail:new Date(),
                freeStartDate:'',
                back:0,
                changeThree:new Date(),

                


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
           watchServiceDetail(){
            this.getSeatCombin()
           },
           changeThree(){
            this.clearFormFour()
           }
        },
        methods: {
            changeSaler(value){
                this.formItem.salerId = value;
            },
            changeSaleTime(value){
                this.formItem.signDate = value;
            },
            getSelectedOldStation(){
                this.selectedOldStation = this.oldStation.filter(item=>{

                    if(item.checked){
                        item.changeBegin = this.formItem.leaseBegindate;
                        return true;
                    }
                    return false
                })
            },
            next(name){
                if(name == 'formItemTwo'){
                    if(!this.selectedOldStation.length){
                        this.errorObj.oldStation = true;
                    }else{
                        this.errorObj.oldStation = false;
                    }
                }
                if(this.errorObj.oldStation){
                    return
                }
                console.log('next',this.$refs.formItemThree)

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
                            if(!this.deposit){
                                this.errorObj.deposit = true;
                            }

                            if(!this.selecedStationList.length){
                                this.errorObj.selecedStation = true;
                                this.$Notice.error({
                                    title:'请选择换租工位'
                                })
                            }else{
                                this.errorObj.selecedStation = false;
                            }
                            this.getSeatReplaceDetail()
                        }
                        let next = true;
                        for(let i in this.errorObj){
                            if(this.errorObj[i]){
                                next = false
                            }
                        }

                        if(!next){
                            return;
                        }
                        this.status ++ ;
                       

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
            resetForm(name){
                this.$refs[name].resetFields()
                if(name == 'formItemThree'){
                    this.clearFormThree()
                }
            },
            submit(name){
                //合并表单数据
                let overViewData = Object.assign({},this.formItem);
                // 新选工位选择后的线管数据（step4表格相关内容）
                overViewData.newStationData = this.newStationData;
                // 开始，结束日期字段转换
                overViewData.endDate = this.formItem.leaseEnddate
                overViewData.startDate = this.formItem.leaseBegindate;
                // 要更换的旧工位
                overViewData.oldSeatList = this.selectedOldStation;
                // 优惠列表
                overViewData.saleList = this.saleList;

                //**付款周期，保证金月数
                overViewData.installmentType = this.installmentType;
                overViewData.installmentName = this.installmentName;

                overViewData.deposit = this.deposit;
                // 新选工位
                overViewData.seats= this.selecedStationList;

                overViewData.signDate=this.formItem.signDate;
                overViewData.discount = this.discountNum;
                overViewData.freeStartDate = this.freeStartDate || this.formItem.leaseBegindate;
                overViewData.firstPayTime = this.formItem.firstPayTime;
                overViewData.back = this.back;//扣除服务保证金
                // step3第二个table数据 
                let serviceDetailsList =this.serviceDetailsList.map(item=>{
                    item.startDate = dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseBegindate));
                    item.endDate = dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseEnddate));
                    return item;
                })
                overViewData.serviceDetailsList = serviceDetailsList;
                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.orderStatus = 'view'
                        this.overViewData = overViewData
                    }
                })
                
            },
            editCard(value){
                this.orderStatus = 'create';
                this.status = value;
            },
            changeCustomer(value){
                console.log('changeCustomer',value)
                this.formItem.customerId = value.value;
                this.formItem.customerName = value.label;
                if(value.value){
                    this.getCustomerToCom()
                }
            },
            getCustomerToCom(){
                let params = {
                    customerId:this.formItem.customerId
                }
                this.$http.get('get-community-from-cusList', params).then((response) => {
                        this.communityList = response.data.map(item=>{
                            item.value = ''+item.id;
                            item.label = item.name;
                            return item
                        });
                }).catch( (error) => {
                    alert('社区错了')
                    this.communityList = []
                    this.$Notice.error({
                        title:error.message
                    })

                })
            },
            clearStepData(){
                this.formItem.leaseBegindate     = '';
                this.selectedOldStation=[];
            },
            changeCommunity(value){
                // 选择社区
                if(value.value){
                    this.formItem.communityId =value.value;
                    this.formItem.communityName =value.label;
                }else{
                    this.formItem.communityId = '';
                    this.formItem.communityName = '';
                }
                //清除step1以后所有内容
                //清除step2数据
                this.clearStepData()
                //
                //
                this.getFloor = +new Date()
            },
            //获取原有工位数据
            getOldStation(){
                let params = {
                    communityId:this.formItem.communityId,
                    customerId:this.formItem.customerId
                }
                if(this.selectedOldStation.length){
                    return;
                }
                this.$http.get('get-order-seat', params).then( r => {
                    this.selectAllAbled = true;
                    this.oldStation = r.data.map(item=>{
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
                this.selectAllAbled = false;
                today = today.setDate(today.getDate()+1);
                today = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(today))
                today = new Date(today).getTime()
                //选择日期小于当前日+1或大于原服务结束日，否则全部不可选
                if(new Date(value).getTime()<today){
                    this.selectAllAbled = true;
                    this.oldStation = this.oldStation.map((item,index)=>{
                        item.checked = false;
                        item.disabled = true;
                        return item
                    })
                    return
                }

                    this.oldStation = this.oldStation.map((item,index)=>{
                            item.checked = false;
                            //判断当前已选工位是否符合开始时间
                            if(value<item.startDate || value>item.endDate){
                                item.disabled = true;
                                this.selectAllAbled = true;
                                this.errorObj.errorRow = true;
                            }else{
                                item.disabled = false;
                                this.errorObj.errorRow = false;
                            }
                        return item
                    })
                //清除step3的数据
                // this.resetForm('formItemThree')
                this.clearFormThree()

            },
            selectRow(status){
                if(!status){
                    this.selectAllChecked = false;
                }
                this.getSelectedOldStation()
            },
            selectAll(status){
                this.selectAllChecked = status;
                this.oldStation = this.oldStation.map(item=>{
                    item.checked = status;
                    return item;
                })
                this.getSelectedOldStation()
                
            },
            changeEndTime(value){
                if(!value){
                    return;
                }
                //换租结束时间
                this.getSaleList(value)
                this.changeThree = new Date()
                if(this.selecedStationList.length){
                    this.clearFormThree()

                }
            },
            clearFormThree(){
                this.selecedStationList = [];
                this.discountType = '';
                this.freeType = '';
                this.discountNum = '';
                this.freeDays = '';
                this.serviceDetailsList = []
            },
            clearFormFour(){
                this.back = '';
                this.formItem.transferDepositAmount = ''
            },
            selectPayType:function(value){
                // 选择付款方式
                this.installmentType = value.value;
                this.changeThree = new Date()
                this.installmentName = value.label;
                this.errorObj.payType = false;
            },
            selectDeposit:function(value){
                // 选择保证金
                this.deposit = value
                this.changeThree = new Date()
                this.errorObj.deposit = false;
            },
            changeFirstTime(){

            },
            getSaleList(value){//获取优惠信息
                let params = {
                    start:dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(this.formItem.leaseBegindate)),
                    end:dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(value)),
                    communityId:this.formItem.communityId

                }
                this.$http.post('get-free-sale', params, r => {
                    this.dealSale(r.data)
                    console.log('list',r.data)
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });

                })

                return;
                
            },
            dealSale(list){
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
                    tacticsType:discount[0].tacticsType,
                    tacticsId:discount[0].tacticsId
                }
                if(!freeMap.length){
                    return
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
                    maxDays:freeMap[0].maxFreeDays,
                    list:freeMapContent,
                    tacticsId:freeMap[0].tacticsId

                }
            },
            selectFree(obj){
                this.freeType = obj.month;
                this.freeDays = obj.days;

            },
            //设置免租天数
            setfreeMap(){
                let free = this.freeDays;
                let checkResult = this.checkFreeMap() //1.数字2.小于最大天数
                // if(!checkResult){
                //     return
                // }
                let params = {
                    communityId:this.formItem.communityId,
                    days:this.freeDays,
                    end:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    start:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                }
               
                //3.获取免租开始日期
                
                this.$http.post('get-free-start-date', params).then( r => {
                    this.freeStartDate = r.data.freeStartDate;
                    //4.设置优惠列表（saleList）
                    this.setFreeDays(r.data.freeStartDate)
                }).catch( e => {

                })
                
            },
            // 检验免租天数1.数字2.小于最大天数3.是正整数
            checkFreeMap(){
                let value = this.freeDays;
                if(isNaN(value)){
                    this.$Notice.error({
                        title:'免租天数必须为数字'
                    })
                    this.freeDays = this.freeMap.maxDays;
                    return false;
                }
                var pattern =/^[0-9]*[1-9][0-9]*$/;
                if(value && !pattern.test(value)){
                    this.$Notice.error({
                        title:'免租天数必须是整数'
                    })
                    this.freeDays = this.freeMap.maxDays;
                    return false;
                }
                if(value>this.freeMap.maxDays){
                    this.$Notice.error({
                        title:'免租天数不得大于9.9'
                    })
                    this.freeDays = this.freeMap.maxDays;
                    return false;
                }
                return true
            },
            setFreeDays(start){
                if(!this.freeDays){
                    this.$Notice.error({
                        title:'请先选择免租天数'
                    })
                    return
                }
                let list = this.saleList;
                list = list.filter(item=>{
                    if(item.tacticsType == this.freeMap.tacticsType){
                        return false;
                    }
                    return true;
                })
                let freeObj = {
                    discount:'',
                    tacticsType:this.freeMap.tacticsType,
                    validEnd:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    validStart:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(start)),
                    tacticsId:this.freeMap.tacticsId
                }
                list.push(freeObj);
                this.saleList = list;
                //设置折扣后，更新列表
                this.getSaleAmount(list)
            },
            setDiscountNum(){
                if(!this.discountNum){
                    this.$Notice.error({
                        title:'请先选择折扣'
                    })
                    return
                }
                let list = this.saleList;
                list = list.filter(item=>{
                    if(item.tacticsType == this.discount.tacticsType){
                        return false;
                    }
                    return true;
                })
                let discountObj = {
                    discount:this.discountNum,
                    tacticsType:this.discount.tacticsType,
                    validEnd:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    validStart:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    tacticsId:this.discount.tacticsId
                }
                list.push(discountObj);
                this.saleList = list;
                //设置折扣后，更新列表
                this.getSaleAmount(list)
            },
            //设置优惠后，获取签约价明细
            getSaleAmount(list){

                this.watchServiceDetail = new Date()
                let params = {
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    communityId:this.formItem.communityId,
                    seats:JSON.stringify(this.selecedStationList),
                    saleList:JSON.stringify(list || [])
                }
                let _this = this;
                this.changeThree = new Date()

                this.$http.post('count-sale', params).then( r => {
                    _this.selecedStationList = r.data.seats.map(item=>{
                        let obj = item;
                        //TODO 周一联调删除
                        obj.guidePrice = item.guidePrice;
                        obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                        obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                        obj.belongType = item.seatType;
                        obj.saleNum = this.discountNum || '-';
                        obj.floor = item.whereFloor || item.floor;
                        obj.seatPrice = item.guidePrice || item.seatPrice;
                        obj.discountedPrice = item.discountedPrice;
                        return obj;
                    });

                }).catch( e => {
                        _this.$Notice.error({
                            title:e.message
                        })

                })
            },
            selectDiscount(obj){
                this.discountType = obj.sale;
                this.discountNum = obj.sale
            },
            openPlanMap(){
                if(!this.formItem.leaseEnddate){
                    this.$Notice.error({
                        title:'请先选择换租服务结束日'
                    })
                    return
                }
                if(this.formItem.leaseBegindate > this.formItem.leaseEnddate){
                     this.$Notice.error({
                        title:'换租服务开始日不能大于换租服务结束日'
                    })
                    return
                }
                let floor = this.floors.map(item=>{
                    return item.value
                })
                let params = {
                    floor:floor.join(','),
                    communityId:this.formItem.communityId,
                    mainBillId:null,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    time:+new Date(),
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate))
                }
                this.params = params;
                console.log('open',this.selecedStationList )
                this.stationData.submitData = this.selecedStationList || []
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
                console.log('submitStation',this.stationData.submitData)
                this.selecedStationList = this.stationData.submitData.map(item=>{
                    item.guidePrice = item.seatPrice || item.guidePrice;
                    item.discountedPrice = item.seatPrice;
                    item.floor = item.whereFloor || item.floor;
                    item.seatId = item.id;
                    item.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    item.saleNum = this.discountNum || '--'
                    item.endDate=dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate))
                    return item;;
                });
                this.watchServiceDetail = new Date();
                this.changeThree = new Date()
                this.saleList = []
                this.discountNum = '';
                this.freeDays = ''
            },
            // 获取step3的服务费用明细
            getSeatCombin(){
                let params = {
                    communityId:this.formItem.communityId,
                    leaseBegindate :dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    saleList:JSON.stringify(this.saleList || []),
                    seats:JSON.stringify(this.selecedStationList)
                }

                this.$http.post('get-seat-combin', params).then( r => {
                    this.serviceDetailsList = r.data.items.map(item=>{
                        item.freeStartDate = this.freeStartDate || '';
                        return item;
                    });

                }).catch( e => {
                    this.$Notice.error({
                        title:e.message
                    });

                })

            },
            deleteDtation(index){
                this.selecedStationList.splice(index,1);
                this.getStationAmount()
            },
            getServiceDetail(item){
                console.log('getServiceDetail',item)
            },
            changePrice(index,price){
                this.selecedStationList = this.selecedStationList.map((item,i)=>{
                    if(i == index){
                        item.originalPrice = price;
                    }else{
                        item.originalPrice = item.originalPrice || item.seatPrice; 
                    }
                    return item
                })
                this.getStationAmount()
            },
            getStationAmount(list){
                //判断标准单价是否有值，若无值，则不提交计算总价
                let originalPrice = false;
                let val = list || this.selecedStationList;
                let station = val.map(item=>{
                    let obj = item;
                    obj.guidePrice = item.guidePrice || item.seatPrice || 0;

                    obj.originalPrice = (!item.originalPrice && item.originalPrice !==0 && obj.guidePrice == 0)?'':(item.originalPrice || obj.guidePrice);

                    obj.seatId = item.id || item.seatId;
                    obj.floor = item.whereFloor || item.floor;
                    obj.endDate =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate));
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate));
                    if(item.originalPrice === ''){
                        originalPrice = true;
                    }
                    obj.floor = item.whereFloor;
                    return obj;
                })
                if(originalPrice){
                    return
                }
                this.watchServiceDetail = new Date()
                let params = {
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    communityId:this.formItem.communityId,
                    seats:JSON.stringify(station),
                    saleList:JSON.stringify(this.saleList)
                }
                this.changeThree = new Date()

                this.$http.post('count-sale', params).then( r => {
                    this.selecedStationList = r.data.seats.map(item=>{
                        let obj = item;
                        //TODO 周一联调删除
                        obj.guidePrice = item.guidePrice;
                        obj.seatPrice = item.guidePrice;
                        obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                        obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                        obj.belongType = item.seatType;
                        obj.saleNum = this.discountNum || '-';
                        obj.floor = item.whereFloor || item.floor;
                        obj.discountedPrice = item.discountedPrice;
                        return obj;
                    });

                }).catch( e => {
                        this.$Notice.error({
                            title:e.message
                        })

                })
            },
            checkDiscount(){
                let value = this.discountNum;
                console.log('checkDiscount======',value,typeof value)
                if(isNaN(value)){
                    this.$Notice.error({
                        title:'折扣必须为数字'
                    })
                    this.discountNum = this.discount.minDiscount;
                    return;
                }
                var pattern =/^[1-9]+(.[0-9]{1})?$/;
                if(value && !pattern.test(value)){
                    this.$Notice.error({
                        title:'折扣不得多余小数点后一位'
                    })
                    return;
                }
                if(value<this.discount.minDiscount){
                    this.$Notice.error({
                        title:'单价不得小于'+this.discount.minDiscount
                    })
                    this.discountNum = this.discount.minDiscount;
                    return;
                }
                if(value>9.9){
                    this.$Notice.error({
                        title:'单价不得大于9.9'
                    })
                    this.discountNum = this.discount.minDiscount;
                    return;
                }
            },
            getSeatReplaceDetail(){
                let list = this.selecedStationList.map(item=>{
                    item.signPrice = item.discountedPrice;
                    return item;
                })
                let time = '';
                if(!this.freeStartDate){
                    time = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate))
                }else{
                    time = new Date(this.freeStartDate);
                    time = time.setDate(time.getDate()-1);

                    time = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(time))


                }
                let params = {
                    deposit:this.deposit,
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    newSeats:JSON.stringify(list),
                    oldSeats:JSON.stringify(this.selectedOldStation),
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    realEndDate:time,
                    orderId:10718

                }
                this.$http.post('get-seat-replace-detail', params).then((response) => {
                    let list = []
                    list.push(response.data)
                    this.oldStationData = list;
                    this.newStationData =list;
                    this.formItem.changeServiceFee = response.data.changeServiceFee;

                }).catch( (error) => {
                    this.status = 2;
                    this.$Notice.error({
                        title:error.message
                    })
                     
                })
            },
            getBack(){
                let value = this.formItem.transferDepositAmount;
                let changeDeposit = this.newStationData[0].changeDeposit;
                if(isNaN(value)){
                    this.$Notice.error({
                        title:'旧服务保证金转新金额必须为数字'
                    })
                    this.formItem.transferDepositAmount ='';
                    this.back = ''
                    return;
                }

                var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                if(value && !pattern.test(value)){
                    this.$Notice.error({
                        title:'旧服务保证金转新金额不得多余小数点后两位'
                    })
                    this.formItem.transferDepositAmount = '';
                    this.back = ''
                    return;

                }
                if(value>=changeDeposit){
                    this.$Notice.error({
                        title:'旧服务保证金转新金额不得大于'+changeDeposit
                    })
                    this.formItem.transferDepositAmount = '';
                    this.back = ''
                    return;
                }
                let back = (changeDeposit -this.formItem.transferDepositAmount).toFixed(2);
                this.back = back;
                
            },
        }
    }


</script>
<style lang="less"> 
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
                font-size: 12px;
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
                font-weight: 300;
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
        .title{
            font-weight: 600;
            padding:10px 0;
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
