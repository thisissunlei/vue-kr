<template>
<div class="g-bill">
    <div class="u-search" >
        <Buttons type="primary" label='批量结算' @click="onBillPay" checkAction='bill_batch_pay'/>
        <span class="u-high-search" @click="showSearch"></span> 
        <div style='display:inline-block;float:right;padding-right:20px;'>
            <Input 
                v-model="tabParams.customerName" 
                placeholder="请输入客户名称"
                style="width: 252px"
                @on-enter="lowerSubmit"
            />
            <div class='m-search' @click="lowerSubmit">搜索</div>
         </div>
          
    </div>
    <div class="u-table">
        <Table  border :columns="columns" :data="billList" @on-select="onSelectList"  @on-select-all="onSelectList"></Table>
        <div style="margin: 10px;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page 
                    :current="page"
                    :total="totalCount"
                    :page-size="pageSize" 
                    show-total 
                    show-elevator
                    @on-change="changePage"
                ></Page>
            </div>
        </div>
    </div>
     <Modal
        v-model="openSearch"
        title="高级查询"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <HighSearch  @formData="getSearchData"></HighSearch>
         <div slot="footer">
            <Button type="primary" @click="searchSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="openSettle"
        title="结账提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
       <settleAccounts 
            :detail="itemDetail"
        > </settleAccounts>
        <div slot="footer">
            <Button type="primary" @click="settleSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showSettle">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="openAntiSettle"
        title="反结算提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
       <antiSettlement 
            :detail="itemDetail"
            @formData="getAntiSettleData"
        > </antiSettlement>
        <div slot="footer">
            <Button type="primary" @click="antiSettleSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showAntiSettle">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="openClose"
        title="提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
      <p class="u-tip">请先选择结算数据！</p>
    </Modal>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>
    <Modal
        v-model="openDownload"
        title="下载pdf"
        ok-text="确定"
        cancel-text="取消"
        width="652"
     >
         <PdfDownload  @formData="getSealPrint" :isSeal="seal"/>
          <div class="spin-container" v-if="loading">
                <Spin size="large" fix></Spin>
          </div>
         <div slot="footer">
            <Button type="primary" @click="pdfDownload">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openDownloadDialog">取消</Button>
        </div>
    </Modal>
</div>
</template>


<script>
import HighSearch from './highSearch';
import settleAccounts from './settleAccounts';
import antiSettlement from './antiSettlement';
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Buttons from '~/components/Buttons';
import PdfDownload from './pdfDownload';

    export default {
        name: 'paid',
        components:{
            HighSearch,
            settleAccounts,
            antiSettlement,
            SectionTitle,
            Message,
            Buttons,
            PdfDownload
        },
        props:{
            mask:String
        },
        data () {
            return {
                totalCount:0,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                openClose:false,
                billList:[],
                billIds:[],
                itemDetail:{},
                pageSize:15,
                page:1,
                tabParams:{
                    page:1,
                    pageSize:15,
                    customerName:''
                },
                openMessage:false,
                warn:'',
                MessageType:'',
                billType:{},
                openDownload:false,
                printDetail:'',
                seal:'0',
                loading:false,
                columns: [
                    {
                        type: 'selection',
                        width: 35,
                        align: 'center',
                        fixed:'left'
                    },
                    {
                        title: '账单编号',
                        key: 'billNo',
                        align:'center',
                        width:160,
                        fixed:'left'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                        width:160,
                        fixed:'left'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '消费总额',
                        key: 'totalAmount',
                        align:'center',
                    },
                    {
                        title: '减免金额',
                        key: 'freeAmount',
                        align:'center',
                    },
                    {
                        title: '账单金额',
                        key: 'payableAmount',
                        align:'center',
                    },
                    {
                        title: '已付金额',
                        key: 'paidAmount',
                        align:'center',
                    },
                    {
                        title: '账单日',
                        key: 'billingDate',
                        align:'center',
                        render(h, obj){
                            if(!obj.row.billingDate){
                                return '-'
                            }
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billingDate));
                            return time;
                        }
                    },
                    {
                        title: '付款截止日期',
                        key: 'billEndTime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            return time;
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                             switch (obj.row.payStatus){
                                case 'WAIT':
                                        return h('span', { 
                                            style: {
                                                color:'#FF6868'
                                            }       
                                        }, '待付款');
                                break;
                                case 'PAID':
                                        return h('span', { 
                                            style: {
                                                color:'#666666'
                                            }       
                                        }, '已付清');
                                break;
                                case 'PAYMENT':
                                        return h('span', { 
										style: {
											color:'#F5A623'
										}       
                                        }, '未付清');
                                break;
                             }
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:90,
                        render:(h,params)=>{
                            if(params.row.payStatus==='PAYMENT'){
                                 return h('div', [
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openView(params.row)
                                                    }
                                                }
                                            }, '查看'),
                                            h(Buttons, {
                                                props: {
                                                    type: 'text',
                                                    size: 'small',
                                                    checkAction:'bill_pay',
                                                    label:'结账',
                                                    styles:'color:#2b85e4;padding: 2px 7px;',
                                                },
                                               
                                                on: {
                                                    click: () => {
                                                        this.showSettle(params.row)
                                                    }
                                                }
                                            }),
                                            h(Buttons, {
                                                props: {
                                                    type: 'text',
                                                    size: 'small',
                                                    checkAction:'bill_back_pay',
                                                    label:'反结算',
                                                    styles:'color:#2b85e4;padding: 2px 7px;',
                                                },
                                                on: {
                                                    click: () => {
                                                        this.showAntiSettle(params.row)
                                                    }
                                                }
                                            }),
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openDownloadDialog(params.row)
                                                    }
                                                }
                                            }, '下载')
                                        ]);  
                            }else if(params.row.payStatus==='PAID'){
                                return h('div', [
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openView(params.row)
                                                    }
                                                }
                                            }, '查看'),
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openDownloadDialog(params.row)
                                                    }
                                                }
                                            }, '下载')
                                        ]);
                            }else if(params.row.payStatus==='WAIT'){
                                return h('div', [
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openView(params.row)
                                                    }
                                                }
                                            }, '查看'),
                                            h(Buttons, {
                                                props: {
                                                    type: 'text',
                                                    size: 'small',
                                                    checkAction:'bill_pay',
                                                    label:'结账',
                                                    styles:'color:#2b85e4;padding: 2px 7px;',
                                                },
                                                on: {
                                                    click: () => {
                                                        this.showSettle(params.row)
                                                    }
                                                }
                                            }),h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.openDownloadDialog(params.row)
                                                    }
                                                }
                                            }, '下载')
                                        ]);
                            }
                        }
                    }
                ]
                
            }
        },
        created(){
             this.getTableData(this.$route.query);
             if(!this.$route.query.customerName){
                 this.$route.query.customerName=""
             }
             this.tabParams=this.$route.query;
             
        },
         watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='paid'){
                      this.getTableData(this.params);
                    }
                }
            }
        },
        methods:{
            getSealPrint(seal){
                this.seal=seal;
            },
            //下载电子账单
            pdfDownload(){
                let params={
                    billId:this.printDetail.billId,
                    seal:this.seal
                }
                this.loading=true;
                this.$http.post('bill-down-pdf',params, (response) => {
                    this.loading=false;
                    this.openDownloadDialog();
                    utils.downFile(response.data.pdfUrl);
                    
                    }, (error) => {
                        this.$Notice.error({
                            title:error.message||"后台出错请联系管理员"
                        });
                })   
               
                
            },
            //下载提示框
            openDownloadDialog(params){
                if(params){
                   this.printDetail=params;
                   this.seal="0";
                }
                 this.openDownload=!this.openDownload;
            },
            renderList(){
                this.getBillType();
                let bizType=this.billType;
                let billtype={
                        title: '账单类型',
                        key: 'bizType',
                        align:'center',
                        width:90,
                        render(h, obj){
                          return bizType[obj.row.bizType];
                        }
                    }
                if(this.columns.length<13){
                    this.columns.splice(4, 0, billtype)
                }
                
            },
            getBillType(){
                this.$http.get('get-bill-type', '').then((res)=>{
                    res.data.enums.map((item)=>{
                         this.billType[item.code]=item.name;  
                    })
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },
            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            openView(params){
                window.open(`/bill/list/detail/${params.billId}`,'_blank');
            },
            showSettle (params) {
                params.btnType="Settle";
                this.itemDetail=params;
                this.openSettle=!this.openSettle;
            },
            showAntiSettle(params){
                this.itemDetail=params;
                this.openAntiSettle=!this.openAntiSettle;
            },
            onExport(){
                 console.log('导出')
            },
            onSelectList(data){
                let billIds=[];
                data.map((item)=>{
                    billIds.push(item.billId)
                })
                this.billIds=billIds;
            },
            getTableData(params){
                this.renderList()
                this.$http.get('get-bill-paid-list', params).then((res)=>{
                    this.billList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
                
            },
            onBillPay(){
                
                if(this.billIds.length<=0){
                     this.openClose=true; 
                     return;  
                }
                let billIds=this.billIds.join(',');
                let params={
                    billIds:this.billIds.join(',')
                }
                this.$http.post('batch-pay',params).then((res)=>{
                     if(res.code==-1){
                        this.MessageType="error";
                        this.warn=res.message;
                        this.openMessage=true;
                        return;
                    }
                    this.MessageType="success";
                    this.warn=`已成功结算${res.data.successNum}条,失败${res.data.errorNum}条`;
                    this.openMessage=true;
                    this.billIds=""
                    this.getTableData(this.tabParams);
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },
            
            getAntiSettleData(form){
                this.antiSettleData=form;
            },
            getSearchData(form){
                this.searchData=form;
            },
            settleSubmit(){
                let params={
                    billId:this.itemDetail.billId
                }
                this.$http.post('bill-pay',params).then((res)=>{
                    if(res.code==-1){
                        this.MessageType="error";
                        this.warn=res.message;
                        this.openMessage=true;
                        return;
                    }
                    this.openSettle=false;
                    this.MessageType="success";
                    this.warn="结算成功！"
                    this.openMessage=true;
                    this.getTableData(this.tabParams);
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
                
            },
            antiSettleSubmit(){
                let params={
                    billId:this.itemDetail.billId
                }
                this.$http.post('bill-release',params).then((res)=>{
                     if(res.code==-1){
                        this.MessageType="error";
                        this.warn=res.message;
                        this.openMessage=true;
                        return;
                    }
                    this.openAntiSettle=false;
                    this.MessageType="success";
                    this.warn="反结算成功"
                    this.openMessage=true;
                    this.getTableData(this.tabParams);
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                });
               
            },
            searchSubmit(){
                this.tabParams=this.searchData;
                this.page=1;
                this.tabParams.page=1;
                utils.addParams(this.tabParams);

            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            lowerSubmit(){
                let customerName=this.tabParams.customerName;
                this.page=1;
                this.tabParams={
                    page:1,
                    pageSize:15,
                    customerName:customerName
                }
                utils.addParams(this.tabParams);
            },
            changePage(page){
                this.tabParams.page=page;
                this.page=page;
                this.getTableData(this.tabParams);
            }
            
        }

    }
</script>

<style lang="less">
.g-bill{
    .spin-container{
        display: inline-block;
        width: 652px;
        height: 100px;
        position: relative;
       
    }
    .u-search{
            height:32px;
            margin:16px 0;
            padding:0 20px;
            .u-high-search{
                width:22px;
                height:22px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;
                float:right;
                cursor:pointer;

            }
    }
    .ivu-checkbox-wrapper{
        margin-right:0;
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }  
}
.u-tip{
        text-align: center;
        font-size:14px;
        margin-top: 34px;
        margin-bottom: 36px;
}
.m-search{
    color:#2b85e4; 
    display:inline-block;
    margin-left:10px;
    font-size:14px;
    cursor:pointer;
}


</style>
