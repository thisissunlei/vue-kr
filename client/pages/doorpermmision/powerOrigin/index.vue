<template>
    <div class="g-door-permmision-owner">
        <SectionTitle :title="title" />
        <div class="tabs-box">
            <Tabs >
                <TabPane label="设备" icon="ipad" v-if="groupLevel=='NORMAL'">
                    <DeviceList v-if="groupLevel=='NORMAL'"/>
                </TabPane>
                <TabPane label="设备组" icon="folder" v-if="groupLevel=='PARENT'" >
                    <GroupList v-if="groupLevel=='PARENT'"/>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import DoorGroupList from '~/components/DoorGroupList';
import GroupList from '../powerOwner/groupList';
import DeviceList from './deviceList';



export default {
   components:{
      SectionTitle,DoorGroupList,
      GroupList,DeviceList
   },
   head () {
            return {
                title: "已有权限详情"
            }
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
        searchData :{
            groupId: '',
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
                        key: 'company',
                        align:'center',
                        
                    },
                    {
                        title: '操作人',
                        key: 'phone',
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
                openLogList: []
     }
   },
   created(){

   },
   mounted(){
       GLOBALSIDESWITCH("false");
       this.groupName = this.$route.query.groupname;
       this.groupLevel = this.$route.query.groupLevel;
       this.getListData();
       this.getSmartHardwareDict();
   },
   computed: {

       title : function(){
                return (this.groupLevel=="NORMAL"?'设备组':'复合组') + "已有权限详情（组名称："+ this.groupName + "）"
       }
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

            let _this =this;
            let params = Object.assign({},this.searchData,{date:new Date()});
            var reqURL = this.groupLevel == "PARENT" ?  "get-son-group-list" :"get-father-group-list";
            if(!params.groupId){
                return;
            }
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
           if(this.selectedItems.length<1){
               this.$Message.warning("请选择要解除关系的组");
               return;
           }
           this.confirmDelete();
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
                this.getListData();
                this.$Message.success('解除关系成功');
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
            console.log("selectedItemsIds",selectedItemsIds);
            var paramsStr = selectedItemsIds.join(',');
            var url = this.groupLevel =="PARENT"?"add-son-group-to-father":"add-father-group-to-son";
            var paramsOther = this.groupLevel =="PARENT"?{children:paramsStr}:{parents:paramsStr};
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

        }









    }

}
</script>
<style lang="less">
.g-door-permmision-owner{
    .tabs-box{
        padding:10px;
    }
}
    
</style>


