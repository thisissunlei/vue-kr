<style lang="less"> 
.g-order{
  .u-search{
        height:32px;
        margin:16px 20px;
        span{
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
.u-cancel-title{
    width:334px;
    text-align: center;
    margin:40px auto 35px;
    font-size:14px;
}
</style>
<template>
<div class="g-order">
    <SectionTitle label="会议室订单管理"></SectionTitle>
    <div class="u-search" >
        <span @click="showSearch"></span> 
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
        <Table border  :columns="columns" :data="tableData"  stripe></Table>
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
        <HighSearch v-on:formData="getSearchData"></HighSearch>
        <div slot="footer">
            <Button type="primary" @click="searchSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="openCancel"
        title="提示信息"
        ok-text="确定"
        cancel-text="取消"
        width="490"
     >
        <div class="u-cancel-title">
            {{msg}}
        </div>
        <div slot="footer">
            <Button type="primary" @click="orderCancel">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
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
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';


export default {
        name: 'Meeting',
        components:{
            HighSearch,
            SectionTitle,
            Message
        },
        data () {
            return {
                openSearch:false,
                openCancel:false,
                totalCount:1,
                tableData:[],
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15
                },
                openMessage:false,
                warn:'',
                MessageType:'',
                customerName:'',
                msg:'',
                ifCancel:true,
                columns: [
                    {
                        title: '订单编号',
                        key: 'orderNo',
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
                        width:140,
                    },
                    {
                        title: '订单总额',
                        key: 'totalAmount',
                        align:'center',
                        width:100,
                    },
                    {
                        title: '订单生成时间',
                        key: 'createTime',
                        align:'center',
                        width:140,
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.createTime));
                            return time;
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderstatus',
                        align:'center',
                        width:100,
                        render(h, obj){
                            switch (data.incomeType){
                                case 'VALID':
                                return h('span', { 
                      										style: {
                      											color:'#666666'
                      										}       
                                        }, '已生效');
                                break;
                                case 'CANCEL':
                                return h('span', { 
                      										style: {
                      											color:'#F5A623'
                      										}       
                                        }, '已作废');
                                break;
                                case 'REFUND':
                                return h('span', { 
                      										style: {
                      											color:'#FF6868'
                      										}       
                                        }, '已退订');
                                break;
                            }
                           
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:110,
                        render:(h,params)=>{
                         if(params.row.ableToCancel=='1'){
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
                                            this.cancel(params.row)
                                                
                                        }
                                    }
                                }, '作废')
                            ]);  
                         }else if(params.row.ableToCancel=='0'){
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
                    }
                ]
                
            }
        },
        mounted:function(parms){
            this.getTableData(this.params);
        },
        methods:{
            showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
            },
            openView(params){
                location.href=`./list/detail/${params.orderId}`;
            },
            cancel (params) {

                this.$http.get('get-cancel-msg', {orderId:params.orderId}, r => {
                    this.msg=r.data.msg;
                    if(r.code=='2'){
                        this.ifCancel=false
                    }else{
                        this.ifCancel=true;
                    }
                }, e => {
                    console.log('error',e)
                })
                this.openCancel=!this.openCancel;
                this.itemDetail=params;
            },
            orderCancel(){
               
                if(!this.ifCancel){
                     this.openCancel=false;
                    return;
                }
            let itemDetail=this.itemDetail;
            let  params={
                    orderId:itemDetail.orderId
                }
                this.$http.post('cancel-order', params, r => {
                    if(r.code==-1){
                        this.MessageType="error";
                        this.warn=r.message;
                        this.openMessage=true;
                        return;
                    }
                    this.openCancel=false;
                    this.MessageType="success";
                    this.warn="作废成功!"
                    this.openMessage=true;
                    this.getTableData(this.params);
                }, e => {
                    console.log('error',e)
                })
            },
            onExport(){
                 console.log('导出')
            },
            getTableData(params){
                this.$http.get('order-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                    this.openSearch=false;
                }, e => {
                    console.log('error',e)
                })
            },
            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },
             getSearchData(form){
                this.searchData=form;
            },
             searchSubmit(){
                this.params=this.searchData;
                this.page=1;
                this.params.page=1;
                //utils.addParams(this.params);
                this.getTableData(this.params)
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            lowerSubmit(){
                this.page=1;
                this.params={
                    customerName:this.customerName,
                    page:1,
                    pageSize:15
                }
                //utils.addParams(this.params);
                this.getTableData(this.params);
            },

        }

    }
</script>