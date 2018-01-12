<template>
    <div class="from-field-list">
        <sectionTitle label = "撤场记录管理"></sectionTitle>
        <div style="padding:20px;padding-right:0;">
            <Button type="primary" @click="showNewPage" class='join-btn'>新建撤场</Button>
            <div style="float:right;">
                <div style='display:inline-block;margin:10px 20px;'>
                    <span style='padding-right:10px'>客户名称</span>
                    <i-input 
                        v-model="params.csrName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                    
                    ></i-input>
                </div>
                <div style="display:inline-block;color: #2b85e4;cursor: pointer;" @click="lowerSubmit">搜索</div>
                <div class="m-bill-search" @click="showSearch">
                    <span></span>   
                </div> 
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
        <Modal
            v-model="openSearch"
            title="高级查询"
            width="660"
        >
            <HeightSearch :params = "params" @fromFieldBindData="upperChange" mask='join'></HeightSearch>

            <div slot="footer">
                <Button type="primary" @click="submitSearch">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
            </div>
        </Modal>
         <Modal
            v-model="openNewPage"
            title="新建离场"
            width="660"
        >
            <NewPage ref="fromFieldNewPage" @newPageData="newPageDataChange" :close="showNewPage" ></NewPage>
           <div slot="footer">
                <Button v-if="!newPageIsSubmit" disabled>确定</Button>
                <Button v-if="newPageIsSubmit"  type="primary" @click="submitNewPage('fromFieldValidate')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="showNewPage">取消</Button>
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
    import sectionTitle from '~/components/SectionTitle.vue';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload.vue';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import HeightSearch from './HeightSearch'
    import NewPage from './NewPage'
    export default {
        components: {
            sectionTitle,
            krUpload,
            Loading,
            Message,
            HeightSearch,
            NewPage,
           
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
                MessageType:'',
                openNewPage:false,
                openMessage:false,
                warn:'',
                openDown:false,
                isCachet:false,
                upperError:false,
                openSearch:false,
                detail:[],
                totalCount:1,
                newPageData:{},
                newPageIsSubmit:true,
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
                        render(h, obj){
                            let time=dateUtils.dateToStr("YYYY-MM-DD",new Date(obj.row.lastDay));
                            return time;
                        }
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
                            var status = params.row.withdrawalStatus;

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
                                }, '查看')];
                            if(status === "HAS_INITATE"){
                                btnRender.push( h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.invalidClick(params)
                                        }
                                    }
                                }, '作废'));
                            }
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
            showSearch(params) {

                this.openSearch=!this.openSearch;
                // utils.clearForm(this.upperData);
            },
            showNewPage(){
                this.openNewPage = !this.openNewPage;
            },
            openView(params){
                window.open(`./from-field/${params.row.id}/view`,'_blank')  
            },
            getListData(params){
                var _this=this;
                 this.config()
                 this.$http.get('get-from-field-list', params, r => {
                    _this.totalCount=r.data.totalCount;
                    _this.detail=r.data.items;
                   
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
            lowerSubmit(){
                 utils.addParams(this.params);
            },
             //高级查询确定
            submitSearch(){
                
                if(this.upperError){
                    return ;
                }
                this.params=Object.assign({},this.params,this.upperData);
                this.params.StartLastDay=this.params.StartLastDay?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.StartLastDay)):'';
                this.params.EndLastDay=this.params.EndLastDay?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.EndLastDay)):'';
                utils.addParams(this.params);

            },
            onChangeOpen(data){
                this.openMessage=data;
            },
            invalidClick(data){
                var id = data.row.id;
                var that = this;
                this.$http.post('post-from-field-invalid', {id,id}, r => {
                    utils.addParams(that.params);
                   
                }, e => {
                    that.$Notice.error({
                        title:e.message
                    });
                })   
            },
            submitNewPage(name){
                var newPageRefs = this.$refs.fromFieldNewPage.$refs;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {
                      return;
                    }
                })
                var that = this;
                var params =Object.assign({},this.newPageData);
                this.$http.post('post-from-field-newpage',params, r => {
                       
                    that.newPageIsSubmit = false;
                    that.openMessage=true;
                    that.MessageType="success";
                    that.warn="新建成功";
                    utils.addParams(that.params);
                    that.showNewPage();
                }, e => {
                    that.newPageIsSubmit = false;
                    that.openMessage=true;
                    that.MessageType="error";
                    that.warn=e.message;
                })   
                
            },
            newPageDataChange(data){
                if(data){
                    var that = this;
                    data.leaveDate = dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.leaveDate))
                    
                    this.newPageData = Object.assign({},data);
                    var params = Object.assign({},data)
                    this.$http.post('post-create-from-field',params, r => {
                        that.newPageIsSubmit = true;
                    
                    }, e => {
                        that.newPageIsSubmit = false;
                        that.openMessage=true;
                        that.MessageType="error";
                        that.warn=e.message;
                    })   
                }
            }
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