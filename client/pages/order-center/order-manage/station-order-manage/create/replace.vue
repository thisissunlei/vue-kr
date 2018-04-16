<template>
    <div class="create-new-order">
        <SectionTitle title="新建换租订单"  v-if="orderStatus=='create'"></SectionTitle>
        <div class="create-order" v-if="orderStatus=='create'">

            <Steps :current="status" status="process" style="margin-bottom:20px">
                <Step :title="returnTitle(0)" content="客户信息页"></Step>
                <Step :title="returnTitle(1)" content="原工位选择页"></Step>
                <Step :title="returnTitle(2)" content="新工位选择页"></Step>
                <Step :title="returnTitle(3)" content="服务费信息页"></Step>
            </Steps>
            <Card id="step-one" v-show="status==0">
                <p slot="title" class="card-title">
                   基本信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem style="width:252px" label="客户名称" class="bill-search-class" prop="customerId">
                            <selectCustomers name="formItem.customerId" :onchange="changeCustomer"></selectCustomers>
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                    @on-change="changeCommunity"
                                >
                                    <Option v-for="item in communityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="saleTime">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTime" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="reason"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="primary" @click="next('formItemOne')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-two" v-if="status==1">
                <p slot="title" class="card-title">
                   原工位信息
                </p>
                <Form ref="formItemTwo" :model="formItem" :rules="ruleValidateTwo" class="demo-m" label-position="top">
                     <Row>  
                        <Col class="col">
                            <FormItem label="换租服务开始日：" class="bill-search-class" prop="beginTime">
                                <DatePicker type="date" placeholder="换租服务开始日：" v-model="formItem.beginTime" @on-change="changeBeginTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        
                        <Col >
                            <Table ref="oldStationTable" :columns="oldColumns" :data="oldStation" @on-selection-change="selectRow" />
                           
                        </Col>
                    </Row>
                </Form>
                <div class="buttons">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next('formItemTwo')">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-three" v-if="status==2">
                <p slot="title" class="card-title">
                    新工位信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <!--Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col-->
                    </Row>
                </Form>
                <div class="buttons">

                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="next">下一步</Button>
                    
                </div>
            </Card>
            <Card id="step-four" v-if="status==3">
                <p slot="title" class="card-title">
                    服务费信息
                </p>
                <Form ref="formItemOne" :model="formItem" :rules="ruleValidateOne" class="demo-m" label-position="top">
                     <Row>  
                        <!--Col class="col">
                            <FormItem label="客户名称" class="bill-search-class" prop="company">
                                <Input 
                                    v-model="formItem.company" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="相关社区" class="bill-search-class" prop="communityId"> 
                                <Select 
                                    v-model="formItem.communityId" 
                                    placeholder="请输入社区名称" 
                                    style="width: 252px"
                                    filterable
                                    clearable
                                >
                                    <Option v-for="item in communityList" :value="''+item.id" :key="item.id">{{ item.name }}</Option>
                               </Select> 
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="销售员" style="width:252px" prop="salerId">
                            <SelectSaler name="formItem.salerId" :onchange="changeSaler" :value="salerName"></SelectSaler>
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="销售时间" style="width:252px" prop="salerId">
                                <DatePicker type="date" placeholder="开始时间" v-model="formItem.saleTIme" @on-change="changeSaleTime" style="width:252px" ></DatePicker >
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="换租原因" class="bill-search-class" prop="communityId"> 
                                <Input 
                                    v-model="formItem.reason" 
                                    placeholder="请输入客户名称"
                                    style="width: 252px"
                                    type="textarea"
                                    :rows="rows"
                                />
                            </FormItem>
                        </Col-->
                    </Row>
                </Form>
                <div class="buttons">
                    <Button type="ghost" @click="previous">上一步</Button>
                    <span class="between"></span>
                    <Button type="primary" @click="submit">提交</Button>
                    
                </div>
            </Card>
        </div>
        <div class="view" v-if="orderStatus=='view'">
            <ReplaceView @editCards="editCard"/>
        </div>
    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle.vue'
    import SelectSaler from '~/components/SelectSaler.vue'
    import ReplaceView from '../replaceView.vue'
    import selectCustomers from '~/components/SelectCustomers.vue'
    import dateUtils from 'vue-dateutils';





    export default {
        data() {
            return {
                //订单模式（create：创建中；view：预览）
                orderStatus:'create',
                status:0,
                rows:4,
                //优惠信息
                saleList:[],
                salerName:'请选择',
                //选中的原有工位
                selectedOldStation:[],
                //表单数据
                formItem:{
                    saleTime:new Date()
                },
                getFloor:new Date(),
                //step1校验规则
                ruleValidateOne:{
                    communityId:[
                        { required: true, message: '请选择社区'}
                    ],
                    customerId:[
                        { required: true, message: '请填写客户名称'},
                    ],
                    salerId:[
                        { required: true, message: '请选择销售员', trigger: 'change' }
                    ],
                    saleTime:[
                        { required: true, type: 'date',message: '请选择销售时间', trigger: 'change' }
                    ],
                    reason:[
                        { required: true, message: '请填写换租原因', trigger: 'blur' }
                    ]
                },
                ruleValidateTwo:{
                    beginTime:[
                        { required: true, type: 'date',message: '请选择开始时间', trigger: 'change' }
                    ]
                },
                communityList:[{
                    label:'1',
                    value:'111'
                }],
                oldStation:[],
                oldColumns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                     title: '工位/房间编号',
                     key: 'seatName',
                     align:'center' 
                    },
                    {
                            title: '类型',
                            key: 'seatType',
                            align:'center',
                            render:(h, params) => {
                                let type = params.row.seatType;
                                let typeName = '开放工位';
                                if(type =='SPACE'){
                                    typeName = '独立办公室'
                                }else{
                                    typeName = "开放工位"
                                }
                                return typeName
                            }
                        },
                    {
                        title:'工位可容纳人数',
                        key:'capacity',
                        align:'center'  
                    },
                    {
                     title: '标准单价(元/月)',
                     key: 'originalPrice',
                     align:'center' 
                    },
                    {
                     title: '开始日期',
                     key: 'startDate',
                     align:'center',
                     render(tag, params){
                         let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.startDate));
                         return time;
                     }  
                    },
                    {
                     title: '结束日期',
                     key: 'endDate',
                     align:'center',
                     render(tag, params){
                         let time=dateUtils.dateToStr('YYYY-MM-DD',new Date(params.row.endDate));
                         return time;
                     }  
                    },
                    {
                     title: '小计',
                     key: 'originalAmount',
                     align:'center' 
                    }
            ],


            }
        },

        head() {
            return {
                title: '新建换租订单'
            }
        },
        components: {
            SectionTitle,
            SelectSaler,
            selectCustomers,
            ReplaceView
        },
         mounted(){
            GLOBALSIDESWITCH("false");
            GLOBALHEADERSET('订单合同')
        },
        watch:{
            getFloor(){
            let _this = this;
            if(this.formItem.communityId && this.formItem.customerId){
                let params = {
                    communityId:this.formItem.communityId,
                    customerId:this.formItem.customerId
                }
                 this.$http.get('get-community-floor', params, r => {
                    _this.floors = r.data.floor;
                    _this.ssoId = r.data.ssoId;
                    _this.ssoName = r.data.ssoName;
                    if(!_this.formItem.salerId){
                        _this.formItem.salerId = JSON.stringify(r.data.ssoId);
                        _this.salerName = r.data.ssoName

                    }

                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });

                })
            }
           }
        },
        methods: {
            changeSaler(value){
                this.formItem.salerId = value;
            },
            changeSaleTime(value){
                this.formItem.saleTime = value;
            },
            next(name){
                this.$refs[name].validate((valid) => {
                    if(valid){
                        if(name == 'formItemOne'){
                            this.getOldStation()

                        }


                        this.status ++ ;
                       

                    }
                })
            },
            previous(){
                this.status -- ;
            },
            returnTitle(value){
                let title = '未进行';
                if(value == this.status){
                    title = '进行中'
                }else if(value<this.status){
                    title = '已完成'
                }else{
                    title = '未进行'
                }
                return title;
            },
            submit(){
                this.orderStatus = 'view'
            },
            editCard(value){
                this.orderStatus = 'create';
                this.status = value;
            },
            changeCustomer(value){
                this.formItem.customerId = value;
                console.log('changeCustomer',value)
            },
            changeCommunity(value){
                console.log('changeCommunity',value)
                // 选择社区
                if(value){
                    this.formItem.communityId = 64 || value;
                    // this.getSaleTactics({communityId:value})
                    this.getSaleTactics({communityId:64})
                }else{
                    this.formItem.communityId = '';
                }
                //清除step1以后所有内容
                //
                //
                this.getFloor = +new Date()
            },
            getSaleTactics:function(params){//获取优惠信息
                let list = [];
                let maxDiscount = {};
                let _this = this;
                 this.$http.get('sale-tactics', params).then( r => {
                    if(r.data.length){
                        list = r.data.map(item=>{
                            let obj = item;
                            obj.label = item.tacticsName;
                            obj.value = item.tacticsType+'';
                            obj.id = item.tacticsId;
                            obj.name = item.tacticsName;
                            if(item.tacticsType == 1){
                                maxDiscount[item.tacticsName] = obj.discount;
                            }
                            return obj;
                        })
                    }else{
                        list = []
                    }
                    _this.saleList = list;

                }).catch( e => {
                    console.log('error',e)
                })
            },
            //获取原有工位数据
            getOldStation(){
                this.$http.get('join-bill-detail', {id:10551}).then( r => {
                    this.oldStation = r.data.orderSeatDetailVo.map(item=>{
                        item._checked = false;
                        item._disabled = false
                        return item
                    })
                }).catch( e => {
                    console.log('error',e)
                })
            },
            changeBeginTime(value){
                this.oldStation = this.oldStation.map((item,index)=>{
                    console.log('-----',index,'------index/2',index/2 )
                    if(index%2 ==0){
                        //设置为不可选
                        item._disabled = true
                         // item._checked = true设置为选中状态

                    }

                    return item
                })
            },
            changeCheckBox(value){
                console.log('changeCheckBox',value)
            },
            selectRow(selection){
                let selectionList = [];
                selectionList = selection.map((item)=>{
                    return item.seatId
                })
                this.selectedOldStation = selectionList;
                console.log('selectionList',selectionList)
            }
        }
    }
</script>
<style lang="less"> 
    .create-order{
        padding:30px 40px;
        .buttons{
            text-align: center;
            margin:10px auto 30px;
        }
        .col{
            width:50%;
            display: inline-block;
            vertical-align: top;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
        .ivu-card-head{
            background-color: rgb(247, 247, 247);
        }
    }
</style>
