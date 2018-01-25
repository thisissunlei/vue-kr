<template>
  <div class="g-steward-manage">
      <SectionTitle label="管家管理"></SectionTitle>
       <div class="u-search" >
            <Button type="primary" @click="onCreate">新建</Button>
            <div style='display:inline-block;float:right;padding-right:20px;'>
                    <Input 
                        v-model="Params.stewardName" 
                        placeholder="请输入客户名称"
                        style="width: 240px"
                    />
                    <div class='m-search' @click="lowerSubmit">搜索</div>
            </div>
             <div style='display:inline-block;float:right;padding-right:20px;'>
                <div class='u-community-label'>社区</div>
                <SelectCommunities
                    :test="formItem"
                    :onchange="onChangeCommunity"
                    :value="Params.label"
                ></SelectCommunities>
            </div>
        </div>
         <div class="u-table">
            <Table  border :columns="columns" :data="tableList"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page 
                        :current="page"
                        :total="totalCount"
                        :page-size="pageSize" 
                        show-total 
                        show-elevator
                        @on-change="changePage"
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
            确认要删除该管家吗？
        </div>
        <div slot="footer">
            <Button type="primary" @click="onDeleteSubmit">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="openDelete">取消</Button>
        </div>
    </Modal>
          
</div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';
import SelectCommunities from '~/components/SelectCommunities';
export default {
    name:'steward',
    components:{
        SectionTitle,
        SelectCommunities
    },
    data () {
        return{
            Params:{
                page:1,
                pageSize:15,
                stewardName:'',
                cmtId:'',
                label:'请选择'
            },
            formItem:{
                communityId:''
            },
            page:1,
            totalCount:1,
            pageSize:15,
            openCancel:false,
            manageId:'',
            columns:[
                {
                    title: '姓名',
                    key: 'mbrName',
                    align:'center'
                },
                {
                    title: '所属社区',
                    key: 'cmtName',
                    align:'center'
                },
                {
                    title: '职位',
                    key: 'typeDescr',
                    align:'center'
                },
                {
                    title: '留言',
                    key: 'introduce',
                    align:'center',
                    width:380,

                },
                {
                    title: '状态',
                    key: 'statusDescr',
                    align:'center',
                    width:80,
                },
                {
                    title: '最后编辑时间',
                    key: 'updateTime',
                    align:'center',
                    render(h, obj){
                            if(!obj.row.updateTime){
                                return '-'
                            }
                            let time=dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.row.updateTime));
                            return time;
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
                                            this.openEdit(params.row)
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
        this.getTableData(this.$route.query);
        if(!this.$route.query.stewardName){
            this.$route.query.stewardName=""
        }
        this.Params=this.$route.query;
    },
    methods:{
        getTableData(params){
            this.$http.get('get-steward-list', params, res => {
                this.tableList=res.data.items;
                this.totalCount=res.data.totalCount;
            }, err => {
                this.$Notice.error({
                    title:err.message
                });
            })
        },
        openEdit(params){
            let manageId=params.manageId;
             window.open(`./steward-setting/edit/${manageId}`,'_blank');
        },
        onCreate(){
             window.open('./steward-setting/create','_blank');
        },
        lowerSubmit(){
                this.page=1;
                this.Params.page=1;
                utils.addParams(this.Params);
        },
        changePage(page){
            this.Params.page=page;
            this.page=page;
            this.getTableData(this.Params);
        },
        openDelete(value){
            this.openCancel=!this.openCancel;
            if(value){
                this.manageId=value.manageId
            }
        },
        onDeleteSubmit(){
            let params={
                    manageId: this.manageId
                }
                this.$http.post('delete-steward', params, res => {
                    this.$Notice.success({
                        title:'删除成功'
                    });  
                    this.openDelete();
                    this.getTableData(this.Params);
                }, err => {
                    this.$Notice.error({
                        title:err.message
                    });
                })
        },
        onChangeCommunity(form){
            this.Params.cmtId=form.value;
            this.Params.label=form.label
            utils.addParams(this.Params);
            this.getTableData(this.Params)
        }


    }
    

}
</script>

<style lang="less">
.g-steward-manage{

.u-search{
    height:32px;
    margin:16px 0;
    padding:0 20px;
}

.u-table{
    padding:0 20px;
} 
.ivu-checkbox-wrapper{
    margin-right:0;
}

.ivu-table-cell{
    padding:0;
}

.m-search{
    color:#2b85e4; 
    display:inline-block;
    margin-left:10px;
    font-size:14px;
    cursor:pointer;
}
.u-cancel-title{
    width:334px;
    text-align: center;
    margin:40px auto 35px;
    font-size:14px;
}
.u-community-label{
    float:left;
    line-height:32px;
    margin-right:10px;
    font-size:14px;
}
.com-select-community{
    float:left;
}

}
</style>


