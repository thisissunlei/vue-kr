<template>
    <div class='make-invoice-form'>
        <div class="community-header">
            <!-- :rules="ruleInvestment" -->
            <Form ref="formItemInvestment" :model="formItem"  label-position="left">

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
                                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item label="发票内容" class='daily-form'> 
                            <Select 
                                v-model="formItem.contentType" 
                                placeholder="请输入发票内容" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>
                        <div style="display:inline-block">
                            <Form-item label="申请时间" class='priceForm' prop="endTime">
                                <DatePicker 
                                    v-model="formItem.startTime" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="endTime">
                                <DatePicker 
                                    v-model="formItem.endTime" 
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
                                    v-model="formItem.startAmount" 
                                    style="width: 90px"
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            <span class="attract-line">至</span>
                            <Form-item  class="priceForm" prop="endAmount">
                                <i-input 
                                    v-model="formItem.endAmount" 
                                    style="width: 90px"
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            
                            
                        </div>
                        <Form-item v-if="type =='all'"   label="我司主体" class='daily-form'> 
                            <Select 
                                v-model="formItem.goodsType" 
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
                if(value&&str>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            //租期天数
            const validateTime = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else{
                    callback();
                }
            };

            return { 
                loading:false, 
                formItem:{
                    applyNum:'',
                    billNums:'',

                    communityId:'',
                    companyId:'',
                    contentType:'',
                    endAmount:' ',
                    endRefundTime:'',
                    endTicketTime:'',

                    endTime:' ',
                    invoiceTitle:'',
                    invoiceType:'',
                    startAmount:'',

                    startRefundTime:'',
                    startTicketTime:'',

                    startTime:'',
                },
                communityList:[],
                cityList:[],
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                
                formItemOld:{},
                ruleInvestment: {
                    applyNum:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    billNums: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    communityId: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    companyId: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    contentType: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    endAmount: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    endRefundTime: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    endTicketTime: [
                        { validator: validateDiscount, trigger: 'change' }
                    ],
                    endTime: [
                        { validator: validateDiscount, trigger: 'change' }
                    ],
                    invoiceTitle:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    invoiceType:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    startAmount:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    startRefundTime:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    startTicketTime:[
                        { validator: validateTime, trigger: 'change' }
                    ],
                    startTime:[
                        { validator: validateTime, trigger: 'change' }
                    ]
                }
            }
    },
    mounted(){
        this.getCityList();
        this.getSourceData();
        var _this=this;
        setTimeout(() => {
            _this.$emit('initData',this.formItem);
            _this.formItemOld=Object.assign({},this.formItem);
        },500);
    },
    methods:{
        //销售员搜索
        remoteSaler(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.getSalerData(query)
                }, 200);
            }
        },
        //销售员
        getSalerData(name){
            let list = [];
            this.$http.get('get-saler',{phoneOrEmail:name}).then((res)=>{
                list = res.data.slice(0,10);
                this.loading= false;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //渠道来源
        getSourceData(){
            this.$http.get('get-customer-source').then((res)=>{
              
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //社区接口
        getCommunityList(id){
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
                this.formItem.communityId=res.data.length?res.data[0].id:'';
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
                this.formItem.cityId=res.data.length?res.data[0].cityId:'';
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
      
        //搜索
        searchClick(){
            console.log("0000000")
            this.$refs['formItemInvestment'].validate((valid) => {
                 this.$emit('searchClick',this.formItem);
                 console.log(valid,"pppppp")
                if (valid) {
                    //招商状态格式转换
                    var str='';
                    this.formItem.status.map((item,index)=>{
                            str=str?str+','+item:item;
                    }) 
                    this.formItem.investmentStatus=str; 
                    //渠道来源格式转换
                    var length=this.formItem.source.length;
                    if(length){
                        this.formItem.sourceId=this.formItem.source[0];
                        this.formItem.subSourceId=length>1?this.formItem.source[1]:'';
                    }
                   
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
