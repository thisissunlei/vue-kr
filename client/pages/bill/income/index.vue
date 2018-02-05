<style lang="less">

.g-bill{
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
     
    .m-search{
        color:#2b85e4; 
        display:inline-block;
        margin-left:10px;
        font-size:14px;
        cursor:pointer;
    } 
    
}
</style>

<template>
<div class="g-bill">
    <SectionTitle title="应收管理"></SectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="showIncome">挂收入</Button>
        <span class="u-high-search" @click="showSearch"></span>  
        <div style='display:inline-block;float:right;padding-right:20px;'>
            <Input 
                v-model="tabParams.customerName" 
                placeholder="请输入客户名称"
                style="width: 252px"
            ></Input>
            <div class='m-search' @click="lowerSubmit">搜索</div>
         </div> 
    </div>
    <div class="u-table">
        <Table  border :columns="columns1" :data="billList" ></Table>
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
        <HighSearch v-on:formData="getSearchData"></HighSearch>
        <div slot="footer">
            <Button type="primary" @click="searchSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
        </div>
    </Modal>
     <Modal
        v-model="openIncome"
        title="挂收入"
        ok-text="确定"
        cancel-text="取消"
        width="660"
     >
        <AddIncome v-on:formData="getAddData"></AddIncome>
        <div slot="footer">
            <Button type="primary" @click="addSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showIncome">取消</Button>
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
import HighSearch from './highSearch';
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import AddIncome from './addIncome';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
    export default {
        name: 'income',
        components:{
            HighSearch,
            SectionTitle,
            AddIncome,
            Message
        },
        data () {
            return {
                totalCount:0,
                openSearch:false,
                openSettle:false,
                openAntiSettle:false,
                openIncome:false,
                openMessage:false,
                warn:'',
                MessageType:'',
                pageSize:15,
                page:1,
                tabParams:{
                    page:1,
                    pageSize:15,
                    customerName:'',
                },
                billList:[],
                addData:{},
                callback:null,
                cancelCallback:null,
                incomeType:{},
                columns1: [
                    {
                        title: '收入编号',
                        key: 'id',
                        align:'center',
                        width:80
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '所在社区',
                        key: 'communityName',
                        align:'center',
                    },
                    {
                        title: '含税收入',
                        key: 'amount',
                        align:'center',
                        width:120,

                    },
                    {
                        title: '收入确认时间',
                        key: 'dealDate',
                        align:'center',
                        width:140,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.dealDate));
                            return time;
                        }
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
                                            this.openView(params.row)
                                        }
                                    }
                                }, '查看')
                            ]);  
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
        methods:{
            renderList(){
                this.getIncomeType();
                let incomeType=this.incomeType;
                let billtype= {
                        title: '收入类型',
                        key: 'incomeType',
                        align:'center',
                        width:120,
                        render(h, obj){
                            return incomeType[obj.row.incomeType]
                        }
                    };
                if(this.columns1.length<7){
                   this.columns1.splice(5, 0, billtype)
                }
                   
                
            },
            getIncomeType(){
                this.$http.get('get-fee-type', '').then((res)=>{
                    res.data.enums.map((item)=>{
                         this.incomeType[item.code]=item.name;  
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
                 window.open(`./income/detail/${params.id}`,'_blank');
            },
            onExport(){
                 console.log('导出')
            },
            showIncome(){
               utils.clearForm(this.addData);
               this.addData.startTime=new Date();
               this.openIncome=!this.openIncome;
               this.cancelCallback && this.cancelCallback();
            },
            getTableData(params){
                this.renderList();
                this.$http.get('get-income-list', params).then((res)=>{
                    this.billList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
			    });
            },
            getAddData(form,callback,cancel){
                this.addData=form;
                this.callback=callback;
                this.cancelCallback=cancel;
            },
            addSubmit(form){
              this.callback &&  this.callback((valid)=>{
                    if(valid){
                        this.add();
                    }
                })
            },
            add(){
                let params=this.addData;
                this.$http.post('add-income', params).then((res)=>{
                    this.openIncome=false;
                    if(res.code==-1){
                        this.MessageType="error";
                        this.warn=res.message;
                        this.openMessage=true;
                        return;
                    }
                    this.MessageType="success";
                    this.warn="挂收入成功！"
                    this.openMessage=true;
                    this.getTableData(this.tabParams);
                }).catch((error)=>{
                    this.$Notice.error({
                        title:error.message
                    });
			    });
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            getSearchData(form){
                this.searchData=form;
            },
            searchSubmit(){
                this.tabParams=this.searchData;
                this.tabParams.page=1;
                this.page=1;
                utils.addParams(this.tabParams);
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