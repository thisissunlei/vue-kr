<template>
    <div class='daily-search-form'>
        <SectionTitle title="即将进场"></SectionTitle>
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
                    
                     <Form-item label="客户名称" class='daily-form' prop="customerName">
                        <i-input 
                            v-model="formItem.customerName" 
                            placeholder="请输入客户名称"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>


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
                </div>

                <div style="white-space: nowrap;">
                    <div style="display:inline-block;margin-right:19px;vertical-align: top;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:11px;">距进场日</span>
                        <Form-item class='priceForm'> 
                            <Select 
                                v-model="formItem.toPutawayType" 
                                style="width: 90px;margin-right:20px;"
                                clearable
                            >
                                <Option value="EQ" >等于</Option>
                                <Option value="GT" >长于</Option>
                                <Option value="LT">少于</Option>
                        </Select> 
                        </Form-item>
                        <Form-item  prop="toPutawayDays" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.toPutawayDays" 
                                style="width: 90px;"
                                placeholder="请输入天数"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-left:11px;">天</span>
                    </div>

                    <div style="display:inline-block;margin-right:20px;margin-left:90px;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:11px;">联系人：</span>
                        <Form-item  style="width:auto;display:inline-block;" prop="contactName">
                            <i-input 
                                v-model="formItem.contactName" 
                                style="width: 200px"
                                placeholder="请输入联系人"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                      <div style="display:inline-block">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:11px;">商品名称</span>
                        <Form-item class='daily-form' prop="goodsName">
                        <i-input 
                            v-model="formItem.goodsName" 
                            placeholder="房间号或工位编号"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                    </div>
                    
                    <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <div style="white-space: nowrap;">
                    <div style="display:inline-block;margin-right:19px;vertical-align: top;">
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;padding-top:7px;">租<span style="display:inline-block;width:25px;"></span>期</span>
                        <Form-item class='priceForm'> 
                            <Select 
                                v-model="formItem.rentType" 
                                style="width: 90px;margin-right:20px;"
                                clearable
                            >
                                <Option value="EQ" >等于</Option>
                                <Option value="GT" >长于</Option>
                                <Option value="LT">少于</Option>
                        </Select> 
                        </Form-item>
                        <Form-item  prop="rentDays" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.rentDays" 
                                style="width: 90px;"
                                placeholder="租期天数"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-left:11px;">天</span>
                    </div>


                        <Form-item label="联系方式" class='daily-form' prop="contactTel"  style="margin-left:90px;">
                        <i-input 
                            v-model="formItem.contactTel" 
                            placeholder="请输入联系方式"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>


                    <div style="display:inline-block;margin-right:20px">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:11px;">工位数量</span>
                        <Form-item  style="width:auto;display:inline-block;" prop="stationsMin">
                            <i-input 
                                v-model="formItem.stationsMin" 
                                style="width: 90px"
                                placeholder="工位数量"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin:0 4px 0 5px;padding-top: 6px;">至</span>
                        <Form-item  prop="stationsMax" style="width:auto;display:inline-block;">
                            <i-input 
                                v-model="formItem.stationsMax" 
                                placeholder="工位数量"
                                style="width: 90px"
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
import SectionTitle from '~/components/SectionTitle.vue'

export default {
    props:{
       identify:{
           type:String,
           default:''
       }
    },
    components:{
        SectionTitle
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
            const validateNum = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>100){
                    callback('最大可查范围为100天');
                }else{
                    callback();
                }
            };
            const validateDate = (rule, value, callback) => {
                if (this.formItem.startDate&&this.formItem.endDate&&this.formItem.startDate>this.formItem.endDate) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                var str=this.fucCheckLength(value);
                if(value&&str>20){
                    callback('名称最多20个字节');
                }else if(value&&!(this.formItem.communityId.toString().trim())){
                    callback('请先选择社区');
                }else{
                    callback();
                }
            };
            const validateNames = (rule, value, callback) => {
                if(value&&value.length>40){
                    callback('名称最多40个字符');
                }else{
                    callback();
                }
            };
            const validatephone = (rule, value, callback) => {
                let phone=/(^(\d{3,4}-)?\d{3,4}-?\d{3,4}$)|(^(\+86)?(1[356847]\d{9})$)/;
                if (value&&!phone.test(value)) {
                    callback(new Error('请填写正确的联系方式'));
                }else{
                    callback()

                }
            };
            return { 
                params :{}, 
                formItem:{
                    communityId:' ',
                    cityId:'',
                    floor:' ',
                    stationsMax:'',
                    stationsMin:'',
                    goodsType:' ',
                    toPutawayType:'GT',
                    rentType:'GT',
                    reletTypeName:' ',
                    goodsName:'',
                    customerName:'',
                    contactTel:'',
                    customerName:'',
                },
                renewList:[
                    {value:' ',label:'全部'},
                    {value:'RENT_TIMELESS',label:'可续租（时长不限）'},
                    {value:'RENT_NO_PERMIT',label:'不可续租'},
                    {value:'RENT_CAN_TO',label:'只可续租一段时间'}
                ],
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
                priceList:[
                    {value:'UNIT_PRICE',label:'工位单价'},
                    {value:'AMOUNT',label:'商品总价'}
                ],

                formItemOld:{},
                ruleDaily: {
                    stationsMin: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    stationsMax: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    goodsName:[
                        { validator: validateNames, trigger: 'change' }
                    ],
                    leaseRemainingDays: [
                        { validator: validateNum, trigger: 'change' }
                    ],
                    rentDays: [
                        { validator: validateNum, trigger: 'change' }
                    ],
                    customerName:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    contactName:[
                        { validator: validateNames, trigger: 'change' }
                    ],
                    contactTel:[
                        { validator: validatephone, trigger: 'change' }
                    ],
                    toPutawayDays:[
                        { validator: validateNum, trigger: 'change' }
                    ],
                }
            }
    },
    mounted(){
        this.params=this.$route.query
        this.getCityList();
    },
    methods:{
        //社区接口
        getCommunityList(id){
           let params = this.params;
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=res.data.map(item=>{
                    item.id = item.id+'';
                    return item;
                });
                if(this.communityList.length>1){
                    this.communityList.unshift({id:' ',name:"全部社区"})
                }
                if(!params.communityId){
                    this.formItem.communityId=this.communityList[0].id;
                    this.floorList = []
                }else{
                    this.getFloorList(params.communityId)
                    this.formItem.communityId = params.communityId;
                }
                
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //城市接口
        getCityList(){
            let params = this.params;
            this.$http.get('getDailyCity').then((res)=>{
                this.cityList=res.data.map(item=>{
                    item.cityId = item.cityId+' ';
                    return item;
                });
                if(this.cityList.length>1){
                    this.cityList.unshift({cityId:' ',cityName:"全部城市"})
                    this.formItem.cityId=this.cityList[1].cityId;
                    this.formItemOld=Object.assign({},this.formItem,);
                }else{
                    this.formItem.cityId=this.cityList[0].cityId;
                    this.formItemOld=Object.assign({},this.formItem);
                }
                if(params.cityId){
                    this.getCommunityList();
                    this.formItem.cityId = params.cityId;
                }
                
                
                this.formItem = Object.assign({},this.formItem,this.$route.query)
                this.$emit('initData',this.formItem);
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        },
        //楼层接口
        getFloorList(param){
            let params = this.params;
            console.log(!params.floor,'=====',params.floor)
            this.$http.get('getDailyFloor', {communityId:param}).then((res)=>{
                this.floorList=res.data;
                if(!res.data.length){
                    this.floorList = []
                }
                if(this.floorList.length){
                    this.floorList=res.data.map(item=>{
                        item.floor = item.floor+'';
                        return item;
                    });
                }
                if(this.floorList.lengt==1){
                    this.formItem.floor=this.floorList.length?this.floorList[0].floor:' ';
                }
                if(this.floorList.length>1){
                    this.floorList.unshift({floor:' ',floorName:"全部楼层"})
                                            
                }
                if(!params.floor){
                    this.formItem.floor=this.floorList.length?this.floorList[0].floor:' '; 
                }else{
                   this.formItem.floor = params.floor; 
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
            this.floorList = []
            console.log('this.formItem',this.formItem)
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
                margin-right:20px;
                .ivu-form-item-content{
                    display:inline-block;
                }
            }
            .community-form{
                min-width: 374px;
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
