<template>
    <div class="g-space-manage">
         <SectionTitle title="空间管理" />
         <div class="u-search" >
            <Button type="primary" @click="showCreate">新建空间</Button> 
            <div class="u-select-content">
                <div class="u-select">
                    <Select 
                            v-model="formItem.communityId" 
                            style="width:200px"
                            placeholder="请选择社区" 
                            filterable
                            clearable
                            @on-change="communityChange"
                        >
                            <Option v-for="item in communityList" :value="`${item.id}`" :key="item.id">{{ item.name }}</Option>
                        </Select>
                </div>
                 <div class="u-select">
                     <Select 
                            v-model="formItem.floor" 
                            style="width:200px"
                            placeholder="请选择楼层" 
                            clearable
                            @on-change="floorChange"
                        >
                            <Option v-for="item in floorList" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="u-select">
                    <Select 
                        v-model="formItem.type" 
                        style="width:200px"
                        placeholder="请选择空间类型"
                        clearable
                        @on-change="typeChange"
                    >
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
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
        <Modal
            v-model="openCreate"
            title="新建空间"
            ok-text="确定"
            cancel-text="取消"
            width="500"
            class="u-create"
        >
            <CreateSpace 
                v-if="openCreate"
                :submit="createSubmit"
                :close="showCreate"
            />
            <div  slot="footer"></div>
        </Modal>
        <Modal
            v-model="openEdit"
            title="编辑空间"
            ok-text="确定"
            cancel-text="取消"
            width="500"
            class="u-create"
        >
            <EditSpace 
                v-if="openEdit"
                :submit="editSubmit"
                :close="showEdit"
                :detail="detail"
            />
            <div  slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import CreateSpace from './createSpace';
import EditSpace from './editSpace';

export default {
    components:{
      SectionTitle,
      CreateSpace,
      EditSpace
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
            formData:"",
            openCreate:false,
            openEdit:false,
            detail:{},
            formItem:{
                communityId:'',
                floor:'',
                type:''
            },
            communityList:[],
            floorList:[],
            typeList:[
                {
                    label:'会议室',
                    value:'BOARDROOM'
                },
                {
                    label:'路演厅',
                    value:'ROADSHOW_HALL'
                },
                {
                    label:'开放区',
                    value:'OPEN_ZONE'
                },
                {
                    label:'走廊',
                    value:'AISLE'
                },
                {
                    label:'通用空间',
                    value:'COMMON'
                }
            ],
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
                  render:(h,obj)=>{
                      if(obj.row.type=="OFFICE" || obj.row.type=="STATION"){
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
                                            this.jumpEdit(obj.row)
                                        }
                                    }
                                }, '管理子空间')
                                

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
                                            this.showEdit(obj.row)
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
                                            this.jumpEdit(obj.row)
                                        }
                                    }
                                }, '删除'),
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
                                            this.jumpEdit(obj.row)
                                        }
                                    }
                                }, '管理子空间')
                                

                            ]); 
                    }
                  }
              }
            ],
            tableList:[]
        }
    },
    mounted(){
        this.getTableData(this.tabParams);
        this.getCommunityList();
    },
    methods:{
        getCommunityList(){
            this.$http.get('get-space-community-list', '').then((res)=>{
                res.data.items.map((item,index)=>{
                    item.label=item.name;
                    item.value=item.id;
                    return  item;
                })
                this.communityList=res.data.items;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            }) 
        },
        communityChange(id){
            if(id){
                this.getFloor(id);
            }else{
                this.floorLis=[];
            }
            
            this.tabParams.page=1;
            this.tabParams.communityId=id;
            this.getTableData(this.tabParams);
        },
        floorChange(form){
            this.tabParams.page=1;
            this.tabParams.floor=form;
            this.getTableData(this.tabParams);
        },
        typeChange(form){
            this.tabParams.page=1;
            this.tabParams.type=form;
            this.getTableData(this.tabParams);
        },
        getFloor(id){
            let form={
                communityId:id
            }
            this.$http.get('get-space-floor', form).then((res)=>{
                let floorList=[]
                    res.data.floors.map((item,index)=>{
                        let obj={}
                        obj.label=item;
                        obj.value=item;
                        floorList.push(obj)
                    })

                this.floorList=floorList
                
                
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                }) 
        },
        showEdit(params){
            if(params){
                this.detail=params;
            }
            this.openEdit=!this.openEdit;
        },
        showCreate(){
            this.openCreate=!this.openCreate;
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
        getFormData(form){
            this.formData=form;
        },
        createSubmit(form){
            this.$http.post('create-actions-space', form).then((res)=>{
                this.$Notice.success({
                    title:'新建成功'
                });
                this.openCreate=false;
                this.getTableData(this.tabParams);
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        editSubmit(form){
             this.$http.post('edit-actions-space', form).then((res)=>{
                this.$Notice.success({
                    title:'编辑成功'
                });
                this.openCreate=false;
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
    .u-select-content{
        float:right;
        width:650px;
        .u-select{
           float:left;
           width:200px;
           margin-left:10px;
        }
    }
}
.u-create{
    .ivu-modal-footer{
       padding:0; 
    }
}

</style>  
