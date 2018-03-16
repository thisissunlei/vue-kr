<template>
    <div class="create-new-order">
       <SectionTitle title="新建减租服务订单管理"></SectionTitle>
        <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form" style="padding:30px 24px">
            <Row style="margin-bottom:20px">  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px"  prop="customerId">
                    <selectCustomers name="renewForm.customerId" :onchange="changeCustomer"></selectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px" prop="communityId" >
                    <selectCommunities test="renewForm" :onchange="changeCommunity"></selectCommunities>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="减租开始日期" style="width:252px" prop="startDate" >
                        <DatePicker type="date" placeholder="减租开始日期" v-model="renewForm.startDate" style="display:block" @on-change="changeTime"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
                <Row style="margin-bottom:10px">  
                <Col class="col">
                    <Button type="primary" style="margin-right:20px;font-size:14px" @click="showStation">选择工位</Button>
                    <Button type="ghost" style="font-size:14px" @click="deleteStation">删除</Button>
                </Col>
                
                </Row>
                <Row style="margin-bottom:10px">
                    <Col sapn="24">
                    <Table border ref="selection" :columns="columns" :data="selecedStation" @on-selection-change="selectRow"></Table>
                    <div class="total-money" v-if="selecedStation.length">
                        <span>服务费总计</span>
                        <span class="money">{{renewForm.stationAmount}} </span>
                        <span class="money">{{stationAmount}}</span>
                    </div>
                </Col>
                </Row>
                
            <FormItem style="margin-top:40px">
            <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
            <!-- <Button type="ghost" style="margin-left: 8px">重置</Button> -->
        </FormItem>
        </Form>
        <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="468"
         class-name="vertical-center-modal"
     >
        <div v-if="openStation && !stationList.length">无可减租工位</div>
        <reduceStation label="可减租工位" :stationList="stationList" :selecedStation="selecedStation" 
        @on-station-change="onStationChange" v-if="openStation && stationList.length"></reduceStation>
        <div slot="footer">
            <Button type="primary" @click="submitStation">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelStation">取消</Button>
        </div>
    </Modal>
    </div>
</template>


<script>
import SectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import SelectSaler from '~/components/SelectSaler.vue'
import DetailStyle from '~/components/DetailStyle';
import reduceStation from './reduceStation.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';
import utils from '~/plugins/utils';




    export default {
        data() {

           return{
                disabled:false,//提交按钮是否有效
                index:0,//优惠的index
                openStation:false,//弹窗开关
                getStationFn:+new Date(),//监听获取工位数据
               renewForm:{
                    communityId:'',
                    customerId:'',
                    endDate:'',
                    saler:'',
                    items:[]
               },
               disabled:false,//提交按钮是否禁止
               discountError:{
                error:false,
                message:''
               },
               selectedDel:[],//选择要删除的工位
               ruleCustom:{
                    communityId:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    customerId:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    saler:[
                        { required: true, message: '此项不可为空', trigger: 'change' }
                    ],
                    time: [
                        { required: true,type: 'date', message: '此项不可为空!', trigger: 'change' }
                    ],
                    startDate: [
                        { required: true, type: 'date',message: '此项不可为空', trigger: 'change' }
                    ],
               },
               stationList:[
               ],
               selecedStation:[],
               selecedArr:[],
               depositType:'',
               payType:'',
               columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工位房间编号',
                        key: 'name'
                    },
                    {
                        title:'工位可容纳人数',
                        key:'capacity'
                    },
                    {
                        title: '减租期限',
                        key: 'address',
                        render: (h, params) => {
                            let start = new Date(this.renewForm.startDate).getTime()
                            let begin = new Date(params.row.startDate).getTime()
                            return h('strong', dateUtils.dateToStr("YYYY-MM-dd",new Date(start<begin?begin:start))+'至'+dateUtils.dateToStr("YYYY-MM-dd",new Date(params.row.endDate)))
                        }
                    },
                ],
                stationAmount:'',
                payList:[
                    {value:'ONE',label:'月付'},
                    {value:'TWO',label:'两月付'},
                    {value:'THREE',label:'季付'},
                    {value:'SIX',label:'半年付'},
                    {value:'TWELVE',label:'年付'},
                    {value:'ALL',label:'全款'},
                ],
                depositList:[
                    {label:'2个月',value:'2个月'},
                    {label:'3个月',value:'3个月'},
                    {label:'4个月',value:'4个月'},
                    {label:'5个月',value:'5个月'},
                    {label:'6个月',value:'6个月'},
                ],
                selectAll:false,//工位全选
                youhui:[
                    {
                        label:'折扣',
                        value:'zhekou'
                    },
                    {
                        label:'前免',
                        value:'qianmian'
                    },
                    {
                        label:'后免',
                        value:'houmian'
                    }

                ],


           }
        },
        head() {
            return {
                title: '新建减租服务订单管理'
            }
        },
        components: {
            SectionTitle,
            selectCommunities,
            selectCustomers,
            SelectSaler,
            reduceStation,
        },
        mounted(){
            GLOBALSIDESWITCH("false");
        },
        watch:{
            getStationFn:function(){
                if(this.renewForm.customerId && this.renewForm.communityId && this.renewForm.startDate){
                    this.getRenewStation()
                }
            },
        },
        methods: {
            reduceFormSubmit(){
                this.config()
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.startDate));
                let renewForm = {} 
                renewForm.seats=JSON.stringify(this.selecedStation);
                renewForm.customerId=this.renewForm.customerId;
                renewForm.communityId=this.renewForm.communityId;
                renewForm.rentAmount=this.renewForm.rentAmount;
                renewForm.startDate = start;
                renewForm.endDate =start;
                let _this = this;
                 this.$http.post('save-reduce', renewForm).then( r => {
                     _this.$Notice.success({
                        title:'Success!'
                    });
                     window.location.href = '/order-center/order-manage/station-order-manage/'+r.data.orderSeatId+'/reduceView';
                     window.opener.location.href=window.opener.location.href;  
                     
                      // window.close();
                      // window.opener.location.reload();
                }).catch( e => {
                     _this.$Notice.error({
                        title:e.message
                    })
                    setTimeout(function(){
                        _this.disabled = false;
                    },2000)

                        console.log('error',e)
                })
                
            },
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            handleSubmit:function(name){
                let message = '请完整的填写表单'
                let _this = this;
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                
                this.disabled = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(!this.selecedStation.length){
                            this.$Notice.error({
                                title:'请选择减租工位'
                            });
                            _this.disabled = false;
                            return;
                        }
                        this.reduceFormSubmit()
                    } else {
                        _this.disabled = false;

                        this.$Notice.error({
                            title:message
                        });
                    }
                })
            },
            changeCustomer:function(value){
                if(value){
                    this.renewForm.customerId = value;
                    this.getStationFn = +new Date()
                    this.clearStation()
                }else{
                    this.renewForm.customerId = '';
                }
            },
            changeCommunity:function(value){
                if(value){
                    this.renewForm.communityId = value;
                    this.getStationFn = +new Date()
                }else{
                    this.renewForm.communityId = '';
                }
                this.clearStation()
            },
            changeTime:function(value){
                this.clearStation()
                let _this = this;
                setTimeout(function(){
                    _this.getStationFn = +new Date()
                },200)

                // this.renewForm.endDate = value;
            },
            changeSaler:function(value){
                this.renewForm.saler = value;
            },
            clearStation(){
                // 清除所选的工位
                if(this.selecedStation.length){
                    this.selecedStation = [];
                    this.selecedArr = [];
                }
                if(this.renewForm.items.length){
                    this.renewForm.items = []
                }


            },
            showStation:function(){
                 this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                if(!this.renewForm.communityId){
                    this.$Notice.error({
                        title:'请先选择社区'
                    });
                    return
                }
                if(!this.renewForm.customerId){
                    this.$Notice.error({
                        title:'请先选择客户'
                    });
                    return
                }
                if(!this.renewForm.startDate){
                    this.$Notice.error({
                        title:'请先选择减租开始时间'
                    });
                    return
                }
                this.openStation =true;
            },
            selectDeposit:function(value){
                this.depositType = value;

            },
            selectPayType:function(value){
                this.payType  = value;
            },
            deleteStation:function(){
                  let stationVos = this.selecedStation;
                let delArr = this.selectedDel;
                stationVos = stationVos.filter(function(item, index) {
                    if (delArr.indexOf(item.seatId) != -1) {
                        return false;
                    }
                return true;
                });
                this.selecedStation = stationVos;
                this.selecedArr = stationVos;
                this.getStationAmount()


            },
            selectRow:function(val){
                let selectionList = [];
                selectionList = val.map((item)=>{
                    return item.seatId
                })
                this.selectedDel = selectionList;
            },
            submitStation:function(){
                this.selecedStation =  this.selecedArr;
                this.getStationAmount()
                this.openStation = false;
            },
            getStationAmount(){
                this.config()

                let val = this.selecedArr;
               
                let station = val.map(item=>{
                    let obj = item;
                    obj.originalPrice = item.price;
                    obj.seatId = item.seatId;
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate));
                    obj.endDate =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate));
                    return obj;
                })
                let params = {
                    startDate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.startDate)),
                    endDate:dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.startDate)),
                    communityId:this.renewForm.communityId,
                    customerId:this.renewForm.customerId,
                    seats:JSON.stringify(station)
                }
                let _this = this;
                if(val.length){
                     this.$http.post('get-reduce-station-amount', params, r => {
                        let money = r.data.reduceAmount;
                         _this.selecedStation = r.data.seats.map(item=>{
                            let obj = item;
                            // money+= item.amount;

                            obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.renewForm.startDate))
                            obj.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.endDate))
                            return obj;
                        });
                        _this.renewForm.rentAmount =  Math.round(money*100)/100;
                        _this.renewForm.stationAmount = Math.round(money*100)/100;
                        _this.stationAmount = utils.smalltoBIG(Math.round(money*100)/100)
                         

                    }, e => {
                        _this.$Notice.error({
                           title:e.message
                        })
                    })
                }
            },
            cancelStation:function(){
                this.selecedStation = this.selecedStation.map(item=>{
                    let obj =item
                    obj.time = +new Date()
                    return obj;
                })
                this.openStation = false
            },
            onStationChange:function(val){
                this.selecedArr = val;

            },
             getRenewStation(){
                let params = {
                    //假数据
                    customerId:this.renewForm.customerId,
                    communityId:this.renewForm.communityId,
                    reduceDate:dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(this.renewForm.startDate)),
                    id:null

                };
                let _this = this;
                 this.$http.get('get-reduce-station', params, r => {
                     _this.stationList = r.data;
                }, e => {
                     _this.stationList=[];
                     _this.$Notice.error({
                        title:e.message
                    })
                })

            },

                    
               
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
   
</style>

