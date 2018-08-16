

<template>	
    <div class="balance">
		<div class="title-type">余额总汇表</div>
        <Table  border :columns="allColumns" class="table-style" :data="summaryData"/>

		<div class="title-type" style="margin-top:30px">余额变化明细表</div>
        <div class="search">
            <Form ref="searchForm" :model="searchForm"  inline :label-width="80">
                <FormItem label="社区名称" style="text-align:left">
                    <Select v-model="searchForm.communityId" clearable style="width:200px;text-align:left">
                        <Option v-for="item in options" :value="item.id" :key="item.name">{{ item.name }}</Option>
                    </Select>
                    <!-- <selectCommunities test="searchForm" :onchange="changeCommunity" /> -->
                </FormItem>
                <FormItem label="操作类型">
                <Select v-model="searchForm.operateType" clearable style="width:130px;text-align:left">
                    <Option v-for="item in operateType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </FormItem>
                <FormItem label="操作时间" style="position: relative;">
                   <DatePicker type="date" v-model="searchForm.startDate" placeholder="开始时间" style="width: 130px"></DatePicker>
                   <span style="margin:0 10px">至</span>
                   <DatePicker type="date" v-model="searchForm.endDate" placeholder="结束时间" style="width: 130px"></DatePicker>
                <div class="error" v-if="timeError != false" >{{timeError}}</div>


                </FormItem>
                <!-- <FormItem style="width:100px"> -->
                    <Button type="primary" @click="searchSubmit('searchForm')" >查询</Button>
                <!-- </FormItem> -->
            </Form>
        </div>
		<Table  border :columns="detailColumns" :data="detailList"></Table>
        
        <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                     <Page :total="totalCount" :page-size='15' show-total show-elevator @on-change="changePage" :current.sync="page"/>
                </div>
        </div>
         <Modal
                v-model="openBalance"
                title="转余额"
                width="500"
            >
                <ChangeBalance ref="changeBalance" :editData="editData" v-if="openBalance == true" @sync-data="syncData" :type="balanceType"/>
            <div slot="footer">
                <Button type="primary"  @click="submitBalance('balance')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeModal">取消</Button>
            </div>
        </Modal>
        <Modal
                v-model="openBusiness"
                title="转营业外"
                width="500"
            >
                <ChangeBalance ref="changeBusiness" :editData="editData" v-if="openBusiness == true" @sync-data="syncData" :type="balance"/>
            <div slot="footer">
                <Button type="primary"  @click="submitBusiness('balance')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeModal">取消</Button>
            </div>
        </Modal>
        <Modal
                v-model="openCommunity"
                title="转社区"
                width="500"
            >
                <ChangeCommunity ref="changeCommunity" :editData="editData" v-if="openCommunity == true" @sync-data="syncData"/>
            <div slot="footer">
                <Button type="primary"  @click="submitChangeCommunity('community')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="closeModal">取消</Button>
            </div>
        </Modal>
    </div>
	

</template>

<script>
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import selectCommunities from '~/components/SelectCommunities.vue';
import dateUtils from 'vue-dateutils';
import ChangeCommunity from './changeCommunity.vue';
import ChangeBalance from './changeBalance.vue';
	export default {
		components:{
            ChangeCommunity,
            ChangeBalance,
            selectCommunities
		},
		data (){
            let {params}=this.$route;
			return{
                balance:'',
                options:[],
                updateTime:new Date(),
                customerId:params.customer,
                // 弹窗传回的数据
                submitData:{},
                detailList:[],
                searchForm:{
                    pageSize:15,
                    page:1,
                    customerId:params.customer,
                    operateType:'',
                },
                // 汇总数据
                summaryData:[],
                page:1,
                totalCount:1,
                // 操作类型
                operateType:[{
                    label:'打款',
                    value:'RECHARGE'
                },{
                    label:'支付账单',
                    value:'PAY_BILL'
                },{
                    label:'退款',
                    value:'REFUND'
                },{
                    label:'转余额',
                    value:'BACK'
                },{
                    label:'冻结押金',
                    value:'LOCK_DESPOINT'
                },{
                    label:'转营业外收入',
                    value:'INCOME'
                },{
                    label:'转社区',
                    value:'TRANSFER'
                },{
                    label:'冻结押金支出',
                    value:'LOCK_DESPOINT_FREE'
                }],
				allColumns:[
                    {
                        title: '序号',
                        key: 'id',
                        width:100,
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '余额（元）',
                        key: 'balance',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand((params.row.balance/100).toFixed(2)))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转社区',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                 this.transferCommunity(params.row)
                                            }
                                        }
                                }),tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转营业外',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferOutsideBusiness('balance',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '可用服务保证金（元）',
                        key: 'depositFree',
                        align:'center',
                        render:(tag,params)=>{
                           let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand((params.row.depositFree/100).toFixed(2)))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('depositFree',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);    
                        }
                    },
                    {
                        title: '服务保证金（元）',
                        key: 'deposit',
                        align:'center',
                        render:(tag,params)=>{
                           
                           return '￥'+utils.thousand((params.row.deposit/100).toFixed(2));  
                        }
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'lockDeposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand((params.row.lockDeposit/100).toFixed(2)))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('lockDeposit',params.row)
                                            }
                                        }
                                }),tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转营业外',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferOutsideBusiness('lockDeposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '门禁卡保证金',
                        key: 'guardCardDeposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand((params.row.guardCardDeposit/100).toFixed(2)))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('guardCardDeposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    {
                        title: '其他类保证金',
                        key: 'otherDeposit',
                        align:'center',
                        render:(tag,params)=>{
                            let index = params.row._index;
                            var btnRender=[
                               tag('span', '￥'+utils.thousand((params.row.otherDeposit/100).toFixed(2)))];
                            if(index != 0){
                                btnRender.push(
                                    tag(Buttons, {
                                        props: {
                                            type: 'text',
                                            label:'转余额',
                                            checkAction:'customer_assets_button',
                                            styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                        },
                                        on: {
                                            click: () => {
                                                this.transferBalance('otherDeposit',params.row)
                                            }
                                        }
                                }))
                            }
                           
                           return tag('div',btnRender);  
                        }
                    },
                    ],
                detailColumns:[{
                    title: '序号',
                    key: 'id',
                    width:100,
                    align:'center',
                },{
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',
                },{
                    title: '操作类型',
                    key: 'operateTypeName',
                    align:'center',
                },{
                    title: '操作金额（元）',
                    key: 'changedAmount',
                    align:'center',
                    render:function(h,params){
                        return h('span',
                            {}
                        ,utils.thousand((params.row.changedAmount/100).toFixed(2)))
                        
                    }
                },{
                    title: '相关记录',
                    key: 'records',
                    align:'center',
                    render:function(h,params){
                        return h('span',{},params.row.records?params.row.records:'无')
                        
                    }
                },{
                    title: '操作时间',
                    key: 'ctime',
                    align:'center',
                    render:function(h,params){
                        return h('span',{},dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ctime)))
                        
                    }
                }],
                openBalance:false,//转余额弹窗
                openCommunity:false,//转社区弹窗
                openBusiness:false,//转营业外弹窗
                balanceType:'',
                editData:{},
                timeError:false,
			}
		},
		methods:{
            changePage(page){
                let form = this.searchForm;
                if(form.startDate){
                    form.startDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.startDate))
                }
                if(form.endDate){
                    form.endDate = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(form.endDate))
                }
                form.page = page;
                this.page = page;
                this.getBalanceDetail(form)
            },
            searchSubmit(name){
                this.checkTime()
                if(!this.timeError){
                    this.changePage(1)
                }
                
            },
            getBalanceList(){
                //获取账户余额的汇总信息
                let {params}=this.$route;
                let param = {
                    customerId:params.customer
                }
                
                this.$http.get('balance-list',param).then((res)=>{
                    this.summaryData = res.data
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            getBalanceDetail(param){
                //获取账户余额的明细表
                param = Object.assign({},this.searchForm,param)
                this.searchForm = param;
                this.$http.get('balance-detail',param).then((res)=>{
                    this.detailList = res.data.items;
                    this.totalCount = res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            transferCommunity(item){
                // 转社区
                console.log('转社区',item);
                this.editData = item;
                this.openCommunity = true;
            },
            transferOutsideBusiness(type,item){
                // 转营业外
                console.log('转营业外',item)
                this.editData = item;
                this.balanceType = type;
                this.balance = type;
                this.openBusiness = true;
            },
            transferBalance(type,item){
                // 转余额
                console.log('转余额-->item',item)
                console.log('转余额-->type',type)
                this.openBalance = true;
                this.balanceType = type;
                this.editData = item;
                
            },
            //转余额提交
            submitBalance(name){
                var balanceForm = this.$refs.changeBalance.$refs;
                var isSubmit = true;
                balanceForm[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }else{
                        let params = Object.assign({},this.submitData,{customerId:this.customerId})
                        let url = '';
                        switch (this.balanceType){
                            case 'guardCardDeposit':
                                url = 'guardcard-deposit';
                                break;
                            case 'otherDeposit':
                                url = 'other-deposit';
                                break;
                            case 'lockDeposit':
                                url = 'lock-deposit';
                                break;
                            case 'depositFree':
                                url = 'free-to-balance';
                                break; 
                            default :
                                url = '';
                                break;
                        }
                        // 提交数据
                        if(url === ''){
                            return;
                        }
                        
                        this.$http.post(url, params).then((res)=>{
                            // 关闭窗口
                           this.openBalance = false;
                           // 更新数据（1）公示数据（2）余额汇总3）余额明细
                           this.getBalanceList();
                           this.getBalanceDetail({page:1})
                           this.updateTime = new Date()
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })

                    }
                })
                
            },
            submitBusiness(name){
                var balanceForm = this.$refs.changeBusiness.$refs;
                var isSubmit = true;
                let url = '';
                switch (this.balanceType){
                    case 'lockDeposit':
                        url = 'lock-to-income';
                        break;
                    case 'balance':
                        url = 'nonoperating';
                        break;
                    default :
                        url = '';
                        break;
                }
                // 提交数据
                if(url === ''){
                    return;
                }
                balanceForm[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }else{
                        let params = Object.assign({},this.submitData,{customerId:this.customerId})
                        // 提交数据
                        this.$http.post(url, params).then((res)=>{
                           // 关闭窗口
                           this.openBusiness = false;
                           // 更新数据（1）公示数据（2）余额汇总3）余额明细
                           this.getBalanceList();
                           this.getBalanceDetail({page:1})
                           this.updateTime = new Date()
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })

                    }
                })
                
            },
            submitChangeCommunity(name){
                var communityForm = this.$refs.changeCommunity.$refs;
                var isSubmit = true;
                communityForm[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }else{
                        let params = Object.assign({},this.submitData,{customerId:this.customerId})
                        console.log('更改社区提交数据',params)
                        // 提交数据
                        this.$http.post('transfer-community', params).then((res)=>{
                            // 关闭窗口
                           this.openCommunity = false;
                           // 更新数据（1）公示数据（2）余额汇总3）余额明细
                           this.getBalanceList();
                           let searchForm = {page:1,communityId:'',startDate:'',endDate:'',operateType:''};
                           this.getBalanceDetail(searchForm)
                           this.updateTime = new Date()
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })

                    }
                })
            },
            closeModal(){
                this.openBalance = false;
                this.openBusiness = false;
                this.openCommunity = false;
            },
            syncData(data){
                console.log('syncData',data)
                this.submitData = data;
            },
            changeCommunity(value){
                if(value){
                    this.searchForm.communityId = value
                }else{
                    this.searchForm.communityId = ''
                }
            },
            checkTime(){
                if(!this.searchForm.startDate || !this.searchForm.endDate){
                    this.timeError = false;
                    return;
                }
                if(this.searchForm.startDate && this.searchForm.endDate){
                    let begin = new Date(this.searchForm.startDate).getTime();
                    let end = new Date(this.searchForm.endDate).getTime();

                    if(begin>end){
                        this.timeError = '结束时间不得大于开始时间'
                    }else{
                        this.timeError = false
                    }
                }
            },
            getComm(){
                this.$http.get('join-bill-community','').then((response)=>{    
                    let list = response.data.items;
                    list = list.map(item=>{
                        item.id = item.id+'';
                        return item;
                    })
                    this.options = list;
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    }) 
            }

		},
		mounted(){
			GLOBALSIDESWITCH('false');
            // 获取更新数据
            this.getBalanceList();
            this.getBalanceDetail()
            this.getComm()
		},
        watch:{
            updateTime(){
                this.$emit('update-data', new Date());
            }
        }
	
	}
</script>
<style lang="less" scoped>
    .balance{
        .title-type{
            font-size: 14px;
            color:#666;
            font-weight: 500;
        }
        .col{
                display: inline-block;
                padding-right: 10px;
                vertical-align:top;
        }
        .table-style{
            margin:20px 0;
        }
        .error{
            position: absolute;
            right: 0px;
            color:red;
        }
        .search{
            text-align: right;
            margin-top:-20px;
            margin-bottom: 10px
        }
    	padding:5px 20px;
    }
</style>