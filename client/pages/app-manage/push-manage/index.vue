<template>
<div class="g-push-manage">
    <SectionTitle title="推送管理" />   
    <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建推送</Button>
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


</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from '~/components/SearchForm';
export default {
  components:{
        SectionTitle,
        SearchForm
  },
  data(){
      return{
           page:1,
           totalCount:0,
           pageSize:15,
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
      }
      
  }

}
</script>

<style lang="less" >
.g-push-manage{
    .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
    }
    .u-table{
        padding:0 20px;
    } 
}
</style>


