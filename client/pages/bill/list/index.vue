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

<template>
<div class="g-bill">
    <SectionTitle label="已出账单管理"></SectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="onBillPay">批量结算</Button>
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
        <Table  border :columns="columns1" :data="billList" @on-select="onSelectList" ></Table>
        <div style="margin: 10px;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
            <div style="float: right;">
                <Page 
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
        <HighSearch  v-on:formData="getSearchData"></HighSearch>
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
    <!-- <Modal
        v-model="openAntiSettle"
        title="反结账提示"
        ok-text="确定"
        cancel-text="取消"
        width="443"
     >
       <antiSettlement 
            :detail="itemDetail"
            v-on:formData="getAntiSettleData"
        > </antiSettlement>
        <div slot="footer">
            <Button type="primary" @click="antiSettleSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showAntiSettle">取消</Button>
        </div>
    </Modal> -->
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
        v-on:changeOpen="onChangeOpen"
    ></Message>
</div>
</template>


<script>
import HighSearch from './highSearch';
import settleAccounts from './settleAccounts';
//import antiSettlement from './antiSettlement';
import dateUtils from 'vue-dateutils';
import SectionTitle from '~/components/SectionTitle';
import Message from '~/components/Message';
import CommonFuc from '~/components/CommonFuc';

    export default {
        name: 'Bill',
        components:{
            HighSearch,
            settleAccounts,
            //antiSettlement,
            SectionTitle,
            Message
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
                tabParams:{
                    page:1,
                    pageSize:15,
                },
                openMessage:false,
                warn:'',
                MessageType:'',
                customerName:'',
                columns1: [
                    {
                        type: 'selection',
                        width: 35,
                        align: 'center'
                    },
                    {
                        title: '账单编号',
                        key: 'billNo',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        width:100
                    },
                    {
                        title: '账单类型',
                        key: 'bizType',
                        align:'center',
                        width:90,
                        render(h, obj){
                            if(obj.row.bizType==='MEETING'){
                                return '会议室账单';
                            }else if(obj.row.bizType==='PRINT'){
                                return '打印服务账单 ';
                            }else if(obj.row.bizType==='CONTRACT'){
                                return '工位服务订单';
                            }
                        }
                    },
                    {
                        title: '账单总额',
                        key: 'totalAmount',
                        align:'center',
                        width:80,
                    },
                    {
                        title: '应付金额',
                        key: 'payableAmount',
                        align:'center',
                        width:80,
                    },
                    {
                        title: '账单日',
                        key: 'billingDate',
                        align:'center',
                        width:90,
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
                        width:90,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.billEndTime));
                            return time;
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        width:90,
                        render(h, obj){
                                if(obj.row.payStatus==='WAIT'){
                                    return h('span', { 
										style: {
											color:'#FF6868'
										}       
                                    }, '待付款');
                                   
                                }else if(obj.row.payStatus==='PAID'){
                                    return h('span', { 
										style: {
											color:'#666666'
										}       
                                    }, '已付款');
                                    
                                }else if(obj.row.payStatus==='PAYMENT'){
                                    return h('span', { 
										style: {
											color:'#F5A623'
										}       
                                    }, '未付清');
                                    
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
                                                        this.showSettle(params.row)
                                                    }
                                                }
                                            }, '结账'),
                                            // h('Button', {
                                            //     props: {
                                            //         type: 'text',
                                            //         size: 'small'
                                            //     },
                                            //     style: {
                                            //         color:'#2b85e4'
                                            //     },
                                            //     on: {
                                            //         click: () => {
                                            //             this.showAntiSettle(params.row)
                                            //         }
                                            //     }
                                            // }, '反结账')
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
                                            }, '查看')
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
                                            h('Button', {
                                                props: {
                                                    type: 'text',
                                                    size: 'small'
                                                },
                                                style: {
                                                    color:'#2b85e4'
                                                },on: {
                                                    click: () => {
                                                        this.showSettle(params.row)
                                                    }
                                                }
                                            }, '结账')
                                        ]);
                            }
                        }
                    }
                ]
                
            }
        },
        mounted:function(){
            this.getTableData(this.tabParams);
        },
        methods:{
            showSearch (params) {
                 CommonFuc.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            openView(params){
                location.href=`./list/detail/${params.billId}`;
            },
            showSettle (params) {
                this.itemDetail=params;
                this.openSettle=!this.openSettle;
            },
            // showAntiSettle(params){
            //     this.itemDetail=params;
            //     this.openAntiSettle=!this.openAntiSettle;
            // },
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
                this.$http.get('get-bill-list', params, r => {
                    this.billList=r.data.items;
                    this.totalCount=r.data.totalCount;
                    this.openSearch=false;
                }, e => {
                    console.log('error',e)
                })
            },
            onBillPay(){
                if(this.billIds.length<=0){
                     this.openClose=true; 
                     return;  
                }
                let params={
                    billIds:JSON.stringify(this.billIds)
                }
                this.$http.post('batch-pay',params, r => {
                    if(r.code==-1){
                        this.MessageType="error";
                        this.warn=r.message;
                        this.openMessage=true;
                        return;
                    }
                    this.MessageType="success";
                    this.warn="结算成功！"
                    this.openMessage=true;
                    this.getTableData(this.tabParams);
                }, e => {
                    console.log('error',e)
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
                this.$http.post('bill-pay',params, r => {
                    if(r.code==-1){
                        this.MessageType="error";
                        this.warn=r.message;
                        this.openMessage=true;
                        return;
                    }
                    this.openSettle=false;
                    this.MessageType="success";
                    this.warn="结算成功！"
                    this.openMessage=true;
                    this.getTableData(this.tabParams);
                }, e => {
                    
                })
            },
            // antiSettleSubmit(){
            //     let params={
            //         amount:this.antiSettleData,
            //         billId:this.itemDetail.billId
            //     }
            //     this.$http.post('bill-release',params, r => {
            //         if(r.code==-1){
            //             this.MessageType="error";
            //             this.warn=r.message;
            //             this.openMessage=true;
            //             return;
            //         }
            //         this.openAntiSettle=false;
            //         this.MessageType="success";
            //         this.warn="反结算成功"
            //         this.openMessage=true;
            //         this.getTableData(this.tabParams);
            //     }, e => {
            //         console.log('11111')
            //     })
            // },
            searchSubmit(){
                this.getTableData(this.searchData)
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            lowerSubmit(){
                this.tabParams.customerName=this.customerName;
                this.getTableData(this.tabParams);
            },
            changePage(page){
               let Params={
                    page:page,
                    pageSize:this.pageSize
                }
                this.getTableData(Params);
            }
            
        }

    }
</script>