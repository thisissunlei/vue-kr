<template>
<div class="g-setting-manager">
        <SectionTitle :title='"全部企业（"+totalCount+"）"' ></SectionTitle>
        <div class="u-search" >
                 <!--<div class="u-search-list" style="margin-left:30px;">-->
                    <!--<SearchForm-->
                        <!--placeholder="请输入公司名称"-->
                        <!--inputName="csrName"-->
                        <!--:openSearch="true"-->
                        <!--@serachFormDataChanged="changeCompany"-->
                        <!--:onSubmit="lowerSubmit"-->
                    <!--/>-->
                <!--</div>-->
                <Input v-model="Params.csrName" placeholder="请输入公司名称" style="width: 160px;margin-left:30px;float:right" @on-click="lowerSubmit">
                  <Button slot="append" @click="lowerSubmit">
                    <Icon type="ios-search" style="color:#2d8cf0;display:inline-block;width:100%;height:100%;"></Icon>
                  </Button>
                </Input>
                <div class="u-search-list">
                        <span class="u-search-label">社区</span>
                        <Select 
                            v-model="Params.cmtId" 
                            style="width:160px"
                            placeholder="请选择社区" 
                            clearable
                            filterable
                            remote
                            label-in-value
                            :label="Params.communityName"
                            @on-change="changeCommunity"
                        >
                            <Option   v-for="item in communityList" :value="item.id" :key="item.id"> {{ item.name }}</Option>
                            
                        </Select>
                </div>
                <div class="u-search-list" >
                    <span class="u-search-label">有无管理员</span>
                    <Select 
                        v-model="Params.manager" 
                        style="width:150px"
                        placeholder="请选择" 
                        clearable
                        filterable
                        label-in-value
                        remote
                        :label="Params.managerName"
                        @on-change="changeManager"
                    >
                        <Option v-for="item in typeList" :value="item.value" :key="item.value"> {{ item.label }}</Option>
                    </Select>
                 </div>
          <div class="u-search-list" >
            <span class="u-search-label">有无主管理员</span>
            <Select
                v-model="Params.chiefManager"
                style="width:150px"
                placeholder="请选择"
                clearable
                filterable
                label-in-value
                remote
                :label="Params.majorName"
                @on-change="changeMajor"
            >
              <Option v-for="item in typeList" :value="item.value" :key="item.value"> {{ item.label }}</Option>
            </Select>
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
    <HighSearch  @formData="getSearchData"></HighSearch>
    <div slot="footer">
        <Button type="primary" @click="searchSubmit">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
    </div>
</Modal>

</div> 	
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import HighSearch from './highSearch';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from '~/components/SearchForm';
export default {
    components:{
        SectionTitle,
        HighSearch,
        SearchForm,
    },  
    head () {
        return {
            title: "客户管理员-氪空间后台管理系统"
        }
    },
    data(){
        return{
            openSearch:false,
            totalCount:0,
            pageSize:15,
            tableData:[],
            page:1,
            typeList:[
                {
                    value:-1,
                    label:'全部'
                },
                {
                  value:1,
                  label:'有'
                },
                {
                    value:0,
                    label:'无'
                }
            ],
            communityList:[],
            Params:{
                page:1,
                pageSize:15,
                csrName:'',
                cmtId:'',
                manager:'',
                communityName:'',
                managerName:'',
                chiefManager: '',
                majorName: ''
            },
            itemDetail:{},
            searchData:{},
            tableHeader:[
                {
                    title: '企业名称',
                    key: 'csrName',
                    align:'center',
                },
                {
                    title: '当前入驻社区',
                    key: 'cmtName',
                    align:'center',
                },
                {
                    title: '注册时间',
                    key: 'registerTime',
                    align:'center',
                    render(h, obj){
                        let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.registerTime));
                        return h('span',{},time);
                    }
                },
                {
                    title: '管理员数量',
                    key: 'managerNum',
                    align:'center',
                    width:120
                },
                {
                  title: '主管理员数量',
                  key: 'chiefManagerNum',
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
                                }, '详情')
                            ]);
                    }
                },
            ]
        }
    },
    created(){
        this.getCommunity();
        this.getTableData(this.$route.query);
        let managerType={
            '-1':'全部',
            '1' :'有',
            '0':'无'
        }
         if(!this.$route.query.csrName){
                 this.$route.query.csrName=""
         }
        let params=Object.assign({},this.$route.query);
          
        var _this=this;
        this.Params=Object.assign({},params);
        this.Params.managerName=managerType[params.manager] || '';
        this.Params.majorName = managerType[params.chiefManager] || '';
        this.page=Number(params.page) || 1;
    },
    methods:{
        changeCommunity(form){
          this.Params.page = 1;
            this.Params.cmtId=form.value;
            this.Params.communityName=form.label;
            utils.addParams(this.Params);
        },
        changeManager(form){
          this.Params.page = 1;
            this.Params.manager=form.value;
             this.Params.managerName=form.label;
            utils.addParams(this.Params);
        },
      changeMajor(form) {
        this.Params.page = 1;
        this.Params.chiefManager=form.value;
        this.Params.majorName=form.label;
        utils.addParams(this.Params);
      },
        changeCompany(form){
            this.Params.csrName=form;
        },
        getCommunity(callback){
            this.$http.get('join-bill-community','').then((res)=>{
                this.communityList=res.data.items;
                callback && callback();
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        getTableData(params){
                this.$http.get('customer-manager-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.openSearch=false;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                });
        },
        changePage(page){
                this.Params.page=page;
                this.page=page;
                this.getTableData(this.Params);
        },
        lowerSubmit(){
                this.page=1;
                // let Params={
                //     page:1,
                //     pageSize:15,
                //     csrName:this.Params.csrName
                // }
                // this.Params=Object.assign({},Params);
                this.Params.page = 1;
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
             window.open(`/member/setting-manager/detail/${params.csrId}`,'_blank');
        },
       
       
       
    }
}
</script>
<style lang="less">
.g-setting-manager{
    .u-search{
            height:32px;
            margin:16px 0;
            padding:0 20px;
            box-sizing: border-box;
            clear: both;
            .u-search-label{
                padding:0 10px;
            }
            .u-search-list{
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


