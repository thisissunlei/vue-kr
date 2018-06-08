<template>
    <div class="add-invoice">
        <SectionTitle title="申请开票"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col span="12" class="col">
                        <FormItem label="客户名称" style="width:252px" prop="customerId">
                            <selectCustomers 
                                :disabled="isReady" 
                                name="formItem.customerId" 
                                :onchange="changeCustomer"
                            />
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="社区名称" style="width:252px" prop="communityId">
                             <Select 
                                :disabled="isReady" 
                                v-model="formItem.communityId" 
                                placeholder="请选择社区名称" 
                                clearable
                                @on-change="changeCommunity"
                            >
                                <Option v-for="item in communityList" :value="item.id+''" :key="item.id">{{ item.name }}</Option>
                            </Select> 
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="提交人员" style="width:252px" >
                            <SelectSaler 
                                :disabled="isReady || disabled"  
                                name="formItem.committerId" 
                                :value="salerName" 
                                :onchange="changeSaler" 
                            />
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="开票信息">
                <Row  style="margin-bottom:30px">   
                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" >
                            <Input 
                                :disabled="isReady || disabled" 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入发票抬头" 
                            />
                        </FormItem>
                    </Col>
               
                    <Col class="col">
                        <FormItem label="纳税人识别码" style="width:252px" >
                            <Input 
                                :disabled="isReady || disabled" 
                                v-model="formItem.taxpayerNumber" 
                                placeholder="请输入纳税人识别码" 
                            />
                        </FormItem>
                    </Col>
                 
                    <Col class="col">
                        <FormItem label="注册地址" style="width:252px" >
                            <Input 
                                :disabled="isReady || disabled" 
                                v-model="formItem.registerAddress" 
                                placeholder="请输入注册地址" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="注册电话" style="width:252px" >
                            <Input 
                                :disabled="isReady || disabled" 
                                v-model="formItem.registerPhone" 
                                placeholder="请输入注册电话" 
                            />
                        </FormItem>
                    </Col>
                
                    <Col class="col">
                        <FormItem label="开户银行" style="width:252px" >
                            <Input 
                                :disabled="isReady || disabled" 
                                v-model="formItem.bank" 
                                placeholder="请输入开户银行" 
                            />
                        </FormItem>
                    </Col>
                     <Col class="col">
                        <FormItem label="银行账户" style="width:252px" >
                            <Input :disabled="isReady || disabled" v-model="formItem.bankAccount" placeholder="请输入银行账户" />
                        </FormItem>
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="可开票数据">
                  <Table border ref="selection" :columns="tableColumns" :data.sync="detailList" ></Table>
            </DetailStyle>
            <FormItem style="padding-left:24px;margin-top:40px" >
                <div style="text-align: right;padding:0px 20px;">
                    总金额：<span style="margin-right:30px;color:red">{{totalAmount}}</span>
                    <Button type="error" @click="handleSubmit('formItem')" v-if="!isReady">开票</Button>
                    <Button type="error" @click="submit" v-if="isReady">确认金额并开票</Button>
                    <span style="width:30px;display:inline-block" v-if="isReady"></span>
                    <Button type="ghost" @click="cancel" v-if="isReady">返回修改</Button>
            
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
                totalAmount:0,
                disabled:false,
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
                        key:'feeTypeName'
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
                            let price = params.row.total;
                            let value = params.row.applyAmount
                            return h('Input', {
                                props: {
                                    value:params.row.applyAmount,
                                    disabled:this.isReady
                                },
                                on:{
                                    'on-change':(event)=>{
                                            let e = event.target.value;
                                            if(isNaN(e)){
                                                e = params.row.applyAmount
                                            }
                                            value = e;
                                        },
                                    'on-blur':()=>{
                                        if(value>price){
                                            this.$Notice.error({
                                                title:'开票金额不能大于'+price
                                            });
                                            value = price;
                                        }
                                        this.tabelInputChange(value,index);
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
                    customerId:'',
                    
                },
                //校验
                ruleCustom:{
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
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
            cancel(){
                this.isReady = false;
            },
            submit(){
                let params = {};
                params.committerId = this.formItem.committerId;
                params.communityId = this.formItem.communityId;
                params.customerId = this.formItem.customerId;
                params.amount = this.totalAmount;
                params.amountDetailList = this.detailList.map(item=>{
                    let obj = {};
                    obj.id = item.id;
                    obj.applyAmount = item.applyAmount;
                    return obj;
                })
                params.amountDetailList = JSON.stringify(params.amountDetailList);
                console.log('params',params)


                this.$http.post('csr-invoice-ticket',params).then((res)=>{
                    window.close();
                    window.opener.location.reload();

                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                // 
            },
            tabelInputChange(value,index){
                let amount = 0;
                console.log(this.detailList,"======")
                this.detailList = this.detailList.map((item,i)=>{
                    if(i==index){
                        item.applyAmount = value;
                        amount+=parseInt(value);
                        console.log('index',value)
                    }else{
                        amount+=parseInt(item.applyAmount)
                    }

                    return item;
                })
                this.totalAmount= amount;
                
            },
            back(){
                window.history.go(-1);
            },
            handleSubmit:function(name) {
                console.log('=====>',this.formItem)
                // 发票详情
                if(this.totalAmount==0){
                    this.$Notice.error({
                        title:'请仔细核对开票信息'
                    });
                }
                 this.$refs[name].validate((valid) => {
                    if(valid){
                       this.isReady = true; 
                    }
                    
                 })

                
               
            },
            changeCommunity(value){
                // 选择社区
                if(value){
                    this.formItem.communityId = value;
                    this.getDetailTabel(value);
                }else{
                    this.formItem.communityId = '';
                }
            },
            changeSaler(){

            },
            changeCustomer(value,data){
                // 客户
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                }

                if(value){

                    this.getDetailData(value);
                    
                    this.getCommunityList(value);
                    

                }
                // this.getFloor = +new Date()

            },
            //获取表格
            getDetailTabel(id){
                let amount = 0;
                this.$http.get('get-make-invoice-detail-table', {
                    customerId:this.formItem.customerId,
                    cmtId:id
                }).then((res)=>{
                    res.data = res.data.map(item=>{
                        item.applyAmount = item.total;
                        amount+=parseInt(item.applyAmount)
                        return item;
                    })
                    this.detailList = [].concat(res.data);
                     this.totalAmount= amount;
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
                    this.formItem.customerId = formItem.customerId+'';
                    this.disabled = true;
                    this.formItem.committerId = res.data.applyUser;
                    this.salerName = res.data.applyUserName
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getCommunityList(id){
                
                this.$http.get('get-community-from-cusList', {
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
