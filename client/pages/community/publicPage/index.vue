<template>
    <div class='community-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <!-- 第一行-->
                <div style="white-space: nowrap;"> 
                        <Form-item label="商品名称" class='daily-form' prop="name">
                            <i-input 
                                v-model="formItem.name" 
                                placeholder="请输入商品名称"
                                style="width: 200px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>

                        <Form-item label="招商状态" class='daily-form'> 
                            <Select 
                                v-model="formItem.status" 
                                placeholder="全部" 
                                style="width: 200px"
                                multiple
                            >
                                <Option v-for="item in inventoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </Form-item>

                        <Form-item class="priceForm community-form">
                            <span class="attract-font">社<span style="display:inline-block;width:26px;"></span>区</span>
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
                        
                            <Select 
                                    v-model="formItem.floor" 
                                    v-if="floorList && floorList.length !=0"
                                    placeholder="请输入楼层" 
                                    style="width: 90px;margin-left:20px;"
                                >
                                    <Option 
                                        v-for="item in floorList" 
                                        :value="item.floor" 
                                        :key="item.floor"
                                    >
                                        {{ item.floorName }}
                                    </Option>
                            </Select> 
                        </Form-item>
                </div>

                <!-- 第二行-->
                <div style="white-space: nowrap;">
                    <div class="daily-form">
                        <span class="attract-font" style="padding-top:7px;">商品定价</span>
                        <Form-item  class="priceForm" prop="stationsMin">
                            <i-input 
                                v-model="formItem.priceMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                        <Form-item  class="priceForm" prop="stationsMax" >
                            <i-input 
                                v-model="formItem.priceMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div class="daily-form">
                        <span class="attract-font" style="padding-top:7px;">工位数量</span>
                        <Form-item  class="priceForm" prop="stationsMin">
                            <i-input 
                                v-model="formItem.stationsMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="stationsMax">
                            <i-input 
                                v-model="formItem.stationsMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <Form-item label="商品类型" class='daily-form'> 
                        <Select 
                            v-model="formItem.goodsType" 
                            placeholder="请输入商品类型" 
                            style="width: 200px"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> 
                    </Form-item>
                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>


                <!-- 第三行-->
                <div style="white-space: nowrap;">
                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right:24px;">签约价</span>
                        <Form-item  class="priceForm" prop="stationsMin">
                            <i-input 
                                v-model="formItem.orderPriceMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="stationsMax">
                            <i-input 
                                v-model="formItem.orderPriceMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right:11px;">折<span style="display:inline-block;width:25px;"></span>扣</span>
                        <Form-item  class="priceForm" prop="stationsMin">
                            <i-input 
                                v-model="formItem.discountMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span class="attract-line">至</span>
                        <Form-item  class="priceForm" prop="stationsMax">
                            <i-input 
                                v-model="formItem.discountMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <Form-item label="渠道来源" class='daily-form'> 
                        <Cascader 
                          v-model="formItem.source"
                          style="width: 200px"
                          :data="sourceData"    
                        />
                    </Form-item>
                    <Button type="primary" @click="searchClick">搜索</Button>
                </div>


                 <!-- 第四行-->
                <div style="white-space: nowrap;">
                    <span class="attract-font" style="padding-top:7px;margin-right:24px;">销售员</span>
                    <Form-item class='daily-form' style="width:200px">
                       <SelectSaler 
                         name="formItem.sellerId" 
                         :onchange="changeSaler"
                        />
                    </Form-item>

                    <div class='daily-form'>
                        <span class="attract-font" style="padding-top:7px;margin-right:11px;">租<span style="display:inline-block;width:27px;"></span>期</span>
                        <Form-item  class='daily-form' prop="stationsMin">
                            <Select 
                                v-model="formItem.rentTimeType" 
                                style="width: 90px"
                                clearable
                            >
                                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item  prop="stationsMax" class="priceForm" style="margin-right:5px">
                            <i-input 
                                v-model="formItem.rentTime" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span>天</span>
                    </div>
                </div>


            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import publicFn from '../publicFn';
import SelectSaler from '~/components/SelectSaler.vue'
export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    components:{
       SelectSaler
    },
    data() {
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else if (this.formItem.stationsMin&&this.formItem.stationsMax&&Number(this.formItem.stationsMin)>Number(this.formItem.stationsMax)) {
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
                }else if (this.formItem.priceMin&&this.formItem.priceMax&&Number(this.formItem.priceMin)>Number(this.formItem.priceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            const validateArea = (rule, value, callback) => {
                var reg=/^(([1-9]{1}[0-9]{0,2})|([0])|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,2}\.\d{1,2}))$/;
                if(value&&!reg.test(value)){
                    callback('请输入小于1000的数字,最多2位小数');
                }else if (this.formItem.areaMin&&this.formItem.areaMax&&Number(this.formItem.areaMin)>Number(this.formItem.areaMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
           
            const validateName = (rule, value, callback) => {
                var str=this.fucCheckLength(value);
                if(value&&str>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            return {  
                formItem:{
                    investmentStatus:'',
                    status:[],

                    name:'',
                    communityId:'',
                    cityId:'',
                    floor:' ',
                    stationsMax:'',
                    stationsMin:'',
                    goodsType:' ',
                    priceMin:'',
                    priceMax:'',
                    discountMin:'',
                    discountMax:'',
                    sellerId:'',
                    orderPriceMin:'',
                    orderPriceMax:'',

                    source:[],
                    sourceId:'',
                    subSourceId:''
                },
                sourceData:[{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京'
                        },
                        {
                            value: 'suzhou',
                            label: '苏州'
                        }
                    ]
                }],
                communityList:[],
                cityList:[],
                floorList:[],
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                inventoryList:[
                    {value:'AVAILABLE',label:'未租'},
                    {value:'NOT_EFFECT',label:'合同未生效'},
                    {value:'IN_RENT',label:'在租'},
                    {value:'DISABLE',label:'不可用'}
                ],

                formItemOld:{},
                ruleInvestment: {
                    name:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    stationsMin: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    stationsMax: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    priceMin: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    priceMax: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    orderPriceMin: [
                        { validator: validateArea, trigger: 'change' }
                    ],
                    orderPriceMax: [
                        { validator: validateArea, trigger: 'change' }
                    ],
                    discountMin: [
                        { validator: validateArea, trigger: 'change' }
                    ],
                    discountMax: [
                        { validator: validateArea, trigger: 'change' }
                    ]
                }
            }
    },
    mounted(){
        this.getCityList();
    },
    methods:{
        //社区接口
        getCommunityList(id){
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data;
                this.formItem.communityId=this.communityList?this.communityList[0].id:'';
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data;
                this.formItem.cityId=this.cityList.length?this.cityList[0].cityId:'';
                this.$emit('initData',this.formItem);
                this.formItemOld=Object.assign({},this.formItem);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //楼层接口
        getFloorList(param){
            this.$http.get('getDailyFloor', {communityId:param}).then((res)=>{
                this.floorList=res.data;
                if(this.floorList.length>1){
                    this.floorList.unshift({floor:' ',floorName:"全部楼层"})                        
                }
                this.formItem.floor=this.floorList.length?this.floorList[0].floor:' '; 
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
                    var str='';
                    this.formItem.status.map((item,index)=>{
                            str=str?str+','+item:item;
                    })
                    this.formItem.investmentStatus=str;
                    this.$emit('searchClick',this.formItem);
                }
            })
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.formItem.status=[];
            this.$emit('clearClick',this.formItem);
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //检查输入字符串字节长度
        fucCheckLength(strTemp) {
           return publicFn.fucCheckLength(strTemp);
        },
        //城市change事件
        cityChange(param){
            this.getCommunityList(param)
        },
        //社区change事件
        communityChange(param){
            this.getFloorList(param);
        },
        //销售员change事件
        changeSaler(value){
            this.formItem.sellerId=value;
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
                    width: 100%;
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
        }
     }
</style>
