<style lang="less">
 .u-search{
        height:22px;
        margin:16px 0;
        .u-high-search{
            width:22px;
            height:22px;
            background:url(images/upperSearch.png) no-repeat center;
            background-size: contain;  
            float:right;
            margin-right: 20px;
        }

    }
</style>

<template>
<div>
    <div class="u-search" >
        <Button type="primary">批量结算</Button>
        <span class="u-high-search" @click="showSearch"></span>   
    </div>
    <Table  :columns="columns1" :data="data1"></Table>
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
        <HighSearch></HighSearch>
    </Modal>
</div>
</template>


<script>
import HighSearch from './highSearch';
    export default {
        name: 'Bill',
        components:{
            HighSearch
        },
        data () {
            return {
                pageSize:1,
                openSearch:false,
                columns1: [
                    {
                        title: '账单编号',
                        key: 'number',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '账单类型',
                        key: 'amount',
                        align:'center'
                    },
                    {
                        title: '账单金额',
                        key: 'date',
                        align:'center'
                    },
                    {
                        title: '结账金额',
                        key: 'orderstatus',
                        align:'center'
                    },
                    {
                        title: '付款截止日期',
                        key: 'pay',
                        align:'center'
                    },
                    {
                        title: '账单状态',
                        key: 'pay',
                        align:'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
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
                                            this.openView(params
                                            )
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
                                            this.remove(params)
                                        }
                                    }
                                }, '结账'),
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
                                            this.remove(params)
                                        }
                                    }
                                }, '反结账')
                            ]);  
                        }
                    }
                ]
                
            }
        },
        created:function(){
            this.data1=[
                    {
                        number: 18,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                    }
                ]
           
            
        },
        methods:{
            showSearch (params) {
                this.openSearch=true;
            },
            openView(){

            },
            remove (params) {
                console.log('params222====',params)
            },
            changeSearch(status){
                this.openSearch=status;
            }
           
        }

    }
</script>