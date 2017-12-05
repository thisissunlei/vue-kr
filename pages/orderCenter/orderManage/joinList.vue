<template>
    <div class='m-bill-list'>
            <div class="m-bill-search" @click="showSearch">
                <span></span>   
            </div> 
            <Table :columns="joinOrder" :data="joinData"></Table>
            <div style="margin: 10px;overflow: hidden">
                    <Button type="primary">导出</Button>
                    <div style="float: right;">
                        <Page :total="totalCount" @on-change="changePage" show-total show-elevator></Page>
                    </div>
            </div>
            <Modal
                v-model="openSearch"
                title="高级搜索"
                ok-text="确定"
                cancel-text="取消"
                width="660"
            >
                <HeightSearch></HeightSearch>
            </Modal>
            <Modal
                v-model="openNullify"
                title="提示信息"
                ok-text="确定"
                cancel-text="取消"
                width="500"
            >
                <Nullify></Nullify>
            </Modal>
    </div>
</template>


<script>
    import axios from '../../../plugins/http.js';
    import HeightSearch from './heightSearch';
    import Nullify from './nullify';
    export default {
        name:'join',
        components:{
            HeightSearch,
            Nullify
        },
        data () {
            
            return {
                totalCount:1,
                params:{
                    page:1,
                    pageSize:15
                },
                joinData:[],
                openSearch:false,
                openNullify:false,
                joinOrder: [
                    {
                        title: '订单编号',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '服务费总额',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '履约保证金',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '订单类型',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '支付状态',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
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
                                            this.openView(params)
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
                                }, '编辑'),
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
                                            this.openApplication(params)
                                        }
                                    }
                                }, '申请合同')
                            ]);  
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
            },
            searchSubmit (params){
                
            },
            openView(params){
                 location.href=`./orderManage/12/joinView`;
                 //location.href=`./watchView/${params.orderId}`;
            },
            openCancel(params){
                this.openNullify=true;
            },
            openEdit(params){

            },
            openApplication(params){
                
            },
            getListData(params){
                var _this=this;
                axios.get('join-bill-list', params, r => {
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
            }
        },
    }
</script>

<style lang='less'>
 .m-bill-search{
        height:22px;
        margin:16px 20px;
        span{
            width:22px;
            height:22px;
            background:url(images/upperSearch.png) no-repeat center;
            background-size: contain;  
            float:right;
            cursor:pointer;
        }
    }
</style>