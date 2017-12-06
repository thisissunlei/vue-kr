<style lang="less"> 
    .create-new-order{
        // padding:30px 20px;
        .creat-order-form{
            max-width: 1140px;
            padding:30px 0;
            .col{
                display: inline-block;
                width: 50%;
                max-width: 450px;
                padding-right: 10px;
            }
            .total-money{
                border:1px solid #e9eaec;
                border-top:0;
                height: 48px;
                line-height: 48px;
                text-align: right;
                padding-right: 28px;
                margin-bottom: 20px;
                span+span{
                    margin-left: 20px;
                }
                .money{
                    color:#FF6868
                }
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
            }
            .active{
                background-color: #499df1;
                color: #fff;
            }
        }
    }

   
</style>



<template>
    <div class="create-new-order">
        <sectionTitle label="新建入驻服务订单管理"></sectionTitle>
         <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
            <Row>  
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
                    <FormItem label="销售员" style="width:252px">
                    <selectSaler name="formItem.saler" :onchange="changeSaler"></selectSaler>
                    </FormItem>
                </Col>
            </Row>
            </DetailStyle>
            <DetailStyle info="租赁信息">
            <Row>  
                <Col class="col">
                    <FormItem label="租赁开始日期" style="width:252px" prop="beginDate">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.beginDate" style="display:block"></DatePicker>
                    </FormItem>
                    
                </Col>
                
                <Col  class="col">
                    <FormItem label="租赁结束日期" style="width:252px" prop="endDate">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.endDate" style="display:block" ></DatePicker>
                    </FormItem>
                </Col>
                 <Col class="col">
                    <FormItem label="租赁时长" style="width:252px" prop="time">
                        <Input v-model="formItem.time" placeholder="Enter your e-mail"></Input>
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
                    <Table border ref="selection" :columns="columns4" :data="data1" @on-selection-change="selectRow"></Table>
                    <div class="total-money">
                        <span>服务费总计</span>
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
                    </div>
                
            </DetailStyle>
            <DetailStyle info="优惠信息">
                <Row style="margin-bottom:10px">  
                <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="handleAdd">添加</Button>
                    <Button type="ghost" style="font-size:14px" @click="deleteDiscount">删除</Button>
                </Col>

                </Row>
                <Row class="row-table">
                    <Col span="1" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <Checkbox v-model="selectAll" @on-change="selectDiscount"></Checkbox>
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                       <span> 优惠类型</span>
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <span>开始时间</span>
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <span>结束时间</span>
                        
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <span>折扣</span>
                        
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <span>优惠金额</span>
                    </Col>
                    
                </Row>
                    <FormItem
                v-for="(item, index) in formItem.items"
                :key="index"
                :prop="'items.' + index + '.type'"
                :rules="{required: true, message: '此项没填完', trigger: 'blur'}">
            <Row>
                 <Col span="1" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <Checkbox v-model="item.select"></Checkbox>
                    </Col>
                    <Col span="4" style="background: #fff;padding:0 15px;height:50px;line-height:50px;text-align:center">
                         <Select v-model="item.type" @on-change="changeType">
                            <Option v-for="types in youhui" :value="types.value" :key="types.value" >{{ types.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center;padding:0 15px">
                       <DatePicker type="date" placeholder="开始时间" v-if="item.type !== 'qianmian'" v-model="item.beginDate" ></DatePicker>
                        <DatePicker type="date" v-if="item.type == 'qianmian'" placeholder="开始时间" v-model="item.beginDate" disabled></DatePicker >
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center;padding:0 15px">
                        <DatePicker type="date" placeholder="结束时间" v-if="item.type !== 'houmian'" v-model="item.endDate" ></DatePicker>
                        <DatePicker type="date" v-if="item.type == 'houmian'" placeholder="开始时间" v-model="item.endDate" disabled ></DatePicker >
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center;padding:0 15px">
                        <Input v-model="item.zhekou" placeholder="折扣" v-if="item.type == 'zhekou'"></Input>
                        <Input v-model="item.zhekou" v-if="item.type !== 'zhekou'" placeholder="折扣" disabled></Input>

                        
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center;padding:0 15px">
                        <Input v-model="item.money" placeholder="金额" disabled></Input>
                    </Col>   
            </Row>
        </FormItem>
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
            <Row>
                 <Col class="col">
                    <span style="width:252px;padding:11px 12px 10px 0;color:#666;display:block">付款方式</span>
                        <div style="display:block;min-width:252px">
                            <span v-for="types in depositList" :key="types.value" class="button-list" v-on:click="selectDeposit(types.label)" v-bind:class="{active:depositType==types.label}">{{ types.label }}</span>
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
        @on-visible-change="jj"
     >
        <planMap :stationsubmit="submits" :floors.sync="floors" :params.sync="params"></planMap>
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
import dateUtils from 'vue-dateutils';




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
                loading1:false,
                openStation:false,
                selectAll:false,
                discountError:false,
                index:1,
                depositType:'',
                disabled:false,
                params:{},
                depositList:[
                    {label:'2个月',value:'2个月'},
                    {label:'3个月',value:'3个月'},
                    {label:'4个月',value:'4个月'},
                    {label:'5个月',value:'5个月'},
                    {label:'6个月',value:'6个月'},
                ],
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
                        key: 'age'
                    },
                    {
                        title: '租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong', params.row.name+'至'+params.row.date)
                        }
                    },
                    {
                        title: '小计',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        id:1,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        id:2,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        id:3,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        id:4,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
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
                floor:'3',
                selectedStation:[],
                formItem: {
                    customer: '',
                    community: '',
                    beginDate: new Date(),
                    endDate: '',
                    time:'',
                    floor:'',
                    city:'',
                    items:[]
                },
                ruleCustom:{
                    beginDate: [
                        { required: true,type: 'date', message: '此项不可为空', trigger: 'change' }
                    ],
                    endDate: [
                        { required: true, type: 'date',message: '此项不可为空', trigger: 'change' }
                    ],
                    time: [
                        { required: true, message: '此项不可为空', trigger: 'blur' }
                    ],
                    // city:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    // floor:[
                    //     { required: true, message: '此项不可为空', trigger: 'change' }
                    // ],
                    community:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    customer:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
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
            handleSubmit:function(name) {
                let discountError = true;
                let message = '请填写完表单';
                let typeList = this.formItem.items.map((item)=>{
                    return item.type;
                })
                let qianmian = typeList.join(",").split('qianmian').length-1;
                let houmian = typeList.join(",").split('houmian').length-1;
                let zhekou = typeList.join(",").split('zhekou').length-1;
                if(qianmian + houmian>1){
                    discountError = false;
                    message = '只能有一个免租期。'
                }
                if(zhekou>1){
                    discountError = false;
                    message = '只能有一个折扣。'
                }
                let _this = this;
                this.disabled = true;
                this.$refs[name].validate((valid) => {
                    if (valid && discountError) {
                        this.$Message.success('Success!');
                    } else {
                        _this.disabled = false;
                        this.$Message.error(message);
                    }
                })
            },
            selectDiscount:function(value){
                let items = this.formItem.items;
                items = items.map((item)=>{
                    let obj = item;
                    obj.select = value;
                    return obj;
                })
                this.formItem.items = items;
            },
            deleteDiscount:function(){
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
            //优惠类型选择
            changeType:function(value){
                let items = [];
                items = this.formItem.items.map((item)=>{
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
                this.formItem.items = items;
            },
            changeCommunity:function(value){
                if(value){
                    this.formItem.community = value;
                }else{
                    this.formItem.community = '';
                }
            },
            changeCustomer:function(value){
                if(value){
                    this.formItem.customer = value;
                }else{
                    this.formItem.customer = '';
                }

            },
            changeSaler:function(value){
                this.formItem.saler = value;
            },
            floorsChange:function(value){
                console.log('-----',value)
            },
            deleteStation:function(){
                let stationVos = this.data1;
                let selectedStation = this.selectedStation;
                stationVos = stationVos.filter(function(item, index) {
                    if (selectedStation.indexOf(item.id) != -1) {
                        return false;
                    }
                return true;
                });
                this.data1 = stationVos;
            },
            showStation:function(){
                if(!this.formItem.community){
                    this.$Message.error('请先选择社区')
                    return;
                }
                if(!this.formItem.beginDate){
                    this.$Message.error('请先选择开始时间')
                    return;
                }
                if(!this.formItem.endDate){
                    this.$Message.error('请先选择结束时间')
                    return;
                }
                let params = {
                    floor:3,
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
                let selectionList = [];
                selectionList = selection.map((item)=>{
                    return item.id
                })
                this.selectedStation = selectionList;
            },
            handleAdd () {
                this.index++;
                this.formItem.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            selectDeposit:function(value){
                this.depositType = value
            },
            submits:function(value){
                console.log('submits')
            },
            jj:function(){

            }
                    
               
        }
    }
</script>