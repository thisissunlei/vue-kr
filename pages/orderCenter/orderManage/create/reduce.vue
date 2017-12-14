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



<template>
    <div class="create-new-order">
       <sectionTitle label="新建减租服务订单管理"></sectionTitle>
        <Form ref="renewForm" :model="renewForm" :rules="ruleCustom" class="creat-order-form" style="padding:30px 24px">
            <Row style="margin-bottom:20px">  
                <Col class="col">
                    <FormItem label="客户名称" style="width:252px"  prop="customerId">
                    <selectCustomers name="renewForm.customerId" :onchange="changeCustomer"></selectCustomers>
                    </FormItem>
                </Col>
                
                <Col class="col">
                    <FormItem label="所属社区" style="width:252px" prop="communityId" >
                    <selectCommunities name="renewForm.communityId" :onchange="changeCommunity"></selectCommunities>
                    </FormItem>
                </Col>
                <Col class="col">
                    <FormItem label="减租开始日期" style="width:252px" prop="endDate" >
                        <DatePicker type="date" placeholder="减租开始日期" v-model="renewForm.endDate" style="display:block" @on-change="changeTime"></DatePicker>
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
                        <span class="money">12,000.00 </span>
                        <span class="money">壹万两仟元整</span>
                    </div>
                </Col>
                </Row>
                
            <FormItem style="margin-top:40px">
            <Button type="primary" @click="handleSubmit('renewForm')" :disabled="disabled">提交</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </FormItem>
        </Form>
        <Modal
        v-model="openStation"
        title="选择工位"
        ok-text="保存"
        cancel-text="取消"
        width="450"
        @on-ok="submitStation"
        @on-cancel="cancelStation"
         class-name="vertical-center-modal"
     >
        <stationList label="可续租工位" :stationList="stationList" :selecedStation="selecedStation" 
        @on-station-change="onStationChange"></stationList>
    </Modal>
    </div>
</template>


<script>
import sectionTitle from '~/components/SectionTitle.vue'
import selectCommunities from '~/components/SelectCommunities.vue'
import selectCustomers from '~/components/SelectCustomers.vue'
import selectSaler from '~/components/SelectSaler.vue'
import axios from '~/plugins/http.js';
import DetailStyle from '~/components/detailStyle';
import stationList from './stationList.vue';
import dateUtils from 'vue-dateutils';
import '~/assets/styles/createOrder.less';



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
                    endDate: [
                        { required: true, type: 'date',message: '此项不可为空', trigger: 'change' }
                    ],
               },
               stationList:[
                    {name:'301',id:'301',price:'1800'},
                    {name:'302',id:'302',price:'1800'},
                    {name:'303',id:'303',price:'1800'},
                    {name:'304',id:'304',price:'1800'},
                    {name:'305',id:'305',price:'1800'},
                    {name:'306',id:'306',price:'1800'},
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
                        title: '标准单价（元/月）',
                        key: 'price'
                    },
                    {
                        title: '减租后租赁期限',
                        key: 'address',
                        render: (h, params) => {
                            return h('strong', dateUtils.dateToStr("YYYY-MM-dd",new Date(params.row.startDate))+'至'+dateUtils.dateToStr("YYYY-MM-dd",new Date(params.row.endDate)))
                        }
                    },
                    {
                        title: '小计',
                        key: 'amount'
                    }
                ],
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
            sectionTitle,
            selectCommunities,
            selectCustomers,
            selectSaler,
            stationList,
        },
        created:function(){
            
        },
        watch:{
            getStationFn:function(){
                if(this.renewForm.customerId && this.renewForm.communityId){
                    this.getRenewStation()
                }
            },
        },
        methods: {
            reduceFormSubmit(){
                let start = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.startDate));
                let end = dateUtils.dateToStr("YYYY-MM-dd 00:00:00",new Date(this.renewForm.endDate));
                let renewForm = {} 
                renewForm.seats=JSON.stringify(this.selecedStation);
                renewForm.customerId=this.renewForm.customerId;
                renewForm.communityId=this.renewForm.communityId;
                renewForm.rentAmount=this.renewForm.rentAmount;
                renewForm.startDate = start;
                renewForm.endDate =end;
                renewForm.corporationId = 11;//临时加的-无用但包错
                let _this = this;
                axios.post('save-reduce', renewForm, r => {
                    console.log('save-join=====',r.data)
                    _this.$Message.success('Success!');
                }, e => {

                        console.log('error',e)
                })
                
            },
            handleSubmit:function(name){
                let message = '=========';
                let _this = this;
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
                this.disabled = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.reduceFormSubmit()
                        this.$Message.success('Success!');
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
                if(!this.renewForm.endDate){
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
            handleAdd:function(){
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
                // if(!this.renewForm.saler){
                //     this.$Notice.error({
                //         title:'请先选择销售员'
                //     });
                // }
                if(!this.renewForm.endDate){
                    this.$Notice.error({
                        title:'请先选择续租结束时间'
                    });
                    return
                }
                if(!this.selecedStation.length){
                    this.$Notice.error({
                        title:'请先选择续租工位'
                    });
                    return
                }
                this.index++;
                this.renewForm.items.push({
                    value: '',
                    index: this.index,
                    status: 1,
                    type:''
                });
            },
            deleteDiscount:function(){
                let items = this.renewForm.items;
                let select = []
                select = items.map((item)=>{
                    return item.selelct;
                })
                items = items.filter(function(item, index) {
                    if (item.select) {
                        return false;
                    }
                return true;
                });
                this.renewForm.items = items;

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
                // this.selecedStation = stationVos;
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
            selectDiscount:function(){

            },
            submitStation:function(){

                 let end = this.selecedArr[0].startDate;
                this.renewForm.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(end));
                this.getStationAmount()
            },
            getStationAmount(){

                let val = this.selecedArr;
               
                let station = val.map(item=>{
                    let obj = item;
                    obj.originalPrice = item.price;
                    obj.seatId = item.id || item.seatId;
                    obj.floor = item.whereFloor;
                    obj.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(item.startDate));
                    obj.endDate =this.renewForm.endDate;
                    return obj;
                })
                let params = {
                    leaseEnddate:this.renewForm.startDate,
                    leaseBegindate:this.renewForm.endDate,
                    // communityId:this.renewForm.communityId,
                    communityId:4,
                    seats:JSON.stringify(station)
                }
                let _this = this;
                if(val.length){
                    axios.post('get-station-amount', params, r => {
                        _this.selecedStation = r.data.seats;
                        _this.renewForm.rentAmount = r.data.totalrent;

                    }, e => {

                        console.log('error',e)
                    })
                }
            },
            cancelStation:function(){
                this.selecedStation = this.selecedStation.map(item=>{
                    let obj =item
                    obj.time = +new Date()
                    return obj;
                })
            },
            onStationChange:function(val){
                this.selecedArr = val;
            },
             getRenewStation(){
                // let params = {
                //     customerId:this.renewForm.customerId,
                //     communityId:this.renewForm.communityId
                // };
                let params = {
                    //假数据
                    customerId:1,
                    communityId:4
                };
                let _this = this;
                axios.get('get-reduce-station', params, r => {
                    r.data = r.data.map(item=>{
                        let obj = item;
                        obj.originStart = item.startDate;
                        obj.originEnd = item.endDate;
                        return obj;
                    })
                    _this.stationList = r.data
                }, e => {

                    console.log('error',e)
                })

            },

                    
               
        }
    }
</script>