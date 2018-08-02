<template>
  <div class="g-openlog">
      <div class="g-openlog-box">
            
            <SearchForm  @submitSearchData="submitSearchData"  @deleteRelations = "deleteRelations" @addDevice = "addDevice" :groupLevel="groupLevel"/>
            <div class="table-box">
                <Table :columns="columns1" :data="deviceList" size="small" @on-selection-change="selectedChange"></Table>
                <Page :total="totalCount" size="small" show-total class-name="bottom-page" 
                :page-size="pageSize" @on-change="changePage"
                :current="currentPage"
                ></Page>
                
            </div>
           <Modal v-model="showTips" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>取消确认</span>
                </p>
                <div style="text-align:center">
                    <p>确定取消授权吗？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="confirmDelete">确认</Button>
                </div>
        </Modal>
        <Modal v-model="groupAllListShow" width="990">
            <DeviceList :groupLevel = "groupLevel" v-if="groupAllListShow" @addDevice="addDevicePermmision"/>
            <div slot="footer">
            </div>
        </Modal>
        </div>
    </div>
</template>
<script>
import SearchForm from './searchDeviceForm';
import dateUtils from 'vue-dateutils';
import DeviceList from '~/components/DeviceList';



export default {
   components:{
      SearchForm,
      DeviceList
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
        currentPage :1,
        pageSize : 15,
        searchData :{
            page : 1,
            pageSize:15,
            granteeId : '',
            granteeType : "USER_GROUP"
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
                        title: '社区名称',
                        key: 'communityName',
                        align:'center',
                        
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align:'center',
                        
                    },
                    
                    {
                        title: '显示编号',
                        key: 'doorCode',
                        align:'center',
                        
                    },
                    {
                        title: '硬件ID',
                        key: 'serialNo',
                        align:'center',
                        
                    },
                    {
                        title: '授权时间',
                        key: 'ctime',
                        align:'center',
                        render(h,obj){
                           return h('div', [
                               
                                h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.startAt))+"————"+dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(obj.row.endAt)))
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
                deviceList: []
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.searchData.granteeId = this.$route.query.groupid;
       
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
           this.currentPage =1;
           var newObj = Object.assign({},_this.searchData,data);
           this.searchData = newObj;
           this.getListData();

       },
       getListData(){


            let _this =this;
            let params = Object.assign({},this.searchData,{date:new Date()});
            var reqURL = "get-device-in-group";
            this.$http.get(reqURL,params).then((res)=>{
                
                _this.totalCount = res.data.totalCount;
                _this.deviceList = res.data.items;
                
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
               this.$Message.warning("请选择要移除的设备");
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
           
            this.$http.post('delete-device-from-group', params).then((response) => {
                this.showTipOrNot();
                this.searchData.time = new Date().getTime();
                this.getListData();
                this.$Message.success('移除成功');
            }).catch((error) => {
                this.$Message.warning(error.message);
            })

        },
        selectedChange(selection){
            this.selectedItems = selection;
        },
        addDevice(){
            this.groupAllListShowFun()
        },
        groupAllListShowFun(){
            this.groupAllListShow = !this.groupAllListShow
        },
        addDevicePermmision(selectedAddItems,StatuParam,timeArr){
            var selectedItemsIds=[];

            for(var i=0;i<selectedAddItems.length;i++){
                selectedItemsIds.push(selectedAddItems[i].id)
            }
            var paramsStr = selectedItemsIds.join(',');
            var url = this.groupLevel =="PARENT"?"add-device-to-group":"add-device-to-group";
            var paramsOther = this.groupLevel =="PARENT"?{deviceIds:paramsStr}:{deviceIds:paramsStr};
            var basicInfo = {
                granteeId : this.searchData.granteeId,
                granteeType : "USER_GROUP",
                startAt : timeArr[0]||'',
                endAt : timeArr[1]||'',
            }
            var params = Object.assign({},basicInfo,paramsOther)
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
        .bottom-page{
            float:right;
            margin:10px;
        }
    }
</style>


