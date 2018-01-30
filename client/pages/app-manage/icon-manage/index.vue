<template>
<div class="g-icon-manage">
      <SectionTitle title="Icon管理" />
      <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建</Button>
            
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
                        @on-change="onPageChange"
                    />
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
                确认要删除该Icon吗？
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
import dateUtils from 'vue-dateutils';

export default {
    name:'Icon',
    components:{
        SectionTitle
    },
    data(){
        return{
            Params:{
                page:1,
                pageSize:4,
            },
            page:1,
            pageSize:4,
            totalCount:0,
            tableList:[],
            iconId:'',
            openCancel:false,
            columns:[
                {
                    title: '图标位置',
                    key: 'locationDesc',
                    align:'center'
                },
                {
                    title: '图标名称',
                    key: 'iconName',
                    align:'center'
                },
                {
                    title: '图标',
                    key: 'iconUrl',
                    align:'center',
                    render(h, obj){
                        if(!obj.row.iconUrl){
                            return '-'
                        }
                        return <img style="width:40px" src={`${obj.row.iconUrl}`}/>;
                    }
                },
                {
                    title: '图标类型',
                    key: 'typeDesc',
                    align:'center'
                },
                {
                    title: '是否启用',
                    key: 'enableDesc',
                    align:'center'
                },
                {
                    title: '更新时间',
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
                    title: '更新人',
                    key: 'operater',
                    align:'center'
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
                                            this.openDelete(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);  
                        }
                },
            ]
        }
    },
    created(){
        let query=this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.getTableData(query);
            this.Params=query;
          
        }else{
            this.getTableData(this.Params)
        }
       
    },
    methods:{
         getTableData(params){
            this.$http.get('get-icon-list', params).then((res)=>{
                this.tableList=res.data.items;
                this.totalCount=res.data.totalCount;
            }).catch((err)=>{
                 this.$Notice.error({
                    title:err.message
                });
            })
        },
        jumpCreate(){
             window.open('./icon-manage/create','_blank');
        },
        jumpEdit(params){
            let iconId=params.iconId;
             window.open(`./icon-manage/edit/${iconId}`,'_blank');
        },
        openDelete(value){
            this.openCancel=!this.openCancel;
            if(value){
                this.iconId=value.iconId
            }
        },
        onPageChange(page){
            this.Params.page=page;
            this.page=page;
            this.getTableData(this.Params);
        },
         submitDelete(){
            let params={
                    iconId: this.iconId
                }
                this.$http.post('delete-icon', params).then((res)=>{
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
    },
}
</script>
<style  lang="less" scoped>
.g-icon-manage{
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


