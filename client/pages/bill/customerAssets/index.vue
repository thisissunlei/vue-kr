<template>
<div class="customer-assets">
   <SectionTitle title="账户中心"></SectionTitle>
        <div class="div-search">
            <Input 
                v-model="params.customerName" 
                placeholder="请输入客户名称"
                style="width: 252px"
                @keyup.enter.native="onKeyEnter($event)"
            />
            <div class='m-search' @click="lowerSubmit">搜索</div>
        </div>
        <div class="table-list">
            <Table  border :columns="columns" :data="accountList" />
             <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page" 
                        :total="totalCount" 
                        :page-size="pageSize" 
                        @on-change="changePage" 
                        show-total 
                        show-elevator
                    ></Page>
                </div>
            </div>
        </div>
</div>
</template>

<script>
    import SectionTitle from '~/components/SectionTitle';
    import Buttons from '~/components/Buttons';
    import utils from '~/plugins/utils';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            Buttons
        },
        data () {
            return {
                totalCount:0,
                page:1,
                pageSize:15,

            params:{
                pageSize:15,
            },
            accountList:[],
            columns: [
                    
                    {
                        title: '客户ID',
                        key: 'customerId',
                        align:'center',
                    },
                    {
                        title: '客户名称',
                        key: 'customerName',
                        align:'center',
                    },
                    {
                        title: '账户余额',
                        key: 'balance',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.balance/100).toFixed(2)))
                         }
                    },
                    {
                        title: '正常服务保证金（元）',
                        key: 'deposit',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.deposit/100).toFixed(2)))
                         }
                    },
                    {
                        title: '冻结服务保证金（元）',
                        key: 'lockDeposit',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.lockDeposit/100).toFixed(2)))
                         }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:90,
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
                                                this.showDetail(params.row)
                                            }
                                        }
                            }, '查看'),
                         ]);

                        
                        }
                    }
                ]
        }
        },
         created(){
          var params=Object.assign({},{pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },

        methods:{
            lowerSubmit(){
                this.params.page = 1;
                utils.addParams(this.params);
            },
            getListData(params){
                params = Object.assign({},params,this.params)
                this.$http.get('account-list',params).then((res)=>{
                    this.accountList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            onKeyEnter: function (ev) {
                this.lowerSubmit();
            },
            showDetail(item){
                let url = '/bill/customerAssets/'+item.customerId+'/view#account'
                window.open(url,'_blank');
            },
            changePage(page){
                this.params.page = page;
                this.getListData(this.params)
            }
        }
    }
</script>

<style lang="less" scoped>
.customer-assets{
    position: relative;
    .div-search{
        text-align: right;
        padding:20px ;
    }
    .table-list{
        padding:0 20px;
    }
    .m-search{
        color: #2b85e4;
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
