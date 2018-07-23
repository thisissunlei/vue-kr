<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            <SearchForm  @submitSearchData="submitSearchData" @addGroups="addGroups" />
            <div class="table-box">
                <Table :columns="columns1" :data="openLogList" size="small" @on-selection-change="selectedChange"></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page"></Page>
                <div class="loading-box"  v-if="loading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
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
        searchData :{
            groupId: '',
            pageSize:25,
        },
        loading : false,
        openTypeList :[],
        columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '组名称',
                        key: 'memberName',
                        align:'center',
                        render:(h,obj)=>{
                            return h('div', [
                               
                                h('Tooltip',
                                    {
                                    props: {
                                        placement: 'top',
                                        content :obj.row.card
                                    },
                                }, obj.row.memberName||"/"),
                            ]);
                            
                        }
                        
                    },
                    {
                        title: '社区',
                        key: 'communityName',
                        align:'center',
                        
                    },
                    {
                        title: '公司',
                        key: 'company',
                        align:'center',
                        
                    },
                ],
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
       
       this.getListData();
       console.log("groupLevel",this.groupLevel);
       this.searchData.groupLevel = this.groupLevel=="PARENT"?"NORMAL":"PARENT"
   },
   props:[
       "groupLevel"
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
           
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){
            console.log("this.groupLevel",this.groupLevel);
            let _this =this;
            let params = this.searchData;
            console.log("params",params);
            this.$http.get("get-door-group-list",params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.openLogList = res.data.items;
               
                
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
        addGroups(param){
            if(this.selectedAddItmes.length<1){
                this.$Message.warning("请选择要添加的组");
                return;
            }
            console.log("this.selectedAddItmes",this.selectedAddItmes);
            this.$emit("addGroupsToGroup",this.selectedAddItmes,param);

        }
       
    }

}
</script>
<style lang="less">
    .g-openlog{
        height: 100%;
        overflow: scroll;
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


