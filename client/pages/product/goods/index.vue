<template>
    <div class="g-product-goods">
        <SectionTitle title="社区商品配置"></SectionTitle>   
        <div class="m-goods-operation">
            <div class="u-select">
                <div class="u-select-list">
                    <span class="u-select-label">所属地区</span>
                    <Cascader :data="areaList" v-model="area" class="Cascader"></Cascader>
                </div>
                <div class="u-select-list">
                    <span  class="u-select-label">社区开业状态</span>
                    <Select
                        v-model="formItem.comPublish"
                        style="width:100px"
                        placeholder="请选择"
                        clearable
                    >
                        <Option
                            v-for="item in comStatusList"
                            :value="item.value"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
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
                <div class="u-search">
                    <div class="u-select-list">
                        <span  class="u-select-label">KM上架状态</span>
                        <Select
                            v-model="formItem.KMPublish"
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
                        <span class="u-select-label">社区名称</span>
                        <Input
                            v-model="formItem.roomName"
                            placeholder="请输入搜索关键词"
                            style="width: 150px"
                        />
                  </div>
                  <div class="u-select-list">
                        <span class="u-select-label">社区编号</span>
                        <Input
                            v-model="formItem.roomCode"
                            placeholder="请输入搜索关键词"
                            style="width: 150px"
                        />
                  </div>
                  <Button type="primary" @click="lowerSubmit">搜索</Button>
                </div>
                
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
    </div>
</template>

<script>
import SectionTitle from '~/components/SectionTitle';
export default {
    components:{
        SectionTitle,
    },
    head(){
        return{
            title:"社区商品设置"
        }
    },
    data () {
        return {
            totalCount:0,
            page:1,
            pageSize:15,
            meetingList:[],
            tabParams:{
                page:1,
                pageSize:15,
            },
            area: [],
            formItem:{},
            areaList: [{
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫'
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            
            }],
            comStatusList:[
                {
                 label:'已开业',
                 value:'true'   
                },
                {
                 label:'未开业',
                 value:'false'   
                },
            ],
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
                    title: '社区编码',
                    key: 'id',
                    align:'center',
                },
                {
                    title: '社区名称',
                    key: 'name',
                    align:'center',
                },
                {
                    title: '所属城市',
                    key: 'communityName',
                    align:'center',
                },
                {
                    title: '社区开业状态',
                    key: 'comPublish',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.comPublish?'已开业':'未开业'
                        return status
                    }
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
                    key: 'KMPublish',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.KMPublish?'已上架':'未上架'
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
                                            this.openView(params.row);
                                    }
                                }
                            }, '查看')
                        ]);
                    }

                },
            ]
        }
    },
    mounted:function(){
		this.getTableData(this.tabParams)
    },
    methods:{
        changePage(){
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
        jumpEdit(params){
            window.open(`/product/goods/edit/${params.id}`,'_blank');
          
        },
        openView(params){
            window.open(`/product/goods/view/${params.id}`,'_blank');
          
        },
    }
}
</script>

<style lang="less">
.g-product-goods{
    .m-goods-operation{
        padding:20px 20px;
        height:130px;
        .u-select{
        display: inline-block;
        height:40px;
        }
        .u-select-list{
            display: inline-block;
            margin:0 20px;
            .Cascader{
                display: inline-block;
            }
        }
        .u-select-label{
            padding-right:10px;
            white-space:nowrap; 
            color: #666666;
        }
        .u-search{
             height:50px;
             margin-top:15px;
             .u-select-list{
                 margin:0 20px;
             }
        }
    }
    .u-table{
        padding:0 20px;
    }
}
</style>


