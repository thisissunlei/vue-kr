<template>
    <div class='make-invoice-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem"  label-position="left" :rules="ruleOperation">

                <!-- 第一行-->
                <div style="white-space: nowrap;width:850px;"> 
                        <Form-item label="申请编号" class='daily-form' prop="applyNum">
                            <i-input 
                                v-model="formItem.applyNum" 
                                placeholder="请输入申请编号"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                         <Form-item class="daily-form priceForm community-form">
                            <span class="attract-font">社<span style="display:inline-block;width:26px;"></span>区</span>
                            <Select 
                                v-model="formItem.cityId" 
                                placeholder="请选择社区" 
                                style="width: 90px;margin-right:20px;"
                                @on-change="cityChange"
                            >
                                <Option 
                                    v-for="item in cityList" 
                                    :value="item.cityId" 
                                    :key="item.cityId"
                                >
                                    {{ item.cityName }}
                                </Option>
                            </Select>
                            <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区" 
                                    style="width: 90px;"
                                    @on-change="communityChange"
                                >
                                    <Option 
                                        v-for="item in communityList" 
                                        :value="item.id" 
                                        :key="item.id"
                                    >
                                        {{ item.name }}
                                    </Option>
                            </Select>
                        </Form-item>
                       <Form-item label="发票抬头" class='daily-form' prop="invoiceTitle">
                            <i-input 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入发票抬头"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                       
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
                    <div style="width:850px;display:inline-block;"> 
                        <Form-item label="发票规格" class='daily-form'> 
                            <Select 
                                v-model="formItem.invoiceType" 
                                placeholder="请输入发票规格" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in invoiceTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item label="发票内容" class='daily-form'> 
                            <Select 
                                v-model="formItem.contentType" 
                                placeholder="请输入发票内容" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in contentTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                        </Form-item>
                        <div style="display:inline-block">
                            <Form-item label="申请时间" class='priceForm' prop="applyStartDate">
                                <DatePicker 
                                    v-model="formItem.applyStartDate" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="applyEndDate">
                                <DatePicker 
                                    v-model="formItem.applyEndDate" 
                                    placeholder="结束日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                        </div>
                         
                    </div>

                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>


                <!-- 第三行-->
                
                <div style="white-space: nowrap;">
                    <div style="display:inline-block;width:850px;">
                        <div class="daily-form" v-if="type !=='returnMake'" >
                            <span class="attract-font" style="padding-top:7px;">发票金额</span>
                            <Form-item  class="priceForm" prop="startAmount">
                                <i-input 
                                    v-model="formItem.minAmount" 
                                    style="width: 90px"
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            <span class="attract-line">至</span>
                            <Form-item  class="priceForm" prop="maxAmount">
                                <i-input 
                                    v-model="formItem.maxAmount" 
                                    style="width: 90px"
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            
                            
                        </div>
                        <Form-item v-if="type =='all'"   label="我司主体" class='daily-form'> 
                            <Select 
                                v-model="formItem.corporationId" 
                                placeholder="请选择我司主体" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>
                        <Form-item label="账单编号" class='daily-form' prop="billNums">
                            <i-input 
                                v-model="formItem.billNums" 
                                placeholder="请输入账单编号"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        
                    </div>
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>

            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
// import publicFn from '../publicFn';
import utils from '~/plugins/utils';
import SelectSaler from '~/components/SelectSaler.vue'
export default {
    props:{
        type:{
            type:String,
        }
    },
    components:{
       SelectSaler
    },
    data() {
            //工位数量
            const validateStation = (rule, value, callback) => {
                // callback();
                return ;
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else if (this.formItem.stationsMin&&this.formItem.stationsMax&&Number(this.formItem.stationsMin)>Number(this.formItem.stationsMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //签约价
            const validatePrice = (rule, value, callback) => {
                // callback();
                return ;
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.priceMin&&this.formItem.priceMax&&Number(this.formItem.priceMin)>Number(this.formItem.priceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //商品定价
            const validateOrder = (rule, value, callback) => {
                // callback();
                return ;
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.orderPriceMin&&this.formItem.orderPriceMax&&Number(this.formItem.orderPriceMin)>Number(this.formItem.orderPriceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //折扣
            const validateDiscount = (rule, value, callback) => {
                var reg=/^(([1-9]{1})|([0-9]{1}\.\d{1}))$/;
                //  callback();
                return ;
                if(value&&!reg.test(value)){
                    callback('请输入0-10之间的数字,最多1位小数');
                }else if (this.formItem.discountMin&&this.formItem.discountMax&&Number(this.formItem.discountMin)>Number(this.formItem.discountMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };    
            //商品名称
            const validateName = (rule, value, callback) => {
                // var str=publicFn.fucCheckLength(value);
                if(value&&value.length>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            const validateMoney = (rule, value, callback)=>{
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if (this.formItem.startAmount&&this.formItem.maxAmount&&Number(this.formItem.startAmount)>Number(this.formItem.maxAmount)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            }
            const validateApplyNum = (rule, value, callback) => {
                // var str=publicFn.fucCheckLength(value);
                if(value&&value.length>20){
                    callback('最多20个字节');
                }else{
                    callback();
                }
            }; 
            const validateBillNums =  (rule, value, callback) => {
                // var str=publicFn.fucCheckLength(value);
                if(value&&value.length>20){
                    callback('最多20个字节');
                }else{
                    callback();
                }
            }; 
             const validateTime = (rule, value, callback) => {
                var start='';
                var end='';
                if(rule.field=='applyEndDate'||rule.field=='applyStartDate'){
                    start=this.formItem.applyStartDate;
                    end=this.formItem.applyEndDate;
                }
                if (start&&end&&start>end){
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };

            return { 
                loading:false, 
                formItem:{
                    applyNum:'',
                    billNums:'',
                    communityId:' ',
                    companyId:'',
                    maxAmount:'',
                    invoiceTitle:'',
                    invoiceType:' ',
                    startAmount:'',
                    cityId:' ',

                    startRefundTime:'',
                    startTicketTime:'',
                    startTime:'',
                    endRefundTime:'',
                    endTicketTime:'',
                    endTime:'',
                    contentType:' ',
                    corporationId:' '
                },
                //发票规格数组
                invoiceTypeList:[],
                //发票内容
                contentTypeList:[],

                communityList:[],
                cityList:[],
                productList:[],
                
                formItemOld:{},
                ruleOperation:{
                    applyNum:[
                        { validator: validateApplyNum, trigger: 'change' }
                    ],
                    billNums:[
                        { validator: validateBillNums, trigger: 'change' }
                    ],
                    invoiceTitle: [
                        { validator: validateName, trigger: 'change' }
                    ],
                    ticketEndDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    ticketStartDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    receiveEndDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    receiveStartDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    callbackStartDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    callbackEndDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    minAmount:[
                        { validator: validateMoney, trigger: 'change' }
                    ],
                    maxAmount:[
                        { validator: validateMoney, trigger: 'change' }
                    ],
                    applyStartDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    applyEndDate:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                }
            
            }
    },
    mounted(){
        this.getCityList();
        this.getInvoiceTypeList();
        this.getContentTypeList();
        this.getList();
        var _this=this;
        this.params = _this.$route.query;
        _this.$emit('initData',this.formItem);      
        let params = Object.assign({},this.$route.query);
        if(params.startRefundTime){
            params.startRefundTime = new Date(parseInt(params.startRefundTime)).getTime();
        }
        if(params.startTicketTime){
            params.startTicketTime =  new Date(parseInt(params.startTicketTime)).getTime();
        }
        if(params.startTime){
            params.startTime = new Date(parseInt(params.startTime)).getTime();
        }
        if(params.endRefundTime){
            params.endRefundTime =  new Date(parseInt(params.endRefundTime)).getTime();
        }
        if(params.endTicketTime){
            params.endTicketTime = new Date(parseInt(params.endTicketTime)).getTime();
        }
        if(params.endTime){
            params.endTime =  new Date(parseInt(params.endTime)).getTime();
        }
        this.formItem=Object.assign({},this.formItem,params);
    },

    methods:{
        //获取发票规格
        getInvoiceTypeList(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.order.api.enums.invoice.InvoiceType'
            }).then((res)=>{
                res.data.unshift({code:'',desc:'全部',value:' '})

                this.invoiceTypeList = res.data;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        getContentTypeList(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.order.api.enums.invoice.ContentType'
            }).then((res)=>{
                 res.data.unshift({code:'',desc:'全部',value:' '})

                this.contentTypeList = res.data;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        //社区接口
        getCommunityList(id){
            console.log('---------');
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                 res.data.unshift({cityId:' ',name:'全部社区',id:' '})
                 this.communityList=res.data.map(item=>{
                    item.id = item.id+'';
                    return item;
                });
                 console.log('======')
                if(this.params.communityId){
                    this.formItem.communityId=this.params.communityId;
                }else{
                    this.formItem.communityId=res.data.length?res.data[0].id:'';
                }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            this.$http.get('getDailyCity').then((res)=>{
               
                res.data.unshift({cityId:' ',cityName:'全部城市'})

                this.cityList=res.data.map(item=>{
                    item.cityId = item.cityId+''
                    return item;
                });
                 console.log('======',res.data)

                if(this.params.cityId){
                    this.formItem.cityId=this.params.cityId;
                }else{
                    this.formItem.cityId=res.data.length?res.data[0].cityId:'';
                    

                }
                this.getCommunityList(this.formItem.cityId)
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getList(){
            this.$http.get('corporation-list').then((res)=>{
               
                res.data.unshift({cityId:' ',cityName:'全部'})
                this.productList = res.data.map(item=>{
                    item.value = item.id+'';
                    item.label = item.corporationName;
                    return item;
                })


            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
      
        //搜索
        searchClick(){
            this.$refs['formItemInvestment'].validate((valid) => {
                 
                if (valid) {
                    console.log('===>',this.formItem)
                    this.$emit('searchClick',this.formItem);
                   
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.formItem.status=[];
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            console.log('---------',param);
            this.getCommunityList(param)
        },
        //社区change事件
        communityChange(param){
            
        }
    }
}
</script>

<style lang='less'>
    .make-invoice-form{
         .community-header{
            padding: 30px 10px 10px 20px;
            .ivu-form .ivu-form-item-label{
                color:#333;
                font-weight: 500;
            }
            .daily-form{
                display:inline-block;
                margin-right:20px;
                .ivu-form-item-content{
                    display:inline-block;
                }
                .ivu-form-item:after, .ivu-form-item:before{
                    content: none;
                }
            }
            .community-form{
                vertical-align: middle;
                .ivu-select-dropdown{
                    min-width:100px;
                    width:auto !important;
                    left:auto !important;
                }
            }
            .priceForm{
                display:inline-block;
                .ivu-form-item-content{
                    display:inline-block;
                }
            }
            .attract-font{
                font-weight:bold;
                display:inline-block;
                margin-right:12px;
            }
            .attract-line{
                display:inline-block;
                margin:0 4px 0 5px;
                padding-top: 6px;
            }
            .tip-pic{
                display:inline-block;
                width: 16px;
                height: 16px;
                // background: url(img/q1.svg) no-repeat center;
                background-size: 100%;
                vertical-align: middle;
                margin-right:5px;
                margin-top: -2px;
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:150px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
        }
     }
</style>
