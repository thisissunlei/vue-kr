<template>
    <div class='daily-search-form'>
        
        <div class="daily-header">
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">

                <div style="white-space: nowrap;">
                    <Form-item class='daily-form'>
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;">一级来源</span>
                        <Select 
                            v-model="formItem.channelType" 
                            placeholder="一级来源" 
                            style="width: 90px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in firstList" 
                                :value="item.value" 
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select> 
                    </Form-item>
                    
                     <Form-item label="预约城市" class='daily-form' prop="customerName">
                        <Select 
                            v-model="formItem.cityId" 
                            placeholder="预约城市" 
                            style="width: 90px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in cityList" 
                                :value="''+item.cityId" 
                                :key="item.cityId"
                            >
                                {{ item.cityName }}
                            </Option>
                        </Select>
                    </Form-item>


                    <Form-item label="参观日期" class='daily-form'> 
                        <DatePicker type="date" placeholder="开始时间" v-model="formItem.startAppiontTime"  style="width: 120px;margin-right:10px;">
                        </DatePicker>
                        <span>至</span>    
                        <DatePicker type="date" placeholder="开始时间" v-model="formItem.endAppiontTime" style="width: 120px;margin-left:10px;margin-right:20px;">
                        </DatePicker>
                    </Form-item>
                   <!--  <Form-item label="是否联系" class='daily-form'> 
                        <Select 
                            v-model="formItem.floor" 
                            placeholder="是否联系" 
                            style="width: 80px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in visitStatus" 
                                :value="item.value" 
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                    </Form-item>
 -->
                    <Form-item label="姓名" class='daily-form'> 
                        <i-input 
                            v-model="formItem.name" 
                            style="width: 90px;margin-right:15px"
                            placeholder="姓名"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>

                </div>

                <div style="white-space: nowrap;">
                    <Form-item class='daily-form'>
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;">二级来源</span>
                        <Select 
                            v-model="formItem.channelId" 
                            placeholder="二级来源" 
                            style="width: 90px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in secondList" 
                                :value="item.value" 
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select> 
                    </Form-item>
                    
                     <Form-item label="预约社区" class='daily-form' prop="customerName">
                        <Select 
                            v-model="formItem.communityId" 
                            placeholder="预约社区" 
                            style="width: 90px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in communityList" 
                                :value="''+item.id" 
                                :key="item.id"
                            >
                                {{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>


                    <Form-item label="创建日期" class='daily-form'> 
                        <DatePicker type="date" placeholder="开始时间" v-model="formItem.cStartTime"  style="width: 120px;margin-right:10px;">
                        </DatePicker>
                        <span>至</span>    
                        <DatePicker type="date" placeholder="开始时间" v-model="formItem.cEndTime" style="width: 120px;margin-left:10px;margin-right:20px;">
                        </DatePicker>
                    </Form-item>
                   <!--  <Form-item label="是否到访" class='daily-form'> 
                        <Select 
                            v-model="formItem.floor" 
                            placeholder="是否到访" 
                            style="width: 80px;margin-right:20px;"
                        >
                            <Option 
                                v-for="item in visitStatus" 
                                :value="item.value" 
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                    </Form-item> -->

                    <Form-item label="电话" class='daily-form' prop="mobile"> 
                        <i-input 
                            v-model="formItem.mobile" 
                            style="width: 90px;margin-right:15px"
                            placeholder="电话"
                        />
                    </Form-item>
                 

                     
                    
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>

            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';

export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    components:{
    },
    data() {
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (value&&!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            return { 
                cityList:[],
                params :{}, 
                formItem:{
                    channelType:' ',
                    cityId:'',
                    cEndTime:'',
                    cStartTime:'',
                    channelId:'',
                    communityId:' ',
                    endAppiontTime:'',
                    mobile:'',
                    name:' ',
                    startAppiontTime:'',
                },
                formItemOld:{
                    page:1,
                    pageSize:15
                },
                ruleDaily: {
                    mobile:[
                        { validator: validatephone, trigger: 'change' }
                    ],
                },
                firstList:[],
                secondList:[],
                visitStatus:[],
                communityList:[],
                cityList:[]
            }
    },
    mounted(){
        this.params=this.$route.query;
        this.getCityList();
        this.getFirstChannle()
        this.getSecondChannle()
        this.getVisitstatus()
        this.getCommunityList()
        this.$emit('initData',this.formItem);
    },
    methods:{

        //社区接口
        getCommunityList(id){
           let params =Object.assign({},this.params);
            this.$http.get('getDailyCommunity').then((res)=>{
                this.communityList=res.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params =Object.assign({},this.params);
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //获取一级来源
        getFirstChannle(){
            this.$http.get('get-channleType-list').then((res)=>{
                this.firstList = res.data
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getSecondChannle(){
            this.$http.get('get-csrsource-list').then((res)=>{
                this.secondList = res.data

            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        getVisitstatus(){
            this.$http.get('get-visitstatus-list').then((res)=>{
                this.visitStatus = res.data

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
            this.floorList = []
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
            if(param){
                if(param !== this.params.cityId){
                  this.params = {}  
                }
                this.getCommunityList(param)  
            }

            
        },
        communityChange(param){
            if(param){
                this.params = {}
                this.getFloorList(param);
            }
            
        },
        
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
                .ivu-form-item-content{
                    display:inline-block;
                }
                .ivu-form-item:after, .ivu-form-item:before{
                    content: none;
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
