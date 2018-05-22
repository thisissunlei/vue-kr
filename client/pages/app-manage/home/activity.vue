<template>
     <div class="u-table">
        <Table border  :columns="activityColumns" :data="activityList" ref="table" stripe></Table>
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
           activityList:[],
           activityColumns:[
              {
                  title: '社区活动总数',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '全国活动总数',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '活动报名总数',
                  key: 'payAccount',
                  align:'center',
              },
              {
                  title: '活动回帖总数',
                  key: 'payAccount',
                  align:'center',
              }
           ]
        }
    },
    created(){
             this.getTableData(this.$route.query);
             this.params=this.$route.query;
    },
    watch: {
        $props: {
            deep: true,
            handler(nextProps) {
                if(nextProps.mask=='bind'){
                    this.getTableData(this.params);
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
    }
}
</script>
<style lang="less">
.u-table{
    padding:20px 20px 0;
}
</style>

