<template>
  <div class="g-map-depot">
       <SectionTitle title="电视图库管理" />
        <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建图库</Button> 
            <div class="u-select">
              <span class="u-select-label">图库：</span>
               <Select 
                    v-model="communityId" 
                    style="width:200px"
                    placeholder="请选择" 
                    filterable
                    clearable
                    @on-change="communityChange"
                >
                    <Option v-for="item in communityList" :value="item.cmtId" :key="item.cmtId">{{ item.cmtName }}</Option>
                </Select>
            </div>
        </div>
         <div class="u-table">
              <Table  border :columns="picColumns" :data="tableList" />
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
        <Modal
            v-model="openCreate"
            title="新建"
            ok-text="确定"
            cancel-text="取消"
            width="400"
        >
            <CreatedMapDepot 
                :itemDetail="communityList" 
                @submitData="getCreateData"  
                v-if="openCreate"
            />
            
            <div slot="footer">
                <Button type="primary" @click="createSubmit">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="showCreate">取消</Button>
            </div>
        </Modal>
  </div>
</template>
<script>

import SectionTitle from '~/components/SectionTitle';
import  CreatedMapDepot from "./createdMapDepot";
import dateUtils from 'vue-dateutils';

export default {
   components:{
      SectionTitle,
      CreatedMapDepot
   },
   data(){
     return{
       page:1,
       pageSize:15,
       totalCount:0,
       tabParams:{
         page:1,
         pageSize:15,
       },
       openCreate:false,
       communityId:'',
       tableList:[],
       communityList:[],
       createData:'',
       picColumns:[
              {
                  title: '图库名',
                  key: 'name',
                  align:'center',
              },
              {
                  title: '图片数量（张）',
                  key: 'imgCount',
                  align:'center',
              },
              {
                  title: '最后编辑时间',
                  key: 'lastEditTime',
                  align:'center',
                  render(h, obj){
                    if(obj.row.lastEditTime){
                        let time=dateUtils.dateToStr("YYYY-MM-DD HH:mm",new Date(obj.row.lastEditTime));
                        return time;
                    }
                    
                  }
              },
              {
                  title: '最后编辑人',
                  key: 'lasEditUser',
                  align:'center',
              },
              {
                  title: '操作',
                  key: 'operation',
                  align:'center',
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
                                            this.jumpEdit(params.row)
                                        }
                                    }
                                }, '编辑')
                            ]); 
                  }
              }

       ],
       
     }
   },
   created(){

   },
   mounted(){
        this.getTableData(this.tabParams);
        this.getCommunityList();
   },
   methods:{
     showCreate(){
       this.openCreate=!this.openCreate;
     },
     createSubmit(){
         let form={
            communityId: this.createData
         }
         if(this.createData==''){
             this.$Notice.error({
                title:'请选择社区'
            });
            return;
         }
         this.$http.post('create-tv-ad-storage', form).then((res)=>{
            this.$Notice.success({
                title:'新建图库成功'
            });
            this.showCreate();
            this.getTableData(this.tabParams);
           
        }).catch((err)=>{
            this.$Notice.error({
                title:err.message
            });
        })
     },
     communityChange(){
         this.tabParams.communityId=this.communityId;
         this.getTableData(this.tabParams);
     },
     jumpCreate(){
        this.showCreate() 
     },
     jumpEdit(params){
        window.open(`/smart-hardware/map-depot/edit/${params.storageId}`,'_blank');
     },
     getTableData(params){
        this.$http.get('get-tv-ad-storage-list', params).then((res)=>{
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
      getCreateData(form){
          this.createData=form;

      },
      getCommunityList(){
            this.$http.get('get-select-items', '').then((res)=>{
                res.data.map((item,index)=>{
                    item.label=item.cmtName;
                    item.value=item.cmtId;
                    return  item;
                })
               this.communityList=res.data
              
            
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            }) 
      }



   }

}
</script>
<style lang="less">
.g-map-depot{
    .u-search{
            height:32px;
            margin:16px 0;
            padding:0 20px;
            
    }
    .u-select{
      float:right;
      width:250px;
      .u-select-label{
        padding-right:10px;
      }
    }
    .u-table{
        padding:0 20px;
    } 
    .ivu-table-cell{
        padding:0;
    }
    
}
</style>


