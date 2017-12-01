<style lang="less"> 
    label{
        width:250px;
        line-height: 14px;
        color: #333333;
        padding-bottom: 10px;
        display: inline-block;
    }
    form{
        width:540px;
        margin:0 auto;
    }
    .u-clearfix { zoom:1; }
    .u-clearfix:after {
      clear: both;
      content: '.';
      height: 0;
      display: block;
      visibility: hidden;
    }
    .u-input{
        width:250px;
        float:left; 
        margin-bottom:10px;
        &:nth-child(2n-1){
          margin-right:30px;  
        }
    }
    .u-search{
        height:22px;
        margin:16px 20px;
        span{
            width:22px;
            height:22px;
            background:url(images/upperSearch.png) no-repeat center;
            background-size: contain;  
            float:right;
        }
        

    }
   
</style>
<template>
<div class="order">
    <div class="u-search" @click="showSearch">
        <span></span>   
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
        <form class="u-clearfix">
            <div class="u-input">
               <label>订单编号</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入订单编号" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>客户名称</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入客户名称" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>社区名称</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入社区名称" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>订单总额</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入订单总额" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>订单生成时间</label>
               <DatePicker 
                    type="date" 
                    placeholder="请选择订单生成时间" 
                    style="width: 250px"
               ></DatePicker> 
            </div>
            <div class="u-input">
               <label>订单状态</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入订单状态" 
                    style="width: 250px"
               ></Input> 
            </div>
            <div class="u-input">
               <label>支付状态</label>
               <Input 
                    v-model="value" 
                    placeholder="请输入支付状态" 
                    style="width: 250px"
               ></Input> 
            </div>
        </form>
    </Modal>
</div>
</template>


<script>
    export default {
        name: 'Meeting',
        data () {
            return {
                pageSize:1,
                openSearch:false,
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
                        title: '社区名称',
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
                                }, '作废')
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
            }
           
        }

    }
</script>