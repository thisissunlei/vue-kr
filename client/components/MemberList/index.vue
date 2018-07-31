<template>
  <div class="g-member-list">
      <div class="g-openlog-box">
            <SearchForm  @submitSearchData="submitSearchData" @addMember="addMember" />
            <div class="table-box">
                <Table :columns="columns1" :data="memberList" size="small" 
                    @on-selection-change="selectedChange"
                    :loading = "loading"
                ></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page" 
                :page-size="pageSize" @on-change="changePage"
                :current = "currentPage"
                ></Page>
                
            </div>
           
        
        </div>
    </div>
</template>
<script>
import SearchForm from './searchForm';
import dateUtils from 'vue-dateutils';


export default {
   components:{
      SearchForm
   },
   data(){
     return{
        groupName : '',
        selectedAddItmes : [],
        showTips : false,
        groupAllListShow : false,
        totalCount : 100,
        page : '',
        currentPage :1,
        pageSize :15,
        searchData :{
            pageSize:15,
            page :1
        },
        loading : true,
        openTypeList :[],
        columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                         title: '姓名',
                        key: 'name',
                        align:'center',
                        
                    },
                    {
                         title: '电话',
                        key: 'phone',
                        align:'center',
                        
                    },
                    {
                        title: '社区',
                        key: 'communityName',
                        align:'center',
                        
                    },
                    {
                        title: '公司',
                        key: 'companyName',
                        align:'center',
                        
                    },
                ],
                memberList: []
     }
   },
   created(){

   },
   mounted(){
       
       this.getListData();
   },
   props:[

    ],
   computed: {

       
   },
   methods:{
       returnResultExplain(data){
           if(data.success){
               return '无';
           }
           var msg = data.msg;
           var returnText ='无';
           if(msg){
               try{
                    returnText = JSON.parse(msg).message;
                }catch(e){
                    returnText = msg 
                }
           }
           
           return returnText;
       },
       submitSearchData(data){

           let _this =this;
           this.selectedAddItmes = [];
           this.searchData.page =1;
           this.currentPage = 1;
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){
            let _this =this;
            let params = this.searchData;
            console.log("params",params);
            this.$http.get("get-member-list",params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.memberList = res.data.items;
               
                
                _this.loading = false
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
       },
       
        selectedChange(selection){
            this.selectedAddItmes = selection;
        },
        addMember(param){
            if(this.selectedAddItmes.length<1){
                this.$Message.warning("请选择要添加的组");
                return;
            }
            this.$emit("addMemberPermmision",this.selectedAddItmes,param);

        },
        changePage(page){
            this.searchData.page =page;
            this.currentPage = page;
            this.getListData();
        }
       
    }

}
</script>
<style lang="less">
    .g-openlog{
        height: 100%;
        .g-openlog-box{
            // overflow: scroll;
        }
    }
    .table-box{
        padding: 0 10px 10px 10px;
        .ivu-table-cell{
            padding : 0;
        }
        .all-data{
            text-align:center;
            padding:10px;
        }
        .loading-box{
            height: 100px;
            position: relative;
            .demo-spin-icon-load{
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from { transform: rotate(0deg);}
                50%  { transform: rotate(180deg);}
                to   { transform: rotate(360deg);}
            }
        }
        .bottom-page{
            float:right;
            margin:10px;
        }
    }
</style>


