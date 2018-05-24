<template>
     <div class="u-table">
        <Table border  :columns="activityColumns" :data="activityList" ref="table" stripe></Table>
    </div>  
</template>
<script>
export default {
    props:{
        mask:String,
        detail:Object
    },
    data(){
        return{
           tabParams:{
               page:1,
               pageSize:15
           },
           activityList:[],
           activityColumns:[
              {
                  title: '社区活动总数',
                  key: 'cmtActivityNum',
                  align:'center',
              },
              {
                  title: '全国活动总数',
                  key: 'nationActivityNum',
                  align:'center',
              },
              {
                  title: '活动报名总数',
                  key: 'activityJoinNum',
                  align:'center',
              },
              {
                  title: '活动回帖总数',
                  key: 'activityTopicNum',
                  align:'center',
              }
           ]
        }
    },
    
    mounted(){
        this.getTableData(this.tabParams)
    },
    watch: {
        $props: {
            deep: true,
            handler(nextProps) {
                if(nextProps.mask=='activity'){
                  let tabParams=Object.assign(nextProps.detail,this.tabParams)
                    this.getTableData(tabParams);
                    this.tabParams=tabParams;
                }
            }
        }
    },      
    methods:{
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.params);
        },
        getTableData(params){
             let activityList=[];
             this.$http.get('get-app-operation-activity-data', params).then((res)=>{
                  activityList.push(res.data)
                    this.activityList=activityList;
                   
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
.u-table{
    padding:20px 20px 0;
}
</style>

