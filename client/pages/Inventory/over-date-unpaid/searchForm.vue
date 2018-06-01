<template>
    <div class='daily-search-form'>
        <div class="daily-header">
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">

                <div style="white-space: nowrap;">
                    <Form-item class='daily-form community-form'>
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;">社<span style="display:inline-block;width:27px;"></span>区</span>
                        <Select 
                            v-model="formItem.cityId" 
                            placeholder="请输入城市" 
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
                                v-if="communityList && communityList.length !=0"
                                placeholder="请输入社区" 
                                style="width: 90px; margin-right:20px;"
                            >
                                <Option 
                                    v-for="item in communityList" 
                                    :value="item.id" 
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </Option>
                        </Select>

                        <span style="color:#333;font-weight: 500;display: inline-block;margin-right:11px;">账单类型</span>
                        <Select 
                            v-model="formItem.bizType" 
                            placeholder="请输入账单类型" 
                            style="width: 150px"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">
                                {{ item.desc}}
                                </Option>
                        </Select> 
        
                    </Form-item>

                    <div style="display:inline-block;margin-right:19px;vertical-align: top;">
                            <Form-item label="最晚付款日" class='priceForm' prop="serviceDateBegin">
                                <DatePicker 
                                    v-model="formItem.serviceDateBegin" 
                                    placeholder="开始日期"
                                    style="width: 105px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                            <Form-item  class='priceForm' prop="serviceDateEnd">
                                <DatePicker 
                                    v-model="formItem.serviceDateEnd" 
                                    placeholder="结束日期"
                                    style="width: 105px"
                                />
                            </Form-item>
                    </div>


         

                     <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <div style="white-space: nowrap;">
                    <div style="display:inline-block;margin-right:19px;vertical-align: top;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:14px;">欠款金额</span>
                        <Form-item  prop="debtMin" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.debtMin" 
                                style="width: 90px;"
                                placeholder="金额"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                        <Form-item  prop="debtMax" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.debtMax" 
                                style="width: 90px;"
                                placeholder="金额"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        
                    </div>

                    
                    <div style="display:inline-block;margin-right:19px;vertical-align: top;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:11px;">逾期时长</span>
                        <Form-item  prop="overdueMin" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.overdueMin" 
                                style="width: 65px;"
                                placeholder="天数"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                        <Form-item  prop="overdueMax" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.overdueMax" 
                                style="width: 65px;"
                                placeholder="天数"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        
                    </div>

                    <div style="display:inline-block;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:24px;">客户名称</span>

                        <Form-item class='daily-form' prop="customerName">
                            <i-input 
                                v-model="formItem.customerName" 
                                placeholder="请输入客户名称"
                                style="width: 150px;margin-right:80px;"
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
import publicFn from '../publicFn';
import utils from '~/plugins/utils';
export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    data() {
        const validateTime = (rule, value, callback) => {
                var start=''; 
                var end='';
                if(rule.field=='serviceDateBegin'||rule.field=='serviceDateEnd'){
                    start=this.formItem.serviceDateBegin;
                    end=this.formItem.serviceDateEnd;
                }
                if (start&&end&&start>end) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };

            const validatePrice = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>9999999){ 
                    callback('单价最高9999999');
                }else if (this.formItem.debtMin&&this.formItem.debtMax&&Number(this.formItem.debtMin)>Number(this.formItem.debtMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            const validateOverdue = (rule, value, callback) => {
                var reg = /^-?\d+$/;
                if(value&&!reg.test(value)){
                    callback('请输入整数');
                }else if(value&&value.length>3){ 
                    callback('天数最多999');
                }else if (this.formItem.overdueMin&&this.formItem.overdueMax&&Number(this.formItem.overdueMin)>Number(this.formItem.overdueMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                } 
            };
            
            return {  
                num:0,
                formItem:{
                    communityId:'',
                    cityId:'',
                    //服务开始日
                    serviceDateBegin:this.getToDay(),
                    serviceDateEnd:this.getToDay(),
                    //欠款
                     debtMin:'',
                     debtMax:'',
                     //逾期
                     overdueMin:"",
                     overdueMax:'',


                     customerName:'',
                     bizType:' ',


                },
                    communityList:[],
                    cityList:[],
                    formItemOld:{},
                    productList:[],
                ruleDaily: {
                    serviceDateBegin: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    serviceDateEnd: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    overdueMin: [
                        { validator: validateOverdue, trigger: 'change' }
                    ],
                    overdueMax: [
                        { validator: validateOverdue, trigger: 'change' }
                    ],
                    debtMin: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    debtMax: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    customerName:[
                        {  max: 20, trigger: 'change' ,message: '字数最长20'}
                    ]
                }
            }
    },
    mounted(){
        this.getCityList();
        this.getSelectData();
        this.params=this.$route.query;
        this.formItem.serviceDateBegin=this.dateSwitch(this.formItem.serviceDateBegin);
        this.formItem.serviceDateEnd=this.dateSwitch(this.formItem.serviceDateEnd);
    },
    methods:{
        //获取账单类型
        getSelectData(){
            this.$http.get('get-enum-all-data',{
                enmuKey:'com.krspace.pay.api.enums.BizType'
            }).then((response)=>{
               this.productList=response.data;
               this.productList.unshift({value:' ',desc:'全部'})
            }).catch((error)=>{
                this.MessageType="error";
                this.openMessage=true;
                this.warn=error.message;
            })
        },
        //格式转换
        dateSwitch(data){
            if(data){
                return utils.dateCompatible(data);
            }else{
                return '';
            }
        },
        getToDay() {
            var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
            return utils.dateCompatible(today); 
        },
        //社区接口
        getCommunityList(id){
            let params = this.$route.query;
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
               
                this.communityList=res.data.map(item=>{
                    item.id = item.id+'';
                    return item;
                });
                if(!params.communityId){
                    this.formItem.communityId=this.communityList[0].id;
                    this.formItemOld=Object.assign({},this.formItem);
                }else{
                    this.formItem.communityId = params.communityId;
                }

               if(this.num<=1){
                    this.formItem = Object.assign({},this.formItem,this.$route.query);
                    this.formItem.serviceDateBegin=this.dateSwitch(this.formItem.serviceDateBegin);
                    this.formItem.serviceDateEnd=this.dateSwitch(this.formItem.serviceDateEnd);
                    this.$emit('initData',this.formItem);
                }else{
                    this.formItem.communityId=this.communityList[0].id;
                }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params = this.$route.query;
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data.map(item=>{
                    item.cityId = item.cityId+' ';
                    return item;
                });
                if(this.cityList.length>1){
                    this.cityList.unshift({cityId:' ',cityName:"全部城市"})
                    this.formItem.cityId=this.cityList[1].cityId;
                }else{
                    this.formItem.cityId=this.cityList[0].cityId;
                }
                if(params.cityId){
                    this.formItem.cityId = params.cityId;
                }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //搜索
        searchClick(){
            this.$refs['formItemDaily'].validate((valid) => {
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
        //检查输入字符串字节长度
        fucCheckLength(strTemp) {
            var i,sum;
            sum=0;
            var length = strTemp.length ;
            for(i=0;i<length;i++) {
                if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
                    sum=sum+1;
                }else {
                    sum=sum+2;
                }
            }
            return sum;
        },
        cityChange(param){
            this.num=this.num+1;
            this.getCommunityList(param)
        }
    }
}
</script>

<style lang='less'>
     .daily-search-form{
         .daily-header{
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
                min-width: 250px;
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
            .header-icon{
                display:inline-block;
                margin-right:20px;
                vertical-align: top;
                .iconForm{
                    display:inline-block;
                    margin-right:4px;
                    .ivu-form-item-content{
                        display:inline-block;
                    }
                }
                .ivu-tooltip-popper{
                    word-break: break-all;
                    word-wrap: break-word;
                    max-width:200px;
                }
                .ivu-tooltip-inner{
                    white-space: normal;
                }
                .icon-tip{
                    display:inline-block;
                    width:16px;
                    height:16px;
                    background:url(../img/q1.svg) no-repeat center;
                    background-size: 100%;
                    vertical-align: middle;
                }
                .dateForm{
                    display:inline-block;
                    margin-right:4px;
                }
            }
        }
     }
</style>
