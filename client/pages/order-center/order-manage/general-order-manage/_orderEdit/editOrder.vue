<template>
    <div class="create-new-order">
        <sectionTitle label="编辑订单"/>
         <div style='padding:0 24px;'>
          <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row>  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px" prop="customerId">
                      <selectCustomers name="formItem.customerId" :value="customerName" disabled/>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="社区名称" style="width:252px"  prop="communityId">
                      <selectCommunities test='sformItem' :value="communityName" disabled/>
                    </FormItem>
                </Col>

                 <Col class="col">
                   <FormItem label="订单类型" style="width:252px" prop='orderType'>
                    <Select 
                        v-model="formItem.orderType" 
                        placeholder="请输入订单类型" 
                        style="width: 252px"
                        clearable
                        disabled
                    >
                        <Option 
                            v-for="item in typeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.desc }}
                        </Option>
                   </Select> 
                 </FormItem>
                </Col>

                <Col class="col">
                    <FormItem label="费用明细类型" style="width:252px" prop='feeType'>
                    <Select 
                        v-model="formItem.feeType" 
                        placeholder="请输入费用明细类型" 
                        style="width: 252px"
                        clearable
                        disabled
                    >
                        <Option 
                            v-for="item in freeList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.desc }}
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
                    />
                   </Form-item>
                </Col>
                
                <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="salesperson">
                    <SelectSaler name="formItem.salesperson"  :value="salespersonName" disabled/>
                    </FormItem>
                </Col>

                <Col  class="col">
                    <FormItem label="销售日期" style="width:252px" prop="saleDate">
                        <DatePicker type="date" placeholder="销售日期" format="yyyy-MM-dd" v-model="formItem.saleDate" style="display:block" disabled/>
                    </FormItem>
                </Col>
                 <Col  class="col">
                    <FormItem label="部门" style="width:252px" prop="department">
                        <!-- <SelectSaler name="formItem.department"  :value="salespersonName" disabled/> -->
                        <Select 
                            v-model="formItem.department" 
                            :placeholder="formItem.department?'请输入部门':'无'" 
                            style="width: 252px"
                            clearable
                            disabled
                        >
                            <Option 
                                v-for="item in departmentList" 
                                :value="item.value" 
                                :key="item.value"
                               
                            >
                                {{ item.desc }}
                            </Option>
                        </Select> 
                    </FormItem>
                </Col>

                <Col  class="col" v-if="isAddDesk">
                    <FormItem label="服务开始日" style="width:252px" prop="startTime">
                    <DatePicker type="date" placeholder="服务开始日" format="yyyy-MM-dd" v-model="formItem.startTime" style="display:block" disabled/>
                    </FormItem>
                </Col>

                <Col  class="col" v-if="isAddDesk">
                    <FormItem label="服务结束日" style="width:252px" prop="endTime">
                    <DatePicker type="date" placeholder="服务结束日" format="yyyy-MM-dd" v-model="formItem.endTime" style="display:block" disabled/>
                    </FormItem>
                </Col>

                <Col class="col" v-if="isAddDesk">
                   <Form-item label="加桌数量" style="width:252px" prop="deskCount">
                    <i-input 
                        v-model="formItem.deskCount" 
                        placeholder="请输入加桌数量"
                        style="width: 252px"
                        disabled
                    />
                   </Form-item>
                </Col>

                <FormItem label="备注信息" prop="remark" style="width:702px">
                    <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入备注..." disabled/>
                    <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
                </FormItem>
            
            </Row>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled">提交</Button>
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
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';



export default {
        head () {
            return {
                title: "编辑通用订单-氪空间后台管理系统"
            }
        },

        data() {

           const validateMoney = (rule, value, callback) => {
                var numReg=/^(([1-9]{1}[0-9]{0,11})|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,11}\.\d{1,2}))$/;
                if (value === '') {
                    callback(new Error('请填写金额'));
                } else if(isNaN(value)){
                    callback(new Error('金额为数字'));
                } else if(!numReg.test(value)){
                    callback(new Error('请填写整数位最多12位，小数位最多两位的正数'));
                }else{
                    callback();
                }
            };

           return {
                isAddDesk:false,
                disabled:false,
                typeList:[],
                freeList:[],
                customerName:'',
                communityName:'',
                salespersonName:'请选择',
                departmentList:[],

                formItem: {
                    customerId: '',
                    communityId: '',
                    saleDate:'',
                    orderType:'',
                    remark:'',
                    salesperson:'',
                    money:'',
                    feeType:'',
                    department:'',
                    deskCount:'',
                    startTime:'',
                    endTime:''
                },

                ruleCustom:{
                    saleDate: [
                        { required: true, type: 'date',message: '请选择销售日期', trigger: 'change' }
                    ],
                    money: [
                        { required: true, trigger: 'change' ,validator: validateMoney}
                    ],
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    salesperson:[
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    orderType:[
                        { required: true, message: '请选择订单类型', trigger: 'change' }
                    ],
                    feeType:[
                        { required: true, message: '请选择费用明细类型', trigger: 'change' }
                    ],
                    startTime:[
                        { type: 'date',required: true,  trigger: 'change' }
                    ],
                    endTime:[
                        { type: 'date',required: true, trigger: 'change' }
                    ],
                    deskCount:[
                        { type:'number',required: true, trigger: 'change' }
                    ]
                }
            }
        },
        
        components: {
            sectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler
        },

         mounted(){
             GLOBALSIDESWITCH("false");
            this.getTypeData();
            this.getDetailData();
            this.getDepartmentData();
            
        },

        methods: {
            //格式转换
            dateSwitch(data){
                if(data){
                    return utils.dateCompatible(data);
                }else{
                    return '';
                }
            },
             getDepartmentData(){
                this.$http.get('get-enum-all-data',{
                    enmuKey:'com.krspace.op.api.enums.orderCurrency.Department'
                }).then((response)=>{
                    // this.selectFormat(response.data)
                    // console.log("-------",response.data)
                    this.departmentList = [].concat(response.data);

                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    })
                })
            },
            getDetailData(){
                let {params}=this.$route;
                let from={
                    id:params.orderEdit
                };
                this.$http.get('general-order-watch', from, r => {
                       this.isAddDesk=r.data.orderType=='ADDDESK'?true:false;
                       this.getCostData(r.data.orderType);
                       this.formItem=Object.assign({},r.data);

                       this.formItem.customerId=JSON.stringify(this.formItem.customerId);
                       this.formItem.communityId=JSON.stringify(this.formItem.communityId);
                       this.formItem.salesperson=JSON.stringify(this.formItem.salesperson);
                       this.customerName = this.formItem.customerName;
                       this.communityName = this.formItem.communityName;
                       this.salespersonName = this.formItem.salespersonName;
                       this.formItem.saleDate = new Date(this.formItem.saleDate);
                       this.formItem.startTime = new Date(this.formItem.startTime);
                       this.formItem.endTime = new Date(this.formItem.endTime);
                    }, e => {
                       this.$Notice.error({
                            title:e.message
                       });
                })
            },

            getTypeData(){
               this.$http.get('general-common-list','', r => {
                     this.typeList=r.data.items;
                }, e => {
                     this.$Notice.error({
                        title:e.message
                    })
                })    
            },

            getCostData(value){
                let param={
                    currencyOrderType:value
                }
                this.$http.get('general-cost-list',param, r => {
                     this.freeList=r.data.items;
                }, e => {
                     this.$Notice.error({
                        title:e.message
                    })
                })   
            },
                
            submitForm(){
                let saleDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.saleDate));
                this.formItem.startTime=this.dateSwitch(this.formItem.startTime);
                this.formItem.endTime=this.dateSwitch(this.formItem.endTime);
                let formItem = {}; 
                formItem.saleDate = saleDate;
                let params=Object.assign({},this.formItem,formItem);
                let _this = this;
                 this.$http.post('general-order-edit', params, r => {
                      window.close();
                      window.opener.location.reload();
                }, e => {
                     _this.disabled = false;
                     _this.$Notice.error({
                        title:e.message
                    })
               })  
            },

            handleSubmit:function(name) {
                let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.disabled = true;
                        this.submitForm();
                    } else {
                        _this.disabled = false;
                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped> 
   .required-label{
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
