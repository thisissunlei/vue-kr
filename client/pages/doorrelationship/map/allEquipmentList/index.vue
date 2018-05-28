<template>
    <div class="door-relationship">

        <SearchForm
            @addEquipmentToGroup = "addEquipmentToGroup"
            :communityId = "communityId"
            @searchEquipment="searchEquipment"
        />
        <div>
            <Table  
                highlight-row 
                stripe
                size="small"
                ref="selection" 
                :columns="columnsData" 
                :data="allEquipmentListData" 
                @on-selection-change="onSelectionChange"
                
            >
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="listTotalCount" :current="1" @on-change="changePage" :page-size=15></Page>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import SearchForm from './searchForm';
// import GroupDetail from './groupDetail';

export default {
   name:'allEquipmentList',
    head () {
        return {
            // title: "门禁级联关系"
            
        }
    },
   data(){
       return {
            selection : [],
            searhFormData : {
                communityId : this.communityId
            },
            columnsData: [
                    {
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
                allEquipmentListData: [],
                listTotalCount : 100
       }
   },
   components:{
       SearchForm
   },
   mounted(){
       console.log("mounted")
       this.getAllEquipmentList(this.searhFormData);
   },
   props:[
        "communityId"
    ],
  
   methods:{
       changePage(page){

           let _this =this;
           console.log("communityId",this.communityId);
           var param = {page :page,communityId : _this.communityId}
           var sendParam = Object.assign({},_this.searhFormData,param)
           this.getAllEquipmentList(sendParam);
       },
       getAllEquipmentList(param){
           this.$http.get('getAllEquipmentList', param).then((res)=>{
                
                var resData = res.data;

               console.log("resData",resData,"param",param)
                
                this.allEquipmentListData = resData.items;
                this.listTotalCount = resData.totalCount
			}).catch((error)=>{
				this.$Notice.error({
					title:error.message
				});
			})
       },
       onSelectionChange(selection){
           this.selection = selection;
       },
       addEquipmentToGroup(){

           let _this = this;
           var selectionData = _this.selection;
           if(selectionData.length<1){
               this.$Message.warning('请选择设备');
           }else{
               this.$emit("addEquipmentToGroup",selectionData)
           }
       },
       searchEquipment(formData,allSearchData){
           let _this = this;
           var params = Object.assign({},allSearchData);
           this.searhFormData = params;
           _this.getAllEquipmentList(params);

       }

   }
       
 }
</script>
<style lang="less">
    
</style>