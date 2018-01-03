<style lang="less"> 
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


<template>
    <div class="create-new-order">
        <sectionTitle label="新建订单"></sectionTitle>
         <div style='padding:0 24px;'>
          <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <Row>  
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
                    <FormItem label="销售员" style="width:252px" prop="salerId">
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
                      <div style="text-align:right">{{formItem.otherAgreed?formItem.otherAgreed.length+"/500":0+"/500"}}</div>
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
           return {
                disabled:false,
                typeList:[{label:'123',value:'1'}],
                formItem: {
                    customerId: '',
                    communityId: '',
                    signDate:'',
                    orderType:'',
                    otherAgreed:'',
                    salerId:'',
                    money:''
                },
                ruleCustom:{
                    signDate: [
                        { required: true, type: 'date',message: '请选择销售日期', trigger: 'change' }
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
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    orderType:[
                        { required: true, message: '请选择订单类型', trigger: 'change' }
                    ]
                },
                salerName:'请选择',
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
            SelectSaler
        },
         mounted(){
            GLOBALSIDESWITCH("false");
        },
        methods: {
            joinFormSubmit(){
                let signDate = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.formItem.signDate));
                let formItem = {}; 
                formItem.signDate = signDate;
                let params=Object.assign({},this.formItem,formItem);
                let _this = this;
                 this.$http.post('save-join', params, r => {
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
                this.formItem.salerId = value;
            }
        }
    }
</script>