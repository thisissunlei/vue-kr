<template>
    <div class='make-invoice-form'>
        <div class="community-header">
            <!-- :rules="ruleInvestment" -->
            <Form ref="formItemOperation" :model="formItem"  :rules="ruleOperation" label-position="left">

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
                                <Option v-for="item in invoiceSpe" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item label="发票内容" class='daily-form'> 
                            <Select 
                                v-model="formItem.contentType" 
                                placeholder="请输入发票内容" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in invoiceDetail" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>
                        <div v-if="type !='alreadyReceive' && type !='waitReturn' " style="display:inline-block">
                            <Form-item label="开票时间" class='priceForm' prop="ticketStartDate">
                                <DatePicker 
                                    v-model="formItem.ticketStartDate" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="ticketEndDate">
                                <DatePicker 
                                    v-model="formItem.ticketEndDate" 
                                    placeholder="结束日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                        </div>

                         <div v-if="type =='alreadyReceive'" style="display:inline-block">
                            <Form-item label="领取时间" class='priceForm' prop="receiveStartDate">
                                <DatePicker 
                                    v-model="formItem.receiveStartDate" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="receiveEndDate">
                                <DatePicker 
                                    v-model="formItem.receiveEndDate" 
                                    placeholder="结束日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                        </div>
                          <!-- <div v-if="type =='waitReturn' " style="display:inline-block">
                            <Form-item label="收回时间" class='priceForm' prop="callbackStartDate">
                                <DatePicker 
                                    v-model="formItem.callbackStartDate" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="callbackEndDate">
                                <DatePicker 
                                    v-model="formItem.callbackEndDate" 
                                    placeholder="结束日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                        </div> -->
                         
                    </div>

                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>


                <!-- 第三行-->
                
                <div style="white-space: nowrap;">
                    <div style="display:inline-block;width:850px;">
                       <Form-item v-if="type=='alreadyReceive'" label="领取人员" class='daily-form' prop="invoiceTitle">
                            <!-- <i-input 
                                v-model="formItem.receiverName" 
                                placeholder="请输入领取人员"
                                style="width: 200px"
                                @on-blur="receiveBlur"
                                @keyup.enter.native="onKeyEnter($event)"
                            /> -->
                            <Select
                                v-model="receiverName"
                                filterable
                                remote
                                :placeholder="formItem.receiverName"
                                :label-in-value="labelValue"
                                :remote-method="remoteFun"
                                @on-change="receiveBlur">
                                <Option v-for="(option, index) in receiverOptions" :value="option.uid" :key="option.name">{{option.name}}</Option>
                            </Select>
                        </Form-item>
                       <!--  <Form-item v-if="type =='waitReturn'"   label="收回状态" class='daily-form'> 
                            <Select 
                                v-model="formItem.invoiceStatus" 
                                placeholder="请选择收回状态" 
                                style="width: 200px"
                                clearable
                                @on-change="changeInvoiceStatus"
                            >
                                <Option v-for="item in returnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item> -->
                        
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
            const validateName = (rule, value, callback) => {
                if(value&&value.length>20){
                    callback('长度最多20');
                }else{
                    callback();
                }
            };
            const validateTime = (rule, value, callback) => {
                var start='';
                var end='';
                if(rule.field=='ticketStartDate'||rule.field=='ticketEndDate'){
                    start=this.formItem.ticketStartDate;
                    end=this.formItem.ticketEndDate;
                }
                if(rule.field=='receiveStartDate'||rule.field=='receiveEndDate'){
                    start=this.formItem.receiveStartDate;
                    end=this.formItem.receiveEndDate;
                }
                if(rule.field=='callbackStartDate'||rule.field=='callbackEndDate'){
                    start=this.formItem.callbackStartDate;
                    end=this.formItem.callbackEndDate;
                }
                if (start&&end&&start>end) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };

            return { 
                receiverName:'',
                labelValue:true,
                receiverOptions:[],
                loading:false, 
                params:{},
                formItem:{
                    applyNum:'',
                    billNums:'',

                    communityId:'',
                    cityId:'',
                    companyId:'',
                    contentType:' ',

                    invoiceTitle:'',
                    invoiceType:' ',
                    startAmount:' ',
                    invoiceStatus:' ',


                    ticketEndDate:'',
                    ticketStartDate:'',
                    receiveEndDate:'',
                    receiveStartDate:'',
                    callbackStartDate:'',
                    callbackEndDate:'',
                },
                communityList:[],
                cityList:[],
                invoiceSpe:[
                    {value:' ',label:'全部规格'},
                    {value:'COMMON_INVOICE',label:'增值税普通发票'},
                    {value:'SPECIAL_INVOICE',label:'增值税专用发票'},
                    {value:'SPECIAL_ELEC_INVOICE',label:'增值税普通电子发票'}
                ],
                invoiceDetail:[
                    {value:' ',label:'全部内容'},
                    {value:'SERVICE',label:'服务费'},
                    {value:'SEAT',label:'工位服务费'},
                    {value:'RENT',label:'租金'},
                    {value:'SPACE_MANAGE',label:'众创空间管理费'}
                ],
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                returnList:[
                    {value:' ',label:'全部'},
                    {value:'RETURNING',label:'未回收'},
                    {value:'RECOVERYED',label:'已收回'},
                ],
                
                formItemOld:{
                    ticketEndDate:'',
                    ticketStartDate:'',
                    receiveEndDate:'',
                    receiveStartDate:'',
                    callbackStartDate:'',
                    callbackEndDate:'',
                },
                ruleOperation: {
                    applyNum:[
                        { validator: validateName, trigger: 'change' }
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
                    ]
                }
            }
    },
    mounted(){
        this.getCityList();
        this.getSourceData();
        var _this=this;
        this.params = _this.$route.query;
        _this.$emit('initData',this.formItem);
        let params = Object.assign({},this.$route.query);
        if(params.callbackEndDate){
            params.callbackEndDate = new Date(parseInt(params.callbackEndDate)).getTime();
        }
        if(params.callbackStartDate){
            params.callbackStartDate =  new Date(parseInt(params.callbackStartDate)).getTime();
        }
        if(params.receiveStartDate){
            params.receiveStartDate = new Date(parseInt(params.receiveStartDate)).getTime();
        }
        if(params.receiveEndDate){
            params.receiveEndDate =  new Date(parseInt(params.receiveEndDate)).getTime();
        }
        if(params.ticketStartDate){
            params.ticketStartDate = new Date(parseInt(params.ticketStartDate)).getTime();
        }
        if(params.ticketEndDate){
            params.ticketEndDate =  new Date(parseInt(params.ticketEndDate)).getTime();
        }
        this.formItem=Object.assign({},this.formItem,params);
        setTimeout(() => {
            if(!_this.formItem.contentType){
                _this.formItem.contentType=' ';
            }
            if(!_this.formItem.invoiceType){
                _this.formItem.invoiceType=' ';
            }
        },500);
        
    },
    methods:{
         remoteFun (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.getRecList(query)
                    }, 200);
                }

            },
        getRecList:function(name){
                let params = {
                    name:name
                }
                let list = [];
                let _this = this;
                this.$http.get('changeUserByName', params, r => {
                    // list = r.data.slice(0,10);
                    list = r.data;
                    list.map((item)=>{
                        let obj = item;
                        obj.uid = item.uid+'';
                        return obj;
                    });
                    _this.loading1 = false;
                    _this.receiverOptions = list;
                }, e => {

                    console.log('error',e)
                })

            },
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
                res.data.unshift({cityId:' ',name:'全部社区',id:' '})
                 this.communityList=res.data.map(item=>{
                    item.id = item.id+'';
                    return item;
                });
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
        //获取今天的日期
        getToDay(){
            var today = dateUtils.dateToStr("YYYY-MM-DD 00:00:00", new Date());
            return today; 
        },
        //搜索
        searchClick(){
            this.$refs['formItemOperation'].validate((valid) => {
                if (valid) {
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            console.log('changeCIty',param)
            if(this.params.cityId == param){
                this.getCommunityList(param)
            }else{
                this.getCommunityList(param)
                this.param = {}
            }
            
        },
        //社区change事件
        communityChange(param){
            
        },
        changeInvoiceStatus(val){
            var tab=localStorage.getItem('operation-side-invoice');
            if(tab === 'TO_RETURN'){
                this.formItem.invoiceStatusList = 'TO_RETURN,'+val
            }
            
            
        },
        receiveBlur(value){
            if(value){
                this.formItem.receiverName = value.label;
                this.formItem.receiverId = value.value;
            }
        },
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
