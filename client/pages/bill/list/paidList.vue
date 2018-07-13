<template>
<div class="g-bill">
    <div class="u-search" >
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
        <div  style="margin: 10px;overflow: hidden;">
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
        <HighSearch  
            @formData="getSearchData"  
            :typeList="typeList"
            :communityList="communityList"
        />
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
            SectionTitle,
            Message,
            Buttons,
            PdfDownload
        },
        props:{
            mask:String,
            billType:Array,
            typeList:Array,
            communityList:Array,
        },
        data () {
            return {
                totalCount:0,
                openSearch:false,
                billList:[],
                billIds:[],
                itemDetail:{},
                pageSize:15,
                page:1,
                queryParams:{},
                tabParams:{
                    page:1,
                    pageSize:15,
                    customerName:''
                },
                openMessage:false,
                warn:'',
                MessageType:'',
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
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                            let time = '-'
                            if(obj.row.billingDate){
                                time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billingDate));
                              
                            }
                            
                            return h('span', { 
                                style: {
                                    // color:'#FF6868'
                                }       
                            }, time);
                        }
                    },
                    {
                        title: '付款截止日期',
                        key: 'billEndTime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            
                            return h('span',{},time);
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
                        }
                    }
                ]
                
            }
        },
        created(){
             this.getTableData(this.$route.query);
             this.tabParams=this.$route.query;
        },
        mounted(){
              let mask=this.$route.query.mask;
            if(!mask||mask=='paid'){
               sessionStorage.setItem('paramsPaid',JSON.stringify(this.$route.query));
            }
            let jsonPaid=JSON.parse(sessionStorage.getItem('paramsPaid'));
            this.queryParams=Object.assign({},jsonPaid,{page:1,pageSize:15});
            this.getTableData(this.queryParams);
            this.tabParams=this.queryParams;
        },
         watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='paid'){
                       this.getTableData(this.queryParams);
                       this.tabParams=this.tabParams;
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
              
                let bizType=this.billType;
                let billtype={
                        title: '账单类型',
                        key: 'bizType',
                        align:'center',
                        width:90,
                        render(h, obj){
                            return h('span',{},bizType[obj.row.bizType])
                        //   return bizType[obj.row.bizType];
                        }
                    }
                let arr=[].concat(this.columns);

                if(arr.length<13){
                   arr.splice(4, 0, billtype)
                }
                this.columns=[].concat(arr);
                
            },
            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            openView(params){
                window.open(`/bill/list/detail/${params.billId}`,'_blank');
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
           
            getSearchData(form){
                this.searchData=form;
            },
           
            searchSubmit(){
                this.tabParams=this.searchData;
                this.page=1;
                this.tabParams.page=1;
                this.tabParams.mask='paid';
                utils.addParams(this.tabParams);

            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            lowerSubmit(){
                let customerName=this.tabParams.customerName || '';
                this.page=1;
                this.tabParams={
                    page:1,
                    pageSize:15,
                    customerName:customerName,
                    mask:'paid'
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
