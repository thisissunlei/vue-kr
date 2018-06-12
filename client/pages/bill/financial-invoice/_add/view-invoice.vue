<template>
    <div class="add-invoice">
        <SectionTitle title="资料详情"></SectionTitle>
        <Form ref="formItem" :model="formItem" :rules="ruleCustom" class="creat-order-form">
            <DetailStyle info="基本信息">
                <Row style="margin-bottom:30px">  
                    <Col span="12" class="col">
                        <FormItem label="企业类别" style="width:252px" prop="titleType">
                            <Select 
                                :disabled="isReady"
                                v-model="formItem.titleType" 
                                placeholder="请输入企业类别" 
                                clearable
                                @on-change="changeType"
                            >
                                <Option v-for="item in unitTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col class="col">
                        <FormItem label="发票抬头" style="width:252px" prop="invoiceTitle">
                             <Input 
                                :disabled="isReady" 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入发票抬头" 
                            />
                        </FormItem>
                    </Col>


                    <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="纳税类型" style="width:252px"  prop="taxpayerType">
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
                    
                    <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="纳税人识别码" style="width:252px" prop="taxpayerNumber" >
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.taxpayerNumber" 
                                placeholder="请输入纳税人识别码" 
                            />
                        </FormItem>
                    </Col>

                    <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="注册地址" style="width:252px" prop="registerAddress">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerAddress" 
                                placeholder="请输入注册地址" 
                            />
                        </FormItem>
                        
                    </Col>
                    <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="注册电话" style="width:252px" prop="registerPhone">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.registerPhone" 
                                placeholder="请输入注册电话" 
                            />
                        </FormItem>
                        
                    </Col>
                    <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="开户银行" style="width:252px" prop="bank">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.bank" 
                                placeholder="请输入开户银行" 
                            />
                        </FormItem>
                        
                    </Col>
                     <Col class="col" v-if="formItem.titleType=='COMPANY'">
                        <FormItem label="银行账户" style="width:252px" prop="bankAccount">
                            <Input 
                                :disabled="isReady" 
                                v-model="formItem.bankAccount" 
                                placeholder="请输入银行账户" 
                            />
                        </FormItem>
                        
                    </Col>
                </Row>
            </DetailStyle>
            <DetailStyle info="开票信息" v-if="formItem.titleType=='COMPANY'">
                <Row  style="margin-bottom:30px">   
                    <Col style="display:block;">
                       营业执照:
                        <KrUpload 
                            :file="businessUrlName"
                            type="only"
                            :columnDetail="{}"
                            :multiple="true"
                            :disabled="isReady"
                            category="contract/upload"
                            @delete="(index)=>{
                                imgDelete(index,'businessUrlName')
                            }"
                            @upSuccess="(detail)=>{
                                upChange(detail,'businessUrlName')
                            }"
                        />
                       <!-- <span 
                        v-for="(item,index) in businessUrlName"
                        :key="item.id"
                        style="color:#499df1;cursor:pointer;margin-right:10px;"
                        @click="businessClick(item,index,'bus')"
                       >
                       
                         {{item.fileName}}
                       </span> -->
                       
                    </Col>
                    <Col style="display:block;margin-top:20px;">
                       一般纳税人证明:
                        <KrUpload 
                            :file="taxUrlName"
                            type="only"
                            category="contract/upload"
                            :columnDetail="{}"
                            @delete="(index)=>{
                                imgDelete(index,'taxUrlName')
                            }"
                            @upSuccess="(detail)=>{
                                upChange(detail,'taxUrlName')
                            }"
                            :multiple="true"
                            :disabled="isReady"
                        />
                       <!-- <span 
                        v-for="item in taxUrlName"
                        :key="item.id"
                        style="color:#499df1;cursor:pointer;margin-right:10px;"
                        @click="businessClick(item,index,'txt')"
                       >
                         {{item.fileName}}
                       </span> -->
                    </Col>
                </Row>
            </DetailStyle>
            
            <!-- <PhotoAlbum 
                :data="imgData" 
                v-if="openBussiness" 
                :eyeIndex="eyeIndex" 
                @close="bussinessClose"
                @downFile="downImg"
             /> -->
            
            <FormItem style="padding-left:24px;margin-top:40px; width:730px;" >
                <div style="text-align: center;padding:0px 20px;">
                    <Button class="view-btn" @click="editClick('formItem')" :disabled="disabled" v-if="isReady">编辑</Button>
                    <Button class="view-btn" @click="handleSubmit('formItem')" :disabled="disabled">确定</Button>
                    <Button class="view-btn" @click="rejectedSubmit" v-if="!isReady && formItem.verifyStatus=='VERIFYING'">驳回</Button>
                </div>
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
import KrUpload from '~/components/KrUpload';


import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';
    export default {
        components:{
            KrUpload,
            SectionTitle,
            selectCommunities,
            DetailStyle,
            selectCustomers,
            SelectSaler,
            planMap,
            PhotoAlbum
        },
        data() {
            const validateMust = (rule, value, callback) => {
                if(this.formItem.titleType=='PERSON'){
                    callback();
                }
                if(this.formItem.titleType!='PERSON' && value === ''){
                    callback(new Error('此项为必填项。'));
                }else{
                     callback();
                }
            };
            const validatephone = (rule, value, callback) => {
                if(this.formItem.titleType=='PERSON'){
                    callback();
                }
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (this.formItem.titleType!='PERSON' && !phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            return {

                isReady:true, //只读页面
                disabled:false,
                openBussiness:false,
                //单位类型
                unitTypeList:[
                    {value:'COMPANY',label:'企业单位'},
                    {value:'PERSON',label:'个人/非企业单位'}
                ],
                //纳税类型
                taxTypeList:[
                    {value:'SMALL',label:'小规模纳税人'},
                    {value:'GENERAL',label:'一般纳税人'}
                ],
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
                    bankAccount:'' ,
                    verifyStatus:''  
                },
                //校验
                ruleCustom:{
                    titleType: [
                        { required: true, message: '请先选择企业类别', trigger: 'change' }
                    ],
                    taxpayerType: [
                        {trigger: 'change' ,validator: validateMust},
                    ],
                    invoiceTitle: [
                        { required: true, message: '请先选择结束时间', trigger: 'change' }
                    ],
                    taxpayerNumber: [
                        {trigger: 'change' ,validator: validateMust},
                    ],
                    registerAddress:[
                        {trigger: 'change' ,validator: validateMust},
                    ],
                    registerPhone:[
                        {trigger: 'change' ,validator: validatephone},
                    ],
                    bank:[
                       {trigger: 'change' ,validator: validateMust},
                    ],
                    bankAccount:[
                       {trigger: 'change' ,validator: validateMust},
                    ]
                },
                salerName:'请选择',
                businessUrlName:[],
                taxUrlName:[],
                eyeIndex:0,
                imgData:[],

            }
        },
        head() {
            return {
                title: '资料详情'
            }
        },
         mounted(){
            let params = Object.assign({},this.$route.query);
            if(params.type == 'edit'){
                //编辑模式
                this.isReady = false;
                
            }else{
                //查看模式
                this.isReady = true;
            }
            GLOBALSIDESWITCH("false");
            this.getViewDetail();
        },
        methods: {
            changeType(value){
                if(value){
                    this.formItem.titleType = value;
                }else{
                    this.formItem.titleType = ''
                }
                //欢哥说的，切换类别，清空除抬头外其他数据
                if(value=='PERSON'){
                    let obj = {
                        invoiceTitle : this.formItem.invoiceTitle,
                        titleType :value,
                        id:this.formItem.id,
                        verifyStatus:this.formItem.verifyStatus
                    }
                    this.formItem = obj;
                }
            },
            upChange(detail,type){
                console.log('upChange',detail)
                let businessUrlName = [].concat(this.businessUrlName);
                console.log('this.businessUrlName==',this.businessUrlName)
                let taxUrlName = [].concat(this.taxUrlName);
                console.log('this.taxUrlName==',this.taxUrlName)
                if(type == 'taxUrlName' && !this.taxUrlName.length){

                    this.taxUrlName = taxUrlName.concat(detail);
                }
                if(type == 'businessUrlName' && !this.businessUrlName.length){

                    this.businessUrlName = businessUrlName.concat(detail)
                }
            },
            bussinessClose(){
                this.openBussiness=!this.openBussiness;
            },
            businessClick(item,index,param){
                if(param=='bus'){
                    this.imgData=this.businessUrlName;
                }else{
                    this.imgData=this.taxUrlName;
                }
                this.eyeIndex=index;
                this.bussinessClose();
            },
            downImg(url,id){
                utils.downImg(url);
            },
            rejectedSubmit(){
                let param = Object.assign({},this.$route.query);
                let params = {
                    handleType:'reject',
                    id :param.id,
                }
                this.$http.put('get-financial-invoice-rejected', params).then((res)=>{
                    window.close();
                window.opener.location.reload(); 
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getViewDetail(){
                let params = Object.assign({},this.$route.query);
                this.$http.get('get-financial-invoice-detail',{id:params.id}).then((res)=>{
                    this.formItem=Object.assign({},res.data);
                    this.formItem.businessLicense.map((item,index)=>{
                         var list=Object.assign({},item);
                         list.fieldUrl=list.url;
                         this.businessUrlName.push(list);
                    })
                    console.log(this.formItem)
                    this.formItem.taxCertificate.map((item,index)=>{
                         var list=Object.assign({},item);
                         list.fieldUrl=list.url;
                         this.taxUrlName.push(list)
                    })
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            tabelInputChange(event){
                // console.log(event,"pppppppppp")
            },
            editClick(){
                this.isReady = false;
            },
            imgDelete(index,type){
                let businessUrlName = [].concat(this.businessUrlName);
                let taxUrlName = [].concat(this.taxUrlName);
                if(type == 'taxUrlName'){
                    taxUrlName.splice(index)
                    this.taxUrlName = [].concat(taxUrlName);
                }   
                if(type == 'businessUrlName'){
                    businessUrlName.splice(index)
                    this.bussinessClose = [].concat(businessUrlName)
                }
            },
            back(){
                window.history.go(-1);
            },
            handleSubmit:function(name) {
               let editData=Object.assign({},this.formItem);   
               delete editData.ctime;  
               delete editData.rejectTime;
               delete editData.verifyTime ; 
               delete editData.utime ;
               this.businessUrlName = this.businessUrlName.map(item=>{
                item.sourceType = 'BUSINESS_LICENSE';
                item.qualificationId = this.formItem.id;
                return item;
               })
               this.taxUrlName = this.taxUrlName.map(item=>{
                item.sourceType = 'TAX_CERTIFICATE';
                item.qualificationId = this.formItem.id;
                return item;
               })
               
               editData.taxCertificateTemp = JSON.stringify(this.taxUrlName)
               editData.businessLicenseTemp = JSON.stringify(this.businessUrlName)
                delete editData.taxCertificate;
               delete editData.businessLicense;


               console.log('=====>',editData,this.businessUrlName)
               // return;
               this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('get-financial-invoice-edit',editData).then((res)=>{
                            console.log('editok',res);
                            window.close();
                        window.opener.location.reload();
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })
                    }
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
