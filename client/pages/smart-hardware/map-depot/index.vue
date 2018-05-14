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
                    <Option v-for="item in communityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
        </div>
         <div class="u-table">
              <Table  border :columns="picColumns" :data="tableList" @on-select="onSelectList"  @on-select-all="onSelectList"/>
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
                @formData="getCreateData"  
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
import  CreatedMapDepot from "./createdMapDepot"
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
                  type: 'selection',
                  width: 35,
                  align: 'center',
              },
              {
                  title: '图库名',
                  key: 'billNo',
                  align:'center',
              },
              {
                  title: '图片数量（张）',
                  key: 'billNo',
                  align:'center',
              },
              {
                  title: '最后编辑时间',
                  key: 'billNo',
                  align:'center',
              },
              {
                  title: '最后编辑人',
                  key: 'billNo',
                  align:'center',
              },
              {
                  title: '操作',
                  key: 'effective',
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
     this.tableList=[
       {
         billNo:111
       }
     ]
   },
   methods:{
     showCreate(){
       this.openCreate=!this.openCreate;
     },
     createSubmit(){

     },
     communityChange(){

     },
     jumpCreate(){
        this.showCreate() 
     },
     jumpEdit(){

     },
     onSelectList(data){
            // let billIds=[];
            // data.map((item)=>{
            //     billIds.push(item.billId)
            // })
            // this.billIds=billIds;
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


