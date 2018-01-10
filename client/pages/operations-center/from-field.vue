


<template>

    <div class="from-field-list">
        <sectionTitle label = "合同"></sectionTitle>
        <div style="padding:20px;padding-right:0;">
            <Button type="primary" class='join-btn'>新建撤场</Button>
            <div class="m-bill-search" @click="showSearch">
                <span></span>   
            </div> 
         </div>
        <Table 
            border 
            ref="selection" 
            :columns="columns" 
            :data="detail" 
            style="margin:20px"
        ></Table>
        <div style="margin: 10px 20px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalCount" :page-size='15' @on-change="changePage" show-total show-elevator></Page>
            </div>
        </div>
       
        <Message 
                :type="MessageType" 
                :openMessage="openMessage"
                :warn="warn"
                @changeOpen="onChangeOpen"
        ></Message>
        <!-- <Loading :loading='loadingStatus'/> -->
        
    </div>
  
</template>
<script>


   
    import sectionTitle from '~/components/SectionTitle.vue';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload.vue';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    var maxWidth = 170;
    export default {
        components: {
            sectionTitle,
            krUpload,
            Loading,
            Message
        },
        head () {
            return {
                title: "合同列表"
            }
           
        },
        data () {
            return {
                params:{
                    page:1,
                    pageSize:15,
                },
                newWin:'',

                MessageType:'',
                openMessage:false,
                warn:'',
                openDown:false,
                isCachet:false,
                openTakeEffect:false,
                openDescribe:false,
                selectAllData:[],
                loadingStatus: true,
                file: null,
                otherAgreed:0,
                parameter:{},//获取pdf-id的参数
                upperData:{},//高级查询的数据
                upperError:false,
                openSearch:false,
                describeError:false,
                detail:[],
                describeData:{},//其他约定的数据
                columnDetail:{},//每一行的数据
                totalCount:1,
                maxWidth:170,
                columns: [
                    
                    {
                        title: '离场编号',
                        key: 'withdrawalNum',
                        align:'center',
                    },
                    {
                        title: '客户名称',
                        key: 'csrName',
                        align:'center',
                    },
                    {
                        title: '社区名称',
                        key: 'cmtName',
                        align:'center',
                    },
                    {
                        title: '服务尾日',
                        key: 'lastDay',
                        align:'center',
                    },
                    {
                        title: '状态',
                        key: 'withDrawalStatusName',
                        align:'center',
                    },
                    
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                      
                        render:(h,params)=>{
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
                                            this.downLoadClick(params)
                                        }
                                    }
                                }, '作废')];
                           return h('div',btnRender);  
                        }
                    }
                ],
                detail:[]
            }
        },
       created(){
          var params=Object.assign({},{page:1,pageSize:15},this.$route.query);
          this.getListData(params);
          this.params=params; 
        },
        methods:{
            config:function(){
                this.$Notice.config({
                    top: 80,
                    duration: 3
                });
            },
            //合同生效
            contractFor(detail){
                this.columnDetail = detail.row;
                this.takeEffectSwitch()
            },
            showSearch (params) {

                this.openSearch=!this.openSearch;
                utils.clearForm(this.upperData);
            },
            openView(params){
                window.open(`./${params.row.id}/view-center?contractType=&requestId=${params.row.requestId}`,'_blank')  
            },
            getListData(params){
                var _this=this;
                 this.config()
                 this.$http.get('get-from-field-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.detail=r.data.items;
                    _this.openSearch=false;
                   _this.loadingStatus=false;
                }, e => {
                    _this.$Notice.error({
                        title:e.message
                    });
                })   
            },
            //分页事件
            changePage (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
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
                utils.addParams(this.params);

            },
            selectCachet(select){
             this.isCachet = select;
            
            },
            downSwitch(){
                this.openDown = !this.openDown;
            },
            downLoadClick(params){
                var parameter = {requestId:params.row.requestId}
                this.parameter = parameter;
               this.downSwitch(); 
            },
            urlUpLoad(detail,col){
               
                var _this = this;
                this.$http.post("post-list-upload-url", {
                    fileList:JSON.stringify(detail),
                    requestId:col.requestId,
                }, (response) => {
                    // _this.$Notice.success({
                    //     title:"合同已生效"
                    // });
                     _this.getListData(_this.params);
                }, (error) => {
                    that.$Notice.error({
                        title:error.message
                    });
                })   
            },
            allAttachmentChagne(requestId){
                this.detail = this.detail.map((item,index)=>{
                    if(item.requestId == requestId){
                        item.haveAttachment = true;
                        item.haveAttachmentName = "有";
                    }
                    return item;
                })
            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            
        },
        
    }
</script>
<style lang="less"> 
   .from-field-list{
       .m-bill-search{
            display:inline-block;
            height:22px;
            margin:16px 20px;
            vertical-align: bottom;
            float: right;
            span{
                width:22px;
                height:22px;
                background:url('~assets/images/upperSearch.png') no-repeat center;
                background-size: contain;  
                float:right;
                cursor:pointer;
            }
        }
   }
</style>