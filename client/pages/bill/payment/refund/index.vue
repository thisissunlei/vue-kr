<template>
    <div class="g-refund">
        <SectionTitle title="退款"></SectionTitle>
        <div class="m-detail-content">
            <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
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
                            <Select
                            v-model="formItem.communityId"
                            style="width:250px"
                            placeholder="请选择社区"
                        >
                            <Option
                                v-for="item in communityList"
                                :value="item.id"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <div class="u-txt-label">账户余额</div>
                        <div class="u-txt-value">80</div>
                        <!-- {{basicInfo.tradeNo}} -->
                    </Col>
                    <Col class="col">
                        <FormItem label="退款金额" style="width:252px" prop="value">
                            <Input v-model="formItem.value" placeholder="请输入退款金额" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="交易流水号" style="width:252px" prop="communityId">
                            <Input v-model="formItem.tradeNo" placeholder="请输入交易流水号" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="支付方式" style="width:252px" prop="communityId">
                            <Input v-model="formItem.payWay" placeholder="请选择支付方式" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="付款账户" style="width:252px" prop="communityId">
                            <Input v-model="formItem.payAccount" placeholder="请输入付款账户" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="收款账户" style="width:252px" prop="communityId">
                            <Input v-model="formItem.receiveAccount" placeholder="请输入收款账户" />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="退款日期" style="width:252px" prop="occurDate">
                            <DatePicker type="date" placeholder="请选择退款日期" format="yyyy-MM-dd" v-model="formItem.occurDate" style="display:block"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="备注" style="width:252px">
                        <Input v-model="formItem.remark" type="textarea" :rows="4" placeholder="备注" />
                        </FormItem>
                    </Col>
                </Row>
                </DetailStyle>

            <FormItem style="padding-left:24px;margin-top:40px" >
                <Button type="primary" @click="handleSubmit('formItem')" :disabled="disabled">提交</Button>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>

        </Form>
    </div>
</div>
</template>


<script>

import SectionTitle from '~/components/SectionTitle';
import SearchCompany from '~/components/SearchCompany';
import DetailStyle from '~/components/DetailStyle';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';

//payment-refund

    export default {
        components: {
            SectionTitle,
            DetailStyle,
            SearchCompany,
        },
        data() {
            return {
                formItem: {
                    customerId: '',
                    communityId: '',
                    value: '',
                    tradeNo:'',
                    payWay: '',
                    occurDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date()),
                    payAccount:'',
                    receiveAccount:'',
                    remark:'',
                },
                communityList:[],
                ruleCustom:{
                    communityId:[
                        { required: true, message: '请选择社区', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    value: [
                        { required: true, message: '请输入退款金额', trigger: 'change' }
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
                        { required: true,type: 'date', message: '请先选择退款时间', trigger: 'change' }
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
        watch:{
           getFloor(){
            let _this = this;
            this.config()
            if(this.formItem.communityId && this.formItem.customerId){
                let params = {
                    communityId:this.formItem.communityId,
                    customerId:this.formItem.customerId
                }
                 this.$http.get('get-community-floor', params, r => {
                    _this.floors = r.data.floor;
                    _this.ssoId = r.data.ssoId;
                    _this.ssoName = r.data.ssoName;
                    if(!_this.formItem.salerId){
                        _this.formItem.salerId = JSON.stringify(r.data.ssoId);
                        _this.salerName = r.data.ssoName

                    }

                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                        console.log('error',e)
                })
            }
           },
        },
        methods: {
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
             onchange(data){
                this.formItem.customerId=data;
            },
            back(){
                window.history.go(-1);
            },
            handleSubmit:function(name) {
                let message = '请填写完表单';
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                let _this = this;
                if(!this.installmentType){
                    this.errorPayType = true
                }
                if(!this.depositAmount){
                    this.errorAmount = true;
                }
                if(this.timeError){
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    });
                    return
                }

                

                
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        if(this.errorPayType || this.errorAmount){
                            this.$Notice.error({
                                title:'请填写完表单'
                            });
                            return;
                        }
                        if(!_this.stationList.length){
                            _this.$Notice.error({
                                title:'请选择入驻工位'
                            });
                            _this.disabled = false;
                            return
                        }
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
            
            
            changeBeginTime:function(val){//租赁开始时间的触发事件，判断时间大小
                this.clearStation()
                if(!val || !this.formItem.endDate){
                    return;
                }
                let error = false;
                this.config();
                val = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(val))
                let params = {
                    end:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.formItem.endDate)),
                    start:val
                }
                if(new Date(val)>new Date(this.formItem.endDate)){
                    error = true;
                    this.$Notice.error({
                        title:'租赁开始时间不得大于结束时间'
                    })
                }else{
                    this.contractDateRange(params)
                }
                this.timeError = error;
                
            },
            
            
            
            contractDateRange:function(params){//获取租赁范围
                let _this = this;
                this.config();
                 this.$http.get('contract-date-range', params).then( r => {
                    _this.formItem.timeRange = r.data;
                }).catch( e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                    console.log('error',e)
                })
            },
            
             
                    
               
        }
    }
</script>
<style lang="less" scoped> 
  .g-refund{
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
