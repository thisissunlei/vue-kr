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
                            <div class="header">
                                <span class="select">
                                    <Checkbox v-model="selectAllChecked" @on-change="selectAll"></Checkbox>
                                </span>
                                <span class="header-name">
                                    工位编号/房间名称
                                </span>
                                <span class="header-name">产品类型</span>
                                <span class="header-name">原服务开始日</span>
                                <span class="header-name">原服务结束日</span>
                                <span class="header-name">预更换服务期</span>
                            </div>
                            <div class="station-table" v-for="(item,index) in oldStation" :key="item.seatId" v-bind:class="{error: item.timeType=='error' }">
                                <span class="select">
                                    <Checkbox v-model="item.checked" @on-change="selectRow" :disabled="item.disabled"></Checkbox>
                                </span>
                                <span class="header-name">
                                    {{item.seatName}}
                                </span>
                                <span class="header-name">
                                {{item.seatType=='SPACE'?'独立办公室':'开放工位'}}</span>
                                <span class="header-name">{{item.startDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name">{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
                                <span class="header-name" v-if="item.checked == false || !formItem.beginTime">--</span>
                                <span class="header-name" v-if="item.checked == true && formItem.beginTime">{{formItem.beginTime| dateFormat('YYYY-MM-dd')}}至{{item.endDate | dateFormat('YYYY-MM-dd')}}</span>
                            </div>
                           
                        </Col>
                        <Col>
                            <div class="error" v-show="errorObj.oldStation == true">请选择要更换的原工位</div>
                        </Col>
                    </Row>
                </Form>
                <div class="buttons" style="margin-top:20px">

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
                <Form ref="formItemFour" :model="formItem" :rules="ruleValidateFour" class="demo-m" label-position="top">
                     <Row>  
                        <Col>
                            <FormItem label="旧工位信息">
                                <Table :columns="oldStationInfo" :data="oldStationData"></Table>
                            </FormItem>
                        </Col>
                        
                        <Col >
                            <FormItem label="新工位信息"> 
                                <Table :columns="newStationInfo" :data="newStationData"></Table>
                            </FormItem>
                        </Col>
                        
                        <Col class="col">
                            <FormItem label="退还服务费" style="width:252px">
                                <Input 
                                    v-model="formItem.back" 
                                    placeholder="旧服务保证金转新"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="旧服务保证金转新" style="width:252px" prop="oldChangeNew">
                                 <Input 
                                    v-model="formItem.money" 
                                    placeholder="旧服务保证金转新"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
                        <Col class="col">
                            <FormItem label="扣除服务保证金" class="bill-search-class" > 
                                <Input 
                                    v-model="formItem.back" 
                                    placeholder="扣除服务保证金"
                                    style="width: 252px"
                                />
                            </FormItem>
                        </Col>
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
            const validateChangeTime = (rule, value, callback) => {
                var today = new Date()
                today = today.setDate(today.getDate()+1);
                today = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(today))
                today = new Date(today).getTime()
                if (value === '') {
                    callback(new Error('请先选择换租服务开始日'));
                } else if(value.getTime() < today){
                    callback(new Error('换租服务开始日不得小于等于今日'));
                }else if(value.getTime() > this.oldStation[0].endDate){
                     callback(new Error('换租服务开始日不得大于原结束日期'));
                }else{
                     callback();
                }
            };
            return {
                //订单模式（create：创建中；view：预览）
                orderStatus:'create',
                showHeader:true,
                //错误提示
                errorObj:{
                    oldStation:false
                },
                status:0,
                rows:4,
                oldEndTime:new Date(),
                //优惠信息
                saleList:[],
                salerName:'请选择',
                //选中的原有工位
                selectedOldStation:[],
                //表单数据
                formItem:{
                    saleTime:new Date(),
                    beginTime:''
                },
                getFloor:new Date(),
                //全选
                selectAllChecked:false,
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
                        { required: true, trigger: 'change' ,validator: validateChangeTime},
                    ]
                },
                ruleValidateFour:{
                    oldChangeNew:[
                        { required: true, message: '请填写', trigger: 'blur' }

                    ]
                },
                communityList:[{
                    label:'1',
                    value:'111'
                }],
                oldStation:[],
                oldStationInfo:[
                    {
                        title: '减少服务费',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '已交服务费中涉及到更换的金额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '已交保证金涉及到更换的金额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                ],
                oldStationData:[],
                newStationInfo:[
                    {
                        title: '服务费总额',
                        key: 'reduceMoney',
                        align:'center'
                    },
                    {
                        title: '服务保证金',
                        key: 'reduceMoney',
                        align:'center'
                    },
                ],
                newStationData:[],

                


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
            GLOBALHEADERSET('订单合同');
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
           },
        },
        methods: {
            changeSaler(value){
                this.formItem.salerId = value;
            },
            changeSaleTime(value){
                this.formItem.saleTime = value;
            },
            getSelectedOldStation(){
                this.selectedOldStation = this.oldStation.filter(item=>{
                    if(item.checked){
                        return true;
                    }
                    return false
                })
            },
            next(name){

                if(name == 'formItemTwo'){
                    this.getSelectedOldStation()
                    if(!this.selectedOldStation.length){
                        this.errorObj.oldStation = true;
                    }else{
                        this.errorObj.oldStation = false;
                    }
                }
                if(this.errorObj.oldStation){
                    return
                }
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
                        item.checked = false;
                        item.disabled = true;
                        return item
                    })
                }).catch( e => {
                    console.log('error',e)
                })
            },
            changeBeginTime(value){
                //TODO 联调时需修改判断条件

                //出发更新列表中的欲更换信息
                var today = new Date()
                this.selectAllChecked = false;
                today = today.setDate(today.getDate()+1);
                today = dateUtils.dateToStr('YYYY-MM-DD 00:00:00',new Date(today))
                today = new Date(today).getTime()
                //选择日期小于当前日+1或大于原服务结束日，否则全部不可选
                // if(new Date(value).getTime()<today || new Date(value).getTime()>this.oldStation[0].endDate){
                //     this.oldStation = this.oldStation.map((item,index)=>{
                //         item.checked = false;
                //         return item
                //     })
                //     return
                // }

                    this.oldStation = this.oldStation.map((item,index)=>{
                            item.checked = false;
                            //判断当前已选工位是否符合开始时间
                            // if(value<item.startDate || value>item.endDate){
                            if(new Date(value).getTime()<today  ){
                                item.disabled = true;
                                item.timeType='error';
                                this.errorObj.errorRow = true;
                            }else{
                                item.disabled = false;
                                item.timeType='';
                                this.errorObj.errorRow = false;
                            }
                        // item._checked = true设置为选中状态
                        return item
                    })

            },
            selectRow(status){
                if(!status){
                    this.selectAllChecked = false;
                }
            },
            selectAll(status){
                this.selectAllChecked = status;
                this.oldStation = this.oldStation.map(item=>{
                    item.checked = status;
                    return item;
                })
                
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
            width:49%;
            display: inline-block;
            vertical-align: top;
            padding-right: 1%;
        }
        .between{
            display: inline-block;
            width: 20px;
        }
        .ivu-card-head{
            background-color: rgb(247, 247, 247);
        }
        .error{
            color:red;
        }
        .header ,.station-table{
            width: 100%;
            height: 40px;
            display: flex;
            line-height: 40px;
            background-color:#f8f8f9;
            border:1px solid #e9eaec;
            .select{
                width:60px;
                display:inline-block;
                text-align:center;
            }
            .header-name{
                display: inline-block;
                word-wrap:normal;
                vertical-align: middle;
                white-space:nowrap;
                flex:1;
                overflow:hidden;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                color:#495060;

            }
        }
        .error{
           .header-name{
            color:red;
           }
        }
        .station-table{
            background-color:#fff;
            border-top:none;
            .header-name{
                border-top:none;
                font-weight: 500;
            }
        }
    }
</style>
