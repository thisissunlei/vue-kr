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
                                    placeholder="请输入社区" 
                                    style="width: 174px;"
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
                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">

                    <Form-item label="欠款金额" class='daily-form'> 
                        <Select 
                            v-model="formItem.payAll" 
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
                        <Form-item  class="priceForm">
                            <DatePicker 
                                v-model="formItem.startDate" 
                                placeholder="请输入开始日期"
                                style="width: 130px"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm">
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
export default {
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
            

            return { 
                loading:false, 
                formItem:{
                    customerName:'',
                    communityId:' ',
                    cityId:'',
                    overDaysMin:'',
                    overDaysMax:'', 
                    startDate:'',
                    endDate:'',
                    payAll:'',
                    hasAttachment:''
                },
                communityList:[],
                cityList:[],
                fileList:[
                    {value:'1',label:'是'},
                    {value:'0',label:'否'}
                ],
                payList:[
                    {value:'0',label:'未付清'},
                    {value:'1',label:'已付清'}
                ],
                formItemOld:{},
                ruleInvestment: {
                    customerName:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    overDaysMin: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    overDaysMax: [
                        { validator: validateTime, trigger: 'change' }
                    ]
                },
                num:0
            }
    },
    mounted(){
        this.getCityList();
    },
    methods:{
        //社区接口
        getCommunityList(id){
            let params=Object.assign({},this.$route.query);
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
                let len=res.data.length;
                if(len&&len>1){
                    this.communityList.unshift({id:' ',name:'全部社区'})
                }  
                this.formItem.communityId=len?this.communityList[0].id:'';
                this.formItemOld=Object.assign({},this.formItem);
                if(params.communityId){
                    this.formItem.communityId=params.communityId;
                }
                if(this.num==1){
                    this.formItem = Object.assign({},this.formItem,this.$route.query);
                    this.$emit('initData',this.formItem);
                }
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params=Object.assign({},this.$route.query);
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
                this.formItem.cityId=res.data.length?res.data[0].cityId:'';
                if(params.cityId){
                    this.formItem.cityId =params.cityId;
                }
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
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            console.log('[----',this.formItemOld);
            this.formItem=Object.assign({},this.formItemOld);
            console.log('cle---',this.formItem);
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            this.num++;
            console.log('oamr---',param);
            this.getCommunityList(param)
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
