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
    props:{
        mask:String,
        detail:Object
    },
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
                  key: 'dataDate',
                  align:'center',
              },
              {
                  title: '入驻满7天且登录过APP的会员数',
                  key: 'enterNum',
                  align:'center',
              },
              {
                  title: '入驻满7天会员数',
                  key: 'loginNum',
                  align:'center',
              },
              {
                  title: '7天线上化率',
                  key: 'useRate',
                  align:'center',
              }
           ],
        }
    },
    mounted(){
         this.getTableData(this.tabParams);
    },
    methods:{
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        getTableData(params){
             this.$http.get('get-app-operation-use-rate', params).then((res)=>{
                    this.memberList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
        }
    },
    watch: {
            $props: {
                deep: true,
                handler(nextProps) {
                    if(nextProps.mask=='member' ){
                        let tabParams=Object.assign(nextProps.detail,this.tabParams)
                        this.getTableData(tabParams);
                        this.tabParams=tabParams;
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

