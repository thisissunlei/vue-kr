<template>
<div class="customer-assets">
   <SectionTitle title="招商角色配置"></SectionTitle>
        <div class="div-search">
            <SearchFormInput :searchFilter="searchFilter" :onSubmit="searchSubmit"/>
        </div>
        <div class="table-list">
            <Table  border :columns="columns" :data="accountList" :loading="loading" >
                <div slot="loading">
                    <Loading/>
                </div>
            </Table>
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
             v-if="openAwarded"
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
    import Loading from '~/components/Loading';

    export default {
        name: 'customerAssets',
        components:{
            SectionTitle,
            SearchFormInput,
            Awarded,
            Loading
        },
        data () {
            return {
            id:'',
            totalCount:0,
            loading:false,

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
                        key: 'accountName',
                        align:'center',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center',
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        align:'center'
                    },
                    {
                        title: '电子邮箱',
                        key: 'email',
                        align:'center'
                    },
                    {
                        title: '帐号角色',
                        key: 'rolesString',
                        align:'center'
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
                this.loading=true;
                let params = Object.assign({},this.params)
                this.$http.get('business-bill-list',params).then((res)=>{
                    this.accountList=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.loading=false;
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
                // let newParams={
                //     accountName:'',
                //     realName:'',
                //     mobilePhone:'',
                //     email:''
                // }
                // for(var item in params){
                //     newParams[item]=params[item];
                // }
                params.page=1;
                this.params=Object.assign({},this.params,params);
                this.getListData();
            },
            showRole(param){
                this.id=param.id;
                this.cancelRole();
            },
            cancelRole(){
                this.openAwarded=!this.openAwarded;
            },
            submitRole(params){
                params.id=this.id;
                this.$http.post('add-business-role',params).then((res)=>{
                    this.cancelRole();
                    this.getListData();
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
