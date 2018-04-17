<template>
  <div class="daily-inventory"> 
    <div class="daily-header">
           <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">
                <div class='header-icon'>  
                    <Form-item label="库存日期" class='daily-form'>
                        <DatePicker 
                            v-model="formItem.inventoryDate" 
                            placeholder="请输入库存日期"
                            style="width: 200px"
                        />
                    </Form-item>
                    <Tooltip content="查询某一天，商品的库存状态。如需查询某个时间段的可租商品，可前往可租商品查询页进行查询" placement="top">
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


                <Form-item label="库存状态" class='daily-form'> 
                    <Select 
                        v-model="formItem.statusName" 
                        placeholder="请输入库存状态" 
                        style="width: 200px"
                        multiple
                    >
                        <Option v-for="item in inventoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select> 
                </Form-item>


                <Form-item label="社区" class='daily-form' style="width:400px">
                    <Select 
                        v-model="formItem.cityId" 
                        placeholder="请输入城市" 
                        style="width: 100px;margin-right:10px;"
                        clearable
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
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.communityId" 
                            :key="item.communityId"
                        >
                            {{ item.communityName }}
                        </Option>
                   </Select>
                   <Select 
                        v-model="formItem.floor" 
                        placeholder="请输入楼层" 
                        style="width: 100px"
                        clearable
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


                <div style="display:inline-block;">
                    <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:10px;">工位数量</span>
                    <Form-item class='daily-form' style="width:auto;" prop="stationsMin">
                        <i-input 
                            v-model="formItem.stationsMin" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                    <span style="display:inline-block;margin:0 5px;padding-top: 6px;">至</span>
                    <Form-item class='daily-form' prop="stationsMax" style="width:auto;margin-right:30px;">
                        <i-input 
                            v-model="formItem.stationsMax" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                </div>


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


                <div style="display:inline-block;margin-right:30px;">
                    <Form-item label="价格" class='daily-form' style="width:150px;margin-right:10px;"> 
                        <Select 
                            v-model="formItem.priceType" 
                            style="width: 100px;margin-right:10px;"
                            clearable
                        >
                            <Option v-for="item in priceList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                    </Select> 
                    </Form-item>
                    <Form-item class='daily-form' prop="priceMin" style="width:auto;margin-left: -10px;">
                        <i-input 
                            v-model="formItem.priceMin" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                    <span style="display:inline-block;margin:0 5px;vertical-align: middle;padding-top: 6px;">至</span>
                    <Form-item class='daily-form' prop="priceMax" style="width:auto;">
                        <i-input 
                            v-model="formItem.priceMax" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                </div>

                <div style="display:inline-block;margin-right:30px;">
                    <span style="color:#333;font-weight: 500;display: inline-block;padding-top:7px;margin-right:10px;">面积</span>
                    <Form-item class='daily-form' style="width:auto;" prop="areaMin">
                        <i-input 
                            v-model="formItem.areaMin" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                    <span style="display:inline-block;margin:0 5px;vertical-align: middle;">至</span>
                    <Form-item  class='daily-form' style="width:auto;" prop="areaMax">
                        <i-input 
                            v-model="formItem.areaMax" 
                            style="width: 100px"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item>
                </div>


                <Form-item label="商品属性" class='daily-form'> 
                    <Select 
                        v-model="formItem.locationName" 
                        style="width: 100px;margin-right:10px;"
                        clearable
                    >
                        <Option v-for="item in locationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select> 
                   <Select 
                        v-model="formItem.suiteName" 
                        style="width: 100px"
                        clearable
                    >
                        <Option v-for="item in suiteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Form-item>
         </Form>
         <div style="display:inline-block;">
              <Button type="primary" @click="searchClick">搜索</Button>
              <Button type="ghost" style="margin-left:8px" @click="clearClick">清除</Button>
         </div>
    </div>
    
    <div class='daily-tab'>
        <div class='tab-select'>
            <RadioGroup v-model="formItem.countSelf">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <Select 
                v-model="formItem.discount" 
                style="width: 100px"
                clearable
                @on-change="countChange"	
            >
                <Option v-for="item in discountList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
        </div>
        <Tabs value="dailyList" :animated="false">
                <Tab-pane label="以列表方式展示" name="dailyList">   
                     <div class="daily-table" id="daily-table-list">
                        <Table border stripe :columns="columns" :data="dailyData"></Table>
                        <div  class='list-footer fixed-footer' :style="{left:left+'px',width:width+'px'}">
                                <div style="display:inline-block;">
                                    <Button type='primary' @click='submitExport' style="margin-right:20px;">导出</Button>
                                    <Button type='primary' @click='submitStatistical'>统计</Button>
                                </div>
                                <div style="float: right;">
                                    <Page 
                                        :current="formItem.page"
                                        :total="totalCount"
                                        :page-size="formItem.pageSize" 
                                        show-total 
                                        show-elevator
                                        @on-change="changePage"
                                   />
                                </div>
                        </div>
                    </div>
                </Tab-pane>

                <Tab-pane label="以时间轴方式展示" name="dailyTime">
                    
                </Tab-pane>
        </Tabs> 
    </div>

    <Modal
        v-model="openStatistical"
        title="统计信息"
        class-name="vertical-center-modal"
        width="500"
     >
        <div>
            <Table border :columns="columnsInner" :data="dailyDataInner"></Table>
        </div>
        <p slot="footer" style="opacity:0;"></p>
    </Modal>

    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onMessageChange"
    />

  </div>
</template>


<script>

import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import KrField from '~/components/KrField';

    export default {
        name: 'Daily',
        components:{
            Message,
            KrField,
        },
        data () {
            const validateStation = (rule, value, callback) => {
                var reg = /^\+?[1-9]\d*$/;
                if(value&&!reg.test(value)){
                    callback('请输入正整数');
                }else if(value&&value>999){
                    callback('最大999个工位');
                }else if (this.formItem.stationsMin&&this.formItem.stationsMax&&this.formItem.stationsMin>this.formItem.stationsMax) {
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
                }else if (this.formItem.priceMin&&this.formItem.priceMax&&this.formItem.priceMin>this.formItem.priceMax) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            const validateArea = (rule, value, callback) => {
                var reg=/^(([1-9]{1}[0-9]{0,2})|([0]\.\d{1,2}|[1-9]{1}[0-9]{0,2}\.\d{1,2}))$/;
                if(value&&!reg.test(value)){
                    callback('请输入整数位最多3位,小数位最多2位');
                }else if (this.formItem.areaMin&&this.formItem.areaMax&&this.formItem.areaMin>this.formItem.areaMax) {
                    callback('后者需要大于前者');
                }else{
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                var str=this.fucCheckLength(value);
                if(value&&str>20){
                    callback('名称最多20个字节');
                }else if(value&&!this.formItem.communityId){
                    callback('请先选择社区');
                }else{
                    callback();
                }
            };

            return {   
                warn:'',
                MessageType:'',
                openMessage:false,
                openStatistical:false,

                discountList:[],
                communityList:[],
                cityList:[],
                floorList:[],
                productList:[
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
                    {value:'OUTSIDE_SPACE',label:'外侧间'},
                    {value:'INSIDE_SPACE',label:'内侧间'},
                    {value:'UNKNOWN',label:'未知'}
                ],
                suiteList:[
                    {value:'SUITE',label:'有套间'},
                    {value:'UNSUITE',label:'无套间'}
                ],
                left:'',
                width:'',


                formItem:{
                    inventoryDate:dateUtils.dateToStr("YYYY-MM-DD",new Date()),
                    name:'',
                    statusName:[],
                    communityId:'',
                    cityId:'',
                    floor:'',
                    stationsMax:'',
                    stationsMin:'',
                    seatType:'',
                    priceType:'',
                    priceMin:'',
                    priceMax:'',
                    areaMin:'',
                    areaMax:'',
                    locationName:'',
                    suiteName:'',
                    discount:'no',
                    countSelf:'1',
                    page:1,
                    pageSize:15
                },
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
                    ],
                },
                totalCount:0,

                columnsInner:[
                    {
                        title: '类型',
                        key: 'orderNum',
                        align:'center'
                    },
                    {
                        title: '可租个数',
                        key: 'customerName',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部个数',
                        key: 'communityName',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '可租工位',
                        key: 'rentAmount',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '全部工位',
                        key: 'depositAmount',
                        align:'center',
                        render(tag,params){ 
                          var ren=params.row.customerName?params.row.customerName:'-';                  
                          return <span>{ren}</span>;
                        }
                    }
                ],
                dailyDataInner:[],


                dailyData:[],
                columns: [
                    {
                        title: '商品',
                        key: 'name',
                        align:'center',
                        render(tag, params){
                            var renCap=params.row.type=='SPACE'?params.row.capacity:'';
                            var location=params.row.location?params.row.location:'-'
                            return h('div', [
                                       h('Tooltip', {
                                            props: {
                                                placement: 'top',
                                                content: location
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                            },params.row.name+'  '+renCap),
                                            h('div',{
                                                style:{
                                                    textOverflow:'ellipsis',
                                                    whiteSpace:'nowrap',
                                                    overflow: 'hidden'
                                                }
                                            },params.row.location),
                                        ])
                                 ])
                            ])
                        }
                    },
                    {
                        title: '商品类型',
                        key: 'type',
                        align:'center',
                        width:110,
                        render(tag, params){
                            var ren=params.row.type?params.row.type:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '商品属性',
                        key: 'property',
                        align:'center',
                        render(tag, params){
                            var desc=params.row.propertyDesc?params.row.propertyDesc:'-'
                            return h('div', [
                                       h('Tooltip', {
                                            props: {
                                                placement: 'top',
                                                content: desc
                                            }
                                        }, [
                                        h('div', [
                                            h('div',{
                                            },params.row.property),
                                            h('div',{
                                                style:{
                                                    textOverflow:'ellipsis',
                                                    whiteSpace:'nowrap',
                                                    overflow: 'hidden'
                                                }
                                            },params.row.propertyDesc),
                                        ])
                                 ])
                            ])
                        }
                    },
                    {
                        title: '面积',
                        key: 'area',
                        align:'center',
                        width:80,
                        render(tag, params){
                            var ren=params.row.area?params.row.area:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '工位单价',
                        key: 'unitPrice',
                        className:'priceClass',
                        align:'center',
                        width:100,
                        render(tag, params){
                            return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.unitPrice}</span>
                        }
                    },
                    {
                        title: '工位数量',
                        key: 'capacity',
                        align:'center',
                        width:100,
                        render(tag, params){
                            var ren=params.row.capacity?params.row.capacity:'-';
                            return <span>{ren}</span>
                        }
                    },
                    {
                        title: '商品总价',
                        key: 'quotedPrice',
                        className:'priceClass',
                        align:'center',
                        width:100,
                        render(tag, params){
                            return <span style="text-align:right;width: 100%;display: inline-block;">{params.row.quotedPrice}</span>
                        }
                    },
                    {
                        title: '当日库存',
                        key: 'status',
                        align:'center',
                        width:100,
                        render(tag, params){
                            var ren=params.row.status?params.row.status:'-'
                            return <span style={params.row.status=='不可用'?'color:red':''}>{ren}</span>
                        }
                    },
                    {
                        title: '签约价',
                        key: 'price',
                        className:'priceClass',
                        align:'center',
                        width:80,
                        render(tag, params){
                            var ren=params.row.price?params.row.price:'-';
                            return <span style="text-align:right;width: 100%;display: inline-block;">{ren}</span>
                        }
                    },
                    {
                        title: '最近可租起始日',
                        key: 'recentStart',
                        align:'center',
                        width:130,
                        render(tag, params){
                            var ren=params.row.recentStart?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentStart)):'-';
                            return <span>{ren}</span>;
                        }
                    },
                    {
                        title: '最近可租结束日',
                        key: 'recentEnd',
                        align:'center',
                        width:130,
                        render(tag, params){
                            var ren=params.row.recentEnd?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentEnd)):'-';
                            return <span>{ren}</span>;
                        }
                    }
                ]    
            }
        },
        mounted(){
            //this.getTableData(this.formItem);
            //this.getCommunityList();
            //this.getCityList();
            //this.getFloorList();
            this.getDiscount();


            this.communityList=[
                        {
                            "communityId":42261,"communityName":"测试内容x3ru"
                        }
            ]
            this.communityList.unshift({communityId:'all',communityName:"全部社区"})
            this.formItem.communityId=this.communityList[0].communityId;
            this.cityList=[
                        {
                            "cityId":15312,"cityName":"测试内容ji8g"
                        }
            ]
             this.cityList.unshift({cityId:'all',cityName:"全部城市"})
             this.formItem.cityId=this.cityList[1].cityId;
             this.floorList=[
                        {
                            "floor":42261,"floorName":"测试内容x3ru"
                        }
            ]
            this.floorList.unshift({floor:'all',floorName:"全部楼层"})
            this.formItem.floor=this.floorList[0].floor;
            this.dailyData=[
            {
                "area":52853,"capacity":84423,"cityName":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"status":61414,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            },
            {
                "area":52853,"capacity":84423,"cityName":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"status":61414,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            },
            {
                "area":52853,"capacity":84423,"cityName":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            }
        ];

            this.dailyDataInner=[
            {
                "area":52853,"capacity":84423,"orderNum":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"status":61414,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            },
            {
                "area":52853,"capacity":84423,"orderNum":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"status":61414,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            },
            {
                "area":52853,"capacity":84423,"orderNum":"测试内容62si","communityName":"测试内容22h9","floor":56564,"name":"测试内容25x5","price":70373,"property":"测试内容c7tm","quotedPrice":"测试内容i51w","recentEnd":88601,"recentStart":14786,"type":"测试内容7kd5","unitPrice":"测试内容p9nk"
            }
        ];

            var dom=document.getElementById('layout-content-main');
            var dailyTableDom=document.getElementById('daily-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            dom.addEventListener("scroll",this.onScrollListener)
        },
        methods:{
            //获取列表数据
            getTableData(params){
                this.$http.get('getDailyInventory', params).then((res)=>{
                    this.dailyData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
                
            },
            //社区接口
            getCommunityList(){
                this.$http.get('getDailyCommunity').then((res)=>{
                    this.communityList=res.data.items;
                    if(this.communityList.length>1){
                        this.communityList.unshift({communityId:'all',communityName:"全部社区"})
                    }
                    this.formItem.communityId=this.communityList[0].communityId;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
            },
            //城市接口
            getCityList(){
                this.$http.get('getDailyCity', params).then((res)=>{
                   this.cityList=res.data.items;
                   if(this.cityList.length>1){
                       this.cityList.unshift({cityId:'all',cityName:"全部城市"})
                       this.formItem.cityId=this.cityList[1].cityId;
                   }else{
                       this.formItem.cityId=this.cityList[0].cityId;
                   }   
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
            },
            //楼层接口
            getFloorList(){
                this.$http.get('getDailyFloor', params).then((res)=>{
                    this.floorList=res.data.items;
                    if(this.floorList.length>1){
                        this.floorList.unshift({floor:'all',floorName:"全部楼层"})                        
                    }
                    this.formItem.floor=this.floorList[0].floor;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
            },
            //页面发生改变
            changePage(page){
                this.formItem.page=page;
                this.getTableData(this.formItem);
            },
            //获取折扣价
            getDiscount(){
                var discountArr=[];
                var index=0.1;
                for(var i=0;i<99;i++){
                    discountArr.push({value:index,label:index+'折'})
                    index=(index*10000+0.1*10000)/10000;
                }
                discountArr.reverse();
                discountArr.unshift({value:'no',label:'无'})
                this.discountList=discountArr;
            },
            //导出
            submitExport(){
                
            },
            //统计
            submitStatistical(){
                this.openStatistical=!this.openStatistical;
            },
            //滚动监听
            onScrollListener(){    
                var dom=document.getElementById('layout-content-main');
                var headDom=document.querySelectorAll('div.daily-table table thead')[0];
                headDom.style.left=this.left+'px';
                headDom.style.width=this.width+'px';
                var classVal = headDom.getAttribute("class");
                if(dom.scrollTop>=294){
                     if(!classVal){
                         headDom.setAttribute("class",'daily-head-class');
                     }
                }else{
                    if(classVal){
                        classVal = classVal.replace("daily-head-class","");
                        headDom.setAttribute("class",classVal);
                    }
                }
            },
            //搜索
            searchClick(){
                this.$refs['formItemDaily'].validate((valid) => {
                    if (valid) {
                       this.formItem.cityId=(!this.formItem.cityId||this.formItem.cityId=='all')?'':this.formItem.cityId;
                       this.formItem.communityId=(!this.formItem.communityId||this.formItem.communityId=='all')?'':this.formItem.communityId;
                       this.formItem.floor=(!this.formItem.floor||this.formItem.floor=='all')?'':this.formItem.floor;
                       this.formItem.discount=(this.formItem.discount=='no'||!this.formItem.discount)?'':this.formItem.discount;
                       this.getTableData(this.formItem);
                    }
                })
            },
            //清除
            clearClick(){
                for(var item in this.formItem){
                    this.formItem[item]='';
                }
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
            //折扣价
            countChange(param){
                this.formItem.cityId=(!this.formItem.cityId||this.formItem.cityId=='all')?'':this.formItem.cityId;
                this.formItem.communityId=(!this.formItem.communityId||this.formItem.communityId=='all')?'':this.formItem.communityId;
                this.formItem.floor=(!this.formItem.floor||this.formItem.floor=='all')?'':this.formItem.floor;
                if(this.formItem.countSelf=='0'){
                    this.formItem.discount=(this.formItem.discount=='no'||!this.formItem.discount)?'':this.formItem.discount;
                    //this.getTableData(this.formItem);
                }else{
                    this.formItem.discount='';
                    //this.getTableData(this.formItem);
                }
            }
        }
    }
</script>

<style lang="less">
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
}
.daily-inventory{
    .daily-header{
        padding: 30px 20px 10px 20px;
        .ivu-form .ivu-form-item-label{
            color:#333;
            font-weight: 500;
        }
        .daily-form{
            width:300px;
            display:inline-block;
        }
        .header-icon{
            display:inline-block;
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
                width:14px;
                height:14px;
                background:url(img/q.svg) no-repeat center;
                background-size: 100%;
                vertical-align: middle;
                margin-top: 8px;
            }
        }
    }
    .daily-tab{
        position: relative;
        padding: 0 20px;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f6f6f6;
        }
        .tab-select{
            position: absolute;
            right:50px;
            z-index: 100;
        }
        .daily-table{
            padding-bottom: 80px;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .daily-head-class{
                position: fixed;
                top:60px;
            }
            .list-footer{
                padding:20px 0;
            }
            .fixed-footer{
                position: fixed;
                background:#fff;
                z-index:101;
                bottom:57px;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                }
            }
        }
    }
}

</style>
