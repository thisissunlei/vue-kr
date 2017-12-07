<template>
    <div class='m-bill-list'>
            <div style='text-align:right;margin-bottom:10px'>
               <div style='display:inline-block;margin:10px 20px;'>
                    <span style='padding-right:10px'>客户名称</span>
                    <i-input 
                        v-model="params.customerName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        @on-change="lowerChange"
                    ></i-input>
                </div>
                <div class='m-search' @click="lowerSubmit">搜索</div>
                <div class="m-bill-search" @click="showSearch">
                  <span></span>   
                </div> 
           </div>


            <Table :columns="joinOrder" :data="joinData"></Table>
            <div style="margin: 10px;overflow: hidden">
                    <Button type="primary" @click="outSubmit">导出</Button>
                    <div style="float: right;">
                        <Page :total="totalCount" @on-change="changePage" show-total show-elevator></Page>
                    </div>
            </div>
            <Modal
                v-model="openSearch"
                title="高级搜索"
                width="660"
            >
                <HeightSearch v-on:bindData="upperChange" mask='join'></HeightSearch>
                <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
                </div>
            </Modal>
            <Modal
                v-model="openNullify"
                title="提示信息"
                @on-ok="nullifySubmit"
                width="500"
            >
                <Nullify></Nullify>
            </Modal>
    </div>
</template>


<script>
    import axios from 'kr/axios';
    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    import dateUtils from 'vue-dateutils';
    import CommonFuc from '~/components/commonFuc';
    

    export default {
        name:'join',
        props:['mask'],
        components:{
            HeightSearch,
            Nullify
        },
        data () {
            
            return {
                upperData:{},
                upperError:false,
                totalCount:1,
                params:{
                    page:1,
                    pageSize:15,
                    customerName:"",
                },
                joinData:[],
                openSearch:false,
                openNullify:false,
                joinOrder: [
                    {
                        title: '订单编号',
                        key: 'orderNum',
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
                        align:'center'
                    },
                    {
                        title: '服务费总额',
                        key: 'rentAmount',
                        align:'center'
                    },
                    {
                        title: '履约保证金',
                        key: 'depositAmount',
                        align:'center'
                    },
                    {
                        title: '订单类型',
                        key: 'orderType',
                        align:'center',
                        render(h, obj){
                            if(obj.row.orderType==='IN'){
                                return <span class="u-txt">入驻服务订单</span>;
                            }else if(obj.row.orderType==='INCREASE'){
                                return <span class="u-txt-orange">增租服务订单</span>;
                            }else if(obj.row.orderType==='CONTINUE'){
                                return <span class="u-txt-red">续租服务订单</span>;
                            }
                        }
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.orderStatus==='NOT_EFFECTIVE'){
                                return <span class="u-txt">未生效</span>;
                            }else if(obj.row.orderStatus==='EFFECTIVE'){
                                return <span class="u-txt-orange">已生效</span>;
                            }else if(obj.row.orderStatus==='INVALID'){
                                return <span class="u-txt-red">已作废</span>;
                            }
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'payStatus',
                        align:'center',
                        render(h, obj){
                            if(obj.row.payStatus==='WAIT_PAY'){
                                return <span class="u-txt">待支付</span>;
                            }else if(obj.row.payStatus==='COMPLETE'){
                                return <span class="u-txt-orange">已付清</span>;
                            }else if(obj.row.payStatus==='UN_COMPLETE'){
                                return <span class="u-txt-red">未付清</span>;
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.ctime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(h,params)=>{
                           var btnRender=[
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
                                            this.openView(params)
                                        }
                                    }
                                }, '查看'), h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openApplication(params)
                                        }
                                    }
                                }, '申请合同')];
                           if(params.row.orderStatus=='未生效'){
                               btnRender.push(h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openCancel(params)
                                        }
                                    }
                                }, '作废'),
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
                                            this.openEdit(params)
                                        }
                                    }
                                }, '编辑'))
                           }
                           return h('div',btnRender);  
                        }
                    }
                ]
            }
        },
        created:function(){
            this.getListData(this.params);
        },
        methods:{
            showSearch () {
                this.openSearch=!this.openSearch;
                CommonFuc.clearForm(this.params,this.upperData);
            },
            openView(params){
                location.href=`./12/joinView`;
                /*if(params.row.orderType=='IN'||params.row.orderType=='INCREASE'){
                    location.href=`./${params.row.id}/joinView`;
                }
                if(params.row.orderType=='CONTINUE'){
                    location.href=`./${params.row.id}/renewView`;
                }*/
            },
            openCancel(params){
                this.openNullify=true;
            },
            openEdit(params){

            },
            openApplication(params){
                
            },
            nullifySubmit (){
                console.log('作废');
            },
            outSubmit (){
                console.log('导出');
            },
            getListData(params){
                var _this=this;
                axios.get('join-bill-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.$Message.info(e);
                })   
            },
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
            lowerChange(param){
                this.params.customerName=param.target.value;
            },
            lowerSubmit(){
                this.getListData(this.params);
            },
            upperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
            upperSubmit(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.getListData(this.params);
            }
        }
    }
</script>

<style lang='less'>
 .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;
        span{
            width:22px;
            height:22px;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
            cursor:pointer;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
</style>