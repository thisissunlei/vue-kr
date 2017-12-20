<template>
<div class="g-setting-manager">
        <SectionTitle :label='"全部企业（"+totalCount+"）"' ></SectionTitle>
        <div class="u-search" >
            <span class="u-high-search" @click="showSearch"></span>  
            <div style='display:inline-block;float:right;padding-right:20px;'>
                <Input 
                    v-model="customerName" 
                    placeholder="请输入公司名称"
                    style="width: 252px"
                ></Input>
                <div class='m-search' @click="lowerSubmit">搜索</div>
            </div> 
        </div>
        <div class="u-table">
            <Table  border :columns="tableHeader" :data="tableData" ></Table>
            <div style="margin: 10px;overflow: hidden">
                <!-- <Button type="primary" @click="onExport">导出</Button> -->
                <div style="float: right;">
                    <Page   
                        :total="totalCount" 
                        :page-size="pageSize"
                        show-total 
                        show-elevator
                        @on-change="changePage"
                    ></Page>
                </div>
            </div>
    </div>
</div> 	
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import CommonFuc from '~/components/CommonFuc';

export default {
    components:{
        SectionTitle
    },
    data(){
        return{
            totalCount:0,
            pageSize:0,
            tableData:[],
            Params:{
                page:1,
                pageSize:15
            },
            customerName:'',
            tableHeader:[
                {
                    title: '企业名称',
                    key: 'csrName',
                    align:'center',
                },
                {
                    title: '已入驻社区',
                    key: 'cmtName',
                    align:'center',
                },
                {
                    title: '注册时间',
                    key: 'registerTime',
                    align:'center',
                },
                {
                    title: '状态',
                    key: 'csrStatus',
                    align:'center',
                },
                {
                    title: '已设置管理员数量',
                    key: 'managerNum',
                    align:'center',
                    width:120
                },
                {
                    title: '操作',
                    key: 'operation',
                    align:'center',
                    width:120,
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
                                            this.openView(params.row)
                                        }
                                    }
                                }, '详情'),
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
                                            this.openSetting(params.row)
                                        }
                                    }
                                }, '设置')
                            ]);  
                    }
                },
            ]
        }
    },
    mounted:function(){
        this.tableData=[
            {
                csrName:'卓莹（上海）网络科技有限公司',
                cmtName:'徐家汇社区',
                registerTime:'2017-12-18',
                csrStatus:'正常',
                managerNum:2
                
            }
        ]
        //this.getTableData(this.Params);
    },
    methods:{
        getTableData(params){
                this.$http.get('customer-manager-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                }, e => {
                    console.log('error',e)
                })
        },
        changePage(page){
               let Params={
                    page:page,
                    pageSize:this.pageSize
                }
                this.getTableData(Params);
        },
        lowerSubmit(){
                this.Params.customerName=this.customerName;
                this.getTableData(this.Params);
        },
        showSearch (params) {
                //CommonFuc.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
        },
        openView(params){
            //location.href=`./settingManager/detail/${params.csrId}`;
            location.href=`./settingManager/detail/1`;
        },
        openSetting(){
             //location.href=`./settingManager/setting/${params.csrId}`;
            location.href=`./settingManager/setting/1`;
        }
    }
}
</script>
<style lang="less">
.g-setting-manager{
    .u-search{
            height:32px;
            margin:16px 0;
            padding:0 20px;
            .u-high-search{
                width:22px;
                height:22px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;  
                float:right;
            }
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    } 
    .m-search{
        color:#2b85e4; 
        display:inline-block;
        margin-left:10px;
        font-size:14px;
        cursor:pointer;
    } 
}
</style>


