<template>
  <div class="g-edit-map-depot">
      <SectionTitle :title="tilte" />
        <div class="u-btn-list" >
            <div class="u-upload-btn">
                <Upload 
                    name="imgUrl"
                    multiple
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    with-credentials
                    action="http://optest01.krspace.cn/api/krspace-finance-web/app/icon/upload" 
                >
                        <Button type="primary" style="margin-right:15px;">上传图片</Button> 
                </Upload>
            </div>
             
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
           <PhotoAlbum  
                    v-if="imgViewShow" 
                    :data="itemDetail"
                    @close="openViewUpload"
                    :ifDelete="ifDelete"
            />
      
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import TvCard from './tvCard';
import PhotoAlbum from '~/components/PhotoAlbum';
export default {
   components:{
      SectionTitle,
      TvCard,
      PhotoAlbum
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
           ifDelete:true,
           imgViewShow:false,
           itemDetail:[],
           imgColumns:[
               {
                  type: 'selection',
                  width: 60,
                  align: 'center',
               },
               {
                    title: '文件名',
                    key: 'fileName',
                    align:'center',
                    render:(h,obj)=>{
                        return h(TvCard ,{
                            props: {
                                imgUrl:obj.row.fileUrl,
                                fileName:obj.row.fileName
                            },
                            on: {
                                click: () => {
                                    this.picShow(obj.row)
                                }
                            }
                         });
                    }
                },
                {
                    title: '大小',
                    key: 'size',
                    align:'center',
                    render:(h,obj)=>{
                        
                        return `${obj.row.size}M`
                    }
                },
                {
                    title: '上传日期',
                    key: 'ctime',
                    align:'center',
                    render(h, obj){
                        let time=dateUtils.dateToStr("YYYY-MM-DD HH:mm",new Date(obj.row.ctime));
                        return time;
                    }
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
       picShow(params){
           params.fieldUrl=params.fileUrl;
           let arr=[];
           arr.push(params);
           this.itemDetail=[].concat(arr) ;
           this.openViewUpload();
          
       },
       openViewUpload(){
            this.imgViewShow=!this.imgViewShow;
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
         handleSuccess(res,file){
            if(res.code==1){
                this.isError=false;
                this.formItem.iconUrl=res.data.imgUrl;
                this.imgUrl=res.data.imgUrl
            }
        },
        handleError(error,file){
            this.$Notice.error({
                    title:error.message
            });
        }
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
        .u-upload-btn{
            float:left;
            width:100px;

        }
    }
    .u-table{
        padding:0 20px;
    }    
}
</style>

