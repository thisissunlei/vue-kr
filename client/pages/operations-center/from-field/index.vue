<template>
    <div class="from-field-list">
        <SectionTitle title = "撤场记录管理"/>
        <div style="padding:20px;padding-right:0;">
            <Buttons label="新建撤场" type="primary" @click="showNewPage" class='join-btn' checkAction='csr_withdrawal_save'/>

           
            <div style="float:right;">
                <div style='display:inline-block;margin:10px 20px;'>
                    <span style='padding-right:10px'>客户名称</span>
                    <i-input 
                        v-model="params.csrName" 
                        placeholder="请输入客户名称"
                        style="width: 252px"
                        @keyup.enter.native="onKeyEnter($event)"
                    />
                </div>
                <div style="display:inline-block;color: #2b85e4;cursor: pointer;" @click="submitLowerSearch">搜索</div>
                <div class="m-bill-search" @click="showSearch">
                    <span />
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
                <Page :total="totalCount" :page-size='15' @on-change="onPageChange" show-total show-elevator/>
            </div>
        </div>

        <Modal
            v-model="openSearch"
            title="高级查询"
            width="660"
        >
            <HeightSearch @fromFieldBindData="onUpperChange" />

            <div slot="footer">
                <Button type="primary" @click="submitUpperSearch">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="showSearch">取消</Button>
            </div>
        </Modal>

         <Modal
            v-model="openNewPage"
            title="新建撤场"
            width="660"
        >
            <NewPage ref="fromFieldNewPage" v-if="openNewPage" @newPageData="newPageDataChange" :close="showNewPage" />
           <div slot="footer">
                <Button v-if="!isNewPageSubmit" disabled>确定</Button>
                <Button v-if="isNewPageSubmit" :disabled="isDisabled"  type="primary" @click="submitNewPage('fromFieldValidate')">确定</Button>
                <Button type="ghost" style="margin-left:8px" @click="showNewPage">取消</Button>
            </div>
        </Modal>

        <Message 
            :type="MessageType" 
            :openMessage="openMessage"
            :warn="warn"
            @changeOpen="onMessageChange"
        />

    </div>
</template>


<script>
    import SectionTitle from '~/components/SectionTitle.vue';
    import Loading from '~/components/Loading';
    import krUpload from '~/components/KrUpload.vue';
    import dateUtils from 'vue-dateutils';
    import utils from '~/plugins/utils';
    import Message from '~/components/Message';
    import HeightSearch from './HeightSearch';
    import NewPage from './NewPage';
    import Buttons from '~/components/Buttons';
    export default {
        components: {
            SectionTitle,
            krUpload,
            Loading,
            Message,
            HeightSearch,
            NewPage,
            Buttons,
            
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
                isNewPageSubmit:true,
                isDisabled:false,
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
                            return h('span',{},time);
                            // return time;
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
                            var btnRender=[
                               h(Buttons, {
                                    props: {
                                        type: 'text',
                                        checkAction:'csr_withdrawal_show',
                                        label:'查看',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.jumpView(params)
                                        }
                                    }
                                })];
                            if(params.row.showButton){
                                btnRender.push( h(Buttons, {
                                    props: {
                                        type: 'text',
                                        checkAction:'csr_withdrawal_invalid',
                                        label:'作废',
                                        styles:'color:rgb(43, 133, 228);padding: 2px 7px;'
                                    },
                                    style: {
                                        color:'#2b85e4'
                                    },
                                    on: {
                                        click: () => {
                                            this.onInvalid(params)
                                        }
                                    }
                                }));
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
            },

            showNewPage(){
                this.openNewPage = !this.openNewPage;
            },

            jumpView(params){
                window.open(`./from-field/${params.row.id}/view`,'_blank')  
            },

            getListData(params){
                 this.config()
                 this.$http.get('get-from-field-list', params, r => {
                    this.totalCount=r.data.totalCount;
                    this.detail=r.data.items;
                   
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },

            //分页事件
            onPageChange (index) {
                let params=this.params;
                params.page=index;
                this.getListData(params);
            },
           
            // 高级查询修改
            onUpperChange(params,error){
                this.upperError=error;
                this.upperData=params;
            },

             onKeyEnter: function (ev) {
                this.submitLowerSearch();
            },

            //输入框内容提交
            submitLowerSearch(){
                this.params.page = 1;
                utils.addParams(this.params);
                
            },

             //高级查询确定
            submitUpperSearch(){
                if(this.upperError){
                    return ;
                }
                this.params.page = 1;
                this.params=Object.assign({},this.params,this.upperData);
                this.params.StartLastDay=this.params.StartLastDay?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.StartLastDay)):'';
                this.params.EndLastDay=this.params.EndLastDay?dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(this.params.EndLastDay)):'';
                utils.addParams(this.params);
            },

            onMessageChange(data){
                this.openMessage=data;
            },
            
            //作废点击
            onInvalid(data){
                var id = data.row.id;
                this.$http.post('post-from-field-invalid', {id,id}, r => {
                    utils.addParams(this.params);
                }, e => {
                    this.$Notice.error({
                        title:e.message
                    });
                })   
            },

            submitNewPage(name){
                this.isDisabled = true;
                var newPageRefs = this.$refs.fromFieldNewPage.$refs;
                var isSubmit = true;
                newPageRefs[name].validate((valid,data) => {
                    if (!valid) {

                        isSubmit = false
                    }
                })
                if(!isSubmit){
                    return;
                }
                console.log("------",this.newPageData)
                var params =Object.assign({},this.newPageData);
                this.$http.post('post-from-field-newpage',params, r => {
                    this.isNewPageSubmit = false;
                    this.openMessage=true;
                    this.MessageType="success";
                    this.warn="新建成功";
                    utils.addParams(this.params);
                    this.showNewPage();
                    this.isDisabled = false;
                }, e => {
                    this.isDisabled = false;
                    this.isNewPageSubmit = false;
                    this.openMessage=true;
                    this.MessageType="error";
                    this.warn=e.message;
                })   
                
            },

            newPageDataChange(data){
                if(data){
                    data.leaveDate = dateUtils.dateToStr("YYYY-MM-DD HH:mm:SS",new Date(data.leaveDate))
                    this.newPageData = Object.assign({},data);
                    var params = Object.assign({},data)
                  
                    this.$http.post('post-create-from-field',params, r => {
                        this.isNewPageSubmit = true;
                    }, e => {
                        this.isNewPageSubmit = false;
                        this.openMessage=true;
                        this.MessageType="error";
                        this.warn=e.message;
                    })   
                }
            }
        },
        
    }
</script>


<style lang="less" scoped> 
   .from-field-list{
       .m-bill-search{
            display:inline-block;
            height:22px;
            margin:14px 20px;
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