<template>
    <div class="g-krmeeting-sale">
        <SectionTitle title="优惠券"></SectionTitle>
         <div class="u-table">
            <Table border :columns="Columns" :data="saleList"  stripe></Table>
             <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @on-change="onPageChange"
                    />
                </div>
            </div>
         </div> 
    </div>
</template>
<script>
 import SectionTitle from '~/components/SectionTitle';
export default {
     head () {
          return {
              title: "优惠券-氪空间后台管理系统"
          }
      },
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
                  pageSize:15
              },
              Columns:[
              {
                  title: '优惠券批次',
                  key: 'batchNo',
                  align:'center',
                  fixed: 'left',
                  width: 150,
              },
              {
                  title: '优惠券名称',
                  key: 'couponName',
                  align:'center',
                  fixed: 'left',
                  width: 150,
              },
              {
                  title: '优惠券面额',
                  key: 'amount',
                  align:'center',
                  width: 100,
              },
              {
                  title: '优惠券类型',
                  key: 'ruleType',
                  align:'center',
                  width: 150,
              },
              {
                  title: '有效期类型',
                  key: 'conToWeekBefore',
                  align:'center',
                  width: 150,
              },
              {
                  title: '有效期',
                  key: 'conToWeekBefore',
                  align:'center',
                  width: 200,
              },
              {
                  title: '领取量',
                  key: 'receivingAmount',
                  align:'center',
                  width: 100,
              },
              {
                  title: '领取率',
                  key: 'receivingRate',
                  align:'center',
                  width: 100,
              },
              {
                  title: '使用率',
                  key: 'usageRate',
                  align:'center',
                  width: 100,
              },
              {
                  title: '创建人',
                  key: 'createName',
                  align:'center',
                  width: 150,
              },
              {
                  title: '创建时间',
                  key: 'createTime',
                  align:'center',
                  width: 200,
              },
              {
                  title: '修改人',
                  key: 'updateName',
                  align:'center',
                  width: 150,
              },
              {
                  title: '修改时间',
                  key: 'updateTime',
                  align:'center',
                  width: 200,
              },
              {
                  title: '操作',
                  key: 'operation',
                  align:'center',
                  width: 150,
                  fixed: 'right',
                  render:(h,params)=>{
                        if(params.row.producted==1){
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
                        }else{
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
                                }, '编辑'),
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
                                            this.createSale(params.row)
                                        }
                                    }
                                }, '生成优惠券')
                                
                            ]); 
                        }                       
                        
                    }
              },
           ],
           saleList:[],

          }
      },
      mounted(){
          this.getTableData(this.tabParams)
      },
      methods:{
           getTableData(params){
             this.$http.get('get-coupon-base-by-page', params).then((res)=>{
                    this.saleList=res.data.items;
                }).catch((err)=>{
                    this.$Notice.error({
						title:err.message
					});
                })
          },
           onPageChange(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
            },
          jumpEdit(){

          },
          createSale(){

          }

      }
}
</script>
<style lang="less">
.g-krmeeting-sale{
    .u-table{
        padding:0 20px 30px;
    }
}

</style>


