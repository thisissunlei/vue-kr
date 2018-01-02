<style lang="less"> 
    .required-label{
    // padding:10px 0;
    font-size: 14px;
    position: relative;
    margin-left: 5px;
    &&:before{
        content:'*';
        color: red;
        position: absolute;
        font-size: 18px;
        left:-7px;
        top:14px;
    }
   } 
   .pay-error{
    color:#ed3f14;
   }
   
</style>


<template>
    <div class="create-new-order">
        <sectionTitle label="编辑入驻服务订单管理"></sectionTitle>
         <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
            <Row>  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px" >
                    <selectCustomers name="formItem.customerId" :onchange="changeCustomer" :value="customerName" ></selectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px">
                    <selectCommunities test="formItem" :onchange="changeCommunity" :value="communityName"></selectCommunities>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="销售员" style="width:252px">
                        <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                    </FormItem>
                </Col>
                
            </Row>
            </DetailStyle>
            <DetailStyle info="租赁信息">
            <Row  style="margin-bottom:30px">   
                <Col class="col">
                    <FormItem label="租赁开始日期" style="width:252px" prop="startDate">
                        <DatePicker type="date" placeholder="租赁开始日期" v-model="formItem.startDate" style="display:block" @on-change="changeBeginTime"></DatePicker>
                        <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div>
                    </FormItem>
                    
                </Col>
                <Col  class="col"   v-if="false">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                    <DatePicker type="month" placeholder="租赁结束日期" format="yyyy-MM-dd" v-model="formItem.endDate" style="display:block" @on-change="changeEndTime"></DatePicker>
                    </FormItem>
                </Col>
                
                <Col  class="col">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                    <DatePicker type="date" placeholder="租赁结束日期" format="yyyy-MM-dd" v-model="formItem.endDate" style="display:block" @on-change="changeEndTimeStatus"></DatePicker>
                    </FormItem>
                </Col>
                 <Col class="col">
                    <FormItem label="租赁时长" style="width:252px">
                        <Input v-model="formItem.timeRange" placeholder="租赁时长" disabled></Input>
                    </FormItem>
                </Col>
                 <Col  class="col">
                    <FormItem label="签署日期" style="width:252px" prop="signDate">
                    <DatePicker type="date" placeholder="签署日期" format="yyyy-MM-dd" v-model="formItem.signDate" style="display:block"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
                
            </DetailStyle>
            <DetailStyle info="金额信息">
                <Row style="margin-bottom:10px">  
                <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="showStation">选择工位</Button>
                    <Button type="ghost" style="font-size:14px" @click="deleteStation">删除</Button>
                </Col>
                
                </Row>
                <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <Table border ref="selection" :columns="columns4" :data="stationList" @on-selection-change="selectRow"></Table>
                    <div class="total-money" v-if="stationList.length">
                        <span>服务费总计</span>
                        <span class="money">{{formItem.stationAmount}} </span>
                        <span class="money">{{stationAmount}}</span>
                    </div>
                </Col>
                </Row>
                    
                
            </DetailStyle>
            <DetailStyle info="优惠信息" v-show="youhui.length"  style="margin-top:40px">
                <Row style="margin-bottom:10px">  
                <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="handleAdd">添加</Button>
                    <Button type="ghost" style="font-size:14px" @click="deleteDiscount">删除</Button>
                    <span class="pay-error" v-show="discountError" style="padding-left:15px">{{discountError}}</span>
                </Col>

                </Row>
                <Row >
                    <Col span="3" class="discount-table-head"  >
                        <Checkbox v-model="selectAll" @on-change="selectDiscount"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-head" >
                       <span> 优惠类型</span>
                    </Col>
                    <Col span="5" class="discount-table-head" >
                        <span>开始时间</span>
                    </Col>
                    <Col span="5" class="discount-table-head" >
                        <span>结束时间</span>
                        
                    </Col>
                    <Col span="5" class="discount-table-head" >
                        <span>折扣</span>
                        
                    </Col>
                    
                </Row>
                    <FormItem
                v-for="(item, index) in formItem.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                :prop="'items.' + index + '.type'"
                :rules="{required: true, message: '此项没填完', trigger: 'blur'}">
            <Row v-show="item.show">
                 <Col span="3" class="discount-table-content" style="padding:0">
                        <Checkbox v-model="item.select"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-content">
                         <Select v-model="item.type" @on-change="changeType">
                            <Option v-for="types in youhui" :value="types.value+'-'+index" :key="types.value" >{{ types.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="5" class="discount-table-content" ></DatePicker>
                        <DatePicker type="date" v-show="item.tacticsType != '3'" placeholder="开始时间" v-model="item.validStart" disabled></DatePicker >
                        <DatePicker type="date" v-show="item.tacticsType == '3'" placeholder="开始时间" v-model="item.validStart" @on-change="changeSaleTime"></DatePicker >
                    </Col>
                    <Col span="5" class="discount-table-content">
                        <DatePicker type="date" placeholder="开始时间" v-model="item.validEnd" disabled ></DatePicker >
                    </Col>
                    <Col span="5" class="discount-table-content">
                        <!-- <InputNumber v-model="item.discount" placeholder="折扣" v-if="item.tacticsType == '1'" :max="maxDiscount" :min="1" :step="1.2" @on-change="changezhekou"></InputNumber> -->
                        <Input v-model="item.discount" placeholder="折扣" @on-blur="changezhekou" v-if="item.tacticsType == '1'"></Input>
                        <Input v-model="item.zhekou" v-if="item.tacticsType !== '1'" placeholder="折扣" disabled></Input>

                        
                    </Col>  
            </Row>
        </FormItem>
        <Row style="margin-bottom:10px">
                <Col sapn="24">
                    <div class="total-money" v-if="formItem.items.length">
                        <span>优惠金额总计</span>
                        <span class="money">{{saleAmount}} </span>
                        <span class="money">{{saleAmounts}}</span>
                    </div>
                </Col>
                </Row>
        </DetailStyle>
        <div style="padding-left:24px">
            <Row>
                 <Col class="col">
                    <FormItem label="优惠后服务费总额" style="width:252px">
                        <Input v-model="formItem.rentAmount" placeholder="优惠后服务费总额" disabled></Input>
                    </FormItem>
                 </Col>
                 <Col class="col">
                    <FormItem label="首付款日期" style="width:252px" prop="firstPayTime">
                        <DatePicker type="date" placeholder="首付款日期" style="width:252px" v-model="formItem.firstPayTime" ></DatePicker >
                    </FormItem> 
                 </Col>
            </Row>
            <Row style="">
                 <Col class="col">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                        </div>
                        <div class="pay-error" v-if="errorPayType">请选择付款方式</div>

                 </Col>
                 <Col class="col">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.value)" v-bind:class="{active:depositAmount==types.value}">{{ types.label }}</span>
                        </div>
                        <div class="pay-error" v-if="errorAmount">请选择付款方式</div>
                 </Col>
            </Row>
            
                
         </div>   
        <FormItem style="padding-left:24px;margin-top:40px" >
            <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled">提交</Button>
            <!-- <Button type="ghost" style="margin-left: 8px">重置</Button> -->
        </FormItem>

    </Form>
    
    <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="900"
         class-name="vertical-center-modal"
     >
        <planMap :floors.sync="floors" :params.sync="params" :stationData.sync="stationData" @on-result-change="onResultChange" v-if="openStation" :originStationList.sync="originStationList"></planMap>
        <div slot="footer">
            <Button type="primary" @click="submitStation">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelStation">取消</Button>
        </div>
    </Modal>

        
    </div>
</template>


<script>
import sectionTitle from '~/components/SectionTitle.vue'
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
                    callback()
                }
            };
            
            return {
                openStation:false,
                customerName:'',
                communityName:'',
                selectAll:false,
                discountError:false,
                index:0,
                saleAmount:0,
                saleAmounts:0,
                salerName:'',
                depositAmount:'',
                errorAmount:false,
                disabled:false,
                delStation:[],
                stationAmount:'',
                installmentType:'',
                maxDiscount:'',//折扣最大限制
                timeError:false,//租赁时间校验
                corporationName:'',
                discount:0,
                stationData:{
                    submitData:[],
                    deleteData:[],
                },
                stationAll:{},
                payList:[
                    {value:'ONE',label:'月付'},
                    {value:'TWO',label:'两月付'},
                    {value:'THREE',label:'季付'},
                    {value:'SIX',label:'半年付'},
                    {value:'TWELVE',label:'年付'},
                    {value:'ALL',label:'全款'},
                ],
                params:{},
                depositList:[
                    {label:'2个月',value:'2'},
                    {label:'3个月',value:'3'},
                    {label:'4个月',value:'4'},
                    {label:'5个月',value:'5'},
                    {label:'6个月',value:'6'},
                ],
                youhui:[],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工位房间编号',
                        key: 'name'
                    },
                    {
                        title: '标准单价（元/月）',
                        key: 'originalPrice'
                    },
                    {
                        title: '租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong', dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.startDate))+'至'+dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.endDate)))
                        }
                    },
                    {
                        title: '小计',
                        key: 'originalAmount'
                    }
                ],
                stationList: [
                ],
                floors:[],
                selectedStation:[],
                formItem: {
                    customerId: '',
                    communityId: '',
                    startDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    endDate: '',
                    timeRange:'',
                    floor:'',
                    city:'',
                    firstPayTime:'',
                    rentAmount:'',
                    items:[],
                    signDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
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
                        { required: true,type: 'date',  message: '请先选择签署时间', trigger: 'change' }
                    ]
                },
                getFloor:+new Date(),
                ssoId:'',
                ssoName:'',
                changeSale:+new Date(),
                originStationList:[]
            }
        },
        head() {
            return {
                title: '编辑入驻订单'
            }
        },
        components: {
            sectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler,
            planMap
        },
        mounted(){
            this.getDetailData();
            GLOBALSIDESWITCH("false");
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

                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                        console.log('error',e)
                })
            }
           },
        },
        methods: {

             getDetailData(){
                let _this = this;
                let {params}=this.$route;
                let from={
                    id:params.orderEdit
                };
                this.$http.get('join-bill-detail', from, r => {
                    let data = r.data;
                    data.orderSeatDetailVo = data.orderSeatDetailVo.map(item=>{
                        let obj = item;
                        obj.belongType = item.seatType;
                        obj.id = item.seatId;
                        obj.name = item.seatName;
                        obj.startDate =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.startDate));
                        obj.endDate =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.endDate));
                        return obj;
                    })
                    _this.originStationList = data.orderSeatDetailVo;
                    // console.log('data.orderSeatDetailVo',data.orderSeatDetailVo)
                    _this.stationData = {
                        submitData:data.orderSeatDetailVo,
                        deleteData:[]
                    };
                    _this.getSaleTactics({communityId:data.communityId})
                    _this.formItem.customerId = JSON.stringify(data.customerId);
                    _this.customerName = data.customerName;
                    _this.formItem.communityId = JSON.stringify(data.communityId);
                     _this.salerName = data.salerName;
                    _this.formItem.salerId = JSON.stringify(data.salerId);
                    _this.communityName = data.communityName;
                    _this.formItem.startDate = new Date(data.startDate);
                    _this.formItem.endDate = new Date(data.endDate);
                    _this.formItem.signDate = new Date(data.signDate);
                    _this.changeBeginTime(data.startDate)
                    _this.stationList = data.orderSeatDetailVo;
                    _this.formItem.firstPayTime = new Date(data.firstPayTime);
                    _this.selectDeposit(data.deposit)
                    _this.selectPayType(data.installmentType);
                    setTimeout(function(){
                        _this.getStationAmount()
                        data.contractTactics = data.contractTactics.map((item,index)=>{
                            let obj = {};
                            obj.status = 1;
                            obj.show = true;
                            obj.validStart = item.freeStart;
                            obj.validEnd = item.freeEnd;
                            obj.type = item.tacticsType+'-'+index;
                            obj.tacticsId = item.tacticsId ;
                            obj.discount = item.discountNum;
                            obj.tacticsType = JSON.stringify(item.tacticsType);
                            return obj;
                        })

                        _this.formItem.items = data.contractTactics;
                        _this.dealSaleInfo()
                    },200)
                    _this.getFloor = +new Date()
                    console.log('contractTactics',_this.formItem)
                    
                    }, e => {
                        _this.$Notice.error({
                            title:e.message
                        });
                })
            },
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            joinFormSubmit(){
                this.config();
                 let {params}=this.$route;
                // let saleList = this.formItem.items
                let saleList = this.formItem.items.filter(item=>{
                    if(!item.show){
                        return false;
                    }
                    return true;
                })
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.startDate));
                let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.signDate));
                let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.endDate));
                let formItem = {} 
                saleList = saleList.map(item=>{
                    let obj =Object.assign({},item);
                    obj.validEnd =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validEnd))
                    obj.validStart =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validStart))
                    return obj;
                })
                formItem.id = params.orderEdit;
                formItem.installmentType = this.installmentType;
                formItem.deposit = this.depositAmount;
                formItem.saleList=JSON.stringify(saleList);
                formItem.signDate = signDate;
                formItem.seats=JSON.stringify(this.stationList);
                formItem.customerId=this.formItem.customerId;
                formItem.communityId=this.formItem.communityId;
                formItem.salerId=this.formItem.salerId;
                formItem.timeRange=this.formItem.timeRange;
                formItem.rentAmount=this.formItem.rentAmount;
                formItem.firstPayTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.firstPayTime));

                formItem.startDate = start;
                formItem.endDate =end;
                console.log('handleSubmit',formItem)
                let _this = this;
                 this.$http.post('save-join', formItem, r => {
                      window.close();
                      window.opener.location.reload();
                }, e => {
                     _this.$Notice.error({
                        title:e.message
                    })
                     _this.disabled = false

                        console.log('error',e)
                })
                
            },
            dealSaleInfo(){
                this.config()
                //处理已删除的数据
                let saleList = this.formItem.items.filter(item=>{
                    if(!item.show){
                        return false;
                    }
                    return true;
                })
                //检查手否有未填写完整的折扣项
                let complete = true;
                saleList.map(item=>{
                    if(!item.tacticsType){
                        complete = false
                    }
                    if(item.tacticsType!='1' && (!item.validStart || !item.validEnd)){
                        complete = false;
                    }
                    if(item.tacticsType == '1' && !item.discount){
                        complete = false;
                    }
                });
                if(!complete){
                    this.$Notice.error({
                        title:'请填写完整优惠信息'
                    });
                    return;
                }

                saleList = saleList.map(item=>{
                    let obj =Object.assign({},item);
                    obj.validEnd =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validEnd))
                    obj.validStart =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validStart))
                    return obj;
                })
                // this.formItem.items = saleList;

                this.getSaleAmount(saleList)
            },
            getSaleAmount(list){
                this.config()
                let params = {
                    communityId:this.formItem.communityId,
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.startDate)),
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.endDate)),
                    seats:JSON.stringify(this.stationList),
                    saleList:JSON.stringify(list)
                };
                let _this = this;

                 this.$http.post('count-sale', params, r => {
                    _this.disabled = false;
                    _this.discountError = false;
                    _this.formItem.rentAmount = r.data.totalrent;
                    let money = r.data.originalTotalrent - r.data.totalrent;
                    _this.saleAmount = Math.round(money*100)/100;
                    _this.saleAmounts = utils.smalltoBIG(Math.round(money*100)/100);
                    
                }, e => {
                     _this.disabled = true;
                    _this.discountError = e.message;

                     _this.$Notice.error({
                        title:e.message
                    })

                        console.log('error',e)
                })

            },
            changezhekou(val){
                val = val.target.value;
                if(isNaN(val)){
                    this.discountError = '折扣必须是数字';
                    this.disabled = true;
                    return
                }
                if(val<this.maxDiscount){
                    this.discountError = '折扣不得小于'+this.maxDiscount;
                    this.disabled = true;

                    this.$Notice.error({
                        title:'折扣不得小于'+this.maxDiscount
                    })
                    return;
                }
                if(val>9.9){
                    this.discountError = '折扣不得大于9.9'
                    this.disabled = true;
                    this.$Notice.error({
                        title:'折扣不得大于9.9'
                    })
                    return;
                }
                this.discount = val;
                this.dealSaleInfo()
            },
            changeSaleTime(val){
                let _this = this;
                setTimeout(function(){
                    _this.dealSaleInfo()
                },200)
            },
            handleSubmit:function(name) {
                let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
                if(!this.installmentType){
                    this.errorPayType = true
                }
                if(!this.depositAmount){
                    this.errorAmount = true;
                }
                if(this.timeError){
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    });
                    return
                }
                
                if(this.errorPayType || this.errorAmount){
                    this.$Notice.error({
                        title:'请填写完表单'
                    });
                }
                this.disabled = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(!_this.stationList.length){
                            _this.$Notice.error({
                                title:'请选择入驻工位'
                            });
                            _this.disabled = false;
                            return
                        }
                        this.joinFormSubmit()
                    } else {
                        _this.disabled = false;

                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },
            selectDiscount:function(value){
                // checkbox的全选事件
                let items = this.formItem.items;
                items = items.map((item)=>{
                    let obj = item;
                    obj.select = value;
                    return obj;
                })
                this.selectAll = value;
                this.formItem.items = items;
            },
            deleteDiscount:function(){
                // 删除选中的优惠信息
                let items = this.formItem.items;
                let select = []
                select = items.map((item)=>{
                    return item.selelct;
                })
                items = items.map(function(item, index) {
                    if (item.select) {
                        item.show = false;
                    }
                return item;
                });
                this.formItem.items = items;
                this.selectDiscount(false);
                this.dealSaleInfo()

            },
            getTacticsId(type){
                let typeId = '';
                typeId = this.youhui.filter((item)=>{
                    if(item.tacticsType != type ){
                        return false;
                    }
                    return true;
                })
                return typeId[0].tacticsId

            },
            
            changeType:function(value){
                //优惠类型选择
                if(!value){
                    return;
                }
                this.config()
                let itemValue = value.split('-')[0];
                let itemIndex = value.split('-')[1];
                this.formItem.items[itemIndex].tacticsType = itemValue;
                let items = [];
                items = this.formItem.items.map((item)=>{
                    if(item.value == 'qianmian'){
                        item.validStart = this.formItem.startDate;
                        item.discount = '';
                    }else if(item.tacticsType == 3){
                        item.validStart=item.validStart || ''
                        item.validEnd = this.formItem.endDate
                        item.tacticsId = this.getTacticsId('3')

                        item.discount = '';
                    }else if(item.tacticsType == 1){
                        item.validStart=this.formItem.startDate
                        item.tacticsId = this.getTacticsId('1')
                        item.discount = this.maxDiscount;
                        item.validEnd = this.formItem.endDate
                    }
                    return item;
                })
                let error=false;
                let message = '';
                
                let typeList = items.map(item=>{
                    if(item.show){
                        return item.tacticsType;
                    }else{
                        return;
                    }
                })
                let qianmian = typeList.join(",").split('qianmian').length-1;
                let houmian = typeList.join(",").split('3').length-1;
                let zhekou = typeList.join(",").split('1').length-1;
                if(qianmian + houmian>1){
                    error = true;
                    message = '只能有一个免租期。'
                }
                if(zhekou>1){
                    error = true;
                    message = '只能有一个折扣。'
                }
                if(error){
                    this.$Notice.error({
                        title:message
                    });
                    items[itemIndex].show = false;
                }
                this.formItem.items = items;
                this.dealSaleInfo()
            },
            changeCommunity:function(value){
                // 选择社区
                if(value){
                    this.formItem.communityId = value;
                    this.getSaleTactics({communityId:value})
                }else{
                    this.formItem.communityId = '';
                }
                this.clearStation()
                this.getFloor = +new Date()
                
            },
            clearStation:function(){
                // 清除所选的工位
                if(this.stationList.length){
                    this.stationData={
                        submitData:[],
                        deleteData:[],
                    };
                    this.stationList = [];
                    this.formItem.items = []
                }
            },
            changeCustomer:function(value){
                // 客户
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                }
                this.getFloor = +new Date()

            },
            changeSaler:function(value){
                // 销售员
                this.formItem.salerId = value;
            },
            deleteStation:function(){
                // 工位表单的删除按钮
                let stationVos = this.stationList;
                let selectedStation = this.selectedStation;
                stationVos = stationVos.filter(function(item, index) {
                    if (selectedStation.indexOf(item.seatId) != -1) {
                        return false;
                    }
                return true;
                });
                this.stationList = stationVos;
                this.getStationAmount();
                this.formItem.items = []
                this.stationData.submitData = stationVos;
            },
            showStation:function(){
                // 选择工位的按钮
                this.config()
                console.log('originStationList----',this.originStationList)

                if(!this.formItem.communityId){
                    this.$Notice.error({
                            title:'请先选择社区'
                        });
                    return;
                }
                if(!this.formItem.startDate){
                    this.$Notice.error({
                            title:'请先选择开始时间'
                        });
                    return;
                }
                if(!this.formItem.endDate){
                    this.$Notice.error({
                            title:'请先选择结束时间'
                        });
                    return;
                }
                let floor = this.floors.map(item=>{
                    return item.value
                })
                let params = {
                    floor:floor.join(','),
                    communityId:this.formItem.communityId,
                    mainBillId:3162,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.startDate)),
                    time:+new Date(),
                    endDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate))
                }
                this.openStation = true;
                this.params = params;
            },
            selectRow:function(selection){
                // 工位表单的全选
                let selectionList = [];
                selectionList = selection.map((item)=>{
                    return item.seatId
                })
                this.selectedStation = selectionList;
            },
            handleAdd () {
                // 优惠信息的添加按钮
                this.config()
                if(!this.stationList.length){
                    this.$Notice.error({
                        title:'请先选择工位'
                    });
                    return;
                }
                this.index++;
                this.formItem.items.push({
                    value: '',
                    index: this.index,
                    status: 1,
                    show:true,
                });
            },
            selectDeposit:function(value){
                // 选择保证金
                this.depositAmount = value
                this.errorAmount = false;
            },
            selectPayType:function(value){
                // 选择付款方式
                this.installmentType = value;
                this.errorPayType = false;
            },
            submitStation:function(){//工位弹窗的提交

                this.stationList = this.stationData.submitData || [];
                this.delStation = this.stationData.deleteData|| [];
                 console.log('submitStation',this.stationData)
                this.getStationAmount()
                this.openStation = false

            },
            onResultChange:function(val){//组件互通数据的触发事件
                this.stationData = val;

                
            },
            cancelStation:function(){//工位弹窗的取消
                this.stationData = {
                    submitData:this.stationList,
                    deleteData:[],
                };
                this.openStation = false;

            },
            
            changeBeginTime:function(val){//租赁开始时间的触发事件，判断时间大小
                let error = false;
                this.clearStation()
                 if(!val || !this.formItem.endDate){
                    return;
                }
                this.config();
                val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(val))
                let params = {
                    end:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate)),
                    start:val
                }
                if(new Date(val)>new Date(this.formItem.endDate)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
                
            },
            dealEndDate(val){
                let str = val.split('-');
                let year = str[0];
                let month = parseInt(str[1], 10);  
                var d= new Date(year, month, 0);  
                let day = d.getDate();
                val = year+'-'+month+'-'+day;
                return val ;

            },
            changeEndTimeStatus(val){
                  this.clearStation();
                if(!val){
                    return;
                }

                val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(val));
                let error = false;

                this.formItem.endDate = val;

                if(!this.formItem.startDate){
                    return;
                }

                let params = {
                    start:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.startDate)),
                    end:val
                }
                this.config();

                if(new Date(this.formItem.startDate)>=new Date(val)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于等于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
              
            },
            changeEndTime:function(val){//租赁结束时间的触发事件，判断时间大小
                  this.clearStation();
                if(!val){
                    return;
                }

                val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(val));


                val = this.dealEndDate(val);
                let error = false;

                val = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(val));
                this.formItem.endDate = val;

                if(!this.formItem.startDate){
                    return;
                }

                let params = {
                    start:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.startDate)),
                    end:val
                }
                this.config();

                if(new Date(this.formItem.startDate)>new Date(val)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
              

            },
            contractDateRange:function(params){//获取租赁范围
                let _this = this;
                 this.$http.get('contract-date-range', params, r => {
                    _this.formItem.timeRange = r.data;
                }, e => {

                    console.log('error',e)
                })
            },
            getSaleTactics:function(params){//获取优惠信息
                let list = [];
                let maxDiscount = '';
                let _this = this;
                 this.$http.get('sale-tactics', params, r => {
                    if(r.data.length){
                        list = r.data.map(item=>{
                            let obj = item;
                            obj.label = item.tacticsName;
                            obj.value = item.tacticsType+'';
                            if(item.tacticsType == 1){
                                maxDiscount = obj.discount;
                            }
                            return obj;
                        })
                    }
                    _this.youhui = list;
                    _this.maxDiscount = maxDiscount;

                }, e => {
                    _this.youhui = []

                    console.log('error',e)
                })
            },
             getStationAmount(){
                this.config()
                let val = this.stationList;
                let station = val.map(item=>{
                    let obj = item;
                    obj.originalPrice = item.originalPrice  || item.price;
                    obj.seatId = item.id || item.seatId;
                    obj.floor = item.whereFloor || item.floor;
                    obj.endDate =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate));
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.startDate));
                    return obj;
                })
                let params = {
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate)),
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.startDate)),
                    communityId:this.formItem.communityId,
                    seats:JSON.stringify(station)
                }
                let _this = this;
                if(val.length){
                     this.$http.post('get-station-amount', params, r => {
                        let money = 0;
                        _this.stationList = r.data.seats.map(item=>{
                            let obj = item;
                            money += item.originalAmount;
                            obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                            obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                            return obj;
                        });
                        _this.formItem.rentAmount =  Math.round(money*100)/100;
                        _this.formItem.stationAmount = Math.round(money*100)/100;
                        _this.stationAmount = utils.smalltoBIG(Math.round(money*100)/100)

                    }, e => {
                        _this.$Notice.error({
                            title:e.message
                        })

                        console.log('error',e)
                    })
                }
            }
                    
               
        }
    }
</script>
