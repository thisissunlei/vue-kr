<template>
     <div class="u-table">
        <Table border  :columns="joinMemberColumns" :data="joinMemberList" ref="table" stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <div style="float: right;">
                <Page
                    :current="page"
                    :total="page"
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
           joinMemberList:[],
           joinMemberColumns:[
              {
                  title: '日期',
                  key: 'dataDate',
                  align:'center',
              },
              {
                  title: '入驻会员数',
                  key: 'enterNum',
                  align:'center',
              },
              {
                  title: '在线会员数',
                  key: 'onlineNum',
                  align:'center',
              },
              {
                  title: '平均在线时长',
                  key: 'onlineTime',
                  align:'center',
              }
           ],
        }
    },
    mounted(){
        this.getTableData(this.tabParams)
    },
    methods:{
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        getTableData(params){
              this.$http.get('get-app-operation-online-data', params).then((res)=>{
                    this.joinMemberList=res.data.items;
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
                    if(nextProps.mask=='joinMember'){
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

