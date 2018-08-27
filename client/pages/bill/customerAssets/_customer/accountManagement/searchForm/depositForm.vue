<template>
    <div class='arrive-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;">

                        <Form-item class="priceForm community-form" style="margin-left: 8px;margin-right: 8px;">
                            <span class="attract-font" style="margin-right:14px;">社<span style="display:inline-block;width:26px;"></span>区</span>
                            <div class='operation-community'><SelectCommunity v-model="formItem.communityId" :params="{cityId:''}" :styles="{width:200+'px'}"  @init="communityInit"/></div>
                        </Form-item> 

                       <Form-item label="费用类型" class='daily-form' prop="customerName">
                           <Select 
                                v-model="formItem.hasAttachment" 
                                placeholder="请选择费用类型" 
                                clearable
                                style="width:200px"
                            >
                                <Option v-for="item in fileList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <div class="daily-form community-form">
                            <Form-item  label="消费金额"  class="priceForm" prop="overDaysMin">
                                <i-input 
                                    v-model="formItem.overDaysMin" 
                                    style="width: 90px"
                                    placeholder="填写消费金额" 
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                            <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                            <Form-item  class="priceForm" prop="overDaysMax" >
                                <i-input 
                                    v-model="formItem.overDaysMax" 
                                    style="width: 90px"
                                    placeholder="填写消费金额" 
                                    @keyup.enter.native="onKeyEnter($event)"
                                />
                            </Form-item>
                        </div>

                        <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);margin-left:12px;" @click="clearClick">清除</Button>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">

                    <Form-item label="相关凭证"  class='daily-form' prop="customerName">
                        <i-input 
                            v-model="formItem.customerName" 
                            placeholder="请输入相关凭证"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>

                    <Form-item label="相关操作" class='daily-form' style="margin-right:302px;"> 
                            <Select 
                                v-model="formItem.hasAttachment" 
                                placeholder="请选择相关操作" 
                                clearable
                                style="width:200px"
                            >
                                <Option v-for="item in fileList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                    </Form-item>

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
import SelectCommunity from '~/components/SelectCommon/SelectCommunity';
export default {
    components:{
      SelectCommunity
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
                formItem:{
                    customerName:'',
                    communityId:' ',
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
    },
    computed: {
      communityId(){
          return this.formItem.communityId
      }
    },
    watch:{
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

