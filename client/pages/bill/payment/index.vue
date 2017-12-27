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

<template>

<div class="g-order">
    <SectionTitle label="回款管理"></SectionTitle>
    <div class="u-search" >
         <Button type="primary" @click="importDetail">导入回款明细</Button>
        <span class="u-high-search" @click="showSearch"></span>
        <div style='display:inline-block;float:right;padding-right:20px;'>

            <Input
                v-model="customerName"
                placeholder="请输入客户名称"
                style="width: 252px"
            ></Input>

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
        <HighSearch  v-on:formData="getSearchData"></HighSearch>
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

                 <FormItem label="所在社区" prop="communityId">
                    <SelectCommunities
                        :test="formItem"
                        style="width: 250px"
                        :onchange="onCommunityChange"
                    ></SelectCommunities>
                </FormItem>

                <FormItem label="客户名称" prop="customerId">
                    <SearchCompany
                        :test="formItem"
                        style="width: 250px"
                        :onchange="onchange"
                    ></SearchCompany>
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
        v-on:changeOpen="onChangeOpen"
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
                action="http://optest01.krspace.cn/api/krspace-pay/pay-record/importBankFlow"
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
            <Button type="primary" @click="importSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="importDetail">取消</Button>
        </div>
    </Modal>
</div>

</template>


<script>

import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import HighSearch from './highSearch';
import SearchCompany from '~/components/SearchCompany';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import SelectCommunities from '~/components/SelectCommunities';

export default {
        name: 'receive',
        components:{
            SectionTitle,
            HighSearch,
            SearchCompany,
            Message,
            SelectCommunities
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
                    pageSize:15
                },
                formItem:{
                    customerId:'',
                    communityId:''
                },
                openMessage:false,
                MessageType:'',
                warn:'',
                customerName:'',
                file: null,
                IsCookie:true,
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
                        title: '回款日期',
                        key: 'occurDate',
                        align:'center',
                        width:130,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.occurDate));
                            return time;
                        }
                    },
                    {
                        title: '回款金额（元）',
                        key: 'amount',
                        align:'center',
                        width:100,
                    },

                    {
                        title: '支付方式',
                        key: 'payWay',
                        align:'center',
                        width:110,
                        render(h, obj){
                            let payWay={
                              'ALIAPPPAY':'支付宝app',
                              'ALIWEBPAY':'支付宝网银',
                              'WXPAY':'微信',
                              'BANKONLINE':'网银',
                              'BANKTRANSFER':'银行转账',
                              
                            }
                            return payWay[obj.row.payWay]
                        }
                    },
                    {
                        title: '付款账户',
                        key: 'payAccount',
                        align:'center',

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
                          if(!params.row.customerId){
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
                          }else {
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
                                }, '查看')
                            ]);
                          }

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
                }

            }
        },
        created(){
             this.getTableData(this.$route.query);
        },
        methods:{

            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },

            openView(params){
                location.href=`./payment/detail/${params.id}`;
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
                this.$http.get('get-payment-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                    this.openSearch=false;
                }, e => {
                    console.log('error',e)
                })
            },

            onchange(data){
                this.formItem.customerId=data;
            },

            onCommunityChange(data){
                this.formItem.communityId=data;
            },

            bindSubmit(){

                this.$refs[this.form].validate((valid)=>{
                    if(valid){
                        this.formItem.paymentId=this.itemDetail.id;
                        this.$http.post('payment-bind', this.formItem, r => {
                            if(r.code==-1){
                                this.MessageType="error";
                                this.warn=r.message;
                                this.openMessage=true;
                                return;
                            }
                            this.openBind=false;
                            this.MessageType="success";
                            this.warn="客户绑定成功！"
                            this.openMessage=true;
                            this.getTableData(this.params);
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
                this.getTableData(this.params)
            },

            lowerSubmit(){
                this.page=1;
                this.params={
                    page:1,
                    pageSize:15,
                    customerName:this.customerName
                }
                utils.addParams(this.params);
                this.getTableData(this.params);
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
                this.$http.put('import-bank-flow', data, r => {
                    if(r.code==-1){
                        this.MessageType="error";
                        this.warn=r.message;
                        this.openMessage=true;
                        return;
                    }
                    this.openImport=false;
                    this.MessageType="success";
                    this.warn=`已成功导入交易流水${r.data.successNum}条,失败${r.data.errorNum}条`;
                    this.openMessage=true;
                   this.getTableData(this.params);
                })

            },
        }

    }
</script>
