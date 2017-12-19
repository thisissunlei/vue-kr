<style lang="less"> 
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
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
       <SectionTitle label="编辑续租服务订单管理"></SectionTitle>
        <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="续租信息">
            <Row style="margin-bottom:20px">  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px"  prop="customerId">
                    <SelectCustomers name="renewForm.customerId" :onchange="changeCustomer" :value="customerName"></SelectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px" prop="communityId" >
                    <SelectCommunities test="renewForm" :onchange="changeCommunity" :value="communityName"></SelectCommunities>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="续租结束日期" style="width:252px" prop="endDate" >
                        <DatePicker type="month" placeholder="续租结束日期" format="yyyy-MM-dd" v-model="renewForm.endDate" style="display:block" @on-change="changeTime"></DatePicker>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="salerId">
                    <SelectSaler name="renewForm.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
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
                    <Table border ref="selection" :columns="columns" :data="selecedStation" @on-selection-change="selectRow"></Table>
                    <div class="total-money" v-if="selecedStation.length">
                        <span>服务费总计</span>
                        <span class="money">{{renewForm.stationAmount}}</span>
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
                   <!--  <Col span="5" class="discount-table-head" style="border-right:1px solid #e9eaec;">
                        <span>优惠金额</span>
                    </Col> -->
                    
                </Row>
                    <FormItem
                v-for="(item, index) in renewForm.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                :prop="'items.' + index + '.type'"
                :rules="{required: true, message: '此项没填完', trigger: 'blur'}">
            <Row v-bind:class="{lastRow:index==renewForm.items.length-1}" v-show="item.show">
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
                    
                        <!-- <DatePicker type="date" placeholder="结束时间" v-show="item.tacticsType == 'zhekou'" v-model="item.validEnd" ></DatePicker> -->
                    </Col>
                    <Col span="5" class="discount-table-content">
                        <InputNumber v-model="item.discount" placeholder="折扣" v-if="item.tacticsType == '1'" :max="maxDiscount" :min="1" :step="1.2" @on-change="changezhekou"></InputNumber>
                        <Input v-model="item.zhekou" v-if="item.tacticsType !== '1'" placeholder="折扣" disabled></Input>

                        
                    </Col>  
            </Row>
        </FormItem>
        </DetailStyle>
              <div style="padding-left:24px">
            <Row>
                 <Col class="col">
                    <FormItem label="服务费总额" style="width:252px">
                        <Input v-model="renewForm.rentAmount" placeholder="服务费总额" disabled></Input>
                    </FormItem>
                 </Col>
            </Row>
            <Row>
                <Col class="col">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:installmentType==types.value}">{{ types.label }}</span>
                        </div>
                        <div class="pay-error" v-if="errorPayType">请选择付款方式</div>

                 </Col>
                 <Col class="col">
                    <span style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.value)" v-bind:class="{active:depositAmount==types.value}">{{ types.label }}</span>
                        </div>
                 </Col>
            </Row>
            </div>
            
                
          
            <FormItem style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
            <!-- <Button type="ghost" style="margin-left: 8px">重置</Button> -->
        </FormItem>
        </Form>
        <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="600"

        @on-ok="submitStation"
        @on-cancel="cancelStation"
         class-name="vertical-center-modal"
     >
        <stationList label="可续租工位" :stationList="stationListData" :selecedStation="selecedStation" 
        @on-station-change="onStationChange" v-if="openStation"></stationList>
    </Modal>
    </div>
</template>


<script>
import SectionTitle from '~/components/SectionTitle.vue'
import SelectCommunities from '~/components/SelectCommunities.vue'
import SelectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import stationList from './stationList.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';




    export default {
        data() {
           return{
                disabled:false,//提交按钮是否有效
                index:1,//优惠的index
                openStation:false,//弹窗开关
                stationAmount:'',
                communityName:'',
                customerName:'',
                salerName:'',
               renewForm:{
                    communityId:'',
                    customerId:'',
                    endDate:'',
                    saler:'',
                    rentAmount:'',
                    items:[]
               },
               disabled:false,//提交按钮是否禁止
               discountError:{
                error:false,
                message:''
               },
               selectedDel:[],//选择要删除的工位
               ruleCustom:{
                    // communityId:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    // customerId:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    // salerId:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    // time: [
                    //     { required: true,type: 'date', message: '此项不可为空!', trigger: 'change' }
                    // ],
                    // endDate: [
                    //     { required: true, type: 'date',message: '此项不可为空', trigger: 'change' }
                    // ],
               },
               stationListData:[],
               selecedStation:[],
               selecedArr:[],
               depositAmount:'',
               installmentType:'',
               maxDiscount:'',
               columns: [
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
                        key: 'price'
                    },
                    {
                        title: '租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong', dateUtils.dateToStr("YYYY-MM-dd",new Date(params.row.startDate))+'至'+dateUtils.dateToStr("YYYY-MM-dd",new Date(params.row.endDate)))
                        }
                    },
                    {
                        title: '小计',
                        key: 'amount'
                    }
                ],
                payList:[
                    {value:'ONE',label:'月付'},
                    {value:'TWO',label:'两月付'},
                    {value:'THREE',label:'季付'},
                    {value:'SIX',label:'半年付'},
                    {value:'TWELVE',label:'年付'},
                    {value:'ALL',label:'全款'},
                ],
                depositList:[
                    {label:'2个月',value:'2'},
                    {label:'3个月',value:'3'},
                    {label:'4个月',value:'4'},
                    {label:'5个月',value:'5'},
                    {label:'6个月',value:'6'},
                ],
                selectAll:false,//工位全选
                youhui:[],
                errorPayType:false,
                getStationFn:'',
                stationAmount:'',

           }
        },
        head() {
            return {
                title: '编辑续租服务订单管理'
            }
        },
        components: {
            SectionTitle,
            SelectCommunities,
            DetailStyle,
            SelectCustomers,
            SelectSaler,
            stationList,
            planMap
        },
        mounted(){
            this.getDetailData();
        },
        watch:{
            getStationFn:function(){
                if(this.renewForm.customerId && this.renewForm.communityId && this.renewForm.endDate){
                    this.getRenewStation()
                }
                if(this.renewForm.communityId){
                    this.getSaleTactics({communityId:this.renewForm.communityId})
                }
            },
            selecedStation(){
                this.renewForm.items = []
            }
        },
        methods: {
            getDetailData(){
                let _this = this;
                let {params}=this.$route;
                let from={
                    // id:4095
                    id:params.orderEdit
                };
                this.$http.get('join-bill-detail', from, r => {
                    let data = r.data;
                    data.orderSeatDetailVo = data.orderSeatDetailVo.map(item=>{
                        let obj = item;
                        obj.name = item.seatName;
                        return obj;
                    })
                    _this.renewForm.customerId = data.customerId;
                    _this.customerName = data.customerName;
                    _this.renewForm.communityId = data.communityId;
                     _this.salerName = data.salerName;
                    _this.renewForm.salerId = data.salerId;
                    _this.communityName = data.communityName;
                    _this.renewForm.endDate = data.endDate;
                    _this.renewForm.startDate = data.startDate;
                    _this.selecedStation = data.orderSeatDetailVo;
                    _this.renewForm.rentAmount = data.rentAmount;
                    _this.installmentType = 'THREE';
                    _this.depositAmount = '3';
                    _this.getStationFn = +new Date();
                    _this.renewForm.stationAmount = data.rentAmount;
                    _this.stationAmount = utils.smalltoBIG(data.rentAmount)
                    _this.getSaleTactics({communityId:data.customerId})
                    }, e => {
                        _this.$Message.info(e);
                })
            },
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            renewFormSubmit(){
                this.config()
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.startDate));
                let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.endDate));
                let renewForm = {} 
                let saleList = this.renewForm.items;
                 saleList = saleList.map(item=>{
                    let obj =Object.assign({},item);
                    console.log('dealSaleInfo',item.validEnd,dateUtils.dateToStr("YYYY-MM-dd 00:00:00",item.validEnd));
                    obj.validEnd =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validEnd))
                    obj.validStart =  dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(item.validStart))
                    return obj;
                })
                renewForm.installmentType = this.installmentType;
                renewForm.depositAmount = this.depositAmount;
                renewForm.saleList=JSON.stringify(saleList);
                renewForm.seats=JSON.stringify(this.selecedStation);
                renewForm.customerId=this.renewForm.customerId;
                renewForm.communityId=this.renewForm.communityId;
                renewForm.salerId=this.renewForm.salerId;
                renewForm.rentAmount=this.renewForm.rentAmount;
                // renewForm.firstPayTime=dateUtils.dateToStr("YYYY-MM-dd 00:00:00",this.renewForm.firstPayTime);

                renewForm.startDate = start;
                renewForm.endDate =end;
                renewForm.corporationId = 11;//临时加的-无用但包错
                let _this = this;
                 this.$http.post('save-renew', renewForm, r => {
                    window.location.href='/orderCenter/orderManage';
                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });
                    setTimeout(function(){
                        _this.disabled = false;
                    },500)

                        console.log('error',e)
                })
                
            },
            handleSubmit:function(name){
                let message = '请填写完整表单';
                this.config()
                let _this = this;
                this.disabled = true;
                if(!this.installmentType){
                    this.errorPayType = true
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.renewFormSubmit()
                        this.$Message.success('Success!');
                    } else {
                        _this.disabled = false;

                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },
            getRenewStation(){
                let params = {
                    //假数据
                    customerId:this.renewForm.customerId,
                    communityId:this.renewForm.communityId,
                    continueDate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.endDate))
                };
                let _this = this;
               this.$http.get('get-renew-station', params, r => {
                    let station = []
                    for(let i in r.data){
                        let obj = {};
                        obj.name = dateUtils.dateToStr("YYYY-MM-dd",new Date(i));

                        obj.value =  r.data[i];
                        station.push(obj)
                    }
                    _this.stationListData = station;
                 
                }, e => {

                    console.log('error',e)
                })

            },
            changeCustomer:function(value){
                if(value){
                    this.renewForm.customerId = value;
                    this.getStationFn = +new Date()
                    this.clearStation()
                }else{
                    this.renewForm.customerId = '';
                }

            },
            changeCommunity:function(value){
                if(value){
                    this.renewForm.communityId = value;
                    this.getStationFn = +new Date()
                }else{
                    this.renewForm.communityId = '';
                }
                this.clearStation()
            },
            clearStation(){
                // 清除所选的工位
                if(this.selecedStation.length){
                    this.selecedStation = [];
                    this.selecedArr = [];
                }
                if(this.renewForm.items.length){
                    this.renewForm.items = []
                }
                this.renewForm.rentAmount = '0'

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
            changeTime:function(value){
                value = this.dealEndDate(value);
                this.renewForm.endDate = value;
                this.clearStation()
                let _this = this;
                setTimeout(function(){
                 _this.getStationFn = +new Date()

                },200)
            },
            changeSaler:function(value){
                this.renewForm.salerId = value;
            },
            showStation:function(){
                this.config();
                if(!this.renewForm.communityId){
                    this.$Notice.error({
                        title:'请先选择社区'
                    });
                    return
                }
                if(!this.renewForm.customerId){
                    this.$Notice.error({
                        title:'请先选择客户'
                    });
                    return
                }
                if(!this.renewForm.endDate){
                    this.$Notice.error({
                        title:'请先选择续租结束时间'
                    });
                    return
                }
                this.openStation =true;
            },
            selectDeposit:function(value){
                this.depositAmount = value;

            },
            selectPayType:function(value){
                this.installmentType  = value;
                this.errorPayType = false;
            },
            handleAdd:function(){
                this.config()

                if(!this.renewForm.communityId){
                    this.$Notice.error({
                        title:'请先选择社区'
                    });
                    return
                }
                if(!this.renewForm.customerId){
                    this.$Notice.error({
                        title:'请先选择客户'
                    });
                    return
                }
                if(!this.renewForm.endDate){
                    this.$Notice.error({
                        title:'请先选择续租结束时间'
                    });
                    return
                }
                if(!this.selecedStation.length){
                    this.$Notice.error({
                        title:'请先选择续租工位'
                    });
                    return
                }
                this.index++;
                this.renewForm.items.push({
                    value: '',
                    index: this.index,
                    show:true,
                    status: 1,
                    type:''
                });
            },
            deleteDiscount:function(){
                let items = this.renewForm.items;
                let select = []
                select = items.map((item)=>{
                    return item.selelct;
                })
                items = items.filter(function(item, index) {
                    if (item.select) {
                        return false;
                    }
                return true;
                });
                this.renewForm.items = items;
                this.selectDiscount(false)
                this.dealSaleInfo()

                // this.setCheckFalse(items)

            },
            deleteStation:function(){
                let stationVos = this.selecedStation;
                let delArr = this.selectedDel;
                stationVos = stationVos.filter(function(item, index) {
                    if (delArr.indexOf(item.seatId) != -1) {
                        return false;
                    }
                return true;
                });
                console.log('deleteStation==============',stationVos)
                this.selecedStation = stationVos;
                this.selecedArr = stationVos;
                this.getStationAmount()

            },
            selectRow:function(val){
                let selectionList = [];
                selectionList = val.map((item)=>{
                    return item.seatId
                })
                this.selectedDel = selectionList;
            },
            selectDiscount:function(value){
                let items = this.renewForm.items;
                items = items.map((item)=>{
                    let obj = item;
                    obj.select = value;
                    return obj;
                })
                this.selectAll = value;
                this.renewForm.items = items;
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
            //优惠类型选择
            changeType:function(value){
                //优惠类型选择
                if(!value){
                    return;
                }
                this.config()
                let _this = this;
                let itemValue = value.split('-')[0];
                let itemIndex = value.split('-')[1];
                this.renewForm.items[itemIndex].tacticsType = itemValue;

                let items = [];
                items = this.renewForm.items.map((item)=>{
                    if(item.tacticsType == 'qianmian'){
                        item.validStart = this.renewForm.startDate;
                        item.discount = '';
                        item.tacticsId = this.getTacticsId()
                    }else if(item.tacticsType == 3){
                        item.validEnd = this.renewForm.endDate
                        item.tacticsId = this.getTacticsId('3')

                        item.discount = '';
                    }else if(item.tacticsType == 1){
                        item.validStart=this.renewForm.startDate
                        item.tacticsId = this.getTacticsId('1')
                        item.validEnd = this.renewForm.endDate
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
                this.renewForm.items = items;
            },
            submitStation:function(){
                let val = this.selecedArr || [];
                if(!val.length){
                    return;
                }

                let day = 1000 * 60* 60*24;
                let start =  val[0].startDate + day;
                this.renewForm.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(start));
                this.getStationAmount()
            },
            getStationAmount(){

                let val = this.selecedArr;
                let _this = this;
                this.config()
               
                let station = val.map(item=>{
                    let obj = item;
                    obj.originalPrice = item.price;
                    obj.seatId = item.id || item.seatId;
                    obj.floor = item.whereFloor || item.floor;
                    obj.startDate = this.renewForm.startDate;
                    obj.endDate =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.renewForm.endDate));
                    return obj;
                })
                let params = {
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.renewForm.endDate)),
                    leaseBegindate:this.renewForm.startDate,
                    // communityId:this.renewForm.communityId,
                    communityId:4,
                    seats:JSON.stringify(station)
                }
                if(val.length){
                     this.$http.post('get-station-amount', params, r => {
                        let money = 0;
                         _this.selecedStation = r.data.seats.map(item=>{
                            let obj = item;
                            money+=item.amount;
                            obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate))
                            obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                            return obj;
                        });
                        _this.renewForm.rentAmount =  Math.round(money*100)/100;
                        _this.renewForm.stationAmount = Math.round(money*100)/100;
                        _this.stationAmount = utils.smalltoBIG(Math.round(money*100)/100)


                    }, e => {
                        _this.$Notice.error({
                            title:e.message
                        });

                        console.log('error',e)
                    })
                }
            },
            cancelStation:function(){
                this.selecedStation = this.selecedStation.map(item=>{
                    let obj =item
                    obj.time = +new Date()
                    return obj;
                })
            },
            onStationChange:function(val){
                console.log('onStationChange',val)
                this.selecedArr = val;
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
                            obj.tacticsId = item.tacticsId;
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

                    console.log('error',e)
                })
            },
            setCheckFalse(item){
                //删除后优惠checkbox全部设为false
                this.selectDiscount(false)

            },
            changeSaleTime(val){
                let _this = this;
                setTimeout(function(){
                    _this.dealSaleInfo()
                },200)
            },
            changezhekou(val){
                this.dealSaleInfo()
            },
            dealSaleInfo(){
                this.config()
                //处理已删除的数据
                let saleList = this.renewForm.items.filter(item=>{
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
                        complete = false

                    }
                    if(item.tacticsType == '1' && !item.discount){
                        complete = false

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
                let _this = this;
                let params = {
                    communityId:this.renewForm.communityId,
                    leaseBegindate:this.renewForm.startDate,
                    leaseEnddate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",this.renewForm.endDate),
                    seats:JSON.stringify(this.selecedStation),
                    saleList:JSON.stringify(list)
                };
                 this.$http.post('count-sale', params, r => {
                    _this.renewForm.rentAmount =  Math.round(r.data.totalrent*100)/100;
                    console.log('rentAmount',_this.renewForm.rentAmount)
                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                        console.log('error',e)
                })

            },

                    
               
        }
    }
</script>