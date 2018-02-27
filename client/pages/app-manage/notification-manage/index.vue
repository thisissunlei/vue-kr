<template>
<div class="g-notification-manage">
    <SectionTitle title="通知管理" />   
    <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建通知</Button>
            <SearchForm 
                :searchFilter="searchFilter"
                :onSubmit="onSubmit"
            />
    </div>
    <div class="u-table">
            <Table  border :columns="columns" :data="tableList"/>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @change="onPageChange"
                    />
                </div>
            </div>
    </div>


</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import SearchForm from '~/components/SearchForm';
export default {
  components:{
        SectionTitle,
        SearchForm
  },
  data(){
      return{
           page:1,
           totalCount:0,
           pageSize:15,
           searchFilter:[
               {
                   label:'通知标题',
                   value:'aa'
               },
               {
                   label:'通知内容',
                   value:'bb'
               },
               {
                   label:'创建人',
                   value:'cc'
               }
           ],
           columns:[
                {
                    title: '通知标题',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '通知内容',
                    key: 'locationDesc',
                    align:'center'
                },

                {
                    title: '通知目标用户',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '创建时间',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '创建人',
                    key: 'locationDesc',
                    align:'center'
                },

                {
                    title: '操作',
                    key: 'locationDesc',
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
                                            this.jumpView(params.row)
                                        }
                                    }
                                }, '详情'),
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
                                            this.openDelete(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);  
                        }
                },
           ],
           tableList:[],
      }
  },
  created(){

  },
  methods:{
      jumpView(){

      },
      jumpCreate(){

      },
      onPageChange(){

      },
      onSubmit(form){
          console.log('form=====',form)
      }
      
  }

}
</script>

<style lang="less" >
.g-notification-manage{
    .u-search{
        height:32px;
        margin:16px 0;
        padding:0 20px;
    }
    .u-table{
        padding:0 20px;
    } 
}
</style>


