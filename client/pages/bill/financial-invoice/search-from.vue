<template>
    <div class='make-invoice-form'>
        <div class="community-header">
            <Form ref="formItemInvoiceFinance" :rules="ruleInvoiceFinance" :model="formItem"  label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;width:850px;"> 
                        <Form-item label="申请编号" class='daily-form' prop='applyNo'>
                            <i-input 
                                v-model="formItem.applyNo" 
                                placeholder="请输入申请编号"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <Form-item label="单位名称" class='daily-form' prop="invoiceTitle">
                            <i-input 
                                v-model="formItem.invoiceTitle" 
                                placeholder="请输入单位名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item label="单位类别" class='daily-form'> 
                            <Select 
                                v-model="formItem.titleType" 
                                placeholder="请输入单位类别" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in unitTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                       <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
                    <div style="width:847px;display:inline-block;"> 
                        <Form-item label="纳税人识别码" class='daily-form' prop='taxpayerNumber'>
                            <i-input 
                                v-model="formItem.taxpayerNumber" 
                                placeholder="请输入纳税人识别码"
                                style="width: 175px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item label="纳税类型" class='daily-form'> 
                            <Select 
                                v-model="formItem.taxpayerType" 
                                placeholder="请输入纳税类型" 
                                style="width: 200px"
                                clearable
                            >
                                <Option v-for="item in taxTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>
                        <div style="display:inline-block">
                            <span v-if="type=='VERIFYING'" style="font-weight:500;margin-right:13px;">提交时间</span>
                            <span v-if="type=='PASSED'" style="font-weight:500;margin-right:13px;">确认时间</span>
                            <Form-item class='priceForm' prop="cStartTime">
                                <DatePicker 
                                    v-model="formItem.cStartTime" 
                                    placeholder="开始日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                            <span style="display:inline-block;margin: 7px 3px 0 4px;">至</span>
                            <Form-item  class='priceForm' prop="cEndTime">
                                <DatePicker 
                                    v-model="formItem.cEndTime" 
                                    placeholder="结束日期"
                                    style="width: 90px"
                                />
                            </Form-item>
                        </div>
                         
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
import SelectSaler from '~/components/SelectSaler.vue';
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
        const validateDate = (rule, value, callback) => {
            if (this.formItem.cStartTime&&this.formItem.cEndTime&&this.formItem.cStartTime>this.formItem.cEndTime) {
                callback('后者需要大于前者');
            }else{
                callback();
            }
        };
        return { 
            formItem:{
                applyNo:'',
                cStartTime:this.getToDay(),
                cEndTime:this.getToDay(),
                invoiceTitle:'',
                taxpayerNumber:'',
                taxpayerType:' ',
                titleType:' '
            },
            //单位类型
            unitTypeList:[
                {value:' ',label:'全部'},
                {value:'COMPANY',label:'企业单位'},
                {value:'PERSON',label:'个人/非企业单位'}
            ],
            //纳税类型
            taxTypeList:[
                {value:' ',label:'全部'},
                {value:'SMALL',label:'小规模纳税人'},
                {value:'GENERAL',label:'一般纳税人'}
            ],
            ruleInvoiceFinance: {
                    applyNo: [
                        { validator: validateName, trigger: 'change' }
                    ],
                    invoiceTitle: [
                        { validator: validateName, trigger: 'change' }
                    ],
                    taxpayerNumber:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    cStartTime: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                    cEndTime: [
                        { validator: validateDate, trigger: 'change' }
                    ]
            }
        }
    },
    mounted(){
       this.$emit('initData',this.formItem);
       this.formItem=Object.assign({},this.formItem,this.$route.query);
       if(!this.formItem.taxpayerType){
           this.formItem.taxpayerType=' ';
       }
       if(!this.formItem.titleType){
           this.formItem.titleType=' ';
       }
    },
    methods:{
        //获取今天的日期
        getToDay(){
            var today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
            return today; 
        },
        //搜索
        searchClick(){
            this.$refs['formItemInvoiceFinance'].validate((valid) => {    
                if (valid) {
                   this.$emit('searchClick',this.formItem); 
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},{
                applyNo:'',
                cStartTime:this.getToDay(),
                cEndTime:this.getToDay(),
                invoiceTitle:'',
                taxpayerNumber:'',
                taxpayerType:' ',
                titleType:' '
            });
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
