<template>
    <div class="g-krmeeting-sale">
        <SectionTitle title="优惠券"></SectionTitle>
         <div class="u-table">
            <Table border :row-class-name="rowClassName" :columns="Columns" :data="memberList" ref="table" @on-sort-change="sortChange" stripe></Table>
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
              Columns:[
              {
                  title: '优惠券批次',
                  key: 'communityName',
                  align:'center',
              },
              {
                  title: '优惠券名称',
                  key: 'onlineRate',
                  align:'center',
              },
              {
                  title: '优惠券面额',
                  key: 'conToOneDaybefore',
                  align:'center',
              },
              {
                  title: '优惠券类型',
                  key: 'conToWeekStart',
                  align:'center',
              },
              {
                  title: '有效期类型',
                  key: 'onlineUser',
                  align:'center',
              },
              {
                  title: '有效期',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '领取量',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '领取率',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '使用率',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '创建人',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '创建时间',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '修改人',
                  key: 'conToWeekBefore',
                  align:'center',
              },
              {
                  title: '修改时间',
                  key: 'conToWeekBefore',
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
              },
           ],
          }
      },
      mounted(){

      },
      methods:{
          jumpEdit(){
              
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


