
<template>

    <div class='bill-list'>

        <Tabs active-key="key1">
            <Tab-pane label="入驻订单" key="key1">   
                <div class="bill-search" @click="showSearch">
                    <span></span>   
                </div> 
                <Table :columns="joinOrder" :data="joinData"></Table>
                <Page :total="100" class="join_page"></Page>
                <Modal
                    v-model="openSearch"
                    title="高级搜索"
                    ok-text="确定"
                    cancel-text="取消"
                    width="660"
                >
                    <HeightSearch></HeightSearch>
               </Modal>
            </Tab-pane>
            <Tab-pane label="减租订单" key="key2">
                123
            </Tab-pane>
        </Tabs>
        
        
    </div>
  
</template>


<script>
    import HeightSearch from './heightSearch';
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
        name:'order',
        components:{
            HeightSearch,
        },
        data () {
            return {
                pageSize:1,
                openSearch:false,
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
                console.log('parmas---',params);
            },
            openView(params){
                 console.log('-------',params);
            },
            openCancel(params){

            },
            openEdit(params){

            },
            openApplication(params){

            }
        }
    }
</script>

<style lang='less'>
 .bill-list{
   .join_page{
      margin-top:30px;
      float:right;
  }
 }
  
</style>