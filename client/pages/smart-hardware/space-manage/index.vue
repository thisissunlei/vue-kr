<template>
    <div class="g-space-manage">
         <SectionTitle title="空间管理" />
         <div class="u-search" >
            <Button type="primary" @click="openCreate">新建空间</Button> 
            <!-- <div class="u-select">
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
            </div> -->
        </div>
        <div class="u-table">
              <Table  border :columns="spaceColumns" :data="tableList" />
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
import dateUtils from 'vue-dateutils';

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
            spaceColumns:[
                {
                  title: '社区',
                  key: 'communityName',
                  align:'center',
                },
                {
                  title: '楼层',
                  key: 'floor',
                  align:'center',
                  width:50,
                },
                {
                  title: '空间名称',
                  key: 'name',
                  align:'center',
                },
                {
                  title: '空间类型',
                  key: 'type',
                  align:'center',
                  render(h,obj){
                      let type={
                         'OFFICE':'独立办公室',
                         'BOARDROOM':'会议室',
                         'ROADSHOW_HALL':'路演厅',
                         'OPEN_ZONE':'开放区',
                         'STATION':'工位',
                         'AISLE':'走廊',
                         'COMMON':'通用空间'
                      }
                      return type[obj.row.type];
                  }
                },
                {
                  title: '创建人',
                  key: 'creatorName',
                  align:'center',
                },
                {
                  title: '创建时间',
                  key: 'ctime',
                  align:'center',
                  render(h, obj){
                    if(obj.row.ctime){
                        let time=dateUtils.dateToStr("YYYY-MM-DD HH:mm",new Date(obj.row.ctime));
                        return time;
                    }
                    
                  }
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
                                            this.jumpEdit(params.row)
                                        }
                                    }
                                }, '管理子空间'),
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
                                }, '删除')

                            ]); 
                  }
              }
            ],
            tableList:[]
        }
    },
    mounted(){
        this.tableList=[
            {
                communityName:'创业大街社区',
                floor:20
            }
        ]
        //this.getTableData(this.tabParams)
    },
    methods:{
        openCreate(){

        },
        getTableData(params){
            this.$http.get('get-space-actions-list', params).then((res)=>{
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

    }
}
</script>
 
<style lang="less">
.g-space-manage{
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
