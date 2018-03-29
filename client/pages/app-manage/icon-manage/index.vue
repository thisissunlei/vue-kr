<template>
<div class="g-icon-manage">
      <SectionTitle title="Icon管理" />
      <div class="u-search" >
            <Button type="primary" @click="jumpCreate">新建</Button>
            <div class="u-search-right">
                <div class="u-search-right-list" style="margin-right:20px;">
                    <div class='u-icon-label'>图标位置</div>
                    <Select
                        v-model="Params.iconLocation"
                        style="width:200px"
                        placeholder="请选择"
                        clearable
                        label-in-value
                        @on-change="onLocationChange"
                    >
                            <Option
                                v-for="item in locationList"
                                :value="item.code"
                                :key="item.code"
                            >
                                {{ item.name }}
                            </Option>
                    </Select>
                </div>
                <div class="u-search-right-list">
                    <div class='u-icon-label'>启用状态</div>
                    <Select
                        v-model="Params.enable"
                        style="width:200px"
                        placeholder="请选择"
                        clearable
                        label-in-value
                        @on-change="onEnablenChange"
                    >
                            <Option
                                v-for="item in enableType"
                                :value="item.value"
                                :key="item.value"
                            >
                                {{ item.label }}
                            </Option>
                    </Select>
                </div>
            </div>
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
import utils from '~/plugins/utils';


export default {
    name:'Icon',
    components:{
        SectionTitle
    },
    head () {
        return {
            title: "Icon管理"
        }
    },
    data(){
        return{
            Params:{
                page:1,
                pageSize:15,
                iconLocation:'',
                enable:""
            },
            page:1,
            pageSize:15,
            totalCount:0,
            tableList:[],
            iconId:'',
            openCancel:false,
            IsCookie:true,
            locationList:[],
            enableType:[
                {
                    label:'启用',
                    value:'1'
                },
                {
                    label:'不启用',
                    value:'0'
                }
            ],
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
        this.getLocationList();

       
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
             window.open('/app-manage/icon-manage/create','_blank');
        },
        jumpEdit(params){
            let iconId=params.iconId;
             window.open(`/app-manage/icon-manage/edit/${iconId}`,'_blank');
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
        getLocationList(){
            this.$http.get('get-icon-location', '').then((res)=>{
                  this.locationList=res.data.locations;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
        },
        onLocationChange(form){
            this.Params.iconLocation=form.value;
            this.Params.locationLabel=form.label;
            utils.addParams(this.Params);
            this.getTableData(this.Params)
           

        },
        onEnablenChange(form){
            this.Params.enable=form.value;
            this.Params.enableLabel=form.label;
            utils.addParams(this.Params);
            this.getTableData(this.Params)
        }




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
    .u-search-right{
        float:right;
        width:560px;
    }
    .u-search-right-list{
        float:left;
    }
    .u-icon-label{
        float:left;
        line-height:32px;
        margin-right:10px;
        font-size:14px;
    }
    

}
</style>


