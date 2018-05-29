<template>
    <div class="add-invoice">
        <SectionTitle title="申请开票"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col span="12" class="col">
                        <FormItem label="企业类别" style="width:252px" prop="customerId">
                            <Select 
                                :disabled="isReady"
                                v-model="formItem.titleType" 
                                placeholder="请输入企业类别" 
                                clearable
                            >
                                <Option v-for="item in unitTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="纳税类型" style="width:252px"  prop="communityId">
                            <Select 
                                :disabled="isReady" 
                                v-model="formItem.taxpayerType" 
                                placeholder="请输入纳税类型" 
                                clearable
                            >
                                <Option v-for="item in taxTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" prop="salerId">
                             <Input 
                                :disabled="isReady" 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入发票抬头" 
                            />
                        </FormItem>
                    </Col>
                    <Col class="col">
                        <FormItem label="纳税人识别码" style="width:252px" prop="startDate">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.taxpayerNumber" 
                                placeholder="请输入纳税人识别码" 
                            />
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="注册地址" style="width:252px" prop="startDate">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerAddress" 
                                placeholder="请输入注册地址" 
                            />
                        </FormItem>
                        
                    </Col>
                    <Col class="col">
                        <FormItem label="注册电话" style="width:252px" prop="startDate">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerPhone" 
                                placeholder="请输入注册电话" 
                            />
                        </FormItem>
                        
                    </Col>
                    <Col class="col">
                        <FormItem label="开户银行" style="width:252px" prop="startDate">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.bank" 
                                placeholder="请输入开户银行" 
                            />
                        </FormItem>
                        
                    </Col>
                     <Col class="col">
                        <FormItem label="银行账户" style="width:252px" prop="startDate">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.bankAccount" 
                                placeholder="请输入银行账户" 
                            />
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="开票信息">
                <Row  style="margin-bottom:30px">   
                    <PhotoAlbum
                      :data="imagesArr"
                    />
                </Row>
            </DetailStyle>
          
            <FormItem style="padding-left:24px;margin-top:40px; width:730px;" >
                <div style="text-align: center;padding:0px 20px;">
                    <Button class="view-btn" @click="editClick('formItem')" :disabled="disabled" v-if="!disabled">编辑</Button>
                    <Button class="view-btn" @click="handleSubmit('formItem')" :disabled="disabled" v-if="!disabled">确定</Button>
                    <Button class="view-btn" >驳回</Button>
                </div>
                <!-- <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button> -->
            </FormItem>

        </Form>

        
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import planMap from '~/components/PlanMap.vue';
import dateUtils from 'vue-dateutils';
import PhotoAlbum from '~/components/PhotoAlbum';

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
                isReady:true, //只读页面
                disabled:false,
                //单位类型
                unitTypeList:[
                    {value:' ',label:'全部'},
                    {value:'COMPANY',label:'企业单位'},
                    {value:'PERSON',label:'个人/非企业单位'}
                ],
                //纳税类型
                taxTypeList:[
                    {value:' ',label:'全部'},
                    {value:'SMALL',label:'小规模纳税人'},
                    {value:'GENERAL',label:'一般纳税人'}
                ],
                imagesArr:[],
                tableColumns: [
                    {
                        title: '账单编号',
                        key: 'name'
                    },
                    {
                        title: '账单类型',
                        key: 'seatType',
                        render:(h, params) => {
                            let type = params.row.seatType;
                            let typeName = '开放工位';
                            if(type =='SPACE'){
                                typeName = '独立办公室'
                            }else{
                                typeName = "开放工位"
                            }
                            return typeName
                        }
                    },
                    {
                        title:'费用类型',
                        key:'capacity'
                    },
                    {
                        title: '可开票金额',
                        key: 'guidePrice'
                    },
                    {
                        title: '申请开票金额',
                        key: 'guidePrice',
                        render: (h, params) => {
                            let price = params.row.originalPrice;
                            
                            return h('Input', {
                                props: {
                                    min:params.row.guidePrice,
                                    value:params.row.originalPrice,
                                    disabled:this.isReady
                                },
                                on:{
                                    'on-change':(event)=>{
                                        this.tabelInputChange(event);
                                    }
                                }
                            },'44')
                        }
                    }
                ],
                //列表数据
                stationList: [
                    {customerId:'33333'}
                ],
               
                formItem: {
                    titleType: '',
                    taxpayerType: '',
                    invoiceTitle: '',
                    taxpayerNumber:'',
                    registerAddress:'',
                    registerPhone:'',
                    bank:'',
                    bankAccount:''   
                },
                //校验
                ruleCustom:{
                //     startDate: [
                //         { required: true,type: 'date', message: '请先选择开始时间', trigger: 'change' }
                //     ],
                //     firstPayTime: [
                //         { required: true, trigger: 'change' ,validator: validateFirst},
                //     ],
                //     endDate: [
                //         { required: true, type: 'date',message: '请先选择结束时间', trigger: 'change' }
                //     ],
                //     endDateStatus: [
                //         { required: true, type: 'date',message: '请先选择结束时间', trigger: 'change' }
                //     ],
                //     communityId:[
                //         { required: true, message: '请选择社区', trigger: 'change' }
                //     ],
                //     customerId:[
                //         { required: true, message: '请选择客户', trigger: 'change' }
                //     ],
                //     salerId:[
                //         { required: true, message: '请选择销售员', trigger: 'change' }
                //     ],
                //     signDate:[
                //         { required: true,type: 'date', message: '请先选择签署时间', trigger: 'change' }
                //     ]
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
            PhotoAlbum
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            this.getViewDetail();
        },
        methods: {
            getViewDetail(){
                let params = Object.assign({},this.$route.query);
                this.$http.get('get-financial-invoice-detail',{id:params.id}).then((res)=>{
                    this.formItem=Object.assign({},res.data);
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            tabelInputChange(event){
                console.log(event,"pppppppppp")
            },
            editClick(){
                this.isReady = false;
            },
            back(){
                window.history.go(-1);
            },
            handleSubmit:function(name) {
               let editData=Object.assign({},this.formItem);   
               delete editData.ctime;     
               this.$http.post('get-financial-invoice-edit',editData).then((res)=>{
                    console.log('editok',res);
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
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
            changeCustomer(value){
                // 客户
                if(value){
                    this.formItem.customerId = value;
                }else{
                    this.formItem.customerId = '';
                }
                this.getFloor = +new Date()

            },
        }
    }
</script>


<style lang="less" scoped> 
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
        .view-btn{
            margin: 0px 20px;
        }
        
   }
   
   
</style>
