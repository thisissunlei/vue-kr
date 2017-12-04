
<template>

    <div>

        <Tabs active-key="key1">
            <Tab-pane label="入驻订单" key="key1">
                
                <Table :columns="joinOrder" :data="joinData"></Table>
                <Page :total="100" class="join_page"></Page>
            </Tab-pane>
            <Tab-pane label="减租订单" key="key2">
                123
            </Tab-pane>
        </Tabs>
        
     
    </div>
  
</template>


<script>
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
        data () {
            return {
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
                        render () {
                            return <Button-group><i-button type="text">查看</i-button><i-button type="text">作废</i-button><i-button type="text">编辑</i-button><i-button type="text">申请合同</i-button></Button-group>;                       
                        }
                    }
                ],
                joinData:detail
            }
        }
    }
</script>

<style>
  .join_page{
      margin-top:30px;
      float:right;
  }
</style>