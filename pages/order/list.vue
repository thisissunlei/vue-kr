<style lang="less"> 
    
   
</style>
<template>
<div>
    <h1>Hello worl222!</h1>
    <Table  :columns="columns1" :data="data1"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pageSize" ></Page>
        </div>
    </div>

</div>
</template>


<script>
    export default {
        name: 'Meeting',
        data () {
            return {
                pageSize:1,
                columns1: [
                    {
                        title: '订单编号',
                        key: 'number',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '社区姓名',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '订单总额',
                        key: 'amount',
                        align:'center'
                    },
                    {
                        title: '订单生成时间',
                        key: 'date',
                        align:'center'
                    },
                    {
                        title: '订单状态',
                        key: 'orderstatus',
                        align:'center'
                    },
                    {
                        title: '支付状态',
                        key: 'pay',
                        align:'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        render:(h)=>{
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
                                            this.show(params.index)
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
                                            this.remove(params.index)
                                        }
                                    }
                                }, '作废')
                            ]);  
                        }
                    }
                ],
                data1: [
                    {
                        number: 18,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
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
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: '啦啦记得和'
                })
            },
            remove (index) {
                this.data1.splice(index, 1);
            }
           
        }

    }
</script>