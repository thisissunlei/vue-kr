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
                @on-ok='upperSubmit'
            >
                <HeightSearch v-on:bindData="upperChange" mask='reduce'></HeightSearch>
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
                        title: '减租开始日期',
                        key: 'startDate',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.startDate));
                            return time;
                        }
                    },
                    {
                        title: '减租金额',
                        key: 'rentAmount',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        align:'center'
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
            showSearch (params) {
                this.openSearch=true;
                for(var item in this.params){
                    if(item!='page'&&item!='pageSize'){
                        this.upperData[item]='';
                    }
                }
            },
            openView(params){
                location.href=`./${params.row.id}/reduceView`;
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
                axios.get('reduce-bill-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.joinData=r.data.items;
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
            upperChange(params){
                this.upperData=params;
            },
            upperSubmit(){
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