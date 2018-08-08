<template>
    <div class='community-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;"> 
                        <Form-item label="商品名称" class='daily-form' prop="customerName">
                            <i-input 
                                v-model="formItem.customerName" 
                                placeholder="请输入商品名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item label="是否上传附件" class='daily-form'> 
                            <Select 
                                v-model="formItem.hasAttachment" 
                                placeholder="请选择是否上传附件" 
                                style="width: 200px"
                            >
                                <Option v-for="item in fileList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item class="priceForm community-form" style="margin-right: 20px;">
                            <span class="attract-font" style="margin-right:27px;">社<span style="display:inline-block;width:26px;"></span>区</span>
                            <SelectCity v-model="formItem.cityId" :styles="{width:90+'px',marginRight:'20px'}"/>
                            <SelectCommunity v-model="formItem.communityId" :params="cityParams" :styles="{width:174+'px'}"  @init="communityInit" :isGetAll="isGetAll"/>
                        </Form-item>
                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">

                    <Form-item label="欠款金额" class='daily-form'> 
                        <Select 
                            v-model="formItem.contractPayStatus" 
                            placeholder="请输入金额" 
                            style="width: 200px"
                        >
                            <Option v-for="item in payList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> 
                    </Form-item>

                    <div class="daily-form">
                        <span class="attract-font" style="padding-top:7px;margin-right:38px;">逾期时长</span>
                        <Form-item  class="priceForm" prop="overDaysMin">
                            <i-input 
                                v-model="formItem.overDaysMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                        <Form-item  class="priceForm" prop="overDaysMax" >
                            <i-input 
                                v-model="formItem.overDaysMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div class="daily-form" style="margin-right:22px;">
                        <span class="attract-font" style="padding-top:7px;margin-right:16px;">服务开始日</span>
                        <Form-item  class="priceForm" prop="startDate">
                            <DatePicker 
                                v-model="formItem.startDate" 
                                placeholder="请输入开始日期"
                                style="width: 130px"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="endDate">
                            <DatePicker 
                                    v-model="formItem.endDate" 
                                    placeholder="请输入结束日期"
                                    style="width: 130px"
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
import utils from '~/plugins/utils';
import SelectCity from '~/components/SelectCommon/SelectCity';
import SelectCommunity from '~/components/SelectCommon/SelectCommunity';
export default {
    components:{
      SelectCity,
      SelectCommunity
    },
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    data() {
            //商品名称
            const validateName = (rule, value, callback) => {
                if(value&&value.length>20){
                    callback('名称最多20长度');
                }else{
                    callback();
                }
            };
            //租期天数
            const validateTime = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if (this.formItem.overDaysMin&&this.formItem.overDaysMax&&Number(this.formItem.overDaysMin)>Number(this.formItem.overDaysMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };

            //租期天数
            const validateDate = (rule, value, callback) => {
                if (this.formItem.startDate&&this.formItem.endDate&&this.formItem.startDate>this.formItem.endDate) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            

            return { 
                isGetAll:true,
                loading:false, 
                cityParams:{
                    cityId:''
                },
                formItem:{
                    customerName:'',
                    communityId:' ',
                    cityId:'',
                    overDaysMin:'',
                    overDaysMax:'', 
                    startDate:'',
                    endDate:'',
                    contractPayStatus:'',
                    hasAttachment:''
                },
                formItemOld:{},
                communityList:[],
                cityList:[],
                fileList:[
                    {value:'1',label:'是'},
                    {value:'0',label:'否'}
                ],
                payList:[
                    {value:'PART_PAID',label:'未付清'},
                    {value:'PAID_OFF',label:'已付清'},
                    {value:'UNPAID',label:'未支付'}
                ],
                ruleInvestment: {
                    customerName:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    overDaysMin: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    overDaysMax: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    startDate:[
                        { validator: validateDate, trigger: 'change' }
                    ],
                    endDate:[
                        { validator: validateDate, trigger: 'change' }
                    ]
                },
                cityNum:0,
                communityNum:0
            }
    },
    mounted(){
        this.formItemOld=Object.assign({},this.formItem);
        let rou=this.$route.query;
        if(rou.cityId){
            this.formItem=Object.assign({},rou);
        }
    },
    computed: {
      cityId() {
    　　　　return this.formItem.cityId
    　},
      communityId(){
          return this.formItem.communityId
      }
    },
    watch:{
      cityId:function(val){
          this.cityParams=Object.assign({},{cityId:val})
          if(!(this.formItem.communityId.trim())&&this.$route.query.cityId){
              this.$emit('initData',this.formItem);
          }
      },
      communityId:function(val) {
          let rou=this.$route.query;
          this.communityNum++;
          if(this.communityNum==1){
              this.$emit('initData',this.formItem);
          }
      }
    },
    methods:{
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
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
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
