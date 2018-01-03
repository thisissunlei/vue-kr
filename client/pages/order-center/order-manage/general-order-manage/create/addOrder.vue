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
   .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
   
   
</style>



<template>
    <div class="create-new-order">
        <sectionTitle label="新建订单"></sectionTitle>
         <div style='padding:0 24px;'>
          <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row style="margin-bottom:30px">  
                <Col class="col">
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
                   <FormItem label="订单类型" style="width:252px" prop='orderType'>
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入订单类型" 
                        style="width: 252px"
                        clearable
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select> 
                 </FormItem>
                </Col>

                <Col class="col">
                   <Form-item label="订单金额" style="width:252px" prop="money">
                    <i-input 
                        v-model="formItem.money" 
                        placeholder="请输入订单金额"
                        style="width: 252px"
                    ></i-input>
                   </Form-item>
                </Col>
                
                <Col class="col">
                    <FormItem label="销售人员" style="width:252px" prop="salerId">
                    <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                    </FormItem>
                </Col>

                <Col  class="col">
                    <FormItem label="销售日期" style="width:252px" prop="signDate">
                    <DatePicker type="date" placeholder="销售日期" format="yyyy-MM-dd" v-model="formItem.signDate" style="display:block"></DatePicker>
                    </FormItem>
                </Col>

                <Col  class="col">
                    <FormItem label="备注信息" prop="otherAgreed" style="width:702px">
                      <Input v-model="formItem.otherAgreed" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入备注..."></Input>
                    </FormItem>
                </Col>
            </Row>

            <FormItem style="margin-top:40px" >
                <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled">提交</Button>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>
      </Form>  
    </div>    
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
                     callback();
                }
            };
            return {
                openStation:false,
                inputNumberType:true,
                selectAll:false,
                discountError:false,
                index:0,
                depositAmount:'',
                disabled:false,
                delStation:[],
                stationAmount:'',
                installmentType:'',
                maxDiscount:'',//折扣最大限制
                timeError:false,//租赁时间校验
                stationData:{
                    submitData:[],
                    deleteData:[],
                    clearAll:false
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
                saleAmount:0,
                saleAmounts:utils.smalltoBIG(0),
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
                    money: [
                        { required: true,message: '请填写金额', trigger: 'change' }
                    ],
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    salerId:[
                        { required: true, message: '请选择销售人员', trigger: 'change' }
                    ],
                    orderType:[
                        { required: true, message: '请选择订单类型', trigger: 'change' }
                    ]
                },
                getFloor:+new Date(),
                changeSale:+new Date(),
                salerName:'请选择',
                ssoId:'',
                errorAmount:false,
                ssoName:'',
                discount:0,

            }
        },
        head() {
            return {
                title: '新建订单'
            }
        },
        components: {
            sectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler,
            planMap,
        },
         mounted(){
            GLOBALSIDESWITCH("false");
        },
        watch:{
           getFloor(){
            let _this = this;
            this.config()
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

                        console.log('error',e)
                })
            }
           },
        },
        methods: {
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            back(){
                window.history.go(-1);
            },
            joinFormSubmit(){
                this.config()
                //处理已删除的数据
                let saleList = this.formItem.items.filter(item=>{
                    if(!item.show){
                        return false;
                    }
                    return true;
                })
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.startDate));
                let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.signDate || new Date()));
                let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.endDate || this.formItem.endDateStatus));
                let formItem = {} 
                saleList = saleList.map(item=>{
                    let obj =Object.assign({},item);
                    obj.validEnd =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validEnd))
                    obj.validStart =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validStart))
                    return obj;
                })
                formItem.installmentType = this.installmentType;
                formItem.deposit = this.depositAmount;
                formItem.saleList=JSON.stringify(saleList);
                formItem.seats=JSON.stringify(this.stationList);
                formItem.customerId=this.formItem.customerId;
                formItem.communityId=this.formItem.communityId;
                formItem.salerId=this.formItem.salerId;
                formItem.signDate = signDate;
                formItem.timeRange=this.formItem.timeRange;

                formItem.rentAmount=this.formItem.rentAmount;
                formItem.firstPayTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00",this.formItem.firstPayTime);

                formItem.startDate = start;
                formItem.endDate =end;
                formItem.ssoId = this.ssoId;
                formItem.ssoName = this.ssoName;
                let _this = this;
                 this.$http.post('save-join', formItem, r => {
                      window.close();
                      window.opener.location.reload();
                }, e => {
                     _this.$Notice.error({
                        title:e.message
                    })

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
                     if(item.tacticsType == '1' && this.discount){
                        item.discount = this.discount
                     }
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

                this.getSaleAmount(saleList)
            },
            getSaleAmount(list){
                this.config()
                let params = {
                    communityId:this.formItem.communityId,
                    leaseBegindate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",this.formItem.startDate),
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",this.formItem.endDate),
                    seats:JSON.stringify(this.stationList),
                    saleList:JSON.stringify(list)
                };
                let _this = this;
                 this.$http.post('count-sale', params, r => {
                    _this.disabled = false;
                    _this.discountError = false;
                    let money = r.data.originalTotalrent - r.data.totalrent;
                    _this.saleAmount = Math.round(money*100)/100;
                    _this.saleAmounts = utils.smalltoBIG(Math.round(money*100)/100);
                    _this.formItem.rentAmount = r.data.totalrent;
                }, e => {
                    _this.disabled = true;
                    _this.discountError = e.message;

                     _this.$Notice.error({
                        title:e.message
                    })
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

                

                
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        if(this.errorPayType || this.errorAmount){
                            this.$Notice.error({
                                title:'请填写完表单'
                            });
                            return;
                        }
                        if(!_this.stationList.length){
                            _this.$Notice.error({
                                title:'请选择入驻工位'
                            });
                            _this.disabled = false;
                            return
                        }
                        this.disabled = true;
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
                        item.show = false
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
                    this.formItem.items = [];
                    this.formItem.rentAmount = '0'
                }
                if(this.formItem.items.length){
                    this.formItem.items = []
                }
                if(this.discountError){
                    this.discountError = false;
                    this.disabled = false

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
                this.openStation = false

            },
            
            changeBeginTime:function(val){//租赁开始时间的触发事件，判断时间大小
                this.clearStation()
                if(!val || !this.formItem.endDate){
                    return;
                }
                let error = false;
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
            changeEndTime:function(val){//租赁结束时间的触发事件，判断时间大小
                this.clearStation()
                if(!val){
                    return;
                }

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
                this.clearStation();

            },
            changeEndDateStatus(val){
                this.clearStation()
                if(!val){
                    return;
                }

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
                if(new Date(this.formItem.startDate)>=new Date(val)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于等于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
                this.clearStation();
            },
            contractDateRange:function(params){//获取租赁范围
                let _this = this;
                this.config();
                 this.$http.get('contract-date-range', params).then( r => {
                    _this.formItem.timeRange = r.data;
                }).catch( e => {
                    _this.$Notice.error({
                        title:e.message
                    });

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
                    }else{
                        list = []
                    }
                    _this.youhui = list;
                    _this.maxDiscount = maxDiscount;

                }, e => {
                     _this.youhui = [];
                    console.log('error',e)
                })
            },
             getStationAmount(){
                this.config()
                let val = this.stationList;
                let station = val.map(item=>{
                    let obj = item;
                    obj.originalPrice = item.price;
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
                     this.$http.post('get-station-amount', params).then( r => {
                        let money = 0;
                        console.log('get-station-amount',r)
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

                    }).catch( e => {
                        _this.$Notice.error({
                            title:e.message
                        })

                        console.log('error',e)
                    })
                }
            },
                    
               
        }
    }
</script>