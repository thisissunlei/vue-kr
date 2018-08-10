<template>
  <div class="enter-filed"> 
    <SectionTitle title="预约参观"></SectionTitle>
    <div class="buttons" style="margin-top:20px;">
        <span style="display:inline-block;width:20px"></span>
        <Buttons type="primary" label='新建' @click="openNew" checkAction='csrclue_visit_save_edit'/>
        <span style="display:inline-block;width:20px"></span>
        <Buttons type="primary" label='导入' @click="submitImport" checkAction='csrclue_visit_execle'/>
        <span style="display:inline-block;width:20px"></span>
        <Buttons type="primary" label='导出' @click="submitExport" checkAction='csrclue_visit_execle'/>
        
    </div>
    <SearchForm 
      @searchClick="searchClick"
      @clearClick="clearClick"
      @initData="initData"
      identify='daily'
    />
    <div class='enter-filed-table'>
        <Table :loading="loading" :height="height" border stripe :columns="columns" :data="dailyOldData" style="max-width:1920px">            
            <div slot="loading">
                    <Loading/>
            </div> 
        </Table>
        <div style="float: right;margin:10px 0">
            <Page 
                :current="page" 
                :total="totalCount" 
                :page-size="pageSizes" 
                @on-change="changePage" 
                show-total 
                show-elevator
            ></Page>
        </div>
    </div>
    <Message 
        :type="MessageType" 
        :openMessage="openMessage"
        :warn="warn"
        @changeOpen="onMessageChange"
    />
    <Modal v-model="openCreate" title="新建" ok-text="保存" width="650" cancel-text="取消" class-name="vertical-center-modal">
        <Create  @on-result-change="onResultChange" v-if="openCreate"
        ref="goodsNewPage"/>
        <div slot="footer">
            <Button type="primary" @click="submitStation">确定</Button>
        </div>
    </Modal>
    <Modal v-model="showEdit" title="编辑" ok-text="保存" width="650" cancel-text="取消" class-name="vertical-center-modal">
        <Edit  @on-result-change="onResultChange" v-if="showEdit"
        ref="goodsEditPage" :editData="editRow"/>
        <div slot="footer">
            <Button type="primary" @click="submitEditStation">确定</Button>
        </div>
    </Modal>
    <Modal v-model="showImport" title="编辑" ok-text="保存" width="200" cancel-text="取消" class-name="vertical-center-modal">
        <div class="content" style="text-align:center">
            <Upload
                ref="upload"
                name="file"
                :before-upload="handleUpload"
                action="/api/order/csr-clue/impot"
                :with-credentials="IsCookie"
            >
                <div class="u-upload-content">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>请选择上传文件</p>
                    <div class="u-upload-file-name" v-if="file !== null"> {{ file.name }}</div>
                </div>
            </Upload>
            
        </div>
        <div slot="footer">
            <Button type="primary" @click="download">下载模板</Button>
            <Button type="primary" @click="uploadSubmit">确定</Button>
        </div>
    </Modal>
    <Modal v-model="showDelete" title="提示" ok-text="保存" width="300" cancel-text="取消" class-name="vertical-center-modal">
        <div class="content" style="text-align:left;font-size:16px;margin-top:15px">
            是否删除本条数据？
            
        </div>
        <div slot="footer">
            <Button type="primary" @click="deleteRow">确定</Button>
            <Button type="ghost" @click="cancelDelete">取消</Button>
        </div>
    </Modal>
  </div>
</template>


<script>
import ToolTip from '~/components/ToolTip';
import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
import SearchForm from './searchForm';
import Create from './create.vue';
import Edit from './edit.vue';
import Message from '~/components/Message';
import Loading from '~/components/Loading';
import SectionTitle from '~/components/SectionTitle.vue'
    import Buttons from '~/components/Buttons';

var layoutScrollHeight=0;
    export default {
        name: 'EnterField',
        components:{
            SearchForm,
            Message,
            ToolTip,
            Loading,
            SectionTitle,
            Create,
            Buttons,
            Edit
        },
        head() {
            return {
                title: '预约参观'
            }
        },
        data () {
            return { 
                showImport:false,
                showEdit :false,
                openCreate:false,
                dailyOldData:[],
                totalCount:0,
                loading:true,
                spinLoading:false,
                tabsValue:'dailyList', 
                theHead:false,
                theEnd:true,
                sideBar:true,
                height:'200',
                tabForms:{
                    page:1,
                    pageSize:15,
                },
                totalPages:'',
                page:1,
                pageSizes:15,
                endParams:{},
                tableList:[],
                columns:[
                    {
                        title: '姓名',
                        key: 'name',
                        align:'center',
                        width: 150,
                        fixed: 'left'
                    },
                    {
                        title: '电话',
                        key: 'mobile',
                        width:120,
                        align:'center',
                        render(h,params){
                            return params.row.mobile?params.row.mobile:'--'
                        }
                    },
                    {
                        title: '一级来源',
                        key: 'channelTypeStr',
                        width:100,
                        align:'center',
                        render(h,params){
                            return params.row.channelTypeStr?params.row.channelTypeStr:'--'
                        }
                    },
                    {
                        title: '二级来源',
                        align:'center',
                        width:100,
                        key: 'channelName',
                        render(h,params){
                            return params.row.channelName?params.row.channelName:'--'
                        }
                    },
                    {
                        title: '官网预约参数',
                        align:'center',
                        width:160,
                        key: 'promoCode',
                        render(h,params){
                            return params.row.promoCode?params.row.promoCode:'--'
                        }
                    },
                    {
                        title: '预约城市',
                        align:'center',
                        width:90,
                        key: 'cityName',
                        render(h,params){
                            return params.row.cityName?params.row.cityName:'--'
                        }
                    },
                    {
                        title: '预约社区',
                        width:120,
                        align:'center',
                        key: 'communityName',
                        render(h,params){
                            return params.row.communityName?params.row.communityName:'--'
                        }
                    },
                    {
                        title: '参观日期',
                        align:'center',
                        width:110,
                        key: 'appiontTime',
                        render(h,params){
                            var ren=params.row.appiontTime?dateUtils.dateToStr("YYYY-MM-DD",new Date(params.row.appiontTime)):'-';
                            return ren

                        }
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        width:160,
                        key: 'cTime',
                        render(h,params){
                            var ren=params.row.cTime?dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss",new Date(params.row.cTime)):'-';
                            return ren

                        }
                    },
                    // {
                    //     title: '是否联系',
                    //     align:'center',
                    //     width:110,
                    //     key: 'endDate',
                    // },
                    // {
                    //     title: '是否到访',
                    //     align:'center',
                    //     width:80,
                    //     key: 'rentDays',
                    //     render(h,params){
                    //         return params.row.rentDays+'天'
                    //     }
                    // },
                    {
                        title: '推介人电话',
                        align:'center',
                        width:140,
                        key: 'refreePhone',
                        render(h,params){
                            return params.row.refreePhone?params.row.refreePhone:'--'
                        }
                    },
                    {
                        title: '推介人姓名',
                        align:'center',
                        width:110,
                        key: 'refreeName',
                        render(h,params){
                            return params.row.refreeName?params.row.refreeName:'--'
                        }
                    },
                    {
                        title: '拜访人数',
                        align:'center',
                        width:90,
                        key: 'visitNum',
                        render(h,params){
                            return params.row.visitNum?params.row.visitNum:'--'
                        }
                    },
                    {
                        title: '优惠券（6免0.5，12免1）',
                        align:'center',
                        width:200,
                        key: 'couponTypeStr',
                    },
                    {
                        title: '是否注册会员',
                        align:'center',
                        width:120,
                        key: 'registeredMem',
                    },
                    {

                        title: '操作',
                        align:'center',
                        width:140,
                        render:(tag,params)=>{
                           var btnRender=[
                               tag(Buttons, {
                                   props: {
                                        type: 'text',
                                        checkAction:'csrclue_visit_save_edit',
                                        label:'编辑',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;display:inline-block;'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row)
                                        }
                                    }
                                }),tag(Buttons, {
                                   props: {
                                        type: 'text',
                                        checkAction:'csrclue_visit_delete',
                                        label:'删除',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;display:inline-block;'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteOpen(params.row)
                                        }
                                    }
                                })];
                           return tag('div',btnRender);  
                        }
                    },
                ],
                openMessage:false,
                MessageType:'',
                warn:'',
                submitData:{},
                editRow:{},
                file: null,
                IsCookie:true,
                showDelete:false,
                deleteData:{}
            }
        },
        mounted(){
            if(this.tabForms.cityId){
                this.tabForms = this.$route.query;
                this.getCommonParam(); 
            }   
            var height = document.body.clientHeight-200;
            if(height>760){
                height=760;
            }
            this.height = height;

        },
        watch:{
            tabForms:function(val,old){
                this.getCommonParam();
                this.getData(this.tabForms); 
            }
        },
        methods:{
            deleteOpen(row){
                this.deleteData = row;
                this.showDelete = true;
            },
            cancelDelete(){
                this.showDelete = false;
            },
            deleteRow(){
                this.$http.post('delete-csr-clue', {id:this.deleteData.id}).then((res)=>{
                    this.showDelete = false;
                    this.tabForms=Object.assign({},{page:1,pageSize:15});
                    this.endParams=Object.assign({},this.tabForms);
                    this.getData(this.tabForms)

                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                })
            },
            edit(row){
                this.editRow = row;
                this.showEdit = !this.showEdit;
            },
            getCommonParam(){
                this.tabForms.page=1;
                this.dailyOldData=[];
                this.loading=true;
            },
            //搜索
            searchClick(formItem){
                this.tabForms=Object.assign({},this.tabForms,formItem);
                this.endParams=Object.assign({},this.tabForms);
                this.getData(this.tabForms)


            },
            //清空
            clearClick(formItem){
                this.tabForms=Object.assign({},formItem);
                this.endParams=Object.assign({},this.tabForms);
                this.getData(this.tabForms)
            },
            //数据变化
            dataParams(data){
                this.endParams=Object.assign({},data);
                this.getData(this.endParams);
            },
            initData(formItem){
                this.tabForms=Object.assign({},formItem,this.tabForms);
                this.dataParams(this.tabForms);
            },
            getData(params){
                if(params.cEndTime instanceof Date){
                    console.log('getData',params.cEndTime)
                    params.cEndTime = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(params.cEndTime))
                }
                    

                if(params.cStartTime instanceof Date){
                    params.cStartTime = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(params.cStartTime))
                }
                if(params.startAppiontTime instanceof Date){
                    params.startAppiontTime = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(params.startAppiontTime))
                    console.log('getData--startAppiontTime',params.startAppiontTime)
                }
                if(params.endAppiontTime instanceof Date){
                    params.endAppiontTime =dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(params.endAppiontTime))
                }
                this.$http.get('get-csr-clue-list', params).then((res)=>{
                    this.tableList=res.data.items;
                    this.dailyIndentify=res.data.items;
                    this.totalCount=res.data.totalCount;
                    this.page=res.data.page;
                    this.loading=false;
                    this.spinLoading=false;
                    this.dailyOldData=this.tableList;
                    this.$nextTick(() => {
                        var div = document.getElementsByClassName('ivu-table-body')[0]
                        div.scrollTop = 0;
                    }) 

                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                }) 
            },
            //信息提示框
            onMessageChange(data){
                this.openMessage=data;
            },
            submitExport(){
                utils.commonExport(this.tabForms,'/api/order/csr-clue/export');
            },
            changePage(page){
                this.tabForms.page = page;
                this.getData(this.tabForms)
            },
            onResultChange(data){
                this.submitData = data;
            },
            openNew(){
                this.openCreate = !this.openCreate
            },
            save(params){
                params.appiontTime = dateUtils.dateToStr("YYYY-MM-DD 00:00:00",new Date(params.appiontTime))
                this.$http.post('save-csr-clue', params).then((res)=>{
                    this.openCreate = false
                    this.showEdit = false;
                    this.tabForms=Object.assign({},{page:1,pageSize:15});
                    this.endParams=Object.assign({},this.tabForms);
                    this.getData(this.tabForms)

                }).catch((error)=>{
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=error.message;
                }) 
            },
            submitStation(){
                let newPage=this.$refs.goodsNewPage.$refs;
                newPage['formItemDaily'].validate((valid) => {
                    if (valid) {
                       this.save(this.submitData)
                    }else{
                        this.$Notice.error({
                            title: message
                        });
                    }
                }) 

            },
            submitEditStation(){
                let newPage=this.$refs.goodsEditPage.$refs;
                newPage['formItemDaily'].validate((valid) => {
                    if (valid) {
                       this.save(this.submitData)
                    }else{
                        this.$Notice.error({
                            title: message
                        });
                    }
                })
            },
            uploadSubmit(){
                var data=new FormData();
                data.append('file',this.file);
                data.isPut = true;
                this.$http.post('impot-csr-clue', data).then((res)=>{
                    this.showImport = false;
                    this.tabForms=Object.assign({},{page:1,pageSize:15});
                    this.endParams=Object.assign({},this.tabForms);
                    this.getData(this.tabForms)
                }).catch((err)=>{
                    this.submitDisabled=false;
                    this.$Notice.error({
                        title:err.message
                    });
                })
            },
            submitImport(){
                this.showImport = !this.howImport
            },
            download(){
                utils.commonExport('','/api/order/csr-clue/download-excel');
            },

            handleUpload (file) {
                this.file = file;
                return false;
            },
        }
    }
</script>

<style lang="less">
    .vertical-center-modal{
            display: flex;
            align-items: center;
            justify-content: center;
            .ivu-modal{
                top: 0;
            }
    }
    .enter-filed{
        .enter-filed-table{
            position: relative;
            padding: 0 ;
            .line{
                display:inline-block;
                width:100%;
                border-top:1px solid #dddee1;
                margin-bottom:10px;
            }
            .daily-table{
                padding-bottom:77px; 
                margin-top: 30px;
                .ivu-tooltip{
                    width:100%
                }
                .ivu-tooltip-rel{
                    width:100%
                }
                .ivu-tooltip-popper{
                    word-break: break-all;
                    word-wrap: break-word;
                    max-width:200px;
                }
                .ivu-tooltip-inner{
                    white-space: normal;
                }
                .list-footer{
                    padding:20px 0 20px 20px;
                    position: absolute;
                    bottom: 0px;
                    padding-left:0;
                }
                .on-export-middle{
                    position: fixed;
                    bottom: 53px;
                    z-index: 999;
                    left: 20px;
                    padding:17px 0 20px 0;
                }
                .priceClass{
                    .ivu-table-cell{
                        padding:0;
                        padding-right:5px;
                    }
                }
                .statusClass{
                    .ivu-table-cell{
                        padding:0 5px;
                    }
                }
                .daily-here-date{
                    .ivu-table-cell{
                        padding:0 10px;
                    }
                }
                .header-here{
                    opacity:1;
                }
                .header-no{
                    transition: opacity 0.2 ease;
                    opacity: 0;
                }
            }
        }
    }
     .enter-filed-table{
            padding-bottom:77px; 
            margin:0 20px;
            //margin-top: 30px;
            position: relative;
            .ivu-tooltip{
                width:100%
            }
            .ivu-tooltip-rel{
                width:100%
            }
            .ivu-tooltip-popper{
                word-break: break-all;
                word-wrap: break-word;
                max-width:200px;
            }
            .ivu-tooltip-inner{
                white-space: normal;
            }
            .spin-position-fix {
                position: relative;
                .ivu-spin-fix{
                    height: 50px;
                    bottom:60px;
                    background-color:transparent;
                }
            }
            .list-footer{
                padding:20px 0 20px 20px;
                position: absolute;
                bottom: 0px;
                padding-left:0;
            }
            .on-export-middle{
                position: fixed;
                bottom: 53px;
                z-index: 999;
                left: 20px;
                padding:17px 0 20px 0;
            }
            .priceClass{
                .ivu-table-cell{
                    padding:0;
                    padding-right:5px;
                }
            }
            .statusClass{
                .ivu-table-cell{
                    padding:0 5px;
                }
            }
            .daily-here-date{
                .ivu-table-cell{
                    padding:0 10px;
                }
            }
            .header-here{
                opacity:1;
            }
            .header-no{
                transition: opacity 0.2 ease;
                opacity: 0;
            }
        }
</style>


