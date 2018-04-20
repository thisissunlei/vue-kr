<template>
    <div class='daily-search-form'>
        <div class="daily-header">
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">
                <div>    
                    <div class='header-icon' style="margin-right:113px;">  
                        <Form-item label="库存日期" class='iconForm' v-if="identify=='daily'">
                            <DatePicker 
                                v-model="formItem.inventoryDate" 
                                placeholder="请输入库存日期"
                                style="width: 200px"
                            />
                        </Form-item>
                        <Form-item label="可租日期" class='iconForm' v-if="identify=='optional'">
                            <DatePicker 
                                v-model="formItem.selectDate" 
                                type="daterange"
                                format="yyyy/MM/dd"
                                placeholder="请输入可租日期"
                                style="width: 200px"
                                @on-change="selectDateChange"
                            />
                        </Form-item>
                        <Tooltip :content="tipContent" placement="top">
                           <span class='icon-tip'></span>
                        </Tooltip>
                    </div>


                    <Form-item label="商品名称" class='daily-form' prop="name">
                        <i-input 
                            v-model="formItem.name" 
                            placeholder="请输入商品名称"
                            style="width: 200px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>


                    <Form-item label="库存状态" class='daily-form' v-if="identify=='daily'"> 
                        <Select 
                            v-model="formItem.status" 
                            placeholder="全部" 
                            style="width: 200px"
                            multiple
                        >
                            <Option v-for="item in inventoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                       </Select> 
                    </Form-item>
                </div>

                <div>
                    <Form-item class='daily-form community-form'>
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;">社&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</span>
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

                    <Form-item label="商品属性" class='daily-form'> 
                        <Select 
                            v-model="formItem.locationName" 
                            style="width: 90px;margin-right:20px;"
                            clearable
                        >
                            <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> 
                    <Select 
                            v-model="formItem.suiteName" 
                            style="width: 90px"
                            clearable
                        >
                            <Option v-for="item in suiteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>


                    <Form-item label="商品类型" class='daily-form'> 
                        <Select 
                            v-model="formItem.seatType" 
                            placeholder="请输入商品类型" 
                            style="width: 200px"
                            clearable
                        >
                            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select> 
                    </Form-item>

                     <Button type="ghost" style="vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                </div>

                <div>
                    <div style="display:inline-block;margin-right:20px;vertical-align: top;">
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;padding-top:7px;">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <Form-item class='priceForm'> 
                            <Select 
                                v-model="formItem.priceType" 
                                style="width: 90px;margin-right:20px;"
                                clearable
                            >
                                <Option v-for="item in priceList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                        </Select> 
                        </Form-item>
                        <Form-item  prop="priceMin" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.priceMin" 
                                style="width: 90px;"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin:0 4px 0 5px;vertical-align: middle;">至</span>
                        <Form-item  prop="priceMax" style="display:inline-block;">
                            <i-input 
                                v-model="formItem.priceMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                    <div style="display:inline-block;margin-right:20px;">
                        <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:10px;">工位数量</span>
                        <Form-item  style="width:auto;display:inline-block;" prop="stationsMin">
                            <i-input 
                                v-model="formItem.stationsMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin:0 4px 0 5px;padding-top: 6px;">至</span>
                        <Form-item  prop="stationsMax" style="width:auto;display:inline-block;">
                            <i-input 
                                v-model="formItem.stationsMax" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                    </div>

                     <div style="display:inline-block;margin-right:20px;">
                        <span style="font-weight:bold;display:inline-block;margin-right:12px;padding-top:7px;">面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积</span>
                        <Form-item class='priceForm'  prop="areaMin">
                            <i-input 
                                v-model="formItem.areaMin" 
                                style="width: 90px"
                                @keyup.enter.native="onKeyEnter($event)"
                            />
                        </Form-item>
                        <span style="display:inline-block;margin: 7px 4px 0 5px;">至</span>
                        <Form-item  class='priceForm' prop="areaMax">
                            <i-input 
                                v-model="formItem.areaMax" 
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
import publicFn from './publicFn';
export default {
    props:{
       identify:{
           type:String,
           default:''
       }
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
                }else if(value&&!(this.formItem.communityId.toString().trim())){
                    callback('请先选择社区');
                }else{
                    callback();
                }
            };
            return {  
                tipContent:this.identify=='daily'?'查询某一天，商品的库存状态。如需查询某个时间段的可租商品，可前往可租商品查询页进行查询':'查询某个时间段，可租的商品。如需查询所有商品的库存情况，请前往每日库存查询页面', 
                formItem:{
                    inventoryDate:publicFn.getToDay(),
                    name:'',
                    status:[],
                    communityId:' ',
                    statusName:'',
                    cityId:'',
                    floor:' ',
                    stationsMax:'',
                    stationsMin:'',
                    seatType:' ',
                    priceType:'UNIT_PRICE',
                    priceMin:'',
                    priceMax:'',
                    areaMin:'',
                    areaMax:'',
                    locationName:' ',
                    suiteName:' ',
                    selectDate:this.getRangeDate()
                },
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
                locationList:[
                    {value:' ',label:'全部方位'},
                    {value:'OUTSIDE_SPACE',label:'外侧间'},
                    {value:'INSIDE_SPACE',label:'内侧间'},
                    {value:'UNKNOWN',label:'未知'}
                ],
                suiteList:[
                    {value:' ',label:'全部'},
                    {value:'SUITE',label:'有套间'},
                    {value:'UNSUITE',label:'无套间'}
                ],

                formItemOld:{},
                ruleDaily: {
                    stationsMin: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    stationsMax: [
                        { validator: validateStation, trigger: 'change' }
                    ],
                    name:[
                        { validator: validateName, trigger: 'change' }
                    ],
                    priceMin: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    priceMax: [
                        { validator: validatePrice, trigger: 'change' }
                    ],
                    areaMin: [
                        { validator: validateArea, trigger: 'change' }
                    ],
                    areaMax: [
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
                if(this.communityList.length>1){
                    this.communityList.unshift({id:' ',name:"全部社区"})
                }
                this.formItem.communityId=this.communityList[0].id;
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
                if(this.cityList.length>1){
                    this.cityList.unshift({cityId:' ',cityName:"全部城市"})
                    this.formItem.cityId=this.cityList[1].cityId;
                }else{
                    this.formItem.cityId=this.cityList[0].cityId;
                }  
                if(this.identify=='optional'){
                    this.formItem.startDate=this.formItem.selectDate[0];
                    this.formItem.endDate=this.formItem.selectDate[1];
                }
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
        getRangeDate(){
            var today = dateUtils.dateToStr("YYYY-MM-DD",new Date());
            var dayNum=Number(publicFn.getMonthDayNum());
            var date=today.split('-');
            var year=Number(date[0]),month=Number(date[1]),day=Number(date[2]);
            var endDay=day+7,endYear=year,endMonth=month;
            if(endDay>dayNum){
                endMonth+=1;
                endDay=endDay-dayNum;
            }
            if(endMonth>12){
                endYear+=1;
                endMonth=endMonth-12;
            }
            return [year+'-'+month+'-'+day,endYear+'-'+endMonth+'-'+endDay]
        },
        //搜索
        searchClick(){
            this.$refs['formItemDaily'].validate((valid) => {
                if (valid) {
                    var str='';
                    this.formItem.status.map((item,index)=>{
                            str=str?str+','+item:item;
                    })
                    this.formItem.statusName=str;
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
            this.getCommunityList(param)
        },
        communityChange(param){
            this.getFloorList(param);
        },
        selectDateChange(param){
            this.formItem.startDate=param[0]?param[0]:'';
            this.formItem.endDate=param[1]?param[1]:'';
        }
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
                    background:url(img/q1.svg) no-repeat center;
                    background-size: 100%;
                    vertical-align: middle;
                    margin-top: 8px;
                }
            }
        }
     }
</style>
