<template>
<div class="customer-assets">
   <SectionTitle title="招商角色配置"></SectionTitle>
        <div class="div-search">
            <SearchFormInput :searchFilter="searchFilter" @onSubmit="searchSubmit"/>
        </div>
        <div class="table-list">
            <Table  border :columns="columns" :data="accountList" />
             <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="params.page" 
                        :total="totalCount" 
                        :page-size="params.pageSize" 
                        @on-change="changePage" 
                        show-total 
                        show-elevator
                    ></Page>
                </div>
            </div>
        </div>

        <Modal
            title="授予"
            v-model="openAwarded"
            width="440"
            class-name="no-footer"
            >
            <Awarded 
             @cancel="cancelRole"
             @submit="submitRole"
            />
            <div slot="footer"></div>
        </Modal>
</div>
</template>

<script>
    import SectionTitle from '~/components/SectionTitle';
    import SearchFormInput from '~/components/SearchForm';
    import utils from '~/plugins/utils';
    import Awarded from './awarded';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            SearchFormInput,
            Awarded
        },
        data () {
            return {
            totalCount:0,

            params:{
                page:1,
                pageSize:15,
                accountName:'',
                realName:'',
                mobilePhone:'',
                email:''
            },
            searchFilter:[
                {label:'登录名',value:'accountName'},
                {label:'姓名',value:'realName'},
                {label:'手机号',value:'mobilePhone'},
                {label:'邮箱',value:'email'}
            ],
            openAwarded:false,
            accountList:[],
            columns: [
                    
                    {
                        title: '登录名',
                        key: 'customerId',
                        align:'center',
                    },
                    {
                        title: '姓名',
                        key: 'customerName',
                        align:'center',
                    },
                    {
                        title: '手机号',
                        key: 'balance',
                        align:'center',
                        render:function(h,params){
                            
                            return h('span',{},utils.thousand((params.row.balance/100).toFixed(2)))
                         }
                    },
                    {
                        title: '电子邮箱',
                        key: 'deposit',
                        align:'center',
                        render:function(h,params){
                            return h('span',{},utils.thousand((params.row.deposit/100).toFixed(2)))
                         }
                    },
                    {
                        title: '帐号角色',
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
                                                this.showRole(params.row)
                                            }
                                        }
                            }, '授予'),
                         ]);       
                       }
                    }
                ]
          }
        },
        mounted(){
            this.getListData();
        },
        methods:{
            getListData(){
                let params = Object.assign({},this.params)
                this.$http.get('business-bill-list',params).then((res)=>{
                    this.accountList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            onKeyEnter: function (ev) {
               this.getListData();
            },
            changePage(page){
                this.params.page = page;
                this.getListData()
            },
            searchSubmit(params){
                this.params=Object.assign({},this.params,params);
                this.getListData();
            },
            showRole(){
                this.cancelRole();
            },
            cancelRole(){
                this.openAwarded=!this.openAwarded;
            },
            submitRole(params){
                this.$http.get('add-business-role',params).then((res)=>{
                    this.cancelRole();
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
            }
        }
    }
</script>

<style lang="less">
.customer-assets{
    position: relative;
    .div-search{
        text-align: right;
        padding:20px ;
        margin-top: -10px;
        margin-bottom: 20px;
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
.no-footer{
    .ivu-modal-footer{
        padding:0;
    }
}
</style>
