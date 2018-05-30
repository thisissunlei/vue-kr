<template>
    <div class="add-invoice">
        <SectionTitle title="申请开票"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col span="12" class="col">
                        <FormItem label="客户名称" style="width:252px" >
                            <selectCustomers 
                                :disabled="isReady" 
                                name="formItem.customerId" 
                                :onchange="changeCustomer"
                            />
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="社区名称" style="width:252px" >
                             <Select 
                                v-model="formItem.communityId" 
                                placeholder="请选择社区名称" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="提交人员" style="width:252px" >
                            <SelectSaler 
                                :disabled="isReady"  
                                name="formItem.committer" 
                                :value="salerName" 
                                :onchange="changeSaler" 
                            />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="提交时间" style="width:252px">
                            <DatePicker 
                                :disabled="isReady" 
                                type="date" 
                                placeholder="提交时间" 
                                v-model="formItem.startDate" 
                                style="display:block" 
                            />
                            <!-- <div class="pay-error" v-if="timeError">租赁开始时间不得大于结束时间</div> -->
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="开票信息">
                <Row  style="margin-bottom:30px">   
                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入发票抬头" 
                            />
                        </FormItem>
                    </Col>
               
                    <Col class="col">
                        <FormItem label="纳税人识别码" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.taxpayerNumber" 
                                placeholder="请输入纳税人识别码" 
                            />
                        </FormItem>
                    </Col>
                 
                    <Col class="col">
                        <FormItem label="注册地址" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerAddress" 
                                placeholder="请输入注册地址" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="注册电话" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerPhone" 
                                placeholder="请输入注册电话" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="开户银行" style="width:252px" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.bank" 
                                placeholder="请输入开户银行" 
                            />
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="银行账户" style="width:252px" >
                            <Input :disabled="isReady" v-model="formItem.bankAccount" placeholder="请输入银行账户" />
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="可开票数据">
                  <Table border ref="selection" :columns="tableColumns" :data.sync="detailList" ></Table>
            </DetailStyle>
            <FormItem style="padding-left:24px;margin-top:40px" >
                <div style="text-align: right;padding:0px 20px;">
                    总金额：<span>￥100000</span>
                    <Button type="error" @click="handleSubmit('formItem')" >提交</Button>
            
                </div>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>

        </Form>

        
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import selectCommunities from '~/components/SelectCommunities';
import selectCustomers from '~/components/SelectCustomers';
import SelectSaler from '~/components/SelectSaler';
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap';
import dateUtils from 'vue-dateutils';
import krUpload from '~/components/KrUpload';
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
                isReady:false, //只读页面
                detailList:[],
                communityList:[],
                tableColumns: [
                    {
                        title: '账单编号',
                        key: 'billNum'
                    },
                    {
                        title: '账单类型',
                        key: 'seatType',
                        render:(h, params) => {
                            let type = params.row.seatType;
                            let typeName = '开放工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室';
                            }else{
                                typeName = "开放工位";
                            }
                            return typeName;
                        }
                    },
                    {
                        title:'费用类型',
                        key:'feeType'
                    },
                    {
                        title: '可开票金额',
                        key: 'total'
                    },
                    {
                        title: '申请开票金额',
                        key: 'applyAmount',
                        render: (h, params) => {
                            let index = params.index;
                            let price = params.row.originalPrice;
                            console.log(params,"ppppppppp")
                            return h('Input', {
                                props: {
                                    min:params.row.guidePrice,
                                    value:params.row.originalPrice,
                                    disabled:this.isReady
                                },
                                on:{
                                    'on-change':(event)=>{

                                        this.tabelInputChange(event,index);
                                    }
                                }
                            },'44')
                        }
                    }
                ],
                totalAmount:0,
                AmountList:[],
                formItem: {
                    bank: '',
                    bankAccount: '',
                    committer: '',
                    committerId: '',
                    invoiceTitle: '',
                    registerAddress:'',
                    registerPhone:'',
                    taxpayerNumber:'',
                    
                },
                //校验
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
                salerName:'请选择'

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
            let isReady = this.$route.query.isReady!=='edit';
            this.isReady = isReady;
            GLOBALSIDESWITCH("false");
        },
        methods: {
            tabelInputChange(event,index){
                let totalAmount = 0;
                console.log(this.detailList,"ppppppp")
                
                
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
            changeSaler(){

            },
            changeCustomer(value,data){
                // 客户
                console.log(data,"kkkkkkkk")

                if(value){

                    this.getDetailData(value);
                    this.getDetailTabel(value);
                    this.getCommunityList(value);
                    

                }
                // this.getFloor = +new Date()

            },
            //获取表格
            getDetailTabel(id){
                
                this.$http.get('get-make-invoice-detail-table', {
                    customerId:id
                }).then((res)=>{
                    this.detailList = [].concat(res.data);
                    // let formItem = Object.assign(this.formItem,res.data);
                    // this.formItem = formItem;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            //获取详情
            getDetailData(id){
                this.$http.get('get-make-invoice-detail', {
                    customerId:id
                }).then((res)=>{
                    let formItem = Object.assign(this.formItem,res.data);
                    this.formItem = formItem;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getCommunityList(id){
                
                this.$http.get('get-community-from-cusListr', {
                    customerId:id
                }).then((res)=>{
                   
                    this.communityList = [].concat(res.data);
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            }
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
