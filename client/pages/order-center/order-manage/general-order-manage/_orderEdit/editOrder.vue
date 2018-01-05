<template>
    <div class="create-new-order">
        <sectionTitle label="编辑订单"/>
         <div style='padding:0 24px;'>
          <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row>  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px" prop="customerId">
                      <selectCustomers name="formItem.customerId" :onchange="changeCustomer" :value="customerName"/>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="社区名称" style="width:252px"  prop="communityId">
                      <selectCommunities test='formItem' :onchange="changeCommunity" :value="communityName"/>
                    </FormItem>
                </Col>

                 <Col class="col">
                   <FormItem label="订单类型" style="width:252px" prop='type'>
                    <Select 
                        v-model="formItem.type" 
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
                    />
                   </Form-item>
                </Col>
                
                <Col class="col">
                    <FormItem label="销售员" style="width:252px" prop="salesperson">
                    <SelectSaler name="formItem.salesperson" :onchange="changeSaler" :value="salerName"/>
                    </FormItem>
                </Col>

                <Col  class="col">
                    <FormItem label="销售日期" style="width:252px" prop="saleDate">
                    <DatePicker type="date" placeholder="销售日期" format="yyyy-MM-dd" v-model="formItem.saleDate" style="display:block"/>
                    </FormItem>
                </Col>

                <Col  class="col">
                    <FormItem label="备注信息" prop="remark" style="width:702px">
                      <Input v-model="formItem.remark" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" style="width:100%;" placeholder="写入备注..."/>
                      <div style="text-align:right">{{formItem.remark?formItem.remark.length+"/500":0+"/500"}}</div>
                    </FormItem>
                </Col>
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
        data() {

           const validateMoney = (rule, value, callback) => {
                var numReg=/^(([1-9][0-9]*)|([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2}))$/;
                if (value === '') {
                    callback(new Error('请填写金额'));
                } else if(!numReg.test(value)){
                    callback(new Error('请填写最多两位小数的正数'));
                }else{
                    callback();
                }
            };

           return {
               
                disabled:false,

                typeList:[
                   {value:'REGISTER',label:'注册订单'},
                   {value:'INCONSUME',label:'场内消费订单'},
                   {value:'ACTIVITY',label:'活动订单'},
                   {value:'ADVERT',label:'广告订单'},
                   {value:'APPRECIATION6',label:'增值服务订单'},
                   {value:'TRAIN',label:'培训订单'},  
                   {value:'OTHER',label:'其他服务订单'}
                ],

                customerName:'',

                communityName:'',

                salerName:'请选择',

                formItem: {
                    customerId: '',
                    communityId: '',
                    saleDate:'',
                    type:'',
                    remark:'',
                    salesperson:'',
                    money:''
                },

                ruleCustom:{
                    saleDate: [
                        { required: true, type: 'date',message: '请选择销售日期', trigger: 'change' }
                    ],
                    money: [
                        { required: true,trigger: 'change' ,validator: validateMoney}
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
                    type:[
                        { required: true, message: '请选择订单类型', trigger: 'change' }
                    ]
                }
            }
        },

        head() {
            return {
                title: '编辑订单'
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
            this.getDetailData();
            GLOBALSIDESWITCH("false");
        },

        methods: {

            getDetailData(){
                let {params}=this.$route;
                let from={
                    id:params.orderEdit
                };
                this.$http.get('general-order-watch', from, r => {
                       this.formItem=Object.assign({},r.data);
                       this.formItem.customerId=JSON.stringify(this.formItem.customerId);
                       this.formItem.communityId=JSON.stringify(this.formItem.communityId);
                       this.formItem.salesperson=JSON.stringify(this.formItem.salesperson);
                       this.customerName = this.formItem.customerName;
                       this.communityName = this.formItem.communityName;
                       this.salerName = this.formItem.salerName;
                       this.formItem.saleDate = new Date(this.formItem.saleDate);
                    }, e => {
                       this.$Notice.error({
                            title:e.message
                       });
                })
            },

            joinFormSubmit(){
                let saleDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.saleDate));
                let formItem = {}; 
                formItem.saleDate = saleDate;
                let params=Object.assign({},this.formItem,formItem);
                let _this = this;
                 this.$http.post('general-order-edit', params, r => {
                      window.close();
                      window.opener.location.reload();
                }, e => {
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
                        this.joinFormSubmit()
                    } else {
                        _this.disabled = false;
                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },

            changeCommunity:function(value){
                if(value){
                    this.formItem.communityId = value;
                }else{
                    this.formItem.communityId = '';
                }       
            },

            changeCustomer:function(value){
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                }
            },

            changeSaler:function(value){
                this.formItem.salesperson = value;
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
