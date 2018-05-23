<template>
     <div class="u-table">
         <Table border  :columns="memberColumns" :data="memberList" ref="table" stripe></Table>
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
</template>
<script>
export default {
    
    data(){
        return{
           page:1,
           totalCount:0,
           pageSize:15, 
           tabParams:{
               page:1,
               pageSize:15
           },
           memberList:[],
           memberColumns:[
              {
                  title: '日期',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '入驻满7天且登录过APP的会员数',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '入驻满7天会员数',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '7天线上化率',
                  key: 'payAccount',
                  align:'center',
              }
           ],
        }
    },
    methods:{
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.params);
        },
        getTableData(){

        }
    },
    watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='paid'){
                       this.getTableData(this.queryParams);
                       this.tabParams=this.tabParams;
                    }
                }
            }
        },
}
</script>
<style lang="less">
.u-table{
    padding:20px 20px 0;
}
</style>

