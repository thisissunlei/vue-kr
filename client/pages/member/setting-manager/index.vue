<template>
<div class="g-setting-manager">
        <SectionTitle :title='"全部企业（"+totalCount+"）"' ></SectionTitle>
        <div class="u-search" >
            <span class="u-high-search" @click="showSearch"></span>  
            <div style='display:inline-block;float:right;padding-right:20px;'>
                <Input 
                    v-model="Params.csrName" 
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
                        :current="page" 
                        :total="totalCount" 
                        :page-size="pageSize"
                        show-total 
                        show-elevator
                        @on-change="changePage"
                    ></Page>
                </div>
            </div>
        </div>
<Modal
    v-model="openSearch"
    title="高级查询"
    ok-text="确定"
    cancel-text="取消"
    width="660"
    >
    <HighSearch  v-on:formData="getSearchData"></HighSearch>
    <div slot="footer">
        <Button type="primary" @click="searchSubmit">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
    </div>
</Modal>
<Drawer 
    title="设置企业管理员"
    :openDrawer="openDrawer"
    v-on:changeOpen="onChangeOpen"
    :close="onClose"
>
    <Setting :detail="itemDetail" v-on:changeOpen="onIsRefresh"></Setting>
</Drawer>
</div> 	
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import HighSearch from './highSearch';
import Drawer from '~/components/Drawer';
import Setting from './setting';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
export default {
    components:{
        SectionTitle,
        HighSearch,
        Drawer,
        Setting
    },
    data(){
        return{
            openDrawer:false,
            openSearch:false,
            totalCount:0,
            pageSize:15,
            tableData:[],
            page:1,
            Params:{
                page:1,
                pageSize:15,
                csrName:'',
            },
            itemDetail:{},
            searchData:{},
            isRefresh:false,
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
                    render(h, obj){
                        let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.registerTime));
                        return time;
                    }
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
                                            this.openSetting(params.row)
                                        }
                                    }
                                }, '设置管理员')
                            ]);  
                    }
                },
            ]
        }
    },
    created(){
        this.getTableData(this.$route.query);
         if(!this.$route.query.csrName){
                 this.$route.query.csrName=""
         }
        this.Params=this.$route.query;
    },
    methods:{
        getTableData(params){
                this.$http.get('customer-manager-list', params, r => {
                    this.tableData=r.data.items;
                    this.totalCount=r.data.totalCount;
                    this.openSearch=false;
                }, err => {
					this.$Notice.error({
						title:err.message
					});
        		})
        },
        changePage(page){
                this.Params.page=page;
                this.page=page;
                this.getTableData(this.Params);
        },
        lowerSubmit(){
                utils.clearForm(this.searchData);
                let csrName=this.Params.csrName;
                this.page=1;
                this.Params={
                    page:1,
                    pageSize:15,
                    csrName:csrName
                }
                utils.addParams(this.Params);
        },
        showSearch (params) {
                utils.clearForm(this.searchData);
                this.openSearch=!this.openSearch;
        },
        getSearchData(form){
                this.searchData=form;
        },
        searchSubmit(){
                let csrName=this.Params.csrName;
                this.Params=this.searchData;
                this.Params.csrName=csrName;
                this.Params.page=1;
                this.page=1;
                utils.addParams(this.Params);
        },
        openSetting(params){
                this.itemDetail=params;
                this.isRefresh=false;
                this.openDrawer=!this.openDrawer;
        },
        onChangeOpen(data){
                this.openDrawer=data;
        },
        onClose(){
            if(this.isRefresh){
                this.getTableData(this.Params)
            }
        },
        onIsRefresh(data){
            this.isRefresh=data;
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


