<template>
    <div class='m-bill-list'>
            <div class="m-bill-search" @click="showSearch">
                <span></span>   
            </div> 
            <Table :columns="joinOrder" :data="joinData"></Table>
            <div style="margin: 10px;overflow: hidden">
                    <Button type="primary">导出</Button>
                    <div style="float: right;">
                        <Page :total="pageSize" show-total show-elevator></Page>
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
    var detail=[
            {
                name: 'John Brown',
                age: 18,
                address: 'New York',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London',
                date: '2016-10-01'
            },
    ]
    export default {
        name:'join',
        components:{
            HeightSearch,
            Nullify
        },
        data () {
            
            return {
                pageSize:1,
                openSearch:false,
                openNullify:false,
                joinOrder: [
                    {
                        title: '订单编号',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'age',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'address',
                        align:'center'
                    },
                    {
                        title: '服务费总额',
                        key: 'date',
                        align:'center'
                    },
                    {
                        title: '履约保证金',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '订单类型',
                        key: 'age',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'address',
                        align:'center'
                    },
                    {
                        title: '支付状态',
                        key: 'date',
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
                ],
                joinData:detail
            }
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            searchSubmit (params){
                
            },
            openView(params){
                 location.href=`./orderManage/watchView/12`;
                 //location.href=`./watchView/${params.orderId}`;
            },
            openCancel(params){
                this.openNullify=true;
            },
            openEdit(params){

            },
            openApplication(params){
                
            }
        },
        created:function(){
            let {params}=this.$route
            var _this=this;
            this.basicInfo={};
            //列表
            /*axios.get('order-list','', r => {
                       
                    console.log('r', r);
                    
                }, e => {
                    console.log('error',e)
            })*/

	     }
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