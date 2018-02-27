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
                        @change="onPageChange"
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

export default {
  components:{
        SectionTitle,
        SearchForm,
        HighSearch
  },
  data(){
      return{
           page:1,
           totalCount:0,
           pageSize:15,
           openSearch:false,
           searchData:'',
           searchFilter:[
               {
                   label:'推送标题',
                   value:'aa'
               },
               {
                   label:'推送内容',
                   value:'bb'
               },
               {
                   label:'创建人',
                   value:'cc'
               }
           ],
           columns:[
                {
                    title: '推送标题',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '推送内容',
                    key: 'locationDesc',
                    align:'center'
                },

                {
                    title: '推送目标用户',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '推送时间',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '创建人',
                    key: 'locationDesc',
                    align:'center'
                },

                {
                    title: '操作',
                    key: 'locationDesc',
                    align:'center'
                },
           ],
           tableList:[],
      }
  },
  created(){

  },
  methods:{
      jumpCreate(){

      },
      onPageChange(){

      },
      onSubmit(form){
          console.log('form=====',form)
      },
      showSearch (params) {
        utils.clearForm(this.searchData);
        this.openSearch=!this.openSearch;
      },
      getSearchData(form){
            this.searchData=form;
      },
      searchSubmit(){
            // this.tabParams=this.searchData;
            // this.tabParams.page=1;
            // this.page=1;
            // utils.addParams(this.tabParams);
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
                width:22px;
                height:22px;
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


