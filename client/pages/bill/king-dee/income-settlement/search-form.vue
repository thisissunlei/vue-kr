<template>
    <div class='community-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;"> 

                        <Form-item class="priceForm community-form" style="margin-right: 20px;">
                            <span class="attract-font" style="margin-right:27px;">社<span style="display:inline-block;width:26px;"></span>区</span>
                         <Select 
                                    v-model="formItem.cityId" 
                                    placeholder="选择城市" 
                                    style="width: 100px; margin-right:20px"
                                    filterable
                                    clearable
                                    @on-change = "changeCity"
                                >   
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> 

                                 <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="选择社区" 
                                    style="width: 165px"
                                    filterable
                                    clearable
                                 >   
                                <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                            <!-- <SelectCity v-model="formItem.cityId" :styles="{width:90+'px',marginRight:'20px'}"/> -->
                            <!-- <SelectCommunity v-model="formItem.communityId" :params="cityParams" :styles="{width:174+'px'}"  @init="communityInit" :isGetAll="isGetAll"/> -->
                        </Form-item>

                         <Form-item label="主体" class='daily-form'> 
                            <Select 
                                v-model="formItem.corporationId" 
                                placeholder="选择出租方主体" 
                                style="width: 225px"
                                filterable
                                clearable
                            >
                                <Option v-for="item in fileList" :value="item.id" :key="item.id">{{ item.corporationName }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item label="客户" class='daily-form' >
                            <!-- <i-input 
                                v-model="formItem.customerId" 
                                placeholder="请输入客户名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            /> -->
                             <selectCustomers value="请输入客户名称"  v-model="formItem.customerId"  style="display:inline-block;width:200px" />
                        </Form-item>     
                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
    
                     <div class="daily-form" style="margin-right:22px;">
                        <span class="attract-font" style="padding-top:7px;margin-right:16px;">发生日期</span>
                        <Form-item  class="priceForm" prop="startTime">
                            <DatePicker 
                                v-model="formItem.startTime" 
                                placeholder="开始日期"
                                style="width: 130px"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="endTime">
                            <DatePicker 
                                    v-model="formItem.endTime" 
                                    placeholder="结束日期"
                                    style="width: 130px"
                            />
                        </Form-item>
                    </div>

                    <Form-item label="主体性质" class='daily-form'> 
                        <Select 
                            v-model="formItem.taxNatureType" 
                            placeholder="选择主体性质" 
                            style="width: 200px"
                            filterable
                            clearable
                        >
                            <Option v-for="item in taxNatureList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select> 
                    </Form-item>

                    <div class="daily-form">
                        <!-- <span class="attract-font" style="padding-top:7px;margin-right:38px;">逾期时长</span> -->
                        <Form-item label="收款类型" class="priceForm" >
                             <Select 
                                    v-model="formItem.feeType" 
                                    placeholder="请选择收款类型" 
                                    style="width: 190px"
                                    filterable
                                    clearable
                            >
                            <Option v-for="item in incomeList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select> 
                        </Form-item>
                        <!-- <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                        <Form-item  class="priceForm" prop="overDaysMax" >
                            <i-input 
                                v-model="formItem.overDaysMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item> -->
                    </div>
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>
            </Form>
        </div>
         <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import Message from '~/components/Message';
import SelectCity from '~/components/SelectCommon/SelectCity';
import SelectCommunity from '~/components/SelectCommon/SelectCommunity';
import selectCustomers from '~/components/newSelectCustomers.vue';
export default {
    components:{
      SelectCity,
      SelectCommunity,
      Message,
      selectCustomers
    },
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    data() {
            //开始
            const validateDate1 = (rule, value, callback) => {
                if((this.formItem.startTime&&this.formItem.endTime&&this.formItem.startTime>this.formItem.endTime)){ 
                    callback('后者需大于前者');
                }
                else if(!this.formItem.startTime && this.formItem.endTime){
                    callback('请输入开始日期');
                }
               else if(this.formItem.startTime&&!this.formItem.endTime){
                    this.$refs.formItemInvestment.validateField('endTime'); 
                }
                else{
                    callback();
                }
            };
           
            //结束
            const validateDate2 = (rule, value, callback) => {
                if((this.formItem.startTime&&this.formItem.endTime&&this.formItem.startTime>this.formItem.endTime)){ 
                    callback('后者需大于前者');
                }
                else if(this.formItem.startTime && !this.formItem.endTime){
                    callback('请输入结束日期');
                }else if(!this.formItem.startTime&&this.formItem.endTime){
                    this.$refs.formItemInvestment.validateField('startTime'); 
                }
                else{
                    callback();
                }
            };

            return { 
                MessageType:'',
                warn:'',
                openMessage:false,
                isGetAll:true,
                loading:false, 
                cityParams:{
                    cityId:''
                },
                formItem:{
                    customerId:'',
                    communityId:'',
                    cityId:'',
                   // overDaysMin:'',
               //     overDaysMax:'', 
                    startTime:'',
                    endTime:'',
                    corporationId:'',
                    feeType:'',
                  //  hasAttachment:'',
                    taxNatureType:'',
                },
                formItemOld:{},
                communityList:[],
                cityList:[],
                fileList:[],
                taxNatureList:[],
                incomeList:[],
                ruleInvestment: {
                    startTime:[
                        { validator: validateDate1, trigger: 'change' }
                    ],
                    endTime:[
                        { validator: validateDate2, trigger: 'change' }
                    ]
                },
                cityNum:0,
                communityNum:0
            }
    },
    mounted(){
        this.formItemOld=Object.assign({},this.formItem);
       
        this.getMainBody();
        this.gettaxNatureType();
        this.getIncomeType();
        this.getCity();
        this.$emit('initData',this.formItem);
    },
    methods:{
        // city
        getCity(){
            let list = [];
            this.$http.get('getDailyCity').then((res)=>{
                res.data.map(item => {
                    list.push({
                        label: ''+item.cityName,
                        value: ''+item.cityId
                    })
                });
                this.cityList = list;
                // this.salerOptions = [].concat(list);
                // this.modelValue=this.modelValue?this.modelValue:list[0].value;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        // 主体 
        getMainBody(){
            this.$http.get('krspace-op-web-fna-corporation').then((response)=>{
              this.fileList = response.data;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        changeCustomer(val) {
            this.formItem.customerId = val;
        },
        //  主体性质
        gettaxNatureType(){
            this.$http.get('get-enum-sync-NatureType').then((response)=>{
              this.taxNatureList = response.data;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        // 收款类型 
        getIncomeType(){
            this.$http.get('get-enum-sync-feetype').then((response)=>{
              this.incomeList = response.data;
            }).catch((error)=>{
                this.openMessage=true;
                this.MessageType="error";
                this.warn=error.message;
            })
        },
        // 社区id 
        changeCity(){
            let list = [];
            this.$http.get('getDailyCommunity',{cityId:this.formItem.cityId}).then((res)=>{
                res.data.map(item => {
                    list.push({
                        label: ''+item.name,
                        value: ''+item.id
                    })
                });
                this.communityList = list;
        })
        },

        communityInit(params){
            this.formItemOld=Object.assign({},this.formItemOld,params);
        },
        //搜索
        searchClick(){
            this.$refs['formItemInvestment'].validate((valid) => {
                if (valid) {
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
           // this.changeCustomer('');
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },

     onMessageChange(data){
        this.openMessage=data;
      }
    }
}
</script>

<style lang='less'>
     .community-search-form{
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
