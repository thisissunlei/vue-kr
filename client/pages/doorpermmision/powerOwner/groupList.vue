<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            
            <SearchForm  @submitSearchData="submitSearchData"  @deleteRelations = "deleteRelations" @addGroups = "addGroups" :groupLevel="groupLevel"/>
            <div class="table-box">
                <Table :columns="columns1" :data="openLogList" size="small" @on-selection-change="selectedChange"></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page" 
                    :page-size="pageSize" 
                    @on-change="changePage"
                >
                </Page>
                <div class="loading-box"  v-if="loading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
            </div>
           <Modal v-model="showTips" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>移除确认</span>
                </p>
                <div style="text-align:center">
                    <p>移除后，复合组将失去该组的权限。</p>
                    <p>确定移除吗？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="confirmDelete">确定</Button>
                </div>
        </Modal>
        <Modal v-model="groupAllListShow" width="900">
            <DoorGroupList :groupLevel = "groupLevel" v-if="groupAllListShow" @addGroupsToGroup="addGroupsToGroup"/>
            <div slot="footer">
            </div>
        </Modal>
        </div>
    </div>
</template>
<script>
import SearchForm from './searchGroupForm';
import dateUtils from 'vue-dateutils';
import DoorGroupList from '~/components/DoorGroupList';



export default {
   components:{
      SearchForm,DoorGroupList
   },
   data(){
     return{
        groupLevel : '',
        groupName : '',
        selectedItems : [],
        showTips : false,
        groupAllListShow : false,
        totalCount : 0,
        page : '',
        pageSize:25,
        searchData :{
            groupId: '',
            pageSize:25,
            page:1
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
                        key: 'name',
                        align:'center',
                        
                    },
                    {
                        title: '社区',
                        key: 'communityName',
                        align:'center',
                        
                    },
                    {
                        title: '公司',
                        key: 'customerName',
                        align:'center',
                        
                    },
                    {
                        title: '操作人',
                        key: 'creatorName',
                        align:'center',
                        
                    },
                    {
                        title: '操作时间',
                        key: 'ctime',
                        align:'center',
                        render(h,obj){
                           return h('div', [
                               
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.ctime)))
                            ]);
                            
                        }
                    },
                    {
                        title: '解除父子关系',
                        key: 'phone',
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '移除')
                            ]);
                        }
                    },
                    
                    
                ],
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.searchData.groupId = this.$route.query.groupid;
       this.groupName = this.$route.query.groupname;
       this.groupLevel = this.$route.query.groupLevel;
        console.log("kfdkkdlkdfs=====>2");

       this.getListData();
       this.getSmartHardwareDict();
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
                console.log("kfdkkdlkdfs=====>3");
           
           this.getListData();

       },
       getListData(){
           console.log("---------")
            let _this =this;
            let params = Object.assign({},this.searchData);
            var reqURL = this.groupLevel == "PARENT" ?  "get-son-group-list" :"get-father-group-list";
            this.$http.get(reqURL,params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.openLogList = res.data.items;
               
                
                _this.loading = false
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
       },
       getSmartHardwareDict(){
           this.$http.get('get-smart-hard-ware-dict','').then((res)=>{
                this.openTypeList = res.data.OpenType;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
       },
      
       returnOpenType(type){
           var indexNo ;
           var arr = this.openTypeList.map(function(item,index){
               
               if(type == item.value){
                   indexNo = index
               }
               return item.desc;
           })
           return arr[indexNo]
       },
       returnResult(result){
           if(result == true){
               return "成功" 
           }else{
               return "失败" 
           }
       },
       remove(params){
           this.selectedItems = [params];
           this.showTipOrNot();
       },
       deleteRelations(){
           console.log("this.selectedItems",this.selectedItems,this.selectedItems.length)
           if(this.selectedItems.length<1){
               this.$Message.warning("请选择要移除的组");
               return;
           }
           this.showTipOrNot();
       },
       showTipOrNot(){
           this.showTips = !this.showTips;
       },
       confirmDelete(){
           let _this =this;
           var relationIdsArr = [];
           var arr = this.selectedItems;
           for(var i=0;i<arr.length;i++){
               console.log("arr[i].row",arr[i])
               relationIdsArr.push(arr[i].relationId);
           }
           var params = {
               relationIds:relationIdsArr.join(",")
           }
           
            this.$http.delete('delete-father-son-relation', params).then((response) => {
                this.showTipOrNot();
                this.searchData.time = new Date().getTime();
                console.log("kfdkkdlkdfs=====>");
                this.getListData();
                this.$Message.success('移除成功');
                this.selectedItems = [];
            }).catch((error) => {
                this.$Message.warning(error.message);
            })

        },
        selectedChange(selection){
            this.selectedItems = selection;
        },
        addGroups(){
            this.groupAllListShowFun()
        },
        groupAllListShowFun(){
            this.groupAllListShow = !this.groupAllListShow
        },
        addGroupsToGroup(selectedAddItems,StatuParam){
            var selectedItemsIds=[];
            for(var i=0;i<selectedAddItems.length;i++){
                selectedItemsIds.push(selectedAddItems[i].id)
            }
            var paramsStr = selectedItemsIds.join(',');
            var url = this.groupLevel =="PARENT"?"add-son-group-to-father":"add-father-group-to-son";
            var paramsOther = this.groupLevel =="PARENT"?{children:paramsStr}:{parents:paramsStr};
            var params = Object.assign({},{groupId:this.searchData.groupId},paramsOther)
            this.sendAjaxReq(url,params,StatuParam);
        },
        sendAjaxReq(url,params,StatuParam){

            this.$http.post(url, params).then((response) => {
                this.searchData.time = new Date();
                console.log("kfdkkdlkdfs=====>1");

                this.getListData();
                this.$Message.success('添加成功');
                if(StatuParam && StatuParam=="close"){
                    this.groupAllListShowFun();
                }
            }).catch((error) => {
                this.$Message.warning(error.message);
            })

        },
        changePage(page){
            this.searchData.page =page;
            this.getListData();
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


