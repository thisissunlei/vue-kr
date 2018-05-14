<template>
  <div class="g-map-depot">
       <SectionTitle title="电视图库管理" />
        <div class="u-search" >
                 
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
       page:1,
       pageSize:15,
       totalCount:0,
       tabParams:{
         page:1,
         pageSize:15,
       },
       tableList:[],
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

   },
   methods:{
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
            
        // this.$http.get('get-bill-paid-list', params).then((res)=>{
        //     this.tableList=res.data.items;
        //     this.totalCount=res.data.totalCount;
           
        // }).catch((err)=>{
        //     this.$Notice.error({
        //         title:err.message
        //     });
        // })
          
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
    .u-table{
        padding:0 20px;
    } 
    .ivu-table-cell{
        padding:0;
    }
    
}
</style>


