<style lang="less"> 
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
       <sectionTitle label="新建续租服务订单管理"></sectionTitle>
        <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="续租信息">
            <Row style="margin-bottom:20px">  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px"  prop="customer">
                    <selectCustomers name="renewForm.customer" :onchange="changeCustomer"></selectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px" prop="community" >
                    <selectCommunities name="renewForm.community" :onchange="changeCommunity"></selectCommunities>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="续租结束日期" style="width:252px" prop="time" >
                        <DatePicker type="date" placeholder="续租结束日期" v-model="renewForm.endDate" style="display:block" @on-change="changeTime"></DatePicker>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="saler">
                    <selectSaler name="renewForm.saler" :onchange="changeSaler" ></selectSaler>
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
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
                    </div>
                </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="优惠信息">
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
                v-for="(item, index) in renewForm.items"
                :key="index"
                style="margin:0;border:1px solid e9eaec;border-top:none;border-bottom:none"
                :prop="'items.' + index + '.type'"
                :rules="{required: true, message: '此项没填完', trigger: 'blur'}">
            <Row v-bind:class="{lastRow:index==renewForm.items.length-1}">
                 <Col span="1" class="discount-table-content" style="padding:0">
                        <Checkbox v-model="item.select"></Checkbox>
                    </Col>
                    <Col span="6" class="discount-table-content">
                         <Select v-model="item.type" @on-change="changeType">
                            <Option v-for="types in youhui" :value="types.value" :key="types.value" >{{ types.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="4" class="discount-table-content" ></DatePicker>
                        <DatePicker type="date" v-if="item.type == 'qianmian'" placeholder="开始时间" v-model="item.beginDate" disabled></DatePicker >
                        <DatePicker type="date" v-if="item.type !== 'qianmian'" placeholder="开始时间" v-model="item.beginDate" ></DatePicker >
                    </Col>
                    <Col span="4" class="discount-table-content">
                        <DatePicker type="date" placeholder="结束时间" v-if="item.type !== 'houmian'" v-model="item.endDate" ></DatePicker>
                        <DatePicker type="date" v-if="item.type == 'houmian'" placeholder="开始时间" v-model="item.endDate" disabled ></DatePicker >
                    </Col>
                    <Col span="4" class="discount-table-content">
                        <Input v-model="item.zhekou" placeholder="折扣" v-if="item.type == 'zhekou'"></Input>
                        <Input v-model="item.zhekou" v-if="item.type !== 'zhekou'" placeholder="折扣" disabled></Input>

                        
                    </Col>
                    <Col span="5" class="discount-table-content" style="border-right:1px solid #e9eaec;">
                        <Input v-model="item.money" placeholder="金额" disabled></Input>
                    </Col>   
            </Row>
        </FormItem>
                 <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <div class="total-money" v-if="renewForm.items.length">
                        <span>服务费总计</span>
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
                    </div>
                    </Col>
                </Row>
            <Row>
                 <Col class="col">
                    <FormItem label="服务费总额" style="width:252px">
                        <Input v-model="renewForm.totalMoney" placeholder="服务费总额" disabled></Input>
                    </FormItem>
                 </Col>
            </Row>
            <Row>
                 <Col class="col">
                    <span style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in payList" :key="types.value" class="button-list" v-on:click="selectPayType(types.value)" v-bind:class="{active:payType==types.value}">{{ types.label }}</span>
                        </div>

                 </Col>
                 <Col class="col">
                    <span style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">履约保证金总额</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.label)" v-bind:class="{active:depositType==types.label}">{{ types.label }}</span>
                        </div>
                 </Col>
            </Row>
            
                
            </DetailStyle>
            <FormItem style="padding-left:24px;margin-top:40px">
            <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </FormItem>
        </Form>
        <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="450"
        @on-ok="submitStation"
        @on-cancel="cancelStation"
         class-name="vertical-center-modal"
     >
        <stationList label="可续租工位" :stationList="stationList" :selecedStation="selecedStation" 
        @on-station-change="onStationChange"></stationList>
    </Modal>
    </div>
</template>


<script>
import sectionTitle from '~/components/sectionTitle.vue'
import selectCommunities from '~/components/selectCommunities.vue'
import selectCustomers from '~/components/selectCustomers.vue'
import selectSaler from '~/components/selectSaler.vue'
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/detailStyle';
import planMap from '~/components/planMap.vue';
import stationList from './stationList.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';



    export default {
        data() {
           return{
                disabled:false,//提交按钮是否有效
                index:0,//优惠的index
                openStation:false,//弹窗开关
               renewForm:{
                    community:'',
                    customer:'',
                    endDate:'',
                    saler:'',
                    items:[]
               },
               selectedDel:[],//选择要删除的工位
               ruleCustom:{
                    community:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    customer:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    time: [
                        { required: true, message: '此项不可为空', trigger: 'blur' }
                    ],
                    saler:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ]
               },
               stationList:[
                    {name:'301',id:'301',price:'1800'},
                    {name:'302',id:'302',price:'1800'},
                    {name:'303',id:'303',price:'1800'},
                    {name:'304',id:'304',price:'1800'},
                    {name:'305',id:'305',price:'1800'},
                    {name:'306',id:'306',price:'1800'},
               ],
               selecedStation:[],
               selecedArr:[],
               depositType:'',
               payType:'',
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
                            return h('strong', new Date()+'至'+this.renewForm.endDate)
                        }
                    },
                    {
                        title: '小计',
                        key: 'price'
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
                    {label:'2个月',value:'2个月'},
                    {label:'3个月',value:'3个月'},
                    {label:'4个月',value:'4个月'},
                    {label:'5个月',value:'5个月'},
                    {label:'6个月',value:'6个月'},
                ],
                selectAll:false,//工位全选
                youhui:[
                    {
                        label:'折扣',
                        value:'zhekou'
                    },
                    {
                        label:'前免',
                        value:'qianmian'
                    },
                    {
                        label:'后免',
                        value:'houmian'
                    }

                ],


           }
        },
        head() {
            return {
                title: '新建续租服务订单管理'
            }
        },
        components: {
            sectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            selectSaler,
            stationList,
            planMap
        },
        created(){
        },
        methods: {
            handleSubmit:function(name){
                let message = '=========';
                let _this = this;
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
            changeCustomer:function(value){
                if(value){
                    this.renewForm.customer = value;
                }else{
                    this.renewForm.customer = '';
                }
            },
            changeCommunity:function(value){
                if(value){
                    this.renewForm.community = value;
                }else{
                    this.renewForm.community = '';
                }
                // this.clearStation()
            },
            changeTime:function(value){
                this.renewForm.endDate = value;
            },
            changeSaler:function(value){
                this.renewForm.saler = value;
            },
            showStation:function(){
                if(!this.renewForm.community){
                    this.$Notice.error({
                        title:'请先选择社区'
                    });
                    return
                }
                if(!this.renewForm.customer){
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
            selectDeposit:function(){

            },
            selectPayType:function(value){
                this.payType  = value;
            },
            handleAdd:function(){
                if(!this.renewForm.community){
                    this.$Notice.error({
                        title:'请先选择社区'
                    });
                    return
                }
                if(!this.renewForm.customer){
                    this.$Notice.error({
                        title:'请先选择客户'
                    });
                    return
                }
                // if(!this.renewForm.saler){
                //     this.$Notice.error({
                //         title:'请先选择销售员'
                //     });
                // }
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
                    status: 1
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

            },
            deleteStation:function(){
                let stationVos = this.selecedStation;
                let delArr = this.selectedDel;
                stationVos = stationVos.filter(function(item, index) {
                    if (delArr.indexOf(item.id) != -1) {
                        return false;
                    }
                return true;
                });
                this.selecedStation = stationVos;

            },
            selectRow:function(val){
                console.log('selectRow',val)
                let selectionList = [];
                selectionList = val.map((item)=>{
                    return item.id
                })
                this.selectedDel = selectionList;
            },
            selectDiscount:function(){

            },
            //优惠类型选择
            changeType:function(value){
                let items = [];
                items = this.renewForm.items.map((item)=>{
                    if(item.type == 'qianmian'){
                        item.endDate = new Date()
                        item.zhekou = '';
                    }else if(item.type == 'houmian'){
                        item.endDate = new Date()
                        item.zhekou = '';
                    }else if(item.type == 'zhekou'){
                        item.beginDate = new Date()
                        item.endDate = new Date()
                    }
                    return item;
                })
                this.renewForm.items = items;
            },
            submitStation:function(){
                let stationList = this.stationList;
                let selecedArr = this.selecedArr;
                let selecedList = [];

                selecedList = stationList.filter(function(item, index) {
                    if (selecedArr.indexOf(item.name) == -1) {
                        return false;
                    }
                return true;
                });
                this.selecedStation = selecedList;
            },
            cancelStation:function(){
                this.selecedStation = this.selecedStation.map(item=>{
                    let obj =item
                    obj.time = +new Date()
                    return obj;
                })
            },
            onStationChange:function(val){
                this.selecedArr = val;
                console.log('onStationChange',val)
            }

                    
               
        }
    }
</script>