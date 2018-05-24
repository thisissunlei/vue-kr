<template>
    <div class="add-invoice">
        <SectionTitle title="申请开票"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col span="12" class="col">
                        <FormItem label="客户名称" style="width:252px" prop="customerId">
                        <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers>
                        </FormItem>
                    </Col>
        
                    <Col class="col">
                        <FormItem label="社区名称" style="width:252px"  prop="communityId">
                        <selectCommunities test="formItem" :onchange="changeCommunity"></selectCommunities>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="提交人员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="提交时间" style="width:252px" prop="startDate">
                            <DatePicker type="date" placeholder="提交时间" v-model="formItem.startDate" style="display:block" ></DatePicker>
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="开票信息">
                <Row  style="margin-bottom:30px">   
                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入发票抬头" />
                        </FormItem>
                    </Col>
               
                    <Col class="col">
                        <FormItem label="纳税人识别码" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入纳税人识别码" />
                        </FormItem>
                    </Col>
                 
                    <Col class="col">
                        <FormItem label="注册地址" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入注册地址" />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="注册电话" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入注册电话" />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="开户银行" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入开户银行" />
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="银行账户" style="width:252px" >
                            <Input v-model="formItem.timeRange" placeholder="请输入银行账户" />
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="可开票数据">
                  <Table border ref="selection" :columns="tableColumns" :data.sync="stationList" ></Table>
            </DetailStyle>
            <FormItem style="padding-left:24px;margin-top:40px" >
                <div style="text-align: right;padding:0px 20px;">
                    总金额：<span>￥100000</span>
                    <Button type="error" @click="handleSubmit('formItem')" :disabled="disabled" v-if="!disabled">提交</Button>
                    <Button  disabled v-if="disabled">提交</Button>
                </div>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>

        </Form>

        
    </div>
</template>


<script>


import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
    export default {
        data() {
            const validateFirst = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先选择首付款日期'));
                } else if(new Date(this.formItem.startDate)<new Date(value)){
                    callback(new Error('首付款日期不得晚于起始日期'));
                }else{
                     callback();
                }
            };
            return {
                discountError:false,
                depositAmount:'',
                disabled:false,
                delStation:[],
                stationAmount:'',
                installmentType:'',
                maxDiscount:{},//折扣最大限制
                timeError:false,//租赁时间校验
                stationData:{
                    submitData:[],
                    deleteData:[],
                    clearAll:false
                },
                stationAll:{},
               
                params:{},
                depositList:[
                    {label:'2个月',value:'2'},
                    {label:'3个月',value:'3'},
                    {label:'4个月',value:'4'},
                    {label:'5个月',value:'5'},
                    {label:'6个月',value:'6'},
                ],
                saleAmount:0,
                saleAmounts:utils.smalltoBIG(0),
                youhui:[],
                tableColumns: [
                    {
                        title: '账单编号',
                        key: 'name'
                    },
                    {
                        title: '账单类型',
                        key: 'seatType',
                        render:(h, params) => {
                            let type = params.row.seatType;
                            let typeName = '开放工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室'
                            }else{
                                typeName = "开放工位"
                            }
                            return typeName
                        }
                    },
                    {
                        title:'费用类型',
                        key:'capacity'
                    },
                    {
                        title: '可开票金额',
                        key: 'guidePrice'
                    },
                    {
                        title: '申请开票金额',
                        key: 'guidePrice',
                        render: (h, params) => {
                            let price = params.row.originalPrice;
                            
                            return h('Input', {
                                    props: {
                                        min:params.row.guidePrice,
                                        value:params.row.originalPrice,
                                    },
                                    on:{
                                        'on-change':(event)=>{

                                            this.tabelInputChange(event);
                                        },
                                        // 'on-blur':()=>{
                                        //     var pattern =/^[0-9]+(.[0-9]{1,2})?$/;
                                        //     if(price && !pattern.test(price)){
                                        //         this.$Notice.error({
                                        //             title:'单价不得多余小数点后两位'
                                        //         })
                                        //         var num2=Number(price).toFixed(3);
                                        //         price = num2.substring(0,num2.lastIndexOf('.')+3) 
                                        //     }
                                        //     if(price<params.row.guidePrice){
                                        //         price = params.row.guidePrice
                                        //         this.$Notice.error({
                                        //             title:'单价不得小于'+params.row.guidePrice
                                        //         })
                                        //     }
                                        //     this.changePrice(params.index,price)
                                        // }
                                    }
                                },'44')
                        }
                    }
                ],
                stationList: [
                    {customerId:'33333'}
                ],
                floors:[],
                selectedStation:[],
                formItem: {
                    customerId: '',
                    communityId: '',
                    startDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    signDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    endDate: '',
                    timeRange:'',
                    floor:'',
                    city:'',
                    firstPayTime:'',
                    rentAmount:'',
                    items:[],
                    stationAmount:0,
                },

                errorPayType:false,//付款方式的必填错误信息
                ruleCustom:{
                    startDate: [
                        { required: true,type: 'date', message: '请先选择开始时间', trigger: 'change' }
                    ],
                    firstPayTime: [
                        { required: true, trigger: 'change' ,validator: validateFirst},
                    ],
                    endDate: [
                        { required: true, type: 'date',message: '请先选择结束时间', trigger: 'change' }
                    ],
                    endDateStatus: [
                        { required: true, type: 'date',message: '请先选择结束时间', trigger: 'change' }
                    ],
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    salerId:[
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    signDate:[
                        { required: true,type: 'date', message: '请先选择签署时间', trigger: 'change' }
                    ]
                },
                getFloor:+new Date(),
                changeSale:+new Date(),
                salerName:'请选择',
                ssoId:'',
                errorAmount:false,
                ssoName:'',
                discount:0,
                minDiscount:'',
                change:{},
                showSaleDiv:true,
                openPrice:false,
                price:'',
                priceError:false,
                //录入单价的数组
                priceToStation:[]

            }
        },
        head() {
            return {
                title: '新建订单'
            }
        },
        components: {
            SectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler,
            planMap,
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            this.getFreeDeposit();
        },
        watch:{
           getFloor(){
            let _this = this;
            if(this.formItem.communityId && this.formItem.customerId){
                let params = {
                    communityId:this.formItem.communityId,
                    customerId:this.formItem.customerId
                }
                 this.$http.get('get-community-floor', params, r => {
                    _this.floors = r.data.floor;
                    _this.ssoId = r.data.ssoId;
                    _this.ssoName = r.data.ssoName;
                    if(!_this.formItem.salerId){
                        _this.formItem.salerId = JSON.stringify(r.data.ssoId);
                        _this.salerName = r.data.ssoName

                    }

                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                })
            }
           },
           disabled(val){
            console.log('disabled-->',val)
           }
        },
        methods: {
            tabelInputChange(event){
                console.log(event,"pppppppppp")
            },
            back(){
                window.history.go(-1);
            },
            handleSubmit:function(name) {
               
            },
            changeCommunity(value){
                // 选择社区
                if(value){
                    this.formItem.communityId = value;
                   
                }else{
                    this.formItem.communityId = '';
                }
               
                this.getFloor = +new Date()
                
            },
          
            changeCustomer(value){
                // 客户
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                }
                this.getFloor = +new Date()

            },
            changeSaler(value){
                // 销售员
                this.formItem.salerId = value;
            },
           
           
            selectRow(selection){
                // 工位表单的全选
                let selectionList = [];
                selectionList = selection.map((item)=>{
                    return item.seatId
                })
                this.selectedStation = selectionList;
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
   .add-invoice{
        .creat-order-form{
            max-width: 1140px;
            padding: 30px 0;
            .col{
                display: inline-block;
                width: 50%;
                max-width: 450px;
                padding-right: 10px;
                vertical-align: top;
            }
        }
        
   }
   
   
</style>
