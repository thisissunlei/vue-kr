<template>

<div>


<h1>Hello worl222!</h1>

 <Table :columns="columns1" :data="data1"></Table>
 <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pageSize" :current="1" @on-change="changePage"></Page>
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
                        key: 'number'
                    },
                    {
                        title: '客户名称',
                        key: 'name'
                    },
                    {
                        title: '社区姓名',
                        key: 'communityName'
                    },
                    {
                        title: '订单总额',
                        key: 'amount'
                    },
                    {
                        title: '订单生成时间',
                        key: 'date'
                    },
                    {
                        title: '订单状态',
                        key: 'orderstatus'
                    },
                    {
                        title: '支付状态',
                        key: 'pay'
                    },
                    {
                        title: '操作',
                        key: 'operation'
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
                        operation:''
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
                        operation:''
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                        operation:''
                    },{
                        number: 12,
                        name: 'John Brown',
                        communityName:'创业大街',
                        amount:5535,
                        date: '2016-10-03',
                        orderstatus:'已完成',
                        pay:'待付款',
                        operation:''
                    }
                ]
        },
        methods:{
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: 'Business' + Math.floor(Math.random () * 100 + 1),
                        status: Math.floor(Math.random () * 3 + 1),
                        portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
                        people: [
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random () * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
           changePage:function(){
                this.tableData1 = this.mockTableData1();
           } 
        }

    }
</script>