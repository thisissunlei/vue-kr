<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            
            <SearchForm  @submitSearchData="submitSearchData"  @deleteRelations = "deleteRelations" @addMember = "addMember" :groupLevel="groupLevel"/>
            <div class="table-box">
                <Table :columns="columns1" :data="memberList" size="small" @on-selection-change="selectedChange" page-size="searchData.pageSize" @on-change="changePage"></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page" 
                :page-size="pageSize" @on-change="changePage"></Page>
                <div class="loading-box"  v-if="loading">
                    <Spin fix>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
            </div>
           <Modal v-model="showTips" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>确认删除</span>
                </p>
                <div style="text-align:center">
                    <p>如果把会员从该组删除，会员将失去该组设备权限</p>
                    <p>确定删除吗？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="confirmDelete">删除</Button>
                </div>
        </Modal>
        <Modal v-model="groupAllListShow" width="990">
            <MemberList :groupLevel = "groupLevel" v-if="groupAllListShow" @addMemberPermmision="addMemberPermmision"/>
            <div slot="footer">
            </div>
        </Modal>
        </div>
    </div>
</template>
<script>
import SearchForm from './searchMemberForm';
import dateUtils from 'vue-dateutils';
import MemberList from '~/components/MemberList';



export default {
   components:{
      SearchForm,MemberList
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
        pageSize:15,
        searchData :{
            groupId: '',
            pageSize:15,
            page : 1
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
                               
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm", new Date(obj.row.ctime)))
                            ]);
                            
                        }
                    },
                    {
                        title: '操作',
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
                memberList: []
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.searchData.groupId = this.$route.query.groupid;
       this.groupName = this.$route.query.groupname;
       this.groupLevel = this.$route.query.groupLevel;
       this.getListData();
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
           this.searchData.page =1;
           
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){

            let _this =this;
            let params = Object.assign({},this.searchData,{date:new Date()});
            var reqURL = "get-door-permmsion-owner-member";
            this.$http.get(reqURL,params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.memberList = res.data.items;
                
                _this.loading = false
            }).catch((error)=>{
                _this.$Notice.error({
                    title:error.message
                });
            })
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
           if(this.selectedItems.length<1){
               this.$Message.warning("请选择要移除的人");
               return;
           }
           this.showTipOrNot();
       },
       showTipOrNot(){
           this.showTips = !this.showTips;
       },
       confirmDelete(){
           let _this =this;
           var toDeleteArr = [];
           var arr = this.selectedItems;
           for(var i=0;i<arr.length;i++){
               toDeleteArr.push(arr[i].id);
           }
           var params = {
               ids:toDeleteArr.join(",")
           }
           
            this.$http.post('delete-member-permmision-from-group', params).then((response) => {
                this.showTipOrNot();
                this.searchData.time = new Date().getTime();
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
        addMember(){
            this.groupAllListShowFun()
        },
        groupAllListShowFun(){
            this.groupAllListShow = !this.groupAllListShow
        },
        addMemberPermmision(selectedAddItems,StatuParam){
            var selectedItemsIds=[];
            console.log("selectedAddItems",selectedAddItems);
            for(var i=0;i<selectedAddItems.length;i++){
                selectedItemsIds.push(selectedAddItems[i].uid)
            }
            var paramsStr = selectedItemsIds.join(',');
            console.log("paramsStr",paramsStr);
            var url = this.groupLevel =="PARENT"?"add-member-permmision-to-group":"add-member-permmision-to-group";
            var paramsOther = this.groupLevel =="PARENT"?{uids:paramsStr}:{uids:paramsStr};
            var params = Object.assign({},{groupId:this.searchData.groupId},paramsOther)
            this.sendAjaxReq(url,params,StatuParam);
        },
        sendAjaxReq(url,params,StatuParam){
            this.$http.post(url, params).then((response) => {
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


