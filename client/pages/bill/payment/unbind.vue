<template>

<div class="g-order-payment">
    <div class="u-search" >
        <!-- <span class="u-high-search" @click="showSearch"></span> -->
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

    <Modal
        v-model="openBind"
        title="绑定客户"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-cancel-title">

            <Form
                ref="form"
                :model="formItem"
                label-position="left"
                :label-width="80"
                class="u-bind u-clearfix"
                :rules="ruleValidate"
            >
                <FormItem label="客户名称" prop="customerId">
                    <SearchCompany
                        :test="formItem"
                        style="width: 250px"
                        :onchange="onchange"
                        v-if="openBind"
                    ></SearchCompany>
                </FormItem>

                 <FormItem label="所在社区" prop="communityId">
                    <SelectCommunitiy
                        :test="formItem"
                        style="width: 250px"
                        v-if="openBind"
                    ></SelectCommunitiy>
                </FormItem>

            </Form>

        </div>

        <div slot="footer">
            <Button type="primary" @click="bindSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="bindPerson">取消</Button>
        </div>

    </Modal>

    <Message
        :type="MessageType"
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>

   
    
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
        data () {
            return {
                form:'form',
                openSearch:false,
                openBind:false,
                openImport:false,
                tableData:[],
                totalCount:1,
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15,
                },
                formItem:{
                    customerId:'',
                    communityId:''
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                file: null,
                IsCookie:true,
                maxlength:500,
                paymentId:'',
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
                            let time=obj.row.occurDate?dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.occurDate)):'';
                            return h('span',{},time);
                            // return time;
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
                              'FUNDS_TRANSFER':'社区转移',
                              'CUSTOMER_TRANSFER':'客户转移'
                            }
                            return h('span',{},payWay[obj.row.payWay]);
                            // return payWay[obj.row.payWay]
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
                                            checkAction:'payment_bind',
                                            label:'绑定客户',
                                            styles:'color:#2b85e4;padding: 2px 7px;',
                                        },
                                        on: {
                                            click: () => {
                                                this.bindPerson(params.row);
                                            }
                                        }
                                    }),
                                    
                                    
                                ]);

                        }
                    }
                ],
                ruleValidate:{

                    customerId: [
                        { required: true, message: '请选择客户名称'}
                    ],

                    communityId: [
                        { required: true, message: '请选择所在社区'}
                    ],
                },
               

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
                    
                    if(nextProps.mask=='unbind'){
                      this.getTableData(this.params);
                    }
                }
            }
        },
        methods:{
            onRefund(){
                window.open('./payment/refund','_blank');
            },
            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            
            openView(params){
                window.open(`/bill/payment/detail/${params.id}`,'_blank');
            },

            bindPerson (params) {
                this.$refs[this.form].resetFields();
                this.itemDetail=params;
                utils.clearForm(this.formItem);
                this.openBind=!this.openBind;
            },

            onExport(){
                 console.log('导出')
            },

            getTableData(params){
                this.$http.get('get-payment-unbind-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.tableData.remark="将达到减肥坚实的解放军加速度绝地反击";
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
            },

            onchange(data){
                this.formItem.customerId=data;
            },
            bindSubmit(){

                this.$refs[this.form].validate((valid)=>{
                    if(valid){
                        this.formItem.paymentId=this.itemDetail.id;
                        this.$http.post('payment-bind', this.formItem).then((res)=>{
                            if(res.code==-1){
                                this.MessageType="error";
                                this.warn=res.message;
                                this.openMessage=true;
                                return;
                            }
                            this.openBind=false;
                            this.MessageType="success";
                            this.warn="客户绑定成功！"
                            this.openMessage=true;
                            this.getTableData(this.params);
                        }).catch((err)=>{
                             this.$Notice.error({
                                title:err.message
                            });
                        })
                    }
                });

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
            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },

            handleUpload (file) {
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
                data.append('file',this.file);
                this.$http.put('import-bank-flow', data).then((res)=>{
                    this.openMessage=true;
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
                    this.$Notice.error({
						title:err.message
					});
                })

            },
            onCollection(){
                window.open('/bill/payment/collection','_blank');
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
