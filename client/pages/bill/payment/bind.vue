<template>

<div class="g-order-payment">
    <div class="u-search" >
         <Buttons  label='导入回款明细' checkAction='payment_import' type="primary" @click="importDetail" />
          <Buttons  label='退款'  checkAction='payment_refund' type="primary" @click="onRefund" style="margin-left:20px;" />
          <Buttons  label='回款' checkAction='payment_add' type="primary" @click="onCollection" style="margin-left:20px;" />
        <span class="u-high-search" @click="showSearch"></span>
        <div style='display:inline-block;float:right;padding-right:20px;'>

            <Input
                v-model="params.customerName"
                placeholder="请输入客户名称"
                style="width: 252px"
                @on-enter="lowerSubmit"
            />

            <div class='m-search' @click="lowerSubmit">搜索</div>
         </div>
    </div>

    <div class="u-table">
        <Table border  :columns="columns" :data="tableData" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page
                    :current="page"
                    :total="totalCount"
                    :page-size="pageSize"
                    @on-change="changePage"
                    show-total
                    show-elevator
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
    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>

    <Modal
        v-model="openImport"
        title="导入回款明细"
        ok-text="确定"
        cancel-text="取消"
        width="500"
     >
        <div class="u-upload-title">
            <Upload
                ref="upload"
                name="file"
                :before-upload="handleUpload"
                action="/api/krspace-pay/pay-record/importBankFlow"
                :with-credentials="IsCookie"
            >
                <div class="u-upload-content">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>请选择上传文件</p>
                    <div class="u-upload-file-name" v-if="file !== null"> {{ file.name }}</div>
                </div>
            </Upload>
        </div>
         <div slot="footer">
            <Button type="primary" :disabled="submitDisabled"   @click="importSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="importDetail">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="ifInvoice"
        title="开票"
        ok-text="确定"
        cancel-text="取消"
        width="500"
     >
        <div class="u-upload-title">
             <Form ref="formItem" :model="forms" :rules="rule" >
                <FormItem label="开票内容"  prop="invoiceContent" style="width:450px;margin-left:25px;">
                        <Input v-model="forms.invoiceContent" type="textarea" :maxlength="maxlength" :rows="4" placeholder="开票内容" />
                </FormItem>
            </Form>
        </div>
         <div slot="footer">
            <Button type="primary" @click="invoiceSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openInvoice">取消</Button>
        </div>
    </Modal>
</div>

</template>


<script>


import dateUtils from 'vue-dateutils';
import HighSearch from './highSearch';
import SearchCompany from '~/components/SearchCompany';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import SelectCommunitiy from '~/components/SelectCommunitiy';
import Buttons from '~/components/Buttons';

export default {
        name: 'receive',
        components:{
            HighSearch,
            SearchCompany,
            Message,
            SelectCommunitiy,
            Buttons
        },
        props:{
            mask:String
        },
        head () {
            return {
                title: "回款管理"
            }
        },
        data () {
            return {
                form:'form',
                openSearch:false,
                openImport:false,
                ifInvoice:false,
                tableData:[],
                totalCount:1,
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15,
                    customerName:'',
                },
                formItem:{
                    customerId:'',
                    communityId:''
                },
                forms:{
                    invoiceContent:''
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                file: null,
                IsCookie:true,
                maxlength:500,
                paymentId:'',
                submitDisabled:false,
                columns: [
                    {
                        title: '交易流水号',
                        key: 'tradeNo',
                        align:'center',
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '回款日期',
                        key: 'occurDate',
                        align:'center',
                        width:100,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.occurDate));
                            
                            return h('span',{},time);
                        }
                    },
                    {
                        title: '回款金额（元）',
                        key: 'amount',
                        align:'center',
                    },

                    {
                        title: '支付方式',
                        key: 'payWay',
                        align:'center',
                        width:110,
                        render(h, obj){
                            let payWay={
                              'NONE':'社区变更',
                              'BANKTRANSFER':'银行转账',
                              'ALIAPPPAY':'支付宝app',
                              'WXPAY':'微信',
                              'DEP_RENT':'押金转租',
                              'TRANSFER':'转移',
                              'RENT_DEP':'租金转押',
                              'ALIWEBPAY':'支付宝网银',
                              'BANKONLINE':'网银',
                              'BANLANCE':'余额支付',
                              'FUNDS_TRANSFER ':'资金转移',
                              
                            }
                             return h('span',{},payWay[obj.row.payWay]);
                        }
                    },
                    {
                        title: '付款账户',
                        key: 'payAccount',
                        align:'center',

                    },
                    {
                        title: '付款方名称',
                        key: 'payerName',
                        align:'center',
                    },
                    {
                        title: '收款账户',
                        key: 'receiveAccount',
                        align:'center',
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:100,
                        render:(h,params)=>{
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
                                            this.openView(params.row);
                                        }
                                    }
                                }, '查看'),
                                
                                h(Buttons, {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        checkAction:'payment_invoice',
                                        label:'开票',
                                        styles:'color:#2b85e4;padding: 2px 7px;',
                                    },
                                    on: {
                                        click: () => {
                                            this.openInvoice(params.row);
                                        }
                                    }
                                })
                                
                            ]);
                        }
                    }
                ],
                rule:{
                    invoiceContent: [
                        { required: true, message: '请填写开票内容'}
                    ],
                }

            }
        },
        created(){
             this.getTableData(this.$route.query);
             this.params=this.$route.query;
        },
        watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='bind'){
                      this.getTableData(this.params);
                    }
                }
            }
        },
        methods:{
            openInvoice(params){
                if(params){
                     this.paymentId=params.id;
                     this.forms.invoiceContent=params.invoiceContent;
                }
                this.ifInvoice=!this.ifInvoice
            },
            onRefund(){
                window.open('./payment/refund','_blank');
            },
            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            invoiceSubmit(){
                this.forms.paymentId=this.paymentId;

                this.$http.post('payment-invoice', this.forms).then((res)=>{
                    this.openInvoice();
                    this.$Notice.success({
                        title:'开票成功'
                    });
                    this.getTableData(this.params);
                    
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },
            openView(params){
                window.open(`/bill/payment/detail/${params.id}`,'_blank');
            },

           

            onExport(){
                 console.log('导出')
            },

            getTableData(params){
                this.$http.get('get-payment-list', params).then((res)=>{
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                    this.tableData=res.data.items;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },

           
            onChangeOpen(data){
                this.openMessage=data;
            },

            getSearchData(form){
                this.searchData=form;
            },

            searchSubmit(){
                this.params=this.searchData;
                this.page=1;
                this.params.page=1;
                utils.addParams(this.params);
            },

            lowerSubmit(){
                this.page=1;
                this.params={
                    page:1,
                    pageSize:15,
                    customerName:this.params.customerName || ''
                }
                utils.addParams(this.params);
            },

            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },

            handleUpload (file) {
                console.log(file,"kkkk")
                this.file = file;
                return false;
            },

            importDetail(){
                this.$refs.upload.clearFiles();
                this.file =null;
                this.openImport=!this.openImport;
            },
            importSubmit(){
                var data=new FormData();
             
                this.submitDisabled=true;
                data.append('file',this.file);
                data.isPut = true;
                console.log(data,"===",this.file)
                this.$http.put('import-bank-flow', data).then((res)=>{
                    this.openMessage=true;
                    this.submitDisabled=false;
                    if(res.code==-1){
                        this.MessageType="error";
                        this.warn=res.message;
                        return;
                    }
                    if(res.data.errorNum>0){
                        this.MessageType="error";
                    }else{
                        this.MessageType="success";
                    }
                    this.warn=`已成功导入交易流水<span class="u-txt-green">${res.data.successNum}</span>条,失败<span class="u-txt-red">${res.data.errorNum}</span>条`;
                    this.openImport=false;
                    this.getTableData(this.params);
                }).catch((err)=>{
                    this.submitDisabled=false;
                    this.$Notice.error({
						title:err.message
					});
                })

            },
            onCollection(){
                window.open('./payment/collection','_blank');
            }




        }

    }
</script>
<style lang="less">

.g-order-payment{
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

        }
        .m-search{
            color:#2b85e4;
            display:inline-block;
            margin-left:10px;
            font-size:14px;
            cursor:pointer;
        }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
        th,td{
            &:nth-child(8){
                min-width:120px;
            }
        }
    }
    .u-cancel-title{
        width:85%;
        margin:10px auto;
        font-size:14px;
        text-indent: 28px;
    }
    .u-clearfix { zoom:1; }
    .u-clearfix:after {
        clear: both;
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
    }

}
.u-bind{
  width:330px;
  margin:25px auto 0;
}
.u-upload-title{
    width:500px;
    div{
        width:97%;
    }
    .u-upload-content{
        width:94px;
        height:110px;
        margin:25px auto 0;
        i{
            text-indent: 19px;
        }
    }
}
</style>
