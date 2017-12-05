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
            .row-table{

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
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.endDate" style="display:block"></DatePicker>
                    </FormItem>
                </Col>
                 <Col class="col">
                    <FormItem label="租赁时长" style="width:252px" prop="time">
                        <Input v-model="formItem.time" placeholder="Enter your e-mail"></Input>
                    </FormItem>
            <!--         
            <FormItem label="楼层" style="width:252px" prop="floor">
                <Select v-model="formItem.floor" style="width:100px" >
                    <Option v-for="item in floors" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </FormItem>
             <FormItem label="City" prop="city">
            <Select v-model="formItem.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem> -->
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
                    <Button type="ghost" style="font-size:14px" @click="deleteStation">删除</Button>
                </Col>
                </Row>
                <Row class="row-table">
                    <Col span="1" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        <Checkbox v-model="selectAll"></Checkbox>
                    </Col>
                    <Col span="4" style="background: #F5F6FA;height:50px;line-height:50px;text-align:center">
                        优惠类型
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
                v-if="item.status"
                :key="index"
                :prop="'items.' + index + '.value'"
                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
            <Row>
                    <!-- <Input type="text" v-model="item.value" placeholder="Enter something..." style="width:200px"></Input>
                    <Input type="text" v-model="item.value" placeholder="Enter something..." style="width:200px"></Input> -->
                    <Col span="1" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <Checkbox v-model="item.select"></Checkbox>
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        优惠类型
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <span>开始时间</span>
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <span>结束时间</span>
                        
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <span>折扣</span>
                        
                    </Col>
                    <Col span="4" style="background: #fff;height:50px;line-height:50px;text-align:center">
                        <span>优惠金额</span>
                    </Col>
            </Row>
        </FormItem>
                
            </DetailStyle>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>

    </div>
</template>


<script>
import sectionTitle from '~/components/sectionTitle.vue'
import selectCommunities from '~/components/selectCommunities.vue'
import selectCustomers from '~/components/selectCustomers.vue'
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/detailStyle';



    export default {
        data() {
            const validateFloor = (rule, value, callback) => {
                console.log('validateFloor--rule',rule)
                console.log('validateFloor ---value', value)
                console.log('validateFloor---callback',callback)
                if (!value) {
                    return callback(new Error('Age cannot be empty'));
                }else{
                    callback();
                }
                // 模拟异步验证效果
                // setTimeout(() => {
                //     if (!Number.isInteger(value)) {
                //         callback(new Error('Please enter a numeric value'));
                //     } else {
                //         if (value < 18) {
                //             callback(new Error('Must be over 18 years of age'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }, 1000);
            };
            return {
                loading1:false,
                selectAll:false,
                index:1,
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
                            console.log('=====>',h,params)
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
            selectCustomers
        },
        methods: {
            handleSubmit:function(name) {
                console.log('handleSubmit',this.formItem)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
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

            },
            selectRow:function(selection){
                console.log('selectRow',selection)
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
                    
               
        }
    }
</script>