<template>
    <div class='arrive-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;"> 
                       <Form-item :label="type=='getDetail'?'单据编号':'退款编号'" class='daily-form'>
                            <i-input 
                                v-model="formItem.recordNo" 
                                :placeholder="type=='getDetail'?'请输入单据编号':'请输入退款编号'"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item class="priceForm community-form" style="margin-left: 10px;margin-right: 8px;">
                            <span class="attract-font" style="margin-right:12px;">社<span style="display:inline-block;width:26px;"></span>区</span>
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

                        <Form-item :label="type=='getDetail'?'打款方式':'退款方式'" class='daily-form' style="margin-right:172px;"> 
                            <Select 
                                v-model="formItem.payWay" 
                                :placeholder="type=='getDetail'?'请选择打款方式':'请选择退款方式'"
                                clearable
                                style="width: 130px"
                            >
                                <Option v-for="item in fileList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select> 
                        </Form-item>

                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">

                    <div class="daily-form">
                        <Form-item  :label="type=='getDetail'?'打款金额':'退款金额'"  class="priceForm" prop="amountStart">
                            <i-input 
                                v-model="formItem.amountStart" 
                                style="width: 90px"
                                :placeholder="type=='getDetail'?'填写打款金额':'填写退款金额'"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                        <Form-item  class="priceForm" prop="amountEnd" >
                            <i-input 
                                v-model="formItem.amountEnd" 
                                style="width: 90px"
                                :placeholder="type=='getDetail'?'填写打款金额':'填写退款金额'"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <Form-item :label="type=='getDetail'?'账户名称':'退至账户'"  class='daily-form'>
                        <i-input 
                            v-model="formItem.accountName" 
                            placeholder="请输入账户名称"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>

                    <div class="daily-form" style="margin-right:22px;">
                        <Form-item :label="type=='getDetail'?'打款日期':'退款日期'"  class="priceForm" prop="startTime">
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

                    <Button type="primary" @click="searchClick">搜索</Button>
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
                    recordNo:'',
                    payWay:'',
                    startTime:'',
                    endTime:'', 
                    cmtId:'',
                    amountStart:'',
                    amountEnd:'',
                    accountName:''
                },
                formItemOld:{},
                fileList:[],
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
                }
            }
    },
    mounted(){
        this.formItemOld=Object.assign({},this.formItem);
        this.$emit('init',this.formItemOld);
        this.getPayWay();
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
        getPayWay(){
            this.$http.get('get-enum-all-data', {
                enmuKey: 'com.krspace.pay.api.enums.PayWay'
            }).then((r) => {
                let list = [].concat(r.data);
                list.map((item,index)=>{
                    if(item.value=='ALIAPPPAY'||item.value=='BANKTRANSFER'||item.value=='FUNDS_TRANSFER'){
                        this.fileList.push(item);
                    }
                })
            }).catch((e) => {
                this.$Notice.error({
                    title: e.message
                });
            })
        }
    }
}
</script>
