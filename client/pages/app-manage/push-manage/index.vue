<template>
<div class="g-push-manage">
    <SectionTitle title="推送管理" />   
    <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建推送</Button>
            <span class="u-high-search" @click="showSearch"></span>  
            <SearchForm 
                :searchFilter="searchFilter"
                :onSubmit="onSubmit"
            />
    </div>
    <div class="u-table">
            <Table  border :columns="columns" :data="tableList"/>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @on-change="onPageChange"
                    />
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
        <HighSearch @formData="getSearchData"></HighSearch>
        <div slot="footer">
            <Button type="primary" @click="searchSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
        </div>
</Modal>

</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from '~/components/SearchForm';
import utils from '~/plugins/utils';
import HighSearch from './highSearch';
import dateUtils from 'vue-dateutils';

export default {
  components:{
        SectionTitle,
        SearchForm,
        HighSearch
  },
  head () {
        return {
            title: "推送管理"
        }
 },
  data(){
      return{
           page:1,
           totalCount:0,
           pageSize:15,
           openSearch:false,
           searchData:'',
           Params:{
               page:1,
               pageSize:15,
           },
           searchFilter:[
               {
                   label:'推送标题',
                   value:'title'
               },
               {
                   label:'推送内容',
                   value:'content'
               },
               {
                   label:'创建人',
                   value:'createrName'
               }
           ],
           columns:[
                {
                    title: '推送标题',
                    key: 'title',
                    align:'center'
                },
                {
                    title: '推送内容',
                    key: 'content',
                    align:'center'
                },

                {
                    title: '推送目标用户',
                    key: 'targetDesc',
                    align:'center'
                },
                {
                    title: '推送时间',
                    key: 'ctime',
                    align:'center'
                },
                {
                    title: '创建人',
                    key: 'createrName',
                    align:'center'
                },

                {
                    title: '操作',
                    key: 'locationDesc',
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
                                            this.jumpView(params.row)
                                        }
                                    }
                                }, '详情')
                            ]);  
                        }
                },
           ],
           tableList:[],
      }
  },
  created(){
      let query=this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.getTableData(query);
            this.Params=query;
          
        }else{
            this.getTableData(this.Params)
        }
         
  },
  methods:{
      jumpView(params){
           window.open(`/app-manage/push-manage/detail/${params.pushId}`,'_blank');
      },
      jumpCreate(){
          window.open(`/app-manage/push-manage/create`,'_blank');
      },
      onPageChange(page){
            this.Params.page=page;
            this.page=page;
            this.getTableData(this.Params);
      },
      onSubmit(form){
          if(this.Params.content){
              this.Params.content="";
          }
          if(this.Params.title){
            this.Params.title="";
          }
          if(this.Params.createrName){
            this.Params.createrName="";
          }
          let params=Object.assign(form,this.Params);
          utils.addParams(params);
      },
      showSearch (params) {
        utils.clearForm(this.searchData);
        this.openSearch=!this.openSearch;
      },
      getSearchData(form){
            this.searchData=form;
      },
      searchSubmit(){
            let params=Object.assign(this.Params,this.searchData);
            utils.addParams(params);
     },
      getTableData(params){
            this.$http.get('get-app-push-page', params).then((res)=>{
                this.tableList=res.data.items;
                this.totalCount=res.data.totalCount;
                this.openSearch=false;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        
      },
      
      
  }

}
</script>

<style lang="less" >
.g-push-manage{
    .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
        .u-high-search{
                width:26px;
                height:26px;
                background:url('~/assets/images/upperSearch.png') no-repeat center;
                background-size: contain;  
                float:right;
                margin-left:20px;
        }
    }
    .u-table{
        padding:0 20px;
    } 
}
</style>


