<template>
    <div class="create-new-order">
        <SectionTitle title="新建换租订单"  v-if="orderStatus=='create'"></SectionTitle>
        <div class="create-order creat-order-form" v-if="orderStatus=='create'">

<!-- start 步骤条 -->
            <Steps :current="status" status="process" style="margin-bottom:20px">
                <Step :title="returnTitle(0)" content="客户信息页"></Step>
                <Step :title="returnTitle(1)" content="原工位选择页"></Step>
                <Step :title="returnTitle(2)" content="新工位选择页"></Step>
                <Step :title="returnTitle(3)" content="服务费信息页"></Step>
            </Steps>
<!-- end 步骤条 -->

<!-- start 基本信息 -->
            <Card id="step-one" v-show="status==0">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem style="width:252px" label="客户名称" class="bill-search-class" prop="customerId">
                            <selectCustomers types="ajax" name="formItem.customerId" :onchange="changeCustomer" :labelInValue="labelInValue" :value="formItem.customerName"></selectCustomers>
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
                                    placeholder="请输入换租原因"
                                    style="width: 252px"
                                    type="textarea"
                                    :maxlength="replaceMemoLength"
                                />
                            </FormItem>
                        </Col>
                        <!-- 补充信息 -->
                        <Col class="col">
                            <FormItem label="居间方" class="bill-search-class" prop="intermediaryName"> 
                                <Input  v-model="formItem.intermediaryName"   style="width: 252px"/>
                            </FormItem>
                        </Col>
                        <!-- 补充信息 -->
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="primary" @click="next('formItemOne')">下一步</Button>
                </div>
            </Card>
<!-- end 基本信息 -->

<!-- start 原工位信息 -->
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
                            <div class="station-table" v-for="(item,index) in oldStation" :key="item.seatId+index">
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
<!-- end 原工位信息 -->

<!-- start 新工位信息 -->
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
                    <Row style="margin-bottom:0">
                        <div class="title">价格明细</div>
                        <Button type="primary" style="margin-right:20px;font-size:14px" @click="openPlanMap">添加商品</Button>
                        <Button type="primary" style="margin-right:20px;font-size:14px" @click="deleteSelectedDtation">删除商品</Button>
                        <Button type="primary" style="margin-right:20px;font-size:14px" @click="entryPrice">批量填写单价</Button>
                        <Button type="primary" style="margin-right:20px;font-size:14px" @click="openDiscountButton">批量填写折扣</Button>
                    </Row>

                    <Row style="margin:10px 0">
                            <Col span="24">
                              <Table
                                border=""
                                ref="selection"
                                :columns="signPriceColumns"
                                :data="selecedStationList"
                                @on-selection-change="selectStationEvent"
                              ></Table>
                              <div class="total-money" v-if="selecedStationList.length">
                                <div class="left" >
                                  <span>折扣原因：</span>
                                  <Input style="width:400px" :maxlength="200" v-model="formItem.discountReason"/>
                                </div>
                                <div class="right">
                                  <span>服务费总计</span>
                                  <span class="money">{{stationAmount | thousand}}</span>
                                  <span class="money">{{stationAmount|amountInWords}}</span>
                                </div>
                              </div>
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
<!-- end 新工位信息 -->

<!-- start 服务费明细 -->
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
                            <FormItem label="旧服务保证金转新(剩余扣除)" style="width:252px" prop="transferDepositAmount">
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
<!-- end 服务费明细 -->

        </div>

        
<!-- start 服务费明细弹窗 -->
        <Modal
            v-model="openService"
            title="服务费明细"
            ok-text="保存"
            cancel-text="取消"
            width="90%"
            class-name="vertical-center-modal"
         >
           <div class="content">
               
               <div class="header" style="font-size:14px;">
                   <span class="left">
                      {{detailService.seatType =='SPACE'?'独立房间':'独立工位'}} {{detailService.codeName}}
                   </span>
                   <span class="right" style="float:right">
                       ￥{{detailService.totalAmount | thousand}}
                   </span>
               </div>
               <Table :columns="serviceColumns" style="margin:10px 0" :data="detailService.details"></Table>
           </div>
            <div slot="footer">
                <Button type="primary" @click="cancel">确定</Button>
            </div>
        </Modal>
<!-- end 服务费明细弹窗 -->

<!-- start 选择工位弹窗 -->
        <Modal
            v-model="showMap"
            title="选择工位"
            ok-text="保存"
            cancel-text="取消"
            width="90%"
            class-name="vertical-center-modal"
         >
            <ListAndMap :params.sync="params" :floors.sync="floors" :stationData.sync="stationData"  @on-result-change="onResultChange" v-if="showMap"/>
            <div slot="footer">
                <Button type="primary" @click="submitStation">下一步</Button>
            </div>
        </Modal>
<!-- end 选择工位弹窗 -->

<!-- start 批量录入单价弹窗 -->
         <Modal
            v-model="openPrice"
            title="录入单价"
            ok-text="保存"
            cancel-text="取消"
            width="300px"
            class-name="vertical-center-modal"
         >
           <div v-if="openPrice">
                <span style="display:inline-block;height:32px;line-height:32px"> 工位单价： </span>
                <Input v-model="price" placeholder="工位单价" style="width:150px" ></Input>
                <span style="display:block;height:32px;line-height:32px;color:red" v-if="priceError">{{priceError}}</span>
                    
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitPrice">确定</Button>
                <Button  @click="cancelPrice">取消</Button>
            </div>
        </Modal>
<!-- end 批量录入单价弹窗 -->

<!-- start 批量录入折扣弹窗 -->
        <Modal v-model="openDiscount"
            title="批量填写折扣"
            ok-text="保存"
            cancel-text="取消"
            class-name="vertical-center-modal">
            <div v-if="openDiscount">
                <span style="display:inline-block;height:32px;line-height:32px"> 签约折扣: </span>
                <Input v-model="batchDiscount"
                    placeholder="签约折扣"
                    style="width:150px"></Input>
                <span style="display:block;height:32px;line-height:32px;color:red"
                    v-if="batchDiscountError">{{batchDiscountError}}</span>

            </div>
            <div slot="footer">
                <Button type="primary"
                    @click="submitDiscount">批量填写</Button>
                <Button @click="openDiscount=false">取消</Button>
            </div>
        </Modal>
<!-- end 批量录入折扣弹窗 -->

        <div class="view" v-if="orderStatus=='view'">
            <ReplaceView @editCards="editCard" :showEdit="editCardabled"  :data.sync="overViewData"/>
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
    import utils from '~/plugins/utils';
    import ListAndMap from '../listAndMap';
    import editStationPriceData from "../listData/editStationPriceData"

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
        head () {
            return {
                title: "新建换租订单-氪空间后台管理系统"
            }
        },
        data() {
            const validateIntermediaryName = (rule, value, callback) => {
            if (String(value).length > 50) {
                callback(new Error('居间方名称不能超过50个字符'));
            } else {
                callback();
            }
        };
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
                intermediaryName:'',// 居间方
                openDiscount:false,
                batchDiscount: '',
                batchDiscountError: '',
                stationAmount:'',//服务费总计
                discountCon:'',
                entryPriceList:[],
                openPrice:false,
                priceError:'',
                price:'',
                editCardabled:true,
                openService:false,
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
                signPriceColumns:editStationPriceData.call(this),
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
                        align: 'center',
                        render: (h, params) => {
                            return '￥'+utils.thousand(params.row.totalRent)
                        }
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
                    intermediaryName:'',// 居间方
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
                    ],
                    intermediaryName: [
                    { trigger: 'blur', validator: validateIntermediaryName }
                        ]
                },
                ruleValidateTwo:{
                    leaseBegindate  :[
                        { required: true, trigger: 'change' ,validator: validateChangeTime},
                    ]
                },
                ruleValidateFour:{
                    transferDepositAmount:[
                        { required: true, message: '请填写正确的金额', trigger: 'blur' }

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
                        title: '退还服务费',
                        key: 'changeServiceFee',
                        align:'center'
                    },
                    {
                        title: '工位已交保证金',
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
                detailService:{
                    codeName:'',
                    details:[],
                    totalAmount:'',
                    seatType:''
                },
                serviceColumns:[
                    {
                        title: '服务期',
                        key: 'reduceServiceFee',
                        align: 'center',
                        render:(h,params)=>{
                            return dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.start_date)) +'~'+dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.end_date))
                        }
                    },
                    {
                        title: '服务费计算说明',
                        key: 'calculat_descr',
                        align: 'center'
                    },
                    {
                        title: '单价',
                        key: 'unit_price',
                        align: 'center'
                    },
                    {
                        title: '数量',
                        key: 'count',
                        align: 'center'
                    },
                    {
                        title: '小计',
                        key: 'amount',
                        align: 'right',
                        render: (h, params) => {
                            return '￥'+utils.thousand(params.row.amount)
                        }
                    },
                ]   

                


            }
        },
        components: {
            SectionTitle,
            SelectSaler,
            selectCustomers,
            ReplaceView,
            planMap,
            ListAndMap
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            GLOBALHEADERSET('订单合同');
            this.getFreeDeposit()
        },
        watch:{
            getFloor(){
                let _this = this;
                if(this.formItem.communityId && this.formItem.customerId){
                    let params = {
                        communityId:this.formItem.communityId,
                        // communityId:4,

                        // customerId:1715
                        customerId:this.formItem.customerId
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
                        item.orderSeatId = item.orderId;
                        item.changeBegin = this.formItem.leaseBegindate;
                        return true;
                    }
                    return false
                })
            },
            next(name){
                this.errorObj = {}
                if(name == 'formItemTwo'){
                    if(!this.selectedOldStation.length){
                        this.errorObj.oldStation = true;
                    }else{
                        this.errorObj.oldStation = false;
                    }
                }else{
                    this.errorObj.oldStation = false;
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
                            // if(!this.serviceDetailsList.length){
                            //     this.errorObj.serviceDetail = true;
                            //     this.$Notice.error({
                            //         title:'请核对新工位信息'
                            //     })
                            // }else{
                            //     this.errorObj.serviceDetail = false;
                            // }
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
                overViewData.freeStartDate = this.freeStartDate;
                overViewData.firstPayTime = this.formItem.firstPayTime;
                overViewData.back = this.back;//扣除服务保证金
                // 补充信息
                overViewData.intermediaryName = this.formItem.intermediaryName// 居间方
                // step3第二个table数据 
                // let serviceDetailsList =this.serviceDetailsList.map(item=>{
                //     item.startDate = dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseBegindate));
                //     item.endDate = dateUtils.dateToStr('YYYY-MM-DD',new Date(this.formItem.leaseEnddate));
                //     return item;
                // })
                // overViewData.serviceDetailsList = serviceDetailsList;

                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.orderStatus = 'view'
                        this.overViewData = overViewData
                    }
                })
                
            },
            editCard(value){
                console.log("editCard 3");
                
                this.orderStatus = 'create';
                this.status = value;
            },
            changeCustomer(value){
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
                    this.$Notice.error({
                        title:e.message
                    })
                })
            },
            changeBeginTime(value){
                //TODO 联调时需修改判断条件

                //出发更新列表中的欲更换信息
                var today = new Date();
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
                            let time = new Date(value).getTime();
                            //判断当前已选工位是否符合开始时间
                            if(time<item.startDate || time>item.endDate){
                                item.disabled = true;
                                this.selectAllAbled = true;
                            }else{
                                item.disabled = false;
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
                this.changeThree = new Date();
                var toString = Object.prototype.toString;
                
                var typeStr = toString.call([]); 
                if(this.selecedStationList && typeStr == '[object Array]' &&  this.selecedStationList.length){
                    this.clearFormThree();
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
            selectPayType(value){
                // 选择付款方式
                this.installmentType = value.value;
                this.changeThree = new Date()
                this.installmentName = value.label;
                this.errorObj.payType = false;
            },
            selectDeposit(value){
                // 选择保证金
                this.deposit = value
                this.changeThree = new Date()
                this.errorObj.deposit = false;
            },
            changeFirstTime(){

            },

            //设置优惠后，获取签约价明细
            getSaleAmount(list){
                let originalPrice = false;
                let val = this.selecedStationList;
                let station = val.map(item=>{
                    let obj = item;
                    if(item.originalPrice === ''){
                        originalPrice = true;
                    }
                    return obj;
                })
                if(originalPrice){
                    this.$Notice.error({
                        title:'工位单价不能为空'
                    })
                    return
                }


                // this.watchServiceDetail = new Date()
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
                        obj.seatNum = item.name;
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
                this.stationData.submitData = this.selecedStationList || []
                this.showMap = true;
            },
            onResultChange(val){//组件互通数据的触发事件
                this.stationData = val;
            },
            cancelStation(){//工位弹窗的取消
                this.stationData = {
                    submitData:this.selecedStationList,
                    deleteData:[],
                };
                this.showMap = false

            },
            submitStation(){//工位弹窗的提交
                this.showMap = false;
                this.saleList = []
                this.discountNum = '';
                this.freeDays = ''
                this.freeStartDate = ''
                this.selecedStationList = this.stationData.submitData.map(item=>{
                    item.guidePrice = item.seatPrice || item.guidePrice || 0;
                    item.discountedPrice = item.seatPrice;
                    item.floor = item.whereFloor || item.floor;
                    item.seatId = item.id;
                    item.seatNum = item.name;
                    item.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    item.saleNum = this.discountNum || '--'
                    item.endDate=dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate))
                    return item;;
                });
                // this.watchServiceDetail = new Date();
                this.getStationAmount()
                this.changeThree = new Date()
                
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
            delStationByIndex(index){
                this.selecedStationList.splice(index,1);
                if(this.selecedStationList.length){
                    this.getStationAmount();
                }else{
                    this.serviceDetailsList = []
                }
                
            },
            deleteSelectedDtation(){
                if(!this.entryPriceList.length){
                    this.$Notice.error({
                        title:'请先选择要删除的工位'
                    })
                    return 
                }
                let restStationList=[]
                let stationIdList=[]
                this.entryPriceList.map(item=>{
                    stationIdList.push(item.seatId);
                })
                this.selecedStationList.map(item=>{
                    if (!stationIdList.includes(item.seatId)) {
                        restStationList.push(item)
                    }
                })
                this.selecedStationList=restStationList
                this.entryPriceList=[]
                if(this.selecedStationList.length){
                    this.getStationAmount();
                }else{
                    this.serviceDetailsList = []
                }
                
            },
            getServiceDetail(station){
                let list =[{
                    seatId:station.seatId,
                    seatType:station.seatType
                }] 
                let params = {
                    codeName:station.name,
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(station.endDate)),
                    realEndDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(station.endDate)),
                    seats:JSON.stringify(list),
                    signPrice:station.discountedPrice,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(station.startDate))
                }

                this.$http.post('get-seat-combin-detail', params).then( r => {
                    this.openService = true;
                    this.detailService = r.data

                }).catch( e => {
                    this.$Notice.error({
                        title:e.message
                    });

                })
            },
            changePrice(index,price){
                this.selecedStationList = this.selecedStationList.map((item,i)=>{
                    item.seatNum = item.name;
                    if(i == index){
                        item.originalPrice = price;
                    }else{
                        item.originalPrice = item.originalPrice || item.seatPrice; 
                    }
                    return item
                })
                this.getStationAmount()
            },
            changeDiscount(index,discount){
                this.selecedStationList[index].discountNum = Number(discount);
                this.getStationAmount()
            },
            getStationAmount(list){
                //判断标准单价是否有值，若无值，则不提交计算总价
                let originalPrice = false;
                let val = list || this.selecedStationList;
                let station = val.map(item=>{
                    let obj = item;
                    obj.guidePrice = item.guidePrice || item.seatPrice || 0;

                    obj.originalPrice =item.originalPrice||0

                    obj.seatId = item.id || item.seatId;
                    obj.floor = item.whereFloor || item.floor;
                    obj.endDate =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate));
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate));
                    if(item.originalPrice === ''){
                        originalPrice = true;
                    }
                    return obj;
                })
                if(originalPrice){
                    return
                }
                // this.watchServiceDetail = new Date()
                let params = {
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseEnddate)),
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.leaseBegindate)),
                    communityId:this.formItem.communityId,
                    seats:JSON.stringify(station),
                    // saleList:JSON.stringify(this.saleList)
                }
                this.changeThree = new Date()
                this.$http.post('get-station-amount', params).then( r => {
                    this.selecedStationList = r.data.seats.map(item=>{
                        let obj = item;
                        obj.floor = item.whereFloor || item.floor;
                        //TODO 周一联调删除
                        obj.guidePrice = item.guidePrice;
                        obj.seatPrice = item.guidePrice;
                        obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                        obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                        obj.belongType = item.seatType;
                        obj.seatNum = item.name;
                        obj.saleNum = this.discountNum || '-';
                        obj.floor = item.whereFloor || item.floor;
                        obj.discountedPrice = item.discountedPrice;
                        obj.rightDiscount = item.rightDiscount
                        return obj;
                    });
                    this.stationAmount=r.data.totalrent

                }).catch( e => {
                        this.$Notice.error({
                            desc:e.message
                        })

                })
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
                    this.formItem.discountCreaterName = response.data.discountCreaterName;
                    
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
                if(value>changeDeposit){
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
            cancel(){
                this.openService = false;
            },
            entryPrice(){
                // 确认录入单价的工位，打开弹窗，输入单价，遍历单价最小金额，确认添加
                if(!this.entryPriceList.length){
                    this.$Notice.error({
                        title:'请先选择录入单价的工位'
                    })
                    return 
                }
                this.openPrice = true;
            },
            //批量录入价格 对于勾选的行
            openDiscountButton() {
             if(!this.entryPriceList.length){
                    this.$Notice.error({
                        title:'请先选择录入折扣的工位'
                    })
                    return 
                }
                this.openDiscount = true
            },
            selectStationEvent(select){
                this.entryPriceList = select;
            },
            submitPrice(){
                let priceError = false;
                let stationIdList = [];
                let price = ''
                var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                if(isNaN(this.price)){
                    priceError = true
                    price = '工位单价必须是数字'
                }else if(!pattern.test(this.price)){
                    priceError = true
                    price = '工位单价不得多于三位小数'
                }

                this.entryPriceList.map(item=>{
                    stationIdList.push(item.seatId);
                    if(item.guidePrice> this.price){
                        priceError = true
                        price = '录入单价不得小于指导价。'
                    }
                })
                if(priceError){
                    this.priceError = price
                    return
                }
                this.priceError = ''
                this.selecedStationList = this.selecedStationList.map(item=>{
                    if(stationIdList.indexOf(item.seatId) != -1){
                        item.originalPrice = this.price;
                    }
                    return item;
                })
                this.getStationAmount()
                this.openPrice = false;
                this.price = ''
                this.entryPriceList = []
            },
            cancelPrice(){
                this.price = '';
                this.openPrice = false;
            },
            submitDiscount(){
                let errorStr = ''
                let stationVos = this.selecedStationList;
                var pattern = /^[0-9]+(.[0-9]{1,3})?$/;
                if (!pattern.test(this.batchDiscount)) {
                    errorStr = '工位折扣不得多于三位小数'
                }
                // 选中的工位
                let selectedStation = this.entryPriceList.map(item=>item.seatId);

                let sortStationVos = [].concat(this.entryPriceList)
                sortStationVos.sort((s1, s2) => { return s2.rightDiscount - s1.rightDiscount })
                let maxPrice = sortStationVos[0].rightDiscount;
                if (maxPrice > this.batchDiscount) {
                    // this.batchDiscountError = '工位折扣不得小于' + maxPrice
                    this.batchDiscountError = '部分或全部商品没有此权限'
                }

                else {
                    this.batchDiscountError = '';
                    this.openDiscount = !this.openDiscount;
                    this.selecedStationList = this.selecedStationList.map((item) => {
                        if (selectedStation.indexOf(item.seatId) != -1) {
                            item.discountNum = Number(this.batchDiscount);
                        }
                        return item
                    })
                    
                    this.getStationAmount()
                    this.openDiscount = false
                    this.entryPriceList = []
                }
            },
            getFreeDeposit(){
                this.$http.get('get-seat-deposit-free', '').then( r => {
                    this.showFree = r.data;
                    if(r.data){
                        this.depositList.push({value:'0',label:'无押金'},)
                        this.depositList.push({value:'1',label:'1个月'},)
                    }
                }).catch( e => {
                        this.$Notice.error({
                            title:e.message
                        })

                })
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
        .total-money{
            .left{
                padding-top: 10px;
                float: left;
            }
            .right{
                float: right;
                height: 42px;
                padding-top:15px;
                padding-right:16px;
                .money{
                    margin-left: 20px;
                    color: #ff6868;
                }
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
