<template>
    <div class="g-product-goods">
        <SectionTitle title="社区商品配置"></SectionTitle>   
        <div class="m-goods-operation">
            <div class="u-select">
                <div class="u-select-list">
                    <span class="u-select-label">所属地区</span>
                    <Cascader 
                        :data="areaList"
                         v-model="area" 
                         class="Cascader"
                         @on-change="changeCity"
                ></Cascader>
                </div>
                <div class="u-select-list">
                    <span  class="u-select-label">社区开业状态</span>
                    <Select
                        v-model="tabParams.communityStatus"
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
                        v-model="tabParams.appPublished"
                        style="width:100px"
                        placeholder="请选择"
                        clearable
                    >
                        <Option
                            v-for="item in appStatusList"
                            :value="item.value"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                    </Select>
                </div>
                <div class="u-search">
                    <div class="u-select-list">
                        <span  class="u-select-label">小程序上架状态</span>
                        <Select
                            v-model="tabParams.kmPublished"
                            style="width:100px"
                            placeholder="请选择"
                            clearable
                        >
                            <Option
                                v-for="item in kmStatusList"
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
                            v-model="tabParams.communityName"
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
import utils from '~/plugins/utils';

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
            areaList: [],
            comStatusList:[
                {
                 label:'已开业',
                 value:'1'   
                },
                {
                 label:'未开业',
                 value:'0'   
                }
            ],
            appStatusList:[
                {
                 label:'已上架',
                 value:'1'   
                },
                {
                 label:'未上架',
                 value:'0'   
                }
            ],
            kmStatusList:[
                {
                 label:'已上架',
                 value:'2'   
                },
                {
                 label:'待上架',
                 value:'1'   
                },
                {
                 label:'未上架',
                 value:'0'   
                }
            ],
            columns:[
                 {
                    title: '社区编码',
                    key: 'communityCode',
                    align:'center',
                },
                {
                    title: '社区名称',
                    key: 'communityName',
                    align:'center',
                },
                {
                    title: '所属城市',
                    key: 'cityName',
                    align:'center',
                },
                {
                    title: '社区开业状态',
                    key: 'communityStatus',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.communityStatus=='1'?'已开业':'未开业'
                        return h('span',{},status)
                    }
                },
                {
                    title: 'APP上架状态',
                    key: 'appPublished',
                    align:'center',
                    render:(h,params)=>{
                        let status=params.row.appPublished=='1'?'已上架':'未上架'
                         return h('span',{},status)
                    }
                },
                {
                    title: '小程序上架状态',
                    key: 'kmPublished',
                    align:'center',
                    render:(h,params)=>{
                        switch(params.row.kmPublished){
                            case 1:
                            return h('span',{},'待上架');
                            break;
                            case 2:
                            return h('span',{},'已上架');
                            break;
                            case 0:
                            return h('span',{},'未上架');
                            break;
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
    created(){
        var _this=this;
        this.getCityinfo(' ',function(){
            _this.tabParams=Object.assign({},_this.$route.query);
            _this.formItem=Object.assign({},_this.$route.query);
            let areaArr=[];
           
            if(_this.formItem.id){
                areaArr.push(_this.formItem.id*1)
            }
            if(_this.formItem.cityId){
                areaArr.push(_this.formItem.cityId*1)
            }
            _this.area=areaArr;
            
            let appStatus={
                '1':'已上架',
                '0':'未上架',
            }
            let kmStatu={
                '2':'已上架',
                '0':'未上架',
                '1':'待上架'
            }
            _this.formItem.appPublishName=appStatus[_this.formItem.appPublished];
            _this.formItem.kmPublishName=kmStatu[_this.formItem.kmPublished];
            
            
        });
        this.getTableData(this.$route.query);
        
        
      
    },
   
    methods:{
        getCityinfo(params,callback){
            this.$http.get('get-krmting-mobile-community-city-list').then((res)=>{
               let provinceList=res.data.provinceList.map((item)=>{
                   item.label=item.name;
                   item.value=item.id;
                   if(item.subAreaList){
                       item.children=item.subAreaList.map((childrenItem)=>{
                            childrenItem.label=childrenItem.name;
                            childrenItem.value=childrenItem.id;
                            return childrenItem;
                        })
                   }
                     
                   return item;
               }) 
                this.areaList=provinceList;
                callback && callback();
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
                
        },
        changeCity(value){
            if(value[1]){
                this.tabParams.id=value[0]
                this.tabParams.cityId=value[1]
            }else{
                this.tabParams.id=''
                this.tabParams.cityId=''
            }
        },
        changePage(page){
            this.tabParams.page=page;
            this.page=page;
            this.getTableData(this.tabParams);
        },
        getTableData(params){
            this.$http.get('get-krmting-mobile-community-list', params).then((res)=>{
                this.meetingList=res.data.items;
                this.totalCount=res.data.totalCount;
            }).catch((err)=>{
                this.$Notice.error({
                    title:err.message
                });
            })
                
        },
        lowerSubmit(){
            let params=Object.assign({},this.tabParams);
            params.page=1;
            params.pageSize=15;
            utils.addParams(params);
           
        },
        jumpEdit(params){
            window.open(`/product/goods/edit/${params.communityId}`,'_blank');
          
        },
        openView(params){
            window.open(`/product/goods/view/${params.communityId}`,'_blank');
          
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


