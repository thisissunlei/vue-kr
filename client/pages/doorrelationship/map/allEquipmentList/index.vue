<template>
    <div class="door-relationship">

        <SearchForm
            @addEquipmentToGroup = "addEquipmentToGroup"
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
                        width: 180,
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

       this.getAllEquipmentList({});
   },
  
   methods:{
       changePage(page){
           console.log("page",page);
           var param = {page :page}
           this.getAllEquipmentList(param);
       },
       getAllEquipmentList(param){
           this.$http.get('getAllEquipmentList', param).then((res)=>{
                // console.log("res",res);
                var resData = res.data;
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
       }

   }
       
 }
</script>
<style lang="less">
    
</style>