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
        <sectionTitle label="新建入驻服务订单管理"></sectionTitle>
         <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
            <Row style="margin-bottom:30px">  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px" prop="customer">
                    <selectCustomers name="formItem.customer" :onchange="changeCustomer"></selectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px"  prop="community">
                    <selectCommunities name="formItem.community" :onchange="changeCommunity"></selectCommunities>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="saler">
                    <selectSaler name="formItem.saler" :onchange="changeSaler"></selectSaler>
                    </FormItem>
                </Col>
            </Row>
            </DetailStyle>
            <DetailStyle info="租赁信息">
            <Row  style="margin-bottom:30px">   
                <Col class="col">
                    <FormItem label="租赁开始日期" style="width:252px" prop="beginDate">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.beginDate" style="display:block" @on-change="changeBeginTime"></DatePicker>
                        <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div>
                    </FormItem>
                    
                </Col>
                
                <Col  class="col">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                    <DatePicker type="date" placeholder="租赁结束日期" v-model="formItem.endDate" style="display:block" @on-change="changeEndTime"></DatePicker>
                    </FormItem>
                </Col>
                 <Col class="col">
                    <FormItem label="租赁时长" style="width:252px" prop="time">
                        <Input v-model="formItem.timeRange" placeholder="租赁时长"></Input>
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
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
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
                    <Col span="1" class="discount-table-head"  >
                        <Checkbox v-model="selectAll" @on-change="selectDiscount"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-head" >
                       <span> 优惠类型</span>
                    </Col>
                    <Col span="4" class="discount-table-head" >
                        <span>开始时间</span>
                    </Col>
                    <Col span="4" class="discount-table-head" >
                        <span>结束时间</span>
                        
                    </Col>
                    <Col span="4" class="discount-table-head" >
                        <span>折扣</span>
                        
                    </Col>
                    <Col span="5" class="discount-table-head" style="border-right:1px solid #e9eaec;">
                        <span>优惠金额</span>
                    </Col>
                    
                </Row>
                    <FormItem
                v-for="(item, index) in formItem.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                :prop="'items.' + index + '.type'"
                :rules="{required: true, message: '此项没填完', trigger: 'blur'}">
            <Row v-bind:class="{lastRow:index==formItem.items.length-1}" v-show="item.show">
                 <Col span="1" class="discount-table-content" style="padding:0">
                        <Checkbox v-model="item.select"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-content">
                         <Select v-model="item.type" @on-change="changeType">
                            <Option v-for="types in youhui" :value="types.value+'-'+index" :key="types.value" >{{ types.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="4" class="discount-table-content" ></DatePicker>
                        <DatePicker type="date" v-if="item.value == 'qianmian' || item.value == 'zhekou'" placeholder="开始时间" v-model="item.beginDate" disabled></DatePicker >
                        <DatePicker type="date" v-if="item.value !== 'qianmian' && item.value !== 'zhekou'" placeholder="开始时间" v-model="item.beginDate" ></DatePicker >
                    </Col>
                    <Col span="4" class="discount-table-content">
                        <DatePicker type="date" v-if="item.value == 'houmian'|| item.value == 'zhekou'" placeholder="开始时间" v-model="item.endDate" disabled ></DatePicker >
                    
                        <DatePicker type="date" placeholder="结束时间" v-if="item.value !== 'houmian'&& item.value !== 'zhekou'" v-model="item.endDate" ></DatePicker>
                    </Col>
                    <Col span="4" class="discount-table-content">
                        <Input v-model="item.zhekou" placeholder="折扣" v-if="item.value == 'zhekou'"></Input>
                        <Input v-model="item.zhekou" v-if="item.value !== 'zhekou'" placeholder="折扣" disabled></Input>

                        
                    </Col>
                    <Col span="5" class="discount-table-content" style="border-right:1px solid #e9eaec;">
                        <Input v-model="item.money" placeholder="金额" disabled></Input>
                    </Col>   
            </Row>
        </FormItem>
        </DetailStyle>
        <div style="padding-left:24px">
                 <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <div class="total-money" v-if="formItem.items.length">
                        <span>服务费总计</span>
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
                    </div>
                    </Col>
                </Row>
            <Row>
                 <Col class="col">
                    <FormItem label="服务费总额" style="width:252px">
                        <Input v-model="formItem.totalMoney" placeholder="服务费总额" disabled></Input>
                    </FormItem>
                 </Col>
                 <Col class="col">
                    <FormItem label="首付款日期" style="width:252px">
                        <DatePicker type="date" placeholder="首付款日期" style="width:252px" v-model="formItem.endDate" disabled ></DatePicker >
                    </FormItem> 
                 </Col>
            </Row>
            <Row style="">
                 <Col class="col">
                    <span class="required-label" style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:payType==types.value}">{{ types.label }}</span>
                        </div>
                        <div class="pay-error" v-if="errorPayType">请选择付款方式</div>

                 </Col>
                 <Col class="col">
                    <span style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.label)" v-bind:class="{active:depositType==types.label}">{{ types.label }}</span>
                        </div>
                 </Col>
            </Row>
            
                
         </div>   
        <FormItem style="padding-left:24px;margin-top:40px" >
            <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled">提交</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </FormItem>

    </Form>
    
    <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="750"
        @on-ok="submitStation"
        @on-cancel="cancelStation"
         class-name="vertical-center-modal"
     >
        <planMap :floors.sync="floors" :params.sync="params" :stationData.sync="stationData" @on-result-change="onResultChange"></planMap>
    </Modal>

        
    </div>
</template>


<script>
import sectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import selectSaler from '~/components/SelectSaler.vue'
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';





    export default {
        data() {
            const validateFloor = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Age cannot be empty'));
                }else{
                    callback();
                }
            };
            return {
                openStation:false,
                selectAll:false,
                discountError:false,
                index:0,
                depositType:'',
                disabled:false,
                delStation:[],
                payType:'',
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
                    {label:'2个月',value:'2个月'},
                    {label:'3个月',value:'3个月'},
                    {label:'4个月',value:'4个月'},
                    {label:'5个月',value:'5个月'},
                    {label:'6个月',value:'6个月'},
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
                        key: 'price'
                    },
                    {
                        title: '租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong', dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.beginDate))+'至'+dateUtils.dateToStr("YYYY-MM-DD",new Date(this.formItem.endDate)))
                        }
                    },
                    {
                        title: '小计',
                        key: 'price'
                    }
                ],
                stationList: [
                ],
                floors:[{
                    value:'4',
                    label:'4'
                },{
                    value:'3',
                    label:'3'
                },{
                    value:'2',
                    label:'2'
                }],
                selectedStation:[],
                formItem: {
                    customer: '',
                    community: '',
                    beginDate: dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    endDate: '',
                    timeRange:'',
                    floor:'',
                    city:'',
                    items:[]
                },
                errorPayType:false,//付款方式的必填错误信息
                ruleCustom:{
                    beginDate: [
                        { required: true,type: 'date', message: '请先选择开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { required: true, type: 'date',message: '请先选择结束时间', trigger: 'change' }
                    ],
                    time: [
                        { required: true, message: '请填写在租赁时长', trigger: 'blur' }
                    ],
                    // city:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    // floor:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    community:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customer:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    saler:[
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    // floor: [
                    //     { validator: validateFloor, trigger: 'change' }
                    // ],
                }
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
            selectSaler,
            planMap
        },
        created(){
            // this.openStation = false
        },
        methods: {
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            handleSubmit:function(name) {
                let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
                if(!this.payType){
                    this.errorPayType = true
                }
                if(this.timeError){
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    });
                    return
                }
                this.disabled = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        _this.disabled = false;

                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },
            selectDiscount:function(value){
                // checkbox的选中事件
                let items = this.formItem.items;
                items = items.map((item)=>{
                    let obj = item;
                    obj.select = value;
                    return obj;
                })
                this.formItem.items = items;
            },
            deleteDiscount:function(){
                // 删除选中的优惠信息
                let items = this.formItem.items;
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
                this.formItem.items = items;

            },
            
            changeType:function(value){
                //优惠类型选择
                if(!value){
                    return;
                }
                this.config()
                let itemValue = value.split('-')[0];
                let itemIndex = value.split('-')[1];
                this.formItem.items[itemIndex].value = itemValue;
                let items = [];
                items = this.formItem.items.map((item)=>{
                    if(item.value == 'qianmian'){
                        item.endDate = new Date()
                        item.zhekou = '';
                    }else if(item.value == 'houmian'){
                        item.endDate = new Date()
                        item.zhekou = '';
                    }else if(item.value == 'zhekou'){
                        item.beginDate = new Date()
                        item.endDate = new Date()
                    }
                    return item;
                })
                let error=false;
                let message = '';
                
                let typeList = items.map(item=>{
                    if(item.show){
                        return item.value;
                    }else{
                        return;
                    }
                })
                let qianmian = typeList.join(",").split('qianmian').length-1;
                let houmian = typeList.join(",").split('houmian').length-1;
                let zhekou = typeList.join(",").split('zhekou').length-1;
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
            },
            changeCommunity:function(value){
                // 选择社区
                if(value){
                    this.formItem.community = value;
                    this.getSaleTactics({communityId:value})
                }else{
                    this.formItem.community = '';
                }
                this.clearStation()
                
            },
            clearStation:function(){
                // 清除所选的工位
                this.stationData={
                    submitData:[],
                    deleteData:[],
                };
                this.stationList = [];
            },
            changeCustomer:function(value){
                // 客户
                if(value){
                    this.formItem.customer = value;
                }else{
                    this.formItem.customer = '';
                }
            },
            changeSaler:function(value){
                // 销售员
                this.formItem.saler = value;
            },
            deleteStation:function(){
                // 工位表单的删除按钮
                let stationVos = this.stationList;
                let selectedStation = this.selectedStation;
                stationVos = stationVos.filter(function(item, index) {
                    if (selectedStation.indexOf(item.id) != -1) {
                        return false;
                    }
                return true;
                });
                this.stationList = stationVos;
                this.stationData.submitData = stationVos;
            },
            showStation:function(){
                // 选择工位的按钮
                this.config()

                if(!this.formItem.community){
                    this.$Notice.error({
                            title:'请先选择社区'
                        });
                    return;
                }
                if(!this.formItem.beginDate){
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
                let params = {
                    floor:'3,4,2',
                    communityId:this.formItem.community,
                    mainBillId:3162,
                    startDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.beginDate)),
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
                    return item.id
                })
                this.selectedStation = selectionList;
            },
            handleAdd () {
                // 优惠信息的添加按钮
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
                this.depositType = value
            },
            selectPayType:function(value){
                // 选择付款方式
                this.payType = value;
                this.errorPayType = false;
            },
            submitStation:function(){//工位弹窗的提交
                this.stationList = this.stationData.submitData;
                this.delStation = this.stationData.deleteData;

            },
            onResultChange:function(val){//组件互通数据的触发事件
                this.stationData = val;
                
            },
            cancelStation:function(){//工位弹窗的取消
                this.stationData = {
                    submitData:this.stationList,
                    deleteData:[],
                };

            },
            changeBeginTime:function(val){//租赁开始时间的触发事件，判断时间大小
                let error = false;
                this.config();
                val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(val))
                let params = {
                    end:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate)),
                    start:val
                }
                if(new Date(val)>new date(this.formItem.endDate)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
                this.clearStation()
            },
            changeEndTime:function(val){//租赁结束时间的触发事件，判断时间大小
                let error = false;
                val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(val));
                let params = {
                    start:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.beginDate)),
                    end:val
                }
                this.config();
                if(new Date(this.formItem.beginDate)>new Date(val)){
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
            contractDateRange:function(params){//获取租赁范围
                let _this = this;
                axios.get('contract-date-range', params, r => {
                    console.log('contract-date-range',r.data)
                    _this.formItem.timeRange = r.data;
                }, e => {

                    console.log('error',e)
                })
            },
            getSaleTactics:function(params){//获取优惠信息
                let list = [];
                let _this = this;
                axios.get('sale-tactics', params, r => {
                    if(r.data.length){
                        list = r.data.map(item=>{
                            let obj = item;
                            obj.label = item.tacticsName;
                            switch(item.tacticsType){
                                case 1:
                                    obj.value = 'zhekou';
                                    break;
                                case 2:
                                    obj.value = 'qianmian';
                                    break;
                                default:
                                    obj.value = 'houmian';
                                    break;
                            }
                            return obj;
                        })
                    }
                    _this.youhui = list;

                }, e => {

                    console.log('error',e)
                })
            },
            countSale(params){//计算优惠信息
                axios.get('count-sale', params, r => {
                    console.log('countSale',r.data)

                }, e => {

                    console.log('error',e)
                })
            }
                    
               
        }
    }
</script>