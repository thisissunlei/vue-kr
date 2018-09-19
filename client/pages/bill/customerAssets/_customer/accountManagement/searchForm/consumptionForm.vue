<template>
    <div class='arrive-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;">

                        <Form-item class="priceForm community-form" style="margin-left: 8px;margin-right:8px;">
                            <span class="attract-font" style="margin-right:14px;">社<span style="display:inline-block;width:26px;"></span>区</span>
                            <div class='operation-community'>
                                <Select 
                                    v-model="formItem.cmtId" 
                                    placeholder="请选择社区" 
                                    clearable
                                    filterable
                                    style="width: 200px"
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                                </Select> 
                            </div>
                        </Form-item>
 
                       <Form-item v-if="type=='consumptionDetail'" label="费用类型" class='daily-form'>
                            <Select 
                                v-model="formItem.feeType" 
                                placeholder="请选择费用类型" 
                                clearable
                                style="width:200px"
                            >
                                <Option v-for="item in feeTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select>
                        </Form-item>

                        <div class="daily-form community-form">
                            <Form-item  label="消费金额"  class="priceForm" prop="amountStart">
                                <i-input 
                                    v-model="formItem.amountStart" 
                                    style="width: 130px"
                                    placeholder="填写消费金额" 
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                            <Form-item  class="priceForm" prop="amountEnd" >
                                <i-input 
                                    v-model="formItem.amountEnd" 
                                    style="width: 130px"
                                    placeholder="填写消费金额" 
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                        </div>

                        <Form-item v-if="type=='balanceDetail'" label="单据编号"  class='daily-form'>
                            <i-input 
                                v-model="formItem.recordNo" 
                                placeholder="请输入单据编号"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);margin-left: 12px;" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">

                    <Form-item v-if="type=='consumptionDetail'" label="相关凭证"  class='daily-form'>
                            <i-input 
                                v-model="formItem.recordNo" 
                                placeholder="请输入相关凭证"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                    </Form-item>

                    <Form-item label="来源类型" class='daily-form'> 
                            <Select 
                                v-model="formItem.sourceDetailType" 
                                placeholder="请选择来源类型" 
                                clearable
                                style="width:200px"
                            >
                                <Option v-for="item in operationList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                    </Form-item>

                    <div class="daily-form" v-if="type=='balanceDetail'">
                        <Form-item label="操作日期"  class="priceForm" prop="startTime">
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


                    <Form-item v-if="type=='balanceDetail'" label="操作人员"  class='daily-form'>
                            <i-input 
                                v-model="formItem.operaterName" 
                                placeholder="请输入操作人员"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                    </Form-item>


                    <div class="daily-form" v-if="type=='consumptionDetail'" style="margin-right:8px;">
                        <Form-item label="消费时间"  class="priceForm" prop="startTime">
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

                    
                    <Button type="primary" @click="searchClick" style="margin-left: 12px;">搜索</Button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import './index.less';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
export default {
    props:{
       type:{
           type:String,
           default:''
       },
       communityList:{
           type:Array,
           default:()=>[]
       }
    },
    data() {
            //租期天数
            const validateTime = (rule, value, callback) => {
                var reg = /^[-]?(([1-9][0-9]*)|[0]|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                if(value&&!reg.test(value)){
                    callback('最多两位小数的数字');
                }else if (this.formItem.amountStart&&this.formItem.amountEnd&&Number(this.formItem.amountStart)>Number(this.formItem.amountEnd)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };

            //租期天数
            const validateDate = (rule, value, callback) => {
                if (this.formItem.startTime&&this.formItem.endTime&&this.formItem.startTime>this.formItem.endTime) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            

            return { 
                formItem:{
                    cmtId:'',
                    feeType:'',
                    sourceDetailType:'',
                    recordNo:'',
                    startTime:'', 
                    endTime:'',
                    amountStart:'',
                    amountEnd:''
                },
                formItemOld:{},
                operationList:[],
                feeTypeList:[],
                ruleInvestment: {
                    amountStart: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    amountEnd: [
                        { validator: validateTime, trigger: 'change' }
                    ],
                    endTime:[
                        { validator: validateDate, trigger: 'change' }
                    ],
                    startTime:[
                        { validator: validateDate, trigger: 'change' }
                    ]
                },
            }
    },
    mounted(){
        this.formItemOld=Object.assign({},this.formItem);
        this.$emit('init',this.formItemOld);
        if(this.type=='consumptionDetail'){
            this.getFee();
        }
        this.getOperate();
    },
    methods:{
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
        },
        getFee(){
            this.$http.get('get-enum-all-data', {
                enmuKey: 'com.krspace.pay.api.enums.FeeType'
            }).then((r) => {
                this.feeTypeList = [].concat(r.data)
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        },
        getOperate(){
            this.$http.get('get-enum-all-data', {
                enmuKey: 'com.krspace.pay.api.enums.wallet.sourceDetailType'
            }).then((r) => {
                this.operationList = [].concat(r.data)
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        }
    }
}
</script>


