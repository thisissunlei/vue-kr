<style lang="less"> 
    .page {
        margin-top:20px;
    }
    .m-bill-search{
        display:inline-block;
        height:22px;
        margin:16px 20px;
        vertical-align: bottom;

        span{
            width:22px;
            height:22px;
            background-size: contain;  
            float:right;
            cursor:pointer;
            background:url('~assets/images/upperSearch.png') no-repeat center;
            background-size: contain;  
            float:right;
        }
    }
    .m-search{
            color:#2b85e4;
            display:inline-block;
            cursor:pointer;
     }
</style>


<template>

    <div>
        <sectionTitle label = "合同列表"></sectionTitle>
       <div style='text-align:right;margin-bottom:10px'>
          
            <div style='display:inline-block;margin:10px 20px;'>
                <span style='padding-right:10px'>客户名称</span>
                <i-input 
                    v-model="params.customName" 
                    placeholder="请输入客户名称"
                    style="width: 252px"
                    @on-change="changeCustomer"
                ></i-input>
            </div>
            <div class='m-search' @click="lowerSubmit">搜索</div>
            <div class="m-bill-search" @click="showSearch">
                <span></span>   
            </div> 
        </div>
        <Table 
            border 
            ref="selection" 
            :columns="columns" 
            :data="detail" 
            @on-selection-change = "selectCheck"
        ></Table>
        <div style="margin: 10px;overflow: hidden">
            <Button type="primary" @click="outSubmit">导出</Button>
            <div style="float: right;">
                <Page :total="totalCount" @on-change="changePage" show-total show-elevator></Page>
            </div>
        </div>
        <Modal
            v-model="openSearch"
            title="高级搜索"
            width="660"
            @on-ok='upperSubmit'
        >
            <HeightSearch v-on:bindData="upperChange" mask='join'></HeightSearch>
            <div slot="footer">
                    <Button type="primary" @click="upperSubmit">确定</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="showSearch">取消</Button>
            </div>
        </Modal>
        
    </div>
  
</template>
<script>
    import axios from 'kr/axios';
    import hoc from '~/components/hoc.js'
    import sectionTitle from '~/components/sectionTitle.vue';
    import krUpload from '~/components/krUpload.vue';
    import HeightSearch from './heightSearch';
    import dateUtils from 'vue-dateutils';
    import CommonFuc from 'kr/utils';
    export default {
        components: {
            sectionTitle,
            krUpload,
            HeightSearch
        },
        data () {
            return {
                params:{
                    page:1,
                    pageSize:15,
                },
                selectAllData:[],
                loadingStatus: false,
                file: null,
                upperData:{},
                upperError:false,
                openSearch:false,
                detail:[],
                totalCount:1,
                columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '合同编号',
                        key: 'serialNumber',
                        align:'center'
                    },
                    {
                        title: '客户名称',
                        key: 'customName',
                        align:'center'
                    },
                    {
                        title: '社区名称',
                        key: 'communityName',
                        align:'center'
                    },
                    {
                        title: '合同类型',
                        key: 'contractType',
                        align:'center'
                    },
                    {
                        title: '合同状态',
                        key: 'contractStatusName',
                        align:'center',
                    },
                    {
                        title: '合同创建时间',
                        key: 'cTime',
                        align:'center',
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(obj.row.cTime));
                            return time;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        render:(h,params)=>{
                            let arr = params.row.file||[];
                            let newArr = []
                            for(let i=0;i<arr.length;i++){
                                newArr.push(Object.assign({"name":arr[i].fileName,"url":''},arr[i]))
                            }
                           var btnRender=[
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
                                            this.openView(params)
                                        }
                                    }
                                }, '查看'), h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openApplication(params)
                                        }
                                    }
                                }, '下载'),
                                h(krUpload, {
                                    props: {
                                        action:'//jsonplaceholder.typicode.com/posts/',
                                        file: newArr,
                                        columnDetail:params.row||{}
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.openApplication(params)
                                        }
                                    }
                                },'ppp')
                                ];
                          
                           return h('div',btnRender);  
                        }
                    }
                ],
                detail:[]
            }
        },
        mounted(){
           this.getListData(this.params);
        },
        methods:{
            handleFormatError(){
                console.log("格式不正确=======")
            },
            //上传失败
            handleError(){
                console.log("上传失败---------");
            },
            //上传成功
            handleSuccess(){

            },
            handleUpload(file){
               this.file = file;
                return false;
            },
            h1Click(){
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500)
            },
            showSearch (params) {
                this.openSearch=!this.openSearch;
            },
            openView(params){
                location.href=`./12/joinView`;
            },
            openCancel(params){
                this.openNullify=true;
            },
            openEdit(params){

            },
            openApplication(params){
                
            },
            nullifySubmit (){
                console.log('作废');
            },
            outSubmit (){
                var _this=this;
                var params = Object.assign({},this.params);
                params.ids = [].concat(this.selectAllData);
                CommonFuc.commonExport(params,'/api/krspace-erp-web/wf/station/contract/enter/export');
            },
            getListData(params){
                var _this=this;
                axios.get('get-center-list-contract', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.detail=r.data.items;
                    _this.openSearch=false;
                }, e => {
                    _this.$Message.info(e);
                })   
            },
            //批量下载按钮点击
            batchBtnClick(){

            },
            //分页事件
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
            //搜索change事件
            changeCustomer(param){
                // this.params.customerName=param.target.value;
            },
            //搜索框
            lowerSubmit(){
                this.getListData(this.params);
            },
            // 高级查询修改
            upperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },
             //高级查询确定
            upperSubmit(){
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.minCTime=this.params.minCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.minCTime)):'';
                this.params.maxCTime=this.params.maxCTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.maxCTime)):'';
                this.getListData(this.params);

            },
            //多选按钮被点击
            selectCheck(selection){
                var ids=[];
                selection.map((item,index)=>{
                    ids.push(item.id);
                })
                this.selectAllData = ids;
            },
        },
        
    }
</script>