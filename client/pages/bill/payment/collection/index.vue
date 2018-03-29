<template>
    <div class="g-collection">
        <SectionTitle title="回款"></SectionTitle>
        <div class="m-detail-content">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom">
                <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col class="col">
                        <FormItem label="客户名称" style="width:252px" prop="customerId">
                            <SearchCompany
                                    :test="formItem"
                                    style="width: 250px"
                                    :onchange="onchange"
                            ></SearchCompany>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="所属社区" style="width:252px"  prop="communityId">
                           <selectCommunities test="formItem" :onchange="changeCommunity"></selectCommunities>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="金额" style="width:252px" prop="amount">
                            <Input v-model="formItem.amount" placeholder="请输入回款金额" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="交易流水号" style="width:252px" prop="tradeNo">
                            <Input v-model="formItem.tradeNo" placeholder="请输入交易流水号" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="支付方式" style="width:252px" prop="payWay">
                             <Select
                                    v-model="formItem.payWay"
                                    style="width:250px"
                                    placeholder="请选择支付方式"
                                >
                                    <Option
                                        v-for="item in payWay"
                                        :value="item.value"
                                        :key="item.value"
                                    >
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="付款账户" style="width:252px" prop="payAccount">
                            <Input v-model="formItem.payAccount" placeholder="请输入付款账户" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="收款账户" style="width:252px" prop="receiveAccount">
                            <Input v-model="formItem.receiveAccount" placeholder="请输入收款账户" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="回款日期" style="width:252px" prop="occurDate">
                            <DatePicker type="date" placeholder="请选择退款日期" format="yyyy-MM-dd" v-model="formItem.occurDate" style="display:block"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                </DetailStyle>

            <FormItem style="padding-left:24px;margin-top:40px" >
                <Button type="primary" @click="handleSubmit('formItem')" >提交</Button>
            </FormItem>

        </Form>
    </div>
</div>
</template>


<script>

import SectionTitle from '~/components/SectionTitle';
import selectCommunities from '~/components/SelectCommunities';
import SearchCompany from '~/components/SearchCompany';
import DetailStyle from '~/components/DetailStyle';
import dateUtils from 'vue-dateutils';

    export default {
        components: {
            SectionTitle,
            DetailStyle,
            SearchCompany,
            selectCommunities
        },
        head () {
            return {
                title: "回款"
            }
        },
        data() {
            return {
                formItem: {
                    customerId: '',
                    communityId: '',
                    amount: '',
                    tradeNo:'',
                    payWay: '',
                    occurDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    payAccount:'',
                    receiveAccount:'',
                },
                communityList:[],
                payWay:[
                    {
                        label:'支付宝',
                        value:'ALIAPPPAY'
                    },
                    {
                        label:'银行转账',
                        value:'BANKTRANSFER'
                    }
                ],
                ruleCustom:{
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户',  }
                    ],
                    amount: [
                        { required: true, message: '请输入回款金额', trigger: 'change' }
                    ],
                    payWay: [
                        { required: true,message: '请选择支付方式', trigger: 'change' }
                    ],
                    payAccount: [
                        { required: true,message: '请输入付款账户', trigger: 'change' }
                    ],
                    receiveAccount:[
                        { required: true, message: '请输入收款账户', trigger: 'change' }
                    ],
                    occurDate:[
                        { required: true,type: 'date', message: '请先选择回款时间', trigger: 'change' }
                    ],
                    tradeNo:[
                        { required: true, message: '请输入交易流水号', trigger: 'change' } 
                    ]
                },
                

            }
        },
        mounted:function(){
            GLOBALSIDESWITCH("false");
            this.$http.get('join-bill-community','').then((res)=>{
                this.communityList=res.data.items;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
            
         
        },
        methods: {
            config(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
           
            changeCommunity(value){
                if(value){
                    this.formItem.communityId = value;
                }else{
                    this.formItem.communityId = '';
                }  
            },
            onchange(value){
                
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                } 
                

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
                        this.onCollectionSubmit();
                    } else {
                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },
            onCollectionSubmit(){
                this.formItem.occurDate = dateUtils.dateToStr("YYYY-MM-dd",new Date(this.formItem.occurDate));
                
                this.$http.get('payment-add', this.formItem).then( res => {
                    this.$Notice.success({
                        title:'回款款成功'
                    });
                    setTimeout(function(){
                         window.close();
                         window.opener.location.reload();
                    },1000)    
                }).catch( e => {
                    this.$Notice.error({
                        title:e.message
                    });

                   
                })
            }
             
        }
    }
</script>
<style lang="less" scoped> 
  .g-collection{
     .m-detail-content{
		padding:30px 24px;
    }
    .col{
        display: inline-block;
        width: 33.33%;
        max-width: 450px;
        padding-right: 10px;
        vertical-align:top;
    }
    .u-txt-label{
        font-size: 12px;
        color: #495060;
        line-height:32px;
    }
    .u-txt-value{
        color: #495060;
        font-size: 14px;
        line-height: 32px;
    }
  }
   
</style>
