<template>
  <div class="g-device-list">
      <div class="g-device-list-box">
            <SearchForm  @submitSearchData="submitSearchData" @addDevice="addDevice" />
            <div class="table-box">
                <Table :columns="columns1" :data="deviceList" size="small" @on-selection-change="selectedChange"></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page" 
                :page-size="pageSize" @on-change="changePage"
                :current="currentPage"
                ></Page>
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
        pageSize : 15,
        currentPage :1,
        searchData :{
            pageSize:15,
            page :1
        },
        loading : false,
        openTypeList :[],
        columns1: [{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        width: 120,
                    },
                    {
                        title: '屏幕显示标题',
                        key: 'title',
                        width: 150,
                    },
                    {
                        title: '屏幕显示编号',
                        key: 'doorCode',
                        width: 150,
                    },
                    {
                        title: '硬件ID',
                        key: 'deviceId',
                        width: 200,
                    },
                    {
                        title: '门类型',
                        key: 'doorTypeName',
                        width: 100,
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 160,
                    }
                ],
                deviceList: []
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
           this.currentPage =1;
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){
            let _this =this;
            let params = this.searchData;
            console.log("params",params);
            this.$http.get("getAllEquipmentList",params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.deviceList = res.data.items;
               
                
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
        addDevice(param,timeArr){
            if(this.selectedAddItmes.length<1){
                this.$Message.warning("请选择要添加的组");
                return;
            }
            this.$emit("addDevice",this.selectedAddItmes,param,timeArr);

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


