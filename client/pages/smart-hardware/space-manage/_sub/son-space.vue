<template>
    <div class="g-spacemanage-detail">
        <div class='u-bread'>
            <Breadcrumb>
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem to="/smart-hardware/space-manage">{{faterName}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="u-search" >
            <Button class='u-btn-add' type="primary" @click="showCreate">添加空间</Button>
            <Button type="error" @click="deleteAll">批量移除</Button>
        </div>
        <div class="u-table">
            <Table @on-select='selectCheckBox' @on-select-all='selectCheckBox' @on-selection-change='selectCheckBox'  border :columns="spaceColumns" :data="tableList" />
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
            v-model="deleteSpace"
            title="移除"
            ok-text="确定"
            cancel-text="取消"
            width="490"
        >
            <div class="u-spacemanage-cancel">
                确认要移除空间吗？
            </div>
            <div slot="footer">
                <Button type="primary" @click="onDeleteSpace">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDelete">取消</Button>
            </div>
        </Modal>
        <div v-if='showSpaceList'>
            <Modal
                v-model="spaceList"
                title="添加"
                width="1000"
                @on-cancel="spaceListCancel"
            >
                <div class="u-search" >
                    <Button type="primary" @click="addAll">批量添加</Button>
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
                <Table @on-select='selectAddCheckBox' @on-select-all='selectAddCheckBox' @on-selection-change='selectAddCheckBox'  border :columns="ModelColumns" :data="tableListAll" />
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page
                            :current="pageAll"
                            :total="totalAllCount"
                            :page-size="pageAllSize"
                            show-total
                            show-elevator
                            @on-change="changeAllPage"
                        />
                    </div>
                </div>
                <div  slot="footer"></div>
            </Modal>
            <Modal
                v-model="addSpace"
                title="添加"
                ok-text="确定"
                cancel-text="取消"
                width="490"
            >
                <div class="u-spacemanage-cancel">
                    确认要添加空间吗？
                </div>
                <div slot="footer">
                    <Button type="primary" @click="onAddSpace">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="openAdd">取消</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import dateUtils from 'vue-dateutils';
export default {
    components:{
    },
    props:{

    },
    data(){
        return{
            faterName:'',
            page:1,
            pageSize:15,
            totalCount:0,
            pageAll:1,
            pageAllSize:10,
            totalAllCount:0,
            openCreate:false,
            deleteSpace:false,
            deleteId:'',
            addId:'',
            showSpaceList:false,
            spaceList:false,
            addSpace:false,
            tabAllParams:{
                page:1,
                pageSize:10,
            },
            tabParams:{
                page:1,
                pageSize:15,
            },
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
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
                  title: '添加时间',
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
                                        this.openDelete(obj.row)
                                    }
                                }
                            }, '移除'),
                        ]);
                    }
              }
            ],
            ModelColumns:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '社区',
                    key: 'communityName',
                    align:'center',
                },
                {
                    title: '楼层',
                    key: 'floor',
                    align:'center',
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
                    title: '操作',
                    key: 'operation',
                    align:'center',
                    render:(h,obj)=>{
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
                                        this.openAdd(obj.row)
                                    }
                                }
                            }, '添加'),
                        ]);
                    }
                }
            ],
            tableListAll:[],
            tableList:[]
        }
    },
    mounted(){
        this.faterName = this.$route.query.name
        this.getTableData(this.tabParams);
        this.getTableAllData(this.tabAllParams);
        this.getCommunityList();
    },
    methods:{
        showCreate(){
            this.showSpaceList=!this.showSpaceList;
            this.spaceList=!this.spaceList
        },
        spaceListCancel(){
            this.showSpaceList=!this.showSpaceList;
        },
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        changeAllPage(page){
            this.tabAllParams.page=page;
            this.pageAll=page;
            this.getTableAllData(this.tabAllParams);
        },
        selectCheckBox(selection){
            let str = []
            selection.forEach((v,i)=>{
                str.push((v.id).toString())
            })
            this.deleteId = str.join(',')
        },
        selectAddCheckBox(selection){
            let str = []
            selection.forEach((v,i)=>{
                str.push((v.id).toString())
            })
            this.addId = str.join(',')
        },
        getTableAllData(para){
            this.$http.get('get-space-actions-list', para).then((res)=>{
                this.tableListAll=res.data.items;
                this.totalAllCount=res.data.totalCount;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        getTableData(para){
            let {params}=this.$route;

            para.parentId = params.sub
            this.$http.get('get-space-actions-list', para).then((res)=>{
                this.tableList=res.data.items;
                this.totalCount=res.data.totalCount;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
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
                this.formItem.floor=""
                this.tabParams.floor=""
            }

            this.tabAllParams.page=1;
            this.tabAllParams.communityId=id;
            this.getTableAllData(this.tabAllParams);
        },
        floorChange(form){
            this.tabAllParams.page=1;
            this.tabAllParams.floor=form;
            this.getTableAllData(this.tabAllParams);
        },
        typeChange(form){
            this.tabAllParams.page=1;
            this.tabAllParams.type=form;
            this.getTableAllData(this.tabAllParams);
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
        deleteAll(){
            if(this.deleteId){
                this.deleteSpace=!this.deleteSpace;
            }else{
                this.$Notice.error({
                    title:'请选择要移除的空间'
                });
            }

        },
        openDelete(row){
            if(row && row.id){
                this.deleteId = (row.id).toString()
            }
            this.deleteSpace=!this.deleteSpace;
        },
        onDeleteSpace(){
            this.$http.post('remove-children', {ids:this.deleteId}).then((res)=>{
                this.$Notice.success({
                    title:'删除成功'
                });
                this.openDelete();
                this.deleteId='';
                this.getTableData(this.tabParams);
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        openAdd(row){
            if(row && row.id){
                this.addId = (row.id).toString()
            }
            this.addSpace=!this.addSpace;
        },
        addAll(){
            if(this.addId){
                this.addSpace=!this.addSpace;
            }else{
                this.$Notice.error({
                    title:'请选择要添加的空间'
                });
            }
        },
        onAddSpace(){
            let {params}=this.$route;
            this.$http.post('add-children', {childIds:this.addId,spaceId:params.sub}).then((res)=>{
                this.$Notice.success({
                    title:'添加成功'
                });
                this.openAdd();
                this.showCreate();
                this.addId='';
                this.getTableData(this.tabParams);
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
.g-spacemanage-detail{
    .u-table{
        padding:0 20px;
    }
    .ivu-table-cell{
        padding:0;
    }
}
.u-bread{
    padding:20px 0 0 20px;
}
.u-search{
    height:32px;
    margin:16px 0;
    padding:0 20px;
    .u-btn-add{
        margin-right:20px;
    }
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

.u-spacemanage-cancel{
    margin-top: 30px;
    text-align: center;
}
</style>


