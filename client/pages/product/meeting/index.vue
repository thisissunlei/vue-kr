<template>
    <div class="g-product-meeting">
        <SectionTitle title="会议室配置"></SectionTitle>
        <div class="m-meeting-operation">
             <Button type="primary" @click="jumpCreate">新建</Button>
             <div class="u-select">
                 <div class="u-select-list">
                    <span class="u-select-label">所属社区</span>
                    <Select
                        v-model="formItem.communityId"
                        style="width:200px"
                        placeholder="请选择"
                        clearable
                    >
                       <Option v-for="(option, index) in communityList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                 </div>
                 <div class="u-select-list">
                        <span  class="u-select-label">APP上架状态</span>
                        <Select
                            v-model="formItem.appPublish"
                            style="width:100px"
                            placeholder="请选择"
                            clearable
                        >
                            <Option
                                v-for="item in statusList"
                                :value="item.value"
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                 </div>
                 <div class="u-select-list">
                        <span  class="u-select-label">KM上架状态</span>
                        <Select
                            v-model="formItem.kmPublish"
                            style="width:100px"
                            placeholder="请选择"
                            clearable
                        >
                            <Option
                                v-for="item in statusList"
                                :value="item.value"
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                 </div>
                
             </div>
             <div class="u-search">
                  <div class="u-select-list">
                        <span class="u-select-label">可容纳人数</span>
                        <Input
                            v-model="formItem.minCapacity"
                            placeholder="请输入正整数"
                            style="width: 100px"
                        />
                        <span class="u-input-line"> - </span> 
                        <Input
                            v-model="formItem.maxCapacity"
                            placeholder="请输入正整数"
                            style="width: 100px"
                        /> 
                  </div>
                  <div class="u-select-list">
                        <span class="u-select-label">会议室名称</span>
                        <Input
                            v-model="formItem.roomName"
                            placeholder="请输入搜索关键词"
                            style="width: 150px"
                        />
                  </div>
                  <div class="u-select-list">
                        <span class="u-select-label">会议室编号</span>
                        <Input
                            v-model="formItem.roomCode"
                            placeholder="请输入搜索关键词"
                            style="width: 150px"
                        />
                  </div>
                  <Button type="primary" @click="lowerSubmit">搜索</Button>
             </div>
            
        </div>
        <div class="u-table">
            <Table border  :columns="columns" :data="meetingList" ref="table" stripe></Table>
            <div style="margin: 10px 0 ;overflow: hidden">
                <div style="float: right;">
                    <Page
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize"
                        @on-change="changePage"
                        show-total
                        show-elevator
                    ></Page>
                </div>
            </div>
        </div>
        <Modal
            v-model="openCancel"
            title="提示信息"
            ok-text="确定"
            cancel-text="取消"
            width="490"
        >
            <div class="u-cancel-title">
                确认要删除该会议室吗？
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitDelete">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="openDelete">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
export default {
    components:{
        SectionTitle,
    },
    head () {
        return {
            title: "会议室配置"
        }
    },
    data(){
        return{
            totalCount:0,
            page:1,
            pageSize:15,
            meetingList:[],
            tabParams:{
                page:1,
                pageSize:15,
            },
            formItem:{

            },
            roomId:'',
            openCancel:false,
            communityList:[],
            statusList:[
                {
                 label:'已上架',
                 value:'true'   
                },
                {
                 label:'未上架',
                 value:'false'   
                },
            ],
            columns:[
                {
                    title: '会议室编号',
                    key: 'id',
                    align:'center',
                },
                {
                    title: '会议室名称',
                    key: 'name',
                    align:'center',
                },
                {
                    title: '所属社区',
                    key: 'communityName',
                    align:'center',
                },
                {
                    title: '可容纳人数',
                    key: 'capacity',
                    align:'center',
                },
                {
                    title: '所在楼层',
                    key: 'floor',
                    align:'center',
                },
                {
                    title: 'APP上架状态',
                    key: 'appPublish',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.appPublish?'已上架':'未上架'
                        return status
                    }
                },
                {
                    title: 'KM上架状态',
                    key: 'kmPublish',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.kmPublish?'已上架':'未上架'
                        return status
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
                                            this.jumpEdit(params.row);
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
                                             this.openDelete(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }

                },
            ],
           
        }
    },
    mounted:function(){
        this.getTableData(this.tabParams);
        this.getCommunityList(' ');
	},
    methods:{
        getCommunityList(name){
            let params = {
                    cmtName:name
                }
            this.$http.get('get-community-new-list', params).then((res)=>{
              let  list = res.data.cmts;
                list.map((item)=>{
                    let obj =item;
                    obj.label = item.cmtName;
                    obj.value = item.cmtId;
                    return obj;
                });
                this.communityList = list;
               
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
        getTableData(params){
                
            this.$http.get('get-krmting-room-list', params).then((res)=>{
                this.meetingList=res.data.items;
                this.totalCount=res.data.totalCount;
                this.openSearch=false;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
                
        },
        lowerSubmit(){
            let params=Object.assign({},this.formItem);
            params.page=1;
            params.pageSize=15;
            this.getTableData(params);
        },
        jumpCreate(){
             window.open(`/product/meeting/create`,'_blank');
        },
        jumpEdit(params){
            window.open(`/product/meeting/edit/${params.id}`,'_blank');
          
        },
        submitDelete(){
            let params={
                    roomId: this.roomId
                }
                this.$http.post('delete-krmting-room', params).then((res)=>{
                    this.$Notice.success({
                        title:'删除成功'
                    });  
                    this.openDelete();
                    this.getTableData(this.Params);
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                 
        },
         openDelete(value){
            this.openCancel=!this.openCancel;
            if(value){
                this.roomId=value.id
            }
        },
    }
}
</script>

<style lang="less">
.g-product-meeting{
    .m-meeting-operation{
         padding:20px 20px;
         height:130px;
         .u-select{
            display: inline-block;
            padding-left:20px;
            height:40px;
         }
         .u-select-list{
             display: inline-block;
             margin:0 20px;
            
         }
         .u-select-label{
             padding-right:10px;
             white-space:nowrap; 
         }
         .u-search{
             height:50px;
             margin-top:15px;
             .u-select-list{
                 margin-left:0;
             }
         }
        .m-search{
            color:#2b85e4;
            display:inline-block;
            margin-left:10px;
            font-size:14px;
            cursor:pointer;
            
        }
    }
    .u-table{
        padding:0 20px;
    }

}
</style>


