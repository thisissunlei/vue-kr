<template>
    <div class='community-search-form'>
        <div class="community-header">
            <Form ref="formItemInvestment" :model="formItem" :rules="ruleInvestment" label-position="left">

                <div style="white-space: nowrap;background: #fff;padding:10px 20px;"> 
                    <Form-item class="priceForm community-form">
                                <span class="attract-font">社<span style="display:inline-block;width:24px;"></span>区</span>
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
                                        @on-change="floorChange"
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
                    <!-- 第一行-->
                    <div style="padding: 30px 10px 10px 20px;background:#fff;margin-top:20px;">
                        <div style="white-space: nowrap;"> 

                        
                                <Form-item label="商品名称" class='daily-form' prop="name" >
                                    <i-input 
                                        v-model="formItem.name" 
                                        placeholder="请输入房间号或商品名称"
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
                        
                            <Form-item label="物理空间" class='daily-form'> 
                                <Select 
                                    v-model="formItem.binding" 
                                    style="width: 200px;;margin-left:10px;"
                                    clearable
                                >
                                    <Option v-for="item in bindingtList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> 
                            </Form-item>
                        </div>

                        <!-- 第二行-->
                        <div style="white-space: nowrap; margin-right:0;">
                            <div class="daily-form">
                            <Form-item label="当前状态" class='daily-form'> 
                                    <Select 
                                        v-model="formItem.investmentStatus" 
                                        placeholder="全部(可多选)" 
                                        style="width: 200px"
                                        multiple
                                    >
                                        <Option v-for="item in goodsStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select> 
                    </Form-item>

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
                            <Form-item label="商品属性" class='daily-form'> 
                                <Select 
                                    v-model="formItem.locationType" 
                                    style="width: 90px;margin-right:20px;margin-left:9px;"
                                    clearable
                                >
                                    <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                            <Select 
                                    v-model="formItem.suiteType" 
                                    style="width: 90px;margin-right:0;"
                                    clearable
                                >
                                    <Option v-for="item in suiteType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </Form-item>
                            </div>
                            <Button type="ghost" style="margin-left:13px;vertical-align: top;border:solid 1px #499df1;color:#499df1;box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2);" @click="clearClick">清除</Button>
                        </div>

                        <!-- 第三行-->
                        <div style="white-space: nowrap;">
                    
                                    <span class="attract-font" style="padding-top:7px;">商品定价</span>
                                <Form-item  class="priceForm" prop="priceMin">
                                    <i-input 
                                        v-model="formItem.priceMin" 
                                        style="width: 90px"
                                        @keyup.enter.native="onKeyEnter($event)"
                                    />
                                </Form-item>
                                <span class="attract-line" style="margin:0 3px 0 4px">至</span>
                                <Form-item  class="priceForm" prop="priceMax" >
                                    <i-input 
                                        v-model="formItem.priceMax" 
                                        style="width: 90px"
                                        @keyup.enter.native="onKeyEnter($event)"
                                    />
                                </Form-item>



                            <div class='daily-form'>
                                <span class="attract-font" style="padding-top:7px;margin-right:13px;margin-left:20px;">面<span style="display:inline-block;width:25px;"></span>积</span>
                                <Form-item  class="priceForm" prop="areaMin">
                                    <i-input 
                                        v-model="formItem.areaMin" 
                                        style="width: 90px"
                                        @keyup.enter.native="onKeyEnter($event)"
                                    />
                                </Form-item>
                                <span class="attract-line">至</span>
                                <Form-item  class="priceForm" prop="areaMax">
                                    <i-input 
                                        v-model="formItem.areaMax" 
                                        style="width: 90px"
                                        @keyup.enter.native="onKeyEnter($event)"
                                    />
                                </Form-item>
                            </div>

                            <Form-item label="平面图配置" class='daily-form'> 
                                <Select 
                                    v-model="formItem.goodsLocation" 
                                    placeholder="请输入商品类型" 
                                    style="width: 200px"
                                    clearable
                                >
                                    <Option v-for="item in graphList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select> 
                            </Form-item>

                            <Button type="primary" @click="searchClick" style="margin-left:30px;">搜索</Button>
                        </div>
                    </div>
            </Form>
        </div>
    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import publicFn from '../publicFn';
import utils from '~/plugins/utils';
import SelectSaler from '~/components/SelectSaler.vue';
var oldFloor='';
export default {
    props:{
       identify:{
           type:String,
           default:''
       }, 
       floorValue:{
                 type:[String,Number]
             }
    },
    components:{
       SelectSaler
    },
    data() {
            //工位数量
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[0-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入非负整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else if (this.formItem.stationsMin&&this.formItem.stationsMax&&Number(this.formItem.stationsMin)>Number(this.formItem.stationsMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //商品定价
            const validatePrice = (rule, value, callback) => {
                var reg = /^\+?[0-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入非负整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.priceMin&&this.formItem.priceMax&&Number(this.formItem.priceMin)>Number(this.formItem.priceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //商品定价
            const validateOrder = (rule, value, callback) => {
                var reg = /^\+?[0-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入非负整数');
                }else if(value&&value>9999999){
                    callback('单价最高9999999');
                }else if (this.formItem.orderPriceMin&&this.formItem.orderPriceMax&&Number(this.formItem.orderPriceMin)>Number(this.formItem.orderPriceMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            //折扣
            const validateDiscount = (rule, value, callback) => {
                var reg=/^(([1-9]{1})|([0-9]{1}\.\d{1}))$/;
                if(value&&!reg.test(value)){
                    callback('请输入0-10之间的数字,最多1位小数');
                }else if (this.formItem.discountMin&&this.formItem.discountMax&&Number(this.formItem.discountMin)>Number(this.formItem.discountMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };    
            //面积
             const validatearea = (rule, value, callback) => {
                var reg=/^(([1-9]{1}[0-9]{0,3})|([0])|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,3}\.\d{1,2}))$/;
                if(value&&!reg.test(value)){
                    callback('小于10000的数字,最多2位小数');
                }else if (this.formItem.areaMin&&this.formItem.areaMax&&Number(this.formItem.areaMin)>Number(this.formItem.areaMax)) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            }; 
            //商品名称
            const validateName = (rule, value, callback) => {
                if(value&&value.length>20){
                    callback('名称最多20个字节');
                }else{
                    callback();
                }
            };
            //租期天数
            const validateTime = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else{
                    callback();
                }
            };

            return { 
                loading:false, 
                formItem:{
                    investmentStatus:[],
                    goodsStatus:'',

                    communityId:'',
                    cityId:'',
                    floor:' ',
                    stationsMax:'',
                    stationsMin:'',
                    goodsType:' ',
                    goodsLocation:' ',
                    binding:' ',
                    priceMin:'',
                    priceMax:'',
                    areaMin:'',
                    areaMax:'',
             
                   
                    rentTimeType:'GT',
                    locationType:' ',
                    suiteType:' ',
                    name:'',
                    source:[],

                },
                communityList:[],
                cityList:[],
                floorList:[],
                sellerList:[],
                productList:[
                    {value:' ',label:'全部'},
                    {value:'OPEN',label:'固定办公桌'},
                    {value:'SPACE',label:'独立办公室'},
                    {value:'MOVE',label:'移动办公桌'}
                ],
                graphList:[
                    {value:' ',label:'全部'},
                    {value:'1',label:'已配置'},
                    {value:'0',label:'未配置'},
                ],
                bindingtList:[
                        {value:' ',label:'全部'},
                        {value:'1',label:'已绑定'},
                        {value:'0',label:'未绑定'},
                ]
                ,
                inventoryList:[
                    {value:'AVAILABLE',label:'未招商'},
                    {value:'INVITING',label:'招商中'},
                    {value:'RENTING',label:'已招商'},
                    {value:'DISABLED',label:'不可招商'}
                ],
                goodsStatusList:[ 
                    {value:'ON',label:'启用'},
                    {value:'DISABLE',label:'不可用'},
                    {value:'OFF',label:'下架'}
                ],
                locationList:[
                    {value:' ',label:'全部方位'},
                    {value:'OUTSIDE_SPACE',label:'外侧间'},
                    {value:'INSIDE_SPACE',label:'内侧间'},
                    {value:'UNKNOWN',label:'未知'}
                ],
                suiteType:[
                    {value:' ',label:'全部'},
                    {value:'SUITE',label:'有套间'},
                    {value:'UNSUITE',label:'无套间'}
                ],
                timeList:[
                   {value:'LT',label:'小于'},
                   {value:'EQ',label:'等于'},
                   {value:'GT',label:'大于'}
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
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    orderPriceMax: [
                        { validator: validateOrder, trigger: 'change' }
                    ],
                    areaMin: [
                        { validator: validatearea, trigger: 'change' }
                    ],
                    areaMax: [
                        { validator: validatearea, trigger: 'change' }
                    ],
                    rentTime:[
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
            this.$http.get('getDailyCommunity',{cityId:id}).then((res)=>{
                this.communityList=[].concat(res.data);
                this.formItem.communityId=res.data.length?res.data[0].id:'';
                if(this.num==0){
                
                    this.formItemOld=Object.assign({},this.formItem);
                }  
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
                this.formItem.cityId=res.data.length?res.data[0].cityId:'';      
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
                var len=res.data.length;
                if(len){
                    if(len>1){
                        this.floorList.unshift({floor:' ',floorName:"全部楼层"}) 
                    }
                    var floor=this.floorList[0].floor;
                    this.formItem.floor=floor; 

                    if(oldFloor==floor){
                        this.floorChange(floor);
                    }
                    oldFloor=floor; 
                    // this.$emit('initData',this.formItem,res.data);
                      this.$emit('initData',this.formItem,this.floorList);
                }
                
                this.$emit('getFloor',this.floorList);
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
                    console.log('form--11',this.formItem);
                    //招商状态格式转换
                    var str='';
                    let invest=this.formItem.investmentStatus;
                    invest.length&&invest.map((item,index)=>{
                        str=str?str+','+item:item;
                    }) 
                    this.formItem.goodsStatus=str; 

              
                    this.$emit('searchClick',this.formItem);
       

                }
            })
            
        },
        //清除
        clearClick(){
            this.formItem=Object.assign({},this.formItemOld);
            this.formItem.investmentStatus=[];

                    this.$emit('clearClick',this.formItem);

    
        },
        //回车
        onKeyEnter(){
            this.searchClick();
        },
        //城市change事件
        cityChange(param){
            this.getCommunityList(param)
        },
        //社区change事件
        communityChange(param){
          
            this.getFloorList(param);
        },
        floorChange(param){
             this.num++;

                this.$refs['formItemInvestment'].validate((valid) => {
                if (valid) {
                    console.log('搜索',this.formItem)
                    this.$emit('cityFloor',this.formItem);
                }
            })
           
        }
    }
}
</script>

<style lang='less'>
     .community-search-form{
         .community-header{
             background: #f5f7f9;
            //padding: 30px 10px 10px 20px;
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
                margin-bottom:0px;
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
                //background: url(img/q1.svg) no-repeat center;
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
