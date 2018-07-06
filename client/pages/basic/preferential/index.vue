<template>
<div class="g-order">
    <SectionTitle title="社区优惠配置"></SectionTitle>
    <div class="u-search" >
        <Button type="primary" @click="onCreate" style="display:none">新建社区优惠</Button> 
        <span style="padding:0 10px"></span> 
        <div style="display:inline-block;width:400px;">
            选择社区：
            <Select :v-model="cmtId" @on-change="changeContent" style="width:300px">
                <Option v-for="(option, index) in communityList" :value="option.value" :key="option.value">{{option.label}}</Option>
            </Select>
        </div>
        
    </div>
    <div class="u-table">
        <Table border  :columns="columns" :data="tableData"  stripe></Table>
        <div style="margin: 10px 0 ;overflow: hidden">
            <!-- <Button type="primary" @click="onExport">导出</Button> -->
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
    
   <!-- 新建 -->
     <Modal
        v-model="openCreate"
        title="新建社区优惠"
        ok-text="确定"
        cancel-text="取消"
        width="660"
        :styles="{top: '20px'}"
     >  
        <Create ref="fromFieldNewPage" v-if="openCreate" @newPageData="newPageDataChange" :editData.sync="editData"  editStatus="create" />
    
        <div slot="footer">
            <Button type="primary" @click="onSubmit('formContent')">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelCreate">取消</Button>
        </div>
    </Modal>
    <!-- 编辑 -->
    <Modal
        v-model="openEdit"
        title="编辑参数"
        ok-text="确定"
        cancel-text="取消"
        width="660"
        :styles="{top: '20px'}"
     >
       
        <div slot="footer">
            <Button type="primary" @click="editSubmit('formContent')">确定</Button>
            <Button type="ghost" style="margin-left: 8px" @click="cancelEdit">取消</Button>
        </div>
    </Modal>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onChangeOpen"
    ></Message>
</div>
</template>


<script>

import SectionTitle from '~/components/SectionTitle';
import dateUtils from 'vue-dateutils';
import Message from '~/components/Message';
import utils from '~/plugins/utils';
import Create from './create.vue';
import CreateSale from './createSale.vue';


export default {
        name: 'Meeting',
        components:{
            SectionTitle,
            Message,
            CreateSale,
            Create
        },
        data () {
            return {
                communityList:[],
                cmtId:'',
                openSale:false,
                editData:{},
                parameterData:{},
                openCreate:false,
                openEdit:false,
                totalCount:1,
                tableData:[],
                pageSize:15,
                page:1,
                params:{
                    page:1,
                    pageSize:15
                },
                saleForm:{},
                openMessage:false,
                warn:'',
                MessageType:'',
                msg:'',
                //假数据
                dataItem:[],
                columns: [
                    {
                        title: '社区名称',
                        key: 'cmtName',
                        align:'center'
                    },
                    {
                        title: '优惠类型',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '优惠描述',
                        key: 'descName',
                        align:'center',
                    },
                    {
                        title: '有效期开始日期',
                        key: 'validStart',
                        align:'center',
                        render: (h, params) => {
                            return  dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.validStart))
                        }
                    },
                    {
                        title: '有效期结束日期',
                        key: 'validEnd',
                        align:'center',
                        render: (h, params) => {
                            return  dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.validEnd))
                        }
                    },
                    {
                        title: '创建日期',
                        key: 'ctime',
                        align:'center',
                        render: (h, params) => {
                            return  dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.ctime))
                        }
                    },
                      {
                        title: '创建人',
                        key: 'username',
                        align:'center',
                    },
                     {
                        title: '状态',
                        key: 'validEnd',
                        align:'center',
                         render: (h, params) => {
                            let today = new Date().getTime();
                            let result;
                            result = today > (params && params.row.validEnd) ?'失效':'有效'; 
                            return h('span',{},result)
                        }
                    }
                    // {
                    //     title: '操作',
                    //     key: 'operation',
                    //     align:'center',
                    //     width:110,
                    //     render:(h,params)=>{
                    //        return h('div', [
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'text',
                    //                     size: 'small'
                    //                 },
                    //                 style: {
                    //                     color:'#2b85e4'
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.showEdit(params.row)
                                                
                    //                     }
                    //                 }
                    //             }, '编辑')
                    //         ]);  
                    
                    // }
                    // }
                ]
                
            }
        },
        watch:{
            openEdit(){
                if(!this.openEdit){
                    this.editData = {}
                }
            }
        },
        created(){
             this.getTableData(this.params);
             this.getList()
        },
        methods:{
            getList(){
                this.$http.get('join-bill-community','').then((response)=>{    
                    let list = response.data.items;
                    list.map((item)=>{
                        let obj = item;
                        obj.label = item.name;
                        obj.value = item.id+'';
                        return obj;
                    });
                    this.communityList = list;
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            },
            getTableData(params){
                this.$http.get('get-sale-list', params).then((res)=>{
                    this.tableData=res.data.items;
                    this.totalCount=res.data.totalCount;
                }).catch((err)=>{
                    this.$Notice.error({
                        title:err.message
                    });
                })
                 
            },
            onCreate(){
                this.openCreate = true;
            },
            cancelCreate(){
                this.openCreate = false;
            },
            onSubmit(name){
                //校验表单
                var newPageRefs = this.$refs.fromFieldNewPage.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }else{
                        
                        this.parameterData.items = '';
                        this.parameterData.paramVal = this.parameterData.paramType=='JSON'?JSON.stringify(this.parameterData.paramVal):this.parameterData.paramVal
                        // 校验json表单
                        if(this.parameterData.paramType == 'JSON'){
                            for(let key in this.parameterData.paramVal){
                                if(!key || !this.parameterData.paramVal[key]){
                                   isSubmit = false; 
                                }
                            }
                        }
                        this.parameterData.enableFlag = this.parameterData.flag;
                        if(!isSubmit){
                            this.$Notice.error({
                                title:'请填写完 参数'
                            });
                            return;
                        }
                        // 提交数据
                        this.$http.post('saveParamData', this.parameterData).then((res)=>{
                            this.getTableData()
                            this.openCreate = false;
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })

                    }
                })
            },
            editSubmit(name){
                var newPageRefs = this.$refs.fromFieldNewPage.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }else{
                        this.parameterData.enableFlag = this.parameterData.flag;

                        // 校验json表单
                        if(this.parameterData.paramType == 'JSON'){
                            for(let key in this.parameterData.paramVal){
                                if(!key || !this.parameterData.paramVal[key]){
                                   isSubmit = false; 
                                }
                            }
                        }
                        if(!isSubmit){
                            this.$Notice.error({
                                title:'请填写完 参数'
                            });
                            return;
                        }

                         this.parameterData.items = '';
                        this.parameterData.paramVal = (this.parameterData.paramType=='JSON' && typeof this.parameterData.paramVal != 'string')?JSON.stringify(this.parameterData.paramVal):this.parameterData.paramVal

                        this.$http.post('saveParamData', this.parameterData).then((res)=>{
                            this.openEdit = false;
                            this.getTableData(this.params)
                        }).catch((err)=>{
                            this.$Notice.error({
                                title:err.message
                            });
                        })

                    }
                })
            },
            cancelEdit(){
                this.openEdit = false;
                this.editData = {}
            },
            onChangeOpen(){
                console.log('changeOpen')
            },
            changeContent(value){
                this.params.cmtId = value;
                this.params.page = 1;
                this.page = 1;
                this.getTableData(this.params);
            },
            changePage(page){
                this.params.page=page;
                this.page=page;
                this.getTableData(this.params);
            },
            showEdit(item){

                this.editData = item;
                this.parameterData = item;
                this.openEdit = true;
            },
            newPageDataChange(data){
                if(data){
                    this.parameterData = data;
                }
            },


        }

    }
</script>

<style lang="less"> 
.g-order{
  .u-search{
        height:32px;
        margin:16px 20px;
    }
    .ivu-table-cell{
        padding:0;
    }
    .u-table{
        padding:0 20px;
    }
    .m-search{
        color:#2b85e4; 
        display:inline-block;
        margin-left:10px;
        font-size:14px;
        cursor:pointer;
    }
}   
.u-cancel-title{
    width:334px;
    text-align: center;
    margin:40px auto 35px;
    font-size:14px;
}
</style>