
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
                    @on-searchSubmit="确定"
                    width="660"
                >

                    <i-form :model="formTop" label-position="top">
                        <Form-item label="订单编号" class='bill-search-class'>
                            <i-input 
                             v-model="mode" 
                             placeholder="请输入订单编号"
                             style="width: 252px"
                            ></i-input>
                        </Form-item>
                        <Form-item label="客户名称" 
                          class='bill-search-class'>
                            <i-input 
                             v-model="name" 
                             placeholder="请输入客户名称"
                             style="width: 252px"
                            ></i-input>
                        </Form-item>
                        <Form-item label="社区名称" 
                         class='bill-search-class'>
                            <i-input 
                             v-model="community" 
                             placeholder="请输入社区名称"
                             style="width: 252px"
                            ></i-input>
                        </Form-item>
                         <Form-item label="订单状态" 
                          class='bill-search-class'>
                            <i-input 
                             v-model="community" 
                             placeholder="请输入订单状态"
                             style="width: 252px"
                            ></i-input>
                        </Form-item>
                         <Form-item label="支付状态" 
                          class='bill-search-class'>
                            <i-input 
                             v-model="community" 
                             placeholder="请输入支付状态"
                             style="width: 252px"
                            ></i-input>
                        </Form-item>
                    </i-form>
                </Modal>
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
                        render () {
                            return <Button-group><i-button type="text">查看</i-button><i-button type="text">作废</i-button><i-button type="text">编辑</i-button><i-button type="text">申请合同</i-button></Button-group>;                       
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
  .bill-search{
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
 }

 .bill-search-class{
       display:inline-block;
       width:50%;
       padding-left:32px;
 }
  
  
</style>