<template>
  <div class="daily-inventory"> 
    <div class="daily-header">
           <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">
                <Form-item label="库存日期" class='daily-form'>
                    <DatePicker 
                        v-model="formItem.inventoryDate" 
                        placeholder="请输入库存日期"
                        style="width: 200px"
                    />
                </Form-item>


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
                        clearable
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
                            v-for="item in communityList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
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
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                   </Select>
                   <Select 
                        v-model="formItem.floor" 
                        placeholder="请输入楼层" 
                        style="width: 100px"
                        clearable
                    >
                        <Option 
                            v-for="item in communityList" 
                            :value="item.value" 
                            :key="item.value"
                        >
                            {{ item.label }}
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
                        <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
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
            <RadioGroup v-model="formItem.focus">
                <Radio label="1">原价</Radio>
                <Radio label="0">折扣</Radio>
            </RadioGroup>
            <Select 
                v-model="formItem.communityId" 
                style="width: 100px"
                clearable
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
                                        :current="tabParams.page"
                                        :total="totalCount"
                                        :page-size="tabParams.pageSize" 
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

                discountList:[],
                communityList:[],
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

                tabParams:{
                    page:1,
                    pageSize:1000
                },
                formItem:{
                    inventoryDate:dateUtils.dateToStr("YYYY-MM-DD",new Date()),
                    name:'',
                    statusName:'',
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
                    suiteName:''
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

                dailyData:[],
                columns: [
                    {
                        title: '商品',
                        key: 'name',
                        align:'center',
                        render(tag, params){
                            return <div>
                              <div>{params.row.name+' '+params.row.capacity}</div>
                              <div>{params.row.cityName+' '+params.row.communityName+' '+params.row.floor}</div>
                            </div>
                        }
                    },
                    {
                        title: '商品类型',
                        key: 'type',
                        align:'center'
                    },
                    {
                        title: '商品属性',
                        key: 'property',
                        align:'center'
                    },
                    {
                        title: '面积',
                        key: 'area',
                        align:'center'
                    },
                    {
                        title: '工位单价',
                        key: 'unitPrice',
                        align:'center'
                    },
                    {
                        title: '工位数量',
                        key: 'capacity',
                        align:'center'
                    },
                    {
                        title: '商品总价',
                        key: 'quotedPrice',
                        align:'center'
                    },
                    {
                        title: '当日库存',
                        key: 'status',
                        align:'center'
                    },
                    {
                        title: '签约价',
                        key: 'price',
                        align:'center'
                    },
                    {
                        title: '最近可租起始日',
                        key: 'recentStart',
                        align:'center',
                        render(tag, params){
                            return params.row.startDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentStart)):<span>-</span>;
                        }
                    },
                    {
                        title: '最近可租结束日',
                        key: 'recentEnd',
                        align:'center',
                        render(tag, params){
                            return params.row.startDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.recentEnd)):<span>-</span>;
                        }
                    }
                ]    
            }
        },
        mounted(){
            //this.getTableData(this.tabParams);
            this.getDiscount();
            var dom=document.getElementById('layout-content-main');
            var dailyTableDom=document.getElementById('daily-table-list');
            this.left=dailyTableDom.getBoundingClientRect().left;
            this.width=dailyTableDom.getBoundingClientRect().width;
            dom.addEventListener("scroll",this.onScrollListener)
        },
        methods:{
            //获取列表数据
            getTableData(params){
                this.$http.get('join-bill-list', params).then((res)=>{
                    this.dailyData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
                
            },
            getCommunityList(){
                this.$http.get('getDailyCommunity').then((res)=>{
                    console.log('res--',res.data);
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
            },
            getCityList(){
                this.$http.get('getDailyCity', params).then((res)=>{
                   console.log('res--',res.data);
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
                })
            },
            getFloorList(){
                this.$http.get('getDailyFloor', params).then((res)=>{
                    console.log('res--',res.data);
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
                this.tabParams.page=page;
                this.getTableData(this.tabParams);
            },
            getDiscount(){
                var discountArr=[];
                var index=0.1;
                for(var i=0;i<100;i++){
                    discountArr.push({value:index,label:index})
                    index=index+0.1;
                }
                this.discountList=discountArr;
            },
            submitExport(){

            },
            submitStatistical(){

            },
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
            searchClick(){
                this.$refs['formItemDaily'].validate((valid) => {
                    if (valid) {
                       console.log('form---',this.formItem); 
                    }
                })
            },
            clearClick(){
                for(var item in this.formItem){
                    this.formItem[item]='';
                }
            },
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
            }
        }
    }
</script>

<style lang="less">
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
        }
    }
}

</style>
