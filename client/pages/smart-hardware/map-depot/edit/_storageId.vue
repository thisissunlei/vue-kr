<template>
  <div class="g-edit-map-depot">
      <SectionTitle :title="tilte" />
        <div class="u-btn-list" >
            <div class="u-upload-btn">
                <Button type="primary" style="margin-right:15px;" @click="uploadShow">上传图片</Button> 
            </div>
            <!-- <Button type="primary" :disabled="btnDisabled" style="margin-right:15px;" @click="downloadPic">下载</Button>  -->
            <Button type="primary" :disabled="btnDisabled" @click="openMoreDelete">批量删除</Button> 
            <div class="u-tip">图片小于3M，仅支持上传 jpg、jpeg、png格式</div>
        </div>
        <div class="u-table">
                <Table  border :columns="imgColumns" :data="tableList"   @on-selection-change="onSelectList" @on-select-all="onSelectList"/>
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
                    @downFile="downloadImg"
                    @deleteFile="deletePic"
            />

    <Modal
        v-model="openUpload"
        title="上传图片"
        ok-text="确定"
        cancel-text="取消"
        width="500"
     >
      <div class="u-upload-title">
            <UploadImg 
                category="ad/tv"
                :isPublic="isPublic"
                uploadName="file"
                v-if="openUpload"
                @formData="getImgIds"
                :format="['jpg','jpeg','png']"
            >
                <div class="u-upload-content">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>请选择上传文件</p>
                        <!-- <div class="u-upload-file-name" v-if="file !== null"> {{ file.name }}</div> -->
                </div>        
            </UploadImg>
        </div>
        <div slot="footer">
                <Button type="primary"    @click="uploadImgSubmit()">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="uploadShow">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="openCancel"
        title="删除"
        ok-text="确定"
        cancel-text="取消"
        width="490"
    >
        <div class="u-cancel-title">
            确认要删除该文件吗？
        </div>
        <div slot="footer">
            <Button type="primary" @click="onDeletePic">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openDelete">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import TvCard from './tvCard';
import PhotoAlbum from '~/components/PhotoAlbum';
import utils from '~/plugins/utils';
import UploadImg from '~/components/UploadImg';
export default {
   components:{
      SectionTitle,
      TvCard,
      PhotoAlbum,
      UploadImg
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
           imgIds:'',
           isPublic:true,
           ifDelete:true,
           imgViewShow:false,
           itemDetail:[],
           openUpload:false,
           openCancel:false,
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
                },
                {
                        title: '操作',
                        key: 'operation',
                        align:'center',
                        width:100,
                        render:(h,params)=>{
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.downloadImg(params.row.fileUrl,params.row.fileName);
                                        }
                                    }
                                }, '下载'),
                                
                                 h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openDelete(params.row.id);
                                        }
                                    }
                                }, '删除'),
                                
                            ]);
                        }
                    }

           ],
           tableList:[],
           picList:[],
           Ids:[],
         }
   },
   mounted(){
      GLOBALSIDESWITCH("false");
      let {params}=this.$route;
      this.tabParams.storageId=params.storageId;
      this.getTableData(this.tabParams);
   },
   methods:{
       openMoreDelete(){
           this.openDelete();
       },
       openDelete(id){
           if(id){
               this.Ids.push(id)
           }
           this.openCancel=!this.openCancel;
       },
       uploadShow(){
            this.openUpload=!this.openUpload;
       },
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
       onDeletePic(){
           let id=[].concat(this.Ids);
           let ids=id.join(',');
           this.deletePic(ids)
           this.picList=[];
           this.openViewUpload();
       },
       deletePic(id){
           console.log('id',id)
            let form={
                ids:id
            }
           
            this.$http.delete('delete-pic', form).then((res)=>{
               this.$Notice.success({
                    title:'图片删除成功'
                });
                this.btnDisabled=true;
                this.openDelete()
                this.imgViewShow=false;
                
                this.getTableData(this.tabParams);
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
       },
       renderList(){
            let arr=[].concat(this.imgColumns);
            let len=this.picList.length;
            if(len>0){
                arr[1].title=`已选中${len}个文件`;
            }else{
                arr[1].title='文件名';
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
            let Ids=[];
            data.map((item)=>{
                Ids.push(item.id)
            })
            this.Ids=[].concat(Ids);
            if(this.Ids.length>0){
                this.btnDisabled=false;
            }else{
               this.btnDisabled=true; 
            }
            this.picList=data;
            this.renderList();
        },
        getImgIds(ids){
            this.imgIds=ids;
        },
        uploadImgSubmit(){
            let {params}=this.$route;
            if(!this.imgIds){
                this.$Notice.error({
                    title:'请先选择要上传的图片'
                });
                return;
            }
            let form={
                storageId:params.storageId,
                fileIds:this.imgIds
            }

            this.$http.post('save-pic', form).then((res)=>{
                this.$Notice.success({
                    title:'图片上传成功'
                });
                this.uploadShow();
                this.imgIds=[];
               this.getTableData(this.tabParams);
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })

        },
        downloadImg(src,name){
            var a = document.createElement('a');
                a.href = src;
                a.download = name || "";
                a.click();
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
     .ivu-table-cell{
        padding:0;
    }
}
 .u-upload-title{
        width:500px;
        div{
            width:97%;
        }
        .u-upload-content{
            width:94px;
            height:80px;
            margin:15px auto 0;
           i{
               text-indent: -5px;
           }
        }
        .g-upload-img{
            text-align: center;
            
        }
} 
.u-cancel-title{
    margin-top: 30px;
    text-align: center;
} 
</style>

