<style lang="less"> 
.g-order{
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
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .u-cancel-title{
        width:85%;
        margin:10px auto;
        font-size:14px;
        text-indent: 28px;
    }
    .u-txt-red{
	    color:#FF6868;
	}
    .u-txt{
        color:#666;
    }
    .u-txt-orange{
        color: #F5A623;
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
  width:310px;
  margin:25px auto 0;      
   
}
</style>
<template>
<div class="g-order">
    <sectionTitle label="回款管理"></sectionTitle>
    <div class="u-search" >
        <Button type="primary">导入回款明细</Button>
        <span class="u-high-search" @click="showSearch"></span>   
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page :total="totalCount" :pageSize="pageSize" @on-change="changePage" show-total show-elevator></Page>
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
        <HighSearch  v-on:formData="getSearchData"></HighSearch>
    </Modal>
    <Modal
        v-model="openBind"
        title="绑定客户"
        ok-text="确定"
        cancel-text="取消"
        width="490"
        @on-ok="bindSubmit"
     >
        <div class="u-cancel-title">
            <Form  :model="formItem" label-position="left"  :label-width="60"  class="u-bind u-clearfix">
                <FormItem label="客户名称">
                    <searchCompany
                        v-model="formItem.customerId" 
                        style="width: 250px"
                        :onchange="onchange"
                    ></searchCompany>
                </FormItem>
            </Form>
        </div>
    </Modal>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        v-on:changeOpen="onChangeOpen"
    ></Message>
</div>
</template>


<script>
import axios from 'kr/axios';
import sectionTitle from '~/components/sectionTitle';
import dateUtils from 'vue-dateutils';
import HighSearch from './highSearch';
import searchCompany from '~/components/searchCompany';
import Message from '~/components/Message';

export default {
        name: 'receive',
        components:{
            sectionTitle,
            HighSearch,
            searchCompany,
            Message
        },
        data () {
            return {
                openSearch:false,
                openBind:false,
                tableData:[],
                totalCount:1,
                pageSize:15,
                params:{
                    page:1,
                    pageSize:15
                },
                formItem:{
                    customerId:'',
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                columns: [
                    {
                        title: '交易流水号',
                        key: 'tradeNo',
                        align:'center',
                        width:130
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                         width:190,
                    },
                    {
                        title: '回款日期',
                        key: 'ctime',
                        align:'center',
                        width:130,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '回款金额（元）',
                        key: 'amount',
                        align:'center'
                    },
                    
                    {
                        title: '回款方式',
                        key: 'payWay',
                        align:'center',
                        render(h, obj){
                            if(obj.row.payWay==='ALIAPPPAY'){
                                return <span class="u-txt">支付宝app</span>;
                            }else if(obj.row.payWay==='ALIWEBPAY'){
                                return <span class="u-txt">支付宝网银</span>;
                            }else if(obj.row.payWay==='WXPAY'){
                                return <span class="u-txt">微信</span>;
                            }else if(obj.row.payWay==='BANKONLINE'){
                                return <span class="u-txt">网银</span>;
                            }else if(obj.row.payWay==='BANKTRANSFER'){
                                return <span class="u-txt">银行转账</span>;
                            }
                        }
                    },
                    {
                        title: '付款账户',
                        key: 'payAccount',
                        align:'center',
                        width:120,
                        
                    },
                    {
                        title: '收款账户',
                        key: 'receiveAccount',
                        align:'center',
                        width:120
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:110,
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
                                            this.bindPerson(params.row);
                                        }
                                    }
                                }, '绑定客户')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.getTableData(this.params);
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(params){
                
                location.href=`./payment/detail/${params.id}`;
               
            },
            bindPerson (params) {
                this.itemDetail=params;
                this.openBind=true;
            },
            onExport(){
                 console.log('导出')
            },
            getTableData(params){
                axios.get('get-payment-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                }, e => {
                    console.log('error',e)
                })
            },
            changePage (index) {
                this.params={
                    page:index,
                    pageSize:15
                }
                this.tableData = this.getTableData(this.params);
            },
             onchange(data){
                this.formItem.customerId=data;
            },
            bindSubmit(){
                this.formItem.paymentId=this.itemDetail.id;
                axios.post('payment-bind', this.formItem, r => {
                    if(r.code==-1){
                        this.MessageType="error";
                        this.warn=r.message;
                        this.openMessage=true;
                        return;
                    }
                    this.MessageType="success";
                    this.warn="客户绑定成功！"
                    this.openMessage=true;
                    this.getTableData(this.params);
                })
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            getSearchData(form){
                this.searchData=form;
            },

        }

    }
</script>