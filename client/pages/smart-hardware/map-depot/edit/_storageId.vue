<template>
  <div class="g-edit-map-depot">
      <SectionTitle :title="tilte" />
        <div class="u-btn-list" >
            <Button type="primary" style="margin-right:15px;" @click="uploadPic">上传图片</Button> 
            <Button type="primary" :disabled="btnDisabled" style="margin-right:15px;" @click="downloadPic">下载</Button> 
            <Button type="primary" :disabled="btnDisabled" @click="deletePic">删除</Button> 
            <div class="u-tip">图片小于3M，仅支持上传 jpg、jpeg、png格式</div>
        </div>
        <div class="u-table">
                <Table  border :columns="imgColumns" :data="tableList" @on-select="onSelectList"  @on-select-all="onSelectList"/>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page 
                            :current="page"
                            :total="totalCount"
                            :page-size="pageSize" 
                            show-total 
                            show-elevator
                            @on-change="changePage"
                        />
                    </div>
                </div>
            </div>
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
export default {
   components:{
      SectionTitle,
   },
   data(){
       return{
           tilte:'全国通用图库',
           btnDisabled:true,
           totalCount:0,
           page:1,
           pageSize:15,
           tabParams:{
                page:1,
                pageSize:15,
           },
           imgColumns:[
                {
                  type: 'selection',
                  width: 60,
                  align: 'center',
               },
               {
                    title: '文件名',
                    key: 'bizType',
                    align:'center',
                },
                {
                    title: '大小',
                    key: 'bizType',
                    align:'center',
                },
                {
                    title: '上传日期',
                    key: 'bizType',
                    align:'center',
                }
           ],
           tableList:[],
           picList:[],
       }
   },
   mounted(){
      GLOBALSIDESWITCH("false");
      let {params}=this.$route;
      this.tabParams.storageId=params.storageId;
      this.getTableData(this.tabParams);
   },
   methods:{
       uploadPic(){

       },
       downloadPic(){

       },
       deletePic(){

       },
       renderList(){
            let arr=[].concat(this.imgColumns);
            let len=this.picList.length;
            if(len>0){
                arr[1].title=`已选中${len}个文件`;
            }
            this.picColumns=[].concat(arr);
       },
       getTableData(params){
                this.renderList()
                this.$http.get('get-tv-ad-storage-file-list', params).then((res)=>{
                    this.tableList=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
                
        },
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        onSelectList(data){
            // let billIds=[];
            // data.map((item)=>{
            //     billIds.push(item.billId)
            // })
            // this.billIds=billIds;
        },
   }
}
</script>
<style lang="less">
.g-edit-map-depot{
    .u-btn-list{
        height:32px;
        margin:16px 0;
        padding:0 20px;
        .u-tip{
            float:right;
            width:265px;
            line-height:32px;
        }
    }
    .u-table{
        padding:0 20px;
    }    
}
</style>

